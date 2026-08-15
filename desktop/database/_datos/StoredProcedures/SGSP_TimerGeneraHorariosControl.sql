CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerGeneraHorariosControl]
	@iDOW [Int] = 0,
	@iCta [Int] = 0 
As
--Genera registros en TimerHorarios 
--Autor : Pablo O. Canónico
--Fecha : 05/09/2017
--01-10-2019 Se activo el log en _LogDB

Set NoCount ON
-----------------------------------
DECLARE @LogTable TABLE (
	LogLevel		VARCHAR(50),
	LogMessage		VARCHAR(Max),
	LogException	VARCHAR(2000),
	LogDate		DateTime DEFAULT GetDate());
-----------------------------------

BEGIN TRY
Declare @cSQL nVarChar(Max) = '',
	    @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare  @iDebugSQL Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DEBUGSQL' )
Declare  @iExecute Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIMEREXECUTE' )
If @iExecute = 0
Begin	
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerGeneraHorariosControl | Configurado para NO ejecutar'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set NoExec On
End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Genera Horarios de Control para dia de la semana => '+ Rtrim(Cast(@iDOW As varchar(10)))+' | Id Cuenta => '+ Rtrim(Cast(@iCta As varchar(10))) 
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

If @iDOW > 0
Begin
	--TimerHorarios--
	Set @cSQL = 'Delete From [dbo].[TimerHorarios] Where [DOW]='+Rtrim(Cast(@iDOW As varchar(10)))
	If @iCta > 0
		Set @cSQL = @cSQL+' And [idCta]='+Rtrim(Cast(@iCta As varchar(10)))

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Exec (@cSQL )

	Set @cSQL = 'Insert Into [dbo].[TimerHorarios] EXEC [dbo].[SGSP_TimerHorarios] @iDay='+Rtrim(Cast(@iDOW As varchar(10)))
	If @iCta > 0
		Set @cSQL = @cSQL+' , @iIdCta='+Rtrim(Cast(@iCta As varchar(10)))

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Exec (@cSQL )

	--TimerLimites
	Set @cSQL = 'Insert Into [dbo].[TimerLimites] EXEC [dbo].[SGSP_TimerLimites] @iDOW='+Rtrim(Cast(@iDOW As varchar(10)))
	If @iCta > 0
		Set @cSQL = @cSQL+' , @iIdCta='+Rtrim(Cast(@iCta As varchar(10)))

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | cSQL => '+ @cSQL
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Exec (@cSQL )
End

Set NoExec Off
If @iDebugSQL = 1
	BEGIN
		BEGIN TRY
			-- Insert Logging into Table 
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer],[LogModule])
				SELECT  [LogDate], @@SPID, [LogLevel], OBJECT_NAME(@@PROCID), [LogMessage], [LogException], @@PROCID, schema_name(), db_name(), @@SERVERNAME , 'Timer' FROM @LogTable
		END TRY
		BEGIN CATCH
		END CATCH;				
	END
END TRY
BEGIN CATCH
	If @iDebugSQL = 0
		Begin
			IF ERROR_NUMBER() = 2627
			BEGIN
				PRINT 'Handling PK violation...';
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
		End
	Else
		Begin
			-- Create Error/Exception Message
			DECLARE @LogException	VARCHAR(2000);
			SET @LogException = (SELECT 'Error Number : ' + CAST(ERROR_NUMBER() AS NVARCHAR) + ' | Error Severity : ' + CAST(ERROR_SEVERITY() AS NVARCHAR) + ' | Error Proc : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc') + ' | Error State : ' + CAST(ERROR_STATE() AS NVARCHAR) + ' | Error Line : ' + CAST(ERROR_LINE() AS NVARCHAR) + ' | Error Message : ' + ERROR_MESSAGE());
		
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | TimerExecute | '+Rtrim(@LogException)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			-- Rollback open transactions
			IF @@TRANCOUNT > 0
			BEGIN
			SET @LogException = @LogException + ' | TranCount : ' + CAST(@@TRANCOUNT AS NVARCHAR)
				BEGIN TRY
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'ERROR', 'Rolling back ' + CAST(@@TRANCOUNT AS VARCHAR) + ' open transaction(s)..';
				END TRY
				BEGIN CATCH
				END CATCH;

				ROLLBACK TRANSACTION;
			END
		
			BEGIN TRY
				INSERT INTO @LogTable (LogLevel, LogMessage, LogException) SELECT 'ERROR', '-- Exception --', @LogException;
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer],[LogModule])
					SELECT  [LogDate], @@SPID, [LogLevel], OBJECT_NAME(@@PROCID), [LogMessage], [LogException], @@PROCID, schema_name(), db_name(), @@SERVERNAME , 'Timer' FROM @LogTable

			END TRY
			BEGIN CATCH
			END CATCH;

			-- Raise error to the calling instance
			RAISERROR(@LogException, 16, 1);
		End
END CATCH