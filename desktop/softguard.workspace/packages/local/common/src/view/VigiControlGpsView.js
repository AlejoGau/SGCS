//MIGRADO2024
Ext.define('Common.view.VigiControlGpsView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vigicontrolgpsview',
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
    		items : [
                {
                    text : 'Dispositivos Móviles',
    				menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        enableKeyNav:false,
                        ignoreParentClicks: true,
                        width: 600,
                        items: {
                                xtype : 'smarttrackgridview',
                                preventHeader: true,
                                height: 400//,
                                //width: 424
                            }
                        }
    			},{
                    text : 'Ver todos',
    				iconCls : 'icon-search',
    				action : 'searchAll',
                    enableToggle: true,
                    pressed: true,
                    itemId: 'searchall'
    			},'-',{
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