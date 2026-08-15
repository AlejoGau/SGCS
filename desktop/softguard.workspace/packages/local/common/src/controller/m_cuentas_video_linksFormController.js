//MIGRADO2024
Ext.define('Common.controller.m_cuentas_video_linksFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.parametro_HIKVISIONP2DomainStore', 'Common.store.parametro_EZVIZP2DomainStore', 'Common.store.SoftguardAlarmasSmsStore', 'Common.store.VideoAlarmasStore' ],
    models : [ 'HIKLinkModel', 'm_cuentas_video_linksModel', 't_videoidModel', 't_videoidSearchModel', 'ZonaSearchModel', 'SoftguardCodigoAlarmaModel' ],
    views : [ 'HIKLinkFormView', 'HIKLinkGridView', 'm_cuentas_video_linksFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
			'videoxcuentaformview' : {
				afterrender : this.initview,
                save: this.onSaveClick
			},
			'videoxcuentaformview button[action="save"]' : {
				click : this.onSaveClick
			},
            'videoxcuentaformview #tvideo' : {
				change : this.onSelectTvideo
			},
            'videoxcuentaformview #videopreview':{
                click: this.onVideoPreviewClick
            },
            '#mapWindow button[action="saveMap"]' : {
                click : this.onMapSaveClick
        	},
            '#mapWindow button[action="buscar"]' : {
            	click : this.onBuscarMapClick
            },
            'videoxcuentaformview button[action="map"]' : {
				click : this.onMapClick
			},
            '#mapWindow button[action="saveMap"]' : {
                click : this.onMapSaveClick
    		},
            '#mapWindow button[action="buscar"]' : {
            	click : this.onBuscarMapClick
			},
            'videoxcuentaformview #cuv_iTodosLosEventos' : {
            	change : this.onChangeTodosLosEventos
			}
    				
        });
	}, // cierro init
    
    onChangeTodosLosEventos : function ( check, newValue, oldValue, eOpts ){
      var view = check.up('videoxcuentaformview');
      if(newValue)   
            view.down('#comboeventos').disable();
      else
            view.down('#comboeventos').enable();
    },
    onSelectTvideo : function (combo, records) {
        if (!records){
            return false;
        }
        
        //console.log(arguments)
        var record = records[0];
        
        if (!record){
            record = combo.findRecordByValue(records);
            if (!record)
                return false;
        }
        
        var view = combo.up('videoxcuentaformview');
        var config = record.get('tvi_cconfig');
        if (config && config != ""){
            //tiene configuracion de campos muestro el form
            var json = Ext.JSON.decode(config);
            items = json.items;
            
            Ext.Array.each(items, function(item){
                item.fieldLabel = getLocale(item.fieldLabel);
            })
            var defaultcontainer = view.down('#defaultfields');
            var configcontainer = view.down('#configfields');
            
            // borro los items antes de agregar nuevos
            var f;
            while(f = configcontainer.items.first()){
                configcontainer.remove(f, true);
            }
            
            var tvi_iid = record.get('tvi_iid');
            if(record.get('tvi_nLaunch') == 0) {
                if(view.down('#vervideo')) {
                    view.down('#vervideo').hide();
                }
                if(view.down('#videopreview') && (tvi_iid == 19 || tvi_iid == 22 || tvi_iid == 30)) {
                    view.down('#videopreview').show();
                }
            } else {
                if(view.down('#vervideo')) {
                    view.down('#vervideo').show();
                }
                if(view.down('#videopreview') && (tvi_iid == 19 || tvi_iid == 22 || tvi_iid == 30)) {
                    view.down('#videopreview').hide();
                }
            }
            
            
            if(items && items[0]) {
                 items[0].caller = view;
            }
            configcontainer.add(items);
            
            if(configcontainer.down('#vistas') && view.record.get('Id') == 0) {
        		  configcontainer.down('#vistas').setDisabled(true)
            }
            
            
            view.down('#defaultfields').hide();
    
            configcontainer.show();
            
            view.linktemplate = json.linktemplate;
            
            // cargo los valores de linkdss en el form
            
            var linkdss = view.cuentaVideo.get('cvl_clinkdss');
            if (linkdss && linkdss != ''){
                var jsondss = Ext.JSON.decode(linkdss);
                var formdata = jsondss.formdata;
                if (formdata){
                    for (var propertyName in formdata){
                        if(propertyName != '_cvl_clinkdss') {
                            var field = view.getForm().findField(propertyName);
                            if (field){
                                if(propertyName != 't_videoid') {
                                    field.setValue(formdata[propertyName]);
                                }
                            }
                        }
                        
                    }
                }
            } 
        }else {
            view.down('#defaultfields').show();
            view.down('#configfields').hide();
        }
        // manejo especifico para CWU https://basecamp.com/2249105/projects/2749985/todos/431678805#comment_795983490
        if (record.get('tvi_cdescripcion') =='CWU:'){
            view.down('#vervideo').hide();
        } else {
            view.down('#vervideo').show();
        }
        
    },
    
	initview : function(view) {
        var controller = this;
        var tVideoStore =Ext.create('Ext.data.Store',{
            model: this.getT_videoidSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{"property":"tvi_cnombre","direction":"ASC"}],
        })
        var comboTVideo = view.down('#tvideo');
        comboTVideo.bindStore(tVideoStore);        
        tVideoStore.load({callback:function (records) {
            
            var row = records[0];
            view.searchvideo = row;
            idvideo = row.get('cuv_idKey'); // revisar
                
            if(view.record) {
                view.loadRecord(view.record);
                controller.setRecord(view,view.record);
                
                controller.popularComboVideoLink(view,view.record,[], controller)
            }
        
        }});
        
        var filters = [
                {
                    property: 'zon_ccodigo:LIKENOT',
                    value: 'PAR'
                },{
                    property: 'zon_ccodigo:NOT',
                    value: '0'
                },{
                    property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                    value: ''
                }
            ]
        
        if(view.cuenta) {
            var cuenta = view.cuenta;
            view.record.set('cvl_iidcuenta',cuenta.get('cue_iid'))
            filters.push({
                    property: 'zon_iidcuenta',
                    value:cuenta.get('cue_iid')
                })
            
            
            
        } else {
            view.down('#zonadescripcion').show();
            view.down('#zonadescripcion').setValue(view.record.get('zon_cdescripcion'));
            view.down('#cvl_czona').hide();
            
        }
      
         //Se comenta por pedido de esta tarea https://softguard.atlassian.net/browse/DSS-527
         //Federico V. descomento a pedido de la tarea DS-297 ya que NO debe permitir que se use la misma zona 
        if(view.codZonas){
            var zonasOcupadas= view.codZonas.split(",");
            var i = 0;
            zonasOcupadas.forEach(element => {
                filters.push({
                    property: 'zon_ccodigo:NOT',
                    value: zonasOcupadas[i]
                })
                i++;
                });
        }
        
        // cargo las zonas
        var zonaStore =Ext.create('Ext.data.Store',{
            model: this.getZonaSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: filters
        })
        var cvl_czona = view.down('#cvl_czona');
        cvl_czona.bindStore(zonaStore);        
        zonaStore.load();
      
    
        if(view.alarmas) {
            var comboAlarmas = view.down('#comboeventos');
            var storeComboAlarmas =Ext.create('Ext.data.Store',{
                model: this.getSoftguardCodigoAlarmaModelModel(),
                pageSize: 500,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                        {
                            property:'cod_ccodigo:IN',
                            value: view.alarmas
                        }
                    ]
            })
            comboAlarmas.bindStore(storeComboAlarmas);
            storeComboAlarmas.load();
            
        }
	},
    
    
    popularComboVideoLink: function (view, record, filterLink,controller) {
         var tVideoStore =Ext.create('Ext.data.Store',{
                    model: controller.getT_videoidSearchModelModel(),
                    sorters:[{
                         property: 'tvi_cnombre',
                         direction: 'ASC'
                    }],
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    filters:filterLink
                })
        
                
                /**
                 * BC 385551403 : JUAN, se modifica la manera de cargar el template al momento de editar una video camara.
                 * En vez de hacer split del video link guardado, vamos por ID de t_videoID
                 * CODIGO VIEJO : var alink = record.get('cvl_clink').split(':');
                 */
                var alink = record.get('tvi_iid');
                
                var comboTVideo = view.down('#tvideo');
                comboTVideo.bindStore(tVideoStore);  
                tVideoStore.load({callback: function(){
                    // setear usando el comienzo del link
                     var videorecord;
                    if (view.t_videoid && view.t_videoid>0){           
                        videorecord = tVideoStore.findRecord('Id', view.t_videoid,0,false,false,true);                
                    } else {
                        
                        /**
                         * BC 385551403 : Complemento a la lectura de la variable
                         * CODIGO VIEJO : videorecord = tVideoStore.findRecord('tvi_cdescripcion', alink[0]);
                         */
                         videorecord = tVideoStore.findRecord('tvi_iid', alink);
                    }
                    
                    
                    comboTVideo.select(videorecord);
                    comboTVideo.fireEvent('select',comboTVideo,[videorecord]);
                    
                    
                    var storeKeyModules = KeyModulesStore;//Ext.data.StoreManager.lookup('KeyModulesStore'); 
                     if (storeKeyModules.isModuleAvailable('DGUARDBR')){
                        
                        
                        var recDguard = tVideoStore.findRecord('tvi_cdescripcion', 'DGR:');
                        tVideoStore.removeAll()
                        tVideoStore.add(recDguard)
                        comboTVideo.hide()
                        comboTVideo.setValue(recDguard);
        				comboTVideo.fireEvent('change', comboTVideo, [recDguard]);
                        view.down('#t_videoidAux').show()
                        view.down('#t_videoidAux').setValue(comboTVideo.getRawValue())
                        
                    }
                }});
    },
    setRecord: function(view,record){
        view.cuentaVideo = record;
        var controler = this;
        var comboEventos = view.down('#comboeventos');
      
        
     /*   var tVideoStore =Ext.create('Ext.data.Store',{
            model: this.getT_videoidSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        
       
        // tomo el tipo de video
        var alink = record.get('cvl_clink').split(':');
        var comboTVideo = view.down('#tvideo');
        tVideoStore.load({callback: function(records){
            var videorecord = tVideoStore.findRecord('tvi_cdescripcion', alink[0], false,true);
            comboTVideo.select(videorecord);
            comboTVideo.fireEvent('select',comboTVideo,[videorecord]);*/
            
            /*
            if(videorecord.get('tvi_nLaunch') == 0) {
                if(view.down('#vervideo')) {
                    view.down('#vervideo').hide();
                }
                if(view.down('#videopreview') && (videorecord.get('tvi_iid') == 19 || videorecord.get('tvi_iid') == 22 || videorecord.get('tvi_iid')== 30)) {
                    view.down('#videopreview').show();
                }
            }
            */
            
       /* }})*/
    },
    
    
    onVideoPreviewClick: function (btn) {
        var view = btn.up('videoxcuentaformview');
        var myWindow = Ext.widget('window',{
            title: 'Vista previa',
            height: 240,
            width: 320,
            modal: true, 
            items: [{
                xtype: 'videopreviewview',
                preventHeader: true,
                header: false,
                record: view.record,
                caller: view
            }],
            layout: 'fit'
        }).show();
    },
	onSaveClick : function(button, event, options) {
        var view = button.up('videoxcuentaformview')?button.up('videoxcuentaformview'):button;
        var myform = view.getForm();
        var win = button.up('window');
		var record = myform.getRecord();
        
        if(!view.down('#cvl_czona').getValue()) {
            notify('Debe seleccionar una zona.')
            return false;
        }
        // calculo el link y lo cargo
        var link = view.linktemplate;
        var data = myform.getValues();
        delete data.cuv_clinkdss; // se hace recursivo despues...
        if (link){
            for(var propertyName in data) {
                link = link.replace('['+propertyName+']', data[propertyName]);
            } 
            
        }
        myform.findField('cvl_clink').setValue(link);
        
        var model = this.getM_cuentas_video_linksModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
		myform.updateRecord(record);
        if (view.down('#cuv_iTodosLosEventos').checked )
            record.set('cuv_iTodosLosEventos',1);
        else
            record.set('cuv_iTodosLosEventos',0);        
        var jsondss = {};
        
        // tomo los valores del form y los cargo en formdata del linkdss
        var linkdss = record.get('cvl_clinkdss');
        
        if(linkdss && linkdss!=""){
            jsondss = Ext.JSON.decode(linkdss);
        }
        
        jsondss.formdata = data;
        
        record.set('cvl_clinkdss',Ext.JSON.encode(jsondss));
        record.set('cvl_cLinkDSS',Ext.JSON.encode(jsondss));
        
        
        var model = this.getM_cuentas_video_linksModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
        if (myform.isValid()){
            record.set('cvl_czona', Ext.String.trim(record.get('cvl_czona')));
            record.set('cvl_ivideoid', view.down('#tvideo').getValue());

            record.modified = record.data;

    		record.save({
    			scope : this,
               
                view: view,
    			success : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        if(!view.down('#vistas')) {
                            //win.close();
                        } else {
                            view.down('#vistas').setDisabled(false)
                        }
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }
	},
    
    onMapClick : function(button, event, options) {
        var view = button.up('videoxcuentaformview');
        var myForm = view.getForm();
        var myrecord = myForm.getRecord();
        var searchvideo = view.record;
        
        var mylat = view.down('#latitud').getValue();
        var myLong = view.down('#longitud').getValue();
        
        if (mylat == '' || mylat == '0' || mylat == '0.0'){
            var latlng = searchvideo.get('cue_cLatLng');
            if (latlng){
                var arrLatLng = latlng.split(',');
                if(arrLatLng.length == 2 && arrLatLng[0] != '' && arrLatLng[0]!= '0.0'){
                    mylat = arrLatLng[0];
                    myLong = arrLatLng[1];
                }
            }
            
            
        }
        
        console.log(mylat,myLong)
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
						title : 'Punto',
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
		} else {
			Ext.apply(mappanel, {
                zoomLevel : 14,
    			setCenter : {
                    geoCodeAddr: par_NOMBREPAIS,
					marker : {
						title : 'Punto',
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
		var win = Ext.create('Ext.Window', {
			layout: {
                type: 'vbox',
                align: 'stretch'
            },
			title : 'Mapa',
			closeAction : 'hide',
            itemId: 'mapWindow',
			width : 550,
			height : 550,
			border : true,
            modal: true,
            view: view,
            tbar:[
                { text: 'Aceptar' , action: 'saveMap'}                
            ],
			items : [
                {
                  xtype: 'form',
                  itemId: 'mapAddress',
                  width: '100%',
                  
                  items:[
                      {
                          xtype:'fieldset',
                          title: 'Buscador',
                          collapsible: true,
                          collapsed: true,
                          items: [
                              {
                                	xtype : 'textfield',
                    				fieldLabel : 'Calle',
                                    //value:  myForm.findField('cue_ccalle').getValue(),
                    				name : "calle"
                    
                    			}, {
                    				xtype : 'textfield',
                    				fieldLabel : 'Ciudad',
                                    //value:  myForm.findField('cue_clocalidad').getValue(),
                    				name : "localidad"
                    
                    			}, {
                    				xtype : 'combo',
                    				fieldLabel : 'Provincia / Estado',
                    				store : 'Common.store.ProvinciasStore',
                    				name : "provincia",
                                   // value:  myForm.findField('cue_cprovincia').getValue(),
                    				displayField : 'pro_cdescripcion',
                                    editable: true,
                                    autoSelect: false,
                                    forceSelection: false,
                                    itemId: 'comboProvincia',
                    				valueField : 'Codigo'
                    			},
                                {xtype:'button', text: 'Buscar' , action: 'buscar'}
                            ]
                      }
                  ]        
                },
                mappanel
            ]
		});
		win.show();
	},
    
    onBuscarMapClick: function(button, event, options){
        var win = button.up('#mapWindow');
        var view = win.view;
        var form = win.down('form').getForm();
        var map = win.down('gmappanel6');
        var pais = form.findField('provincia').getRawValue();
        var calle = form.findField('calle').getValue();
        var localidad = form.findField('localidad').getValue();
        var myAddr = calle + ' ,' + localidad + ' ,' + pais ;
        map.geoCodeLookup(myAddr, map.setCenter.marker, true, true, map.setCenter.listeners);
    },
    
     onMapSaveClick: function(button, event, options){
        var win = button.up('#mapWindow');
        var view = win.view;      
        var map = win.down('gmappanel6');
        var latlng = map.getCenterLatLng();
    
        
        lat = latlng.lat, 
        long = latlng.lng;
        view.down('#latitud').setValue(lat);
        view.down('#longitud').setValue(long);
        
        win.close();
        notify('Posición establecida. Debe guardar.');
    }
   
});