Ext.define('AdministratorSearch.controller.STMovilFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasMovilesPatrullaModel', 'CuentaSearchModel', 'SoftguardCuentaModel' ],
    views : [ 'STMovilFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			'stmovilformview' : {
						beforerender : this.initview
					},
					'stmovilformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init

	initview : function(view) {
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
        
        var comboCuenta = view.down('#cuenta');
        
        comboCuenta.bindStore(view.cuentaStore);

        view.cuentaStore.load({callback:function () {
         //comboCuenta.store.add({cue_cnombre: 'Nueva cuenta', Id: -1});
        }});
    
        
        
              
        
        
        view.loadRecord(view.record);
        
        var estadoSertec = view.down('#estadoSertec');
        var estadoSertecdisplay = view.down('#estadodisplay');
       

        var record = view.record;
        
        var cnumeroVal = record.get('tmp_cnumero');

        var cnumero = view.down('#cnumero');
        
        if (cnumeroVal.substring(0, 2) == 'ST'){
            sertec.setValue(true);
            cnumeroVal = cnumeroVal.slice(2);
        }
        
        cnumero.setValue(cnumeroVal);
	},
    
   

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('stmovilformview');
        var win = button.up('window');
		var record = myform.getRecord();
        
        var model = this.getTablasMovilesPatrullaModelModel();
        
        record.setConfig({
            proxy: model.getProxy()
        });

		myform.updateRecord(record);
        
      
        if (myform.isValid()){
            
            
            Ext.Ajax.request({
                  url: '/rest/search/MaxStMovil',
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var parametros = Ext.JSON.decode(response.responseText);
                    
                    var nuevoNumero = 0;
                    var ultimo = Ext.util.Format.trim(parametros.row[0].tmp_cnumero);
                    var ultimoNumero = parseInt(ultimo.replace("ST", ""));
                    nuevoNumero = ultimoNumero + 1;
                    
                    var pad = "000";
                    nuevoNumero = (pad+nuevoNumero).slice(-pad.length);
                    
                    nuevoNumero = "ST"+nuevoNumero
                    
                    record.set('tmp_cnumero',nuevoNumero)
                    
                    
                    var fecha = new Date();
                    var record = this.getSoftguardCuentaModelModel().create({
                            cue_nmostrar: 2,
                            cue_nsonidoul: 2,
                            cue_nllaveul: 2,
                            Situacion: situacion,
                            cue_dfechaalta: fecha,
                            cue_dservicio: fecha
                        });
                    
                    
                    
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
                            
            			},
            			button : button
            		});
                    
                    
                  }
            });
            
            
    		
        }

	},
    
   

	
   
});