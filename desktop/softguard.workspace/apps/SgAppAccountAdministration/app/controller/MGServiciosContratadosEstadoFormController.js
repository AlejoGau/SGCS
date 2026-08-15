Ext.define( 'SgAppAccountAdministration.controller.MGServiciosContratadosEstadoFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RelationModel', 'crm_contratoModel' ],
    views : [ 'MGServiciosContratadosEstadoFormView' ],

    init : function(config) {
		// genero los eventos

		this.control({
					'mgservicioscontratadosestadoformview' : {
						beforerender : this.initview,
                        productselected: this.onProductChanged,
                        itemdblclick : this.onItemDblClick
					},

					'mgservicioscontratadosestadoformview #save' : {
						click : this.onSaveClick
					},

        			'mgservicioscontratadosestadoformview button[action="changeProduct"]' : {
						click : this.onChangeProductClick
					},
            		'mgservicioscontratadosestadoformview #quantityCombo' : {
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

    
    openWindow: function(record, caller,recordOrganizacion){
        var title = record.get('Name'); //reemplazar por config
        var view = Ext.widget('mgservicioscontratadosestadoformview',{
            record: record,
            recordOrganizacion: recordOrganizacion,
            //callback: this.onEdit,
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

    onItemDblClick : function(button, event, options){
        
    },

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
        var controller = this;
		var myform = button.up('form').getForm();
        var view = button.up('mgservicioscontratadosestadoformview');
        var win = button.up('window');
        
        caller = win.caller;
		var mymodel = myform.getRecord();
		var oldname = mymodel.get('Name');
		myform.updateRecord(mymodel);
		var newname = mymodel.get('Name');


        //mymodel.set('Description',mymodel.get('Name'))
        //mymodel.set('idlista',myform.findField('mglp_idkey').getValue())
        var contratoModel = controller.getCrm_contratoModelModel();
        
        var mycontratoModel = Ext.create(contratoModel,{
            //Id: 0,
            cnt_estado: view.down('#cnt_estado').getValue(),
            //cnt_fechaalta: view.down('#cnt_fechaalta').getValue(),
            //cnt_fechavto: view.down('#cnt_fechavto').getValue(),
            //cnt_idcliente: view.recordOrganizacion.get('cli_icodigo_ID')
        });
        //myform.updateRecord(mycontratoModel);
        mycontratoModel.save({
            callback: function(recordContrato,operation,success){
                mymodel.set('idcontrato',recordContrato.get('Id'));
                mymodel.save({
                    scope : this,
                    win: win,
                    view: view,
                    callback : function(record, operation, success) {
                        
                        if (operation.success){
                            notify('Los datos se cuardaron correctamente');
                            var mywin = view.up('window');
                            view.caller.fireEvent('objectchange',view.caller);
                            mywin.close();                            

                          

                        } else{
                            notifyError('Hubo un error al guardar');
                        }
                    },
                    methodName:'POST',
                    method:'POST',
                    button : button
                });
            },

        });

        
        return false;

	},


   
    
    deleteObject: function(record){
        record.destroy();
		//location.href = location.pathname;
    },
    
    onChangeProductClick : function(button, event, options) {
        var view =button.up('mgservicioscontratadosestadoformview');
        
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
                    recordOrganizacion: view.recordOrganizacion,
                    soloServiciosYOtros:true
                    
                }
            ]
		});
		win.show();
        
        
    	return false
	},
    
    onProductChanged: function(record, view){
        var form = view.getForm();
        form.findField('Code').setValue(record.get('Code'));
        form.findField('Name').setValue(record.get('Name'));
        view.down('#price').setValue(record.get('final_price'));//form.findField('Price').setValue(record.get('final_price'));
        form.findField('VAT').setValue(record.get('imp_nporcentaje'));
        
        form.findField('ProductId').setValue(record.get('Id'));
        form.findField('mglp_idkey').setValue(record.get('mglp_idkey'));
        
        this.calculateTotal(view);
        
        return false;
    },
    
    
    onQuantityComboChange: function(combo, newValue){
        var view = combo.up('mgservicioscontratadosestadoformview');
        this.calculateTotal(view);
    },
    
    calculateTotal: function(view){
        
        var form = view.getForm();
        var price = form.findField('Price').getValue();
        var cant = form.findField('Quantity').getValue();
        var subTotal = price*cant;
        var vat = form.findField('VAT').getValue()/100;
        var itemVAT = subTotal*vat;
        var total = subTotal + itemVAT;
        
        
        form.findField('_subTotal').setValue(subTotal);
        form.findField('_VAT').setValue(itemVAT);
        form.findField('Total').setValue(total);
        
    }
    
});