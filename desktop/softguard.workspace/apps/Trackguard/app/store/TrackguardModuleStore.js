Ext.define('Trackguard.store.TrackguardModuleStore', {
    extend : 'Ext.data.TreeStore',
	model : 'Trackguard.model.ModuleModel',
    id: 'TrackguardModuleStore',
	root : {
			text : 'Datos',
			expanded : true,
			children : [{
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
                profile: 2,
				view : 'griduser'
			}, {
				text : 'Contactos',
				iconCls : 'icon-telefonos',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'gridphones'
			}, {
				text : 'Notas',
				iconCls : 'icon-notas',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'formnote'
			}/*, {
        		text : 'Geocercas Programas',
				iconCls : 'icon-geocerca',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'geocercasprogramadasview'
			}*/, {
    			text : 'Geocercas',
				iconCls : 'icon-geocerca',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'geocercagridview'
			}, {
        		text : 'Rutas',
				iconCls : 'icon-map-edit',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'rutagridview'
			}, {
        		text : 'SMS',
				iconCls : 'icon-sms',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'smsview'
			}, {
				text : 'Histórico Eventos',
				iconCls : 'icon-reportes',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'recepcionview'
			}, {
    			text : 'Histórico Posiciones',
				iconCls : 'icon-map',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'vehiclehistorico'
			}, {
        		text : 'Comandos',
				iconCls : 'icon-ipod-cast',
				leaf : true,
                closable: true,
                profile: 2,
				view : 'comandosgpsconfigview'
			}, {
            	text : 'Situación',
				iconCls : 'icon-search',
				leaf : true,
                profile: '0',
				view : 'estadoview',
                closable: true,
                closeAction: 'destroy'
			}, {
                text : 'SmartPanics',
                iconCls : 'icon-smartpanic',
                view : 'smartpanicgridview',
				leaf : true,
                closable: true,
                closeAction: 'destroy'
			}]
		}
})