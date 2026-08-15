//MIGRADO2024
Ext.define('Common.view.VehicleSlaveGpsView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vehicleslavegpsview',
    layout : 'border',
    frame : false,
	border : 0,
    items: [
        {
            xtype: 'gmappanel6',
            itemId: 'googlemap',
            region: 'center',
            zoomLevel : 14,
			gmapType : 'map',
			mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','NonExistantControl']
        },
        {
        split: true,
        title : 'Datos',
        itemId : 'datapanel',
        layout:'accordion',
        region : 'east',
        width: 500,
        maxWidth: 500,
        collapsed: false,
        collapsible: true,
        animCollapse: true,
        defaults: { // defaults are applied to items, not the container
            autoScroll: true,
            collapsible : true,
            collapsed : false,
            animCollapse: true
        },
        items : [
            {
                xtype : 'dispositivomovilwidgetview',
                collapsed: true,
                maximazer: false
            }
        ]
    }],
    
    initComponent: function(){
        this.callParent();
        
        if (typeof this.center === "string" ){
            var map = this.down('gmappanel6');
            var acenter = this.center.split(',');
            map.setCenter = {lat: acenter[0],lng:acenter[1]};
        }
        
        
        
        var datapanel = this.down('#datapanel');
        datapanel.record = this.record;
        datapanel.tabTipo = this.tabTipo;
        
        if (this.hideDatapanel)
            datapanel.hide();
            
        if (this.collapseDatapanel)
            datapanel.collapse();
        
        this.down('dispositivomovilwidgetview').record = this.record;
        
        var view = this;
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
			items : [
                {
    				text : 'Cambiar a Manual',
					iconCls : 'icon-center',
                    //enableToggle: true,
                    _pressed: true,
                    itemId: 'centerBtn',
					action : 'center',
                    margin: '0 5 0 0'
				},
                "-",{
        			text : '1',
					iconCls : 'icon-magnifier',
                    itemId:'zoom1'
				},{
            		text : '2',
					iconCls : 'icon-magnifier',
                    itemId:'zoom2'
				},{
            		text : '3',
					iconCls : 'icon-magnifier',
                    itemId:'zoom3'
				},{
            		text : '4',
					iconCls : 'icon-magnifier',
                    itemId:'zoom4'
				},{
            		text : '5',
					iconCls : 'icon-magnifier',
                    itemId:'zoom5'
				},"-",{
                	text : 'Medir Distancia',
					iconCls : 'icon-calculator',
                    itemId:'medirdistancia'
				},"->",{
                    text : '',
                    itemId: 'displayname',
                    translate:false,
        			menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        enableKeyNav:false,
                        ignoreParentClicks: true,
                        width: 600,
                        items: Ext.widget('flotagridview',{
                            onlyGpsCords:true,
                            selectNone: true,
                            itemId: 'flotaQuadGridView1',
                            preventHeader: true,
                            closable: true,
                            caller: view,
                            translate:false,
                            selModel: Ext.create('Ext.selection.RowModel'),
                            listeners: {
                                beforeclose: function(){
                                    //this.up('menu').hide();
                                    //return false;
                                }
                            },
                            height: 400//,
                            //width: 424
                        })
                    }
				}/*,'->',{
            		xtype:'displayfield',
                    cls: 'toolbarfield'
				},*/
            ]
        }); 
        this.addDocked(toolbar);
        
        if (this.hideToolbar)
            toolbar.hide();
    }
});