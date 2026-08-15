-- =============================================
-- Author:		Rodrigo Román
-- Create date: 05/05/2016
-- Description:	Genera tareas de scheduler para desde los programas en schedullerprograms
-- 2024-08-09 Pablo : cambio en programtype con IN para contener correctamente los tipos de programa
-- 2024-12-27 Pablo : cambio en un dia del mes por @days , si es un programa para el mismo dia no lo tomaba
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SchedulerCreateFromProgram]
	@days int = 0
AS
BEGIN
	SET NOCOUNT ON;
	SET DATEFIRST 7

	declare @date datetime = CONVERT (date, DATEADD(day , @days , GETDATE())) -- fecha a comparar es la fecha de hoy + los dias a programar 0 para hoy, sin tiempo
	--declare @diasemana int = 0 -- dia de la semana para comparar el programa
	--declare @diames int = 0  -- dia de la semana para comparar el programa

	declare @currentweekday int = datepart(dw,@date)
	declare @currentday int = datepart(d,@date)

	declare @id int;
	declare @starthour int;
	declare @startminutes int
	declare @endhour int
	declare @endminutes int
	declare @zona char(10) = ''
	declare @user int
	declare @cuenta int
	declare @name NVARCHAR(128)
	declare @eventos NVARCHAR(max)
	declare @eventogenerar char(3)
	declare @programtype int

	-- busco los programas tipo 1 (todos los dias)
	DECLARE program_cursor CURSOR FOR 
		SELECT rp.Id,
			rp.starthour,
			rp.startminutes,
			rp.endhour,
			rp.endminutes,
			isnull(z.zon_ccodigo,''),
			rp.usuarioiid,
			rp.cuentaId,
			rp.Name,
			rp.eventos,
			rp.eventogenerar,
			rp.programtype
			from _Datos..schedulerPrograms rp 
			left join _datos..m_zonas z on z.zon_idkey = rp.zonaiid
			where 1=1
			--and rp.datestart <= @date -- el programa tiene que haber empezado
			and (rp.programtype IN(1,10,11) -- todos los días 
			--OR (rp.programtype IN(10,11,20,21,30,31,40,41,50,51))					
			OR (rp.programtype IN(5,50,51) ) -- custom, que corre todos los dias tambien.
			OR (
				rp.programtype IN(2,20,21) -- de lunes a viernes
				AND (@currentweekday BETWEEN 2 and 6)
			)
			OR (
				rp.programtype IN(3,30,31) -- un dia de la semana
				AND (@currentweekday = rp.[dayofweek]+1)
			)
			OR (
				rp.programtype IN(4,40,41) -- un dia del mes
				AND (@currentday = rp.[dayofmonth]+@days)		--1)
				)
			)
	
	OPEN program_cursor


	-- borro todas las rutas de este dia
	-- que no se hayan ejecutado 
	delete from _Datos..Scheduler where
		limitdate >= dateadd(dd, datediff(dd, 0, @date)+0, 0)
		and limitdate < dateadd(dd, datediff(dd, 0, @date)+1, 0) -- limito por el dia
		and template = 3133 -- uso el id de objeto de schedulerprogram
		and [status] = 0
	
	
	FETCH NEXT FROM program_cursor INTO @Id,
			@starthour,
			@startminutes,
			@endhour,
			@endminutes,
			@zona,
			@user,
			@cuenta,
			@name,
			@eventos,
			@eventogenerar,
			@programtype
	
	-- por cada programa genero un schedule
	WHILE @@FETCH_STATUS = 0
	BEGIN
		declare @sql NVARCHAR(max)
		declare @fechadesde datetime 
		declare @fechahasta datetime 
		declare @description NVARCHAR(256) = @name

		print 'genero programa nuevo '+@name

		-- me fijo si el la repeticion es custom.
		if (@programtype != 5)
		BEGIN
			select @fechadesde = DATEADD(minute , @startminutes , DATEADD(hour , @starthour , @date))
			select @fechahasta = DATEADD(minute , @endminutes , DATEADD(hour , @endhour , @date))

			print 'exec _Desktop..[SchedulerEventoZonaDesdeHastaCreate] '+
					CAST(@user AS NVARCHAR(16))+
					','+@description+
					','+CONVERT(VARCHAR, @fechadesde, 120)+
					','+CONVERT(VARCHAR, @fechahasta, 120)+
					','+isnull(@eventos,'')+
					','+@eventogenerar+
					','+isnull(CAST(@zona AS NVARCHAR(16)),'')+
					','+CAST(@cuenta AS NVARCHAR(16))+
					','+CAST(@id AS NVARCHAR(16))+
					',0
					,0
					,3133'+
					','+isnull(CAST(@user AS NVARCHAR(16)),'')+
					','+CAST(@programtype AS NVARCHAR(16))


			-- solo si no termino de correr para no repetir programas que ya pasaron
			if @fechahasta>GETDATE()
			BEGIN
				
				IF @programtype >= 10
					BEGIN

							exec _Desktop..[SchedulerPanel]
							@user
							,@description
							,@fechadesde -- ajusto la fecha con el horario del programa
							,@fechahasta
							,@eventos -- evento esperado
							,@eventogenerar  -- evento generado
							,@zona
							,@cuenta
							,@id
							,0
							,0
							,3133
							,@user
							,@programtype

					END
				ELSE
					BEGIN
					
						exec _Desktop..[SchedulerEventoZonaDesdeHastaCreate]
							@user
							,@description
							,@fechadesde -- ajusto la fecha con el horario del programa
							,@fechahasta
							,@eventos -- evento esperado
							,@eventogenerar  -- evento generado
							,@zona
							,@cuenta
							,@id
							,0
							,0
							,3133
							,@user
							,@programtype
					END
			END
		END
		ELSE
		BEGIN
			-- es un programa custom tengo que repetir el programa cada N horas para este dia.
			select @fechadesde = DATEADD(minute , @startminutes , DATEADD(hour , @starthour ,@date))
			select @fechahasta =  DATEADD(day , 1 , @date)

			print '@fechadesde '+CONVERT(VARCHAR, @fechadesde, 120)
			print '@fechahasta '+CONVERT(VARCHAR, @fechahasta, 120)

			--WHILE @fechadesde <  DATEADD(day , 1 , @date)
			WHILE @fechadesde <  @fechahasta
			BEGIN
				--if not (@days = 0 and @fechadesde<getdate()) -- solo ejecuto si es para mañana o el evento es posterior a la hora actual
				if (@days = 1 Or @fechadesde<getdate()) -- solo ejecuto si es para mañana o el evento es posterior a la hora actual
				BEGIN

					print 'exec _Desktop..[SchedulerEventoZonaDesdeHastaCreate] '+
							CAST(@user AS NVARCHAR(16))+
							','+@description+
							','+CONVERT(VARCHAR, @fechadesde, 120)+
							','+CONVERT(VARCHAR, @fechadesde, 120)+
							','+isnull(@eventos,'')+
							','+@eventogenerar+
							','+isnull(CAST(@zona AS NVARCHAR(16)),'')+
							','+CAST(@cuenta AS NVARCHAR(16))+
							','+CAST(@id AS NVARCHAR(16))+
							',0
							,0
							,3133'+
							','+isnull(CAST(@user AS NVARCHAR(16)),'')+
							','+CAST(@programtype AS NVARCHAR(16))

					exec _Desktop..[SchedulerEventoZonaDesdeHastaCreate]
						@user
						,@description
						,@fechadesde -- ajusto la fecha con el horario del programa
						,@fechadesde
						,@eventos -- evento esperado
						,@eventogenerar  -- evento generado
						,@zona
						,@cuenta
						,@id
						,0
						,0
						,3133
						,@user
						,@programtype
				END
				--calculo la nueva fecha desde
				select @fechadesde = DATEADD(minute , @endminutes , DATEADD(hour , @endhour , @fechadesde))
			END
		END

		FETCH NEXT FROM program_cursor INTO @Id,
			@starthour,
			@startminutes,
			@endhour,
			@endminutes,
			@zona,
			@user,
			@cuenta,
			@name,
			@eventos,
			@eventogenerar,
			@programtype
	
	END
	CLOSE program_cursor;
	DEALLOCATE program_cursor;
END