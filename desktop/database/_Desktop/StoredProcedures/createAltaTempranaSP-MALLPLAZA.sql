-- =============================================================================================================
-- Author:		JUAN BONFORTI
-- Create date: 02/10/2019
-- Description:	Alta de Cuenta + SP (Alta Temprana) para importador en Saint Tomas
-- Adaptación:   Usa tabla MALL..[0 CONSOLIDADO DATOS ALTA TEMPRANA SMARTPANICS]
--               La cuenta YA existe (IdCuenta = cue_iid), solo crea SmartPanics, m_sms, AWCC y mails
-- =============================================================================================================
CREATE OR ALTER PROCEDURE [dbo].[createAltaTempranaSP-MALLPLAZA] 
	@dealer char(3) = 'OAA'
AS
BEGIN
	SET NOCOUNT ON;

	IF (@dealer <> '')
	BEGIN

		/**
		 * DEFINIR TODOS LOS STD A LOS USUARIOS COMO SI FUESE MODIFICAR.JS
		 */
		DECLARE @plantillaSP     varchar(3)   = '_SP';
		DECLARE @groupMax        varchar(3)   = '1';
		DECLARE @nombreApp       varchar(25)  = 'SmartPanics'; -- Reemplazar por el nombre de la App deseada.
		DECLARE @mailTo          varchar(max) = 'implementacion@softguard.com'; -- Reemplazar por el mail de la central
		DECLARE @automonitoreo   varchar(2)   = 'no';
		DECLARE @diasprueba      int          = 0;
		DECLARE @cuentatipo      varchar(128) = '009';
		DECLARE @enviarEmail     varchar(2)   = 'si'; -- Reemplazar para enviar o no el mail de alta (no/si)

		/* Datos Fijos - Revisar antes de la migracion */
		DECLARE @awcc      int          = 1;     -- Fijo en si.
		DECLARE @pais      int          = 1;     -- Fijo en Argentina REVISAR EN CLIENTE
		DECLARE @provincia varchar(128) = '002'; -- pro_ccodigo REVISAR EN CLIENTE.

		/**
		 * FIN DE LA DEFINICION MANUAL
		 */

		/** Obtengo el nombre del PAIS y PROVINCIA */
		DECLARE @paisElegido      varchar(32) = '';
		DECLARE @provinciaElegido varchar(32) = '';

		SELECT @paisElegido = pro_cdescripcion
		FROM   [_tablas].[dbo].[t_provincias]
		WHERE  ISNUMERIC(pro_ccodigo) = 1
		   AND pro_ccodigo = @pais;

		SELECT @provinciaElegido = pro_cdescripcion
		FROM   [_tablas].[dbo].[t_provincias]
		WHERE  pro_ccodigo   = @provincia
		   AND pro_iParentID = @pais;

		/** Datos para enviar el email */
		DECLARE @mailSubject         varchar(300) = '';
		DECLARE @mailBody            varchar(max) = '';
		DECLARE @mailSubjectCustomer varchar(300) = '';
		DECLARE @mailBodyCustomer    nvarchar(max) = '';

		SELECT @mailSubject = Subject
		FROM   [_Datos].[dbo].[SmartMail_Template]
		WHERE  Name = 'MailBodyTemplate';

		SELECT @mailBody = HtmlBody
		FROM   [_Datos].[dbo].[SmartMail_Template]
		WHERE  Name = 'MailBodyTemplate';

		SELECT @mailSubjectCustomer = Subject
		FROM   [_Datos].[dbo].[SmartMail_Template]
		WHERE  Name = 'MailBodyCustomerTemplate';

		SELECT @mailBodyCustomer = HtmlBody
		FROM   [_Datos].[dbo].[SmartMail_Template]
		WHERE  Name = 'MailBodyCustomerTemplate';

		DECLARE @MAILSENDER     varchar(250);
		DECLARE @MAILSENDERNAME varchar(250);

		SELECT @MAILSENDER = par_cvalor
		FROM   _tablas..t_parametros
		WHERE  par_ccodigo = 'MAILSENDER';

		SELECT @MAILSENDERNAME = par_cvalor
		FROM   _tablas..t_parametros
		WHERE  par_ccodigo = 'MAILSENDERNAME';
	
		/**
		 * Variables que se completan en cada bucle
		 */
		DECLARE @parcelaNumero    varchar(10);
		DECLARE @nombre           varchar(60);
		DECLARE @email            varchar(150);
		DECLARE @direccion        varchar(300);
		DECLARE @nombreDispositivo varchar(50);
		DECLARE @telefono         varchar(128);
		DECLARE @comentario       varchar(300);
		DECLARE @iid              int;          -- cue_iid de la cuenta, viene de IdCuenta		
		DECLARE @activationLink  nvarchar(500);

		/* Cursor sobre la tabla nueva del MALL */
		DECLARE altaTemprana_cursor CURSOR FOR 
			SELECT
				 CAST([CUENTA]                 AS varchar(10))  -- @parcelaNumero
				,CAST([NOMBRE]                 AS varchar(60))  -- @nombre
				,CAST([EMAIL DE AVISO DE ALTA] AS varchar(150)) -- @email
				,CAST(''                       AS varchar(300)) -- @direccion (no viene en tabla)
				,CAST([NOMBRE]                 AS varchar(50))  -- @nombreDispositivo
				,CAST([TELEFONO]               AS varchar(128)) -- @telefono
				,CAST(''                       AS varchar(300)) -- @comentario
				,CAST([IdCuenta]               AS int)          -- @iid
			FROM [MALL].[dbo].[EXT]
			WHERE [DEALER] = @dealer;

		OPEN altaTemprana_cursor;
		PRINT 'Comienza bucle de importacion';

		FETCH NEXT FROM altaTemprana_cursor INTO 
			 @parcelaNumero
			,@nombre
			,@email
			,@direccion
			,@nombreDispositivo
			,@telefono
			,@comentario
			,@iid;

		WHILE @@FETCH_STATUS = 0
		BEGIN
			/** 
			 * Consulto si el telefono a importar existe ya como dispositivo asociado en SP.
			 * De existir, no realizo ninguna accion y sigo al siguiente registro a importar
			 */
			DECLARE @telefonoSPExiste varchar(20) = '';

			SELECT @telefonoSPExiste = Telefono
			FROM   _Datos..SmartPanic
			WHERE  Telefono = @telefono;

			IF (@telefonoSPExiste IS NULL OR @telefonoSPExiste = '')
			BEGIN
				PRINT 'El telefono no existe, proceso alta de SmartPanics sobre cuenta existente';

				-- observacion no puede ser NULL
				SET @comentario = ISNULL(@comentario,'');

				-- Validaciones básicas de la cuenta
				IF (@iid IS NULL)
				BEGIN
					PRINT 'El IdCuenta viene NULL. Se omite este registro.';
				END
				ELSE IF NOT EXISTS (SELECT 1 FROM _Datos..m_cuentas WHERE cue_iid = @iid)
				BEGIN
					PRINT 'La cuenta con cue_iid ' + CAST(@iid AS varchar(10)) + ' no existe en _Datos..m_cuentas. Se omite este registro.';
				END
				ELSE
				BEGIN
					/* 
					 * A partir de acá, solo lógica de SmartPanics / m_sms / AWCC / mails.
					 * NO se crea cuenta nueva.
					 */

					-- CREANDO EL SMARTPANICS
					DECLARE @configSmartPanic varchar(256);

					IF (@groupMax > 0)
					BEGIN
						PRINT 'El valor de groupMax es mayor a 0';
						SET @configSmartPanic = '{"groupEnabled":1, "groupMax":'+@groupMax+', "funcMiGrupo":1}';
					END

					DECLARE @smartpid int;

					INSERT INTO _datos.dbo.SmartPanic 
						( [Telefono]
						, [CuentaId]
						, [Nombre]
						, [Linea]
						, [Imei]
						, [Config])
					VALUES 
						( @telefono
						, @iid
						, @nombreDispositivo
						, @dealer
						, ''
						, @configSmartPanic);

					SELECT @smartpid = SCOPE_IDENTITY();
					PRINT 'Cree el dispositivo SP con id: ' + CAST(@smartpid AS varchar(10));

					-- Actualizo y le asigno una cuenta al SmartPanics
					EXEC [_Desktop].[dbo].[SearchSmartPanicAsignarCuenta]
							@smartpid,
							@iid;
-- ======================================================
-- Genero los mismos links que el SmartPanicAltaEvent
-- ======================================================
DECLARE @baseQr        nvarchar(200) = N'https://gcs.softguard.com:443';
DECLARE @baseAct       nvarchar(200) = N'https://softguard.com/spapps/index.html?code=/';
DECLARE @qrCodeLink    nvarchar(1000);
DECLARE @qrCodeImgLink nvarchar(1000);

-- codifico espacios del nombre como %20 (simple)
DECLARE @nombreUrl nvarchar(200) = REPLACE(@nombre, N' ', N'%20');

-- Path base usado en el parámetro "code"
DECLARE @codePath nvarchar(500) = @baseQr + N'/' + @nombreUrl + N'/' + @telefono;

-- 1) URL base del handler (la que genera HTML)
SET @qrCodeLink =
    @baseQr
    + N'/handler/QrCodeHandler?title=' + @nombreUrl
    + N'&code=/' + @codePath;

-- 2) URL SOLO IMAGEN (la que va al <img> del mail)
SET @qrCodeImgLink = @qrCodeLink + N'&getImage=true&forceqr=true';

-- 3) Link de activación
SET @activationLink = @baseAct + @codePath;

PRINT 'qrCodeLink generado: '     + @qrCodeLink;
PRINT 'qrCodeImgLink generado: '  + @qrCodeImgLink;
PRINT 'activationLink generado: ' + @activationLink;

					-- Genero las notificaciones para los eventos de SmartPanics
					DECLARE @maxId int;

					SELECT @maxId = ISNULL(MAX(sms_iid),0) + 1
					FROM   _datos.dbo.m_sms;

					INSERT INTO _datos.dbo.m_sms 
						( sms_iid
						, [sms_iidcuenta]
						, [sms_meventos]
						, [sms_cplantillapush]
						, [sms_cidspushsmartpanic] )
					VALUES 
						( @maxId
						, @iid
						, 'S51,S53,S55,S60,S67,S69,S72,_EG,_IG'
						, @plantillaSP
						, @smartpid );
					PRINT 'Genere las notificaciones de SP';

					-- Si AWCC = 1 asigno modulos
					IF (@awcc = 1)
					BEGIN
						PRINT 'El valor de @awcc, ' + CONVERT(varchar(1),@awcc);

						INSERT INTO [_Sistema]..[UsersDesktopWeb]
							( [udw_usuario]
							, [udw_clave]
							, [udw_nombre]
							, [udw_apellido]
							, [udw_empresa]
							, [udw_tipo]
							, [udw_metadata]
							, [udw_iperfil] )
						VALUES 
							( @email
							, ''
							, @nombre
							, ''
							, ''
							, 2
							, '{"controlaIp":2,"language":"es-ar","provincia":{"nombre":"","id":null}}'
							, '' );                 

						DECLARE @IdWeb int;

						SET @IdWeb = SCOPE_IDENTITY();
						PRINT 'Realizado el insert en UserDesktopWeb con Id ' + CONVERT(varchar(10),@IdWeb);

						-- asigno el usuario awcc al smartpanic
						UPDATE _datos.dbo.SmartPanic
						SET    awccUserId = @IdWeb
						WHERE  Id = @smartpid;

						PRINT 'Se actualizo el usuario AWCC al SmartPanics';
                                                    
						INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
							( [dwm_idWeb]
							, [dwm_idModules]
							, [dwm_idTabla]
							, [dwm_dealer]
							, [dwm_cuenta_desde]
							, [dwm_cuenta_hasta]
							, [dwm_data] )
						VALUES 
							( @IdWeb
							, 8
							, ''
							, ''
							, ''
							, ''
							, '' );

						EXEC [_Desktop].[dbo].[UsersDesktopWebSel] @IdWeb;
						PRINT 'Realizado el insert en UserDesktopWebModules del Modulo con Id 8';

						-- Asigno Rangos al USUARIO
						INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
							( [dwm_idWeb]
							, [dwm_idModules]
							, [dwm_idTabla]
							, [dwm_dealer]
							, [dwm_cuenta_desde]
							, [dwm_cuenta_hasta]
							, [dwm_data] )
						VALUES
							( @IdWeb
							, 0
							, ''
							, @dealer
							, @parcelaNumero
							, @parcelaNumero
							, '' );
						PRINT 'Asigne rangos al usuario';
                        
						-- Asigno el modulo AWCC
						INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
							( [dwm_idWeb]
							, [dwm_idModules]
							, [dwm_idTabla]
							, [dwm_dealer]
							, [dwm_cuenta_desde]
							, [dwm_cuenta_hasta]
							, [dwm_data] )
						VALUES
							( @IdWeb
							, 11
							, ''
							, ''
							, ''
							, ''
							, '' );
						PRINT 'Realizado el insert en UserDesktopWebModules del Modulo con Id 11';
                
						-- Agrego modulo AWCC el cual tiene CUENTA, Reporte Historico y Reporte de Imagenes en modo Lectura
						INSERT INTO [_Sistema]..[UsersDesktopWebModulosSecurity]
							( [ums_idWeb]
							, [ums_idModules]
							, [ums_data] )
						VALUES 
							( @IdWeb
							, 11
							, '{"modules":[{"text":"Cuenta","iconCls":"icon-cuenta","leaf":true,"url":"","class":"","view":"cuentaformview","profile":"1","closable":false,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Usuarios","iconCls":"icon-usuarios","leaf":true,"url":"","class":"","view":"griduser","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Contactos","iconCls":"icon-telefonos","leaf":true,"url":"","class":"","view":"gridphones","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Zonas","iconCls":"icon-zonas","leaf":true,"url":"","class":"","view":"gridzone","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Horarios","iconCls":"icon-horarios","leaf":true,"url":"","class":"","view":"horarioview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Informacion Médica","iconCls":"icon-medica","leaf":true,"url":"","class":"","view":"medicalinfoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Panel de alarma","iconCls":"icon-panel","leaf":true,"url":"","class":"","view":"panelview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"notificacionespanelview","profile":"3","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SmartPanics","iconCls":"icon-smartpanic","leaf":true,"url":"","class":"","view":"smartpanicgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Servicio Tecnico","iconCls":"icon-wrench-orange","leaf":true,"url":"","class":"","view":"multicuentaserviciotecnicoextdelaersearchgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Histórico","iconCls":"icon-reportes","leaf":true,"url":"","class":"","view":"recepcionview","profile":"1","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Gráfico.","iconCls":"icon-reporteGrafico","leaf":true,"url":"","class":"","view":"reportegraficoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Gestión -> Llamadas","iconCls":"icon-telephone-go","leaf":true,"url":"","class":"","view":"llamadagridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"MoneyGuard","iconCls":"icon-moneyguard-16","leaf":true,"url":"","class":"","view":"mgcuentaview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms transmitidos","iconCls":"icon-phone-sound","leaf":true,"url":"","class":"","view":"notificacionestabpanelview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Imagenes de eventos","iconCls":"icon-photos","leaf":true,"url":"","class":"","view":"imagenesview","profile":"1","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}],"rights":{},"event":[{"text":"Timeline","iconCls":"icon-clock","leaf":true,"url":"","class":"","view":"eventotimelinegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Evento","iconCls":"icon-page-white-text","leaf":true,"url":"","class":"","view":"eventoformverticalview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Imagenes","iconCls":"icon-photo","leaf":true,"url":"","class":"","view":"eventimagesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Llamadas","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"eventphonegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Llamadas post-procesado","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"llamadahelperview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Observaciones","iconCls":"icon-book-open","leaf":true,"url":"","class":"","view":"eventobservacionesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-email","leaf":true,"url":"","class":"","view":"eventsmsgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Procesamientos","iconCls":"icon-cog","leaf":true,"url":"","class":"","view":"eventprocesamientogridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Comentario/Recategorizacion","iconCls":"icon-note-edit","leaf":true,"url":"","class":"","view":"eventobservacionesformview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Autoridades","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"eventorepautgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Vigicontrol","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"vcreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vigicontrolgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SmartPanics","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"spreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"smartpanicgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vehicleslavegpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sonido","iconCls":"icon-sound","leaf":true,"url":"","class":"","view":"eventsoundview","profile":"","closable":false,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Video SmartPanics","iconCls":"icon-cctv-camera","leaf":true,"url":"","class":"","view":"speventovideoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Links","iconCls":"icon-linkurl","leaf":true,"url":"","class":"","view":"linkurlgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}]}' );
					END -- IF @awcc = 1
                

					-- Envio de emails de bienvenida
					IF @enviarEmail = 'si'
BEGIN
    -- Copias locales por VUELTA de cursor (no tocan las variables originales)
    DECLARE @mailSubjectLocal         varchar(300) = @mailSubject;
    DECLARE @mailBodyLocal            varchar(max) = @mailBody;
    DECLARE @mailSubjectCustomerLocal varchar(300) = @mailSubjectCustomer;
    DECLARE @mailBodyCustomerLocal    nvarchar(max) = @mailBodyCustomer;

    DECLARE @desktopURL varchar(max);

    SET @desktopURL = (
        SELECT CAST(par_cvalor AS varchar(100))
        FROM   _Tablas.dbo.t_parametros
        WHERE  par_ccodigo = 'DESKTOPEXTERNALURL'
    );
    SET @desktopURL = LTRIM(RTRIM(@desktopURL));

    -- 🔹 Subject de la central: reemplazo {nombre} SOLO en la copia local
    SET @mailSubjectLocal = REPLACE(@mailSubjectLocal, '{nombre}', @nombre);

    -- 🔹 Cliente final: subject + body sobre las copias locales
    SET @mailSubjectCustomerLocal = REPLACE(@mailSubjectCustomerLocal,'{nombreapp}', @nombreApp);
    SET @mailBodyCustomerLocal    = REPLACE(@mailBodyCustomerLocal,'{nombreApp}', @nombreApp);
    SET @mailBodyCustomerLocal    = REPLACE(@mailBodyCustomerLocal,'{nombre}',   @nombre);
    SET @mailBodyCustomerLocal    = REPLACE(@mailBodyCustomerLocal,'{url}',      @desktopURL);
    SET @mailBodyCustomerLocal    = REPLACE(@mailBodyCustomerLocal,'{urlfinal}', @desktopURL);
    SET @mailBodyCustomerLocal    = REPLACE(@mailBodyCustomerLocal,'{telefono}', @telefono);
	SET @mailBodyCustomerLocal    = REPLACE(@mailBodyCustomerLocal,'{activationLink}', @activationLink);	
	SET @mailBodyCustomerLocal	  = REPLACE(@mailBodyCustomerLocal,'{qrcodeLink}', @qrCodeImgLink);



    -- 🔹 Central: body sobre la copia local
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{nombre}',    @nombre);
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{dni}',       '');
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{email}',     @email);
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{pais}',      @paisElegido);
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{ciudad}',    @provinciaElegido);
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{direccion}', @direccion);
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{empresa}',   '');
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{telefono}',  @telefono);
    SET @mailBodyLocal = REPLACE(@mailBodyLocal,'{comentario}',@comentario);

    -- Obtengo datos del sender del Servidor (esto lo dejás igual)
    DECLARE @cFromName varchar(100);
    DECLARE @cFrom     varchar(150);

    SET @cFromName = (
        SELECT CAST(par_cvalor AS varchar(100))
        FROM   _Tablas.dbo.t_parametros
        WHERE  par_ccodigo = 'MAILSENDERNAME'
    );
    SET @cFromName = LTRIM(RTRIM(@cFromName));

    SET @cFrom = (
        SELECT CAST(par_cvalor AS varchar(150))
        FROM   _Tablas.dbo.t_parametros
        WHERE  par_ccodigo = 'MAILSENDER'
    );
    SET @cFrom = LTRIM(RTRIM(@cFrom));                        

    -- Mail a la central
    INSERT INTO _datos..[SmartMail_Program]
        ( [Name]
        , [From]
        , [Body]
        , [DateStart]
        , [Count]
        , [Status]
        , [Query]
        , [TransportType]
        , [Priority]
        , [CueIid] )
    VALUES
        ( @mailSubjectLocal
        , @cFromName + '<' + @cFrom + '>'
        , @mailBodyLocal
        , GETDATE()
        , 1
        , 'A'
        , 'Select strval As Email From _Datos.dbo.ParseArray('''+@mailTo+''','';'')'
        , 'MAIL'
        , '900'
        , @iid );

    -- Mail al cliente
    INSERT INTO _datos..[SmartMail_Program]
        ( [Name]
        , [From]
        , [Body]
        , [DateStart]
        , [Count]
        , [Status]
        , [Query]
        , [TransportType]
        , [Priority]
        , [CueIid] )
    VALUES
        ( @mailSubjectCustomerLocal
        , @cFromName + '<' + @cFrom + '>'
        , @mailBodyCustomerLocal
        , GETDATE()
        , 1
        , 'A'
        , 'Select strval As Email From _Datos.dbo.ParseArray('''+@email+''','';'')'
        , 'MAIL'
        , '900'
        , @iid );

					END -- IF @enviarEmail = 'si'

				END -- ELSE cuenta válida
			END
			ELSE
			BEGIN
				PRINT 'El telefono ya existe, no creo nada';
			END

			-- Consulto el proximo registro
			FETCH NEXT FROM altaTemprana_cursor INTO 
				 @parcelaNumero
				,@nombre
				,@email
				,@direccion
				,@nombreDispositivo
				,@telefono
				,@comentario
				,@iid;
		END

		CLOSE altaTemprana_cursor;
		DEALLOCATE altaTemprana_cursor;

		SET NOEXEC OFF;
	END
	ELSE
	BEGIN
		PRINT 'El dealer esta vacio, no realizo ninguna accion';
	END
END