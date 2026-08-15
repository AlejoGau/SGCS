Ext.define('Trackguard.controller.VehicleFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'ZonasHorariasStore', 'VehicleBrandStore', 'VehicleModelStore', 'VehicleTipoSearchStore', 'SiNoStore' ],
	models : [ 'TimeZoneModel', 'PanelModel', 'PanelSearchModel', 't_receptorprocolmodelSearchModel', 'TablasPanelesSearchModel', 'VehicleModel', 'VehicleBrandSearchModel', 'VehicleModelModel', 'VehicleModelSearchModel', 'CuentaSearchModel', 'CuentaTipoSearchModel', 'SoftguardCuentaModel', 'SecurityModulesModel', 'ComandosDispositivoSearchModel', 'ComandosDispositivoModel' ],
	views : [ 'VehicleFormView' ],

	init : function(config) {
		this.control({
					'vehicleformview' : {
						afterrender : this.initview,
                        cuentachanged: this.onCuentaChanged,
                        passwordchanged: this.onPasswordChanged

					},
    				'vehicleformview #brandCombo' : {
						select : this.onBrandSelect,
                        beforerender: this.initBrandCombo
					},
					'vehicleformview button[action="save"]' : {
						click : this.onSaveClick
					},

                    'vehicleformview button[action="passwordChange"]' : {
						click : this.onPasschangeClick
					},
                    
					'vehicleformview button[action="delete"]' : {
						click : this.onDeleteClick
					},
    				'vehicleformview button[action="cambiarCuenta"]' : {
						click : this.onCambiarClick
					},
        			'vehicleformview button[action="photo"]' : {
						click : this.onPhotoClick
					},
        			'vehicleformview button[action="guardarTipo"]' : {
						click : this.onGuardarCuentaClick
					},
                    'vehicleformview #comboequipos':{
                        change: this.onPan_ireceptorChange,
                        select: this.onPan_ireceptorSelect
                    }
                });
	}, // cierro init

    onPasschangeClick: function(button, event, options ) {
        var view = button.up( 'vehicleformview' );
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: 'Cambio de clave',
            closeAction: 'hide',
            caller: view,
            fieldName: 'cue_cclave',
            fieldId: 'cue_cclave',
            modal: true,
            width: 300,
            height: 150,
            border: false,
            items: { xtype: 'passwordformview' }
        });
        win.show();
    },

    onPasswordChanged: function(value, win ) {
        var fieldname = win.fieldName;
        var fieldId = win.fieldId;

        var view = win.caller;
        view.record.set( fieldname, value );

        if( fieldId )
            view.down( '#' + fieldId ).setValue( value );
        if( view.down( '#' + fieldId + 'Txt' ) ) {
            view.down( '#' + fieldId + 'Txt' ).setValue( value )
        }
        else
            view.getForm().findField( fieldname ).setValue( value );
    },
    
    onPan_ireceptorSelect: function(combo, records, eOpts){
        var view = combo.up('vehicleformview');
        var comboModelo = view.down('#pan_rpmidkey');
        if (records.length>0){
            var record = records[0];
            comboModelo.store.filter([{
                property:'rpm_ireceptor',
                id: 'rpm_ireceptor',
                value:record.get('Id')
            },{
                property:'hasCommands',
                id: 'hasCommands',
                value:1
            }]);
        }

    },
    onPan_ireceptorChange: function(combo, newValue, oldValue){
        if (!(typeof newValue==='number' && (newValue%1)===0))
            return;
        var view = combo.up('vehicleformview');
        var comboModelo = view.down('#pan_rpmidkey');
        
        comboModelo.store.filter([{
            property:'rpm_ireceptor',
            id: 'rpm_ireceptor',
            value:newValue
        },{
            property:'hasCommands',
            id: 'hasCommands',
            value:1
        }]);
    },


    initBrandCombo: function(combo){
        var store =Ext.create('Ext.data.Store',{
            model: this.getVehicleBrandSearchModelModel(),
            remoteSort: false,
            remoteFilter: false,
            pageSize: 1000
        });
        
        combo.bindStore(store);
        store.load();
    },
    
	initview : function(view) {
        var controller = this;

        // cargo el record en los formularios
        var record;
        var form = view.getForm();

        if (view.record){
            record = view.record
        }else{
            record = view.searchRecord
        }

        if (record.get('Year') == 0){
            record.set('Year',Ext.Date.format(new Date(), 'Y'));
        }
        
        if (record.get('MaxSpeed')== 0){
            // lo sacamos por pedido de fer 13/9/2018
            //record.set('MaxSpeed', 120);
        }
        
        view.loadRecord(record);
        
         var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
         
         // modificar el id del modulo por su nombre dinámico y pasar a application, getModuleSecurity() como un global sería lo ideal
         var url = '/Rest/Security/Modules/7/Security';
         Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
            var json = resp.responseText?JSON.parse(resp.responseText):null;
            if (json){
                var modules = json.modules;                
                view.rights = json.rights;
                view.security = json;
                  if (view.security){
                    var rights = view.rights;
                    // me fijo el profile de cuenta y veo que hago con el boton de guarda
                    Ext.Array.each(view.security.modules, function(module){
                        if (module.view == 'vehicleformview'){
                            if (module.profile < 2){
                                view.down('#save').hide();
                                view.down('#cuentaasociada').setDisabled(true);
                               
                                view.down('#iconPhoto').hide();
                                view.disableForm();
                            }
                            
                            if (module.profile < 3){
                                 view.down('#delete').hide();
                            }                  
                        }
                    })
                  } else {
                        var masterModule = modules.findRecord('KeyReference','MasterWebDealer');
                        var administratorModule = modules.findRecord('KeyReference','Administrator');
                        if (masterModule.get('Available') || administratorModule.get('Available')){
                            console.log('admin')
                            form.findField('_nombre').setDisabled(false);
                            form.findField('_imei').setDisabled(false);
                        } 
                  }
            }
          }
        });
        
        view.down('#brandCombo').getStore().load({
            callback: function(){
                 view.down('#brandCombo').setValue(record.get('VehicleBrand'));
                 if (record.get('VehicleBrand')==0){view.down('#brandCombo').setValue(null)}
            }
        });
        
        if (record.get('VehicleBrand')){
            view.down('#modelCombo').getStore().load({
                params: {query:view.record.get('VehicleBrand')},
                callback: function(){
                     view.down('#modelCombo').setValue(view.record.get('VehicleModel'));
                     if (record.get('VehicleModel')==0){view.down('#modelCombo').setValue(null)}
                }
            });
        }
        
        var tipostore =Ext.create('Ext.data.Store',{
            model: this.getCuentaTipoSearchModelModel() ,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'tip_nTipo:ININT',
                    value: '1,2,3'
                }
            ]
        })    
        view.down('#tipoCombo').bindStore(tipostore);
        tipostore.load({
            params: {tip_nCondicion:1}
        })

        var cuentastore =Ext.create('Ext.data.Store',{
            model: this.getCuentaSearchModelModel(),
            remoteSort: true,
            remoteFilter: true
        })
        /********************************* */

        //---------para clonar el contenido de un store -----------
        var clonedStore = Ext.create('Ext.data.Store', {
            fields: ['pan_ccodigo', 'pan_cdescripcion'
                ,'pan_mobservacion','pan_nesgprs','pan_iModelo','pam_idKey'
                ,'pam_cMarca','pam_cModelo','pam_cMetadata']
        });        

        //-------------------------------------------------------


        var panelStore = Ext.create('Ext.data.Store',{
            model: this.getTablasPanelesSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters:[
                {
                    property: 'o.[pan_nEsGPRS]',
                    value: '3'
                }
            ]
        });
        
        panelStore.load({
            callback: function(records, operation, success){
                    clonedStore.loadData(panelStore.data.items);
                    view.down('#comboEquipoGps').bindStore(clonedStore);
            }
        });
        

        /********************************* */
        
        // 28-01 JUAN, agrego remoteFilter al ComandosDispositivoSearch dado que sino, no filtraba por la cuenta que deseabamos manejar y guardaba siempre en el EquipoDispositivoMovil 87 y se lo cargaba a todos por igual.
        
        if (view.record.get('OwnerId')){
            // cargo el equipo
            view.equipoStore = Ext.create('Ext.data.Store',{
                model: this.getComandosDispositivoSearchModelModel(),
                remoteFilter: false,
                sorters: [{
                    property: 'rec_cdescripcion', direction:'ASC'
                }],
                filters: {
                    property: 'idCuenta',
                    value: view.record.get('OwnerId')
                }
            })
            
            view.equipoStore.load({callback:function(records, operation, success){
                panelStore.remoteFilter = false;
                if (success && records.length > 0){
                    view.equipo = records[0];
                    view.down('#comboequipos').setValue(view.equipo.get('idEquipo'));
                    
                } else{
                    var model = controller.getComandosDispositivoModelModel();
                    view.equipo = Ext.create(model,{
                        idCuenta: view.record.get('OwnerId')
                    });
                }
            }})
            
            
            view.down('#conductorCombo').getStore().load({
                ObjectId: view.record.get('OwnerId'),
                callback: function(){
                     view.down('#conductorCombo').setValue(view.record.get('DriverId'));
                     if (record.get('DriverId')==0){view.down('#conductorCombo').setValue(null)}
                }
            });
            
            // solo cargar si no esta view.cuenta?
            
            var vehicle = view.record;
            cuentastore.load({params:{cuentaId:view.record.get('OwnerId')}, 
                callback: function(records, operation, success){
                if (success){
                    var record = records[0];
                    view.recordCuenta = view.cuenta = records[0];
                    
                    if (record){
                        form.findField('cue_clinea').setValue(record.get('cue_clinea'));
                        form.findField('cue_ncuenta').setValue(record.get('cue_ncuenta').trim());
                        form.findField('cue_cnombre').setValue(record.get('cue_cnombre'));
                        form.findField('cue_iZonaHoraria').setValue(record.get('cue_iZonaHoraria'));
                        form.findField('_tipo').setValue(record.get('cue_ctipo'));
                        form.findField('Situacion').setValue(record.get('Situacion'));
                        form.findField('cue_cclave').setValue(record.get('cue_cclave'));
                        
                        form.findField('_imei').setValue(record.get('cue_cIMEI'));
                        
                        //form.findField('sta_dfechautimaalarma').setValue(record.get('sta_dfechautimaalarma').replace('T',' '));
                        form.findField('sta_dfechautimaalarma').setValue(record.get('sta_dfechautimaalarma'));
                        //view.down('#tipoCombo').setValue(record.get('tip_ccodigo'));
                        form.findField('_cue_nllaveul').setValue(record.get('cue_nllaveul'));
                        
                        form.findField('cue_ccalle').setValue(record.get('cue_ccalle'));
                        form.findField('cue_clocalidad').setValue(record.get('cue_clocalidad'));
                        //form.findField('cue_cprovincia').setValue(record.get('cue_cprovincia'));
                        view.down('#provincias').setValue(record.get('cue_cprovincia'));
                        form.findField('cue_ccodigopostal').setValue(record.get('cue_ccodigopostal'));

                        /*********************************************************
                         *  Daniel O. Medina
                         *  https://basecamp.com/2249105/projects/14758734/todos/429220292
                         *  16/11/2020
                         */
                        
                        form.findField('cue_cobservacion').setValue(record.get('cue_cobservacion'));
                        /************************************************************* */                        
                        
                        vehicle.set('cue_clinea', record.get('cue_clinea'));
                        vehicle.set('cue_cnombre', record.get('cue_cnombre'));
                        vehicle.set('cue_ncuenta', record.get('cue_ncuenta'));
                        vehicle.set('cue_cimei', record.get('cue_cIMEI'));
                        vehicle.set('cue_iZonaHoraria', record.get('cue_iZonaHoraria'));
                        vehicle.set('cue_cprovincia', record.get('cue_cprovincia'));
                        vehicle.set('tip_nTipo', record.get('tip_nTipo'));
                        vehicle.set('cue_iid', record.get('cue_iid'));
                        vehicle.set('Situacion', record.get('Situacion'));


                        if (record.get('cue_dfechaalta')){
                            view.down('#cue_dfechaalta').setValue(Ext.Date.format(new Date(record.get('cue_dfechaalta')), 'd/m/Y'));
                        } else {
                            view.down('#cue_dfechaalta').hide();
                        }
                        
                        switch(record.get('tip_nTipo'))
                        {
                        case 0:
                            var bloque = view.down('#otroFields');
                        break;
                        case 1:
                            var bloque = view.down('#vehicleFields');
                        break;
                        case 2:
                            var bloque = view.down('#personaFields');
                        break;
                        case 3:
                            var bloque = view.down('#mascotaFields');
                        break;
                        default:
                            var bloque = view.down('#otroFields');
                        }
                        bloque.show();
                    }
                }
            }});
        } else {
            form.findField('_nombre').setValue('No hay una cuenta asignada');
        }

        // modelos de receptores
        var comboModelos = view.down('#pan_rpmidkey');
        var storeModelos =Ext.create('Ext.data.Store',{
            model: controller.getT_receptorprocolmodelSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            sorters: [{
                property: 'rpm_cmodelo', direction:'ASC'
            }]
            
        })
        
        comboModelos.bindStore(storeModelos);          
        storeModelos.load({callback: function(){
            var tipostore =Ext.create('Ext.data.Store',{
                model: controller.getPanelSearchModelModel() ,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property: 'pan_iidcuenta',
                        value: view.record.get('OwnerId')
                    }
                ]
            })    
            tipostore.load({callback:function (records) {
                if(records.length>0) {
                    var record = records[0];
                    
                    view.down('#pan_rpmidkey').setValue(record.get('pan_rpmidkey'));
                    view.down('#comboEquipoGps').setValue(record.get('pan_ccodigo'));
                    
                }
            }})
        }})  
	},
    
    onCuentaChanged: function(record, view){
        var form = view.getForm();
        var viewport =  Ext.getCmp('viewport');
        form.findField('cue_clinea').setValue(record.get('cue_clinea'));
        form.findField('cue_ncuenta').setValue(record.get('cue_ncuenta').trim());
        form.findField('cue_cnombre').setValue(record.get('cue_cnombre'));
        form.findField('_tipo').setValue(record.get('cue_ctipo'));
        form.findField('Situacion').setValue(record.get('Situacion'));
        form.findField('sta_dfechautimaalarma').setValue(record.get('sta_dfechautimaalarma'));
        form.findField('cue_iZonaHoraria').setValue(record.get('cue_iZonaHoraria'));
        
        view.record.set('OwnerId',record.get('cue_iid'));
        form.findField('OwnerId').setValue(record.get('cue_iid'));
        
        view.cuenta = record;
        viewport.cuenta = record;
    },
    
     onShowVehicleGpsClick: function(button, event, options){
        var myPanel = Ext.getCmp('tab-panel');
        var record = button.up('vehicleformview').record;
        
        // me fijo si el tab existe, si es nuevo lo creo
        // if (!myPanel.getComponent(record.get('text'))) {
		var mytab = myPanel.down('[title="' + record.get('Name')+'"]');
		if (!mytab) {
			// si el modulo es una view
			if (record.get('view') != '') {
				var newTab = Ext.widget('vehiclegpsview',{
                    record: record,
                    translate: false
    			});
				newTab.title = 'Tracking Satelital';
				newTab.closable = true;
				newTab.record = record;

			} // cierro if
			// agrego la paleta creada
			myPanel.add(newTab);
			myPanel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
			myPanel.setActiveTab(mytab);
		}
        
    },
    
    onAddClick : function(button, event, options) {
		var controller = this.getController('Trackguard'+'Controller');
        controller.openObjectById(0);
	},
    
    onBrandSelect: function(combo, records, options){
        var view = combo.up('vehicleformview');
        var comboModel = view.down('#modelCombo');
        comboModel.getStore().load({
            params: {query:records[0].get('Id')}
        });
        comboModel.clearValue();
    },

	onSaveClick : function(button, event, options) {
		// Guardo los cambios a todos los FORM
        var view =button.up('vehicleformview');
        // obtengo el registro
        var mymodel = view.record;
        var controller = this;
		
        view.getForm().updateRecord(mymodel);
        
        
        var oldNumeroCuenta = Ext.String.leftPad(view.record.get('cue_ncuenta').trim(),4,'0');
        var newNumeroCuenta = Ext.String.leftPad(view.getForm().findField('cue_ncuenta').getValue().trim(),4,'0');
        Ext.Ajax.request({
          url: '/rest/Search/CuentaByDealerValidate',
          params: { linea: view.getForm().findField('cue_clinea').getValue(), cuenta: newNumeroCuenta},
          method: 'GET',
          scope: this,
          success: function(response){
              var errors = Ext.JSON.decode(response.responseText);
              if(oldNumeroCuenta != newNumeroCuenta) {
                    if (errors.total){
                        var error = errors.rows[0];
                        numeroCuentaField.markInvalid(error.Descripcion + ' cuenta: ' + newNumeroCuenta);
                        numeroCuentaField.textValid = false;
                        return false;
                        
                    } else {
                        numeroCuentaField.clearInvalid();
                        numeroCuentaField.textValid = true;
                    }
                }
            }
        })
        
        mymodel.set('Name',mymodel.get('Domain'));
        if (mymodel.get('PersonaFechaNacimiento') == null){
            mymodel.set('PersonaFechaNacimiento', new Date(1900,1,1))
        }
        
        if (mymodel.get('MascotaFechaNacimiento') == null){
            mymodel.set('MascotaFechaNacimiento', new Date(1900,1,1))
        }
        /*
        if (mymodel.get('OdometerDate') == null){
            mymodel.set('OdometerDate',new Date(1900,1,1)); 
        }
        */
        
		mymodel.save({
			scope : this,
			callback : function(record, operation) {
                if (operation.success){
                    notify('Los datos del movil se guardaron con éxito');  
                }
                else{
                    console.log('error:',operation);
                }
			}
		});
        
        var cuentaId = mymodel.get('cue_iid');
        var cuentaModel = controller.getSoftguardCuentaModelModel();
        var mCuenta = this.getSoftguardCuentaModelModel();
        
        // la fecha en el search esta mal... se usaba proxy y cambio a usar record.
        mCuenta.load(view.cuenta.get('Id'),{callback: function(rCuenta){
            console.log(rCuenta)
            rCuenta.set('cue_cclave',view.getForm().findField('cue_cclave').getValue());
            rCuenta.set('cue_nllaveul',view.getForm().findField('_cue_nllaveul').getValue());
            rCuenta.set('cue_clinea',view.getForm().findField('cue_clinea').getValue());
            rCuenta.set('cue_ncuenta',view.getForm().findField('cue_ncuenta').getValue());
            rCuenta.set('cue_cnombre',view.getForm().findField('cue_cnombre').getValue());
            rCuenta.set('cue_iZonaHoraria',view.getForm().findField('cue_iZonaHoraria').getValue());
            rCuenta.set('cue_cIMEI',view.getForm().findField('_imei').getValue());
            rCuenta.set('cue_ccalle',view.getForm().findField('cue_ccalle').getValue());
            rCuenta.set('cue_clocalidad',view.getForm().findField('cue_clocalidad').getValue());
            rCuenta.set('cue_cprovincia',view.down('#provincias').getValue());
            rCuenta.set('cue_ccodigopostal',view.getForm().findField('cue_ccodigopostal').getValue());
            rCuenta.set('cue_ctipo',view.getForm().findField('_tipo').getValue());
            
            /*********************************************************
             *  Daniel O. Medina
             *  https://basecamp.com/2249105/projects/14758734/todos/429220292
             *  16/11/2020
             */
            rCuenta.set('cue_cobservacion',view.getForm().findField('cue_cobservacion').getValue());
            /********************************************************* */            

            if (rCuenta.get('cue_dfechaalta') == null){
                rCuenta.set('cue_dfechaalta',new Date('1/1/1900'));
            }
            
            if (rCuenta.get('cue_dservicio') == null){
                rCuenta.set('cue_dservicio',new Date('1/1/1900'));
            }else{
                rCuenta.set('cue_dservicio',view.getForm().findField('cue_dservicio').getValue());
            }

            //le guardo un IMEI por si no tiene
            if (rCuenta.get('cue_cIMEI') == null || rCuenta.get('cue_cIMEI') == ''){
                var imei = rCuenta.get('cue_clinea')+'-'+rCuenta.get('cue_ncuenta');
                rCuenta.set('cue_cIMEI',imei)
                view.down('#imei').setValue(imei)
            }
            
            rCuenta.setConfig({
				proxy: controller.getSoftguardCuentaModelModel().getProxy()
			});

            rCuenta.save({
                scope : this,
                callback : function(record, operation) {
            	    notify('Los datos de la cuenta se guardaron con exito.');
                    view.up('tabpanel').up('tabpanel').down('[title="'+getLocale('Dispositivos Móviles')+'"]').getStore().clearFilter();
                    /*if(view.getTabBar().getAt(0)) {
                        view.getTabBar().getAt(0).setTitle(cuenta.get('cue_cnombre')+ '('+cuenta.get('cue_clinea')+')')
                    }*/
                    
                    view.caller.fireEvent('refresh', view.caller)
            	}   
            })

            //guardo el equipo
            view.equipo.set('idEquipo', view.down('#comboequipos').getValue());
            view.equipo.save();

            var tipostore = Ext.create('Ext.data.Store',{
                model: controller.getPanelSearchModelModel() ,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property: 'pan_iidcuenta',
                        value: rCuenta.get('cue_iid')
                    }
                ]
            });
            console.log('panc_codigo a insertar: '+view.down('#comboEquipoGps').getValue());  
              
            tipostore.load({callback:function (records) {
                if(records.length>0) {
                    var record = records[0];
                    
                    record.set('pan_ireceptor',view.down('#comboequipos').getValue());
                    record.set('pan_rpmidkey',view.down('#pan_rpmidkey').getValue()) ;                   
                    record.set('pan_ccodigo',view.down('#comboEquipoGps').getValue());

                    record.setConfig({
                        proxy: controller.getPanelModelModel().getProxy()
                    });
                    record.save();
                }
            }})

        }});
	},

	onDeleteClick : function(button, event, options) {
        var myform = button.up('form').getForm();
        var view = button.up('vehicleformview');
        var record = myform.getRecord();
        
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

                            Ext.Ajax.request({
                                url: '/rest/search/EliminarP_GpsByCuenta',
                                params:{idCuenta:record.get('cue_iid')},
                                method: 'GET',
                                success: function(resp,operation) {
                                    var json = resp.responseText?JSON.parse(resp.responseText):null;
                                    if (json){
                                    //console.log(json)
                                    view.caller.fireEvent('refresh', view.caller)
                                    }
                                }
                            })
                        }
                    }});
                }
            }
        });
	},
    
    onCambiarClick : function(button, event, options) {
        var view =button.up('vehicleformview');
        var win = Ext.create('Ext.Window', {
    		layout: 'fit',
			title : 'Seleccione una Cuenta',
			closeAction : 'hide',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view: view,
			items : [
                {
                    caller: view,
                    xtype: 'cuentahelperview',
                    sinVehiculo: true,
                    selectionEvent: 'cuentachanged'
                    /*filter: [
                        {
                            property : 'tip_nCondicion',
                            value: '1',
                            id: 'tip_nCondicion'
                        }
                    ]*/
                }
            ]
		});
		win.show();
	},
    
    deleteObject: function(record){
        record.destroy();
    },
    
    onPhotoClick : function(button, event, options) {
        var view = button.up('vehicleformview');
        var form = view.getForm();
        var record = view.record;
        form.updateRecord(record);
		var photo = record.get('Photo');
	
		var w = Ext.widget('window', {
            title : 'Foto del dispositivo',
            height : 252,
            width : 360,
            closeAction : 'destroy',
            border : false,
            layout : 'fit',
            record: record,
            tbar:[
                Ext.create('common.view.UploadButton', {
                    id: 'dragupload',
                    text: getLocale('Subir Foto'),
                    plugins: [{
                                    ptype: 'uploadwindow',
                                    title: 'Subir Foto',
                                    width: 350,
                                    height: 150
                                }
                    ],
                    uploader: 
                    {
                        url: '/rest/upload/new?search=softguardMiscFile',
                        uploadpath: '',
                        multi_selection: false,
                        autoStart: true,
                        maxFileSize: '50mb',
                        
                        dropElement: 'vehicleFotoImage',
                        
                        statusQueuedText: getLocale('Listo para subir'),
                        statusUploadingText: getLocale('Subiendo')+' ({0}%)',
                        statusFailedText: '<span style="color: red">Error</span>',
                        statusDoneText: '<span style="color: green">Completo</span>',
                        statusInvalidSizeText: 'Archivo demasiado largo',
                        statusInvalidExtensionText: 'Formato inválido'
                    },
                    listeners: 
                    {
                        filesadded: function(uploader, files)								
                        {
                            return true;
                        },
                        
                        beforeupload: function(uploader, file)								
                        {
                                var url = '/rest/upload/new?search=softguardMiscFile';
                                if (this.path){
                                url = url +'&Path='+me.path
                                }
                                
                                uploader.uploader.settings.url = url
                        },
            
                        fileuploaded: function(uploader, file)								
                        {
                            //console.log('fileuploaded');
                        },
                        
                        uploadcomplete: function(uploader, success, failed)								
                        {
                            var file = success.pop();
                            record.set('Photo',file.name);
                            w.down('image').setSrc('/gallery/'+file.name);
                            record.save({
                            callback : function(record, operation) {
                                if (operation.success){
                                    notify('Los datos se guardaron con éxito');
                                }
                            }
                        });
                        },
                        scope: this
                    }
                }),
                {
                    text: 'eliminar',
                    iconCls: 'icon-delete',
                    handler: function(){
                        var win = this.up('window');
                        var record = win.record;
                        record.set('Photo', '');
                        record.save({
                            callback : function(record, operation) {
                                if (operation.success){
                                    notify('Los datos se guardaron con éxito');
                                }
                                else{
                                    console.log('ERROR:', arguments);
                                }
                            }
                        });
                        win.down('image').setSrc('/gallery/');
                        //win.close();
                    }
                }
            ],
            items : [
                {
                    xtype:'image',
                    id: 'vehicleFotoImage',
                    src : '/gallery/' + photo
                }
            ],
            autoShow: true,
            modal:true
        });
		w.model = form.getRecord();
	},
    
    onGuardarCuentaClick: function(button, event, options){
        var view = button.up('vehicleformview');
        var form = view.getForm();
        var cuenta = this.getSoftguardCuentaModelModel();
        
        cuenta.load(view.record.get('OwnerId'), {
            callback : function(cuenta,operation) {
                if (operation.success){
                    var fecha = new Date();
                    if(!cuenta.get('cue_dfechaalta')) {
                        cuenta.set('cue_dfechaalta',fecha)
                    }
                    if(!cuenta.get('cue_dservicio')) {
                        cuenta.set('cue_dservicio',fecha)
                    }
                    cuenta.set('cue_ctipo', view.down('#tipoCombo').getValue());
                    cuenta.set('cue_cprovincia', view.down('#provincias').getValue());
                    cuenta.set('cue_ccalle', form.findField('cue_ccalle').getValue());
                    cuenta.set('cue_cprovincia', form.findField('cue_cprovincia').getValue());
                    
                    if (view.down('#_nombre'))
                    cuenta.set('cue_cnombre', view.down('#_nombre').getValue());
                    
                    cuenta.save({
                        callback : function(record, operation) {
                            if (operation.success){
                                view.tab.setText(cuenta.get('cue_cnombre')+ '('+cuenta.get('cue_clinea')+')')
                                notify('Los datos se guardaron con éxito');
                            }
                            else{
                                console.log('ERROR:', arguments);
                            }
            			}
                    });
                }
            }
        });
    }
});