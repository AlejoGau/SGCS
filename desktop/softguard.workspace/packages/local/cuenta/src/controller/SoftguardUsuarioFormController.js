Ext.define('Cuenta.controller.SoftguardUsuarioFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
	models : [  ],
	views : [ 'SoftguardUsuarioFormView' ],

	init : function(config) {
		// genero los eventos

		this.control({

			'usuarioformview button[action="save"]' : {
				click : this.saveObject
			},
            'usuarioformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'usuarioformview button[action="passwordChange"]' : {
    			click : this.onPasschangeClick
			},
            'usuarioformview' : {
                beforerender : this.initview,
                fieldvaliditychange : this.onValidityChange,
                passwordchanged : this.onPasswordChanged
			},
            'usuarioformview #solitarcambio' : {
                click : this.onSolicitarCambioClick
            }
		});
	}, // cierro init
    
    
    
     onSolicitarCambioClick: function(button) {
        var view =button.up('usuarioformview');    
        var controller = this;

        if (!view.getForm().isValid()){
            return false;
        }
        

        var RecordModificado = view.getForm().getRecord().copy()        
        view.getForm().updateRecord(RecordModificado);
        
        var RecordOriginal = view.getForm().getRecord().copy()

        var method = 'PUT';
        var altPath= '/Rest/Cuenta/'+view.getForm().getRecord().get('Id')+'/Usuario'
        if (view.getForm().getRecord().get('Id') == 0) {
            method = 'POST'
            var altPath='/Rest/Usuario/'
            
            //limpio el pass cundo es nuevo el registro para que se pueda ver la direferencia
            RecordOriginal.set('usu_cclave','')
            RecordOriginal.set('usu_ntipo','')
            
            
            
        } else {
            RecordOriginal.set('usu_cclave',view.originalPass)
            
        }
        
        delete RecordOriginal.store
        delete RecordOriginal.stores
        
        Ext.Ajax.request({
              url: '/handler/SearchPost?search=SolicitudModificacionesUpdOIns',
              method : 'POST',
              params: {
                    pom_usuariopedido: controller.application.UserData.udw_idKey ,
                    pom_fechapedido: new Date(),
                    pom_idtipoobjeto: view.getForm().getRecord().get('ObjectTypeId'),
                	pom_idobjeto: view.getForm().getRecord().get('Id'),
            		pom_sinmodificar: Ext.encode(RecordOriginal),
            		pom_modificado: Ext.encode(RecordModificado) ,
            		pom_estado: 0,
            		pom_log: {},
            		pom_usuarioultcambio:-1,
                    pom_cueiid: view.record.get('usu_iidcuenta'),
                    pom_metadata:Ext.encode({
                        form: {
                            alias: view.xtype,
                            title: getLocale('Usuario')
                        },
                        //cuando usa models viejos le armo la URL a mano
                        altPath: altPath,
                        method: method
                        
                    })
                },
              scope: this,
              success: function(response){
                var errors = Ext.JSON.decode(response.responseText);
                notify("La solicitud fue realizada")
                
                if (view.getForm().getRecord().get('Id')==0 && view.getForm().getRecord().store) {
                    view.getForm().getRecord().store.remove(view.getForm().getRecord());
                }
              }
        })
        
        view.up('window').close()
    },

	initview : function(view) {
        var myform = view.getForm();
        var record = view.record
        var profile = view.profile;
        var controller = this;
        
        var isControlAcceso = view.isControlAcceso;
        view.down('#isControlAcceso').setValue(view.isControlAcceso);
        
        console.log('SoftguardUsuarioFormController - isControlAcceso: ' + isControlAcceso)
        //var passPlaceHolder = record.get('usu_cclave').length();
        
        if (isControlAcceso == 1){
            if (record.get('usu_ntipo')==0){
                record.set('usu_ntipo',1);
                record.save();
            }
        } else if (record.get('usu_ntipo')==0){
            record.set('usu_ntipo',2);
            record.save();
        }
        
        view.loadRecord(record);

        myform.findField('usu_icodigo').validator = this.codigoValidator;
        
        var rights = view.rights;
        var clave = view.down('#clave');
        var claveTxt = view.down('#claveTxt');

            if (profile > 2 || (rights && rights.claves == true)){
                clave.hide();
                claveTxt.show();
                claveTxt.setValue(record.get('usu_cclave'));
            } else if (!rights) {
                clave.hide();
                claveTxt.show();
                claveTxt.setValue(record.get('usu_cclave'));
            }
            
        
        // los usuarios de smarttrack  no deben ver tipo "BAJO"
        var storeComboTipo = view.down('#tipousuario').getStore()        
        
        
        if(view.hideTipo && storeComboTipo.findRecord('Value',view.hideTipo)) {
            storeComboTipo.remove(storeComboTipo.findRecord('Value',view.hideTipo));
            
            if(this.application._nameModule  == 'VigiControl') {            
                var recordGuardia = storeComboTipo.findRecord('Value',2)
                recordGuardia.set('Name', getLocale('Guardia'))
            }
            
            view.down('#tipousuario').setValue(2)
        }
        
        
        if (view.profile == 4 ){
            view.down('#save').hide();
            view.down('#solitarcambio').show()
            
            view.originalPass = view.record.get('usu_cclave')
        } 
        
        if(view.profile <= 1){
            view.down('#save').hide();
            view.down('#solitarcambio').hide()
            
            view.originalPass = view.record.get('usu_cclave')
        } 
        
        var metadata = null
        if(view.record.get('usu_cmetadata')) {
            metadata = Ext.decode(view.record.get('usu_cmetadata'))
        }
        
        var solicitarimagenlogin = view.down('#solicitarimagenlogin');
        
        if(metadata && metadata.solicitarimagenlogin != null && solicitarimagenlogin) {
            solicitarimagenlogin.setValue(metadata.solicitarimagenlogin)
        }
        var tipoUsuarioSelected = view.down('#tipousuario').getValue();
        view.mystore = Ext.create('Ext.data.Store',{
            // model: this.getT_tiposSearchModelModel(),
            model: 'Tablas'+'.model.t_tiposSearchModel',
            remoteFilter:true,
            filters:[{
                property:'tip_ccodigo',
                value: view.record.get('cue_ctipo')
            }]
        }).load({callback:function (records) {
            if(records.length>0) {
                var record = records[0]
                
                if(isControlAcceso == 1) {
                    view.down('#tipousuario').getStore().removeAll();
                    view.down('#tipousuario').getStore().add(
                        [
                            {Name: '1.' + getLocale('Usuario'), Value: 1},
                            {Name: '2.' + getLocale('Usuario'), Value: 2},
                            {Name: '3.' + getLocale('Usuario'), Value: 3},
                            {Name: '4.' + getLocale('Usuario'), Value: 4},
                            {Name: '5.' + getLocale('Supervisor'), Value: 5},
                            {Name: '6.' + getLocale('Supervisor'), Value: 6},
                            {Name: '7.' + getLocale('Admin'), Value: 7},
                            {Name: '8.' + getLocale('Super Usuario'), Value: 8},
                    ]);
                    view.down('#tipousuario').setValue(tipoUsuarioSelected);
                } else if(records.length>0) {
                    var record = records[0]
                    
                    if(record.get('tip_nTipo') == 7 && controller.application._nameModule == 'SgAppAccessControl') {
                        /**
                         * SoftguardUsuarioTipoStore, elimine los creados por Access Control, ya que se agregan a demanda por modulo.
                        */
                        view.down('#tipousuario').getStore().removeAll();
                        //agrego item al combo
                        view.down('#tipousuario').getStore().add(
                            [
                                {Name: getLocale('Acceso Administrador'),    Value: 5},
                                {Name: getLocale('Acceso Propietario'),    Value: 6},
                                {Name: getLocale('Acceso Visita'),    Value: 7},
                                {Name: getLocale('Acceso Proveedor'),    Value: 8}
                            ])
                        } 
                    }
            }
        }});


        //Oculto el campo para cuentas que son control de acceso
        if (isControlAcceso == 1) {
            view.down('#usu_icodigo').hide();
        }

        //Seteo la view pedida en la tarea DS-609
        if (isControlAcceso == 2 ) {
            //Seteo el valor minimo en 2 y se lo asigno 
            view.down('#usu_icodigo').minValue = 2
            if(record.get('Id')==0)
                view.down('#usu_icodigo').setValue(2);
            view.down('#claveCont').hide();
            view.down('#tipousuario').getStore().removeAll();
            view.down('#tipousuario').getStore().add([
                    {Name: getLocale('Normal'), Value: 1},
                    {Name: getLocale('Visita'), Value: 2},
            ]);
            view.down('#tipousuario').setValue(tipoUsuarioSelected);
            view.down('#claveCont').hide();
            view.down('#idExt').fieldLabel = "Nro. de Tarjeta"
        }

        //Seteo la view pedida en la tarea DS-656
        if (isControlAcceso == 3 ) {
            //Seteo el valor minimo en 2 y se lo asigno 
            //view.down('#usu_icodigo').minValue = 3
            if(record.get('Id')==0)
                view.down('#usu_icodigo').setValue(2);
            view.down('#claveCont').hide();
            view.down('#tipousuario').getStore().removeAll();
            view.down('#tipousuario').getStore().add([
                    {Name: getLocale('Administrador'), Value: 1},
                    {Name: getLocale('Normal'), Value: 1},
                    {Name: ('Tarjeta en lista negra'), Value: 8},
                     {Name: getLocale('Patrulla'), Value: 2},
                     {Name: ('Invitado'), Value: 8},
                     {Name: ('VIP'), Value: 8},
                     {Name: getLocale('Discapacitado'), Value: 2}
            ]);
            view.down('#tipousuario').setValue(tipoUsuarioSelected);
            view.down('#claveCont').hide();
            view.down('#idExt').fieldLabel = "Nro. de Tarjeta"
        }
     


	},
    
    codigoValidator: function(value){
        var view = this.up('usuarioformview');
        var record = view.record;
        var store = view.storeSearch;
        //var form = view.getForm();
        //var field = form.findField('usu_icodigo');
        var repeated = store.findExact('usu_icodigo', +value);
        
        if (repeated != -1 && record.get('Id') != store.getAt(repeated).get('Id')){
            return 'El código de usuario ya existe';
        } else {
            return true;
        }
    },
    
    onValidityChange: function(ancestor, labelable, isvalid, options){
        var button = ancestor.down('button[action="save"]');
        if (isvalid == "false"){
            button.disable();
        } else{
            button.enable();
        }
    },

	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('usuarioformview');
        var record = view.record;
        var win =  button.up('window');
        
        if (myform.isValid()){
            
            myform.updateRecord(record);
            
            var codigo = (record.get('usu_icodigo')!=900)?record.get('usu_icodigo'):0;
            var usu_iidcuenta = record.get('usu_iidcuenta');

            record.set('usu_iid', codigo);
            record.set('usu_iidcuenta', usu_iidcuenta);
            record.set('usu_cmetadata',Ext.encode({
               solicitarimagenlogin: view.down('#solicitarimagenlogin')?view.down('#solicitarimagenlogin').getValue():0
            }))
            record.set('usu_cidentificacion',record.get('usu_icodigo'));
            
            record.save({callback:function () {
                notify('Se guardo con exito')
                if(view.caller) {
                    view.caller.fireEvent('refresh',view.caller);
                }
                win.close();
            }})
            
            
        }   

	},

	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('usuarioformview');
		mymodel.destroy({
					scope : this.application
				});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close()
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        var view = button.up('usuarioformview');
        var myform = view.getForm();
		var record = view.record;
        
        if (record.get('Id')==0 && record.store) {
            record.store.remove(record);
        }
        
        myWin.close();
    },
    
    onPasschangeClick: function(button, event, options){
        var view = button.up('usuarioformview');
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
        	title : getLocale('Cambio de clave'),
			closeAction : 'hide',
            caller: view,
            fieldName: 'usu_cclave',
            modal: true,
			width : 300,
			height : 150,
			border : false,
			items : {
                xtype: 'passwordformview',
                caller:view,
                
    		}
		});
		win.show();
    },
    onPasswordChanged : function(value, win, view) {
        var fieldname = win.fieldName;
        var view = win.caller;
        
        view.record.set(fieldname, value);
       // view.getForm().findField(fieldname).setValue(value);
        var clave = view.down('#clave');
        var claveTxt = view.down('#claveTxt');
        clave.setValue(value)
        claveTxt.setValue(value)
    }
});