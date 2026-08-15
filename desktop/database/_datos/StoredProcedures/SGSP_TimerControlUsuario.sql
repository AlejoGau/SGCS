CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerControlUsuario]
	@idCuenta [int] = 0,
	@iUsuario [int] = 0,
	@AlarmaGenerar [char](3) = '',
	@tFechaHoraEvento [datetime]

WITH EXECUTE AS CALLER
AS
--Controla Usuario OPN/CLO
--Autor : Pablo O. Canónico
--Fecha : 11/10/2017
--03-09-2019 Se controla nuevamente si es un codigo que Genera Alerta cuando esta dentro de horario y debe generar OPV/CLV
--01-10-2019 Se activo el log en _LogDB
--12-06-2025 @rec_tFechaProceso es GetDate()
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
Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | @idCuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | @iUsuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | @AlarmaGenerar => '+ @AlarmaGenerar+' | @tFechaHoraEvento => '+ Rtrim(Convert(VarChar, @tFechaHoraEvento,120) )
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Declare @translation nVarchar(Max)=''

Declare @rec_nestado [numeric](1, 0) = 0,
		@rec_tFechaProceso [datetime] = GetDate(),
		@rec_idResolucion [char](3) = '',
		@rec_cObservaciones nVarchar(Max)

--Veo si AlarmaAGenerar es un codigo que Genera Alerta
Declare @nAlerta Int = 1
If @AlarmaGenerar IN('OKC','OKO')
Begin
	Set @nAlerta = (Select cod_nalerta From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@AlarmaGenerar )

	If @nAlerta = 2		--Es de NO GENERAR EVENTO
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | ('+@AlarmaGenerar+') es de tipo NO Genera Evento'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Set NoExec On
		End
	
	If @nAlerta = 0		--Es de NO Genera Alerta
		Set @rec_nestado = 5
End

--Busco si la cuenta esta No Habilitada
Declare @_SituacionCuenta nVarChar(100)
Select @_SituacionCuenta=(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then 'Prueba' When est_nEstado=2 Then 'No Habilitado' 
	When est_nEstado=3 Then 'Prueba x Zonas' Else 'Habilitado' End )
	From m_estado_cuenta_cab Where est_iidcuenta = @idCuenta

If @_SituacionCuenta='No Habilitado' 
Begin
	Set @rec_nestado = 7
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Cuenta en situacion -No Habilitado- No se graba '+@AlarmaGenerar
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set NoExec On
End

If @_SituacionCuenta='Prueba' 
	Begin
		If ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='SETEOMODODEPRUEBA' ) = 1
			Begin		
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Cuenta en situacion -Prueba-'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
		
				Set @rec_nestado=6
				--Set @rec_tFechaProceso= GetDate()
				Set @rec_idResolucion = (Select CAST(IsNull(par_ivalor,999) As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='MODO PRUEBA')
				Set @rec_idResolucion = Stuff('000',4-Len(@rec_idResolucion),Len(@rec_idResolucion),@rec_idResolucion)
				Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Cuenta Configurada en Modo de Prueba', @soloOutput=1, @translation = @translation OUTPUT
				Set @rec_cObservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Timer] '+ Rtrim(@translation)
			End
	End
Else
	Begin	--Me fijo Si esta en Modo Prueba por codigos de alarma
		If Exists ( Select Top 1 est_idKey From m_estado_cuenta_item Where est_iidcuenta = @idCuenta And est_czona='_COD_' And CHARINDEX(@AlarmaGenerar, est_cData) > 0 )
		Begin
			If ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='SETEOMODODEPRUEBA' ) = 1
			Begin		
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Cuenta en situacion -Prueba x Codigo de Alarmas-'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Set @rec_nestado=6
				--Set @rec_tFechaProceso= GetDate()
				Set @rec_idResolucion = (Select CAST(IsNull(par_ivalor,999) As Char(3)) As cValor FROM [_Tablas].[dbo].[t_parametros] Where par_ccodigo='MODO PRUEBA')
				Set @rec_idResolucion = Stuff('000',4-Len(@rec_idResolucion),Len(@rec_idResolucion),@rec_idResolucion)
				Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Cuenta Configurada en Modo de Prueba por Codigo de Alarmas', @soloOutput=1, @translation = @translation OUTPUT
				Set @rec_cObservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Timer] '+ Rtrim(@translation)
			End
		End
	End

Declare @bGrabo Bit = 0  /* False */
--Busco Tipo Usuario					
Declare @nTipo Int = 0
Select @nTipo = usu_nTipo From m_usuarios 
	Where usu_iidCuenta=@idCuenta And usu_icodigo > 0 And usu_iid=@iUsuario

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Tipo => '+ Rtrim(Cast(@nTipo As varchar(10)))    
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

If @nTipo = 1
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Es Superior No se controla horarios | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Tipo => '+ Rtrim(Cast(@nTipo As varchar(10)))    
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
	End
Else If @nTipo = 2
	Begin
		If @AlarmaGenerar Not IN('OPV','CLV','OKC','OKO')	--Es Normal Se controla horarios
			Begin
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Es Normal se controla horarios | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Tipo => '+ Rtrim(Cast(@nTipo As varchar(10)))    
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Set	@bGrabo = 1	/* True */
			End
		Else
			Begin
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				If @AlarmaGenerar IN('OKC','OKO')
					Begin
						If @AlarmaGenerar='OKC'
							Set @AlarmaGenerar = 'CLV'
						Else If @AlarmaGenerar='OKO'
							Set @AlarmaGenerar = 'OPV'

						Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Es Normal. Es Verificable ('+@AlarmaGenerar+'). No se controla horarios | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Tipo => '+ Rtrim(Cast(@nTipo As varchar(10)))    
					End
				Else
					Begin
						Set	@bGrabo = 1	/* True */					
						Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Es Normal. Es Verificable ('+@AlarmaGenerar+'). Se controla horarios | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Tipo => '+ Rtrim(Cast(@nTipo As varchar(10)))    
					End

				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
			End
	End
Else If @nTipo = 3  --Es Bajo Se controla horarios
	Begin
		If @AlarmaGenerar='OKC'
			Set @AlarmaGenerar = 'CLV'
		Else If @AlarmaGenerar='OKO'
			Set @AlarmaGenerar = 'OPV'

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | Es Bajo se controla horarios | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Tipo => '+ Rtrim(Cast(@nTipo As varchar(10)))    
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');		

		Set	@bGrabo = 1	/* True */
	End
Else	--NO existe. Se toma como si fuera usuario Normal	
Begin
	If @AlarmaGenerar='OKC'
		Set @AlarmaGenerar = 'CLV'
	Else If @AlarmaGenerar='OKO'
		Set @AlarmaGenerar = 'OPV'

	Declare @iCtrlUsuarioI Int = ( Select par_iValor From _Tablas.dbo.t_parametros Where par_ccodigo = 'CONTROLDEUSUARIOINEXISTENTE' )
	If @AlarmaGenerar IN('OPV','CLV') And @iCtrlUsuarioI = 0	--Si el parametro esta en 1 tiene que controlar
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | No Existe Usuario. Es Verificable ('+@AlarmaGenerar+'). No se controla horarios | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
		End
	Else 
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | No Existe Usuario. Se toma como si fuera usuario Normal. Se controla horarios | Id Cuenta => '+ Rtrim(Cast(@idCuenta As varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Set	@bGrabo = 1	/* True */
		End
End

If @bGrabo = 1
Begin
	--Vuelvo a ver x si entro por algun codigo OK de AlarmaAGenerar es un codigo que Genera Alerta
	Set @nAlerta = (Select cod_nalerta From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@AlarmaGenerar )
	If @nAlerta = 2		--Es de NO GENERAR EVENTO
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Controla Usuario OPN/CLO | ('+@AlarmaGenerar+') es de tipo NO Genera Evento'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Set NoExec On
		End
	
	If @nAlerta = 0		--Es de NO Genera Alerta
		Set @rec_nestado = 5

	Declare @iValor Int = 0
	Declare @Fecha Datetime = DateADD(second,1,@tFechaHoraEvento)	--Es mas 1 segundo para que no pierda relacion de correlatividad
	
	Declare @trap table
	(
		iValor int
	)
	Insert Into @trap Execute [dbo].[SGSP_pRecepcionINS]
		@rec_iidcuenta = @idCuenta,
		@rec_calarma = @AlarmaGenerar,
		@rec_nestado  = @rec_nestado,
		@rec_cObservaciones = @rec_cObservaciones,
		@rec_nOrigen = 1,
		@rec_iUsuario = @iUsuario,
		@rec_tfechahora  = @Fecha,
		@rec_tFechaProceso = @rec_tFechaProceso,
		@rec_idResolucion = @rec_idResolucion,
		@iValor = @iValor OUTPUT

	--Aactualizo m_Status con ultima alarma y fecha
	UPDATE m_status Set sta_cultimaalarma = @AlarmaGenerar, sta_dfechautimaalarma = @Fecha Where sta_iidCuenta=@idCuenta
		
	--PushNotification--
	Execute [dbo].[SGSP_PushNotification] @idRec=@iValor
			
	--Envio de Mail x Evento
	Execute [dbo].[SGSP_AlarmaSMS] @idCta = @idCuenta, @cCodigoAlarma = @AlarmaGenerar, @idRec = @iValor

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