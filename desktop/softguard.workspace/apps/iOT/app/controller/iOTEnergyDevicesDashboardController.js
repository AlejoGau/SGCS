Ext.define('iOT.controller.iOTEnergyDevicesDashboardController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['iOTEnergyDevicesDashboardView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iotenergydevicesdashboardview': {
                afterrender: this.initView,
                refresh: this.onRefresh
            },

        });
    },

    onRefresh: function (view, rec) {
        view.loadRecord(rec);
        //view.getStore().load()
    },
    initView: function (view) {
        const record = view.rec;
        const target = view.down('#Iframe')

        view.baseUrl = '/handler/EnergyDevicesDashboardHandler';
        view.baseUrl = Ext.String.urlAppend(view.baseUrl, 'Id=' + record.get('Id'));
        view.baseUrl = Ext.String.urlAppend(view.baseUrl, 'debug=1');

        target.src = view.baseUrl
        target.load({ src: view.baseUrl });
    },
    loadTarget: function (target) {

    }
});
