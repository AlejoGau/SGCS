Ext.define('SmartTrack.controller.SmartTrackPendingGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'KeyModulesModel', 'SoftguardTelefonoModel', 'SoftguardUsuarioModel', 'TelefonoSearchModel', 'SmartTrackModel', 'SmartTrackSearchModel' ],
    views : [ 'SmartTrackPendiengGridView' ],

    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'smarttrackpendinggridview' : {
				afterrender : this.initView,                
                objectedit: this.onObjectEdit,
                cuentachanged: this.onCuentaChanged,
                cuentaselected: this.onCuentaChanged,
                cuentanew: this.onCuentaNew,                
                smarttrackchange: this.onSmartTrackChange
			},
    		'smarttrackgridview' : {              
                smarttrackchange: this.onSmartTrackChange
			},
            'smarttrackpendinggridview button[action=search]': {
                click: this.onSearchClick
            },
            'smarttrackpendinggridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'smarttrackpendinggridview button[action=asignarcuenta]': {
                click: this.onAsignarCuentaClick
            },
            'smarttrackpendinggridview button[action=configurar]': {
                click: this.onConfigurarClick
            },
            'smarttrackpendinggridview button[action=groupAlarmas]' : {
    			click : this.onGroupAlarmasClick
			},
            'smarttrackpendinggridview button[action=delete]' : {
        		click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [{
            property: 'cue_ncuenta:ISNULLOREMPTY',
            value: ''
        }];
        var filterTipo = view.filterTipo??5;
        var createTipo = view.createTipo??5;
        console.log(view)
        if (filterTipo == 9){
            view.filters.push({
                property: 'AppType',
                value: 'CLEANAPP'
            });
        }
        else{
            view.filters.push({
                property: 'AppType',
                value: 'VIGICONTROL'
            });
        }

        if (!view.isAdmin){
            view.down('#toolbardisplayfield').hide();
            view.down('#btnconfig').hide();
        }

        var store =Ext.create('Ext.data.Store',{
            model: this.getSmartTrackSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load()
       
        var storeKey =Ext.create('Ext.data.Store',{
            model: this.getKeyModulesModelModel()
        })
        var t = this;
        storeKey.load({callback: function () {
            storeKey.each(function(record)  {  
                   if( record.get('Module') == 'VigiControl') {
                        view.QtyUsers = record.get('QuantityOfUsers');                    
                        store.load();
                   }                   
            }, this); 
            t.tieneUsuariosDisponibles(view);
        }});
	},

    onSmartTrackChange: function (record,view) {
        var gridview = view.up('viewport').down('smarttrackpendinggridview');
        
        if (gridview)
        gridview.down('pagingtoolbar').doRefresh();
    },
    
    onDeleteClick: function(button, event, options){
        var view =button.up('smarttrackpendinggridview');
        var selection = view.getSelectionModel().getSelection();
        var model = this.getSmartTrackModelModel();
        
        var cantidad = selection.length;
        Ext.Array.each(selection,function(record,i){
            record.setProxy(model.getProxy());            
            if(record.get('CuentaId') == 0) {
                record.destroy({callback: function(){
                    if(cantidad >= i) {
                        view.down('pagingtoolbar').doRefresh();
                    }  
                }});
            } else {
                notify('El telefono '+ record.get('Telefono')+' no puede ser eliminado por que se encuentra asociado.');
            }
        });
    },
    
    onGroupAlarmasClick: function(button, event, options){
        var view = button.up('smarttrackpendinggridview');      
        var store = view.store;
        
        if (button.pressed){
            store.group('cue_cnombre');
        } else {
            store.clearGrouping();
            view.getView().refresh()
        }
    },

    onAsignarCuentaClick : function(button, event, options) {
        var view =button.up('smarttrackpendinggridview');
        var filterTipo = view.filterTipo??5;
        var createTipo = view.createTipo??5;
        this.tieneUsuariosDisponibles(view, function () {
            var selection = view.getSelectionModel().getSelection();
            var record = selection[0];
            if(parseInt(record.get('Telefono')) > 0) {
                var win = Ext.create('Ext.Window', {
            		layout: 'fit',
        			title : 'Seleccione una Cuenta',
        			closeAction : 'destroy',
                    itemId: 'cuentaWin',
        			width : 750,
        			height : 550,
        			border : true,
                    modal: true,
                    view : view,
        			items : [
                        {
                            xtype: 'cuentahelperview',
                            //tip_ncondicion: "3",
                            caller: view,
                            filterTipo: filterTipo,
                        }
                    ]
        		});
        		win.show();
                
            } else {
                 notify('Debe tener número de teléfono para poder asignar una cuenta.');
            }
        });
	},

    onConfigurarClick : function(button, event, options) {
        var view = button.up('smarttrackpendinggridview');
        var panel = button.up('#center');
        var title = 'Configuración del servicio';
        var mytab = panel.down('[title="' + title + '"]');
        var controller = this;

        var applicationId = 52;//112
        var apptype = 'VIGICONTROL';//CLEANAPP

        if (controller.getApplication()._nameModule == 'CleanApp'){
            applicationId = 112;
            apptype = 'CLEANAPP';
        }
        
        if (!mytab) {
            var newTab = Ext.widget('smarttrackconfigview', {
                tabConfig: {translate: false},
        		title : title,
                translate: false,
                closable: true,
                closeAction: 'destroy',
                applicationId: applicationId,
                apptype: apptype
    		});
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
	},
    
  
    
    onObjectEdit: function(record,view){
        this.tieneUsuariosDisponibles(view, function () {
            this.onItemClick(view,record);
        });
    },

    onGetAllClick: function(button, event, options) {    
        var view = button.up('smarttrackpendinggridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
       // view.down('#Name').setValue('');
    //    view.down('#LastName').setValue('');
      //  view.down('#Email').setValue('');
        
      /*  var taxonomytree = view.query('taxonomiesmastertree')[0]; 
        var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
        var taxonomiesArray = [];
        Ext.Array.each(taxonomiesSelected, function (rec) {
            if (rec.get('checked'))
            rec.set('checked', false)
        },this);*/
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('smarttrackpendinggridview');
        
        var store = view.getStore();
       // var query = view.down('#query');
        //var field = view.down('#fieldName');
        
        var filters = Ext.clone(view.filters);
        
        var queryType = view.down('#queryType').getValue();
        var query = view.down('#query').getValue();
        
       // var name = view.down('#Imei').getValue();
        //var lastname = view.down('#Telefono').getValue();
        //var email = view.down('#Cuenta').getValue();
        
        if (queryType == 'imei')
            filters.push({ 
                property: 'Imei:LIKE',
                value: query,
                id: 'search'
            });
            
        if (queryType == 'telefono')
            filters.push({ 
                property: 'Telefono:LIKE',
                value: query,
                id: 'search'
            });
            
        if (queryType == 'nombre')
            filters.push({ 
                property: 'cue_cnombre:LIKE',
                value: query,
                id: 'search'
            });
            
        if (queryType == 'cuenta')
            filters.push({ 
                property: 'cue_ncuenta:LIKE',
                value: query,
                id: 'search'
            });
        
        if (filters.length>0)
            store.filter(filters);
            else
            store.clearFilter();
    },
    
    onCuentaChanged: function(cuenta, view){
        var gridview = view.up('viewport').down('smarttrackpendinggridview');
        
        var selection = view.getSelectionModel().getSelection();
        var model = this.getSmartTrackModelModel();
        var telefonoModel = this.getTelefonoSearchModelModel();
        var t = this;  
        
        Ext.Array.each(selection,function(record, key){
            var telefono = record.get('Telefono');;
            
            var filters = [{
                property: 'tel_ctelefono', 
                value: telefono
            },{
                property: 'tel_iidcuenta',
                value: cuenta.get('Id')
            }];

            var store =Ext.create('Ext.data.Store',{
                model: telefonoModel ,
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: filters
            });
        
            store.load({callback: function (records) {
                    //record.setProxy(model.getProxy());            
                    model.load(record.get('Id'),{callback:function (recordl) {
                    recordl.setProxy(model.getProxy());
                    
                    recordl.set('CuentaId', cuenta.get('cue_iid'));
                    recordl.save({success: function(record){
                      
                        var parametros = 'cuentaid='+cuenta.get('cue_iid')+'&SmartTrackId='+record.get('Id');
                        
                        
                        Ext.Ajax.request({
                          url: '/rest/search/smarttrackasignarcuenta',
                          method: 'GET',
                          params: parametros,
                          success: function(resp,operation) {
                            notify('Los datos se guardaron con éxito');
                            gridview.down('pagingtoolbar').doRefresh();
                          }
                        });
                    }});
                }})
            }});
        });
     },
    
     onCuentaNew: function(cuenta, view){
        var gridview = view.up('viewport').down('smarttrackpendinggridview');

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
			title : 'Nuevo SmartPanic',
			closeAction : 'destroy',
            itemId: 'cuentaNew',
			width : 450,
			height : 450,
			border : true,
            modal: true,
            view: gridview,
			items : [
                {
                    xtype: 'smartpanicform',
                    caller: view,
                    cuenta: cuenta
                }
            ]
		});
		win.show();
    },
    
    
    tieneUsuariosDisponibles: function (view, callback) {
        var fieldToolBar = view.down('#toolbardisplayfield');
       
        if(view.QtyUsers != 0) {
        
            var store =Ext.create('Ext.data.Store',{
                model: this.getSmartTrackSearchModelModel(),
                remoteFilter:true,
                pageSize: 1000, // estaba tirando 25 max
                filters: [{
                    property: 'cue_ncuenta:NOT',
                    value: ''
                }]
            })
            
            
            store.load(function () {
            var asignados = this.getTotalCount();
               if(asignados == view.QtyUsers) {
                   
                    // actualizo cantidades en la barra
                    {
                        var t = view.down('toolbar');
                        fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                    }
                    
                    var btnNuevo = view.down('[action="nuevo"]');
                    if (btnNuevo){
                        btnNuevo.setDisabled(true);
                    }
                    
                    var btnAsignar = view.down('button[action=asignarcuenta]');
                    if (btnAsignar){
                        btnAsignar.setDisabled(true);
                    }
                    
                    var msg = 'Se supero la cantidad de asignaciones disponibles. ('+asignados+'\/'+view.QtyUsers+')';
                    Ext.Msg.alert('Atención', msg, Ext.emptyFn);
 
               } else if (asignados > view.QtyUsers) {
                    // actualizo cantidades en la barra
                    fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                    
                    view.down('#queryType').setDisabled(true);
                    view.down('#query').setDisabled(true);
                    view.down('[action="search"]').setDisabled(true);
                    view.down('[action="getall"]').setDisabled(true);
                   
                    view.down('[action="groupAlarmas"]').setDisabled(true);
                    
                    view.down('[action="configurar"]').setDisabled(true);
                    
                    view.down('[action="asignarcuenta"]').setDisabled(true);
                    
                    Ext.Msg.alert('Atención', 'Se supero la cantidad de asignaciones disponibles. Por favor comuniquese con el administrador.('+asignados+'/'+view.QtyUsers+')', Ext.emptyFn);                
                    
               } else {
                
                    // actualizo cantidades en la barra
                     fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                    
                   view.down('[action="asignarcuenta"]').setDisabled(false);
                   if(callback) {
                       callback();
                   }
               }
                
            });
        
        }else {
            // actualizo cantidades en la barra
            var t = view.down('toolbar');    
               
            fieldToolBar.setValue(getLocale('Dispositivos ilimitados'));

            if(callback) {
               callback();
            }
        }
    }
});