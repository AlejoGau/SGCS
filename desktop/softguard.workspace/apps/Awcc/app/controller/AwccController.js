Ext.define('Awcc.controller.AwccController', {
  extend: 'Ext.app.Controller',
  stores: ['TablaLineasStore'],
  models: ['TablasLineasSearchModel', 'EventosPendientesMapaSearchModel'],
  views: [
    'AwccToolbarView',
    'ExtUxNotification',
    'MetadataViewport',
    'AwccPanelView',
    'CuentaConMapaView'
  ],

  init : function(config) {
    // genero los eventos
  this.control({
          'viewport' : {
              beforerender : this.onbeforerender,
              afterrender: this.initview
    },
         
          'cuentaconmapaview gmappanel' : {
        mapready : this.onMapReady,
              markersCuentaChange: this.onMarkersCuentaChange,
              // beforerender : this.prepareMap
              markersDealerChange: this.changeGrid,
              manualcenter : this.onManualCenter,
              reloadMap : this.onReloadData,
              addManualFilters : this.onAddManualFilters
    },
          'awccpanelview #btnMulticuenta' : {
          click : this.onClickMulticuenta,
             // beforerender : this.prepareMap
    },
          'awccpanelview #mensaje' : {
            click : this.onClickMensaje
             // beforerender : this.prepareMap
    },
          'awccpanelview #todoseventos' : {
              click : this.onClickEventos
             // beforerender : this.prepareMap
    },
          'awccpanelview gmappanel button[action=center]': {
              click: this.onCenterClick
          },
          // ajusto el layout luego de la carga del logo
          '#imagendealer': {
              render: function(img) {
                  img.getEl().on('load', function() {
                      img.ownerCt.doLayout();
                  });
              }
          }
  });
}, // cierro init
  
  onManualCenter: function(gmappanel){
      var view = gmappanel.up('awccpanelview');
      var btn = view.down('#center');
      
      if(btn._pressed) {
          btn.setText(getLocale('Cambiar a Centrar'));
          btn._pressed = false
      } 
  },

  onCenterClick: function (btn) {
      var view = btn.up('awccpanelview');
      if(!btn._pressed) {
          btn.setText(getLocale('Cambiar a Manual'));
          this.loadEventosData(view.down('gmappanel'),this);
          btn._pressed = true;
      } else {
          btn.setText(getLocale('Cambiar a Centrar'));
          btn._pressed = false
      }
  },
  
  onClickEventos: function (btn) {
      var view = btn.up('cuentaconmapaview')
      var gmappanel = view.down('gmappanel');
      var controller = this;
      if(view.task) {
          Ext.TaskManager.stop(view.task);
          delete(view.task)
          controller.onEventosChange(gmappanel,[]);
          controller.onMarkersCuentaChange(gmappanel);
      } else {
          controller.loadEventosData(view, controller);
          
          view.task = Ext.TaskManager.start({
              args: [view,controller],
              run: this.loadEventosData,
              interval: 10000
          });
      }
  },
  
  loadEventosData: function (view, controller) {
      if(!view.loadingStore) {
          view.loadingStore = true;
          if(view.storeEventos) {
              view.storeEventos.loadPage(1,{scope: view, callback: function(records){           
                  view.loadingStore = false;
                  if (records.length > 0){
                      controller.onEventosChange(view.down('gmappanel'), records)
                  }              
              }});
          }
      }
  },

  onEventosChange: function(gmappanel, eventos){
      var view = gmappanel.up('cuentaconmapaview');
      
      this.clearEventos(gmappanel);
      gmappanel.markerCluster.clearMarkers()

      if (eventos)
          gmappanel.eventos = eventos;

      this.showMarkerArray(gmappanel,this);
  },
  
  onMarkersCuentaChange: function(gmappanel, cuentaList, keepSelected){
      var view = gmappanel.up('cuentaconmapaview');
      // borro todos los markers
      gmappanel.markerCluster.clearMarkers()
      // regenero las cuentas
      
      if (cuentaList){
          this.clearCuentas(gmappanel);
          gmappanel.cuentaList = cuentaList;
      }
      
      //this.loadData(gmappanel, this);
      this.showMarkerArray(gmappanel,this);
  },
  
  getBounds: function(markers) {
      var bounds = new google.maps.LatLngBounds();
      Ext.each(markers, function (marker,index,array) {
          if (marker.position && !isNaN(marker.position.lat()) && !isNaN(marker.position.lng()))
              bounds.extend(marker.position);
      });
      return bounds
  },
  
  
  showMarkerArray: function(gmappanel,controller){
      var view = gmappanel.up('cuentaconmapaview');   
      var cuentas = gmappanel.cuentaList;  
      var eventos = gmappanel.eventos;        
      var map = gmappanel.getMap();
      
      Ext.Array.each(cuentas,controller.mostrarCuenta,{gmappanel: gmappanel, controller: controller});
      Ext.Array.each(eventos,controller.mostrarCuenta,{gmappanel: gmappanel, controller: controller});
               
      var center = true //view.down('button[action=center]').pressed;
      var markerList = gmappanel.cache.marker;
      var active = Ext.Array.filter(markerList,function(item){
          return item.getMap()
      });
      
      var center = view.down('#center')._pressed;
      
      if (center){
          var bounds = controller.getBounds(markerList);
          map.fitBounds(bounds);                      
      } 
      gmappanel.markerCluster.repaint();    
  },

  mostrarCuenta: function(cuenta,index,array){
      var gmappanel = this.gmappanel;
      var controller = this.controller;
      var view = gmappanel.up('mapguardgpsview');
      var center = false;
      var clear = false;
      var pos = controller.getCuentaPosition(cuenta, gmappanel);
      var igual = false;

      if (pos && pos.position && cuenta.position && cuenta.marker){
          if (
              cuenta.position.lat().toFixed(6) == parseFloat(pos.lat).toFixed(6) && 
              cuenta.position.lng().toFixed(6) == parseFloat(pos.long).toFixed(6)
              ){
              igual = true;
          }    
      }
      
      if (pos && pos.position && (pos.lat!=0 && pos.long!=0)  && !igual){
          var geocoder = gmappanel.getGeocoder();
      
          cuenta.position = pos.position;
          
          var infoHtml = controller.getMarkerInfoWindowHtml(cuenta,pos);
          var markerConf = {
              position: pos.position,
              lat : pos.lat,
              lng : pos.long,
              record: cuenta,
              labelContent: '<span>'+cuenta.get('cue_clinea')+"-"+cuenta.get('cue_ncuenta')+'</span>',
              //labelAnchor: new google.maps.Point(40, 0),
              labelClass: "gmaplabel2", // the CSS class for the label
              labelStyle: {opacity: 1},
              title : cuenta.get('Name'),
              icon: controller.getCuentaIcon(cuenta,gmappanel),
              infoWindow: {
                  content: infoHtml, 
                  listener:'mouseover',
                  disableAutoPan: true
              },
              draggable : false,
              record:cuenta
        };
          
          if (cuenta.marker){
              // muevo el marker de lugar
              cuenta.marker.setPosition(pos.position);
              // lo muestro por si estaba oculto
              cuenta.marker.setMap(gmappanel.getMap());
              // cambio el icono por si se selecciono o no
              cuenta.marker.setIcon(controller.getCuentaIcon(cuenta,gmappanel));
              // cambio el contenido del marker
              
              if (cuenta.infowindow)
              cuenta.infowindow.setContent(infoHtml);
              
          } else {

              if(cuenta.get('rec_calarma')) {
                  gmappanel.addMarker(pos.position, markerConf, clear);
              } else {
                   var marker = new google.maps.Marker(markerConf);
                  gmappanel.markerCluster.addMarker(marker);   
                  cuenta.marker = marker;
              }
              
              cuenta.marker.setMap(gmappanel.getMap());

              //agrego listener
              google.maps.event.addListener(cuenta.marker, 'click', function() {
                  //view.cuentaSelected = cuenta;
                  view.fireEvent('eventoSelected',cuenta, view);
              });
              
              cuenta.markerIndex = gmappanel.cache.marker.length-1;
              cuenta.infowindow = gmappanel.createInfoWindow(markerConf.infoWindow, pos.position, cuenta.marker);
              
              google.maps.event.addListener(cuenta.marker, 'mouseout', function() {
                 cuenta.infowindow.close()
              });
          }
      }
  },

  clearCuentas: function(gmappanel){
      Ext.Array.each(gmappanel.cuentaList,function(cuenta){
          if (cuenta.marker){
              cuenta.marker.setMap(null);
              cuenta.marker = null;
          }
      });
  },

  clearEventos: function(gmappanel){
      Ext.Array.each(gmappanel.eventos,function(evento){
          if (evento.marker){
              evento.marker.setMap(null);
              evento.marker = null;
          }
      });
  },
  
  getCuentaIcon: function(cuenta, gmappanel){
      var cuentaTipoIcon = cuenta.get('tip_curlimagen');
      var iconUrl = '/resources/softguard/images/evento_0.png';
     
      if(cuenta.get('rec_nEstado')) {
        iconUrl = '/resources/softguard/images/evento_'+cuenta.get('rec_nEstado')+'.png'
      } 
      
      var image = new google.maps.MarkerImage(
          iconUrl,
          new google.maps.Size(48,48),
          new google.maps.Point(0,0),
          new google.maps.Point(15,35)
      );
      
      return image;
  },

  getCuentaPosition: function(record, gmappanel){
      var arrayLatLng = [] ;
      
      if(record.get('sp_rlongitud') && record.get('sp_rlongitud') != '') {
          arrayLatLng[0] = record.get('sp_rlatitud') ;
          arrayLatLng[1] = record.get('sp_rlongitud');
          
      } else if(record.get('gps_rlongitud') && record.get('gps_rlongitud') != '') {
          arrayLatLng[0] = record.get('gps_rlatitud') ;
          arrayLatLng[1] = record.get('gps_rlongitud');
          
      } else if(record.get('lat') && record.get('long') != '') {
          arrayLatLng[0] = record.get('lat') ;
          arrayLatLng[1] = record.get('long');
          
      } else if(record.get('cue_cLatLng')) {
          var myLatLng = record.get('cue_cLatLng');
          var arrayLatLng = myLatLng.split(',');
      } else if (record.get('cue_clatlng')){
          var myLatLng = record.get('cue_clatlng');
          var arrayLatLng = myLatLng.split(',');
      }

      if (arrayLatLng.length > 1){
          if (!isNaN(arrayLatLng[0]) && !isNaN(arrayLatLng[1])){
              var point = new google.maps.LatLng(arrayLatLng[0],arrayLatLng[1]);
              return {lat: arrayLatLng[0], long: arrayLatLng[1], position: point, gps: record};
          }
              else return {lat:'',long:'',position: null}
      }else {     
          return {lat:0,long:0,position: null};
      } 
  },
  
  getMarkerInfoWindowHtml: function(marker, pos){
       var html = '            <div style="width:250px;">            <table>            <tr>                <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">                    <img src=""/resources/softguard/images/mapguard-cservice/Casa.png" style="float:left; margin:0 5px 0 0"/> <div style="float:left; width:200px">{nombre}</div>                </td>            </tr>            ';

     
       html += '                    <tr>                        <td style="padding:5px; font-size:13px;">';
      if(marker.get('pro_cdescripcion')) {
       html += '                           <span style="font-weight:bold;">{lblProvincia}:</span><span> {provincia}</span><br>';
      }
       html += '                           <span style="font-weight:bold;">{lblLocalidad}:</span><span> {localidad}</span>                        </td>                    </tr>                    <tr>                        <td style="padding:5px; font-size:13px;">                           <span style="font-weight:bold;">{lblAlarma}:</span><span> {alarma}</span>                        </td>                    </tr>                    <tr>                        <td style="padding:5px; font-size:13px;">                           <span style="font-weight:bold;">{lblFecha}:</span><span> {fecha}</span>                        </td>                    </tr>                    ';
      if(Ext.util.Format.trim(marker.get('rec_czona'))) {
       html += '                           <tr>                        <td style="padding:5px; font-size:13px;">                           <span style="font-weight:bold;">{lblZona}:</span><span> {zona}</span>                        </td>                    </tr>';
      }
      if(Ext.util.Format.trim(marker.get('usu_cnombre'))) {
       html += '                           <tr>                        <td style="padding:5px; font-size:13px;">                           <span style="font-weight:bold;">{lblUsuario}:</span><span> {usuario}</span>                        </td>                    </tr>';
      }
                  
      html += '</table>';
      
      var cod_cdescripcion = marker.get('cod_cdescripcion');
      
      if (marker.get('asi_cnombre')){
          var cuenta = marker.get('asi_clinea') + '-'+marker.get('asi_ncuenta');
          html = html.replace(/\{nombre\}/, cuenta + ' '+marker.get('asi_cnombre'));
          html = html.replace(/\{provincia\}/, marker.get('pro_cdescripcion'));
          html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'));
          html = html.replace(/\{calle\}/, marker.get('cue_ccalle'));
      }else{
          
          html = html.replace(/\{nombre\}/, marker.get('cue_clinea')+'-'+marker.get('cue_ncuenta')+' '+marker.get('cue_cnombre'));
          html = html.replace(/\{provincia\}/, marker.get('pro_cdescripcion'));
          html = html.replace(/\{localidad\}/, marker.get('cue_clocalidad'));
          html = html.replace(/\{calle\}/, marker.get('cue_ccalle'));
      }
      
      html = html.replace(/\{alarma\}/, marker.get('cod_cdescripcion'));
      html = html.replace(/\{fecha\}/, marker.get('rec_tfechahora'));
      html = html.replace(/\{zona\}/, marker.get('rec_czona'));
      html = html.replace(/\{usuario\}/, marker.get('usu_cnombre'));
      
      html = html.replace(/\{lblUsuario\}/, getLocale('Usuario'));
      html = html.replace(/\{lblAlarma\}/, getLocale('Alarma'));
      html = html.replace(/\{lblFecha\}/, getLocale('Fecha'));
      html = html.replace(/\{lblZona\}/, getLocale('Zona'));
      html = html.replace(/\{lblProvincia\}/, getLocale('Provincia'));
      html = html.replace(/\{lblLocalidad\}/, getLocale('Localidad'));
      
      return html;
  },

  onClickMensaje: function (btn) {
      var view = btn.up('awccpanelview');
      var win = Ext.create('Ext.Window', {
          iconCls: 'icon-email',
          layout : 'fit',
          title : 'Mensaje',
          width : 390,
          height : 450,
          border : false,
          items : [
                      {
                      xtype: 'awccmailformview',
                  }
              ],
          
          caller: view
      });
      win.show();
  },
  
  onClickMulticuenta: function (btn) {
      var view = btn.up('awccpanelview');
      // Lo agregamos al panel
  var myPanel = view.down('#awcctabpanel');
      
      myPanel.closeAction = 'hide';
      var title = "Reporte Multi-cuenta";
      // me fijo si el tab existe, si es nuevo lo creo
  // if (!myPanel.getComponent(record.get('text'))) {
  var mytab = myPanel.down('[title='+getLocale(title)+']');
  if (!mytab) {
    var newTab = Ext.widget('multicuentagridview',{
          title: title,
          closable: true,
              webClienteEvents: true
    });

    // agrego la paleta creada
    myPanel.add(newTab);
    myPanel.setActiveTab(newTab);
  }
  // el existe, lo activo
  else {
    myPanel.setActiveTab(mytab);
  }  
  },
  
  onbeforerender: function(view){
      this.application._nameModule = 'AWCC';
      this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);
  },
  
  initview: function(view){
      var controller = this;
      var myPanel = view.down('tabpanel');
      var viewCuenta = view.down('cuentaconmapaview');

      myPanel.setActiveTab(viewCuenta);
      
      var viewSeguimiento = view.down('spseguimientogridview');
      var url = '/Rest/Security/Modules/'+viewCuenta.securityId+'/Security/'+_UserData.UserId;
      view.securityLoading= true;

      Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
          if (resp.responseText)
              var json = JSON.parse(resp.responseText);
          if (json && json.rights && json.rights.dealer && json.rights.dealer != '') {
                  var store = Ext.create('Ext.data.Store', {
                  model : controller.getTablasLineasSearchModelModel(),
                  remoteFilter: true,
                  autoload: false,
                  filters:[{
                      property: 'lin_ccodigo',
                      value: json.rights.dealer
                  }]
              });
              
              store.load({callback:function (records) {
                  console.log(records)
                  if (records[0]){
                      view.down('#nombredealer').setValue(records[0].get('lin_crazonsocial'));

                      var direccion = records[0].get('lin_ccalle')+' '+records[0].get('lin_cdepartamento')+' '+records[0].get('lin_clocalidad')+' '+records[0].get('lin_cprovincia')
                      if(Ext.util.Format.trim(records[0].get('lin_ccodigopostal')) != ''){
                          direccion = direccion + ' ('+records[0].get('lin_ccodigopostal')+')';
                      }
                      
                      view.down('#direccion').setValue(direccion);
                      view.down('#telefono').setValue(records[0].get('lin_ctelfono'));
                      view.down('#email').setValue(records[0].get('lin_cmail'));

                      if(records[0].get('lin_cimagen') != '') {
                          view.down('#imagendealer').setSrc('/gallery/'+records[0].get('lin_cimagen'));
                      } else {
                          view.down('#imagendealer').setSrc('/desktop/images/logo_softguard_blanco.jpg');
                      }
                  } else {
                      view.down('#imagendealer').setSrc('/desktop/images/logo_softguard_blanco.jpg');
                  }
                  
              }})
              
          } else {
              view.down('#imagendealer').setSrc('/desktop/images/logo_softguard_blanco.jpg');
          }   
      }})

      var newTab = Ext.widget('multicuentagridview',{
          title: 'Eventos',
          closable: false,
          showPlayer: true,
          interval: 60000,
          mostrar: getParametro('CANTIDADMAXHISTORICO'),
          eventsOnWindow: true,
          showSonidoButton: true,
          webClienteEvents: true
      });
          
      myPanel.add(newTab);

      var newTab = Ext.widget('awccmailformview',{
          title: 'Formulario de contacto',
          closable: false,
          noCloseAfterSave: true
      });
          
      myPanel.add(newTab);

      var newTab = Ext.widget('objectomodificacionesview',{
          title: 'Solicitudes de cambio',
          closable: false,
          filterByUser: true,
          readOnly: true
      });
          
      myPanel.add(newTab);
  },
  
  changeGrid: function (view, records) {
      var center = view.down('#center')._pressed;

      if (typeof google !== 'object' || typeof google.maps !== 'object'|| !view.mapReady){
          //vuelvo a cargar porque la api de google aun no esta
          Ext.Function.defer(this.changeGrid, 500, this,arguments);
      } else {
          var controller = this;
          var gmappanel = view;
          gmappanel.clearMarkers();
          gmappanel.cache.marker = [];
          Ext.Array.each(records,function (rec) {
              var latYLong = rec.get('cue_cLatLng').split(',')
              var point = new google.maps.LatLng(latYLong[0],latYLong[1]);
              var marker = {
                  lat : latYLong[0],
                  lng : latYLong[1],
                  record: rec,
                  labelContent: "<span>"+rec.get('_fullname')+"</span>",
                 // labelAnchor: new google.maps.Point(40, 0),
                  labelClass: "gmaplabel2", // the CSS class for the label
                  labelStyle: {opacity: 1},
                  title : rec.get('_fullname'),
                  icon: controller.getMarkerIcon(rec,gmappanel),
                  infoWindow: {
                      content: controller.getVehicleInfoWindowHtml(rec), 
                      listener:'mouseover',
                      disableAutoPan: true
                  },
                draggable : false
          };
              rec.marker = gmappanel.addMarker(point, marker, false,center,{});
          }) 
          
          var markerList = gmappanel.cache.marker;
          
          var map = gmappanel.getMap();
          var active = Ext.Array.filter(markerList,function(item){
              return item.getMap()
          });
          
          if (records.length == 1){              
                  map.setZoom(14);
                  var marker = records[0].marker;
                  if (center){
                      map.setCenter(marker.position);
                  }
          } else {
              var bounds = controller.getBounds(active);
              if (bounds){
              if (center){
               map.setCenter(bounds.getCenter());
               map.panToBounds(bounds);
                     map.fitBounds(bounds);
            }
              } 
          }
      }
  },
  
  getMarkerIcon: function(rec,gmappanel){
      var iconUrl = '/resources/softguard/images/cuenta_activa.png';
      
      
      if(rec.get('sta_nestado') == 0) {
          iconUrl = '/resources/softguard/images/cuenta_desactiva.png';
      }

      var image = new google.maps.MarkerImage(
          iconUrl,
          new google.maps.Size(48,48),
          new google.maps.Point(0,0),
          new google.maps.Point(15,35)
      );
      
      return image;
  },

  /**
   * 11/04/2019 : GeoJson de CuentaByDealerAwccGeoJson
   * La informacion del GeoJson se toma con la funcion getProperty y no get, se reemplaza la misma y se arma la infoWindow
   * ANTERIOR : rec.get();
   * NUEVO : rec.getProperty();
   * 
   */
  getVehicleInfoWindowHtml: function(rec){ 
      var html = '<H1>{title}</H1><span style="font-weight:bold;">Dirección:</span><span> {direccion}</span><br/>';
      
      html = html.replace(/\{title\}/, rec.title);
      html = html.replace(/\{direccion\}/, rec.direccion);
      return html
  },
  
  /**
   * 11/04/2019 : GeoJson de CuentaByDealerAwccGeoJson
   * Funcion que se encarga de limpiar el layer del mapa con el GeoJson cargado y recarga el mismo al mismo tiempo que la grilla de información.
   * 
   */
  onReloadData : function(gmappanel, filter) {
      var controller = this;
      var view = gmappanel.up('cuentaconmapaview');
      var filter = filter?filter:null;
      
      /**
       * Pregunto si ya existe cargado el GeoJson, esto funciona para el reload.
       * Esto es debido a que el load del GeoJson es en el afterRender del map.
       */
      if(gmappanel.cuentasawcc) {
          gmappanel.cuentasawcc.forEach(function(feature) {
           gmappanel.cuentasawcc.remove(feature);
      });
          controller.loadMap(gmappanel, filter);
      }
  },
  
  /**
   * 11/04/2019 : GeoJson de CuentaByDealerAwccGeoJson
   * Funciones que se encarga de filtrar el mapa.
   * 
   * Ejecutan onReloadMap para limpiar y luego pasa nuevo filtro
   * 
   */
      
  onAddManualFilters : function(gmappanel, filter) {
      var controller = this;
      var view = gmappanel.up('cuentaconmapaview');
      controller.onReloadData(gmappanel, filter);
  },
  
  onMapReady: function(gmappanel, map, store, filter){
      var controller = this;
      var view = gmappanel.up('cuentaconmapaview');
      var record = view.record;
      
      view.storeEventos = Ext.create('Ext.data.Store',{
          model: this.getEventosPendientesMapaSearchModelModel(),
          pageSize: 100
      });
      
      /* gmappanel.vehicleList = [record];
      
      gmappanel.ultimasPosiciones = Ext.create('Ext.data.Store',{
      pageSize: 500,
      model: this.getVehicleGpsModelModel()
      });*/
      
      // this.loadData(gmappanel,this);
      
      // agrego el markerclustered
      gmappanel.markerCluster = new MarkerClusterer(gmappanel.getMap(),[],{gridSize:60});
      
      var map = gmappanel.getMap();
      
      if (UiApplicationMetadata.Kml){
          var kml = new google.maps.KmlLayer({
              url: UiApplicationMetadata.Kml
          });     
          kml.setMap(map);
      }
      
      if (UiApplicationMetadata.MapType){
          map.setMapTypeId(UiApplicationMetadata.MapType);
      }
      
      /*  var trefresco = 10000
      var runner = new Ext.util.TaskRunner();
          view.player = runner.newTask({
          args: [gmappanel,this],
          run: this.loadData,
          interval: trefresco
      });
      view.player.start();
      */
      
      //view.velocidad = trefresco;
      //this.initview(view.up('awccpanelview'));

      /**
       * Genero el array de datos para el GeoJson vacio, esto es debido al primer onMapReady del GoogleMaps
       * Si no hago esto, el mapa no elimina la primer capa de todas creada.
       */
      gmappanel.cuentasawcc = new google.maps.Data();

      Ext.Function.defer(controller.onReloadData, 2000, controller,[gmappanel, ""]);
  },
  
  loadMap : function(gmappanel, filter) {
      var controller = this;
      var map = gmappanel.getMap();
      var view = gmappanel.up('cuentaconmapaview');
      var center = view.down('#center')._pressed;
     /**
       * 11/04/2019 : GeoJson de CuentaByDealerAwccGeoJson
       * Cargo la información con el token del usuario, filtrado por las cuentas que no son del tipo 1,2,3,5,6
       */
      var dateNow = new Date();
              
      var url = '/handler/CuentaByDealerAwccGeoJson';
          url += '?token='+Ext.util.Cookies.get('OAuth_Token');
      if (!filter) {
          url += '&filter=[{"property":"cue_nllaveul","value":1},{"property":"_tip_nTipo:NOT","value":"1,2,3,5,6"}]';
      } else {
          url += '&filter=[{"property":"cue_nllaveul","value":1},{"property":"_tip_nTipo:NOT","value":"1,2,3,5,6"}'+filter+']';
      }
          url += "&_dc="+dateNow.getTime();            
          
      gmappanel.cuentasawcc.setStyle(function(feature) {
          return {
              icon:feature.getProperty('icon'),
              title: feature.getProperty('title')
          };
      });

      gmappanel.cuentasawcc.addListener('mouseover', function(event) {
          var marker = getProperties(event.feature);
          if(gmappanel.infowindowOpened) {
        gmappanel.infowindowOpened.close();                        
    }
    gmappanel.infowindowOpened = new google.maps.InfoWindow(); 
          gmappanel.infowindowOpened.setContent(controller.getVehicleInfoWindowHtml(marker));
    gmappanel.infowindowOpened.setPosition(event.latLng);
    gmappanel.infowindowOpened.setOptions({pixelOffset: new google.maps.Size(0, -60)});
    gmappanel.infowindowOpened.open(map);
      });
      gmappanel.cuentasawcc.addListener('mouseout', function(event) {gmappanel.infowindowOpened.close();})
      
      gmappanel.cuentasawcc.loadGeoJson(url,{},function(){
          gmappanel.cuentasawcc.setMap(map);
          if (center){
              controller.centerMapGeojson(controller,gmappanel.cuentasawcc,gmappanel);
          }
      });
  },

  centerMapGeojson: function(controller,layer,gmappanel) {
      var bounds = new google.maps.LatLngBounds();    
      var count = 0;

      layer.forEach(function (feature) {
          bounds.extend(new google.maps.LatLng(feature.getGeometry().get().lat(),feature.getGeometry().get().lng()));
          //controller.createlabel(gmappanel.getMap(), feature);
          count++;
      })
      
      if(count>0) {        
          var map = gmappanel.getMap();
          var lastzoom = map.getZoom();
                  
          setTimeout(function(){
              // 02-01 : Se encuentra comentado y no centra el mapa. Se descomenta por Juan, pedido de Rodrigo. A chequear Adrian
              map.panToBounds(bounds);
              map.fitBounds(bounds);    
              if (map.getZoom()==0) {
                  map.setZoom(lastzoom);
              }
          }, 1000);
      }
  },

  createlabel: function(map, feature){
      var myLatlng = new google.maps.LatLng(feature.getGeometry().get().lat(),feature.getGeometry().get().lng());
      var mapLabel = new MapLabel({
          text: feature.getProperty('title'),
          position: myLatlng,
          map: map,
          fontSize: 12,
          align: 'center'
      });

      mapLabel.set('position', myLatlng);
      feature.mapLabel= mapLabel;
  },

  openObjectList: function(){
      
},

openObjectById : function(objectId) {
  record = this.getSoftguardCuentaModelModel();
      
      var north = Ext.getCmp('north');
      north.hide();
      var south = Ext.getCmp('south');
      south.hide();
      
      if (objectId == 0) {

    var myobject = record.create({
      Name : 'Nueva cuenta',
              cue_dfechaalta: new Date(),
              cue_dservicio: new Date()
    });
                  
          this.setRecord(myobject);
          
          /*
    myobject.save({
          scope : this,
          callback : function(record, operation) {
            this.setRecord(record);
          }
        });*/
  }
      else {
      record.load(objectId, {
              callback : function(record,operation) {
                  if (operation.success){
                      
                      // cargo la lista de modulos
                      var modules = Ext.widget('moduletreeview', {
                          store : 'CuentaDealerModuleStore'
                      });
                      var west = Ext.getCmp('west');
                      if (west.collapsed){west.toggleCollapse();}
                      west.add(modules);

                      // seteo el registro
                      this.setRecord(record);
                  }
              },
              scope : this
          });
      }
},
  
  setRecord: function(record){
      text = record.get('Name');
      document.title = text;
      
      var viewport =  Ext.getCmp('viewport');
      viewport.record = record;
      viewport.cuenta = record;
      
  // Lo agregamos al panel
  var myPanel = Ext.getCmp('center');
      
      myPanel.closeAction = 'hide';
      
      // me fijo si el tab existe, si es nuevo lo creo
  // if (!myPanel.getComponent(record.get('text'))) {
  var mytab = myPanel.down('[title='+getLocale('Cuenta')+']');
  if (!mytab) {
    var newTab = Ext.widget('cuentaformview',{
              record: record,
          title: 'Cuenta',
          closable: false,
        record: record
    });

    // agrego la paleta creada
    myPanel.add(newTab);
    myPanel.setActiveTab(newTab);
  }
  // el existe, lo activo
  else {
    myPanel.setActiveTab(mytab);
  }
  }
});