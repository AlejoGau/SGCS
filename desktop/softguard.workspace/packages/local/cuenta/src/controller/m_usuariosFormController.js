Ext.define('Cuenta.controller.m_usuariosFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SoftguardUsuarioTipoStore' ],
    models : [ 'Cuenta.model.CuentaSearchModel', 'Cuenta.model.m_usuariosSearchModel', 'Cuenta.model.m_usuariosModel' ],
	views : [ 'Cuenta.view.m_usuariosFormView' ],

	init : function(config) {
		// genero los eventos

		this.control({
			'm_usuariosformview button[action="save"]' : {
				click : this.saveObject
			},
            'm_usuariosformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'm_usuariosformview button[action="passwordChange"]' : {
    			click : this.onPasschangeClick
			},
            'm_usuariosformview' : {
                beforerender : this.initview,
                fieldvaliditychange : this.onValidityChange,
                passwordchanged : this.onPasswordChanged
			},
            'm_usuariosformview #solitarcambio' : {
                click : this.onSolicitarCambioClick
            },
            'm_usuariosformview #usu_icodigo' : {
                change : this.onCodigoChangeClick
            } 
		});
	}, // cierro init
    
    onCodigoChangeClick: function (combo) {
        var view = combo.up('m_usuariosformview')
        this.codigoValidator(view)    
    },
    
    onSolicitarCambioClick: function(button) {
        var view =button.up('m_usuariosformview');    
        var controller = this;

        if (!view.getForm().isValid()){
            return false;
        }

        var RecordModificado = view.getForm().getRecord().copy()        
        view.getForm().updateRecord(RecordModificado);
        
        var RecordOriginal = view.getForm().getRecord().copy()
        var method = 'PUT';
        var altPath= '/Rest/Cuenta/'+view.getForm().getRecord().get('Id')+'/Usuario';

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

        view.loadRecord(record);
        
        view.down('#cuenta').setValue(record.get('usu_iidcuenta'))
        view.down('#cuentareadonly').setValue(record.get('_cuenta'))

        if(view.hideCuenta != true) {
            if(record.get('usu_iidcuenta') == '') {
                view.down('#cuenta').show()
            } else {
                view.down('#cuentareadonly').show()

            }  
        }
        
        if(view.hideTipoUsuario) {
            view.down('#tipousuario').hide()
        }

       // myform.findField('usu_icodigo').validator = this.codigoValidator;       
       this.codigoValidator(view)

        var rights = view.rights;
        
        // los usuarios de smarttrack  no deben ver tipo "BAJO"
        //var storeComboTipo = view.down('#tipousuario').getStore()   
        
        var storeComboTipo = Ext.create('Cuenta.store.SoftguardUsuarioTipoStore');
        view.down('#tipousuario').bindStore(storeComboTipo);
        
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
        
        // Load Metadata Information
        var metadata = null
        var solicitarimagenlogin = view.down('#solicitarimagenlogin');
        var brandInput = view.down('#Brand');
        var modelInput = view.down('#Model');
        var domainInput = view.down('#Domain');
        var colourInput = view.down('#Colour');
        var yearInput = view.down('#Year');
        var vehicleTypeInput = view.down('#VehicleType');
        var seguroVtoInput = view.down('#seguroVto');
        var seguroCiaInput = view.down('#seguroCia');
        var vtvInput = view.down('#vtv');
        var blacklistInput = view.down('#blacklist');
        var profileVehicleInput = view.down('#profileVehicleId');

        if ( view.record.get('usu_cmetadata') ) {
            metadata = Ext.decode(view.record.get('usu_cmetadata'))
        }
        if (metadata && metadata.solicitarimagenlogin != null && solicitarimagenlogin) {
            solicitarimagenlogin.setValue(metadata.solicitarimagenlogin)
        }

        // Load Car data
        if (metadata && metadata.brand != null && brandInput){
            brandInput.setValue(metadata.brand);
        }
        if (metadata && metadata.model != null && modelInput){
            modelInput.setValue(metadata.model);
        }
        if (metadata && metadata.domain != null && domainInput){
            domainInput.setValue(metadata.domain);
        }
        if (metadata && metadata.colour != null && colourInput){
            colourInput.setValue(metadata.colour);
        }
        if (metadata && metadata.year != null && yearInput){
            if(metadata.year.length>4)
                yearInput.setValue(metadata.year.substring(0,4));
            else
                yearInput.setValue(metadata.year);
        }
        if (metadata && metadata.vehicleType != null && vehicleTypeInput){
            vehicleTypeInput.setValue(metadata.vehicleType);
        }
        if (metadata && metadata.seguroVto != null && seguroVtoInput
            && metadata && metadata.seguroVto != undefined 
            && metadata.seguroVto != ''){
            seguroVtoInput.setValue(new Date(metadata.seguroVto));//seguroVtoInput.setValue(metadata.seguroVto);
        }
        if (metadata && metadata.seguroCia != null && seguroCiaInput){
            seguroCiaInput.setValue(metadata.seguroCia);
        }
        if (metadata && metadata.vtv != null && vtvInput
            && metadata.vtv != undefined && metadata.vtv!=''){
            vtvInput.setValue(new Date(metadata.vtv));//vtvInput.setValue(metadata.vtv);
        }
        if (metadata && metadata.blacklist != null && blacklistInput){
            blacklistInput.setValue(metadata.blacklist);
        }
        if (profileVehicleInput){
            var profileVehicleId = metadata ? metadata.profileVehicleId : null;

            // Store compartido con la columna Perfil de la grilla: el primero que lo necesita
            // lo crea y queda registrado por storeId.
            var profileVehicleStore = Ext.getStore('ComboPerfilVehicleStore');
            if (!profileVehicleStore) {
                profileVehicleStore = Ext.create('Ext.data.Store', {
                    storeId: 'ComboPerfilVehicleStore',
                    model: 'Tablas.model.t_PerfilVehicleSearchModel',
                    pageSize: 500
                });
            }
            profileVehicleInput.bindStore(profileVehicleStore);

            // El setValue va despues del load: antes el combo no tiene el registro y
            // mostraria el id crudo en vez del nombre.
            if (profileVehicleId != null && profileVehicleId !== '') {
                if (profileVehicleStore.isLoaded()) {
                    profileVehicleInput.setValue(profileVehicleId);
                } else {
                    profileVehicleStore.on('load', function(){
                        profileVehicleInput.setValue(profileVehicleId);
                    }, this, {single: true});
                }
            }

            if (!profileVehicleStore.isLoaded() && !profileVehicleStore.isLoading()) {
                profileVehicleStore.load();
            }
        }
        if (metadata && metadata.photo != null){
                
                view.down('#Photo').setSrc('/gallery/' + metadata.photo);
                view.down('#photoName').setValue(metadata.photo);
                view.down('#Photo').setWidth('32');
                view.down('#Photo').setHeight('32');            
                
        }
        
        view.mystore = Ext.create('Ext.data.Store',{
            model: 'Tablas.model.t_tiposSearchModel',
            remoteFilter:true,
            filters:[{
                property:'tip_ccodigo',
                value: view.record.get('cue_ctipo')
            }]
        }).load({callback:function (records) {
            if(records && records.length>0) {
                var record = records[0]
                
                if( record.get('tip_nTipo') != 7 ) { //ver SoftguardUsuarioTipoStore
                   //saco items del store                                                             
                    var store = view.down('#tipousuario').getStore()
                    
                    store.remove(store.findRecord('Value', 5))
                    store.remove(store.findRecord('Value', 6))
                    store.remove(store.findRecord('Value', 7))
                    store.remove(store.findRecord('Value', 8))
                }
            }
        }})

        if ( view.openFromAC ) {
            view.down('#usu_icodigo').hide();
            view.down('#tipousuario').hide();
            view.down('#usu_cidentificacion').show();
            view.down('#vehicleData').show();

            // Get Account Name from ac_m_usuariosformview.
            if ( view.caller && view.caller.record && view.caller.record.get('cue_cnombre') ) {
                view.down('#cuentareadonly').setValue(view.caller.record.get('cue_cnombre'));
            }

        } else {
            view.down('#usu_icodigo').setMinValue( 1 );
        }
        
	},
    
    codigoValidator: function(view){
        
        var record = view.record;
        
        var usuarioStore =Ext.create('Ext.data.Store',{
            model: this.getM_usuariosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property:'usu_icodigo',
                value:view.down('#usu_icodigo').getValue()
            },{
                property:'usu_iidcuenta',
                value:view.down('#cuenta').getValue()
            }]
        }).load({callback:function (records) {
            
            view.down('#usu_icodigo').clearInvalid();            
            if(records.length>0) {
                
                if (record.get('Id') != records[0].get('Id') && Ext.getApplication().getName() != 'AccessControl') {                    
                    view.down('#usu_icodigo').markInvalid('El código de usuario ya existe');
                }
            }
            
                      
        }});
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
        var view = button.up('m_usuariosformview');
        var record = view.record;
        var win =  button.up('window');
        var controller = this;

        if(view.down('#cuenta').getValue() == ''
            || view.down('#cuenta').getValue() == '0') {
            notify('Debe seleccionar una cuenta')
            return false;
        }
        
        if (myform.isValid()){
            
            myform.updateRecord(record);
            if (record.get('Id') == 0){
                var min = Math.ceil(-1000);
                var max = Math.floor(-10000);
                var randomInt = Math.floor(Math.random() * (max - min + 1) + min);                 
                record.set('usu_icodigo',randomInt);
            }
            
            var codigo = (record.get('usu_icodigo')!=900)?record.get('usu_icodigo'):0;
            
            record.set('usu_iid', codigo);
            
            record.set('usu_cmetadata', Ext.encode({
               solicitarimagenlogin: view.down('#solicitarimagenlogin') ? view.down('#solicitarimagenlogin').getValue() : 0,
               brand: view.down('#Brand') ? view.down('#Brand').getValue() : '',
               model: view.down('#Model') ? view.down('#Model').getValue() : '',
               domain: view.down('#Domain') ? view.down('#Domain').getValue() : '',
               colour: view.down('#Colour') ? view.down('#Colour').getValue() : '',
               year: view.down('#Year') ? view.down('#Year').getValue() : '',
               vehicleType: view.down('#VehicleType') ? view.down('#VehicleType').getValue() : '',
               seguroVto: view.down('#seguroVto') ? view.down('#seguroVto').getValue() : '',
               seguroCia: view.down('#seguroCia') ? view.down('#seguroCia').getValue() : '',
               vtv: view.down('#vtv') ? view.down('#vtv').getValue() : '',
               blacklist: view.down('#blacklist') && view.down('#blacklist').getValue() ? 1 : 0,
               photo: view.down('#photoName') ? view.down('#photoName').getValue() : '',
               profileVehicleId: view.down('#profileVehicleId') ? view.down('#profileVehicleId').getValue() : '',
            }))
            
            record.set('usu_iidcuenta', view.down('#cuenta').getValue());
            
            record.set('usu_cclave', '');
            
            record.save({callback:function () {
                notify('Se guardo con exito')
                if( view.caller && !view.openAutomaticallyCreatedUser) {
                    view.caller.fireEvent('refresh',view.caller, record);
                    win.close();
                } else {
                    win.close();
                    view.caller.fireEvent('itemdblclick', view.caller, record);
                }
                
            }})
        }   
	},

	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('m_usuariosformview');
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
        var view = button.up('m_usuariosformview');
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
                caller:view
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