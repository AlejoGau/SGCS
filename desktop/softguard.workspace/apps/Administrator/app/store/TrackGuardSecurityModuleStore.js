Ext.define('Administrator.store.TrackGuardSecurityModuleStore', {
    extend : 'Ext.data.Store',
    model : 'Administrator'+'.model.ModuleModel',
    id: 'TrackGuardSecurityModuleStore',
    data : [
		{
			text : 'Dispositivo Móvil',
			iconCls : 'icon-cuenta',
			leaf : true,
			profile: '0',
			view : 'vehicleformview'
		},{
			text : 'Posición',
			iconCls : 'icon-map',
			leaf : true,
			closable: true,
			view : 'vehicleslavegpsview'
		},{
			text : 'Responsables',
			iconCls : 'icon-usuarios',
			leaf : true,
			closable: true,
			profile: 0,
			viewConfig: '{\
				collapsible: false,\
				collapsed: false\
			}',
			view : 'griduser'
		}, {
			text : 'Geocercas',
			iconCls : 'icon-geocerca',
			leaf : true,
			closable: true,
			profile: 0,
			viewConfig: '{\
				collapsible: false,\
				collapsed: false\
			}',
			view : 'geocercagridview'
		},{
			text : 'Geocercas Programas',
			iconCls : 'icon-geocerca',
			leaf : true,
			closable: true,
			profile: 2,
			view : 'geocercasprogramadasview'
		},{
			text : 'Rutas',
			iconCls : 'icon-map-edit',
			leaf : true,
			closable: true,
			profile: 2,
			view : 'rutagridview'
		},{
			text : 'Comandos',
			iconCls : 'icon-ipod-cast',
			leaf : true,
			closable: true,
			profile: 0,
			view : 'comandosgpsconfigview'
		},{
			text : 'Situación',
			iconCls : 'icon-search',
			leaf : true,
			profile: 0,
			view : 'estadoview',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Automonitoreo',
			iconCls : 'icon-monitor-lightning',
			view : 'automonitoreoformview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Documentos',
			iconCls : 'icon-book-link',
			view : 'documentosgridview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Contactos',
			iconCls : 'icon-telefonos',
			leaf : true,
			closable: true,
			profile: 0,
			view : 'gridphones'
		}, {
			text : 'Contactos Juridiccionales',
			iconCls : 'icon-phone',
			leaf : true,
			profile: '0',
			view : 'tablastelefonosjuridiccionalesaccgridview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Notas',
			iconCls : 'icon-notas',
			leaf : true,
			closable: true,
			profile: 0,
			view : 'formnote'
		},{
			text : 'Mantenimiento',
			iconCls : 'icon-car',
			view : 'mantvehiculogridview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Bitacora',
			iconCls : 'icon-book',
			view : 'bitacoraview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Informacion Médica',
			iconCls : 'icon-medica',
			leaf : true,
			profile: '0',
			view : 'medicalinfoview',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Falsas',
			iconCls : 'icon-date-edit',
			leaf : true,
			profile: '0',
			view : 'formfalsetest',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Test',
			iconCls : 'icon-test',
			leaf : true,
			profile: '0',
			view : 'formtest',
			closable: true
		}, {
			text : 'SMS',
			iconCls : 'icon-sms',
			leaf : true,
			closable: true,
			profile: 2,
			view : 'smsview'
		}, {
			text : 'Usuarios AWCC',
			iconCls : 'icon-usuarios',
			leaf : true,
			profile: '0',
			view : 'awccUsuariobydealergridview',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Video link',
			iconCls : 'icon-film',
			view : 'videoxcuentapanelview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'SmartPanics',
			iconCls : 'icon-smartpanic',
			leaf : true,
			profile: '0',
			view : 'smartpanicgridview',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Viajes',
			iconCls : 'icon-map',
			leaf : true,
			profile: '0',
			view : 'tripgridview',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Formato',
			iconCls : 'icon-page-white-code',
			leaf : true,
			profile: '0',
			view : 'gridzone',
			viewConfig: "{editorHeight:300, editorName:'zonacodigoalarma', nuevaZonaString:'Nuevo formato', hideColumns:['#foto','#zon_cAlarmaAGenerar','#zon_clistaemergencia','#zon_ccodigorestauracion','#zon_nminutosrestauracion','#zon_nautoprocesa','#zon_nmostrar'], hideComponents: ['#mostrarfoto']}",
			closable: true,
			closeAction: 'destroy'

		},{
			text : 'Puntos de Interés',
			iconCls : 'icon-poi',
			leaf : true,
			profile: '0',
			view : 'poigridview',
			closable: true,
			closeAction: 'destroy'
		

		},{
			text : 'MoneyGuard',
			iconCls : 'icon-moneyguard-16',
			leaf : true,
			closable: true,
			view : 'mgcuentaview'
		},{
			text : 'Gestión -> Llamadas',
			iconCls : 'icon-telephone-go',
			view : 'llamadagridview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Sms transmitidos',
			iconCls : 'icon-phone-sound',
			view : 'notificacionestabpanelview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Imagenes de eventos',
			iconCls : 'icon-photos',
			view : 'imagenesview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Histórico Eventos',
			iconCls : 'icon-reportes',
			leaf : true,
			closable: true,
			profile: 0,
			view : 'recepcionview'
		},{
			text : 'Histórico Posiciones',
			iconCls : 'icon-map',
			leaf : true,
			closable: true,
			profile:0,
			view : 'vehiclehistorico'
		},{
			text : 'Servicio Tecnico',
			iconCls : 'icon-wrench-orange',
			leaf : true,
			profile: '0',
			view : 'multicuentaserviciotecnicoextdelaersearchgridview',
			closable: true,
			closeAction: 'destroy'
		}
    ]
})