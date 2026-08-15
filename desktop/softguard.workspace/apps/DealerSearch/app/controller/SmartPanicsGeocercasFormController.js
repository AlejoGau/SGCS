Ext.define('DealerSearch.controller.SmartPanicsGeocercasFormController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SmartPanicsGeocercaModel', 'GeocercaMapModel', 'p_posicionesSPModel'],
    views: ['SmartPanicsGeocercasFormView'],

    init: function (config) {
        // genero los eventos

        this.control({
            'smartpanicsgeocercaformview': {
                afterrender: this.initview
            },
            'smartpanicsgeocercaformview button[action=save]': {
                click: this.onSaveClick
            },
            'smartpanicsgeocercaformview gmappanel6': {
                mapready: this.onMapReady
            }
        });
    },

    showHistory: function (map, vehicle) {
        var controller = this;
        var view = map.up('smartpanicsgeocercaformview');
        var pageSize = 500;
        var gridpuntos = view.down('#gridpuntos');

        if (view.cantidad > 0) {
            var filters = [
                {
                    property: 'sp_cIMEI',
                    value: view.record.get('Imei')
                }
            ];
        }
        else {
            var filters = [
                {
                    property: 'sp_cIMEI',
                    value: view.record.get('Imei')
                }
            ];
        }

        if (view.store) {
            var store = view.store;
            store.filters.clear();
            store.currentPage = 1;
            store.pageSize = pageSize;
            store.filter(filters, false);
        } else {
            var store = view.store = Ext.create('Ext.data.Store', {
                model: this.getP_posicionesSPModelModel(),
                remoteFilter: true,
                filters: filters,
                pageSize: pageSize
            });

            // gridpuntos.bindStore(store);
        }
        map.clearMarkers();

        store.load({
            callback: function (records) {
                if (records.length > 0) {
                    var temp = controller.getHistoryMarkers(store, vehicle, map);
                    var points = temp.points;
                    var markers = temp.markers;
                    map.addMarkers(markers);
                }
            }
        });
    },

    getHistoryMarkers: function (store, vehicle, map) {
        var points = new Array();
        var markers = new Array();
        var controller = this;
        var secuencia = 0;
        var view = map.up('smartpanicsgeocercaformview');
        // var filterprecision = view.down('button[action=filterprecision]').pressed;
        store.each(function (record, index, total) {
            // solo muestro los puntos con presicion menor a 500mts
            //if (record.get('sp_rAccuracy')<view.rangoPrecision || !filterprecision){
            points.push({ lat: record.get('sp_rLatitud'), lng: record.get('sp_rLongitud'), fecha: record.get('sp_tfechahora') });
            markers.push({
                marker: null,
                lat: record.get('sp_rLatitud'),
                lng: record.get('sp_rLongitud'),
                record: record,
                title: Ext.Date.format(record.get('sp_tfechahora'), 'Y-m-d H:i:s'),
                icon: controller.getHistoryMarkerIcon(index, total, null, record, map),
                infoWindow: {
                    content: controller.getHistoryInfoWindowHtml(vehicle, record),
                    listener: 'click'
                },
                draggable: false
            }
            );

            if (map.restaurado) { return false; }
        });

        return { points: points, markers: markers }
    },

    getHistoryInfoWindowHtml: function (vehicle, gps) {
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
        html = html.replace(/\{precision\}/, Ext.util.Format.number(gps.get('sp_rAccuracy'), '0'));
        html = html.replace(/\{batt\}/, gps.get('sp_iBatt') ? gps.get('sp_iBatt') : getLocale('Sin valor'));
        html = html.replace(/\{rumbo\}/, gps.get('sp_iRumbo'));
        html = html.replace(/\{evento\}/, gps.get('rec_calarma') ? gps.get('cod_cdescripcion') : getLocale('Seguimiento'))
        html = html.replace(/\{direccion\}/, gps.get('_direccion'));
        return html
    },

    getHistoryMarkerIcon: function (i, total, old, record, map) {
        var selected = '';
        var iconUrl = '';
        //  console.log(record.get('rec_calarma'), record.get('sp_tfechahora'));
        if (record) {
            //console.log(record.get('sp_iRumbo'), rotation, path);
            if (record.get('rec_calarma')) {
                iconUrl = '/resources/softguard/images/spEventIcons/' + record.get('rec_calarma') + '.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(48, 48),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(16, 35)
                );
            } else if (record.get('sp_iRumbo')) {
                var image = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 4,
                    rotation: record.get('sp_iRumbo'),
                    fillColor: 'red',
                    fillOpacity: 0.5,
                    strokeWeight: 1,
                    strokeColor: 'red'
                }

            } else {
                iconUrl = old ? '/resources/softguard/images/icon_dot_verde.gif' : '/resources/softguard/images/icon_dot-nonew.gif';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(10, 10),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(5, 5)
                );
            }

        } else {
            iconUrl = old ? '/resources/softguard/images/icon_dot_verde.gif' : '/resources/softguard/images/icon_dot-nonew.gif';
            var image = new google.maps.MarkerImage(
                iconUrl,
                new google.maps.Size(10, 10),
                new google.maps.Point(0, 0),
                new google.maps.Point(5, 5)
            );
        }
        return image;
    },

    initview: function (view) {
        var record = view.record;

        view.down('#Name').originalValue = record.get('Name');
        view.down('#Name').setValue(record.get('Name'))
        view.down('#GeoType').setValue(record.get('GeoType'))
        view.down('#Status').setValue(record.get('Status'))
    },

    onMapReady: function (gmappanel6, gmap) {
        var me = this;
        var view = gmappanel6.up('smartpanicsgeocercaformview');
        var map = gmappanel6.getMap();
        var record = view.record;
        var polyOptions = {
            strokeWeight: 1,
            fillOpacity: 0.45,
            editable: true
        };


        google.maps.Polyline.prototype.getBounds = function () {
            var bounds = new google.maps.LatLngBounds();
            this.getPath().forEach(function (e) {
                bounds.extend(e);
            });
            return bounds;
        };

        gmappanel6.routemarkers = { data: [] };
        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
        gmappanel6.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.CIRCLE,
            markerOptions: {
                draggable: true
            },
            drawingControlOptions: {
                drawingModes: [
                    // google.maps.drawing.OverlayType.MARKER,
                    //  google.maps.drawing.OverlayType.POLYLINE,
                    google.maps.drawing.OverlayType.CIRCLE,
                    // google.maps.drawing.OverlayType.POLYGON
                ]
            },
            // rectangleOptions: polyOptions,
            // polylineOptions: polyOptions,
            circleOptions: polyOptions,
            // polygonOptions: polyOptions,
            map: map
        });

        // dibujo la geocerca
        var metadata = Ext.create(me.getGeocercaMapModelModel());
        var data = Ext.decode(record.get('MetaData'));
        metadata.data = data.data ? data.data : data;

        if (metadata.get('Type') == 'circle') {
            var newShape = new google.maps.Circle();

            var center = new google.maps.LatLng(
                metadata.get('CenterLat'),
                metadata.get('CenterLng')
            );
            newShape.setCenter(center);
            newShape.setRadius(parseFloat(metadata.get('Radius')));
            newShape.setMap(map);
            gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
            if (bounds) {
                map.fitBounds(bounds);
            }

        }

        if (metadata.get('Type') == 'polygon') {
            var newShape = new google.maps.Polygon();
            var pathArray = Ext.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();

            Ext.Array.each(pathArray, function (item) {
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
        }

        if (metadata.get('Type') == 'polyline') {
            var newShape = new google.maps.Polyline();
            var pathArray = Ext.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();

            Ext.Array.each(pathArray, function (item) {
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
        }

        gmappanel6.colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];

        google.maps.event.addListener(gmappanel6.drawingManager, 'overlaycomplete', function (e) {
            if (e.type != google.maps.drawing.OverlayType.MARKER) {
                // Switch back to non-drawing mode after drawing a shape.
                gmappanel6.drawingManager.setDrawingMode(null);

                // Add an event listener that selects the newly-drawn shape when the user
                // mouses down on it.
                var newShape = e.overlay;
                newShape.type = e.type;
                google.maps.event.addListener(newShape, 'click', function () {
                    me.setSelection(newShape, gmappanel6);
                });
                me.setSelection(newShape, gmappanel6);

                gmappanel6.routemarkers = { data: [] };

                if (gmappanel6.geocerca) {
                    gmappanel6.geocerca.setMap(null);
                }
                gmappanel6.geocerca = newShape;
                metadata.set('Type', newShape.type);

                if (newShape.type == 'circle') {
                    function updateMetadataCircle() {
                        metadata.set('CenterLat', newShape.getCenter().lat());
                        metadata.set('CenterLng', newShape.getCenter().lng());
                        metadata.set('Radius', newShape.getRadius());

                        var setmetadata = { data: metadata.data };
                        record.set('MetaData', Ext.encode(setmetadata));
                    }

                    
                    google.maps.event.addListener(newShape, 'center_changed', updateMetadataCircle);

                    google.maps.event.addListener(newShape, 'radius_changed', updateMetadataCircle);

                    updateMetadataCircle();
                }

                if (newShape.type == 'polygon') {
                    var path = new Array();
                    newShape.getPath().forEach(function (element) {
                        path.push({
                            lat: element.lat(),
                            lng: element.lng()
                        })
                    })
                    metadata.set('Path', Ext.encode(path));
                }

                if (newShape.type == 'polyline') {
                    var path = new Array();
                    newShape.getPath().forEach(function (element) {
                        path.push({
                            lat: element.lat(),
                            lng: element.lng()
                        })
                    })
                    metadata.set('Path', Ext.encode(path));
                }

                var setmetadata = {}
                setmetadata.data = metadata.data;
                record.set('MetaData', Ext.encode(setmetadata));
            }
        });

        google.maps.event.addListener(gmappanel6.drawingManager, 'markercomplete', function (e) {
            if (gmappanel6.geocerca) {
                gmappanel6.geocerca.setMap(null);
            }
            var currentroute = gmappanel6.routemarkers;
            var length = currentroute.data.length;

            if (!currentroute.start) {
                currentroute.start = e;
            } else {
                currentroute.start.setMap(null);
                currentroute.data.push({ location: e.getPosition(), stopover: true });
                me.makeroute(gmappanel6, metadata, record);
                e.setMap(null);
            }

        }
        );

        // Clear the current selection when the drawing mode is changed, or when the
        // map is clicked.
        google.maps.event.addListener(gmappanel6.drawingManager, 'drawingmode_changed', function () {
            if (gmappanel6.selectedShape) {
                gmappanel6.selectedShape.setEditable(false);
                gmappanel6.selectedShape = null;
            }

            if (gmappanel6.routemarkers.directionDisplay) {
                gmappanel6.routemarkers.directionDisplay.setMap(null);
                gmappanel6.routemarkers = { data: [] };
            }

        });

        google.maps.event.addListener(map, 'click', function () {
            if (gmappanel6.selectedShape) {
                gmappanel6.selectedShape.setEditable(false);
                gmappanel6.selectedShape = null;
            }
        });

        //me.showHistory(gmappanel6,record);
    },

    onSaveClick: function (button, event, options) {
        var controller = this;
        var view = button.up('smartpanicsgeocercaformview');
        var myform = view.getForm();
        var record = view.record;
        var vehicle = view.vehicle;
        var status = view.down('#Status');
        var name = view.down('#Name');
        var geotype = view.down('#GeoType');

        record.set('GeoType', geotype.getValue());
        record.set('Status', status.getValue());
        record.set('Name', name.getValue());

        // ✅ Validar nombre duplicado
        var store = view.caller.getStore();
        var newName = name.getValue();

        var duplicate = store.findBy(function (rec) {
            // ignora el mismo registro en edición
            return rec !== record && rec.get('Name') === newName;
        });

        if (duplicate !== -1) {
            Ext.Msg.alert('Atención', 'Ya existe una geocerca con ese nombre.');
            return;
        }

        // 🚨 Validación de MetaData (lo que ya habíamos hecho antes)
        var metaDataRaw = record.get('MetaData');
        var metaData = null;
        try {
            metaData = Ext.decode(metaDataRaw);
        } catch (e) {
            Ext.Msg.alert('Error', 'La metadata no es válida.');
            return;
        }

        var data = metaData.data || {};
        if (Ext.isEmpty(data.Type) || Ext.isEmpty(data.CenterLat) || Ext.isEmpty(data.CenterLng)) {
            Ext.Msg.alert('Atención', 'Debe completar los datos de la geocerca antes de guardar.');
            return;
        }

        // ✅ Guardar si todo está OK
        if (myform.isValid()) {
            myform.updateRecord(record);
            var isnew = record.get('Id');
            view.record.save({
                callback: function () {
                    notify('Se guardó con éxito');
                    view.caller.fireEvent('objectchanged', view.caller, view.record);
                    view.up('window').close();
                }
            });
        }
    },


    makeroute: function (gmappanel6, metadata, record) {
        var currentroute = gmappanel6.routemarkers;
        var waypts = Ext.Array.clone(currentroute.data);
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();

        if (!gmappanel6.routemarkers.directionDisplay) {
            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: false, //false it if you want a marker from the direction service
                polylineOptions: {
                    strokeColor: 'red', //"black",
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                }
            });
            gmappanel6.routemarkers.directionDisplay = directionsDisplay;
        } else {
            directionsDisplay = gmappanel6.routemarkers.directionDisplay;
        }

        var start = currentroute.start.getPosition();
        var end = waypts[waypts.length - 1].location;

        waypts.pop();

        var request = {
            origin: start,
            destination: end,
            waypoints: waypts,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);

                metadata.set('Type', 'polyline');
                var path = new Array();
                var legs = response.routes[0].legs;
                for (i = 0; i < legs.length; i++) {
                    var steps = legs[i].steps;
                    for (j = 0; j < steps.length; j++) {
                        var nextSegment = steps[j].path;
                        for (k = 0; k < nextSegment.length; k++) {
                            path.push({
                                lat: nextSegment[k].lat(),
                                lng: nextSegment[k].lng()
                            })
                        }
                    }
                }

                metadata.set('Path', Ext.encode(path));
                record.set('MetaData', Ext.encode(metadata.data));
            }
        });

        directionsDisplay.setMap(gmappanel6.getMap());

    },

    clearSelection: function (gmappanel6) {
        if (gmappanel6.selectedShape) {
            gmappanel6.selectedShape.setEditable(false);
            gmappanel6.selectedShape = null;
        }
    },

    setSelection: function (shape, gmappanel6) {
        this.clearSelection(gmappanel6);
        gmappanel6.selectedShape = shape;
        shape.setEditable(true);
        this.selectColor(shape.get('fillColor') || shape.get('strokeColor'), gmappanel6);
    },

    deleteSelectedShape: function (gmappanel6) {
        if (gmappanel6.selectedShape) {
            gmappanel6.selectedShape.setMap(null);
        }
    },

    setSelectedShapeColor: function (color, gmappanel6) {
        if (gmappanel6.selectedShape) {
            if (gmappanel6.selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
                gmappanel6.selectedShape.set('strokeColor', color);
            } else {
                gmappanel6.selectedShape.set('fillColor', color);
            }
        }
    },

    makeColorButton: function (color, gmappanel6) {
        var button = document.createElement('span');
        button.className = 'color-button';
        button.style.backgroundColor = color;
        google.maps.event.addDomListener(button, 'click', function () {
            selectColor(color, gmappanel6);
            setSelectedShapeColor(color, gmappanel6);
        });

        return button;
    },

    selectColor: function (color, gmappanel6) {
        gmappanel6.selectedColor = color;
        var colors = gmappanel6.colors;
        var drawingManager = gmappanel6.drawingManager;
        for (var i = 0; i < colors.length; ++i) {
            var currColor = colors[i];
            //colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
        }

        // Retrieves the current options from the drawing manager and replaces the
        // stroke or fill color as appropriate.
        /*
        var polylineOptions = drawingManager.get('polylineOptions');
        polylineOptions.strokeColor = color;
        drawingManager.set('polylineOptions', polylineOptions);

        var rectangleOptions = drawingManager.get('rectangleOptions');
        rectangleOptions.fillColor = color;
        drawingManager.set('rectangleOptions', rectangleOptions);
*/
        var circleOptions = drawingManager.get('circleOptions');
        circleOptions.fillColor = color;
        drawingManager.set('circleOptions', circleOptions);
        /*
                var polygonOptions = drawingManager.get('polygonOptions');
                polygonOptions.fillColor = color;
                drawingManager.set('polygonOptions', polygonOptions);
                */
    },

    setSelectedShapeColor: function (color, gmappanel6) {
        var selectedShape = gmappanel6.selectedShape;
        if (selectedShape) {
            if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
                selectedShape.set('strokeColor', color);
            } else {
                selectedShape.set('fillColor', color);
            }
        }
    },

    buildColorPalette: function (gmappanel6) {
        var colorPalette = document.getElementById('color-palette');
        for (var i = 0; i < colors.length; ++i) {
            var currColor = colors[i];
            var colorButton = makeColorButton(currColor, gmappanel6);
            colorPalette.appendChild(colorButton);
            colorButtons[currColor] = colorButton;
        }
        this.selectColor(colors[0], gmappanel6);
    }
});