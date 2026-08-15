//MIGRADO2024
Ext.define( 'Common.controller.ImpuestoItemFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'MG_product_impuestoModel', 'MG_product_impuestoSearchModel' ],
views: [ 'ImpuestoItemFormView', 'ImpuestosHelperView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'impuestoitemformview': {
            beforerender: this.initview,
            impuestoselected: this.ImpuestoSelected
        },
        'impuestoitemformview #btnGuardar': {
            click: this.onSaveClick
        },
        'impuestoitemformview button[action="changeImpuesto"]': {
            click: this.onChangeImpuestoClick
        },
        'impuestoitemformview #quantityCombo': {
            change: this.onQuantityComboChange
        }
    });
}, // cierro init
initview: function(view ) {
    if( !view.record ) {
        //creo un registro nuevo
        console.log( 'sin registro' );
    }
    view.loadRecord( view.record );
},
    
openWindow: function(record, caller ) {
    var title = record.get( 'Name' ); //reemplazar por config
    var view = Ext.widget( 'impuestoitemformview', {
        record: record,
        //callback: this.onEdit,
        scope: this
    }
    );
    var myWindow = Ext.widget( 'window', {
        title: title,
        height: 400,
        width: 400,
        modal: true,
        items: view,
        layout: 'fit',
        caller: caller
    }).show();
},
onSaveClick: function(button, event, options ) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    
    var myform = button.up( 'form' ).getForm();
    var view = button.up( 'impuestoitemformview' );
    var win = button.up( 'window' );
    var caller = win.caller;
    var mymodel = myform.getRecord();
    var mpi_idproduct = view.record.get( 'mpi_idproduct' );
    // myform.updateRecord(mymodel);
    var mpi_impidkey = view.record.get( 'mpi_impidkey' );
    if( !mpi_idproduct ) {
        notifyError( 'Guarde primero el producto antes de agregar impuestos' );
        return;
    }
    if( !mpi_impidkey ) {
        notifyError( 'Seleccione un impuesto' );
        return;
    }
    var model = this.getMG_product_impuestoModelModel();
    var modelSave = Ext.create( model, {
        mpi_impidkey: mpi_impidkey,
        mpi_idproduct: mpi_idproduct
    });
    // ExtJS asigna un phantom id string (p.ej. 'WebMG.model.MG_product_impuestoModel-3')
    // al field 'Id' que es Int32 -> rompe la deserializacion WCF.
    // Limpiamos data.Id a 0 pero mantenemos phantom=true para que el proxy REST haga POST (create), no PUT/0 (update).
    modelSave.data[ model.prototype.idProperty || 'Id' ] = 0;
    modelSave.phantom = true;
    modelSave.setConfig({
        proxy: model.getProxy()
    });
    //verifico si ya tiene un registro en impuesto de productos
    var storeImpuestos = Ext.create( 'Ext.data.Store', {
        model: this.getMG_product_impuestoSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'mpi_idproduct',
            value: mpi_idproduct
        }]
    }).load( {
        callback: function( records ) {
            if( records && records.length > 0 && records.find( r => r.get( 'mpi_impidkey' ) == mpi_impidkey ) ) {
                notifyError( 'El impuesto ya existe' );
                win.close();
                return;
            }
            modelSave.save( {
                scope: this,
                win: win,
                view: view,
                callback: function( record, operation, success ) {
                    if( operation.success ) {
                        notify( 'Los datos se cuardaron correctamente' );
                        var mywin = operation.win;
                        var view = operation.view;
                        if( caller ) {
                            caller.fireEvent( 'objectchanged', caller );
                            mywin.close();
                        }
                    } else {
                        notifyError( 'Hubo un error al guardar' );
                    }
                }
            });
        }
    });
    //
    // mymodel.save({
    // 	scope : this,
    //     win: win,
    //     view: view,
    // 	callback : function(record, operation, success) {
    //         if (operation.success){
    //             notify('Los datos se cuardaron correctamente');
    //             var mywin = operation.win;
    //             var view = operation.view;
    //             if (caller){
    //                 caller.fireEvent('objectchanged',caller);
    //                 mywin.close();
    //             }
    //         } else{
    //             notifyError('Hubo un error al guardar');
    //         }
    // 	},
    // 	button : button
    // });
},
    
deleteObject: function(record ) {
    record.destroy();
    //location.href = location.pathname;
},
    
onChangeImpuestoClick: function(button, event, options ) {
    var view = button.up( 'impuestoitemformview' );
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione un impuesto',
        closeAction: 'destroy',
        itemId: 'impuestoWin',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'impuestoshelperview',
                recordOrganizacion: view.recordOrganizacion
            }
        ]
    });
    win.show();
},
    
ImpuestoSelected: function(record, view ) {
    var form = view.getForm();
    form.findField( '_imp_cdescripcion' ).setValue( record.get( '_imp_cdescripcion' ) );
    // form.findField('Name').setValue(record.get('Name'));
    // form.findField('Price').setValue(record.get('Price'));
    // form.findField('VAT').setValue(record.get('VAT'));
    form.findField( 'Id' ).setValue( view.record.get( 'mpi_idproduct' ) );//id producto
    form.findField( 'mpi_impidkey' ).setValue( record.get( 'Id' ) );//id impuesto
    view.record.set( 'mpi_impidkey', record.get( 'Id' ) );
    // this.calculateTotal(view);
},        
});