CREATE OR ALTER PROCEDURE [dbo].[IPRS_GetComandosDll]
	@cIMEI [nVarChar](120) = '',
	@cDLL [nVarChar](50) = '',
	@cCuenta [nVarChar](10) = '',
	@idCta [int] = 0,
	@iPuerto [int] = 0,
	@cModelo [nVarChar](500) = null,
	@idIRS [int] = 0
AS
--Es el store que ejecuta IRservices para obetener los comandos a enviar
--Autor :Pablo O. Canónico
--Fecha :29/03/2017
--2020-06-05 : Se agrego filtro por modelo
--2020-07-20 : Se agrego parametro ID de IRS para identificar quien lo llamav
--2021-08-05 : Se blanquea modelo de Meitrack x que son los mismos comandos para ambos modelos
--2021-11-08 : Update Top 1 si es IBR AMT8000 IMG. El modelo no tiene comandos reales, es solo Autenticacion para solicitar foto
--2022-04-22 : El And cmd_tfechahora <= Getdate(), solo va cuando la dll es IBR
--2025-04-14 : Se blanquea modelo de Ruptela x que son los mismos comandos para ambos modelos
--2025-09-25 : Se blanquea RedViewPacketParser x que son comandos sin modelo
--
--Estado en p_comandos_ip
--cmd_nEstado 	Descripcion
--	1			Pendiente
--	2			En proceso
--	3			Procesado
--	4			Cancelado
--	5			Procesado con Error
--	6			Vencido
--	9			En proceso y marcado para evitar duplicacion de envio

Set NoCount On

-----------------------------------
DECLARE @LogTable TABLE (
	LogLevel		VARCHAR(50),
	LogMessage		VARCHAR(Max),
	LogException	VARCHAR(2000),
	LogDate		DateTime DEFAULT GetDate());
-----------------------------------

BEGIN TRY
	
	Declare  @iDebugSQL Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DEBUGSQL' )

	Declare @cue_clinea char(3) = ''

	Declare @message VarChar(Max) = '',
		    @StartDateTimeText VarChar(Max) = '',
			@cComando VarChar(200) = ''

	If @idCta Is Null Or @idCta = 0 
		EXECUTE _desktop.dbo.IPRS_GetCue_iid @cCuenta=@cCuenta , @imei=@cIMEI, @iPuerto=@iPuerto , @cue_iid=@idCta OUTPUT,@cue_clinea=@cue_clinea  OUTPUT

	If @idCta Is Null Or @idCta = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | idCuenta en cero. No hay cuenta para el IMEI '+@cIMEI
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

		Set NoExec On
	End

	If @cIMEI = ''
	Begin
		-- traigo el imei de la cuenta
		Select @cIMEI = cue_cimei From _Datos.dbo.m_cuentas Where cue_iid = @idCta
	End

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | idCuenta : '+Convert(Varchar(10),@idCta)+' | IMEI : '+@cIMEI +' | idIRS : '+Convert(Varchar(10),@idIRS)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	BEGIN TRAN
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | BEGIN TRANSACTION '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

		If @cModelo = 'Meitrack Protocol' Or @cDLL IN ('RuptelaPacketParser', 'VecinalGoPacketParser','RedViewPacketParser') 
			Set @cModelo = Null

		If @cModelo Is Not Null
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Modelo : '+@cModelo
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			--Le cambio el estado al comando
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Le cambio el estado al comando'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
			
			--Cantidad de comandos a procesar
			declare @cant int =0
			/*
			select @cant= count(*) from _Datos..p_comandos_ip Where cmd_nEstado = 1 And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
				And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
				and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
				And @cModelo In (Select rpm_cModelo From _Tablas.dbo.T_ReceptorProtocolModel Inner Join [_Tablas].[dbo].t_comandos On  [rpm_idKey]=[tcm_rpmidKey] Where rpm_iReceptor=cmd_idReceptor)
				And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones
			*/

			If @cDLL = 'IntelbrasPacketParser' And @cModelo = 'ISECnet-AMT8000' --And @cModelo = 'ISECnet-AMT8000 IMG' 
			Begin
				select @cant= count(*) from _Datos..p_comandos_ip
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
				Where cmd_nEstado = 1 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
					and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones

				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | La cantidad de comandos a procesar : '+Convert(Varchar(10),@cant)
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				--Solo traigo un comando para pedir foto
				Update Top(1) _Datos..p_comandos_ip Set cmd_nEstado = 2 
				From _Datos..p_comandos_ip
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
				Where cmd_nEstado = 1 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
					and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones

				--Devuelvo todos los que se estan procesando ;)
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Devuelvo todos los que se estan procesando'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Select cmd_icomando,cmd_iid,replace(cmd_cvalores,'<<cue_ncuenta>>',Rtrim(cue_ncuenta)) as cmd_cvalores,cmd_cobservaciones,'' As rpm_cmodelo, @cIMEI as cmd_cimei 
				From _datos..p_comandos_ip
					Inner Join _datos..m_receptores_cab  with (nolock) On cmd_idReceptor=rec_iid
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
					inner join _datos..m_cuentas with (nolock) on cue_iid = cmd_idCuenta
				Where cmd_nEstado = 2 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And rec_cdll = @cDLL
					And cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones
					Order By cmd_iid

				--Pongo otro estado para evitar la duplicacion de envios cuando la misma cuenta esta en 2 iprs.
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Pongo otro estado para evitar la duplicacion de envios cuando la misma cuenta esta en 2 iprs'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Update _Datos..p_comandos_ip Set cmd_nEstado = 9 
				From _Datos..p_comandos_ip
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
				Where cmd_nEstado = 2 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
					and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones
			End
			Else
			Begin
				select @cant= count(*) from _Datos..p_comandos_ip
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
					left join _tablas..T_ReceptorProtocolModel  with (nolock) on rpm_idkey = pan_rpmidkey			
				Where cmd_nEstado = 1 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					--And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
					and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And isnull(rpm_cmodelo,'') = @cModelo
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones
			
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | La cantidad de comandos a procesar : '+Convert(Varchar(10),@cant)
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Update _Datos..p_comandos_ip Set cmd_nEstado = 2 
				From _Datos..p_comandos_ip
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
					left join _tablas..T_ReceptorProtocolModel with (nolock) on rpm_idkey = pan_rpmidkey			
				Where cmd_nEstado = 1 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					--And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
					and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And isnull(rpm_cmodelo,'') = @cModelo
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones

				--Devuelvo todos los que se estan procesando ;)
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Devuelvo todos los que se estan procesando'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Select cmd_icomando,cmd_iid,replace(cmd_cvalores,'<<cue_ncuenta>>',Rtrim(cue_ncuenta)) as cmd_cvalores,cmd_cobservaciones,isnull(rpm_cmodelo,'') As rpm_cmodelo, @cIMEI as cmd_cimei 
				From _datos..p_comandos_ip
					Inner Join _datos..m_receptores_cab  with (nolock) On cmd_idReceptor=rec_iid
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
					inner join _datos..m_cuentas with (nolock) on cue_iid = cmd_idCuenta
					left join _tablas..T_ReceptorProtocolModel  with (nolock) on rpm_idkey = pan_rpmidkey
				Where cmd_nEstado = 2 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					--And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And rec_cdll = @cDLL
					And isnull(rpm_cmodelo,'') = @cModelo
					And cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones
					Order By cmd_iid

				--Pongo otro estado para evitar la duplicacion de envios cuando la misma cuenta esta en 2 iprs.
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Pongo otro estado para evitar la duplicacion de envios cuando la misma cuenta esta en 2 iprs'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Update _Datos..p_comandos_ip Set cmd_nEstado = 9 
				From _Datos..p_comandos_ip
					inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
					left join _tablas..T_ReceptorProtocolModel with (nolock) on rpm_idkey = pan_rpmidkey				
				Where cmd_nEstado = 2 
					And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
					--And cmd_tfechahora <= Getdate()		--IBR graba cmd pedido de foto a futuro
					And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
					and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
					And isnull(rpm_cmodelo,'') = @cModelo
					And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones
			End
		End
		Else
		Begin
			--Le cambio el estado al comando
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Le cambio el estado al comando'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Update _Datos..p_comandos_ip Set cmd_nEstado = 2 Where cmd_nEstado = 1 And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
				And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
				and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
				And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones

			--Devuelvo todos los que se estan procesando ;)
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Devuelvo todos los que se estan procesando'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Select cmd_icomando,cmd_iid,replace(cmd_cvalores,'<<cue_ncuenta>>',Rtrim(cue_ncuenta)) as cmd_cvalores,cmd_cobservaciones,isnull(rpm_cmodelo,'') As rpm_cmodelo, @cIMEI as cmd_cimei 
			From _datos..p_comandos_ip
				Inner Join _datos..m_receptores_cab  with (nolock) On cmd_idReceptor=rec_iid
				inner join _datos..m_paneles  with (nolock) on pan_iidcuenta = cmd_idCuenta
				inner join _datos..m_cuentas with (nolock) on cue_iid = cmd_idCuenta
				left join _tablas..T_ReceptorProtocolModel  with (nolock) on rpm_idkey = pan_rpmidkey
			Where cmd_nEstado = 2 And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
				And rec_cdll = @cDLL
				And cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
				And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta)) -- mando comandos de las particiones
				Order By cmd_iid

			--Pongo otro estado para evitar la duplicacion de envios cuando la misma cuenta esta en 2 iprs.
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Pongo otro estado para evitar la duplicacion de envios cuando la misma cuenta esta en 2 iprs'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Update _Datos..p_comandos_ip Set cmd_nEstado = 9 Where cmd_nEstado = 2 And DATEDIFF(Hour, cmd_tfechahora, Getdate()) <= 24
				And @cDLL in (select top 1 rec_cdll from _datos..m_receptores_cab with (nolock) where cmd_idReceptor=rec_iid)
				and cmd_iEsCustom = 0 -- dedalo 25/2/2019 filtro por escustom para nuevo sistema de envio de comandos
				And (cmd_idCuenta=@idCta or cmd_idCuenta in (select cue_iid from _datos..m_cuentas WITH (NOLOCK) where cue_nparticion = @idCta))
		End
	COMMIT TRAN
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | END TRANSACTION '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set NoExec Off		
	
	If @iDebugSQL = 1
	BEGIN
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer],[LogModule])
				SELECT  [LogDate], @@SPID, [LogLevel], OBJECT_NAME(@@PROCID), [LogMessage], [LogException], @@PROCID, schema_name(), db_name(), @@SERVERNAME , 'IRS' FROM @LogTable
		END TRY
		BEGIN CATCH
			print 'Error al guardar logs'
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
			print 'ROLLBACK'
			IF @@TRANCOUNT>0
				ROLLBACK TRAN
		End
	Else
		Begin
			print 'Create Error/Exception Message'
			DECLARE @LogException	VARCHAR(2000);
			SET @LogException = (SELECT 'Error Number : ' + CAST(ERROR_NUMBER() AS NVARCHAR) + ' | Error Severity : ' + CAST(ERROR_SEVERITY() AS NVARCHAR) + ' | Error Proc : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc') + ' | Error State : ' + CAST(ERROR_STATE() AS NVARCHAR) + ' | Error Line : ' + CAST(ERROR_LINE() AS NVARCHAR) + ' | Error Message : ' + ERROR_MESSAGE());
		
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | IPRS_GetComandosDll | '+Rtrim(@LogException)
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
				print 'ROLLBACK'
				ROLLBACK TRANSACTION;
			END
		
			BEGIN TRY
				INSERT INTO @LogTable (LogLevel, LogMessage, LogException) SELECT 'ERROR', '-- Exception --', @LogException;
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer],[LogModule])
					SELECT  [LogDate], @@SPID, [LogLevel], OBJECT_NAME(@@PROCID), [LogMessage], [LogException], @@PROCID, schema_name(), db_name(), @@SERVERNAME , 'IRS' FROM @LogTable

			END TRY
			BEGIN CATCH
			END CATCH;

			-- Raise error to the calling instance
			RAISERROR(@LogException, 16, 1);
		End
END CATCH