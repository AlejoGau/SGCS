Ext.define('TrackguardMonitoreo.view.TrackguardMonitoreoPortletView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.trackguardmonitoreoportleview',
	layout : 'card',
	items : [{
        xtype: 'flotagpsview'   
	}]
});
