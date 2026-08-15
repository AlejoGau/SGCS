CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerGeneroNY]
	@idCuenta Int = 0, 
	@AlarmaGenerar Char(3) = '',
	@cZona Char(3) = '',
	@iValor Int = 0 OUTPUT
As
--Genera NYO/NYC/NYR
--Autor : Pablo O. Canónico
--Fecha : 13/10/2017
--01-10-2019 Se activo el log en _LogDB
--2021-09-03 Se comento el envio de Push x que lo hace [SGSP_AlarmaSMS]
--2026-03-02 Se agrego el parametro Zona

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
Set @message = 'Start DateTime : %s | Genera NYO/NYC/NYR | @idCuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | @AlarmaGenerar => '+ @AlarmaGenerar
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Declare @translation nVarchar(Max)=''

Declare @rec_nestado [numeric](1, 0) = 0,
		@rec_tFechaProceso [datetime] = Null,
		@rec_idResolucion [char](3) = '',
		@rec_cObservaciones nVarchar(Max)

--Veo si AlarmaAGenerar es un codigo que Genera Alerta
Declare @nAlerta Int = (Select cod_nalerta From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@AlarmaGenerar )

If @nAlerta = 2		--Es de NO GENERAR EVENTO
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Genera NYO/NYC/NYR | ('+@AlarmaGenerar+') es de tipo NO Genera Evento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

		Set NoExec On
	End
	
If @nAlerta = 0		--Es de NO Genera Alerta
	Set @rec_nestado = 5

/* Lo hace [SGSP_pRecepcionINS]
--Busco si la cuenta esta No Habilitada
*/

Declare @Fecha Datetime = GetDate()
Declare @trap table
(
	iValor int
)
Insert Into @trap Execute [dbo].[SGSP_pRecepcionINS]
	@rec_iidcuenta = @idCuenta,
	@rec_calarma = @AlarmaGenerar,
	@rec_czona = @cZona,
	@rec_nestado  = @rec_nestado,
	@rec_cObservaciones = @rec_cObservaciones,
	@rec_nOrigen = 1,
	@rec_tfechahora  = @Fecha,
	@rec_tFechaProceso = @Fecha,
	@rec_idResolucion = @rec_idResolucion,
	@iValor = @iValor OUTPUT

--Actualizo m_Status con ultima alarma y fecha
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Genera NYO/NYC/NYR | Actualizo m_Status con ultima alarma y fecha'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

UPDATE m_status Set sta_cultimaalarma = @AlarmaGenerar, sta_dfechautimaalarma = @Fecha Where sta_iidCuenta=@idCuenta

/*2021-09-03 : Pablo. Ya lo hace [SGSP_AlarmaSMS] 		
--PushNotification--
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Genera NYO/NYC/NYR | Execute [dbo].[SGSP_PushNotification]'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Execute [dbo].[SGSP_PushNotification] @idRec=@iValor
*/			
--Envio de Mail x Evento
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Genera NYO/NYC/NYR | Envio de Mail x Evento. Execute [dbo].[SGSP_AlarmaSMS]'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Execute [dbo].[SGSP_AlarmaSMS] @idCta = @idCuenta, @cCodigoAlarma = @AlarmaGenerar, @idRec = @iValor

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