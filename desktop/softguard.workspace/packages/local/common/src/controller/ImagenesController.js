//MIGRADO2024
Ext.define( 'Common.controller.ImagenesController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'ImagenesSearchModel' ],
    views: [ 'ImagenesView', 'ImagenROView' ],
    init: function (config ) {
        var me = this;
        // genero los eventos
        this.control( {
            'imagenesview button[action=delete]': {
                click: this.onDeleteClick
            },
            'imagenesview button[action=add]': {
                click: this.onAddClick
            },
            'imagenesview button[action=save]': {
                click: this.onSaveClick
            },
            'imagenesview button[action=saveplantilla]': {
                click: this.onSavePlantillaClick
            },
            /* Walter Cruz
            Cambie la view que tenia por otra porque las imagenes aparecian gigantes con la anterior view 
            Codigo: BC435157400
            */
            'imagenesview': {
                beforerender: this.loadData,
                objectedit: this.onObjectEdit,
                previewImageClick: this.onPreviewImageClick
            }
        });
    }, // cierro init
    loadData: function (view ) {
        var record = view.record;
        var module = view.module;
        var profile = module ? module.get( 'profile' ) : 1;
        view.profile = profile;
        if( profile < 2 && view.down( 'toolbar' ) ) {
            view.down( 'toolbar' ).hide();
        }
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore = Ext.create( 'Ext.data.Store', {
            model: 'Common.model.ImagenesSearchModel',
            remoteFilter: false
        });
        // una vez que cargue el store hago el binding con la view
        mystore.load( { params: { cue_iid: record.get( 'cue_iid' ) }, view: view, store: mystore, callback: this.doBindStore });
        // no pongo toolbar por la forma rara de los stores, tengo que poner los parametros en otro lado.
        //view.down('pagingtoolbar').bindStore(mystore);
        var storeKeyModule = KeyModulesStore;//this.getKeyModulesStoreStore();
        var isAvailable = storeKeyModule.isModuleAvailable( 'Video' );
        if( !isAvailable ) {
            notify( 'No es posible acceder a la funcionalidad completa de esta solapa. Consulte con el proveedor del servicio.' )
            view.down( 'gridview' ).setDisabled( true );
        }
        //var storeKey = Ext.data.StoreManager.lookup('SecurityModulesStore');  
        //var module = storeKey.findRecord('KeyReference', 'Video');
    },
        
    doBindStore: function(records, operation, success ) {
        if( success ) {
            operation.view.bindStore( operation.store );
        }
    },
    onDeleteClick: function(button, event, options ) {
        var view = button.up( 'gridzone' );
        var selection = view.getSelectionModel().getSelection();
        if( selection.length > 0 ) {
            view.store.remove( selection );
        }
    },
    onAddClick: function(button, event, options ) {
        var view = button.up( 'imagenesview' );
        var cuenta = view.record;
        var store = view.getStore();
        var records = store.add( {
            zon_iidcuenta: cuenta.get( 'Id' ),
            zon_cAlarmaAGenerar: 'NYR',
            zon_nmostrar: 2,
            zon_ccuenta: '',
            zon_nautoprocesa: 2
        });
        this.openFormWindow( 'Nueva zona', records[ 0 ], view );
    },
        
    onSavePlantillaClick: function (button, event, options ) {
        var view = button.up( 'imagenesview' );
        var drop = view.down( '#zonaplantillacombo' );
        var store = view.store;
        var modelZona = this.getZonaPlanillaModelModel();
        if( drop.getValue() != '' ) {
            var zona = this.getSoftguardZonaModelModel();
            var mystore = Ext.create( 'Ext.data.Store', {
                model: this.getZonaPlanillaSearchModelModel(),
                remoteSort: true,
                remoteFilter: true,
                filters: [ {
                    property: 'zon_iid',
                    value: drop.getValue()
                }]
            });
            mystore.load( {
                callback: function( records, operation, success ) {
                    if( records.length > 0 ) {
                        Ext.each( records, function( record ) {
                            var nuevaZona = store.add( {
                                zon_iidcuenta: view.record.get( 'Id' ),
                                zon_ccodigo: record.get( 'zon_ccodigo' ),
                                zon_cdescripcion: record.get( 'zon_cdescripcion' ),
                                zon_codigoalarma: record.get( 'zon_codigoalarma' ),
                                zon_clistaemergencia: record.get( 'zon_clistaemergencia' ),
                                zon_cimagen: record.get( 'zon_cimagen' ),
                                zon_mobservacion: record.get( 'zon_mobservacion' ),
                                zon_ccodigorestauracion: record.get( 'zon_ccodigorestauracion' ),
                                zon_nminutosrestauracion: record.get( 'zon_nminutosrestauracion' ),
                                zon_nmostrar: record.get( 'zon_nmostrar' ),
                                zon_cdealer: record.get( 'zon_cdealer' ),
                                zon_ccuenta: record.get( 'zon_ccuenta' ),
                                zon_nautoprocesa: record.get( 'zon_nautoprocesa' )
                            });
                        }, this );
                    } else {
                        notify( 'No se encontraron registros para esta plantilla.' );
                    }
                }
            })
        } else {
            notify( 'Debe seleccionar una plantilla.' );
        }
    },
    onSaveClick: function (button, event, options ) {
        var view = button.up( 'imagenesview' );
        var store = view.store;
        var t = this;
        var valido = true;
        store.each( function( record ) {
            var codigo = record.get( 'zon_ccodigo' );
            var idcodigo = record.get( 'Id' );
            store.each( function( recordx ) {
                var codigox = recordx.get( 'zon_ccodigo' );
                var idcodigox = recordx.get( 'Id' );
                if( t.trim( codigo ) == t.trim( codigox ) && t.trim( codigo ).indexOf( "PAR" ) != -1 ) {
                    if( idcodigo != idcodigox ) {
                        valido = false;
                        notify( 'El codigo ' + record.get( 'zon_ccodigo' ) + ' ya se encuentra en uso.' );
                    }
                }
            });
        });
        if( valido ) {
            store.sync();
            notify( 'Los cambios se guardaron con éxito' );
        }
    },
        
    trim: function(str ) {
        return str.replace( /^\s+|\s+$/g, '' );
    },    
    openFormWindow: function(title, record, grid ) {
        var view = grid.up( 'gridzone' ) ? grid.up( 'gridzone' ) : grid;
        if( view.profile >= 2 ) {
            var newView = Ext.widget( 'zonaformview', {
                record: record,
                caller: grid,
                profile: view.profile
            });
            // Lo agregamos al panel
            var myWindow = Ext.widget( 'window', {
                title: title,
                height: 450,
                width: 400,
                modal: true,
                items: newView,
                closable: false,
                layout: 'fit'
            }).show();
        } else {
            notifyError( 'No posee derechos para esta operación' );
        }
    },
        
    onObjectEdit: function(record, view ) {
        this.openFormWindow( record.get( 'usu_cnombre' ), record, view );
    },
    /* Walter Cruz
        Cambie la view que tenia por otra porque las imagenes aparecian gigantes con la anterior view 
        Codigo: BC435157400
    */
    onPreviewImageClick: function(record, grid ) {
        console.log("onPReviewImageClick")
        var view = grid.up( 'imagenesview' );
        var _rec_iid = record.get( 'rec_iid' );
        view.win = Ext.widget( 'window', {
            title: 'Imagen',
            height: 580,
            width: 580,
            modal: true,
            closeAction: 'destroy',
            itemId: 'previewImage',
            autoScroll: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'uxiframe',
                    itemId: 'imagenesSlider',
                    src: '/handler/EventImagenGalleryHTML?rec_iid=' + _rec_iid + '&cue_iid=' + record.get( 'gri_iidcuenta' ) + '&thum=false&onlyEvent=true&moduleCaller=' + this.application._nameModule,
                    border: false,
                    scroll: false
                }
            ]
        });
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [ {
                type: 'button',
                iconCls: 'icon-arrow-rotate-anticlockwise',
                handler: function( btn ) {
                    var iframe = btn.up( 'window' ).down( '#imagenesSlider' );
                    var ele = iframe.getEl();
                    document.getElementById( 'iframe-' + ele.id ).contentWindow.rotateRight();
                }
            }, {
                    type: 'button',
                    iconCls: 'icon-arrow-rotate-clockwise',
                    handler: function( btn ) {
                        var iframe = btn.up( 'window' ).down( '#imagenesSlider' );
                        var ele = iframe.getEl();
                        document.getElementById( 'iframe-' + ele.id ).contentWindow.rotateLeft();
                    }
                }]
        });
        view.win.addDocked( toolbar );
        view.win.show();
    }
});