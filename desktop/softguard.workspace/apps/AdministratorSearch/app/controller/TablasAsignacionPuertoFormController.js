Ext.define('AdministratorSearch.controller.TablasAsignacionPuertoFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablasIpConStore', 'ReceptoresStore', 'TablaLineasStore' ],
    models : [ 'TablasLineasXPuertoModel', 'TablasPortAliasModel', 'TablasLineasXPuertoSearchModel', 'ReceptoresSearchModel', 'TablasIpConSearchModel', 'TablasPuertosSearchModel' ],
    views : [ 'TablasAsignacionPuertoFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
					'tablasasignacionpuertoformview' : {
						beforerender : this.initview
					},
					'tablasasignacionpuertoformview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'tablasasignacionpuertoformview checkbox' : {
    					change : this.onCheckBoxClick
					}
    				
                });
	}, // cierro init

	initview : function(view) {
        var controller = this;
                
        var puerto = view.down('#puerto');
        var puertostore =Ext.create('Ext.data.Store',{
            model: this.getTablasPuertosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        puerto.bindStore(puertostore);
        puertostore.load({callback:function () {
               puertostore.insert(0,controller.getTablasPuertosSearchModelModel().create({pue_cdescripcion:getLocale('Sin seleccionar')}));
        }});
        
        if (view.record.get('tpa_ipuerto')==null){
            view.down('#puerto').setValue(0);
        }

        var combo = view.down('#conexionip');
        var combostore = Ext.create('Ext.data.Store',{
            model: this.getTablasIpConSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: false,
            filters: view.filters,
            listeners:{
                beforeload: function(store){
                    store.getProxy().setExtraParam("onlyConnIP", 0);
                }
            }
        })
        combo.bindStore(combostore);
	    combostore.load();

        if(view.record.get('tpa_icodigo')) {
            var filters = [{
                property: 'lxp_iAlias',
                value: view.record.get('tpa_icodigo')
            }];
        
            view.checkStore =Ext.create('Ext.data.Store',{
                model: this.getTablasLineasXPuertoSearchModelModel(),         
                remoteSort: true,
                remoteFilter: true,
                filters: filters,
                pageSize: 1000
            });
            view.checkStore.load({callback:function(records) {
                if (records.length>0){
                        view.checkStore.each(function(recordx)  {
                        if(recordx.get('lxp_nEstado') == 1) {
                            var itemId = 'linea-'+recordx.get('lxp_nLinea');                    
                            view.down('#'+itemId).setValue(true);
                        }
                    });  
                }
                else{
                    for(i=1; i<=32; i++) {    
                        view.checkStore.add({
                            'lxp_nLinea' : i,
                            'lxp_nEstado' : 0
                        });
                    }
                }   
            }})
        } else {
              var recordLineas = this.getTablasLineasXPuertoSearchModelModel();
              view.checkStore =Ext.create('Ext.data.Store',{
                model: this.getTablasLineasXPuertoSearchModelModel()
              });
              
              for(i=1; i<=32; i++) {
                var myobject = recordLineas.create({
                    'lxp_nLinea' : i,
                    'lxp_nEstado' : 0
        		});     
                view.checkStore.add(myobject);
              }
            
        }
        
        /* BC 374644148 : Quito el bind del combo y lo paso a Store con autoload para el typeAhead sino rompe. 
         * Cambio la manera de carga cuando es un nuevo puerto.
         */
        view.loadRecord(view.record);
      
        if(view.record.get('Id') == 0) {
            combo.setValue('');
            view.down('#puerto').setValue('');
        }
        
	},
    
    onCheckBoxClick : function(checkbox, newVal, oldVal) {
        
        var view = checkbox.up('tablasasignacionpuertoformview');
        view.checkStore.each(function(record){
            if(checkbox.itemId == 'linea-'+record.get('lxp_nLinea')) {
                
                var valCheck = 0;
                if(checkbox.value == true) {
                    valCheck = 1;
                }
                
                record.set('lxp_nEstado', valCheck);
            }
        });
    },


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablasasignacionpuertoformview');
        var win = button.up('window');
		var record = myform.getRecord();

		myform.updateRecord(record);
        record.setConfig({
            proxy: this.getTablasPortAliasModelModel().getProxy()
        });
        if(
            (view.down('#conexionip').getValue()  && view.down('#puerto').getValue()) 
            || (!view.down('#conexionip').getValue()  && !view.down('#puerto').getValue()) 
            ){
            notify('Se debe seleccionar o un puerto o una conexion ip');      
        } else {
           if (myform.isValid()){
        		record.save({
        			scope : this,
                    view: view,
        			callback : function(record, operation) {
                        if (operation.success){
                            console.log('Guardando las lineas x puerto');
                            view.checkStore.each(function(recordx){
                                recordx.set('lxp_iAlias', record.get('tpa_icodigo'));
                            });
                            view.checkStore.save({callback: function(){
                                var win = view.up('window');           
                                notify('Los datos se guardaron correctamente, La asignación puedo tardar unos instantes.');
                                view.caller.fireEvent('objectchanged',view.caller,record);                    
                                win.close();
                            }});
                        } else {
                            notifyError('Hubo un error al guardar los datos');
                        }
                        
        			},
        			button : button
        		});
            
           }
           
    	}

	}
    
});