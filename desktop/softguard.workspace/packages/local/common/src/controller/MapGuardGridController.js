//MIGRADO2024
/***
 * AHORA SOLO MANEJA SERVTEC
 */
Ext.define('Common.controller.MapGuardGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.MapguardVehicleStore' ],
    models : [ 'TablasFlotasSearchModel', 'MapguardModel', 'TablasMovilesPatrullaModel' ],
    views : [ 'MapguardGridView' ],
    init : function(config) {
		// genero los eventos
		this.control({
			'mapguardgridview' : {
				afterrender : this.initView,
                //itemclick: this.onItemClick,
                selectionchange : this.onSelectionChange,
                //select : this.onSelect,
                groupclick : this.onGroupClick,
                //liberarMovil: this.onLiberar,
                //changeSelectAll: this.onChangeSelectAll
                refreshGeoJson: this.onRefreshGeoJson
			},
            'mapguardgridview button[action=removefilter]' : {
                click: this.onRemovefilterClick
        	},
            'mapguardgridview #flo_ccodigo' : {
                change: this.onFlotaChange
            },
            'mapguardgridview #todos' : {
                click: this.onTodosClick
            }
            
            
		});
	}, // cierro init
    
    
    getMarkerInfoWindowHtmlMovil: function(marker, address){
            if(marker && marker.Telefono) {
               var cargando = ''; 
            } else {
              var cargando = '<span class="x-mask-msg-text"></span>';
            }
         
        
        // var pos = vehicle.pos;
        var html = '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="{icon}" style="float:left; margin:0 5px 0 0"/>\
                </td>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <span>{dealer}-{ncuenta} {cuenta}</span>\
                </td>\
            </tr>\
             <tr>\
                <td colspan="2" style="padding:5px; font-size:13px;">\
                   <hr />\
                </td>\
            </tr>\
            ';
        if(address) {
        
            html += '\
                    <tr>\
                        <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <span class="x-btn-icon icon-map" style="display:inline-block; height: 16px; width:16px;"></span><span style="line-height:17px; vertical-align:top;"> {direccion}</span><br/>\
                        </td>\
                    </tr>\
                    ';
        }
        
        if (marker.tmp_nestado==3){
            html += '\
                    <tr>\
                        <td colspan="2" style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblCuentaAsignada}</span><span> {asi_clinea}-{asi_ncuenta} {asi_cnombre}</span><br/>\
                        </td>\
                    </tr>\
                    ';
        }
        if(marker._cestado) {
            html += '\
                        <tr>\
                            <td colspan="2" style="padding:5px; font-size:13px;">\
                               <span style="font-weight:bold;">{lblEstado}:</span><span> {_cestado}</span><br/>\
                            </td>\
                        </tr>\
                        ';
                    
        }
        html += '</table>';
        html += '</div>';
            
            // traducciones
        
        html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'));
        html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'));
        html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'));
        html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'));
        html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'));
        html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'));
        html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'));
        html = html.replace(/\{lblOdometro\}/, getLocale('Odómetro'));
        html = html.replace(/\{lblEstado\}/, getLocale('Estado'));
        html = html.replace(/\{lblCuentaAsignada\}/, getLocale('Cuenta asignada'));
        
        
        //sta_dFechaUltimaAlerta
        html = html.replace(/\{dealer\}/, marker.Eg.cue_clinea?marker.Eg.cue_clinea:cargando);
        html = html.replace(/\{ncuenta\}/, marker.Eg.cue_ncuenta?marker.Eg.cue_ncuenta:cargando);
        html = html.replace(/\{cuenta\}/, marker.Eg.nombre?marker.Eg.nombre:cargando);
        html = html.replace(/\{icon\}/, marker.Eg.icon?marker.Eg.icon:cargando);
        html = html.replace(/\{direccion\}/, address);
        
        html = html.replace(/\{_cestado\}/, marker.Eg._cestado?marker.Eg._cestado:cargando);
        html = html.replace(/\{asi_cnombre\}/, marker.Eg.asi_cnombre?marker.Eg.asi_cnombre:cargando);
        html = html.replace(/\{asi_clinea\}/, marker.Eg.asi_clinea?marker.Eg.asi_clinea:cargando);
        html = html.replace(/\{asi_ncuenta\}/, marker.Eg.asi_ncuenta?marker.Eg.asi_ncuenta:cargando);
        
        
        return html
        
    },
    
    
    
    onSetUrlGeoJson: function (view, forceLoad) {
              
        var dateNow = new Date();
        var urlgeojson = '/handler/servtecGeoJson';
        urlgeojson += '?token='+Ext.util.Cookies.get('OAuth_Token');
        urlgeojson += "&_dc="+dateNow.getTime();
        // urlgeojson += '&showState='+Ext.encode(['enmovimeinto','frenado','alarma']);
        
        var filters = []
        
            
        if(view.getSelectionModel().getCount() > 0) {
            var selection = view.getSelectionModel().getSelection()
            var datas = Ext.Array.pluck(selection, 'data');
            var Ids = Ext.Array.pluck(datas, 'Id')
            
            filters.push({
                    property: 'tmp_idKey:IN',
                    value:Ids.join(',')
            })
         filters.push({
                property:"tmp_cnumero:LIKE",
                value:"ST"
                
            })
        
            urlgeojson += '&filter='+Ext.encode(filters);
            
            view.urlGeoJson = urlgeojson
            
            if(forceLoad) {
                this.onMarkersGeoJsonChange(view)
            }           
            
        }else{
            var gmappanel6 = view.GMAPPANEL;
            gmappanel6.servtec.forEach(function (feature) {
                gmappanel6.servtec.remove(feature)
            });          
        }
        

    },
    
    
    
    onMarkersGeoJsonChange: function(view,ultimos){
        
       /*var loading = view.caller.down('#loadingmap');
        if(loading) {
            loading.show();
        }*/
        //cuando esta definido ultimo en true, intenta enviar la ultima fecha de load
        
        var controller = this;
        if (view){
            
            
            
            var gmappanel6 = view.GMAPPANEL//view.down('#googlemap'); 
           
            
            if(gmappanel6.servtec) {
                //cuando gmappanel6.dispositivos esta en true aplico filtro de ultima llamada para traer solo los registros que se actualizaron
                var urlParametroUltimaCarga = '';
                if(ultimos) { 
                    //tomo fecha y armao string para filtro
                    if(view.ultimaCarga) {
                        urlParametroUltimaCarga = '&ultimaCarga='+Ext.Date.format(view.ultimaCarga,'Y-m-d g:i')
                    }
                    view.ultimaCarga = new Date();
                }
                
                //Ext.Ajax.abort(view.geojsonAjax);
                if(view.geojsonAjax && Ext.Ajax.isLoading(view.geojsonAjax)) {
                    return false;
                }
                view.geojsonAjax = Ext.Ajax.request({
                     url: view.urlGeoJson+urlParametroUltimaCarga,                
                     success: function(response, opts) {
                         var obj = Ext.JSON.decode(response.responseText);
                         
                        if(!ultimos) {  
                            //elimino los features
                            gmappanel6.servtec.forEach(function (feature) {
                                gmappanel6.servtec.remove(feature)
                            })
                        } else {
                            //elimino solo los features que llegan
                            for(var i in obj.features) {
                                gmappanel6.servtec.forEach(function (feature) {
                                    if(feature.getProperty("cue_iid") == obj.features[i].properties.cue_iid) {
                                        gmappanel6.servtec.remove(feature)
                                    }
                                })
                            }
                        }
                        
                        gmappanel6.servtec.addGeoJson(obj)
                        
                        // 02-01 : JUAN Agregado porque no centraba.
                        // 17-01 : ADRIAN lo saque de este controlador y me lo lleve a MapguardEventos lo transforme en un evento
                        //controller.centerMapGeojson (gmappanel6.moviles, gmappanel6)
                        gmappanel6.fireEvent('center', gmappanel6)
                        
                        
                        /*if(loading) {
                            loading.hide();
                        }*/
                     }
                })
            } else {
                gmappanel6.servtec = new google.maps.Data();
                gmappanel6.servtec.loadGeoJson(view.urlGeoJson,null, function () {
                    
                    // 02-01 : JUAN Agregado porque no centraba. Ver con Adrian.
                    // 17-01 : ADRIAN lo saque de este controlador y me lo lleve a MapguardEventos lo transforme en un evento
                    //controller.centerMapGeojson (gmappanel6.moviles, gmappanel6)
                    gmappanel6.fireEvent('center', gmappanel6)
                    
                   /* if(loading) {
                        loading.hide();
                    }*/
                });  
                
                
                gmappanel6.servtec.setStyle({visible: true});
                /*gmappanel6.servtec.setStyle(function(feature) {
                    return {
                        icon: feature.getProperty('icon'),
                        title: feature.getProperty('title')
                    };
                });*/
                
                gmappanel6.servtec.setStyle(function(feature) {
                if(view.parentview.down('#mostraretiquetas').pressed && getParametro('LABELMOVILTRACKVIEW')) {
                        return {                          
                            icon: {
                                url: feature.getProperty('icon'),
                                labelOrigin: new google.maps.Point(10, 50)
                            },
                            title: feature.getProperty('label'),
                            label: {
                                  color: "#333",
                                  fontFamily: "tahoma, arial",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  text:feature.getProperty('label')
                                } 
                        };
                    } else {
                        return {                          
                            icon: {
                                url: feature.getProperty('icon'),
                               
                            },
                            title: feature.getProperty('label'),
                            label: null
                        };
                    }
                })
                
                
                gmappanel6.servtec.setMap(gmappanel6.getMap());
                
                
                gmappanel6.servtec.addListener('mouseover', function(event) {
                    var address = '';
                    //var infoRecord = getProperties(event.feature);
                    var infoRecord = Object.keys(event.feature).reduce(function (
                        obj,
                        key
                      ) {
                        obj[key] = event.feature[key]
                        return obj
                      },
                      {})               
                    
                    if(gmappanel6.infowindowOpened) {
                        gmappanel6.infowindowOpened.close();                        
                    }
                    
                    gmappanel6.infowindowOpened = new google.maps.InfoWindow({
                        pixelOffset: new google.maps.Size(0, -60)
                    }); 
                    
                    gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlMovil(infoRecord, address))
                    
                    //busco la direccion
                    var geocoder = gmappanel6.getGeocoder();
                    geocoder.geocode({
                        location: event.feature.getGeometry().get()
                        }, function(result, status){
                            
                            if (status == 'OK' && result.length > 0){
                                address = result[0].formatted_address;
                                
                                //actualizo contenido
                                gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlMovil(infoRecord, address))
                            }   else {
                                gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlMovil(infoRecord, ''))
                            }        
                        });
                        
                  /*  Ext.Ajax.request({
                         url: '/rest/search/MP_Vehicles',
                         method:'GET',
                         params: {filter:Ext.encode([{property:'tmp_idKey:IN', value:event.feature.getProperty("ID")}])},
                         success: function(response, opts) {
                             var obj = Ext.JSON.decode(response.responseText); 
                             infoRecord = obj.rows[0]
                             gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlMovil(obj.rows[0], address))
                         }
                    })*/
                        
                    
                        
                    gmappanel6.infowindowOpened.setPosition(event.feature.getGeometry().get());
                    gmappanel6.infowindowOpened.open(gmappanel6.getMap());
                });
               
                gmappanel6.servtec.addListener('mouseout', function(event) {
                    gmappanel6.infowindowOpened.close();
                });
                
                gmappanel6.servtec.addListener('click', function(event) {
                    
                    var tabpanel = view.caller.up('tabpanel')
                                        
                    var store =Ext.create('Ext.data.Store',{
                        model: controller.getMapguardModelModel(),
                        remoteFilter: true,
                        pageSize: 2000,
                        sorters: [
                            {
                                property : 'Name',
                                direction: 'ASC'
                            }
                        ],                        
                        filters: [{
                            "Id":"cue_iid",
                            "property":"cue_iid",
                            "value":event.feature.getProperty("cue_iid")
                            
                        },{
                            property:"tmp_cnumero:LIKENOT",
                            value:"ST"            
                        }]
                    }).load({callback:function (records) {
                        
                        
                        if(view.onSelectEvent && view.caller) {
                            view.caller.fireEvent(view.onSelectEvent,records[0],view.caller)
                        } else {
                            var title = records[0].get('cue_clinea')+"-"+records[0].get('cue_ncuenta')+" "+records[0].get('cue_cnombre');
                     
                            var tab = tabpanel.add(Ext.widget('vehicleslavegpsview', {
                                title: title,
                                translate: false,
                                record: records[0],
                                center: event.feature.getGeometry().get().lat()+','+event.feature.getGeometry().get().lng(),
                                closable: true,
                                closeAction: 'destroy',
                                servtec:view.servtec
                            }));
                    
                            tabpanel.setActiveTab(tab);
                        }
                        
                        
                        
                    }})
                    
            
                    
                });
                
            }
            
             //paso referencia la view para trabajar desde el mapa
             view.GMAPPANEL.servtec.view = view 
            
            
            
            
             
          
        }
       
    },
    
    
    
    
    
    
    
    onTodosClick: function (btn) {
        var view = btn.up('mapguardgridview')
        
        view.getStore().clearFilter(true)
        view.getStore().filter({
            property:"tmp_cnumero:LIKE",
            value:"ST"
            
        })
        
        view.down('#flo_ccodigo').setValue(null)
        
        this.onSetUrlGeoJson(view, true)
    },
    
    onFlotaChange: function (combo,value) {
        var view = combo.up('mapguardgridview')
        
        if(combo.valueModels.length > 0) {
           
            view.getStore().clearFilter(true)
            view.getStore().filter([{
                property:'tmp_cflota:IN',
                value: value.join(','),
                id:'tmp_cflota'
            },{
                property:"tmp_cnumero:LIKENOT",
                value:"ST",
                id:'tmp_cnumero'
                
            }])
        }
    },
    
    
    onChangeSelectAll: function (seletedAll,records, view) {
        
        var fireEvent;
        if(view.fireSelectionChangeName) {
            fireEvent = view.fireSelectionChangeName;
        } else {
            fireEvent = 'markersChange';
        }
        
        var viewport = view.up(view.parentview);
        var gmap = viewport.down('#googlemap');
        gmap.fireEvent(fireEvent,gmap,records);
        
    },
    
    onLiberar: function (grid, record) {
        var controller = this;
        var view = grid.up('mapguardgridview');
        var mapguardgpsview = view.up('mapguardgpsview')?view.up('mapguardgpsview'):view.up(view.parentview);
       // var recordCuenta = mapguardgpsview.cuentaSelected;
        var recordMovil = record;
        var cuentaAlarma = recordMovil.get('tmp_iAsignado');
        
        // como no tengo un model de movil lo cargo para luego guardar los cambios.
        recordMovil.set('selected', false);
        recordMovil.set('tmp_iAsignado',0);
        recordMovil.set('tmp_nestado',1);
        
        
        
        var model = this.getTablasMovilesPatrullaModelModel();
        var movil = model.load(recordMovil.get('tmp_idKey'),{
            callback: function(record){
                record.set('tmp_iAsignado',0);
                record.set('tmp_nestado',1);
                
                record.save({callback: function(){
                    
                    notify('El móvil se liberó con éxito');
                   // mapguardgpsview.fireEvent('vehicleRefresh', mapguardgpsview,record);
                    // genero el evento
                    Ext.Ajax.request({
                      url: '/rest/search/AlarmaGenerar',
                      method: 'GET',
                      params: {
                        idCta:recordMovil.get('tmp_icuenta'),
                        cAlarma: '_LM',
                        cObservaciones: getLocale('Se liberó el móvil')+ ' '+recordMovil.get('Name')
                      },
                      success: function(resp,operation) {
                        notify('El evento se generó con éxito en el móvil');
                      }
                    });
                    
                    // genero el evento
                    Ext.Ajax.request({
                      url: '/rest/search/AlarmaGenerar',
                      method: 'GET',
                      params: {
                        idCta: cuentaAlarma,
                        cAlarma: '_LM',
                        cObservaciones: getLocale('Se liberó el móvil')+ ' '+recordMovil.get('Name')
                      },
                      success: function(resp,operation) {
                        notify('El evento se generó con éxito en la cuenta');
                      }
                    });
                    
                    
                    mapguardgpsview.fireEvent('clearVehicle',mapguardgpsview)
                    
                    //controller.initview(view);
                }});
            }
        })
        
    },
	initView : function(view) {
    
        var store =Ext.create('Ext.data.Store',{
            model: this.getMapguardModelModel(),
            sorters: [
                {
                    property : 'cue_cnombre',
                    direction: 'ASC'
                }
            ],
            filters:[{
                property:"tmp_cnumero:LIKE",
                value:"ST"
                
            }],
            remoteFilter:true
        });
        view.bindStore(store);
        var pagingtoolbar = view.down('pagingtoolbar');
        pagingtoolbar.bindStore(store);
        store.load();
        
        
        //this.onSetUrlGeoJson(view, true)
      
        
        var flotaStore = Ext.create('Ext.data.Store',{
                model: this.getTablasFlotasSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true
            })
            view.down('#flo_ccodigo').bindStore(flotaStore);        
            flotaStore.load({callback:function () {
                flotaStore.insert(0, {
                    flo_cdescripcion: getLocale('Sin flota'),
                    flo_ccodigo: ''
                })
            }});
        
    
	},
    
    onGroupClick: function(view, node, value, event, options){
      var t = event.getTarget('.grpCheckbox');
      var store = view.store;
      var grouper = store.groupers.items[0];
      var field = grouper.property;
      if (t) {
        var checked = t.checked;
        store.each(function(rec, index){
          if(rec.get(field) == value){
            if (checked){
                view.getSelectionModel().select(rec,true);
            }else
            {
                view.getSelectionModel().deselect(rec);
            }
          }
        });
      }
    },
    
    
    onRefreshGeoJson: function (view) {
        this.onSetUrlGeoJson(view,true)
    },
    
    onSelectionChange: function(selectionModel, records, options){
        var view = selectionModel.view.up('mapguardgridview');        
        this.onSetUrlGeoJson(view,true)
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('mapguardgridview');
        var store = view.getStore();
        store.currentPage = 1;
        store.clearFilter();
    }
});