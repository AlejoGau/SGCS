 
Ext.define( 'Common.controller.SelecterHelperController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'selecterModel' ],
views: [ 'SelecterHelperView', 'SelecterField' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'selecterhelperview': {
            afterrender: this.initView,
            objectedit: this.onObjectEdit
        },
        'selecterhelperview #nuevo': {
            click: this.onNuevorClick
        },
        'selecterhelperview #agregar': {
            click: this.onAgregarClick
        },
        'selecterhelperview #quitar': {
            click: this.onQuitarClick
        },
        'selecterhelperview #listo': {
            click: this.onListoClick
        },
        'selecterhelperview #buscar': {
            click: this.onBuscarClick
        },
        'selecterhelperview #todos': {
            click: this.onTodosClick
        },
        'selecterhelperview #gridtodos': {
            itemdblclick: this.onItemDblClick
        },
        'selecterfield #evento': {
            click: this.onEventoClick
        },
        'selecterfield #deleteEvent': {
            click: this.onDeleteEventeClick
        },
        'selecterfield': {
            afterrender: this.initFieldView,
            selectedEvents: this.eventsSelected
        }
    });
}, // cierro init
onObjectEdit: function (record, view ) {
    var title = getLocale( 'Editar' )
    var newView = Ext.widget( view.config.editorView, {
        record: record,
        translate: false,
        title: title,
        caller: view
    });
    var myWindow = Ext.widget( 'window', {
        title: view.config.disponible.title,
        height: 480,
        width: 800,
        modal: true,
        items: newView,
        closable: true,
        layout: 'fit',
        closeAction: 'destroy',
        listeners: {
            destroy: function( win ) {
                view.combostore.load()
            }
        }
    }).show();
},
    
    
onNuevorClick: function (btn ) {
    var view = btn.up( 'selecterhelperview' )
    var record = view.config.recordParaNuevo.copy();
    record.set('Id',0);
    var newView = Ext.widget( view.config.nuevoView, {
        record: record,//Ext.clone( view.config.recordParaNuevo ),
        caller: view
    });
    // Lo agregamos al panel
    var myWindow = Ext.widget( 'window', {
        title: view.config.disponible.title,
        height: 480,
        width: 800,
        modal: true,
        items: newView,
        closable: true,
        layout: 'fit',
        closeAction: 'destroy',
        listeners: {
            destroy: function( win ) {
                view.combostore.load()
            }
        }
    }).show();
},
    
initFieldView: function (view ) {
},
    
eventsSelected: function(record, view ) {
    var descipcion = '';
    var codigo = '';
    var grid = view.down( '#gridname' )
    var gridStore = view.down( '#gridname' ).getStore();
    var modelGrid = this.getSelecterModelModel()
    gridStore.removeAll()
    if( record.items ) {
        var codArray = []
        var desArray = [];
        Ext.Array.each( record.items, function( rec ) {
            codArray.push( rec.get( view.config.valueField ) )
            //desArray.push(rec.get(view.config.disponible.field))
            gridStore.add( modelGrid.create( { name: rec.get( view.config.selecionado.field ) }) )
        })
        //descipcion = desArray.join(',')
        codigo = codArray.join( ',' )
    } else {
        // descipcion = record.get(view.config.disponible.field)
        gridStore.add( modelGrid.create( { name: record.get( view.config.disponible.field ) }) )
        codigo = record.get( view.config.valueField )
    }
    // view.down('#nombreevento').setValue(descipcion)
    view.down( '#codevento' ).setValue( codigo )
    view.down( '#deleteEvent' ).show();
    view.fireEvent( 'change', view, codigo )
    view.fireEvent( 'changeRecord', view, record )
    if( view.up( 'menu' ) ) {
        view.up( 'button' ).showMenu()
    }
    view.fireEvent( 'itemSelected', view, record );
},
    
onDeleteEventeClick: function (btn ) {
    var view = btn.up( 'selecterfield' );
    view.down( '#deleteEvent' ).hide();
    //        view.down('#nombreevento').setValue('')
    view.down( '#gridname' ).getStore().removeAll()
    view.down( '#codevento' ).setValue( '' )
    if( view.up( 'menu' ) ) {
        view.up( 'button' ).showMenu()
    }
    view.fireEvent( 'itemSelected', view, null );
},
        
onEventoClick: function (btn ) {
    var view = btn.up( 'selecterfield' );
    var simpleSelect = true;
    if( !view.simpleSelect ) {
        simpleSelect = false;
    }
    var filter = [];
    if( view.filter ) {
        filter = view.filter
    }
    view.eventosSeleccionados = view.down( '#codevento' ).getValue()
    //if(view.eventosSeleccionados){
        var myWindow = Ext.widget( 'window', {
            title: view.title,
            height: 400,
            width: 900,
            //autoScroll: true,
            closeAction: 'destroy',
            modal: true,
            items: [ {
                xtype: 'selecterhelperview',
                eventSelected: view.eventosSeleccionados,
                caller: view,
                filter: filter,
                simpleSelect: simpleSelect,
                closeAction: 'destroy',
                limitEventSelect: view.limitEventSelect ? view.limitEventSelect : 0,
                config: view.config,
                disableNew: view.disableNew
            }],
            layout: 'fit'
        }).show();
        myWindow.on( 'selectedEvents', function() {
            //console.log(arguments)
        })
    //}

},
    
    
initView: function(view ) {
    var selModel = Ext.create( 'Ext.selection.CheckboxModel' )
    if( view.simpleSelect ) {
        selModel = null;
    }
    view.add( {
        xtype: 'gridpanel',
        itemId: 'gridtodos',
        //store: 'SoftguardAlarmasSmsStore',
        flex: 1,
        autoScroll: true,
        scroll: true,
        title: 'Disponibles',
        selModel: selModel,
        columns: [
        ]
    }, {
            xtype: 'container',
            layout: 'vbox',
            margin: '120 5 0 5',
            itemId: 'botones',
            items: [
                {
                    xtype: 'button',
                    text: 'Agregar',
                    iconCls: 'icon-add',
                    itemId: 'agregar',
                    margin: '0 0 5 0',
                    width: 120
                }, {
                    xtype: 'button',
                    text: 'Quitar',
                    iconCls: 'icon-cancel',
                    itemId: 'quitar',
                    width: 120
                }
            ]
        }, {
            xtype: 'gridpanel',
            itemId: 'gridselecionados',
            flex: 1,
            autoScroll: true,
            scroll: true,
            title: 'Seleccionados',
            selModel: Ext.create( 'Ext.selection.CheckboxModel' ),
            columns: [
                /*     {
                         xtype : 'gridcolumn',
                         header : 'Eventos',
                         dataIndex : 'cod_cdescripcion',
                         flex:1                    
                     }*/
            ],
            flex: 1
        })
    var toolbarTodos = Ext.create( 'Ext.toolbar.Toolbar', {
        items: [
            {
                xtype: 'button',
                text: 'Nuevo',
                itemId: 'nuevo',
                iconCls: 'icon-add',
                hidden: true
            }, "-", {
                xtype: 'textfield',
                fieldLabel: '',
                itemId: 'query',
                flex: 1
            }, {
                xtype: 'button',
                text: 'Buscar',
                itemId: 'buscar'
            }, {
                xtype: 'button',
                text: 'Todos',
                itemId: 'todos'
            }
        ]// cierro items
    });
    view.down( '#gridtodos' ).addDocked( toolbarTodos );
    var filter = view.filter ? Ext.Array.clone( view.filter ) : [];
    if( view.simpleSelect ) {
        view.down( '#botones' ).hide();
        view.down( '#gridselecionados' ).hide();
        view.down( '#listo' ).hide();
        /*var dom = Ext.dom.Query.select('.x-column-header-checkbox');
        var el = Ext.get(dom[0]); 
        el.hide()*/
        //  view.down('#gridtodos').selModel.setLocked(true)
    }
    var controller = this;
    if( view.config ) {
        var column = Ext.create( 'Ext.grid.column.Column', {
            xtype: 'gridcolumn',
            header: view.config.disponible.title,
            dataIndex: view.config.disponible.field,
            flex: 1
        });
        view.down( '#gridtodos' ).headerCt.insert( view.down( '#gridtodos' ).columns.length, column );
        if( view.config.editorView ) {
            var columnAction = Ext.create( 'Ext.grid.column.Action', {
                xtype: 'actioncolumn',
                header: '',
                width: 30,
                itemId: 'actioncolumn',
                items: [
                    {
                        iconCls: 'icon-pencil',
                        tooltip: getLocale('Modificar'),
                        handler: function( grid, rowIndex, colIndex, item, event ) {
                            var view = grid.up( 'selecterhelperview' );
                            var rec = grid.getStore().getAt( rowIndex );
                            view.fireEvent( 'objectedit', rec, view );
                        }
                    }
                ]
            });
            view.down( '#gridtodos' ).headerCt.insert( view.down( '#gridtodos' ).columns.length, columnAction );
        }
        view.down( '#gridtodos' ).getView().refresh();
        var column = Ext.create( 'Ext.grid.column.Column', {
            xtype: 'gridcolumn',
            header: view.config.selecionado.title,
            dataIndex: view.config.selecionado.field,
            flex: 1
        });
        view.down( '#gridselecionados' ).headerCt.insert( view.down( '#gridselecionados' ).columns.length, column );
        view.down( '#gridselecionados' ).getView().refresh();
        var model =  view.config.modelItems;
        //var model =  Ext.ModelManager.getModel(view.config.modelItems)
        var combo = view.down( '#gridtodos' );
        view.combostore = Ext.create( 'Ext.data.Store', {
            model: model,
            pageSize: 1000,
            page: 1,
            remoteSort: false,
            remoteFilter: true,
            filters: filter
        })
        console.log( 'view.combostore', view.combostore )
        combo.bindStore( view.combostore );
        var paging = view.down( 'pagingtoolbar' );
        paging.bindStore( view.combostore );
        var todos = view.down( '#gridtodos' )
        view.combostore.load( {
            callback: function() {
                var selecionadosstore = Ext.create( 'Ext.data.Store', {
                    model: model,
                    pageSize: 200,
                    remoteSort: false,
                    remoteFilter: true
                })
                view.down( '#gridselecionados' ).bindStore( selecionadosstore );
                if( view.Seleccionados ) {
                    Ext.Array.each( view.Seleccionados, function( item ) {
                        if( typeof item === 'string' ) {
                            var itemRecord = view.combostore.findRecord( view.config.valueField, item );
                        } else {
                            var itemRecord = view.combostore.findRecord( view.config.valueField, parseInt( item ) );
                        }
                        if( itemRecord ) {
                            view.down( '#gridselecionados' ).getStore().addSorted( Ext.clone( itemRecord.data ) )
                            todos.getStore().remove( itemRecord )
                        }
                    })
                }
            }
        });
        if( view.config.nuevoView ) {
            view.down( '#nuevo' ).show()
        }
        if( !view.disableNew ) {
            view.down( '#nuevo' ).hide()
            if( view.down( '#actioncolumn' ) ) {
                view.down( '#actioncolumn' ).hide()
            }
        }
    }
},
    
    
onItemDblClick: function(view, record, item, index, e, options ) {
    var view = view.up( 'selecterhelperview' )
    view.caller.fireEvent( view.toEvent ? view.toEvent : 'selectedEvents', record, view.caller )
    if( view.simpleSelect ) {
        view.up( 'window' ).close()
    }
},
    
    
onBuscarClick: function (btn ) {
    var view = btn.up( 'selecterhelperview' )
    var filter = view.filter ? Ext.Array.clone( view.filter ) : [];
    console.log( 'filter', filter )
    var property;
    /*
    // DEDALO 2020/01/14 no busca con esta opcion necesitamos buscar con LIKE
    if(!view.simpleSelect) {
        view.combostore.remoteFilter = false;
        property = view.config.disponible.searchField?view.config.disponible.searchField:view.config.disponible.field
        
    } else {
        */
    property = view.config.disponible.searchField ? view.config.disponible.searchField : view.config.disponible.field;
    property = property + ':LIKE';
    //}
    console.log( 'property', property )
    console.log( 'view.combostore antes de la catastrofe', view.combostore )
    view.combostore.clearFilter( true );
    Ext.Array.push( filter, {
        property: property,
        id: view.config.disponible.searchField ? view.config.disponible.searchField : view.config.disponible.field,
        value: view.down( '#query' ).getValue(),
        anyMatch: true,
        caseSensitive: false
    })
    view.combostore.filter( filter );
    console.log( 'Ext.Array.push(', Ext.Array.push( filter, {
        property: property,
        id: view.config.disponible.searchField ? view.config.disponible.searchField : view.config.disponible.field,
        value: view.down( '#query' ).getValue(),
        anyMatch: true,
        caseSensitive: false
    }) )
},   
    
    
onTodosClick: function (btn ) {
    var view = btn.up( 'selecterhelperview' );
    var store = view.combostore;
    store.currentPage = 1;
    var filter = view.filter ? Ext.Array.clone( view.filter ) : [];
    store.clearFilter( true );
    store.filter( filter );
    view.down( '#query' ).setValue( '' );
},   
    
onListoClick: function (btn ) {
    var view = btn.up( 'selecterhelperview' );
    if( view.limitEventSelect ) {
        if( view.down( '#gridselecionados' ).getStore().data.length > view.limitEventSelect ) {
            notify( '%Solo puedes selecciona hasta% ' + view.limitEventSelect + ' %alarmas%' )
            return false;
        }
    }
    view.caller.fireEvent( view.toEvent ? view.toEvent : 'selectedEvents', view.down( '#gridselecionados' ).getStore().data, view.caller )
    view.up( 'window' ).close()
},
onAgregarClick: function (btn ) {
    var view = btn.up( 'selecterhelperview' );
    var grillaselecionados = view.down( '#gridselecionados' )
    var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
    var todos = view.down( '#gridtodos' )
    var controller = this;
    if( selection ) {
        Ext.Array.each( selection, function( rec ) {
            grillaselecionados.getStore().addSorted( Ext.clone( rec.data ) )
            todos.getStore().remove( rec )
        });
        grillaselecionados.getStore().sort()
        todos.getStore().sort()
    }
},
    
    
onQuitarClick: function (btn ) {
    var view = btn.up( 'selecterhelperview' );
    var grillaselecionadosseleccion = view.down( '#gridselecionados' ).getSelectionModel().getSelection()
    var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
    var grillaselecionados = view.down( '#gridselecionados' );
    var todos = view.down( '#gridtodos' )
    var controller = this;
    if( grillaselecionados ) {
        Ext.Array.each( grillaselecionadosseleccion, function( rec ) {
            grillaselecionados.getStore().remove( rec )
            todos.getStore().addSorted( Ext.clone( rec.data ) )
        });
        grillaselecionados.getStore().sort()
        todos.getStore().sort()
    }
}
    
});
