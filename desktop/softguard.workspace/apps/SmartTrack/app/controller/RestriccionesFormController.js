Ext.define('SmartTrack.controller.RestriccionesFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_vcrestriccionesModel', 'SmartTrackSearchModel', 'SmartTrackModel' ],
    views : [ 'RestriccionesFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				'restriccionesformview' : {
						beforerender : this.initview,
                        afterrender : this.hideElements
					},
					'restriccionesformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init
    
    hideElements : function(view) {
        // BC 372407157 - Modifico los colores del fondo del selecterField
        view.down('#evento').setText(getLocale('Seleccionar Dispositivos'));
        view.down('#gridname').setVisible(false);        
        view.down('#deleteEvent').hidden = false;
    },
    
	initview : function(view) {
        var controller = this;
        view.loadRecord(view.record);
        
        view.down('#smarttrack').setValue(view.record.get('vcr_list'));
        view.down('#vcr_status').setValue(view.record.get('vcr_status'))

	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('restriccionesformview');
		var record = myform.getRecord();
        var controller = this;
        
		myform.updateRecord(record);
        
        if(view.down('#smarttrack').getValue() == '') {
            notify('Es necesario elegir almenos un vigicontrol ')
            return false;
        }
        
        
        var arrOldList = record.get('vcr_list').split(',')
        var arrCurrentList = view.down('#smarttrack').getValue().split(',')
        
        record.set('vcr_list',view.down('#smarttrack').getValue())
        record.set('vcr_status',view.down('#vcr_status').getValue())
        
        if (myform.isValid()){

    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        
                        
                        view.mask=Ext.create('Ext.LoadMask', {
                            target : view,
                            msg: getLocale("Actualizando metadata de dispositivos")
                        }).show();
                        
                        
                        
                        var diferencias = diferenceArray(arrOldList,arrCurrentList)
                        
                        //modifico los que se agregaron o se modificaron
                        controller.guardoMetadataDispositivo( diferencias.added.concat(diferencias.same) , record, 3, view, function () {
                            
                            //modifico los que se eliminaron                            
                            controller.guardoMetadataDispositivo( diferencias.deleted , record, 2, view, function () {
                                
                                view.mask.hide()
                                var win = view.up('window');           
                                notify('Los datos se guardaron correctamente');
                                view.caller.fireEvent('refresh',view.caller,record);       
                                view.up('window').close()
                                
                                
                            })
                        })
                        
                        
                           
                      
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                        view.up('window').close()
                    }
                    
    			},
    			button : button
    		});
        }

	},
    
    guardoMetadataDispositivo: function (arrIds,record, forceStatus, view, callback) {
        var controller = this;
        
        if(arrIds[0]) {
            var idCurrent = arrIds[0];
            
            
            controller.getSmartTrackModelModel().load(idCurrent, {callback:function (recordST) {
                if(recordST.get('Config') == '') {
                    Ext.Ajax.request({
                      url: '/Rest/UiApplication/52/Metadata',
                      scope: this,
                      success: function(resp,operation) {
                        var metadata = Ext.decode(resp.responseText);
                        var json = Ext.decode(metadata.Config);
                        
                        json.trackingDistance = record.get('vcr_distance')
                        json.trackingEnabled = forceStatus
                        
                        recordST.set('Config',Ext.encode(json))
                        recordST.save({callback:function () {
                            
                            arrIds.shift(); 
                            controller.guardoMetadataDispositivo(arrIds,record,forceStatus,view, callback)
                            
                        }})
                      }
                    });
                    
                } else {
                    var json = Ext.decode(recordST.get('Config'))
                    json.trackingDistance = record.get('vcr_distance')
                    json.trackingEnabled = forceStatus
                    
                    recordST.set('Config',Ext.encode(json))
                    recordST.save({callback:function () {
                            
                        arrIds.shift(); 
                        controller.guardoMetadataDispositivo(arrIds,record,forceStatus,view, callback)
                        
                    }})
                }
            }})
        } else {
            
            if(callback) {
                callback();
            }
        }
        
    } 

	
   
});