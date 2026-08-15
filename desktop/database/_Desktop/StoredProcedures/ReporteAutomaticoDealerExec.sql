-- =============================================
-- Author:		Juan Bonforti
-- Create date: 11/03/2019@
-- Description:	Generación de reportes automáticos en smartmail
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ReporteAutomaticoDealerExec]

AS
BEGIN
	SET NOCOUNT ON;

	--2025-06-30 Pablo, en algunos clientes con mucha cantidad de trafico el limite por defeault de 1000 deja registros afuera
	declare @limit varchar(10) = '3000'	--'1000' 

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
	declare @TIPOREPORTE int;
	declare @cTIPOREPORTE varchar(MAX);
	declare @IDIOMAMSJ varchar(10);

	select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';
	
	-- me fijo si debe ejecutar o no
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


	--declare @sort varchar(250) = '&sort=[{"property":"r.rec_iid","direction":"DESC"}]'

	select  @ASUNTOREPORTEAUTOMATICO = par_cvalor from _tablas..t_parametros where par_ccodigo = 'ASUNTOREPORTEAUTOMATICO';
	select  @MAILSENDER = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDER';
	select  @MAILSENDERNAME = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDERNAME';
	select  @DDDCCCCASUNTOMAIL = par_ivalor from _tablas..t_parametros where par_ccodigo = 'DDDCCCCASUNTOMAIL';
	select  @REPAUTRESOLUCION = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTRESOLUCION';
	select  @REPAUTCAT = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTCAT';
	select  @TIPOREPORTE = par_ivalor, @cTIPOREPORTE = par_cValor from _tablas..t_parametros where par_ccodigo = 'TIPOREPORTEDEALER';
	select  @IDIOMAMSJ = par_cvalor from _tablas..t_parametros where par_ccodigo = 'IDIOMAMSJ';

	-- buscar el token de un administrador
	-- busco un usuario administrador
	select top 1 @token = t.accesstoken
		from _sistema..usersdesktopweb u 
		inner join _sistema..usersDesktopWebModulos m on u.udw_idkey = m.dwm_idweb
		inner join _desktop..token t on u.udw_usuario = t.userId
		where m.dwm_idmodules = 1
	
	set @token = 'oauth_token='+@token

	-- Seteo lenguaje
	declare @language varchar(50);
	set @language = '&Language='+@IDIOMAMSJ
	

	-- declaro las variables
	declare @rad_cmail varchar(4000)
	declare @rad_linidkey int
	declare @rad_idKey int
	declare @rad_ntipo int
	declare @rad_tproximoenvio date
	declare @rad_nfrecuencia int
	declare @lin_ccodigo char(3)
	declare @cue_ncuenta char(10)
	declare @rad_idGrupo int
	declare @rad_nAlerta int

	-- envío los diarios
	DECLARE reporteDiario_cursor CURSOR FOR 
		SELECT 
			 rad_idKey
			,rad_cmail
			,rad_linidkey
			,rad_ntipo
			,rad_tproximoenvio
			,rad_nfrecuencia
			,t.lin_ccodigo
			,rad_idGrupo
			,rad_nAlerta
		from _Datos..m_reportes_automaticos_dealer s 
			LEFT JOIN _tablas..t_lineas t ON (t.lin_idKey = s.rad_linidkey)
		where rad_cmail != '' 
			AND DATEADD(dd, 0, DATEDIFF(dd, 0, rad_tproximoenvio))<= getDate() 
	
	OPEN reporteDiario_cursor
	print 'Comienza bucle'

	FETCH NEXT FROM reporteDiario_cursor INTO 
		@rad_idKey
		,@rad_cmail
		,@rad_linidkey
		,@rad_ntipo
		,@rad_tproximoenvio
		,@rad_nfrecuencia
		,@lin_ccodigo
		,@rad_idGrupo
		,@rad_nAlerta

	
	WHILE @@FETCH_STATUS = 0
	BEGIN
	   PRINT 'ITERANDO!!!!!!!!!!!!!!!!!!!!!!!!'
		
		-- Declaro el Handler del reporte a ser utilizado
		-- @TIPOREPORTE = 0 (Basico)
		-- @TIPOREPORTE = 1 (Completo)
		-- @TIPOREPORTE = 2 (Custom)
		IF @TIPOREPORTE = 0
			BEGIN
				set @baseurl = @DESKTOPEXTERNALURL + '/handler/EventosByCuentaHTML?Limit='+@limit+'&'+@token+@language	
			END
		IF @TIPOREPORTE = 1
			BEGIN
				set @baseurl = @DESKTOPEXTERNALURL + '/handler/EventosByCuentaHTML?Limit='+@limit+'&'+@token+@language
			END
		IF @TIPOREPORTE = 2
			BEGIN
				set @baseurl = @DESKTOPEXTERNALURL + '/handler/EventosByCuentaHTML?Limit='+@limit+'&'+@token+@language

				IF (@cTIPOREPORTE != '1' AND @cTIPOREPORTE != '2' AND @cTIPOREPORTE != '')
					BEGIN
						-- Creo una tabla temporal donde parseo los true de los checks que se tildaron en TIPOREPORTE2
						SELECT * INTO #temptable FROM parseJSON(@cTIPOREPORTE)
					END
			END
		/*********** https://basecamp.com/2249105/projects/14758734/todos/422355404 ***************************/

		/*************************************/
		if @rad_ntipo = 5
			begin
				set @baseurl = @DESKTOPEXTERNALURL + '/handler/ReporteSumarioDealersHTML?'+@token
			end

		print 'Ciclo'
		print 'rep_ntipo='+convert(varchar,@rad_ntipo)
		declare @envia int = 1;
		print 'si no debo enviar vacios reviso que haya datos'

		DECLARE @enviarCada DATETIME;
		SELECT @enviarCada =
			CASE
				when @rad_nfrecuencia = 0      --diario
					  then CONVERT(DATETIME,DATEADD(day, -1, GETDATE()),126)
				when @rad_nfrecuencia = 1      --semanal
					  then CONVERT(DATETIME,DATEADD(day, -7, GETDATE()),126) 
				when @rad_nfrecuencia = 2      --Quincenal
					  then CONVERT(DATETIME,DATEADD(day, -15, GETDATE()),126) 
				when @rad_nfrecuencia = 3		--Mensual
					  then CONVERT(DATETIME,DATEADD(month, -1, GETDATE()),126) 
				when @rad_nfrecuencia = 4		--Trimestral
					  then CONVERT(DATETIME,DATEADD(month, -3, GETDATE()),126) 
				when @rad_nfrecuencia = 5		--Anual
					  then CONVERT(DATETIME,DATEADD(year, -1, GETDATE()),126)
            END
			

		IF (@ENVIAMAILSINEVENTOS = 0)
		BEGIN
			-- no debo enviar mails vacios
			-- me fijo en m_status si hay eventos para esta cuenta
			declare @ultimaalarma datetime = null;
			declare @ultimoevento datetime = null;
			declare @ultimoOC datetime = null;


			-- 21/05 : Modificación del Query para obtencion de fechas por separado
			-- @ultimaAlarma
			SELECT TOP 1 @ultimaalarma = sta_dfechaultimaalerta
			FROM _datos..m_status m
				INNER JOIN _Datos..m_cuentas c ON (c.cue_iid = m.sta_iidcuenta)
				INNER JOIN _Tablas..t_lineas t ON (t.lin_ccodigo = cue_clinea)
			WHERE t.lin_idKey = @rad_linidkey
			ORDER BY sta_dfechaultimaalerta DESC

			-- @ultimoEvento
			SELECT TOP 1 @ultimoevento = sta_dfechautimaalarma
			FROM _datos..m_status m
				INNER JOIN _Datos..m_cuentas c ON (c.cue_iid = m.sta_iidcuenta)
				INNER JOIN _Tablas..t_lineas t ON (t.lin_ccodigo = cue_clinea)
			WHERE t.lin_idKey = @rad_linidkey
			ORDER BY sta_dfechautimaalarma DESC

			-- @ultimoOC
			SELECT TOP 1 @ultimoOC = sta_dfechaultimooc
			FROM _datos..m_status m
				INNER JOIN _Datos..m_cuentas c ON (c.cue_iid = m.sta_iidcuenta)
				INNER JOIN _Tablas..t_lineas t ON (t.lin_ccodigo = cue_clinea)
			WHERE t.lin_idKey = @rad_linidkey
			ORDER BY sta_dfechaultimooc DESC


			-- me fijo los eventos segun el reporte a enviar
			if (@rad_ntipo = 0
				AND (@ultimoOC is null or  @ultimoOC <  @enviarCada )
			) 
				BEGIN
					print 'rep_ntipo = 0'
					print @ultimoOC
					print convert(varchar,@ultimoOC,121)
					set @envia = 0
				END

			if (@rad_ntipo = 1 AND (@ultimaalarma is null or  @ultimaalarma <  @enviarCada) )
				BEGIN
					print 'rep_ntipo = 1'
					print @ultimaalarma
					print convert(varchar,@ultimaalarma,121)
					set @envia = 0
				END

			if (@rad_ntipo = 2
				AND (@ultimoevento is null or  @ultimoevento <  @enviarCada)
				) 
				BEGIN
				print 'rep_ntipo = 2'
					print @ultimoevento
					print convert(varchar,@ultimoevento,121)
					set @envia = 0
				END

			if ((@rad_ntipo = 4 or @rad_ntipo = 3)
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

			print 'cuenta: '+convert(varchar(10), @rad_linidkey) + ' estado: '+convert(varchar(1), @envia)
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

			-- filtro fecha desde / hasta
			set @fechadesde = '&FechaDesde='+ CONVERT(varchar(10),@enviarCada,126) 
			set @fechahasta = '&FechaHasta='+CONVERT(varchar(10),GETDATE(),126) 
        
			print 'fechahasta : ' + CAST(@fechahasta AS VARCHAR)
			print 'fechadesde : ' + CAST(@fechadesde AS VARCHAR)
			print '@rep_tproximoenvio : ' + CAST(@rad_tproximoenvio AS VARCHAR)

       
			-- Agrego agrupamiento por cue_iid, a qué Dealer es el reporte y el flag de reporteAutomatico
			set @url = @url + '&Dealer='+@lin_ccodigo
			set @url = @url + '&agrupar=cue_iid&reporteautomatico=true'

			-- filtro el tipo de eventos
			select @tipo =
				Case
					when @rad_ntipo = 0 --Apertura/Cierre
						  then '&tipos=1,2'
					when @rad_ntipo = 1 --Emergencia
						  then '&tipos=0&Alerta=1'
					when @rad_ntipo = 2 --No Emergencia
						  then '&tipos=3,4'
					when @rad_ntipo = 3
						  then '' --Todos
					when @rad_ntipo = 4
						  then '' --Todos
					/*********** https://basecamp.com/2249105/projects/14758734/todos/422355404 ***************************/
					when @rad_ntipo=5
						  then '' --Sumario
					/*************************************/
				End

			print 'tipo : ' + CAST(@tipo AS VARCHAR) + CAST(@rad_ntipo AS VARCHAR)
			print '@url : ' + @url
			set @url = @url +isnull(@fechadesde,'')+isnull(@fechahasta,'')+isnull(@tipo,'')
			print '@url : ' + @url
			print 'post agregado de fechadesde/fechahasta/tipo : ' + CAST(@url AS VARCHAR)


			--armo los datos de parametro REPAUTFIRMA
			DECLARE @REPAUTFIRMA varchar(MAX)
			DECLARE @REPAUTFIRMAOld varchar(MAX)
			DECLARE @FirmaTipo int
			DECLARE @Dealer varchar(3)
        
			/* Se agregan los campos nuevos para la firma personalizada  del Dealer */
			DECLARE @logo int
			DECLARE @logoPers varchar(128)
			DECLARE @textoDealer varchar(MAX)

			select  @REPAUTFIRMA = par_cvalor , @REPAUTFIRMAOld = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTFIRMADEALER';
			/* Prueba para reemplazar los \n del JSON y transformarlo en <br> */
			SELECT @REPAUTFIRMA = REPLACE(@REPAUTFIRMA,'\n','<br>');

			IF ( @REPAUTFIRMA != '' )
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
        
			IF ( @FirmaTipo = 2 )
				BEGIN
					print 'firma tipo 2'
					set @url = @url + '&dealerFirma='+@Dealer
				END

			/* Se agregan los campos nuevos para la firma personalizada  del Dealer */
			-- @logo = 0, logo original
			-- @logo = 1, logo personalizado
			-- @logo = 2, texto personalizado
			IF ( @FirmaTipo = 1 )
				BEGIN
					print 'firma tipo 1'
					print '@url : ' + @url
					print '@logo : ' + CONVERT(varchar(10), @logo)

					IF @logo = 0
						BEGIN
							print 'logo tipo 0 '
							set @url = @url + '&dealerFirma='+@lin_ccodigo
						END
                
					IF @logo = 1
						BEGIN
							print 'logo tipo 1 '
							set @url = @url + '&dealerFirma='+@lin_ccodigo
							set @url = @url + '&logoPers='+@logoPers
						END
                
					set @url = @url + '&textoDealer='+@textoDealer

					print '@url post firma tipo 1 : ' + @url

				END

			IF ( @rad_idGrupo != '' )
				BEGIN
					--agrego firma del delaer
					set @url = @url + '&IdGrupo='+CONVERT(varchar(10), @rad_idGrupo)
				END

			-- Agregado de checks según @TipoReporte
			print '@URL Previo a agregar Checks: ' + CAST(@url AS VARCHAR);

			IF ( @TIPOREPORTE = 0 )
				BEGIN
					print 'tipo reporte 0'
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
				END
			IF ( @TIPOREPORTE = 1 )
				BEGIN
					print 'tipo reporte 1'
					set @url = @url + '&origen=true&Categorizacion=true&Observaciones=true&Resolucionchk=true&Timelinechk=true&Llamadaschk=true&Operadorchk=true&LineaTarjeta=true&horacuentacheck=true';
				END
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

			-- Agregado para el condicional de Cuentas con Alerta
			IF ( @rad_nAlerta = 1 )
				BEGIN
					SET @url = @url + '&mostrarEventoAlarma=1';
				END
		
			print 'ultima url : ' + @url

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
			DECLARE @Query varchar(max) = 'Select strval As Email From _Datos.dbo.ParseArray('''+@rad_cmail+''','';'')'
			DECLARE @TransportType varchar(64) = 'MAIL'
			DECLARE @Attachments varchar(MAX) = @pdfUrlAttach
			DECLARE @Priority int = 710

			print '@@DDDCCCCASUNTOMAIL' + CAST(@DDDCCCCASUNTOMAIL AS VARCHAR);

			if (@DDDCCCCASUNTOMAIL = 0)
			BEGIN
				select @Subject = '['+@lin_ccodigo+'-'+@rad_linidkey+'] ' + @Subject
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
				--,@rad_linidkey -- aca va el id de la cuenta

			print '@RC ' + CAST(@RC AS VARCHAR);
			print '@FromName ' + CAST(@FromName AS VARCHAR);
			print '@FromEmail ' + CAST(@FromEmail AS VARCHAR);
			print '@Subject ' + CAST(@Subject AS VARCHAR);
			print '@Body ' + CAST(@Body AS VARCHAR);
			print '@DateStart ' + CAST(@DateStart AS VARCHAR);
			print '@Count ' + CAST(@Count AS VARCHAR);
			print '@Query ' + CAST(@Query AS VARCHAR(MAX));
			print '@TransportType ' + CAST(@TransportType AS VARCHAR);
			print '@Attachments ' + CAST(@Attachments AS VARCHAR);
			print '@Priority ' + CAST(@Priority AS VARCHAR);
			--print '@rep_iidcuenta ' + CAST(@rad_linidkey AS VARCHAR);

		END

        -- actualizo fecha reporteautomatico
       
	   update _Datos..m_reportes_automaticos_dealer set rad_tproximoenvio = 
            Case
                when @rad_nfrecuencia = 0 --diario
                    then DATEADD(day, 1, GETDATE())
				when @rad_nfrecuencia = 1 --semanal
                    then DATEADD(day, 7, GETDATE())
				when @rad_nfrecuencia = 2 --quincenal
                    then DATEADD(day, 15, GETDATE())
				when @rad_nfrecuencia = 3 --mensual
                    then DATEADD(MONTH, 1, GETDATE())
            End
            where rad_linidkey = @rad_linidkey and rad_idKey = @rad_idKey
			
	    -- Limpio tablas temporales
		
		IF OBJECT_ID('tempdb..#temptable') IS NOT NULL DROP TABLE #temptable
		IF OBJECT_ID('tempdb..#temptablePdf') IS NOT NULL DROP TABLE #temptablePdf

        FETCH NEXT FROM reporteDiario_cursor INTO 
			@rad_idKey
			,@rad_cmail
			,@rad_linidkey
			,@rad_ntipo
			,@rad_tproximoenvio
			,@rad_nfrecuencia
			,@lin_ccodigo
			,@rad_idGrupo
			,@rad_nAlerta
			
	END
	
	CLOSE reporteDiario_cursor;
	DEALLOCATE reporteDiario_cursor;

	set NOEXEC OFF
	-- actualizo tabla de tareas con la ultima ejecución
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ReporteAutomaticoDealerExec', @Repetition = 1440
	
END