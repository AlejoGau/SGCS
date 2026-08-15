/**
 * NOTA:
 * Esta view hay que tener en cuenta que cada vista hija se encarga de manejar la inyeccion de markers.
 * Se debe pasar a cada vista hija se le pasa la instancia de gmappanel para que puedan interacturar con el mapa.
 */
Ext.define('SmartTrack.controller.VCSeguimientoMapController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_posicionesSPModel' ],
    views : [ 'VCSeguimientoMapView', 'DateTimeField' ],

    init : function(config) {
        // genero los eventos
		this.control({
            'vcseguimientomapview' : {
                beforerender : this.initview
			},
            'vcseguimientoposicionesgridview' : {
                itemclick: this.onPuntosItemClick
    		},
            
            'vcseguimientomapview gmappanel' : {
    			mapready : this.onMapReady,
                beforerender : this.prepareMap
			}
		});
	}, // cierro init
    
    initview: function(view){
        view.down('vcseguimientoposicionesgridview').centerBtn = view.down('#center')
        view.down('vcseguimientorutagridview').centerBtn = view.down('#center')
    },
    
    prepareMap: function(gmappanel){
        view = gmappanel.up('vcseguimientomapview');
    },

    onMapReady: function(gmappanel,googlemap){
        var view= gmappanel.up('vcseguimientomapview');
        var record = view.record;
        var controller= this;
        view.cantidad = 1; // por defecto muestro ultimo evento
        gmappanel.record = record;

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
        
    },

    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
                bounds.extend(marker.position);
        });
        return bounds
    },

    onPuntosItemClick: function(gridview,record,item,index,e,options){
        var puntos = gridview.up('#gridpuntos');
        var view;

        if (puntos){
            view = puntos.up('vcseguimientomapview');
        } else{
            view = gridview.panel.caller;
        }
        
        var gmappanel = view.down('gmappanel');
        var map = gmappanel.getMap();
        
        if (record.marker){
            // oculto geocercas
            gmappanel.clearMarkers();
            // prendo la geocerca del registro
            if (record.geocerca){
                record.geocerca.setMap(map);
            }
            record.marker.setMap(map);
        } else {
            console.log('El record no tiene marker');
            console.log(record);
            //notify('Punto fuera de rango de precisión de: '+view.rangoPrecision+' mts');
        }
        
    },
    
    showHistory: function(map, vehicle, event){
        var controller = this;
        var view = map.up('vcseguimientomapview');
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        var pageSize=500;
        var gridpuntos = view.down('#gridpuntos');
        
        
        fechaDesde= Ext.Date.add(fechaDesde, Ext.Date.MINUTE, fechaDesde.getTimezoneOffset()*(-1));
        fechaHasta= Ext.Date.add(fechaHasta, Ext.Date.MINUTE, fechaHasta.getTimezoneOffset()*(-1));

        
        if (view.cantidad>0){
            var filters = [
                {
                    property:'sp_cIMEI',
                    value: view.record.get('Imei')
                }
            ];
            var pageSize = view.cantidad;
        }else{
            var filters= [
                {
                    property:'sp_cIMEI',
                    value: view.record.get('Imei')
                },{ 
                    property: 'sp_tfechahora:GTE',
                    value: fechaDesde,
                    id: 'dateStart'
                },{ 
                    property: 'sp_tfechahora:LTE',
                    value: fechaHasta,
                    id: 'dateEnd'
                }
            ];
        }

        if (view.store){
            var store = view.store;
            store.filters.clear();
            store.currentPage = 1;
            store.pageSize=pageSize;
            store.filter(filters, false);
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
        var view = map.up('vcseguimientomapview');
        store.each(function(record, index, total){
            // solo muestro los puntos con presicion menor a 500mts
            if (record.get('sp_rAccuracy')<view.rangoPrecision){
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
            } else{
                console.log('el punto excede la presicion');
                console.log(view.rangoPrecision);
                console.log(record.get('sp_rAccuracy'));
            }

            if (map.restaurado) {return false;}
        });
        
        if (markers[markers.length-1]){
            markers[markers.length-1].icon = new google.maps.MarkerImage(
                '/resources/softguard/images/finish.png',
                new google.maps.Size(48,48),
                new google.maps.Point(0,0),
                new google.maps.Point(16,35)
            );
        }
        
        
        return {points:points, markers:markers}
    },
    
    getHistoryMarkerIcon: function(i,total,old,record, map){
        var selected = '';
        var iconUrl = '';
        
        if (record && record.get('sp_iRumbo')){
            //console.log(record.get('sp_iRumbo'), rotation, path);
            var image = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 4,
                rotation: record.get('sp_iRumbo'),
                fillColor : 'red',
                fillOpacity : 0.5,
                strokeWeight: 1,
                strokeColor: 'red'
            };
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
    
    mostrarPrecision: function(record,gmappanel, controller){
        var me = controller;
        var color = 'Blue';
        var map = gmappanel.getMap();

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
        
        gmappanel.cache.circle.push(newShape);
    },
    
    getHistoryInfoWindowHtml: function(vehicle, gps){
        var html = '\
            <div style="width:200px;height:80px;">\
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
        html = html.replace(/\{lblprecision\}/, getLocale('Precisión'));

        html = html.replace(/\{fecha\}/, Ext.Date.format(gps.get('sp_tfechahora'), 'd-m-Y H:i:s'));
        html = html.replace(/\{precision\}/, Ext.util.Format.number(gps.get('sp_rAccuracy'),'0'));
        html = html.replace(/\{batt\}/, gps.get('sp_iBatt')?gps.get('sp_iBatt'):getLocale('Sin valor'));
        html = html.replace(/\{rumbo\}/, gps.get('sp_iRumbo'));
        html = html.replace(/\{direccion\}/, gps.get('_direccion'));
        return html
    }
});