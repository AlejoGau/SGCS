//MIGRADO2024
Ext.define('Common.controller.RoutesPointsMapController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesPointsSearchModel' ],
    views : [ 'RoutesPointsMapView' ],
        init: function() {
            this.control({
                routespointsmapview: {
                    beforerender: this.initview
                },
                "routespointsmapview gmappanel6": {
                    mapready: this.onMapReady,
                    beforerender: this.prepareMap
                }
            })
        },
        initview: function(n) {
            n.record && (n.eventId = n.record.get("Id"))
        },
        prepareMap: function(n) {
            view = n.up("routespointsmapview");
            view.record && (view.eventId = view.record.get("routeId"))
        },
        onMapReady: function(n) {
            var t = n.up("routespointsmapview"),
                u = t.record,
                f = this,
                i, r;
            n.record = u;
            i = n.getMap();
            UiApplicationMetadata.Kml && (r = new google.maps.KmlLayer({
                url: UiApplicationMetadata.Kml
            }), r.setMap(i));
            t.eventId && f.showRoute(t.eventId, t)
        },
        getMarkerIcon: function() {
            return new google.maps.MarkerImage("/resources/softguard/images/trackguard-0.png", new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(16, 35))
        },
        prepareMap: function() {},
        getBounds: function(n) {
            var t = new google.maps.LatLngBounds;
            return Ext.each(n, function(n) {
                t.extend(n.position)
            }), t
        },
        showRoute: function(n, t) {
            var i = [],
                r = [],
                u = this,
                f = Ext.create("Ext.data.Store", {
                    model: u.getRoutesPointsSearchModelModel(),
                    pageSize: 50,
                    remoteSort: !0,
                    remoteFilter: !0,
                    filters: [{
                        property: "routeId",
                        value: n
                    }],
                    sorters: [{
                        property: "time",
                        direction: "ASC"
                    }]
                });
            return f.load({
                callback: function(n) {
                    Ext.Array.each(n, function(n) {
                        i.push({
                            lat: n.get("chp_rLatitud"),
                            lng: n.get("chp_rLongitud"),
                            fecha: n.get("gps_isofechahora")
                        });
                        r.push({
                            marker: null,
                            lat: n.get("chp_rLatitud"),
                            lng: n.get("chp_rLongitud"),
                            record: n,
                            title: n.get("zon_cdescripcion"),
                            icon: u.getRouteMarkerIcon(),
                            draggable: !1
                        })
                    });
                    t.down("gmappanel6").addMarkers(r);
                    t.down("gmappanel6").addPolyline(i);
                    var f = u.getBounds(t.down("gmappanel6").cache.marker);
                    t.down("gmappanel6").getMap().fitBounds(f)
                }
            }), {
                points: i,
                markers: r
            }
        },
        getRouteMarkerIcon: function() {
            return new google.maps.MarkerImage("/resources/softguard/images/trackguard-0.png", new google.maps.Size(48, 48), new google.maps.Point(0, 0), new google.maps.Point(16, 35))
        }
    })