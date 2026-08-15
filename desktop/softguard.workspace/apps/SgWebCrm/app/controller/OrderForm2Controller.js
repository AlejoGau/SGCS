Ext.define( 'SGWebCrm.controller.OrderForm2Controller', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'ActionModel', 'GeographyModel', 'OrderModel', 'OrderItemSearchModel', 't_comprobantes_fcSearchModel' ],
views: [ 'ExtUxNotification', 'OrderForm2View' ],

init: function(config ) {
    // genero los eventos

    this.control( {
        
        'orderform2view': {
            afterrender: this.initView,
            render: this.initView
            
            
        },
        'orderform2view button[action="save"]': {
            click: this.onSaveClick
        },
        'orderform2view #comboPais': {
            change: this.onCountryChange
        },
        'orderform2view button[action="delete"]': {
            click: this.onDeleteClick
        },
        'orderform2view #enviarpormail': {
            click: this.onEnviarPorMail
        }
    });
}, 
        
onEnviarPorMail: function (btn ) {
    var view = btn.up( 'orderform2view' )
    var controller = this
    var parentorderid = view.record.get( 'Id' );
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getOrderItemSearchModelModel(),
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true
    });
    store.filter( {
        property: 'orderId',
        value: parentorderid
    });

    store.load( {
        callback: function( records, operation, success ) {
            if( store.data.length > 0 ) {
                var items = Ext.encode( Ext.Array.pluck( store.data.items, 'data' ) );
                var info = Ext.encode( view.record.data );
                var infoClone = Ext.clone( view.record.data )
                var recordSearch = view.recordSearch ? Ext.encode( view.recordSearch.data ) : info;
                infoClone.ForecastDate = Ext.Date.format( view.record.get( 'ForecastDate' ), 'd-m-Y' );
                infoClone.DateCreated = Ext.Date.format( view.record.get( 'DateCreated' ), 'd-m-Y' );

                view.baseurl = '/handler/OrderPrintHtml?dc='+new Date().getTime();
                console.log( items )
                Ext.Ajax.request( {
                    url: view.baseurl,
                    method: 'POST',
                    params: {
                        items: items,
                        info: Ext.encode( infoClone ),
                        infoSearch: recordSearch,
                        currency: (view.recordOrganizacion && view.recordOrganizacion.get('mon_csymbol'))?view.recordOrganizacion.get('mon_csymbol'):getParametro('SYSTEMCURRENCY',false,true).codigo
                    },
                    success: function( resp ) {
                        if( resp.responseText ) {
                            var html = resp.responseText
                            var model = controller.getActionModelModel();
                            var action = Ext.create( model, {
                                Id: 0,
                                ActionType: '5',
                                Name: getLocale( 'Cotizacion' ),
                                CreatorObjectId: view.record.get( 'Id' ),
                                CreatorObjectTypeId: view.record.get( 'ObjectTypeId' )
                            });

                            var viewWin = Ext.widget( 'mailactionformview', {
                                record: action,
                                recordSearch: recordSearch,
                                caller: view,
                                hideEliminar: true,
                                recordOrganizacion: view.recordOrganizacion,
                                hideTemplate: true,
                                bodyMail: html,
                                closeAction: 'destroy'
                            }
                            );
                            var myWindow = Ext.widget( 'window', {
                                title: 'Envio de cotizacion',
                                height: 400,
                                translate: false,
                                width: 600,
                                modal: true,
                                items: viewWin,
                                layout: 'fit'
                            }).show();
                        }
                    }
                });
            } else {
                notify( 'Debe agregar items a la cotizacion.' )
            }
        }
    })
},
OnAddedRecord: function(addedRecord,view){
    view.loadRecord(addedRecord);
},
initView: function(view ) {
    alert('INGRESANDO AL INITVIEW');
    var record = view.record;

  
    view.countryStore = Ext.create( 'Ext.data.Store', {
        model: this.getGeographyModelModel(),
        storeId: 'countryStore',
        remoteFilter: true,
        sorters: [ {
            property: 'Name', direction: 'ASC'
        }],
        filters: [ {
            property: 'Parent',
            value: 0
        }
        ]
    })

    var countryStore = view.countryStore;

    var countryCombo = view.down( '#comboPais' );
    var stateStore = Ext.create( 'Ext.data.Store', {
        model: this.getGeographyModelModel(),
        sorters: [ {
            property: 'Name', direction: 'ASC'
        }],
        remoteFilter: true
    })

    view.stateStore = stateStore;
    var stateCombo = view.down( '#comboProvincia' );

    stateCombo.bindStore( stateStore );
    countryCombo.bindStore( view.countryStore );
    countryStore.load();

    if( record ) {
      
        var v = view.down( 'orderitemsearchview' );
        record.get( 'Id' ) > 0 ? v.setDisabled( false ) : v.setDisabled( true );


        view.loadRecord( record );
        view.down( '#forecastdate' ).setMinValue( record.get( 'DateCreated' ) )
    } else {
        Ext.Function.defer( this.initview, 1000, this, [ view ] );
        view.down( '#forecastdate' ).setMinValue( new Date() )
    }
},    

fillComboWithTaxo: function(comboid, view ) {
    var a = this.comboList = this.comboList || [];
    var combo = view.down( comboid );

    //saveData, los combo parent no tiene que guardar su dato, el hijo lo setea
    if( combo.hasComboChildren == true ) {
        combo.addListener( 'change', function( This, newValue, oldValue, eOpts ) {
            var view = This.up( 'form' );
            var newcombo = [ view.down( 'combo[taxoId=' + newValue + ']' ) ]
                .concat( [ view.down( 'textfield[taxoId=' + newValue + ']' ) ] )
                .concat( [ view.down( 'textarea[taxoId=' + newValue + ']' ) ] );
            var oldcombo = [ view.down( 'combo[taxoId=' + oldValue + ']' ) ]
                .concat( [ view.down( 'textfield[taxoId=' + oldValue + ']' ) ] )
                .concat( [ view.down( 'textarea[taxoId=' + oldValue + ']' ) ] );

            if( oldValue !== undefined && oldValue != null && oldValue != "" && oldValue != 0 ) {
                Ext.Array.each( oldcombo, function( item, index ) {
                    if( item ) {
                        item.setVisible( false )
                        if( item.setValue )
                            item.setValue( null );
                        if( item.select )
                            item.select( null );
                    }
                });
            }

            if( newValue !== undefined && newValue != null && newValue != "" && newValue != 0 ) {
                Ext.Array.each( newcombo, function( item, index ) {
                    if( item )
                        item.setVisible( true );
                });
            }
        }
        );
        combo.saveData = combo.saveData || false;
    }

    if( combo.saveData != false ) {
        a.unshift( combo );
    }

    //parentComboTaxo, si tiene padre lleva el id de la taxo padre
    if( combo.parentComboTaxo !== undefined ) {
        combo.setVisible( false );
    }

    combo.emptyText = '-Seleccione-';
    combo.lastQuery = '';
    combo.valueField = 'id';
    combo.displayField = 'text';

    var taxoId = combo.taxoId;
    var objectId = view.record.get( 'Id' );

    combo.addListener( 'change', function( o, newValue, oldValue ) {

        var s = o.getStore();
        var old = s.findRecord( 'id', oldValue );
        if( old ) {
            old.set( 'checked', false );
            old.setDirty();
        }
        var record = s.findRecord( 'id', newValue )
        if( record ) {
            record.set( 'checked', true );
            record.setDirty();
        }
    });

    var store = Ext.create( 'Ext.data.Store', {
        model: this.getTaxonomyTreeSearchModelModel(),
        pageSize: 50,
        remoteSort: false,
        sorters: [ {
            property: 'text',
            direction: 'ASC'
        }],
        remoteFilter: false
    });
    combo.bindStore( store );
    store.load( {
        scope: { ObjectId: objectId, ObjectTypeName: 'Order' },
        params: { node: taxoId },
        callback: function( records ) {

            Ext.Array.each( records, function( record ) {
                var c = record.get( 'checked' );
                if( c ) {
                    var v = record.get( 'id' );
                    combo.setValue( v );
                    combo.originalValue = v;

                    //parentComboTaxo, esto va en los hijos y setea el padre
                    if( combo.parentComboTaxo !== undefined ) {
                        var comboparent = combo.up( 'form' ).down( 'combo[taxoId=' + combo.parentComboTaxo + ']' );
                        if( comboparent )
                            comboparent.setValue( combo.taxoId );
                        comboparent.originalValue = combo.taxoId;
                    }

                    return false; // break here
                }
            });
        }
    });
},
        
onSaveClick: function(button, event, options ) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    myform = button.up( 'form' ).getForm();
    var view = button.up( 'orderform2view' );
    mymodel = view.record;
    myform.updateRecord( mymodel );

    if( myform.isValid() ) {
        var v = view.down( 'orderitemsearchview' );
        //v.store.sync(); no hace falta

        if( mymodel.get( 'ForecastDate' ) == null ) {
            mymodel.set( 'ForecastDate', new Date( -62135586000000 ) );
        };
        if( mymodel.get( 'DateCreated' ) == null ) {
            mymodel.set( 'DateCreated', new Date( -62135586000000 ) );
        };
        //var proxy = mymodel.getProxy();
        //var oldUrl = proxy.url;
        //var url = '/Rest/organization/' + mymodel.get( 'ClientId' ) + '/order';
        //var url = '/Rest/order/';
        
        
        mymodel.save( {
            scope: this,
            callback: function( record, operation ) {
                notify( 'Los datos se guardaron correctamente' );
                v.setDisabled( false );
                //if(record.get("Id")!=0)
                //    proxy.url = '/Rest/order/'+record.get("Id");
                view.record = record;
                if( view.caller ) {
                    view.caller.fireEvent( 'refresh', view.caller )
                }
            },
            button: button
        });
    } else {
        notify( 'No se ha guardado. Hay datos inválidos.' );
    }
},

onDeleteClick: function(button, event, options ) {
    var view = button.up( 'orderform2view' );
    var record = view.record;

    record.destroy( {
        callback: function() {
            var center = view.up( 'center' );
            view.close();
            if( center ) {
                var paging = center.down( 'ordergridview' ).down( 'pagingtoolbar' );
                paging.moveFirst();
                paging.doRefresh();
            }
        }
    });
},
        
openObjectTab: function(tabpanel, objectId, objectTypeName, title ) {
    var container = objectTypeName.toLowerCase() + 'view';
    var newTab = tabpanel.down( '[title="' + title + '"]' );

    if( !newTab ) {
        var newTab = Ext.widget( container, {
            title: title,
            border: false,
            closable: true,
            objectId: objectId,
            targetTab: tabpanel,
            autoDestroy: true
        });

        tabpanel.add( newTab );
    }

    tabpanel.setActiveTab( newTab );
},    
        
onCountryChange: function(combo, newvalue, oldvalue ) {
    var view = combo.up( 'orderform2view' );
    var stateCombo = view.down( '#comboProvincia' );
    var stateStore = stateCombo.getStore();

    stateStore.filter( {
        property: 'Parent',
        id: 'Parent',
        value: newvalue
    });
},

onDeleteClick: function(button, event, options ) {
    var view = button.up( 'orderform2view' );
    var record = view.record;

    record.destroy( {
        callback: function() {
            var ordergridview = view.up( 'tabpanel' ).down( 'ordergridview' );
            notify( 'Los datos se eliminaron con éxito.' )
            view.close();

            if( ordergridview ) {
                var paging = ordergridview.down( 'pagingtoolbar' );
                paging.moveFirst();
                paging.doRefresh();
            }
        }
    });
}
});