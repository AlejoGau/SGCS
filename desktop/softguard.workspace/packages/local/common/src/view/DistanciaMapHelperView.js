//MIGRADO2024
Ext.define('Common.view.DistanciaMapHelperView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.distanciamaphelperview',
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
			mapControls : ['GSmallMapControl', 'GMapTypeControl','NonExistantControl'],
           
            flex:1
        },{
           
            itemId:'panelruta',
            hidden:true,
            split:true,         
            flex:1,
            region:'east',
            autoScroll:true,
            layout:'fit',
            items:[
                    {
                        xtype:'displayfield',
                        itemId:'ruta',                        
                        padding:'10'
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
        
        
        
       
        var view = this;
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
			items : [
                {
                    xtype:'textfield',
                    fieldLabel:'Desde',
                    itemId:'direccionorigen',
                    labelWidth:60
                },{
                    xtype:'displayfield',
                    fieldLabel:'Direccion Desde',
                    itemId:'direccionorigentext',
                    labelWidth:120
                },
                {
                    xtype:'textfield',
                    fieldLabel:'Hasta',
                    itemId:'direcciondestino',
                    labelWidth:60
                },{
                    text:'Medir',
                    iconCls : 'icon-calculator',
                    itemId:'medir'
                }
            ]
        }); 
        this.addDocked(toolbar);
        
        if (this.hideToolbar)
            toolbar.hide();
    }
    
});