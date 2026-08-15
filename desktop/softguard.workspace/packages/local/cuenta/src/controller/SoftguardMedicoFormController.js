Ext.define('Cuenta.controller.SoftguardMedicoFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Cuenta.store.ComboMedicosStore', 'Cuenta.store.ComboObrasSocialesStore', 'SoftguardGeneroStore', 'Cuenta.store.SiNoStore', ],
	models : ['Common.model.NameValueIntModel' ],
	views : [ 'Cuenta.view.SoftguardMedicoFormView' ],

	init : function(config) {
		// this.initConfig(config);
		// genero los eventos

		this.control({

			'medicoformview button[action="save"]' : {
				click : this.saveObject
			},
            'medicoformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'medicoformview' : {
                afterrender : this.initview
			},
            'medicoformview #fechaAlta' : {
                change : this.onFechaChange
    		},
            'medicoformview #solitarcambio' : {
                click : this.onSolicitarCambioClick
    		}
		});
	}, // cierro init
    
    
    
    onSolicitarCambioClick: function(button) {
        var view =button.up('medicoformview');    
        var controller = this;
        
        var RecordModificado = view.getForm().getRecord().copy()        
        view.getForm().updateRecord(RecordModificado);
        
        var RecordOriginal = view.getForm().getRecord().copy()
            
        var method = 'PUT';
        var altPath = '/Rest/Tablas/Medicos/'+view.getForm().getRecord().get('Id')+''
        if (view.getForm().getRecord().get('Id') == 0) {
            method = 'POST'
            altPath = '/Rest/MedicalInfo/'
            RecordOriginal.set('mnf_nvivesolo','')
            RecordOriginal.set('mnf_nambulancia','')
            RecordOriginal.set('mnf_ndiscapacitado','')
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
                    pom_cueiid: view.record.get('mnf_iidcuenta'),
                    pom_metadata:Ext.encode({
                        form: {
                            alias: view.xtype,
                            title: getLocale('Medico')
                        },
                        //cuando usa models viejos le armo la URL a mano
                        altPath: altPath,
                        method:method
                        
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
        myform.loadRecord(view.record);
        
        if (view.profile == 4){
            view.down('#save').hide();
            view.down('#solitarcambio').show()
        }
	},

	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('medicoformview');
        var win =  button.up('window');

        if (myform.isValid()){
    		myform.updateRecord(mymodel);
            button.disable(); 
            mymodel.save({callback:function () {
                view.caller.fireEvent('refresh',view.caller, record);
                win.close();
            }})
            
        };

	},

	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('medicoformview');
		mymodel.destroy({
					scope : this.application
				});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close()
	},
    
    onCancelClick: function(button, event, options){
        var myWin = button.up('window');
        var view = button.up('medicoformview');
        var grid = view.grid;
        if(view.record.get('Id') == 0) {
            grid.store.remove(view.record);
        }
        myWin.close();
    },
    
    onFechaChange: function(field, newValue, oldValue, options){
        var form = field.up('medicoformview').getForm();
        var fedad = form.findField('mnf_nedad');
        var edadMilliseconds = Ext.Date.getElapsed(newValue);
        
        fedad.setValue(Math.floor(edadMilliseconds / 31536000000));
    }
    
});