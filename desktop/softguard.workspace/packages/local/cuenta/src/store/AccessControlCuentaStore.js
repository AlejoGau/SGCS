Ext.define('Cuenta.store.AccessControlCuentaStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.ModuleModel',
    id: 'AccessControlCuentaStore',
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
            viewConfig : '{ collapsed: false, hideTipo:3}'
            // viewConfig : '{ module:{profile: 2}, collapsed: false, hideTipo:3}' //se comento el dia 17/08/2017
		}, {
			text : 'Contactos',
			iconCls : 'icon-telefonos',
			leaf : true,
            profile: '3',
			view : 'gridphones',
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
			text : 'Notas',
			iconCls : 'icon-notas',
			leaf : true,
            profile: '3',
            view : 'formnote',
            closable: true,
            closeAction: 'destroy'
		},{
    		text : 'Autorizaciones',
			iconCls : 'icon-key-go',
			leaf : true,
            profile: '3',
            view : 'p_controlacceso_autorizacionview',
            closable: true,
            closeAction: 'destroy',
            viewConfig : '{ filterbycuenta: true}'
		},{
        	text : 'Accesos IO',
			iconCls : 'icon-door-in',
			leaf : true,
            profile: '3',
            view : 'p_controlacceso_ioview',
            closable: true,
            closeAction: 'destroy',
            viewConfig : '{ filterbycuenta: true}'
		}
        
    ]

});