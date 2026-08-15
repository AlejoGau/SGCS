Ext.define('Tablas.controller.VehicleSelectorHelperController', {
    extend : 'Ext.app.Controller',
    stores : [ /*'SoftguardAlarmasSmsStore'*/ ],
    models : [ 't_AccesosVehiculoProveedorSearchModel' ],
views : [ 'VehicleSelectorHelperView'/*, 'EventSelectField'*/ ],
    init : function(config) {
        // genero los eventos
    	this.control({
			'vehicleselectorhelperview' : {
				afterrender : this.initView,
               /* destroy: function (view) {
                    view.combostore.destroyStore()
                    view.down('#gridtodos').selModel.destroy()
                }*/
			},
            'vehicleselectorhelperview #agregar' : {
    			click: this.onAgregarClick
			},
            'vehicleselectorhelperview #quitar' : {
        		click: this.onQuitarClick
			},
            'vehicleselectorhelperview #listo' : {
        		click: this.onListoClick
			},
            'vehicleselectorhelperview #buscar' : {
            	click: this.onBuscarClick
			},
            'vehicleselectorhelperview #todos' : {
                click: this.onTodosClick
			},
            'vehicleselectorhelperview #gridtodos' : {
                itemclick: this.onItemDblClick,
                itemdblclick: this.onItemDblTodosClick
        	},
            'vehicleselectorhelperview #gridselecionados' : {
                itemdblclick: this.onItemDblSeleccionadosClick
        	}/*,            
            'eventselecterfield #evento': {
                click: this.onEventoClick
            },
            'eventselecterfield #deleteEvent': {
                click: this.onDeleteEventeClick
            },
            'eventselecterfield': {
                selectedEvents: this.eventsSelected
            }*/
            
            
		});
	}, // cierro init
    
    eventsSelected: function(record, view) {
        var descripcion = '';
        var codigo = '';
        if(record.items) {
            var codArray = [];
            var descArray = [];
            Ext.Array.each(record.items, function (rec) {
                  descArray.push(rec.get('Descripcion'));
                  codArray.push(rec.get('cod_ccodigo'));
            })
            
            descripcion = descArray.join(',');
            codigo = codArray.join(',');
            
        } else {
            descripcion = record.get('Descripcion')
            codigo = record.get('cod_ccodigo')
        }
             
        view.down('#nombreevento').setValue(descripcion)
        view.down('#codevento').setValue(codigo)        
        view.down('#deleteEvent').show()
        view.fireEvent('change',view,codigo )
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
       
    },
    
    onDeleteEventeClick: function (btn) {
        var view = btn.up('eventselecterfield');
        view.down('#deleteEvent').hide()
        
        view.down('#nombreevento').setValue('')
        view.down('#codevento').setValue('')
        view.fireEvent('change',view,'')
        view.setValue('');
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
    },
        
    onEventoClick: function (btn) {
        var view = btn.up('vehicleselectorhelperview');
        
        var simpleSelect = true;
        if(!view.simpleSelect) {
            simpleSelect = false;
        } else {
            simpleSelect = view.simpleSelect
        }
        
        var filter = [];
        if(view.filter) {
            filter = view.filter
        }
        
        view.eventosSeleccionados = view.down('#codevento').getValue()
        
         var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            autoDestroy:true,
            closeAction:'destroy',
            items: [{
                xtype: 'vehicleselectorhelperview',
                eventSelected: view.eventosSeleccionados,
                caller: view,
                filter: filter,
                simpleSelect: simpleSelect,
                closeAction: 'destroy',
                limitEventSelect: view.limitEventSelect?view.limitEventSelect:0
            }],
            layout: 'fit'
        }).show();
        
        
        
        myWindow.on('selectedEvents',function () {
         console.log(arguments)
        })
        
            
        
    },
    
    
    initView : function(view) {
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        
        
        if(view.simpleSelect) {
            view.down('#botones').hide();
            view.down('#gridselecionados').hide();
            view.down('#listo').hide();
            
            /*var dom = Ext.dom.Query.select('.x-column-header-checkbox');
            var el = Ext.get(dom[0]); 
            el.hide()*/
            
          //  view.down('#gridtodos').selModel.setLocked(true)
        }
     
              
    	var controller = this;
        var model =  this.getT_AccesosVehiculoProveedorSearchModelModel();
        var combo = view.down('#gridtodos');
        view.combostore =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 1000,
            remoteSort: false,
            filters: filter,
            remoteFilter: true,
            autoDestroy : true,
            sorters: [
                    /*{ 
                        property: 'cod_ccodigo',
                        direction:'ASC'
                    }*/
                ]
        })
        combo.bindStore(view.combostore);
        
        var todos = view.down('#gridtodos')
         
        view.combostore.load({callback:function () {
             var selecionadosstore =Ext.create('Ext.data.Store',{
                model:model,
                pageSize: 1000,
                remoteSort: false,
            autoDestroy : true,
                
                sorters: [
                        { 
                            property: 'cod_ccodigo',
                            direction:'ASC'
                        }
                    ]
            })
            view.down('#gridselecionados').bindStore(selecionadosstore);
            
        
            /* para recuperar la selección una edición
            if(view.eventSelected) {
                Ext.Array.each(view.eventSelected.split(","), function (alarma) {
                    
       
                    var alarmaRecord = view.combostore.findRecord('cod_ccodigo',alarma);
                    view.down('#gridselecionados').getStore().addSorted(controller.getSoftguardCodigoAlarmaModelModel().create(Ext.clone (alarmaRecord.data)))
                    todos.getStore().remove(alarmaRecord)
                })
            }*/
        
        }});
      
        
      
	},
    
    
    onItemDblSeleccionadosClick: function(view,record,item,index,e,options){        
       
        var view = view.up('vehicleselectorhelperview')
        var  controller = this;
        if(!view.simpleSelect) {
            
             
            var grillaselecionados = view.down('#gridselecionados')            
            var todos = view.down('#gridtodos')  
            
           
                
            grillaselecionados.getStore().remove(record)                
            todos.getStore().addSorted(controller.getT_AccesosVehiculoProveedorSearchModelModel().create(Ext.clone (record.data))) 
            
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
            
            
            
        }
        
    },
    
    
    onItemDblTodosClick: function(view,record,item,index,e,options){        
       
        var view = view.up('vehicleselectorhelperview')
        var  controller = this;
        if(!view.simpleSelect) {
            
             
            var grillaselecionados = view.down('#gridselecionados')            
            var todos = view.down('#gridtodos')    
            
            grillaselecionados.getStore().addSorted(controller.getT_AccesosVehiculoProveedorSearchModelModel().create(Ext.clone (record.data)))                
            todos.getStore().remove(record)
           
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
            
        }
        
    },
    
    onItemDblClick: function(view,record,item,index,e,options){        
       
        var view = view.up('vehicleselectorhelperview')
        
        if(view.simpleSelect) {            
            
            view.caller.fireEvent(view.toEvent?view.toEvent:'selectedEvents',record, view.caller)      
            view.up('window').close()
            
        } 
        
    },
    
    
    onBuscarClick: function (btn) {
        var view = btn.up('vehicleselectorhelperview')
        var filter = view.filter?Ext.Array.clone(view.filter):[];
      
        /*Ext.Array.push(filter,{
            property:'vb.[Name]:LIKE',
            id: 'vb.[Name]',
            value:view.down('#query').getValue()
        })
        view.combostore.filter(filter);*/
        view.combostore.proxy.extraParams={'BrandModelFilter':view.down('#query').getValue()};
        view.combostore.load();
    },   
    
    
    onTodosClick: function (btn) {
        var view = btn.up('vehicleselectorhelperview')      
        var store = view.combostore;   
        store.currentPage = 1;
        store.filters.clear(false);
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        store.filter(filter);
        view.down('#query').setValue('');
        store.proxy.extraParams={};
        store.load();
        
    },   
    
    onListoClick:  function (btn) {
        var view = btn.up('vehicleselectorhelperview');    
        
        /*if(view.limitEventSelect) {
            if(view.down('#gridselecionados').getStore().data.length > view.limitEventSelect) {
                notify('%Solo puedes selecciona hasta% '+view.limitEventSelect+' %alarmas%')
                return false;
            }
        }*/
      
         //view.caller.fireEvent(view.toEvent?view.toEvent:'selectedEvents',view.down('#gridselecionados').getStore().data, view.caller)      
         view.caller.fireEvent('selectedVehicles',view.down('#gridselecionados').getStore().data, view.caller)      
               
         view.up('window').close()
    },

    onAgregarClick :  function (btn) {
        var view = btn.up('vehicleselectorhelperview');
        var grillaselecionados = view.down('#gridselecionados')
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var todos = view.down('#gridtodos')
        var controller = this;
        if (selection) {
            
            Ext.Array.each(selection, function (rec) {
                
                grillaselecionados.getStore().addSorted(controller.getT_AccesosVehiculoProveedorSearchModelModel().create(Ext.clone (rec.data)))                
                todos.getStore().remove(rec)
            });
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
                
        }
    },
    
    
    onQuitarClick :  function (btn) {
        var view = btn.up('vehicleselectorhelperview');
        var grillaselecionadosseleccion = view.down('#gridselecionados').getSelectionModel().getSelection()
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var grillaselecionados = view.down('#gridselecionados');
        var todos = view.down('#gridtodos')
        var controller = this;
        if (grillaselecionados) {
            
            Ext.Array.each(grillaselecionadosseleccion, function (rec) {
                
                grillaselecionados.getStore().remove(rec)                
                todos.getStore().addSorted(controller.getT_AccesosVehiculoProveedorSearchModelModel().create(Ext.clone (rec.data))) 
            });
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
        }
    }
    
});