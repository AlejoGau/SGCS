Ext.define('WebMG.controller.ComprobanteItemManualFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_comprobantes_item_fcModel', 't_impuestos_fcSearchModel' ],
    views : [ 'ComprobanteItemManualFormView' ],

    init : function(config) {
		this.control({
            'comprobanteitemmanualformview ^ window' : { // el evento activate solo esta en la window
                activate: this.onActivate
            },
            'comprobanteitemmanualformview' : {
                afterrender : this.initview
            },
            'comprobanteitemmanualformview #save' : {
                click : this.onSaveClick
            },
            'comprobanteitemmanualformview #impuesto' : {
                select : this.onImpuestoSelect
            },
            'comprobanteitemmanualformview #Quantity' : {
                change : this.onQuantityChange
            },
            'comprobanteitemmanualformview #cbi_yimporte' : {
                change : this.onImporteChange
            }
        });
	}, // cierro init

    onActivate: function(win){

    },

	initview : function(view) {
        var controller = this;
        view.imp_nporcentaje = 0;
        // Set org currency for display fields
        if (view.recordOrganizacion) {
            view.mon_csymbol = view.recordOrganizacion.get('mon_csymbol');
        }
        if (!view.record){
            //creo un registro nuevo
            console.log('sin registro');
        }

        var storeImpuestos =Ext.create('Ext.data.Store',{
            model: this.getT_impuestos_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:[{
                property:'org_organizacionId', // uso la organizacion del usuario para filtrar las org facturadoras disponibles.
                value:_UserData.Company//controller.application.UserData.Company
            }]
        })

        view.down('#impuesto').bindStore(storeImpuestos);
        storeImpuestos.load()
	},

    
    openWindow: function(record, caller,recordOrganizacion){
        var title = record.get('Name'); //reemplazar por config
        var view = Ext.widget('comprobanteitemmanualformview',{
            record: record,
            recordOrganizacion: recordOrganizacion,
            recordComprobante: caller.record,
            scope: this,
            caller: caller
            }
        );
        var myWindow = Ext.widget('window',{
            title: title,
            height: 400,
            width: 400,
            modal: true, 
            items: view,
            layout: 'fit',
            caller: caller
        }).show();
    },

	onSaveClick : function(button, event, options) {
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('comprobanteitemmanualformview');
        var win = button.up('window');

        if (!myform.isValid()) {
            notify('Complete todos los campos requeridos.');
            return false;
        }

        var caller = view.caller;

        var model = this.getM_comprobantes_item_fcModelModel().create({
            Id: 0,
            cbi_icodigocab: view.record.get('cbi_icodigocab'),
            cbi_yimporte: myform.findField('cbi_yimporte').getValue(),
            cbi_cdescripcion: myform.findField('cbi_cdescripcion').getValue(),
            cbi_icantidad: myform.findField('Quantity').getValue(),
            cbi_cimpuestos: view.down('#impuesto').getValue()
        })

        if(typeof view.record.get('Id')==='number' && view.record.get('Id') != 0) {
            model.setId(view.record.get('Id'))
        }

		model.save({
			scope : this,
			callback : function(record, operation, success) {
                if (operation.success){
                    notify('Los datos se guardaron correctamente');
                    if (caller){
                        caller.fireEvent('objectchanged',caller);
                    }
                    win.close();
                } else{
                    notifyError('Hubo un error al guardar');
                }
			}
		});
        return false;
	},

	onDeleteClick : function(button, event, options) {
		var myform = button.up('form').getForm();
		this.deleteObject(myform.getRecord());
        var view = button.up('comprobanteitemmanualformview');
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

    onQuantityChange: function(field, newValue){
        var view = field.up('comprobanteitemmanualformview');
        this.calculateTotal(view);
    },

    onImporteChange: function(field, newValue){
        var view = field.up('comprobanteitemmanualformview');
        this.calculateTotal(view);
    },

    onImpuestoSelect: function(combo, record, eOpts){
        var view = combo.up('comprobanteitemmanualformview');
        // Get the selected record from the combo's store for reliability
        var impuesto = combo.findRecordByValue(combo.getValue());
        if (!impuesto) {
            impuesto = Ext.isArray(record) ? record[0] : record;
        }
        if (impuesto) {
            view.imp_nporcentaje = parseFloat(impuesto.get('imp_nporcentaje')) || 0;
        }
        console.log('[ComprobanteManual] onImpuestoSelect:', {
            comboValue: combo.getValue(),
            imp_nporcentaje: view.imp_nporcentaje,
            recordData: impuesto ? impuesto.getData() : 'NOT FOUND'
        });
        this.calculateTotal(view);
    },
    
    calculateTotal: function(view){
        var form = view.getForm();
        var price = form.findField('cbi_yimporte').getValue();
        var cant = form.findField('Quantity').getValue();
        var subTotal = price*cant;
        var itemVAT = view.imp_nporcentaje/100*subTotal;
        var total = subTotal + itemVAT;
        console.log('[ComprobanteManual] calculateTotal:', {
            price: price, cant: cant, imp_nporcentaje: view.imp_nporcentaje,
            subTotal: subTotal, itemVAT: itemVAT, total: total
        });

        view.down('#_subTotal').setValue(subTotal);
        view.down('#_VAT').setValue(itemVAT);
        view.down('#Total').setValue(total);
    }
});