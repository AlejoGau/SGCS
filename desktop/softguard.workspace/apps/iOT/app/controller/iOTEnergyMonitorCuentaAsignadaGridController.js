Ext.define('iOT.controller.iOTEnergyMonitorCuentaAsignadaGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['iOT.model.CuentasMedidorAsignadoModel', 'iOT.model.EnergyDevicesModel'],
    views: ['iOTEnergyMonitorCuentaAsignadaGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iotenergymonitorcuentaasignadagridview': {
                afterrender: this.initView,
                refresh: this.onRefresh
            },
            'iotenergymonitorcuentaasignadagridview button[itemId=search]': {
                click: this.onSearchButtonClick
            },
            'iotenergymonitorcuentaasignadagridview button[itemId=todos]': {
                click: this.onAllButtonClick
            },
            'iotenergymonitorcuentaasignadagridview button[itemId=desvincular]': {
                click: this.onDesvincular
            }
        });
    },
    onDesvincular: function (button, record) {
        const view = button.up('grid')
        const controller = this;
        const selection = view.getSelection();
        const model = controller.getEnergyDevicesModelModel();
        const viewSinAsignar = view.up().down('iotenergymonitorsinasignargridview');
        const buttonSincronizar = viewSinAsignar.down('#sincronizar');

        const loadPromises = selection.map(select => {
            return new Promise(resolve => {
                model.load(select.get('Id'), {
                    callback: function (record, operation) {
                        record.set('ped_idCta', 0);
                        record.save({
                            callback: function () {
                                resolve();
                            }
                        });
                    }
                });
            });
        });

        Promise.all(loadPromises)
            .then(() => {
                notify(`Cuentas desvinculadas: ${loadPromises.length}`)
                controller.onRefresh(view)
                viewSinAsignar.fireEvent('sincronizar', buttonSincronizar)
            })
            .catch(error => {
                console.error('Error durante las operaciones de carga y guardado:', error);
            });
    },

    onRefresh: function (view, rec) {
        var _store = Ext.create("Ext.data.Store", {
            model: this.getCuentasMedidorAsignadoModelModel()
        });
        _store.clearFilter()
        _store.filterBy(function (record) {
            return !!record.get('ped_idCta');
        });
        view.bindStore(_store);

        _store.load();
    },
    initView: function (view) {
        var _store = Ext.create("Ext.data.Store", {
            model: this.getCuentasMedidorAsignadoModelModel()
        });
        _store.clearFilter()
        _store.filterBy(function (record) {
            return !!record.get('ped_idCta');
        });
        view.bindStore(_store);

        _store.load();
    },
    onAllButtonClick: function (button) {
        const view = button.up().up();

        store = Ext.create("Ext.data.Store", {
            model: this.getCuentasMedidorAsignadoModelModel(),
            remoteFilter: false
        });
        store.filterBy(function (record) {
            return !!record.get('ped_idCta');
        });
        view.bindStore(store)

        store.load();
    },
    onSearchButtonClick: function (button) {
        const view = button.up().up();
        const toolbar = button.up();
        const fechadesde = Ext.Date.format(toolbar.down('#datedesde').getValue(), 'Y-m-d H:i:s.u');
        const fechahasta = Ext.Date.format(toolbar.down('#datehasta').getValue(), 'Y-m-d H:i:s.u');
        const controller = this;

        store = Ext.create("Ext.data.Store", {
            model: this.getCuentasMedidorAsignadoModelModel(),
            remoteFilter: true,
        });


        store.load({
            callback: function (records, operation, success) {
                if (success) {
                    const filtered = records.filter(medidor => {
                        const fecha = Ext.Date.format(medidor.get('ped_tCreatedAt'), 'Y-m-d H:i:s.u');
                        return fecha >= fechadesde && fecha <= fechahasta && !!medidor.get('ped_idCta');
                    })

                    const filteredStore = Ext.create('Ext.data.Store', {
                        model: controller.getCuentasMedidorAsignadoModelModel(),
                        data: filtered,
                    });
                    view.bindStore(filteredStore)
                }
            }
        });
        view.bindStore(store)
    }
});
