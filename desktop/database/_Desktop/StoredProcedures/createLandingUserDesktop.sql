-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Creacion del usuario Final de AWCC (Desktop) por el camino del SI de la Landing SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[createLandingUserDesktop] 
	-- Parametros para verificacion
	@dealer VARCHAR(4),
	@telefono VARCHAR(128),
	@email VARCHAR(128),
	@nombreSP VARCHAR(128),
	@Cuenta varchar(4)

AS
BEGIN
	SET NOCOUNT ON;

	-- Creo el USUARIO de AWCC por el camino del SI de Landing Smartpanics APP
	Insert into [_Sistema]..[UsersDesktopWeb]
		(	[udw_usuario]
			,[udw_clave]
			,[udw_nombre]
			,[udw_apellido]
			,[udw_empresa]
			,[udw_tipo],
			[udw_iperfil]	)
	values 
		(	@email
			,''
			,@nombreSP
			,''
			,''
			,2
			,''	)
										
	DECLARE @IdWeb INT
	SELECT @IdWeb = @@Identity 

	-- asigno el usuario awcc al smartpanic
	update _datos.dbo.SmartPanic set awccUserId = @IdWeb where Telefono = @telefono AND Nombre = @nombreSP

	-- Asigno modulo AWCC
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
			,@Cuenta
			,@Cuenta
			,''	)

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