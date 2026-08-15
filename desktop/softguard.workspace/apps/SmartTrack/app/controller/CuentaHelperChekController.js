Ext.define('SmartTrack.controller.CuentaHelperChekController', {
    extend : 'Ext.app.Controller',
    stores : [ 'ProvinciasStore' ],
    models : [ 'CuentaSearchModel', 'ProvinciasModel' ],
    views : [ 'CuentaHelperChekView' ],

    init : function(config) {
		// genero los eventos
		this.control({
					'cuentahelpercheckview' : {
						afterrender : this.initView,
                        itemclick: this.onItemClick/*,
                        sortchange: this.onSortChange*/
					},
                    'cuentahelpercheckview button[action=filterNohabilitadas]' : {
                        click: this.onNohabilitadasClick
					},
                    'cuentahelpercheckview button[action=filterHabilitadas]' : {
                        click: this.onHabilitadasClick
    				},
                    'cuentahelpercheckview button[action=filterEnprueba]' : {
                        click: this.onEnpruebaClick
        			},
                    'cuentahelpercheckview button[action=removefilter]' : {
                        click: this.onRemovefilterClick
            		},
                    'cuentahelpercheckview button[action=filterText]' : {
                        click: this.onFiltertextClick
                	},
                    'cuentahelpercheckview button[action=selected]' : {
                        click: this.onSelectedClick
                    },
                    'cuentahelpercheckview button[action=selectedall]' : {
                        click: this.onSelectedAllClick
                    },
                    'cuentahelpercheckview button[action=particiones]' : {
                        click: this.onParticionesClick
                    },
                    'cuentahelpercheckview #filiacion' : {
                        click: this.onFiliacionClick
                    },
                    'cuentahelpercheckview button[action=filterFalloTest]' : {
                        click: this.onFalloTestClick
    				}
				});
	},
    
    initView : function(view) {
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion})
        }
        
        if (view.est_nestadoin){
            Ext.Array.push(filter,{id:'est_nestadoin',property:'est_nestado:IN',value:view.est_nestadoin})
        }
       // if(view.filterParticion == 0){
         //   var hola = Ext.Array.push(filter,{id:'tip_nTipo',property:'_tip_nTipo',value:view.filterTipo},{id:'cue_nparticion',property:'cue_nparticion',value:0})
          //  console.log('Entreee', hola)
          //  return hola
        //}
        
        
        this.onFiliacionClick(view.down('#filiacion'))

        if (view.filterTipo == 'nofilter'){
            // no filtro por ningun tipo
        } else if(view.filterTipo && view.filterTipo != '') {          
            Ext.Array.push(filter,{id:'tip_nTipo',property:'tip_nTipo',value:view.filterTipo},{property:'cue_nparticion',value:0})
        } else if(view.tip_nCondicion) {
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicionIN',value:view.tip_nCondicion})
        } else if(view.sinVehiculo) {
            Ext.Array.push(filter, {
                property: 'sinVehiculo',
                value: true
            })
        } else if(view.soloVehiculo) {
            Ext.Array.push(filter, {
                property: 'soloVehiculo',
                value: true
            })
        } else if(view.filterTipoNOT && view.filterTipoNOT != '') {
            Ext.Array.push(filter,{id:'tip_nTipo:NOT',property:'tip_nTipo:NOT',value:view.filterTipoNOT})
        } 
        
        /*
        // dedalo 18/10/2019 saco filtro de tipo por defecto sino no mustra nunca vehiculos en MWR
        else {
            Ext.Array.push(filter,{id:'tip_nTipo',property:'_tip_nTipo',value:'0,3,4'})                   
        }
        */
        if (view.hidebuttons){
            Ext.Array.each(view.hidebuttons, function(button){
                view.down(button).hide();
            })
        }
        
        
        
        view.filter = filter;
        var store = view.helperStore?view.helperStore: Ext.create('Ext.data.Store',{
            model: this.getCuentaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            autoDestroy: true,
            filters: filter,
            sorters: [
                {
                    property : 'cue_ncuenta',
                    direction: 'ASC'
                    //,root: 'data'
                }
            ]
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        
        store.load();
        
	}, 


    onParticionesClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
        var store = view.getStore();
        store.currentPage = 1;
        
        var filters = Ext.clone(view.filter);
        
        if (button.pressed){
            filters.push({
                property: 'cue_nparticion:GTINT',
                value: '0',
                id: 'cue_nparticion'
            });
          
            //store.filters.clear();
            store.filter(filters);
        } else {
            store.filters.removeAtKey('cue_nparticion');
            store.filter();
        }
        
        //view.down('#query').setValue('');
    },
    
    
    onFiliacionClick: function (btn) {
    
        var view = btn.up('cuentahelpercheckview');
        
        
        if(btn.pressed) {
            view.down('[dataIndex=cue_ncuenta]').setVisible(true);
            view.down('[dataIndex=cue_cnombre]').setVisible(true);
            view.down('[dataIndex=Situacion]').setVisible(false);
            view.down('[dataIndex=cue_cIMEI]').setVisible(false);            
            
            view.down('[dataIndex=act_nestado]').setVisible(false);
            view.down('[dataIndex=sta_cultimaalarma]').setVisible(false);
            view.down('[dataIndex=sta_dfechautimaalarma]').setVisible(false);
            view.down('[dataIndex=gps_tfechahora]').setVisible(false);
            view.down('[dataIndex=sta_dfechaultimotst]').setVisible(false);
            view.down('[dataIndex=cue_provincia]').setVisible(true);
            view.down('[dataIndex=cue_clocalidad]').setVisible(true);
            view.down('[dataIndex=cue_ccalle]').setVisible(true);
            view.down('[dataIndex=cue_ctelefono]').setVisible(true);

    
        } else {
            view.down('[dataIndex=cue_ncuenta]').setVisible(true);
            view.down('[dataIndex=cue_cnombre]').setVisible(true);
            view.down('[dataIndex=Situacion]').setVisible(true);
            view.down('[dataIndex=cue_cIMEI]').setVisible(false);            
            
            view.down('[dataIndex=act_nestado]').setVisible(true);
            view.down('[dataIndex=sta_cultimaalarma]').setVisible(true);
            view.down('[dataIndex=sta_dfechautimaalarma]').setVisible(true);
            view.down('[dataIndex=gps_tfechahora]').setVisible(false);
            view.down('[dataIndex=sta_dfechaultimotst]').setVisible(false);
            view.down('[dataIndex=cue_provincia]').setVisible(true);
            view.down('[dataIndex=cue_clocalidad]').setVisible(true);
            view.down('[dataIndex=cue_ccalle]').setVisible(true);
            view.down('[dataIndex=cue_ctelefono]').setVisible(true);
        }
        
        
        this.evaluarColumnasHide(view);
        
       
    },
    
    evaluarColumnasHide : function (view) {
        if(view.columnHide) {            
            var arrColumnId = view.columnHide.split(',');            
            Ext.Array.each(arrColumnId, function(value){
                view.columns[value].setVisible(false);                
            })            
        }
    },
    
    
    onFalloTestClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
        var store = view.getStore();       
        var filters = Ext.clone(view.filter);    
        filters.push({
            property:'sta_ncuentaenfallo',
            value:'1'
        })   
        
        
        //store.filters.clear();
        store.currentPage = 1;
        store.filter(filters);

    },
    
    onItemClick: function(view,record,item,index,e,options){
        
        var helper = view.up('cuentahelpercheckview');
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
    
    
    onSelectedAllClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
        
        
        var selected = 'allSelected';
        
        
        var win = view.up('window');
        var caller = view.caller;
        var evento = view.selectionEvent?view.selectionEvent:'cuentaselected';
        caller.fireEvent(evento,selected,caller, view.recordPreSelected);
        win.close();
    },

    
    onSelectedClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
        var selected = view.getSelectionModel().getSelection();
        if(view.selectAllRead) {
            //miro si esta select all y lo traigo todo junto
    		var headerCt = view.headerCt;
			var checkHd  = headerCt.child('gridcolumn[isCheckerHd]');        
		    view.allSelected = checkHd.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
            
            if(view.allSelected) {
                selected = 'allSelected';
            }
        }
        
        
        var win = view.up('window');
        var caller = view.caller;
        var evento = view.selectionEvent?view.selectionEvent:'cuentaselected';
        caller.fireEvent(evento,selected,caller, view.recordPreSelected);
        win.close();
    },
    
    onNohabilitadasClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
        var store = view.getStore();
        store.filters.clear(false);
        store.currentPage = 1;
        
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        Ext.Array.push(filter,{property:'Situacion',value:'No Habilitada',id: 'Situacion'});
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion, id:'tip_nCondicion'})
        }
        
        store.filter(filter);
        //view.down('#query').setValue('');
    },
    
    onHabilitadasClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
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
        var view = button.up('cuentahelpercheckview');
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
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
        /*var store = view.getStore();
        var query = view.down('#query');
        var queryType = view.down('#queryType');
        
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion, id:'tip_nCondicion'})
        }
        
        
        store.filters.clear(false);
        store.currentPage = 1;
        
        if (queryType.getValue() == 'Dealer-Cuenta'){
            var valores = query.getValue().split('-');
            filter.push({id:'cue_ncuenta', property:'cue_ncuenta',value:valores[1]});
            filter.push({id:'cue_clinea',property:'cue_clinea',value:valores[0]});
        }else{
            filter.push({property:queryType.getValue(),value:query.getValue()})
        }
        store.filter(filter);*/
        
        
        var store = view.getStore();
        var query = view.down('#query');
        var queryType = view.down('#queryType');
        
        store.currentPage = 1;
        
        var filters = Ext.clone(store.filters.items);
        
        
        if(view.down('#dealer') && view.down('#dealer').getValue()) {
            filters.push({
                property: 'cue_clinea',
                value: view.down('#dealer').getValue(),
                id:'cue_clinea'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_clinea'
            })
        }
        
        if(view.down('#cuenta') && view.down('#cuenta').getValue()) {
            
            var pad = "0000";
            var n = view.down('#cuenta').getValue();
            
            var result = (pad+n).slice(-pad.length);
            view.down('#cuenta').setValue(result)
            
            filters.push({
                property: 'cue_ncuenta',
                value: result,
                id:'cue_ncuenta'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_ncuenta'
            })
        }
        
        if(view.down('#nombre') && view.down('#nombre').getValue()) {
            filters.push({
                property: '_nombre',
                value: view.down('#nombre').getValue(),
                id:'_nombre'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != '_nombre'
            })
        }
        
        if(view.down('#panel') && view.down('#panel').getValue()) {
            filters.push({
                property: 'pan.pan_ccodigo',
                value: view.down('#panel').getValue(),
                id:'pan_ccodigo'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'pan_idKey'
            })
        }
        
        if(view.down('#calle') && view.down('#calle').getValue()) {
            filters.push({
                property: 'cue_ccalle',
                value: view.down('#calle').getValue(),
                id:'cue_ccalle'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_ccalle'
            })
        }
        
        if(view.down('#email') && view.down('#email').getValue()) {
            filters.push({
                property: 'cue_cemail',
                value: view.down('#email').getValue(),
                id:'cue_cemail'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_cemail'
            })
        }
        
        if(view.down('#emailnotificaciones') && view.down('#emailnotificaciones').getValue()) {
            filters.push({
                property: 'rep_cmail',
                value: view.down('#emailnotificaciones').getValue(),
                id:'rep_cmail'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'rep_cmail'
            })
        }
        
        
        if(view.down('#permiso') && view.down('#permiso').getValue()) {
            filters.push({
                property: 'cue_cpermiso:LIKE',
                value: view.down('#permiso').getValue(),
                id:'cue_cpermiso'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_cpermiso'
            })
        }

        
        if(view.down('#imei') && view.down('#imei').getValue()) {
            filters.push({
                property: 'cue_cIMEI:LIKE',
                value: view.down('#imei').getValue(),
                id:'cue_cIMEI'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_cIMEI'
            })
        }
        
        if(view.down('#telefono') && view.down('#telefono').getValue()) {
            filters.push({
                property: '_telefono',
                value: view.down('#telefono').getValue(),
                id:'_telefono'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != '_telefono'
            })
        }
        
        if(view.down('#clave') && view.down('#clave').getValue()) {
            filters.push({
                property: '_clave',
                value: view.down('#clave').getValue(),
                id:'_clave'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != '_clave'
            })
        }
        
        if(view.down('#equipogprs') && view.down('#equipogprs').getValue()) {
            filters.push({
                property: 'pan_cdescripcion',
                value: view.down('#equipogprs').getValue(),
                id:'pan_cdescripcion'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'pan_cdescripcion'
            })
        }
        
        if(view.down('#campocustom') && view.down('#campocustom').getValue()) {
            filters.push({
                property: 'cue_cCustom',
                value: view.down('#campocustom').getValue(),
                id:'cue_cCustom'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_cCustom'
            })
        }
        
        
        if(view.down('#comboProvincia') && view.down('#comboProvincia').getValue()) {
            filters.push({
                property: 'cue_cprovincia',
                value: view.down('#comboProvincia').getValue(),
                id:'cue_cprovincia'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_cprovincia'
            })
        }
        
        
        if(view.down('#comboefectiva') && (view.down('#comboefectiva').getValue()>0)) {
            filters.push({
                property: 'cue_nEfectiva',
                value: view.down('#comboefectiva').getValue(),
                id:'cue_nEfectiva'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_nEfectiva'
            })
        }
        
        if(view.down('#localidad') && view.down('#localidad').getValue()) {
            filters.push({
                property: 'cue_clocalidad',
                value: view.down('#localidad').getValue(),
                id:'cue_clocalidad'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_clocalidad'
            })
        }
        
        
        if(view.down('#tipo') && view.down('#tipo').getValue()!=null && view.down('#tipo').getValue()!='') {
            filters.push({
                property: 'tip_idKey',
                value: view.down('#tipo').getValue(),
                id:'tip_idKey'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'tip_idKey'
            })
        }

        
        store.filters.clear(true);
        
        store.remoteFilter = false;
        store.filter(filters, true);
        store.remoteFilter = true;
       
        
        store.load({callback:function () {
            
            /*Ext.Array.each(view.query('button'), function(btn){
                if(btn.action != 'filiacion') {
                    btn.toggle(false)
                }
                
            });*/
        
            if(view.caller) {
                view.caller.fireEvent('changegrid', view.caller, store);
            }
            
        
        }})
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('cuentahelpercheckview');
        var store = view.getStore();
        store.currentPage = 1;
        store.filters.clear(false);
        
        var filter = view.filter?Ext.Array.clone(view.filter):[];
        
        if (view.tip_ncondicion){
            Ext.Array.push(filter,{id:'tip_nCondicion',property:'tip_nCondicion',value:view.tip_ncondicion, id:'tip_nCondicion'})
        }
        if (view.est_nestadoin){
            Ext.Array.push(filter,{id:'est_nestadoin',property:'est_nestado:IN',value:view.est_nestadoin})
        }
        store.filter(filter);
        // view.down('#query').setValue('');
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    }

});