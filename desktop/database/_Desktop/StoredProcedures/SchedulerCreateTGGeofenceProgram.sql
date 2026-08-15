--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.650 
--#############################################################################

-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/04/2017
-- Description:	Genera programas de scheduler para las geocercas programadas de TG
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SchedulerCreateTGGeofenceProgram]
	@days int = 0
AS
BEGIN
	SET NOCOUNT ON;

	declare @date datetime = DATEADD(day , @days , GETDATE()) -- fecha a comparar es la fecha de hoy + los dias a programar 0 para hoy, sin tiempo
	declare @diasemana int = 0 -- dia de la semana para comparar el programa
	declare @diames int = 0  -- dia de la semana para comparar el programa

	declare @currentweekday int = datepart(dw,@date)
	declare @currentday int = datepart(d,@date)

	declare @id int;
	declare @starthour int;
	declare @startminutes int
	declare @aftertolerance int =2
	declare @beforetolerance int =2
	declare @geofenseId int
	declare @user int
	declare @cuenta int
	declare @time int
	declare @name NVARCHAR(128)
	
	-- busco los programas tipo 1 (todos los dias)
	DECLARE routes_cursor CURSOR FOR 
		SELECT r.Id,
			rp.starthour,
			rp.startminutes,
			rc.aftertolerance,
			rc.beforetolerance,
			rc.Id as geofenseId,
			r.userId,
			r.cuentaId,
			rc.[time],
			r.Name
			from _Datos..TG_Route_Programs rp 
			inner join _Datos..TG_Routes r on (rp.routeId = r.Id) 
			inner join _Datos..TG_Route_Geofences rc on (rc.routeId = r.Id) 
			where r.datestart <= @date -- la ruta tiene que haber empezado
			and (rp.programtype = 1 -- todos los días
				OR (
					rp.programtype = 2 -- de lunes a viernes
					AND (@currentweekday BETWEEN 2 and 6)
				)
				OR (
					rp.programtype = 2 -- de lunes a viernes
					AND (@currentweekday BETWEEN 2 and 6)
				)
				OR (
					rp.programtype = 3 -- un dia de la semana
					AND (@currentweekday = @diasemana+1)
				)
				OR (
					rp.programtype = 4 -- un dia del mes
					AND (@currentday = @diames)
				)
			)
			order by rc.[order]
	
	OPEN routes_cursor

	if @@CURSOR_ROWS > 0
	BEGIN
		-- borro todas las rutas de este dia
		delete from _Datos..Scheduler where
			limitdate >= dateadd(dd, datediff(dd, 0, @date)+0, 0)
			and limitdate < dateadd(dd, datediff(dd, 0, @date)+1, 0) -- limito por el dia
			and template = 9010
			and [status] = 0
	END
	
	FETCH NEXT FROM routes_cursor INTO @Id,
			@starthour,
			@startminutes,
			@aftertolerance,
			@beforetolerance,
			@geofenseId,
			@user,
			@cuenta,
			@time,
			@name

	
	-- por cada checkpoint genero un schedule
	WHILE @@FETCH_STATUS = 0
	BEGIN
		declare @sql NVARCHAR(max)
		declare @schdate datetime = DATEADD(minute , @startminutes+@time , DATEADD(hour , @starthour , DATEADD(DAY, DATEDIFF(DAY, 0, @date), 0)))
		declare @description NVARCHAR(256) = 'Ruta: '+@name
		exec _Desktop..[SchedulerEventoGeofenceCreate]
			@user
			,@description
			,@schdate -- ajusto la fecha con el horario del programa
			,@geofenseId
			,@cuenta
			,@aftertolerance
			,@beforetolerance
			,@id -- id de la ruta
			,@user
		
		FETCH NEXT FROM routes_cursor INTO @Id,
			@starthour,
			@startminutes,
			@aftertolerance,
			@beforetolerance,
			@geofenseId,
			@user,
			@cuenta,
			@time,
			@name
			
	END
	CLOSE routes_cursor;
	DEALLOCATE routes_cursor;
	
END