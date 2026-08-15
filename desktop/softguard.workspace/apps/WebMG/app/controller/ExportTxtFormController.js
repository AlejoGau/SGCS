Ext.define('WebMG.controller.ExportTxtFormController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [
        't_categorias_impositivas_fcSearchModel',
        't_comprobantes_fcSearchModel',
        't_organizacion_fcSearchModel'
    ],
    views: ['ExportTxtFormView'],

    init: function(config) {
        this.control({
            'exporttxtformview': {
                afterrender: this.initview
            },
            'exporttxtformview button[action="export"]': {
                click: this.onExportClick
            },
            'exporttxtformview #organizacionfacturadora': {
                change: this.onOrganizacionFacturadoraChange
            },
            'exporttxtformview #periodo': {
                change: this.onFormFieldChange
            },
            'exporttxtformview #tipocomprobante': {
                change: this.onFormFieldChange
            },
            'exporttxtformview #categoriaiva': {
                change: this.onFormFieldChange
            }
        });
    },

    initview: function(view) {
        var controller = this;
        var today = new Date();
        var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        var userOrgId = controller.getUserOrganizationId();

        var organizacionStore = Ext.create('Ext.data.Store', {
            model: controller.getT_organizacion_fcSearchModelModel(),
            pageSize: 100,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false,
            filters: userOrgId ? [{
                property: 'org_organizacionId',
                value: userOrgId,
                id: 'org_organizacionId'
            }] : [],
            sorters: [{
                property: 'org_cnombre',
                direction: 'ASC'
            }]
        });

        var tipoComprobanteStore = Ext.create('Ext.data.Store', {
            model: controller.getT_comprobantes_fcSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        });

        var categoriaStore = Ext.create('Ext.data.Store', {
            model: controller.getT_categorias_impositivas_fcSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            autoLoad: false
        });

        view.down('#organizacionfacturadora').bindStore(organizacionStore);
        view.down('#tipocomprobante').bindStore(tipoComprobanteStore);
        view.down('#categoriaiva').bindStore(categoriaStore);
        view.down('#periodo').setValue(firstDayOfMonth);

        if (!userOrgId) {
            view.down('#organizacionfacturadora').setDisabled(true);
            view.down('#tipocomprobante').setDisabled(true);
            view.down('#categoriaiva').setDisabled(true);
            controller.updateExportButtonState(view);
            Ext.MessageBox.alert('Permisos', 'No se pudo determinar la organización del usuario logueado.');
            return;
        }

        organizacionStore.load({
            callback: function(records) {
                if (records.length <= 0) {
                    Ext.MessageBox.alert('Permisos', 'No tiene organizaciones facturadoras habilitadas para exportar TXT.', Ext.emptyFn);
                    return false;
                }

                view.down('#organizacionfacturadora').select(records[0]);

                controller.updateExportButtonState(view);
            }
        });
    },

    getUserOrganizationId: function() {
        var orgId = 0;

        if (typeof _UserData !== 'undefined' && _UserData && _UserData.Company) {
            orgId = parseInt(_UserData.Company, 10);
        }

        if ((!orgId || isNaN(orgId)) &&
            typeof desktopData !== 'undefined' &&
            desktopData &&
            desktopData.infoUser &&
            desktopData.infoUser.OrganizationId) {
            orgId = parseInt(desktopData.infoUser.OrganizationId, 10);
        }

        if (isNaN(orgId) || orgId <= 0) {
            return 0;
        }

        return orgId;
    },

    isOrganizationAllowed: function(view, orgId, silent) {
        var combo = view.down('#organizacionfacturadora');
        var store = combo ? combo.getStore() : null;
        var parsedOrgId = parseInt(orgId, 10);
        var record = null;

        if (!store || !parsedOrgId || isNaN(parsedOrgId)) {
            if (!silent) {
                Ext.MessageBox.alert('Permisos', 'La organización facturadora seleccionada no corresponde al usuario logueado.');
            }
            return false;
        }

        record = store.findRecord(combo.valueField || 'Id', parsedOrgId, 0, false, true, true);
        if (!record) {
            record = store.findRecord(combo.valueField || 'Id', String(parsedOrgId), 0, false, true, true);
        }

        if (!record && !silent) {
            Ext.MessageBox.alert('Permisos', 'La organización facturadora seleccionada no corresponde al usuario logueado.');
        }

        return !!record;
    },

    onOrganizacionFacturadoraChange: function(combo, newValue) {
        var view = combo.up('exporttxtformview');
        var tipoCombo = view.down('#tipocomprobante');
        var categoriaCombo = view.down('#categoriaiva');
        var tipoStore = tipoCombo.getStore();
        var categoriaStore = categoriaCombo.getStore();

        if (newValue && !this.isOrganizationAllowed(view, newValue, true)) {
            combo.clearValue();
            newValue = null;
        }

        tipoCombo.clearValue();
        categoriaCombo.clearValue();

        if (newValue) {
            tipoCombo.setDisabled(false);
            categoriaCombo.setDisabled(false);

            tipoStore.clearFilter(true);
            tipoStore.filter([
                {
                    property: 'cbt_idOrganizacionFacturadora',
                    value: newValue,
                    id: 'cbt_idOrganizacionFacturadora'
                }
            ]);

            categoriaStore.clearFilter(true);
            categoriaStore.filter([
                {
                    property: 'cat_orgicodigoid',
                    value: newValue,
                    id: 'cat_orgicodigoid'
                }
            ]);
        } else {
            tipoCombo.setDisabled(true);
            categoriaCombo.setDisabled(true);
            tipoStore.removeAll();
            categoriaStore.removeAll();
        }

        this.updateExportButtonState(view);
    },

    onFormFieldChange: function(field) {
        var view = field.up('exporttxtformview');
        this.updateExportButtonState(view);
    },

    updateExportButtonState: function(view) {
        var exportButton = view.down('#export');
        var orgId = view.down('#organizacionfacturadora').getValue();
        var periodo = view.down('#periodo').getValue();

        exportButton.setDisabled(!(orgId && periodo));
    },

    onExportClick: function(button) {
        var view = button.up('exporttxtformview');
        var orgId = view.down('#organizacionfacturadora').getValue();
        var periodo = view.down('#periodo').getValue();
        var tipoCbte = view.down('#tipocomprobante').getValue();
        var catIva = view.down('#categoriaiva').getValue();
        var params = [];
        var token = '';

        if (!orgId || !periodo) {
            Ext.MessageBox.alert('Faltan datos', 'Debe seleccionar una organización facturadora y un período.');
            return;
        }

        if (!this.isOrganizationAllowed(view, orgId, false)) {
            return;
        }

        try {
            token = typeof getToken2 === 'function' ? getToken2() : '';
        } catch (e) {
            token = '';
        }

        params.push('orgId=' + encodeURIComponent(orgId));
        params.push('periodo=' + encodeURIComponent(Ext.Date.format(periodo, 'Ym')));

        if (tipoCbte) {
            params.push('tipoCbte=' + encodeURIComponent(tipoCbte));
        }

        if (catIva) {
            params.push('catIva=' + encodeURIComponent(catIva));
        }

        if (token) {
            params.push('oauth_token=' + encodeURIComponent(token));
            params.push('token=' + encodeURIComponent(token));
        }

        window.open('/handler/ExportTxtMG?' + params.join('&'));
    }
});
