//MIGRADO2024
Ext.define('Common.controller.m_stock_cabeceraFormController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ 'm_stock_cabeceraModel', 'InstaladoresByTokenSearchModel', 't_stock_depositosSearchModel', 'ServTecProductosOrdenModel', 'm_stock_itemSearchModel', 'm_stock_itemModel' ],
    views : [ 'm_stock_cabeceraFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
                	'mstockcabeceraformview' : {
						beforerender : this.initview,
                        productSelected: this.onProductSelected
					},
					'mstockcabeceraformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'mstockcabeceraformview #agregarproducto' : {
						click : this.onAgregarProductoClick
					},      
                    'mstockcabeceraformview #depositoOrigen' : {
                    	change : this.onComboDepositoOrigenChange
        			},
                    'mstockcabeceraformview #depositoDestino' : {
                    	change : this.onComboDepositoDestinoChange
        			}   ,
                    'mstockcabeceraformview #stc_tipomov' : {
                        change : this.onTipoChange
        			}        
                    
                });
	}, // cierro init
    
    
     onTipoChange: function  (combo,value) {
         var view = combo.up('mstockcabeceraformview')
         if(value == 'IN' || value == 'EG') {
             view.down('#depositoDestino').hide()
         } else {
             view.down('#depositoDestino').show()
         }
     },
     onComboDepositoOrigenChange: function  (combo,value) {
        var view = combo.up('mstockcabeceraformview')
        if(!view.idOrganizacion) {
            if(view.down('#depositoDestino').getValue() == value) {
                view.down('#depositoDestino').setValue('')    
            }
        } else {
            if(view.recordDeposito.get('Id') != value) {
                view.down('#depositoDestino').setValue(view.recordDeposito.get('Id'))    
            }
          
        }
        
    },
    
    onComboDepositoDestinoChange: function  (combo,value) {
        var view = combo.up('mstockcabeceraformview')
        if(!view.idOrganizacion) {
            if(view.down('#depositoOrigen').getValue() == value) {
                view.down('#depositoOrigen').setValue('')    
            }
        } else {
            if(view.recordDeposito.get('Id') != value) {
                view.down('#depositoOrigen').setValue(view.recordDeposito.get('Id'))    
            }           
        }
        
    },
    
    onProductSelected: function(record,view){
           
            
           
            var grid = view.down('#agregarproducto')
            var controller = this;
            
            
            var model = controller.getM_stock_itemSearchModelModel().create({
                        sti_idproducto: record.get('Id'),
                        nombreProducto: record.get('Name'),
                        sti_cant: 1
                    })
            
            
           /* if(view.record.get('Id')) {
                
                model.set('sti_idcabecera',view.record.get('Id'))
                model.save({callback:function () {
                
                    view.storeItems.load()
                }})
                
            } else {*/
                
                view.storeItems.add(model)    
                
           /* } */
            
            
            
            
    },
    
    
    onAgregarProductoClick: function (btn) {
        var view = btn.up('mstockcabeceraformview')
        
        var title = 'Agregar producto';
        var productview = Ext.widget('productgridview',{
                        caller: view,
                        tipo:'helper',
                        hideAdd:true
                    });
                    
                    var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout : 'fit',
                        title : title,
                        width : 700,
                    	height : 400,
            			border : false,
            			items : productview
            		});
            		win.show();
    },
   
	initview : function(view) {
        
        view.loadRecord(view.record);
        
       
        
        view.storeCombo =Ext.create('Ext.data.Store',{
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'ins_iTipo:ININT',
                    value:"1,2"
                }
                ]
        })
        view.down('#comboTecnicos').bindStore(view.storeCombo);
        view.storeCombo.load({callback:function () {
            
            if(view.record.get('stc_itecnico') == '') {
                view.down('#comboTecnicos').setRawValue('')
            }
            
        }});
        
        
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_stock_depositosSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters:[{
                property:'tsd_estado',
                value:1
            }]
        })
       
        view.down('#depositoOrigen').bindStore(view.store);
        view.down('#depositoDestino').bindStore(view.store);
        
        view.store.load({callback:function () {
            
            if(view.record.get('stc_iddepositodestino') == '') {
                view.down('#depositoDestino').setRawValue('')
            }
            if(view.record.get('stc_iddepositoorigen') == '') {
                view.down('#depositoOrigen').setRawValue('')
            }
            
        }});
        
        if(!view.record.get('stc_fecha')) {
            view.down('#fecha').setValue(new Date())
        }
        
        
        
        //ITEMS
        
        view.storeItems =Ext.create('Ext.data.Store',{
            model: this.getM_stock_itemSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'sti_idcabecera',
                    value:view.record.get('Id')
                }
                ]
        })
        view.down('#productosgrid').bindStore(view.storeItems)
        
        
        if(view.record.get('Id')) {
            view.storeItems.load()
        }
        
        
	
	},
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('mstockcabeceraformview');
        var win = button.up('window');
		var record = myform.getRecord();
        var controller = this;
        
        var model = this.getM_stock_cabeceraModelModel();
        
        
        var depositoOrigen = view.down('#depositoOrigen');
        var depositoDestino = view.down('#depositoDestino');
        
        
        depositoOrigen.clearInvalid();
        depositoOrigen.textValid = true;
        
        depositoDestino.clearInvalid();
        depositoDestino.textValid = true;
        
        record.setConfig({
            proxy: model.getProxy()
        });
		myform.updateRecord(record);
        
        
        record.set('stc_iusuariodss', _UserData.udw_idKey)
      
        if (myform.isValid()){
            
         
            if(view.record.get('stc_iddepositoorigen') == ''){
                   depositoOrigen.markInvalid(getLocale('Debe seleccionar el deposito origen.'));
                   depositoOrigen.textValid = false; 
                   
            }
            
            if(view.record.get('stc_iddepositodestino') == ''){
                    depositoDestino.markInvalid(getLocale('Debe seleccionar el deposito destino.'));
                    depositoDestino.textValid = false; 
            }
            
            if(view.record.get('stc_iddepositoorigen') == '' && view.record.get('stc_iddepositodestino') == ''){
                
                return false;
            
            }
            
            
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        
                        
                                              
                        
                           
                            view.storeItems.each(function (v,k){
                                if(!record.get('sti_idcabecera')) {
                                    v.set('sti_idcabecera', record.get('Id'))     
                                }

                                v.setConfig({
                                    proxy: controller.getM_stock_itemModelModel().getProxy()
                                });
                                v.save()
                            })
                            
                            
                            Ext.Array.each(view.storeItems.removed, function (v,k){
                               
                                v.setConfig({
                                    proxy: controller.getM_stock_itemModelModel().getProxy()
                                });
                                v.destroy()
                            })
                            
                     
                        
                        
                        
                        
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }
	},
    
   
	
   
});