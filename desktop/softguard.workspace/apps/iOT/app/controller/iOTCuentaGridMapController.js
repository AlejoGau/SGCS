Ext.define('iOT.controller.iOTCuentaGridMapController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['CuentaSearchModel'],
    views: ['iOTCuentaGridGmapView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iotcuentagridgmapview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                //objectedit: this.onObjectEdit,
                refresh: this.onRefresh
            },
            'iotcuentagridgmapview gmappanel6': {
                mapready: this.onGmapReady
            },
            'iotcuentagridgmapview button[action=search]': {
                click: this.onSearchClick
            },
            'iotcuentagridgmapview button[action=add]': {
                click: this.onAdd
            },

            'iotcuentagridgmapview button[action="archivar"]': {
                click: this.onArchivar
            },
            'iotcuentagridgmapview button[action="todos"]': {
                click: this.onTodosClick
            },
            'iotcuentagridgmapview button[action=filterHabilitadas]': {
                click: this.onHabilitadasClick
            },
            'iotcuentagridgmapview button[action=filterNoHabilitadas]': {
                click: this.onNoHabilitadasClick
            },
        });
    },
    onGmapReady: function (view, width, height) {
        //this.addLocation(marker,view);
        var controller = this;
        var grid = view.up('iotcuentagridgmapview').down('#gridcuenta');
        var _view = view.up('iotcuentagridgmapview');
        _view.filters = [
            {
                property: "tip_nTipo",
                value: 12
            }, {
                property: "tip_nCondicion",
                value: 5
            }
        ];
        var cuentasStore = Ext.create('Ext.data.Store', {
            model: controller.getCuentaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: _view.filters
            //sorters: [{"property":"sgn_datecreated","direction":"DESC"}]

        });
        cuentasStore.load({
            callback: function (records) {
                var markers = [];
                records.forEach((record) => {
                    markers.push(controller.newMarker(record));
                });
                view.addMarkers(markers);

            }
        });

        grid.bindStore(cuentasStore);


    },

    onRefresh: function (view, rec) {
        view.loadRecord(rec);
        //view.getStore().load()
    },
    newMarker: function (cuenta) {
        var controller = this;
        const latlng = Common.get('cue_cLatLng').split(',');
        return {
            lat: latlng[0],
            lng: latlng[1],
            //record: marker,
            icon: controller.getMarkerIcon(),
            title: 'PRUEBA',//marker.get('Name'),
            infoWindow: {
                //content: infoHtml, 
                listener: 'mouseover',
                disableAutoPan: true
            },
            draggable: false
        }
    },
    getMarkerIcon: function () {

        var iconUrl = '/resources/softguard/images/start.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48, 48),
            new google.maps.Point(0, 0),
            new google.maps.Point(24, 48)
        );

        return image;
    },
    initView: function (view) {

    },
    onSearchClick: function (button, event, options) {
        var grid = button.up('iotcuentagridgmapview').down('#gridcuenta');
        var view = button.up('iotcuentagridgmapview');
        var gmap = button.up('iotcuentagridgmapview').down('#googlemap');
        var filters = Ext.clone(view.filters);
        var store = grid.store;
        var dealer = grid.down('#dealer');
        if (dealer.getValue()) {

            filters.push({
                property: 'cue_clinea',
                value: dealer.getValue()
            });
        }
        var cuenta = grid.down('#cuenta');
        if (Common.getValue()) {
            filters.push({
                property: 'cue_ncuenta',
                value: dealer.getValue()
            });
        }
        var nombre = grid.down('#nombre');
        if (nombre.getValue()) {
            filters.push({
                property: 'cue_cnombre',
                value: dealer.getValue()
            });
        }
        store.clearFilter(true);
        store.filter(filters);
        var controller = this;
        gmap.clearMarkers();
        store.load({
            callback: function (records) {
                var markers = [];
                records.forEach((record) => {
                    markers.push(controller.newMarker(record));
                });
                gmap.addMarkers(markers);

            }
        });
    },
    onTodosClick: function (button, event, options) {
        var grid = button.up('iotcuentagridgmapview').down('#gridcuenta');
        var view = button.up('iotcuentagridgmapview');
        var gmap = button.up('iotcuentagridgmapview').down('#googlemap');
        grid.down('#dealer').setValue('');
        grid.down('#cuenta').setValue('');
        grid.down('#nombre').setValue('');
        grid.store.clearFilter(true);
        grid.store.filter(view.filters);
        var controller = this;
        gmap.clearMarkers();
        grid.store.load({
            callback: function (records) {
                var markers = [];
                records.forEach((record) => {
                    markers.push(controller.newMarker(record));
                });
                gmap.addMarkers(markers);

            }
        });
        grid.down('#filterNoHabilitadas').toggle(false);
        grid.down('#filterHabilitadas').toggle(false);
    },
    onHabilitadasClick: function (button, event, options) {
        var grid = button.up('iotcuentagridgmapview').down('#gridcuenta');
        var view = button.up('iotcuentagridgmapview');
        var gmap = button.up('iotcuentagridgmapview').down('#googlemap');
        var filters = Ext.clone(view.filters);
        var store = grid.store;

        filters.push({
            property: 'Situacion',
            value: 'Habilitada',
            id: 'estado'
        })

        store.clearFilter(true);
        store.filter(filters);
        var controller = this;
        gmap.clearMarkers();
        store.load({
            callback: function (records) {
                var markers = [];
                records.forEach((record) => {
                    markers.push(controller.newMarker(record));
                });
                gmap.addMarkers(markers);

            }
        });
    },
    onNoHabilitadasClick: function (button, event, options) {
        var grid = button.up('iotcuentagridgmapview').down('#gridcuenta');
        var view = button.up('iotcuentagridgmapview');
        var gmap = button.up('iotcuentagridgmapview').down('#googlemap');
        var filters = Ext.clone(view.filters);
        var store = grid.store;

        filters.push({
            property: 'Situacion',
            value: 'No Habilitada',
            id: 'estado'
        })

        store.clearFilter(true);
        store.filter(filters);
        var controller = this;
        gmap.clearMarkers();
        store.load({
            callback: function (records) {
                var markers = [];
                records.forEach((record) => {
                    markers.push(controller.newMarker(record));
                });
                gmap.addMarkers(markers);

            }
        });
    }

});
