Ext.define('Cuenta.store.FenceSecurityModulesStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.ModuleModel',
    id: 'FenceSecurityModulesStore',
    data : [
		{
			text : 'Cuenta',
			iconCls : 'icon-cuenta',
			leaf : true,
			profile: '0',
			view : 'cuentaformview'
		}, {
			text : 'Situación',
			iconCls : 'icon-search',
			leaf : true,
			profile: '0',
			view : 'estadoview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Contactos',
			iconCls : 'icon-telefonos',
			leaf : true,
			profile: '0',
			view : 'gridphones',
			closable: true,
			closeAction: 'destroy'
		},/* {
			text : 'Zonas',
			iconCls : 'icon-zonas',
			leaf : true,
			profile: '0',
			view : 'gridzone',
			closable: true,
			closeAction: 'destroy'
		},*/{
			text : 'Notas',
			iconCls : 'icon-notas',
			leaf : true,
			profile: '0',
			view : 'formnote',
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
			text : 'Falsas',
			iconCls : 'icon-date-edit',
			leaf : true,
			profile: '0',
			view : 'formfalsetest',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Test',
			iconCls : 'icon-test',
			leaf : true,
			profile: '0',
			view : 'formtest',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Sms',
			iconCls : 'icon-sms',
			leaf : true,
			profile: '0',
			view : 'smsview',
			closable: true,
			closeAction: 'destroy'
		},{
			text : 'Reporte Histórico',
			iconCls : 'icon-reportes',
			leaf : true,
			profile: '0',
			view : 'recepcionview',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Gestión -> Llamadas',
			iconCls : 'icon-telephone-go',
			view : 'llamadagridview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}/*,{
			text : 'Sms transmitidos',
			iconCls : 'icon-phone-sound',
			view : 'notificacionestabpanelview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}, {
			text : 'Estados dinamicos',
			iconCls : 'icon-flag-blue',
			view : 'estadosdinamicosgridview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}   , {
			text : 'Cerco',
			iconCls : 'icon-vector',
			view : 'cercosdrawingmapview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}*/,{
			/* Agregado por GeoExt */
			text : 'Cerco (Beta)',
			iconCls : 'icon-vector',
			view : 'cercosdrawinggeoextmapview',
			leaf : true,
			profile: '0',
			closable: true,
			closeAction: 'destroy'
		}              
    ]
});