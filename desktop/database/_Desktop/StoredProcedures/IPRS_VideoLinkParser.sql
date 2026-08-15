CREATE OR ALTER PROCEDURE [dbo].[IPRS_VideoLinkParser]
    @iRecID [int],
    @idCta [int],
    @cAlarma [char](3),
    @cZona [char](3),
    @clinea [char](3),
    @ncuenta [nvarchar](10),
    @cDll [nvarchar](100),
    @postImages [varchar](4000) = '',
	@formato varchar(10) = ''
WITH EXECUTE AS CALLER
AS
BEGIN
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Analizo multimedia del evento'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF ((SELECT par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo = 'UTILIZAVI') = 0
			AND @cDll != 'SMARTPANICSHTTP'
			AND @cDll != 'SmartPanicsPacketParser'
			AND @cDll != 'VigicontrolPacketParser'
			)
		SET NOEXEC ON


	DECLARE @cData NVARCHAR(max)
	DECLARE @cLink NVARCHAR(max)
	DECLARE @cLinkDSS NVARCHAR(max)
	DECLARE @cTemplate VARCHAR(max)
	DECLARE @iVideoID INT
	DECLARE @bEsDG BIT
	DECLARE @Cuantos INT = 0

	--Set @bEsDG = 1  /* True */
	SET @bEsDG = 0 /* False */

	DECLARE @nLaunch INTEGER
	DECLARE @cListenerIP VARCHAR(500) =	(SELECT par_cvalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo = 'MSGHOSTIPHF')
	DECLARE @cListenerPort INT = (SELECT par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo = 'MSGLOCALPORTHF')
	DECLARE @MISCFILES VARCHAR(500) = (SELECT par_cvalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo = 'SEARCHSOFTGUARDMISCFILE')
	DECLARE @SEARCHDESKTOPSHAREDIMG VARCHAR(500) = (SELECT par_cvalor FROM _Tablas.dbo.t_parametros	WHERE par_cCodigo = 'SEARCHDESKTOPSHAREDIMG')
	IF Right(@SEARCHDESKTOPSHAREDIMG, 1) <> '\'
		SELECT @SEARCHDESKTOPSHAREDIMG = @SEARCHDESKTOPSHAREDIMG + '\'

	DECLARE @cRiscoRootPath VARCHAR(500) = (SELECT par_cvalor FROM _Tablas.dbo.t_parametros	WHERE par_cCodigo = 'RISCOROOTPATH')

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Me fijo si se configuro video para la alarma : '+@cAlarma
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	SELECT @cData = cuv_clink, @cLinkDSS = cuv_cLinkDSS,@nLaunch = tvi_nLaunch,@iVideoID = cuv_iVideoID,@cTemplate = tvi_cTemplate,@Cuantos = CHARINDEX(@cAlarma, cuv_meventos)
		FROM _Datos.dbo.m_cuentas_video
	INNER JOIN _Tablas.dbo.t_VideoID ON cuv_iVideoID = tvi_iid
	WHERE CHARINDEX(@cAlarma, cuv_meventos) > 0	AND cuv_iidCuenta = @idCta

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Busco por Alarma-Zona : '+@cZona
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF EXISTS(SELECT * FROM _Datos.dbo.m_cuentas_video_links WHERE cvl_calarma = @cAlarma AND cvl_czona = @cZona	AND cvl_iidCuenta = @idCta)
	BEGIN
		SELECT @cData = cvl_clink,@cLinkDSS = cvl_cLinkDSS,@nLaunch = tvi_nLaunch,@iVideoID = cvl_iVideoID,@cTemplate = tvi_cTemplate,@Cuantos = 1
			FROM _Datos.dbo.m_cuentas_video_links
		INNER JOIN _Tablas.dbo.t_VideoID ON cvl_iVideoID = tvi_iid
		WHERE cvl_calarma = @cAlarma AND cvl_czona = @cZona	AND cvl_iidCuenta = @idCta
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Hago el split de cData : '+@cData
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DECLARE @cdatatable TABLE (id INT PRIMARY KEY, Item NVARCHAR(1024))

	INSERT @cdatatable
		SELECT * FROM dbo.SplitString(@cData, ':')

	DECLARE @cSaveImageRX NVARCHAR(max) = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Me fijo si tiene DGUARD para llamar al grabador'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DECLARE @UTILIZADGUARD INT = (SELECT par_ivalor FROM _Tablas.dbo.t_parametros	WHERE par_cCodigo = 'UTILIZADGUARD')

	IF ( @UTILIZADGUARD = 1	AND @Cuantos > 0 )
	BEGIN
		DECLARE @cGetCMD VARCHAR(500) = ''
		--Busco por Alarma-Zona
		DECLARE @jsontable TABLE ([element_id] INT IDENTITY(1, 1) NOT NULL,[parent_ID] INT,[Object_ID] INT,[NAME] VARCHAR(2000),[StringValue] VARCHAR(MAX) NOT NULL,[ValueType] VARCHAR(10) NOT NULL )

		INSERT INTO @jsontable ([parent_ID],[Object_ID],[NAME],[StringValue],[ValueType])
			SELECT [parent_ID],[Object_ID],[NAME],[StringValue],[ValueType]
				FROM dbo.parseJSON(@clinkdss)
			WHERE Object_ID IS NULL	AND name IS NOT NULL

		DECLARE @cuv_ivideoid VARCHAR(200) = (SELECT [stringvalue] FROM @jsontable WHERE name = 'cuv_ivideoid')

		IF @cuv_ivideoid = 24 --DGUARD
		BEGIN
			DECLARE @url VARCHAR(200) = (SELECT [stringvalue] FROM @jsontable WHERE name = '_uri')
			DECLARE @port VARCHAR(200) = (SELECT [stringvalue] FROM @jsontable WHERE name = '_port')
			DECLARE @user VARCHAR(200) = (SELECT [stringvalue] FROM @jsontable WHERE name = '_user')
			DECLARE @pass VARCHAR(200) = (SELECT [stringvalue] FROM @jsontable WHERE name = '_password')
			DECLARE @camara VARCHAR(200) = (SELECT [stringvalue] FROM @jsontable WHERE name = '_camara')

			SELECT @cGetCMD = 'http://' + @user + ':' + @pass + '@' + @url + ':' + @port + '/camerasetgravacao.cgi?camera=' + @camara + '&estado=on'

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Inserto Remoteprocess Call'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			INSERT INTO _Datos.dbo.RemoteCallQueue (rcq_tipo,rcq_url)
				VALUES ('HTTPGET',@cGetCMD)
		END
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Preparo carpetas'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	DECLARE @cDealerCuenta VARCHAR(20) = ''
	DECLARE @cPathCarpeta NVARCHAR(500) = ''
	DECLARE @cCarpetaDestino NVARCHAR(500) = ''

	SELECT @cDealerCuenta = LTRIM(RTRIM(@clinea)) + '_' + LTRIM(RTRIM(@ncuenta))

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Calculo el valor auxiliar'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DECLARE @tempd DATETIME = Getdate()
	DECLARE @cAuxFechaHora VARCHAR(300) = ''
	SELECT @cAuxFechaHora = replace(convert(VARCHAR(8), @tempd, 112) + convert(VARCHAR(8), @tempd, 114), ':', '') --Esto es AAAAMMDDhhmmss

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] El valor auxiliar es : '+@cAuxFechaHora
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Calculo la carpeta destino para :' + @ncuenta
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	SELECT @cPathCarpeta = Left(@cAuxFechaHora, 6) + N'\' + Upper(@cDealerCuenta)
	SELECT @cCarpetaDestino = @MISCFILES + N'\Video\' + @cPathCarpeta 

	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] La carpeta destino es :' + @cCarpetaDestino
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- grabo ffmpeg
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Analizo si grabo FFMPEG'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- Verifico si si tiene ForceTCP activo.
	DECLARE @ForceTCPStatus NVARCHAR(Max) = (
			SELECT CASE 
					WHEN charindex('"_rtsptcpforce":"true"', @cLinkDSS) > 0
						THEN 'Activo'
					END
			)

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] FFMPEG Force TCP : ' + IsNull(@ForceTCPStatus, 'Desactivado')
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	/*
      {
        "ListenerIP":"192.168.0.88"
        ,"ListenerPort":"3639"
        ,"FFMpegURL":"rtsp://192.168.0.51:554/user=admin&password=siera&channel=1&stream=1.sdp"
        ,"FFMpegPars":"-hide_banner -loglevel quiet -t 15 -i "
        ,"FFMpegArgs":" -acodec libvorbis -f webm  -y C:\\SoftGuard.Final\\Misc\\Video\\201811\\DDD_AAAA\\75_20160408144345.webm"
        ,"DebugMode":"1"
        ,"AccountFolder":"C:\\SoftGuard.Final\\Misc\\Video\\201811\\DDD_AAAA"
      }
    */
	DECLARE @DURATIONINSECONDS INT = (SELECT par_ivalor	FROM _Tablas.dbo.t_parametros WHERE par_cCodigo = 'DURATIONINSECONDS')

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Parametros de Grabacion RTSP | DurationInSeconds : ' + CAST(@DURATIONINSECONDS AS VARCHAR(10))+' | Cuantos: ' + CAST(@Cuantos AS VARCHAR(10))+' | iVideoID: ' + CAST(@iVideoID AS VARCHAR(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--iVideoID = 22 => GRV:	Generic RTSP VLC Mode
	IF ( @DURATIONINSECONDS > 0	AND @Cuantos > 0 AND @iVideoID = 22	AND @cTemplate != '' )
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Se detecta grabacion FFMPEG'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		SELECT @cTemplate = replace(@cTemplate, '"<<VIDEOSOURCE>>"', '| <<VIDEOSOURCE>> |')

		DECLARE @VIDEOSOURCE VARCHAR(1024) = 'rtsp://' + Substring(@cData, 5, len(@cData) - 4)

		-- select @VIDEOSOURCE = replace(@VIDEOSOURCE,'&amp;','&')
		-- select @VIDEOSOURCE = replace(@VIDEOSOURCE,'&','&amp;')
		SELECT @VIDEOSOURCE = replace(@VIDEOSOURCE, ' ', '%20')

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] VideoSource = ' + @VIDEOSOURCE
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		SELECT @cTemplate = replace(@cTemplate, '<<VIDEOSOURCE>>', @VIDEOSOURCE)
		SELECT @cTemplate = replace(@cTemplate, '<<DURATIONINSECONDS>>', @DURATIONINSECONDS)

		DECLARE @cFilePath VARCHAR(max) = @SEARCHDESKTOPSHAREDIMG
		SELECT @cFilePath = @cFilePath + 'FFMPeg\'
		SELECT @cFilePath = replace(@cFilePath, '\\', '^^')
		SELECT @cFilePath = replace(@cFilePath, '\', '\\')
		SELECT @cFilePath = replace(@cFilePath, '^^', '\\')

		DECLARE @ticks BIGINT = cast(Datediff(s, '1970-01-01', GETUTCDATE()) AS BIGINT) * 1000
		DECLARE @webmfile VARCHAR(200)

		SELECT @webmfile = rtrim(ltrim(convert(VARCHAR, @iRecID))) + '_' + convert(VARCHAR, @ticks) + '.webm'
		SELECT @cTemplate = REPLACE(@cTemplate, '<<OUTPUTFILE>>', @cCarpetaDestino + '\' + @webmfile)

		-- Si Force TCP esta activo seteo el argumento para el json en el template
		IF @ForceTCPStatus = 'Activo'
			SET @cTemplate = Replace(@cTemplate, '-hide_banner -loglevel quiet', '-hide_banner -loglevel quiet -rtsp_transport tcp')

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] cTemplate = ' + @cTemplate
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		SELECT @cFilePath = ' -y ' + @cFilePath + @webmfile

		DECLARE @templatetable TABLE ([id] INT PRIMARY KEY, [Item] NVARCHAR(1024))

		INSERT @templatetable
			SELECT * FROM dbo.SplitString(@cTemplate, '|')

		DECLARE @cFFMpegPars VARCHAR(max) = (SELECT rtrim(ltrim(item))	FROM @templatetable	WHERE id = 1)
		DECLARE @cFFMpegURL VARCHAR(max) = (SELECT rtrim(ltrim(item)) FROM @templatetable WHERE id = 2)
		DECLARE @cFFMpegArgs VARCHAR(max) = (SELECT rtrim(ltrim(item)) FROM @templatetable WHERE id = 3)

		DECLARE @json VARCHAR(max) = '{'

		SET @json += '"ListenerIP":"' + @cListenerIP + '"'
		SET @json += ',"ListenerPort":"' + convert(VARCHAR, @cListenerPort) + '"'
		SET @json += ',"FFMpegURL":"' + @cFFMpegURL + '"'
		SET @json += ',"FFMpegPars":"' + @cFFMpegPars + '"'
		SET @json += ',"FFMpegArgs":"' + @cFFMpegArgs + '"'
		SET @json += ',"DebugMode":"0"'
		SET @json += ',"AccountFolder":"' + @cCarpetaDestino + '"' -- DEDALO 02/03/2020 descomento a pedido de Hernan / Pablo
		SET @json += '}'

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] jSon = ' + @json
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Inserto RemoteCallQueue para iniciar grabacion por FFMPEG'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		INSERT INTO _Datos..RemoteCallQueue (rcq_tipo,rcq_url,rcq_config,rcq_fechaprograma,rcq_estado)
		VALUES ('EXE','TCPClientFFMpeg.exe',@json,getdate(),0)

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Fin FFMPEG  | Agrego a postimages para que se guarde en rximg'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		SET @postImages = @webmfile
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Analizo si vino informacion de multimedia'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF (@postImages != '')
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Hay informacion de multimedia con el evento. ' + @postImages
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		-- hago un split de las imagenes y proceso cada una
		DECLARE @RowsToProcess INT = 0
		DECLARE @CurrentRow INT = 0
		DECLARE @file NVARCHAR(1024) = ''
		--
		DECLARE @rec_ccontenido VARCHAR(200) = ''
		DECLARE @rec_cobservaciones NVARCHAR(4000) = ''

		SELECT @rec_ccontenido = isnull(rec_ccontenido, ''),@rec_cobservaciones = isnull(rec_cobservaciones, '')
			FROM _Datos.dbo.p_recepcion
		WHERE rec_iid = @iRecID

		DECLARE @table TABLE ([id] INT PRIMARY KEY,[Item] NVARCHAR(1000))

		INSERT @table
			SELECT * FROM dbo.SplitString(@postImages, ',')

		SET @RowsToProcess = @@ROWCOUNT
		SET @CurrentRow = 0

		WHILE @CurrentRow < @RowsToProcess
		BEGIN
			SET @CurrentRow += 1

			SELECT @file = Item
				FROM @table
			WHERE id = @CurrentRow

			-- obtengo la extension
			DECLARE @ext VARCHAR(10) = ''
			DECLARE @rxi_nEstado INT = 0

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Analizo imagen : ' + @file
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			SET @cSaveImageRX = @file

			SET @ext = upper(reverse(left(reverse(@file), charindex('.', reverse(@file)) - 1)))

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] La extension es : ' + @ext
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF CHARINDEX(@ext, @rec_ccontenido) = 0
				SET @rec_ccontenido = @rec_ccontenido + '[' + @ext + ']'

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] rec_ccontenido : ' + @rec_ccontenido
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--Si es IRS pongo estado en 1 porque ya copio... 
			IF patindex('%PacketParser%', @cDll) > 0
				SELECT @rxi_nEstado = 1

			IF (@cDll = 'SMARTPANICSHTTP' OR @cDll = 'SmartPanicsPacketParser' OR @cDll = 'VigicontrolPacketParser'	OR @cDll = 'SofIA')
			BEGIN
				--SmartPanics
				SET @cSaveImageRX = @MISCFILES + '\SharedImages\PostImages\' + @file

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es SmartPanics o VigiControl | cSaveImageRX :' + @cSaveImageRX
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				--C:\SoftGuard.Final\Misc\SharedImages\PostImages\352720079470164_20170810_154724.jpg
				-- si es una nota la sumo a observaciones lo resuelvo en IRS
				--set @rec_cobservaciones = @rec_cobservaciones + '['+CONVERT(VARCHAR(10), GETDATE(), 103) + ' '  + convert(VARCHAR(8), GETDATE(), 14)+'] [SmartPanics] '+@file
			END
			ELSE IF ( @cDll = 'VUPOINT'	OR @cDll = 'VuPointPacketParser' OR @ext = 'VUP' )
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es Vupoint seteo el nombre de la imagen | file :' + @file
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @rec_ccontenido = @rec_ccontenido + '[VuPoint][JPG]'
				SET @rxi_nEstado = 0
				SET @cSaveImageRX = LEFT(@file, LEN(@file) - 4)
				SET @ext = 'JPG' -- para compatibilidad

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] cSaveImageRX :' + @cSaveImageRX
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			END
			ELSE IF (@cDll = 'RiscoPacketParser')
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es Risco/Elas'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @rxi_nEstado = 0
				SET @cSaveImageRX = LEFT(@file, LEN(@file) - 4)
				SET @ext = 'JPG' -- para compatibilidad
			END
			ELSE IF (@cDll = 'SIADC09PacketParser' And @ext = 'DNL' )	--Multimedia de Dahua en protocolo SIADC09
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es Multimedia de Dahua en protocolo SIADC09'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @rxi_nEstado = 0
				SET @cSaveImageRX = Replace(@file,'.DNL','')
			END
			ELSE IF (@cDll = 'CrowPanelMultiMediaPacketParser' OR @cDll = 'SIADC09PacketParser')
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es CrowMultimedia o SIADC09'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
				SET @rxi_nEstado = 0
			END
			ELSE IF (@cDll = 'HipCamPacketParser')
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es HipCam'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @rxi_nEstado = 0
				SET @cSaveImageRX = @file
				SET @ext = 'JPG' -- para compatibilidad
			END
			ELSE IF @cData <> ''
			BEGIN
				IF Upper(Left(@cData, 4)) = 'RA3:'
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es Agility 3'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SET @rxi_nEstado = 0
					DECLARE @cRiscoPanelID VARCHAR(10) = (SELECT [item]	FROM @cdatatable WHERE id = 2)

					IF (right(@cRiscoRootPath, 1) != '\')
						SET @cRiscoRootPath = @cRiscoRootPath + '\'

					SET @cRiscoRootPath = @cRiscoRootPath + @cRiscoPanelID + '\'
					SET @cSaveImageRX = LTRIM(RTRIM(@cRiscoRootPath)) + LTRIM(RTRIM(@file))
				END
			END
			ELSE
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Tomo nombre del archivo por defecto'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @cSaveImageRX = @file
			END

			IF (@ext = 'MP4' AND ( @cDll = 'HIKVISION' OR @cDll = 'HikVisionPacketParser' ))
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es MP4 de HIK'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				DECLARE @origfile NVARCHAR(500) = @MISCFILES + '\SharedImages\PostImages\' + @file
				SET @cSaveImageRX = @cCarpetaDestino + '\' + @file

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Cambio el nombre del archivo para que grabe con el nombre del destino de la transformacion'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @file = replace(@file, '.MP4', '_FIX.MP4')
				SET @cSaveImageRX = replace(@cSaveImageRX, '.MP4', '_FIX.MP4')

				DECLARE @hikjson VARCHAR(max) = '{'
				SET @hikjson += '"ListenerIP":"' + @cListenerIP + '"'
				SET @hikjson += ',"ListenerPort":"' + convert(VARCHAR, @cListenerPort) + '"'
				SET @hikjson += ',"FFMpegURL":"' + @origfile + '"'
				SET @hikjson += ',"FFMpegPars":" -hide_banner -loglevel quiet -i"'
				SET @hikjson += ',"FFMpegArgs":" -max_muxing_queue_size 9999 -c:v libx264 -preset slow -crf 19 -c:a aac -b:a 128k ''' + @cSaveImageRX + '''"'
				SET @hikjson += ',"DebugMode":"0"'
				SET @hikjson += '}'

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Inserto Remoteprocess Call'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				INSERT INTO _Datos..RemoteCallQueue (rcq_tipo,rcq_url,rcq_config,rcq_fechaprograma,rcq_estado)
				VALUES ('EXE','TCPClientFFMpeg.exe',@hikjson,getdate(),0)
			END

			IF (@ext = 'AVI')
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Es un AVI y lo transformo a MP4'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @cSaveImageRX = @MISCFILES + '\SharedImages\PostImages\' + @file
				
				--String paquete = fFMpegPars + " |\"" + fFMpegURL + "\"| " + fFMpegArgs;
				--string parameters = " -hide_banner -loglevel quiet -i \"" + sourceAviFile + "\" -c:v libx264 -preset slow -crf 19 -c:a libvo_aacenc -b:a 128k \"" + destinationFile + "\"";
				DECLARE @avijson VARCHAR(max) = '{'

				SET @avijson += '"ListenerIP":"' + @cListenerIP + '"'
				SET @avijson += ',"ListenerPort":"' + convert(VARCHAR, @cListenerPort) + '"'
				SET @avijson += ',"FFMpegURL":"' + @cSaveImageRX + '"'
				SET @avijson += ',"FFMpegPars":" -hide_banner -loglevel quiet -i"'
				--SET @avijson += ',"FFMpegArgs":" -c:v libx264 -preset slow -crf 19 -c:a aac -b:a 128k '''+replace(@cCarpetaDestino+'/'+@file,'AVI','MP4')+'''"'
				SET @avijson += ',"FFMpegArgs":" ''' + replace(@cCarpetaDestino + '/' + @file, 'AVI', 'MP4') + '''"'
				SET @avijson += ',"DebugMode":"0"'
				SET @avijson += ',"AccountFolder":"' + @cCarpetaDestino + '"' -- DEDALO 02/03/2020 descomento a pedido de Hernan / Pablo
				SET @avijson += '}'

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Inserto Remoteprocess Call'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				INSERT INTO _Datos..RemoteCallQueue (rcq_tipo,rcq_url,rcq_config,rcq_fechaprograma,rcq_estado)
					VALUES ('EXE','TCPClientFFMpeg.exe',@avijson,getdate(),0)

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Cambio el nombre del archivo para que grabe con el nombre del destino de la transformacion'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				SET @ext = 'MP4'
				SET @file = replace(@file, 'AVI', 'MP4')
				SET @cSaveImageRX = replace(@cSaveImageRX, 'AVI', 'MP4')

				--2024-05-06 Pablo: Para que las apps encuentren el MP4
				Declare @cCarpetaDestinoMP4 NVarchar(500) = N'\Video\' + @cPathCarpeta + '\' 
				SET @cSaveImageRX = replace(@cSaveImageRX, '\PostImages\', @cCarpetaDestinoMP4)
			END

			IF (@ext = 'ASHX?VVTOK' Or @ext = 'ASHX?EETOK')
				SET @ext = 'CWU'
			Else
			Begin
				IF (@file Like '%https://www.actuateui.net%') Or (@file Like '%https://web.ajax.systems%')  Or (@file Like '%http://www.openstreetmap.org%') Or (@file Like '%https://app.m2mservices.com%') Or (@file Like '%https://i.jablonet.net%')
				Begin
					SET @ext = 'CWU'
					SET @rxi_nEstado = 0
				End
			End

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] La extension final es : ' + @ext
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Inserto en p_RXImg'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			INSERT INTO _Datos.dbo.p_RXImg (rxi_iRecId,rxi_cImg,rxi_cCarpeta,rxi_nEstado,rxi_ctipo)
				VALUES (@iRecID,@cSaveImageRX,@cCarpetaDestino,@rxi_nEstado,@ext)

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] rxi_nEstado : ' + Cast(@rxi_nEstado As VarChar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF (@rxi_nEstado = 1)
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Inserto en p_grabacion_mp4'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				INSERT INTO [_Datos].[dbo].[p_grabacion_mp4] ([grm_iidCuenta],[grm_iidRecepcion],[grm_dFechaHora],[grm_cCarpeta],[grm_cArchivo],[grm_cTipo])
					VALUES (@idCta,@iRecID,getdate(),@cCarpetaDestino,@file,@ext)

				IF (@ext = 'JPG' OR @ext = 'JPEG')
				BEGIN
					--Si tiene extension la limpio
					IF patindex('%' + @ext + '%', @file) > 0
						SET @file = LEFT(@file, LEN(@file) - 4)

					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Inserto en p_grabacion_img'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					INSERT INTO [_Datos].[dbo].[p_grabacion_img] ([gri_iidcuenta],[gri_iidrecepcion],[gri_dfechahora],[gri_ccarpeta],[gri_carchivo])
						VALUES (@idCta,@iRecID,getdate(),@cPathCarpeta,@file)
				END
			END
		END

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Actualizo p_recepcion | rec_ccontenido : ' + @rec_ccontenido
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		UPDATE _Datos.dbo.p_recepcion
			SET rec_ccontenido = @rec_ccontenido,
				rec_cObservaciones = @rec_cobservaciones
		WHERE rec_iid = @iRecID

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Si es VigiControl analizo para duplicar el evento de multimedia | Formato : ' + @formato + ' | Dll : ' + @cDll
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @cDll = 'VigicontrolPacketParser' AND @formato = 'VCMU'
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] Busco el evento de asignacion y de ahi la cuenta destino'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			DECLARE @cue INT

			--2022-10-12 : Pablo. Porque el select trae mas de un registro y no el ultimo
			/*
			select @cue = rxt_cData from _datos..p_recepcion 
				inner join _datos..p_RXtraInfo on rec_iid = rxt_iRecId
			where rec_calarma = '_DV' and rec_iid < @iRecID and rec_iidcuenta=@idCta
			*/
			--2023-12-26 : Pablo. Si hay mas de una asignacion y toman cualquiera que no sea la primera no funciona
			/*
			SELECT TOP 1 @cue = rxt_cData
				FROM _datos..p_recepcion
			INNER JOIN _datos..p_RXtraInfo ON rec_iid = rxt_iRecId
			WHERE rec_calarma = '_DV' AND rec_iid < @iRecID AND rec_iidcuenta = @idCta
			ORDER BY rec_iid DESC
			*/
			SELECT @cue = rec_iidcuenta
			  FROM  [_Datos].[dbo].[m_asignacion_movil]
			  Inner JOin [_Datos].[dbo].SmartTrack s On s.Id = [amv_objectid]
			  Inner JOin [_Datos].[dbo].p_recepcion On rec_iid = amv_rec_iid
			  Where s.CuentaId = @idCta
				And amv_objecttypeid = 3113
				And amv_estado IN(11,12)

			IF @cue > 0
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] EXECUTE EventoDuplicar @rec_iid ='+ Cast(@iRecID AS VARCHAR(10))+ ',@idCuentaDestino =' + Cast(@cue AS VARCHAR(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				EXECUTE [EventoDuplicar] @rec_iid = @iRecID, @idCuentaDestino = @cue
			END
			ELSE
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] No se encontro la cuenta asignada buscando el evento _DV'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			END
		END
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_VideoLinkParser] FIN'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	SET NOEXEC OFF
END