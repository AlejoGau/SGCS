//MIGRADO2024
Ext.define('Common.view.RoutesPointsMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.routespointsmapview',
    layout : 'border',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            region: 'center',
            //zoomLevel : 8,
    		//gmapType : 'map',
			mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','streetViewControl','NonExistantControl']
        }],
    
    initComponent: function(){
        this.callParent();
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
    		items : [{
						text : 'Centrar',
						iconCls : 'icon-center',
                        enableToggle: true,
                        pressed: true,
						action : 'center',
                        toggleGroup: 'center'
					},{
    					text : 'Descentrar',
						iconCls : 'icon-center',
                        enableToggle: true,
                        pressed: false,
                        toggleGroup: 'center'
					}]
        }); 
        this.addDocked(toolbar);
    }
    
});