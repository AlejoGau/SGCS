Ext.define('AdministratorSearch.controller.ReceptorController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'receptor_itemsSearchModel', 'ReceptorModel', 'ReceptoresSearchModel', 'ReceptorFormatosSearchModel', 'ReceptoresCabUNIQUEModel', 'FormatosGridSearchModel' ],
    views : [ 'ReceptorView' ],

	init : function(config) {
		// genero los eventos
		this.control(
            {
            'receptorview' : {
                afterrender : this.initview,
                relacionselected: this.relationSelected                       
            },
            'receptorview button[action="add"]': {
                click: this.onAddCuentaClick
            },
            'receptorview button[action=delete]' : {
                click: this.deleteRelationSelected
            },
            'receptorview #limpiarevento': {
                click: this.onLimpiarEventoClick
            },
            'receptorview #agregar' : {
                click: this.onAgregarClick
            },            
            'receptorview #quitar' : {
                click: this.onQuitarClick
            },
            'receptorview #buscar' : {
                click: this.onBuscarClick
            },
            'receptorview #todos' : {
                click: this.onTodosClick
            },
            'receptorview #cuentasel' : {
                change: this.onCuentaselChange
            }
        });
	}, // cierro init
    
    onCuentaselChange: function (fld, oldValue, newValue, eOpts) {
        console.log('I have fired!', oldValue, newValue);
        var view = fld.up('receptorview') 
        view.loadRecord(view.record); 
        var controller = this;
        if(oldValue == 0){
            view.filters = [
                {
                        property: 'rec_iid',
                        value: view.record.get('rec_iid').toString()
                    }
                ]
            var storeseleccionados =Ext.create('Ext.data.Store',{
                model: controller.getFormatosGridSearchModelModel(),
                pageSize: 1000,
                remoteSort: true,
                remoteFilter: true,
                filters: view.filters
            })
            
            view.down('#gridselecionados').bindStore(storeseleccionados);

            storeseleccionados.load({callback:function (records) {
                var codigosSeleccionados = []
                                
                storeseleccionados.each(function (recSeleccionados) {
                    codigosSeleccionados.push(recSeleccionados.get('rec_cformato'))
                })
                
                var filter = [{
                    property:'rec_iidNOT',
                    value:view.record.get('rec_iid')
                }]

                view.storeFormatos =Ext.create('Ext.data.Store',{
                    model: controller.getFormatosGridSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: filter,
                        listeners:{
                            load: function () {
                                console.log('load')
                                var seleccionadosStore = view.down('#gridselecionados').getStore()
                                if(seleccionadosStore.data.length > 0) {
                                    seleccionadosStore.each(function (rec) {
                                        var r = view.storeFormatos.findRecord('for_ccodigo',rec.get('for_ccodigo'))
                                        if(r) {
                                            r.set('_used', true)
                                        }
                                    })
                                }
                            }
                        },
                    sorters: [
                        {
                            property : 'for_cdescripcion',
                            direction: 'ASC'
                        }
                    ]
                })

                var toolbar = view.down('pagingtoolbar');
                toolbar.bindStore(view.storeFormatos);
                view.down('#gridtodos').bindStore(view.storeFormatos);
                view.storeFormatos.load({callback:function () {
                    Ext.Array.each(records, function (rec) {
                        var r = view.storeFormatos.findRecord('for_ccodigo',rec.get('for_ccodigo'))
                        if(r) {
                            r.set('_used', true)
                        }
                    })
                }})
            }});
        }
        else{
            view.filters = [
                    {
                        property: 'rec_iid',
                        value: view.record.get('rec_iid').toString()
                    },
                    {
                        property: 'rec_iConexion',
                        value: oldValue
                    }                   
                ]
            var storeseleccionados =Ext.create('Ext.data.Store',{
                model: controller.getFormatosGridSearchModelModel(),
                pageSize: 1000,
                remoteSort: true,
                remoteFilter: true,
                filters: view.filters
            })
            
            view.down('#gridselecionados').bindStore(storeseleccionados);

            storeseleccionados.load({callback:function (records) {
                var codigosSeleccionados = []
                                
                storeseleccionados.each(function (recSeleccionados) {
                    codigosSeleccionados.push(recSeleccionados.get('rec_cformato'))
                })
                
                var filter = [{
                    property:'rec_iidNOT',
                    value:view.record.get('rec_iid')
                },{
                        property: 'rec_iConexionNOT',
                        value: oldValue
                    }  
                ]

                view.storeFormatos =Ext.create('Ext.data.Store',{
                    model: controller.getFormatosGridSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: filter,
                        listeners:{
                            load: function () {
                                console.log('load')
                                var seleccionadosStore = view.down('#gridselecionados').getStore()
                                if(seleccionadosStore.data.length > 0) {
                                    seleccionadosStore.each(function (rec) {
                                        var r = view.storeFormatos.findRecord('for_ccodigo',rec.get('for_ccodigo'))
                                        if(r) {
                                            r.set('_used', true)
                                        }
                                    })
                                }
                            }
                        },
                    sorters: [
                        {
                            property : 'for_cdescripcion',
                            direction: 'ASC'
                        }
                    ]
                })

                var toolbar = view.down('pagingtoolbar');
                toolbar.bindStore(view.storeFormatos);
                view.down('#gridtodos').bindStore(view.storeFormatos);
                view.storeFormatos.load({callback:function () {
                    Ext.Array.each(records, function (rec) {
                        var r = view.storeFormatos.findRecord('for_ccodigo',rec.get('for_ccodigo'))
                        if(r) {
                            r.set('_used', true)
                        }
                    })
                }})
            }});            
        }
    },    
    onTodosClick: function (btn) {
        var view = btn.up('receptorview')      
        var store = view.storeFormatos;   
        store.currentPage = 1;
        store.filters.clear(false);
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        store.filter(filter);
        view.down('#query').setValue('');
    },
    
    onBuscarClick: function (btn) {
        var view = btn.up('receptorview')
        var filter = view.filter?Ext.Array.clone(view.filter):[];
      
        Ext.Array.push(filter,{
            property:'for_cdescripcionORfor_cformato',
            id: 'for_cdescripcionORfor_cformato',
            value:view.down('#query').getValue()
        })
        view.storeFormatos.filter(filter);
    }, 

    onAgregarClick :  function (btn) {
        var view = btn.up('receptorview');
        var grillaselecionados = view.down('#gridselecionados')
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var todos = view.down('#gridtodos');
        var cuentasel = view.down('#cuentasel').getValue();

        var controller = this;
        if (selection) {
            Ext.Array.each(selection, function (rec,i) {
                var record = controller.getReceptorFormatosSearchModelModel().create(Ext.clone (rec.data))
                if(!grillaselecionados.getStore().findRecord('for_ccodigo',record.get('for_ccodigo'))) {
                    grillaselecionados.getStore().addSorted(record)                
                   // todos.getStore().remove(rec)
                    rec.set('_used', true)
                    
                    var model = controller.getReceptorModelModel();
                    var record = Ext.create(model,{
                        rec_iid: view.record.get('rec_iid'),
                        rec_cformato: record.get('for_ccodigo'),
                        Name: 'test',
                        rec_iConexion: cuentasel,
                    })
                    
                    record.save({callback:function () {
                        if(selection.length <= i+1) {
                            grillaselecionados.getStore().load({callback:function () {
                                var codigosSeleccionados = []
                                
                                grillaselecionados.getStore().each(function (recSeleccionados) {
                                    codigosSeleccionados.push(recSeleccionados.get('rec_cformato'))
                                })
                                
                                view.down('#gridtodos').getStore().filters.clear(false);
                                view.down('#gridtodos').getStore().filter(
                                    [{
                                        property:'rec_iidNOT',
                                        value:view.record.get('rec_iid')
                                    },
                                    {
                                        property: 'rec_iConexionNOT',
                                        value: cuentasel
                                    }  
                                    ])

                            }})
                        }
                    }})
                } else {
                    notify('%El formato% '+record.get('for_cdescripcion')+' %ya se encuentra en la lista de seleccionados%')
                }
            });

        }
    },   

    onQuitarClick :  function (btn) {
        var view = btn.up('receptorview');
        var grillaselecionadosseleccion = view.down('#gridselecionados').getSelectionModel().getSelection()
        var selection = view.down('#gridtodos').getSelectionModel().getSelection();
        var grillaselecionados = view.down('#gridselecionados');
        var todos = view.down('#gridtodos')
        var controller = this;
        if (grillaselecionados) {
            Ext.Array.each(grillaselecionadosseleccion, function (rec, i) {
                /*
                var r = view.down('#gridtodos').getStore().findRecord('for_ccodigo',rec.get('for_ccodigo'))
                if(r) {
                    r.set('_used', false)
                }
                */
                //cargo relacion
                // borro la relacion sin hacer el load primero.
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: '/rest/m_receptores_item/'+rec.get('rec_idKey'),
                    success: function(response){
                        grillaselecionados.getStore().remove(rec);
                    }
                });
                /*
                var storeseleccionados =Ext.create('Ext.data.Store',{
                    model: controller.getReceptor_itemsSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property:'rec_cformato',
                        value:rec.get('for_ccodigo')
                    },{
                        property:'rec_iid',
                        value:view.record.get('rec_iid')
                    }]
                }).load({callback:function (records) {
                    records[0].destroy({callback:function () {
                    }});
                }})
                */
            });
            
            if(grillaselecionadosseleccion.length <= i+1) {                        
                grillaselecionados.getStore().load();
                view.down('#gridtodos').getStore().load();
            }
            grillaselecionados.getStore().sort();
        }
    },
        
    onLimpiarEventoClick: function (btn) {
        var view = btn.up('formatosformview');
        view.down('#nombreevento').setValue('')
        view.down('#codevento').setValue('')
    },

	initview : function(view) {
        view.loadRecord(view.record); 
        var controller = this;
        var filters = [];  

        var store = this.getStore('ReceptoresCuentaStore');
        store.clearFilter();
        filters.push({ 
            property: 'ipc_ireceptor',
            value: view.record.get('rec_iid').toString()
        });
        if(view.record.get('rec_iid') != 0)
        {
            view.down('#cuentasel').bindStore(store);
            store.filter(filters);
        }
        view.filters = [
            {
                    property: 'rec_iid',
                    value: view.record.get('rec_iid').toString()
                }
            ]
        var storeseleccionados =Ext.create('Ext.data.Store',{
            model: controller.getFormatosGridSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        
        view.down('#gridselecionados').bindStore(storeseleccionados);

        


        storeseleccionados.load({callback:function (records) {
            var codigosSeleccionados = []
                            
            storeseleccionados.each(function (recSeleccionados) {
                codigosSeleccionados.push(recSeleccionados.get('rec_cformato'))
            })
            
            var filter = [{
                property:'rec_iidNOT',
                value:view.record.get('rec_iid')
            }]

            view.storeFormatos =Ext.create('Ext.data.Store',{
                model: controller.getFormatosGridSearchModelModel(),
                pageSize: 1000,
                remoteSort: true,
                remoteFilter: true,
                filters: filter,
                    listeners:{
                        load: function () {
                            console.log('load')
                            var seleccionadosStore = view.down('#gridselecionados').getStore()
                            if(seleccionadosStore.data.length > 0) {
                                seleccionadosStore.each(function (rec) {
                                    var r = view.storeFormatos.findRecord('for_ccodigo',rec.get('for_ccodigo'))
                                    if(r) {
                                        r.set('_used', true)
                                    }
                                })
                            }
                        }
                    },
                sorters: [
                    {
                        property : 'for_cdescripcion',
                        direction: 'ASC'
                    }
                ]
            })

            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(view.storeFormatos);
            view.down('#gridtodos').bindStore(view.storeFormatos);
            view.storeFormatos.load({callback:function () {
                Ext.Array.each(records, function (rec) {
                    var r = view.storeFormatos.findRecord('for_ccodigo',rec.get('for_ccodigo'))
                    if(r) {
                        r.set('_used', true)
                    }
                })
            }})
        }});
	},

    deleteRelationSelected: function(button, event, options){
        var view = button.up('receptorview').down('receptorformatosgridview');
        var selecteds = view.getSelectionModel().getSelection();
        var t = this;
        var model = t.getReceptorModelModel();

        
        Ext.Msg.confirm('Remove Record', 'Estas seguro que queres eliminar estas relaciones?', function (button) {
            if (button == 'yes') {
                var cantidad = (selecteds.length)-1;
                Ext.Array.each(selecteds, function(selected,key){
                    selected.setConfig({
                        proxy: model.getProxy()
                    });
                    selected.destroy();
                    if(key >= cantidad) {                               
                        view.down('pagingtoolbar').doRefresh();                            
                    }
                });
            }
        });
    },
    
    relationSelected: function (cuentas, view) {
        var t = this;
        var entidad = view.record;
        var model = this.getReceptorModelModel();
		var cantidad = (cuentas.length)-1;
        
        Ext.Array.each(cuentas, function(cuenta, key){
            var filters = [
                {
                    property: 'rec_cformato',
                    value: cuenta.get('for_ccodigo')
                },{
                    property: 'o.rec_iid',
                    value: entidad.get('rec_iid').toString()
                }
                
            ];
            var store =Ext.create('Ext.data.Store',{
                model: t.getReceptorFormatosSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: filters
                });
              
            
            store.load({callback:function (data,operation) {
                if(operation.success) {
                    if(data.length > 0) {
                        notify('El formato '+cuenta.get('for_ccodigo')+' ya se encunetra relacionado.');
                    } else {
                        var record = Ext.create(model,{
                            rec_iid: entidad.get('rec_iid'),
                            rec_cformato: cuenta.get('for_ccodigo'),
                            Name: 'test'
                        })
                        
                        record.save({callback:function () {
                        
                            if(key >= cantidad) {                               
                        	   view.down('pagingtoolbar').doRefresh();                   
                		    }
                        
                        }});
                    }
                    if(key >= cantidad) {                               
            		   view.down('pagingtoolbar').doRefresh();                   
        		    }
                }
            }});
        }); 
    },
    
    onAddCuentaClick : function(button, event, options) {
        var view = button.up('receptorview');
        var record = view.record;
        var win = Ext.create('Ext.Window', {
        	layout: 'fit',
			title : 'Seleccione los formatos',
			closeAction : 'hide',
            itemId: 'cuentaWin',
            iconCls : 'icon-page-white-code',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view: view,
			items : [
                {
                    xtype: 'receptorformatoshelperview',
                    isRelationGrid : true
                }
            ]
		});
		win.show();
	}
});