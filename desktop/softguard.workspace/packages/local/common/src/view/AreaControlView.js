//MIGRADO2024
Ext.define('Common.view.AreaControlView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.areacontrolview',
    layout : 'fit',
    frame : false,
    border : 0,
    padding : 0,
    items: [
        {
            xtype : 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            padding : '0 15px',
            items : [{
                xtype : 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                padding : 0,
                items : [{ xtype : 'textfield',
                    fieldLabel : 'Nombre',
                    itemId : 'nombre',
                    margin : '10px 20px 10px 0',
                    name : 'geocercaName',
                },{
                    xtype : 'numberfield',
                    fieldLabel : 'Dispersion',
                    itemId : 'dispersion',
                    margin : '10px 0',
                    name : 'geocercaDispersion',
                }]
            },{
                xtype: 'gmappanel6',
                cls: 'gmappanel6',
                itemId: 'googlemap',
                height: 550,
                //region: 'center',
                zoomLevel : 5,
            	gmapType : 'map',
                mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
                mapControls : ['GSmallMapControl', 'GMapTypeControl','NonExistantControl'],
            },{            
                xtype : 'textfield',
                margin : '10px 0',
                itemId : 'geocercaCoords',
                name : 'geocercaCoords',
                hidden : true
            },{
                xtype:'component',
                cls: 'loadingmap ',        
                itemId:'loadingmap',
                hidden:true,
                html:'<div data-qtip="'+getLocale('Cargando')+'" class="icon-hourglass" style="height: 16px;width: 16px;margin:0 auto;"></div>'
            }]
        }
    ],
    
    initComponent: function(){
        this.callParent();
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
                xtype: 'button',
                text: 'Eliminar Geocerca',
                action: 'removeGeocerca',
                itemId:'removeGeocerca',
                iconCls: 'icon-delete',
                tooltip: 'Eliminar Geocerca',
                disabled : true
            }], 
            dock: 'top'
        }); 
       this.addDocked(toolbar);
    }
    
});