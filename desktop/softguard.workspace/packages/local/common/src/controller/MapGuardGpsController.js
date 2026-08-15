//MIGRADO2024
Ext.define('Common.controller.MapGuardGpsController', {
  extend: 'Ext.app.Controller',
  stores: ['Common.store.MapguardVehicleStore'],
  models: [
    'p_GpsSpModel',
    'MapguardModel',
    'CuentaSearchModel',
    'MPCuentasEnAlarmaModel',
    'MP_CuentasGeoreferenciadasSearchModel',
    'SmartPanicSearchModel',
    'EventosPendientesMapaSearchModel',
    'VehicleSearchModel',
    'SmartTrackModel',
    'SmartTrackSearchModel',
    'SPCuentaSeguimientoModel',
    'VehicleGpsModel',
    'KeyModulesModel',
    'EventosPendientesSearchModel'
  ],
  views: ['MapguardGpsView'],
  init: function (config) {
    this.control({
      'mapguardgpsview gmappanel6': {
        mapready: this.onMapReady,
        //beforerender : this.prepareMap,
        markersChange: this.onMarkersChange,
        markersSmartpanicsChange: this.onMarkersSmartpanicsChange,
        markersSmartTrackChange: this.onMarkersSmartTrackChange,
        markersServtecChange: this.onMarkersServtecChange,
        markersDealerChange: this.onMarkersDealerChange,
        markersCuentaChange: this.onMarkersCuentaChange,
        markersTrackguardChange: this.onMarkersTrackguardChange,
        manualcenter: this.onManualCenter,
        center: this.onTryCenter
      },
      mapguardgpsview: {
        afterrender: this.initViewSuper,
        vehicleSelected: this.onVehicleSelected,
        vehicleRefresh: this.onVehicleRefresh,
        cuentaSelected: this.onCuentaSelected,
        servtecSelected: this.onServtecSelected,
        eventoSelected: this.onEventoSelected,
        smarttrackSelected: this.onSmarttrackSelected,
        smartpanicSelected: this.onSmartpanicSelected,
        clearVehicle: this.clearVehicles,
        setUrlGeoJson: this.onSetUrlGeoJson
      },
      'mapguardgpsview button[action=searchAll]': {
        click: this.onSearchAllClick
      },
      'mapguardgpsview #btnAddress': {
        click: this.onAddressClick
      },
      'mapguardgpsview [action=actualizarcuentas]': {
        click: this.onActualizarCuentasClick
      },
      'mapguardgpsview button[action=play]': {
        click: this.onPlayClick
      },
      'mapguardgpsview button[action=stop]': {
        click: this.onStopClick
      },
      'mapguardgpsview button[action=center]': {
        click: this.onCenterClick
      },
      'mapguardgpsview button[action=showcercos]': {
        click: this.onCercosClick
      },
      'mapguardgpsview #enmovimiento': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #frenado': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #viejas': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #conalarma': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #cuentasfijas': {
        click: this.onCuentasFijasClick
      },
      'mapguardgpsview #camaras': {
        click: this.onCamarasClickSpiderfier //this.onCamarasClick
      },
      'mapguardgpsview #camaraszonas': {
        click: this.onCamarasZonasClickSpiderfier
      },
      /*
        'mapguardgpsview #heatmap' : {
            click : this.onHeatMapClick
        },*/
      'mapguardgpsview #dispersoSmartPanic': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #viejasSmartPanic': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #actualesSmartPanic': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #dispersoVigicontrol': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #viejasVigicontrol': {
        click: this.onFiltersClick
      },
      'mapguardgpsview #actualesVigicontrol': {
        click: this.onFiltersClick
      },
      //nuevo para geojson
      //setUrlGeoJson movido al bloque mapguardgpsview de arriba — la segunda
      //clave duplicada pisaba el afterrender (DSS-786 / fix permisos toolbar)
      'mapguardgpsview #mostraretiquetas': {
        click: this.onMostrarEtiquetaClick
      }
    })
  }, // cierro init
  onMostrarEtiquetaClick: function (btn) {
    var view = btn.up('mapguardgpsview')
    this.onMarkersGeoJsonChange(view)
    var GMAPPANEL = view.down('gmappanel6')
    if (GMAPPANEL.servtec) {
      GMAPPANEL.servtec.view.fireEvent('refreshGeoJson', GMAPPANEL.servtec.view)
    }
    if (GMAPPANEL.moviles) {
      GMAPPANEL.moviles.view.fireEvent('refreshGeoJson', GMAPPANEL.moviles.view)
    }
  },
  createInfoWindow: function (map, poly, content) {
    var controller = this
    google.maps.event.addListener(poly, 'click', function (event) {
      // infowindow.content = content;
      if (controller.infowindow.getMap()) infowindow.close()
      controller.infowindow.setContent(content)
      // infowindow.position = event.latLng;
      controller.infowindow.setPosition(event.latLng)
      controller.infowindow.open(map)
    })
    google.maps.event.addListener(poly, 'mouseover', function (event) {
      // infowindow.content = content;
      if (controller.infowindow.getMap()) controller.infowindow.close()
      controller.infowindow.setContent(content)
      // infowindow.position = event.latLng;
      controller.infowindow.setPosition(event.latLng)
      controller.infowindow.open(map)
    })
  },
  onCercosClick: function (btn) {
    var controller = this
    var view = btn.up('mapguardgpsview')
    var gmappanel6 = view.down('#googlemap')
    var newShape = new google.maps.Polyline()
    var path = new google.maps.MVCArray()
    var map = gmappanel6.getMap()
    if (btn.pressed) {
      Ext.Ajax.request({
        url: '/handler/MapGuardGeoCercaJson',
        method: 'POST',
        success: function (resp) {
          if (resp && resp.responseText) {
            view.flightPathArr = []
            var arrayCercos = Ext.JSON.decode(resp.responseText) || []
            if (!arrayCercos.length) { return }
            arrayCercos.forEach(coord => {
              const flightPlanCoordinates = coord.geocerca.coordinates
              // DSS-1532: saltear geocercas sin coordenadas (ej. formato no parseado por el handler)
              if (!flightPlanCoordinates || !flightPlanCoordinates.length) { return }
              const flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: '#FFFF00',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                drw_idkey: coord.geocerca.drw_idkey
              })
              flightPath.setMap(map)
              controller.createInfoWindow(
                map,
                flightPath,
                coord.geocerca.cue_clinea +
                  '-' +
                  coord.geocerca.cue_ncuenta +
                  ' ' +
                  coord.geocerca.cue_cnombre
              )
              view.flightPathArr.push(flightPath)
            })
            // DSS-1532: centrar en la primera geocerca CON coordenadas (no romper si la primera viene vacia)
            var primeraValida = arrayCercos.find(function (c) {
              return c.geocerca.coordinates && c.geocerca.coordinates.length
            })
            if (primeraValida) {
              map.setCenter({
                lat: primeraValida.geocerca.coordinates[0].lat,
                lng: primeraValida.geocerca.coordinates[0].lng
              })
              map.setZoom(14)
            }
          }
        }
      })
    } else {
      view.flightPathArr.map(f => {
        f.setMap(null)
      })
    }
  },

  initViewSuper: function (view) {
    if (isModuleAvailable('SgAppMapGuardWeb')) {
      if (getRight('SgAppMapGuardWeb', 'moviles') !== true) {
        view.down('#btnMovil').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'trackguard') !== true) {
        view.down('#btntrackguard').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'smartpanics') !== true) {
        view.down('#smartPanics').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'vigicontrol') !== true) {
        view.down('#smartTrack').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'serviciotecnico') !== true) {
        view.down('#btnservtec').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'cuentasfijas') !== true) {
        view.down('#cuentasfijas').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'cercos') !== true) {
        view.down('#cercosId').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'camarascuenta') !== true) {
        view.down('#camaras').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'camaraszona') !== true) {
        view.down('#camaraszonas').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'eventos') !== true) {
        view.down('#eventoGrid').hide()
      }
      if (getRight('SgAppMapGuardWeb', 'heatmap') !== true) {
        view.down('#heatmap').hide()
      }
    }
    if (!getParametro('LABELMOVILTRACKVIEW')) {
      view.down('#mostraretiquetas').hide()
    }
  },

  onSetUrlGeoJson: function (url, view, forceLoad) {
    var controller = this
    if (!url) {
      var dateNow = new Date()
      var urlgeojson = '/handler/dispositivosGeoJson'
      urlgeojson += '?token=' + controller.application.getToken() //Ext.util.Cookies.get( 'OAuth_Token' );
      urlgeojson += '&_dc=' + dateNow.getTime()
      // urlgeojson += '&showState='+Ext.encode(['enmovimeinto','frenado','alarma']);
      //Daniel O. Medina por pedido de tarea DSS-786 se anula este filtro //urlgeojson += '&filter=' + Ext.encode( [ { "Id": "stateIN", "property": "stateIN", "value": "enmovimeinto,frenado,alarma" }] );
      view.urlGeoJson = urlgeojson
    } else {
      view.urlGeoJson = url
    }
    if (forceLoad) {
      this.onMarkersGeoJsonChange(view)
    }
  },

  /**
   * Adrian 20-12-2018 saque esto por que reformule el centrado para que funcione con layers
   */
  // 05-10 - JUAN Agrego el centrado del mapa en base al Extend (lo saque de TrackGuard)
  /*  centerMapGeojson: function(layer,gmappanel6) {
      var bounds = new google.maps.LatLngBounds();
              
              
      var count = 0;
      layer.forEach(function (feature) {
          
          bounds.extend(new google.maps.LatLng(feature.getGeometry().get().lat(),feature.getGeometry().get().lng()));
          count++;
      })
      
      if(count>0) {        
        
          var map = gmappanel6.getMap();
          var lastzoom = map.getZoom();
                  
          setTimeout(function(){
              map.panToBounds(bounds);
              map.fitBounds(bounds);                             
          }, 1000);
      
          if (map.getZoom()==0)
              map.setZoom(lastzoom);
      }
  },*/
  onMarkersGeoJsonChange: function (view, ultimos) {
    //cuando esta definido ultimo en true, intenta enviar la ultima fecha de load
    var controller = this
    if (view) {
      var gmappanel6 = view.down('#googlemap')
      if (gmappanel6.dispositivos) {
        //cuando gmappanel6.dispositivos esta en true aplico filtro de ultima llamada para traer solo los registros que se actualizaron
        var urlParametroUltimaCarga = ''
        if (ultimos) {
          //tomo fecha y armao string para filtro
          if (view.ultimaCarga) {
            urlParametroUltimaCarga =
              '&ultimaCarga=' + Ext.Date.format(view.ultimaCarga, 'Y-m-d g:i')
          }
          view.ultimaCarga = new Date()
        }
        Ext.Ajax.abort(view.geojsonAjax)
        view.geojsonAjax = Ext.Ajax.request({
          url: view.urlGeoJson + urlParametroUltimaCarga,
          success: function (response, opts) {
            var obj = Ext.JSON.decode(response.responseText)
            if (!ultimos) {
              //elimino los features
              gmappanel6.dispositivos.forEach(function (feature) {
                gmappanel6.dispositivos.remove(feature)
              })
            } else {
              //elimino solo los features que llegan
              for (var i in obj.features) {
                gmappanel6.dispositivos.forEach(function (feature) {
                  if (
                    feature.getProperty('cue_iid') ==
                    obj.features[i].properties.cue_iid
                  ) {
                    gmappanel6.dispositivos.remove(feature)
                  }
                })
              }
            }
            if (
              obj.features.length > 50 &&
              view.down('#mostraretiquetas').pressed &&
              getParametro('LABELMOVILTRACKVIEW')
            ) {
              notify(
                'Puede sufrir decremento de performance. Intente deshabilitar las etiquetas.'
              )
            }
            gmappanel6.dispositivos.addGeoJson(obj)
            /** adrian 20-12-2018  sque esto por que se refomulo el centroda para layres*/
            // 05-10 - JUAN Agrego el centrado del mapa en base al Extend (lo saque de TrackGuard)
            /*if (view.down('#center')._pressed){
                        controller.centerMapGeojson (gmappanel6.dispositivos, gmappanel6)
                    }*/
            gmappanel6.fireEvent('center', gmappanel6)
          }
        })
      } else {
        gmappanel6.dispositivos = new google.maps.Data()
        gmappanel6.dispositivos.loadGeoJson(
          view.urlGeoJson,
          null,
          function (features) {
            // 05-10 - JUAN Agrego el centrado del mapa en base al Extend (lo saque de TrackGuard)
            /* if (view.down('#center')._pressed){
                     controller.centerMapGeojson (gmappanel6.dispositivos, gmappanel6)
                 }*/
            gmappanel6.fireEvent('center', gmappanel6)
            if (features.length > 50) {
              //notify('Puede sufrir decremento de performance. Intente deshabilitar las etiquetas.')
              view.down('#mostraretiquetas').toggle(false)
            }
          }
        )
        gmappanel6.dispositivos.setStyle({ visible: true })
        gmappanel6.dispositivos.setStyle(function (feature) {
          if (
            view.down('#mostraretiquetas').pressed &&
            getParametro('LABELMOVILTRACKVIEW')
          ) {
            return {
              icon: {
                url: feature.getProperty('icon'),
                labelOrigin: new google.maps.Point(10, 50)
              },
              title: feature.getProperty('label'),
              label: {
                color: '#333',
                fontFamily: 'tahoma, arial',
                fontSize: '12px',
                fontWeight: 'bold',
                text: feature.getProperty('label')
              }
            }
          } else {
            return {
              icon: {
                url: feature.getProperty('icon')
              },
              title: feature.getProperty('label'),
              label: null
            }
          }
        })
        /*  gmappanel6.dispositivos.setStyle(function(feature) {
                  return {
                      icon: feature.getProperty('icon'),
                      title: feature.getProperty('title')
                  };
              });*/
        gmappanel6.dispositivos.setMap(gmappanel6.getMap())
        gmappanel6.dispositivos.addListener('mouseover', function (event) {
          var address = ''
          var infoRecord = Object.keys(event.feature).reduce(function (
            obj,
            key
          ) {
            obj[key] = event.feature[key]
            return obj
          },
          {})
          gmappanel6.infowindowOpened = new google.maps.InfoWindow({
            pixelOffset: new google.maps.Size(0, -60)
          })
          //var infoRecord = Ext.Object.getProperties(event.feature);//getProperties( event.feature );
          if (gmappanel6.infowindowOpened) {
            gmappanel6.infowindowOpened.close()
          }

          gmappanel6.infowindowOpened.setContent(
            controller.getVehicleInfoWindowHtmlGeoJson(infoRecord, address)
          )
          //busco la direccion
          var geocoder = view.down('gmappanel6').getGeocoder()
          geocoder.geocode(
            {
              location: event.feature.getGeometry().get()
            },
            function (result, status) {
              if (status == 'OK') {
                if (result.length > 0) {
                  address = result[0].formatted_address
                }
                //actualizo contenido
                gmappanel6.infowindowOpened.setContent(
                  controller.getVehicleInfoWindowHtmlGeoJson(
                    infoRecord,
                    address
                  )
                )
              } else {
                gmappanel6.infowindowOpened.setContent(
                  controller.getVehicleInfoWindowHtmlGeoJson(infoRecord, '')
                )
              }
            }
          )
          Ext.Ajax.request({
            url: '/rest/search/vehicle',
            method: 'GET',
            params: {
              filter: Ext.encode([
                {
                  property: 'cue_iid',
                  value: event.feature.getProperty('cue_iid')
                }
              ])
            },
            success: function (response, opts) {
              var obj = Ext.JSON.decode(response.responseText)
              infoRecord = obj.rows[0]
              gmappanel6.infowindowOpened.setContent(
                controller.getVehicleInfoWindowHtmlGeoJson(obj.rows[0], address)
              )
            }
          })
          gmappanel6.infowindowOpened.setPosition(
            event.feature.getGeometry().get()
          )
          gmappanel6.infowindowOpened.open(gmappanel6.getMap())
        })
        gmappanel6.dispositivos.addListener('mouseout', function (event) {
          gmappanel6.infowindowOpened.close()
        })
        gmappanel6.dispositivos.addListener('click', function (event) {
          var tabpanel = view.up('tabpanel')
          var store = Ext.create('Ext.data.Store', {
            model: controller.getVehicleSearchModelModel(),
            remoteFilter: true,
            pageSize: 2000,
            sorters: [
              {
                property: 'Name',
                direction: 'ASC'
              }
            ],
            filters: [
              {
                Id: 'cue_iid',
                property: 'cue_iid',
                value: event.feature.getProperty('cue_iid')
              }
            ]
          }).load({
            callback: function (records) {
              var title =
                records[0].get('cue_clinea') +
                '-' +
                records[0].get('cue_ncuenta') +
                ' ' +
                records[0].get('cue_cnombre')
              var tab = tabpanel.add(
                Ext.widget('vehicleslavegpsview', {
                  title: title,
                  translate: false,
                  record: records[0],
                  // 25-01 Modificado, originalmente indicaba b.lat() o b.lng()
                  center:
                    event.feature.getGeometry().get().lat() +
                    ',' +
                    event.feature.getGeometry().get().lng(),
                  closable: true,
                  closeAction: 'destroy'
                })
              )
              tabpanel.setActiveTab(tab)
            }
          })
        })
      }
    }
  },

  getVehicleInfoWindowHtmlGeoJson: function (vehicle, address, waitResolution) {
    var html =
      '\
            <div style="width:500px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <h2>{nombre}</h2>\
            '
    html += '\
                <table>'
    if (address) {
      html +=
        '\
                    <tr>\
                        <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <span class="x-btn-icon icon-map" style="display:inline-block; height: 16px; width:16px;"></span><span style="line-height:17px; vertical-align:top;"> {direccion}</span><br/>\
                        </td>\
                    </tr>\
                    '
    }
    html +=
      '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblVelocidad}:</span><span> {velocidad} km/h</span><br/>\
                           <span style="font-weight:bold;">{lblUltAlerta}:</span><span>  {alerta}</span><br/>\
                            <!--span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
                            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/-->\
                            <span style="font-weight:bold;">{lblOdometro}:</span><span>  {odometro}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                            <span style="font-weight:bold;">{lblFechaRecepcion}:</span><span>  {fecha}</span><br/>\
                           <span style="font-weight:bold;">{lblFechaGPS}:</span><span>  {fechaRaw}</span><br/>\
                           <span style="font-weight:bold;">{lblFechaAlerta}:</span><span>  {fechaAlerta}</span><br/>\
                           '
    if (
      vehicle.gps_iBattery &&
      vehicle.gps_iBattery != 0 &&
      vehicle.gps_iBattery != ''
    ) {
      html +=
        '<span style="font-weight:bold;">{lblBateria}:</span><span>  {bateria}</span><br/>'
    }
    html +=
      '\
                        </td>\
                    </tr>\
                    '
    html += '</table>'
    // traducciones
    html = html.replace(/\{lblBateria\}/, getLocale('Bateria'))
    html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'))
    html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'))
    html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'))
    html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'))
    html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'))
    html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'))
    html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'))
    html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'))
    html = html.replace(/\{lblOdometro\}/, getLocale('Odómetro'))
    // TENER EN CUENTA
    // el unico objeto qeu tiene los valores actualizados es POS
    //sta_dFechaUltimaAlerta
    if (vehicle.rec_cdll == 'MeitrackPacketParser') {
      html = html.replace(/\{bateria\}/, vehicle.gps_iBattery / 100)
    } else {
      html = html.replace(/\{bateria\}/, vehicle.gps_iBattery)
    }
    //TODO: mejorar como sabe si estar cargando la info completa
    if (vehicle.Domain == undefined) {
      var cargando = '<span class="x-mask-msg-text"></span>'
    } else {
      var cargando = ''
    }
    html = html.replace(/\{dealer\}/, vehicle.cue_clinea)
    html = html.replace(/\{ncuenta\}/, vehicle.cue_ncuenta)
    html = html.replace(
      /\{nombre\}/,
      vehicle.Domain ? vehicle.Domain : cargando
    )
    html = html.replace(
      /\{cuenta\}/,
      vehicle.cue_cnombre ? vehicle.cue_cnombre : cargando
    )
    html = html.replace(
      /\{velocidad\}/,
      vehicle.gps_iVelocidad ? vehicle.gps_iVelocidad : cargando
    )
    html = html.replace(/\{direccion\}/, address)
    html = html.replace(
      /\{fechaRaw\}/,
      vehicle.gps_tRawfechahora
        ? Ext.Date.format(new Date(vehicle.gps_tRawfechahora), 'd-m-Y H:i:s')
        : cargando
    )
    html = html.replace(
      /\{fecha\}/,
      vehicle.gps_isofechahora
        ? Ext.Date.format(new Date(vehicle.gps_isofechahora), 'd-m-Y H:i:s')
        : cargando
    )
    html = html.replace(
      /\{fechaAlerta\}/,
      vehicle.sta_dfechaultimaalerta
        ? Ext.Date.format(
            new Date(vehicle.sta_dfechaultimaalerta),
            'd-m-Y H:i:s'
          )
        : cargando
    )
    html = html.replace(
      /\{alerta\}/,
      vehicle.sta_cultimaalerta
        ? vehicle.sta_cultimaalerta + '-' + vehicle.cod_cdescripcion
        : cargando
    )
    html = html.replace(
      /\{latitud\}/,
      vehicle.gps_rLatitud ? vehicle.gps_rLatitud : cargando
    )
    html = html.replace(
      /\{longitud\}/,
      vehicle.gps_rLongitud ? vehicle.gps_rLongitud : cargando
    )
    html = html.replace(
      /\{odometro\}/,
      vehicle.gps_iOdometro ? vehicle.gps_iOdometro : cargando
    )
    return html
  },

  onFiltersClick: function (btn) {
    var controller = this
    var view = btn.up('mapguardgpsview')
    var gmappanel6 = view.down('gmappanel6')
    controller.showMarkerArray(gmappanel6, controller)
  },

  onManualCenter: function (gmappanel6) {
    var view = gmappanel6.up('mapguardgpsview')
    var btn = view.down('#center')
    if (btn._pressed) {
      //btn.btnEl.dom.click();
      btn.setText(getLocale('Cambiar a Centrar'))
      btn._pressed = false
      //btn.fireEvent('click', btn);
    }
  },

  /*
onTryCenter: ejecuta centrado con el setting definido sin hacer toogle
*/
  onTryCenter: function (gmappanel6) {
    var view = gmappanel6.up('mapguardgpsview')
    if (view.down('#center')) {
      btn = view.down('#center')
    }
    //doy vuelta los valores para poder mantener el mismo estado de centrado
    // por que oncenter funciona como toogle
    if (btn._pressed) {
      btn._pressed = false
    } else {
      btn._pressed = true
    }
    this.onCenterClick(btn)
  },

  onCenterClick: function (btn) {
    var view = btn.up('mapguardgpsview')
    console.log(view.down('gmappanel6'))
    view.GMAPPANEL = view.down('gmappanel6')
    if (!btn._pressed) {
      btn.setText(getLocale('Cambiar a Manual'))
      view.GMAPPANEL = view.down('gmappanel6')
      var bounds = new google.maps.LatLngBounds()
      if (view.GMAPPANEL.moviles) {
        view.GMAPPANEL.moviles.forEach(function (feature) {
          bounds.extend(feature.getGeometry().get())
        })
      }
      if (view.GMAPPANEL.dispositivos) {
        view.GMAPPANEL.dispositivos.forEach(function (feature) {
          bounds.extend(feature.getGeometry().get())
        })
      }
      if (view.GMAPPANEL.smartpanics) {
        view.GMAPPANEL.smartpanics.forEach(function (feature) {
          bounds.extend(feature.getGeometry().get())
        })
      }
      if (view.GMAPPANEL.smarttrack) {
        view.GMAPPANEL.smarttrack.forEach(function (feature) {
          bounds.extend(feature.getGeometry().get())
        })
      }
      if (view.GMAPPANEL.servtec) {
        view.GMAPPANEL.servtec.forEach(function (feature) {
          bounds.extend(feature.getGeometry().get())
        })
      }
      view.GMAPPANEL.getMap().fitBounds(bounds)
      btn._pressed = true
    } else {
      btn.setText(getLocale('Cambiar a Centrar'))
      btn._pressed = false
    }
  },

  onCuentasFijasClick: function (btn) {
    var view = btn.up('mapguardgpsview')
    var gmappanel6 = view.down('gmappanel6')
    var map = gmappanel6.getMap()
    if (btn.pressed) {
      if (!gmappanel6.cuentasfijas.loaded) {
        gmappanel6.cuentasfijas.loadGeoJson(
          gmappanel6.cuentasfijas.url,
          null,
          function () {
            gmappanel6.cuentasfijas.loaded = true
            gmappanel6.cuentasfijas.setStyle(function (feature) {
              return {
                icon: feature.getProperty('icon'),
                title: feature.getProperty('title')
              }
            })
          }
        )
      } else {
        gmappanel6.cuentasfijas.setStyle(function (feature) {
          return {
            icon: feature.getProperty('icon'),
            title: feature.getProperty('title')
          }
        })
      }
    } else {
      gmappanel6.cuentasfijas.setStyle({ visible: false })
    }
  },
  //---------------
  onCamarasClickSpiderfier: function (btn) {
    var view = btn.up('mapguardgpsview')
    var gmappanel6 = view.down('gmappanel6')
    var map = gmappanel6.getMap()
    var controller = this
    if (btn.pressed) {
      /* Recargo el GeoJSON de m_cuentas_video */
      var dateNow = new Date()
      var urlcamaras = '/handler/VideoByDealerGeoJson'
      urlcamaras += '?token=' + controller.application.getToken() //Ext.util.Cookies.get( 'OAuth_Token' );
      //urlcamaras += '&filter=[{"property":"georeferenciada","value":"0"},{"property":"tip_nTipo","value":"0"}]';
      urlcamaras += '&_dc=' + dateNow.getTime()
      //--elimino los markers almacenados en el controller para el spiderfier
      Ext.Array.each(controller.camarasMarkers, function (marker) {
        view.oms.removeMarker(marker)
      })
      //---------------------------------------------------------------
      Ext.Ajax.request({
        url: urlcamaras,
        success: function (response, opts) {
          console.log('response success: ' + response)
          var respJson = Ext.JSON.decode(response.responseText)
          controller.camarasMarkers = []
          Ext.Array.each(respJson.features, function (feature) {
            var lat = feature.geometry.coordinates[1]
            var lng = feature.geometry.coordinates[0]
            var markerData = { lat: lat, lng: lng } // e.g. { lat: 50.123, lng: 0.123, text: 'XYZ' }
            var marker = new google.maps.Marker({
              position: markerData,
              icon: feature.properties.icon,
              title: feature.properties.title
            }) // markerData works here as a LatLngLiteral
            marker.set('feature', {
              title: feature.properties.title,
              cue_iid: feature.properties.cue_iid,
              cuv_idKey: feature.properties.cuv_idKey,
              icon: feature.properties.description
            })
            controller.camarasMarkers.push(marker)
            // Console para ver cantidad de camaras e informacion
            //console.log(gmappanel6.camaras);
            // Cuando hago MouseOver, modifico el color de la Window y traigo al frente para saber cuál es
            marker.addListener('mouseover', function (event) {
              var win = marker.feature.videoWindow
              if (win) {
                win.setBodyStyle('border', '2px solid #037a3a')
              }
            })
            // Cuando hago MouseOut, quito el estilo de la ventana
            marker.addListener('mouseout', function (event) {
              var win = marker.feature.videoWindow
              if (win) {
                win.setBodyStyle('border', '')
              }
            })
            marker.addListener('spider_click', function (event) {
              var cue_iid = marker.feature.cue_iid
              var descripcion = marker.feature.description
              /* Cambio icono de la camara que estoy viendo */
              marker.setIcon('/resources/softguard/images/poi/camara_sel.png')
              Ext.Ajax.request({
                url:
                  '/Rest/search/m_cuentas_video?filter=[{"property":"cuv_iidCuenta","value":' +
                  cue_iid +
                  '}]',
                success: function (response, opts) {
                  var obj = Ext.JSON.decode(response.responseText)
                  //console.dir(obj);
                  // Genero la cabecera de la ventana
                  var cue_clinea = obj.rows[0].cue_clinea
                  var cue_ncuenta = obj.rows[0].cue_ncuenta
                  var cue_cnombre = obj.rows[0].cue_cnombre
                  var tvi_cnombre = obj.rows[0].tvi_cnombre
                  var tvi_cdescripcion = descripcion
                  //Creo como propiedad de la feature, la Window del video
                  //esto es para el efecto mouseover y luego mostrar cual es de las abiertas
                  marker.feature.videoWindow = Ext.widget('window', {
                    title: 'Vista previa',
                    height: 280,
                    width: 350,
                    resizable: false,
                    items: [
                      {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                          {
                            xtype: 'label',
                            width: '100%',
                            html:
                              '<div style="margin-top:10px;"> Cuenta : ' +
                              cue_clinea +
                              '-' +
                              cue_ncuenta +
                              ' ' +
                              cue_cnombre +
                              '</div>'
                          },
                          {
                            xtype: 'label',
                            width: '100%',
                            html:
                              '<div style="margin-bottom:15px;"> Tipo : ' +
                              tvi_cnombre +
                              '</div>'
                          },
                          {
                            xtype: 'videopreviewview',
                            preventHeader: true,
                            header: false,
                            record: obj.rows[0],
                            mapguard: 1,
                            fit: 1
                          }
                        ]
                      }
                    ],
                    layout: 'fit',
                    listeners: {
                      beforeclose: function () {
                        // Cambio icono de la camara que estoy viendo
                        marker.setIcon(
                          '/resources/softguard/images/poi/ipcam24.png'
                        )
                      }
                    }
                  }).show()
                },
                failure: function (response, opts) {
                  console.log(
                    'server-side failure with status code ' + response.status
                  )
                }
              })
            })
            view.oms.addMarker(marker)
          })
        }
      })
    } else {
      Ext.Array.each(controller.camarasMarkers, function (marker) {
        view.oms.removeMarker(marker)
      })
    }
  },
  //---------------
  /* SECCION ANULADA PARA SER REEMPLADA POR CON EL SPIDERFIER
onCamarasClick: function (btn) {
    var view = btn.up('mapguardgpsview');
    var gmappanel6 = view.down('gmappanel6');
    var map = gmappanel6.getMap();
            
    if(btn.pressed) {
        
        // Recargo el GeoJSON de m_cuentas_video 
        var dateNow = new Date();
        var urlcamaras = '/handler/VideoByDealerGeoJson';
            urlcamaras += '?token='+Ext.util.Cookies.get('OAuth_Token');
            //urlcamaras += '&filter=[{"property":"georeferenciada","value":"0"},{"property":"tip_nTipo","value":"0"}]';
            urlcamaras += "&_dc="+dateNow.getTime();
        
        
        //elimino los features
        gmappanel6.camaras.forEach(function (feature) {
            gmappanel6.camaras.remove(feature)
        })
    
        gmappanel6.camaras = new google.maps.Data();
        gmappanel6.camaras.loadGeoJson(urlcamaras);
        gmappanel6.camaras.setMap(map);
        
        //var ofs = new OverlappingFeatureSpiderfier(gmappanel6.camaras);
        // Console para ver cantidad de camaras e informacion 
        //console.log(gmappanel6.camaras);
        
        // Cuando hago MouseOver, modifico el color de la Window y traigo al frente para saber cuál es
        gmappanel6.camaras.addListener('mouseover', function(event) {
            var win = event.feature.videoWindow;
            if (win) {
                win.setBodyStyle('border', '2px solid #037a3a'); 
            }                
        });
        // Cuando hago MouseOut, quito el estilo de la ventana 
        gmappanel6.camaras.addListener('mouseout', function(event) {
            var win = event.feature.videoWindow;
            if (win) {
                win.setBodyStyle('border', '');
            }
        });
        
        // Cuando hago Click, tengo que abrir la InfoWindow
        gmappanel6.camaras.addListener('click', function(event) {
            var cue_iid = event.feature.getProperty("cue_iid");
            
            // Cambio icono de la camara que estoy viendo 
            event.feature.setProperty('icon', '/resources/softguard/images/poi/camara_sel.png');
            
            Ext.Ajax.request({
                 url: '/Rest/search/m_cuentas_video?filter=[{"property":"cuv_iidCuenta","value":'+cue_iid+'}]',
            
                 success: function(response, opts) {
                     var obj = Ext.JSON.decode(response.responseText);
                     //console.dir(obj);
                     
                     // Genero la cabecera de la ventana 
                     var cue_clinea = obj.rows[0].cue_clinea;
                     var cue_ncuenta = obj.rows[0].cue_ncuenta;
                     var cue_cnombre = obj.rows[0].cue_cnombre;
                     var tvi_cnombre = obj.rows[0].tvi_cnombre;
                    
                      //Creo como propiedad de la feature, la Window del video
                     //esto es para el efecto mouseover y luego mostrar cual es de las abiertas
                      
                     event.feature.videoWindow = Ext.widget('window',{
                        title: 'Vista previa',
                        height: 280,
                        width: 350,
                        resizable: false,
                        items: [
                            {
                                xtype : 'container',
                                layout : 'vbox',
                                items : [
                                    {
                                       xtype : 'label',
                                       width : '100%',
                                       html : '<div style="margin-top:10px;"> Cuenta : '+cue_clinea+'-'+cue_ncuenta+' '+cue_cnombre+'</div>'
                                    },{
                                       xtype : 'label',
                                       width : '100%',
                                       html : '<div style="margin-bottom:15px;"> Tipo : '+tvi_cnombre+'</div>'
                                    },{
                                        xtype: 'videopreviewview',
                                        preventHeader: true,
                                        header: false,
                                        record: obj.rows[0],
                                        mapguard : 1,
                                        fit : 1
                                    }
                                ]
                            }
                            ],
                        layout: 'fit',
                        listeners : {
                            beforeclose:function(){
                                // Cambio icono de la camara que estoy viendo 
                                event.feature.setProperty('icon', '/resources/softguard/images/poi/ipcam24.png');
                            }
                        }
                    }).show();
                    
                 },
            
                 failure: function(response, opts) {
                     console.log('server-side failure with status code ' + response.status);
                 }
             });
            
            
            
        
        
        
        
        
        });
                    
    } else {
        gmappanel6.camaras.setStyle({visible: false});
    }
},*/
  //----------------------------
  onCamarasZonasClickSpiderfier: function (btn) {
    var view = btn.up('mapguardgpsview')
    var gmappanel6 = view.down('gmappanel6')
    var controller = this
    var map = gmappanel6.getMap()
    /* Recargo el GeoJSON de VideoZonaByDealerGeoJson */
    var dateNow = new Date()
    var urlcamaraszonas = '/handler/VideoZonaByDealerGeoJson'
    urlcamaraszonas += '?token=' + controller.application.getToken() //Ext.util.Cookies.get( 'OAuth_Token' );
    urlcamaraszonas += '&_dc=' + dateNow.getTime()
    if (btn.pressed) {
      //--elimino los markers almacenados en el controller para el spiderfier
      Ext.Array.each(controller.camaraszonaMarkers, function (marker) {
        view.oms.removeMarker(marker)
      })
      //---------------------------------------------------------------
      Ext.Ajax.request({
        url: urlcamaraszonas,
        success: function (response, opts) {
          console.log('response success: ' + response)
          var respJson = Ext.JSON.decode(response.responseText)
          controller.camaraszonaMarkers = []
          Ext.Array.each(respJson.features, function (feature) {
            var lat = feature.geometry.coordinates[1]
            var lng = feature.geometry.coordinates[0]
            var markerData = { lat: lat, lng: lng } // e.g. { lat: 50.123, lng: 0.123, text: 'XYZ' }
            var marker = new google.maps.Marker({
              position: markerData,
              icon: feature.properties.icon,
              title: feature.properties.title
            }) // markerData works here as a LatLngLiteral
            marker.set('feature', {
              title: feature.properties.title,
              cue_iid: feature.properties.cue_iid,
              cuv_idKey: feature.properties.cuv_idKey,
              description: feature.properties.description
            })
            controller.camaraszonaMarkers.push(marker)
            marker.addListener(marker, 'mouseover', function (event) {
              var win = marker.feature.videoWindow
              if (win) {
                win.setBodyStyle('border', '2px solid #037a3a')
              }
            })
            marker.addListener('mouseout', function (event) {
              var win = marker.feature.videoWindow
              if (win) {
                win.setBodyStyle('border', '')
              }
            })
            marker.addListener('spider_click', function (event) {
              var cue_iid = marker.feature.cue_iid
              var descripcion = marker.feature.description
              /* Cambio icono de la camara que estoy viendo */
              marker.setIcon('/resources/softguard/images/poi/camara_sel.png')
              Ext.Ajax.request({
                url:
                  '/Rest/search/m_cuentas_video_links?filter=[{"property":"cue_iid","value":' +
                  cue_iid +
                  '}]',
                success: function (response, opts) {
                  var obj = Ext.JSON.decode(response.responseText)
                  //console.dir(obj);
                  // Genero la cabecera de la ventana
                  var cue_clinea = obj.rows[0].cue_clinea
                  var cue_ncuenta = obj.rows[0].cue_ncuenta
                  var cue_cnombre = obj.rows[0].cue_cnombre
                  var tvi_cnombre = obj.rows[0].tvi_cnombre
                  var tvi_cdescripcion = descripcion
                  //Creo como propiedad de la feature, la Window del video
                  //esto es para el efecto mouseover y luego mostrar cual es de las abiertas
                  marker.feature.videoWindow = Ext.widget('window', {
                    title: 'Vista previa',
                    height: 280,
                    width: 350,
                    resizable: false,
                    items: [
                      {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                          {
                            xtype: 'label',
                            width: '100%',
                            html:
                              '<div style="margin-top:10px;"> Cuenta : ' +
                              cue_clinea +
                              '-' +
                              cue_ncuenta +
                              ' ' +
                              cue_cnombre +
                              '</div>'
                          },
                          {
                            xtype: 'label',
                            width: '100%',
                            html:
                              '<div style="margin:5px 0;"> Descripción : ' +
                              tvi_cdescripcion +
                              '</div>'
                          },
                          {
                            xtype: 'label',
                            width: '100%',
                            html:
                              '<div style="margin-bottom:15px;"> Tipo : ' +
                              tvi_cnombre +
                              '</div>'
                          },
                          {
                            xtype: 'videopreviewview',
                            preventHeader: true,
                            header: false,
                            record: obj.rows[0],
                            mapguard: 1,
                            fit: 1
                          }
                        ]
                      }
                    ],
                    layout: 'fit',
                    listeners: {
                      beforeclose: function () {
                        //Cambio icono de la camara que estoy viendo
                        marker.setIcon(
                          '/resources/softguard/images/poi/camara_zona.png'
                        )
                      }
                    }
                  }).show()
                },
                failure: function (response, opts) {
                  console.log(
                    'server-side failure with status code ' + response.status
                  )
                }
              })
            })
            view.oms.addMarker(marker)
          })
        },
        failure: function (response, opts) {
          console.log('reponse failure: ' + response)
        }
      })
    } else {
      Ext.Array.each(controller.camaraszonaMarkers, function (marker) {
        view.oms.removeMarker(marker)
      })
    }
  },
  //-------------------------------------------
  /* SECCION ANULADA PARA SER REEMPLADA POR CON EL SPIDERFIER    
    onCamarasZonasClick: function (btn) {
        var view = btn.up('mapguardgpsview');
        var gmappanel6 = view.down('gmappanel6');
        var map = gmappanel6.getMap();
        
        if(btn.pressed) {
            
            // Recargo el GeoJSON de VideoZonaByDealerGeoJson 
            var dateNow = new Date();
            var urlcamaraszonas = '/handler/VideoZonaByDealerGeoJson';
            urlcamaraszonas += '?token='+Ext.util.Cookies.get('OAuth_Token');
            urlcamaraszonas += "&_dc="+dateNow.getTime();
            
            
            //elimino los features
            gmappanel6.camaraszonas.forEach(function (feature) {
                
                gmappanel6.camaraszonas.remove(feature)
            })
        
            gmappanel6.camaraszonas = new google.maps.Data();
            gmappanel6.camaraszonas.loadGeoJson(urlcamaraszonas);
            gmappanel6.camaraszonas.setMap(map);
            gmappanel6.camaraszonas.setStyle(function(feature) {
                return {
                    icon:feature.getProperty('icon'),
                    title: feature.getProperty('title')
                };
            });
            
            // Cuando hago MouseOver, modifico el color de la Window y traigo al frente para saber cuál es
            gmappanel6.camaraszonas.addListener('mouseover', function(event) {
                var win = event.feature.videoWindow;
                if (win) {
                    win.setBodyStyle('border', '2px solid #037a3a'); 
                }                
            });
            // Cuando hago MouseOut, quito el estilo de la ventana 
            gmappanel6.camaraszonas.addListener('mouseout', function(event) {
                var win = event.feature.videoWindow;
                if (win) {
                    win.setBodyStyle('border', '');
                }
            });
            
            // Cuando hago Click, tengo que abrir la InfoWindow
            gmappanel6.camaraszonas.addListener('click', function(event) {
                var cue_iid = event.feature.getProperty("cue_iid");
                var descripcion = event.feature.getProperty("description");
                
                // Cambio icono de la camara que estoy viendo 
                event.feature.setProperty('icon', '/resources/softguard/images/poi/camara_sel.png');
                
                Ext.Ajax.request({
                     url: '/Rest/search/m_cuentas_video_links?filter=[{"property":"cue_iid","value":'+cue_iid+'}]',
                
                     success: function(response, opts) {
                         var obj = Ext.JSON.decode(response.responseText);
                         //console.dir(obj);
                         
                         // Genero la cabecera de la ventana 
                         var cue_clinea = obj.rows[0].cue_clinea;
                         var cue_ncuenta = obj.rows[0].cue_ncuenta;
                         var cue_cnombre = obj.rows[0].cue_cnombre;
                         var tvi_cnombre = obj.rows[0].tvi_cnombre;
                         var tvi_cdescripcion = descripcion;
                        
                         // Creo como propiedad de la feature, la Window del video
                          // esto es para el efecto mouseover y luego mostrar cual es de las abiertas
                          
                         event.feature.videoWindow = Ext.widget('window',{
                            title: 'Vista previa',
                            height: 280,
                            width: 350,
                            resizable: false,
                            items: [
                                {
                                    xtype : 'container',
                                    layout : 'vbox',
                                    items : [
                                        {
                                           xtype : 'label',
                                           width : '100%',
                                           html : '<div style="margin-top:10px;"> Cuenta : '+cue_clinea+'-'+cue_ncuenta+' '+cue_cnombre+'</div>'
                                        },{
                                           xtype : 'label',
                                           width : '100%',
                                           html : '<div style="margin:5px 0;"> Descripción : '+tvi_cdescripcion+'</div>'
                                        },{
                                           xtype : 'label',
                                           width : '100%',
                                           html : '<div style="margin-bottom:15px;"> Tipo : '+tvi_cnombre+'</div>'
                                        },{
                                            xtype: 'videopreviewview',
                                            preventHeader: true,
                                            header: false,
                                            record: obj.rows[0],
                                            mapguard : 1,
                                            fit : 1
                                        }
                                    ]
                                }
                                ],
                            layout: 'fit',
                            listeners : {
                                beforeclose:function(){
                                    // Cambio icono de la camara que estoy viendo 
                                    event.feature.setProperty('icon', '/resources/softguard/images/poi/camara_zona.png');
                                }
                            }
                        }).show();
                        
                     },
                
                     failure: function(response, opts) {
                         console.log('server-side failure with status code ' + response.status);
                     }
                 });
                
                
                
            });
            
        } else {
            gmappanel6.camaraszonas.setStyle({visible: false});
        }
    },
    */
  /*
onHeatMapClick: function (btn) {
    var controller = this;
    
    var view = btn.up('mapguardgpsview');
    var map = view.down('gmappanel6').getMap();
    var heatmap = view.heatmap;
    var d = new Date();
    
    
    if (!heatmap){
        Ext.Ajax.request({
          url: '/rest/search/mapadelito',
          success: function(resp,operation) {
              
              // si la metadata del usuario tiene una provincia la sobre escribe para centrar el mapa
              if(resp.responseText)  {                 
                    
                    var metadata = Ext.JSON.decode(resp.responseText);
                    if(metadata) {
                        var heatMapData = [];
                        Ext.Array.each(metadata.rows, function(row){
                            var latlng = row.cue_clatlng.split(',');
                            if (latlng.length ==2 && parseFloat(latlng[0]) !== 0){
                                heatMapData.push({
                                    location: new google.maps.LatLng(latlng[0],latlng[1]),
                                    weight: parseInt(row.weight)
                                })
                            }
                            
                        })
                        view.heatmap = new google.maps.visualization.HeatmapLayer({
                          data: heatMapData
                        });   
                    }
                    
                    controller.onHeatMapClick(btn);
              }
          }})
        
        
    } else{
        if(btn.pressed) {
            view.heatmap.setMap(map);
        } else {
            view.heatmap.setMap(null);
        }
    }
    
    
}, */
  initView: function (view) {
    //  view.vehicleStore = this.getMapguardVehicleStoreStore();
    this.application._idModule = 18
    var controller = this
    var url =
      '/Rest/Security/Modules/' + this.application._idModule + '/Security'
    var gridvehicle = view.down('mapguardgridview')
    var gmappanel6 = view.down('gmappanel6')
    var store = KeyModulesStore //this.getKeyModulesStoreStore();
    var btntrackguard = view.down('#btntrackguard')
    var smartPanics = view.down('#smartPanics')
    var smartTrack = view.down('#smartTrack')
    var btnservtec = view.down('#btnservtec')
    if (!store.isModuleAvailable('Trackguard')) {
      btntrackguard.hide()
    }
    if (!store.isModuleAvailable('SmartPanics')) {
      smartPanics.hide()
    }
    if (!store.isModuleAvailable('SmartTrack')) {
      smartTrack.hide()
    }
    if (!store.isModuleAvailable('SgAppSerTec')) {
      btnservtec.hide()
    }
    /* view.vehicleFilters =  [                   
                {
                     property:"tmp_cnumero:LIKENOT",
                     value:"ST"
                     
                 }
             ];
     
     view.vehicleStore = Ext.create('Ext.data.Store',{
         model: controller.getMapguardModelModel(),
         remoteFilter: true,
         pageSize: 10000,
         filters: view.vehicleFilters
     });*/
    /*  gmappanel6.ultimasPosiciones = view.vehicleStore;*/
    /*   Ext.Ajax.request({
         url: url,
         method: 'GET',
         success: function(resp,operation) {
           var json = resp.responseText?JSON.parse(resp.responseText):null;
           if (json){
               var patrullasIds = json.filters.patrullas;*/
    /* view.vehicleFilters =  [
         {
             property:'tmp_idKey:IN',
             value: patrullasIds
         },{
             property:"tmp_cnumero:LIKENOT",
             value:"ST"
             
         }
     ];*/
    //    }
    //  gridvehicle.bindStore(view.vehicleStore);
    /*  view.vehicleStore.load(
          {
              callback:function (records) {
                  if (view.record){
                      view.rec_iid = view.record.get('rec_iid');
                      
                  }
                  
                  // como atiendo un evento muestro todos los vehiculos
                  // parche por problema de views[]
                  var selmodel = gridvehicle.getSelectionModel();
                  if (selmodel.views.length == 0)
                      selmodel.views.push(selmodel.view);
                  selmodel.selectAll();
          
              }
      
          }
          );*/
    /*   }
     })*/
    /*    
        view.servicioTecnicoStore = Ext.create('Ext.data.Store',{
          model: controller.getMapguardModelModel(),
          remoteFilter: true,
          pageSize: 10000,
          filters:  [
                  {
                      property:'tmp_cnumero:LIKE',
                      value: 'ST'
                  }
              ]
      });
      view.down('#servtecgrid').bindStore(view.servicioTecnicoStore);
      view.servicioTecnicoStore.load()*/
    //VOLVER ATRAS this.onSetUrlGeoJson(false, view, true)
  },
  onMapReady: function (gmappanel6) {
    var controller = this
    var view = gmappanel6.up('mapguardgpsview')
    var map = gmappanel6.getMap()
    var dateNow = new Date()
    gmappanel6.tg_tiempovidaalarma = getParametro('TG_TIEMPOVIDAALARMA')
    gmappanel6.tiempogps = getParametro('TIEMPOGPS')
    gmappanel6.TIEMPODISPOSITIVOS = getParametro('TIEMPODISPOSITIVOS')
    gmappanel6.DISPERSIONDISPOSITIVOS = getParametro('DISPERSIONDISPOSITIVOS')
    gmappanel6.DESKTOPEXTERNALURL = getParametro('DESKTOPEXTERNALURL')
    var controller = this

    // Pre-renderizar el menú de Móviles (lazy) para que el movilesgridview interno
    // dispare su afterrender -> initView -> armoUrlGeoJson y los marcadores aparezcan
    // en el mapa sin necesidad de que el usuario abra el menú. Tiene que ser después
    // de mapready: MovilesGridController termina llamando setMap(gmappanel6.getMap())
    // y la API de Google Maps recién está lista en este punto.
    var btnMovil = view.down('#btnMovil')
    if (btnMovil && !btnMovil.hidden) {
      var menuMovil = btnMovil.getMenu()
      if (menuMovil && !menuMovil.rendered) {
        menuMovil.showAt(-10000, -10000)
        menuMovil.hide()
      }
    }

    // agrego el markerclustered
    Ext.Ajax.request({
      url: '/Rest/t_parametros/',
      params: {
        filter:
          '[{"property":"par_ccodigo", "value":"OVERLAPPINGMARKERSPIDERFIER"}]'
      },
      method: 'GET',
      success: function (response, opts) {
        var jsonParam = Ext.JSON.decode(response.responseText)
        console.log('jsonParm.par_cValor: ' + jsonParam.rows[0].par_cvalor)
        gmappanel6.markerCluster = new MarkerClusterer(map, [], {
          gridSize: 60
        })
        Ext.Loader.loadScript({
          url: jsonParam.rows[0].par_cvalor, //'https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.min.js',
          onLoad: function () {
            view.oms = new OverlappingMarkerSpiderfier(map, {
              markersWontMove: true, // we promise not to move any markers, allowing optimizations
              markersWontHide: true, // we promise not to change visibility of any markers, allowing optimizations
              basicFormatEvents: true // allow the library to skip calculating advanced formatting information
            })
          }
        })
        controller.initView(view)
      }
    })
    // esto es código para overlapingspiderfier
    //-----------------
    // cargo los datos de cuentas fijas
    var url = '/handler/CuentaByDealerGeoJson'
    url += '?token=' + controller.application.getToken() //Ext.util.Cookies.get( 'OAuth_Token' );
    url +=
      '&filter=[{"property":"georeferenciada","value":"0"},{"property":"tip_nTipo","value":"0"}]'
    url += '&_dc=' + dateNow.getTime()
    var urlcamaras = '/handler/VideoByDealerGeoJson'
    urlcamaras += '?token=' + controller.application.getToken() //Ext.util.Cookies.get( 'OAuth_Token' );
    //urlcamaras += '&filter=[{"property":"georeferenciada","value":"0"},{"property":"tip_nTipo","value":"0"}]';
    urlcamaras += '&_dc=' + dateNow.getTime()
    var urlcamaraszonas = '/handler/VideoZonaByDealerGeoJson'
    urlcamaraszonas += '?token=' + controller.application.getToken() //Ext.util.Cookies.get( 'OAuth_Token' );
    //urlcamaras += '&filter=[{"property":"georeferenciada","value":"0"},{"property":"tip_nTipo","value":"0"}]';
    urlcamaraszonas += '&_dc=' + dateNow.getTime()
    gmappanel6.cuentasfijas = new google.maps.Data()
    gmappanel6.cuentasfijas.url = url
    gmappanel6.cuentasfijas.setStyle({ visible: false })
    //gmappanel6.cuentasfijas.loadGeoJson(url);
    gmappanel6.cuentasfijas.setMap(map)
    /* ANULADO PARA USAR SPIDERFIER
    gmappanel6.camaras = new google.maps.Data();
    gmappanel6.camaras.setStyle({visible: false});
    gmappanel6.camaras.url = urlcamaras;
    //gmappanel6.camaras.loadGeoJson(urlcamaras);
    gmappanel6.camaras.setMap(map);
    
    gmappanel6.camaraszonas = new google.maps.Data();
    gmappanel6.camaraszonas.setStyle({visible: false});
    gmappanel6.camaraszonas.url = urlcamaraszonas;
    //gmappanel6.camaraszonas.loadGeoJson(urlcamaraszonas);
    gmappanel6.camaraszonas.setMap(map);
    */
    //preparo los eventos
    map.data.addListener('click', function (event) {
      console.log('Click en cuenta fija')
      //controller.onCuentaSelected(event.feature,view);
    })
    /* view.task = Ext.TaskManager.start({
         args: [gmappanel6, controller],
         run: this.loadData,
         scope: controller,
         interval: 10000
     });
     
     this.loadData(gmappanel6, this);*/
    if (view.forceCuenta) {
      view.down('#eventoGrid').hide()
      view.down('#cuentas2').hide()
      view.down('#cuentas3').hide()
      // view.down('#cuentas4').hide();
      view.down('#smartPanics').hide()
      view.down('#smartTrack').hide()
      //view.down('#cuentasFijas').hide()
    } else {
      //    this.onCuentaTipoSelect(view.down('#comboCuentas'),this);
      /*
        view.accountTask = Ext.TaskManager.start({
            args: [view.down('#comboCuentas'),this],
            run: this.onCuentaTipoSelect,
            scope: controller,
            interval: 30000
        });
        */
    }
    if (UiApplicationMetadata.Kml) {
      var d = new Date()
      var url = Ext.String.urlAppend(
        UiApplicationMetadata.Kml,
        '_dc=' + d.getTime()
      )
      var kml = new google.maps.KmlLayer({
        url: String(url).replace(/{token}/, controller.application.getToken()) //Ext.util.Cookies.get( 'OAuth_Token' )
      })
      kml.setMap(map)
    }
    if (UiApplicationMetadata.MapType) {
      map.setMapTypeId(UiApplicationMetadata.MapType)
    }
    gmappanel6.tiempogps = getParametro('TIEMPOGPS')
    gmappanel6.tiempogps = getParametro('TG_TIEMPOVIDAALARMA')
    controller.infowindow = new google.maps.InfoWindow() //este infoWindow es glabal para las polyline de las geocercas
  },

  onMarkersCuentaChange: function (gmappanel6, cuentaList, keepSelected) {
    var view = gmappanel6.up('mapguardgpsview')
    if (view.keepSelected) keepSelected = view.keepSelected
    if (!view.vehicleSelected && !keepSelected) {
      this.clearVehicles(gmappanel6)
    }
    if (!keepSelected) {
      this.cleanSelected(view)
    }
    this.clearCuentas(gmappanel6)
    // borro todos los markers
    gmappanel6.markerCluster.clearMarkers()
    // regenero las cuentas
    if (cuentaList) gmappanel6.cuentaList = cuentaList
    this.loadData(gmappanel6, this)
    this.showMarkerArray(gmappanel6, this)
  },

  onMarkersChange: function (gmappanel6, vehiclelist, keepSelected) {
    var view = gmappanel6.up('mapguardgpsview')
    this.clearVehicles(gmappanel6)
    if (vehiclelist) gmappanel6.vehicleList = vehiclelist
    this.loadData(gmappanel6, this)
    this.showMarkerArray(gmappanel6, this)
  },

  onMarkersTrackguardChange: function (
    gmappanel6,
    trackguardlist,
    keepSelected
  ) {
    var view = gmappanel6.up('mapguardgpsview')
    this.clearTrackguard(gmappanel6)
    if (trackguardlist) gmappanel6.trackguardList = trackguardlist
    this.showMarkerArray(gmappanel6, this)
  },

  onMarkersSmartpanicsChange: function (
    gmappanel6,
    smartpaniclist,
    keepSelected
  ) {
    var view = gmappanel6.up('mapguardgpsview')
    this.clearSmartPanics(gmappanel6)
    gmappanel6.smartpanicsList = smartpaniclist
    this.showMarkerArray(gmappanel6, this)
  },

  onMarkersSmartTrackChange: function (
    gmappanel6,
    smartTracklist,
    keepSelected
  ) {
    var view = gmappanel6.up('mapguardgpsview')
    this.clearSmartTrack(gmappanel6)
    gmappanel6.smartTrackList = smartTracklist
    this.showMarkerArray(gmappanel6, this)
  },

  onMarkersServtecChange: function (gmappanel6, vehiclelist, keepSelected) {
    var view = gmappanel6.up('mapguardgpsview')
    this.clearServTec(gmappanel6)
    gmappanel6.servtecList = vehiclelist
    this.showMarkerArray(gmappanel6, this)
  },

  onMarkersDealerChange: function (gmappanel6, dealerList, keepSelected) {
    var view = gmappanel6.up('mapguardgpsview')
    this.clearDealer(gmappanel6)
    // borro todos los markers
    //gmappanel6.markerCluster.clearMarkers()
    // regenero las cuentas
    // if (vehiclelist)
    gmappanel6.dealerList = dealerList
    this.showMarkerArray(gmappanel6, this)
  },

  onVehicleRefresh: function (view, record) {
    var gmappanel6 = view.down('gmappanel6')
    this.showVehicle.call({ gmappanel6: gmappanel6, controller: this }, record)
  },

  clearVehicles: function (gmappanel6) {
    Ext.Array.each(gmappanel6.vehicleList, function (vehicle) {
      if (vehicle.marker) {
        vehicle.marker.setMap(null)
        vehicle.marker = null
      }
    })
  },

  clearCuentas: function (gmappanel6) {
    Ext.Array.each(gmappanel6.cuentaList, function (cuenta) {
      if (cuenta.marker) {
        cuenta.marker.setMap(null)
        cuenta.marker = null
      }
    })
  },

  clearDealer: function (gmappanel6) {
    Ext.Array.each(gmappanel6.dealerList, function (cuenta) {
      if (cuenta.marker) {
        cuenta.marker.setMap(null)
        gmappanel6.markerCluster.removeMarker(cuenta.marker)
        cuenta.marker = null
      }
    })
  },

  clearTrackguard: function (gmappanel6) {
    Ext.Array.each(gmappanel6.trackguardList, function (trackguard) {
      if (trackguard.marker) {
        trackguard.marker.setMap(null)
        trackguard.marker = null
      }
    })
  },

  clearSmartPanics: function (gmappanel6) {
    Ext.Array.each(gmappanel6.smartpanicsList, function (smartpanics) {
      if (smartpanics.marker) {
        smartpanics.marker.setMap(null)
        smartpanics.marker = null
      }
    })
  },

  clearSmartTrack: function (gmappanel6) {
    Ext.Array.each(gmappanel6.smartTrackList, function (smarttrack) {
      if (smarttrack.marker) {
        smarttrack.marker.setMap(null)
        smarttrack.marker = null
      }
    })
  },

  clearServTec: function (gmappanel6) {
    Ext.Array.each(gmappanel6.servtecList, function (servtec) {
      if (servtec.marker) {
        servtec.marker.setMap(null)
        servtec.marker = null
      }
    })
  },

  getTrackguardPosition: function (vehicle, gmappanel6) {
    var store = gmappanel6.ultimasPosiciones
    //console.log(store);
    // tomo los valores del vehicle
    var point = new google.maps.LatLng(
      vehicle.get('gps_rLatitud'),
      vehicle.get('gps_rLongitud')
    )
    vehicle.position = point
    return {
      lat: vehicle.get('gps_rLatitud'),
      long: vehicle.get('gps_rLongitud'),
      position: point,
      gps: vehicle
    }
    /*
    if (store){     
        var record = store.findRecord('gps_idCuenta', vehicle.get('OwnerId'));
        if (record){
           // var myLatLng = record.get('gps_rLatitud')+","+record.get('gps_rLongitud')//record.get('cLatLng');
          //  var arrayLatLng = myLatLng.split(',');
            if (!isNaN(record.get('gps_rLatitud')) && !isNaN(record.get('gps_rLongitud'))){
                var point = new google.maps.LatLng(record.get('gps_rLatitud'),record.get('gps_rLongitud'));
                record.position = point;
                return {lat: record.get('gps_rLatitud'), long: record.get('gps_rLongitud'), position: point, gps: record};
            }
            else return {lat:'',long:'',position: null}
        }else return {lat:'',long:'',position: null}
    }
    */
  },

  getVehiclePosition: function (vehicle, gmappanel6) {
    if (
      vehicle.get('gps_rLatitud') != '' &&
      vehicle.get('gps_rLatitud') != '0.0'
    ) {
      var point = new google.maps.LatLng(
        vehicle.get('gps_rLatitud'),
        vehicle.get('gps_rLongitud')
      )
      vehicle.position = point
      return {
        lat: vehicle.get('gps_rLatitud'),
        long: vehicle.get('gps_rLongitud'),
        position: point,
        gps: null
      }
    } else {
      var myLatLng = vehicle.get('cLatLng')
      var arrayLatLng = myLatLng.split(',')
      var point = new google.maps.LatLng(arrayLatLng[0], arrayLatLng[1])
      vehicle.position = point
      return {
        lat: arrayLatLng[0],
        long: arrayLatLng[1],
        position: point,
        gps: null
      }
    }
  },

  getSmartPanicPosition: function (vehicle, gmappanel6) {
    if (
      !isNaN(vehicle.get('gps_rLatitud')) &&
      !isNaN(vehicle.get('gps_rLongitud'))
    ) {
      var point = new google.maps.LatLng(
        vehicle.get('gps_rLatitud'),
        vehicle.get('gps_rLongitud')
      )
      vehicle.position = point
      return {
        lat: vehicle.get('gps_rLatitud'),
        long: vehicle.get('gps_rLongitud'),
        position: point,
        gps: vehicle
      }
    } else return { lat: '', long: '', position: null }
  },

  getCuentaPosition: function (record, gmappanel6) {
    var arrayLatLng = []
    if (record.get('sp_rlongitud') && record.get('sp_rlongitud') != '') {
      arrayLatLng[0] = record.get('sp_rlatitud')
      arrayLatLng[1] = record.get('sp_rlongitud')
    } else if (
      record.get('gps_rlongitud') &&
      record.get('gps_rlongitud') != ''
    ) {
      arrayLatLng[0] = record.get('gps_rlatitud')
      arrayLatLng[1] = record.get('gps_rlongitud')
    } else if (record.get('lat') && record.get('long') != '') {
      arrayLatLng[0] = record.get('lat')
      arrayLatLng[1] = record.get('long')
    } else if (record.get('cue_cLatLng')) {
      var myLatLng = record.get('cue_cLatLng')
      var arrayLatLng = myLatLng.split(',')
    } else if (record.get('cue_clatlng')) {
      var myLatLng = record.get('cue_clatlng')
      var arrayLatLng = myLatLng.split(',')
    }
    if (arrayLatLng.length > 1) {
      if (!isNaN(arrayLatLng[0]) && !isNaN(arrayLatLng[1])) {
        var point = new google.maps.LatLng(arrayLatLng[0], arrayLatLng[1])
        return {
          lat: arrayLatLng[0],
          long: arrayLatLng[1],
          position: point,
          gps: record
        }
      } else return { lat: '', long: '', position: null }
    } else {
      return { lat: 0, long: 0, position: null }
    }
  },

  getVehicleIcon: function (vehicle, gmappanel6) {
    var iconUrl = '/resources/softguard/images/mapguard-cservice/'
    var tipo = 'movil_asignado'
    if (vehicle.get('cService') == 'ST') {
      tipo = 'ServiceTecnico'
    } else {
      switch (vehicle.get('tmp_nestado')) {
        case 1:
          tipo = 'movil_disponible'
          break
        case 2:
          tipo = 'Sos'
          break
        case 3:
          tipo = 'movil_asignado'
      }
    }
    if (tipo == 'movil_asignado' || tipo == 'movil_disponible') {
      if (
        Ext.Date.add(
          new Date(Ext.Date.now()),
          Ext.Date.MINUTE,
          gmappanel6.TIEMPODISPOSITIVOS * -1
        ) > new Date(vehicle.get('gps_tfechahora')) ||
        vehicle.get('gps_tfechahora') == ''
      ) {
        //iconUrl = '/resources/softguard/images/mapguard-cservice/movil_asignado_old.png';
        tipo += '_old'
      } /*else if (cuenta.get('gps_rAccuracy') > gmappanel6.DISPERSIONDISPOSITIVOS) {
                iconUrl = '/resources/softguard/images/mapguard-cservice/sp_disper.png';
            }*/
    }
    iconUrl = iconUrl + tipo + '.png'
    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0),
      new google.maps.Point(15, 35)
    )
    return image
  },

  getTrackguardeIcon: function (vehicle, gmappanel6) {
    // var iconUrl = '/resources/softguard/images/trackguard-'+vehicle.get('tip_nTipo')+'.png';
    var now = new Date()
    var ageAlarma = (now - vehicle.get('sta_dfechautimaalarma')) / 60000
    var ageGps = (now - vehicle.get('gps_isofechahora')) / 60000
    /*  if (vehicle.selected){*/
    if (ageAlarma < gmappanel6.tg_tiempovidaalarma) {
      color = '_red'
      vehicle.isAlarma = true
    } else {
      color = ''
      vehicle.isAlarma = false
    }
    /*    }else if(ageAlarma<gmappanel6.tg_tiempovidaalarma){
            color='_alert'
            vehicle.isAlarma = true;
        };*/
    if (ageGps > gmappanel6.tiempogps) {
      iconUrl = '/resources/softguard/images/exclamacion' + color + '.png'
      vehicle.isVieja = true
    } else {
      vehicle.isAlarma = false
      if (vehicle.get('gps_iVelocidad') == 0) {
        iconUrl = '/resources/softguard/images/stop' + color + '.png'
        vehicle.isFrenado = true
      } else if (vehicle.get('gps_Rumbo')) {
        iconUrl =
          '/resources/softguard/images/direction_' +
          vehicle.get('gps_Rumbo') +
          color +
          '.png'
        vehicle.isFrenado = false
      } else {
        iconUrl = '/resources/softguard/images/exclamacion' + color + '.png'
        //vehicle.isVieja = true;
      }
    }
    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0),
      new google.maps.Point(15, 35)
    )
    return image
  },

  getCuentaIcon: function (cuenta, gmappanel6) {
    var cuentaTipoIcon = cuenta.get('tip_curlimagen')
    var iconUrl = '/resources/softguard/images/enalarma.png'
    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0),
      new google.maps.Point(15, 35)
    )
    return image
  },

  getSmartPanicIcon: function (cuenta, gmappanel6) {
    //    var iconUrl = '/resources/global/images/icons/';
    var tipo = 'Casa' // cuenta.get('tip_cdescripcion');
    if (cuenta.get('selected')) {
      tipo = tipo + '_selected'
    }
    cuenta.isOld = false
    cuenta.isDisperso = false
    cuenta.isActual = false
    if (
      Ext.Date.add(
        new Date(Ext.Date.now()),
        Ext.Date.MINUTE,
        gmappanel6.TIEMPODISPOSITIVOS * -1
      ) > new Date(cuenta.get('gps_tfechahora'))
    ) {
      iconUrl = '/resources/softguard/images/mapguard-cservice/sp_old.png'
      cuenta.isOld = true
    } else if (
      cuenta.get('gps_rAccuracy') > gmappanel6.DISPERSIONDISPOSITIVOS
    ) {
      iconUrl = '/resources/softguard/images/mapguard-cservice/sp_disper.png'
      cuenta.isDisperso = true
    } else {
      iconUrl = '/resources/softguard/images/mapguard-cservice/sp.png'
      cuenta.isActual = true
    }
    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0),
      new google.maps.Point(15, 35)
    )
    return image
  },

  getServTecIcon: function (cuenta, gmappanel6) {
    //    var iconUrl = '/resources/global/images/icons/';
    var tipo = 'Casa' // cuenta.get('tip_cdescripcion');
    if (cuenta.get('selected')) {
      tipo = tipo + '_selected'
    }
    iconUrl = '/resources/softguard/images/poi/taller.png'
    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0),
      new google.maps.Point(15, 35)
    )
    return image
  },

  getSmartTrackIcon: function (cuenta, gmappanel6) {
    //    var iconUrl = '/resources/global/images/icons/';
    var tipo = 'Casa' // cuenta.get('tip_cdescripcion');
    if (cuenta.get('selected')) {
      tipo = tipo + '_selected'
    }
    cuenta.isOld = false
    cuenta.isDisperso = false
    cuenta.isActual = false
    if (
      Ext.Date.add(
        new Date(Ext.Date.now()),
        Ext.Date.MINUTE,
        gmappanel6.TIEMPODISPOSITIVOS * -1
      ) > new Date(cuenta.get('gps_tfechahora'))
    ) {
      iconUrl = '/resources/softguard/images/mapguard-cservice/vc_old.png'
      cuenta.isOld = true
    } else if (
      cuenta.get('gps_rAccuracy') > gmappanel6.DISPERSIONDISPOSITIVOS
    ) {
      iconUrl = '/resources/softguard/images/mapguard-cservice/vc_disper.png'
      cuenta.isDisperso = true
    } else {
      iconUrl = '/resources/softguard/images/mapguard-cservice/vc.png'
      cuenta.isActual = true
    }
    if (cuenta.get('Config') != '') {
      var configObj = Ext.JSON.decode(cuenta.get('Config'))
      if (configObj && configObj.Icono) {
        iconUrl = configObj.Icono
      }
    }
    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0),
      new google.maps.Point(15, 35)
    )
    return image
  },

  loadDataOLD: function (gmappanel6, controller) {
    var vehicles = gmappanel6.vehicleList
    var view = gmappanel6.up('mapguardgpsview')
    // si se cerro la ventana freno la tarea
    if (!view) {
      Ext.TaskManager.stop({
        args: [gmappanel6, controller],
        run: this.loadData
      })
      return false
    }
    if (vehicles && vehicles.length > 0) {
      //console.log(gmappanel6.ultimasPosiciones.filters);
      var ultimasPosicionesClonado = deepCloneStore(
        gmappanel6.ultimasPosiciones
      )
      ultimasPosicionesClonado.filter(view.vehicleFilters)
      Ext.apply(ultimasPosicionesClonado, { pageSize: 10000 })
      ultimasPosicionesClonado.load({
        callback: function (records, operation, success) {
          //PARCHE HORRIBLE para que tome las ultimas posiciones del clonado REVISAR
          Ext.Array.each(records, function (r) {
            var v = gmappanel6.ultimasPosiciones.findRecord(
              'tmp_iid',
              r.get('tmp_iid')
            )
            if (v) {
              v.set('cLatLng', r.get('cLatLng'))
            }
          })
          controller.showMarkerArray(gmappanel6, controller)
        }
      })
    } else {
      //console.log('no hay vehiculos para mostrar')
    }
    // actualizo las cuentas NO paso a actualizacion manual.
    //controller.onCuentaTipoSelect(view.down('#comboCuentas'));
  },

  loadData: function (gmappanel6, controller) {
    var vehicles = gmappanel6.vehicleList
    var controller = this
    var view = gmappanel6.up('mapguardgpsview')
    // si se cerro la ventana freno la tarea
    if (!view) {
      Ext.TaskManager.stop({
        args: [gmappanel6, controller],
        run: this.loadData
      })
      return false
    }
    // actualizacion posiciones IMEI (vigicontrol y SP)
    // vamos a actualizar directamente la posicion en el record del dispositivo, para no tener 2 stores de posiciones como en TG
    if (!gmappanel6.p_gpssp) {
      gmappanel6.p_gpssp = Ext.create('Ext.data.Store', {
        pageSize: 1000,
        model: controller.getP_GpsSpModelModel()
      })
    }
    // armo el array de IMEI
    var smartpanics = gmappanel6.smartpanicsList
    var vigicontrol = gmappanel6.smartTrackList
    var imeilist = []
    Ext.Array.each(smartpanics, function (sp) {
      Ext.Array.push(imeilist, sp.get('Imei'))
    })
    Ext.Array.each(vigicontrol, function (vc) {
      Ext.Array.push(imeilist, vc.get('Imei'))
    })
    // si hay dispositivos, busco
    if (imeilist.length > 0) {
      gmappanel6.p_gpssp.load({
        filters: [
          {
            property: 'gps_cIMEI:IN',
            value: imeilist.join(','),
            Id: 'gps_cIMEI'
          }
        ],
        callback: function () {
          //console.log(arguments);
          // actualizo la posicion de cada dispositivo.
          gmappanel6.p_gpssp.each(function (r) {
            //busco el SP
            var bsp = false
            Ext.Array.each(smartpanics, function (sp) {
              if (sp.get('Imei') == r.get('gps_cIMEI')) {
                sp.set('gps_rLatitud', r.get('gps_rLatitud'))
                sp.set('gps_rLongitud', r.get('gps_rLongitud'))
                sp.set('gps_tfechahora', r.get('gps_tfechahora'))
                sp.set('gps_rAccuracy', r.get('gps_rAccuracy'))
                bsp = true
              }
              if (bsp) return false
            })
            if (!bsp) {
              // busco vigicontrol
              Ext.Array.each(vigicontrol, function (vc) {
                if (vc.get('Imei') == r.get('gps_cIMEI')) {
                  vc.set('gps_rLatitud', r.get('gps_rLatitud'))
                  vc.set('gps_rLongitud', r.get('gps_rLongitud'))
                  vc.set('gps_tfechahora', r.get('gps_tfechahora'))
                  vc.set('gps_rAccuracy', r.get('gps_rAccuracy'))
                  bsp = true
                }
                if (bsp) return false
              })
            }
          })
        }
      })
    }
    if (true) {
      // && vehicles && vehicles.length > 0){
      if (!gmappanel6.ultimasPosiciones) {
        //si aun no tenemos ultimaposiciones genero store para guardar posiciones
        gmappanel6.ultimasPosiciones = Ext.create('Ext.data.Store', {
          pageSize: 1000,
          model: controller.getVehicleGpsModelModel()
        })
      }
      if (!gmappanel6.ultimasPosicionesLoader) {
        gmappanel6.ultimasPosicionesLoader = Ext.create('Ext.data.Store', {
          pageSize: 1000,
          model: controller.getVehicleGpsModelModel(),
          loading: true,
          sorters: [
            {
              property: 'gps_tfechahora',
              direction: 'ASC'
            }
          ]
        }).load({
          params: {
            short: true
          },
          callback: function (records) {
            gmappanel6.ultimasPosicionesLoader.loading = false
            Ext.Array.each(records, function (r, k) {
              //guardo la ultima fecha
              view.ultimaFechaCargada = r.get('gps_tfechahora')
              //   console.log(view.ultimaFechaCargada );
              //agrego a las ultimas posiciones
              gmappanel6.ultimasPosiciones.add(r)
            })
          }
        })
      } else if (
        !gmappanel6.ultimasPosicionesLoader.loading &&
        view.ultimaFechaCargada !== undefined
      ) {
        //si ya tenemos la carga incial (y no esta cargando) traigo lo nuevo
        gmappanel6.ultimasPosicionesLoader = Ext.create('Ext.data.Store', {
          pageSize: 1000,
          model: controller.getVehicleGpsModelModel(),
          remoteFilter: true,
          remoteSort: true,
          filters: [
            {
              property: 'fechaDesdeMayor',
              value: Ext.Date.format(
                new Date(view.ultimaFechaCargada),
                'Y-m-d  H:i:s'
              )
            }
          ],
          sorters: [
            {
              property: 'gps_tfechahora',
              direction: 'ASC'
            }
          ]
        }).load({
          params: {
            short: true
          },
          callback: function (records) {
            var ultimasposiciones = gmappanel6.ultimasPosicionesLoader
            Ext.Array.each(records, function (r, k) {
              //lo que trae le sobre escribo la latylong
              var record = ultimasposiciones.findRecord(
                'gps_idCuenta',
                r.get('gps_idCuenta')
              )
              if (record) {
                record.set('cLatLng', r.get('cLatLng'))
                record.set('gps_rLatitud', r.get('gps_rLatitud'))
                record.set('gps_rLongitud', r.get('gps_rLongitud'))
                record.set('gps_tfechahora', r.get('gps_tfechahora'))
                record.set('gps_rAccuracy', r.get('gps_rAccuracy'))
                record.set('gps_iOdometro', r.get('gps_iOdometro'))
                record.set('gps_iRumbo', r.get('gps_iRumbo'))
                record.set('gps_Rumbo', r.get('gps_Rumbo'))
                record.set('gps_iVelocidad', r.get('gps_iVelocidad'))
                record.set('gps_isofechahora', r.get('gps_isofechahora'))
                record.set('gps_isorawfechahora', r.get('gps_isorawfechahora'))
                record.set('gps_iid', r.get('gps_iid'))
                record.set('sta_cUltimaAlerta', r.get('sta_cUltimaAlerta'))
                record.set(
                  'sta_dFechaUltimaAlerta',
                  r.get('sta_dFechaUltimaAlerta')
                )
              } else {
                gmappanel6.ultimasPosiciones.add(r)
              }
              if (r.get('gps_tfechahora')) {
                view.ultimaFechaCargada = r.get('gps_tfechahora')
              }
              // actualizo trackguard
              Ext.Array.each(gmappanel6.trackguardList, function (r) {
                var v = ultimasposiciones.findRecord(
                  'gps_idCuenta',
                  r.get('cue_iid')
                )
                if (v) {
                  r.set('cLatLng', v.get('cLatLng'))
                  r.set('tmp_nestado', v.get('tmp_nestado'))
                  r.set('asi_cLatLng', v.get('asi_cLatLng'))
                  r.set('asi_clinea', v.get('asi_clinea'))
                  r.set('asi_cnombre', v.get('asi_cnombre'))
                  r.set('asi_cueiid', v.get('asi_cueiid'))
                  r.set('asi_ncuenta', v.get('asi_ncuenta'))
                  r.set('lat', v.get('gps_rLatitud'))
                  r.set('long', v.get('gps_rLongitud'))
                  r.set('gps_rLatitud', v.get('gps_rLatitud'))
                  r.set('gps_rLongitud', v.get('gps_rLongitud'))
                  r.dirty == true
                  r.set('gps_tfechahora', v.get('gps_tfechahora'))
                  r.set('gps_rAccuracy', v.get('gps_rAccuracy'))
                  r.set('gps_isofechahora', v.get('gps_isofechahora'))
                  r.set('gps_isorawfechahora', v.get('gps_isorawfechahora'))
                  r.set('gps_iVelocidad', v.get('gps_iVelocidad'))
                  r.set('gps_Rumbo', v.get('gps_Rumbo'))
                  r.set('sta_cUltimaAlerta', r.get('sta_cUltimaAlerta'))
                  r.set(
                    'sta_dFechaUltimaAlerta',
                    v.get('sta_dFechaUltimaAlerta')
                  )
                }
              })
            })
            // dedalo: saque esto fuera del bucle porque lo calculaba cada vez por row...
            var vehicleGridStore = view.down('mapguardgridview').getStore()
            var vehicleStore = Ext.create('Ext.data.Store', {
              pageSize: 1000,
              model: controller.getMapguardModelModel(),
              sorters: [
                {
                  property: 'gps_tfechahora',
                  direction: 'ASC'
                }
              ]
            }).load({
              callback: function (records) {
                Ext.Array.each(gmappanel6.vehicleList, function (r, k) {
                  var vehicleRecord = vehicleGridStore.findRecord(
                    'tmp_iid',
                    r.get('tmp_iid')
                  )
                  var v = vehicleStore.findRecord('tmp_iid', r.get('tmp_iid'))
                  if (v) {
                    gmappanel6.vehicleList[k].set('cLatLng', v.get('cLatLng'))
                    gmappanel6.vehicleList[k].set(
                      'tmp_nestado',
                      v.get('tmp_nestado')
                    )
                    gmappanel6.vehicleList[k].set(
                      'asi_cLatLng',
                      v.get('asi_cLatLng')
                    )
                    gmappanel6.vehicleList[k].set(
                      'asi_clinea',
                      v.get('asi_clinea')
                    )
                    gmappanel6.vehicleList[k].set(
                      'asi_cnombre',
                      v.get('asi_cnombre')
                    )
                    gmappanel6.vehicleList[k].set(
                      'asi_cueiid',
                      v.get('asi_cueiid')
                    )
                    gmappanel6.vehicleList[k].set(
                      'asi_ncuenta',
                      v.get('asi_ncuenta')
                    )
                    gmappanel6.vehicleList[k].set('lat', v.get('gps_rLatitud'))
                    gmappanel6.vehicleList[k].set(
                      'long',
                      v.get('gps_rLongitud')
                    )
                    gmappanel6.vehicleList[k].set(
                      'gps_rLatitud',
                      v.get('gps_rLatitud')
                    )
                    gmappanel6.vehicleList[k].set(
                      'gps_rLongitud',
                      v.get('gps_rLongitud')
                    )
                    gmappanel6.vehicleList[k].set(
                      'cue_cLatLng',
                      v.get('cue_cLatLng')
                    )
                    gmappanel6.vehicleList[k].dirty == true
                    gmappanel6.vehicleList[k].set(
                      'gps_tfechahora',
                      v.get('gps_tfechahora')
                    )
                    gmappanel6.vehicleList[k].set(
                      'gps_rAccuracy',
                      v.get('gps_rAccuracy')
                    )
                    gmappanel6.vehicleList[k].set(
                      'gps_isofechahora',
                      v.get('gps_isofechahora')
                    )
                    gmappanel6.vehicleList[k].set(
                      'gps_isorawfechahora',
                      v.get('gps_isorawfechahora')
                    )
                    gmappanel6.vehicleList[k].set(
                      'gps_iVelocidad',
                      v.get('gps_iVelocidad')
                    )
                    gmappanel6.vehicleList[k].set(
                      'gps_Rumbo',
                      v.get('gps_Rumbo')
                    )
                    gmappanel6.vehicleList[k].set(
                      'sta_cUltimaAlerta',
                      r.get('sta_cUltimaAlerta')
                    )
                    gmappanel6.vehicleList[k].set(
                      'sta_dFechaUltimaAlerta',
                      v.get('sta_dFechaUltimaAlerta')
                    )
                    vehicleRecord.set('cLatLng', v.get('cLatLng'))
                    vehicleRecord.set('_cestado', v.get('_cestado'))
                    vehicleRecord.set('asi_cLatLng', v.get('asi_cLatLng'))
                    vehicleRecord.set('asi_clinea', v.get('asi_clinea'))
                    vehicleRecord.set('asi_cnombre', v.get('asi_cnombre'))
                    vehicleRecord.set('asi_cueiid', v.get('asi_cueiid'))
                    vehicleRecord.set('asi_ncuenta', v.get('asi_ncuenta'))
                    vehicleRecord.set('lat', v.get('gps_rLatitud'))
                    vehicleRecord.set('long', v.get('gps_rLongitud'))
                    vehicleRecord.set('gps_rLatitud', v.get('gps_rLatitud'))
                    vehicleRecord.set('gps_rLongitud', v.get('gps_rLongitud'))
                    vehicleRecord.set('gps_tfechahora', v.get('gps_tfechahora'))
                    vehicleRecord.set('gps_rAccuracy', v.get('gps_rAccuracy'))
                    vehicleRecord.set(
                      'gps_isofechahora',
                      v.get('gps_isofechahora')
                    )
                    vehicleRecord.set(
                      'gps_isorawfechahora',
                      v.get('gps_isorawfechahora')
                    )
                    vehicleRecord.set('gps_iVelocidad', v.get('gps_iVelocidad'))
                    vehicleRecord.set('gps_Rumbo', v.get('gps_Rumbo'))
                    vehicleRecord.set(
                      'sta_cUltimaAlerta',
                      r.get('sta_cUltimaAlerta')
                    )
                    vehicleRecord.set(
                      'sta_dFechaUltimaAlerta',
                      v.get('sta_dFechaUltimaAlerta')
                    )
                    vehicleRecord.dirty == true
                  }
                })
                controller.showMarkerArray(gmappanel6, controller)
              }
            })
            controller.showMarkerArray(gmappanel6, controller)
          }
        })
      }
    } else {
      //console.log('no hay vehiculos para mostrar')
    }
  },

  showMarkerArray: function (gmappanel6, controller) {
    var view = gmappanel6.up('mapguardgpsview')
    var vehicles = gmappanel6.vehicleList
    var markers = gmappanel6.markerList
    var cuentas = gmappanel6.cuentaList
    var smartpanics = gmappanel6.smartpanicsList
    var smartrack = gmappanel6.smartTrackList
    var servtec = gmappanel6.servtecList
    var dealer = gmappanel6.dealerList
    var trackguard = gmappanel6.trackguardList
    var map = gmappanel6.getMap()
    Ext.Array.each(vehicles, controller.showVehicle, {
      gmappanel6: gmappanel6,
      controller: controller
    })
    //Ext.Array.each(markers,controller.showMarker,{gmappanel6: gmappanel6, controller: controller});
    if (cuentas && cuentas.length) {
      Ext.Array.each(cuentas, controller.mostrarCuenta, {
        gmappanel6: gmappanel6,
        controller: controller
      })
    }
    Ext.Array.each(smartpanics, controller.mostrarSmartpanics, {
      gmappanel6: gmappanel6,
      controller: controller
    })
    Ext.Array.each(smartrack, controller.mostrarSmartTrack, {
      gmappanel6: gmappanel6,
      controller: controller
    })
    Ext.Array.each(servtec, controller.mostrarServtec, {
      gmappanel6: gmappanel6,
      controller: controller
    })
    Ext.Array.each(dealer, controller.mostrarDealer, {
      gmappanel6: gmappanel6,
      controller: controller
    })
    Ext.Array.each(trackguard, controller.mostrarTrackguard, {
      gmappanel6: gmappanel6,
      controller: controller
    })
    var center = view.down('#center')._pressed
    var markerList = gmappanel6.cache.marker
    var active = Ext.Array.filter(markerList, function (item) {
      return item.getMap()
    })
    if (center && active.length > 0) {
      if (
        view.forceCuenta &&
        view.cuentaSelected &&
        view.cuentaSelected.position
      ) {
        //var boundArray = [view.cuentaSelected.marker];
        //var bounds = controller.getBounds(boundArray);
        //map.fitBounds(bounds);
        map.setZoom(14)
        map.setCenter(view.cuentaSelected.marker.getPosition())
      } else {
        var bounds = controller.getBounds(active)
        map.fitBounds(bounds)
      }
      /*
        
        la deteccion de selected no anda bien, poruqe se eliminan todos los markers.
        
        if (view.vehicleSelected && view.vehicleSelected.position){
            var boundArray = [view.vehicleSelected.marker];
            if (view.vehicleSelected.get('cuentaAsignada')){
                boundArray.push(view.vehicleSelected.get('cuentaAsignada').marker);
            }
            if (view.cuentaSelected && view.cuentaSelected.position){
                boundArray.push(view.cuentaSelected.position);
            }
            var bounds = controller.getBounds(boundArray);
            map.fitBounds(bounds);
        }else{
            var bounds = controller.getBounds(active);
            map.fitBounds(bounds);
        }
        */
    } else {
      if (center && markerList.length > 0) {
        var bounds = controller.getBounds(markerList)
        map.fitBounds(bounds)
      }
    }
    gmappanel6.markerCluster.repaint()
  },

  showMarker: function (marker, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var clear = false
    var lat = marker.get('Latitude')
    var long = marker.get('Longitude')
    var point = new google.maps.LatLng(lat, long)
    var pos = { lat: lat, long: long, position: point }
    var listeners = {}
    var infoHtml = controller.getMarkerInfoWindowHtml(marker, pos)
    if (typeof marker.markerIndex !== 'undefined') {
      gmappanel6.cache.marker[marker.markerIndex].setPosition(pos.position)
      gmappanel6.cache.marker[marker.markerIndex].setMap(gmappanel6.getMap())
      gmappanel6.cache.infowindow[marker.markerIndex].setContent(infoHtml)
    } else {
      markerConf = {
        position: pos.position,
        lat: pos.lat,
        lng: pos.long,
        record: marker,
        title: marker.get('Name'),
        infoWindow: {
          content: infoHtml,
          listener: 'mouseover',
          disableAutoPan: true
        },
        draggable: false
      }
      if (typeof MarkerWithLabel == 'function') {
        var marker = new MarkerWithLabel(markerConf)
      } else {
        var marker = new google.maps.Marker(markerConf)
      }
      gmappanel6.createInfoWindow(markerConf.infoWindow, pos.position, marker)
      marker.markerIndex = gmappanel6.cache.marker.length - 1
      //gmappanel6.markerCluster.addMarker(marker);
      gmappanel6.addMarker(pos.position, markerConf, true)
    }
  },

  mostrarTrackguard: function (vehicle, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var center = false
    var clear = false
    var marker = {}
    var pos = controller.getTrackguardPosition(vehicle, gmappanel6)
    var igual = false
    if (pos && pos.position && vehicle.position && vehicle.marker) {
      if (
        vehicle.position.lat().toFixed(6) == pos.lat &&
        vehicle.position.lng().toFixed(6) == pos.long
      ) {
        igual = true
        /* if (!vehicle.marker.getMap()){
                 vehicle.marker.setMap(gmappanel6.getMap());
                 gmappanel6.markerCluster.repaint();
             }*/
      }
    }
    var infoHtml = controller.getTrackguardInfoWindowHtml(vehicle, pos)
    var infoConf = {
      content: infoHtml,
      listener: 'mouseover',
      disableAutoPan: true
    }
    if (vehicle.infowindow) {
      vehicle.infowindow.setContent(infoHtml)
    }
    if (pos && pos.position && !igual) {
      //
      var geocoder = gmappanel6.getGeocoder()
      vehicle.position = pos.position
      if (vehicle.marker) {
        // muevo el marker de lugar
        vehicle.marker.setPosition(pos.position)
        // lo muestro por si estaba oculto
        // vehicle.marker.setMap(gmappanel6.getMap());
        // cambio el icono por si se selecciono o no
        vehicle.marker.setIcon(
          controller.getTrackguardeIcon(vehicle, gmappanel6)
        )
      } else {
        markerConf = {
          position: pos.position,
          lat: pos.lat,
          lng: pos.long,
          record: vehicle,
          labelContent:
            '<span>' +
            vehicle.get('cue_clinea') +
            '-' +
            vehicle.get('cue_ncuenta') +
            '</span>',
          labelClass: 'gmaplabel2',
          labelStyle: { opacity: 1 },
          title: vehicle.get('Name'),
          icon: controller.getTrackguardeIcon(vehicle, gmappanel6),
          draggable: false,
          /*infoWindow: {
                    content: infoHtml, 
                    listener:'mouseover',
                    disableAutoPan: true
                },*/
          record: vehicle
        }
        gmappanel6.addMarker(pos.position, markerConf, false)
        vehicle.infowindow = gmappanel6.createInfoWindow(
          infoConf,
          vehicle.position,
          vehicle.marker
        )
        //marker.infoWindow = vehicle.infowindow;
        //gmappanel6.markerCluster.addMarker(marker);
        google.maps.event.addListener(vehicle.marker, 'mouseout', function () {
          vehicle.infowindow.close()
        })
        google.maps.event.addListener(vehicle.marker, 'click', function () {
          var tgrecord = controller
            .getVehicleSearchModelModel()
            .create(Ext.clone(vehicle.data))
          var tab = Ext.widget('vehicleslavegpsview', {
            title:
              'Trackguard: ' +
              tgrecord.get('cue_clinea') +
              '-' +
              tgrecord.get('cue_ncuenta') +
              ' ' +
              vehicle.get('cue_cnombre'),
            closable: true,
            record: tgrecord
          })
          var myPanel = view.up('tabpanel')
          myPanel.add(tab)
          myPanel.setActiveTab(tab)
        })
      }
      geocoder.geocode(
        {
          location: vehicle.position
        },
        function (result, status) {
          if (status == 'OK' && result.length > 0){
            pos.address = result[0].formatted_address
            vehicle.address = pos.address
          } else {
            pos.address = ''
            vehicle.address = ''
          }
          var infoHtml = controller.getTrackguardInfoWindowHtml(vehicle, pos)
          if (typeof vehicle.infowindow !== 'undefined') {
            vehicle.infowindow.setContent(infoHtml)
            //gmappanel6.cache.infowindow[vehicle.markerIndex].setContent(infoHtml);
            // vehicle.markerIndex = gmappanel6.cache.marker.length-1;
          }
        }
      )
    }
    controller.muestroOcultoTrackguard(vehicle, view, gmappanel6)
  },

  muestroOcultoTrackguard: function (vehicle, view, gmappanel6) {
    // si no tiene marker no hago nada
    if (!vehicle.marker) return false
    // FILTROS
    var enmovimiento = view.down('#enmovimiento').pressed
    var frenado = view.down('#frenado').pressed
    var viejas = view.down('#viejas').pressed
    var conalarma = view.down('#conalarma').pressed
    var now = new Date()
    var ageGps = (now - vehicle.get('gps_isofechahora')) / 60000
    var mostrar = false
    if (enmovimiento) {
      if (!vehicle.isFrenado && !vehicle.isVieja) {
        mostrar = true
      }
    }
    if (frenado) {
      if (vehicle.isFrenado && !vehicle.isVieja) {
        mostrar = true
      }
    }
    if (conalarma) {
      if (vehicle.isAlarma && !vehicle.isVieja) {
        mostrar = true
      }
    }
    if (viejas) {
      if (vehicle.isVieja) {
        mostrar = true
      }
    }
    if (
      vehicle &&
      vehicle.position &&
      vehicle.position.lat() == 0 &&
      vehicle.position.lng() == 0
    ) {
      mostrar = false
    }
    if (mostrar) {
      vehicle.marker.setMap(gmappanel6.getMap())
    } else if (vehicle.marker) {
      vehicle.marker.setMap(null)
    }
  },

  showVehicle: function (vehicle, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var center = false
    var clear = false
    var marker = {}
    var pos = controller.getVehiclePosition(vehicle, gmappanel6)
    var igual = false
    /**
     * [17/04/2017] Comente esta parte por que simpre daba que estaba en la misma posicion, se debe a
     * que el objeto pos y el objeto vehicle simpre tienen la mismas posiciones
     *
    
     if (pos && pos.position && vehicle.position && vehicle.marker){
         if (
             vehicle.position.lat().toFixed(6) == parseFloat(pos.lat).toFixed(6) && 
             vehicle.position.lng().toFixed(6) == parseFloat(pos.long).toFixed(6)
             ){
                 
            igual = true;
         }
                
     }
     */
    if (pos && pos.position && vehicle.position && vehicle.marker) {
      if (
        vehicle.position.lat().toFixed(6) ==
          parseFloat(vehicle.marker.lat).toFixed(6) &&
        vehicle.position.lng().toFixed(6) ==
          parseFloat(vehicle.marker.lng).toFixed(6)
      ) {
        igual = true
      }
    }
    var infoHtml = controller.getVehicleInfoWindowHtml(vehicle, pos)
    var infoConf = {
      content: infoHtml,
      listener: 'mouseover',
      disableAutoPan: true
    }
    if (vehicle.infowindow) {
      // cambio el contenido del marker lo hago siempre para actualizar fechas aunque este en el mismo lugar
      vehicle.infowindow.setContent(infoHtml)
    }
    if ((pos && pos.position && !igual) || vehicle.dirty == true) {
      var geocoder = gmappanel6.getGeocoder()
      if (vehicle.dirty == true) {
        vehicle.dirty = false
      }
      vehicle.position = pos.position
      if (vehicle.marker) {
        // muevo el marker de lugar
        vehicle.marker.setPosition(pos.position)
        // lo muestro por si estaba oculto
        vehicle.marker.setMap(gmappanel6.getMap())
        // cambio el icono por si se selecciono o no
        vehicle.marker.setIcon(controller.getVehicleIcon(vehicle, gmappanel6))
        //  gmappanel6.markerCluster.addMarker(vehicle.marker);
        geocoder.geocode(
          {
            location: vehicle.position
          },
          function (result, status) {
            if (status == 'OK' && result.length > 0){
              pos.address = result[0].formatted_address
              vehicle.address = pos.address
            } else {
              pos.address = ''
              vehicle.address = ''
            }
            var infoHtml = controller.getVehicleInfoWindowHtml(vehicle, pos)
            if (typeof vehicle.infowindow !== 'undefined') {
              vehicle.infowindow.setContent(infoHtml)
              //gmappanel6.cache.infowindow[vehicle.markerIndex].setContent(infoHtml);
            }
          }
        )
      } else {
        markerConf = {
          position: pos.position,
          lat: pos.lat,
          lng: pos.long,
          record: vehicle,
          labelContent: '<span>' + vehicle.get('tmp_cnombre') + '</span>',
          labelClass: 'gmaplabel2',
          labelStyle: { opacity: 1 },
          title: vehicle.get('Name'),
          icon: controller.getVehicleIcon(vehicle, gmappanel6),
          infoWindow: {
            content: infoHtml,
            listener: 'mouseover',
            disableAutoPan: true
          },
          draggable: false,
          record: vehicle
        }
        vehicle.marker = gmappanel6.addMarker(pos.position, markerConf, clear)
        //vehicle.marker.setMap(gmappanel6.getMap());
        google.maps.event.addListener(vehicle.marker, 'click', function () {
          view.fireEvent('vehicleSelected', vehicle, view)
        })
        vehicle.infowindow = gmappanel6.createInfoWindow(
          infoConf,
          vehicle.position,
          vehicle.marker
        )
        google.maps.event.addListener(marker, 'mouseout', function () {
          vehicle.infowindow.close()
        })
        //gmappanel6.markerCluster.addMarker(marker);
      }
    }
  },

  mostrarCuenta: function (cuenta, index, array) {
    //console.log(this);
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var center = false
    var clear = false
    var pos = controller.getCuentaPosition(cuenta, gmappanel6)
    var igual = false
    if (pos && pos.position && cuenta.position && cuenta.marker) {
      if (
        cuenta.position.lat().toFixed(6) == parseFloat(pos.lat).toFixed(6) &&
        cuenta.position.lng().toFixed(6) == parseFloat(pos.long).toFixed(6)
      ) {
        igual = true
      }
    }
    if (pos && pos.position && pos.lat != 0 && pos.long != 0 && !igual) {
      var geocoder = gmappanel6.getGeocoder()
      cuenta.position = pos.position
      var infoHtml = controller.getMarkerInfoWindowHtml(cuenta, pos)
      var markerConf = {
        position: pos.position,
        lat: pos.lat,
        lng: pos.long,
        record: cuenta,
        labelContent:
          '<span>' +
          cuenta.get('cue_clinea') +
          '-' +
          cuenta.get('cue_ncuenta') +
          '</span>',
        //labelAnchor: new google.maps.Point(40, 0),
        labelClass: 'gmaplabel2', // the CSS class for the label
        labelStyle: { opacity: 1 },
        title: cuenta.get('Name'),
        icon: controller.getCuentaIcon(cuenta, gmappanel6),
        infoWindow: {
          content: infoHtml,
          listener: 'mouseover',
          disableAutoPan: true
        },
        draggable: false,
        record: cuenta
      }
      if (cuenta.marker) {
        // muevo el marker de lugar
        cuenta.marker.setPosition(pos.position)
        // lo muestro por si estaba oculto
        cuenta.marker.setMap(gmappanel6.getMap())
        // cambio el icono por si se selecciono o no
        cuenta.marker.setIcon(controller.getCuentaIcon(cuenta, gmappanel6))
        // cambio el contenido del marker
        if (cuenta.infowindow) cuenta.infowindow.setContent(infoHtml)
      } else {
        if (cuenta.get('rec_calarma')) {
          gmappanel6.addMarker(pos.position, markerConf, clear)
        } else {
          var marker = new google.maps.Marker(markerConf)
          gmappanel6.markerCluster.addMarker(marker)
          cuenta.marker = marker
        }
        cuenta.marker.setMap(gmappanel6.getMap())
        cuenta.marker.setZIndex(1000000)
        //agrego listener
        google.maps.event.addListener(cuenta.marker, 'click', function () {
          //view.cuentaSelected = cuenta;
          view.fireEvent('eventoSelected', cuenta, view)
        })
        cuenta.markerIndex = gmappanel6.cache.marker.length - 1
        cuenta.infowindow = gmappanel6.createInfoWindow(
          markerConf.infoWindow,
          pos.position,
          cuenta.marker
        )
        google.maps.event.addListener(cuenta.marker, 'mouseout', function () {
          cuenta.infowindow.close()
        })
      }
    }
  },

  mostrarSmartpanics: function (cuenta, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var center = false
    var clear = false
    var pos = controller.getSmartPanicPosition(cuenta, gmappanel6)
    controller.mostrarDireccion(pos.lat, pos.long, function (direccion) {
      //html = html.replace(/\{direccionActual\}/, direccion);
      cuenta.direccionActual = direccion
      var igual = false
      if (pos && pos.position && cuenta.position && cuenta.marker) {
        if (
          cuenta.marker.getPosition().lat().toFixed(6) ==
            parseFloat(pos.lat).toFixed(6) &&
          cuenta.marker.getPosition().lng().toFixed(6) ==
            parseFloat(pos.long).toFixed(6)
        ) {
          igual = true
        }
      }
      if (pos && pos.position && pos.lat != 0 && pos.long != 0 && !igual) {
        var geocoder = gmappanel6.getGeocoder()
        cuenta.position = pos.position
        var infoHtml = controller.getMarkerInfoWindowHtmlSmartPanics(
          cuenta,
          pos
        )
        var markerConf = {
          position: pos.position,
          lat: pos.lat,
          lng: pos.long,
          record: cuenta,
          labelContent:
            '<span>' +
            cuenta.get('cue_clinea') +
            '-' +
            cuenta.get('cue_ncuenta') +
            '</span>',
          //labelAnchor: new google.maps.Point(40, 0),
          labelClass: 'gmaplabel2', // the CSS class for the label
          labelStyle: { opacity: 1 },
          title:
            'SmartPanics: ' +
            cuenta.get('cue_clinea') +
            '-' +
            cuenta.get('cue_ncuenta') +
            ' ' +
            cuenta.get('cue_cnombre'),
          icon: controller.getSmartPanicIcon(cuenta, gmappanel6),
          infoWindow: {
            content: infoHtml,
            listener: 'mouseover',
            disableAutoPan: true
          },
          draggable: false,
          record: cuenta
        }
        if (cuenta.marker) {
          // muevo el marker de lugar
          cuenta.marker.setPosition(pos.position)
          // lo muestro por si estaba oculto
          cuenta.marker.setMap(gmappanel6.getMap())
          // cambio el icono por si se selecciono o no
          cuenta.marker.setIcon(
            controller.getSmartPanicIcon(cuenta, gmappanel6)
          )
          // cambio el contenido del marker
          cuenta.infowindow.setContent(infoHtml)
        } else {
          //if (typeof(MarkerWithLabel) == 'function'){
          //  var marker = new MarkerWithLabel(markerConf);
          //} else {
          //  var marker = new google.maps.Marker(markerConf);
          //}
          //cuenta.marker = marker;
          gmappanel6.addMarker(pos.position, markerConf, false)
          cuenta.marker.setMap(gmappanel6.getMap())
          //  gmappanel6.markerCluster.addMarker(marker);
          //agrego listener
          google.maps.event.addListener(cuenta.marker, 'click', function () {
            //view.cuentaSelected = cuenta;
            view.fireEvent('smartpanicSelected', cuenta, view)
          })
          cuenta.markerIndex = gmappanel6.cache.marker.length - 1
          cuenta.infowindow = gmappanel6.createInfoWindow(
            markerConf.infoWindow,
            pos.position,
            cuenta.marker
          )
          google.maps.event.addListener(cuenta.marker, 'mouseout', function () {
            cuenta.infowindow.close()
          })
        }
      }
      controller.muestroOcultoSmartPanics(cuenta, view, gmappanel6)
    })
  },

  muestroOcultoSmartPanics: function (cuenta, view, gmappanel6) {
    // si no tiene marker no hago nada
    if (!cuenta.marker) return false
    // FILTROS
    var old = view.down('#viejasSmartPanic').pressed
    var disperso = view.down('#dispersoSmartPanic').pressed
    var actualizado = view.down('#actualesSmartPanic').pressed
    var now = new Date()
    var ageGps = (now - cuenta.get('gps_isofechahora')) / 60000
    var mostrar = false
    if (old) {
      if (cuenta.isOld) {
        mostrar = true
      }
    }
    if (disperso) {
      if (cuenta.isDisperso) {
        mostrar = true
      }
    }
    if (actualizado) {
      if (cuenta.isActual) {
        mostrar = true
      }
    }
    if (
      cuenta &&
      cuenta.position &&
      cuenta.position.lat() == 0 &&
      cuenta.position.lng() == 0
    ) {
      mostrar = false
    }
    if (mostrar) {
      cuenta.marker.setMap(gmappanel6.getMap())
    } else if (cuenta.marker) {
      cuenta.marker.setMap(null)
    }
  },

  muestroOcultoVigicontrol: function (cuenta, view, gmappanel6) {
    // si no tiene marker no hago nada
    if (!cuenta.marker) return false
    // FILTROS
    var old = view.down('#viejasVigicontrol').pressed
    var disperso = view.down('#dispersoVigicontrol').pressed
    var actualizado = view.down('#actualesVigicontrol').pressed
    var now = new Date()
    var ageGps = (now - cuenta.get('gps_isofechahora')) / 60000
    var mostrar = false
    if (old) {
      if (cuenta.isOld) {
        mostrar = true
      }
    }
    if (disperso) {
      if (cuenta.isDisperso) {
        mostrar = true
      }
    }
    if (actualizado) {
      if (cuenta.isActual) {
        mostrar = true
      }
    }
    if (
      cuenta &&
      cuenta.position &&
      cuenta.position.lat() == 0 &&
      cuenta.position.lng() == 0
    ) {
      mostrar = false
    }
    if (mostrar) {
      cuenta.marker.setMap(gmappanel6.getMap())
    } else if (cuenta.marker) {
      cuenta.marker.setMap(null)
    }
  },

  mostrarSmartTrack: function (cuenta, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var center = false
    var clear = false
    var pos = controller.getSmartPanicPosition(cuenta, gmappanel6)
    var igual = false
    if (pos && pos.position && cuenta.position && cuenta.marker) {
      if (
        cuenta.marker.getPosition().lat().toFixed(6) ==
          parseFloat(pos.lat).toFixed(6) &&
        cuenta.marker.getPosition().lng().toFixed(6) ==
          parseFloat(pos.long).toFixed(6)
      ) {
        igual = true
      }
    }
    if (pos && pos.position && pos.lat != 0 && pos.long != 0 && !igual) {
      var geocoder = gmappanel6.getGeocoder()
      cuenta.position = pos.position
      var infoHtml = controller.getMarkerInfoWindowHtmlSmartTrack(cuenta, pos)
      var markerConf = {
        position: pos.position,
        lat: pos.lat,
        lng: pos.long,
        record: cuenta,
        labelContent:
          '<span>' +
          cuenta.get('cue_clinea') +
          '-' +
          cuenta.get('cue_ncuenta') +
          '</span>',
        //labelAnchor: new google.maps.Point(40, 0),
        labelClass: 'gmaplabel2', // the CSS class for the label
        labelStyle: { opacity: 1 },
        title:
          'VigiControl: ' +
          cuenta.get('cue_clinea') +
          '-' +
          cuenta.get('cue_ncuenta') +
          ' ' +
          cuenta.get('cue_cnombre'),
        icon: controller.getSmartTrackIcon(cuenta, gmappanel6),
        infoWindow: {
          content: infoHtml,
          listener: 'mouseover',
          disableAutoPan: true
        },
        draggable: false,
        record: cuenta
      }
      if (cuenta.marker) {
        // muevo el marker de lugar
        cuenta.marker.setPosition(pos.position)
        // lo muestro por si estaba oculto
        cuenta.marker.setMap(gmappanel6.getMap())
        // cambio el icono por si se selecciono o no
        cuenta.marker.setIcon(controller.getSmartTrackIcon(cuenta, gmappanel6))
        // cambio el contenido del marker
        cuenta.infowindow.setContent(infoHtml)
      } else {
        gmappanel6.addMarker(pos.position, markerConf, false)
        cuenta.marker.setMap(gmappanel6.getMap())
        //agrego listener
        google.maps.event.addListener(cuenta.marker, 'click', function () {
          //view.cuentaSelected = cuenta;
          view.fireEvent('smarttrackSelected', cuenta, view)
        })
        cuenta.markerIndex = gmappanel6.cache.marker.length - 1
        cuenta.infowindow = gmappanel6.createInfoWindow(
          markerConf.infoWindow,
          pos.position,
          cuenta.marker
        )
        google.maps.event.addListener(cuenta.marker, 'mouseout', function () {
          cuenta.infowindow.close()
        })
      }
    }
    controller.muestroOcultoVigicontrol(cuenta, view, gmappanel6)
  },

  mostrarServtec: function (cuenta, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var center = false
    var clear = false
    var pos = controller.getCuentaPosition(cuenta, gmappanel6)
    var igual = false
    if (pos && pos.position && cuenta.position && cuenta.marker) {
      if (
        cuenta.position.lat().toFixed(6) == parseFloat(pos.lat).toFixed(6) &&
        cuenta.position.lng().toFixed(6) == parseFloat(pos.long).toFixed(6)
      ) {
        igual = true
      }
    }
    if (pos && pos.position && pos.lat != 0 && pos.long != 0 && !igual) {
      var geocoder = gmappanel6.getGeocoder()
      cuenta.position = pos.position
      var infoHtml = controller.getMarkerInfoWindowHtmlServTec(cuenta, pos)
      var markerConf = {
        position: pos.position,
        lat: pos.lat,
        lng: pos.long,
        record: cuenta,
        labelContent:
          '<span>' +
          cuenta.get('cue_clinea') +
          '-' +
          cuenta.get('cue_ncuenta') +
          '</span>',
        labelAnchor: new google.maps.Point(40, 0),
        labelClass: 'gmaplabel2', // the CSS class for the label
        labelStyle: { opacity: 0.75 },
        title:
          'ServTec: ' +
          cuenta.get('cue_clinea') +
          '-' +
          cuenta.get('cue_ncuenta') +
          ' ' +
          cuenta.get('cue_cnombre'),
        icon: controller.getServTecIcon(cuenta, gmappanel6),
        infoWindow: {
          content: infoHtml,
          listener: 'mouseover',
          disableAutoPan: true
        },
        draggable: false
      }
      if (cuenta.marker) {
        // muevo el marker de lugar
        cuenta.marker.setPosition(pos.position)
        // lo muestro por si estaba oculto
        cuenta.marker.setMap(gmappanel6.getMap())
        // cambio el icono por si se selecciono o no
        cuenta.marker.setIcon(controller.getServTecIcon(cuenta, gmappanel6))
        // cambio el contenido del marker
        cuenta.infowindow.setContent(infoHtml)
      } else {
        gmappanel6.addMarker(pos.position, markerConf, false)
        cuenta.marker.setMap(gmappanel6.getMap())
        //agrego listener
        google.maps.event.addListener(cuenta.marker, 'click', function () {
          //view.cuentaSelected = cuenta;
          view.fireEvent('servtecSelected', cuenta, view)
        })
        cuenta.markerIndex = gmappanel6.cache.marker.length - 1
        cuenta.infowindow = gmappanel6.createInfoWindow(
          markerConf.infoWindow,
          pos.position,
          cuenta.marker
        )
        google.maps.event.addListener(cuenta.marker, 'mouseout', function () {
          cuenta.infowindow.close()
        })
      }
      //pos.address = '';
      //cuenta.address = '';
    }
  },

  mostrarDealer: function (cuenta, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('mapguardgpsview')
    var center = false
    var clear = false
    var pos = controller.getCuentaPosition(cuenta, gmappanel6)
    var igual = false
    if (pos && pos.position && cuenta.position && cuenta.marker) {
      if (
        cuenta.position.lat().toFixed(6) == parseFloat(pos.lat).toFixed(6) &&
        cuenta.position.lng().toFixed(6) == parseFloat(pos.long).toFixed(6)
      ) {
        igual = true
      }
    }
    if (pos && pos.position && pos.lat != 0 && pos.long != 0 && !igual) {
      var geocoder = gmappanel6.getGeocoder()
      cuenta.position = pos.position
      var infoHtml = controller.getMarkerInfoWindowHtml(cuenta, pos)
      var markerConf = {
        position: pos.position,
        lat: pos.lat,
        lng: pos.long,
        record: cuenta,
        labelContent:
          '<span>' +
          cuenta.get('cue_clinea') +
          '-' +
          cuenta.get('cue_ncuenta') +
          '</span>',
        //labelAnchor: new google.maps.Point(40, 0),
        labelClass: 'gmaplabel2', // the CSS class for the label
        labelStyle: { opacity: 1 },
        title:
          'Dealer: ' +
          cuenta.get('cue_clinea') +
          '-' +
          cuenta.get('cue_ncuenta') +
          ' ' +
          cuenta.get('cue_cnombre'),
        icon: controller.getCuentaIcon(cuenta, gmappanel6),
        infoWindow: {
          content: infoHtml,
          listener: 'mouseover',
          disableAutoPan: true
        },
        draggable: false,
        record: cuenta
      }
      if (cuenta.marker) {
        // muevo el marker de lugar
        cuenta.marker.setPosition(pos.position)
        // lo muestro por si estaba oculto
        cuenta.marker.setMap(gmappanel6.getMap())
        // cambio el icono por si se selecciono o no
        cuenta.marker.setIcon(controller.getCuentaIcon(cuenta, gmappanel6))
        // cambio el contenido del marker
        cuenta.infowindow.setContent(infoHtml)
      } else {
        var marker = gmappanel6.addMarker(pos.position, markerConf, false)
        cuenta.markerIndex = gmappanel6.cache.marker.length - 1
        cuenta.infowindow = gmappanel6.createInfoWindow(
          markerConf.infoWindow,
          pos.position,
          marker
        )
        google.maps.event.addListener(cuenta.marker, 'mouseout', function () {
          cuenta.infowindow.close()
        })
        google.maps.event.addListener(cuenta.marker, 'click', function () {
          //view.cuentaSelected = cuenta;
          view.fireEvent('cuentaSelected', cuenta, view)
        })
        gmappanel6.markerCluster.addMarker(marker)
      }
    }
  },
  getVehicleInfoWindowHtml: function (vehicle, pos) {
    // var pos = vehicle.pos;
    var html =
      '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                <span>{dealer}-{ncuenta} {cuenta}</span>\
                </td>\
            </tr>\
            '
    if (vehicle.address) {
      html +=
        '\
                    <tr>\
                        <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <span class="x-btn-icon icon-map" style="display:inline-block; height: 16px; width:16px;"></span><span style="line-height:17px; vertical-align:top;"> {direccion}</span><br/>\
                        </td>\
                    </tr>\
                    '
    }
    if (vehicle.get('tmp_nestado') == 3) {
      html +=
        '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblCuentaAsignada}</span><span> {asi_clinea}-{asi_ncuenta} {asi_cnombre}</span><br/>\
                        </td>\
                    </tr>\
                    '
    }
    if (pos.gps && pos.gps.get('_cestado') && pos.gps.get('_cestado') != '') {
      html +=
        '\
                        <tr>\
                            <td style="padding:5px; font-size:13px;">\
                               <span style="font-weight:bold;">{lblEstado}:</span><span> {_cestado}</span><br/>\
                            </td>\
                            <td style="padding:5px; font-size:13px;">\
                            </td>\
                        </tr>\
                        '
    }
    html += '</table>'
    // traducciones
    html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'))
    html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'))
    html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'))
    html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'))
    html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'))
    html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'))
    html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'))
    html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'))
    html = html.replace(/\{lblOdometro\}/, getLocale('Odómetro'))
    html = html.replace(/\{lblEstado\}/, getLocale('Estado'))
    html = html.replace(/\{lblCuentaAsignada\}/, getLocale('Cuenta asignada'))
    //sta_dFechaUltimaAlerta
    html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'))
    html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'))
    html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'))
    html = html.replace(/\{direccion\}/, vehicle.address)
    if (pos && pos.gps) {
      html = html.replace(/\{latitud\}/, pos.gps.get('gps_rLatitud'))
      html = html.replace(/\{longitud\}/, pos.gps.get('gps_rLongitud'))
      html = html.replace(/\{_cestado\}/, pos.gps.get('_cestado'))
    }
    html = html.replace(/\{asi_cnombre\}/, vehicle.get('asi_cnombre'))
    html = html.replace(/\{asi_clinea\}/, vehicle.get('asi_clinea'))
    html = html.replace(/\{asi_ncuenta\}/, vehicle.get('asi_ncuenta'))
    return html
  },

  getBounds: function (markers) {
    var bounds = new google.maps.LatLngBounds()
    Ext.each(markers, function (marker, index, array) {
      if (
        marker.position &&
        !isNaN(marker.position.lat()) &&
        !isNaN(marker.position.lng())
      )
        bounds.extend(marker.position)
    })
    return bounds
  },
  getMarkerInfoWindowHtmlServTec: function (marker, pos) {
    var html =
      '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="/resources/softguard/images/poi/taller.png" style="float:left; margin:0 5px 0 0"/> <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
            '
    if (marker.get('asi_clinea')) {
      html +=
        '\
                <tr>\
                    <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <div style="float:left; width:200px"><span style="font-weight:bold;">{lblnombreAsignada}:</span><span> {nombreAsignada}</span></div>\
                    </td>\
                </tr>\
                '
    }
    html +=
      '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblestado}:</span><span> {estado}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblflota}:</span><span> {flota}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbltelefono}:</span><span> {telefono}</span><br/>\
                        </td>\
                    </tr>\
                    '
    html += '</table></div>'
    html = html.replace(
      /\{nombre\}/,
      marker.get('cue_clinea') +
        '-' +
        marker.get('cue_ncuenta') +
        '<br> ' +
        marker.get('cue_cnombre')
    )
    html = html.replace(
      /\{nombreAsignada\}/,
      marker.get('asi_clinea') +
        '-' +
        marker.get('asi_ncuenta') +
        '<br> ' +
        marker.get('asi_cnombre')
    )
    html = html.replace(/\{estado\}/, marker.get('_cestado'))
    html = html.replace(/\{telefono\}/, marker.get('cue_ctelefono'))
    html = html.replace(/\{flota\}/, marker.get('cflota'))
    html = html.replace(/\{lblnombreAsignada\}/, getLocale('Cuenta asignada'))
    html = html.replace(/\{lblestado\}/, getLocale('Estado'))
    html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'))
    html = html.replace(/\{lblusuario\}/, getLocale('Usuario'))
    html = html.replace(/\{lblflota\}/, getLocale('flota'))
    return html
  },

  getMarkerInfoWindowHtmlSmartPanics: function (marker, pos) {
    var html =
      '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="/resources/softguard/images/mapguard-cservice/sp.png" style="float:left; margin:0 5px 0 0"/> <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
            '
    html +=
      '\
        <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbltelefono}:</span><span> {telefono}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblusuario}:</span><span> {usuario}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneSO}:</span><span> {phoneSO}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneModel}:</span><span> {phoneModel}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblphoneBrand}:</span><span> {phoneBrand}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblgps_tfechahora}:</span><span> {gps_tfechahora}</span><br/>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lbldireccionactual}:</span><span> {direccionActual}</span><br/>\
                        </td>\
                    </tr>\
                    '
    html += '</table>'
    html = html.replace(/\{direccionActual\}/, marker.direccionActual)
    html = html.replace(
      /\{nombre\}/,
      marker.get('cue_clinea') +
        '-' +
        marker.get('cue_ncuenta') +
        '<br> ' +
        marker.get('cue_cnombre')
    )
    html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'))
    html = html.replace(/\{telefono\}/, marker.get('Telefono'))
    html = html.replace(/\{phoneSO\}/, marker.get('Tipo'))
    html = html.replace(/\{usuario\}/, marker.get('Nombre'))
    html = html.replace(/\{phoneBrand\}/, marker.get('Marca'))
    html = html.replace(/\{phoneModel\}/, marker.get('Modelo'))
    html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'))
    html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'))
    html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'))
    html = html.replace(/\{lblusuario\}/, getLocale('Usuario'))
    html = html.replace(/\{lblphoneSO\}/, getLocale('S.O.'))
    html = html.replace(/\{lblphoneModel\}/, getLocale('Modelo'))
    html = html.replace(/\{lblphoneBrand\}/, getLocale('Marca'))
    html = html.replace(/\{lbldireccionactual\}/, getLocale('Direccion actual'))
    html = html.replace(
      /\{gps_tfechahora\}/,
      Ext.Date.format(new Date(marker.get('gps_tfechahora')), 'd-m-Y H:i:s')
    )
    html = html.replace(/\{lblgps_tfechahora\}/, getLocale('Fecha de posicion'))
    return html
  },

  mostrarDireccion: function (lat, lng, callback) {
    var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) }
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0])
          callback(results[0].formatted_address)
        } else {
          notify('No se encontro la direccion.')
        }
      } else {
      }
    })
  },
  getMarkerInfoWindowHtmlSmartTrack: function (marker, pos) {
    var iconUrl = '/resources/softguard/images/mapguard-cservice/vc.png'
    if (marker.get('Config') != '') {
      var configObj = Ext.JSON.decode(marker.get('Config'))
      if (configObj && configObj.Icono) {
        iconUrl = configObj.Icono
      }
    }
    var html =
      '\
            <div >\
            <table width="250">\
            <tr>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="' +
      iconUrl +
      '" style="float:left; margin:0 5px 0 0"/>\
                </td>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
            '
    html +=
      '\
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
                    '
    html += '</table>'
    html = html.replace(
      /\{nombre\}/,
      marker.get('cue_clinea') +
        '-' +
        marker.get('cue_ncuenta') +
        '<br> ' +
        marker.get('cue_cnombre')
    )
    html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'))
    html = html.replace(/\{telefono\}/, marker.get('Telefono'))
    html = html.replace(/\{phoneSO\}/, marker.get('Tipo'))
    html = html.replace(/\{usuario\}/, marker.get('Nombre'))
    html = html.replace(/\{phoneBrand\}/, marker.get('Marca'))
    html = html.replace(/\{phoneModel\}/, marker.get('Modelo'))
    html = html.replace(
      /\{gps_tfechahora\}/,
      Ext.Date.format(new Date(marker.get('gps_tfechahora')), 'd-m-Y H:i:s')
    )
    html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'))
    html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'))
    html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'))
    html = html.replace(/\{lblusuario\}/, getLocale('Usuario'))
    html = html.replace(/\{lblphoneSO\}/, getLocale('S.O.'))
    html = html.replace(/\{lblphoneModel\}/, getLocale('Modelo'))
    html = html.replace(/\{lblphoneBrand\}/, getLocale('Marca'))
    html = html.replace(/\{lblgps_tfechahora\}/, getLocale('Fecha de posicion'))
    return html
  },

  getTrackguardInfoWindowHtml: function (vehicle, pos, showAddress) {
    var html =
      '\
            <div style="width:500px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <h2>{nombre}</h2>\
            '
    html += '\
                <table>'
    if (showAddress) {
      html +=
        '\
                    <tr>\
                        <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <span class="x-btn-icon icon-map" style="display:inline-block; height: 16px; width:16px;"></span><span style="line-height:17px; vertical-align:top;"> {direccion}</span><br/>\
                        </td>\
                    </tr>\
                    '
    }
    html +=
      '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblVelocidad}:</span><span> {velocidad} km/h</span><br/>\
                           <span style="font-weight:bold;">{lblUltAlerta}:</span><span>  {alerta}</span><br/>\
                            <!--span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
                            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/-->\
                            <span style="font-weight:bold;">{lblOdometro}:</span><span>  {odometro}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                            <span style="font-weight:bold;">{lblFechaRecepcion}:</span><span>  {fecha}</span><br/>\
                           <span style="font-weight:bold;">{lblFechaGPS}:</span><span>  {fechaRaw}</span><br/>\
                           <span style="font-weight:bold;">{lblFechaAlerta}:</span><span>  {fechaAlerta}</span><br/>\
                        </td>\
                    </tr>\
                    '
    html += '</table>'
    // traducciones
    html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'))
    html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'))
    html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'))
    html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'))
    html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'))
    html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'))
    html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'))
    html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'))
    html = html.replace(/\{lblOdometro\}/, getLocale('Odómetro'))
    //sta_dFechaUltimaAlerta
    html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'))
    html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'))
    html = html.replace(/\{nombre\}/, vehicle.get('Domain'))
    html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'))
    html = html.replace(/\{velocidad\}/, pos.gps.get('gps_iVelocidad'))
    html = html.replace(/\{direccion\}/, vehicle.address)
    html = html.replace(
      /\{fechaRaw\}/,
      Ext.Date.format(pos.gps.get('gps_isorawfechahora'), 'd-m-Y H:i:s')
    )
    html = html.replace(
      /\{fecha\}/,
      Ext.Date.format(pos.gps.get('gps_isofechahora'), 'd-m-Y H:i:s')
    )
    html = html.replace(
      /\{fechaAlerta\}/,
      Ext.Date.format(pos.gps.get('sta_dFechaUltimaAlerta'), 'd-m-Y H:i:s')
    )
    html = html.replace(
      /\{alerta\}/,
      pos.gps.get('sta_cUltimaAlerta') + '-' + pos.gps.get('cod_cdescripcion')
    )
    html = html.replace(/\{latitud\}/, pos.gps.get('gps_rLatitud'))
    html = html.replace(/\{longitud\}/, pos.gps.get('gps_rLongitud'))
    html = html.replace(/\{odometro\}/, pos.gps.get('gps_iOdometro'))
    return html
  },

  getMarkerInfoWindowHtml: function (marker, pos) {
    var html =
      '\
            <div style="width:250px;">\
            <table>\
            <tr>\
                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src=""/resources/softguard/images/mapguard-cservice/Casa.png" style="float:left; margin:0 5px 0 0"/> <div style="float:left; width:200px">{nombre}</div>\
                </td>\
            </tr>\
            '
    html +=
      '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">'
    if (marker.get('pro_cdescripcion')) {
      html +=
        '\
                           <span style="font-weight:bold;">{lblProvincia}:</span><span> {provincia}</span><br/>'
    }
    html +=
      '\
                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblAlarma}:</span><span> {alarma}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                        </td>\
                    </tr>\
                    '
    html += '</table>'
    var cod_cdescripcion = marker.get('cod_cdescripcion')
    if (marker.get('asi_cnombre')) {
      var cuenta = marker.get('asi_clinea') + '-' + marker.get('asi_ncuenta')
      html = html.replace(
        /\{nombre\}/,
        cuenta + ' ' + marker.get('asi_cnombre')
      )
      html = html.replace(/\{provincia\}/, marker.get('pro_cdescripcion'))
      html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'))
      html = html.replace(/\{calle\}/, marker.get('cue_ccalle'))
    } else {
      html = html.replace(
        /\{nombre\}/,
        marker.get('cue_clinea') +
          '-' +
          marker.get('cue_ncuenta') +
          ' ' +
          marker.get('cue_cnombre')
      )
      html = html.replace(/\{provincia\}/, marker.get('pro_cdescripcion'))
      html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'))
      html = html.replace(/\{calle\}/, marker.get('cue_ccalle'))
    }
    html = html.replace(/\{alarma\}/, marker.get('cod_cdescripcion'))
    html = html.replace(/\{lblAlarma\}/, getLocale('Alarma'))
    html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'))
    html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'))
    return html
  },
  getBounds: function (markers) {
    var bounds = new google.maps.LatLngBounds()
    Ext.each(markers, function (marker, index, array) {
      if (
        marker.position &&
        !isNaN(marker.position.lat()) &&
        !isNaN(marker.position.lng())
      )
        bounds.extend(marker.position)
    })
    return bounds
  },

  onVehicleSelected: function (record, view) {
    var controller = this
    var selected = record.get('selected')
    var gmappanel6 = view.down('gmappanel6')
    var tabpanel = view.up('tabpanel')
    // if(record.get('asi_ncuenta')) {
    if (record.get('amv_rec_iid')) {
      var store = Ext.create('Ext.data.Store', {
        model: this.getEventosPendientesSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: [
          {
            property: 'rec_iid',
            value: record.get('amv_rec_iid')
          }
        ]
      }).load({
        callback: function (records) {
          if (records[0]) {
            var recordEvento = records[0]
            var title =
              getLocale('Movil:') +
              ' ' +
              record.get('cue_clinea') +
              '-' +
              record.get('cue_ncuenta')
            var tab = Ext.widget('mapguardeventosview', {
              title: title,
              record: recordEvento,
              closable: true,
              translate: false,
              forceCuenta: true
            })
            tabpanel.add(tab)
            tabpanel.setActiveTab(tab)
          } else {
            notify(
              'El evento que tiene asignado este movil no se encuentra con estado pendiente.'
            )
            controller.abrirTabMovilSinAsignacion(record, tabpanel)
          }
        }
      })
    } else {
      controller.abrirTabMovilSinAsignacion(record, tabpanel)
    }
  },

  abrirTabMovilSinAsignacion: function (record, tabpanel) {
    var title =
      getLocale('Movil:') +
      ' ' +
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta')
    var store = Ext.create('Ext.data.Store', {
      model: this.getMapguardModelModel(),
      pageSize: 500,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: 'tmp_idKey',
          value: record.get('tmp_idKey')
        }
      ]
    })
    store.load({
      callback: function (records, operation, success) {
        var tab = Ext.widget('mapguardinfomovileview', {
          title: title,
          record: records[0],
          closable: true,
          translate: false,
          forceShowWidget: record,
          vehicleFilters: [
            {
              property: 'tmp_idKey:IN',
              value: record.get('tmp_idKey')
            },
            {
              property: 'tmp_cnumero:LIKENOT',
              value: 'ST'
            }
          ]
        })
        tabpanel.add(tab)
        tabpanel.setActiveTab(tab)
      }
    })
  },

  onSmartpanicSelected: function (record, view) {
    var controller = this
    var selected = record.get('selected')
    var gmappanel6 = view.down('gmappanel6')
    var vehiclestore = gmappanel6.ultimasPosiciones
    var tabpanel = view.up('tabpanel')
    var title =
      getLocale('SmartPanics:') +
      ' ' +
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta')
    var recordSp = this.getSPCuentaSeguimientoModelModel().create(
      Ext.clone(record.data)
    )
    var tab = Ext.widget('spseguimientomapview', {
      title: title,
      record: recordSp,
      closable: true,
      translate: false,
      forceCuenta: true
    })
    tabpanel.add(tab)
    tabpanel.setActiveTab(tab)
  },

  onSmarttrackSelected: function (record, view) {
    var controller = this
    var selected = record.get('selected')
    var gmappanel6 = view.down('gmappanel6')
    var vehiclestore = gmappanel6.ultimasPosiciones
    var tabpanel = view.up('tabpanel')
    var title =
      getLocale('VigiControll:') +
      ' ' +
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta')
    var cuenta = controller
      .getEventosPendientesSearchModelModel()
      .create(Ext.clone(record.data))
    var latlong = record.get('cue_cLatLng').split(',')
    cuenta.set('lat', record.get('gps_rLatitud'))
    cuenta.set('long', record.get('gps_rLongitud'))
    cuenta.set('gps_rLatitud', record.get('gps_rLatitud'))
    cuenta.set('gps_rLongitud', record.get('gps_rLongitud'))
    cuenta.set('cue_iid', record.get('CuentaId'))
    var smartrack = controller
      .getSmartTrackSearchModelModel()
      .create(Ext.clone(record.data))
    var tab = Ext.widget('vigicontrollgpsfullview', {
      title: title,
      record: cuenta,
      smartrack: smartrack,
      closable: true,
      translate: false,
      forceCuenta: true
    })
    tabpanel.add(tab)
    tabpanel.setActiveTab(tab)
  },
  onServtecSelected: function (record, view) {
    var controller = this
    var selected = record.get('selected')
    var gmappanel6 = view.down('gmappanel6')
    var vehiclestore = gmappanel6.ultimasPosiciones
    var tabpanel = view.up('tabpanel')
    var title =
      getLocale('ServTec:') +
      ' ' +
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta')
    var cuenta = controller
      .getEventosPendientesSearchModelModel()
      .create(Ext.clone(record.data))
    var latlong = record.get('cue_cLatLng').split(',')
    cuenta.set('lat', record.get('gps_rLatitud'))
    cuenta.set('long', record.get('gps_rLongitud'))
    cuenta.set('gps_rLatitud', record.get('gps_rLatitud'))
    cuenta.set('gps_rLongitud', record.get('gps_rLongitud'))
    var tab = Ext.widget('servteccontrollgpsfullview', {
      title: title,
      record: cuenta,
      servTec: record,
      closable: true,
      translate: false,
      forceCuenta: true
    })
    tabpanel.add(tab)
    tabpanel.setActiveTab(tab)
  },
  onCuentaSelected: function (record, view) {
    var controller = this
    var gmappanel6 = view.down('gmappanel6')
    var vehiclestore = gmappanel6.ultimasPosiciones
    var tabpanel = view.up('tabpanel')
    var cue_iid = 0
    var title = ''
    if (typeof record.getProperty === 'function') {
      cue_iid = record.getProperty('cue_iid')
      title = record.getProperty('title')
    } else {
      cue_iid = record.get('cue_iid')
      title = record.get('title')
    }
    var store = Ext.create(Ext.data.Store, {
      model: controller.getCuentaSearchModelModel(),
      remoteFilter: true,
      filters: [
        {
          property: 'cue_iid',
          value: cue_iid
        }
      ]
    })
    store.load({
      callback: function (records) {
        var cuenta = records[0]
        if (cuenta) {
          var latlong = cuenta.get('cue_cLatLng').split(',')
          cuenta.set('lat', latlong[0])
          cuenta.set('long', latlong[1])
          var tab = Ext.widget('mapguardeventosview', {
            title: title,
            record: cuenta,
            recordAsignacion: record,
            closable: true,
            translate: false,
            forceCuenta: true
          })
          tabpanel.add(tab)
          tabpanel.setActiveTab(tab)
        }
      }
    })
  },

  onEventoSelected: function (record, view) {
    var controller = this
    var selected = record.get('selected')
    var gmappanel6 = view.down('gmappanel6')
    var vehiclestore = gmappanel6.ultimasPosiciones
    var tabpanel = view.up('tabpanel')
    var title =
      getLocale('Evento:') +
      ' ' +
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta')
    var mytab = tabpanel.down('[title="' + title + '"]')
    if (!mytab) {
      var eventoPendiente = controller
        .getEventosPendientesSearchModelModel()
        .create(Ext.clone(record.data))
      eventoPendiente.set('gps_rlatitud', record.get('lat'))
      eventoPendiente.set('gps_rlongitud', record.get('long'))
      var tab = Ext.widget('mapguardeventosview', {
        title: title,
        record: eventoPendiente,
        closable: true,
        translate: false,
        forceCuenta: true
      })
      tabpanel.add(tab)
      tabpanel.setActiveTab(tab)
    }
  },

  cleanVehicleSelected: function (view, prevent) {
    var gmappanel6 = view.down('gmappanel6')
    var vehicleSelected = view.vehicleSelected
    var cuentaSelected = view.cuentaSelected
    if (vehicleSelected) {
      var cuenta = vehicleSelected.get('cuentaAsignada')
      vehicleSelected.set('selected', false)
      if (cuenta) {
        gmappanel6.markerCluster.removeMarker(cuenta.marker)
        cuenta.marker = null
        cuenta.set('selected', false)
        //gmappanel6.cache.marker[cuenta.markerIndex].setMap(null);
        gmappanel6.cuentaList = []
      }
      view.vehicleSelected = null
    }
  },

  cleanCuentaSelected: function (view, prevent) {
    var gmappanel6 = view.down('gmappanel6')
    var vehicleSelected = view.vehicleSelected
    var cuentaSelected = view.cuentaSelected
    var datapanel = view.down('#datapanel')
    if (cuentaSelected && !view.forceCuenta) {
      cuentaSelected.set('selected', false)
      view.cuentaSelected = null
    }
    view.forceCuenta = false // evito cerrar el widget solo una vez
  },

  cleanSelected: function (view, prevent) {
    var gmappanel6 = view.down('gmappanel6')
    var vehicleSelected = view.vehicleSelected
    var cuentaSelected = view.cuentaSelected
    this.cleanVehicleSelected(view, prevent)
    this.cleanCuentaSelected(view, prevent)
    if (gmappanel6.directionsDisplay) {
      gmappanel6.directionsDisplay.setMap(null)
    }
  },

  mostrarCuentaRelacionada: function (gmappanel6, record) {
    var model = this.getCuentaSearchModelModel()
    var view = gmappanel6.up('mapguardgpsview')
    if (record.get('asi_ncuenta')) {
      var cuenta = Ext.create(model, {
        cue_clinea: record.get('asi_clinea'),
        cue_ncuenta: record.get('asi_ncuenta'),
        cue_cLatLng: record.get('asi_cLatLng'),
        cue_cnombre: record.get('asi_cnombre'),
        Name: record.get('asi_cnombre')
      })
      gmappanel6.cuentaList = [cuenta]
      if (view.cuenta) {
        gmappanel6.cuentaList.push(view.cuenta)
      }
      record.set('cuentaAsignada', cuenta)
      this.showMarkerArray(gmappanel6, this)
    }
  },

  onActualizarCuentasClick: function (btn) {
    var view = btn.up('mapguardgpsview')
    this.onCuentaTipoSelect(view.down('#comboCuentas'))
  },

  onPlayClick: function (button, event, options) {
    var view = button.up('mapguardgpsview')
    var task = view.accountTask
    Ext.TaskManager.start(task)
  },

  onStopClick: function (button, event, options) {
    var view = button.up('mapguardgpsview')
    var task = view.accountTask
    Ext.TaskManager.stop(task)
  },

  onCuentaTipoSelect: function (combo, records) {
    var me = this
    var value = combo.getValue()
    var gmappanel6 = combo.up('mapguardgpsview').down('#googlemap')
    gmappanel6.cuentaList = []
    var view = combo.up('mapguardgpsview')
    switch (value) {
      case '0':
        var filters = [
          {
            property: 'georeferenciada',
            value: '1'
          }
        ]
        view.down('#comboCuentas').setDisabled(true)
        var store = Ext.create('Ext.data.Store', {
          model: this.getCuentaSearchModelModel(),
          pageSize: 1000,
          remoteSort: true,
          remoteFilter: true,
          filters: filters
        })
        store.load({
          callback: function (records, operation, success) {
            gmappanel6.cuentaList = records
            //gmappanel6.fireEvent('markersChange',gmappanel6,gmappanel6.vehicleList);
            me.showMarkerArray(gmappanel6, me)
            view.down('#comboCuentas').setDisabled(false)
          }
        })
        break
      case '1':
        var filters = [
          /*{
                    property: 'georeferenciada',
                    value   : '1'
                }*/
        ]
        view.down('#comboCuentas').setDisabled(true)
        var store = Ext.create('Ext.data.Store', {
          model: this.getMPCuentasEnAlarmaModelModel(),
          pageSize: 500,
          remoteSort: true,
          remoteFilter: true,
          filters: filters
        })
        store.load({
          callback: function (records, operation, success) {
            gmappanel6.cuentaList = records
            gmappanel6.fireEvent(
              'markersChange',
              gmappanel6,
              gmappanel6.vehicleList
            )
            view.down('#comboCuentas').setDisabled(false)
          }
        })
        break
      case '2':
        var filters = [
          {
            property: 'tmp_nestado',
            value: '3'
          }
        ]
        view.down('#comboCuentas').setDisabled(true)
        var store = Ext.create('Ext.data.Store', {
          model: this.getMapguardModelModel(),
          pageSize: 500,
          remoteSort: true,
          remoteFilter: true,
          filters: filters
        })
        store.load({
          callback: function (records, operation, success) {
            gmappanel6.cuentaList = records
            gmappanel6.fireEvent(
              'markersChange',
              gmappanel6,
              gmappanel6.vehicleList
            )
            view.down('#comboCuentas').setDisabled(false)
          }
        })
        break
      case '3':
        gmappanel6.fireEvent(
          'markersChange',
          gmappanel6,
          gmappanel6.vehicleList
        )
        return true
        break
      case '4':
        view.down('#comboCuentas').setDisabled(true)
        var store = Ext.create('Ext.data.Store', {
          model: this.getMP_CuentasGeoreferenciadasSearchModelModel(),
          pageSize: 1000,
          remoteSort: true,
          remoteFilter: true
        })
        store.load({
          callback: function (records, operation, success) {
            view.down('#center').toggle(false)
            view.down('#manual').toggle(true)
            gmappanel6.getMap().setZoom(2)
            gmappanel6.cuentaList = records
            gmappanel6.fireEvent(
              'markersChange',
              gmappanel6,
              gmappanel6.vehicleList
            )
            view.down('#comboCuentas').setDisabled(false)
          }
        })
        break
    }
  },

  onTipoSelect: function (combo, records, auto) {
    var view = combo.up('mapguardgpsview')
    var grid = view.down('mapguardgridview')
    var gmappanel6 = view.down('#googlemap')
    var store = view.vehicleStore
    var controller = this
    var estado = view.down('#comboEstado')
    //var tipo = records[0].get('field1');
    var tipo = combo.getValue()
    if (tipo == '') {
      estado.show()
    } else {
      estado.hide()
    }
    if (tipo == 'void') {
      gmappanel6.fireEvent('markersChange', gmappanel6, [])
    } else {
      store.filter({ id: 'cService', property: 'cService', value: tipo })
      store.load({
        callback: function (records) {
          gmappanel6.fireEvent('markersChange', gmappanel6, records, auto)
        }
      })
    }
  },

  onEstadoSelect: function (combo, records) {
    var view = combo.up('mapguardgpsview')
    var grid = view.down('mapguardgridview')
    var gmappanel6 = view.down('#googlemap')
    var store = this.getMapguardVehicleStoreStore()
    store.filter({
      id: 'tmp_nestado',
      property: 'tmp_nestado',
      value: records[0].get('field1')
    })
  },

  onSearchAllClick: function (button, event, options) {
    var view = button.up('mapguardgpsview')
    var gmappanel6 = view.down('#googlemap')
    var store = this.getMapguardVehicleStoreStore()
    store.filters.clear()
    store.filter(view.vehicleFilters)
    store.load({
      callback: function (records, operation, success) {
        gmappanel6.fireEvent('markersChange', gmappanel6, records)
        view.down('#comboTipo').clearValue()
        view.down('#comboEstado').clearValue()
      }
    })
  },

  onAddressClick: function (button) {
    var view = button.up('mapguardgpsview')
    var map = view.down('#googlemap')
    var geocoder = map.getGeocoder()
    var addressField = view.down('#address')
    var myAddr = addressField.getValue()
    geocoder.geocode(
      {
        address: myAddr
      },
      function (result, status) {
        if (status == 'OK') {
          var location = result[0].geometry.location
          var pos = new google.maps.LatLng(location.lat, location.lng)

          var marker = new google.maps.Marker({
            position: pos,
            map: map.getMap(),
            title: myAddr
          })
          map.getMap().setCenter(pos)
          map.getMap().setZoom(14)
        }
      }
    )
  },

  calcRoute: function (options, scope) {
    var start = options.start
    var end = options.end
    var gmappanel6 = options.gmappanel6
    var callback = options.callback
    var directionsService = gmappanel6.directionsService
    var directionsDisplay = gmappanel6.directionsDisplay
    if (!directionsDisplay) {
      directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      })
      gmappanel6.directionsDisplay = directionsDisplay
    }
    directionsDisplay.setMap(gmappanel6.getMap())
    if (!directionsService) {
      directionsService = new google.maps.DirectionsService()
      gmappanel6.directionsService = directionsService
    }
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    }
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        gmappanel6.route = result
        directionsDisplay.setDirections(result)
        callback.call(scope, result)
      }
    })
  },

  showCuentaWidget: function (record, gmappanel6) {
    var view = gmappanel6.up('mapguardgpsview')
    if (tab) {
      tab.setRecord(record)
    } else {
      var roview = Ext.widget('mapguardcuentaview', {
        title: getLocale('Cuenta'),
        closable: false,
        record: record
      })
    }
  },

  showMovilWidget: function (record, gmappanel6) {
    var view = gmappanel6.up('mapguardgpsview')
    var roview = Ext.widget('mapguardmovilview', {
      title: 'Móvil seleccionado',
      closable: false,
      gmappanel6: gmappanel6,
      record: record,
      rec_iid: view.rec_iid,
      operadorId: view.operadorId
    })
  }
})
