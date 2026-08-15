//MIGRADO2024
Ext.define('Common.view.EventoMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventomapview',
    layout : 'fit',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel6',
            cls: 'gmappanel6',
            //id: 'gmappanel6',
            itemId: 'googlemap',
            //anchor: '100% 100%',
            //region: 'center',
            zoomLevel : 2,
    		gmapType : 'map',
            mapConfOpts:  { 
                scrollwheel: true, 
                disableDoubleClickZoom: false, 
                draggable: true, 
                streetViewControl: false, 
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: true
                }
            }
        }
    ],
    
    initComponent: function(){
        this.callParent();
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
			items : [
                {
					text : 'Cambiar a Manual',
					iconCls : 'icon-center',
                    //enableToggle: true,
                    _pressed: true,
					action : 'center',
                    toggleGroup: 'center'
				}
            ]
        }); 
        this.addDocked(toolbar);
    }
    
});