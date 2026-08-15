//MIGRADO2024
Ext.define( 'Common.view.FlotaGpsView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.flotagpsview',
    itemId: 'flotagpsview',
    // id : 'flotaPanel',
    layout: 'border',
    frame: false,
    border: 0,
    items: [
        {
            xtype: 'flotagridview',
            selType: 'checkboxmodel',
            selModel: {
                checkOnly: true,
                showHeaderCheckbox: false,
                mode: "MULTI"
            },
            title: 'Datos',
            region: 'west',
            margins: '5 0 0 5',
            width: 650,
            collapsible: true,
            layout: 'fit',
            split: true,
            itemId: 'west'
        },
        {
            xtype: 'gmappanel6',
            cls: 'gmappanel6',
            // id: 'gmappanel6',
            itemId: 'googlemap',
            //anchor: '100% 100%',
            region: 'center',
            //zoomLevel : 2,
            gmapType: 'map',
            mapConfOpts: {
                scrollwheel: true,
                disableDoubleClickZoom: false,
                draggable: true,
                streetViewControl: true,
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: true
                }
            }
        },
        , {
            xtype: 'component',
            cls: 'loadingmap ',
            itemId: 'loadingmap',
            hidden: true,
            html: '<div data-qtip="' + getLocale( 'Cargando' ) + '" class="icon-hourglass" style="height: 16px;width: 16px;margin:0 auto;"></div>'
        }
    ],
    initComponent: function() {
        this.callParent();
        var viewGps = this;
        this.down( 'flotagridview' ).caller = this;
        //------------para fijar perfiles de seguridad según AdministratorSearch-------------
        ///-----https://basecamp.com/2249105/projects/14758734/todos/445523325
        var storeSecurity = Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordTrackGuard = storeSecurity.findRecord( 'KeyReference', 'TrackGuard' );
        var masterModule = storeSecurity.findRecord( 'KeyReference', 'MasterWebDealer' );
        var administratorModule = storeSecurity.findRecord( 'KeyReference', 'Administrator' );

        var url = '/Rest/Security/Modules/7/Security';
        var profile = 2;
        var view = this;
        Ext.Ajax.request( {
            url: url,
            method: 'GET',
            success: function( resp, operation ) {
                var json = resp.responseText ? JSON.parse( resp.responseText ) : null;
                if( json && json.modules && json.modules.length > 0 ) {
                    var modules = json.modules;
                    Ext.Array.each( modules, function( module ) {
                        if( module.view == 'poigridview' ) {
                            console.log( 'Module: ' + module );
                            profile = module.profile;
                        }
                    });
                }
                if( profile == 0 ) {
                    //view.down('#poi').hide();
                }
            }
        });
        //----------------------------------------------------------
        var firstTime = true
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [/*{
                    text : getLocale('DISPOSITIVO'),
                    itemId:'menudispositivos',
                    translate:false,
                    width: 150,
					menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        enableKeyNav:false,
                        ignoreParentClicks: true,
                        handler: function() {return false;},
                        width: 650,
                        hideOnClick: false,
                        listeners: {
                            beforehide: function(){      
                                var grid = viewGps.down('flotagridview');
                                
                                if (grid.cerrando){
                                    grid.cerrando = true;
                                    return true;
                                }else {
                                    return true;
                                }
                            },
                            show: function(){
                                var view = this.down('flotagridview')                                                 
                                if(firstTime) {
                                    //view.getSelectionModel().selectAll(true);
                                    
                                    view.seleccionInicial = viewGps.recordsInicial
                                    firstTime = false;
                                } else {
                                    var selection = view.getSelectionModel().getSelection()
                                    view.store.load({callback:function () {
                                        if(selection.length >0 ) {
                                            var selModel = view.getSelectionModel();
                                            Ext.Array.each(selection, function (record) {
                                                selModel.select(record.index, true)                                
                                            })
                                            
                                        }
                                    }})
                                }
                            }
                        },
                        
                        items: {
                            xtype : 'flotagridview',
                            itemId: 'flotagridview',
                            selType:'checkboxmodel',
                            selModel: {
                                checkOnly: true,
                                showHeaderCheckbox: false,
                                mode: "MULTI"
                            },
                            preventHeader: true,
                            closable: true,
                            caller: viewGps,
                            translate:false,
                            maximized: true,
                            listeners: {
                                beforeclose: function(){
                                    this.cerrando=true;
                                    this.up('menu').hide();
                                    return false;
                                }
                            },
                            hideActions:true,
                            //height: 838
                            //width: 630
                        }
                    }
				}*//*,'-',{
                    text : 'Ver todos',
					iconCls : 'icon-search',
					action : 'searchAll',
                    enableToggle: true,
                    pressed: true,
                    itemId: 'searchall'
				}*/, '-',
                {
                    text: 'Cambiar a Manual',
                    iconCls: 'icon-center',
                    //enableToggle: true,
                    _pressed: true,
                    itemId: 'centerBtn',
                    action: 'center'
                }/*,{
					text : 'Manual',
					iconCls : 'icon-center',
                    enableToggle: true,
                    pressed: false,
                    toggleGroup: 'center'
				}*/, '-',
                /*{
                    text: 'MapMaker',
                    itemId: 'btnMapmaker',
                    pressed: false,
                    enableToggle: true
                },{
                    text: 'OpenStreetMap',
                    itemId: 'btnOsm',
                    pressed: false,
                    enableToggle: true
                },'-',*/
                {
                    text: 'Puntos',
                    iconCls: 'icon-poi',
                    itemId: 'poi',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 620,
                        items: {
                            xtype: 'poigridview',
                            preventHeader: true,
                            height: 400,
                            width: 414,
                            hideActions: true
                        }
                    }
                }, '-',
                {
                    text: 'Dirección',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        enableKeyNav: false,
                        height: 70,
                        width: 250,
                        items: [
                            {
                                xtype: 'form',
                                items: [
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
                }, '-', {
                    text: 'Mostrar etiquetas',
                    itemId: 'mostraretiquetas',
                    iconCls: 'icon-tag-blue',
                    pressed: true,
                    enableToggle: true
                }, '-',
                {
                    text: 'Grupo Geocercas',
                    /*iconCls : 'icon-poi',*/
                    itemId: 'geocercaGroup',
                    menu: {
                        xtype: 'menu',
                        layout: 'fit',
                        width: 620,
                        items: {
                            xtype: 'geocercagroupgridview',
                            preventHeader: true,
                            height: 400,
                            width: 414,
                            hideActions: true
                        }
                    }
                }
                /* {
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
                     
                 }*/
            ]
        });
        this.addDocked( toolbar );
    }
});