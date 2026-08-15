CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerExecuteRestauraciones]
WITH EXECUTE AS CALLER
AS
--Ejecucion de rutinas de control de restauraciones. Se separo de TimerExecute
--Autor : Pablo O. Canónico
--01-10-2019 Se activo el log en _LogDB
--23-01-2020 Se elimina de EventosEnFalloRestauracion el evento si llega la restauracion
--31-03-2021 Se modifico query para obtener solo el primer registro de la posible restauracion
--02-03-2026 Se genera evento NY con zona
Set NoCount ON
-----------------------------------
DECLARE @LogTable TABLE (
	LogLevel		VARCHAR(50),
	LogMessage		VARCHAR(Max),
	LogException	VARCHAR(2000),
	LogDate		DateTime DEFAULT GetDate());
-----------------------------------

BEGIN TRY

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'TimerExecuteRestauraciones', @Repetition = 10
--

Declare @cSQL nVarChar(Max) = '',
	    @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare  @iDebugSQL Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DEBUGSQL' )
Declare  @iExecute Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIMEREXECUTE' )
If @iExecute = 0
Begin	
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Configurado para NO ejecutar'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set NoExec On
End

SET DATEFIRST 7
--Cuando no se utlice mas Timer CS hay que habilitar esto para saber si hay que controlar o no horarios
--Declare  @iProcesoHorarios Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PROCESAHORARIOS' )
--If @iProcesoHorarios > 0
--    Begin	
--	  End

Declare @idKey Int = 0,
		@idCuenta Int = 0,
		@iUsuario Int = 0,
		@iDay Int = DATEPART(dw, GetDate())

Declare @AlarmaIngresada Char(3) = '',
		@AlarmaGenerar Char(3) = '',
		@AutoProcesaNY Char(1) = ''

Declare @tFechaHora Datetime = Null


--Control de No Restauraciones
Declare  @iProcesoNoRes Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PROCESANORES' )
--Indica si se realiza el control de No Restauraciones. 0:No / 1:Si / 2:Si, la Restauracion Autoprocesa el Evento de Falta de Restauracion Generado
If @iProcesoNoRes = 0
Begin	
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Configurado para NO controlar Restauraciones'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set NoExec On
End

Declare @iRecId_NR Int = 0,
		@iRecId_Res Int = 0,
		@iRecId_Ori Int = 0,
		@iValor Int = 0

Declare @AutoProcesaNYR Char(1) = '',
		@YaGeneroNYR Char(1) = ''

Declare @cEvento_NR nVarChar(10) = N'',
		@cZona_NR nVarChar(10) = N''

Declare @tLimite_NR Datetime,
		@tHoraActual Datetime = Getdate()

Declare @bUpdate Bit = 0  /* False */

Declare RestauracionesTimer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	/*
	Select [pet_idKey],[pet_idCuenta],[pet_tLimite_NR],[pet_cAlarmaAGenerar_NR],[pet_iRecId_NR],[pet_cEvento_NR],AutoProcesaNYR=(Case When [pet_iRecId_NR]>0 Then 'S' Else 'N' End ),
		[rec_iid],[pet_tFechaHora],[pet_cZona_NR],YaGeneroNYR=(Case When [pet_iRecId_NR]>0 And ([pet_iRecId]!=[pet_iRecId_NR]) Then 'S' Else 'N' End ),[pet_iRecId]
	From [_Datos].[dbo].[p_EventosTimer]
	Left Outer Join [_Datos].[dbo].[p_recepcion] On rec_iidcuenta=[pet_idCuenta] AND rec_calarma=[pet_cEvento_NR] AND rec_tFechaHora>=[pet_tFechaHora]	 
	Where [pet_iStatus]=0 And [pet_cTipo] = 'R'
	*/
	Select [pet_idKey],[pet_idCuenta],[pet_tLimite_NR],[pet_cAlarmaAGenerar_NR],[pet_iRecId_NR],[pet_cEvento_NR],AutoProcesaNYR=(Case When [pet_iRecId_NR]>0 Then 'S' Else 'N' End ),
		[pet_tFechaHora],[pet_cZona_NR],YaGeneroNYR=(Case When [pet_iRecId_NR]>0 And ([pet_iRecId]!=[pet_iRecId_NR]) Then 'S' Else 'N' End ),[pet_iRecId]
	From [_Datos].[dbo].[p_EventosTimer] With (NOLOCK)
	Where [pet_iStatus]=0 And [pet_cTipo] = 'R'


OPEN RestauracionesTimer
--FETCH NEXT FROM RestauracionesTimer INTO @idKey,@idCuenta,@tLimite_NR,@AlarmaGenerar,@iRecId_NR,@cEvento_NR,@AutoProcesaNYR,@iRecId_Res,@tFechaHora,@cZona_NR,@YaGeneroNYR,@iRecId_Ori
FETCH NEXT FROM RestauracionesTimer INTO @idKey,@idCuenta,@tLimite_NR,@AlarmaGenerar,@iRecId_NR,@cEvento_NR,@AutoProcesaNYR,@tFechaHora,@cZona_NR,@YaGeneroNYR,@iRecId_Ori
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Control de No Restauraciones | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Alarma Esperada => '+ @cEvento_NR+' | Alarma a Generar => '+ @AlarmaGenerar+' | AutoProcesa NYR => '+ @AutoProcesaNYR +' | FechaHora Limite => '+CONVERT(varchar, @tLimite_NR,120) +' | FechaHora Actual => '+CONVERT(varchar, @tHoraActual,120) + ' | Ya Genero NYR => ' + @YaGeneroNYR
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set @iRecId_Res = 0
	Select Top (1) @iRecId_Res=[rec_iid] From [_Datos].[dbo].[p_recepcion] With (NOLOCK)
		Where rec_iidcuenta=@idCuenta And rec_calarma=@cEvento_NR And rec_tFechaHora>=@tFechaHora
	Order By rec_tFechaHora

	Set @bUpdate = 0  /* False */
	If @iRecId_Res > 0		--Ya Restauro
		Begin
			Set @bUpdate = 1  /* True */
			If @AutoProcesaNYR = 'S'
				Begin
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Control de No Restauraciones | --AutoProcesa NYR-- '
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					If @iDebugSQL = 1
						INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');					

					--@iRecId_Res es el evento que restauro y llego que es el @cEvento_NR| @iRecId_NR es el evento original que causo la espera de restauracion				
					Execute [dbo].[SGSP_TimerAutoProcesoEvento] @iRecId_Res,@iRecId_NR,@cEvento_NR		

					--Tengo que sacar de EventosEnFalloRestauracion el evento 
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Control de No Restauraciones | Sacar de EventosEnFalloRestauracion el evento original => '+ Rtrim(Cast(@iRecId_Ori As Varchar(10)))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					If @iDebugSQL = 1
						INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

					Delete From EventosEnFalloRestauracion Where efr_iRecID=@iRecId_Ori

				End
		End
	Else	
		Begin
			--*Verifico si el Limite esta Antes de la Hora Actual
			If @tLimite_NR < @tHoraActual
				Begin
					Set @bUpdate = 1  /* True */
					
					If @YaGeneroNYR='N'
					Begin
						--Generar NYR
						If @AlarmaGenerar=''
							Set @AlarmaGenerar='NYR'

						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Control de No Restauraciones | --Limite esta Antes de la Hora Actual-- | --Generar '+@AlarmaGenerar+'--'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						If @iDebugSQL = 1
							INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

						Execute [dbo].[SGSP_TimerGeneroNY] @idCuenta = @idCuenta, 	@AlarmaGenerar = @AlarmaGenerar, @cZona = @cZona_NR, @iValor = @iValor OUTPUT

						If @iValor > 0
							Begin
								If @iProcesoNoRes = 2  --La Restauracion Autoprocesa el Evento de Falta de Restauracion Generado
									Begin
										Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
										Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Control de No Restauraciones | --La Restauracion Autoprocesa el Evento de Falta de Restauracion Generado--'
										RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
										If @iDebugSQL = 1
											INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

										Declare @dhoy2359 Datetime = DATEADD(ms, -1000, DateADD(day, 1, DateDIFF(day, 0, getdate())))
										Update [dbo].[p_EventosTimer] WITH (UPDLOCK)
										   Set [pet_tLimite_NR] = @dhoy2359,
											   [pet_iRecId_NR] = @iValor
										 Where [pet_idKey]=@idKey

										 Set @bUpdate = 0  /* False */
									End

								Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Control de No Restauraciones | --Fill_EventosEnFalloRestauracion--'
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
								If @iDebugSQL = 1
									INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

								Execute [dbo].[SGSP_Fill_EventosEnFalloRestauracion]
									@idRecNoRes = @iRecId_Ori,
									@idCuenta = @idCuenta,
									@tEventoFechaHora = @tFechaHora,
									@cZona = @cZona_NR,
									@tHoraActual = @tHoraActual
							End
					End
				End
		End

	If @bUpdate = 1
		Begin
			--Actualizo Status RestauracionesTimer
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | TimerExecuteRestauraciones | Control de No Restauraciones | --Actualizo Status EventosTimer Tipo R-- '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Update [_Datos].[dbo].[p_EventosTimer] WITH (UPDLOCK) 
				Set [pet_iStatus]=1,
					[pet_tStatusExec]=GetDate()
			Where [pet_idKey]=@idKey
		End
			
	--FETCH NEXT FROM RestauracionesTimer INTO @idKey,@idCuenta,@tLimite_NR,@AlarmaGenerar,@iRecId_NR,@cEvento_NR,@AutoProcesaNYR,@iRecId_Res,@tFechaHora,@cZona_NR,@YaGeneroNYR,@iRecId_Ori
	FETCH NEXT FROM RestauracionesTimer INTO @idKey,@idCuenta,@tLimite_NR,@AlarmaGenerar,@iRecId_NR,@cEvento_NR,@AutoProcesaNYR,@tFechaHora,@cZona_NR,@YaGeneroNYR,@iRecId_Ori
End

CLOSE RestauracionesTimer
DEALLOCATE RestauracionesTimer;

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

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