Ext.define('WebMG.controller.t_novedades_fcFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'Common.model.t_novedades_fcModel', 'Common.model.t_novedades_fcInsSearchModel' ],
    views : [ 't_novedades_fcFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            't_novedades_fcformview' : {
                beforerender : this.initview,
                productselected: this.onProductChanged
            },
            't_novedades_fcformview #save' : {
                click : this.onSaveClick
            },
            't_novedades_fcformview #changeProduct' : {
                click : this.onChangeProductClick
            },
            't_novedades_fcformview #quantityCombo' : {
                change : this.onQuantityComboChange
            }
        });
    }, // cierro init

    initview : function(view) {
        if (!view.record){
            console.log('sin registro');
        } 

        view.loadRecord(view.record);
    },


    onSaveClick : function(button, event, options) {
        // cambio la cantidad de columnas al panel
        // accedo al registro y lo salvo
        var myform = button.up('form').getForm();
        var view = button.up('t_novedades_fcformview');
        var win = button.up('window');
        var record = view.record;
        caller = view.caller;

        view.getForm().updateRecord(record);

        record.save({
            scope : this,
            win: win,
            view: view,
            callback : function(record, operation, success) {
                
                if (operation.success){
                    notify('Los datos se cuardaron correctamente');
                    var mywin = operation.win;
                    var view = operation.view;
                    if (caller){
                        caller.fireEvent('objectchanged',caller);
                        mywin.close();
                    }
                } else{
                    notifyError('Hubo un error al guardar');
                }
            },
            button : button
        });
        
        return true;
    },

    onDeleteClick : function(button, event, options) {
        var myform = button.up('form').getForm();
        this.deleteObject(myform.getRecord());
        var view = button.up('t_novedades_fcformview');
        var win = button.up('window');
        view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close()
    },
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    },
    
    deleteObject: function(record){
        record.destroy();
        //location.href = location.pathname;
    },
    
    onChangeProductClick : function(button, event, options) {
        var view =button.up('t_novedades_fcformview');
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione un producto',
            closeAction : 'hide',
            itemId: 'productWin',
            width : 750,
            height : 550,
            border : true,
            modal: true,
            view: view,
            items : [
                {
                    xtype: 'producthelperview',
                    recordOrganizacion: view.recordOrganizacion
                }
            ]
        });
        win.show();
        
        //lo pongo por que se dispara 2 veces
        return false;
    },
    
    onProductChanged: function(record, view){
        view.recordSelected = record
        var form = view.getForm();
        
        /*si la organizacion facturadora tiene factura electronica
        y el producto no tiene un impuesto asignado no dejo continuar*/
        if(view.recordOrganizacion.get('org_factelect') == 'AfipCae' && record.get('imp_nporcentaje') == '' ) {
            notify('Es requerido para facturacion electronica, que el producto tenga un impuesto asignado.')
            return false;
        }

        var cant = view.down('#quantityCombo');
        if (!cant.getValue()>0){
            cant.setValue(1);
        }
        
        view.down('#Id').setValue(record.get('Id'));
        view.down('#Name').setValue(record.get('Name'));
        view.down('#Price').setValue(record.get('final_price'));
        view.down('#VAT').setValue('% '+record.get('imp_nporcentaje'));
        view.down('#nov_cimpuesto1').setValue(record.get('imp_ccodigo'));
        
        this.calculateTotal(view);
    },
    
    
    onQuantityComboChange: function(combo, newValue){
        var view = combo.up('t_novedades_fcformview');
        this.calculateTotal(view);
    },
    
    calculateTotal: function(view){
        var form = view.getForm();
        var price = form.findField('Price').getValue();
        var cant = form.findField('Quantity').getValue();
        var subTotal = price*cant;
        
        if(view.recordSelected && view.recordSelected.get('imp_nporcentaje') != '') {
            var vat = view.recordSelected.get('imp_nporcentaje')/100;
        } else {
            var vat = view.recordSelected?(view.recordSelected.get('VAT')/100):0;
        }
        var itemVAT = subTotal*vat;
        var total = subTotal + itemVAT;
        
        view.down('#_subTotal').setValue(subTotal);
        view.down('#_VAT').setValue(itemVAT);
        view.down('#Total').setValue(total);
    }
});