Ext.define('SgAppSerTec.controller.ServTecTecnicoProductosInsumidosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_stock_depositosSearchModel', 'm_stock_totalesSearchModel', 'm_stock_cabeceraModel', 'm_stock_itemModel' ],
    views : [ 'ServTecTecnicoProductosInsumidosView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'servtetecnicoproductoinsumidosview' : {
                afterrender : this.initView,              
                devolveradeposito: this.onDevolverADeposito       
			},            
            'servtetecnicoproductoinsumidosview #depositoorigen' : {
        		change : this.onDepositoorigenChange
			}
            
            
		});
	},
    
   
    
    onDevolverADeposito: function (rec,view) {        
        var controller = this;
        
        if(!view.down('#depositodestino').getValue()) {
            notify('Seleccione un deposito destino')
            return false
        }
        if(rec.get('_devuelve') > 0 && rec.get('stt_cant') >= rec.get('_devuelve')) {
            //hago movimeinto
            controller.getM_stock_cabeceraModelModel().create({
                stc_iddepositoorigen:view.tecnico.get('Id'),
                stc_iddepositodestino: view.down('#depositodestino').getValue(),
                stc_iusuariodss: controller.application.UserData.udw_idKey,           
                stc_tipomov: 'MO',
                stc_comprobantetipo:'',
                stc_comprobante:'SERTEC',
                stc_referencia:view.record.get('Id'),
                stc_descripcion:'Devolucion de tecnico',
                stc_fecha: new Date()
                
            }).save({callback:function(record) {
                
                
                controller.getM_stock_itemModelModel().create({
                    
                    sti_idcabecera: record.get('Id'),
                    sti_idproducto: rec.get('stt_idproducto'),
                    sti_cant: rec.get('_devuelve')
                }).save({callback:function () {
                    view.storeStockEnTecnicoDestino.load()
                }})
                
                
                
            }})
        } else {
            notify('Verifique que las cantidades')
        }
        
        
    },
    
    
    onDepositoorigenChange: function (combo,value) {
        var view = combo.up('servtecasignacionstockview')
        
        var controller = this;
        
        
        
        
        
        view.storeStockEnDepositoOrigen =Ext.create('Ext.data.Store',{
            model: this.getM_stock_totalesSearchModelModel(),
            pageSize: 999,
          //  remoteSort: true,
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
    
  
    
    
  

	initView : function(view) {
       
      
        
        var modules =  SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');
        var recordServTec = modules.getModuleAvailable('SerTec') 
        
        if(modules.isModuleAvailable('SerTec') ) {
            
            
            //deposito destino
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
            view.down('#depositodestino').bindStore(view.storeDepositosOrigen);
            view.storeDepositosOrigen.load();
            
           

             //mochila tecnico
            view.storeDepositosOrigen =Ext.create('Ext.data.Store',{
                model: this.getT_stock_depositosSearchModelModel(),
                pageSize: 999,
               // remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property:'tsd_idtecnico',
                        value:recordServTec.get('_Security').Instalador
                    }
                    ]
            })
           
            view.storeDepositosOrigen.load({callback:function (records) {
                view.tecnico = records[0]
                view.setTitle(getLocale('Tecnico')+': '+records[0].get('Name'))
            
            }});
            
            
            view.storeStockEnTecnicoDestino =Ext.create('Ext.data.Store',{
                model: this.getM_stock_totalesSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property:'tsd_idtecnico',
                        value:recordServTec.get('_Security').Instalador
                    }
                    ],
                listeners:{
                    load: function () {
                         //le defino automaticamnte la columna de devolucion
                        this.each(function (record) {
                            record.set('_devuelve',record.get('stt_cant'))
                        })
                    }
                }
            })
            
            view.bindStore(view.storeStockEnTecnicoDestino)
            
            //traigo valores de deposito
            view.storeStockEnTecnicoDestino.load({callback:function (records) {
               
            }});
            
            


        }

       
        
        
        
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