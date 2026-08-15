//MIGRADO2024
Ext.define('Common.controller.PerfilesHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'DesktopModulesAvailableByUserModel', 'AdministratorSearchModel' ],
    views : [ 'PerfilesHelperView', 'PerfilField' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'perfileshelperview' : {
                afterrender : this.initView
            },
            'perfileshelperview #agregar' : {
                click: this.onAgregarClick
            },
            'perfileshelperview #quitar' : {
                click: this.onQuitarClick
            },
            'perfileshelperview #listo' : {
                click: this.onListoClick
            },
            'perfileshelperview #buscar' : {
                click: this.onBuscarClick
            },
            'perfileshelperview #todos' : {
                click: this.onTodosClick
            },
            'perfileshelperview #gridtodos' : {
                itemclick: this.onItemDblClick
            },
            'perfilfield #evento': {
                click: this.onEventoClick
            },
            'perfilfield #deleteEvent': {
                click: this.onDeleteEventClick
            },
        /* 'perfilfield #verperfil': {
                click: this.onVerPerfilClick
            },*/
            'perfilfield': {
                selectedEvents: this.eventsSelected
            }
            
            
        });
    }, // cierro init
    
    
    eventsSelected: function(record, view) {
        var descipcion = '';
        var codigo = '';
        if(record.items) {
            var codArray = []
            Ext.Array.each(record.items, function (rec) {
                codArray.push(rec.get('udw_idKey'))   
            })
            
            descipcion = codArray.join(',')
            codigo = codArray.join(',')
            
        } else {
            descipcion = record.get('udw_usuario')
            codigo = record.get('udw_idKey')
        }
            
        view.down('#nombreevento').setValue(descipcion)
        view.down('#codevento').setValue(codigo)        
        view.down('#deleteEvent').show()
        //  view.down('#verperfil').show()
        
        view.fireEvent('change', view,record)
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
    
    },
    
    onDeleteEventClick: function (btn) {
        var view = btn.up('perfilfield');
        view.down('#deleteEvent').hide()        
        // view.down('#verperfil').hide()
        
        view.down('#nombreevento').setValue(getLocale('Sin perfil'))
        view.down('#codevento').setValue('')
        view.fireEvent('change', view,null)
        
        if(view.up('menu')) {
            view.up('button').showMenu()
        }
    },
        
    onEventoClick: function (btn) {
        var view = btn.up('perfilfield');
        
        var simpleSelect = true;
        if(!view.simpleSelect) {
            simpleSelect = false;
        }
        
        var filter = [];
        if(view.filter) {
            filter = view.filter
        }
        
        view.eventosSeleccionados = view.down('#codevento').getValue()
        
        var myWindow = Ext.widget('window',{
            title: 'Selector de perfil',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'perfileshelperview',
                udw_idKey: view.udw_idKey,
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
        var controller = this;
        filter.push({
            property:'udw_tipo',
            value:11
        })
        
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
        var model =  this.getAdministratorSearchModelModel()
        var combo = view.down('#gridtodos');
        view.combostore =Ext.create('Ext.data.Store',{
            model:model,
            pageSize: 1000,
            remoteSort: false,
            filters: filter,
            remoteFilter: true,
            sorters: [
                    { 
                        property: 'udw_usuario',
                        direction:'ASC'
                    }
                ]
        })
        
        view.combostore.proxy.extraParams = {
            perfil:true,
            isAdminsCuenta: view.caller.isAdminsCuenta?1:0    
        };
        combo.bindStore(view.combostore);
        
        var todos = view.down('#gridtodos')
        
        view.combostore.load({callback:function () {
            var selecionadosstore =Ext.create('Ext.data.Store',{
                model:model,
                pageSize: 1000,
                remoteSort: false,
                
                sorters: [
                        { 
                            property: 'udw_idKey',
                            direction:'ASC'
                        }
                    ]
            })
            view.down('#gridselecionados').bindStore(selecionadosstore);
            
        
            if(view.eventSelected) {
                Ext.Array.each(String(view.eventSelected).split(","), function (alarma) {
                    
    
                    var alarmaRecord = view.combostore.findRecord('udw_idKey',alarma);
                    view.down('#gridselecionados').getStore().addSorted(controller.getAdministratorSearchModelModel().create(Ext.clone (alarmaRecord.data)))
                    todos.getStore().remove(alarmaRecord)
                })
            }
        
        }});
    },
    
    onItemDblClick: function(view,record,item,index,e,options){        
        var view = view.up('perfileshelperview')
        
        if(view.simpleSelect) {
            
            
            view.caller.fireEvent(view.toEvent?view.toEvent:'selectedEvents',record, view.caller)      
            view.up('window').close()
        }
        
    },
    
    
    onBuscarClick: function (btn) {
        var view = btn.up('perfileshelperview')
        var filter = view.filter?Ext.Array.clone(view.filter):[];
    
        Ext.Array.push(filter,{
            property:'udw_usuario',
            id: 'udw_usuario',
            value:view.down('#query').getValue()
        })
        view.combostore.filter(filter);
        
    },   
    
    
    onTodosClick: function (btn) {
        var view = btn.up('perfileshelperview')      
        var store = view.combostore;   
        store.currentPage = 1;
        store.filters.clear(false);
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        store.filter(filter);
        view.down('#query').setValue('');
        
    },   
    
    onListoClick:  function (btn) {
        var view = btn.up('perfileshelperview');    
        
        if(view.limitEventSelect) {
            if(view.down('#gridselecionados').getStore().data.length > view.limitEventSelect) {
                notify('%Solo puedes selecciona hasta% '+view.limitEventSelect+' %alarmas%')
                return false;
            }
        }
    
        view.caller.fireEvent(view.toEvent?view.toEvent:'selectedEvents',view.down('#gridselecionados').getStore().data, view.caller)      
            
        view.up('window').close()
    },
    onAgregarClick :  function (btn) {
        var view = btn.up('perfileshelperview');
        var grillaselecionados = view.down('#gridselecionados')
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var todos = view.down('#gridtodos')
        var controller = this;
        if (selection) {
            
            Ext.Array.each(selection, function (rec) {
                
                grillaselecionados.getStore().addSorted(controller.getSoftguardCodigoAlarmaModelModel().create(Ext.clone (rec.data)))                
                todos.getStore().remove(rec)
            });
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
                
        }
    },
    
    
    onQuitarClick :  function (btn) {
        var view = btn.up('perfileshelperview');
        var grillaselecionadosseleccion = view.down('#gridselecionados').getSelectionModel().getSelection()
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var grillaselecionados = view.down('#gridselecionados');
        var todos = view.down('#gridtodos')
        var controller = this;
        if (grillaselecionados) {
            
            Ext.Array.each(grillaselecionadosseleccion, function (rec) {
                
                grillaselecionados.getStore().remove(rec)                
                todos.getStore().addSorted(controller.getSoftguardCodigoAlarmaModelModel().create(Ext.clone (rec.data))) 
            });
            
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
        }
    }
    
});