//MIGRADO2024
Ext.define('Common.view.MapGuardEventosView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.mapguardeventosview',
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
            zoomLevel : 2,
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
        },
        {
        split: true,
        xtype: 'panel',
        title : 'Datos',
        itemId : 'panel',
        layout:'vbox',
        region : 'east',
        width: 300,
        maxWidth: 500,
        collapsed: false,
        collapsible: false,
        animCollapse: false,
        defaults: { // defaults are applied to items, not the container
            autoScroll: true,
            collapsible : false,
            collapsed : false,
            animCollapse: false
        },
        listeners:{
            collapse: function(panel){
               /* if (panel.up('#mapguardgpsview')){
                    var gmappanel6 = panel.up('#mapguardgpsview').down('#gmappanel6');
                    var gmapsize = gmappanel6.getSize();
                    gmappanel6.setSize(gmapsize.width,gmapsize.height);
                } */
            }  
        },
        items : [
            {
                xtype:'panel',
                width:'100%',   
                autoScroll:false,
                itemId:'infoevento',
                height:80,
                defaults: {
                    fieldStyle :{
                            fontSize:"14px",
                            height:"auto",
                            fontWeight:"bold",
                            padding:'5px 0 5px 0',
                            textAlign:"center"
                        }
                },
                items:[
                        {
                            xtype:'displayfield',
                            //fieldLabel: 'Cuenta',
                            itemId:'cuenta',
                            labelWidth:50,
                            width:'100%',   
                        },{
                            xtype:'displayfield',
                           // fieldLabel: 'Evento',
                            itemId:'evento',
                            labelWidth:50,
                            width:'100%',
                             
                        }
                    ]
          
            },
            {
                xtype:'tabpanel',
                itemId : 'datapanel',
                width:'100%',
                autoScroll:false,
                flex:2
            }
        ]
    }
    ],
    
    initComponent: function(){
        this.callParent();
        var gmappanel6 = this.down('gmappanel6')
        var view = this;
        
        var gmappanel6 = this.down('gmappanel6');
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
			items : [
                {
                    text: 'Móviles',
                    itemId:'menuMovil',
                    menu: {
                        xtype: 'menu',                        
                        layout: 'fit',
                        width: 400,
                        height: 500,
                        items: 
                            {
                                        
                                xtype : 'movilesgridview',
                                //hideOnClick: false,
                                preventHeader: true,
                                parentview: this,
                                GMAPPANEL: gmappanel6,
                                caller: view,
                                fireSelectionChange: true,
                                showTipoFiltro:true,
                                recordEvento: view.record,
                                selType:'checkboxmodel',
                                selModel: {
                                    checkOnly: true,
                                    mode: "MULTI"
                                },
                                onSelectEvent: 'vehicleSelected'
                            }
        		    }
                },{
                    text: 'SerTec',
                    hidden:true,
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 600,
                        height: 500,
                        plain: true,
                        items: {
                            xtype : 'mapguardforservtecgridview',
                            selType:'checkboxmodel',
                                selModel: {
                                    checkOnly: true,
                                    mode: "MULTI"
                                },
                            preventHeader: true,
                            recordEvento: view.record,
                            itemId:'servtecgrid',
                            fireSelectionChangeName: 'markersServtecChange',
                            parentview:'mapguardeventosview',
                        }
                        
                    }
                },{
                    text: 'CleanApp',
                    itemId: 'cleanapp',
                    iconCls: 'icon-cleanapp',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 600,
                        height: 500,
                        itemId:'vigicontrolmenu',
                        plain: true,
                        items: 
                            Ext.widget('smarttrackextendedgridview',
                                {
                                //  xtype : 'smarttrackextendedgridview',
                                filterAppType: 'CLEANAPP', //filtro para los dispositivos CleanApp                 property: 'AppType',value: 'CLEANAPP'
                                selType:'checkboxmodel',
                                    selModel: {
                                        checkOnly: true,
                                        mode: "MULTI"
                                    },
                                    preventHeader: true,
                                    recordEvento: view.record,
                                    fireSelectionChange: true,
                                    pageSize: 10000,
                                    parentView:'mapguardeventosview',
                                    noEditDblClick: false,
                                    itemId:'smartrackevento'+Math.floor((Math.random() * 9999999) + 1),
                                    GMAPPANEL:gmappanel6,
                                    caller:view,
                                    sendSelectionToEvent: 'smarttrackSelected'
                                }
                            )
                            
                          /*  {
                            xtype : 'smarttrackextendedgridview',                            
                            preventHeader: true,
                            fireSelectionChange: true,
                            pageSize: 10000,
                            parentView:'mapguardeventosview',
                            noEditDblClick: true
                        }*/
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
                        itemId:'vigicontrolmenu',
                        plain: true,
                        items: 
                            Ext.widget('smarttrackextendedgridview',
                                {
                                //  xtype : 'smarttrackextendedgridview',
                                filterAppType: 'VIGICONTROL', //filtro para los dispositivos smartrack
                                selType:'checkboxmodel',
                                    selModel: {
                                        checkOnly: true,
                                        mode: "MULTI"
                                    },
                                    preventHeader: true,
                                    recordEvento: view.record,
                                    fireSelectionChange: true,
                                    pageSize: 10000,
                                    parentView:'mapguardeventosview',
                                    noEditDblClick: false,
                                    itemId:'smartrackevento'+Math.floor((Math.random() * 9999999) + 1),
                                    GMAPPANEL:gmappanel6,
                                    caller:view,
                                    sendSelectionToEvent: 'smarttrackSelected'
                                }
                            )
                            
                          /*  {
                            xtype : 'smarttrackextendedgridview',                            
                            preventHeader: true,
                            fireSelectionChange: true,
                            pageSize: 10000,
                            parentView:'mapguardeventosview',
                            noEditDblClick: true
                        }*/
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
               /* {
                    text : '',
                    itemId: 'cuentas4',
                    iconCls : 'x-tbar-loading',
                    tooltip: getLocale('Actualizar datos'),
                    action: 'actualizarcuentas'
                },*/'-',
                {
        			text : 'Cambiar a Manual',
					iconCls : 'icon-center',
                    //enableToggle: true,
                    _pressed: true,
                    itemId: 'center',
					action : 'center'
				},{
                    xtype: 'combo',
                    itemId: 'tipoCentrado',
                    fieldLabel: '',
                    store: [['cuenta',getLocale('Centrar cuenta')],['todo',getLocale('Centrar todo')]],
                    queryMode: 'local'
                },'-',{
                    text: 'Mostrar etiquetas',
                    itemId: 'mostraretiquetas',
                    iconCls:'icon-tag-blue',
                    pressed: false,
                    enableToggle: true
                },'-',
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
                                        itemId: 'btnAddress'
                                    }
                                ]
                            }
                        ]
                    }
				}   
            ]
        }); 
        this.addDocked(toolbar);
        
        //para que se inicie bien la view
        //view.down('#menuMovil').menu.show()
        //view.down('#menuMovil').menu.hide()
    }
    
});