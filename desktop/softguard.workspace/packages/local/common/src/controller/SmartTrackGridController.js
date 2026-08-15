//MIGRADO2024
Ext.define('Common.controller.SmartTrackGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartTrackModel', 'SmartTrackSearchModel', 'CuentaSearchModel', 'KeyModulesModel', 'SoftguardCuentaModel', 'SoftguardTelefonoModel', 'SoftguardUsuarioModel', 'TelefonoSearchModel', 'SmartTrackAsignarCuentaModel' ],
    views : [ 'SmartTrackGridView' ],
    init : function(config) {
        // genero los eventos
		this.control(
            {
			'smarttrackgridview' : {
				afterrender : this.initView,
                cuentaselected: this.onCuentaChanged,
                objectedit: this.onObjectEdit,
                cuentachanged: this.onCuentaChanged,
                cuentanew: this.onCuentaNew,
                mostrarEventos: this.onMostrarEventos,
                smarttrackchange: this.onSmartTrackChange,
                itemdblclick: this.onItemClick,
                selectionchange : this.onSelectionChange
			},
        	'smarttrackpendinggridview' : {              
                smarttrackchange: this.onSmartTrackChange
			},
            'smarttrackgridview button[action=search]': {
                click: this.onSearchClick
            },
            'smarttrackgridview button[action=getall]': {
                click: this.onGetAllClick
            },
           
            'smarttrackgridview button[action=sacarcuenta]': {
                click: this.onSacarCuentaClick
            },
            'smarttrackgridview button[action=configurar]': {
                click: this.onConfigurarClick
            },
            'smarttrackgridview button[action=groupAlarmas]' : {
    			click : this.onGroupAlarmasClick
			},
           
            'smarttrackgridview button[action=nuevo]' : {
            	click : this.onNewClick
			},
            'smarttrackgridview #dispositivos-todos' : {
                click : this.onDispositivosTodosClick
        	} ,
            'smarttrackgridview #dispositivos-seleccionados' : {
                click : this.onDispositivosSeleccionadosClick
			} ,
            'smarttrackgridview #dispositivos-filtro' : {
                click : this.onDispositivosFiltroClick
			}, 
            'smarttrackgridview #dispersoVigicontrol' : {
                click : this.onSubfixFiltroClick
            },
            'smarttrackgridview #viejasVigicontrol' : {
                click : this.onSubfixFiltroClick
            },
            'smarttrackgridview #actualesVigicontrol' : {
                click : this.onSubfixFiltroClick
            },
		});
	},
    
    
    onMarkersGeoJsonChange: function(view,ultimos){
        if(view.caller && view.caller.down('#loadingmap')) {
            var loading = view.caller.down('#loadingmap');
            loading.show();
        }
        //cuando esta definido ultimo en true, intenta enviar la ultima fecha de load
        
        var controller = this;
        if (view){
        //28/06/2024 Daniel O. Medina https://softguard.atlassian.net/browse/DSS-970
            var mapguardgpsview = view.up('mapguardgpsview');
            if(mapguardgpsview){
                mapguardgpsview.fireEvent('stopTask',mapguardgpsview,'smarttrackgridview');
            }      
            //-----------------------------------------------------                  
            var gmappanel = view.GMAPPANEL//view.down('#googlemap'); 

            mapguardeventosview = gmappanel.up('mapguardeventosview');
            //tipoCentrado = mapguardeventosview.down('#tipoCentrado');
                    
            if(gmappanel.smarttrack) {
                //cuando gmappanel.dispositivos esta en true aplico filtro de ultima llamada para traer solo los registros que se actualizaron
                var urlParametroUltimaCarga = '';
                if(ultimos) { 
                    //tomo fecha y armao string para filtro
                    if(view.ultimaCarga) {
                        urlParametroUltimaCarga = '&ultimaCarga='+Ext.Date.format(view.ultimaCarga,'Y-m-d g:i')
                    }
                    view.ultimaCarga = new Date();
                }
                
                //Ext.Ajax.abort(view.geojsonAjax);
                if(Ext.Ajax.isLoading(view.geojsonAjax)) {
                    return false;
                }
                view.geojsonAjax = Ext.Ajax.request({
                     url: view.urlGeoJson+urlParametroUltimaCarga,                
                     success: function(response, opts) {
                         var obj = Ext.decode(response.responseText);
                         
                        if(!ultimos) {  
                            //elimino los features
                            gmappanel.smarttrack.forEach(function (feature) {
                                gmappanel.smarttrack.remove(feature)
                            })
                        } else {
                            //elimino solo los features que llegan
                            for(var i in obj.features) {
                                gmappanel.smarttrack.forEach(function (feature) {
                                    if(feature.getProperty("cue_iid") == obj.features[i].properties.cue_iid) {
                                        gmappanel.smarttrack.remove(feature)
                                    }
                                })
                            }
                        }
                        gmappanel.smarttrack.setMap( gmappanel.getMap() );//28/06/2024 Daniel O. Medina https://softguard.atlassian.net/browse/DSS-970
                        gmappanel.smarttrack.addGeoJson(obj)
                        
                        gmappanel.fireEvent('center', gmappanel)
                        
                        if(loading) {
                            loading.hide();
                        }
                     }
                })
            } else {
                gmappanel.smarttrack = new google.maps.Data();
                gmappanel.smarttrack.loadGeoJson(view.urlGeoJson,null, function () {
                    
                    if(loading) {
                        loading.hide();
                    }
                });  

                gmappanel.smarttrack.setStyle({visible: true});
                gmappanel.smarttrack.setStyle(function(feature) {
                    return {
                        icon: feature.getProperty('icon'),
                        title: feature.getProperty('title')
                    };
                });

                gmappanel.smarttrack.setMap(gmappanel.getMap());
                gmappanel.smarttrack.addListener('mouseover', function(event) {
                    var address = '';
                    var infoRecord = getProperties(event.feature);
                    
                    if(gmappanel.infowindowOpened) {
                        gmappanel.infowindowOpened.close();                        
                    }
                    
                    gmappanel.infowindowOpened = new google.maps.InfoWindow({
                        pixelOffset: new google.maps.Size(0, -60)
                    }); 
                    
                    gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, address))
                    
                    //busco la direccion
                    var geocoder = gmappanel.getGeocoder();
                    geocoder.geocode({
                        location: event.feature.getGeometry().get()
                        }, function(result, status){
                            
                            if (status == 'OK'){
                                address = result[0].formatted_address;
                                
                                //actualizo contenido
                                gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, address))
                            }   else {
                                gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, ''))
                            }        
                        });
                        
                    Ext.Ajax.request({
                         url: '/rest/search/smarttrackcuenta',
                         method:'GET',
                         params: {filter:Ext.encode([{property:'cue_iid', value:event.feature.getProperty("cue_iid")},{property:'Telefono', value:event.feature.getProperty("Telefono")}])},
                         success: function(response, opts) {
                             var obj = Ext.decode(response.responseText);
                             obj.rows[0].icon = infoRecord.icon
                             infoRecord = obj.rows[0]
                             gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(obj.rows[0], address))
                         }
                    })
  
                    gmappanel.infowindowOpened.setPosition(event.feature.getGeometry().get());
                    gmappanel.infowindowOpened.open(gmappanel.getMap());
                });
               
                gmappanel.smarttrack.addListener('mouseout', function(event) {
                    gmappanel.infowindowOpened.close();
                });
                
                gmappanel.smarttrack.addListener('click', function(event) {
                    var tabpanel = view.caller.up('tabpanel')
            
                    Ext.Ajax.request({
                         url: '/rest/search/smarttrackcuenta',
                         method:'GET',
                         params: {filter:Ext.encode([{property:'cue_iid', value:event.feature.getProperty("cue_iid")},{property:'Telefono', value:event.feature.getProperty("Telefono")}])},
                         success: function(response, opts) {
                            var obj = Ext.decode(response.responseText); 
                            obj.rows[0].icon = event.feature.getProperty("icon")
                            infoRecord = obj.rows[0]
                            
                            var smartrack = controller.getSmartTrackSearchModelModel().create(Ext.clone(infoRecord))
                
                            if(view.sendSelectionToEvent) {
                                var point = new google.maps.LatLng(smartrack.get('gps_rLatitud'),smartrack.get('gps_rLongitud'));                    
                                smartrack.position = point
                                view.caller.fireEvent(view.sendSelectionToEvent,smartrack,view.caller)
                            } else {
                                var title = getLocale('SmartTrack:')+" "+event.feature.getProperty('cue_clinea')+"-"+event.feature.getProperty('cue_ncuenta');
                                var tab = Ext.widget('vigicontrollgpsfullview',{
                                    title:title ,
                                    record: smartrack,
                                    smartrack: smartrack,
                                    extraInfo: infoRecord,
                                    closable : true,
                                    translate:false,
                                    forceCuenta: true
                                });
                                
                                tabpanel.add(tab)
                                tabpanel.setActiveTab(tab);
                            }
                         }
                    })
                });
            }
        }
    },
    
    
    getMarkerInfoWindowHtmlSmartTrack: function(marker, address){
        if(marker.Telefono) {
            var cargando = ''; 
        } else {
            var cargando = '<span class="x-mask-msg-text"></span>';
        }
        var html = '\
            <div style="width:280px;">\
            <table>\
            <tr>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="'+marker.icon+'" style="float:left; margin:0 5px 0 0"/>\
                </td>\
                <td  style="padding:5px 0 0 5px; font-size:13px; ">\
                    <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
             <tr>\
                <td colspan="2" style="padding:5px; font-size:13px;">\
                   <hr />\
                </td>\
            </tr>\
            ';
       
        html += '\
        <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbltelefono}:</span><span> {telefono}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblusuario}:</span><span> {usuario}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneSO}:</span><span> {phoneSO}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneModel}:</span><span> {phoneModel}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneBrand}:</span><span> {phoneBrand}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblgps_tfechahora}:</span><span> {gps_tfechahora}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbldireccionactual}:</span><span> {direccionActual}</span><br/>\
                        </td>\
                    </tr>\
                    ';
                    
        html += '</table>';
        html = html.replace(/\{direccionActual\}/, address?address:cargando);
        html = html.replace(/\{nombre\}/, marker?marker.cue_clinea+'-'+marker.cue_ncuenta+' <br/> '+(marker.cue_cnombre?marker.cue_cnombre:cargando):cargando);
        html = html.replace(/\{localidad\}/, marker.cue_clocalidad?marker.cue_clocalidad:cargando);
        html = html.replace(/\{telefono\}/, marker.Telefono?marker.Telefono:cargando);
        html = html.replace(/\{phoneSO\}/, marker.Tipo?marker.Tipo:cargando);
        html = html.replace(/\{usuario\}/, marker.Nombre?marker.Nombre:cargando);
        html = html.replace(/\{phoneBrand\}/, marker.Marca?marker.Marca:cargando);
        html = html.replace(/\{phoneModel\}/, marker.Modelo?marker.Modelo:cargando);
        html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'));
        html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'));
        html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'));
        html = html.replace(/\{lblusuario\}/, getLocale('Usuario'));
        html = html.replace(/\{lblphoneSO\}/, getLocale('S.O.'));
        html = html.replace(/\{lblphoneModel\}/, getLocale('Modelo'));
        html = html.replace(/\{lblphoneBrand\}/, getLocale('Marca'));
        html = html.replace(/\{lbldireccionactual\}/, getLocale('Direccion actual'));
        html = html.replace(/\{gps_tfechahora\}/, marker.gps_tfechahora?Ext.Date.format(new Date(marker.gps_tfechahora), 'd-m-Y H:i:s'):cargando);
        html = html.replace(/\{lblgps_tfechahora\}/, getLocale('Fecha de posicion'));
        return html;
    },
    
    armoUrlGeoJson : function (view) {
        var controller = this
        var continueLoad = true;
        if(view.GMAPPANEL) {
            //armo url para geojson           
            var urlgeojson = '/handler/SmartTrackGeoJson';
            urlgeojson += '?token='+Ext.util.Cookies.get('OAuth_Token');  //909F1CAC-AA57-40F7-A782-DCCBFE9E4E99 tengo que poner un token fijo para probar localmente   
            
            if(view.filtroDispositivos == 'seleccionados') {
                var ids = []            
                Ext.Array.each(view.getSelectionModel().getSelection(),function (record) {
                    ids.push(record.get('Id'))
                })
                
               /* urlgeojson += '&filter='+Ext.encode([{
                        property:'Id:ININT',
                        value:ids.join(',')
                    }]);*/
                    
                    var filters = [{
                            property: 'Id:ININT',
                            value: ids.join(',')
                        }];
                    
                if(ids.length>0) {
                    
                } else {
                   // notify('Debe seleccionar algun smartpanics para continuar.')
                    continueLoad = false;
                    if(view.GMAPPANEL.smarttrack) {
                        view.GMAPPANEL.smarttrack.forEach(function (feature) {
                            view.GMAPPANEL.smarttrack.remove(feature)
                        })
                    }
                }
                 urlgeojson += '&filter='+Ext.encode(filters);
                
            } else if(view.filtroDispositivos == 'filtro') {
                var filters = Ext.clone(view.filters);
                var queryType = view.down('#queryType').getValue();
                var query = view.down('#query').getValue();
                var filters = [{
                            property: 'cue_ncuenta:NOT',
                            value: ''
                        }];
                
                var queryType = view.down('#queryType').getValue();
                var query = view.down('#query').getValue();
                
                if (queryType == 'imei')
                    filters.push({ 
                        property: 'Imei:LIKE',
                        value: query,
                        id: 'search'
                    });
                    
                if (queryType == 'telefono')
                    filters.push({ 
                        property: 'Telefono:LIKE',
                        value: query,
                        id: 'search'
                    });
                    
                if (queryType == 'nombre')
                    filters.push({ 
                        property: 'cue_cnombre:LIKE',
                        value: query,
                        id: 'search'
                    });
                    
                 if (queryType == 'usuario')
                    filters.push({ 
                        property: 'Nombre:LIKE',
                        value: query,
                        id: 'search'
                    });
                    
                if (queryType == 'cuenta')
                    filters = [{ 
                        property: 'cue_ncuenta:LIKE',
                        value: query,
                        id: 'search'
                    }];
                    
                if (queryType == 'dealer')
                    filters = [{ 
                        property: 'cue_clinea:LIKE',
                        value: query,
                        id: 'search'
                    }];
                    
          
                    
                var states = []
                if(view.down('#actualesVigicontrol') && view.down('#actualesVigicontrol').pressed) {
                    states.push('current')
                }
                if(view.down('#dispersoVigicontrol') && view.down('#dispersoVigicontrol').pressed) {
                    states.push('disper')
                }
                if(view.down('#viejasVigicontrol') && view.down('#viejasVigicontrol').pressed) {
                    states.push('old')
                }
    
                filters.push({ 
                    property: 'state:IN',
                    value: states.join(','),
                    id: 'state'
                });
                
                urlgeojson += '&filter='+Ext.encode(filters);  
            }
            var dateNow = new Date()            
                            
            urlgeojson += "&_dc="+dateNow.getTime();
            
            //console.log(urlgeojson,view.GMAPPANEL)
            view.urlGeoJson = urlgeojson
            
            //esto es para frenar el load
            if(continueLoad) {
                controller.onMarkersGeoJsonChange(view,false)
            }
        }
    },
    
    
    onDispositivosTodosClick: function (btn) {
        var view = btn.up('smarttrackgridview')
        view.down('#toolbarfiltro').setDisabled(true);
        view.filtroDispositivos = 'todos'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },
    onDispositivosSeleccionadosClick: function (btn) {
        var view = btn.up('smarttrackgridview')
        
        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'seleccionados'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },
    
    onDispositivosFiltroClick: function (btn) {
        var view = btn.up('smarttrackgridview')
        
        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'filtro'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },
    onSubfixFiltroClick: function (btn) {
        var view = btn.up('smarttrackgridview')
        
        this.onSearchClick(btn)
        this.armoUrlGeoJson(view)
    },
	initView : function(view) {
        var controller = this;
        view.licenseViolation = false;
        console.log(view.itemId)
        var isAdmin = view.isAdmin;
        
        if (isAdmin){
            view.down('#toolbardisplayfield').show();
            view.down('#btnconfig') && view.down('#btnconfig').show();
        }
            
        
        view.filters = [{
            property: 'cue_ncuenta:NOT',
            value: ''
        }];
        var toolbar = view.down('toolbar');
        
        if(view.filterTipo) {
            view.filters.push({
                property: 'tip_nTipo',
                id: 'tip_nTipo',
                value: view.filterTipo  
            }); 
        }
        if(view.filterAppType){
            view.filters.push({
                property: 'AppType',
                id: 'AppType',
                value: view.filterAppType
            });
        }
                
        if(!view.pageSize) {
            view.pageSize = 50;
        }
        var filters = Ext.clone(view.filters)
           
        var states = []
        if(view.down('#actualesVigicontrol') && view.down('#actualesVigicontrol').pressed) {
            states.push('current')
        }
        if(view.down('#dispersoVigicontrol') && view.down('#dispersoVigicontrol').pressed) {
            states.push('disper')
        }
        if(view.down('#viejasVigicontrol') && view.down('#viejasVigicontrol').pressed) {
            states.push('old')
        }
        /*
        filters.push({ 
            property: 'state:IN',
            value: states.join(','),
            id: 'state'
        });
        */
        var store =Ext.create('Ext.data.Store',{
            model: this.getSmartTrackSearchModelModel(),
            pageSize: view.pageSize,
            remoteSort: true,
            remoteFilter: true,
            filters: filters,
            autoDestroy: true
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        
        // cambiar por store guardado
        var storeKey =Ext.create('Ext.data.Store',{
            model: KeyModulesStore//this.getKeyModulesModelModel()
        })
        var t = this;
        KeyModulesStore.getData().items.forEach(function (record) {
            if (record.get('Module') == 'VigiControl') {
                view.QtyUsers = record.get('QuantityOfUsers'); 
                var query = view.down('#query').getValue();
                if (query != ''){
                    controller.onSearchClick(view.down('#searchBtn'));
                }else{
                    store.load();   
                }
            }                   
        });
        /*storeKey.load({callback: function () {
            storeKey.each(function(record)  {    
                   if( record.get('Module') == 'VigiControl') {
                        view.QtyUsers = record.get('QuantityOfUsers'); 
                        var query = view.down('#query').getValue();
                        if (query != ''){
                            controller.onSearchClick(view.down('#searchBtn'));
                        }else{
                            store.load();   
                        }
                                                
                   }                   
            }, this); 
            t.tieneUsuariosDisponibles(view); 
        }}); */ 
        
        

        //inico con el boton de selccionados
        view.filtroDispositivos = 'seleccionados'
        if(view.GMAPPANEL) {
            console.log('Inicia task vigicontrol')
            view.task = Ext.TaskManager.start({
                args: [view],
                run: this.armoUrlGeoJson,
                scope: controller,
                interval: 5000
            });
        }
	},
    
    onItemClick: function(view,record,item,index,e,options){   
        var gridview = view.up('smarttrackgridview');
        //no deja editar
        if(gridview.noEditDblClick) {
            return false;
        }
        
        //var gridview = view.up('viewport').down('smartpanicgridview');
        
      /* var model = this.getSmartPanicModelModel();
         var recordx = model.create({
            'Telefono': record.get('Telefono'),
            'Imei': record.get('Imei'),
            'Modelo': record.get('Modelo'),
            'Marca': record.get('Marca'),
            'Version': record.get('Version'),
            'Tipo': record.get('Tipo'),
            'CuentaId': record.get('CuentaId'),
            'cue_cnombre': record.get('cue_cnombre'),
            'Nombre': record.get('Nombre')
         
         });*/
         
                 
        var spform = Ext.widget('smarttrackformview',{
            caller: gridview,
           // cuenta: cuenta,
            record: record,
            
            metodo: 'edit'
        });
        console.log('Nombre de módulo: '+this.application._nameModule);
        var title= 'Modificar SmartTrack';
        if(this.application._nameModule=='CleanApp')
            title = 'Modificar CleanApp';
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
    		title : title,
			closeAction : 'destroy',
            itemId: 'cuentaNew',
			width : 450,
			height : 450,
			border : true,
            modal: true,
            view: gridview,
			items : [spform]
		});
		win.show();
    },
    
    
    onSmartTrackChange: function (record,view) {
        var gridview = view.up('viewport').down('smarttrackgridview');
        gridview.down('pagingtoolbar').doRefresh();
        this.tieneUsuariosDisponibles(gridview);
    },
    
    onNewClick : function(button, event, options) {
        var view =button.up('smarttrackgridview');
        this.tieneUsuariosDisponibles(view, function () {
            var win = Ext.create('Ext.Window', {
                layout: 'fit',
                title : 'Seleccione una Cuenta',
                closeAction : 'destroy',
                itemId: 'cuentaWin',
                width : 750,
                height : 550,
                border : true,
                modal: true,
                view : view,
                items : [
                    {
                        xtype: 'cuentahelperview',
                        caller: view,
                        metodo: 'new',
                        filterTipo: view.createTipo
                    }
                ]
            });
            win.show();                
        });
	},
    onMostrarEventos: function(record,view){
        var dispositivo = record;
        if (view.licenseViolation){
            notifyError('Hay mas dispositivos asociados que los permitidos!')
            return false
        }
        var id = record.get('CuentaId');
        var model = this.getSoftguardCuentaModelModel();
        var panel = view.up('#center');
        model.load(id, {
            callback: function (record) {
                var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre') + ' ('+getLocale('Eventos')+')';
                title = title.replace(',','');
               // me fijo si el tab existe, si es nuevo lo creo
                var mytab = panel.down('[title="' + title + '"]');
                if (!mytab) {
                    var newTab = Ext.widget('recepcionview', {
                        tabConfig: {translate: false},
            			title : title,
                        Origenes:'',
                        rec_cdll: '',
                        record: record,
                        gps_cIMEI: dispositivo.get('Imei'),
                        closable: true,
                        closeAction: 'destroy',
            		});
                    panel.add(newTab);
                    panel.setActiveTab(newTab);
        		}
        		// el existe, lo activo
        		else {
                    mytab.show();
        		} 
                
            }
        });
    },
    
    onGroupAlarmasClick: function(button, event, options){
        var view = button.up('smarttrackgridview');      
        var store = view.store;
        
        var grouping = view.getView().features[0];
        if (button.pressed){
            grouping.enable();
            store.group('cue_cnombre','ASC');
        }else {
            grouping.disable();
            store.clearGrouping();
        }
         view.up('#vigicontrolmenu').show();
    },
    
    generarEventoDesasignarVC : function(record){
        var params = {};
        params.idCta = record.get('cue_iid');
        params.cAlarma = '_VD';
        params.lat = 1;
        params.lng = 1;
        params.imei = record.get('Imei');
        params.fecha = new Date(Ext.Date.format(new Date(), 'Y/m/d')+' '+Ext.Date.format(new Date(), 'H:i:s'))
        params.cUser = _UserData.UserId;
        params.cObservaciones = 'Nombre: '+record.get('Nombre')+' | '+
                                'Tel.: '+record.get('Telefono')+' | '+
                                'IMEI: '+ record.get('Imei');
         Ext.Ajax.request({
            url: '/rest/search/AlarmaGenerar',
            method: 'GET',
            params: params,
            success: function(resp,operation) {
            notify('El evento se generó con éxito');
            
            }
        });       
    },
    onSacarCuentaClick : function(button, event, options) {
        var view =button.up('smarttrackgridview');
        var selection = view.getSelectionModel().getSelection();
        var model = this.getSmartTrackModelModel();
        var t = this;
        var recordOrigen;
        Ext.Array.each(selection,function(record, index, arr){
            recordOrigen = record;
            record.setConfig({
                proxy: model.getProxy()
            });
           
            record.set('CuentaId', 0);
            
            record.save({success: function(){
                //console.log(index, arr.length-1);
                t.generarEventoDesasignarVC(recordOrigen);
                if (index == (arr.length-1)){
                    view.fireEvent('smarttrackchange',model,view);
                }
                
            }});
        });
	},
    
    onConfigurarClick : function(button, event, options) {
        var view =button.up('smarttrackgridview');
        var panel = button.up('#center');
        var title = 'Configuración del servicio';
        var mytab = panel.down('[title="' + title + '"]');
        var controller = this;
        var applicationId = 52;//112
        var apptype = 'VIGICONTROL';//'VIGICONTROL';//CLEANAPP
        if (controller.getApplication()._nameModule == 'CleanApp'){
            applicationId = 112;
            apptype = 'CLEANAPP';
        }
        
        if (!mytab) {
            var newTab = Ext.widget('smarttrackconfigview', {
                tabConfig: {translate: false},
        		title : title,
                translate: false,
                closable: true,
                closeAction: 'destroy',
                applicationId: applicationId,
                apptype: apptype
    		});
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
	},
    onObjectEdit: function(record,view){
        
        this.tieneUsuariosDisponibles(view, function () {
            this.onItemClick(view,record);
        });
        
    },
    onGetAllClick: function(button, event, options) {    
        var view = button.up('smarttrackgridview');
        var store = view.getStore();
        
        store.clearFilter(true);
        store.filter(view.filters);
        
        view.down('#queryType').setValue('');
        view.down('#query').setValue('');
        
        if(view.down('#actualesVigicontrol')) {
            view.down('#actualesVigicontrol').toggle(true)
        }
        if(view.down('#dispersoVigicontrol')) {
            view.down('#dispersoVigicontrol').toggle(true)
        }
        if(view.down('#viejasVigicontrol')) {
            view.down('#viejasVigicontrol').toggle(true)
        }
        view.up('#vigicontrolmenu').show();
        
       // this.armoUrlGeoJson(view)
      /*  view.down('#Name').setValue('');
        view.down('#LastName').setValue('');
        view.down('#Email').setValue('');*/
        
        /*var taxonomytree = view.query('taxonomiesmastertree')[0]; 
        var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
        var taxonomiesArray = [];
        Ext.Array.each(taxonomiesSelected, function (rec) {
            if (rec.get('checked'))
            rec.set('checked', false)
        },this);*/
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('smarttrackgridview');
        var store = view.getStore();
       // var query = view.down('#query');
        //var field = view.down('#fieldName');
        
       /* view.filters.add = ;*/
        var filters =  Ext.clone(view.filters);
        filters.push( {
                    property: 'cue_ncuenta:NOT',
                    value: ''
                });
        
        
        
        var queryType = view.down('#queryType').getValue();
        var query = view.down('#query').getValue();
        
       // var name = view.down('#Imei').getValue();
        //var lastname = view.down('#Telefono').getValue();
        //var email = view.down('#Cuenta').getValue();
        
        if (queryType == 'imei')
            filters.push({ 
                property: 'Imei:LIKE',
                value: query,
                id: 'search'
            });
            
        if (queryType == 'telefono')
            filters.push({ 
                property: 'Telefono:LIKE',
                value: query,
                id: 'search'
            });
            
        if (queryType == 'nombre')
            filters.push({ 
                property: 'cue_cnombre:LIKE',
                value: query,
                id: 'search'
            });
            
         if (queryType == 'usuario')
            filters.push({ 
                property: 'Nombre:LIKE',
                value: query,
                id: 'search'
            });
            
        if (queryType == 'cuenta'){
            /*filters = [{ 
                property: 'cue_ncuenta:LIKE',
                value: query,
                id: 'search'
            }];*/
            filters.push({ 
                property: 'cue_ncuenta:LIKE',
                value: query,
                id: 'search'
            });
        }
            
        if (queryType == 'dealer'){
            /*filters = [{ 
                property: 'cue_clinea:LIKE',
                value: query,
                id: 'search'
            }];*/
            filters.push({ 
                property: 'cue_clinea:LIKE',
                value: query,
                id: 'search'
            });
        }
            
            
         var states = []
        if(view.down('#actualesVigicontrol') && view.down('#actualesVigicontrol').pressed) {
            states.push('current')
        }
        if(view.down('#dispersoVigicontrol') && view.down('#dispersoVigicontrol').pressed) {
            states.push('disper')
        }
        if(view.down('#viejasVigicontrol') && view.down('#viejasVigicontrol').pressed) {
            states.push('old')
        }
        /*
        filters.push({ 
            property: 'state:IN',
            value: states.join(','),
            id: 'state'
        });
            */
                
        if (filters.length>0)   {
            store.clearFilter(true);
            store.filter(filters); 
           
        } else {
           store.clearFilter();
        }
        view.up('#vigicontrolmenu').show();
    },
    
    onCuentaChanged: function(cuenta, view){
        var gridview = view.up('viewport').down('smarttrackgridview');
        var selection = view.getSelectionModel().getSelection();
        var model = this.getSmartTrackModelModel();
        var telefonoModel = this.getTelefonoSearchModelModel();
        var t = this;  
        Ext.Array.each(selection,function(record, key){
            var telefono = record.get('Telefono');;
            var filters = [{
                property: 'tel_ctelefono',
                value: telefono
            },{
                property: 'tel_iidcuenta',
                value: cuenta.get('Id')
            }];
            var store =Ext.create('Ext.data.Store',{
                model: telefonoModel ,
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: filters
            })
            
            store.load(function () {
                record.setConfig({
                    proxy: model.getProxy()
                });           
                record.set('CuentaId', cuenta.get('cue_iid'));                   
                record.save({success: function(record){
                    var parametros = 'cuentaid='+cuenta.get('cue_iid')+'&SmartTrackId='+record.get('Id');
                    Ext.Ajax.request({
                        url: '/rest/search/smarttrackasignarcuenta',
                        method: 'GET',
                        params: parametros,
                        success: function(resp,operation) {
                        notify('Los datos se guardaron con éxito');
                        gridview.down('pagingtoolbar').doRefresh();
                        }
                    });
                }});
            });
        });
    },
     onCuentaNew: function(cuenta, view){
        var gridview = view.up('viewport').down('smarttrackgridview');
        
        var spform = Ext.widget('smarttrackformview',{
            caller: view,
            createTipo: view.createTipo,
            cuenta: cuenta
        });
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
			title : 'Nuevo dispositivo',
			closeAction : 'destroy',
            itemId: 'cuentaNew',
			width : 450,
			height : 285,
			border : true,
            modal: true,
            view: gridview,
			items : [spform]
		});
		win.show();
    },
    tieneUsuariosDisponibles: function (view, callback) {
        var fieldToolBar = view.down('#toolbardisplayfield');
        if(view.QtyUsers != 0 ) { //==0 solo para testeo
            var store =Ext.create('Ext.data.Store',{
                model: this.getSmartTrackSearchModelModel(),
                pageSize: 1000, // estaba tirando 25 max
                remoteFilter: true,
                filters: [{
                        property: 'cue_ncuenta:NOT',
                        value: ''
                    }]
            })
            
            store.load(function () {
               var asignados = store.getTotalCount();
               if(asignados == view.QtyUsers) {
                    // actualizo cantidades en la barra
                    {
                        var t = view.down('toolbar');
                         fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                           
                    }
                    if(view.down('[action="nuevo"]')) {
                        view.down('[action="nuevo"]').setDisabled(true);
                    }
                    var msg = getLocale('Se supero la cantidad de asignaciones disponibles')+'. ('+asignados+'\/'+view.QtyUsers+')';
                    Ext.Msg.alert('Atención', msg, Ext.emptyFn);
               } else if (asignados > view.QtyUsers) {
                    // actualizo cantidades en la barra
                    fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                    //view.down('#queryType').setDisabled(true);
                    //view.down('#query').setDisabled(true);
                    //view.down('[action="search"]').setDisabled(true);
                    //view.down('[action="getall"]').setDisabled(true);
                   
                    view.down('[action="groupAlarmas"]').setDisabled(true);
                    
                    view.down('[action="configurar"]').setDisabled(true);
                    
                    if(view.down('[action="nuevo"]')) {
                        view.down('[action="nuevo"]').setDisabled(true);
                    }
                    
                    Ext.Msg.alert('Atención', getLocale('Se supero la cantidad de asignaciones disponibles. Por favor comuniquese con el administrador')+'.('+asignados+'/'+view.QtyUsers+')', Ext.emptyFn);    
                    
                    view.licenseViolation =true;
                    
                    view.fireEvent('licenseviolation');
                    
               } else {
                
                    // actualizo cantidades en la barra
                     fieldToolBar.setValue(getLocale('Disponibles/Usados')+' ('+view.QtyUsers+'/'+asignados+')');
                    
                    if(view.down('[action="nuevo"]')) {
                        view.down('[action="nuevo"]').setDisabled(false);
                    }
                    
                   if(callback) {
                       callback();
                   }
               }
                
            });
        
        }else {
            // actualizo cantidades en la barra
            var t = view.down('toolbar');    
            fieldToolBar.setValue(getLocale('Dispositivos ilimitados'));
            if(callback) {
               callback();
            }
        }
    },
    
    onSelectionChange: function(selectionModel, records, options){
        var view = selectionModel.view.up('smarttrackgridview');;
        if(view.fireSelectionChange) {
            /*if(!view.parentView) {
                var gmappanel6 = view.up('mapguardgpsview').down('gmappanel6');
            } else {
                var gmappanel6 = view.up(view.parentView).down('gmappanel6');             
            }
            gmappanel6.fireEvent('markersSmartTrackChange',gmappanel6,records);*/
            if(view.down('#dispositivos-seleccionados')) {
                view.down('#dispositivos-seleccionados').toggle(true)
            }
            view.filtroDispositivos == 'seleccionados'
            this.armoUrlGeoJson(view)
        }
    }
});