//MIGRADO2024
Ext.define( 'Common.controller.GeocercaGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'GeocercaNoCuentaSearchModel', 'GeocercaModel', 'GeocercaSearchModel', 'GeocercaCuentaModel', 'GeocercaMapModel', 'DesktopModuleDetailByUserModel', 'TGFlotasByUserModel' ],
views: [ 'GeocercaGridView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'geocercagridview': {
            afterrender: this.initView,
            itemdblclick: this.onItemDblClick,
            expand: this.loadData,
            recordchanged: this.loadData,
            selectionchange: this.onSelectionChange,
            objectchanged: this.objectChanged
        },
        'geocercagridview button[action=delete]': {
            click: this.onDeleteClick
        },
        'geocercagridview button[action=add]': {
            click: this.onAddClick
        },
        'geocercagridview button[action=save]': {
            click: this.onSaveClick
        },
        'flotagpsview': {
            vehicleSelected: this.onVehicleSelected
        },
        'geocercagridview button[action=geoAssign]': {
            click: this.onGeoAssignClick
        },
        'geocercagridview button[action=geoDesAssign]': {
            click: this.onGeoDesAssignClick
        },
        'geocercagridview button[action=geoVisualizar]': {
            click: this.onGeoVisualizarClick
        }
    });
}, // cierro init
initView: function(view ) {
    if( view.down( 'datapanel' ) ) {
        if( !view.collapsed ) {
            this.loadData( view );
        }
    } else {
        this.loadData( view );
    }
},
        
onVehicleSelected: function(record, view ) {
    var dataPanel = view.down( '#datapanel' );
    if( dataPanel )
        var grid = dataPanel.down( 'geocercagridview' );
    if( grid ) {
        grid.record = record;
        if( !grid.collapsed ) {
            this.loadData( grid );
        }
    }
},
        
loadData: function (view ) {
    //var viewport= view.up('viewport');
    var record = view.record;
    var profile = view.module.profile ? view.module.profile : view.module.get( 'profile' );
    view.pais = getParametro( 'NOMBREPAIS' );
    var filters = [];
    var params = null;
    var geocercaModel = this.getGeocercaSearchModelModel();
    if( view.noCuenta == true ) {
        geocercaModel = this.getGeocercaNoCuentaSearchModelModel();
    }
    filters.push(
        {
            property: 'MetaData:LIKENOT',
            value: 'polyline'
        }
    );
    if( record ) {
        filters.push(
            {
                property: 'Cuenta',
                value: record.get( 'cue_iid' )
            }
        );
        if( profile >= 2 ) {
            //bind combo
            var disponible = Ext.create( 'Ext.data.Store', {
                model: geocercaModel,
                remoteFilter: true,
                filters: [
                    {
                        property: 'Cuenta:NOT',
                        value: record.get( 'cue_iid' )
                    }, {
                        property: 'MetaData:LIKENOT',
                        value: 'polyline'
                    }
                ]
            });
            view.down( '#geocercaDisponible' ).bindStore( disponible );
            disponible.load();
        }
        if( view.down( '#btnDelete' ) ) {
            view.down( '#btnDelete' ).hide();
        }
    } else {
        view.down( '#geocercaDisponible' ).hide();
        view.down( 'button[action=geoAssign]' ).hide();
        view.down( 'button[action=geoDesAssign]' ).hide();
    }
    //bind grid
    // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
    var store = Ext.create( 'Ext.data.Store', {
        model: geocercaModel,
        params: params,
        remoteFilter: true,
        filters: filters
    });
    view.down( 'pagingtoolbar' ).bindStore( store );
    store.load( { view: view, store: store, callback: this.doBindStore });
},
        
objectChanged: function (view, record ) {
    view.down( 'pagingtoolbar' ).doRefresh();
},
        
doBindStore: function(records, operation, success ) {
    if( success ) {
        operation.view.bindStore( operation.store );
    }
},
        
clearSelection: function(gmappanel6 ) {
    if( gmappanel6.selectedShape ) {
        gmappanel6.selectedShape.setEditable( false );
        gmappanel6.selectedShape = null;
    }
},
setSelection: function(shape, gmappanel6 ) {
    this.clearSelection( gmappanel6 );
    gmappanel6.selectedShape = shape;
    shape.setEditable( true );
    this.selectColor( shape.get( 'fillColor' ) || shape.get( 'strokeColor' ), gmappanel6 );
},
deleteSelectedShape: function(gmappanel6 ) {
    if( gmappanel6.selectedShape ) {
        gmappanel6.selectedShape.setMap( null );
    }
},
        
setSelectedShapeColor: function(color, gmappanel6 ) {
    if( gmappanel6.selectedShape ) {
        if( gmappanel6.selectedShape.type == google.maps.drawing.OverlayType.POLYLINE ) {
            gmappanel6.selectedShape.set( 'strokeColor', color );
        } else {
            gmappanel6.selectedShape.set( 'fillColor', color );
        }
    }
},
makeColorButton: function(color, gmappanel6 ) {
    var button = document.createElement( 'span' );
    button.className = 'color-button';
    button.style.backgroundColor = color;
    google.maps.event.addDomListener( button, 'click', function() {
        selectColor( color, gmappanel6 );
        setSelectedShapeColor( color, gmappanel6 );
    });
    return button;
},
        
selectColor: function(color, gmappanel6 ) {
    gmappanel6.selectedColor = color;
    var colors = gmappanel6.colors;
    var drawingManager = gmappanel6.drawingManager;
    for( var i = 0;i < colors.length;++i ) {
        var currColor = colors[ i ];
        //colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
    }
    // Retrieves the current options from the drawing manager and replaces the
    // stroke or fill color as appropriate.
    var polylineOptions = drawingManager.get( 'polylineOptions' );
    polylineOptions.strokeColor = color;
    drawingManager.set( 'polylineOptions', polylineOptions );
    var rectangleOptions = drawingManager.get( 'rectangleOptions' );
    rectangleOptions.fillColor = color;
    drawingManager.set( 'rectangleOptions', rectangleOptions );
    var circleOptions = drawingManager.get( 'circleOptions' );
    circleOptions.fillColor = color;
    drawingManager.set( 'circleOptions', circleOptions );
    var polygonOptions = drawingManager.get( 'polygonOptions' );
    polygonOptions.fillColor = color;
    drawingManager.set( 'polygonOptions', polygonOptions );
},
setSelectedShapeColor: function(color, gmappanel6 ) {
    var selectedShape = gmappanel6.selectedShape;
    if( selectedShape ) {
        if( selectedShape.type == google.maps.drawing.OverlayType.POLYLINE ) {
            selectedShape.set( 'strokeColor', color );
        } else {
            selectedShape.set( 'fillColor', color );
        }
    }
},
        
buildColorPalette: function(gmappanel6 ) {
    var colorPalette = document.getElementById( 'color-palette' );
    for( var i = 0;i < colors.length;++i ) {
        var currColor = colors[ i ];
        var colorButton = makeColorButton( currColor, gmappanel6 );
        colorPalette.appendChild( colorButton );
        colorButtons[ currColor ] = colorButton;
    }
    this.selectColor( colors[ 0 ], gmappanel6 );
},
        
onItemDblClick: function(view, record, item, index, e, options ) {
    var viewport = Ext.getCmp( 'viewport' );
    var mylat = 0;
    var mylong = 0;
    var me = this;
    var pais = view.pais ? view.pais : view.up( 'geocercagridview' ).pais;
    var model = this.getGeocercaModelModel();
    record.setConfig({
        proxy: model.getProxy()
    });
    var win2 = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Mapa',
        closable: false,
        width: 750,
        height: 450,
        border: false,
        items: [
            {
                xtype: 'geocercaformview',
                record: record,
                caller: view
            }
        ]
    }).show();
    /*
            var mappanel = Ext.widget('gmappanel6', {
                flex: 1,
                setCenter: {
                    geoCodeAddr: pais
                },
                zoomLevel : 4,
                gmapType : 'map',
                mapConfOpts : ['enableScrollWheelZoom',
                        'enableDoubleClickZoom', 'enableDragging'],
                mapControls : ['GSmallMapControl', 'GMapTypeControl',
                        'NonExistantControl'],
                listeners:{
                        mapready: function(gmappanel6,gmap){
                            var map = gmappanel6.getMap();
                            var polyOptions = {
                            strokeWeight: 0,
                            fillOpacity: 0.45,
                            editable: true
                            };
                            // Creates a drawing manager attached to the map that allows the user to draw
                            // markers, lines, and shapes.
                            gmappanel6.drawingManager = new google.maps.drawing.DrawingManager({
                            drawingMode: google.maps.drawing.OverlayType.POLYGON,
                            markerOptions: {
                                draggable: true
                            },
                            polylineOptions: {
                                editable: true
                            },
                            drawingControlOptions: {
                                drawingModes: [//google.maps.drawing.OverlayType.RECTANGLE,
                                    google.maps.drawing.OverlayType.CIRCLE,
                                    google.maps.drawing.OverlayType.POLYGON
                                ]
                            },
                            rectangleOptions: polyOptions,
                            circleOptions: polyOptions,
                            polygonOptions: polyOptions,
                            map: map
                            });
                            
                            // dibujo la geocerca
                            var metadata = Ext.create(me.getGeocercaMapModelModel());
                            metadata.data = Ext.JSON.decode(record.get('MetaData'));
                            
                            if (metadata.get('Type') == 'circle'){
                                var newShape = new google.maps.Circle();
                                
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
                            }
                            
                            if (metadata.get('Type') == 'polygon'){
                                var newShape = new google.maps.Polygon();
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
                            }
                            
                            gmappanel6.colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
                    
                            google.maps.event.addListener(gmappanel6.drawingManager, 'overlaycomplete', function(e) {
                                if (e.type != google.maps.drawing.OverlayType.MARKER) {
                                // Switch back to non-drawing mode after drawing a shape.
                                gmappanel6.drawingManager.setDrawingMode(null);
                    
                                // Add an event listener that selects the newly-drawn shape when the user
                                // mouses down on it.
                                var newShape = e.overlay;
                                newShape.type = e.type;
                                google.maps.event.addListener(newShape, 'click', function() {
                                me.setSelection(newShape,gmappanel6);
                                });
                                me.setSelection(newShape, gmappanel6);
                                
                                if (gmappanel6.geocerca){
                                    gmappanel6.geocerca.setMap(null);
                                }
                                gmappanel6.geocerca = newShape;
                                metadata.set('Type',newShape.type);
                                
                                if (newShape.type == 'circle'){
                                    metadata.set('CenterLat',newShape.getCenter().lat());
                                    metadata.set('CenterLng',newShape.getCenter().lng());
                                    metadata.set('Radius',newShape.radius);
                                }
                                
                                if (newShape.type == 'polygon'){
                                    var path = new Array();
                                    newShape.getPath().forEach(function(element){
                                        path.push({
                                            lat: element.lat(),
                                            lng: element.lng()
                                        })
                                    })
                                    metadata.set('Path',Ext.encode(path));
                                }
                                
                                
                                record.set('MetaData',Ext.encode(metadata.data));
                            }
                            });
                    
                            // Clear the current selection when the drawing mode is changed, or when the
                            // map is clicked.
                            google.maps.event.addListener(gmappanel6.drawingManager, 'drawingmode_changed', function(){
                                if (gmappanel6.selectedShape) {
                                gmappanel6.selectedShape.setEditable(false);
                                gmappanel6.selectedShape = null;
                                }
                            });
                            google.maps.event.addListener(map, 'click', function(){
                                if (gmappanel6.selectedShape) {
                                gmappanel6.selectedShape.setEditable(false);
                                gmappanel6.selectedShape = null;
                                }
                            });
                    
                            //me.buildColorPalette();
                        }
                    }
            });
    
            var win = Ext.create('Ext.Window', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                title : 'Mapa',
                closable: false,
                width : 750,
                height : 450,
                border : false,
                items : [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nombre',
                            value: record.get('Name'),
                            itemId: 'Name',
                            labelWidth: 50,
                            margin: '0,5,0,5',
                            validator: function(value){
                                var find = record.store.findRecord('Name', value, null, null, null, true);
                                if (find && record.get('Id') != find.get('Id')){
                                    return getLocale("Ya existe una GEOCERCA con ese nombre.");
                                } else{
                                    return true;
                                }
                                
                            }
                        },{
                            xtype: 'combo',
                            itemId: 'comboFlota',
                            fieldLabel: 'Flota',
                            name : 'cue_clinea',
                            displayField : 'dwm_dealer',
                            valueField : 'dwm_dealer',
                            value: record.get('Dealer'),
                            allowBlank: true,
                            queryMode: 'local',
                            labelWidth: 30
                        },{
                            xtype: 'combo',
                            itemId: 'comboTipo',
                            fieldLabel: 'Tipo',
                            name : 'GeoType',
                            itemId: 'GeoType',
                            value: record.get('GeoType'),
                            allowBlank: false,
                            queryMode: 'local',
                            labelWidth: 30,
                            store: [
                                ['I',getLocale('Inclusión')],
                                ['E',getLocale('Exclusión')],
                                ['X',getLocale('Inclusión o Exclusión')]]
                        },{
                            xtype: 'button',
                            text: 'Guardar',
                            action: 'geoSave',
                            handler: function(button){
                                var win = button.up('window');
                                var dealer = win.down('#comboFlota');
                                var name = win.down('#Name');
                                var geotype = win.down('#GeoType');
                                record.set('GeoType', geotype.getValue());
                                record.set('Dealer', dealer.getValue());
                                
                                if (name.isValid()){
                                    record.set('Name', name.getValue());
                                    win.close();
                                } else{
                                    notifyError('Ya existe una GEOCERCA con ese nombre.')
                                }
                                
                                
                            }
                        },{
                            xtype: 'button',
                            text: 'Cancelar',
                            action: 'cancel',
                            handler: function(button){
                                var win = button.up('window');
                                win.close();
                            }
                        }
                    ]
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [  
                        {
                            xtype: 'textfield',
                            itemId: 'poiAddress',
                            emptyText: getLocale('Dirección'),
                            flex: 1
                        },{
                            xtype: 'button',
                            iconCls : 'icon-poi',
                            handler: function(button){
                                var form = button.up('window');
                                var address = form.down('#poiAddress').getValue();
                                var infoHtml = '';
                                var geocoder = mappanel.getGeocoder();
                                geocoder.geocode({
                                    address: address
                                }, function(result, status){
                                    if (status == 'OK'){
                                        var location = result[0].geometry.location;
                                        var pos = new google.maps.LatLng(location.lat(),location.lng());
                                        //mappanel.cache.marker[0].setPosition(pos);
                                        mappanel.getMap().setCenter(pos);
                                        mappanel.getMap().setZoom(14);
                                    }
                                });   
                            }
                        }
                        ]
                    },
                    mappanel
                ],
                listeners: {
                    beforerender: function(view){
                        var flotas = Ext.create('Ext.data.Store', {
                            model: me.getTGFlotasByUserModelModel(),
                            autoLoad: false
                        });
                        var combo = view.down('#comboFlota');
                        combo.bindStore(flotas);
                        flotas.load({
                            callback: function(records, operation, success){
                                if (records.length == 0 && view.down('#toolbarFlota')){
                                    view.removeDocked(view.down('#toolbarFlota'),true);
                                } else{
                                    combo.setValue(record.get('Dealer'));
                                }
                            }
                        });
                    }
                }
            });
            win.show();
            */
},
        
onDeleteClick: function(button, object, options ) {
    var view = button.up( 'geocercagridview' );
    var selection = view.getSelectionModel().getSelection()[ 0 ];
    if( selection ) {
        var model = this.getGeocercaModelModel();
        selection.setConfig({
            proxy: model.getProxy()
        });
        selection.destroy( {
            callback: function( record, operation ) {
                if( operation.success ) {
                    notify( 'Se eliminio exitosamente' );
                    // view.store.remove( selection );
                }
                else {
                    notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                }
                view.store.load();
            }
        });
    }
},
        
onAddClick: function(button, object, options ) {
    var view = button.up( 'geocercagridview' );
    var viewport = Ext.getCmp( 'viewport' );
    var gmap = viewport.down( '#googlemap' );
    var record = view.record;
    var owner = null;
    var dataMap = this.getGeocercaMapModelModel();
    var cue_clinea = '';
    if( record ) {
        cue_clinea = record.get( 'cue_clinea' )
    }
    var rec = this.getGeocercaModelModel().create( {
        Name: getLocale( 'Nueva Geocerca' ) + ' (' + ( view.store.count() + 1 ) + ')',
        MetaData: Ext.encode( Ext.create( dataMap ) ),
        Dealer: cue_clinea,
        GeoType: 'I'
    });
    // view.store.insert(0, rec);
    /* rec.save({callback: function(geocerca, operation){
        var geocercaCuenta = Ext.create(geocercaCuentaModel,{
            GeoFenseId: geocerca.get('Id'),
            CuentaId: owner
        })
        geocercaCuenta.save();
    }})
    this.onItemDblClick(view, rec);*/
    var win2 = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Mapa',
        closable: false,
        width: 750,
        height: 450,
        border: false,
        items: [
            {
                xtype: 'geocercaformview',
                record: rec,
                vehicle: view.record,
                caller: view
            }
        ]
    }).show();
},
        
onSaveClick: function (button, event, options ) {
    var view = button.up( 'geocercagridview' );
    var vehicle = view.record;
    var myStore = view.store;
    //guardo los nuevos
    var newRec = myStore.getNewRecords();
    Ext.Array.each( newRec, function( rec ) {
        rec.save( {
            callback: function() {
                notify( 'Los datos se guardaron con éxito' );
                // si tiene un vehiculo asigna la cuenta
                if( vehicle ) {
                    var geocercaCuentaModel = this.getGeocercaCuentaModelModel();
                    var geocercaCuenta = Ext.create( geocercaCuentaModel, {
                        GeoFenseId: geocerca.get( 'Id' ),
                        CuentaId: vehicle.get( 'OwnerId' )
                    })
                    geocercaCuenta.save();
                }
            }
        });
    }, this );
    //guardo los modificados
    var modRec = myStore.getUpdatedRecords();
    Ext.Array.each( modRec, function( rec ) {
        rec.save( {
            callback: function() {
                notify( 'Los datos se guardaron con éxito' );
            }
        });
    }, this );
    //borro los eliminados
    var delRec = myStore.getRemovedRecords();
    Ext.Array.each( delRec, function( rec ) {
        var record = this.getGeocercaModelModel().create( {
            Id: rec.get( 'Id' )
        });
        record.destroy( {
            callback: function() {
                notify( getLocale( 'La geocerca se eliminó con éxito' ) );
            }
        });
    }, this );
},
        
onSelectionChange: function(selModel, records ) {
    var grid = selModel.view;
    var view = grid.up( 'geocercagridview' );
    var btnDelete = view.down( '#deleteGeo' );
    if( btnDelete ) {
        btnDelete.enable();
    }
},
        
onGeoDesAssignClick: function (button, event, options ) {
    var view = button.up( 'geocercagridview' );
    var controller = this;
    var record = view.record;
    var combo = view.down( '#geocercaDisponible' );
    var geocercaCuentaModel = this.getGeocercaCuentaModelModel();
    var selection = view.getSelectionModel().getSelection()[ 0 ];;
    var geocercaAsignadaStore = Ext.create( 'Ext.data.Store', {
        model: geocercaCuentaModel,
        remoteFilter: true,
        filters: [
            {
                property: 'CuentaId',
                value: selection.get( 'cuentaId' )
            }, {
                property: 'GeoFenseId',
                value: selection.get( 'Id' )
            }
        ]
    });
    geocercaAsignadaStore.load( {
        callback: function( records ) {
            if( records.length > 0 ) {
                records[ 0 ].destroy( {
                    callback: function( record, operation ) {
                        if( operation.success ) {
                            notify( 'Se desasigno exitosamente' );
                        }
                        view.getStore().load();
                    }
                });
            }
        }
    });
},
        
onGeoAssignClick: function (button, event, options ) {
    var view = button.up( 'geocercagridview' );
    var record = view.record;
    var combo = view.down( '#geocercaDisponible' );
    var geocercaCuentaModel = this.getGeocercaCuentaModelModel();
    var geocerca = combo.lastSelection[ 0 ];
    var geocercaCuenta = Ext.create( geocercaCuentaModel, {
        GeoFenseId: geocerca.get( 'Id' ),
        CuentaId: record.get( 'OwnerId' )
    });
    geocercaCuenta.save( {
        callback: function() {
            view.down( 'pagingtoolbar' ).moveFirst();
        }
    });
},
onGeoVisualizarClick: function (button, event, options ) {
    var view = button.up( 'geocercagridview' );
    var record = view.record;
    var combo = view.down( '#geocercaDisponible' );
    var geocercaCuentaModel = this.getGeocercaCuentaModelModel();
    var geocerca = combo.lastSelection[ 0 ];
    var win2 = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: geocerca.get('Name'),
        closable: true,
        width: 750,
        height: 450,
        border: false,
        items: [
            {
                xtype: 'geocercaformview',
                record: geocerca,
                caller: view,
                readOnly: "true"
            }
        ]
    }).show();
    
}
});