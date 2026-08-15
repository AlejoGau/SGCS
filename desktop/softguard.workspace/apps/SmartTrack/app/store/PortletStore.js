Ext.define('SmartTrack.store.PortletStore', {
    extend : 'Ext.data.Store',
    model : 'SmartTrack.model.PortletModel',
	sorters: [
        {
            property : 'Position',
            direction: 'ASC'
        }
    ]
	});