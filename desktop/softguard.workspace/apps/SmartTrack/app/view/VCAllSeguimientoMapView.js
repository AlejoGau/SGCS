Ext.define('SmartTrack.view.VCAllSeguimientoMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vcallseguimientoview',
    layout : 'fit',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel',
            cls: 'gmappanel',
            itemId: 'googlemap',
            //anchor: '100% 100%',
            //region: 'center',
            zoomLevel : 5,
        	gmapType : 'map',
            mapConfOpts:  { 
                scrollwheel: true, 
                disableDoubleClickZoom: false, 
                draggable: true, 
                streetViewControl: true, 
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: true
                }
            }
        }],
    
    initComponent: function(){

        this.callParent();
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
			items : [{
                    text : 'Dispositivos',
					menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        enableKeyNav:false,
                        ignoreParentClicks: true,
                        width: 600,
                        closable : true,
                        closeAction: 'hide',
                        items: {
                            xtype : 'vcseguimientogridmenuview',
                            itemId : 'vcseguimientomapgrid',
                            gmappanel : this.down('gmappanel'),
                            selModel: Ext.create('Ext.selection.CheckboxModel'),
                            preventHeader: true,
                            height: 400,
                            showTipoFiltro:true,
                            caller : this,
                            fireSelectionChange: true
                        }
                    }
				}
                /*,{
                    text : 'Ver todos',
					iconCls : 'icon-search',
					action : 'searchAll',
                    enableToggle: true,
                    pressed: true,
                    itemId: 'searchall'
				}*/,'-',
                {
    				text : 'Cambiar a Manual',
					iconCls : 'icon-center',
                    enableToggle: true,
                    pressed: true,
					action : 'center',
                    toggleGroup: 'center'
				}/*,'-',
                {
                    text : 'Dirección',
					menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        enableKeyNav:false,
                        height: 70,
                        width: 250,
                        items: [
                            {
                                xtype: 'form',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        itemId: 'address'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Mostrar',
                                        itemId: 'btnAddress'
                                    }
                                ]
                            }
                            
                        ]
                    }
				}*/     
            ]
        }); 
        this.addDocked(toolbar);
    }
    
});