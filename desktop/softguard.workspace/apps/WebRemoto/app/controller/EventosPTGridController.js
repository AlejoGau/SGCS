Ext.define('WebRemoto.controller.EventosPTGridController', {
    extend: 'Ext.app.Controller',
    stores : [ 'EventoEstadoStore', 'EventoOrigenStore', 'EventoTipoStore', 'TablasGruposStore' ],
    models : [ 'NameValueModel', 'EventosTiempoRealModel', 'TablasGruposSearchModel', 'TablasCodigosAlarmaSearchModel', 'EventoTimelineModel' ],
    views : [ 'EventosPTGridView' ],

	init : function(config) {
		this.control({
			'eventosptgridview' : {
				afterrender : this.initView,
                activate: this.onActivate
			},
            'eventosptgridview #gridrecepcion': {
                itemdblclick: this.onItemClick
            },
			'eventosptgridview button[action=search]' : {
				click : this.onBuscarClick
			},
            'eventosptgridview button[action=confirmar]' : {
    			click : this.onConfirmarClick
			},
            'eventosptgridview button[action=cancel]' : {
        		click : this.onCancelClick
			},
			'eventosptgridview #comboEstados' : {
				select : this.onComboSelect
			},
			'eventosptgridview #comboOrigenes' : {
				select : this.onComboSelect
			},
			'eventosptgridview #comboTipos' : {
				select : this.onComboSelect
			},
            'eventosptgridview #dealer' : {
    			change : this.onComboSelect
			},
			
			'eventosptgridview button[action=groupAlarmas]' : {
				click : this.onGroupAlarmasClick
			},
    		'eventosptgridview button[action=groupPrioridad]' : {
				click : this.onGroupPrioridadClick
			},
            'eventosptgridview #grupos' : {
        		select : this.onGrupoChange,
                change : this.onGrupoChangeClear
			},
            'eventosptgridview #dealer' : {
            	change : this.onDealerChange
			},
            'eventosptgridview #grupos-excluir' : {
            	select : this.onGrupoExcluirChange,
                change : this.onGrupoExcluirChangeClear
			},
		});
	}, // cierro init
    
    
    onDealerChange : function(field, newValue, oldValue) {
        var view = field.up('eventosptgridview');
        
        if(newValue != '') {
            
            view.grupoOptions = '';
            this.loadData(view);
            
        }     			
	},
    
    
    onGrupoChangeClear: function (field, newValue, oldValue) {
        var view = field.up('eventosptgridview');
        if(newValue == '') {
            view.grupoOptions = '';
            this.loadData(view);
        }
    },
    
    onGrupoExcluirChangeClear: function (field, newValue, oldValue) {
        var view = field.up('eventosptgridview');
        if(newValue == '') {
            view.grupoOptions = '';
            this.loadData(view);
        }
        
    },

    onActivate: function(view){
        this.loadData(view);
    },

	initView : function(view) {
        console.log("view grid eventos",view)
        var me = this;
        var viewport = view.up('#viewport');
        var estados = view.down('#comboEstados');
        var mygrid = view.down('grid');
        var cue_iid = view.cue_iid;
        var record = view.record;
        

        // pongo todos los eventos en estado 9
        Ext.Ajax.request({
              url: '/rest/search/AtencionEventoProcesarTodo',
              params: { 
                  rec_iidcuenta: cue_iid, 
                  paso: 0
              },
              method: 'GET',
              scope: this,
              success: function(response){
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                var cerrar = false;
                
                if (rec.Error == 0){
                    // aviso que se tomaron los eventos
                    notify('Se tomaron los eventos seleccionados');
                    view.down('#cancel').setDisabled(false)
                    view.down('#confirmar').setDisabled(false)
                } else {
                    notifyError(rec.Message);
                }
                
              }
        });

        var sorters =  [
            {
                property : 'r.rec_iid',
                direction: 'DESC'
            }
        ];
        
        if (view.sorters){
            sorters = view.sorters;
        }
        
        
        
        view.me = this;
               
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getEventosTiempoRealModelModel(),
            remoteGroup: false,
            remoteSort: true,
            pageSize: 100,
            autoDestroy: true,
            remoteFilter: true,
            listeners:{
                beforeload: me.onBeforeload
            },
            sorters: sorters
        });
        
        mygrid.bindStore(mystore);
        mystore.grid = mygrid;
        mystore.view = view;
        
                
        var pagingtoolbar = view.down('pagingtoolbar');
        pagingtoolbar.bindStore(mystore);
        
        
        //estados.setValue(view.estados?view.estados:[0,1,2,4,9]);
        
        if (view.estados || view.estados == 0) {
            estados.setValue(view.estados);
            estados.hide();
        } else {
            estados.setValue([0,1,2,4,9]);
            view.estados = [0,1,2,4,9];
        }
        
        if (view.showEstadosFilter){
            var estadoStore = estados.getStore();
            
            estadoStore.filterBy(function(record){
                return Ext.Array.contains(view.estados,record.get('Value'))
            })
            
            estados.show();
        }

        // si le pasaron una cuenta la agrega al filtro
        
        if (cue_iid){
            view.Cuentas = cue_iid;
            
            view.down('#gridrecepcion').down('#cuentacol').hide();
        }
        
		this.loadData(view);

        var comboGrupos = view.down('#grupos');
               
        var combostore = Ext.create('Ext.data.Store',{
            model: this.getTablasGruposSearchModelModel(),           
            pageSize: 200,
            remoteSort: true
        });
       
        comboGrupos.bindStore(combostore);
        
        var comboGruposExcluir = view.down('#grupos-excluir');
       
        comboGruposExcluir.bindStore(combostore);
        
        combostore.load();
	},
    
    onGrupoChange : function(combo, records, options) {
        var view = combo.up('eventosptgridview');
        
        var value = records[0].get('gru_ccodigo');
        var t = this;

    	var codigosAlarmaStore = Ext.create('Ext.data.Store',{
            model: this.getTablasCodigosAlarmaSearchModelModel(),           
            pageSize: 200,
            remoteSort: true,
            filters: [
                {
                    property: 'cod_cGrupo',
                    value: value
                }
            ]
        });
        
        view.grupoOptions = '';
        
        codigosAlarmaStore.load({
            callback : function(records, opciones, success) {
                if (opciones.success) {
                    Ext.Object.each(records, function(key, value) {
                        
                        //console.log(value.get('cod_ccodigo'));
                        if(key != 0) {
                            view.grupoOptions += ',';
                        }
                        
                        view.grupoOptions += value.get('cod_ccodigo');
                        
                    });
                    
                    
                    if(options.eventos != '') {
                        t.loadData(view);
                    } else {
                        notifyError('No hay códigos de alarma en este grupo');

                    }
                    
                }
            }
        });
				
	},
    
    
    
    
    
    onGrupoExcluirChange : function(combo, records, options) {
        var view = combo.up('eventosptgridview');
        
        var value = records[0].get('gru_ccodigo');
        var t = this;

        var codigosAlarmaStore = Ext.create('Ext.data.Store',{
            model: this.getTablasCodigosAlarmaSearchModelModel(),           
            pageSize: 200,
            remoteSort: true,
            filters: [
                {
                    property: 'cod_cGrupo:NOT IN',
                    value: value
                }
            ]
        });
        
        view.grupoOptions = '';
        
        codigosAlarmaStore.load({
            callback : function(records, opciones, success) {
                if (opciones.success) {
                    Ext.Object.each(records, function(key, value) {
                        
                        //console.log(value.get('cod_ccodigo'));
                        if(key != 0) {
                            view.grupoOptions += ',';
                        }
                        
                        view.grupoOptions += value.get('cod_ccodigo');
                        
                    });
                    
                    
                    if(options.eventos != '') {
                        t.loadData(view);
                    } else {
                        notifyError('No hay códigos de alarma en este grupo');

                    }
                    
                }
            }
        });
				
	},
    
    onComboSelect: function( combo, records, eOpts ){
        var view = combo.up('eventosptgridview');
        this.loadData(view);
    },

    onBuscarClick: function(button, event, options){
        var view = button.up('eventosptgridview');
        this.loadData(view);
    },
    
    onConfirmarClick: function(button, event, options){
        var view = button.up('eventosptgridview');
        var record = view.record;
        var resolucion = view.caller.down('#categorizacion').getValue();
        var observaciones = view.caller.down('#obsfield').getValue();
        var categorizacion = view.caller.down('#resolucion').getValue();
        var cue_iid = view.caller.record.get('cue_iid');
        var gridrecepcion = view.down('#gridrecepcion');
        
        var myGrid = view.down('#gridrecepcion'), 
            myStore = myGrid.store;
        
        var selectionModel = gridrecepcion.getSelectionModel();   
        var selectedRecords = selectionModel.getSelection();
        var procesar = '';
        
        
        var procesarArray = [];
        var noProcesarArray = [];
        var todosArray = [];
        
        // esto es un desastre de performance, no se puede recorrer 3 veces el array, recorrer una sola vez y distribuir los registros a cada array
        
        Ext.Array.each(myGrid.getStore().data.items, function(record){
           todosArray.push(record.get('rec_iid'));
        })
        
        
        if(selectionModel.store.data.length > selectedRecords.length ) {
            Ext.Array.each(selectedRecords, function(record){
                procesarArray.push(record.get('rec_iid'));
            })
            procesar =  procesarArray.join(","); 
		}
        
        Ext.Array.each(todosArray, function(value){ 
            if(procesarArray.indexOf(value) == -1) {
                noProcesarArray.push(value);
            } 
        })
        
        
        Ext.Ajax.request({
              url: '/rest/search/AtencionEventoProcesarTodo',
              params: { 
                  rec_iidcuenta: cue_iid, 
                  rec_idResolucion : resolucion,
                  rec_cObservaciones: observaciones,
                  rec_cCategorizacion: categorizacion,
                  rec_iidArray : procesar,
                  paso:1
                  
              },
              method: 'GET',
              scope: this,
              success: function(response){
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                var cerrar = false;
                
                if (!rec ||  rec.Error == 0){
                    //actualizo las pantallas
                    notify('Se procesaron los eventos seleccionados');
                    // busco si el record original esta seleccionado o no
                    if (procesar !=''){
                        Ext.Array.each(procesarArray, function(id){
                            if (id == record.get('rec_iid')){
                                cerrar = true;
                                  Ext.Ajax.request({
                                          url: '/handler/ProcesarTodoFullInterface?_dc='+new Date().getTime(),
                                          params: { 
                                              rec_idResolucion : resolucion,
                                              rec_cObservaciones: observaciones,
                                              rec_cCategorizacion: categorizacion,
                                              paso: 2,
                                              rec_iidArray : '',
                                              token: Ext.util.Cookies.get('OAuth_Token')
                                          },
                                          method: 'POST',
                                          scope: this,
                                          success: function(response){
                                            var parametros = Ext.JSON.decode(response.responseText);
                                            var rec = parametros.rows[0];
                                            var cerrar = false;
                                            
                                            if (rec && rec.Error != 0){
                                                notifyError(rec.Message);
                                            } else {
                                                //view.mask.hide();  
                                                view.up('window').close();
                                                return true;
                                            }
                                          }
                                    });
                                return false;
                            }
                        });
                    }else {
                        cerrar = true;   
                    }
                    
                    view.up('window').close();
                    if (cerrar) {
                        var parentTabPanel = view.caller.tab.up('eventomonitoreoview').up('tabpanel').up('tabpanel');
                        if(parentTabPanel) {
                            parentTabPanel.setActiveTab(parentTabPanel.down('#'+view.caller.itemIdTabReturn))
                        }
                        view.caller.tab.up('eventomonitoreoview').close();
                    }
                } else {
                    notifyError(rec.Message);
                }
                
              }
        });
    },
    
    onCancelClick: function(button, event, options){
        var view = button.up('eventosptgridview');
        var record = view.record;
        var categorizacion = view.caller.down('#categorizacion').getValue();
        var observaciones = view.caller.down('#obsfield').getValue();
        var resolucion = view.caller.down('#resolucion').getValue();
        var cue_iid = view.caller.record.get('cue_iid');
        var gridrecepcion = view.down('#gridrecepcion')
        
        var rec_iid = record.get('rec_iid');
        
        
        Ext.Ajax.request({
              url: '/rest/search/AtencionEventoProcesarTodo',
              params: { 
                  rec_iidcuenta: cue_iid, 
                  paso: 2 // cancelo
              },
              method: 'GET',
              scope: this,
              success: function(response){
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                var cerrar = false;
                
                if (rec.Error == 0){
                    //actualizo las pantallas
                    notify('Se devolvieron todos los eventos a pendientes');
                    // vuelvo a tomar el evento original
                    Ext.Ajax.request({
                          url: '/rest/search/AtencionEventoAtender',
                          params: { rec_iid: rec_iid},
                          method: 'GET',
                          scope: this,
                          success: function(response){
                            var parametros = Ext.JSON.decode(response.responseText);
                            var rec = parametros.rows[0];
                            if (rec.Error != 0){
                                notifyError(rec.Message);
                            }
                          }
                    });
                    view.up('.window').close();
                    
                } else {
                    notifyError(rec.Message);
                }
                
              }
        });
    },
    
   
    onGroupAlarmasClick: function(button, event, options){
        var view = button.up('eventosptgridview');
        var myGrid = view.down('#gridrecepcion'), 
            myStore = myGrid.store;
            
        if (button.pressed){
            myStore.group('rec_calarma');
        }else {
            myStore.clearGrouping();
        }
        
    },
    
    onGroupPrioridadClick: function(button, event, options){
        var view = button.up('eventosptgridview');
        var myGrid = view.down('#gridrecepcion'), 
            myStore = myGrid.store;
            
        if (button.pressed){
            myStore.group('ta.cod_nprioridad');
        }else {
            myStore.clearGrouping();
        }
        
    },

	loadData : function(view) {
        var controller = this;
        
        
        
        
		var myGrid = view.down('#gridrecepcion'), 
            myStore = myGrid.store;
            
        if (myGrid.isVisible(true) && !myStore.isLoading()) {
            
            view.down('#cancel').setDisabled(true)
            view.down('#confirmar').setDisabled(true)
        
            myStore.loadPage(1,{scope: view, callback: function(records){
                myGrid.getSelectionModel().selectAll();
                
                view.down('#cancel').setDisabled(false)
                view.down('#confirmar').setDisabled(false)
            }});
        }
	},
    
    onBeforeload: function(store,operation,options){
        if (operation.scope)
            var view = operation.scope;
            else
            var view = store.view;
            
        var params = {};
        var estados = view.down('#comboEstados');
        var origenes = view.down('#comboOrigenes');
        var tipos = view.down('#comboTipos');
        var alarma = view.down('button[action=soloAlarmas]').pressed?1:'';
        var dealer = view.down('#dealer');
        
        params.Alertas = alarma;
        params.Origenes = origenes.getValue().join();
        
        
        params.Estados = estados.getValue().join();    
        params.Tipos = tipos.getValue().join();
        params.CodigosAlarma = alarma;
        params.Cuentas = view.Cuentas?view.Cuentas:'';
        params.Operador = view.operador?view.operador:'';
        params.OperadorNot = view.operadorNOT?view.operadorNOT:'';
        params.cue_clinea = dealer.getValue();
        
        operation.params =params;
    },
    
    onItemClick: function(view,record,item,index,e,options){
        
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('cue_clinea')+'-'+
            record.get('cue_ncuenta')+' > '+
            record.get('rec_calarma')+'-'+
            record.get('cod_cdescripcion')+
            ' ('+Ext.Date.format(record.get('rec_isoFechaHora'),'D d-m-Y G:i:s')+')';
            
            if(record.get("cue_nparticion") != 0) {
                title += ' '+getLocale('PARTICIONADA');
            }
            
        var type = view.up('eventosptgridview').eventEditor?view.up('eventosptgridview').eventEditor:'eventoview';
        
        
        //console.log(panel.operador);
        
        var widget = Ext.widget(type,{
            title : title,
            tabConfig: {translate: false},
            translate: false,
            header: false,
        	record : record,
            closeAction: 'destroy',
            operador : view.operador,
            nombreEvento : view.nombreEvento
        })
        
        if (view.up('eventosptgridview').eventTarget == 'tab'){
             var newTab = panel.down('[title="' + title + '"]');
             if(!newTab) {
                widget.closable = false;
                var tab = panel.add(widget);
                panel.setActiveTab(tab);
             } else {
                 panel.setActiveTab(newTab);
             }
        } else{
            Ext.widget('window', {
            	title : title,
    			closable : true,
                autoShow : true,
                closeAction: 'destroy',
                width:600,
                height:400,
                layout:'fit',
                items:[widget]
    		});
        }        
    }
});