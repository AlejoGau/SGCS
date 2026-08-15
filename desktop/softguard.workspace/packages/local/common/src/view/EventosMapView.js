//MIGRADO2024
Ext.define('Common.view.EventosMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventosmapview',
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
    }
    
});