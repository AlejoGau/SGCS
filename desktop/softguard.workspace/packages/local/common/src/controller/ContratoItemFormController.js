Ext.define('Common.controller.ContratoItemFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ContratoItemModel', 'ProductSearchModel' ],
    views : [ 'ContratoItemFormView' ],

    init : function(config) {
		// genero los eventos

		this.control({
					'contratoitemformview' : {
						beforerender : this.initview,
                        productselected: this.onProductChanged,
					},

					'contratoitemformview #save' : {
						click : this.onSaveClick
					},

        			'contratoitemformview button[action="changeProduct"]' : {
						click : this.onChangeProductClick
					},
            		'contratoitemformview #quantityCombo' : {
						change : this.onQuantityComboChange
					}
                });
	}, // cierro init

	initview : function(view) {
        if (!view.record){
            //creo un registro nuevo
            console.log('sin registro');
        } 
        view.loadRecord(view.record);
        this.loadProductCantidadAuto(view);
        
        
        
     /*   var storePrduct = Ext.create('Ext.data.Store',{
                model: this.getProductSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters:[{
                    property:'Id',
                    value:view.record.get('cbi_iproducto')
                }]
            }).load({callback:function (records) {
            
                    if(records.length>0) {
                        view.recordSelected = records[0]
                        
                        view.recordSelected.set('mon_csymbol',view.recordOrganizacion.get('mon_csymbol'))
                        
                        
                        var vat = records[0].get('VAT')/100;
                        
                        view.down('#Id').setValue(records[0].get('Id'));
                        view.down('#Name').setValue(records[0].get('Name'));
                        view.down('#Price').setValue(view.record.get('cbi_yimporte'));
                        view.down('#_VAT').setValue(vat);
                    } else {
                        view.down('#Id').setValue(0);
                        view.down('#Name').setValue(getLocale('Selecione un producto'));
                        view.down('#Price').setValue(0);
                        view.down('#_VAT').setValue(0);
                    }
                    
                        view.down('#quantityCombo').setValue(view.record.get('cbi_icantidad'))
                    
                 
            
            
            }})*/
	},

    onLoadContratoItem : function(record, operation){

    },
    
    openWindow: function(rec, caller,recordOrganizacion,cnt_dinamico){
        var model = this.getContratoItemModelModel();
        var controller = this;
        if(rec.get('Id')){
            model.load(rec.get('Id'),{
                callback: function(record, operation){
                    var title = record.get('Description'); //reemplazar por config
                    record.set('Price',rec.get('Price'));
                    var view = Ext.widget('contratoitemformview',{
                        record: record,
                        cnt_dinamico: cnt_dinamico,
                        idCliente: caller && caller.record ? caller.record.get('cnt_idcliente') : 0,
                        recordOrganizacion: recordOrganizacion,
                        //callback: this.onEdit,
                        scope: this,
                        caller: caller
                        }
                    );
                    view.loadRecord(record);
                    var myform = view.getForm();
                    myform.findField('mglp_idkey').setValue(record.get('idlista'));
                    controller.calculateTotal(view);
                    controller.loadProductCantidadAuto(view);
                    var myWindow = Ext.widget('window',{
                        title: title,
                        height: 400,
                        width: 400,
                        modal: true, 
                        items: view,
                        layout: 'fit',
                        caller: caller
                    }).show();
                }
            });
        }else{
            var record = rec;
            var title = record.get('Description'); //reemplazar por config
            var view = Ext.widget('contratoitemformview',{
                record: record,
                idCliente: caller && caller.record ? caller.record.get('cnt_idcliente') : 0,
                recordOrganizacion: recordOrganizacion,
                //callback: this.onEdit,
                scope: this,
                caller: caller
                }
            );
            this.applyCantidadAutoState(view, 0);
            var myWindow = Ext.widget('window',{
                title: title,
                height: 400,
                width: 400,
                modal: true, 
                items: view,
                layout: 'fit',
                caller: caller
            }).show();
    
        }

    },

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('contratoitemformview');
        var win = button.up('window');
        
        caller = win.caller;
		var mymodel = myform.getRecord();
		var oldname = mymodel.get('Description');
		myform.updateRecord(mymodel);
		var newname = mymodel.get('Description');


        //mymodel.set('Description',mymodel.get('Name'))
        mymodel.set('idlista',myform.findField('mglp_idkey').getValue());
        if (!mymodel.get("Name")) {
            mymodel.set("Name", mymodel.get('Description'));
        }
        
		mymodel.save({
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
        
        return false;

	},


   
    
    deleteObject: function(record){
        record.destroy();
		//location.href = location.pathname;
    },
    
    onChangeProductClick : function(button, event, options) {
        var view =button.up('contratoitemformview');
        
        var win = Ext.create('Ext.Window', {
    		layout: 'fit',
			title : 'Seleccione un servicio',
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
                    cnt_dinamico: view.cnt_dinamico,
                    recordOrganizacion: view.recordOrganizacion,
                    soloServiciosYOtros:true
                    
                }
            ]
		});
		win.show();
        
        
    	return false
	},

    loadProductCantidadAuto: function(view) {
        var productId = view && view.record ? view.record.get('ProductId') : 0;

        if (!productId) {
            this.applyCantidadAutoState(view, 0);
            return;
        }

        Ext.create('Ext.data.Store', {
            model: this.getProductSearchModelModel(),
            pageSize: 1,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'Id',
                value: productId
            }]
        }).load({
            scope: this,
            callback: function(record, operation, success) {
                var cantidadAuto = 0;
                var productRecord = record && record.length ? record[0] : null;

                if (success && productRecord) {
                    cantidadAuto = productRecord.get('pro_cantidad_auto') || 0;
                }

                this.applyCantidadAutoState(view, cantidadAuto);
                if (cantidadAuto > 0) {
                    this.loadCantidadAfectada(view);
                }
            }
        });
    },

    getCantidadAutoText: function(cantidadAfectada) {
        if (Ext.isNumber(cantidadAfectada) && !isNaN(cantidadAfectada)) {
            if (cantidadAfectada === 0) {
                return '<span style="color:#E65100;font-size:11px;">&#9888; ' +
                    getLocale('Cliente sin cuentas activas.') + ' ' +
                    getLocale('La cantidad automática queda en') + ' <b>0</b>. ' +
                    getLocale('El valor manual no se usa al facturar.') + '</span>';
            }

            return '<span style="color:#1565C0;font-size:11px;">&#128274; Cantidad afectada: <b>' +
                cantidadAfectada +
                '</b> cuentas activas. El valor manual no se usa al facturar.</span>';
        }

        return '<span style="color:#1565C0;font-size:11px;">&#128274; Cantidad calculada automáticamente por cuentas activas. El valor manual no se usa al facturar.</span>';
    },

    getClienteId: function(view) {
        if (view.idCliente) {
            return view.idCliente;
        }

        if (view.caller && view.caller.record) {
            return view.caller.record.get('cnt_idcliente');
        }

        return 0;
    },

    loadCantidadAfectada: function(view) {
        var clienteId = this.getClienteId(view);

        if (!clienteId) {
            return;
        }

        Ext.Ajax.request({
            url: '/rest/search/MG_CuentasActivasCliente',
            method: 'GET',
            params: {
                iCliente: clienteId
            },
            scope: this,
            success: function(resp) {
                var cantidadAfectada = 0;
                var data = Ext.decode(resp.responseText, true);
                var rows = data && (data.rows || data.data);

                if (rows && rows.length) {
                    cantidadAfectada = parseInt(rows[0].cuentas_activas, 10);
                    if (isNaN(cantidadAfectada)) {
                        cantidadAfectada = 0;
                    }
                }

                this.applyCantidadAutoState(view, 1, cantidadAfectada);
            },
            failure: function() {
                this.applyCantidadAutoState(view, 1);
            }
        });
    },

    applyCantidadAutoState: function(view, cantidadAuto, cantidadAfectada) {
        var quantityField = view.down('#quantityCombo');
        var cantidadAutoLabel = view.down('#cantidadAutoLabel');
        var cantidadEfectiva = 0;

        if (!quantityField) {
            return;
        }

        if (cantidadAuto > 0) {
            if (Ext.isNumber(cantidadAfectada) && !isNaN(cantidadAfectada)) {
                cantidadEfectiva = Math.max(0, parseInt(cantidadAfectada, 10));
            }

            // DK-1520: evitar arrastre de cantidad manual previa cuando el producto
            // tiene cantidad automática. La UI debe reflejar la cantidad efectiva.
            quantityField.setValue(cantidadEfectiva);
            quantityField.setReadOnly(true);
            quantityField.setFieldStyle('background-color:#f5f5f5;color:#555;');
            if (Ext.isNumber(cantidadAfectada) && !isNaN(cantidadAfectada)) {
                quantityField.setValue(cantidadAfectada);
            }
            if (cantidadAutoLabel) {
                cantidadAutoLabel.setValue(this.getCantidadAutoText(cantidadAfectada));
                cantidadAutoLabel.setHidden(false);
            }
        } else {
            quantityField.setReadOnly(false);
            quantityField.setFieldStyle('');
            if (cantidadAutoLabel) cantidadAutoLabel.setHidden(true);
        }

        this.calculateTotal(view);
    },
    
    onProductChanged: function(record, view){
        var form = view.getForm();
        form.findField('Code').setValue(record.get('Code'));
        form.findField('Description').setValue(record.get('Name'));
        form.findField('Price').setValue(record.get('final_price'));
        form.findField('VAT').setValue(record.get('imp_nporcentaje'));
        
        form.findField('ProductId').setValue(record.get('Id'));
        form.findField('mglp_idkey').setValue(record.get('mglp_idkey'));
        
        // DK-1498: si el producto tiene cantidad automática, bloquear el campo y mostrar aviso
        var cantidadAuto = record.get('pro_cantidad_auto') || 0;
        this.applyCantidadAutoState(view, cantidadAuto);
        if (cantidadAuto > 0) {
            this.loadCantidadAfectada(view);
        }
        
        this.calculateTotal(view);
        
        return false;
    },
    
    
    onQuantityComboChange: function(combo, newValue){
        var view = combo.up('contratoitemformview');
        this.calculateTotal(view);
    },
    
    calculateTotal: function(view){
        var form = view.getForm();
        var price = 0;
        if(form.findField('Price').getValue())
            price= form.findField('Price').getValue();
        var cant = 0
        if(form.findField('Quantity').getValue())
            cant=form.findField('Quantity').getValue();
        var subTotal = price*cant;
        var vat = 0;
        if(form.findField('VAT').getValue())
            vat = form.findField('VAT').getValue()/100;
        var itemVAT = subTotal*vat;
        var total = subTotal + itemVAT;
        
        
        form.findField('_subTotal').setValue(subTotal);
        form.findField('_VAT').setValue(itemVAT);
        form.findField('Total').setValue(total);
        
    }
    
});
