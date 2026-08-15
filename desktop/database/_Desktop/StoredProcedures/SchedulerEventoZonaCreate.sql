-- =============================================  
-- Author:  Rodrigo Román  
-- Create date: 25/02/2015  
-- Description: Crea schedules de hombre vivo  
-- =============================================  
CREATE OR ALTER PROCEDURE [dbo].[SchedulerEventoZonaCreate]  
 @user int = 0  
 ,@name NVARCHAR(256) = "EventoZona"  
 ,@date datetime  
 ,@evento NVARCHAR(max)   
 ,@alarma char(3)  
 ,@zona char(3)  
 ,@idcuenta int  
 ,@after int = 2  
 ,@before int = 2  
 ,@idroute int = null  
 ,@lat real = null  
 ,@lng real = null  
 ,@template int = 0  
 ,@idUsuario int = null  
 ,@programId int = 0  
AS  
BEGIN
	SET NOCOUNT ON;
  
  	Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

	DECLARE @fechadesde datetime = DATEADD (minute , 0-@before, @date)
	DECLARE @fechahasta datetime = DATEADD (minute , @after, @date)
	
	-- INICIO DS-510 - VigiControl - Asignar rutas cuando las realiza un Vigilador - Pedro Monesterolo
	DECLARE @SqlSubqueryEvent NVARCHAR(max) = 'SELECT TOP 1 rec_iid FROM _Datos..p_recepcion WHERE rec_iidcuenta = ' + CONVERT(varchar,@idcuenta)
	IF (@user > 0)
	BEGIN
		SET @SqlSubqueryEvent += ' AND rec_iusuario = ' + CONVERT(VARCHAR, @user)
	END

	SET @SqlSubqueryEvent += '  
		AND rec_calarma in (' + @evento + ')  
		AND rec_czona = ''' + @zona + '''  
		AND rec_tfechahora BETWEEN CONVERT(datetime, ''' + CONVERT(VARCHAR, @fechadesde, 126) + ''',126)  
		AND CONVERT(datetime, ''' + CONVERT(VARCHAR, @fechahasta, 126) + ''',126)'
	-- FIN DS-510 - VigiControl - Asignar rutas cuando las realiza un Vigilador - Pedro Monesterolo

	DECLARE @Sql NVARCHAR(max) = '  
		SELECT @result_out=count(*), @result_event_out=(' + @SqlSubqueryEvent + ') FROM _Datos..p_recepcion   
		WHERE rec_iidcuenta = ' + CONVERT(varchar,@idcuenta)
  
  
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | @before => '+ Cast(@before As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | @after => '+ Cast(@after As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | @date => '+ Rtrim(Convert(VarChar, @date,120))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | @fechadesde => '+ Rtrim(Convert(VarChar, @fechadesde,120)) + ' | @fechahasta => '+ Rtrim(Convert(VarChar, @fechahasta,120) ) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
 
	DECLARE @ahora datetime
	SELECT @ahora = GETDATE()

	IF (@user > 0)
	BEGIN
		SET @Sql += ' AND rec_iusuario = ' + CONVERT(VARCHAR, @user)
	END

	SET @Sql += '  
	  AND rec_calarma in (' + @evento + ')  
	  AND rec_czona = ''' + @zona + '''  
	  AND rec_tfechahora BETWEEN CONVERT(datetime, ''' + CONVERT(VARCHAR, @fechadesde, 126) + ''',126)  
	  AND CONVERT(datetime, ''' + CONVERT(VARCHAR, @fechahasta, 126) + ''',126)'

	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | @Sql => '+ @Sql
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
  
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | INSERT INTO _Datos..Scheduler'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | [Name] => '+ @name
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | limitdate => '+ Rtrim(Convert(VarChar, @fechahasta,120) ) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | eventtype => '+ @alarma
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  		
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | idcuenta => '+ Cast(@idcuenta As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | idroute => '+ Cast(@idroute As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | template => '+ Cast(@template As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | idUsuario => '+ Cast(@idUsuario As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | cZzona => '+ @zona
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  		
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | programId => '+ Cast(@programId As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | lastchange => '+ Rtrim(Convert(VarChar, @ahora,120) ) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | startdate => '+ Rtrim(Convert(VarChar, @fechadesde,120) ) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	BEGIN TRY
		INSERT INTO _Datos..Scheduler ([Name],[sql],limitdate,[status],eventtype,condition,idcuenta,iRoute,rLatitud,rLongitud,template,idUsuario,cZona,programId,lastchange,startdate)
		SELECT @name, @Sql, @fechahasta, 0, @alarma, 1,	@idcuenta, @idroute, @lat, @lng, @template, @idUsuario, @zona, @programId, @ahora, @fechadesde
		WHERE NOT EXISTS (
			SELECT 1
			FROM _Datos..Scheduler WITH (UPDLOCK, HOLDLOCK)
			WHERE template  = @template
			  AND limitdate = @fechahasta
			  AND [status]  = 0
			  AND eventtype = @alarma
			  AND idCuenta  = @idcuenta
			  AND iRoute    = @idroute
			  AND idUsuario = @idUsuario
			  AND cZona     = @zona
			  AND programId = @programId
		);
	END TRY
	BEGIN CATCH
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  	
		Set @message = 'Start DateTime : %s | [SchedulerEventoZonaCreate] | Error INSERT INTO _Datos..Scheduler => '+ Cast(@before As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF ERROR_NUMBER() IN (2601,2627)
		BEGIN
			PRINT 'Scheduler: registro  ya existía. Se omite el insert.';
			RETURN 0; 
		END;
		ELSE IF ERROR_NUMBER() = 547
		BEGIN
			PRINT 'Handling CHECK/FK constraint violation...';
		END;
		ELSE IF ERROR_NUMBER() = 515
		BEGIN
			PRINT 'Handling NULL violation...';
		END;
		ELSE IF ERROR_NUMBER() = 245
		BEGIN
			PRINT 'Handling conversion error...';
		END;
		ELSE
		BEGIN
			PRINT 'Re-throwing error...';
		END;

		PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
		PRINT 'Error Message : ' + ERROR_MESSAGE();
		PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
		PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
		PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
		PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
	END CATCH
END