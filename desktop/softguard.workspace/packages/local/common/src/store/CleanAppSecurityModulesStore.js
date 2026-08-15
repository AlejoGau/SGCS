//MIGRADO2024
Ext.define('Common.store.CleanAppSecurityModulesStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.ModuleModel',
    id: 'CleanAppCuentaModuleStore',
    data : [
       {
    		text : 'Cuenta',
			iconCls : 'icon-cuenta',
			leaf : true,
            profile: '3',
			view : 'cuentaformview'
		}, {
			text : 'Usuarios',
			iconCls : 'icon-usuarios',
			leaf : true,
            profile: '3',
			view : 'griduser',
            closable: true,
            closeAction: 'destroy',
            viewConfig : '{ collapsed: false, hideTipo:3, filterTipo: 9}'
            // viewConfig : '{ module:{profile: 2}, collapsed: false, hideTipo:3}' //se comento el dia 17/08/2017
		}, {
            text : 'Automonitoreo',
        	iconCls : 'icon-monitor-lightning',
            view : 'automonitoreoformview',
			leaf : true,
            profile: '0',
            closable: true,
            closeAction: 'destroy'
		}, {
			text : 'Contactos',
			iconCls : 'icon-telefonos',
			leaf : true,
            profile: '3',
			view : 'gridphones',
            closable: true,
            closeAction: 'destroy'
		}, {
    		text : 'Contactos Juridiccionales',
			iconCls : 'icon-phone',
			leaf : true,
            profile: '3',
			view : 'tablastelefonosjuridiccionalesaccgridview',
            closable: true,
            closeAction: 'destroy'
		},{
        	text : 'Situación',
			iconCls : 'icon-search',
			leaf : true,
            profile: '3',
			view : 'estadoview',
            closable: true,
            closeAction: 'destroy',
            // viewConfig : '{ module:{profile: 2} }' //se comento el dia 17/08/2017
		},{
            text : 'Control de test',
            iconCls : 'icon-test',
            view : 'formtest',
			leaf : true,
            profile: '3',
            closable: true,
            closeAction: 'destroy'
		},{
        	text : 'Postas de limpieza',
			iconCls : 'icon-flag-green',
			leaf : true,
            profile: '3',
			view : 'checkpointsgridview',   	
            closable: true
		},{
            text : 'Recorrido',
			iconCls : 'icon-route',
            view : 'routesview',
			leaf : true,
            profile: '3',
            closable: true,
            closeAction: 'destroy'
		},{
			text : 'Notas',
			iconCls : 'icon-notas',
			leaf : true,
            profile: '3',
            view : 'formnote',
            closable: true,
            closeAction: 'destroy'
		},{
            text : 'Bitacora',
        	iconCls : 'icon-book',
            view : 'bitacoraview',
			leaf : true,
            profile: '3',
            closable: true,
            closeAction: 'destroy'
		}, {
			text : 'Sms',
			iconCls : 'icon-sms',
			leaf : true,
            profile: '3',
			view : 'smsview',
            closable: true,
            closeAction: 'destroy'
		/*}, {
			text : 'Usuarios AWCC',
			iconCls : 'icon-usuarios',
			leaf : true,
            profile: '3',
			view : 'awccusuariosgridview',
            closable: true,
            closeAction: 'destroy'*/
		}, {
            text : 'Video link',
    		iconCls : 'icon-film',
            view : 'videoxcuentapanelview',
			leaf : true,
            profile: '0',
            closable: true,
            closeAction: 'destroy'
		}, {
			text : 'Servicio Tecnico',
			iconCls : 'icon-wrench-orange',
			leaf : true,
            profile: '3',
			view : 'multicuentaserviciotecnicoextdelaersearchgridview',
            closable: true,
            closeAction: 'destroy'
		}, {
			text : 'Reporte Histórico',
			iconCls : 'icon-reportes',
			leaf : true,
            profile: '3',
			view : 'recepcionview',
            closable: true,
            closeAction: 'destroy'
		}, {
			text : 'Gestión -> Llamadas',
			iconCls : 'icon-telephone-go',
            view : 'llamadagridview',
			leaf : true,
            profile: '3',
            closable: true,
            closeAction: 'destroy'
		}, {
    		text : 'Sms transmitidos',
			iconCls : 'icon-phone-sound',
            view : 'notificacionestabpanelview',
			leaf : true,
            profile: '3',
            closable: true,
            closeAction: 'destroy'
		}, {
        	text : 'Imagenes de eventos',
			iconCls : 'icon-photos',
            view : 'imagenesview',
			leaf : true,
            profile: '3',
            closable: true,
            closeAction: 'destroy'
		}
        
        
        
    ]
});