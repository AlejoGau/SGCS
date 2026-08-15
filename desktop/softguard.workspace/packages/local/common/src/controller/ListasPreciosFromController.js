//MIGRADO2024
Ext.define('Common.controller.ListasPreciosFromController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'mg_listas_preciosModel', 't_monedasSearchModel', 'mg_listas_precios_detalleModel' ],
    views : [ 'ListasPreciosFromView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
					'listaspreciosformview' : {
						beforerender : this.initview,
                        productselected: this.onProductChanged,
					},
					'listaspreciosformview #save' : {
						click : this.onSaveClick
					},
    				'listaspreciosformview #mglp_tipo' : {
						change : this.onChangeTipoClick
					}
                });
	}, // cierro init
    
    
    onChangeTipoClick: function (combo) {
            var view = combo.up('listaspreciosformview');
            if(combo.getValue() == 1) {
                view.down('#mglp_multiplicador').hide()
                if(view.record.get('Id')!= 0) {                    
                    view.down('#valor').show()
                }
            } else {
                view.down('#mglp_multiplicador').show()
                view.down('#valor').hide()
            }
    },
	initview : function(view) {
        var controller = this;
        
        view.loadRecord(view.record);
        view.down('#moneda').setValue(view.record.get('mglp_currency'))
        
        if(view.record.get('Id') == 0) {
            view.down('#valor').hide()
            
        } else {
            if(view.record.get('mglpd_idkey')){
                if(view.record.get('mglpd_idkey') != 0) {
                    this.getMg_listas_precios_detalleModelModel().load(view.record.get('mglpd_idkey'),{callback:function (record) {
                        view.recordPrecio = record
                        view.down('#valor').setValue(record.get('mglpd_valor'))            
                    }})
                } else {
                    view.recordPrecio = this.getMg_listas_precios_detalleModelModel().create({
                        Name:'',
                        mglpd_idlista: view.record.get('Id'),
                        mglpd_idproducto: view.recordProducto.get('Id')
                    })
                }
            }
        }
	},
    
    
	onSaveClick : function(button, event, options) {
	
        var view = button.up('listaspreciosformview');
        
        var myform = view.getForm()
		var mymodel = myform.getRecord();
		myform.updateRecord(mymodel);
        
        if(view.down('#moneda').getValue() == '') {
            notify('Debe seleccionar una moneda')
            return false;
        }
        
        mymodel.set('mglp_currency',view.down('#moneda').getValue())

        // Para registros nuevos (phantom), establecer Id a 0 para evitar enviar el nombre del modelo
        if (mymodel.phantom) {
            mymodel.set('Id', 0);
        }

        mymodel.setConfig({
            proxy: this.getMg_listas_preciosModelModel().getProxy()
        });

		mymodel.save({
			scope : this,
            view: view,
			callback : function(record, operation, success) {
                
                if (operation.success){
                    
                   
                    
                    // si es tipo dinamico ignoro los models y guardar en e detalle
                    if(view.down('#mglp_tipo').getValue() == 1) {
                         view.down('#valor').show()
                         
                        if(view.recordPrecio) {
                            view.recordPrecio.set('mglpd_valor', view.down('#valor').getValue())
                            view.recordPrecio.save({callback:function () {
                            
                                notify('Los datos se cuardaron correctamente');
                                if (view.caller){
                                   
                                    view.caller.fireEvent('refresh',view.caller);
                                    view.up('window').close();
                                }       
                            
                            }})                    
                        } else {
                            view.recordPrecio = this.getMg_listas_precios_detalleModelModel().create({
                                mglpd_idlista: view.record.get('Id'),
                                mglpd_idproducto: view.recordProducto.get('Id')
                            })
                            
                        }
                    } else {
                        
                        notify('Los datos se cuardaron correctamente');
                        if (view.caller){
                           
                            view.caller.fireEvent('refresh',view.caller);
                            view.up('window').close();
                        }   
                        
                    }
                } else{
                    notifyError('Hubo un error al guardar');
                }
			},
			button : button
		});
        
        
        
        
        
        
        
        return false;
	},
   
  
});