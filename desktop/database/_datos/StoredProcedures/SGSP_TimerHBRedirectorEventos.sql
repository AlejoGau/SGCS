CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerHBRedirectorEventos]
AS
--Encola HB de Redirector de Eventos en RemoteCallQueue
--Autor : Pablo O. Canónico
--Fecha : 07/11/2017
--01-10-2019 Se activo el log en _LogDB
--10-08-2023 Se agrego RedirectorXmlPostV2 y la la consulta a VERSIONREDIRECTOR

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
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'TimerHBRedirectorEventos', @Repetition = 150
	--

	DECLARE @message nVarChar(Max) = '',
			@StartDateTimeText VARCHAR(Max) = ''
	DECLARE @iTiempo INT = 0,
			@iCantPorHora INT = 0,
			@iLoop INT = 0,
			@idKey INT = 0
	DECLARE @json NVARCHAR(Max) = ''
	DECLARE @Tick VARCHAR(30) = ''
	DECLARE @FechaPrograma DATETIME,
			@Now DATETIME = GetDate()

	Declare  @iDebugSQL Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DEBUGSQL' )

	Declare	@iVersion int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='VERSIONREDIRECTOR' )
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerHBRedirectorEventos | iVersion => '+ Cast(@iVersion As VarChar(10)) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	DECLARE ReDirectorMetadata CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY
	FOR	SELECT rrd_cmetadata,trd_idKey
		FROM [_Tablas].[dbo].[t_ReDirectorDestino]
		INNER JOIN [_Tablas].[dbo].[t_ReDirector] On [trd_iDestino]=[rrd_idKey]
		WHERE Upper(rrd_cnombre) IN (Upper('redirector de eventos'), Upper('Redirector Mrl2'), Upper('RedirectorXmlPostV2'))

	OPEN ReDirectorMetadata

	FETCH NEXT FROM ReDirectorMetadata INTO @json,@idKey 
	WHILE @@FETCH_STATUS = 0
	BEGIN
		Set @iTiempo = 0
		IF @json != ''
		Begin
			SELECT @iTiempo = Cast(stringvalue AS INT)
			FROM _Datos.dbo.parseJSON(@json)
			WHERE NAME = '_hb'
		End

		IF @iTiempo > 0
		BEGIN
			--Si hay que encolar verifico la URL
			DECLARE @cURLDesktop nVarChar(1000) = (
					SELECT par_cValor
					FROM _Tablas.dbo.t_parametros WITH (NOLOCK)
					WHERE par_cCodigo = 'URLDESKTOP')

			IF Upper(Rtrim(@cURLDesktop)) = Upper('http://DesktopURL:PORT')
			BEGIN
				SET @StartDateTimeText = Convert(VARCHAR, GetDate(), 120)
				SET @message = 'Start DateTime : %s | TimerHBRedirectorEventos | Falta configurar el parametro URLDESKTOP'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				SET NOEXEC ON
			END

			--Calculo cuantas veces en una hora tiene que enviar el HB
			IF @iTiempo > 60
				SET @iTiempo = 59
			SET @iCantPorHora = 60 / @iTiempo

			--Busco si hay Destino a los cuales redirigir el evento
			DECLARE @cHandlerURL nVarChar(1000) = '',
				@cNombre nVarChar(100) = ''		

			DECLARE ReDirectorDestino CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY
			FOR	SELECT rrd_cURL,rrd_cNombre
				FROM [_Tablas].[dbo].[t_ReDirectorDestino]
				WHERE Upper(rrd_cnombre) IN (Upper('redirector de eventos'), Upper('Redirector Mrl2'), Upper('RedirectorXmlPostV2'))
				GROUP BY rrd_cURL,rrd_cNombre

			OPEN ReDirectorDestino

			FETCH NEXT FROM ReDirectorDestino INTO @cHandlerURL,@cNombre

			WHILE @@FETCH_STATUS = 0
			BEGIN
				SET @StartDateTimeText = Convert(VARCHAR, GetDate(), 120)

				IF @cHandlerURL IS NULL OR @cHandlerURL = ''
				BEGIN
					SET @message = 'Start DateTime : %s | TimerHBRedirectorEventos | No hay Destino al cual enviar HB en => '+@cNombre
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					If @iDebugSQL = 1
						INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
				END
				ELSE
				BEGIN
					SET @message = 'Start DateTime : %s | TimerHBRedirectorEventos | URL => ' + @cHandlerURL
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					If @iDebugSQL = 1
						INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

					SET @iLoop = 0

					WHILE @iLoop < @iCantPorHora
					BEGIN
						SET @iLoop = @iLoop + 1
						SET @Tick = Convert(VARCHAR, GetDate(), 25)
						SET @FechaPrograma = DateADD(MINUTE, @iTiempo * @iLoop, @Now)
					
						SET @StartDateTimeText = CONVERT(VARCHAR, GetDate(), 120)
						SET @message = 'Start DateTime : %s | TimerHBRedirectorEventos | [RemoteCallQueue] | Loop => ' + Cast(@iLoop AS VARCHAR(10)) + ' / ' + Cast(@iCantPorHora AS VARCHAR(10)) + ' | FechaPrograma => ' + Convert(VARCHAR, @FechaPrograma, 120)
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						If @iDebugSQL = 1
							INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

						If @iVersion = 0
						Begin
							INSERT INTO [dbo].[RemoteCallQueue] (
								[rcq_estado],
								[rcq_tipo],
								[rcq_url],
								[rcq_fechaprograma]	)
							VALUES (
								0,
								'HTTPGET',
								Ltrim(@cURLDesktop) + Ltrim(@cHandlerURL) + '?action=HB&dc' + Rtrim(@Tick),
								@FechaPrograma )
						End
						Else
						Begin
							Declare @cParamURL nVarChar(10) = 'rec_iid'
							Declare @iRecID [int] = 0
							INSERT INTO [dbo].[RedirectorQueue] (
								[rdq_iReDirector],
								[rdq_idRec],
								[rdq_idGps],
								[rdq_tFechaHora],
								[rdq_cLlamado],
								[rdq_cRespuesta] )  
							VALUES (
								@idKey,
								@iRecID,
								0,
								@FechaPrograma,
								--Ltrim(@cURLDesktop) + Ltrim(@cHandlerURL)+'?'+@cParamURL+'='+Ltrim(Cast(@iRecID As Varchar(10))),
								Ltrim(@cURLDesktop) + Ltrim(@cHandlerURL) + '?action=HB&dc' + Rtrim(@Tick),
								Null )
						End
					END
				END

				FETCH NEXT FROM ReDirectorDestino INTO @cHandlerURL,@cNombre
			END

			CLOSE ReDirectorDestino
			DEALLOCATE ReDirectorDestino
		END
	END

	FETCH NEXT FROM ReDirectorMetadata INTO @json, @idKey
	CLOSE ReDirectorMetadata
	DEALLOCATE ReDirectorMetadata


	SET NOEXEC OFF

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