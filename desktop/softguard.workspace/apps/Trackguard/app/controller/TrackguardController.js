Ext.define('Trackguard.controller.TrackguardController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TrackguardModuleStore', 'TrackGuardSecurityModuleStore' ],
    models : [ 'VehicleModel', 'VehicleBrandModel', 'VehicleTypeModel', 'VehicleModelModel', 'SoftguardCuentaModel', 'KeyModulesModel', 'SecurityModulesModel', 'VehicleGpsModel', 'CantidadCuentaGroupByTipoSearchModel' ],
	views : [ 'TrackguardToolbar', 'MetadataViewport',  'ExtUxNotification' ],

	init : function(config) {
		// genero los eventos
		this.control({
            'viewport' : {
                afterrender : this.initview
			},
            'viewport #newevent' : {
            	click : this.onNewEventClick
			}
		});
	}, // cierro init
    
    
    onNewEventClick: function (btn) {
       // var view = btn.up('webremotonorthview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Generar evento',
            width :  600,
            height: 400,
            border: true,
            modal: true,
            autoShow: true,
            items: [                    
                {
                    xtype:'generareventoformview'
                }                    
            ]
        });
    },
    
    initview: function(view){
        var controller = this;
        this.application._nameModule = 'TrackGuard';
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);
        
        // DEDALO 15/1/2020 sacao vehiclestore del controller ya que se usa desde el mapa o la grilla y no hace falta aca
        /*
        var vehiclesStore = Ext.create('Ext.data.Store',{
            pageSize: 1000,
            model: this.getVehicleGpsModelModel()
        });
        
        vehiclesStore.load({callback:function (records,data) {
            view.QtyAccounts = KeyCustomerInfo.QtyAccounts;
            // si la cantidad de usuarios es mayor a 0 le aplico el calculo de limite
            // sino dejo liberado
            if (view.QtyAccounts > 0) {
                controller.tieneCuentasDisponibles(view, false, data.resultSet.total);                            
            } else {
                view.cuentasDisponibles=true;
                view.cuentaLibres = true;
                view.down('#cuentaCreate').setDisabled(false);
            }

        }})
        */

        

        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordTrackguard = storeSecurity.findRecord('KeyReference', 'TrackGuard')
        var administratorModule = storeSecurity.findRecord('KeyReference','Administrator');

        if(isNaN(recordTrackguard.id)){
            recordTrackguard.id = 0;
            recordTrackguard.data.Id = 0;
        }
        if(isNaN(administratorModule.id)){
            administratorModule.id = 0;
            administratorModule.data.Id = 0;
        }

        if(recordTrackguard && recordTrackguard.get('Available') == true) {  
            var json = recordTrackguard.get('_Security');

            if(json){
                if(json.rights.GenerarEventos && json.rights.GenerarEventos == true) {
                    //view.down('#newevent').show();
                    view.down('#newevent').setDisabled(false);
                }

                if(json.rights.crearMantenimiento && json.rights.crearMantenimiento == true || administratorModule.get('Available')) {
                    view.down('#crearMantenimiento').show();
                }
            }
        }

        //------------para fijar perfiles de seguridad según AdministratorSearch-------------
        ///-----https://basecamp.com/2249105/projects/14758734/todos/445523325

        var masterModule = storeSecurity.findRecord('KeyReference','MasterWebDealer');
        
        var url = '/Rest/Security/Modules/'+recordTrackguard.get('ModuleId')+'/Security';
        var profile = 2;    
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function(resp,operation) {
            var json = resp.responseText?JSON.parse(resp.responseText):null;
            if (json && json.modules && json.modules.length>0){
                var modules = json.modules;
                Ext.Array.each(modules,function(module){
                    if(module.view == 'poigridview'){
                        console.log('Module: '+module);
                        profile = module.profile;
                    }
                        
                });
            } 
            if (profile ==0){
                view.down('#poi').hide();
                view.down('#poinorth').hide();
            }
            
            }
        });

       // openObjectList();
    //},


    //openObjectList: function(){
        this.application._idModule = 7;
        var myPanel = Ext.getCmp('center');
        
        var flotaTab = Ext.widget('flotagpsview',{
            title: 'Mapa',
            closable: false
        });
        
        myPanel.add(flotaTab);
        myPanel.setActiveTab(flotaTab);

        var newTab = Ext.widget('vehiclegridview',{
            title: 'Dispositivos Móviles',
            noRefresh: false,
            closable: false
        });
        
        myPanel.add(newTab);

        var newTab2 = Ext.widget('cuentagridview',{
            title: 'Dispositivos móviles sin asignar',//'Cuentas Móviles',
            closable: false,            
            //isAdmin: isAdmin,
            filterTipo: '1,2,3',
            createTipo: 1,
            sinVehiculo: true,
            itemDbClickView: 'dmnewcuentaview',
            columnHide: '1',
            partitionHide: true,
            falloTSTHide: true,
            itemDbClickViewType: 'win',
            cuentaCreateHide:true,
            cambioSituacionShow: true,
            security: {
                modules:[
                    {
                        view: 'estadoview',
                        profile: 3
                    }
                ]
            }
        });
        myPanel.add(newTab2);

        var tabViajes = Ext.widget('tripgridview',{
            title:'Viajes'
        });

        myPanel.add(tabViajes);
        
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        modules.load({callback: function(){
            //var administratorModule = modules.findRecord('KeyReference','Administrator');
            var webremoto = modules.findRecord('KeyReference','WebRemoto');
            if(webremoto && webremoto.get('Available')) {              
                myPanel.add(Ext.create('Ext.ux.IFrame', {
                    title : 'Eventos',
                	border : false,
                	src : '/a/webremoto?CondicionCuenta=[1]&HideGenerarEvento=true',
                	closable : false,
                    autoDestroy: true
                }) );
            }       
        }})
	},
    
    notify: function(text){
        Ext.create('widget.uxNotification', {
    		corner: 'br',
			manager: Ext.getCmp('viewport'),
			cls: 'ux-notification-light',
			iconCls: 'ux-notification-icon-information',
			closable: false,
			title: '',
			html: text,
			slideInDelay: 800,
			slideDownDelay: 1500,
			autoDestroyDelay: 4000,
			slideInAnimation: 'elasticIn',
			slideDownAnimation: 'elasticIn'
		}).show();
    },

	openObjectById : function(objectId) {
        var viewport = Ext.getCmp('viewport');
		record = this.getVehicleModelModel();
        
        var north = Ext.getCmp('north');
        north.hide();
        var south = Ext.getCmp('south');
        south.hide();
        
        if (objectId == 0) {
            var now = new Date();
			var myobject = record.create({
						Name : 'Nuevo vehículo',
                        OwnerTypeId: 3001,
                        Year: now.getFullYear()
					});
            
			myobject.save({
						scope : this,
						callback : function(record, operation) {
							this.setRecord(record);
						}
					});
		}
        else {
		    record.load(objectId, {
					callback : function(record,operation) {
                        if (operation.success){
						    this.setCuenta(record);
                        }
					},
					scope : this
				});
        }
        
        // cargo la lista de modulos
        var view = Ext.widget('moduletreeview', {
            title: 'Datos',
    		store : 'TrackguardModuleStore'
		});
		var west = viewport.down('#west');

        if (west.collapsed){west.toggleCollapse();}
        west.add(view);
        west.setTitle(getLocale('Dispositivo Móvil'));
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            dock: 'top',
            items: [
                {
                    text : 'Eliminar',
                    iconCls: 'icon-carDelete',
                    handler: this.onDeleteClick
                },
                {
                    text : 'Actualizar',
                    iconCls: 'x-tbar-loading',
                    handler: function(){window.location.reload()}
                }
            ]
        });
        
        west.addDocked(toolbar);
	},
    
    setRecord: function(record, cuenta){
        var text = 'Datos del dispositivo';
        
        var viewport =  Ext.getCmp('viewport');
        viewport.record = record;
        viewport.cuenta = cuenta;
		// Lo agregamos al panel
		var myPanel = viewport.down('tabpanel');
        

		// si el modulo es una view
		if (record.get('view') != '') {
			var newTab = Ext.widget('vehicleformview',{
                record: record, 
                tabConfig: {translate: false},
                cuenta: cuenta,
                title:  'Dispositivo Móvil',
                closable: false
    		});
		} // cierro if
		// agrego la paleta creada
		myPanel.add(newTab);
		myPanel.setActiveTab(newTab);

        
    },
    
    onDeleteClick: function(button, event){
        var record = button.up('viewport').record;
        
        Ext.Msg.buttonText.yes = 'Sí';
        Ext.Msg.show({
            buttons: Ext.Msg.YESNO,
            titel: 'Eliminar',
            msg: 'Será borrado el dispositivo móvil ¿desea continuar?',
            icon: Ext.Msg.WARNING,
            fn: function(respuesta){
                if (respuesta == 'yes'){
                    record.destroy({callback: function(record, operation){
                        if (operation.success){
                            var viewport = parent.Ext.getCmp('viewport')
                            var center = viewport.down('#center');
                            center.getActiveTab().close();
                            var paging = center.down('flotagridview').down('pagingtoolbar');
                    
                            paging.moveFirst();
                            paging.doRefresh();
            
                        }
                    }});
                }
            }
        });
    },
    
    setCuenta: function(vehicle){
        var viewport =  Ext.getCmp('viewport');
        var cuenta = this.getSoftguardCuentaModelModel();
        
        // si el vehiculo tiene cuenta la cargo
        var cuentaId = vehicle.get('OwnerId');
        
        if (cuentaId){
            cuenta.load(cuentaId, {
    			callback : function(record,operation) {
                    if (operation.success){
					    viewport.cuenta = record;
                        this.setRecord(vehicle, record);
                    }else{
                        console.log('no se pudo cargar la cuenta');
                    }
				},
				scope : this
			});
        } else {// si no la creo
            viewport.cuenta = cuenta.create({
                cue_dfechaalta: new Date(),
                cue_dservicio: new Date()
            });
            this.setRecord(vehicle, viewport.cuenta);
        }
    }
});