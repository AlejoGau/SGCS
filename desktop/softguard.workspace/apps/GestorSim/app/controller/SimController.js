Ext.define('GestorSim.controller.SimController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['m_simcardModel'],
    views: ['SimView'],
    readonly: false,

    init: function (config) {
        // genero los eventos
        this.control({
            'simview': {
                beforerender: this.initview,
                cuentachanged: this.onCuentaChanged
            },
            'simview #cuenta': {
                click: this.onCuentaClick
            },
        });
    }, // cierro init

    initview: function (view) {
        var objectId = view.objectId;
        var controller = this;
        var nameModule = view.nameModule ? view.nameModule : controller.application._nameModule;

        record = this.getM_simcardModelModel();

        if (objectId == 0) {
            notifyError('Operación no soportada');
        }
        else {
            record.load(objectId, {
                callback: function (record, operation) {

                    if (operation.success) {
                        var me = this;
                        controller.initData(view, record);


                    }
                    else {
                        notifyError('Error al cargar los datos');
                        view.close();
                    }
                },
                scope: this
            });
        }
    },
    initData: function (view, record) {
        view.loadRecord(record);
    },
    onCuentaClick: function (btn) {
        var view = btn.up('simview')
        var filterTipo = '';
        var filterTipoNOT = '';
        var sinVehiculo = '';
        var soloVehiculo = '';



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
                    filterTipo: filterTipo,
                    filterTipoNOT: filterTipoNOT,
                    selectionEvent: 'cuentachanged',
                    soloVehiculo: soloVehiculo,
                    sinVehiculo: sinVehiculo,
                    caller: view
                }
            ]
        });
        win.show();
    },
    onCuentaChanged: function (cuenta, view) {
        // var _view = view.up('simnewview');
        var cuentaId = cuenta.get('Id');
        view.down('#sim_cuenta').setValue(cuenta.get('Id'));
        view.down('#nombrecuenta').setValue(cuenta.get('cue_cnombre'));

    }

});