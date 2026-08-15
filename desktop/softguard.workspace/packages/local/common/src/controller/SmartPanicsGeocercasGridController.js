//MIGRADO2024
Ext.define('Common.controller.SmartPanicsGeocercasGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SmartPanicsGeocercaModel', 'SmartPanicsGeocercasSearchModel', 'GeocercaMapModel'],
    views: ['SmartPanicsGeocercasGridView'],
    init: function (config) {
        // genero los eventos
        this.control({
            'smartpanicsgeocercagridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemDblClick,
                expand: this.loadData,
                recordchanged: this.loadData,
                selectionchange: this.onSelectionChange,
                objectchanged: this.objectChanged
            },
            'smartpanicsgeocercagridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'smartpanicsgeocercagridview button[action=add]': {
                click: this.onAddClick
            },
            'smartpanicsgeocercagridview button[action=save]': {
                click: this.onSaveClick
            },
            'flotagpsview': {
                vehicleSelected: this.onVehicleSelected
            },
            'smartpanicsgeocercagridview button[action=geoAssign]': {
                click: this.onGeoAssignClick
            },
            'smartpanicsgeocercagridview button[action=geoDesAssign]': {
                click: this.onGeoDesAssignClick
            }
        });
    }, // cierro init
    initView: function (view) {

        if (view.down('datapanel')) {
            if (!view.collapsed) {
                this.loadData(view);
            }
        } else {
            this.loadData(view);
        }
    },

    onVehicleSelected: function (record, view) {
        var dataPanel = view.down('#datapanel');

        if (dataPanel)
            var grid = dataPanel.down('geocercagridview');

        if (grid) {
            grid.record = record;
            if (!grid.collapsed) {
                this.loadData(grid);
            }
        }
    },

    loadData: function (view) {
        var record = view.record;
        var profile = view.module.profile ? view.module.profile : view.module.get('profile');
        var filters = [];
        view.pais = getParametro('NOMBREPAIS');
        filters.push(
            {
                property: 'MetaData:LIKENOT',
                value: 'polyline'
            }
        );
        if (record.get('Imei') != '') {
            filters.push(
                {
                    property: 'Imei',
                    value: record.get('Imei')
                }
            );

            if (profile >= 2) {
                //bind combo
                var disponible = Ext.create('Ext.data.Store', {
                    model: 'Common.model.SmartPanicsGeocercasSearchModel',
                    remoteFilter: true,
                    filters: [
                        {
                            property: 'Cuenta:NOT',
                            value: record.get('cue_iid')
                        }
                    ]
                });
                view.down('#geocercaDisponible').bindStore(disponible);
                disponible.load();
            }

        } else {
            /*view.down('#geocercaDisponible').hide();
            view.down('button[action=geoAssign]').hide();
            view.down('button[action=geoDesAssign]').hide();*/
            notify('El smartpanics no tiene IMEI')
        }
        //bind grid
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var store = Ext.create('Ext.data.Store', {
            model: 'Common.model.SmartPanicsGeocercasSearchModel',
            remoteFilter: true,
            filters: filters
        });
        view.down('pagingtoolbar').bindStore(store);
        store.load({ view: view, store: store, callback: this.doBindStore });
    },

    objectChanged: function (view, record) {
        view.down('pagingtoolbar').doRefresh();
    },

    doBindStore: function (records, operation, success) {
        if (success) {
            operation.view.bindStore(operation.store);
        }
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
        var polylineOptions = drawingManager.get('polylineOptions');
        polylineOptions.strokeColor = color;
        drawingManager.set('polylineOptions', polylineOptions);
        var rectangleOptions = drawingManager.get('rectangleOptions');
        rectangleOptions.fillColor = color;
        drawingManager.set('rectangleOptions', rectangleOptions);
        var circleOptions = drawingManager.get('circleOptions');
        circleOptions.fillColor = color;
        drawingManager.set('circleOptions', circleOptions);
        var polygonOptions = drawingManager.get('polygonOptions');
        polygonOptions.fillColor = color;
        drawingManager.set('polygonOptions', polygonOptions);
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
    },

    onItemDblClick: function (grid, record, item, index, e, options) {
        var viewport = Ext.getCmp('viewport');
        var mylat = 0;
        var mylong = 0;
        var me = this;
        var view = grid.up('smartpanicsgeocercagridview')
        var pais = view.pais ? view.pais : view.up('geocercagridview').pais;

        var model = this.getSmartPanicsGeocercasSearchModelModel();

        record.setConfig({
            proxy: model.getProxy()
        });
        var win2 = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Mapa',
            closable: true,
            width: 750,
            height: 450,
            border: false,
            items: [
                {
                    xtype: 'smartpanicsgeocercaformview',
                    record: record,
                    caller: view
                }
            ]
        }).show();
    },

    onDeleteClick: function (button, object, options) {
        var view = button.up('smartpanicsgeocercagridview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            // Usamos erase() que dispara DELETE al proxy REST
            selection.erase({
                success: function () {
                    Ext.Msg.alert('Éxito', 'Geocerca eliminada correctamente');
                    view.getStore().remove(selection); // lo sacamos de la grilla
                },
                failure: function (record, operation) {
                    Ext.Msg.alert('Error', 'No se pudo eliminar la geocerca');
                    console.error('DELETE error:', operation);
                }
            });
        }
    },

    onAddClick: function (button, object, options) {
        var view = button.up('smartpanicsgeocercagridview');
        var viewport = Ext.getCmp('viewport');
        var gmap = viewport.down('#googlemap');
        var record = view.record;
        var owner = null;

        var dataMap = this.getGeocercaMapModelModel();

        var cue_clinea = '';
        if (record) {
            cue_clinea = record.get('cue_clinea')
        }

        var rec = this.getSmartPanicsGeocercaModelModel().create({
            Name: getLocale('Nueva Geocerca') + ' (' + (view.store.count() + 1) + ')',
            MetaData: Ext.encode(Ext.create(dataMap)),
            Dealer: cue_clinea,
            Imei: record.get('Imei'),
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


        var win2 = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Mapa',
            closable: false,
            width: 750,
            height: 450,
            border: false,
            items: [
                {
                    xtype: 'smartpanicsgeocercaformview',
                    record: rec,
                    vehicle: view.record,
                    caller: view
                }
            ]
        }).show();


    },

    onSaveClick: function (button, event, options) {
        var view = button.up('smartpanicsgeocercagridview');
        var vehicle = view.record;
        var myStore = view.store;
        //guardo los nuevos
        var newRec = myStore.getNewRecords();
        Ext.Array.each(newRec, function (rec) {
            rec.save({
                callback: function () {
                    notify('Los datos se guardaron con éxito');

                    // si tiene un vehiculo asigna la cuenta
                    if (vehicle) {
                        var geocercaCuentaModel = this.getGeocercaCuentaModelModel();
                        var geocercaCuenta = Ext.create(geocercaCuentaModel, {
                            GeoFenseId: geocerca.get('Id'),
                            CuentaId: vehicle.get('OwnerId')
                        })
                        geocercaCuenta.save();
                    }


                }
            });
        }, this);
        //guardo los modificados
        var modRec = myStore.getUpdatedRecords();
        Ext.Array.each(modRec, function (rec) {
            rec.save({
                callback: function () {
                    notify('Los datos se guardaron con éxito');
                }
            });
        }, this);
        //borro los eliminados
        var delRec = myStore.getRemovedRecords();
        Ext.Array.each(delRec, function (rec) {
            var record = this.getGeocercaModelModel().create({
                Id: rec.get('Id')
            });
            record.destroy({
                callback: function () {
                    notify(getLocale('La geocerca se eliminó con éxito'));
                }
            });
        }, this);
    },

    onSelectionChange: function (selModel, records) {
        var grid = selModel.view;
        var view = grid.up('smartpanicsgeocercagridview');
        if (view.down('#btnDelete')) {
            view.down('#btnDelete').enable();
        }
    },

    onGeoDesAssignClick: function (button, event, options) {
        var view = button.up('smartpanicsgeocercagridview');
        var controller = this;
        var record = view.record;
        var combo = view.down('#geocercaDisponible');
        var geocercaCuentaModel = this.getGeocercaCuentaModelModel();

        var selection = view.getSelectionModel().getSelection()[0];;




        var geocercaAsignadaStore = Ext.create('Ext.data.Store', {
            model: geocercaCuentaModel,
            remoteFilter: true,
            filters: [
                {
                    property: 'CuentaId',
                    value: selection.get('cuentaId')
                }, {
                    property: 'GeoFenseId',
                    value: selection.get('Id')
                }


            ]
        });
        geocercaAsignadaStore.load({
            callback: function (records) {

                if (records.length > 0) {
                    records[0].destroy({
                        callback: function (record, operation) {

                            if (operation.success) {
                                notify('Se desasigno exitosamente');

                            }
                            view.getStore().load();

                        }
                    });
                }

            }
        });





    },

    onGeoAssignClick: function (button, event, options) {
        var view = button.up('smartpanicsgeocercagridview');
        var record = view.record;
        var combo = view.down('#geocercaDisponible');
        var geocercaCuentaModel = this.getGeocercaCuentaModelModel();

        var geocerca = combo.lastSelection[0];

        var geocercaCuenta = Ext.create(geocercaCuentaModel, {
            GeoFenseId: geocerca.get('Id'),
            CuentaId: record.get('OwnerId')
        });

        geocercaCuenta.save({
            callback: function () {
                view.down('pagingtoolbar').moveFirst();
            }
        });
    }
});