Ext.define('SmartTrack.controller.VCAllSeguimientoMapController', {
   extend: 'Ext.app.Controller',
   stores: [],
   models: ['VCCuentaSeguimientoModel'],
   views: ['VCAllSeguimientoMapView'],

   init: function (config) {
      this.control({
         'vcallseguimientoview #googlemap': {
            mapready: this.onMapReady,
            //beforerender : this.prepareMap,
            markersChange: this.onMarkersChange
         },
         '#vcseguimientomapgrid': {
            selectionchange: this.onSelectionChange,
         },
         'vcallseguimientoview': {
            //afterrender : this.initView,
            vehicleSelected: this.onVehicleSelected
         },
         'vcallseguimientoview button[action=center]': {
            click: this.onCenterClick
         }
      });
   }, // cierro init



   onCenterClick: function (btn) {
      var view = btn.up('vcallseguimientoview');
      var map = view.down('#googlemap')
      if (btn.pressed) {
         btn.setText(getLocale('Cambiar a Manual'));
         // Agregar centrado de mapa.
         this.onCentrarMap(map);
      } else {
         btn.setText(getLocale('Cambiar a Centrar'));
      }

   },
   onCentrarMap: function (gmappanel) {
      var map = gmappanel.getMap();
      var layer = gmappanel.smarttrack;
      var bounds = new google.maps.LatLngBounds();
      var count = 0;

      layer.forEach(function (feature) {
         bounds.extend(new google.maps.LatLng(feature.getGeometry().get().lat(), feature.getGeometry().get().lng()));
         count++;
      })

      if (count > 0) {
         var map = gmappanel.getMap();
         var lastzoom = map.getZoom();

         setTimeout(function () {
            // 02-01 : Se encuentra comentado y no centra el mapa. Se descomenta por Juan, pedido de Rodrigo. A chequear Adrian
            map.panToBounds(bounds);
            map.fitBounds(bounds);
            if (map.getZoom() == 0) {
               map.setZoom(lastzoom);
            }
         }, 1000);
      }
   },
   beforeInit: function (view) {

   },


   onMapReady: function (gmappanel) {
      var controller = this;
      var urlgeojson = '/handler/SmartTrackGeoJson';
      urlgeojson += '?token=' + Ext.util.Cookies.get('OAuth_Token');


      if (this.application._nameModule === "CleanApp") {
         const filters = [];
         filters.push({
            property: 'tip_nTipo',
            value: 9,
         });
         urlgeojson += '&filter=' + Ext.encode(filters);
      }

      gmappanel.smarttrack = new google.maps.Data();
      gmappanel.smarttrack.loadGeoJson(urlgeojson, null, function (feature) {
         // Aca estaba el loading, revisar si es necesario.
         controller.onCentrarMap(gmappanel)
      });


      gmappanel.smarttrack.setStyle({ visible: true });
      gmappanel.smarttrack.setStyle(function (feature) {
         return {
            icon: feature.getProperty('icon'),
            title: feature.getProperty('title')
         };
      });

      gmappanel.smarttrack.setMap(gmappanel.getMap());

      controller.onCentrarMap(gmappanel)

      gmappanel.smarttrack.addListener('mouseover', function (event) {
         var address = '';
         var infoRecord = getProperties(event.feature);

         if (gmappanel.infowindowOpened) {
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
         }, function (result, status) {

            if (status == 'OK') {
               address = result[0].formatted_address;

               //actualizo contenido
               gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, address))
            } else {
               gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(infoRecord, ''))
            }
         });
         Ext.Ajax.request({
            url: '/rest/search/smarttrackcuenta',
            method: 'GET',
            params: {
               filter: Ext.encode([
                  { property: 'cue_iid', value: event.feature.getProperty("cue_iid") },
                  { property: 'Telefono', value: event.feature.getProperty("Telefono") }])
            },
            success: function (response, opts) {
               var obj = Ext.decode(response.responseText);
               obj.rows[0].icon = infoRecord.icon
               infoRecord = obj.rows[0]
               gmappanel.infowindowOpened.setContent(controller.getMarkerInfoWindowHtmlSmartTrack(obj.rows[0], address))
            }
         })



         gmappanel.infowindowOpened.setPosition(event.feature.getGeometry().get());
         gmappanel.infowindowOpened.open(gmappanel.getMap());

      });

      gmappanel.smarttrack.addListener('mouseout', function (event) {
         gmappanel.infowindowOpened.close();
      });


      /**
       * Tarea de actualización del mapa
       * La misma ejecuta el onSearchClick de VCSeguimientoGridController desde donde se maneja el mapa
       * 
       * ToDo: Traer todo el manejador del mapa a este Controller
       * 
       */
      var view = gmappanel.up('vcallseguimientoview');
      var runner = new Ext.util.TaskRunner();
      view.player = runner.newTask({
         args: [gmappanel, this],
         run: this.reloadMarkers,
         interval: 10000
      });
      view.player.start();

   },
   reloadMarkers: function (gmappanel, controller) {
      var view = gmappanel.up('vcallseguimientoview');
      view.caller = view.down('vcseguimientogridmenuview');

      view.caller.fireEvent('reloadMarkers', view.caller);
   },

   getMarkerInfoWindowHtmlSmartTrack: function (marker, address) {
      if (marker.Telefono) {
         var cargando = '';
      } else {
         var cargando = '<span class="x-mask-msg-text"></span>';
      }
      var html = '\
            <div style="width:280px;">\
            <table>\
            <tr>\
                <td style="padding:5px 5px 0 5px; font-size:13px; ">\
                    <img src="'+ marker.icon + '" style="float:left; margin:0 5px 0 0"/>\
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





      html = html.replace(/\{direccionActual\}/, address ? address : cargando);
      html = html.replace(/\{nombre\}/, marker ? marker.cue_clinea + '-' + marker.cue_ncuenta + ' <br/> ' + (marker.cue_cnombre ? marker.cue_cnombre : cargando) : cargando);
      html = html.replace(/\{localidad\}/, marker.cue_clocalidad ? marker.cue_clocalidad : cargando);
      html = html.replace(/\{telefono\}/, marker.Telefono ? marker.Telefono : cargando);
      html = html.replace(/\{phoneSO\}/, marker.Tipo ? marker.Tipo : cargando);
      html = html.replace(/\{usuario\}/, marker.Nombre ? marker.Nombre : cargando);
      html = html.replace(/\{phoneBrand\}/, marker.Marca ? marker.Marca : cargando);
      html = html.replace(/\{phoneModel\}/, marker.Modelo ? marker.Modelo : cargando);
      html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'));
      html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'));
      html = html.replace(/\{lbltelefono\}/, getLocale('Telefono'));
      html = html.replace(/\{lblusuario\}/, getLocale('Usuario'));
      html = html.replace(/\{lblphoneSO\}/, getLocale('S.O.'));
      html = html.replace(/\{lblphoneModel\}/, getLocale('Modelo'));
      html = html.replace(/\{lblphoneBrand\}/, getLocale('Marca'));
      html = html.replace(/\{lbldireccionactual\}/, getLocale('Direccion actual'));


      html = html.replace(/\{gps_tfechahora\}/, marker.gps_tfechahora ? Ext.Date.format(new Date(marker.gps_tfechahora), 'd-m-Y H:i:s') : cargando);
      html = html.replace(/\{lblgps_tfechahora\}/, getLocale('Fecha de posicion'));


      return html;

   }

});
