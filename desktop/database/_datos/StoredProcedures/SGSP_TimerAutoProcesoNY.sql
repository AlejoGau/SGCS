CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerAutoProcesoNY]
	@idCuenta Int = 0, 
	@AlarmaIngresada Char(3) = '',
	@tFechaHora Datetime,
	@AlarmaNY Char(3) = ''
As
--AutoProcesa NYO/NYC/NYR
--Autor : Pablo O. Canónico
--Fecha : 10/10/2017
--01-10-2019 Se activo el log en _LogDB
--29-05-2020 Se guarda en Timeline

Set NoCount ON
-----------------------------------
DECLARE @LogTable TABLE (
	LogLevel		VARCHAR(50),
	LogMessage		VARCHAR(Max),
	LogException	VARCHAR(2000),
	LogDate		DateTime DEFAULT GetDate());
-----------------------------------

BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare  @iDebugSQL Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DEBUGSQL' )

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SGSP_TimerAutoProcesoNY | AutoProcesa => '+@AlarmaNY+' | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10))) +' | Alarma Ingresada => '+ @AlarmaIngresada+' | FechaHora Evento => '+ Rtrim(Convert(VarChar, @tFechaHora,120)) 
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Declare @idRec Int = 0
Declare @cObservaciones nVarchar(Max)
Declare @translation nVarchar(Max)=''

--Busco si se genero NYO/NYC/NYR
Select Top 1 @idRec=rec_iid, @cObservaciones = Convert(nVarchar(MAX), rec_cObservaciones) From p_recepcion 
	Where rec_iidcuenta=@idCuenta
	And rec_calarma=@AlarmaNY
	And rec_tFechaHora<=@tFechaHora
	And rec_nEstado In(0,2)

If @idRec > 0
Begin
	Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Procesado Automaticamente por evento ', @soloOutput=1, @translation = @translation OUTPUT
	Set @cObservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Timer] '+ Rtrim(@translation) + ' ' + @AlarmaIngresada

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_TimerAutoProcesoNY | Update => '+ @cObservaciones
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Update p_recepcion
	Set rec_nEstado = 3, rec_tFechaProceso = @tFechaHora, rec_cObservaciones  = @cObservaciones
	Where rec_iid = @idRec

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_TimerAutoProcesoNY | Inserto TimeLine'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Insert Into [_Datos].[dbo].[EventosTimeLine]
				([etl_iRecID]
				,[etl_iCuenta]
				,[etl_tFechaHora]
				,[etl_cAccion]
				,[etl_cObservacion]
				,[etl_cOwner]
				,[etl_iOperador])
		Values
				(@idRec
				,@idCuenta
				,GetDate()
				,'Autoproceso'
				,Rtrim(@translation) + ' ' + @AlarmaIngresada
				,'%SISTEMA%'
				,0)
End

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