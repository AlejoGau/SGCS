//MIGRADO2024
Ext.define( 'Common.controller.DealerMultiSelecHelpController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'DealerMultiSelectHelpSearchModel' ],
    views: [ 'DealerMultiSelecHelpView' ],
    init: function(config ) {
        // genero los eventos
        this.control(
        {
            'dealermultiselectionhelperview': {
                
                afterrender: this.initView,
                itemdblclick: this.onItemClick
            },
            'dealermultiselectionhelperview #agregar' : {
    			click: this.onAgregarClick
			},
            'dealermultiselectionhelperview #quitar' : {
        		click: this.onQuitarClick
			},
            'dealermultiselectionhelperview #listo' : {
        		click: this.onListoClick
			},
            'dealermultiselectionhelperview #buscar' : {
            	click: this.onBuscarClick
			},
            'dealermultiselectionhelperview #busrcarotras' : {
                click: this.onBuscarOtrasClick
			},
            
            
            'dealermultiselectionhelperview #todos' : {
                click: this.onTodosClick
			},
            
            'dealermultiselectionhelperview #todosotras' : {
                click: this.onTodosOtrasClick
    		},
            'dealermultiselechelpview #gridtodos' : {
                itemclick: this.onItemDblClick
    		},
            'dealermultiselectionhelperview #evento': {
                click: this.onEventoClick
            },
            'dealermultiselectionhelperview #deleteEvent': {
                click: this.onDeleteEventeClick
            }/*,
            'dealermultiselechelpview': {
                selectedEvents: this.eventsSelected
            }*/
            
        });
    },
        
    initView: function(view ) {
        // var filter = view.filter?Ext.Array.clone(view.filter):[];
        var controller = this;
        var model =  this.getDealerMultiSelectHelpSearchModelModel()
        
        
        view.eventSelected = view.eventSelected?view.eventSelected.replace(/;/g, ','):'' //por si llega con punto y coma (;)
        /*if(view.record.get('sms_iidcuenta')) {
            view.filter = [
                {
                    property:'cue_iid',
                    value: view.record.get('sms_iidcuenta')
                }
            ]
        }*/
        var selecionadosstore =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: true,
            filters: [
                {
                    property:'cue_iid:ININT',
                    value: view.eventSelected
                }
            ],
            sorters: [
                { 
                    property: 'cue_cnombre',
                    direction:'ASC'
                }
            ]
        })
        view.down('#gridselecionados').bindStore(selecionadosstore);
        
        if (view.eventSelected!=""){
            selecionadosstore.load();
        }
        
        
        
        
        
        if(view.simpleSelect) {
            view.down('#botones').hide();
            view.down('#gridselecionados').hide();
            view.down('#listo').hide();
            
            /*var dom = Ext.dom.Query.select('.x-column-header-checkbox');
            var el = Ext.get(dom[0]); 
            el.hide()*/
            
          //  view.down('#gridtodos').selModel.setLocked(true)
        }
     
       // var combo = view.down('#gridtodos');
        var gridtodosotras = view.down('#gridtodosotras') 
         
        view.combostore =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 1000,
            remoteSort: false,
            filters: view.filter,
            remoteFilter: true,
            listeners:{
                load:function () {
                    controller.limpiarItemsYaSeleccionados(view)
                }  
            },
            sorters: [
                { 
                    property: 'cue_cnombre',
                    direction:'ASC'
                }
            ]
        })
        //combo.bindStore(view.combostore);
        
        //var todos = view.down('#gridtodos')
         
        view.combostore.load({callback:function () {
            if(view.eventSelected) {
                Ext.Array.each(view.eventSelected.split(","), function (alarma) {
                    var alarmaRecord = view.combostore.findRecord('Id',alarma, 0, false, true, true);
                    if(alarmaRecord) {
                       // view.down('#gridselecionados').getStore().addSorted(controller.getSmartPanicSearchModelModel().create(Ext.clone (alarmaRecord.data)))
                        todos.getStore().remove(alarmaRecord)
                        //gridtodosotras.getStore().remove(alarmaRecord)
                    }
                })
            }
            
            controller.limpiarItemsYaSeleccionados(view)
        
        }});
        view.combostoreTodas =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 200,
            remoteSort: false,
            remoteFilter: true,
            filters: view.filter,
            listeners:{
                load:function () {
                    controller.limpiarItemsYaSeleccionados(view)
                }  
            },
            sorters: [
                { 
                    property: 'cue_cnombre',
                    direction:'ASC'
                }
            ]
        })
        gridtodosotras.bindStore(view.combostoreTodas);
        view.down('pagingtoolbar').bindStore(view.combostoreTodas);
        view.combostoreTodas.load({callback:function () {
            /*
            if(view.eventSelected) {
                Ext.Array.each(view.eventSelected.split(","), function (alarma) {
                    var alarmaRecord = view.combostoreTodas.findRecord('Id',alarma, 0, false, true, true);
                    if(alarmaRecord) {
                        if(!view.down('#gridselecionados').getStore().findRecord('Id',alarma, 0, false, true, true)) { 
                            view.down('#gridselecionados').getStore().addSorted(controller.getSmartPanicSearchModelModel().create(Ext.clone (alarmaRecord.data)))
                        }
                        //gridtodosotras.getStore().remove(alarmaRecord)
                    }
                })
            }
            */
            controller.limpiarItemsYaSeleccionados(view)
        
        }});
         
        if(view.ocultarCuentasPropias) {
           view.down('#gridtodos').hide()
           view.down('#gridtodos').tab.hide()
           
           view.down('tabpanel').setActiveTab(view.down('#gridtodosotras'))
        }
    },
    
   onItemDblClick: function(view,record,item,index,e,options){        
       
        var view = view.up('dealermultiselectionhelperview')
        
        if(view.simpleSelect) {
            
            
            view.caller.fireEvent(view.toEvent?view.toEvent:'selectedEvents',record, view.caller)      
            view.up('window').close()
        }
        
    },
    
    
    
    onBuscarOtrasClick: function (btn) {
        var view = btn.up('dealermultiselectionhelperview')
        var filter = [];
        var controller = this;
        
        if(view.down('#dealer').getValue()) {
            Ext.Array.push(filter,{
                property:'cue_clinea',
                id: 'cue_clinea',
                value:view.down('#dealer').getValue()
            })
        }
        if(view.down('#cuenta').getValue()) {
            Ext.Array.push(filter,{
                property:'cue_ncuenta',
                id: 'cue_ncuenta',
                value:view.down('#cuenta').getValue()
            })
        }
        if(view.down('#nombre').getValue()) {
            Ext.Array.push(filter,{
                property:'cue_cnombre',
                id: 'cue_cnombre',
                value:view.down('#nombre').getValue()
            })
        }
        
        if(view.down('#email').getValue()) {
            filter.push({
                property:'cue_cemail',
                id: 'cue_cemail',
                value:view.down('#email').getValue()
            })
        }
        if(view.down('#calle').getValue()) {
            filter.push({
                property:'cue_ccalle',
                id: 'cue_ccalle',
                value:view.down('#calle').getValue()
            })
        }        
        
        if(view.down('#localidad').getValue()) {
            filter.push({
                property:'cue_clocalidad',
                id: 'cue_clocalidad',
                value:view.down('#localidad').getValue()
            })
        }    
        
        view.combostoreTodas.remoteFilter = false;
        view.combostoreTodas.filter(filter, true);
        view.combostoreTodas.remoteFilter = true;
        
        view.combostoreTodas.load({callback:function () {
            controller.limpiarItemsYaSeleccionados(view)
        }})
        
    },  
    
    onBuscarClick: function (btn) {
        var view = btn.up('dealermultiselectionhelperview')
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        var controller = this;
        view.combostore.filters.clear(false);
         
         
        view.combostore.remoteFilter = false;
        view.combostore.filter(filter, true);
        view.combostore.remoteFilter = true;
        view.combostore.load({callback:function () {
            controller.limpiarItemsYaSeleccionados(view)
        }})
        
    },  
    
    limpiarItemsYaSeleccionados: function (view) {
        
        view.down('#gridselecionados').getStore().each(function (rec) {
            console.log(rec)
            var item = view.combostoreTodas.findRecord('Id',rec.get('Id'),0, false, true, true);
            if(item) {
                 view.combostoreTodas.remove(item)
            }
            var item = view.combostore.findRecord('Id',rec.get('Id'), 0, false, true, true);
            if(item) {
                view.combostore.remove(item)
            }
        })     
    
    },
    
    
    onTodosOtrasClick: function (btn) {
        var view = btn.up('dealermultiselectionhelperview')      
        var controller = this;
        var store = view.combostoreTodas;   
        store.currentPage = 1;
        store.filters.clear(false);
        var filter = view.filter?Ext.Array.clone(view.filter):[];        
        store.filter(view.filter, true);       
        view.down('#dealer').setValue('')
        view.down('#cuenta').setValue('')
        view.down('#nombre').setValue('')
        
       
        store.load({callback:function () {
            controller.limpiarItemsYaSeleccionados(view)
        }})
        
    },   
    
    
    onTodosClick: function (btn) {
        var view = btn.up('dealermultiselectionhelperview')     
        var controller = this;     
        var store = view.combostore;   
        store.currentPage = 1;
        store.filters.clear(false);
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        view.down('#query').setValue('');
        
        store.remoteFilter = false;
        store.filter(view.filter, true);
        store.remoteFilter = true;
        store.load({callback:function () {
            controller.limpiarItemsYaSeleccionados(view)
        }})
        
        
    },   
    
    onListoClick:  function (btn) {
        var view = btn.up('dealermultiselectionhelperview');    
        
        if(view.limitEventSelect) {
            if(view.down('#gridselecionados').getStore().data.length > view.limitEventSelect) {
                notify('%Solo puedes selecciona hasta% '+view.limitEventSelect+' %cuentas%')
                return false;
            }
        }
      
         view.caller.fireEvent(view.cuentasSeleccionadasEvent?view.cuentasSeleccionadasEvent:'selectedCuentas',view.down('#gridselecionados').getStore().data, view.caller)      
               
         view.up('window').close()
    },
    onAgregarClick :  function (btn) {
        var view = btn.up('dealermultiselectionhelperview');
        var grillaselecionados = view.down('#gridselecionados')
        //var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var selectionotras = view.down('#gridtodosotras').getSelectionModel().getSelection();
        var todos = view.down('#gridtodos')
        var gridtodosotras = view.down('#gridtodosotras')
        var controller = this;
        if (selectionotras) {
            
            Ext.Array.each(selectionotras, function (rec) {
                
                grillaselecionados.getStore().addSorted(controller.getDealerMultiSelectHelpSearchModelModel().create(Ext.clone (rec.data)))                
               // todos.getStore().remove(rec)
            });
            Ext.Array.each(selectionotras, function (rec) {
                
                grillaselecionados.getStore().addSorted(controller.getDealerMultiSelectHelpSearchModelModel().create(Ext.clone (rec.data)))                
               // gridtodosotras.getStore().remove(rec)
            });
            
            
            controller.limpiarItemsYaSeleccionados(view)
            
            grillaselecionados.getStore().sort()
                
        }
    },
    
    
    onQuitarClick :  function (btn) {
        var view = btn.up('dealermultiselectionhelperview');
        var grillaselecionadosseleccion = view.down('#gridselecionados').getSelectionModel().getSelection()
        var grillaselecionados = view.down('#gridselecionados');
        var gridtodosotras = view.down('#gridtodosotras')
        var controller = this;
        if (grillaselecionados) {
            
            Ext.Array.each(grillaselecionadosseleccion, function (rec) {
                
                grillaselecionados.getStore().remove(rec)   
                gridtodosotras.getStore().addSorted(controller.getDealerMultiSelectHelpSearchModelModel().create(Ext.clone (rec.data))) 
                
            });
            
            grillaselecionados.getStore().sort()
        }
    }
});