Ext.define('AdministratorSearch.controller.TablasMovilesPatrullaFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'CuentaStore' ],
    models : [ 'TablasMovilesPatrullaModel', 'CuentaSearchModel', 'TablasFlotasSearchModel', 'SoftguardCuentaModel', 'TelefonoSearchModel' ],
    views : [ 'TablasMovilesPatrullaFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					'tablasmovilespatrullaformview' : {
						beforerender : this.initview
					},
					'tablasmovilespatrullaformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'tablasmovilespatrullaformview #cuenta' : {
						change : this.onCuentaChange
					}
    				
                });
	}, // cierro init

     
   

	initview : function(view) {
        
        var flotaStore = Ext.create('Ext.data.Store',{
            model: this.getTablasFlotasSearchModelModel(),
            autoload: false,
            pageSize: 10000
        });
        
        view.cuentaStore = Ext.create('Ext.data.Store',{
            model: this.getCuentaSearchModelModel(),
            autoload: false,
            remoteFilter: true,
            filters: [{
                property:'cue_clinea',
                value: '_MP'
            }],
            pageSize: 10000
        });
        
        var comboFlota = view.down('#comboflota');
        var comboCuenta = view.down('#cuenta');
        
        
        
        comboFlota.bindStore(flotaStore);
        comboCuenta.bindStore(view.cuentaStore);
       
        
        flotaStore.load();
        view.cuentaStore.load({callback:function () {
         comboCuenta.store.add({cue_cnombre: getLocale('Nueva cuenta'), Id: -1});
        }});
    
        
        view.loadRecord(view.record);
        
        var estadoSertec = view.down('#estadoSertec');
        var estadoSertecdisplay = view.down('#estadodisplay');
       
       /* if (estadoSertec.getValue()){
           estadoSertec.hide();
           estadoSertecdisplay.show();
           
           if(estadoSertec.getValue() == 1) {
               estadoSertecdisplay.setValue(getLocale('Disponible listado'));
           } else if(estadoSertec.getValue() == 2) {
               estadoSertecdisplay.setValue(getLocale('Fuera de servicio'));
           }
           
        } */
        
        var record = view.record;
        
        var cnumeroVal = record.get('tmp_cnumero');
        var sertec = view.down('#sertec');
        var cnumero = view.down('#cnumero');
        
       /* if (cnumeroVal.substring(0, 2) == 'ST'){
            sertec.setValue(true);
            cnumeroVal = cnumeroVal.slice(2);
        }
        
        cnumero.setValue(cnumeroVal);*/
        
        if(view.servtec) {
            sertec.setValue(true);
            sertec.hide();
        }

	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablasmovilespatrullaformview');
        var win = button.up('window');
		var record = myform.getRecord();
        var controller = this;
        var cnumero = view.down('#cnumero').getValue();
        
        var model = this.getTablasMovilesPatrullaModelModel();
        
        
        record.setConfig({
            proxy: model.getProxy()
        });
        
      // cnumero = Ext.String.leftPad( cnumero, 3, '0' );
        
      // var sertec = view.down('#sertec').getValue();
        
      // var csertec = sertec?'ST':'';
        

		myform.updateRecord(record);
        
        record.set('tmp_cnumero',cnumero);
        
      
        if (myform.isValid()){
            
            var telefonocuenta = view.down("#telefonocuenta").getValue();
            var emailcuenta = view.down("#emailcuenta").getValue();
            
           // if(view.cuenta.get('cue_ctelefono') != telfonocuenta) {
                
                var telefonoOld = view.cuenta.get('cue_ctelefono');
                
                //falta el REST !!!!!!!
                var modelTelefono = this.getTelefonoSearchModelModel();
                
                var telefonoStore = Ext.create('Ext.data.Store',{
                    model: modelTelefono,
                    autoload: false,
                    remoteFilter: true,
                    filters: [{
                        property:'tel_ctelefono',
                        value: telefonoOld
                    }],
                    pageSize: 10000
                });
                
                telefonoStore.load({callback:function (records,operation) {
                    
                    if(operation.success) {
                        
                        if(records.lenght > 0) {               
                            
                            var tel = records[0];
                            tel.set('tel_ctelefono',telefonocuenta);
                            tel.set('tel_cnombre',record.get('tmp_cnombre'));
                           
                            
                        } else {
                            
                           var tel = modelTelefono.create({
                                tel_ctelefono: telefonocuenta,
                                tel_iidcuenta: view.cuenta.get('cue_iid'),
                                tel_cnombre: record.get('tmp_cnombre')
                           })  
                           
                        }
                        
                        
                        if(Ext.util.Format.trim(tel.get('tel_ctelefono')) != '') {
                            tel.save({callback:function () {                           
                                    notify('El telefono se guardo correctamente.');                            
                            }}); 
                        }
                    }
                }})
           // }
            
            
            if(view.cuenta.get('Id') == 0 || ( view.cuenta.get('cue_ctelefono') != telefonocuenta 
                || view.cuenta.get('cue_cemail') != emailcuenta
                || view.cuenta.get('cue_ctipo') != '_TP'
                || view.cuenta.get('cue_cIMEI') != view.down("#cue_cIMEI").getValue())) {
                view.cuenta.set('cue_ctelefono', telefonocuenta);
                view.cuenta.set('cue_cemail', emailcuenta);
                view.cuenta.set('cue_cnombre', view.down('#nombrepatrulla').getValue());
                
                var nuevoNumero = view.down('#cuentanumero').getValue();
                var pad = "0000";
                nuevoNumero = (pad+nuevoNumero).slice(-pad.length);
                
                view.cuenta.set('cue_ncuenta', nuevoNumero);
                view.cuenta.set('cue_ctipo', '_TP');
                view.cuenta.set('cue_cIMEI', view.down('#cue_cIMEI').getValue())
                
                view.cuenta.save({
                    success: function(rec, op) {
                     record.set('tmp_icuenta', view.cuenta.get('Id'));
                     controller.savePatrulla(record,view);
                     view.cuentaStore.load();
                    }, failure: function(rec, op) {
                      notifyError('Hubo un error al guardar la cuenta'); 
                }});
            } else {
                controller.savePatrulla(record,view);
            }  
        }

	},
    
    
    savePatrulla:function (record,view) {
        record.save({
        		scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');                                    
                       
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        win.close();
                        
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			}
    		});
    },
    
   onCuentaChange: function( checkbox, newValue, oldValue, eOpts){
       
       var view = checkbox.up('tablasmovilespatrullaformview');
       
       var controller = this;
       if(newValue != -1) {
           view.down('#save').setDisabled(false);
           view.down('#cuentanumero').hide();
           
           var cuenta = this.getSoftguardCuentaModelModel().load(newValue, {callback:function (data,operation,success) {
                              
                if(operation.success) {        		
                    view.cuenta = data;            
                    view.down("#telefonocuenta").setValue(view.cuenta.get('cue_ctelefono'));
                    view.down("#emailcuenta").setValue(view.cuenta.get('cue_cemail'));
                    view.down("#cue_cIMEI").setValue(view.cuenta.get('cue_cIMEI'));
                    
                    view.down("#cuentanumero").setValue(view.cuenta.get('cue_ncuenta'));
                }
                
           }})
           
       } else {                    
                     
           view.down('#save').setDisabled(true);
           view.down('#cuentanumero').show();
            
			var date = Ext.Date.format(new Date(),'d/m/Y H:m');
            view.cuenta = controller.getSoftguardCuentaModelModel().create({
                cue_dfechaalta: new Date(),
                cue_dservicio: new Date(),
				cue_ctelefono: '',
				cue_cemail: '',
                cue_clinea:'_MP',
                cue_ctipo: '_TP',
                cue_cnombre: ''
            });
        }
             
         
   }
	
   
});