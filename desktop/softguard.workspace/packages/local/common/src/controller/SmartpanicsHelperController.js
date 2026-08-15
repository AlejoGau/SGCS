//MIGRADO2024
Ext.define('Common.controller.SmartpanicsHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartPanicSearchModel' ],
    views : [ 'SmartpanicsHelperView', 'SmartpanicsField' ],
    init : function(config) {
        // genero los eventos
        this.control({
			'smartpanicshelperview' : {
				afterrender : this.initView
			},
            'smartpanicshelperview #agregar' : {
    			click: this.onAgregarClick
			},
            'smartpanicshelperview #quitar' : {
        		click: this.onQuitarClick
			},
            'smartpanicshelperview #listo' : {
        		click: this.onListoClick
			},
            'smartpanicshelperview #sendAll': {
                click: this.onSendAllClick
            },            
            'smartpanicshelperview #buscar' : {
            	click: this.onBuscarClick
			},
            'smartpanicshelperview #busrcarotras' : {
                click: this.onBuscarOtrasClick
			},
            
            
            'smartpanicshelperview #todos' : {
                click: this.onTodosClick
			},
            
            'smartpanicshelperview #todosotras' : {
                click: this.onTodosOtrasClick
    		},
            'smartpanicshelperview #gridtodos' : {
                itemclick: this.onItemDblClick
    		},
            'smartpanicsfield #evento': {
                click: this.onEventoClick
            },
            'smartpanicsfield #deleteEvent': {
                click: this.onDeleteEventeClick
            },
            'smartpanicsfield': {
                selectedEvents: this.eventsSelected
            }
            
            
		});
	}, // cierro init
    
    onSendAllClick: function(btn ) {
        var view = btn.up( 'smartpanicshelperview' );
        var model = this.getSmartPanicSearchModelModel();
        const dealer = view.record.get( 'cue_clinea' );
        view.combostoreTodas = Ext.create( 'Ext.data.Store', {
            model: model,
            pageSize: 200,
            remoteSort: false,
            remoteFilter: true,
            filters: [ {
                property: 'cue_clinea',
                value: dealer
            }]
        });

        // Cargamos el store y esperamos el resultado
        view.combostoreTodas.load( {
            callback: function( records, operation, success ) {
                if( success ) {
                    // Acá disparamos el evento con los datos cargados
                    view.caller.fireEvent( view.toEvent ? view.toEvent : 'selectedEvents', records, view.caller );
                    console.log( 'combostoreTodas cargado:', records );
                    view.up( 'window' ).close();
                } else {
                    console.warn( 'Error al cargar combostoreTodas' );
                }
            }
        });
    },

    eventsSelected: function(record, view) {
        var descipcion = '';
        var codigo = '';
        if(record.items) {
            var codArray = []
            var desArray = []
            Ext.Array.each(record.items, function (rec) {
                  codArray.push(rec.get('Id'))   
                  desArray.push(rec.get('Nombre'))   
            })
            
            descipcion = desArray.join(',')
            codigo = codArray.join(',')
            
        } else {
            descipcion = record.get('Nombre')
            codigo = record.get('Id')
        }
             
        view.down('#nombreevento').setValue(descipcion)
        view.down('#codevento').setValue(codigo)        
        view.down('#deleteEvent').show()
        
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
        
        if(view.caller) {
            view.caller.fireEvent('smartpanicsFieldChange', record,view.caller)
        }
       
       
    },
    
    onDeleteEventeClick: function (btn) {
        var view = btn.up('smartpanicsfield');
        view.down('#deleteEvent').hide()
        
        view.down('#nombreevento').setValue('')
        view.down('#codevento').setValue('')
        
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
    },
        
    onEventoClick: function (btn) {
        var view = btn.up('smartpanicsfield');
        
        var simpleSelect = false;
        if(!view.simpleSelect) {
            simpleSelect = false;
        }
        
        var filter = [];
        if(view.filter) {
            filter = view.filter
        }
        
        view.eventosSeleccionados = view.down('#codevento').getValue()
        
         var myWindow = Ext.widget('window',{
            title: 'Selector de smartpanics',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'smartpanicshelperview',
                eventSelected: view.eventosSeleccionados,
                caller: view,
                filter: filter,
                simpleSelect: simpleSelect,
                closeAction: 'destroy',
                limitEventSelect: view.limitEventSelect?view.limitEventSelect:0,
                record: view.record,
                ocultarCuentasPropias: view.ocultarCuentasPropias
            }],
            layout: 'fit'
        }).show();
        console.log('abri la ventana'),
        
        
        myWindow.on('selectedEvents',function () {
         console.log(arguments)
        })
        
            
        
    },
    
    
    initView : function(view) {
       // var filter = view.filter?Ext.Array.clone(view.filter):[];
        var controller = this;
        var model =  this.getSmartPanicSearchModelModel()
        
        
        view.eventSelected = view.eventSelected?view.eventSelected.replace(/;/g, ','):'' //por si llega con punto y coma (;)
        if(view.record.get('sms_iidcuenta')) {
            view.filter = [
                {
                    property:'cue_iid',
                    value: view.record.get('sms_iidcuenta')
                }
            ]
        }
        var selecionadosstore =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 1000,
            remoteSort: false,
            remoteFilter: true,
            filters: [
                {
                    property:'Id:ININT',
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
     
        var combo = view.down('#gridtodos');
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
        combo.bindStore(view.combostore);
        
        var todos = view.down('#gridtodos')
         
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
       
        var view = view.up('smartpanicshelperview')
        
        if(view.simpleSelect) {
            
            
            view.caller.fireEvent(view.toEvent?view.toEvent:'selectedEvents',record, view.caller)      
            view.up('window').close()
        }
        
    },
    
    
    
    onBuscarOtrasClick: function (btn) {
        var view = btn.up('smartpanicshelperview')
        var filter = [];
        var controller = this;
        
        if(view.down('#dealer').getValue()) {
            Ext.Array.push(filter,{
                property:'cue_clinea:LIKE',
                id: 'cue_clinea',
                value:view.down('#dealer').getValue()
            })
        }
        if(view.down('#cuenta').getValue()) {
            Ext.Array.push(filter,{
                property:'cue_ncuenta:LIKE',
                id: 'cue_ncuenta',
                value:view.down('#cuenta').getValue()
            })
        }
        if(view.down('#nombre').getValue()) {
            Ext.Array.push(filter,{
                property:'cue_cnombre:LIKE',
                id: 'cue_cnombre',
                value:view.down('#nombre').getValue()
            })
        }
        if(view.down('#nombresmartpanics').getValue()) {
         Ext.Array.push(filter,{
            property:'Nombre:LIKE',
            id: 'Nombre',
            value:view.down('#nombresmartpanics').getValue()
        })
        }
        
         if(view.down('#telefonootras').getValue()) {
            filter.push({
                property:'Telefono:LIKE',
                id: 'Telefono',
                value:view.down('#telefonootras').getValue()
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
        var view = btn.up('smartpanicshelperview')
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        var controller = this;
        view.combostore.filters.clear(false);
         
         
        if(view.down('#query').getValue()) {
            filter.push({
                property:'Nombre:LIKE',
                id: 'Nombre',
                value:view.down('#query').getValue()
            })
        }
        
        
        if(view.down('#telefono').getValue()) {
            filter.push({
                property:'Telefono:LIKE',
                id: 'Telefono',
                value:view.down('#telefono').getValue()
            })
        }
        
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
        var view = btn.up('smartpanicshelperview')      
        var controller = this;
        var store = view.combostoreTodas;   
        store.currentPage = 1;
        store.filters.clear(false);
       
        view.down('#dealer').setValue('')
        view.down('#cuenta').setValue('')
        view.down('#nombre').setValue('')
        
       
        store.load({callback:function () {
            controller.limpiarItemsYaSeleccionados(view)
        }})
        
    },   
    
    
    onTodosClick: function (btn) {
        var view = btn.up('smartpanicshelperview')     
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
        var view = btn.up('smartpanicshelperview');    
        
        if(view.limitEventSelect) {
            if(view.down('#gridselecionados').getStore().data.length > view.limitEventSelect) {
                notify('%Solo puedes selecciona hasta% '+view.limitEventSelect+' %smartpanics%')
                return false;
            }
        }
      
         view.caller.fireEvent(view.toEvent?view.toEvent:'selectedEvents',view.down('#gridselecionados').getStore().data, view.caller)      
               
         view.up('window').close()
    },
    onAgregarClick :  function (btn) {
        var view = btn.up('smartpanicshelperview');
        var grillaselecionados = view.down('#gridselecionados')
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var selectionotras = view.down('#gridtodosotras').getSelectionModel().getSelection();
        var todos = view.down('#gridtodos')
        var gridtodosotras = view.down('#gridtodosotras')
        var controller = this;
        if (selection) {
            
            Ext.Array.each(selection, function (rec) {
                
                grillaselecionados.getStore().addSorted(controller.getSmartPanicSearchModelModel().create(Ext.clone (rec.data)))                
               // todos.getStore().remove(rec)
            });
            Ext.Array.each(selectionotras, function (rec) {
                
                grillaselecionados.getStore().addSorted(controller.getSmartPanicSearchModelModel().create(Ext.clone (rec.data)))                
               // gridtodosotras.getStore().remove(rec)
            });
            
            
            controller.limpiarItemsYaSeleccionados(view)
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
                
        }
    },
    
    
    onQuitarClick :  function (btn) {
        var view = btn.up('smartpanicshelperview');
        var grillaselecionadosseleccion = view.down('#gridselecionados').getSelectionModel().getSelection()
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var grillaselecionados = view.down('#gridselecionados');
        var todos = view.down('#gridtodos')
        var gridtodosotras = view.down('#gridtodosotras')
        var controller = this;
        if (grillaselecionados) {
            
            Ext.Array.each(grillaselecionadosseleccion, function (rec) {
                
                grillaselecionados.getStore().remove(rec)   
                if(rec.get('sms_iidcuenta') == view.record.get('sms_iidcuenta')) {
                    todos.getStore().addSorted(controller.getSmartPanicSearchModelModel().create(Ext.clone (rec.data)))     
                }
                gridtodosotras.getStore().addSorted(controller.getSmartPanicSearchModelModel().create(Ext.clone (rec.data))) 
                
            });
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
        }
    }
    
});