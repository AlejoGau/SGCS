-- =============================================
-- Author:		Rodrigo Román
-- Create date: 03/03/2015
-- Description:	Genera programas de scheduler para las rutas de vigicontrol
-- 2024-08-07 Pablo : Le agregue Distinct porque en VC_Route_Checkpoints hay registros duplicados
-- 2025-06-13 Pablo : Le descomente --and limitdate < dateadd(dd, datediff(dd, 0, @date)+1, 0) -- limito por el dia
-- 2025-06-30 Pablo : Le agregue and startdate >= @deletedate	-- limito los que aun no empezaron y son a futuro
-- 2025-09-25 Pablo : Le agregue Declare @limitdate Datetime = DATEADD (minute , @aftertolerance+1, @schdate) para hacer la verificacion correctamente
-- 2025-11-12 Pablo : Le agregue parametros @filterRouteId, @filterProgramId que son enviados solamente desde TRIGGER [dbo].[VC_Route_ProgramChange] 
-- 2025-11-12 Pablo : Modifique --dateadd(minute,startminutes,dateadd(hour,starthour,@currentdate))>r.datestart-- porque con @fecha no los tomaba para procesar
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SchedulercreateVCRoutes]
	@days int = 0,
	@idcuenta int = 0,
	@nodelete int = 0,
	@filterRouteId int = NULL,      
    @filterProgramId int = NULL      
AS
BEGIN
	SET NOCOUNT ON;
	SET DATEFIRST 7;


	-- DEDALO 2026-02-20 agrego audit para probar
	DECLARE @auditXml varchar(max) =
		'<exec sp="dbo.SchedulercreateVCRoutes" ' +
		'days="' + CAST(@days AS varchar(20)) + '" ' +
		'idcuenta="' + CAST(@idcuenta AS varchar(20)) + '" ' +
		'nodelete="' + CAST(@nodelete AS varchar(20)) + '" ' +
		'filterRouteId="' + ISNULL(CAST(@filterRouteId AS varchar(20)), '') + '" ' +
		'filterProgramId="' + ISNULL(CAST(@filterProgramId AS varchar(20)), '') + '" ' +
		'ts="' + CONVERT(varchar(23), GETDATE(), 121) + '"/>';

	INSERT INTO dbo.FrameworkAudit (ObjectId, ObjectName, AuditDate, XmlNew)
	VALUES (OBJECT_ID('dbo.SchedulercreateVCRoutes'), 'dbo.SchedulercreateVCRoutes', GETDATE(), @auditXml);

	Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @days => ' + Cast(@days As VarChar(10)) +' | @filterProgramId => '+ Cast(@filterProgramId As Varchar(10)) + ' | @filterRouteId => '+ Cast(@filterRouteId As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @iAjustaHora Int
	Set @iAjustaHora = (Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO') 

	declare @fecha datetime = GETDATE()
	declare @date datetime = DATEADD(day , @days , @fecha) -- fecha a comparar es la fecha de hoy + los dias a programar 0 para hoy, sin tiempo
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Fecha a comparar es la fecha de hoy + los dias a programar (0 para hoy), sin tiempo | @date => '+ Rtrim(Convert(VarChar, @date,120) ) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @diasemana int = 0 -- dia de la semana para comparar el programa
	declare @diames int = 0  -- dia de la semana para comparar el programa

	declare @currentweekday int = datepart(dw,@date)
	declare @currentday int = datepart(d,@date)
	declare @currenthour int = datepart(hh,@date)
	declare @currentminutes int = datepart(n,@date)

	declare @currentdate datetime = Convert(date, @fecha)
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120) 
	Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @currentweekday => '+ Cast(@currentweekday As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @id int;
	declare @starthour int;
	declare @startminutes int
	declare @aftertolerance int =2
	declare @beforetolerance int =2
	declare @zona char(3)
	declare @user int
	declare @cuenta int
	declare @time int
	declare @name NVARCHAR(128)
	declare @lat real
	declare @lng real
	declare @checkpointName NVARCHAR(128)
	declare @programId int = 0
	declare @routeId int = 0
	
	declare @programRun int = 0
	declare @firstdate datetime
	declare @lastdate datetime
	declare @lastcuenta int = 0
	declare @lastroute int = 0
	declare @lastroutename nvarchar(128)
	declare @lastuser int = 0
	declare @ttz_nOffSet int = 0
	declare @datestart datetime
	
	--declare @sql NVARCHAR(max)
	declare @sql2 varchar(max)


	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Busco los programas tipo 1 (todos los dias)'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DECLARE routes_cursor CURSOR FOR 
		SELECT Distinct r.Id,
			rp.starthour,
			rp.startminutes,
			rc.aftertolerance,
			rc.beforetolerance,
			tc.chp_cZona,
			r.userId,
			r.cuentaId,
			rc.[time],
			r.datestart,
			r.[Name],
			tc.chp_rLatitud,
			tc.chp_rLongitud,
			z.zon_cdescripcion,
			rp.Id,
			r.Id,
			gmt.ttz_nOffSet
			from _Datos..VC_Route_Programs rp 
			inner join _Datos..VC_Routes r WITH (NOLOCK) on (rp.routeId = r.Id) 
			inner join _Datos..VC_Route_Checkpoints rc WITH (NOLOCK) on (rc.routeId = r.Id) 
			inner join _datos..m_cuentas cue WITH (NOLOCK) on cue.cue_iid = r.cuentaId -- necesario para zona horaria
			left join _tablas..t_timezone gmt WITH (NOLOCK) on cue.cue_iZonaHoraria = gmt.ttz_idkey
			inner join _datos..m_estado_cuenta_cab c WITH (NOLOCK) on c.est_iidcuenta = r.cuentaId
			inner join _Tablas..t_CheckPoints_VC tc WITH (NOLOCK) on (tc.chp_idKey = rc.checkpointId) 
			INNER JOIN _datos..m_zonas z WITH (NOLOCK) ON LTRIM(RTRIM(z.zon_ccodigo)) = LTRIM(RTRIM(tc.chp_cZona)) AND z.zon_iidcuenta = tc.chp_iCuenta
			where --r.datestart <= @date -- la ruta tiene que no haber empezado (lo saco por problema en cliente 29/10/2021 visto con pablo cas)
			  r.datestart <= @date And -- Pablo : para evitar crear rondas a futuro (https://softguard.atlassian.net/browse/DSS-766)
			 (r.cuentaId = @idcuenta OR @idcuenta = 0)
			and c.est_nestado not in(1,2,4)
			--
			and (@filterRouteId IS NULL OR r.Id = @filterRouteId)       
		    and (@filterProgramId IS NULL OR rp.Id = @filterProgramId)  
			--
			and (rp.programtype = 1 -- todos los dí­as
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
					AND (@currentweekday = rp.[dayofweek]+1)
				)
				OR (
					rp.programtype = 4 -- un dia del mes
					AND (@currentday = rp.[dayofmonth])
				)
			)
			and (
				@days>0 
				OR (
					--dateadd(minute,startminutes,dateadd(hour,starthour,@currentdate))>@fecha
					dateadd(minute,startminutes,dateadd(hour,starthour,@currentdate))>r.datestart
				)
			) -- testeo que sea mayor a la hora actual o para otro dia diferente a hoy
			order by rp.Id, rc.aftertolerance
			--order by rp.starthour,rp.startminutes, rc.aftertolerance

			/*declare @ahora datetime

	select @ahora = Convert(date, getdate()) 

	select @ahora = dateadd(hour,10,@ahora)
	select @ahora = dateadd(minute,10,@ahora)*/
	
	OPEN routes_cursor
	FETCH NEXT FROM routes_cursor INTO @Id,
			@starthour,
			@startminutes,
			@aftertolerance,
			@beforetolerance,
			@zona,
			@user,
			@cuenta,
			@time,
			@datestart,
			@name,
			@lat,
			@lng,
			@checkpointName,
			@programId,
			@routeId,
			@ttz_nOffSet
	

	if @@CURSOR_ROWS > 0 and @nodelete = 0
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Borro todas las rutas de este dia'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		declare @deletedate datetime 
		if @days > 0
			set @deletedate = convert(date,@date)
		else
			set @deletedate = @fecha
	
		Declare @deletedatehasta datetime 
		Set @deletedatehasta = dateadd(dd, datediff(dd, 0, @date)+1, 0)

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Delete limitdate => '+ Rtrim(Convert(VarChar, @deletedate,120) ) + ' and limitdate < ' + Rtrim(Convert(VarChar, @deletedatehasta,120) ) + ' and startdate >= '+ Rtrim(Convert(VarChar, @deletedate,120) )
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Delete from _Datos..Scheduler
			where	limitdate >= @deletedate
				and limitdate < @deletedatehasta -- limito por el dia
				and startdate >= @deletedate	-- limito los que aun no empezaron y son a futuro
				and template in (9001, 9002)
				and [status] = 0
				and (idCuenta = @idcuenta or @idcuenta = 0)
				--
				and (@filterRouteId IS NULL OR iRoute = @filterRouteId)       
				and (@filterProgramId IS NULL OR programId = @filterProgramId)  
				--
	END
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	if @@CURSOR_ROWS > 0 
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Por cada checkpoint genero un schedule'
	else
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | NO hay programas tipo 1 (todos los dias)'

	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	WHILE @@FETCH_STATUS = 0
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | ----------------- INICIO BUCLE --------------------------'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @starthour => '+ Rtrim(Convert(VarChar, @starthour,120) ) 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		--select convert(varchar,DATEADD(DAY, DATEDIFF(DAY, 0, @date), 0))
		declare @schdate datetime = DATEADD(minute , @startminutes+@time , DATEADD(hour , @starthour , DATEADD(DAY, DATEDIFF(DAY, 0, @date), 0)))
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @schdate => '+ Rtrim(Convert(VarChar, @schdate,120) ) 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		if @iAjustaHora = 1
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Cambio a la zona horaria de la cuenta'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			declare  @schdatetmz datetime = convert(
				datetime,
				SWITCHOFFSET (
					TODATETIMEOFFSET (
						@schdate,
						IsNull(@ttz_nOffSet, 0) * (60)
					),
					DATENAME(TZoffset, SYSDATETIMEOFFSET())
				)
			)
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @schdate => '+ Rtrim(Convert(VarChar, @schdate,120) ) + ' | @schdatetmz => '+ Rtrim(Convert(VarChar, @schdatetmz,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			select @schdate=@schdatetmz
		END

		declare @description NVARCHAR(256) = 'Ruta: '+@name+ ' CheckPoint: '+ @checkpointName
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @description => '+@description
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Verifico si el scheduller existe'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | programId => '+ Cast(@programId As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | idCuenta => '+ Cast(@cuenta As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | schdate => '+ Rtrim(Convert(VarChar, @schdate,120) ) 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | aftertolerance => '+ Cast(@aftertolerance As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @limitdate Datetime = DATEADD (minute , @aftertolerance+1, @schdate)
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | limitdate => '+ Rtrim(Convert(VarChar, @limitdate,120) ) 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | cZona => '+ @zona
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | iRoute => '+ Cast(@id As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		declare @idexist Int = 0
		select @idexist=id from _datos..Scheduler where template=9001 and programId=@programId and idCuenta=@cuenta and limitdate = @limitdate and cZona = @zona and iRoute = @id and eventtype='_NC'
		if @idexist is null or @idexist = 0
		begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | El scheduler no existe lo inserto | Ejecuto SchedulerEventoZonaCreate'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			exec _Desktop..SchedulerEventoZonaCreate
				@user
				,@description
				--,@limitdate -- ajusto la fecha con el horario del programa
				,@schdate -- 
				,'''V29'',''V04'',''CA4'',''TAG'''
				,'_NC' 
				,@zona
				,@cuenta
				,@aftertolerance
				,@beforetolerance
				,@id
				,@lat
				,@lng
				,9001
				,@user
				,@programId

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | FIN SchedulerEventoZonaCreate'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		end
		else
		begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | YA EXISTE, no creo un scheduller nuevo'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		end

		if @programRun = 0
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Es la primer corrida de programa @programRun = 0'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			select @programRun = @programId
			select @firstdate = DATEADD (minute , 0-@beforetolerance, @schdate)
			select @lastdate = DATEADD (minute , @aftertolerance+1, @schdate)
			select @lastcuenta = @cuenta
			select @lastroute = @routeId
			select @lastroutename = @name
			select @lastuser = @user

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @programRun => '+ Cast(@programRun As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastcuenta => '+ Cast(@lastcuenta As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastroute => '+ Cast(@lastroute As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @firstdate => '+ Rtrim(Convert(VarChar, @firstdate,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastdate => '+ Rtrim(Convert(VarChar, @lastdate,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastroutename => '+ @lastroutename
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastuser => '+ Cast(@lastuser As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		END

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Me fijo si cambie de programa'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		if @programRun != @programId and not exists (select * from _datos..Scheduler where template=9002 and programId=@programRun and idCuenta=@lastcuenta and status =0 and limitdate = @lastdate and iRoute = @lastroute and eventtype='_NR')
		BEGIN 
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Genero un scheduller para el programa anterior'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | programa actual @programId => '+ Cast(@programId As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | programa anterior @programRun => '+ Cast(@programRun As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | fecha hasta @lastdate => '+ Rtrim(Convert(VarChar, @lastdate,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			set @Sql2 = 'select @result_out=count(*) from _Datos..p_recepcion with (nolock) 
				LEFT join _datos..p_rxtrainfo with (nolock) on rec_iid = rxt_irecid
				where rec_iidcuenta = ' + convert(varchar,@lastcuenta)

			if (@user > 0)
			BEGIN
				set @Sql2 += ' and rec_iusuario = ' + convert(varchar,@lastuser)
			END
		
			set @Sql2 += '
				and rec_calarma in (''_NC'',''_PI'')
				and rec_tfechahora BETWEEN convert(datetime, ''' + convert(varchar,@firstdate,126) + ''',126)
				AND convert(datetime, ''' + convert(varchar,@lastdate,126) + ''',126)
				and rxt_irouteid =' + convert(varchar(20),@lastroute)

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @Sql2 => '+ @Sql2
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Insert Into _Datos..Scheduler '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			insert into _Datos..Scheduler (
				Name,
				[sql], 
				limitdate, 
				[status], 
				eventtype, 
				condition, 
				idcuenta,
				iRoute,
				rLatitud,
				rLongitud,
				template,
				idUsuario,
				cZona,
				programId,
				startdate
			) values (
				@lastroutename,
				@Sql2,
				@lastdate,
				0,
				'_NR',
				0,
				@lastcuenta,
				@lastroute,
				null,
				null,
				'9002',
				@lastuser,
				'',
				@programRun,
				@firstdate
			)

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Establezco el id del programa actual'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			select @programRun = @programId
			select @firstdate = DATEADD (minute , 0-@beforetolerance, @schdate)
			select @lastdate = DATEADD (minute , @aftertolerance+1, @schdate)
			select @lastcuenta = @cuenta
			select @lastroute = @routeId
			select @lastroutename = @name
			select @lastuser = @user

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @programRun => '+ Cast(@programRun As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastcuenta => '+ Cast(@lastcuenta As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastroute => '+ Cast(@lastroute As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @firstdate => '+ Rtrim(Convert(VarChar, @firstdate,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastdate => '+ Rtrim(Convert(VarChar, @lastdate,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastroutename => '+ @lastroutename
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastuser => '+ Cast(@lastuser As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	

		END
		else 
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Establezco los nuevos datos para el bucle'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @schdate => '+ Rtrim(Convert(VarChar, @schdate,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			select @lastdate = DATEADD (minute , @aftertolerance+1, @schdate)
			select @lastcuenta = @cuenta
			select @lastroute = @routeId

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastdate => '+ Rtrim(Convert(VarChar, @lastdate,120) ) 
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastcuenta => '+ Cast(@lastcuenta As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastroute => '+ Cast(@lastroute As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		END

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastroutename => '+ @lastroutename
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @lastroute => '+ Cast(@lastroute As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | programa actual @programId => '+ Cast(@programId As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | programa anterior @programRun => '+ Cast(@programRun As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | fecha hasta @lastdate => '+ Rtrim(Convert(VarChar, @lastdate,120) ) 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT		

		FETCH NEXT FROM routes_cursor INTO @Id,
			@starthour,
			@startminutes,
			@aftertolerance,
			@beforetolerance,
			@zona,
			@user,
			@cuenta,
			@time,
			@datestart,
			@name,
			@lat,
			@lng,
			@checkpointName,
			@programId,
			@routeId,
			@ttz_nOffSet
			
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | ----------------- FIN BUCLE --------------------------'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

	END
	CLOSE routes_cursor;
	DEALLOCATE routes_cursor;

	
	if @lastcuenta > 0 and @lastroute > 0
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Genero el schedulle de la ultima ruta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		set @Sql2 = 'select @result_out=count(*) from _Datos..p_recepcion with (nolock) 
			LEFT join _datos..p_rxtrainfo with (nolock) on rec_iid = rxt_irecid
			where rec_iidcuenta = ' + convert(varchar(10),@lastcuenta)

		if (@user > 0)
			set @Sql2 += ' and rec_iusuario = ' + convert(varchar(10),@user)
		
		set @Sql2 += '
			and rxt_iRouteID = '+ convert(varchar(10),@lastroute)+'
			and rec_calarma in (''_NC'')
			and rec_tfechahora BETWEEN convert(datetime, ''' + convert(varchar,@firstdate,126) + ''',126)
			AND convert(datetime, ''' + convert(varchar,@lastdate,126) + ''',126)'

		Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | @Sql2 => '+ @Sql2
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		select @idexist=id from _datos..Scheduler where template=9002 and programId=@programRun and idCuenta=@lastcuenta and limitdate=@lastdate and cZona='' and iRoute=@lastroute and eventtype='_NR'
		if @idexist is null or @idexist = 0
		begin
		
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | Insert _NR Into _Datos..Scheduler '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			insert into _Datos..Scheduler (
				Name,
				[sql], 
				limitdate, 
				[status], 
				eventtype, 
				condition, 
				idcuenta,
				iRoute,
				rLatitud,
				rLongitud,
				template,
				idUsuario,
				cZona,
				programId,
				startdate
			) values (
				@name,
				@Sql2,
				@lastdate,
				0,
				'_NR',
				0,
				@lastcuenta,
				@lastroute,
				null,
				null,
				'9002',
				@user,
				'',
				@programRun,
				@firstdate
			)
		End
		else
		begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
			Set @message = 'Start DateTime : %s | [SchedulercreateVCRoutes] | YA EXISTE _NR, no creo un scheduller nuevo'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		end

	END
END