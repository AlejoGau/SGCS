Ext.define('Cuenta.controller.SoftguardContactoFormController', {
    extend : 'Ext.app.Controller',
	stores : [ 'TablaListasEmergenciaStore', 'TelefonoDiscadoStore', 'Cuenta.store.SiNoStore' ],
	models : [ 'm_telefonoSearchModel', 'TelefonoSearchModel', 'SoftguardTelefonoModel', 'm_telefonoModel' ],
	views : [ 'SoftguardContactoFormView' ],

	init : function(config) {
		// genero los eventos

		this.control({
			'contactoformview button[action="save"]' : {
				click : this.saveObject
			},
            'contactoformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'contactoformview button[action="passChange"]' : {
        		click : this.onPasschangeClick
			},
            'contactoformview button[action="permisoChange"]' : {
    			click : this.onPermisochangeClick
			},
            'contactoformview' : {
                beforerender : this.initview,
                passwordchanged : this.onPasswordChanged
			},
            'contactoformview #solitarcambio' : {
                click : this.onSolicitarCambioClick
    		}
		});
	}, // cierro init

    onSolicitarCambioClick: function(button) {
        var view =button.up('contactoformview');    
        var controller = this;
        
            
        var RecordModificado = view.getForm().getRecord().copy()        
        view.getForm().updateRecord(RecordModificado);
        
        var RecordOriginal = view.getForm().getRecord().copy()
        delete RecordOriginal.store
       
        
        var method = 'PUT';
        var forceNew = false;
        if (view.getForm().getRecord().get('Id') == 0) {
           method = 'PUT' //este funciona asi
           forceNew = true;   
           RecordOriginal.set('tel_cclave', '')
           RecordOriginal.set('tel_clista', '')
           RecordOriginal.set('tel_ndiscado', '-1')
           RecordOriginal.set('tel_nsp', '')
           RecordOriginal.set('tel_ntr', '')
           RecordOriginal.set('tel_nsms', '')
        }
        
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
                    pom_cueiid: view.record.get('tel_iidcuenta'),
                    pom_metadata:Ext.encode({
                        form: {
                            alias: view.xtype,
                            title: getLocale('Contacto')
                        },
                        //cuando usa models viejos le armo la URL a mano
                        altPath: '/Rest/Cuenta/'+view.getForm().getRecord().get('Id')+'/Telefono',
                        method:method,
                        forceNew: forceNew
                    })
                },
              scope: this,
              success: function(response){
                var errors = Ext.JSON.decode(response.responseText);
                notify("La solicitud fue realizada")
              }
        })
        
        view.up('window').close()
    },

	initview : function(view) {
        view.record.set('tel_norden',view.ultimaPsicion);
        var storeEmergencia = this.getTablaListasEmergenciaStoreStore()
        view.down('#lista').bindStore(storeEmergencia)
        storeEmergencia.load()

        var storeTelefonoDiscado = this.getTelefonoDiscadoStoreStore()
        view.down('#tel_ndiscado').bindStore(storeTelefonoDiscado)
        storeEmergencia.load()
        
        var storeSiNo = this.getSiNoStoreStore()
        view.down('#tel_ntr').bindStore(deepCloneStore(storeSiNo))
        view.down('#tel_nsms').bindStore(deepCloneStore(storeSiNo))

        var form = view.getForm();
        form.loadRecord(view.record);

        var profile = view.profile;

        if (profile == 4){
            view.down('#save').hide();
            view.down('#solitarcambio').show()
        } 
        
        view.down('#permiso').show();

        var rights = view.rights;
        var clave = view.down('#clave');
        var claveTxt = view.down('#claveTxt');
        
        if (rights && rights.claves == true){
            view.down('#clavebox').show();
            clave.hide();
            claveTxt.show();
            claveTxt.setValue(view.record.get('tel_cclave'));
        } else if ((!rights || !rights.claves) && profile > 2) {
            view.down('#clavebox').show();
            clave.hide();
            claveTxt.show();
            claveTxt.setValue(view.record.get('tel_cclave'));
        } else if (profile == 'readOnly') {
            // BC 371245534 : Solicita abrir en modo ReadOnly a ContactoFormController
            view.down('#tel_cnombre').disable();
            view.down('#tel_cobservacion').disable();
            view.down('#lista').disable();
            view.down('#permiso').disable();
            view.down('#tel_ndiscado').disable();
            view.down('#tel_nsp').disable();
            view.down('#tel_ctelefono').disable();
            view.down('#tel_norden').disable();
            view.down('#tel_cpredigito').disable();
            view.down('#tel_cpostdigito').disable();
            view.down('#tel_ntr').disable();
            view.down('#tel_nsms').disable();
            view.down('#clave').disable();
            view.down('#claveTxt').disable();
    		view.down('#save').hide();
			view.down('#cancel').text = getLocale('Cerrar');
        }
	},

	saveObject : function(button, event, options) {
        var view = button.up('contactoformview');
		var myform = view.getForm();
		var record = view.record;
        
        var win =  button.up('window');
        
        if (myform.isValid()){

            if (record.get('Id')>0){
                this.checkNumberChange(view);
            }

            myform.updateRecord(record);
            
            record.save({callback:function () {
                notify('Los datos se guardaron con éxito');
                if(view.caller) {
                    view.caller.fireEvent('objectchanged',view.caller);
                }
                win.close();
            }})
        }
	},


    checkNumberChange: function(view){
        // reviso si cambio el numero de telefono
        var record = view.record;
        var oldnumber = record.get('tel_ctelefono');
        var newNumber = view.down('#tel_ctelefono').getValue();
        
        if (oldnumber!=newNumber){

            // me fijo si hay numeros con el numero viejo a modificar
            mystore =Ext.create('Ext.data.Store',{
                model: this.getM_telefonoSearchModelModel(),
                remoteSort: true,
                remoteFilter: true,
                pageSize: 600,
                filters: [
                    {property:'tel_ctelefono',value: oldnumber},
                    {property:'tel_idKey:NOT',value: record.get('Id')}
                ],
                sorters: [
                    {property : 'cue_cnombre',direction: 'ASC'},
                    {property : 'tel_norden',direction: 'ASC'}
                ]
            });

            mystore.load({
                callback: function(records){
                    if (records.length>0){
                        var win = Ext.create('Ext.Window', {
                            layout : 'fit',
                            title : 'Teléfonos a modificar',
                            closeAction : 'destroy',
                            modal: true,
                            width : 600,
                            height : 400,
                            border : false,
                            items : {
                                xtype: 'm_telefonosbulkchangegridview',
                                preventHeader: true,
                                caller: view,
                                record: record,
                                newNumber: newNumber,
                                mystore: mystore
                            }
                        });
                        win.show();
                    }
                }
            });
        }
    },

	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('contactoformview');
		mymodel.destroy({
					scope : this.application
				});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close();
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        var view = button.up('contactoformview');
        var myform = view.getForm();
    	var record = view.record;
        
        if (record.get('Id')==0 && record.store)
            record.store.remove(record);
        
        myWin.close();
    },

    onPasschangeClick: function(button, event, options){
        var view = button.up('contactoformview');
        var win = Ext.create('Ext.Window', {
        	layout : 'fit',
			title : 'Cambio de clave',
			closeAction : 'destroy',
            caller: view,
            fieldName: 'tel_cclave',
            modal: true,
			width : 300,
			height : 150,
			border : false,
			items : {xtype: 'passwordformview'}
		});
		win.show();
    },
    
    onPermisochangeClick: function(button, event, options){
        var view = button.up('contactoformview');
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
			title : 'Cambio de permiso',
			closeAction : 'hide',
            caller: view,
            fieldName: 'tel_cpermiso',
            modal: true,
			width : 300,
			height : 150,
			border : false,
			items : {xtype: 'passwordformview'}
		});
		win.show();
    },
    
    onPasswordChanged : function(value, win) {
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