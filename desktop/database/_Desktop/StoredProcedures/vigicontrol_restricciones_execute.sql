-- =============================================
-- Author:		Rodrigo Román
-- Create date: 30/11/2018
-- Description:	Busca posiciones de vc cercanas y genera el evento
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[vigicontrol_restricciones_execute] 

AS
BEGIN
	SET NOCOUNT ON;
   
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	declare @table nvarchar(50) = N'p_posiciones'
	select @table = @table + LEFT(CONVERT(varchar, GetDate(),112),6)

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] | @table : '+@table
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	declare @list nvarchar(max)='',
			@vcr_name nvarchar(255)
	
	Declare @cuentaid1 int=0,
			@cuentaid2 int=0
		
	Declare @imei1 varchar(128)='',
			@imei2 varchar(128)='',
			@nombre1 nvarchar(256)='',
			@nombre2 nvarchar(256)='',
			@sql nvarchar(max)= N'';
	
	Declare @distancia float = 0.0

	DECLARE cursorRestricciones CURSOR FAST_FORWARD
	FOR
		select vcr_list, vcr_name from _datos..p_vcrestricciones where vcr_status = 1

	OPEN cursorRestricciones
	FETCH NEXT FROM cursorRestricciones INTO @list,@vcr_name
	WHILE @@FETCH_STATUS = 0
	BEGIN
		Set @cuentaid1 = 0
		set	@cuentaid2 = 0

		select @sql = N'
		with imei_cte (imei, cuentaid, nombre)
		as(
			select imei,cuentaid, nombre from _datos..smarttrack
				where id in ('+@list+')
		)
		SELECT 
			@cuentaid1 = max(cte1.cuentaid),
			@cuentaid2 = max(cte2.cuentaid), 
			@imei1 = p1.pos_cIMEI,
			@imei2 = p2.pos_cIMEI,
			@distancia = AVG(p1.pos_ggeography.STDistance(p2.pos_ggeography)),
			@nombre1 = max(cte1.nombre),
			@nombre2 = max(cte2.nombre)
		  FROM [_history].[dbo].['+@table+'] p1
		  inner join [_history].[dbo].['+@table+'] p2 on  p1.pos_cIMEI < p2.pos_cIMEI
		  inner join imei_cte cte1 on (p1.pos_cIMEI collate database_default = cte1.imei)
		  inner join imei_cte cte2 on (p2.pos_cIMEI collate database_default = cte2.imei)
		  where 1=1
			And DATEDIFF(minute,p1.pos_tfechahora,getdate()) < 5
			And DATEDIFF(minute,p2.pos_tfechahora,getdate()) < 5
			And DATEDIFF(minute,p1.pos_tfechahora,p1.pos_tfechahora) <= 5
			And p1.pos_ggeography.STDistance(p2.pos_ggeography) < 50
		  group by p1.pos_cIMEI,p2.pos_cIMEI
		  order by 1 desc
		 '

		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] | @SQL : '+@SQL
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
		SET @DynamicSqlTotalRowsParams = '@cuentaid1 INT OUTPUT,@cuentaid2 INT OUTPUT,@imei1 varchar(128) OUTPUT,@imei2 varchar(128) OUTPUT, @distancia float output, @nombre1 nvarchar(256) OUTPUT,@nombre2 nvarchar(256) OUTPUT'

		EXECUTE sp_executesql @sql, @DynamicSqlTotalRowsParams, @cuentaid1 OUTPUT , @cuentaid2 OUTPUT , @imei1 OUTPUT , @imei2 OUTPUT, @distancia OUTPUT, @nombre1 OUTPUT, @nombre2 OUTPUT
		
		Select @cuentaid1, @cuentaid2, @imei1,@imei2,@nombre1,@nombre2, @distancia

		If @cuentaid1=0 Or @cuentaid2=0
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |NO se procesa por id 0 |@cuentaid1 : '+Cast(@cuentaid1 As Varchar(10))+'|@cuentaid2 : '+Cast(@cuentaid2 As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@cuentaid1 : '+Cast(@cuentaid1 As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@cuentaid2 : '+Cast(@cuentaid2 As Varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@imei1 : '+@imei1
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@imei2 : '+@imei2
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@nombre1 : '+@nombre1
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@nombre2 : '+@nombre2
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@distancia : '+Cast(@distancia As NVarchar(50));
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			-- preparo para crear el evento
			declare @o_obs nvarchar(500)
			set @o_obs = '
			DISP1: '+@nombre1+'('+@imei1+')
			DISP2: '+@nombre2+'('+@imei2+')
			DIST: '+convert(varchar(4),round(@distancia,2)) +' mts'

			Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] |@o_obs : '+@o_obs
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			if (@cuentaid1 is not null)
			BEGIN
				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] | Creo un evento _RP en la cuenta @cuentaid1 : '+Cast(@cuentaid1 As Varchar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Exec _Desktop..AlarmaGenerar
					@idCta = @cuentaid1,
					@cAlarma = '_RP',
					@cObservaciones = @o_obs,
					@cRoute = null,
					@cGeofenceName = @vcr_name
					--,@iroute = @o_iRoute
					--,@lat = @o_rLatitud
					--,@lng = @o_rLongitud
					--,@idUsuario = null
					--,@cZona = @cZona

			END

			if (@cuentaid2 is not null and @cuentaid1 != @cuentaid2)
			BEGIN

				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [vigicontrol_restricciones_execute] | Creo un evento _RP en la cuenta @cuentaid2 : '+Cast(@cuentaid2 As Varchar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Exec _Desktop..AlarmaGenerar
					@idCta = @cuentaid2,
					@cAlarma = '_RP',
					@cObservaciones = @o_obs,
					@cRoute = null,
					@cGeofenceName = @vcr_name
					--,@iroute = @o_iRoute
					--,@lat = @o_rLatitud
					--,@lng = @o_rLongitud
					--,@idUsuario = null
					--,@cZona = @cZona
			END
		End

		FETCH NEXT FROM cursorRestricciones INTO @list,@vcr_name
	End

	CLOSE cursorRestricciones
	DEALLOCATE cursorRestricciones
END