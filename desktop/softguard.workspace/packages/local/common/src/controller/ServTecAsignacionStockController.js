//MIGRADO2024
Ext.define('Common.controller.ServTecAsignacionStockController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ServTecProductosOrdenSearchModel', 't_stock_depositosSearchModel', 'm_stock_totalesSearchModel', 'm_stock_cabeceraModel', 'm_stock_itemModel' ],
    views : [ 'SerTecAsignacionStockView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'servtecasignacionstockview' : {
            	afterrender : this.initView,
               // itemdblclick: this.onItemClick,
                asignar: this.onAsignar,
               buscardeposito: this.onBuscarDeposito
               
			},
            
            'servtecasignacionstockview #depositoorigen' : {
        		change : this.onDepositoorigenChange
			},
            'servtecasignacionstockview #tecnicodestino' : {
            	change : this.onTecnicodestinoChange
			}
            
            
		});
	},
    
    
    onBuscarDeposito: function (rec, view) {
        
        
        
        
        
        var storeStockEnDepositoOrigenBusqueda =Ext.create('Ext.data.Store',{
            model: this.getM_stock_totalesSearchModelModel(),
            pageSize: 1,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'tsd_idtecnico:ISNULLOREMPTY',
                    value:''
                },
                {
                    property:'stt_idproducto',
                    value:rec.get('IdProduct')
                }
                ],
            sorters: [
                {
                    property : 'stt_cant',
                    direction: 'DESC'
                }
            ]
                
        })
        
        
        storeStockEnDepositoOrigenBusqueda.load({callback:function (records) {
            //SI ENCUNETRA UN DEPOSITO HAY QUEU CAMBIARLO EN EL COMBO ASI TRAE LA INFOAMCION NECESARIA
            console.log(records)
            if(records.length >0) {
                view.down('#depositoorigen').setValue(records[0].get('stt_iddeposito'))
            } else {
                notify('No se encontro ninugn deposito que tenga este producto disponible')
            }
            //.getStore().findRecord('IdProduct',v.get('stt_idproducto'))
        }})
    
    },
    
    onAsignar: function (rec,view) {        
        var controller = this;
        
        //hago movimeinto
        controller.getM_stock_cabeceraModelModel().create({
            stc_iddepositoorigen:view.down('#depositoorigen').getValue(),
            stc_iddepositodestino: view.down('#tecnicodestino').getValue(),
            stc_iusuariodss: controller.application.UserData.udw_idKey,
            //stc_itecnico //Ya no se utiliza este campo
            stc_tipomov: 'MO',
            stc_comprobantetipo:'',
            stc_comprobante:'SERTEC',
            stc_referencia:view.record.get('Id'),
            stc_descripcion:'Movimiento realizado desde ServTec',
            stc_fecha: new Date()
            
        }).save({callback:function(record) {
            
            
            controller.getM_stock_itemModelModel().create({
                
                sti_idcabecera: record.get('Id'),
                sti_idproducto: rec.get('IdProduct'),
                sti_cant: rec.get('_falta')
            }).save({callback:function () {
                //refresco contadores
                view.storeStockEnDepositoOrigen.load({callback:function (records) {
            
                    Ext.Array.each(records,function (v,k) {
                        var recordServtecProducto = view.store.findRecord('IdProduct',v.get('stt_idproducto'))
                        recordServtecProducto.set('_stockorigen', v.get('stt_cant') )
                    })
                    
                
                }});
                
                view.storeStockEnTecnicoDestino.load({callback:function (records) {
            
                    Ext.Array.each(records,function (v,k) {
                        var recordServtecProducto = view.store.findRecord('IdProduct',v.get('stt_idproducto'))
                        recordServtecProducto.set('_stocktecnico', v.get('stt_cant') )
                    })
                    
                    controller.calcularResto(view.store)
                
                }});
            }})
            
            
            
        }})
        
        
    },
    
    
    onDepositoorigenChange: function (combo,value) {
        var view = combo.up('servtecasignacionstockview')
        
        var controller = this;
        
        
        
        
        
        view.storeStockEnDepositoOrigen =Ext.create('Ext.data.Store',{
            model: this.getM_stock_totalesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'stt_iddeposito',
                    value:value
                },
                {
                    property:'stt_idproducto:ININT',
                    value:controller.getProductsIds(view.store).join(',')
                }
                ]
        })
        
        //limpio
        view.store.each(function (v,k) {
        
            v.set('_stockorigen', 0 )
        })
        
        //traigo valores de deposito
        view.storeStockEnDepositoOrigen.load({callback:function (records) {
            
            Ext.Array.each(records,function (v,k) {
                var recordServtecProducto = view.store.findRecord('IdProduct',v.get('stt_idproducto'))
                recordServtecProducto.set('_stockorigen', v.get('stt_cant') )
            })
            
        
        }});
        
        
        
        
    },
    
    calcularResto : function (store) {
        
        store.each(function (v,k) {
            var cantNecesaria = v.get('spr_iCantidad')
            var cantDestino =  v.get('_stocktecnico')
            
            v.set('_falta',cantNecesaria-cantDestino)
        })
    },
    
    
    
    onTecnicodestinoChange: function (combo,value) {
        var view = combo.up('servtecasignacionstockview')
        
        var controller = this;
        
        
        
        
        
        view.storeStockEnTecnicoDestino =Ext.create('Ext.data.Store',{
            model: this.getM_stock_totalesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'stt_iddeposito',
                    value:value
                },
                {
                    property:'stt_idproducto:ININT',
                    value:controller.getProductsIds(view.store).join(',')
                }
                ]
        })
        
        //limpio
        view.store.each(function (v,k) {
        
            v.set('_stocktecnico', 0 )
        })
        
        //traigo valores de deposito
        view.storeStockEnTecnicoDestino.load({callback:function (records) {
            
            Ext.Array.each(records,function (v,k) {
                var recordServtecProducto = view.store.findRecord('IdProduct',v.get('stt_idproducto'))
                recordServtecProducto.set('_stocktecnico', v.get('stt_cant') )
            })
            
            controller.calcularResto(view.store)
        
        }});
        
        
        
        
    },
    
    
    getProductsIds: function (store) {
        
        var idProductList = []
        store.each(function (v,k) {
            
            idProductList.push(v.get('IdProduct'))
        })
        return idProductList;
    },
	initView : function(view) {
       
        view.filters = [
                    {
                        property:'spr_iServicio',
                        value: view.record.get('Id')
                    }
            ]
        view.store =Ext.create('Ext.data.Store',{
            model: this.getServTecProductosOrdenSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        view.store.load();
        
        
        //deposito Origen
        view.storeDepositosOrigen =Ext.create('Ext.data.Store',{
            model: this.getT_stock_depositosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'tsd_idtecnico:ISNULLOREMPTY',
                    value:''
                },{
                    property:'tsd_estado', 
                    value:1 //habilitado
                }
                ]
        })
        view.down('#depositoorigen').bindStore(view.storeDepositosOrigen);
        view.storeDepositosOrigen.load();
        
        //tecnicos destino
        view.storeTecnicosDestinos =Ext.create('Ext.data.Store',{
            model: this.getT_stock_depositosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'tsd_idtecnico:ISNOTNULLOREMPTY',
                    value:''
                },{
                    property:'tsd_estado', 
                    value:1 //habilitado
                }
                ]
        })
        view.down('#tecnicodestino').bindStore(view.storeTecnicosDestinos);        
        view.storeTecnicosDestinos.load();
        
        
        
	},
    
  
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('servtecproductosordengridview');
      //  var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo producto';
        
        
      /*   record = this.getTablasProductosModelModel();
         
            
        	var myobject = record.create({
			});          */  
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
    
    
   
   
    
    onProductSelected: function(record,view){
            var controller = this;
            Ext.MessageBox.prompt('Cantidad', 'Ingrese la cantidad:', function (btn, cantidad) {
                
                    if(btn != 'cancel') {
                    
                        controller.getServTecProductosOrdenModelModel().create({
                            spr_iServicio:view.record.get('Id'),
                            spr_iProducto:record.get('Id'),
                            spr_iCantidad:cantidad
                		}).save({callback:function () {
                  
                            var toolbar = view.down('pagingtoolbar');
                            toolbar.doRefresh();
                            
                            notify('El producto se agrego con exito.')
                  
                		}});
                        
                    }   
                
            });
            
            
            
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onItemClick: function (view,record) {
        
        var controller = this;
            Ext.MessageBox.prompt('Cantidad', 'Ingrese la cantidad:', function (btn, cantidad) {
                if(btn != 'cancel') {
                    controller.getServTecProductosOrdenModelModel().load(record.get('Id'), {callback:function (rec){
                        
                       
                        rec.set('spr_iCantidad',cantidad);
                        rec.save({callback:function () {
                  
                            var toolbar = view.up('servtecproductosordengridview').down('pagingtoolbar');
                            toolbar.doRefresh();
                            
                            notify('El producto se modificao con exito.')
                  
                    	}});   
                    }}); 
                }
            });
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('servtecproductosordengridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('servtecproductosordengridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        store.clearFilter(true);
        var filters = Ext.clone(view.filters);
        
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('servtecproductosordengridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            //view.store.remove(selection);
            //var delRec = view.store.getRemovedRecords();
            
            Ext.Array.each(selection, function (rec) {
                
                rec.setConfig({
				    proxy: controller.getServTecProductosOrdenModelModel().getProxy()
			    });
                    rec.destroy({callback: function(record, operation){
                       
                       
                            if (operation.success)
                            {
                                notify('Se eliminio exitosamente');
                                
                            }
                            else
                            {
                               notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                            }   
                            
                            view.store.load();
                       
                    }})
                
           
            },this);
            
            
        }
        		
	}
});