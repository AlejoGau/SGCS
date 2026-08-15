//MIGRADO2024
Ext.define('Common.controller.TripMapController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GpsHistoricoSearchModel' ],
    views : [ 'TripMapView', 'tripClienteROView', 'tripROView', 'tripTransporistaROView' ],
    init : function(config) {
		this.control({
            'tripmapview': {
                afterrender: this.initview
            },
            "tripmapview gmappanel6": {
                mapready: this.onMapReady
            },
            'tripmapview #velMax' : {
				change : this.onVelMAxChange
			},
            'tripmapview #exportKml' : {
				click : this.onExportKmlClick
			}
        })
    },
    initview : function(view) {
        var controller = this;
        var record = view.record;
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');
        view.rangoPrecision = 1000;
        fechaDesde.setValue(record.get('tgv_fechainicio'));
        fechaHasta.setValue(record.get('tgv_fechafin'));
        fechaDesde.disable(true);
        fechaHasta.disable(true);
        /*
        console.log(view)
        console.log(view.record)
        console.log(view.caller)
        */
        // Obtengo la grilla de posiciones y bindeo el Store TGposicionesGPS
        var gridPosiciones = view.down('#gridpuntos');
        var filters= [
            {
                property:'pos_idCuenta',
                value: record.get('cue_iid'),
                id : 'gps_idCuenta'
            },{ 
                property: 'pos_cIMEI',
                value: record.get('cue_cimei'),
                id: 'gps_cIMEI'
            }
        ]
        if (record.get('tgv_fechainicio')){
            filters.push({ 
                property: 'fechaDesde',
                value: Ext.Date.format(new Date(record.get('tgv_fechainicio')),'Y-m-d')+"T"+ Ext.Date.format(new Date(record.get('tgv_fechainicio')),'H:i:s'),
                id: 'dateStart'
            })
        }
        if (record.get('tgv_fechafin')){
            filters.push({ 
                property: 'fechaHasta',
                value: Ext.Date.format(new Date(record.get('tgv_fechafin')),'Y-m-d')+"T"+ Ext.Date.format(new Date(record.get('tgv_fechafin')),'H:i:s'),
                id: 'dateEnd'
            });
        }
        view.maxSpeed = record.get('_transportista_maxspeed');
        view.down('#velMax').setValue(view.maxSpeed);
        var storeTGPosicionesGPS = Ext.create('Ext.data.Store',{
            model: this.getGpsHistoricoSearchModelModel(),
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,
            filters: filters
        })
        gridPosiciones.bindStore(storeTGPosicionesGPS);
        storeTGPosicionesGPS.load();
        view.down('#triproview').loadRecord(record);
        view.down('#tripclienteroview').loadRecord(record);
        view.down('#triptransportistaroview').loadRecord(record);
        this.showTripMetadata(view);
    },
    onExportKmlClick: function(btn){
        var view = btn.up('tripmapview');
        var store = view.down('#gridpuntos').getStore();
        var filter = store.getProxy().encodeFilters(store.filters.items);
        var record = view.record;
        
        var url = '/handler/ExportKml?filter='+filter+'&filename='+record.get('tgv_nombre')+'.kml'
        window.location = url;
    },
    onVelMAxChange: function(field, newvalue, oldvalue){
        var view = field.up('tripmapview');
        view.maxSpeed = newvalue;
        if (oldvalue > 0){
            var mappanel = view.down('gmappanel6');
            mappanel.fireEvent('mapready', mappanel);
        }
    },
    showTripMetadata: function(view){
        var record = view.record;
        var datosextra = view .down('#datosextra');
        var FORMULARIOVIAJE = getParametro('FORMULARIOVIAJE');
        if (FORMULARIOVIAJE){
            var _json = Ext.JSON.decode(FORMULARIOVIAJE);
            datosextra.add(_json.items);
            // cargo los datos de la metadata.
            var _datosExtraData = record.get('tgv_metadata');
            if (_datosExtraData){
                var _datosExtraJSON = Ext.JSON.decode(_datosExtraData);
                if (datosextra.items && datosextra.items.length>0){
                    Ext.Array.each(datosextra.items.items, function(item, index, _items) {
                        if (item.xtype=='datetimefield'){
                            item.setValue(Ext.Date.parse(_datosExtraJSON[item.name], 'MS'));
                        } else{
                            item.setValue(_datosExtraJSON[item.name]);
                        }
                        item.disable();
                    })
                }
            }
            datosextra.show();
        }
    },
    onMapReady : function(gmappanel6) {
        var controller = this;
        var view = gmappanel6.up('tripmapview');
        var record = view.record;
        var map = gmappanel6.getMap();
        gmappanel6.record = record;
        gmappanel6.tg_tiempovidaalarma = getParametro('TG_TIEMPOVIDAALARMA');
        gmappanel6.tiempogps = getParametro('TIEMPOGPS');
        gmappanel6.clearMarkers();
        controller.showHistory(gmappanel6, record);
    },
    showHistory: function(map, vehicle) {
        var controller = this;
        var view = map.up('tripmapview');
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        var gridpuntos = view.down('#gridpuntos');
        var pageSize = 5000;
        var record = view.record;
        // esto ajusta segun lo que esta en application, si ahi se resta siempre aca hay qeu comentar
        if (fechaDesde){
            fechaDesde= Ext.Date.add(fechaDesde, Ext.Date.MINUTE, fechaDesde.getTimezoneOffset()*(-1));
        }
        
        if (fechaHasta){
            fechaHasta= Ext.Date.add(fechaHasta, Ext.Date.MINUTE, fechaHasta.getTimezoneOffset()*(-1));
        }
        var filters= [
            {
                property:'pos_idCuenta',
                value: record.get('cue_iid'),
                id : 'gps_idCuenta'
            },{ 
                property: 'pos_cIMEI',
                value: record.get('cue_cimei'),
                id: 'gps_cIMEI'
            }
        ];
        if (record.get('tgv_fechainicio')){
            filters.push({ 
                property: 'fechaDesde',
                value: Ext.Date.format(new Date(record.get('tgv_fechainicio')),'Y-m-d')+"T"+ Ext.Date.format(new Date(record.get('tgv_fechainicio')),'H:i:s'),
                id: 'dateStart'
            })
        }
        if (record.get('tgv_fechafin')){
            filters.push({ 
                property: 'fechaHasta',
                value: Ext.Date.format(new Date(record.get('tgv_fechafin')),'Y-m-d')+"T"+ Ext.Date.format(new Date(record.get('tgv_fechafin')),'H:i:s'),
                id: 'dateEnd'
            });
        }
        var store = view.store = Ext.create('Ext.data.Store',{
            model: this.getGpsHistoricoSearchModelModel(),
            remoteFilter: true,
            filters: filters,
            pageSize: pageSize
        });
        store.load({callback: function(records){
            if (records.length > 0) {
                // Al cargar el Store, obtengo los puntos y armo los markers por medio de la funcion getHistoryMarkers
                var historyMarkers = controller.getHistoryMarkers(store, vehicle, map);
                var points = historyMarkers.points;
                var markers = historyMarkers.markers;
                map.addMarkers(markers);
            }
            // Obtengo el estado del boton de centrado
            var center = view.down('button[action=center]').pressed;
                    
            if (center) {
                if (markers) {
                    // Obtengo los markers totales en el mapa
                    var bounds = controller.getBounds(markers);
                    // Centro el mapa en base a los puntos
                    map.getMap().fitBounds(bounds);
                    if (map.getMap().getZoom()>14){
                        map.getMap().setZoom(14)
                    }
                }
            }
        }})
    },
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
            bounds.extend(marker.position);
        });
        return bounds
    },
    getHistoryMarkers: function(store, vehicle, map) {
        var points = new Array();
        var markers = new Array();
        var controller = this;
        var secuencia = 0;
        var view = map.up('tripmapview');
        var filterprecision = view.down('button[action=filterprecision]').pressed;
        store.each(function(record, index, total){
            // solo muestro los puntos con presicion menor a 500mts
            if (record.get('gps_rAccuracy') < view.rangoPrecision || !filterprecision){
                points.push({
                    lat: record.get('gps_rLatitud'), 
                    lng: record.get('gps_rLongitud'), 
                    fecha: record.get('gps_tfechahora')
                });
                markers.push({
                    marker: null,
                    lat : record.get('gps_rLatitud'),
                    lng : record.get('gps_rLongitud'),
                    record: record,
                    title : Ext.Date.format(record.get('gps_tfechahora'),'Y-m-d H:i:s'),
                    icon: controller.getHistoryMarkerIcon(index, total, null, record, map, view),
                    infoWindow: {
                        content: controller.getHistoryInfoWindowHtml(vehicle,record),
                        listener: 'click'
                    },
                    draggable : false
                });   
            }
        })
        
        return {points:points,markers:markers}
    },
    getHistoryMarkerIcon: function(i,total,old,record, map, view){
        var iconUrl = '';
        
        switch (i)
        {
            case 0:
                iconUrl = '/resources/softguard/images/start.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(32,37),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,37)
                );
                break;
            case total-1:
                iconUrl = '/resources/softguard/images/finish.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(32,37),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,37)
                );
                break;
            default:
                var rotation = 0;
                var path = google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
                if (record && record.get('gps_Rumbo')){
                    switch (record.get('gps_Rumbo'))
                    {
                        case 'up':
                            rotation = 0;
                            break;
                        case 'upright':
                            rotation = 45;
                            //rotation = 0;
                            break;
                        case 'right':
                            rotation = 90;
                            //rotation = 0;
                            break;
                        case 'downright':
                            rotation = 135;
                            //rotation = 0;
                            break;
                        case 'down':
                            rotation = 180;
                            //rotation = 0;
                            break;
                        case 'downleft':
                            rotation = 225;
                            //rotation = 0;
                            break;
                        case 'left':
                            rotation = 270;
                            //rotation = 0;
                            break;
                        case 'upleft':
                            rotation = 315;
                            //rotation = 0;
                            break;
                        case 'stop':
                            rotation = 0;
                            path = google.maps.SymbolPath.CIRCLE;
                            break;
                    }
                }
                
                if (record.get('gps_iVelocidad') == 0){
                    rotation = 0;
                    path = google.maps.SymbolPath.CIRCLE;
                }
                // me fijo si mostrar flechas o circulos
                if (view.maxSpeed < record.get('gps_iVelocidad')){
                    iconUrl = '/resources/global/images/icons/velocimeter.png';
                    var image = new google.maps.MarkerImage(
                        iconUrl,
                        new google.maps.Size(32,37),
                        new google.maps.Point(0,0),
                        new google.maps.Point(16,37)
                    );
                }
                else {
                    var image = {
                        path: path,
                        scale: 4,
                        rotation: rotation,
                        fillColor : 'red',
                        fillOpacity : 0.5,
                        strokeWeight: 1,
                        strokeColor: 'red'
                    };
                }         
                
                // Grafico las flechas
                
            break;
        }
        
        return image;
    },
    getHistoryInfoWindowHtml: function(vehicle, gps){
        var html = '            <div style="width:250px;height:80px;">            <span style="font-weight:bold;">{lblevento}:</span><span>  {evento}</span><br/>            <span style="font-weight:bold;">{lblfecha}:</span><span>  {fecha}</span><br/>            <span style="font-weight:bold;">{lblprecision}:</span><span>  {precision} mts.</span><br/>            <span style="font-weight:bold;">{lblbatt}:</span><span>  {batt}</span><br/>            <span style="font-weight:bold;">{lblrumbo}:</span><span>  {rumbo}</span><br/>            <span style="font-weight:bold;">{lbldireccion}:</span><span>  {direccion}</span><br/>            </div>';
            
        html = html.replace(/\{lblfecha\}/, getLocale('Fecha'));
        html = html.replace(/\{lbldireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblrumbo\}/, getLocale('Rumbo'));
        html = html.replace(/\{lblbatt\}/, getLocale('Nivel batería'));
        html = html.replace(/\{lblevento\}/, getLocale('Evento'));
        html = html.replace(/\{lblprecision\}/, getLocale('Precisión'));
        //Federico v. cambie el parametro que se pasa en el campo fecha ya que no era el correcto y hacia que el campo se muestre vacio
        html = html.replace(/\{fecha\}/, Ext.Date.format(gps.get('gps_isofechahora'), 'd-m-Y H:i:s'));
        html = html.replace(/\{precision\}/, Ext.util.Format.number(gps.get('gps_rAccuracy'),'0'));
        html = html.replace(/\{batt\}/, gps.get('gps_iBattery')?gps.get('gps_iBattery'):getLocale('Sin valor'));
        html = html.replace(/\{rumbo\}/, gps.get('gps_iRumbo'));
        html = html.replace(/\{evento\}/, gps.get('rec_calarma')?gps.get('cod_cdescripcion'):getLocale('Seguimiento'))
        html = html.replace(/\{direccion\}/, gps.get('gps_cDireccion'));
        return html
    }
});