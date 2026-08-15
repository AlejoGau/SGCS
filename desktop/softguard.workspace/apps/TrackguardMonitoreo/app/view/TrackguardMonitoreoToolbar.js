Ext.define('TrackguardMonitoreo.view.TrackguardMonitoreoToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: ['widget.moduletoolbar','widget.trackguardmonitoreotoolbar'],
    id: 'north',
    //itemId: 'north',
    border: 0,
    items: [
        {                  
           xtype: 'displayfield',
           itemId: 'vistaactual',
           label: 'Vista',
           text: 'No definida'
       },'-',
       
       {                  
           action: 'vervista',
           text: getLocale('Ver vistas'),
           iconCls: 'icon-find'
       },'-',
       {                  
           action: 'saveactual',
           text: getLocale('Crear Vista'),
           iconCls: 'icon-add',
           itemId: 'savevista'
       }, {
        	text : 'Puntos de Interés',
			iconCls : 'icon-poi',
            closable: true,
			view : 'poigridview'
		}, {
            text : 'Geocercas',
			iconCls : 'icon-geocerca',
            profile: 2,
            closable: true,
            closeAction: 'destroy',
            itemId:'geocercastoolbar',
            viewConfig: {
                collapsible: false,
                collapsed: false,
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
            itemId:'rutastoolbar',
            viewConfig: {
                collapsible: false,
                collapsed: false,
                closeAction: 'destroy',
                record: null
            },
			view : 'rutagridview'
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
		}
    ]
});