//MIGRADO2024
Ext.define('Common.controller.CuentasMovilesHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleSearchModel' ],
    views : [ 'CuentaMovilesHelperView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
					'cuentamovileshelperview' : {
						afterrender : this.initView,
                        itemclick: this.onItemClick/*,
                        sortchange: this.onSortChange*/
					},
                    'cuentamovileshelperview button[action=filterNohabilitadas]' : {
                        click: this.onNohabilitadasClick
					},
                    'cuentamovileshelperview button[action=filterHabilitadas]' : {
                        click: this.onHabilitadasClick
    				},
                    'cuentamovileshelperview button[action=filterEnprueba]' : {
                        click: this.onEnpruebaClick
        			},
                    'cuentamovileshelperview button[action=removefilter]' : {
                        click: this.onRemovefilterClick
            		},
                    'cuentamovileshelperview button[action=filterText]' : {
                        click: this.onFiltertextClick
                	},
                    'cuentamovileshelperview button[action=selected]' : {
                        click: this.onSelectedClick
                    },
                   
                   
                    'cuentamovileshelperview button[action=filterFalloTest]' : {
                        click: this.onFalloTestClick
    				}
				});
	},
    
    initView : function(view) {
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion})
        }
        
        
    
        if (view.filterTipo == 'nofilter'){
            // no filtro por ningun tipo
        } else if(view.filterTipo) {            
            Ext.Array.push(filter,{id:'tip_nTipo',property:'tip_nTipo',value:view.filterTipo})
        } else if(view.tip_nCondicion) {            
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicionIN',value:view.tip_nCondicion})
        }
        
        view.filter = filter;
  
        var store = view.helperStore?view.helperStore: Ext.create('Ext.data.Store',{
            model: this.getVehicleSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: filter,
            sorters: [
                {
                    property : 'cue_ncuenta',
                    direction: 'ASC'
                }
            ]
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
	}, 
    
  
    
   
    
    onItemClick: function(view,record,item,index,e,options){
        var helper = view.up('cuentamovileshelperview');
        if (!view.up('panel').multiSelect) {
            var win = view.up('window');
            var caller = helper.caller;
            
            
            if(helper.metodo == 'new') {
                caller.fireEvent('cuentanew',record,caller);
            } else {
                var evento = helper.selectionEvent?helper.selectionEvent:'cuentaselected';
                caller.fireEvent(evento,record,caller);
            }
            
            win.close();
        }
    },
    
    onSelectedClick: function(button, event, options){
        var view = button.up('cuentamovileshelperview');
        var selected = view.getSelectionModel().getSelection();
        var win = view.up('window');
        var caller = view.caller;
        var evento = view.selectionEvent?view.selectionEvent:'cuentaselected';
        caller.fireEvent(evento,selected,caller, view.recordPreSelected);
        win.close();
    },
    
    onNohabilitadasClick: function(button, event, options){
        var view = button.up('cuentamovileshelperview');
        var store = view.getStore();
        store.filters.clear(false);
        store.currentPage = 1;
        
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        Ext.Array.push(filter,{property:'Situacion',value:'No Habilitada',id: 'Situacion'});
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion, id:'tip_nCondicion'})
        }
        
        store.filter(filter);
        view.down('#query').setValue('');
    },
    
    onHabilitadasClick: function(button, event, options){
        var view = button.up('cuentamovileshelperview');
        var store = view.getStore();
        store.filters.clear(false);
        store.currentPage = 1;
        
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        Ext.Array.push(filter,{property:'Situacion',value:'Habilitada',id: 'Situacion'});
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion, id:'tip_nCondicion'})
        }
        
        store.filter(filter);
        view.down('#query').setValue('');
    },
    
    onEnpruebaClick: function(button, event, options){
        var view = button.up('cuentamovileshelperview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;
        
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        Ext.Array.push(filter,{property:'Situacion',value:'En Prueba',id: 'Situacion'});
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion, id:'tip_nCondicion'})
        }
        
        store.filter(filter);
        
        view.down('#query').setValue('');
    },
    
    onFiltertextClick: function(button){
    var view  = button.up('cuentamovileshelperview');
    var store = view.getStore();
    var qCmp  = view.down('#query');
    var tCmp  = view.down('#queryType');

    var filter = view.filter ? Ext.Array.clone(view.filter) : [];
    if (view.tip_ncondicion){
        filter.push({ id:'tip_nCondicion', property:'tip_nCondicion', value:view.tip_ncondicion });
    }

    store.filters.clear(false);
    store.currentPage = 1;

    if (!qCmp || !tCmp) { store.filter(filter); return; }

    var val  = qCmp.getValue() || '';
    var prop = tCmp.getValue();

    if (prop === 'Dealer-Cuenta'){
        var partes = (val || '').split('-');
        if (partes[0]) filter.push({ property:'cue_clinea',  value: Ext.String.trim(partes[0]) });
        if (partes[1]) filter.push({ property:'cue_ncuenta', value: Ext.String.trim(partes[1]) });
    } else {
        // 🔴 Forzamos LIKE en los campos de texto
        if (prop === 'cue_cnombre')   prop = 'cue_cnombre:LIKE';
        if (prop === 'tmp_cnombre')   prop = 'tmp_cnombre:LIKE';
        if (prop === 'tmp_cnumero')   prop = 'tmp_cnumero:LIKE';
        if (prop === 'cue_cIMEI')     prop = 'cue_cIMEI:LIKE';

        filter.push({ property: prop, value: val });
    }

    store.filter(filter);
},
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('cuentamovileshelperview');
        var store = view.getStore();
        store.currentPage = 1;
        store.filters.clear(false);
        
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion, id:'tip_nCondicion'})
        }
        store.filter(filter);
        view.down('#query').setValue('');
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    }
});