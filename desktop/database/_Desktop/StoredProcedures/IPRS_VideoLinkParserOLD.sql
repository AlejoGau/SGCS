CREATE OR ALTER PROCEDURE [dbo].[IPRS_VideoLinkParserOLD]
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
Begin
    PRINT ('[IPRS_VideoLinkParser] analizo multimedia del evento');
    If ((Select par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='UTILIZAVI') = 0
        AND @cDll != 'SMARTPANICSHTTP' AND @cDll!= 'SmartPanicsPacketParser' AND @cDll!= 'VigicontrolPacketParser')
        Set NoExec On
    Declare @cData    NVARCHAR(200)
    Declare @cLink    NVARCHAR(200)
    declare @cLinkDSS NVARCHAR(2000)
    declare @cTemplate varchar(max)
    declare @iVideoID int
    Declare @bEsDG  Bit
    declare @Cuantos int = 0
    --Set @bEsDG = 1  /* True */
    Set @bEsDG = 0  /* False */
    Declare @nLaunch Integer
    declare @cListenerIP varchar(500) = ''
    Select @cListenerIP = par_cvalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='MSGHOSTIPHF'
    declare @cListenerPort int
    Select @cListenerPort = par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='MSGLOCALPORTHF'
    declare @MISCFILES varchar(500) = ''
    Select @MISCFILES = par_cvalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='SEARCHSOFTGUARDMISCFILE'
    declare @SEARCHDESKTOPSHAREDIMG varchar(500) = ''
    Select @SEARCHDESKTOPSHAREDIMG = par_cvalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='SEARCHDESKTOPSHAREDIMG'
    If Right(@SEARCHDESKTOPSHAREDIMG,1) <> '\'
        select @SEARCHDESKTOPSHAREDIMG = @SEARCHDESKTOPSHAREDIMG + '\'
    declare @cRiscoRootPath varchar(500)
    select @cRiscoRootPath = par_cvalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='RISCOROOTPATH'
    PRINT ('[IPRS_VideoLinkParser] Me fijo si se configuro video para la alarma')
    Select @cData = cuv_clink
        ,@cLinkDSS = cuv_cLinkDSS
        ,@nLaunch = tvi_nLaunch
        ,@iVideoID = cuv_iVideoID 
        ,@cTemplate = tvi_cTemplate 
        ,@Cuantos = CHARINDEX(@cAlarma, cuv_meventos)
        From _Datos.dbo.m_cuentas_video
        Inner Join _Tablas.dbo.t_VideoID  ON cuv_iVideoID = tvi_iid
        Where CHARINDEX(@cAlarma, cuv_meventos) > 0 And cuv_iidCuenta = @idCta
    PRINT ('[IPRS_VideoLinkParser] Busco por Alarma-Zona')
    IF EXISTS (SELECT * FROM _Datos.dbo.m_cuentas_video_links
        Where cvl_calarma = @cAlarma And cvl_czona = @cZona
                And cvl_iidCuenta  = @idCta)
    BEGIN
    Select @cData = cvl_clink
        ,@cLinkDSS = cvl_cLinkDSS
        ,@nLaunch = tvi_nLaunch
        ,@iVideoID = cvl_iVideoID 
        ,@cTemplate = tvi_cTemplate 
        ,@Cuantos = 1
        From _Datos.dbo.m_cuentas_video_links
        Inner Join _Tablas.dbo.t_VideoID  ON cvl_iVideoID = tvi_iid
        Where cvl_calarma = @cAlarma And cvl_czona = @cZona
                And cvl_iidCuenta  = @idCta
    END 
    PRINT ('[IPRS_VideoLinkParser] hago el split de cdata')
    declare @cdatatable table (id int PRIMARY KEY, Item NVARCHAR(1000))
    insert @cdatatable select * from dbo.SplitString( @cData, ':') 
    Declare @cSaveImageRX NVARCHAR(1024)
    Set @cSaveImageRX = ''
    -- Me fijo si tiene DGUARD para llamar al grabador
    declare @UTILIZADGUARD int = 0;
    Select @UTILIZADGUARD=par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='UTILIZADGUARD'
    if (@UTILIZADGUARD=1 and @Cuantos > 0)
    BEGIN
        declare @cGetCMD varchar(500)=''
        --Busco por Alarma-Zona
        declare @jsontable TABLE (element_id INT IDENTITY(1, 1) NOT NULL,parent_ID int, Object_ID INT,NAME VARCHAR(2000),StringValue VARCHAR(MAX) NOT NULL,ValueType VARCHAR(10) NOT null)
        INSERT INTO @jsontable (parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT parent_ID, Object_ID, NAME, StringValue, ValueType FROM dbo.parseJSON(@clinkdss)
            WHERE Object_ID is null  and name is not null
        declare  @url varchar(200)
        select @url = stringvalue from @jsontable where name = '_uri'
        declare  @port varchar(200)
        select @port = stringvalue from @jsontable where name = '_port'
        declare  @user varchar(200)
        select @user = stringvalue from @jsontable where name = '_user'
        declare  @pass varchar(200)
        select @pass = stringvalue from @jsontable where name = '_password'
        declare  @camara varchar(200)
        select @camara = stringvalue from @jsontable where name = '_camara'
        declare  @cuv_ivideoid varchar(200)
        select @cuv_ivideoid = stringvalue from @jsontable where name = 'cuv_ivideoid'
        If @cuv_ivideoid=24 --DGUARD
        Begin       
            select @cGetCMD = 'http://'+@user+':'+@pass+'@'+@url+':'+@port+'/camerasetgravacao.cgi?camera='+@camara+'&estado=on'
            Print '[IPRS_VideoLinkParser] Inserto remoteprocess call'
            insert into _Datos..RemoteCallQueue (rcq_tipo,rcq_url) values ('HTTPGET',@cGetCMD)
        End
    END
    -- preparo carpetas
    declare @cDealerCuenta varchar(20) = ''
    declare @cPathCarpeta nvarchar(500) = ''
    declare @cCarpetaDestino nvarchar(500) = ''
    select @cDealerCuenta = LTRIM(RTRIM(@clinea))+'_'+LTRIM(RTRIM(@ncuenta))
    PRINT ('[IPRS_VideoLinkParser] calculo el valor auxiliar');
    declare @tempd datetime
    declare @cAuxFechaHora varchar(300) = ''
    select @tempd = getdate()
    select @cAuxFechaHora = replace(convert(varchar(8), @tempd, 112)+convert(varchar(8), @tempd, 114), ':','')  --Esto es AAAAMMDDhhmmss    Por ejemplo hoy seria   20170801150409
    PRINT ('[IPRS_VideoLinkParser] el valor auxiliar es: '+@cAuxFechaHora);
    PRINT ('[IPRS_VideoLinkParser] calculo la carpeta destino :'+@ncuenta);
    select @cPathCarpeta  = Left(@cAuxFechaHora,6)+N'\'+Upper(@cDealerCuenta)
    select  @cCarpetaDestino = @MISCFILES+N'\Video\'+@cPathCarpeta --@mPath deberia en tu caso salir del parametro MISCFILES
    PRINT ('[IPRS_VideoLinkParser] la carpeta destino es: '+@cCarpetaDestino);
    -- grabo ffmpeg
	PRINT '[IPRS_VideoLinkParser] Analizo si grabo FFMPEG'
	
	-- Miguel Azocar: 16/04/2020 11:52 Hs
	-- Verifico si si tiene ForceTCP activo.
	Declare @ForceTCPStatus nVarChar(Max) = (Select Case When charindex('"_rtsptcpforce":"true"',@cLinkDSS) > 0 Then 'Activo' End)
	Print ''
	Print '[IPRS_VideoLinkParser] FFMPEG --------------------------------------------'
	Print '[IPRS_VideoLinkParser] -- Force TCP: ' + IsNull(@ForceTCPStatus,'Desactivado')
	
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
    declare @DURATIONINSECONDS int = 0;
    Select @DURATIONINSECONDS=par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='DURATIONINSECONDS'
    
    PRINT ('[IPRS_VideoLinkParser] -- Parametros de Grabacion RTSP')
    PRINT ('[IPRS_VideoLinkParser] -- @DurationInSeconds: ' + CAST(@DURATIONINSECONDS as nVarChar(Max)))
    PRINT ('[IPRS_VideoLinkParser] -- @Cuantos: ' + CAST(@Cuantos as nVarChar(Max)))
    PRINT ('[IPRS_VideoLinkParser] -- @iVideoID: ' + CAST(@iVideoID as nVarChar(Max)))
            
    if (@DURATIONINSECONDS>0 and @Cuantos > 0 and @iVideoID=22 and @cTemplate != '')
    BEGIN
		PRINT '[IPRS_VideoLinkParser] ### Se detecta grabacion FFMPEG, procedo ###'
        select @cTemplate = replace(@cTemplate ,'"<<VIDEOSOURCE>>"','| <<VIDEOSOURCE>> |')
        
        declare @VIDEOSOURCE varchar(1000)
        select @VIDEOSOURCE = 'rtsp://'+Substring(@cData,5,len(@cData)-4)
        -- select @VIDEOSOURCE = replace(@VIDEOSOURCE,'&amp;','&')
        -- select @VIDEOSOURCE = replace(@VIDEOSOURCE,'&','&amp;')
        select @VIDEOSOURCE = replace(@VIDEOSOURCE,' ','%20')
        print '[IPRS_VideoLinkParser] -- @VideoSource = ' + @VIDEOSOURCE
        select @cTemplate = replace(@cTemplate ,'<<VIDEOSOURCE>>',@VIDEOSOURCE)
        select @cTemplate = replace(@cTemplate ,'<<DURATIONINSECONDS>>',@DURATIONINSECONDS)
                
        declare @cFilePath varchar(max) = @SEARCHDESKTOPSHAREDIMG
        select @cFilePath = @cFilePath + 'FFMPeg\' 
        select @cFilePath = replace(@cFilePath ,'\\','^^')
        select @cFilePath = replace(@cFilePath ,'\','\\')
        select @cFilePath = replace(@cFilePath ,'^^','\\')  
        declare @ticks bigint = cast(Datediff(s, '1970-01-01', GETUTCDATE()) AS bigint)*1000
        declare @webmfile varchar(200)
        select @webmfile = rtrim(ltrim(convert(varchar,@iRecID)))+'_'+convert(varchar,@ticks)+'.webm'
        
        select @cTemplate = REPLACE (@cTemplate,'<<OUTPUTFILE>>',@cCarpetaDestino+'\'+@webmfile)
        
		-- Miguel Azocar: 16/04/2020 11:52 Hs
		-- Si Force TCP esta activo seteo el argumento para el json en el template
		If @ForceTCPStatus = 'Activo' Set @cTemplate = Replace(@cTemplate,'-hide_banner -loglevel quiet','-hide_banner -loglevel quiet -rtsp_transport tcp')
		
		print '[IPRS_VideoLinkParser] -- @cTemplate: '+ CAST(@cTemplate as nVarChar(Max))  
        select @cFilePath = ' -y '+@cFilePath+@webmfile
        declare @templatetable table (id int PRIMARY KEY, Item NVARCHAR(1000))
        insert @templatetable select * from dbo.SplitString( @cTemplate, '|') 
        declare @cFFMpegPars varchar(max)
        select  @cFFMpegPars = rtrim(ltrim(item)) from @templatetable where id = 1
        declare @cFFMpegURL varchar(max)  
        select  @cFFMpegURL = rtrim(ltrim(item)) from @templatetable where id = 2
        declare @cFFMpegArgs varchar(max)
        select  @cFFMpegArgs = rtrim(ltrim(item)) from @templatetable where id = 3

		declare @json varchar(max)
        select @json = '{'
        select @json += '"ListenerIP":"'+@cListenerIP+'"'
        select @json += ',"ListenerPort":"'+convert(varchar,@cListenerPort)+'"'
        select @json += ',"FFMpegURL":"'+@cFFMpegURL+'"'
        select @json += ',"FFMpegPars":"'+@cFFMpegPars+'"'
        select @json += ',"FFMpegArgs":"'+@cFFMpegArgs+'"'
        select @json += ',"DebugMode":"0"'
        select @json += ',"AccountFolder":"'+@cCarpetaDestino+'"' -- DEDALO 02/03/2020 descomento a pedido de Hernan / Pablo
        select @json += '}'
        
        PRINT '[IPRS_VideoLinkParser] -- @json = '+ @json
		PRINT '[IPRS_VideoLinkParser] Inserto RemoteCallQueue para iniciar grabacion por FFMPEG'
        
        insert into _Datos..RemoteCallQueue (rcq_tipo,rcq_url,rcq_config,rcq_fechaprograma, rcq_estado) 
        values ('EXE','TCPClientFFMpeg.exe',@json, getdate(), 0)
		
		PRINT '[IPRS_VideoLinkParser] FIN FFMPEG -----------------------------------------'
		PRINT ''
        print '[IPRS_VideoLinkParser] Agrego a postimages para que se guarde en rximg'
        select @postImages = @webmfile
    END
        
    
    print '[IPRS_VideoLinkParser] Veo si vinieron imagenes con el evento'
    if (@postImages != '')
    BEGIN
        PRINT ('[IPRS_VideoLinkParser] hay imagenes en el evento '+@postImages);
        -- hago un split de las imagenes y proceso cada una
        DECLARE @RowsToProcess  int
        DECLARE @CurrentRow     int
        --Viene un @postImages de 840chars
		DECLARE @file nvarchar(300)
		--
        declare @rec_ccontenido varchar(200)
        declare @rec_cobservaciones nvarchar(4000)
        select @rec_ccontenido = isnull(rec_ccontenido,''), @rec_cobservaciones = isnull(rec_cobservaciones,'') from _datos..p_recepcion where rec_iid = @iRecID
        declare @table table (id int PRIMARY KEY, Item NVARCHAR(1000))
        insert @table select * from dbo.SplitString( @postImages, ',') 
        SET @RowsToProcess=@@ROWCOUNT
        SET @CurrentRow=0
        WHILE @CurrentRow<@RowsToProcess
        BEGIN
            SET @CurrentRow=@CurrentRow+1
            SELECT 
                @file=Item
                FROM @table
                WHERE id=@CurrentRow
                -- obtengo la extension
                declare @ext varchar(10)
                declare @rxi_nEstado int = 0
                PRINT ('[IPRS_VideoLinkParser] analizo imagen '+@file);
                select @cSaveImageRX = @file
                select @ext = upper(reverse(left(reverse(@file), charindex('.', reverse(@file)) - 1)))

				PRINT ('[IPRS_VideoLinkParser] la extension es '+@ext);

				if CHARINDEX(@ext,@rec_ccontenido) = 0
				BEGIN
					select @rec_ccontenido = @rec_ccontenido + '['+@ext+']'
				END
                
                -- si es IPRS pongo estado en 1 porque ya copio... 
                if patindex('%PacketParser%',@cDll)>0
                    select @rxi_nEstado = 1
                if (@cDll = 'SMARTPANICSHTTP' OR @cDll= 'SmartPanicsPacketParser' OR @cDll= 'VigicontrolPacketParser')
                BEGIN
                    -- smartpanics
                    select @cSaveImageRX = @MISCFILES+'\SharedImages\PostImages\'+@file
					PRINT ('[IPRS_VideoLinkParser] es smartpanics o vigicontrol, calculo la carpeta postimages :'+ @cSaveImageRX);                    
                    --C:\SoftGuard.Final\Misc\SharedImages\PostImages\352720079470164_20170810_154724.jpg
                    -- si es una nota la sumo a observaciones lo resuelvo en IRS
                    --set @rec_cobservaciones = @rec_cobservaciones + '['+CONVERT(VARCHAR(10), GETDATE(), 103) + ' '  + convert(VARCHAR(8), GETDATE(), 14)+'] [SmartPanics] '+@file
                END
                else if (@cDll = 'VUPOINT' OR @cDll= 'VuPointPacketParser' OR @ext ='VUP')
                BEGIN
                    PRINT ('[IPRS_VideoLinkParser] es vupoint seteo el nombre de la imagen');
					print ('[IPRS_VideoLinkParser] @file'+@file);
                    select @rec_ccontenido = @rec_ccontenido + '[VuPoint][JPG]'
                    select @rxi_nEstado = 0
                    SELECT @cSaveImageRX = LEFT (@file, LEN(@file)-4)
                    select @ext = 'JPG' -- para compatibilidad
                    print ('[IPRS_VideoLinkParser] @cSaveImageRX'+@cSaveImageRX);
                END
                --Pablo
                else if (@cDll= 'RiscoPacketParser')
                BEGIN
                    PRINT ('[IPRS_VideoLinkParser] es Risco/Elas');
                        select @rxi_nEstado = 0
                        SELECT @cSaveImageRX = LEFT (@file, LEN(@file)-4)
                        select @ext = 'JPG' -- para compatibilidad
                END
				else if (@cDll= 'CrowPanelMultiMediaPacketParser' OR @cDll= 'SIADC09PacketParser')
                BEGIN
                    PRINT ('[IPRS_VideoLinkParser] es CrowMultimedia, el estado queda en 0');
                        select @rxi_nEstado = 0
                END
				else if (@cDll= 'HipCamPacketParser')
                BEGIN
                    PRINT ('[IPRS_VideoLinkParser] es HipCam');
                        select @rxi_nEstado = 0
                        SELECT @cSaveImageRX = @file
                        select @ext = 'JPG' -- para compatibilidad
                END
                --
                ELSE If @cData <> ''
                BEGIN
                    
                        If Upper(Left(@cData,4))='RA3:' 
                        Begin
                            PRINT ('[IPRS_VideoLinkParser] es RISCO ');
                            declare @cRiscoPanelID varchar(10)
                            select @rxi_nEstado = 0
                            select  @cRiscoPanelID = item from @cdatatable where id = 2
                            If (right(@cRiscoRootPath,1) != '\')
                                set @cRiscoRootPath = @cRiscoRootPath + '\'
                            select @cRiscoRootPath = @cRiscoRootPath+@cRiscoPanelID+'\'
                            select @cSaveImageRX = LTRIM(RTRIM(@cRiscoRootPath))+LTRIM(RTRIM(@file))
                        End 
                    
                END
                ELSE
                BEGIN
                    PRINT ('[IPRS_VideoLinkParser] tomo nombre del archivo por defecto');
                    select @cSaveImageRX = @file
                END
                -- me fijo si es un AVI y lo transformo a MP4
                if (@ext = 'AVI')
                BEGIN
                    select @cSaveImageRX = @MISCFILES+'\SharedImages\PostImages\'+@file
                    --String paquete = fFMpegPars + " |\"" + fFMpegURL + "\"| " + fFMpegArgs;
                    --string parameters = " -hide_banner -loglevel quiet -i \"" + sourceAviFile + "\" -c:v libx264 -preset slow -crf 19 -c:a libvo_aacenc -b:a 128k \"" + destinationFile + "\"";
                    declare @avijson varchar(max)
                    select @avijson = '{'
                    select @avijson += '"ListenerIP":"'+@cListenerIP+'"'
                    select @avijson += ',"ListenerPort":"'+convert(varchar,@cListenerPort)+'"'
                    select @avijson += ',"FFMpegURL":"'+@cSaveImageRX+'"'
                    select @avijson += ',"FFMpegPars":" -hide_banner -loglevel quiet -i"'
                    --select @avijson += ',"FFMpegArgs":" -c:v libx264 -preset slow -crf 19 -c:a aac -b:a 128k '''+replace(@cCarpetaDestino+'/'+@file,'AVI','MP4')+'''"'
					select @avijson += ',"FFMpegArgs":" '''+replace(@cCarpetaDestino+'/'+@file,'AVI','MP4')+'''"'
                    select @avijson += ',"DebugMode":"0"'
					select @avijson += ',"AccountFolder":"'+@cCarpetaDestino+'"' -- DEDALO 02/03/2020 descomento a pedido de Hernan / Pablo
                    select @avijson += '}'
                    Print 'inserto remoteprocess call'
                    insert into _Datos..RemoteCallQueue (rcq_tipo,rcq_url,rcq_config, rcq_fechaprograma,rcq_estado) values ('EXE','TCPClientFFMpeg.exe',@avijson,getdate(),0)
                    print '[IPRS_VideoLinkParser] Cambio el nombre del archivo para que grabe con el nombre del destino de la transformacion'
                    set @ext = 'MP4'
                    select @file = replace(@file,'AVI','MP4')
                    select @cSaveImageRX = replace(@cSaveImageRX,'AVI','MP4')
                END

				if (@ext = 'MP4' and (@cDll ='HIKVISION' OR @cDll = 'HikVisionPacketParser'))
                BEGIN
					print '[IPRS_VideoLinkParser] es MP4 de HIK'
					declare @origfile nvarchar(500)
                    select @cSaveImageRX = @cCarpetaDestino+'\'+@file
					select @origfile = @MISCFILES+'\SharedImages\PostImages\'+@file
					print '[IPRS_VideoLinkParser] Cambio el nombre del archivo para que grabe con el nombre del destino de la transformacion'
                    select @file = replace(@file,'.MP4','_FIX.MP4')
					select @cSaveImageRX = replace(@cSaveImageRX,'.MP4','_FIX.MP4')

                    declare @hikjson varchar(max)
                    select @hikjson = '{'
                    select @hikjson += '"ListenerIP":"'+@cListenerIP+'"'
                    select @hikjson += ',"ListenerPort":"'+convert(varchar,@cListenerPort)+'"'
                    select @hikjson += ',"FFMpegURL":"'+@origfile+'"'
                    select @hikjson += ',"FFMpegPars":" -hide_banner -loglevel quiet -i"'
                    select @hikjson += ',"FFMpegArgs":" -max_muxing_queue_size 9999 -c:v libx264 -preset slow -crf 19 -c:a aac -b:a 128k '''+@cSaveImageRX+'''"'
                    select @hikjson += ',"DebugMode":"0"'
					select @hikjson += '}'
                    Print 'inserto remoteprocess call'
                    insert into _Datos..RemoteCallQueue (rcq_tipo,rcq_url,rcq_config, rcq_fechaprograma,rcq_estado) values ('EXE','TCPClientFFMpeg.exe',@hikjson,getdate(),0)
                    
                END
               
			    PRINT ('[IPRS_VideoLinkParser] inserto en p_RXImg');
                Insert Into _Datos.dbo.p_RXImg (rxi_iRecId,rxi_cImg,rxi_cCarpeta,rxi_nEstado,rxi_ctipo) 
                    Values (@iRecID,@cSaveImageRX,@cCarpetaDestino,@rxi_nEstado,@ext)

				PRINT ('[IPRS_VideoLinkParser] @rxi_nEstado:'+convert(varchar(5),@rxi_nEstado))

                if (@rxi_nEstado = 1)
                BEGIN
                    PRINT ('[IPRS_VideoLinkParser] inserto en p_grabacion_mp4');
                    INSERT INTO [_Datos].[dbo].[p_grabacion_mp4]
                               ([grm_iidCuenta]
                               ,[grm_iidRecepcion]
                               ,[grm_dFechaHora]
                               ,[grm_cCarpeta]
                               ,[grm_cArchivo]
                               ,[grm_cTipo])
                         VALUES
                               (@idCta
                               ,@iRecID
                               ,getdate()
                               ,@cCarpetaDestino
                               ,@file
                               ,@ext)
                    if (@ext = 'JPG' or @ext = 'JPEG')
                    BEGIN
                        -- si tiene extension la limpio
                        if patindex('%'+@ext+'%',@file)>0
                        BEGIN
                            set @file = LEFT (@file, LEN(@file)-4)
                        END
                        PRINT ('[IPRS_VideoLinkParser] inserto en p_grabacion_img');
                        INSERT INTO [_Datos].[dbo].[p_grabacion_img]
                                   ([gri_iidcuenta]
                                   ,[gri_iidrecepcion]
                                   ,[gri_dfechahora]
                                   ,[gri_ccarpeta]
                                   ,[gri_carchivo])
                             VALUES
                                   (@idCta
                                   ,@iRecID
                                   ,getdate()
                                   ,@cPathCarpeta
                                   ,@file)
                    END
                END
        END
        PRINT ('[IPRS_VideoLinkParser] actualizo p_recepcion '+@rec_ccontenido);
        update _datos..p_recepcion set rec_ccontenido=@rec_ccontenido, rec_cObservaciones= @rec_cobservaciones where rec_iid = @iRecID

		PRINT ('[IPRS_VideoLinkParser] si es vigicontrol analizo para duplicar el evento de multimedia');
		print 'Formato : '+ @formato
		print 'Dll : ' + @cDll
		if @cDll= 'VigicontrolPacketParser' and @formato = 'VCMU'
		begin
			print ('[IPRS_VideoLinkParser] busco el evento de asignacion y de ahi la cuenta destino')
			declare @cue int
			--2022-10-12 : Pablo. Porque el select trae mas de un registro y no el ultimo
			/*
			select @cue = rxt_cData from _datos..p_recepcion 
				inner join _datos..p_RXtraInfo on rec_iid = rxt_iRecId
			where rec_calarma = '_DV' and rec_iid < @iRecID and rec_iidcuenta=@idCta
			*/

			select Top 1 @cue = rxt_cData from _datos..p_recepcion 
				inner join _datos..p_RXtraInfo on rec_iid = rxt_iRecId
			where rec_calarma = '_DV' and rec_iid < @iRecID and rec_iidcuenta=@idCta
			Order by rec_iid Desc

			if @cue>0
			BEGIN
				print ('[IPRS_VideoLinkParser] llamo a EventoDuplicar ')
				print 'iRecID : ' + Cast(@iRecID As varchar(10))
				print 'idCuentaDestino : ' + Cast(@cue As varchar(10))
				
				Execute  EventoDuplicar @rec_iid= @iRecID, @idCuentaDestino = @cue
			END
			ELSE
			BEGIN
				print ('[IPRS_VideoLinkParser] no se encontro la cuenta asignada buscando el evento _DV ')
			END

		end
    END 
    PRINT ('[IPRS_VideoLinkParser] FIN');
    Set NoExec Off
End