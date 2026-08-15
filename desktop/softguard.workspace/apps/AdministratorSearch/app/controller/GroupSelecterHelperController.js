Ext.define('AdministratorSearch.controller.GroupSelecterHelperController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SoftGuardTablasGruposStore' ],
    models : [ 'SoftguardGruposModel' ],
    views : [ 'GroupSelecterHelperView', 'GroupSelecterField' ],

    init : function(config) {
        // genero los eventos
    	this.control({
			'groupsselecterhelperview' : {
				afterrender : this.initView,
               /* destroy: function (view) {
                    view.combostore.destroyStore()
                    view.down('#gridtodos').selModel.destroy()
                }*/
			},
            'groupsselecterhelperview #agregar' : {
    			click: this.onAgregarClick
			},
            'groupsselecterhelperview #quitar' : {
        		click: this.onQuitarClick
			},
            'groupsselecterhelperview #listo' : {
        		click: this.onListoClick
			},
            'groupsselecterhelperview #buscar' : {
            	click: this.onBuscarClick
			},
            'groupsselecterhelperview #todos' : {
                click: this.onTodosClick
			},
            'groupsselecterhelperview #gridtodos' : {
                itemclick: this.onItemDblClick,
                itemdblclick: this.onItemDblTodosClick
        	},
            'groupsselecterhelperview #gridselecionados' : {
                itemdblclick: this.onItemDblSeleccionadosClick
        	},            
            'groupselecterfield #grupo': {
                click: this.onGrupoClick
            },
            'groupselecterfield #deleteGroup': {
                click: this.onDeleteGroupeClick
            },
            'groupselecterfield': {
                selectedGroups: this.groupsSelected
            }
            
            
		});
	}, // cierro init
    
    groupsSelected: function(record, view) {
        var descripcion = '';
        var codigo = '';
        if(record.items) {
            var codArray = [];
            var descArray = [];
            Ext.Array.each(record.items, function (rec) {
                  descArray.push(rec.get('descriptionCalc'));
                  codArray.push(rec.get('gru_ccodigo'));
            })
            
            descripcion = descArray.join(',');
            codigo = codArray.join(',');
            
        } else {
            descripcion = record.get('descriptionCalc')
            codigo = record.get('gru_ccodigo')
        }
             
        view.down('#nombregrupo').setValue(descripcion)
        view.down('#codgrupo').setValue(codigo)        
        view.down('#deleteGroup').show()
        view.fireEvent('change',view,codigo )
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
       
    },
    
    onDeleteEventeClick: function (btn) {
        var view = btn.up('groupselecterfield');
        view.down('#deleteGroup').hide()
        
        view.down('#nombregrupo').setValue('')
        view.down('#codgrupo').setValue('')
        view.fireEvent('change',view,'')
        view.setValue('');
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
    },
        
    onEventoClick: function (btn) {
        var view = btn.up('groupselecterfield');
        
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
        
        view.gruposSeleccionados = view.down('#codgrupo').getValue()
        
         var myWindow = Ext.widget('window',{
            title: 'Selector de grupos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            autoDestroy:true,
            closeAction:'destroy',
            items: [{
                xtype: 'groupsselecterhelperview',
                groupSelected: view.gruposSeleccionados,
                caller: view,
                filter: filter,
                simpleSelect: simpleSelect,
                closeAction: 'destroy',
                limitGroupSelected: view.limitGroupSelected?view.limitGroupSelected:0
            }],
            layout: 'fit'
        }).show();
        
        
        
        myWindow.on('selectedGroups',function () {
         console.log(arguments)
        })
        
            
        
    },
    
    
    initView : function(view) {
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        console.log(filter)
        
        
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
        var model =  this.getSoftguardGruposModelModel()
        var combo = view.down('#gridtodos');
        view.combostore =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 1000,
            remoteSort: false,
            filters: filter,
            remoteFilter: true,
            autoDestroy : true,
            sorters: [
                    { 
                        property: 'gru_ccodigo',
                        direction:'ASC'
                    }
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
                            property: 'gru_ccodigo',
                            direction:'ASC'
                        }
                    ]
            })
            view.down('#gridselecionados').bindStore(selecionadosstore);
            
        
            if(view.groupSelected) {
                Ext.Array.each(view.groupSelected.split(","), function (alarma) {
                    
       
                    var alarmaRecord = view.combostore.findRecord('gru_ccodigo',alarma);
                    view.down('#gridselecionados').getStore().addSorted(controller.getSoftguardGruposModelModel().create(Ext.clone (alarmaRecord.data)))
                    todos.getStore().remove(alarmaRecord)
                })
            }
        
        }});
      
        
      console.log(filter)
	},
    
    
    onItemDblSeleccionadosClick: function(view,record,item,index,e,options){        
       
        var view = view.up('groupsselecterhelperview')
        var  controller = this;
        if(!view.simpleSelect) {
            
             
            var grillaselecionados = view.down('#gridselecionados')            
            var todos = view.down('#gridtodos')  
            
           
                
            grillaselecionados.getStore().remove(record)                
            todos.getStore().addSorted(controller.getSoftguardGruposModelModel().create(Ext.clone (record.data))) 
            
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
            
            
            
        }
        
    },
    
    
    onItemDblTodosClick: function(view,record,item,index,e,options){        
       
        var view = view.up('groupsselecterhelperview')
        var  controller = this;
        if(!view.simpleSelect) {
            
             
            var grillaselecionados = view.down('#gridselecionados')            
            var todos = view.down('#gridtodos')    
            
            grillaselecionados.getStore().addSorted(controller.getSoftguardGruposModelModel().create(Ext.clone (record.data)))                
            todos.getStore().remove(record)
           
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
            
        }
        
    },
    
    onItemDblClick: function(view,record,item,index,e,options){        
       
        var view = view.up('groupsselecterhelperview')
        
        if(view.simpleSelect) {            
            
            view.caller.fireEvent(view.toEvent?view.toEvent:'selectedGroups',record, view.caller)      
            view.up('window').close()
            
        } 
        
    },
    
    
    onBuscarClick: function (btn) {
        var view = btn.up('groupsselecterhelperview')
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        console.log(filter)
        Ext.Array.push(filter,{
            property:'porNombreOCodigo',
            id: 'porNombreOCodigo',
            value:view.down('#query').getValue()
        })
        
        view.combostore.clearFilter(true)
        view.combostore.filter(filter);
        
    },   
    
    
    onTodosClick: function (btn) {
        var view = btn.up('groupsselecterhelperview')      
        var store = view.combostore;   
        store.currentPage = 1;
        store.filters.clear(false);
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        store.filter(filter);
        view.down('#query').setValue('');
        
    },   
    
    onListoClick:  function (btn) {
        var view = btn.up('groupsselecterhelperview');    
        
        if(view.limitGroupSelected) {
            if(view.down('#gridselecionados').getStore().data.length > view.limitGroupSelected) {
                notify('%Solo puedes selecciona hasta% '+view.limitGroupSelected+' %alarmas%')
                return false;
            }
        }
      
         view.caller.fireEvent(view.toEvent?view.toEvent:'selectedGroups',view.down('#gridselecionados').getStore().data, view.caller)      
               
         view.up('window').close()
    },


    onAgregarClick :  function (btn) {
        var view = btn.up('groupsselecterhelperview');
        var grillaselecionados = view.down('#gridselecionados')
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var todos = view.down('#gridtodos')
        var controller = this;
        if (selection) {
            
            Ext.Array.each(selection, function (rec) {
                
                grillaselecionados.getStore().addSorted(controller.getSoftguardGruposModelModel().create(Ext.clone (rec.data)))                
                todos.getStore().remove(rec)
            });
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
                
        }
    },
    
    
    onQuitarClick :  function (btn) {
        var view = btn.up('groupsselecterhelperview');
        var grillaselecionadosseleccion = view.down('#gridselecionados').getSelectionModel().getSelection()
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var grillaselecionados = view.down('#gridselecionados');
        var todos = view.down('#gridtodos')
        var controller = this;
        if (grillaselecionados) {
            
            Ext.Array.each(grillaselecionadosseleccion, function (rec) {
                
                grillaselecionados.getStore().remove(rec)                
                todos.getStore().addSorted(controller.getSoftguardGruposModelModel().create(Ext.clone (rec.data))) 
            });
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
        }
    }
    
});