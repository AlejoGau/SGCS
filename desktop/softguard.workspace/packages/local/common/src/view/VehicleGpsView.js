//MIGRADO2024
Ext.define('Common.view.VehicleGpsView', {
    extend : 'Ext.panel.Panel',
	alias : 'widget.vehiclegpsview',
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
        id : 'datapanel',
        layout:'accordion',
        region : 'east',
        width: 300,
        maxWidth: 500,
        collapsed: false,
        collapsible: true,
        animCollapse: true,
        items : [{
                xtype : 'griduser',
                autoScroll: true,
                collapsible : true,
                collapsed : false,
                animCollapse: true
            },
            {
                xtype : 'poigridview',
                autoScroll: true,
                collapsible : true,
                collapsed : false,
                animCollapse: true
            }
        ]
    }],
    
    initComponent: function(){
        this.callParent();
        
        if (!this.record){
            this.record=Ext.getCmp('viewport').record;
        }
        
        // asigno el record a la grilla de relaciones
        var myrel = this.down('griduser');
        myrel.record = this.record; 
        myrel.module = this.module; 
        
        // asigno el record al mapa
        var mymap = this.down('gmappanel6');
        mymap.record = this.record;
        
        var poigrid = this.down('poigridview');
        poigrid.record = this.record; 
        // agrego la toolbar
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