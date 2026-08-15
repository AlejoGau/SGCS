Ext.define('SmartTrack.controller.VCSeguimientoPosicionesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_posicionesSPModel' ],
    views : [ 'VCSeguimientoPosicionesGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
			'vcseguimientoposicionesgridview' : {
				afterrender : this.initView,
			},
            'vcseguimientoposicionesgridview button[action=groupAlarmas]' : {
    			click : this.onGroupAlarmasClick
			},
            'vcseguimientoposicionesgridview button[action=Buscar]': {
                click: this.onBuscarClick
            },
            'vcseguimientoposicionesgridview button[action=tiempo-1]': {
                click: this.onTiempo1Click
            },
            'vcseguimientoposicionesgridview button[action=tiempo-2]': {
                click: this.onTiempo2Click
            },
            'vcseguimientoposicionesgridview button[action=tiempo-3]': {
                click: this.onTiempo3Click
            },
            'vcseguimientoposicionesgridview button[action=tiempo-4]': {
                click: this.onTiempo4Click
            },
            'vcseguimientoposicionesgridview button[action=posicion-1]': {
                click: this.onPosicion1Click
            },
            'vcseguimientoposicionesgridview button[action=posicion-2]': {
                click: this.onPosicion2Click
            }
		});
	},

	initView : function(view) {
        var controller = this;
        view.rangoPrecision = 500;

        if (view.caller){
            view.down('#fechaDesde').setValue(view.caller.down('#fechaDesde').getValue());
            view.down('#fechaHasta').setValue(view.caller.down('#fechaHasta').getValue());
            view.down('#horadesde').setValue(view.caller.down('#horadesde').getValue());
            view.down('#horahasta').setValue(view.caller.down('#horahasta').getValue());

            view.cantidad = view.caller.cantidad;
        }
       
        if (view.record){
            if(!view.gmappanel.mapReady) {
                view.gmappanel.on('mapready', function () {
                    controller.showHistory(view.gmappanel,view.record,view.eventId,view);
                    Ext.TaskManager.start({
                        args: [view.gmappanel,view.record, view.eventId,view],
                        run: controller.showHistory,
                        scope: controller,
                        interval: 90000
                    });
                    
                    if (!view.caller)
                        controller.onPosicion2Click(view.down('button[action=posicion-2]'))
                })
            } else {
                controller.showHistory(view.gmappanel,view.record,view.eventId,view);
                
                Ext.TaskManager.start({
                    args: [view.gmappanel,view.record, view.eventId,view],
                    run: controller.showHistory,
                    scope: controller,
                    interval: 90000
                });
                
                if (!view.caller)
                    controller.onPosicion2Click(view.down('button[action=posicion-2]'))
            }
        }
	},

    showHistory: function(map, vehicle, event,view){
        var controller = this;
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechaHasta = view.down('#fechaHasta').getValue();
        var pageSize=500;

        // Nuevos campos para manipular las Horas y Minutos
        var horaDesde = view.down('#horadesde').getValue();
        var horaHasta = view.down('#horahasta').getValue();

        if (view.cantidad>0){
            var filters = [
                {
                    property:'sp_cIMEI',
                    value: view.record.get('Imei')
                }
            ];
            var pageSize = view.cantidad;
        } else{
            var filters= [
                {
                    property:'sp_cIMEI',
                    value: view.record.get('Imei')
                },{ 
                    property: 'sp_tfechahora:GTEDATESTRING',
                    value: Ext.Date.format(fechaDesde, 'Y-m-d ')+Ext.Date.format(horaDesde, 'H:i:s'),
                    id: 'dateStart'
                },{ 
                    property: 'sp_tfechahora:LTEDATESTRING',
                    value: Ext.Date.format(fechaHasta, 'Y-m-d ')+Ext.Date.format(horaHasta, 'H:i:s'),
                    id: 'dateEnd'
                }
            ];
        }
        
        
        if (view.storePosiciones){
            var store = view.storePosiciones;
            store.filters.clear();
            store.currentPage = 1;
            store.pageSize=pageSize;
            store.addFilter(filters, false);
        } else {
            var store = view.storePosiciones = Ext.create('Ext.data.Store',{
                model: this.getP_posicionesSPModelModel(),
                remoteFilter: true,
                filters: filters,
                pageSize: pageSize
            });
            
            view.bindStore(store);
        }
        map.clearMarkers();
        
        store.load({callback: function(records){
            if (records.length > 0){
                var temp = controller.getHistoryMarkers(store, vehicle, map, view);
                var points = temp.points;
                var markers = temp.markers;
                map.addMarkers(markers); 
            }
            
            //la referencia al boton lo envia el padre
            var center = view.centerBtn.pressed;
                    
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
    
    getHistoryMarkers: function(store, vehicle, map, view){
        var points = new Array();
        var markers = new Array();
        var controller = this;
        var secuencia = 0;
        
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


    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
                bounds.extend(marker.position);
        });
        return bounds
    },
    

    onBuscarClick: function(button){
        var view = button.up('vcseguimientoposicionesgridview');
        var map = view.gmappanel;
        view.cantidad = null;
        this.showHistory(map,null,null,view);
    },
    
    onTiempo1Click: function(button){
        var view = button.up('vcseguimientoposicionesgridview');
        var map = view.gmappanel;
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');

        var horaDesde = view.down('#horadesde');
        var horaHasta = view.down('#horahasta');
        
        view.cantidad = null;


        fechaDesde.setValue(Ext.Date.add(now, Ext.Date.MINUTE,-10));
        horaDesde.setValue(Ext.Date.add(now, Ext.Date.MINUTE,-10));
        fechaHasta.setValue(now);
        horaHasta.setValue(now);

        this.showHistory(map,null,null,view);
    },
    
    onTiempo2Click: function(button){
        var view = button.up('vcseguimientoposicionesgridview');
        var map = view.gmappanel;
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');
        var horaDesde = view.down('#horadesde');
        var horaHasta = view.down('#horahasta');
        
        
        view.cantidad = null;

        fechaDesde.setValue(Ext.Date.add(now, Ext.Date.MINUTE,-60));
        horaDesde.setValue(Ext.Date.add(now, Ext.Date.MINUTE,-60));
        fechaHasta.setValue(now);
        horaHasta.setValue(now);
        this.showHistory(map,null,null,view);
    },
    
    onTiempo3Click: function(button){
        var view = button.up('vcseguimientoposicionesgridview');
        var map = view.gmappanel;
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');
        var horaDesde = view.down('#horadesde');
        var horaHasta = view.down('#horahasta');
        
        view.cantidad = null;

        fechaDesde.setValue(Ext.Date.add(now, Ext.Date.HOUR,-10));
        horaDesde.setValue(Ext.Date.add(now, Ext.Date.HOUR,-10));
        fechaHasta.setValue(now);
        horaHasta.setValue(now);

        this.showHistory(map,null,null,view);
    },
    
    onTiempo4Click: function(button){
        var view = button.up('vcseguimientoposicionesgridview');
        var map = view.gmappanel;
        var now = new Date();
        
        var fechaDesde = view.down('#fechaDesde');
        var fechaHasta = view.down('#fechaHasta');
        var horaDesde = view.down('#horadesde');
        var horaHasta = view.down('#horahasta');

        
        view.cantidad = null;

        fechaDesde.setValue(Ext.Date.add(now, Ext.Date.DAY,-1));
        horaDesde.setValue(Ext.Date.add(now, Ext.Date.DAY,-1));
        fechaHasta.setValue(now);
        horaHasta.setValue(now);
        this.showHistory(map,null,null,view);
    },
    
    onPosicion1Click: function(button){
        var view = button.up('vcseguimientoposicionesgridview');
        var map = view.gmappanel;
        
        view.cantidad = 1;
        this.showHistory(map,null,null,view);
    },
    
    onPosicion2Click: function(button){
        var view = button.up('vcseguimientoposicionesgridview');
        var map = view.gmappanel;
        
        view.cantidad = 30;
        this.showHistory(map,null,null,view);
    },

});