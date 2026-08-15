//MIGRADO2024
Ext.define('Common.controller.VehicleSlaveGpsController', {
  extend: 'Ext.app.Controller',
  stores: ['Common.store.TrackGuardMonitoreoSecurityModuleStore'],
  models: [
    'GeocercaMapModel',
    'VehicleGpsModel',
    'GpsHistoricoSearchModel',
    'SecurityModulesModel',
    'VehicleSearchModel'
  ],
  views: ['VehicleSlaveGpsView'],
  init: function (config) {
    this.control({
      'vehicleslavegpsview gmappanel6': {
        mapready: this.onMapReady,
        //  beforerender : this.prepareMap,
        manualcenter: this.onManualCenter
      },
      'vehicleslavegpsview #datapanel': {
        afterrender: this.initDatapanel
      },
      'vehicleslavegpsview ': {
        afterrender: this.initView
      },
      'vehicleslavegpsview button[action=center]': {
        click: this.onCenterClick
      },
      'vehicleslavegpsview #zoom1': {
        click: this.onZoom1Click
      },
      'vehicleslavegpsview #zoom2': {
        click: this.onZoom2Click
      },
      'vehicleslavegpsview #zoom3': {
        click: this.onZoom3Click
      },
      'vehicleslavegpsview #zoom4': {
        click: this.onZoom4Click
      },
      'vehicleslavegpsview #zoom5': {
        click: this.onZoom5Click
      },
      'vehicleslavegpsview #medirdistancia': {
        click: this.onMedirDistanciaClick
      }
      /* 'vehicleslavegpsview #flotaQuadGridView1' : {
                select : this.onSelect1
            }*/
    })
  },

  initView: function (view) {
    var datapanel = view.down('#datapanel')

    if (view.recordSlaveGps) {
      // hay un evento... lo tengo que mostrar en el mapa.
      view.evento = view.record
      view.record = view.recordSlaveGps
    }

    datapanel.record = view.record
    datapanel.tabTipo = view.tabTipo

    if (view.hideDatapanel) datapanel.hide()

    if (view.collapseDatapanel) datapanel.collapse()

    if (view.hidedisplayname) {
      view.down('#displayname').hide()
    }

    view.down('dispositivomovilwidgetview').record = view.record
  },

  onMedirDistanciaClick: function (btn) {
    var view = btn.up('vehicleslavegpsview')

    var win = Ext.create('Ext.Window', {
      layout: 'fit',
      title: 'Medir distancia',
      closeAction: 'destroy',
      modal: true,
      width: 740,
      height: 480,
      border: false,
      maximizable: true,
      items: [
        {
          xtype: 'distanciamaphelperview',
          caller: view,
          addressOrigen: view.record.address
        }
      ]
    })
    win.show()
  },

  onManualCenter: function (gmappanel6) {
    var view = gmappanel6.up('vehicleslavegpsview')
    var btn = view.down('button[action=center]')

    if (btn.pressed) {
      btn.btnEl.dom.click()
      //btn.fireEvent('click', btn);
    }
  },

  onZoom1Click: function (btn) {
    var gmappanel6 = btn.up('vehicleslavegpsview').down('gmappanel6')
    var map = gmappanel6.getMap()
    map.setZoom(1)
  },
  onZoom2Click: function (btn) {
    var gmappanel6 = btn.up('vehicleslavegpsview').down('gmappanel6')
    var map = gmappanel6.getMap()
    map.setZoom(4)
  },
  onZoom3Click: function (btn) {
    var gmappanel6 = btn.up('vehicleslavegpsview').down('gmappanel6')
    var map = gmappanel6.getMap()
    map.setZoom(7)
  },
  onZoom4Click: function (btn) {
    var gmappanel6 = btn.up('vehicleslavegpsview').down('gmappanel6')
    var map = gmappanel6.getMap()
    map.setZoom(12)
  },
  onZoom5Click: function (btn) {
    var gmappanel6 = btn.up('vehicleslavegpsview').down('gmappanel6')
    var map = gmappanel6.getMap()
    map.setZoom(17)
  },

  onSelect1: function (selectionModel, record, options) {
    var view = selectionModel.view.up('vehicleslavegpsview')
    var item = view.down('#11')
    var controller = this
    /* item.removeAll();
        item.add(Ext.widget('vehicleslavegpsview',{
            hideDatapanel: true,
            border: 1,
            record: record
        }))*/

    controller.initMapReady(view.down('gmappanel6'))
    var title =
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta') +
      ' ' +
      record.get('cue_cnombre') +
      ' - ' +
      record.get('Domain')
    view.down('#displayname').setText(title)
  },

  onCenterClick: function (btn) {
    var view = btn.up('vehicleslavegpsview')
    if (!btn._pressed) {
      btn.setText(getLocale('Cambiar a Manual'))
      btn._pressed = true
    } else {
      btn.setText(getLocale('Cambiar a Centrar'))
      btn._pressed = false
    }
  },

  initDatapanel: function (view) {
    var controller = this
    //  var view = gmappanel6.up('vehicleslavegpsview');
    // lo cargo siempre
    if (view.tabTipo != 'movil') {
      //view.record && !view.record.get('gps_rLatitud')) {
      var store = Ext.create('Ext.data.Store', {
        model: this.getVehicleSearchModelModel(),
        remoteFilter: true,
        limit: 1,
        pageSize: 1,
        filters: [
          {
            property: 'cue_iid',
            value: view.record.get('cue_iid')
          }
        ]
      })
      var controller = this

      store.load({
        callback: function (records, operation, success) {
          if (records.length > 0) {
            view.record = records[0]
            controller.initPanel(view)
          }
        }
      })
    } else {
      controller.initPanel(view)
    }
  },

  initPanel: function (view) {
    var controller = this
    //view.controller = this //INCREIBLE PERO PARECE QUE ESTA LÍNEA CAUSABA QUE EL CONTROLLER NO SE 
                            //HAGA LINK CON LA VIEW DESPUES DE CERRAR LA PESTAÑA POR PRIMERA VEZ

    var record = view.record
    var title =
      record.get('cue_clinea') +
      '-' +
      record.get('cue_ncuenta') +
      ' ' +
      record.get('cue_cnombre') +
      ' - ' +
      record.get('Domain')
    view.up('vehicleslavegpsview').down('#displayname').setText(title)

    var modules = SecurityModulesStore //controller.getSecurityModulesStoreStore();
    var trackguardModule = modules.findRecord('KeyReference', 'TrackGuard')
    var administratorModule = modules.findRecord(
      'KeyReference',
      'Administrator'
    )
    var trackguardMonitoreoModule = modules.findRecord(
      'KeyReference',
      'TrackGuardMonitoreo'
    )
    if (
      trackguardModule.get('Available') ||
      administratorModule.get('Available')
    ) {
      var trackguardModules =
        controller.getTrackGuardMonitoreoSecurityModuleStoreStore()
      var modulesArray = []
      trackguardModules.each(function (_module) {
        _module.set('profile', 2);
        _module.set('Id',0);
        modulesArray.push(_module.data)
      })
      view.security = { modules: modulesArray }
      view.modules = modulesArray

      Ext.Array.each(modulesArray, function (_module) {
        var SecurityModulesModel = controller.getSecurityModulesModelModel()
        if (_module.profile != 0) {
          var config = {
            xtype: _module.view,
            title: _module.text,
            stateId: 'vehicleslavegps_' + _module.view,
            record: view.record,
            module: Ext.create(SecurityModulesModel, _module)
          }
          if (_module.viewConfig) {
            Ext.apply(config, Ext.JSON.decode(_module.viewConfig))
          }
          view.add(config)
        }
      })
    } else {
      if (trackguardMonitoreoModule) {
        var _security = trackguardMonitoreoModule.get('_Security')
        if (_security) {
          var modulesArray = _security.modules
          view.modules = modulesArray
          var SecurityModulesModel = controller.getSecurityModulesModelModel()
          Ext.Array.each(modulesArray, function (_module) {
            if (_module.profile != 0) {
              var config = {
                xtype: _module.view,
                title: _module.text,
                stateId: 'vehicleslavegps_' + _module.view,
                record: view.record,
                module: Ext.create(SecurityModulesModel, _module)
              }
              if (_module.viewConfig) {
                Ext.apply(config, Ext.JSON.decode(_module.viewConfig))
              }
              view.add(config)
            }
          })
        }
      }
    }
  },

  onMapReady: function (gmappanel6, googlemap) {
    var controller = this
    var view = gmappanel6.up('vehicleslavegpsview')
    console.log('VIEW MAPA', view)
    if (!view.record.get('gps_rLatitud')) {
      var store = Ext.create('Ext.data.Store', {
        model: this.getVehicleSearchModelModel(),
        remoteFilter: true,
        pageSize: 1000,
        filters: [
          {
            property: 'cue_iid',
            value: view.record.get('cue_iid')
          }
        ]
      })
      var controller = this

      store.load({
        callback: function (records, operation, success) {
          console.log('records', records)
          view.record = records[0]
          controller.initMapReady(gmappanel6, googlemap)
        }
      })
    } 
    // else {
    //  controller.initMapReady(gmappanel6, googlemap)
    //}
  },
  initMapReady: function (gmappanel6, googlemap) {
    var view = gmappanel6.up('vehicleslavegpsview')
    var record = view.record
    var map = gmappanel6.getMap()

    if (UiApplicationMetadata.Kml) {
      var kml = new google.maps.KmlLayer({
        url: UiApplicationMetadata.Kml
      })
      kml.setMap(map)
    }

    if (UiApplicationMetadata.MapType) {
      map.setMapTypeId(UiApplicationMetadata.MapType)
    }

    gmappanel6.ultimasPosiciones = Ext.create('Ext.data.Store', {
      pageSize: 10000,
      remoteFilter: true,
      filters: [
        {
          property: 'gps_idCuenta',
          id: 'cuentaFilter',
          value: record ? record.get('cue_iid') : view.cue_iid
        }
      ],
      model: this.getVehicleGpsModelModel()
    })
    gmappanel6.tiempogps = getParametro('TIEMPOGPS')
    gmappanel6.tg_tiempovidaalarma = getParametro('TG_TIEMPOVIDAALARMA')

    var TIEMPOREFRESHONE = getParametro('TIEMPOREFRESHONE')
    var refresco = 5
    if (TIEMPOREFRESHONE > 0) {
      refresco = TIEMPOREFRESHONE
    }

    Ext.TaskManager.start({
      args: [gmappanel6, this],
      run: this.showMarkerArray,
      interval: refresco * 1000
    })

    // si hay evento lo muestro
    if (view.evento) this.mostrarEvento(view, 0, null)

    gmappanel6.getMap().setOptions({ mapMaker: true })
    this.showMarkerArray(gmappanel6, this)
    this.mostrarGeocercas(map, record)
  },

  getMarkerIcon: function (vehicle, gmappanel6) {
    var view = gmappanel6.up('vehicleslavegpsview')

    if (view.servtec) {
      iconUrl = '/resources/softguard/images/poi/taller.png'
      msg = 'Servicio Tecnico'
    } else {
      var color = ''
      var record = vehicle.gpsRecord
      var now = new Date()
      var ageAlarma = (now - record.get('sta_dFechaUltimaAlerta')) / 60000
      var ageGps = (now - record.get('gps_isofechahora')) / 60000
      var msg = ''
      if (ageAlarma < gmappanel6.tg_tiempovidaalarma) {
        color = '_red'
      } else {
        color = '_active'
      }

      var tip_curlimagen = vehicle
        .get('tip_curlimagen')
        .replace('.png', '')
        .replace('.PNG', '')

      if (tip_curlimagen != '')
        tip_curlimagen = '/resources/softguard/images/' + tip_curlimagen + ' '
      else tip_curlimagen = '/resources/softguard/images/'

      if (ageGps > gmappanel6.tiempogps) {
        iconUrl = tip_curlimagen + 'exclamacion' + color + '.png'

        var verboseTime = ''

        verboseTime = '> ' + gmappanel6.tiempogps + ' minutos'

        msg = 'Ultima posicion ' + verboseTime
      } else {
        if (record.get('gps_iVelocidad') == 0) {
          iconUrl = tip_curlimagen + 'stop' + color + '.png'
          msg = 'Detenido'
        } else if (record.get('gps_Rumbo')) {
          iconUrl =
            tip_curlimagen +
            'direction_' +
            record.get('gps_Rumbo') +
            color +
            '.png'
          vehicle.isFrenado = false
        } else {
          iconUrl = tip_curlimagen + 'exclamacion' + color + '.png'
          //vehicle.isVieja = true;
        }
      }
    }

    var iconObj = {
      url: iconUrl,
      msg: msg
    }

    view
      .down('dispositivomovilwidgetview')
      .fireEvent('changeicon', view.down('dispositivomovilwidgetview'), iconObj)

    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(32, 37),
      new google.maps.Point(0, 0),
      new google.maps.Point(16, 37)
    )
    //console.log(vehicle.get('cue_clinea')+'-'+vehicle.get('cue_ncuenta'),image);
    return image
  },

  getVehiclePosition: function (vehicle, gmappanel6) {
    /*
        var seconds = +Ext.Date.format(new Date(),'s');
        var mylat = -34.6068 - ((seconds+vehicle.get('Id'))/1000);
        var mylong = -58.4126 - ((seconds+vehicle.get('Id'))/1000);
        */
    var store = gmappanel6.ultimasPosiciones
    if (gmappanel6.servtec) {
      //servtec aun no trabaja con imei
      var record = store.getAt(
        store.find(
          'gps_idCuenta',
          vehicle.get('cue_iid'),
          0,
          false,
          false,
          true
        )
      )
    } else {
      var record = store.getAt(
        store.find(
          'gps_cIMEI',
          vehicle.get('gps_cIMEI').trim(),
          0,
          false,
          false,
          true
        )
      )
    }
    if (record) {
      vehicle.gpsRecord = record
      vehicle.currentPositioRecord = record
      var mylat = record.get('gps_rLatitud').replace(/,/g, '.')
      var mylong = record.get('gps_rLongitud').replace(/,/g, '.')
      var point = new google.maps.LatLng(mylat, mylong)

      return { lat: mylat, long: mylong, position: point, gps: record }
    } else {
      if (!vehicle.sinpos) {
        notify('No se encuentra posición reciente')
      }
      vehicle.sinpos = true
      //gmappanel6.up('vehicleslavegpsview').down('dispositivomovilwidgetview').hide();
      return { lat: '', long: '', position: null }
    }
  },

  showVehicle: function (vehicle, index, array) {
    var gmappanel6 = this.gmappanel6
    var view = gmappanel6.up('vehicleslavegpsview')
    // si la view no existe (se cerro la ventana) entonces salgo de la funcion
    if (!view) {
      return
    }
    if (view.servtec) {
      gmappanel6.servtec = view.servtec
    }
    var controller = this.controller
    var vehicle = view.record
    var center = view.down('button[action=center]').pressed
    var clear = false
    var marker = {}
    var pos = controller.getVehiclePosition(vehicle, gmappanel6)
    var geocoder = gmappanel6.getGeocoder()
    var listeners = {}
    var icuales = false
    var vehiclePos = vehicle.pos

    if (vehicle.currentPositioRecord) {
      if (
        (pos.position && !vehicle.lastPosition) ||
        !vehicle.isSlave ||
        pos.position ||
        (vehicle.currentPositioRecord &&
          vehicle.currentPositioRecord.get('gps_rLatitud') !=
            vehicle.lastPosition.get('gps_rLatitud') &&
          vehicle.currentPositioRecord.get('gps_rLongitud') !=
            vehicle.lastPosition.get('gps_rLongitud'))
      ) {
        geocoder.geocode(
          {
            location: pos.position
          },
          function (result, status) {
            if (status == 'OK' && result.length > 0){
              try {
                pos.address = result[0].formatted_address
                vehicle.address = pos.address
              } catch (e) {
                console.log(e)
              }
            }
            vehicle.isSlave = true
            vehicle.pos = pos

            var infoHtml = controller.getVehicleInfoWindowHtml(vehicle, pos)
            if (
              typeof vehicle.SlaveMarkerIndex !== 'undefined' &&
              gmappanel6.cache.marker[vehicle.SlaveMarkerIndex]
            ) {
              // muevo el marker de lugar
              gmappanel6.cache.marker[vehicle.SlaveMarkerIndex].setPosition(
                pos.position
              )
              // lo muestro por si estaba oculto
              gmappanel6.cache.marker[vehicle.SlaveMarkerIndex].setMap(
                gmappanel6.getMap()
              )
              // cambio el icono por si se selecciono o no
              gmappanel6.cache.marker[vehicle.SlaveMarkerIndex].setIcon(
                controller.getMarkerIcon(vehicle, gmappanel6)
              )
              // cambio el contenido del marker
              if (view.showInfoWindow) {
                gmappanel6.cache.infowindow[
                  vehicle.SlaveMarkerIndex
                ].setContent(infoHtml)
              }
            } else {
              marker = {
                lat: pos.lat,
                lng: pos.long,
                record: vehicle,
                title: vehicle.get('Name'),
                icon: controller.getMarkerIcon(vehicle, gmappanel6),
                draggable: false
              }
              if (view.showInfoWindow) {
                marker.infoWindow = {
                  content: infoHtml,
                  listener: 'mouseover',
                  disableAutoPan: true
                }
              }
              gmappanel6.marker = gmappanel6.addMarker(
                pos.position,
                marker,
                clear,
                center,
                listeners
              ) // de aqui se marca en el mapa
              vehicle.SlaveMarkerIndex = gmappanel6.cache.marker.length - 1
              vehicle.marker = gmappanel6.marker
            }

            if (
              !vehicle.lastPosition ||
              (vehicle.currentPositioRecord.get('gps_rLatitud') !=
                vehicle.lastPosition.get('gps_rLatitud') &&
                vehicle.currentPositioRecord.get('gps_rLongitud') !=
                  vehicle.lastPosition.get('gps_rLongitud'))
            ) {
              // agrego el punto
              var historyMarker = controller.getHistoryMarker(
                vehicle,
                vehicle.currentPositioRecord
              )
              gmappanel6.addMarkers([historyMarker])

              // agrego la linea
              vehicle.lastPosition = vehicle.currentPositioRecord
            }

            if (view.down('dispositivomovilwidgetview')) {
              view
                .down('dispositivomovilwidgetview')
                .fireEvent(
                  'changeobject',
                  view.down('dispositivomovilwidgetview'),
                  vehicle
                )
            }
          }
        )
      }
    } else {
    }
  },

  showMarkerArray: function (gmappanel6, controller) {
    var vehicles = [gmappanel6.record]
    var markers = gmappanel6.markerList
    //SI SE ANULA ESTA FUNCIONA NO MUESTRA EL ICONO return;
    var view = gmappanel6.up('vehicleslavegpsview')
    // si se cerro la ventana freno la tarea
    if (!view) {
      Ext.TaskManager.stop({
        args: [gmappanel6, controller],
        run: this.showMarkerArray,
        interval: 3000
      })
      return false
    }

    var dataPanel = view.down('#datapanel')

    if (view.isVisible(true)) {
      gmappanel6.ultimasPosiciones.load({
        params: {
          short: true
        },
        callback: function (records, operation, success) {
          Ext.Array.each(records, controller.showVehicle, {
            gmappanel6: gmappanel6,
            controller: controller
          });

          Ext.Array.each(markers, controller.showMarker, {
            gmappanel6: gmappanel6,
            controller: controller
          })
          /*
                        var active = Ext.Array.filter(gmappanel6.cache.marker,function(item){
                            return item.getMap()
                        });
                        */
          var center
          if (view.down('button[action=center]')) {
            center = view.down('button[action=center]')._pressed
          } else {
            center = true
          }
          var map = gmappanel6.getMap()
          if (center) {
            map.lastZoom = map.getZoom()
            var bounds = controller.getBounds(gmappanel6.cache.marker)

            if (gmappanel6.cache.marker.length > 0) {
              map.setCenter(bounds.getCenter())
              map.panToBounds(bounds)
              map.fitBounds(bounds)

              if (map.getZoom() < 8) map.setZoom(map.lastZoom)

              if (map.getZoom() > 14) map.setZoom(map.lastZoom)
            }
          }
        }
      })
    }
  },

  showMarker: function (marker, index, array) {
    var gmappanel6 = this.gmappanel6
    var controller = this.controller
    var view = gmappanel6.up('vehicleslavegpsview')
    var clear = false
    var lat = marker.get('Latitude')
    var long = marker.get('Longitude')
    var point = new google.maps.LatLng(lat, long)
    var pos = { lat: lat, long: long, position: point }
    var listeners = {}
    var infoHtml = controller.getMarkerInfoWindowHtml(marker, pos)
    if (typeof marker.SlaveMarkerIndex !== 'undefined') {
      gmappanel6.cache.marker[marker.SlaveMarkerIndex].setPosition(pos.position)
      gmappanel6.cache.marker[marker.SlaveMarkerIndex].setMap(
        gmappanel6.getMap()
      )
      gmappanel6.cache.infowindow[marker.SlaveMarkerIndex].setContent(infoHtml)
    } else {
      newmarker = {
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
      gmappanel6.marker = gmappanel6.addMarker(
        pos.position,
        newmarker,
        clear,
        center,
        listeners
      )
      marker.SlaveMarkerIndex = gmappanel6.cache.marker.length - 1
    }
  },

  getVehicleInfoWindowHtml: function (vehicle, pos) {
    var html = '<H1>{dealer}-{ncuenta} {cuenta}</H1>'
    var velocidad = pos.gps.get('gps_iVelocidad')
    var address = vehicle.address
    var fecharecepcion = Ext.Date.format(
      pos.gps.get('gps_isofechahora'),
      'd-m-Y H:i:s'
    )
    var fechagps = Ext.Date.format(
      pos.gps.get('gps_isorawfechahora'),
      'd-m-Y H:i:s'
    )
    var fechaAlerta = Ext.Date.format(
      pos.gps.get('sta_dFechaUltimaAlerta'),
      'd-m-Y H:i:s'
    )

    if (!fecharecepcion)
      fecharecepcion = Ext.Date.format(
        vehicle.get('rec_isoFechaHora'),
        'd-m-Y H:i:s'
      )

    if (velocidad)
      html +=
        '<span style="font-weight:bold;">{lblVelocidad}:</span><span> {velocidad} km/h</span><br/>'

    if (address)
      html +=
        '<span style="font-weight:bold;">{lblDireccion}:</span><span> {direccion}</span><br/>'

    if (fechagps)
      html +=
        '<span style="font-weight:bold;">{lblFechaGPS}:</span><span>  {fechaRaw}</span><br/>'

    if (fechaAlerta)
      html +=
        '<span style="font-weight:bold;">{lblFechaAlerta}:</span><span>  {fechaAlerta}</span><br/>'

    html +=
      '\
            <span style="font-weight:bold;">{lblFechaRecepcion}:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">{lblUltAlerta}:</span><span>  {alerta}</span><br/>\
            <span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/>'
    // traducciones
    html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'))
    html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'))
    html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'))
    html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'))
    html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'))
    html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'))
    html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'))
    html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'))
    //sta_dFechaUltimaAlerta
    html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'))
    html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'))
    html = html.replace(/\{nombre\}/, vehicle.get('Domain'))
    html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'))
    html = html.replace(/\{velocidad\}/, velocidad)
    html = html.replace(/\{direccion\}/, address)
    html = html.replace(/\{fechaRaw\}/, fechagps)
    html = html.replace(/\{fecha\}/, fecharecepcion)
    html = html.replace(/\{fechaAlerta\}/, fechaAlerta)
    html = html.replace(/\{alerta\}/, pos.gps.get('cod_cdescripcion'))
    html = html.replace(/\{latitud\}/, pos.gps.get('gps_rLatitud'))
    html = html.replace(/\{longitud\}/, pos.gps.get('gps_rLongitud'))
    return html
  },

  getMarkerInfoWindowHtml: function (marker, pos) {
    var html = '\
            <H1>{nombre}</H1>\
            <H2>{direccion}</H2>'
    html = html.replace(/\{nombre\}/, marker.get('Name'))
    html = html.replace(/\{direccion\}/, marker.get('FullAddress'))
    return html
  },
  getBounds: function (markers) {
    var bounds = new google.maps.LatLngBounds()
    Ext.each(markers, function (marker, index, array) {
      if (marker.getMap()) {
        bounds.extend(marker.position)
      }
    })
    return bounds
  },

  mostrarGeocercas: function (map, record) {
    var me = this
    var store = Ext.create('Ext.data.Store', {
      model: 'Common.model.GeocercaSearchModel',
      remoteFilter: true,
      filters: [
        {
          property: 'Cuenta',
          value: record.get('OwnerId')
        }
      ]
    })
    store.load({
      callback: function (records, operation, success) {
        Ext.Array.each(records, me.mostrarGeocerca, {
          gmappanel6: map,
          controller: me
        })
      }
    })
  },

  mostrarGeocerca: function (record, index, array) {
    var controller = this.controller
    var me = this.controller
    var map = this.gmappanel6
    var gmappanel6 = this.gmappanel6
    var metadata = Ext.create(me.getGeocercaMapModelModel())
    var tipo = record.get('GeoType')
    var color = ''

    if (tipo == 'E') {
      color = 'Red'
    } else {
      color = 'Green'
    }

    metadata.data = Ext.JSON.decode(record.get('MetaData'))

    if (metadata.get('Type') == 'circle') {
      var newShape = new google.maps.Circle({
        strokeColor: color,
        fillColor: color,
        fillOpacity: 0.35
      })

      var center = new google.maps.LatLng(
        metadata.get('CenterLat'),
        metadata.get('CenterLng')
      )
      newShape.setCenter(center)

      newShape.setRadius(parseInt(metadata.get('Radius')))
      newShape.setMap(map)
      gmappanel6.geocerca = newShape

      var bounds = newShape.getBounds()
      map.fitBounds(bounds)
    }

    if (metadata.get('Type') == 'polygon') {
      var newShape = new google.maps.Polygon({
        strokeColor: color,
        fillColor: color,
        fillOpacity: 0.35
      })
      var pathArray = Ext.JSON.decode(metadata.get('Path'))
      var path = new google.maps.MVCArray()

      Ext.Array.each(pathArray, function (item) {
        var latlng = new google.maps.LatLng(item.lat, item.lng)
        path.push(latlng)
      })

      newShape.setPath(path)
      newShape.setMap(map)
      gmappanel6.geocerca = newShape
      var bounds = newShape.getBounds()
      //map.fitBounds(bounds);
    }

    if (metadata.get('Type') == 'polyline') {
      var newShape = new google.maps.Polyline()
      var pathArray = Ext.JSON.decode(metadata.get('Path'))
      var path = new google.maps.MVCArray()

      Ext.Array.each(pathArray, function (item) {
        var latlng = new google.maps.LatLng(item.lat, item.lng)
        path.push(latlng)
      })

      newShape.setPath(path)
      newShape.setMap(map)
      gmappanel6.geocerca = newShape
      var bounds = newShape.getBounds()
      map.fitBounds(bounds)
    }
  },

  getHistoryMarkers: function (store, vehicle) {
    var points = new Array()
    var markers = new Array()
    var controller = this

    store.each(function (record, index, total) {
      points.push({
        lat: record.get('gps_rLatitud'),
        lng: record.get('gps_rLongitud'),
        fecha: record.get('gps_isofechahora')
      })
      if (!record.marker) {
        var mark = {
          marker: null,
          lat: record.get('gps_rLatitud'),
          lng: record.get('gps_rLongitud'),
          record: record,
          title: Ext.Date.format(record.get('gps_isofechahora'), 'Y-m-d H:i:s'),
          icon: controller.getHistoryMarkerIcon(index, total, false, record),
          infoWindow: {
            content: controller.getHistoryInfoWindowHtml(vehicle, record),
            listener: 'click'
          },
          draggable: false
        }
        markers.push(mark)
        record.marker = mark
      }
    })

    return { points: points, markers: markers }
  },

  getHistoryMarker: function (vehicle, record) {
    var controller = this
    if (!record.marker) {
      var mark = {
        marker: null,
        lat: record.get('gps_rLatitud'),
        lng: record.get('gps_rLongitud'),
        record: record,
        title: Ext.Date.format(
          record.get('gps_isorawfechahora'),
          'Y-m-d H:i:s'
        ),
        icon: controller.getHistoryMarkerIcon(1, 3, false, record),
        infoWindow: {
          content: controller.getHistoryInfoWindowHtml(vehicle, record),
          listener: 'click'
        },
        draggable: false
      }
      record.marker = mark
    }
    return record.marker
  },

  getHistoryMarkerIcon: function (i, total, old, record) {
    var selected = ''
    var iconUrl = ''
    var path = google.maps.SymbolPath.CIRCLE
    var rotation = 0

    if (record && record.get('gps_Rumbo') && record.get('gps_iVelocidad') > 0) {
      path = google.maps.SymbolPath.FORWARD_CLOSED_ARROW
      switch (record.get('gps_Rumbo')) {
        case 'up':
          rotation = 0
          break
        case 'upright':
          rotation = 45
          //rotation = 0;
          break
        case 'right':
          rotation = 90
          //rotation = 0;
          break
        case 'downright':
          rotation = 135
          //rotation = 0;
          break
        case 'down':
          rotation = 180
          //rotation = 0;
          break
        case 'downleft':
          rotation = 225
          //rotation = 0;
          break
        case 'left':
          rotation = 270
          //rotation = 0;
          break
        case 'upleft':
          rotation = 315
          //rotation = 0;
          break
        case 'stop':
          rotation = 0
          path = google.maps.SymbolPath.CIRCLE
          break
      }
    }
    var image = {
      path: path,
      scale: 4,
      rotation: rotation,
      fillColor: 'red',
      fillOpacity: 0.5,
      strokeWeight: 1,
      strokeColor: 'red'
    }
    /*
        iconUrl = old?'/resources/softguard/images/icon_dot_verde.gif':'/resources/softguard/images/icon_dot-nonew.gif';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(10,10),
            new google.maps.Point(0,0),
            new google.maps.Point(5,5)
        );
        */
    return image
  },

  getHistoryInfoWindowHtml: function (vehicle, gps) {
    var pos = vehicle.pos
    var html =
      '\
            <div style="width:500px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            '

    html += '\
                <table>'
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
                           <span style="font-weight:bold;">{lblBateria}:</span><span>  {bateria}</span><br/>\
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

    //sta_dFechaUltimaAlerta
    html = html.replace(/\{bateria\}/, vehicle.get('gps_ibattery'))
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

  getEventoIcon: function (cuenta, gmappanel6) {
    var cuentaTipoIcon = cuenta.get('tip_curlimagen')
    var iconUrl = '/resources/softguard/images/mapguard-cservice/'
    var tipo = 'Casa' // cuenta.get('tip_cdescripcion');

    if (cuenta.get('selected')) {
      tipo = tipo + '_selected'
    }
    iconUrl = iconUrl + tipo + '.png'

    /*if (cuentaTipoIcon){
            iconUrl = cuentaTipoIcon;
        }*/

    //si tiene alarma muestro el icono de alarma
    if (cuenta.get('rec_calarma')) {
      //iconUrl = '/handler/getImage?u=/images/codala/'+cuenta.get('rec_calarma')+'.png';
      var iconUrl = '/resources/softguard/images/enalarma.png'
    }

    var image = new google.maps.MarkerImage(
      iconUrl,
      new google.maps.Size(48, 48),
      new google.maps.Point(0, 0),
      new google.maps.Point(15, 35)
    )

    return image
  },

  mostrarEvento: function (view, index, array) {
    var gmappanel6 = view.down('#googlemap')
    var controller = this
    var cuenta = view.evento
    var center = false
    var clear = false
    var pos = controller.getEventoPosition(cuenta, gmappanel6)
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

      var infoHtml = controller.getVehicleInfoWindowHtml(cuenta, pos)

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
        labelAnchor: new google.maps.Point(0, 0),
        labelClass: 'gmaplabel2', // the CSS class for the label
        labelStyle: { opacity: 0.75 },
        title: cuenta.get('Name'),
        icon: controller.getEventoIcon(cuenta, gmappanel6),
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
        cuenta.marker.setIcon(controller.getEventoIcon(cuenta, gmappanel6))
        // cambio el contenido del marker

        if (cuenta.infowindow) cuenta.infowindow.setContent(infoHtml)
      } else {
        gmappanel6.addMarker(pos.position, markerConf, clear)

        cuenta.marker.setMap(gmappanel6.getMap())
        //agrego listener
        google.maps.event.addListener(cuenta.marker, 'click', function () {
          //view.cuentaSelected = cuenta;
          view.fireEvent('cuentaSelected', cuenta, view)
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

  getEventoPosition: function (record, gmappanel6) {
    var arrayLatLng = []

    if (record.get('sp_rLongitud') && record.get('sp_rLongitud') != '') {
      arrayLatLng[0] = record.get('sp_rLatitud')
      arrayLatLng[1] = record.get('sp_rLongitud')
    } else if (
      record.get('gps_rLongitud') &&
      record.get('gps_rLongitud') != ''
    ) {
      arrayLatLng[0] = record.get('gps_rLatitud')
      arrayLatLng[1] = record.get('gps_rLongitud')
    } else if (
      record.get('sp_rlongitud') &&
      record.get('sp_rlongitud') != '' &&
      record.get('sp_rlongitud') != 0
    ) {
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
    } else {
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
  }
})
