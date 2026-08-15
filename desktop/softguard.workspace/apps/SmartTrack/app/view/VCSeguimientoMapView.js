function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

Ext.define('SmartTrack.view.VCSeguimientoMapView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vcseguimientomapview',
    layout : 'border',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel',
            itemId: 'googlemap',
            region: 'center',
            //zoomLevel : 8,
    		//gmapType : 'map',
			mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl','streetViewControl','NonExistantControl']
        },{
            split: false,
            itemId : 'datapanel',            
            layout:'vbox',           
            region : 'east',
            width: 500,
            collapsible: true,
            animCollapse: false,
            items: [     
                {
                    xtype:'vcseguimientoinfoobjectivoview',
                    height:150,                   
                    width: '100%',
                    tools:[{
                        type: 'maximize', 
                        itemId: 'maximizer',
                        handler: function(event,img,view,tool){
                            var map = tool.up('vcseguimientomapview');
                            var record = view.record;                 
                            var win = Ext.create('Ext.Window', {
                                layout: 'fit',
                                title : 'Datos del objetivo',
                            	closeAction : 'hide',
                    			width : 500,
                        		height : 200,
                    			border : true,
                                modal: false,
                                map: map,
                    			items : [
                                    {
                                        xtype: 'vcseguimientoinfoobjectivoview',
                                        caller: map,
                                        showMaximizer: false,
                                        record: record,
                                        gmappanel:map.down('gmappanel'),
                                        centerBtn: map.down('#center'),
                                        preventHeader: true,
                                    }
                                ]
                    		});
                            win.show();
                        }
                    }]
                },{
                    xtype:'vcseguimientoposicionesgridview',
                    flex:1,          
                    itemId: 'gridpuntos',            
                    width: '100%',
                    tools:[{
                        type: 'maximize', 
                        itemId: 'maximizer',
                        handler: function(event,img,view,tool){
                            var view = tool.up('vcseguimientomapview');
                            var record = view.record;                 
                            var win = Ext.create('Ext.Window', {
                                layout: 'fit',
                                title : 'Posiciones',
                        		closeAction : 'hide',
                    			width : 750,
                    			height : 550,
                    			border : true,
                                modal: false,
                                view: view,
                    			items : [
                                    {
                                        xtype: 'vcseguimientoposicionesgridview',
                                        caller: view,
                                        showMaximizer: false,
                                        record: record,
                                        gmappanel:view.down('gmappanel'),
                                        centerBtn: view.down('#center'),
                                        preventHeader: true,
                                    }
                                ]
                    		});
                            win.show();
                        }
                    }]
                },{
                    xtype:'vcseguimientorutagridview',
                    flex:1,                      
                    width: '100%',
                    tools:[{
                        type: 'maximize', 
                        itemId: 'maximizer',
                        handler: function(event,img,view,tool){
                            var view = tool.up('vcseguimientomapview');
                           
                            var record = view.record;
                                                    
                            var win = Ext.create('Ext.Window', {
                                layout: 'fit',
                                title : 'Rutas',
                    			closeAction : 'hide',
                    			width : 750,
                    			height : 550,
                    			border : true,
                                modal: false,
                                view: view,
                    			items : [
                                    {
                                        xtype: 'vcseguimientorutagridview',
                                        caller: view,
                                        showMaximizer: false,
                                        record: record,
                                        gmappanel:view.down('gmappanel'),
                                        centerBtn: view.down('#center'),
                                        preventHeader: true,
                                        
                                    }
                                ]
                    		});
                            
                            win.show();
                            
                        }
                    }]
                },{
                    xtype:'recepcionview',
                    title:'Historico de eventos',
                    itemId: '_historicoeventos',
                    flex:1,                      
                    width: '100%',
                    tools:[{
                        type: 'maximize', 
                        itemId: 'maximizer',
                        handler: function(event,img,view,tool){
                            var view = tool.up('vcseguimientomapview');
                            var record = view.record; 
                            var win = Ext.create('Ext.Window', {
                                layout: 'fit',
                            	title : 'Reporte historico',
                    			closeAction : 'hide',
                    			width : 750,
                    			height : 550,
                    			border : true,
                                modal: false,
                                view: view,
                    			items : [
                                    {
                                        xtype: 'recepcionview',
                                        title:'Historico de eventos',
                                        caller: view,
                                        showMaximizer: false,
                                        options: view.down('#_historicoeventos').options,
                                        record: record,
                                        itemId: '_historicoeventoswin',
                                        gmappanel:view.down('gmappanel'),
                                        centerBtn: view.down('#center'),
                                        preventHeader: true,
                                    }
                                ]
                    		});
                            
                            win.show();
                            
                        }
                    }]
                }
                
                
                
            ],
            hideCollapseTool: true
        }],
    
    initComponent: function(){
        this.callParent();
        
        this.down('vcseguimientoposicionesgridview').gmappanel = this.down('gmappanel');
        this.down('vcseguimientoposicionesgridview').record = this.record;
        
        this.down('vcseguimientoinfoobjectivoview').record = this.record;
        this.down('vcseguimientoinfoobjectivoview').gmappanel = this.down('gmappanel');
        
        this.down('vcseguimientorutagridview').gmappanel = this.down('gmappanel');
        this.down('vcseguimientorutagridview').record = this.record;
        
        this.down('recepcionview').record = this.record;
        

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                    items : [{
        						text : 'Centrar',
        						iconCls : 'icon-center',
                                enableToggle: true,
                                pressed: true,
        						action : 'center',
                                itemId : 'center',
                                toggleGroup: 'center'
        					},{
            					text : 'Descentrar',
        						iconCls : 'icon-center',
                                enableToggle: true,
                                pressed: false,
                                toggleGroup: 'center'
        					}
                        ]
                }); 
                this.addDocked(toolbar);
        
    }
    
});