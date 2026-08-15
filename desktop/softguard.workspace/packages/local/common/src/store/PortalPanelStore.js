//MIGRADO2024
Ext.define('Common.store.PortalPanelStore', {
	extend : 'Ext.data.Store',
	model : 'Common.model.PortalPanelModel',
	autosync: true,
	data : [{
    		id : '1',
    		Name : '2 columnas',
    		ColumnCount: 2
    	}, {
    		id : '2',
    		Name : '3 columnas',
    		ColumnCount: 3,
    		Opened: true
    	}
    ]
    // cierra store
});