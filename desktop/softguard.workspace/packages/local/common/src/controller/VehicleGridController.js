//MIGRADO2024
Ext.define('Common.controller.VehicleGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.ProvinciasStore' ],
    models : [ 'VehicleSIMSearchModel', 'CuentaTipoSearchModel', 'VehicleSearchModel' ],
	views : [ 'VehicleGridView' ],
	init : function(config) {
		// genero los eventos
		this.control({
            'vehiclegridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectcreated: this.onDispositivoCreate,
                refresh: this.onRefresh
                //  sortchange: this.onSortChange
            },
            'vehiclegridview button[action=filterNohabilitadas]' : {
                click: this.onNohabilitadasClick
            },
            'vehiclegridview button[action=filterHabilitadas]' : {
                click: this.onHabilitadasClick
            },
            'vehiclegridview button[action=filterEnprueba]' : {
                click: this.onEnpruebaClick
            },
            'vehiclegridview button[action=removefilter]' : {
                click: this.onRemovefilterClick
            },
            'vehiclegridview button[action=filterText]' : {
                click: this.onFiltertextClick
            },
            'vehiclegridview #enmovimiento' : {
                click : this.onFiltertextClick
            },
            'vehiclegridview #frenado' : {
                click : this.onFiltertextClick
            },
            'vehiclegridview #viejas' : {
                click : this.onFiltertextClick
            },
            'vehiclegridview #enviaje' : {
                click : this.onFiltertextClick
            },
            'vehiclegridview button[action=crear]' : {
                click: this.onCrearDispositivoClick 
            },
            'vehiclegridview button[action=export]' : {
                click: this.onExportarClick
            }
        });
	}, // cierro init
    
    onRefresh: function (view) {
        view.getStore().load()
    },
	initView : function(view) {
        var controller = this;
        var parent = view.ownerCt;
        var store =Ext.create('Ext.data.Store',{
            model: this.getVehicleSearchModelModel(),
            pageSize: 50,
            remoteFilter: true,
            remoteSort: true,
            listeners:{
                beforeload: function(store,operation,options){
                    operation.store = store;
                }
            },
            sorters: [
                {
                    property : 'Name',
                    direction: 'ASC'
                }
            ]
        })
        view.bindStore(store);
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var tgModule = storeSecurity.findRecord('KeyReference', 'TrackGuard')
        store.load({callback:function (records,data) {
            let _security = tgModule.get('_Security');
            if(_security && _security.rights &&  _security.rights.CantidadCuentas  && data.resultSet.total >= _security.rights.CantidadCuentas) {
                win.down('#chkclave').show();
                win.down('#chkclave').setValue(true);
            }
        }});
        var tipostore =Ext.create('Ext.data.Store',{
            model: this.getCuentaTipoSearchModelModel() ,
            remoteSort: true,
            remoteFilter: true,
            
            filters: [
                {
                    property: 'tip_nTipo:ININT',
                    value: '1,4',
                }
            ]
        })    
        if(view.down('#tipo')) {
            view.down('#tipo').bindStore(tipostore);
            tipostore.load()
        }
        if (view.hideControls){
            Ext.Array.each(view.hideControls,function(query){
                var control = view.down(query);
                if (control){
                    control.hide();
                }
            })
        }
        view.QtyAccounts = KeyCustomerInfo.QtyAccounts;
        // si la cantidad de usuarios es mayor a 0 le aplico el calculo de limite
        // sino dejo liberado
        if (view.QtyAccounts > 0) {
            controller.tieneCuentasDisponibles(view, false);                            
        } else {
            view.cuentasDisponibles=true;
            view.cuentaLibres = true;
            view.down('#crear').setDisabled(false);
        }
        // agrego autoplay
        if (!view.interval || view.interval ==0){
            view.interval = 5000;
        }
            
        if(view.noRefresh) {
            view.down('#play').hide()
            view.down('#stop').hide()
        } else {
            view.task = Ext.TaskManager.start({
                args: [view,this],
                run: this.loadData,
                interval: view.interval
            });
        }
	},
    loadData : function(view, showMask) {
        var controller = this;
        var myStore = view.store;
            
        //para que haga el load del store aunque no este al frente  
        if (view.isVisible(true) && !myStore.isLoading() && view.down('#play').pressed) {
            myStore.load();
        }
	},
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var panel = grid.up('#center');
        var view = grid.up('vehiclegridview');
        // me fijo si el tab existe, si es nuevo lo creo
		var tabName = record.get('cue_cnombre')+' ('+record.get('cue_ncuenta')+')';
        var editorview='vehicleview';
        // el click no debe funcionar en trackguard monitoreo.
        if (this.application._nameModule == "TrackguardMonitoreo"){
            var editorview='vehicleslavegpsview';
        }
        if(tabName == undefined) {
           tabName = record.get('Name');    
        }
        tabName = tabName
            .replace(/,/g,'')
            .replace(/\[/g,'')
            .replace(/\]/g,'')
            .replace(/#/g,'')
            .replace(/\./g,'')
            .replace(/>/g,'');
        
        var mytab = panel.down('[title="' + tabName + '"]');
        if (!mytab) {
            var newTab = Ext.widget(editorview, {
                tabConfig: {translate: false},
    			title : tabName,
                objectId: id,
                translate: false,
                closable: true,
                record:record,
                closeAction: 'destroy',
                caller: view
    		});
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
    
    onCrearDispositivoClick: function(button, event, options){
        var view = button.up('vehiclegridview'); 
        
        var win = Ext.create('Ext.Window', {
        	layout : 'fit',
			title : 'Nuevo Dispositivo',
			width : 400,
			height : 240,
			border : false,
			items : Ext.widget('dmnewcuentaview',{
                caller: view
            })
		});//dispositivomovilnew
		win.show();
    },
    
    onDispositivoCreate: function(view, record){
        /**
        esto lo translade a DMNewCuentaNewCuentaController
        */
       /* var paging = view.down('pagingtoolbar');
        paging.moveFirst();
        paging.doRefresh();
        this.onItemClick(view, record);*/
        
        var panel = view.up('#center');
        var tabName = record.get('cue_cnombre')+' ('+record.get('cue_ncuenta')+')';
        if(tabName == undefined)
           tabName = record.get('Name');           
        
        var mytab = panel.down('[title="' + tabName + '"]');
        if (!mytab) {
            var newTab = Ext.widget('vehicleview', {
                tabConfig: {translate: false},
            	title : tabName,
                objectId: record.get('Id'),
                translate: false,
                closable: true,
                cuenta:record,
                closeAction: 'destroy'
    		});
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
    
    onNohabilitadasClick: function(button, event, options){
        var view = button.up('vehiclegridview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;
        store.filter([{property:'Situacion',value:'No Habilitada'}]);
        this.limpioCampos(view);
    },
    
    onHabilitadasClick: function(button, event, options){
        var view = button.up('vehiclegridview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;
        store.filter('Situacion','Habilitada');
        this.limpioCampos(view);
    },
    
    onEnpruebaClick: function(button, event, options){
        var view = button.up('vehiclegridview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;
        store.filter('Situacion','En Prueba');
        this.limpioCampos(view);
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('vehiclegridview');
        var store = view.getStore();
        var query = view.down('#query');
        var queryType = view.down('#queryType');
        var enmovimiento = view.down('#enmovimiento').pressed;
        var frenado = view.down('#frenado').pressed;    
        var viejas = view.down('#viejas').pressed;    
        var conalarma = view.down('#conalarma').pressed;    
        var showState = [];
        
        if(enmovimiento) {
            showState.push('enmovimeinto')
        }
        
        if(frenado) {
            showState.push('frenado')  
        }
        
        if(conalarma) {
            showState.push('alarma') 
        }
        
        if(viejas) {
            showState.push('vieja')
        }
        
        store.currentPage = 1;
        
        var filters = Ext.clone(store.filters.items);
        if(showState.length>0) {
            filters.push({"Id":"stateIN","property":"stateIN","value":showState.join(',')})
        }
        if(view.down('#dealer').getValue()) {
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
        
        if(view.down('#cuenta').getValue()) {
            
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
        
        if(view.down('#nombre').getValue()) {
            filters.push({
                property: 'cue_cnombre:LIKE',
                value: view.down('#nombre').getValue(),
                id:'cue_cnombre'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_cnombre'
            })
        }
        
        
        if(view.down('#imei').getValue()) {
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
        
        if(view.down('#calle').getValue()) {
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
        
        if(view.down('#telefono').getValue()) {
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
        
        if(view.down('#clave').getValue()) {
            filters.push({
                property: 'cue_cclave',
                value: view.down('#clave').getValue(),
                id:'cue_cclave'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'cue_cclave'
            })
        }
        
        /*
        if(view.down('#equipogprs').getValue()) {
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
        */
        
        /*
        if(view.down('#campocustom').getValue()) {
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
        */
        
        
        if(view.down('#comboProvincia').getValue()) {
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
        
        
        if(view.down('#localidad').getValue()) {
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
        
        if(view.down('#Domain').getValue()) {
            filters.push({
                property: 'DomainLIKE',
                value: view.down('#Domain').getValue(),
                id:'DomainLIKE'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'DomainLIKE'
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
    
        // BC : 372892771 - Se agrega el filtro por SIM1 y SIM2
        if(view.down('#sim1').getValue()) {
            filters.push({
                property: 'SIM1',
                value: view.down('#sim1').getValue(),
                id:'SIM1'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'SIM1'
            })
        }
        if(view.down('#sim2').getValue()) {
            filters.push({
                property: 'SIM2',
                value: view.down('#sim2').getValue(),
                id:'SIM2'
            });
        } else {
             filters = filters.filter(function (r) {
                return r.id != 'SIM2'
            })
        }
        
        store.filters.clear(true);
        store.remoteFilter = false;
        store.filter(filters, true);
        store.remoteFilter = true;
        
        store.load({callback:function () {
            if(view.caller) {
                view.caller.fireEvent('changegrid', view.caller, store);
            }
            
            view.down('#filtro').hideMenu();
        }})
    },
    
    limpioCampos: function (view) {
        view.down('#dealer').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#nombre').setValue('');
        view.down('#calle').setValue('');
        // view.down('#email').setValue('');
        view.down('#telefono').setValue('');
        view.down('#clave').setValue('');
        // view.down('#equipogprs').setValue('');
        // view.down('#campocustom').setValue('');
        
        view.down('#imei').setValue('');
        view.down('#comboProvincia').setValue('');
        view.down('#localidad').setValue('');
        if(view.down('#tipo')) {
            view.down('#tipo').setValue('');
        }
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('vehiclegridview');
        var store = view.getStore();
        store.clearFilter(true);
        this.limpioCampos(view);
        //var filters = [];
        //filters.push(view.filterTipoObj);
       // store.filter(filters);
       
        var filters = Ext.clone(view.filters);
       
        store.remoteFilter = false;
        store.filter(filters, true);
        store.remoteFilter = true;
        store.load({callback:function () {
        
            if(view.caller) {
                view.caller.fireEvent('changegrid', view.caller, store);
            }
            button.toggle(true);
        }});
    },
    onExportarClick: function(button){
        var view = button.up('vehiclegridview');
     //   var grid = view.down('#gridcuenta');
        var store = view.getStore();
        
        var url = store.lastUrl;
        var partes = url.split(/\?/);
        url = partes[0]+'.xls?'+partes[1]
        
        url = Ext.urlAppend(url,'limit=10000');
        location.href=url;
    },
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    tieneCuentasDisponibles: function (view, callback) {
        // si cuentas libre esta en true no compruebo nunca la cantidad de cuentas utilizadas
        if(view.cuentaLibres) {
            view.down('#crear').setDisabled(false);
            view.cuentasDisponibles = true;
        } else {
            var fieldToolBar = Ext.ComponentQuery.query('#toolbardisplayfield')[0];
      
            if(view.QtyAccounts && view.QtyAccounts != 0 ) { //==0 solo para testeo
                Ext.Ajax.request({
                  url: '/Rest/search/CantidadCuentaGroupByTipo?type=totallicencias',
                  method: 'GET',
                  success: function(resp,operation) {
                    if (resp.responseText.length > 0){
                        var json = JSON.parse(resp.responseText);
                        var asignados = parseInt(json.rows[0].Cuentas);
                  
                        if(asignados == view.QtyAccounts) {
                            
                            // actualizo cantidades en la barra
                            {
                                if (fieldToolBar)
                                    fieldToolBar.setValue(getLocale('Disponibles/Usadas') +' ('+view.QtyAccounts+'/'+asignados+')');
                                    
                            }
                            view.down('[action="nuevo"]').setDisabled(true);
                            var msg = getLocale('Se supero la cantidad de cuentas disponibles')+'. ('+view.QtyAccounts+'/'+asignados+')';
                            Ext.Msg.alert('Atención', msg, Ext.emptyFn);
                            view.cuentasDisponibles = false;
                            
                            
                        } else if (asignados > view.QtyAccounts) {
                            // actualizo cantidades en la barra
                            if (fieldToolBar)
                            fieldToolBar.setValue(getLocale('Disponibles/Usadas') +' ('+view.QtyAccounts+'/'+asignados+')');
        
                            
                            view.down('#crear').setDisabled(true);
                            
                            Ext.Msg.alert('Atención', getLocale('Se supero la cantidad de cuentas disponibles. Por favor comuniquese con el administrador')+'. ('+view.QtyAccounts+'/'+asignados+')', Ext.emptyFn);    
                            
                            view.licenseViolation =true;
                            view.cuentasDisponibles = false;
                            view.fireEvent('licenseviolation');
                            
                        } else {
                        
                            // actualizo cantidades en la barra
                            if (fieldToolBar)
                                fieldToolBar.setValue(getLocale('Disponibles/Usadas')+' ('+view.QtyAccounts+'/'+asignados+')');
                            
                            view.down('#crear').setDisabled(false);
                            view.cuentasDisponibles = true;
                            if(callback) {
                                callback();
                            }
                        }
                    }
                  }
                });
            
            }else {
                // actualizo cantidades en la barra   
                if (fieldToolBar)
                    fieldToolBar.setValue(getLocale('Sin control de cuentas'));
                    
                view.cuentasDisponibles = true;
                view.down('#crear').setDisabled(false);
                //view.down('#cuentaCreate').setDisabled(true);
                
                if(callback) {
                   callback();
                }
            }
        }
    }
});