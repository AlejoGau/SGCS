Ext.define('ResourceModule.controller.ResourceFormAsignacionController', {
    extend: 'Ext.app.Controller',
    models: [
        //'ResourceTypeSearchModel', 'CuentaSearchModel'
    ],
    views: [
        'ResourceFormAsignacionView'
    ],
    init: function (config) {
        this.control({
            'resourceformasignacionview': {
                afterrender: this.initView,
                refresh: this.onRefresh,
                beforedestroy: this.onBeforeDestroy
            },
            'resourceformasignacionview button[action=cancel]': {
                click: this.onCancelClick
            },
            'resourceformasignacionview button[action=asignar]': {
                click: this.onAsignarClick
            },
            'resourceformasignacionview button[action=devolver]': {
                click: this.onDevolverClick
            }
        });
    },
    initView: function (view) {
        console.log('Formulario de asignación: ResourceFormAsignacionView');
        if (view.recordSearch && view.recordSearch.get('rmo_iestado') == 1) {
            view.down('#asignar').setDisabled(true);
            view.down('#devolver').setDisabled(false);
        } else {
            view.down('#asignar').setDisabled(false);
            view.down('#devolver').setDisabled(true);
        }
        var integrante = view.down('#integrante');
        var recordSearch = view.recordSearch;
        integrante.setValue(recordSearch.get('rmb_cNombre'));
        view.loadRecord(view.recordSearch);
        var image = view.down('#imagen');
        image.setSrc('/gallery/' + view.recordSearch.get('rmo_cImagen') + '?id=' + new Date().getTime());
    },
    onRefresh: function (view) {
        view.up('window').close();
    },
    onBeforeDestroy: function (view) {
        view.caller.fireEvent('refresh', view.caller);
    },
    onCancelClick: function (button) {
        var view = button.up('resourceformasignacionview');
        view.up('window').close();
    },
    onAsignarClick: function (button) {
        var view = button.up('resourceformasignacionview');
        var window = Ext.widget('window', {
            modal: true,
            record: view.record,
            resizable: false,
            title: 'Recurso',
            width: 600,
            height: 500,
            items: [
                {
                    xtype: 'resourceformasignacionasignarview',
                    caller: view,
                    record: view.recordEdit
                }
            ]
        });
        window.show();
    },
    onDevolverClick: function (button) {
        var view = button.up('resourceformasignacionview');
        var window = Ext.widget('window', {
            modal: true,
            record: view.record,
            resizable: false,
            title: 'Devolver',
            width: 600,
            height: 500,
            items: [
                {
                    xtype: 'resourceformasignaciondevolverview',
                    caller: view,
                    record: view.recordEdit,
                    recordSearch: view.recordSearch
                }
            ]
        });
        window.show();
    }
});
