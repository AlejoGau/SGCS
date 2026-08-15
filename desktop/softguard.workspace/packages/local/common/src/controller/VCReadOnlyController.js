//MIGRADO2024
Ext.define('Common.controller.VCReadOnlyController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SmartTrackSearchModel', 'SmartTrackModel', 'UsuarioSearchModel', 'SmartTrackGpsModel'],
    views: ['VCReadOnlyView'], 
    init: function (config) {
        // genero los eventos
        this.control({
            'vcreadonlyview': {
                afterrender: this.initView
            }
        });

    }, // cierro init

    initView: function (view) {

        var record = view.initStore.data.items[0];
        var initModule = view.initModule;
        view.loadRecord(record);
    }
});