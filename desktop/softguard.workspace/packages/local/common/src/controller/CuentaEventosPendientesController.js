//MIGRADO2024
Ext.define('Common.controller.CuentaEventosPendientesController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventosPendientesMapaSearchModel' ],
    views : [ 'CuentaEventosPendientesView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
					'cuentaeventospendientesgridview' : {
						afterrender : this.initView,
                        selectionchange : this.onSelectionChange
					},
                    'cuentaeventospendientesgridview #seleccionatodo' : {
    					click : this.onClickSeleccionarTodo
					}
				});
	}, // cierro init
    onClickSeleccionarTodo: function (btn) {
        var view =  btn.up('cuentaeventospendientesgridview')
        if(!btn.pressed) {
            
            btn.setText(getLocale('Seleccionar todo'));
            btn.seleccionarTodo = false;            
             view.getSelectionModel().deselectAll()
            
        } else {
            
            btn.setText('Sacar seleccion');
            btn.seleccionarTodo = true;
             view.getSelectionModel().selectAll()
            
        }
    },
	initView : function(view) {
       view.store =Ext.create('Ext.data.Store',{
            model: this.getEventosPendientesMapaSearchModelModel(),
            pageSize: 100
        });
        view.bindStore(view.store);
        //store.load();
        
       if (!view.interval || view.interval ==0)
            view.interval = 10000;
            
       this.loadData(view, true);
        
        view.task = Ext.TaskManager.start({
            args: [view,this],
            run: this.loadData,
            interval: view.interval
        });
        
        
	},
    
    
    loadData: function (view, showMask) {
        
        if(showMask==true){view.setLoading(true)};
        var selection = view.getSelectionModel().getSelection();
        
        if(!view.loadingStore) {
            view.loadingStore = true;
            view.store.loadPage(1,{scope: view, callback: function(records){           
                view.setLoading(false);
                view.loadingStore = false;
                if(view.down('#seleccionatodo').seleccionarTodo && view.allSelected) {
                    view.getSelectionModel().selectAll()
                } else { 
                    var selected = [];
                    Ext.Array.each(selection, function (record) {
                        var rowIndex = view.store.findRecord('rec_iid', record.get('rec_iid'));  
                        if(rowIndex) {
                		    selected.push(rowIndex)
                        }
        
                    })
                    view.getView().select(selected);
                    //view.fireEvent('selectionchange', view.getSelectionModel());
                }
                	view.fireEvent('selectionchange', view.getSelectionModel());
            }});
        }
        
    },
    
    onSelectionChange: function(selectionModel, records, options){
        var selected = selectionModel.getSelection();
        var view = selectionModel.view.up('cuentaeventospendientesgridview');
        selectionModel.view.un('selectionchange', this.onSelectionChange, this);
        setTimeout(() => {
             if(!view.loadingStore) {
			var viewport = view.up('mapguardgpsview')?view.up('mapguardgpsview'):view.up(view.parentView);
			var gmap = viewport.down('#googlemap');
			var fireEvent;
			if(view.fireSelectionChangeName) {
				fireEvent = view.fireSelectionChangeName;
			} else {
				fireEvent = 'markersCuentaChange';
			}
                
            console.log('evento: '+fireEvent);
			//miro si esta select all y lo traigo todo junto
			var headerCt = view.headerCt;
			var checkHd  = headerCt.child('gridcolumn[isCheckerHd]');        
		    view.allSelected = checkHd.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
			if(view.down('#seleccionatodo').seleccionarTodo && view.allSelected) {
				if(!view.loadingStore) {
					view.loadingStore = true;
					var allStore =Ext.create('Ext.data.Store',{
						model: this.getEventosPendientesMapaSearchModelModel(),
						pageSize: 500
					}).load({callback:function (records) {
						view.loadingStore = false;
						gmap.fireEvent(fireEvent,gmap,records);
					}})
				}
			} else {            
				if(!view.loadingStore) {
					gmap.fireEvent(fireEvent,gmap,selected);
				}
				if(!view.allSelected) {
    				view.down('#seleccionatodo').toggle(false)
					view.down('#seleccionatodo').setText(getLocale('Seleccionar todo'));
            		view.down('#seleccionatodo').seleccionarTodo = false;          
				}
        }
        }
            selectionModel.view.on('selectionchange', this.onSelectionChange, this);
        }, 5000);
      
        
        
    },
});