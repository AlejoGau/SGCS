//MIGRADO2024
Ext.define('Common.controller.MovilesGridController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.MapguardVehicleStore'],
    models: [
        'MapguardModel',
        'TablasFlotasSearchModel',
        'TablasMovilesPatrullaModel',
        'VehicleSearchModel'
    ],
    init: function (config) {
        // genero los eventos
        this.control({
            'movilesgridview': {
                afterrender: this.initView,
                beforedestroy: this.onBeforeDestroy,
                selectionchange: this.onSelectionChange,
                groupclick: this.onGroupClick,
                changeSelectAll: this.onChangeSelectAll,
                showMovil: this.onShowMovil,
                liberarMovil: this.onLiberar,
            },
            'movilesgridview button[action=removefilter]': {
                click: this.onRemovefilterClick
            },
            'movilesgridview #flo_ccodigo': {
                change: this.onFlotaChange
            },
            'movilesgridview #todos': {
                click: this.onTodosClick
            },
            'movilesgridview #disponibleMoviles': {
                click: this.onSubfixFiltroClick
            },
            'movilesgridview #sosMoviles': {
                click: this.onSubfixFiltroClick
            },
            'movilesgridview #asignadoMoviles': {
                click: this.onSubfixFiltroClick
            },
            'movilesgridview #viejas': {
                click: this.onSubfixFiltroClick
            },

            'movilesgridview #dispositivos-todos': {
                click: this.onDispositivosTodosClick
            },
            'movilesgridview #dispositivos-seleccionados': {
                click: this.onDispositivosSeleccionadosClick
            },
            'movilesgridview #dispositivos-filtro': {
                click: this.onDispositivosFiltroClick
            },


        });
    }, // cierro init





    onShowMovil: function (records, view) {
        if (view.GMAPPANEL) {
            Ext.Array.each(records, function (record) {
                var movil = view.getStore().findRecord('tmp_idKey', record.get('tmp_idKey'))
                view.getSelectionModel().select([movil])
            })
        } else {
            console.log('No se encuentra la referencia al gmappanel6')
        }
    },

    onSubfixFiltroClick: function (btn) {
        var view = btn.up('movilesgridview')
        this.onFlotaChange(view.down('#flo_ccodigo'), view.down('#flo_ccodigo').getValue())
        //this.armoUrlGeoJson(view)
        console.log(view.up('menu'))
        console.log(view.up('#menuMovil'))
        view.up('menu').show();
    },

    onDispositivosTodosClick: function (btn) {
        var view = btn.up('movilesgridview')

        view.down('#toolbarfiltro').setDisabled(true);

        view.filtroDispositivos = 'todos'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },
    onDispositivosSeleccionadosClick: function (btn) {
        var view = btn.up('movilesgridview')

        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'seleccionados'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
        view.up('menu').show();
    },
    onDispositivosFiltroClick: function (btn) {
        var view = btn.up('movilesgridview')

        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'filtro'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
        view.up('menu').show();
    },


    getMovilIcon: function (cuenta, gmappanel6) {
        //    var iconUrl = '/resources/global/images/icons/';
        var tipo = 'Casa';// cuenta.get('tip_cdescripcion');

        if (cuenta.get('selected')) {
            tipo = tipo + '_selected';
        }

        cuenta.isOld = false;
        cuenta.isDisperso = false;
        cuenta.isActual = false;

        if (Ext.Date.add(new Date(Ext.Date.now()), Ext.Date.MINUTE, gmappanel6.TIEMPODISPOSITIVOS * -1) > new Date(cuenta.get('gps_tfechahora'))) {
            iconUrl = '/resources/softguard/images/mapguard-cservice/sp_old.png';
            cuenta.isOld = true;
        } else if (cuenta.get('gps_rAccuracy') > gmappanel6.DISPERSIONDISPOSITIVOS) {
            iconUrl = '/resources/softguard/images/mapguard-cservice/sp_disper.png';
            cuenta.isDisperso = true;
        } else {
            iconUrl = '/resources/softguard/images/mapguard-cservice/sp.png';
            cuenta.isActual = true;
        }


        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48, 48),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 35)
        );

        return image;
    },



    getMarkerInfoWindowHtmlMovil: function (marker, address) {
        if (marker && marker.Telefono) {
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

        if (address) {

            html += '\
                  <tr>\
                      <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                      <span class="x-btn-icon icon-map" style="display:inline-block; height: 16px; width:16px;"></span><span style="line-height:17px; vertical-align:top;"> {direccion}</span><br/>\
                      </td>\
                  </tr>\
                  ';
        }

        if (marker.tmp_nestado == 3) {
            html += '\
                  <tr>\
                      <td colspan="2" style="padding:5px; font-size:13px;">\
                         <span style="font-weight:bold;">{lblCuentaAsignada}</span><span> {asi_clinea}-{asi_ncuenta} {asi_cnombre}</span><br/>\
                      </td>\
                  </tr>\
                  ';
        }
        if (marker._cestado) {
            html += '\
                      <tr>\
                          <td colspan="2" style="padding:5px; font-size:13px;">\
                             <span style="font-weight:bold;">{lblEstado}:</span><span> {_cestado}</span><br/>\
                          </td>\
                      </tr>\
                      ';

        }
        html += '</table>';

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
        html = html.replace(/\{dealer\}/, marker.ph.cue_clinea ? marker.ph.cue_clinea : cargando);
        html = html.replace(/\{ncuenta\}/, marker.ph.cue_ncuenta ? marker.ph.cue_ncuenta : cargando);
        html = html.replace(/\{cuenta\}/, marker.ph.nombre ? marker.ph.nombre : cargando);
        html = html.replace(/\{icon\}/, marker.ph.icon ? marker.ph.icon : cargando);
        html = html.replace(/\{direccion\}/, address);


        html = html.replace(/\{_cestado\}/, marker.ph._cestado ? marker.ph._cestado : cargando);
        html = html.replace(/\{asi_cnombre\}/, marker.ph.asi_cnombre ? marker.ph.asi_cnombre : cargando);
        html = html.replace(/\{asi_clinea\}/, marker.ph.asi_clinea ? marker.ph.asi_clinea : cargando);
        html = html.replace(/\{asi_ncuenta\}/, marker.ph.asi_ncuenta ? marker.ph.asi_ncuenta : cargando);


        return html

    },

    /**
     * Adrian 20-12-2018 saque esto por que reformule el centrado para que funcione con layers 
    // 05-10 - JUAN Agrego el centrado del mapa en base al Extend (lo saque de TrackGuard)
    // 02-01 : JUAN Agregado porque no centraba. Ver con Adrian.
    
    
    centerMapGeojson: function(layer,gmappanel6) {
        var bounds = new google.maps.LatLngBounds();
                
                
        var count = 0;
        layer.forEach(function (feature) {
            
            bounds.extend(new google.maps.LatLng(feature.getGeometry().get().lat(),feature.getGeometry().get().lng()));
            count++;
        })
        
        if(count>0) {        
          
            var map = gmappanel6.getMap();
            var lastzoom = map.getZoom();
                    
            map.panToBounds(bounds);
            map.fitBounds(bounds);  
        
            if (map.getZoom()==0)
                map.setZoom(lastzoom);
        }
    },
    
     */

    onMarkersGeoJsonChange: function (view, ultimos) {
        console.log("VIEW", view)
        var loading = view.caller.down('#loadingmap');
        if (loading) {
            loading.show();
        }
        //cuando esta definido ultimo en true, intenta enviar la ultima fecha de load

        var controller = this;
        if (view) {
            var gmappanel6 = view.GMAPPANEL//view.down('#googlemap'); 

            if (gmappanel6.moviles) {
                //cuando gmappanel6.dispositivos esta en true aplico filtro de ultima llamada para traer solo los registros que se actualizaron
                var urlParametroUltimaCarga = '';
                if (ultimos && view.ultimaCarga) {
                    urlParametroUltimaCarga = '&ultimaCarga=' + Ext.Date.format(view.ultimaCarga, 'Y-m-d g:i')
                }
                // Siempre actualizamos ultimaCarga (no solo en modo delta) para que el próximo
                // tick del task tenga un baseline correcto incluso después de un full reload.
                view.ultimaCarga = new Date();

                //Ext.Ajax.abort(view.geojsonAjax);
                if (view.geojsonAjax && Ext.Ajax.isLoading(view.geojsonAjax)) {
                    return false;
                }
                view.geojsonAjax = Ext.Ajax.request({
                    url: view.urlGeoJson + urlParametroUltimaCarga,
                    success: function (response, opts) {
                        var obj = Ext.decode(response.responseText);

                        if (!ultimos) {
                            //elimino los features
                            gmappanel6.moviles.forEach(function (feature) {
                                gmappanel6.moviles.remove(feature)
                            })
                        } else {
                            // Delta delete O(n+m): armo set de cue_iid entrantes y hago una sola
                            // pasada sobre los features existentes. Antes era O(n*m): para 500
                            // móviles con 30 updates/tick eran 15.000 comparaciones por refresco.
                            var incomingIds = {};
                            for (var i = 0; i < obj.features.length; i++) {
                                incomingIds[obj.features[i].properties.cue_iid] = true;
                            }
                            var toRemove = [];
                            gmappanel6.moviles.forEach(function (feature) {
                                if (incomingIds[feature.getProperty("cue_iid")]) {
                                    toRemove.push(feature);
                                }
                            });
                            for (var j = 0; j < toRemove.length; j++) {
                                gmappanel6.moviles.remove(toRemove[j]);
                            }
                        }

                        //gmappanel6.moviles.addGeoJson(obj)
                        gmappanel6.moviles.loadGeoJson(view.urlGeoJson, null, function () {

                            // 02-01 : JUAN Agregado porque no centraba. Ver con Adrian.
                            // 17-01 : ADRIAN lo saque de este controlador y me lo lleve a MapguardEventos lo transforme en un evento
                            //controller.centerMapGeojson (gmappanel6.moviles, gmappanel6)
                            gmappanel6.fireEvent('center', gmappanel6)

                            if (loading) {
                                loading.hide();
                            }
                        });

                        // No disparar 'center' acá: este branch es el refresco periódico
                        // (task de 5s + cambios de filtro). El centrado solo corresponde a la
                        // carga inicial — se hace en el callback de loadGeoJson del else de abajo.
                        // Si centramos en cada refresh, el mapa "salta" cada pocos segundos y
                        // pierde el zoom/posición que el usuario eligió.

                        if (loading) {
                            loading.hide();
                        }
                    }
                })
            } else {
                // Baseline para el primer delta del task periódico. Se setea ANTES del request
                // para no perder updates que ocurran durante el fetch (mejor traer un poco de
                // dato repetido que perder posiciones).
                view.ultimaCarga = new Date();
                gmappanel6.moviles = new google.maps.Data();
                gmappanel6.moviles.loadGeoJson(view.urlGeoJson, null, function () {

                    // 02-01 : JUAN Agregado porque no centraba. Ver con Adrian.
                    // 17-01 : ADRIAN lo saque de este controlador y me lo lleve a MapguardEventos lo transforme en un evento
                    //controller.centerMapGeojson (gmappanel6.moviles, gmappanel6)
                    gmappanel6.fireEvent('center', gmappanel6)

                    if (loading) {
                        loading.hide();
                    }
                });


                gmappanel6.moviles.setStyle({ visible: true });
                /*gmappanel6.moviles.setStyle(function(feature) {
                    return {
                        icon: feature.getProperty('icon'),
                        title: feature.getProperty('title')
                    };
                });*/

                gmappanel6.moviles.setStyle(function (feature) {
                    if (view.parentview.down('#mostraretiquetas').pressed && getParametro('LABELMOVILTRACKVIEW')) {
                        return {
                            icon: {
                                url: feature.getProperty('icon'),
                                labelOrigin: new google.maps.Point(10, 50)
                            },
                            title: feature.getProperty('nombre'),
                            label: {
                                color: "#333",
                                fontFamily: "tahoma, arial",
                                fontSize: "12px",
                                fontWeight: "bold",
                                text: feature.getProperty('nombre')
                            }
                        };
                    } else {
                        return {
                            icon: {
                                url: feature.getProperty('icon'),

                            },
                            title: feature.getProperty('nombre'),
                            label: null
                        };
                    }
                })


                gmappanel6.moviles.setMap(gmappanel6.getMap());

                gmappanel6.moviles.addListener('mouseover', function (event) {
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
                    if (gmappanel6.infowindowOpened) {
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
                    }, function (result, status) {

                        if (status == 'OK' && result.length > 0) {
                            address = result[0].formatted_address;

                            //actualizo contenido
                            gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlMovil(infoRecord, address))
                        } else {
                            gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlMovil(infoRecord, ''))
                        }
                    });

                    /*  Ext.Ajax.request({
                           url: '/rest/search/MP_Vehicles',
                           method:'GET',
                           params: {filter:Ext.encode([{property:'tmp_idKey:IN', value:event.feature.getProperty("ID")}])},
                           success: function(response, opts) {
                               var obj = Ext.decode(response.responseText); 
                               infoRecord = obj.rows[0]
                               gmappanel6.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlMovil(obj.rows[0], address))
                           }
                      })*/



                    gmappanel6.infowindowOpened.setPosition(event.feature.getGeometry().get());
                    gmappanel6.infowindowOpened.open(gmappanel6.getMap());
                });

                gmappanel6.moviles.addListener('mouseout', function (event) {
                    gmappanel6.infowindowOpened.close();
                });

                gmappanel6.moviles.addListener('click', function (event) {
                    var tabpanel = view.caller.up('tabpanel')

                    var store = Ext.create('Ext.data.Store', {
                        model: controller.getMapguardModelModel(),
                        remoteFilter: true,
                        pageSize: 2000,
                        sorters: [
                            {
                                property: 'Name',
                                direction: 'ASC'
                                //,root: 'data'
                            }
                        ],
                        filters: [{
                            "Id": "cue_iid",
                            "property": "cue_iid",
                            "value": event.feature.getProperty("cue_iid")

                        }, {
                            property: "tmp_cnumero:LIKENOT",
                            value: "ST"
                        }]
                    }).load({
                        callback: function (records) {


                            if (view.onSelectEvent && view.caller) {
                                view.caller.fireEvent(view.onSelectEvent, records[0], view.caller)
                            } else {
                                var title = records[0].get('cue_clinea') + "-" + records[0].get('cue_ncuenta') + " " + records[0].get('cue_cnombre');

                                var tab = tabpanel.add(Ext.widget('vehicleslavegpsview', {
                                    title: title,
                                    translate: false,
                                    record: records[0],
                                    center: event.feature.getGeometry().get().lat() + ',' + event.feature.getGeometry().get().lng(),
                                    closable: true,
                                    closeAction: 'destroy',
                                    tabTipo: 'movil'
                                }));

                                tabpanel.setActiveTab(tab);
                            }
                        }
                    })
                });
            }

            //paso referencia la view para trabajar desde el mapa
            view.GMAPPANEL.moviles.view = view


        }


    },



    onSelectionChange: function (selectionModel, records, options) {
        var controller = this;
        var view = selectionModel.view.up('movilesgridview');
        if (view.fireSelectionChange) {

            //si le pasamos GMAPPANEL doy por entendido que tengo que pegarle el layer al mapa que se paso
            view.down('#dispositivos-seleccionados').toggle(true)

            view.down('#toolbarfiltro').setDisabled(false);
            view.filtroDispositivos = 'seleccionados'
            this.armoUrlGeoJson(view)


        }
    },

    armoUrlGeoJson: function (view, ultimos) {
        // ultimos=true: refresco delta (solo trae móviles modificados desde view.ultimaCarga).
        // ultimos=undefined/false: full reload (acciones del usuario: cambio de filtro, flota,
        // selección, modo de filtro). Strategy (b): solo el task periódico usa delta; cualquier
        // cambio iniciado por el usuario hace full reload para garantizar consistencia del set.
        var controller = this
        var continueLoad = true;

        if (view.GMAPPANEL) {


            //armo url para geojson           

            var urlgeojson = '/handler/movilesGeoJson';
            urlgeojson += '?token=' + Ext.util.Cookies.get('OAuth_Token');

            if (view.filtroDispositivos == 'seleccionados') {
                var ids = []
                Ext.Array.each(view.getSelectionModel().getSelection(), function (record) {
                    ids.push(record.get('Id'))
                })


                urlgeojson += '&filter=' + Ext.encode([{
                    property: 'tmp_idKey:IN',
                    value: ids.join(',')
                }]);

                if (ids.length > 0) {

                } else {
                    continueLoad = false;
                    if (view.GMAPPANEL.moviles) {
                        view.GMAPPANEL.moviles.forEach(function (feature) {
                            view.GMAPPANEL.moviles.remove(feature)
                        })
                    }
                }

            } else if (view.filtroDispositivos == 'filtro') {

                var filters = Ext.clone(view.filters);

                /* filters.push([{
                     property:'tmp_cflota:IN',
                     value: view.down('#flo_ccodigo').getValue().join(','),
                     id:'tmp_cflota'
                 },{
                     property:"tmp_cnumero:LIKENOT",
                     value:"ST",
                     id:'tmp_cnumero'
                     
                 }])*/

                // getValue() puede devolver null en el combo multiSelect si nunca se seteó
                // (ocurre en la primera invocación desde initView, antes de que el combo se cargue).
                var flotaValue = view.down('#flo_ccodigo').getValue() || [];
                if (flotaValue.length > 0) {
                    filters.push({
                        property: 'tmp_cflota:IN',
                        value: flotaValue.join(','),
                        id: 'flo_ccodigo'
                    })
                }

                var states = []
                if (view.down('#disponibleMoviles').pressed) {
                    states.push('1')
                }
                if (view.down('#sosMoviles').pressed) {
                    states.push('2')
                }
                if (view.down('#asignadoMoviles').pressed) {
                    states.push('3')
                }

                filters.push({
                    property: 'state:IN',
                    value: states.join(','),
                    id: 'state'
                });

                urlgeojson += '&filter=' + Ext.encode(filters);

            } else {

            }


            var dateNow = new Date()

            urlgeojson += "&_dc=" + dateNow.getTime();

            //console.log(urlgeojson,view.GMAPPANEL)
            view.urlGeoJson = urlgeojson

            //esto es para frenar el load
            if (continueLoad) {
                controller.onMarkersGeoJsonChange(view, ultimos === true)
            }
        }
    },




    onDispositivosTodosClick: function (btn) {
        var view = btn.up('movilesgridview')

        view.down('#toolbarfiltro').setDisabled(true);

        view.filtroDispositivos = 'todos'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
    },
    onDispositivosSeleccionadosClick: function (btn) {
        var view = btn.up('movilesgridview')

        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'seleccionados'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
        view.up('menu').show();
    },
    onDispositivosFiltroClick: function (btn) {
        var view = btn.up('movilesgridview')

        view.down('#toolbarfiltro').setDisabled(false);
        view.filtroDispositivos = 'filtro'
        btn.toggle(true)
        this.armoUrlGeoJson(view)
        view.up('menu').show();
    },




    onTodosClick: function (btn) {
        var view = btn.up('movilesgridview')

        view.getStore().clearFilter(true)
        view.getStore().filter(Ext.clone(view.filters))

        view.down('#flo_ccodigo').setValue(null)

        view.down('#disponibleMoviles').toggle(true)
        view.down('#sosMoviles').toggle(true)
        view.down('#asignadoMoviles').toggle(true)

        view.filtroDispositivos = 'todos'
        view.down('#dispositivos-todos').toggle(true)

        this.armoUrlGeoJson(view)
    },

    onFlotaChange: function (combo, value) {
        var view = combo.up('movilesgridview')

        var filter = Ext.clone(view.filters)

        view.getStore().clearFilter(true)

        if (combo.valueModels && combo.valueModels.length > 0) {

            filter.push({
                property: 'tmp_cflota:IN',
                value: value.join(','),
                id: 'tmp_cflota'
            })
            filter.push({
                property: "tmp_cnumero:LIKENOT",
                value: "ST",
                id: 'tmp_cnumero'

            })
        }

        var states = []
        if (view.down('#disponibleMoviles').pressed) {
            states.push('1')
        }
        if (view.down('#sosMoviles').pressed) {
            states.push('2')
        }
        if (view.down('#asignadoMoviles').pressed) {
            states.push('3')
        }
        filter.push({
            property: 'state:IN',
            value: states.join(','),
            id: 'state'
        });


        var viejas = view.down('#viejas').pressed;
        var showState = [];
        if (viejas) {
            showState.push('vieja')
        }
        if (showState.length > 0) {
            filter.push({ "Id": "stateIN", "property": "s.state", "value": showState.join('\',\'') })
        }

        view.getStore().filter(filter)

        this.armoUrlGeoJson(view)
    },


    onChangeSelectAll: function (seletedAll, records, view) {

        var fireEvent;
        if (view.fireSelectionChangeName) {
            fireEvent = view.fireSelectionChangeName;
        } else {
            fireEvent = 'markersChange';
        }

        var viewport = view.up(view.parentview);
        var gmap = viewport.down('#googlemap');
        gmap.fireEvent(fireEvent, gmap, records);

    },

    onLiberar: function (grid, record) {
        var controller = this;
        var view = grid.up('movilesgridview');

        var recordMovil = record;
        var cuentaAlarma = recordMovil.get('tmp_iAsignado');

        // como no tengo un model de movil lo cargo para luego guardar los cambios.
        recordMovil.set('selected', false);
        recordMovil.set('tmp_iAsignado', 0);
        recordMovil.set('tmp_nestado', 1);



        var model = this.getTablasMovilesPatrullaModelModel();
        var movil = model.load(recordMovil.get('tmp_idKey'), {
            callback: function (record) {
                record.set('tmp_iAsignado', 0);
                record.set('tmp_nestado', 1);

                record.save({
                    callback: function () {

                        notify('El móvil se liberó con éxito');
                        // mapguardgpsview.fireEvent('vehicleRefresh', mapguardgpsview,record);
                        // genero el evento
                        Ext.Ajax.request({
                            url: '/rest/search/AlarmaGenerar',
                            method: 'GET',
                            params: {
                                idCta: recordMovil.get('tmp_icuenta'),
                                cAlarma: '_LM',
                                cObservaciones: getLocale('Se liberó el móvil') + ' ' + recordMovil.get('Name')
                            },
                            success: function (resp, operation) {
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
                                cObservaciones: getLocale('Se liberó el móvil') + ' ' + recordMovil.get('Name')
                            },
                            success: function (resp, operation) {
                                notify('El evento se generó con éxito en la cuenta');
                            }
                        });


                        view.store().load()
                    }
                });
            }
        })

    },

    initView: function (view) {
        var controller = this;

        //solo muestro los que tienen posiciones
        view.filters = [{
            property: 'latANDlong:ISNOTNULL',
            value: ''
        }, {
            property: "tmp_cnumero:LIKENOT",
            value: "ST"
        }];

        var store = Ext.create('Ext.data.Store', {
            model: this.getMapguardModelModel(),
            remoteFilter: true,
            filters: Ext.clone(view.filters),
            sorters: [
                {
                    property: 'cue_cnombre',
                    direction: 'ASC'
                    //,root: 'data'
                }
            ]
        });

        view.bindStore(store);
        var pagingtoolbar = view.down('pagingtoolbar');
        pagingtoolbar.bindStore(store);
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                var controller = this;

                /**
                 * BC 236187469 : Se agrega el conteo de la cantidad de registros en Moviles para MapGuardEventosController
                 * Este se utiliza en MWR y si el length es mayor a 20, procedemos a ocultar el boton de la view MapGuardEventosView con id mostraretiquetas
                 * Por default el boton esta en pressed = false, por lo tanto los demas markers, no muestran LABEL y no podran verse por esta razón.
                 * 
                 */

                if (view.up('mapguardeventosview') && records.length > 20) {
                    var btnMostrarEtiquetas = view.up('mapguardeventosview').down('#mostraretiquetas');
                    btnMostrarEtiquetas.hide();
                }
            }
        });

        // Default filter mode: 'filtro' respeta los toggles visibles (Disponible/SOS/Asignado)
        // y permite que los móviles aparezcan al entrar al módulo. Tiene que setearse ANTES
        // de la primera llamada a armoUrlGeoJson y antes de que arranque el task periódico,
        // si no, el task usa filtroDispositivos undefined/'seleccionados' y deja el mapa vacío.
        view.filtroDispositivos = 'filtro'
        this.armoUrlGeoJson(view)
        var flotaStore = Ext.create('Ext.data.Store', {
            model: this.getTablasFlotasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#flo_ccodigo').bindStore(flotaStore);
        flotaStore.load({
            callback: function () {
                flotaStore.insert(0, {
                    flo_cdescripcion: getLocale('Sin flota'),
                    flo_ccodigo: ''
                })
            }
        });


        if (view.GMAPPANEL) {
            // Intervalo configurable vía parámetro de sistema (mismo que usa FlotaGpsController).
            // Default 15s — más conservador que el viejo hardcoded de 5s; bajable/subible desde
            // configuración sin tocar código según el tamaño de la flota del cliente.
            var refresco = getParametro('TIEMPOREFRESHALL');
            if (!refresco) { refresco = 15; }
            var intervalMs = refresco * 1000;

            var startTask = function () {
                if (view.task) { return; }
                view.task = Ext.TaskManager.start({
                    args: [view, true], // ultimos=true: el task SIEMPRE pide delta
                    run: controller.armoUrlGeoJson,
                    scope: controller,
                    interval: intervalMs
                });
            };
            var stopTask = function () {
                if (view.task) {
                    Ext.TaskManager.stop(view.task);
                    view.task = null;
                }
            };

            startTask();

            // Page Visibility API: si el usuario cambia de pestaña/ventana, paramos el task
            // para no consumir red/CPU sin necesidad. Al volver, retomamos y disparamos un
            // refresh inmediato (delta desde la última posición conocida).
            view.visibilityHandler = function () {
                if (document.hidden) {
                    stopTask();
                } else {
                    controller.armoUrlGeoJson(view, true);
                    startTask();
                }
            };
            document.addEventListener('visibilitychange', view.visibilityHandler);
        }

    },

    // Cleanup al destruir la view (cierre del módulo / cambio de tab principal).
    // Sin esto, el task de refresco quedaba corriendo forever pegándole al server, y los
    // listeners del document se acumulaban con cada apertura del módulo.
    onBeforeDestroy: function (view) {
        if (view.task) {
            Ext.TaskManager.stop(view.task);
            view.task = null;
        }
        if (view.visibilityHandler) {
            document.removeEventListener('visibilitychange', view.visibilityHandler);
            view.visibilityHandler = null;
        }
        if (view.geojsonAjax && Ext.Ajax.isLoading(view.geojsonAjax)) {
            Ext.Ajax.abort(view.geojsonAjax);
        }
    },

    onGroupClick: function (view, node, value, event, options) {
        var t = event.getTarget('.grpCheckbox');
        var store = view.store;
        var grouper = store.groupers.items[0];
        var field = grouper.property;
        if (t) {
            var checked = t.checked;
            store.each(function (rec, index) {
                if (rec.get(field) == value) {
                    if (checked) {
                        view.getSelectionModel().select(rec, true);
                    } else {
                        view.getSelectionModel().deselect(rec);
                    }
                }
            });
        }
    },


    onRemovefilterClick: function (button, event, options) {
        var view = button.up('movilesgridview');
        var store = view.getStore();
        store.currentPage = 1;
        store.clearFilter();
    }

}); 600