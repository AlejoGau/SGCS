/**
 * NOTAS
 * 
 * Cuenta Monitoreada es la cuenta que envia la señal de la posicion
 * Cuenta Receptora es la que espera el alerta
 */
         
Ext.define('Trackguard.controller.RestriccionFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GeocercaModel', 'GeocercaCuentaModel' ],
    views : [ 'RestriccionFormView' ],

    init : function(config) {
        // genero los eventos

        
        this.control({
    				'restriccionformview' : {
						beforerender : this.initview,
                        cuentachangedmonitoreada : this.onCuentaMonitoreadaSelected,
                        cuentachangedreceptora: this.onCuentaReceptoraSelected,
					},
					'restriccionformview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'restriccionformview #seleccionarcuentamonitoreada' : {
                        click: this.onsSeleccionarCuentaMonitoreada
                    },
                    'restriccionformview #seleccionarcuentareceptora' : {
                        click: this.onsSeleccionarCuentaReceptora
                    }
    				
                });
	}, // cierro init
    
    
    onCuentaReceptoraSelected:  function (selection,view,recordPreSelected) {
        console.log(selection)
        
        view.down('#idcuentareceptora').setValue(selection.get('cue_iid'))
        view.down('#nombrecuentareceptora').setValue(selection.get('cue_cnombre'))
        
    },
    
     onCuentaMonitoreadaSelected:  function (selection,view,recordPreSelected) {
        console.log(selection)
        view.down('#idcuentamonitoreada').setValue(selection.get('cue_iid'))
        view.down('#nombrecuentamonitoreada').setValue(selection.get('cue_cnombre'))
    },
    
    onsSeleccionarCuentaReceptora: function (btn,view) {
        var view = btn.up('restriccionformview')
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Cuentas',
    		closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentamovileshelperview',
                    //tip_ncondicion: "0", // ya filtra moviles no revisar condicion
                    caller: view,
                    selectionEvent:'cuentachangedreceptora'
                }
            ]
		});
		win.show();
        
        
    },
    onsSeleccionarCuentaMonitoreada: function (btn,view) {
        var view = btn.up('restriccionformview')
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Cuentas',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentamovileshelperview',
                    //tip_ncondicion: "0", // DEDALO 2020/01/21 prueba para que traiga todos los moviles 
                    caller: view,
                    selectionEvent:'cuentachangedmonitoreada'
                }
            ]
		});
		win.show();
        
        
    },
    

	initview : function(view) {
        var controller = this;
        
        
       view.down('#nombrecuentareceptora').setValue(view.record.get('nombreCuentaReceptora'))       
       view.down('#nombrecuentamonitoreada').setValue(view.record.get('nombreCuentaMonitoreada'))
       
       view.down('#idcuentamonitoreada').setValue(view.record.get('idCuentaMonitoreada'))       
       view.down('#idcuentareceptora').setValue(view.record.get('idCuentaReceptora'))
      
      
        if(view.record.get('MetaData') != "") {
            var metadata = Ext.decode(view.record.get('MetaData'))
            if(metadata.distancia) {
                view.down('#distancia').setValue(metadata.distancia)
            } else {
                view.down('#distancia').setValue(100)
            }
        }
        
        
        
        view.loadRecord(view.record);  
	
	},


	onSaveClick : function(button, event, options) {
		
        var view = button.up('restriccionformview');
        var controller = this;
        view.record.setConfig({
            proxy: controller.getGeocercaModelModel().getProxy()
        });
        
        var myform = view.getForm();
        myform.updateRecord(view.record);
        
        
        
        view.record.set('MetaData',Ext.encode({ 
                                                distancia: view.down('#distancia').getValue(),
                                                cuentaMonitoreada: view.down('#idcuentamonitoreada').getValue(),
                                                cuentaReceptora: view.down('#idcuentareceptora').getValue()
                                              }))
                                            
        
        var cuentaReceptora = view.down('#idcuentareceptora').value
        var ceuntaMonitoreada = view.down('#idcuentamonitoreada').value
        
        view.record.save({callback:function (record,operation) {
            if (operation.success){
                
                var storeCuentas =Ext.create('Ext.data.Store',{
                    model: controller.getGeocercaCuentaModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [
                        {
                            property:'GeoFenseId',
                            value: view.record.get('Id')
                        }
                        ]
                })
                
                storeCuentas.load({callback:function (records,k) {
                    
                    if(records.length>0) {
                        storeCuentas.each(function (c) {
                          //  storeCuentas.remove(c)
                            c.destroy()
                        })
                    }
                    
                    //creo la cuenta receptora
                    controller.getGeocercaCuentaModelModel().create({
                        GeoFenseId:view.record.get('Id'),
                        CuentaId: cuentaReceptora,
                        Name:'RECEPTORA'
                    }).save({callback:function () {
                        
                            //creo la cuenta monitoreada
                            controller.getGeocercaCuentaModelModel().create({
                                GeoFenseId:view.record.get('Id'),
                                CuentaId: ceuntaMonitoreada,
                                Name:'MONITOREADA'
                            }).save({callback:function () {
                            
                                    notify('Los datos se guardaron correctamente');
                                    view.caller.fireEvent('objectchanged',view.caller,record);
                                    view.close();
                            
                            }})
                    
                    }})
                    
                    
                    
                }});
                
                
            } else {
                notifyError('Hubo un error al guardar los datos');
            }
        }})

	}
    
   

	
   
});