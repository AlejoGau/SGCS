//MIGRADO2024
Ext.define('Common.view.SmartTrackGpsView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.smarttrackgpsview',
    layout : 'border',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            region: 'center',
            zoomLevel : 14,
			//gmapType : 'map',
			mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','streetViewControl','NonExistantControl']
        }],
    
    initComponent: function(){
        this.callParent();
        if (typeof this.center === "string" ){
            var map = this.down('gmappanel6');
            var acenter = this.center.split(',');
            map.setCenter = {lat: acenter[0],lng:acenter[1]};
        }
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