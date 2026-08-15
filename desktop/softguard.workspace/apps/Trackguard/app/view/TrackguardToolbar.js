Ext.define('Trackguard.view.TrackguardToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: ['widget.moduletoolbar','widget.trackguardtoolbar'],
    id: 'north',
    border: 0,
    items: [
        /*{
            text : 'Dispositivos',
			iconCls : 'icon-search',
			view : 'vehiclegridview'
		}, {
			text : 'Marcas',
			iconCls : 'icon-car',
            closable: true,
			myurl : '/a/VehicleBrand?Language='+myQueryString.Language
		}, {
    		text : 'Monitoreo Móvil',
			iconCls : 'icon-map',
			myurl : '/a/TrackguardMonitoreo?Language='+myQueryString.Language,
            closable: true
		}*/, {
        	text : 'Puntos de Interés',
			iconCls : 'icon-poi',
            itemId: 'poinorth',
            closable: true,
			view : 'poigridview'
		}, {
            text : 'Geocercas',
			iconCls : 'icon-geocerca',
            profile: 2,
            closable: true,
            closeAction: 'destroy',
            viewConfig: {
                collapsible: false,
                collapsed: false,
                noCuenta: true,
                closeAction: 'destroy',
                record: null
            },
			view : 'geocercagridview'
		}, {
            text : 'Rutas',
    		iconCls : 'icon-map-edit',
            profile: 2,
            closable: true,
            closeAction: 'destroy',
            viewConfig: {
                collapsible: false,
                collapsed: false,
                closeAction: 'destroy',
                record: null
            },
			view : 'rutagridview'
		}, {
            text : 'Restricciones',
        	iconCls : 'icon-ipod-cast',
            profile: 2,
            closable: true,
            closeAction: 'destroy',            
			view : 'restriccionesgridview'
		}, {
            text : 'Grilla',
    		iconCls : 'icon-application-view-tile',
            profile: 2,
            closable: true,
            closeAction: 'destroy',
            viewConfig: {
                collapsible: false,
                collapsed: false
            },
			view : 'vehiclequadview'
		}/*,{
    	   text : 'Mantenimiento',
           iconCls : 'icon-car',
           profile: 2,
            closable: true,
            closeAction: 'destroy',
            viewConfig: {
                collapsible: false,
                collapsed: false
            }
		}*/,{
            text : 'Crear mantenimiento',
    		iconCls : 'icon-car',
            profile: 2,
            closable: true,
            closeAction: 'destroy',
            viewConfig: {
                collapsible: false,
                collapsed: false,
                closeAction: 'destroy',
                record: null
            },
			view : 'mantvehicularserviciosgridview',
            itemId : 'crearMantenimiento',
            hidden : true
		},{
            iconCls: 'icon-bell',
            text: 'Generar evento manual',                    
            action: 'newevent',
            itemId: 'newevent',
            disabled:true
        },'->',
        {
            xtype: 'displayfield',
            value: '',
            itemId: 'toolbardisplayfield',
            margin: '0 10 0 10'
        }
    ]
});