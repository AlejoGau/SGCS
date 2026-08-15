//MIGRADO2024
Ext.define('Common.view.VigiControllGpsFullView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vigicontrollgpsfullview',
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
        var gmappanel6 = this.down('gmappanel6')
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
					},{
                        text: 'Rutas',
                        menu: {
                            xtype: 'menu',
                            layout: 'fit',
                            width: 600,
                            height: 500,
                            itemId:'rutas',
                            items: {
                                xtype : 'routesgridview',
                                eventFireOnSelect: 'selected',
                                caller : this,
                                selModel: Ext.create('Ext.selection.CheckboxModel'),
                                preventHeader: true,
                            }
                        }
                    },{
                        text: 'Checkpoints',
                        menu: {
                            xtype: 'menu',
                            layout: 'fit',
                            width: 600,
                            height: 500,
                            itemId:'checkpoints',
                            items: {
                                xtype : 'checkpointsgridview',
                                eventFireOnSelect: 'selectedcheckpoints',
                                caller : this,
                                selModel: Ext.create('Ext.selection.CheckboxModel'),
                                preventHeader: true,
                            }
                        }
                    }
    
            ]
        }); 
        this.addDocked(toolbar);
        this.down('routesgridview').record = this.record
        this.down('checkpointsgridview').record = this.record
    }
    
});