-- =============================================
-- Author:		Rodrigo Román
-- Create date: 10/08/2015
-- Description:	Generación de reportes automáticos en smartmail
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ReporteAutomaticoExec]

AS
BEGIN
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @DESKTOPEXTERNALURL varchar(250);
	declare @ASUNTOREPORTEAUTOMATICO varchar(250);
	declare @MAILSENDER varchar(250);
	declare @MAILSENDERNAME varchar(250);
	declare @baseurl varchar(4096);
	declare @token varchar(128);
	declare @DDDCCCCASUNTOMAIL int;
	declare @REPAUTRESOLUCION int;
	declare @REPAUTCAT int;
	--declare @REPAUTFIRMA int;
	declare @TIPOREPORTE int;
	declare @cTIPOREPORTE varchar(MAX);
	declare @IDIOMAMSJ varchar(10);

	print 'estado del sistema'
	print @DESKTOPEXTERNALURL
	select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';
	INSERT INTO _datos..[RemoteCallQueue]
           ([rcq_estado]
           ,[rcq_tipo]
           ,[rcq_url])
     VALUES
           (0
           ,'HTTPGET'
           ,@DESKTOPEXTERNALURL+'/handler/SysInfoHandler')

	print 'me fijo si debe ejecutar o no'

	declare @REPORTEAUTOMATICOSERVICE int;
	select  @REPORTEAUTOMATICOSERVICE = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPORTEAUTOMATICOSERVICE';

	-- debe enviar vacios o no
	declare @ENVIAMAILSINEVENTOS int;
	select  @ENVIAMAILSINEVENTOS = par_ivalor from _tablas..t_parametros where par_ccodigo = 'ENVIAMAILSINEVENTOS';


	if (@REPORTEAUTOMATICOSERVICE = 0)
	BEGIN
	SET NOEXEC ON
	RETURN
	END
	
	print 'El servicio está habilitado ejecuto'

	declare @sort varchar(250) = '&sort=[{"property":"r.rec_iid","direction":"DESC"}]'

	select  @ASUNTOREPORTEAUTOMATICO = par_cvalor from _tablas..t_parametros where par_ccodigo = 'ASUNTOREPORTEAUTOMATICO';
	select  @MAILSENDER = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDER';
	select  @MAILSENDERNAME = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDERNAME';
	select  @DDDCCCCASUNTOMAIL = par_ivalor from _tablas..t_parametros where par_ccodigo = 'DDDCCCCASUNTOMAIL';
	select  @REPAUTRESOLUCION = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTRESOLUCION';
	select  @REPAUTCAT = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTCAT';
	--select  @REPAUTFIRMA = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTFIRMA';
	select  @TIPOREPORTE = par_ivalor, @cTIPOREPORTE = par_cValor from _tablas..t_parametros where par_ccodigo = 'TIPOREPORTE';
	select  @IDIOMAMSJ = par_cvalor from _tablas..t_parametros where par_ccodigo = 'IDIOMAMSJ';
    
    -- Agregado 29/08 para ocultar del reporte la columna Cuenta y del encabezado
    declare @OCULTANUMCUENTAREPORTE varchar(1);
    select  @OCULTANUMCUENTAREPORTE = par_ivalor from _tablas..t_parametros where par_ccodigo = 'OCULTANUMCUENTAREPORTE';

	-- buscar el token de un administrador
	-- busco un usuario administrador
	select top 1 @token = t.accesstoken
		from _sistema..usersdesktopweb u 
		inner join _sistema..usersDesktopWebModulos m on u.udw_idkey = m.dwm_idweb
		inner join _desktop..token t on u.udw_usuario = t.userId
		where m.dwm_idmodules = 1
	
	set @token = 'token='+@token

	declare @language varchar(50);
	set @language = '&Language='+@IDIOMAMSJ
	set @baseurl = @DESKTOPEXTERNALURL + '/handler/EventosByCuentaHTML?Limit=2000&fechahoraeventocheck=true&'+@token+@sort+@language	
	IF @TIPOREPORTE = 1
	BEGIN
		set @baseurl = @DESKTOPEXTERNALURL + '/handler/EventosByCuentaNuevoHTML?Limit=2000&fechahoraeventocheck=true&'+@token+@sort+@language
	END

	-- Agrego el @tiporeporte=2 para el tipo de reporte CUSTOM
	IF @TIPOREPORTE = 2
		BEGIN
			set @baseurl = @DESKTOPEXTERNALURL + '/handler/EventosByCuentaNuevoHTML?Limit=2000&fechahoraeventocheck=true&'+@token+@sort+@language

			IF (@cTIPOREPORTE != '1' AND @cTIPOREPORTE != '2' AND @cTIPOREPORTE != '')
				BEGIN
					-- Creo una tabla temporal donde parseo los true de los checks que se tildaron en TIPOREPORTE2
					SELECT * INTO #temptable FROM parseJSON(@cTIPOREPORTE)
				END

		END

	print @baseurl

	-- declaro las variables
	declare @rep_cmail varchar(4000)
	declare @rep_iidcuenta int
	declare @rep_ntipo int
	declare @rep_tproximoenvio date
	declare @rep_nfrecuencia int
	declare @cue_clinea char(3)
	declare @cue_ncuenta char(10)
	declare @rep_idGrupo int
	declare @cue_iZonaHoraria int

	-- envío los diarios

	DECLARE reporteDiario_cursor CURSOR LOCAL FAST_FORWARD FOR
		SELECT 
			rep_cmail
			,rep_iidcuenta
			,rep_ntipo
			,rep_tproximoenvio
			,rep_nfrecuencia
			,cu.cue_clinea
			,cu.cue_ncuenta
			,rep_idGrupo
			,cu.cue_iZonaHoraria
			from _Datos..m_reportes_automaticos s 
				INNER JOIN _Datos..m_estado_cuenta_cab c ON s.rep_iidcuenta = c.est_iidcuenta
				inner join _datos..m_cuentas cu on cu.cue_iid = s.rep_iidcuenta
			where 
			rep_cmail != '' 
			--and rep_ntipo<>4 
			AND DATEADD(dd, 0, DATEDIFF(dd, 0, rep_tproximoenvio))<= getDate()
			AND c.est_nestado = 0
			--and rep_iidcuenta = 3
			--and rep_nfrecuencia = 0
			And rep_nfrecuencia!=6	--6 es Nunca
--2022-12-06 Pablo : al guardar con frecuencia NUNCA igualmente generaba el registro en SmartMail_Program

	OPEN reporteDiario_cursor
	print 'Comienza bucle'
	FETCH NEXT FROM reporteDiario_cursor INTO @rep_cmail
		,@rep_iidcuenta
		,@rep_ntipo
		,@rep_tproximoenvio
		,@rep_nfrecuencia
		,@cue_clinea
		,@cue_ncuenta
		,@rep_idGrupo
		,@cue_iZonaHoraria

	WHILE @@FETCH_STATUS = 0
	BEGIN
		print 'Ciclo'
		print 'rep_ntipo='+convert(varchar,@rep_ntipo)
		declare @envia int = 1;
		print 'si no debo enviar vacios reviso que haya datos'


		-- 03/12/2018 : Modificado para testing de por que no envia bien los emails semanales con o sin eventos
		DECLARE @enviarCada DATETIME;
		SELECT @enviarCada =
			CASE
				when @rep_nfrecuencia = 0      --diario
					  then CONVERT(DATETIME,DATEADD(day, -1, GETDATE()),126)
				when @rep_nfrecuencia = 1      --semanal
					  then CONVERT(DATETIME,DATEADD(day, -7, GETDATE()),126) 
				when @rep_nfrecuencia = 2      --Quincenal
					  then CONVERT(DATETIME,DATEADD(day, -15, GETDATE()),126) 
				when @rep_nfrecuencia = 3		--Mensual
					  then CONVERT(DATETIME,DATEADD(month, -1, GETDATE()),126) 
				when @rep_nfrecuencia = 4		--Trimestral
					  then CONVERT(DATETIME,DATEADD(month, -3, GETDATE()),126) 
				when @rep_nfrecuencia = 5		--Anual
					  then CONVERT(DATETIME,DATEADD(year, -1, GETDATE()),126)
            END
		

		IF (@ENVIAMAILSINEVENTOS = 0)
		BEGIN
			-- no debo enviar mails vacios
			-- me fijo en m_status si hay eventos para esta cuenta
			declare @ultimaalarma datetime = null;
			declare @ultimoevento datetime = null;
			declare @ultimoOC datetime = null;

			select @ultimaalarma = sta_dfechaultimaalerta
				,@ultimoevento = sta_dfechautimaalarma
				,@ultimoOC = sta_dfechaultimooc
				from _datos..m_status where sta_iidcuenta = @rep_iidcuenta

			-- me fijo los eventos segun el reporte a enviar
			if (@rep_ntipo = 0
				AND (@ultimoOC is null or  @ultimoOC <  @enviarCada )
			) 
			BEGIN
				print 'rep_ntipo = 0'
				print @ultimoOC
				print convert(varchar,@ultimoOC,121)
				set @envia = 0
			END

			if (@rep_ntipo = 1
				AND (@ultimaalarma is null or  @ultimaalarma <  @enviarCada)
				)
			BEGIN
				print 'rep_ntipo = 1'
				print @ultimaalarma
				print convert(varchar,@ultimaalarma,121)
				set @envia = 0
			END

			if (@rep_ntipo = 2
				AND (@ultimoevento is null or  @ultimoevento <  @enviarCada)
				) 
			BEGIN
			print 'rep_ntipo = 2'
				print @ultimoevento
				print convert(varchar,@ultimoevento,121)
				set @envia = 0
			END

			if ((@rep_ntipo = 4 or @rep_ntipo = 3)
				AND (@ultimaalarma is null or  @ultimaalarma <  @enviarCada)
				AND (@ultimoevento is null or  @ultimoevento <  @enviarCada)
				AND (@ultimoOC is null or  @ultimoOC < @enviarCada)
				) 
			BEGIN
				print 'rep_ntipo = 4 '
				print @ultimaalarma
				print @ultimoevento
				print @ultimoOC
				print convert(varchar,@ultimaalarma,121)
				print convert(varchar,@ultimoevento,121)
				print convert(varchar,@ultimoOC,121)
				
				set @envia = 0
			END

			print 'cuenta: '+convert(varchar(10), @rep_iidcuenta) + ' estado: '+convert(varchar(1), @envia)
		END

		if (@envia = 1)
		BEGIN

			declare @url varchar(MAX);
			declare @fechadesde varchar(128);
			declare @fechahasta varchar(128);
			declare @tipo varchar(128);

			set @url = @baseurl;
			print 'nueva url en bucle'
			print @url

			-- filtro la cuenta
			set @url = @url + '&Cuentas='+CAST(isnull(@rep_iidcuenta,'') AS varchar(10))
			set @url = @url + '&CuentaReporte='+CAST(isnull(@rep_iidcuenta,'') AS varchar(10))

			print 'post filtro por cuenta : ' + CAST(@url AS VARCHAR(max))

			/*
			 * 03/12/2018 : Modificado para testing de por que no envia bien los emails semanales con o sin eventos
			 *
			 * filtro fecha desde
			set @fechadesde = '&FechaDesde='+ CONVERT(varchar(10),@rep_tproximoenvio,126) 
			select @fechadesde =
				Case
					when @rep_nfrecuencia = 0      --diario
						  then '&FechaDesde='+CONVERT(varchar(10),DATEADD(day, -1, GETDATE()),126)
					when @rep_nfrecuencia = 1      --semanal
						  then '&FechaDesde='+CONVERT(varchar(10),DATEADD(day, -7, GETDATE()),126) 
					when @rep_nfrecuencia = 2      --Quincenal
						  then '&FechaDesde='+CONVERT(varchar(10),DATEADD(day, -15, GETDATE()),126) 
					when @rep_nfrecuencia = 3		--Mensual
						  then '&FechaDesde='+CONVERT(varchar(10),DATEADD(month, -1, GETDATE()),126) 
					when @rep_nfrecuencia = 4		--Trimestral
						  then '&FechaDesde='+CONVERT(varchar(10),DATEADD(month, -3, GETDATE()),126) 
					when @rep_nfrecuencia = 5		--Anual
						  then '&FechaDesde='+CONVERT(varchar(10),DATEADD(year, -1, GETDATE()),126) 
				End

			*/
			set @fechadesde = '&FechaDesde='+ CONVERT(varchar(10),@enviarCada,126) 

			print 'fechadesde : ' + CAST(@fechadesde AS VARCHAR(50))
			print '@rep_tproximoenvio : ' + CAST(@rep_tproximoenvio AS VARCHAR(max))

			print 'me fijo si debo mostrar zona horaria de la cuenta'
			if @cue_iZonaHoraria > 0
			begin
				set @url = @url + '&horacuentacheck=true'
			end

        
			-- filtro fecha hasta
			set @fechahasta = '&FechaHasta='+CONVERT(varchar(10),GETDATE(),126) 
			print 'fechahasta : ' + CAST(@fechahasta AS VARCHAR(50))

			-- filtro el tipo de eventos
			select @tipo =
				Case
					when @rep_ntipo = 0 --Apertura/Cierre
						  then '&tipos=1,2'
					when @rep_ntipo = 1 --Emergencia
						  then '&tipos=0&Alerta=1'
					when @rep_ntipo = 2 --No Emergencia
						  then '&tipos=3,4'
					when @rep_ntipo = 3
						  then '' --Todos
					when @rep_ntipo = 4
						  then '' --Todos
				End

			print 'tipo : ' + CAST(@tipo AS VARCHAR(10)) + CAST(@rep_ntipo AS VARCHAR(10))
	
			set @url = @url +isnull(@fechadesde,'')+isnull(@fechahasta,'')+isnull(@tipo,'')
        
			print 'post agregado de fechadesde/fechahasta/tipo : ' + CAST(@url AS VARCHAR(max))



			-- Agregado 29/08 para ocultar del reporte la columna Cuenta y del encabezado
			IF @OCULTANUMCUENTAREPORTE != ''
				BEGIN
					print '-- Oculto cuenta? 1 si, 0 no'
					print @OCULTANUMCUENTAREPORTE
					set @url = @url + '&ocultaCuenta='+@OCULTANUMCUENTAREPORTE
				END

			/*	IF @REPAUTFIRMA = 1
					BEGIN
						--agrego firma del delaer
						set @url = @url + '&dealerFirma='+@cue_clinea
					END*/

			--armo los datos de parametro REPAUTFIRMA
			DECLARE @REPAUTFIRMA varchar(MAX) = ''
			DECLARE @REPAUTFIRMAOld varchar(MAX) = ''
			DECLARE @FirmaTipo int
			DECLARE @Dealer varchar(3) = ''
        
			/* Se agregan los campos nuevos para la firma personalizada  del Dealer */
			DECLARE @logo int
			DECLARE @logoPers varchar(128) = ''
			DECLARE @textoDealer varchar(MAX) = ''

			select  @REPAUTFIRMA = par_cvalor , @REPAUTFIRMAOld = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTFIRMA';
			/* Prueba para reemplazar los \n del JSON y transformarlo en <br> */
			SELECT @REPAUTFIRMA = REPLACE(@REPAUTFIRMA,'\n','<br>');

			IF @REPAUTFIRMA != ''
				BEGIN
					print 'repautfirma distinto blanco'
					SELECT @FirmaTipo = StringValue FROM dbo.parseJSON(@REPAUTFIRMA) WHERE NAME = 'valor'
					SELECT @Dealer = StringValue FROM dbo.parseJSON(@REPAUTFIRMA) WHERE NAME = 'dealer'

					/* Se agregan los campos nuevos para la firma personalizada del Dealer */
					SELECT @logo = StringValue FROM dbo.parseJSON(@REPAUTFIRMA) WHERE NAME = 'logo'
					SELECT @logoPers = StringValue FROM dbo.parseJSON(@REPAUTFIRMA) WHERE NAME = 'logoPers'
					SELECT @textoDealer = StringValue FROM dbo.parseJSON(@REPAUTFIRMA) WHERE NAME = 'textoDealer'
				END
			ELSE 
				BEGIN 
					print 'repautfirma igual a blanco'
					--si aun se utiliza la confir vieja puede ser 0 o 1 el par_ivalor
					SET @FirmaTipo = @REPAUTFIRMAOld
					print @FirmaTipo
				END

			DECLARE @dealerFirma varchar(3)
        
			IF @FirmaTipo = 2
				BEGIN
					print 'firma tipo 2'
					set @url = @url + '&dealerFirma='+@Dealer
				END

			/* Se agregan los campos nuevos para la firma personalizada  del Dealer */
			-- @logo = 0, logo original
			-- @logo = 1, logo personalizado
			-- @logo = 2, texto personalizado
			IF @FirmaTipo = 1
				BEGIN
					print 'firma tipo 1'
					print '@url : ' + CAST(@url AS VARCHAR(max))


					IF @logo = 0
						BEGIN
							print 'logo tipo 0 '
							set @url = @url + '&dealerFirma='+@cue_clinea
						END
					ELSE IF @logo = 1
						BEGIN
							print 'logo tipo 1 '
							set @url = @url + '&dealerFirma='+@cue_clinea
							set @url = @url + '&logoPers='+@logoPers
						END
                
					set @url = @url + '&textoDealer='+@textoDealer

					print '@url post firma tipo 1 : ' + CAST(@url AS VARCHAR(max));

				END

			IF @rep_idGrupo != ''
				BEGIN
					--agrego firma del delaer
					set @url = @url + '&IdGrupo='+CONVERT(varchar(10), @rep_idGrupo)
				END


			-- Agrego el tipo de reporte 0 (basico) para agregar los 2 check por default
			IF @TIPOREPORTE = 0
				BEGIN

					print 'tipo reporte 0'
					print '@URL : ' + CAST(@url AS VARCHAR(max));    


					IF @REPAUTRESOLUCION = 1
						BEGIN
							--agrego firma del delaer
							set @url = @url + '&Resolucionchk=true'
						END

					IF @REPAUTCAT = 1
						BEGIN
							--agrego firma del delaer
							set @url = @url + '&Categorizacion=true'
						END

					print '@url post tipo reporte 0 : ' + CAST(@url AS VARCHAR(max))
				END

			IF @TIPOREPORTE = 1
				BEGIN
					print 'tipo reporte 1'
					set @url = @url + '&CuentaMadre=true&Origen=true&Categorizacion=true&Observaciones=true&Resolucionchk=true&Timelinechk=true&Llamadaschk=true';
                
				END

			-- 13/02/2019 JUAN : Agregado por si en la actualizacion, se pincha el JSON o para mantener compatibilidad con la version anterior.
			IF ( @TIPOREPORTE = 2 AND (@cTIPOREPORTE != '1' AND @cTIPOREPORTE != '2' AND @cTIPOREPORTE != '') )
				BEGIN
					print 'tipo reporte 2'
					-- Creo las variables correspondiente a todos los tipos de checks que se indicaron deben estar en TIPOPORETE
					DECLARE @origencheck as varchar(max) = ''
					DECLARE @cuentamadrecheck as varchar(max) = ''
					DECLARE @categorizacioncheck as varchar(max) = ''
					DECLARE @observacionescheck as varchar(max) = ''
					DECLARE @operadorcheck as varchar(max) = ''
					DECLARE @resolucioncheck as varchar(max) = ''
					DECLARE @timelinecheck as varchar(max) = ''
					DECLARE @llamadascheck as varchar(max) = ''
					DECLARE @lineatarjeta as varchar(max) = ''
					DECLARE @horacuentacheck as varchar(max) = ''
                
					SELECT * FROM #temptable		

					-- Obtengo de cada check, cual contiene true
					SELECT @origencheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='origencheck')
					if @origencheck != ''
						BEGIN
							SET @url = @url + '&Origen='+@origencheck;
						END

					SELECT @cuentamadrecheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='cuentamadrecheck')
					if @cuentamadrecheck != ''
						BEGIN
							SET @url = @url + '&CuentaMadre='+@cuentamadrecheck;
						END

					SELECT @categorizacioncheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='categorizacioncheck')
					if @categorizacioncheck != ''
						BEGIN
							SET @url = @url + '&Categorizacion='+@categorizacioncheck;
						END

					SELECT @observacionescheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='observacionescheck')
					if @observacionescheck != ''
						BEGIN
							SET @url = @url + '&Observaciones='+@observacionescheck;
						END

					SELECT @operadorcheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='operadorcheck')
					if @operadorcheck != ''
						BEGIN
							SET @url = @url + '&Operadorchk='+@operadorcheck;
						END

					SELECT @resolucioncheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='resolucioncheck')
					if @resolucioncheck != ''
						BEGIN
							SET @url = @url + '&Resolucionchk='+@resolucioncheck;
						END

					SELECT @timelinecheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='timelinecheck')
					if @timelinecheck != ''
						BEGIN
							SET @url = @url + '&Timelinechk='+@timelinecheck;
						END

					SELECT @llamadascheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='llamadascheck')
					if @llamadascheck != ''
						BEGIN
							SET @url = @url + '&Llamadaschk='+@llamadascheck;
						END

					-- BC 379771841 : Agregado del check para Linea de Tarjeta
					SELECT @lineatarjeta = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='lineatarjetacheck')
					IF @lineatarjeta != ''
						BEGIN
							SET @url = @url + '&LineaTarjeta='+@lineatarjeta;
						END

					-- 04/03/2019 : Solicitado por Fernando Canonico, cliente Mexicano
					SELECT @horacuentacheck = StringValue 
						FROM #temptable 
						WHERE NAME = 'value'
							AND parent_ID in (SELECT parent_ID FROM #temptable WHERE StringValue='horacuentacheck')
					IF @horacuentacheck != ''
						BEGIN
							SET @url = @url + '&horacuentacheck='+@horacuentacheck;
						END


				END
		
		
			/* 10/07/2019 - Comento estas lineas, porque entra siempre por el ELSE
			ELSE
				BEGIN
					-- Simulo un Reporte Basico si esta pinchado el JSON o es version anterior
					print 'Simulo un Reporte Basico porque esta pinchado el JSON'
					print '@URL : ' + CAST(@url AS VARCHAR(max));

					IF @REPAUTRESOLUCION = 1
						BEGIN
							--agrego firma del delaer
							set @url = @url + '&Resolucionchk=true'
						END

					IF @REPAUTCAT = 1
						BEGIN
							--agrego firma del delaer
							set @url = @url + '&Categorizacion=true'
						END

				END*/

			print 'ultima url : ' + CAST(@url AS VARCHAR(max))

			-- Se modifica el cuerpo / attach en base a las opciones elegidas en el parametro TIPOREPORTE.
			-- Si esta en blanco o si esta pdfAttach en 0, quiere decir que no esta configurado y debe llegar el mail con el cuerpo completo con la grilla
			-- Si pdfAttach es 1, se debe enviar en formato Attach y el cuerpo del email corresponde a lo escritor en pdfBodyAttach
			DECLARE @pdfAttach INT;
			DECLARE @pdfUrlAttach VARCHAR(MAX);
			DECLARE @pdfBodyAttach VARCHAR(MAX);
			IF COALESCE (@cTIPOREPORTE, '') <> ''
				BEGIN

					-- Guardo en tabla temporal el JSON para el PDF
					SELECT * INTO #temptablePdf FROM parseJSON(@cTIPOREPORTE)

					-- Obtengo el JSON para PDF
					SELECT @pdfAttach = StringValue 
					FROM #temptablePdf 
					WHERE NAME = 'value'
						AND parent_ID in (SELECT parent_ID FROM #temptablePdf WHERE StringValue='pdfAttach')

					SELECT @pdfBodyAttach = StringValue 
					FROM #temptablePdf 
					WHERE NAME = 'value'
						AND parent_ID in (SELECT parent_ID FROM #temptablePdf WHERE StringValue='pdfBodyAttach')

                    DROP TABLE #temptablePdf -- 06/07/2020 FIX Pablo Cas, porque no limpiaba temporal al ser CUSTOM.

				END

			PRINT '@pdfAttach antes del IF ' + CONVERT(VARCHAR(1),@pdfAttach)
			
			IF (@pdfAttach = 1 OR @pdfAttach != '')
				BEGIN
					SET @pdfUrlAttach = @DESKTOPEXTERNALURL + '/handler/Html2PdfNreco?oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&url='+dbo.UrlEncode(@url);
				END
			ELSE
				BEGIN
					SET @pdfBodyAttach = @url;
				END


			PRINT '@pdfAttach' + CONVERT(VARCHAR(3),@pdfAttach)
			PRINT '@pdfUrlAttach' + @pdfUrlAttach
			PRINT '@pdfBodyAttach' + @pdfBodyAttach

			-- inserto programa smartmail
			DECLARE @RC int
			DECLARE @FromName varchar(128) = @MAILSENDERNAME
			DECLARE @FromEmail varchar(128) = @MAILSENDER
			DECLARE @Subject varchar(256) = @ASUNTOREPORTEAUTOMATICO
			DECLARE @Body varchar(4096) = @pdfBodyAttach
			DECLARE @DateStart datetime = GETDATE()
			DECLARE @Count int = 0
			DECLARE @Query varchar(max) = 'Select strval As Email From _Datos.dbo.ParseArray('''+@rep_cmail+''','';'')'
			DECLARE @TransportType varchar(64) = 'MAIL'
			DECLARE @Attachments varchar(2048) = @pdfUrlAttach
			DECLARE @Priority int = 700

			print '@@DDDCCCCASUNTOMAIL' + CAST(@DDDCCCCASUNTOMAIL AS VARCHAR(max));

			if (@DDDCCCCASUNTOMAIL = 0)
			BEGIN
				select @Subject = '['+@cue_clinea+'-'+@cue_ncuenta+'] ' + @Subject
			END

			-- TODO: Set parameter values here.
			EXECUTE @RC = [_datos].[dbo].[SmartMail_ProgramCreate]
				@FromName
				,@FromEmail
				,@Subject
				,@Body
				,@DateStart
				,@Count
				,@Query
				,@TransportType
				,@Attachments
				,@Priority
				,@rep_iidcuenta


			print '@RC ' + CAST(@RC AS VARCHAR(max));
			print '@FromName ' + CAST(@FromName AS VARCHAR(max));
			print '@FromEmail ' + CAST(@FromEmail AS VARCHAR(max));
			print '@Subject ' + CAST(@Subject AS VARCHAR(max));
			print '@Body ' + CAST(@Body AS VARCHAR(max));
			print '@DateStart ' + CAST(@DateStart AS VARCHAR(max));
			print '@Count ' + CAST(@Count AS VARCHAR(max));
			print '@Query ' + CAST(@Query AS VARCHAR(MAX));
			print '@TransportType ' + CAST(@TransportType AS VARCHAR(max));
			print '@Attachments ' + CAST(@Attachments AS VARCHAR(max));
			print '@Priority ' + CAST(@Priority AS VARCHAR(max));
			print '@rep_iidcuenta ' + CAST(@rep_iidcuenta AS VARCHAR(max));

		END

        -- actualizo fecha reporteautomatico
        update _Datos..m_reportes_automaticos set rep_tproximoenvio = 
            Case
                when @rep_nfrecuencia = 0      --diario
                    then DATEADD(day, 1, GETDATE())
                when @rep_nfrecuencia = 1      --semanal
                    then DATEADD(day, 7, GETDATE())
                when @rep_nfrecuencia = 2      --Quincenal
                    then DATEADD(day, 15, GETDATE())
                when @rep_nfrecuencia = 3		--Mensual
                    then DATEADD(month, 1, GETDATE())
                when @rep_nfrecuencia = 4		--Trimestral
                    then DATEADD(month, 3, GETDATE())
                when @rep_nfrecuencia = 5		--Anual
                    then DATEADD(year, 1, GETDATE())
            End
            where rep_iidcuenta = @rep_iidcuenta

            
        FETCH NEXT FROM reporteDiario_cursor INTO @rep_cmail
            ,@rep_iidcuenta
            ,@rep_ntipo
            ,@rep_tproximoenvio
            ,@rep_nfrecuencia
            ,@cue_clinea
            ,@cue_ncuenta
            ,@rep_idGrupo
			,@cue_iZonaHoraria
			
	END
	CLOSE reporteDiario_cursor;
	DEALLOCATE reporteDiario_cursor;


	set noexec off
	-- actualizo tabla de tareas con la ultima ejecución
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ReporteAutomaticoExec', @Repetition = 1440
	
END