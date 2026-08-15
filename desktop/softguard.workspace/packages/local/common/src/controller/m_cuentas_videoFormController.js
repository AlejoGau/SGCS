//MIGRADO2024
Ext.define('Common.controller.m_cuentas_videoFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.ProvinciasStore', 'Common.store.VideoAlarmasStore' ],
    models : [ 'GenericRTSPVLCModeModel', 'm_cuentas_video_linksSearchModel', 'm_cuentas_video_linksModel', 'DahuaLinkModel', 'm_cuentas_videoModel', 't_videoidSearchModel', 'm_cuentas_videoSearchModel', 'dguardVideoLinkModel', 'HIKLinkModel', 'SoftguardCodigoAlarmaModel' ],
    views : [ 'GenericRTSPVLCModeLinkFormView', 'GenericRTSPVLCModeLinkGridView', 'DahuaLinkGridView', 'DahuaLinkFormView', 'm_cuentas_videoFormView', 'guardVideolinkGridView', 'dguardLinkFormView', 'HIKLinkFormView', 'HIKLinkGridView' ],
    init : function(config) {
        // genero los eventos
        this.control({
			'cuentavideoformview' : {
				beforerender : this.initview,
                selectedEvents: this.eventsSelected,
                save: this.onSaveClick
			},
			'cuentavideoformview button[action="save"]' : {
				click : this.onSaveClick
			},
            'cuentavideoformview #t_videoid' : {
				change : this.onSelectTvideo
			},
            'cuentavideoformview #videopreview':{
                click: this.onVideoPreviewClick
            },
            '#mapWindow button[action="saveMap"]' : {
                click : this.onMapSaveClick
    		},
            '#mapWindow button[action="buscar"]' : {
            	click : this.onBuscarMapClick
            },
            'cuentavideoformview button[action="map"]' : {
				click : this.onMapClick
			},
            '#mapWindow button[action="saveMap"]' : {
                click : this.onMapSaveClick
    		},
            '#mapWindow button[action="buscar"]' : {
            	click : this.onBuscarMapClick
			},
            'cuentavideoformview #agregarevento' : {
                click : this.onAgregarEventoClick
			},
            'cuentavideoformview #deletevideo' : {
                click : this.onClickDelete
			},
            'cuentavideoformview #cuv_iTodosLosEventos' : {
                change: this.onChangeTodosLosEventos
            }
        });
	}, // cierro init
    
    onChangeTodosLosEventos: function( check, newValue, oldValue, eOpts ) {
        console.log('Check---: '+newValue);
        var view = check.up('cuentavideoformview');
        if(newValue==false){
            view.down('#eventos').setDisabled(false);
            view.down('#agregarevento').setDisabled(false);
        }else{
            view.down('#eventos').setDisabled(true);
            view.down('#agregarevento').setDisabled(true);
            view.down('#eventos').setValue("");
            view.down('#eventoshide').setValue("");
        }
    },      
    
    onAgregarEventoClick: function (btn) {
        var view = btn.up('cuentavideoformview');
        var recForm = view.getForm().getRecord()
        var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                eventSelected: recForm.get('cuv_meventos'),
                caller: view,
                filter: [
                    {
                        property:'cod_nVideo',
                        value: 1
                    }
                ]
                
            }],
            layout: 'fit'
        }).show();
    },
    
    onVideoPreviewClick: function (btn) {
        var view = btn.up('cuentavideoformview');
        var myWindow = Ext.widget('window',{
            title: 'Vista previa',
            height: 240,
            width: 320,
            modal: true, 
            items: [{
                xtype: 'videopreviewview',
                preventHeader: true,
                header: false,
                record: view.searchvideo,
                caller: view
            }],
            layout: 'fit'
        }).show();
    },
    
    eventsSelected: function(records, view) {
          var textarea = view.down('#eventos');
       
        var text = '';
        
        var arrayEventos = [];
        Ext.Array.each(records.items, function(record){
            if (record){
                text = text + record.get('Descripcion')+'\r\n';
                arrayEventos.push(record.get('cod_ccodigo'));
            }
        })
    
        
        textarea.setValue(text);
     
        view.down('#eventoshide').setValue(arrayEventos.join(','))
    },    
    
    onSelectTvideo : function (combo, records) {
        if (!records){
            return false;
        }
        
        var record = records[0];
        
        if (!record){
            record = combo.findRecordByValue(records);
            if (!record)
                return false;
        }
        
        var view = combo.up('cuentavideoformview');
        var config = record.data.tvi_cconfig;

        if (config && config != ""){
            //tiene configuracion de campos muestro el form
            var json = Ext.JSON.decode(config);
            items = json.items;
            Ext.Array.each(items, function(item){
                item.fieldLabel = getLocale(item.fieldLabel);
            })
            var defaultcontainer = view.down('#defaultfields');
            var fieldsetConfigContainer = view.down('#configfields');
            var configcontainer = view.down('#configfieldcontainer');//view.down('#configfields');
            
            
            // borro los items antes de agregar nuevos
            var f;
            while(f = configcontainer.items.first()){
                configcontainer.remove(f, true);
            }
            
            
            if(items && items[0]) {
                 items[0].caller = view;
            }
            //defaultcontainer.hide();
            configcontainer.add(items);
            
            if(configcontainer.down('#vistas') && view.record.get('Id') == 0) {
            	  configcontainer.down('#vistas').setDisabled(true)
            }
            
            view.down('#defaultfields').hide();
    
            fieldsetConfigContainer.show();//configcontainer.show();
            view.linktemplate = json.linktemplate;
            
            // cargo los valores de linkdss en el form
            var linkdss = view.cuentaVideo.get('cuv_clinkdss');
            if (linkdss && linkdss != ''){
                var jsondss = Ext.JSON.decode(linkdss);
                var formdata = jsondss.formdata;
                if (formdata){
                    for (var propertyName in formdata){
                        var field = view.getForm().findField(propertyName);
                        if (field){
                            if(propertyName != 't_videoid' && propertyName != 'cuv_ivideoid') {
                                if(field.itemId == "eventoshide" && Ext.isArray(formdata[propertyName])) {
                                    field.setValue(formdata[propertyName].join(','));
                                } else {
                                    field.setValue(formdata[propertyName]);
                                }
                            }
                        }
                    }
                }
            } else if (view.cuentaVideo.get('cuv_clink')!='') {
                view.down('#defaultfields').show();
            }
        }else {
            view.down('#defaultfields').show();
            view.down('#configfields').hide();
        }
        // manejo especifico para CWU https://basecamp.com/2249105/projects/2749985/todos/431678805#comment_795983490
        if (record.get('tvi_cdescripcion') =='CWU:'){
            view.down('#vervideo').hide();
            view.down('#agregarevento').hide();
            view.down('#eventos').setValue('SmartWatch D41: VideoCall - SVI');
            view.down('#eventoshide').setValue('SVI');
            view.cuentaVideo.set('cuv_meventos', 'SVI')
        } else {
        view.verVideoHidden = true;
        view.videoPreviewHidden = true;            
            if (view.verVideoHidden == false)
                view.down('#vervideo').show();
            view.down('#agregarevento').show();
        }
        
    },
    
	initview : function(view) {
        var controller = this;
       /* if(view.record.get('cuv_iTodosLosEventos')==false){
            view.down('#eventos').setDisabled(false);
            view.down('#agregarevento').setDisabled(false);
        }else{
            view.down('#eventos').setDisabled(true);
            view.down('#agregarevento').setDisabled(true);
            view.down('#eventos').setValue("");
            view.down('#eventoshide').setValue("");
        }        */
        if (!view.cuenta){
            view.cuenta = view.record;
        }
        view.record = null;
        var cue_iid = view.cuenta.get('cue_iid');
        var idvideo = 0;
        
        view.t = this;
        view.verVideoHidden = true;
        view.videoPreviewHidden = true;
        
        /* se anula porque ya hay un boton de preview de video -->videopreview
         **
         *
         * */
        if(view.module) {        
            view.profile = view.module.profile?view.module.profile:view.module.get('profile');
            if(view.module.get('profile') >= 3){
                view.down('#vervideo').show();
                view.verVideoHidden = false;
                        
            }
            if(view.profile < 2) {
                view.down('#save').hide()
            }
        } else {
            view.down('#vervideo').show();
            view.verVideoHidden = false;
        }
        // hay que buscar primero el id del video usando el id de la cuenta
        // como solo quiero el valor del ID uso un ajax y no todo el store
        // cambo el ajax por store, tengo qeu usar el record completo para pasarlo al preview
        
        var storeVideo =Ext.create('Ext.data.Store',{
            model: this.getM_cuentas_videoSearchModelModel(),
            pageSize: 100,
            remoteSort: true,
            remoteFilter: true,
            filters: [{property:'cuv_iidcuenta',value:cue_iid}]
        })
        
        storeVideo.load({callback: function(records) {
            var filterLink = [];
            
            if (records && records.length > 0){
                var row = records[0];
                view.searchvideo = row;
                idvideo = row.get('cuv_idKey'); // revisar
                
                if(row.get('tvi_nLaunch') == 0) {
                    if(view.down('#vervideo')) {
                        view.down('#vervideo').hide();
                    }
                    if(view.down('#videopreview') && (row.get('tvi_iid') == 19 || row.get('tvi_iid') == 22 || row.get('tvi_iid')== 30|| row.get('tvi_iid')== 36)) {
                        view.down('#videopreview').show();
                        
                        view.videoPreviewHidden = false;
                    }
                }
                controller.getM_cuentas_videoModelModel().load(idvideo,{callback:function (record) {
                    controller.setRecord(view,record);
                    view.t_videoid = row.get('tvi_iid'); 
                    controller.popularComboVideoLink(view,record,filterLink, controller)
                }});
            } else {
                var _video = Ext.create(controller.getM_cuentas_videoModelModel(),{
                    cuv_iidcuenta:cue_iid 
                });
                
                controller.setRecord(view,_video);
                filterLink = [{
                    property:'tvi_nLaunch:NOT',
                    value:2
                }];
                
                view.cuentaVideo = _video;
                view.down('#vervideo').hide();
                view.up('videoxcuentapanelview').down('videolinksgridview').setDisabled(true);
                
                controller.popularComboVideoLink(view,_video,filterLink, controller)
            }
        }});
	},
    
    popularComboVideoLink: function (view, record, filterLink,controller) {
        var comboTVideo = view.down('#t_videoid');
        
        // BC 374402728 : Revisar que no rompa nada en otros modulos
        /* Al eliminar, se pinchaba la vista por no reconocer a alink */
        var alink = [];
        
        if(!view.tVideoStore) {
            view.tVideoStore =Ext.create('Ext.data.Store',{
                model: controller.getT_videoidSearchModelModel(),
                sorters:[{
                        property: 'tvi_cnombre',
                        direction: 'ASC'
                }],
                pageSize: 100,
                remoteSort: true,
                remoteFilter: true,
                filters:filterLink
            })
    
            if (record){
                alink = record.get('cuv_clink').split(':');
            }
    
            comboTVideo.bindStore(view.tVideoStore);
        }
        view.tVideoStore.load({callback: function(){
            // setear usando el comienzo del link
             var videorecord;
            if (view.t_videoid && view.t_videoid>0){           
                videorecord = view.tVideoStore.findRecord('Id', view.t_videoid,0,false,false,true);                
            } else {
                videorecord = view.tVideoStore.findRecord('tvi_cdescripcion', alink[0]);
            }
            comboTVideo.select(videorecord);
            comboTVideo.fireEvent('change',comboTVideo,[videorecord]);
            
            var storeKeyModules = KeyModulesStore;//Ext.data.StoreManager.lookup('KeyModulesStore'); 
             if (storeKeyModules.isModuleAvailable('DGUARDBR')){
                var recDguard = view.tVideoStore.findRecord('tvi_cdescripcion', 'DGR:');
                view.tVideoStore.removeAll()
                view.tVideoStore.add(recDguard)
                comboTVideo.hide()
                comboTVideo.setValue(recDguard);
				comboTVideo.fireEvent('change', comboTVideo, [recDguard]);
                view.down('#t_videoidAux').show()
                view.down('#t_videoidAux').setValue(comboTVideo.getRawValue())
            }
        }});
    },
    
    onClickDelete:function (btn) {
        //var view = btn.up('videoxcuentapanelview');
        var view = btn.up('cuentavideoformview');
        var t = this;
        
        this.getM_cuentas_videoModelModel()
        var record = view.cuentaVideo;
        // BC 395951041 : Se agrega cartel de confirmación de eliminación de Video y Zonas.
        Ext.Msg.confirm(getLocale('Eliminar datos de camara'), getLocale('Está a punto de eliminar los datos de la cámara y sus links de zonas especificas. ¿Desea continuar?'), function (btn, value) { 
            if (btn === 'yes') { 
                // dedalo 3/5/2019 no se por que busca en lugar de borrar directo si tengo el record.
                if (record.ObjectTypeName!='Cuenta'){
                    record.destroy({callback: function(record, operation){  
                            // BC 374402728 : Revisar que no rompa nada en otros modulos
                            // Al eliminar, se pinchaba la vista por no reconocer poder obtener post reset con NULL       
                            //view.down('cuentavideoformview').t_videoid = null;
                            //view.down('#t_videoid').setValue(null);
                            
                            view.getForm().reset(true);
                            view.t_videoid = 0;
                            view.down('#t_videoid').setValue(0);
                            view.down('#configfields').hide();
                            view.t.initview(view);
                        }
                    })
                }
            } 
        }, this);
        
        
        /*
        var storeVideo =Ext.create('Ext.data.Store',{
            model: this.getM_cuentas_videoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'cuv_iidCuenta',
                    value: view.record.get('cue_iid')
                }
            ]
        })
       
        storeVideo.load({callback:function (records) {  
            var record = records[0];
            if (record){
                record.destroy({callback: function(record, operation){  
                        
                        // BC 374402728 : Revisar que no rompa nada en otros modulos
                        // Al eliminar, se pinchaba la vista por no reconocer poder obtener post reset con NULL 
                                                
                        //view.down('cuentavideoformview').t_videoid = null;
                        //view.down('#t_videoid').setValue(null);
                        
                        view.getForm().reset(true);
                        view.t_videoid = 0;
                        view.down('#t_videoid').setValue(0);
                        view.down('#configfields').hide();
                        view.t.initview(view);
                    }
                })
            }
        }});
        */
        /*
        // saco la eliminacion de las zonas y lo pasamos a trigger
        var storeVideoLink =Ext.create('Ext.data.Store',{
            model: this.getM_cuentas_video_linksSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:  [
                {
                    property: 'cvl_iidcuenta',
                    value: view.record.get('cue_iid')
                }
            ]  
        })
       
        storeVideoLink.load({callback:function (records) {
            Ext.Array.each(records,function (rec,k) {
                rec.destroy();
            })
            //no se puede hacer en el callback de cada uno... hay que repensar esto.
            
            // BC 374402728 : Revisar que no rompa nada en otros modulos
            // Al eliminar, se pinchaba la vista por no reconocer la tab de la grilla de camaras, la salgo a buscar por Viewport para que funcione en modulos AdminCuenta, VideoLink, WebRemoto 
            var viewport = Ext.getCmp('viewport');
            viewport.down('videolinksgridview').store.load();
        }});
        */
    },
    
    setRecord: function(view,record){
        view.record = record;
        view.cuentaVideo = record;
        
        var comboEventos = view.down('#comboeventos');
        var eventos = record.get('cuv_meventos');
        var aeventos = eventos.split(',');
        
        if(view.up('videoxcuentapanelview') && view.up('videoxcuentapanelview').down('videolinksgridview')) {
            view.up('videoxcuentapanelview').down('videolinksgridview').recordVideoAccount = record
        }
        
        view.loadRecord(record);
        // solo cargo eventos si hay alguno elegido
        if (record.get('cuv_meventos')!=''){
            var combostore =Ext.create('Ext.data.Store',{
                model:this.getSoftguardCodigoAlarmaModelModel(),
                pageSize: 1000,
                remoteFilter: true,
                filters:[
                    {
                    	property:'cod_ccodigo:IN',
                		value:record.get('cuv_meventos')
                	}
                ]
            })
        
            view.down('#eventoshide').setValue(record.get('cuv_meventos'))
        
            var text = '';
            
            view.mask = Ext.create('Ext.LoadMask', view, {
                msg: getLocale("Cargando alarmas")
            }).show();
                
            combostore.load({callback: function(){
                // selecciono los eventos
                var sel = [];
                Ext.Array.each(aeventos, function(evento){
                    sel.push(combostore.findRecord('Codigo', evento));
                });
                
                if(sel[0] != null) {            
                    Ext.Array.each(sel, function(record){
                        if (record)
                        text = text + record.get('Descripcion')+'\r\n';                   
                    })
                    
                    var textarea = view.down('#eventos');     
                    if(textarea) {
                        textarea.setValue(text);
                    }
                }
                view.mask.hide()
                
            }});
        }
        
        
        // seteo los eventos
       /* var sel;
        Ext.Array.each(aeventos, function(evento){
            sel = Ext.Array.push(sel,comboEventos.findRecord('Codigo', evento));
        });
        
        comboEventos.setValue(sel, false);
        comboEventos.fireEvent('select', comboEventos, sel);*/
        
        
        
	},
    
  /*  onEventSelect: function(combo, records, options){
        var form = combo.up('form').getForm();
        var field = form.findField('cuv_meventos');
        var eventos = form.findField('_eventos');
        //var text = eventos.getValue();
        var text = '';
        
        //field.setValue(new String().concat(combo.getValue()));
        
        Ext.Array.each(records, function(record){
            if (record){
                text = text + record.get('Descripcion')+'\r\n';
            }
            
        })
        
        eventos.setValue(text);
    },*/
    onSaveClick : function(button, event, options) {
	    var controller = this;
        var view = button.up('cuentavideoformview')?button.up('cuentavideoformview'):button;
		var myform = view.getForm();
        var win = button.up('window');
		var record = view.record;
        var eventos = myform.findField('cuv_meventos');

        if (view.up('videoxcuentapanelview') && view.up('videoxcuentapanelview').down('videolinksgridview'))
            view.up('videoxcuentapanelview').down('videolinksgridview').setDisabled(false);    
        
        myform.findField('cuv_clink').setValue(link);
        
        myform.updateRecord(record);
        var jsondss = {};
        
        // tomo los valores del form y los cargo en formdata del linkdss
        var linkdss = record.get('cuv_clinkdss');
        
        if(linkdss && linkdss!=""){
            jsondss = Ext.JSON.decode(linkdss);
        }
        
        var data = myform.getValues();
        delete data.cuv_clinkdss; // se hace recursivo despues...
        jsondss.formdata = data;
        
        // calculo el link y lo cargo
        var link = view.linktemplate;

        if (link){
            for(var propertyName in data) {
                link = link.replace('['+propertyName+']', data[propertyName]);
            } 
            
        }
        
        record.set('cuv_clink', link);
        record.set('cuv_meventos', view.down('#eventoshide').getValue())
        record.set('cuv_clinkdss',Ext.JSON.encode(jsondss));
      
        if (myform.isValid()){
            if(view.down('#cuv_iTodosLosEventos').getValue())
                record.set('cuv_iTodosLosEventos',1);
            else
                record.set('cuv_iTodosLosEventos',0);    

            record.modified = record.data;

    		record.save({
    			scope : this,
                persist: true,
                includeNonDirty: true,
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        
                        notify('Los datos se guardaron correctamente');
                        controller.initview(view);
                        //view.down('#vistas').setDisabled(false)

                        var win = view.up('window'); 
                        if(win) {
                            view.caller.fireEvent('objectchanged',view.caller,record);
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
        var view = button.up('cuentavideoformview');
        var myForm = view.getForm();
        var myrecord = myForm.getRecord();
        var searchvideo = view.searchvideo;
        
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
                    				store : 'ProvinciasStore',
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