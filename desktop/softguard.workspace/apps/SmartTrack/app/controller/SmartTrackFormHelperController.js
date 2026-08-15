Ext.define('SmartTrack.controller.SmartTrackFormHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'UserByCuentaWithRangoModel', 'IconosVigicontrolSearchModel', 'SmartTrackModel', 'SmartTrackSearchModel', 'SoftguardTelefonoModel', 'SoftguardUsuarioModel', 'TelefonoSearchModel', 'SoftguardCuentaModel' ],
	views : [ 'SmartTrackFormView' ],

	init : function(config) {
		// genero los eventos

		this.control({

			'smarttrackform button[action="save"]' : {
				click : this.saveObject
			},
            'smarttrackform button[action="cancel"]' : {
				click : this.onCancelClick
			},
            
            'smarttrackform' : {
                beforerender : this.initview,
                userSelected: this.onUserSelected,  
               
			},
            'smarttrackform #seleccionarusuario' : {
        		click : this.onSeleccionarUsuarioClick
			},
            'smarttrackform #borrarusuario' : {
            	click : this.onBorrarUsuarioClick
			}
		});
	}, // cierro init
    
    
    onBorrarUsuarioClick: function (btn) {
        var view = btn.up('smarttrackform');
        view.down('#idusuario').setValue('');
        view.down('#nombreusuario').update('');
        view.down('#borrarusuario').hide();
    },
    
    
    onSeleccionarUsuarioClick: function (btn) {
        var view = btn.up('smarttrackform')
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
            title : 'Seleccione un usuario',
            closeAction : 'destroy',
            modal: true,
			width : 640,
			height : 480,
			border : false,
			items : [{
                xtype:'usuarioselecterhelperview',
                caller: view,
                record: view.record,
                cuentaWithRango: true,
                filterByTipo: 1,
                cuentaNumero:Ext.util.Format.trim(view.recordSearch.get('cue_ncuenta')),
                dealer:view.recordSearch.get('cue_clinea')
                
			}]
		});
		win.show();
    },
    
    onUserSelected: function (record, view) {
        view.down('#idusuario').setValue(record.get('udw_usuario'));
        view.down('#nombreusuario').update(record.get('_nombre'));
        
        view.down('#borrarusuario').show();
    },

	initview : function(view) {
        var controller = this;
        var _ObjectId = 52;
        var _ObjectTypeName = 'UiApplication';
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        var url = '/'+_restPath+'/' +_ObjectTypeName+'/'+ _ObjectId + '/Metadata';
        view.recordSearch = view.record

        if (view.record){
            var model = this.getSmartTrackModelModel();
            model.load(view.record.get('Id'), {callback : function (recordx) {
                view.loadRecord(recordx);
                 view.record = recordx;
                 if(view.record.get('Config') != '') {
                    var configObj = Ext.decode(view.record.get('Config'));
                    if(configObj) {
                        if(configObj.trackingEnabled != '') {
                            if(configObj.trackingEnabled == 3) {
                                view.down('#disponible').setDisabled(true)
                                view.down('#distance').setDisabled(true)
                                view.down('#time').setDisabled(true)
                            }
                            view.down('#disponible').setValue(configObj.trackingEnabled);
                        }
                        
                        view.down('#distance').setValue(configObj.trackingDistance);
                        view.down('#time').setValue(configObj.trackingTime);

                        // alarmas
                        view.down('#HBcontrol').setValue(configObj.HBcontrol);
                        view.down('#HBtime').setValue(configObj.HBtime);
                        
                        // hombre vivo
                        view.down('#manAliveEnabled').setValue(configObj.manAliveEnabled);
                        view.down('#manAliveTimeSpan').setValue(configObj.manAliveTimeSpan);
                        
                        
                        //Control distancia sin mov.
                        view.down('#controlDistanciaEnabled').setValue(configObj.controlDistanciaEnabled);
                        view.down('#dispercionAdmitida').setValue(configObj.dispercionAdmitida);
                        view.down('#tiempoControlSinMovimiento').setValue(configObj.tiempoControlSinMovimiento);
                        
                        // carrete multimedia
                        view.down('#CarreteHabilitado').setValue(configObj.CarreteHabilitado);
                        view.down('#icono').setValue(configObj.Icono);
                        
                        // servicio tecnico
                        // view.down('#btnRequestService').setValue(configObj.btnRequestService);
                        
                        if(configObj.vigicontrolUserId && configObj.vigicontrolUserId != '' && configObj.vigicontrolUserId!='0' && configObj.vigicontrolUserId!=0) {
                            var usauriosStore = Ext.create('Ext.data.Store', {
                                model : controller.getUserByCuentaWithRangoModelModel(),
                                 remoteFilter: true,
                                autoload: false,
                                filters: [{
                                    property:'udw_usuario',
                                    value: configObj.vigicontrolUserId
                                }]
                                
                            });

                            usauriosStore.load({callback: function(rec){
                                if(rec.length > 0) {
                                    view.down('#idusuario').setValue(rec[0].get('udw_usuario'));     
                                    view.down('#nombreusuario').update(rec[0].get('_nombre'));
                                    view.down('#borrarusuario').show();
                                }
                            }});
                        }
                    } else {                        
                        
                    }
                } else {
                    Ext.Ajax.request({
                      url: url,
                      scope: this,
                      success: function(resp,operation) {
                        var metadata = Ext.decode(resp.responseText);
                        metadata = Ext.decode(metadata.Config);
                        if(metadata.trackingDistance) {
                            view.down('#distance').setValue(metadata.trackingDistance);
                        }
                        if(metadata.trackingTime) {
                            view.down('#time').setValue(metadata.trackingTime);    
                        }
                        if(metadata.trackingEnabled.toString() != '') {
                            if(metadata.trackingEnabled == 3) {
                                view.down('#disponible').setDisabled(true)
                                view.down('#distance').setDisabled(true)
                                view.down('#time').setDisabled(true)
                            }
                            view.down('#disponible').setValue(metadata.trackingEnabled);    
                        }
                        
                        // hombrevivo
                        if(metadata.manAliveEnabled.toString() != '') {
                            view.down('#manAliveEnabled').setValue(metadata.manAliveEnabled);    
                        }
                        if(metadata.manAliveTimeSpan.toString() != '') {
                            view.down('#manAliveTimeSpan').setValue(metadata.manAliveTimeSpan);    
                        }
                        
                        if(metadata.Icono && metadata.Icono.toString() != '') {
                            view.down('#icono').setValue(metadata.Icono);    
                        }
                        
                        // carrete multimedia
                        if(metadata.CarreteHabilitado && metadata.CarreteHabilitado.toString() != '') {
                            view.down('#CarreteHabilitado').setValue(metadata.CarreteHabilitado);    
                        }

                        if(metadata.btnRequestService && metadata.btnRequestService.toString() != '') {
                            view.down('#btnRequestService').setValue(metadata.btnRequestService);    
                        }
                      }
                    });
                }
            }})
            
           if(view.metodo == 'edit') {
                view.down('#imeicampo').show();  
            }
            
        } else {
            Ext.Ajax.request({
                  url: url,
                  scope: this,
                  success: function(resp,operation) {
                    var metadata = Ext.decode(resp.responseText);
                    metadata = Ext.decode(metadata.Config);
                    if(metadata.trackingDistance) {
                        view.down('#distance').setValue(metadata.trackingDistance);
                    }
                    if(metadata.trackingTime) {
                        view.down('#time').setValue(metadata.trackingTime);    
                    }
                    if(metadata.trackingEnabled.toString() != '') {
                        view.down('#disponible').setValue(metadata.trackingEnabled);    
                    }
                    if(metadata.Icono && metadata.Icono.toString() != '') {
                        view.down('#icono').setValue(metadata.Icono);    
                    }
                    // carrete multimedia
                    if(metadata.CarreteHabilitado && metadata.CarreteHabilitado.toString() != '') {
                        view.down('#CarreteHabilitado').setValue(metadata.CarreteHabilitado);    
                    }
                    if(metadata.btnRequestService && metadata.btnRequestService.toString() != '') {
                        view.down('#btnRequestService').setValue(metadata.btnRequestService);    
                    }
                  }
                });
        }
        var helper = view;

	},

	saveObject : function(button, event, options) {
        var view = button.up('smarttrackform');
		var myform = view.getForm();
	    var win =  button.up('window');
        var controller =this;
        
        
        if (myform.isValid()){
            button.disable();
          
           // var selection = view.getSelectionModel().getSelection();
            var model = this.getSmartTrackModelModel();
            var telefonoModel = this.getTelefonoSearchModelModel();
            var t = this;  
    
            if(view.metodo != 'edit') {
                var record = model.create({});
               
            } else {
                var record = view.record;
                
            }
            myform.updateRecord(record);    
            
            var configObj = {
                trackingDistance : view.down('#distance').getValue(),
                trackingTime : view.down('#time').getValue(),
                trackingEnabled : view.down('#disponible').getValue(),
                HBcontrol: view.down('#HBcontrol').getValue(),
                HBtime: view.down('#HBtime').getValue()?view.down('#HBtime').getValue():0,
                manAliveEnabled : view.down('#manAliveEnabled').getValue()?view.down('#manAliveEnabled').getValue():0,
                manAliveTimeSpan : view.down('#manAliveTimeSpan').getValue()?view.down('#manAliveTimeSpan').getValue():0,
                vigicontrolUserId: view.down('#idusuario').getValue(),
                Icono: view.down('#icono').getValue(),
                controlDistanciaEnabled:view.down('#controlDistanciaEnabled').getValue(),
                dispercionAdmitida:view.down('#dispercionAdmitida').getValue(),
                tiempoControlSinMovimiento:view.down('#tiempoControlSinMovimiento').getValue(),
                CarreteHabilitado:view.down('#CarreteHabilitado').getValue(),
                // btnRequestService:view.down('#btnRequestService').getValue()
            };    
            
            record.set('Config',  Ext.encode(configObj));
            
            record.setProxy(model.getProxy());
            
            record.save({callback: function () {

                if(view.metodo != 'edit') {
                    var telefono = record.get('Telefono');
                    var filters = [{
                        property: 'tel_ctelefono',
                        value: telefono
                    },{
                        property: 'tel_iidcuenta',
                        value: view.cuenta.get('Id')
                    }];
        
                    var store =Ext.create('Ext.data.Store',{
                        model: telefonoModel ,
                        pageSize: 50,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: filters
                    })
                    
                    store.load(function () {
                        record.setProxy(model.getProxy());            
                        record.set('CuentaId', view.cuenta.get('cue_iid'));                   
                        record.save({success: function(record){
                            var parametros = 'cuentaid='+view.cuenta.get('cue_iid')+'&SmartTrackId='+record.get('Id');
                            Ext.Ajax.request({
                              url: '/rest/search/smarttrackasignarcuenta',
                              method: 'GET',
                              params: parametros,
                              success: function(resp,operation) {
                                notify('Los datos se guardaron con éxito');
                                var caller = view.caller;
                                caller.fireEvent('smarttrackchange',record,caller);
                                win.close();
                              }
                            });
                    }});
                    });
                
                } else {
                    var caller = view.caller;
                    caller.fireEvent('smarttrackchange',record,caller);
                    win.close();
                }
            }});
        }  
	},
    onCancelClick: function(button, event, options){
        var myWin = button.up('window');
        myWin.close();
    }
});
    
