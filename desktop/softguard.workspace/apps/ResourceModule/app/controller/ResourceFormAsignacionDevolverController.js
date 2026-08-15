Ext.define('ResourceModule.controller.ResourceFormAsignacionDevolverController', {
    extend: 'Ext.app.Controller',
    views: [
        'ResourceFormAsignacionDevolverView'
    ],
    models: [
        'ResourceModuleModel',
        'ResourceModuleMemberSearchModel'
    ],
    init: function (config) {
        this.control({
            'resourceformasignaciondevolverview': {
                afterrender: this.initView,
            },
            'resourceformasignaciondevolverview #btnVerInfo': {
                click: this.onBtnVerInfoClick
            },
            'resourceformasignaciondevolverview button[action=cancel]': {
                click: this.onCancelClick
            },
            'resourceformasignaciondevolverview button[action=save]': {
                click: this.onSaveClick
            }
        });
    },
    initView: function (view) {
        view.loadRecord(view.record);
        var integranteDevuelve = view.down('#integranteDevuelve');
        var recordSearch = view.recordSearch;
        //Corregir más tarde con recordsearch integranteDevuelve.setValue(view.record.get('rmo_cNombre'));
        //Corregir más tarde con recordsearch recursoDevolver.setValue(view.record.get('rmo_cNombre'));
        integranteDevuelve.setValue(recordSearch.get('rmb_cNombre'));
        var form = view.getForm();
        form.loadRecord(view.record);
    },
    onBtnVerInfoClick: function (button) {
        var view = button.up('resourceformasignaciondevolverview');
        var filauri = "/gallery/" + view.recordSearch.get('rmo_cDocumento');
        window.open(filauri);
    },
    onCancelClick: function (button) {
        var view = button.up('resourceformasignaciondevolverview');
        view.up('window').close();
    },
    onSaveClick: function (button) {
        var view = button.up('resourceformasignaciondevolverview');
        var form = view.getForm();
        if (!form.isValid()) {
            return;
        }
        var record = form.getRecord();
        form.updateRecord(record);
        record.set('rmo_iestado', 0);
        record.set('rmo_rmbidkey', null);
        record.set('rmo_tfechadevolucion', null);
        record.set('rmo_tfechaentrega', null);
        record.save({
            success: function (record, operation) {
                Ext.Msg.alert('Éxito', 'El recurso ha sido devuelto correctamente.');
                view.caller.fireEvent('refresh', view.caller);
                view.up('window').close();

            }
        });
    }

});