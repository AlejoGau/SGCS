//MIGRADO2024
Ext.define('Common.controller.ServTecMapFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardCuentaModel' ],
    views : [ 'ServTecMapFormView' ],
    init : function(config) {
        // this.initConfig(config);
    	// genero los eventos
		this.control({
            'sertecmapformview' : {
                beforerender : this.initview,
			}
		});
	}, // cierro init
	initview : function(view) {            
      //stc_iid_cuenta
      
        var recordCuenta = this.getSoftguardCuentaModelModel();
                
            var objectId = view.record.get('stc_iid_cuenta');
            
            recordCuenta.load(objectId, {
            	callback : function(record,operation) {
                    if (operation.success){
                        
                        console.log(record)
                   
      
      
            		var mylat = record.get('cue_cLatLng').split(',')[0]; 
                     var   myLong = record.get('cue_cLatLng').split(',')[1];
//myAddr = provincia + ' ,' + view.pais;
            
            		var mappanel = Ext.widget('gmappanel6', {
            			zoomLevel : 5,
                        width: '100%',
                        flex: 1,
            			gmapType : 'map',
            			mapConfOpts : ['enableScrollWheelZoom',	'enableDoubleClickZoom', 'enableDragging'],
            			mapControls : ['GSmallMapControl', 'GMapTypeControl','NonExistantControl'],
                        geocodePosition: function(pos,infowindow) {
                            var geocoder = this.getGeocoder();
                              geocoder.geocode({
                                latLng: pos
                              }, function(responses) {
                                if (responses && responses.length > 0) {
                                  var address = responses[0].address_components;      
                                  win.down('#address').setText(address[0].long_name+', '+address[2].long_name+', '+address[3].long_name);
                            
                                } else {
                                  var msg = 'No se encontró una dirección válida.';      
                                  //updateMarkerAddress(msg);
                                  win.down('#address').setText(msg);
                                }
                              });
                            } 
            		});
            		if (mylat && myLong && (mylat !=0 || mylat!='') && (myLong!=0 || myLong !='')) {
                        Ext.apply(mappanel, {
                            zoomLevel : 14,
                			setCenter : {
            					lat : mylat,
            					lng : myLong,
            					marker : {
            						title : record.get('cue_cnombre'),
            						draggable : true
            					},
            					listeners : {
            						dragend : function(e) {
            							var latlng = e.latLng;
                						//var field = myForm.findField('cue_cLatLng'), 
                                        var lat = latlng.lat();
                                        var long = latlng.lng();
            							//field.setValue(lat + ',' + long);
                                        mappanel.getMap().setCenter(latlng, mappanel.zoomLevel);
            						}
            					}
            				}
            			});
            		} 
                    
                    view.add(mappanel);
                    
                    
                    }
                }
            });
        
        
	},
    
    
    
   
});