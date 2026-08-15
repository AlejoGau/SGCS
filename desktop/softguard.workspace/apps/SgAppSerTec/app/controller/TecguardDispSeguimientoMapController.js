
Ext.define('SgAppSerTec.controller.TecguardDispSeguimientoMapController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_posicionesSPModel', 'GeocercaMapModel' ],
    views : [ 'TecguardSeguimientoMapView', 'DateTimeField' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'tecguardseguimientomapview' : {
                beforerender : this.initview
			},
            'tecguardseguimientomapview #gridpuntos' : {
                itemclick: this.onPuntosItemClick
    		},
            
            'tecguardseguimientomapview gmappanel6' : {
    			mapready : this.onMapReady
			},
            'tecguardseguimientomapview button[action=filterprecision]': {
                click: this.onFilterPrecisionClick
            },
            'tecguardseguimientomapview button[action=Buscar]': {
                click: this.onBuscarClick
            },
            'tecguardseguimientomapview button[action=tiempo-1]': {
                click: this.onTiempo1Click
            },
            'tecguardseguimientomapview button[action=tiempo-2]': {
                click: this.onTiempo2Click
            },
            'tecguardseguimientomapview button[action=tiempo-3]': {
                click: this.onTiempo3Click
            },
            'tecguardseguimientomapview button[action=tiempo-4]': {
                click: this.onTiempo4Click
            },
            'tecguardseguimientomapview button[action=posicion-1]': {
                click: this.onPosicion1Click
            },
            'tecguardseguimientomapview button[action=posicion-2]': {
                click: this.onPosicion2Click
            }
		})
	}, // cierro init

    initview: function(view){
        view.rangoPrecision = 1000;
        view.shapes = [];
    },

    onMapReady: function(gmappanel6,googlemap){
        var view= gmappanel6.up('tecguardseguimientomapview');
        var record = view.record;
        var controller= this;
        view.cantidad = 1; // por defecto muestro ultimo evento
        gmappanel6.record = record;

        var map = gmappanel6.getMap();
        
        if (record){
            Ext.TaskManager.start({
                args: [gmappanel6,record, view.eventId],
                run: controller.showHistory,
                scope: controller,
                interval: 90000
            });
            
            this.mostrarGeocercas(map, record,view);
        }
    },
    
    mostrarGeocercas: function(map,record,view){
        var me = this;
        
        var geocercas = view.down('#btnGeocercas').pressed;
        Ext.Array.each(view.shapes, function (r) {
            r.setMap(null)
        })
        if(geocercas) {
        
            var store =Ext.create('Ext.data.Store',{
                model: this.getSmartPanicsGeocercasSearchModelModel(),
                remoteFilter: true,
                filters: [
                     {
                        property: 'MetaData:LIKENOT',
                        value   : 'polyline'
                     },{
                        property: 'Imei',
                        value   : record.get('cue_cIMEI')
                     }
                    ]
            });
            store.load({callback: function(records, operation, success){
                Ext.Array.each(records,me.mostrarGeocerca,{gmappanel6: map, controller: me, view:view});
            }});
        }
        
    },
    
    
    mostrarGeocerca: function(record,index, array){
        var controller = this.controller;
        var me = this.controller;
        var map = this.gmappanel6;
        var view = this.view;
        var gmappanel6 = this.gmappanel6;
        var metadata = Ext.create(me.getGeocercaMapModelModel());
        var tipo = record.get('GeoType');
        var color = '';

        if (tipo == 'E') {
            color = 'Red';
        } else {
            color = 'Green';
        }
        
        var data = Ext.JSON.decode(record.get('MetaData'));
        metadata.data = data.data?data.data:data;
        
        if (metadata.get('Type') == 'circle'){
            var newShape = new google.maps.Circle({
                strokeColor: color,
                fillColor: color,
                fillOpacity: 0.35
            });
            
            var center = new google.maps.LatLng(
                metadata.get('CenterLat'),
                metadata.get('CenterLng')
            );
            newShape.setCenter(center);
            newShape.setRadius(metadata.get('Radius'));
            newShape.setMap(map);
            gmappanel6.geocerca = newShape;
            
            var bounds = newShape.getBounds();
            map.fitBounds(bounds);
            
            view.shapes.push(newShape)
        }
        
        if (metadata.get('Type') == 'polygon'){
            var newShape = new google.maps.Polygon({
                strokeColor: color,
                fillColor: color,
                fillOpacity: 0.35
            });
            var pathArray = Ext.JSON.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();
            
            Ext.Array.each(pathArray,function(item){
                var latlng = new google.maps.LatLng(
                    item.lat,
                    item.lng
                )
                path.push(latlng);
            });
            
            newShape.setPath(path);
            newShape.setMap(map);
            gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
            //map.fitBounds(bounds);
            view.shapes.push(newShape)
        }
        
        if (metadata.get('Type') == 'polyline'){
            var newShape = new google.maps.Polyline();
            var pathArray = Ext.JSON.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();
            
            Ext.Array.each(pathArray,function(item){
                var latlng = new google.maps.LatLng(
                    item.lat,
                    item.lng
                )
                path.push(latlng);
            });
            
            newShape.setPath(path);
            newShape.setMap(map);
            gmappanel6.geocerca = newShape;
            
            
            var bounds = newShape.getBounds();
            map.fitBounds(bounds);
            view.shapes.push(newShape)
        }
    },
    
    
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
                bounds.extend(marker.position);
        });
        return bounds
    },
    
    onBuscarClick: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');
        view.cantidad = null;
        this.showHistory(map);
    },
    
    onTiempo1Click: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');

        
        view.cantidad = null;

        fechaDesde.setValue(Ext.Date.add(now, Ext.Date.MINUTE,-10));
        fechaHasta.setValue(now);
        
        this.showHistory(map);
    },
    
    onTiempo2Click: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');
        
        view.cantidad = null;

        fechaDesde.setValue(Ext.Date.add(new Date(), Ext.Date.MINUTE,-60));

        fechaHasta.setValue(now);
        
        this.showHistory(map);
    },
    
    onTiempo3Click: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');        
        view.cantidad = null;

        fechaDesde.setValue(Ext.Date.add(new Date(), Ext.Date.HOUR,-10));

        fechaHasta.setValue(now);
        this.showHistory(map);
    },
    
    onTiempo4Click: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');
        
        view.cantidad = null;

        fechaDesde.setValue(Ext.Date.add(new Date(), Ext.Date.DAY,-1));

        fechaHasta.setValue(now);
        this.showHistory(map);
    },
    
    onPosicion1Click: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');
        
        view.cantidad = 1;
        this.showHistory(map);
    },
    
    onPosicion2Click: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');
        
        view.cantidad = 30;
        this.showHistory(map);
    },
    
    
    onFilterPrecisionClick: function(button){
        var view = button.up('tecguardseguimientomapview');
        var map = view.down('gmappanel6');

        this.showHistory(map);
    },
    
    mostrarDireccion :function (lat,lng,view) {
        var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        var divDireccion = Ext.dom.Query.select('.direccion')
       
        var geocoder = new google.maps.Geocoder;
        
        divDireccion[0].style.display = 'block'
        divDireccion[0].innerHTML = getLocale('Cargando direccion...')
        
        geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            console.log(results[0])
            
            
            divDireccion[0].innerHTML = results[0].formatted_address
            
          } else {
            notify('No se encontro la direccion.');
            divDireccion.style.display = 'none'
          }
        } else {
          //notify('ocurrio un error vuelva intentarlo mas tarde.');
          divDireccion.style.display = 'none'
        }
        });  
        
    },
    
    onPuntosItemClick: function(gridview,record,item,index,e,options){
        var puntos = gridview.up('#gridpuntos');
        var view = puntos.up('tecguardseguimientomapview');
        var gmappanel6 = view.down('gmappanel6');
        var map = gmappanel6.getMap();
        var filterprecision = view.down('button[action=filterprecision]').pressed;
        
        if (record.marker){
            // oculto geocercas
            gmappanel6.clearMarkers();
            // prendo la geocerca del registro
            if (record.geocerca) record.geocerca.setMap(map);

            record.marker.setMap(map);
            this.mostrarDireccion(record.marker.lat,record.marker.lng,view)
        } else if (record.get('sp_rAccuracy')>view.rangoPrecision && filterprecision){
            notify('Punto fuera de rango de precisión de: '+view.rangoPrecision+' mts');
        } else {
            gmappanel6.clearMarkers();
            this.showMarker(view,record)
            //notify('Aún no se dibujó.');
        }
        
    },

    showMarker: function(view, record){
        var gmappanel6 = view.down('gmappanel6');
        var map = gmappanel6.getMap();
        var controller = this;
        var point = {lat: record.get('sp_rLatitud'), lng: record.get('sp_rLongitud'),fecha: record.get('sp_tfechahora')};
        var marker = {
            marker: null,
            lat : record.get('sp_rLatitud'),
            lng : record.get('sp_rLongitud'),
            record: record,
            title : Ext.Date.format(record.get('sp_tfechahora'),'Y-m-d H:i:s'),
            icon: controller.getHistoryMarkerIcon(1, 3,null, record, gmappanel6),
            infoWindow: {
                content: controller.getHistoryInfoWindowHtml(view.record,record),
                listener:'click'
            },
            draggable : false
        }
        
        gmappanel6.addMarkers([marker]);

        // agrego los circulos de la accuracy
        if (record.get('sp_rAccuracy')>50)
            controller.mostrarPrecision(record, gmappanel6, controller);
    },
    
    showHistory: function(map, vehicle, event){
        var controller = this;
        var view = map.up('tecguardseguimientomapview');
        
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        var pageSize=500;
        var gridpuntos = view.down('#gridpuntos');
        
        // esto ajusta segun lo que esta en application, si ahi se resta siempre aca hay qeu comentar
       // fechaDesde= Ext.Date.add(fechaDesde, Ext.Date.MINUTE, fechaDesde.getTimezoneOffset()*(-1));
        //fechaHasta= Ext.Date.add(fechaHasta, Ext.Date.MINUTE, fechaHasta.getTimezoneOffset()*(-1));

        
        if (view.cantidad>0){
            var filters = [
                {
                    property:'sp_cIMEI',
                    value: view.record.get('cue_cIMEI')
                }
            ];
            var pageSize = view.cantidad;
        }else{
            var filters= [
                {
                    property:'sp_cIMEI',
                    value: view.record.get('cue_cIMEI')
                },{ 
                    property: 'sp_tfechahora:GTE',
                    value: new Date(fechaDesde),
                    id: 'dateStart'
                },{ 
                    property: 'sp_tfechahora:LTE',
                    value: new Date(fechaHasta),
                    id: 'dateEnd'
                }
            ];
        }
        
        
        if (view.store){
            var store = view.store;
            store.filters.clear();
            store.currentPage = 1;
            store.pageSize=pageSize;
            store.filter(filters, true);
        } else {
            var store = view.store = Ext.create('Ext.data.Store',{
                model: this.getP_posicionesSPModelModel(),
                remoteFilter: true,
                filters: filters,
                pageSize: pageSize
            });
            
            gridpuntos.bindStore(store);
        }
        map.clearMarkers();
        
        store.load({callback: function(records){
            if (records.length > 0){
               var temp = controller.getHistoryMarkers(store, vehicle, map);
                var points = temp.points;
                var markers = temp.markers;
                
                //var fechaDesde = Ext.Date.format(points[0].fecha, 'Y-m-d H:i:s');
                //var fechaHasta = Ext.Date.format(points[points.length -1].fecha, 'Y-m-d H:i:s');
                
                
                //var center = bounds.getCenter();
                
                //map.addPolyline(points);
                map.addMarkers(markers);
                
                 
            }
            
            var center = view.down('button[action=center]').pressed;
                    
            if (center){
                if (markers){
                    var bounds = controller.getBounds(markers);
                    map.getMap().fitBounds(bounds);
                    if (map.getMap().getZoom()>14){
                        map.getMap().setZoom(14)
                    }
                } else {
                    
                    var allowedBounds = new google.maps.LatLngBounds(
                        new google.maps.LatLng(85, -180),           // top left corner of map
                        new google.maps.LatLng(-85, 180)            // bottom right corner
                      );
                    //map.getMap().fitBounds(allowedBounds);
                    
                    
                    var swt =allowedBounds.getSouthWest().lng();
                    var nor = allowedBounds.getNorthEast().lat();
                    var k = 5.0; 
                    var n = allowedBounds.getNorthEast().lat() - k; 
                    var e = allowedBounds.getNorthEast().lng() - k; 
                    var s = allowedBounds.getSouthWest().lat() + k; 
                    var w = allowedBounds.getSouthWest().lng() + k; 
                    var neNew = new google.maps.LatLng( n, e ); 
                    var swNew = new google.maps.LatLng( s, w ); 
                    boundsNew = new google.maps.LatLngBounds( swNew, neNew ); 
                    map.getMap().fitBounds(boundsNew);
                    
                    map.getMap().setZoom(2)
                }
                
            }
        }});
    },
    
    getHistoryMarkers: function(store, vehicle, map){
        var points = new Array();
        var markers = new Array();
        var controller = this;
        var secuencia = 0;
        var view = map.up('tecguardseguimientomapview');
        var filterprecision = view.down('button[action=filterprecision]').pressed;
        store.each(function(record, index, total){
            // solo muestro los puntos con presicion menor a 500mts
            if (record.get('sp_rAccuracy')<view.rangoPrecision || !filterprecision){
                points.push({lat: record.get('sp_rLatitud'), lng: record.get('sp_rLongitud'),fecha: record.get('sp_tfechahora')});
                markers.push({
                        marker: null,
                        lat : record.get('sp_rLatitud'),
                        lng : record.get('sp_rLongitud'),
                        record: record,
                        title : Ext.Date.format(record.get('sp_tfechahora'),'Y-m-d H:i:s'),
                        icon: controller.getHistoryMarkerIcon(index, total,null, record, map),
                        infoWindow: {
                            content: controller.getHistoryInfoWindowHtml(vehicle,record),
                            listener:'click'
                        },
                        draggable : false
                    }
                );
                
                // agrego los circulos de la accuracy
                if (record.get('sp_rAccuracy')>50)
                    controller.mostrarPrecision(record, map, controller);
            }
            
            
            
            if (map.restaurado) {return false;}
        });
        /*
        if (markers[markers.length-1]){
            markers[markers.length-1].icon = new google.maps.MarkerImage(
                '/resources/softguard/images/finish.png',
                new google.maps.Size(48,48),
                new google.maps.Point(0,0),
                new google.maps.Point(16,35)
            );
        }
        */
        
        return {points:points, markers:markers}
    },
    
    getHistoryMarkerIcon: function(i,total,old,record, map){
        var selected = '';
        var iconUrl = '';
        console.log(record.get('rec_calarma'), record.get('sp_tfechahora'));
        if (record){
            //console.log(record.get('sp_iRumbo'), rotation, path);
            if (record.get('rec_calarma')){
                iconUrl = '/resources/softguard/images/spEventIcons/'+record.get('rec_calarma')+'.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(48,48),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,35)
                );
            } else if (record.get('sp_iRumbo')){
                var image = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 4,
                    rotation: record.get('sp_iRumbo'),
                    fillColor : 'red',
                    fillOpacity : 0.5,
                    strokeWeight: 1,
                    strokeColor: 'red'
                }
                
            } else {
                iconUrl = old?'/resources/softguard/images/icon_dot_verde.gif':'/resources/softguard/images/icon_dot-nonew.gif';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(10,10),
                    new google.maps.Point(0,0),
                    new google.maps.Point(5,5)
                );
            }
            
        } else {
            iconUrl = old?'/resources/softguard/images/icon_dot_verde.gif':'/resources/softguard/images/icon_dot-nonew.gif';
            var image = new google.maps.MarkerImage(
                iconUrl,
                new google.maps.Size(10,10),
                new google.maps.Point(0,0),
                new google.maps.Point(5,5)
            );
        }
        return image;
    },
    
    mostrarPrecision: function(record,gmappanel6, controller){
        var me = controller;
        var color = 'Blue';
        var map = gmappanel6.getMap();

        var newShape = new google.maps.Circle({
            strokeColor: color,
            fillOpacity: 0.1,
            strokeWeight: 1,
            fillColor: color
        });
        
        record.geocerca = newShape;
        
        var center = new google.maps.LatLng(
            record.get('sp_rLatitud'),
            record.get('sp_rLongitud')
        );
        newShape.setCenter(center);
        newShape.setRadius(record.get('sp_rAccuracy'));
        newShape.setMap(map);
        
        gmappanel6.cache.circle.push(newShape);
    },
    
    getHistoryInfoWindowHtml: function(vehicle, gps){
        var html = '\
            <div style="width:250px;height:80px;">\
            <span style="font-weight:bold;">{lblevento}:</span><span>  {evento}</span><br/>\
            <span style="font-weight:bold;">{lblfecha}:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">{lblprecision}:</span><span>  {precision} mts.</span><br/>\
            <span style="font-weight:bold;">{lblbatt}:</span><span>  {batt}</span><br/>\
            <!-- span style="font-weight:bold;">{lblrumbo}:</span><span>  {rumbo}</span><br/ -->\
            <!-- span style="font-weight:bold;">{lbldireccion}:</span><span>  {direccion}</span><br/-->\
            </div>';
            
        html = html.replace(/\{lblfecha\}/, getLocale('Fecha'));
        html = html.replace(/\{lbldireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblrumbo\}/, getLocale('Rumbo'));
        html = html.replace(/\{lblbatt\}/, getLocale('Nivel batería'));
        html = html.replace(/\{lblevento\}/, getLocale('Evento'));
        html = html.replace(/\{lblprecision\}/, getLocale('Precisión'));

        html = html.replace(/\{fecha\}/, Ext.Date.format(gps.get('sp_tfechahora'), 'd-m-Y H:i:s'));
        html = html.replace(/\{precision\}/, Ext.util.Format.number(gps.get('sp_rAccuracy'),'0'));
        html = html.replace(/\{batt\}/, gps.get('sp_iBatt')?gps.get('sp_iBatt'):getLocale('Sin valor'));
        html = html.replace(/\{rumbo\}/, gps.get('sp_iRumbo'));
        html = html.replace(/\{evento\}/, gps.get('rec_calarma')?gps.get('cod_cdescripcion'):getLocale('Seguimiento'))
        html = html.replace(/\{direccion\}/, gps.get('_direccion'));
        return html
    }
});