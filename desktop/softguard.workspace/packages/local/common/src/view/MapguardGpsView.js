//MIGRADO2024
Ext.define('Common.view.MapguardGpsView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.mapguardgpsview',
  //  id : 'flotaPanel',
    forceClose: true,
    layout : 'border',
    frame : false,
    border : 0,
    items: [
        {
            xtype: 'gmappanel6',
            cls: 'gmappanel6',
            itemId: 'googlemap',
            //anchor: '100% 100%',
            region: 'center',
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
                },
                mapTypeControlOptions: {
                  style: 1
                }
            }
        },{
            xtype:'component',
            cls: 'loadingmap ',        
            itemId:'loadingmap',
            hidden:true,
            html:'<div data-qtip="'+getLocale('Cargando')+'" class="icon-hourglass" style="height: 16px;width: 16px;margin:0 auto;"></div>'
        }
    ],
    
    initComponent: function(){
        this.callParent();
        
        var gmappanel6 = this.down('gmappanel6');
        var view = this;
        
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
			items : [
                
                {
                    text: 'Móviles', 
                    iconCls: 'icon-patrulla',
                    itemId:'btnMovil',
                    menu: {
                        xtype: 'menu',
                            layout: 'fit',
                            width: 500,
                            height: 550,
                            plain: true,

                            items: {
                                    
                            xtype : 'movilesgridview',
                                hideOnClick: false,
                            selType:'checkboxmodel',
                                selModel: {
                                checkOnly: true                            },
                                preventHeader: true,
                                parentview: this,
                                GMAPPANEL: gmappanel6,
                                caller: view,
                                fireSelectionChange: true,
                            showTipoFiltro:true
                            }
                    }
                },
                /*{
                    text: 'Móviles OLD',
                    iconCls: 'icon-patrulla',
                   
                    
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 500,
                        height: 500,
                        plain: true,
                        closable : true,
                        closeAction: 'hide',
                        
                        items: {
                                    
                            xtype : 'mapguardgridview',
                            hideOnClick: false,
                            selType:'checkboxmodel',
                            selModel: {
                                checkOnly: true,
                                mode: "MULTI"
                            },
                            preventHeader: true,
                            parentview: this      
                        }
        		    } 
                },*/{
                    text: 'trackguard',
                    iconCls: 'icon-trackguard',
                    itemId:'btntrackguard',
                    
                    menu: {
                            xtype: 'menu',
                            layout: 'fit',
                            width: 650,
                            height: 500,
                           /* listeners: {
                                show: function (win) {
                                    var view = win.up('mapguardgpsview')
                                    console.log(view)
                                    view.onSetUrlGeoJson('',view,true)
                                }
                            },*/
                            itemId:'trackguardmenu',
                            plain: true,
                            //closable : true,
                            //closeAction: 'hide',
                            items: {
                                xtype : 'flotagridview',
                                hideOnClick:false,
                                itemId : 'flotagridview',
                                selType:'checkboxmodel',
                                selModel: {
                                    checkOnly: true,
                                    mode: "MULTI"
                                },
                                preventHeader: true,
                                parentview:'mapguardgpsview',
                                caller : view,
                                selectNone: true
                            }
                        }
                               
                },{
                    text: 'SmartPanics',
                    iconCls: 'icon-smartpanics',
                    itemId: 'smartPanics',
                    menu: {
                            
                                xtype: 'menu',
                                layout: 'fit',
                                width: 800,
                                height: 500,
                                itemId:'smartpanicmenu',
                                plain: true,
                                //closable : true,
                                //closeAction: 'hide',
                                items: {
                                    xtype : 'smartpanicgridview',
                                    showTipoFiltro: true,
                                    preventHeader: true,
                                    fireSelectionChange: true,
                                    noEditDblClick: true,
                                    pageSize: 10000,
                                    sacarcuentaHide:true,
                                    nuevoHide:true,
                                    GMAPPANEL: gmappanel6,
                                    caller: view
                                }
                    	    }
                                
                              
                    
                },{
                    text: 'SmartTrack',
                    itemId: 'smartTrack',
                    iconCls: 'icon-vigicontrol',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 600,
                        height: 500,                       
                        plain: true,
                        itemId: 'vigicontrolmenu',
                        //closable : true,
                        //closeAction: 'hide',
                        items: {
                            xtype : 'smarttrackextendedgridview',                            
                            preventHeader: true,
                            noEditDblClick: true,
                            selType:'checkboxmodel',
                                selModel: {
                                    checkOnly: true,
                                    mode: "MULTI"
                                },
                            fireSelectionChange: true,
                            pageSize: 10000,
                            itemId:'vigicontrollgrid',
                            GMAPPANEL: gmappanel6,
                            showTipoFiltro: true,
                            caller: view
                        }
                    }
                },{
                    text: 'SerTec',
                    iconCls: 'icon-serviciotecnico',
                    itemId:'btnservtec',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 600,
                        height: 500,
                        plain: true,
                        //closable : true,
                        //closeAction: 'hide',
                        items: {
                            xtype : 'mapguardforservtecgridview',
                           
                            selType:'checkboxmodel',
                                selModel: {
                                    checkOnly: true,
                                    mode: "MULTI"
                                },
                            preventHeader: true,
                            GMAPPANEL: gmappanel6,
                            itemId:'servtecgrid',                            
                            fireSelectionChangeName: 'markersServtecChange',
                            caller: view,
                            parentview: this,
                            //es por que aun no se utiliza el imei
                            servtec: true
                        }
                        
                    }
                }
                ,{
        			text : 'Cuentas fijas',
                    iconCls: 'icon-cuenta-home',
                    enableToggle: true,
                    pressed: false,
                    itemId: 'cuentasfijas',
					action : 'showCuentas'
                },{
                    text : 'Cercos',
                    iconCls: 'icon-geocerca',
                    enableToggle: true,
                    pressed: false,
                    itemId: 'cercosId',
                    action : 'showcercos'
				},{
            		text : 'Cámaras Cuentas',
                    iconCls: 'icon-camara',
                    enableToggle: true,
                    pressed: false,
                    itemId: 'camaras',
					action : 'showCamaras'
				},{
                	text : 'Cámaras Zonas',
                    iconCls: 'icon-camara-zona',
                    enableToggle: true,
                    pressed: false,
                    itemId: 'camaraszonas',
					action : 'showCamarasZonas'
				},'-',
                {
                    text: 'Eventos',
                    itemId: 'eventoGrid',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 600,
                        height: 500,
                        plain: true,
                        //closable : true,
                        //closeAction: 'hide',
                        items: {
                            xtype : 'cuentaeventospendientesgridview',
                            preventHeader: true,
                            fireSelectionChange:true,
                            parentView:'mapguardgpsview'
                        }
                    }
                },{
            		text : 'HeatMap (beta)',
                    itemId: 'heatmap',

                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 350,
                        height: 300,
                        plain: true,
                        //closable : true,
                        //closeAction: 'hide',
                        items: {
                            xtype : 'heatmapview',
                            preventHeader : true,
                            fireSelectionChange : true,
                            parentView : 'mapguardgpsview'
                        }
                    }
                    
				},
                {
                    iconCls: 'icon-control-play',
                    action: 'play',
                    itemId: 'cuentas2',
                    pressed: true,
                    hidden: true,
                    toggleGroup: 'control'
                },
                {
                    iconCls: 'icon-control-stop',
                    pressed: false,
                    itemId: 'cuentas3',
                    toggleGroup: 'control',
                    hidden: true,
                    action: 'stop'
                },
                '-',
                {
    				text : 'Cambiar a Manual',
					iconCls : 'icon-center',
                  //  enableToggle: true,
                    _pressed: true,
                    itemId: 'center',
					action : 'center'
				}
                ,'-',{
                    text: 'Mostrar etiquetas',
                    itemId: 'mostraretiquetas',
                    iconCls:'icon-tag-blue',
                    pressed: true,
                    enableToggle: true
                },
                {
                    text : 'Dirección',
    				menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        //enableKeyNav:false,
                        height: 70,
                        width: 250,
                        items: [
                            {
                                xtype: 'form',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        itemId: 'address',
                                        enableKeyEvents:true,
                                        listeners:{
                                            keyup:function(o, e){
                                                if(e.button==31){    
                                                    this.setValue(this.getValue() + " ");
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Mostrar',
                                        itemId: 'btnAddress',
                                        handler: 'onAddressClick'
                                    }
                                ]
                            }
                            
                        ]
                    }
				}     
            ]
        }); 
        this.addDocked(toolbar);
        
    /*    var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
    		items : [
                 {
                    text: 'En movimiento',
                    itemId: 'enmovimiento',
                    iconCls:'icon-tg-upright',
                    pressed: true,
                    enableToggle: true
                },
                {
                    text: 'Detenidos',
                    itemId: 'frenado',
                    iconCls:'icon-tg-stop',
                    pressed: true,
                    enableToggle: true
                },
                {
                    text: 'No actuales',
                    itemId: 'viejas',
                    pressed: false,
                    iconCls:'icon-tg-exclamation',
                    enableToggle: true
                },
                {
                    text: 'Con alarma',
                    itemId: 'conalarma',
                    pressed: true,
                    iconCls:'icon-tg-upright-alert',
                    enableToggle: true
                    
                }
            ]
        })
        
        this.down('#trackguardmenu').addDocked(toolbar);*/
        
        
        
       
        
        
       
        
        
    }
    
});