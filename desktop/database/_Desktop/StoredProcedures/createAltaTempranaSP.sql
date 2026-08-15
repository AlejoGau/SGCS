-- =============================================================================================================
-- Author:		JUAN BONFORTI
-- Create date: 02/10/2019
-- Description:	Alta de Cuenta + SP (Alta Temprana) para importador en Saint Tomas
-- =============================================================================================================
CREATE OR ALTER PROCEDURE [dbo].[createAltaTempranaSP] 
	 @dealer char(3) = 'OAA'
AS
BEGIN
	SET NOCOUNT ON;

	IF ( @dealer != '')
		BEGIN

			/**
			 * DEFINIR TODOS LOS STD A LOS USUARIOS COMO SI FUESE MODIFICAR.JS
			 */
			DECLARE @plantillaSP varchar(3) = '_SP';
			DECLARE @groupMax varchar(3) = '1';
			DECLARE @nombreApp varchar(25) = 'SmartPanics'; -- Reemplazar por el nombre de la App deseada.
			DECLARE @mailTo varchar(max) = 'implementacion@softguard.com'; -- Reemplazar por el mail de la central
			DECLARE @automonitoreo varchar(2) = 'no';
			DECLARE @diasprueba int = 0;
			DECLARE @cuentatipo varchar(128) = '009';
			DECLARE @enviarEmail varchar(2) = 'si'; -- Reemplazar para enviar o no el mail de alta (no/si)

			/* Datos Fijos - Revisar antes de la migracion */
			DECLARE @awcc int = 1; -- Fijo en si.
			DECLARE @pais int = 1; -- Fijo en Argentina REVISAR EN CLIENTE
			DECLARE @provincia varchar(128) = '002'; -- pro_ccodigo REVISAR EN CLIENTE.

			/**
			 * FIN DE LA DEFINICION MANUAL
			 */


			/** Obtengo el nombre del PAIS y PROVINCIA */
			DECLARE @paisElegido VARCHAR(32) = '';
			DECLARE @provinciaElegido VARCHAR(32) = '';
			SELECT @paisElegido = pro_cdescripcion FROM [_tablas].[dbo].[t_provincias] WHERE ISNUMERIC(pro_ccodigo) = 1 AND pro_ccodigo = @pais
			SELECT @provinciaElegido = pro_cdescripcion FROM [_tablas].[dbo].[t_provincias] WHERE pro_ccodigo = @provincia AND pro_iParentID = @pais

			/** Datos para enviar el email */
			DECLARE @mailSubject varchar(300) = '';
			SELECT @mailSubject = Subject FROM [_Datos].[dbo].[SmartMail_Template] WHERE Name = 'MailBodyTemplate'
			DECLARE @mailBody varchar(max) = '';
			SELECT @mailBody = HtmlBody FROM [_Datos].[dbo].[SmartMail_Template] WHERE Name = 'MailBodyTemplate'
			DECLARE @mailSubjectCustomer varchar(300) = '';
			SELECT @mailSubjectCustomer = Subject FROM [_Datos].[dbo].[SmartMail_Template] WHERE Name = 'MailBodyCustomerTemplate'
			DECLARE @mailBodyCustomer nvarchar(max) = '';
			SELECT @mailBodyCustomer = HtmlBody FROM [_Datos].[dbo].[SmartMail_Template] WHERE Name = 'MailBodyCustomerTemplate'
			declare @MAILSENDER varchar(250);
			declare @MAILSENDERNAME varchar(250);
			select  @MAILSENDER = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDER';
			select  @MAILSENDERNAME = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDERNAME';
	
			/**
			 * Variables que se completan en cada bucle
			 */
			DECLARE @parcelaNumero varchar(4);
			DECLARE @nombre varchar(60);
			DECLARE @email varchar(150);
			DECLARE @direccion varchar(300);
			DECLARE @nombreDispositivo varchar(50);
			DECLARE @telefono varchar(128);
			DECLARE @comentario varchar(300);

			DECLARE altaTemprana_cursor CURSOR FOR 
				SELECT 
				   [parcelaNumero] --Viene siempre
				  ,[cuentaNombre]
				  ,[email]
				  ,[direccion]
				  ,[dispositivoNombre]
				  ,[dispositivoTelefono]
				  ,[observacion]
				from _sharedDB..temporalSTUsers
	
			OPEN altaTemprana_cursor
			print 'Comienza bucle de importacion'

			FETCH NEXT FROM altaTemprana_cursor INTO 
				 @parcelaNumero
				,@nombre
				,@email
				,@direccion
				,@nombreDispositivo
				,@telefono
				,@comentario

			WHILE @@FETCH_STATUS = 0
			BEGIN
				/** Consulto si el telefono a importar existe ya como dispositivo asociado en SP.
				 * De existir, no realizo ninguna accion y sigo al siguiente registro a importar
				 *
				 * ToDo : Validar por 8 caracteres de derecha ??
				 *
				 */
				DECLARE @telefonoSPExiste VARCHAR(20) = '';
				SELECT @telefonoSPExiste = Telefono FROM _Datos..SmartPanic WHERE Telefono = @telefono
				IF ( @telefonoSPExiste IS NULL OR @telefonoSPExiste = '')
					BEGIN
						PRINT 'El telefono no existe, creo todo desde 0'

						/**
						 * Si el telefono es NULL o Blanco, quiere decir que no existe dispositivo.
						 * Ahora se consulta si existe el nCuenta para el @dealer indicado y de existir, no vuelvo a crear cuenta, solamente le asocio un SP nuevo.
						 *
						 */
						DECLARE @cue_iidExiste VARCHAR(10) = '';
						DECLARE @iid INT; -- Variable temporal para obtener un nuevo cue_iid o bien, lo piso si ya existe
						SELECT @cue_iidExiste = cue_iid FROM _Datos..m_cuentas WHERE cue_ncuenta = @parcelaNumero AND cue_clinea = @dealer
                

						IF ( @cue_iidExiste IS NULL OR @cue_iidExiste = '')
							BEGIN

								-- Obtengo el proximo numero de idCuenta
								SELECT @iid = par_ivalor+1 From _Tablas.dbo.t_parametros (UPDLOCK) Where par_cCodigo='M_CUENTAS'     
								UPDATE _Tablas.dbo.t_parametros SET par_ivalor = @iid Where par_cCodigo='M_CUENTAS' 

								-- transformo a uppercase el nombre de la cuenta y dealer
								SET @nombre = UPPER(@nombre)
								SELECT @dealer = UPPER(@dealer)

								-- Consulto si la cuenta es automonitoreo o no
								DECLARE @automonitoreoInt INT
								IF (@automonitoreo = 'si')
									BEGIN
										PRINT 'Cuenta con @automonitoreo en SI'
										SET @automonitoreoInt = 1
									END
								ELSE
									BEGIN
										PRINT 'Cuenta con @automonitoreo en NO'
										SET @automonitoreoInt = 0
									END                

								-- observacion no puede ser NULL
								SET @comentario = ISNULL(@comentario,'')


								-- Si numeroParcela vino en NULL o Blanco, debo obtener el proximo valor disponible del DEALER
								IF ( @parcelaNumero IS NULL OR @parcelaNumero = '')
									BEGIN
										-- traigo el ultimo ncuenta del dealer
										declare @cue_ncuenta varchar(10)
										declare @ncuentaNew varchar(10) = '';

										select top 1 @cue_ncuenta = cue_ncuenta from _datos..m_cuentas where cue_clinea = @dealer order by cue_ncuenta desc
										-- lo transformo a int
										declare @ncuenta36 int
										select @ncuenta36 = _Datos.dbo.Base36Decode(@cue_ncuenta)
										-- sumo 1 y obtengo en nuevo ncuenta
										select @ncuentaNew = upper(_Datos.dbo.Base36Encode(@ncuenta36+1))
										-- Elimino los blancos
										SET @ncuentaNew = REPLACE (@ncuentaNew,' ','')
										-- Agrego los 4 digitos std
										SET @parcelaNumero = RIGHT('00000'+@ncuentaNew, 4)
									END



								-- creo la cuenta
								exec [_Desktop].[dbo].[CuentaIns] 
									@cue_iid = @iid
									, @Name = @nombre
									, @cue_clinea = @dealer
									, @cue_ncuenta = @parcelaNumero -- campo correspondiente a numeroParcela
									, @cue_cnombre = @nombre
									, @cue_cprovincia = @provincia
									, @cue_ccalle = @direccion
									, @cue_cemail = @email
									, @cue_ctelefono = @telefono	
									, @cue_nAutoMonitoreo = @automonitoreoInt
									, @cue_nprioridad = 1
									, @cue_nllaveul = 1
									, @est_nduracion = @diasprueba
									, @cue_ctipo = @cuentatipo
									, @cue_cobservacion = @comentario -- Agregado para el importador de ST, antes se guardaba en organizacion

								PRINT 'Inserte la cuenta con cue_iid' + CAST(@iid AS VARCHAR(10))

							END
						ELSE
							BEGIN
								PRINT 'La cuenta ya existia, por lo tanto solo asocio SP'
								SET @iid = @cue_iidExiste
							END
                
                
						-- CREANDO EL SMARTPANICS el SmartPanics
						declare @configSmartPanic varchar(256)
						IF (@groupMax > 0)
							BEGIN
								PRINT 'El valor de groupMax es mayor a 0'
								SET @configSmartPanic = '{"groupEnabled":1, "groupMax":'+@groupMax+', "funcMiGrupo":1}'
							END

						DECLARE @smartpid int
						Insert into _datos.dbo.SmartPanic 
							( [Telefono]
							, [CuentaId]
							, [Nombre]
							, [Linea]
							, [Imei]
							, [Config])
						VALUES 
							( @Telefono
							, @iid
							, @nombreDispositivo
							, @dealer
							, ''
							, @configSmartPanic	)
						SELECT @smartpid = SCOPE_IDENTITY()
						PRINT 'Cree el dispositivo SP con id: ' + CAST(@smartpid AS VARCHAR(5));

						-- Actualizo y le asigno una cuenta al SmartPanics
						EXEC [_Desktop].[dbo].[SearchSmartPanicAsignarCuenta]
							@smartpid
							,@iid
                        
						-- Genero las notificaciones para los eventos de SmartPanics
						DECLARE @maxId INT;
						SELECT @maxId = isnull(MAX(sms_iid),0) + 1 FROM _datos.dbo.m_sms
						Insert into _datos.dbo.m_sms 
							( sms_iid
							, [sms_iidcuenta]
							, [sms_meventos]
							, [sms_cplantillapush]
							, [sms_cidspushsmartpanic]
							)
						VALUES 
							( @maxId
							, @iid
							, 'S51,S53,S55,S60,S67,S69,S72,_EG,_IG'
							, @plantillaSP
							, @smartpid
							)
						PRINT 'Genere las notificaciones de SP'

                
						-- Si AWCC = 1 asigno modulos
						IF(@awcc = 1)
							BEGIN
								PRINT 'El valor de @awcc,' + CONVERT(VARCHAR(1),@awcc)
								Insert into [_Sistema]..[UsersDesktopWeb]
									(	[udw_usuario]
										,[udw_clave]
										,[udw_nombre]
										,[udw_apellido]
										,[udw_empresa]
										,[udw_tipo]
										,[udw_metadata]
										,[udw_iperfil]	)
								values 
									(	@email
										,''
										,@nombre
										,''
										,''
										,2
										,'{"controlaIp":2,"language":"es-ar","provincia":{"nombre":"","id":null}}'
										,''	)                 
								DECLARE @IdWeb INT
								SELECT @IdWeb = @@Identity 
								PRINT 'Realizado el insert en UserDesktopWeb con Id' + CONVERT(VARCHAR(5),@IdWeb)

								-- asigno el usuario awcc al smartpanic
								update _datos.dbo.SmartPanic set awccUserId = @IdWeb where Id = @smartpid
								PRINT 'Se actualizo el usuario AWCC al SmartPanics'
                                                    
								INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
									(	[dwm_idWeb]
										,[dwm_idModules]
										,[dwm_idTabla]
										,[dwm_dealer]
										,[dwm_cuenta_desde]
										,[dwm_cuenta_hasta]
										,[dwm_data]	)
								VALUES 
									(	@IdWeb
										,8
										,''
										,''
										,''
										,''
										,''	)

								EXEC [_Desktop].[dbo].[UsersDesktopWebSel] @IdWeb
								PRINT 'Realizado el insert en UserDesktopWebModules del Modulo con Id 8'

								-- Asigno Rangos al USUARIO
								INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
									( [dwm_idWeb]
										,[dwm_idModules]
										,[dwm_idTabla]
										,[dwm_dealer]
										,[dwm_cuenta_desde]
										,[dwm_cuenta_hasta]
										,[dwm_data] )
								VALUES
									(	@IdWeb
										,0
										,''
										,@dealer
										,@parcelaNumero
										,@parcelaNumero
										,''	)
								PRINT 'Asigne rangos al usuario'
                        
								 -- Asigno el modulo AWCC
								INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
										( [dwm_idWeb]
										,[dwm_idModules]
										,[dwm_idTabla]
										,[dwm_dealer]
										,[dwm_cuenta_desde]
										,[dwm_cuenta_hasta]
										,[dwm_data] )
									VALUES
									(	@IdWeb
										,11
										,''
										,''
										,''
										,''
										,''	)
								PRINT 'Realizado el insert en UserDesktopWebModules del Modulo con Id 11'
                
								-- Agrego modulo AWCC el cual tiene CUENTA, Reporte Historico y Reporte de Imagenes en modo Lectura
								INSERT INTO [_Sistema]..[UsersDesktopWebModulosSecurity]
									(  [ums_idWeb]
										,[ums_idModules]
										,[ums_data]	)
								VALUES 
									(	@IdWeb
										,11
										,'{"modules":[{"text":"Cuenta","iconCls":"icon-cuenta","leaf":true,"url":"","class":"","view":"cuentaformview","profile":"1","closable":false,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Usuarios","iconCls":"icon-usuarios","leaf":true,"url":"","class":"","view":"griduser","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Contactos","iconCls":"icon-telefonos","leaf":true,"url":"","class":"","view":"gridphones","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Zonas","iconCls":"icon-zonas","leaf":true,"url":"","class":"","view":"gridzone","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Horarios","iconCls":"icon-horarios","leaf":true,"url":"","class":"","view":"horarioview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Informacion Médica","iconCls":"icon-medica","leaf":true,"url":"","class":"","view":"medicalinfoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Panel de alarma","iconCls":"icon-panel","leaf":true,"url":"","class":"","view":"panelview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"notificacionespanelview","profile":"3","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SmartPanics","iconCls":"icon-smartpanic","leaf":true,"url":"","class":"","view":"smartpanicgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Servicio Tecnico","iconCls":"icon-wrench-orange","leaf":true,"url":"","class":"","view":"multicuentaserviciotecnicoextdelaersearchgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Histórico","iconCls":"icon-reportes","leaf":true,"url":"","class":"","view":"recepcionview","profile":"1","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Gráfico.","iconCls":"icon-reporteGrafico","leaf":true,"url":"","class":"","view":"reportegraficoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Gestión -> Llamadas","iconCls":"icon-telephone-go","leaf":true,"url":"","class":"","view":"llamadagridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"MoneyGuard","iconCls":"icon-moneyguard-16","leaf":true,"url":"","class":"","view":"mgcuentaview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms transmitidos","iconCls":"icon-phone-sound","leaf":true,"url":"","class":"","view":"notificacionestabpanelview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Imagenes de eventos","iconCls":"icon-photos","leaf":true,"url":"","class":"","view":"imagenesview","profile":"1","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}],"rights":{},"event":[{"text":"Timeline","iconCls":"icon-clock","leaf":true,"url":"","class":"","view":"eventotimelinegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Evento","iconCls":"icon-page-white-text","leaf":true,"url":"","class":"","view":"eventoformverticalview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Imagenes","iconCls":"icon-photo","leaf":true,"url":"","class":"","view":"eventimagesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Llamadas","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"eventphonegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Llamadas post-procesado","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"llamadahelperview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Observaciones","iconCls":"icon-book-open","leaf":true,"url":"","class":"","view":"eventobservacionesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-email","leaf":true,"url":"","class":"","view":"eventsmsgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Procesamientos","iconCls":"icon-cog","leaf":true,"url":"","class":"","view":"eventprocesamientogridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Comentario/Recategorizacion","iconCls":"icon-note-edit","leaf":true,"url":"","class":"","view":"eventobservacionesformview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Autoridades","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"eventorepautgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Vigicontrol","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"vcreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vigicontrolgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SmartPanics","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"spreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"smartpanicgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vehicleslavegpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sonido","iconCls":"icon-sound","leaf":true,"url":"","class":"","view":"eventsoundview","profile":"","closable":false,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Video SmartPanics","iconCls":"icon-cctv-camera","leaf":true,"url":"","class":"","view":"speventovideoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Links","iconCls":"icon-linkurl","leaf":true,"url":"","class":"","view":"linkurlgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}]}'
									)
							END
                

						-- Envio de emails de bienvenida
						IF @enviarEmail = 'si'
							BEGIN

								-- Realizo los replace de informacion para cada correo
								DECLARE @desktopURL VARCHAR(MAX);
								Set @desktopURL = ( Select Cast(par_cvalor As Varchar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'DESKTOPEXTERNALURL')
								Set @desktopURL = Ltrim(Rtrim(@desktopURL))

								-- Reemplazo los valores en el email al cliente
								SET @mailSubjectCustomer = REPLACE(@mailSubjectCustomer,'{nombreapp}', @nombreApp)
								SET @mailBodyCustomer = REPLACE(@mailBodyCustomer,'{nombreApp}', @nombreApp)
								SET @mailBodyCustomer = REPLACE(@mailBodyCustomer,'{nombre}', @nombre)
								SET @mailBodyCustomer = REPLACE(@mailBodyCustomer,'{url}', @desktopURL)
								SET @mailBodyCustomer = REPLACE(@mailBodyCustomer,'{urlfinal}', @desktopURL)
								SET @mailBodyCustomer = REPLACE(@mailBodyCustomer,'{telefono}', @telefono)

								-- Reemplazo los valores en el email a la Central
								SET @mailBody = REPLACE(@mailBody,'{nombre}', @nombre)
								SET @mailBody = REPLACE(@mailBody,'{dni}', '')
								SET @mailBody = REPLACE(@mailBody,'{email}', @email)
								SET @mailBody = REPLACE(@mailBody,'{pais}', @paisElegido)
								SET @mailBody = REPLACE(@mailBody,'{ciudad}', @provinciaElegido)
								SET @mailBody = REPLACE(@mailBody,'{direccion}', @direccion)
								SET @mailBody = REPLACE(@mailBody,'{empresa}', '')
								SET @mailBody = REPLACE(@mailBody,'{telefono}', @telefono)
								SET @mailBody = REPLACE(@mailBody,'{comentario}', @comentario)

								-- Obtengo datos del sender del Servidor
								DECLARE @cFromName varchar(100)
								DECLARE @cFrom varchar(150)
								Set @cFromName = ( Select Cast(par_cvalor As Varchar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
								Set @cFromName = Ltrim(Rtrim(@cFromName))
								set @cFrom = ( Select Cast(par_cvalor As Varchar(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
								set @cFrom = Ltrim(Rtrim(@cFrom))                        
                        
								INSERT INTO _datos..[SmartMail_Program]
									([Name]
									,[From]
									,[Body]
									,[DateStart]
									,[Count]
									,[Status]
									,[Query]
									,[TransportType]
									,[Priority]
									,[CueIid]
										)
								VALUES
									(@mailSubject
									,@cFromName+'<'+@cFrom+'>'
									,@mailBody
									,getdate()
									,1
									,'A'
									,'Select strval As Email From _Datos.dbo.ParseArray('''+@mailTo+''','';'')'
									,'MAIL'
									,'900'
									,@iid
										)

								-- Envio de Correo Electronico al cliente Registrado, este envia los links de descarga.
								INSERT INTO _datos..[SmartMail_Program]
									([Name]
									,[From]
									,[Body]
									,[DateStart]
									,[Count]
									,[Status]
									,[Query]
									,[TransportType]
									,[Priority]
									,[CueIid]
										)
								VALUES (@mailSubjectCustomer
									,@cFromName+'<'+@cFrom+'>'
									,@mailBodyCustomer
									,getdate()
									,1
									,'A'
									,'Select strval As Email From _Datos.dbo.ParseArray('''+@email+''','';'')'
									,'MAIL'
									,'900'
									,@iid
								)
							END -- cierra IF de enviarEmail

					END
				ELSE
					BEGIN
						PRINT 'El telefono ya existe, no creo nada'
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

			END
			CLOSE altaTemprana_cursor;
			DEALLOCATE altaTemprana_cursor;

			SET NOEXEC OFF
		END
	ELSE
		BEGIN
			PRINT 'El dealer esta vacio, no realizo ninguna accion'
		END
END