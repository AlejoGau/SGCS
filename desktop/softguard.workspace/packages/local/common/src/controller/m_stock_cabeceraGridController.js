//MIGRADO2024
Ext.define('Common.controller.m_stock_cabeceraGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_stock_cabeceraModel', 'm_stock_cabeceraSearchModel', 't_stock_depositosSearchModel' ],
    views : [ 'm_stock_cabeceraGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'mstockcabeceraview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged : this.onEventChanged
               
			},
            'mstockcabeceraview button[action=search]': {
                click: this.onSearchClick
            },
            'mstockcabeceraview button[action=getall]': {
                click: this.onGetAllClick
            },
            'mstockcabeceraview button[action=add]': {
                click: this.onAdd
            },
            'mstockcabeceraview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            'mstockcabeceraview #depositoOrigen' : {
        		change : this.onComboDepositoOrigenChange
			},
            'mstockcabeceraview #depositoDestino' : {
            	change : this.onComboDepositoDestinoChange
			}
            
            
		});
	},
    
    
    onComboDepositoOrigenChange: function  (combo,value) {
        var view = combo.up('mstockcabeceraview')
        if(view.record.get('Id') == value) {
            if(view.down('#depositoDestino').getValue() == view.record.get('Id')) {
                view.down('#depositoDestino').setValue('')    
            }
        } else {
            view.down('#depositoDestino').setValue(view.record.get('Id'))
        }
        
    },
    
    onComboDepositoDestinoChange: function  (combo,value) {
        var view = combo.up('mstockcabeceraview')
        if(view.record.get('Id') == value) {
            if(view.down('#depositoOrigen').getValue() == view.record.get('Id')) {
                view.down('#depositoOrigen').setValue('')    
            }            
        } else {
            view.down('#depositoOrigen').setValue(view.record.get('Id'))
        }
        
    },
    
    onEventChanged: function(view){
        
            view.store.load();
        
    },
	initView : function(view) {
        
        if(view.readOnly) {
            view.down('toolbar').hide()
        }
        
        
        view.filters = [];
        
        if(view.record) {
            if(view.byReferencia) {
               view.filters.push({
                    property:'stc_referencia',
                    value: view.record.get('Id')
                }) 
            } else {
                view.filters.push({
                    property:'stc_iddepositoorigenORstc_iddepositodestino',
                    value: view.record.get('Id')
                })
                
            }
            /**  Comentado 10/11/22 FJ DSS-527
            if(!view.idOrganizacion) {
                    view.filters.push({
                        property:'stc_comprobante',
                        value: 'SERTEC'
                    })
                }
            */
        }
       
       
        view.store =Ext.create('Ext.data.Store',{
            model: this.getM_stock_cabeceraSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        var depositosStore =Ext.create('Ext.data.Store',{
            model: this.getT_stock_depositosSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
       
        view.down('#depositoOrigen').bindStore(depositosStore);
        view.down('#depositoDestino').bindStore(depositosStore);
        
        depositosStore.load();
	},
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('mstockcabeceraview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Movimiento';
        
        
         record = this.getM_stock_cabeceraModelModel();
         
            
        	var myobject = record.create({
			});            
		 var view = Ext.widget('mstockcabeceraformview',{
            caller: view,
            record: myobject,
            objectId : id,
            idOrganizacion:view.idOrganizacion,
            recordDeposito:view.record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
            height : 600,
            border : false,
            items : view
        });
        win.show();
        
    },    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('mstockcabeceraview');
        
        if(view.readOnly) {
            return false;
        }
        
        
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('Id')+') Movimiento';
        var view = Ext.widget('mstockcabeceraformview',{
            caller: view,
            record: record,
            objectId : id,
            idOrganizacion:view.idOrganizacion,
            recordDeposito:view.record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
			height : 600,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('mstockcabeceraview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
       // view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('mstockcabeceraview');
        var store = view.getStore();
        var depositoOrigen = view.down('#depositoOrigen').getValue()
        var depositoDestino = view.down('#depositoDestino').getValue()
        var tipomovimiento = view.down('#tipomovimiento').getValue()
        var filters = Ext.clone(view.filters);
        
        
        store.clearFilter(true);
        
        if (tipomovimiento){
            filters.push({ 
                property: 'stc_tipomov',
                value: tipomovimiento
            });
            
        }
        if(depositoOrigen) {
            filters.push({ 
                property: 'stc_iddepositoorigen',
                value: depositoOrigen
            });
        }
        if(depositoDestino) {
            filters.push({ 
                property: 'stc_iddepositodestino',
                value: depositoDestino
            });
        }
        store.filter(filters);
    },
    
    onDeleteClick : function(button, event, options) {
        var controller = this;
        var view = button.up('mstockcabeceraview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                
                rec.setConfig({
                    proxy: controller.getM_stock_cabeceraModelModel().getProxy()
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
                   
                }
                
            });
            
            },this);
            view.store.load();
            
        }
        		
	}
});