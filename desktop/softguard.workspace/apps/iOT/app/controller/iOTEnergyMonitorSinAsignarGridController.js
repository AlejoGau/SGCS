Ext.define('iOT.controller.iOTEnergyMonitorSinAsignarGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['CuentasMedidorAsignadoModel', 'iOT.model.EnergyDevicesModel'],
    views: ['iOTEnergyMonitorSinAsignarGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iotenergymonitorsinasignargridview': {
                afterrender: this.initView,
                cuentaselected: this.onCuentaChanged,
                sincronizar: this.onSincronizarClick
            },
            'iotenergymonitorsinasignargridview button[itemId=sincronizar]': {
                click: this.onSincronizarClick
            },
            'iotenergymonitorsinasignargridview actioncolumn[itemId=asociar]': {
                click: this.onAsignarClick
            }
        });
    },

    initView: function (view) {
        var _store = Ext.create("Ext.data.Store", {
            model: this.getCuentasMedidorAsignadoModelModel()
        });
        _store.clearFilter()
        _store.filterBy(function (record) {
            return !record.get('ped_idCta');
        });
        view.bindStore(_store);

        _store.load();
    },

    onAsignarClick: function (button, rowIndex, colIndex, item, event) {
        const view = button.up().up();
        const controller = this;

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione una Cuenta',
            closeAction: 'destroy',
            itemId: 'cuentaWin',
            width: 750,
            height: 550,
            border: true,
            modal: true,
            view: view,
            items: [
                {
                    xtype: 'cuentahelperview',
                    tip_nCondicion: "0,1,null",
                    caller: view,
                }
            ]
        });
        win.show();
    },
    onCuentaChanged: function (cuenta, view, medidor) {
        const model = this.getEnergyDevicesModelModel();
        const selection = view.getSelectionModel().getSelection();
        const controller = this;

        Ext.Array.each(selection, function (record, key) {
            model.load(record.get('Id'), {
                callback: function (_record, operation, success) {
                    if (success) {
                        _record.set('ped_idCta', cuenta.get('Id'))
                        _record.save({
                            callback: function () {
                                const viewAsignados = view.up().down('iotenergymonitorcuentaasignadagridview');
                                viewAsignados.fireEvent('refresh', viewAsignados);
                                controller.initView(view);
                            }
                        })
                    }
                }
            });
        });
    },
    onSincronizarClick: function (button) {
        const url = '/handler/EnergyDevicesHandler?organization=softguard';
        const controller = this;
        const view = button.up().up();

        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function (response) {
                var data = Ext.decode(response.responseText);
                if (data.cant_sinc === 0) notify("Todos los medidores están sincronizados")
                if (data.cant_sinc > 0) notify("Sincronización exitosa")
                controller.initView(view);
            },
            failure: function (response) {
                console.error('Error en la solicitud AJAX', response);
            }
        });
    }
});
