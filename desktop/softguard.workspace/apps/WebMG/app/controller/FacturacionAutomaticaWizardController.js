Ext.define('WebMG.controller.FacturacionAutomaticaWizardController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartMailTemplateSearchModel', 't_comprobantes_fcSearchModel', 't_categorias_impositivas_fcSearchModel', 't_condiciones_pago_fcSearchModel', 'MG_FacturacionAutomaticaContabilizacionSearchModel', 't_organizacion_fcSearchModel', 'MGCuentaCorrienteSearchModel' ],
    views : [ 'FacturacionAutomaticaWizardView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
			'facturacionautomaticawizardview' : {
				afterrender : this.initview
			},
            'facturacionautomaticawizardview #buscar' : {
				click : this.onBuscarClick
			},
            'facturacionautomaticawizardview #facturar' : {
    			click : this.onFacturarClick
			},
            'facturacionautomaticawizardview #organizacionfacturadora' : {
        		change : this.onOrganicionFacturadoraClick
			},
            'facturacionautomaticawizardview #enviarpormail' : {
                change : this.onEnviarPorMailChange
            },
            'facturacionautomaticawizardview #contratoAnovedad' : {
				click : this.onContratoAnovedadClick
			}
        });
	}, 

    getUserOrganizationId: function () {
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

    isOrganizationAllowed: function (view, orgId, silent) {
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
    
    onEnviarPorMailChange: function (check,value) {
        var view = check.up('facturacionautomaticawizardview')
        
        if(value) {
            view.down('#comboTemplate').show()
        } else {
            view.down('#comboTemplate').hide()
        }
        
    },

    onOrganicionFacturadoraClick: function (combo, value) {
        var view = combo.up('facturacionautomaticawizardview')

        if (value && !this.isOrganizationAllowed(view, value, true)) {
            combo.setValue('');
            return;
        }

        view.down('#cbc_ctipocbte').setValue('')
        view.TipoComprobanteStore.clearFilter(true)
        view.TipoComprobanteStore.filter([{
            property:'cbt_ntipo',
            value:1
        },{
            property:'cbt_idOrganizacionFacturadora',
            value:value
        }])

        var categoriasCombo = view.down('#categoriasimpositivas');
        var categoriasStore = categoriasCombo.getStore();
        if (categoriasStore) {
            categoriasCombo.setValue('');
            categoriasStore.clearFilter(true);
            categoriasStore.filter({
                property: 'cat_orgicodigoid',
                value: value,
                id: 'cat_orgicodigoid'
            });
        }

        var condicionesPagoCombo = view.down('#condicionespago');
        var condicionesPagoStore = condicionesPagoCombo.getStore();
        if (condicionesPagoStore) {
            condicionesPagoCombo.setValue('');
            condicionesPagoStore.clearFilter(true);
            condicionesPagoStore.filter({
                property: 'con_orgidcodigoid',
                value: value,
                id: 'con_orgidcodigoid'
            });
        }
    },
    
    onFacturarClick: function (btn) {
        var view = btn.up('facturacionautomaticawizardview')
        var selectedOrgId = view.down('#organizacionfacturadora').getValue()
        btn.setDisabled(true)

        if (!this.isOrganizationAllowed(view, selectedOrgId, false)) {
            btn.setDisabled(false);
            return;
        }
        
        
        //  0 = no, 1 = si
        var envioPorMail = 0;
        if(view.down('#enviarpormail').getValue()) {
            envioPorMail = 1;
        }
        
        Ext.Ajax.request({
            url: '/rest/search/MG_LoteFacturasByFilters',
            params: {
                filter:Ext.encode(view.filters),
                codigoTipoComprobante: view.down('#cbc_ctipocbte').getValue(),
                envio: envioPorMail,
                tipoEnvio: 'Email',
                template : view.down('#comboTemplate').getValue()
            },
            method:'GET',
            success: function(resp,operation) {
                if(resp.responseText)  {
                    notify('Se facturo')

                    //view.tab.tabBar.closeTab(view.tab);
                }
            }
        })
    },

    onContratoAnovedadClick: function (btn) {
        var view = btn.up('facturacionautomaticawizardview');
        var selectedOrgId = view.down('#organizacionfacturadora').getValue();

        if (!this.isOrganizationAllowed(view, selectedOrgId, false)) {
            return;
        }

        // proceso los contratos activos de la organizacion facturadora

        var params = {idorganizacion:selectedOrgId};
        Ext.Ajax.request({
            url: '/rest/search/MG_ContratosGenerarNovedades',
            method: 'GET',
            params: params,
            success: function(resp,operation) {
                notify('Los contratos se procesaron con éxito');
            }
        });
    },

    buildFilters: function (view) {
        var filters = [];

        if(view.down('#categoriasimpositivas').getValue()) {
            filters.push({
                property:'cli_ccategoriaimpositiva',
                value: view.down('#categoriasimpositivas').getValue()
            });
        }

        if(view.down('#organizacionfacturadora').getValue()) {
            filters.push({
                property:'cli_iorganizacion',
                value: view.down('#organizacionfacturadora').getValue()
            });
        }

        if(view.down('#condicionespago').getValue()) {
            filters.push({
                property:'cli_ccondicionpago',
                value: view.down('#condicionespago').getValue()
            });
        }

        return filters;
    },

    setSummaryValues: function (view, record) {
        var cantidadClientes = record ? record.get('cantidadClientes') : 0;
        var cantidadProvincias = record ? record.get('cantidadProvincias') : 0;
        var cantidadCategoriasImpositivas = record ? record.get('cantidadCategoriasImpositivas') : 0;
        var cantidadDeNovedades = record ? record.get('cantidadDeNovedades') : 0;

        view.down('#cantidadClientes').setValue(cantidadClientes);
        view.down('#cantidadProvincias').setValue(cantidadProvincias);
        view.down('#cantidadCategoriasImpositivas').setValue(cantidadCategoriasImpositivas);
        view.down('#cantidadDeNovedades').setValue(cantidadDeNovedades);

        view.down('#fin_cantidadClientes').setValue(cantidadClientes);
        view.down('#fin_cantidadProvincias').setValue(cantidadProvincias);
        view.down('#fin_cantidadCategoriasImpositivas').setValue(cantidadCategoriasImpositivas);
        view.down('#fin_cantidadDeNovedades').setValue(cantidadDeNovedades);
    },

    applyCantidadPreview: function (view, preview) {
        preview = preview || {};

        var cantidadContratosAutomaticos = parseInt(preview.cantidadContratosAutomaticos, 10) || 0;
        var cantidadTotalCalculada = parseInt(preview.cantidadTotalCalculada, 10) || 0;
        var cantidadContratosSinCuentas = parseInt(preview.cantidadContratosSinCuentas, 10) || 0;

        view.down('#cantidadContratosAutomaticos').setValue(cantidadContratosAutomaticos);
        view.down('#cantidadTotalCalculada').setValue(cantidadTotalCalculada);
        view.down('#cantidadContratosSinCuentas').setValue(cantidadContratosSinCuentas);

        view.down('#fin_cantidadContratosAutomaticos').setValue(cantidadContratosAutomaticos);
        view.down('#fin_cantidadTotalCalculada').setValue(cantidadTotalCalculada);
        view.down('#fin_cantidadContratosSinCuentas').setValue(cantidadContratosSinCuentas);
    },

    loadCantidadPreview: function (view) {
        var controller = this;

        controller.applyCantidadPreview(view, null);

        Ext.Ajax.request({
            url: '/rest/search/MG_CantidadAutomaticaFacturacionPreview',
            method: 'GET',
            params: {
                iOrganizacion: view.down('#organizacionfacturadora').getValue() || 0,
                categoriaImpositiva: view.down('#categoriasimpositivas').getValue() || '',
                condicionPago: view.down('#condicionespago').getValue() || ''
            },
            success: function (resp) {
                var preview = null;

                if (resp.responseText) {
                    try {
                        var data = Ext.decode(resp.responseText);
                        var rows = data.rows || data.data || [];
                        if (rows.length > 0) {
                            preview = rows[0];
                        }
                    } catch (e) {
                        preview = null;
                    }
                }

                controller.applyCantidadPreview(view, preview);
            },
            failure: function () {
                controller.applyCantidadPreview(view, null);
            }
        });
    },
    
    onBuscarClick: function (btn) {
        var controller = this;
        var view = btn.up('facturacionautomaticawizardview')
        var selectedOrgId = view.down('#organizacionfacturadora').getValue();

        if (!controller.isOrganizationAllowed(view, selectedOrgId, false)) {
            Ext.getCmp('move-next').setDisabled(true);
            return;
        }

        view.filters = controller.buildFilters(view)
        
        var filter = Ext.clone(view.filters)
        view.store = Ext.create('Ext.data.Store', {
            model: this.getMG_FacturacionAutomaticaContabilizacionSearchModelModel(),
          
            remoteFilter: true,
            filters:filter
        });

        view.down('#filtro').setValue(Ext.encode(view.filters))
        view.down('#fin_filtro').setValue(Ext.encode(view.filters))
        controller.applyCantidadPreview(view, null)
        view.store.load({callback:function (records) {
            var summary = records && records.length > 0 ? records[0] : null;

            controller.setSummaryValues(view, summary);
            controller.loadCantidadPreview(view);

            if(summary && summary.get('cantidadClientes') > 0) {
                Ext.getCmp('move-next').setDisabled(false);
            } else {
                Ext.getCmp('move-next').setDisabled(true);
            }
        }})
    },
    
	initview : function(view) {
        var controller = this;
        var userOrgId = this.getUserOrganizationId();

        var organizacionFacturadoraStore = Ext.create('Ext.data.Store',{
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: userOrgId ? [{
                property: 'org_organizacionId',
                value:userOrgId,
                id: 'org_organizacionId'
            }] : []
        })
        view.down('#organizacionfacturadora').bindStore(organizacionFacturadoraStore)

        if (!userOrgId) {
            Ext.getCmp('move-next').setDisabled(true);
            view.down('#buscar').setDisabled(true);
            view.down('#facturar').setDisabled(true);
            Ext.MessageBox.alert('Permisos', 'No se pudo determinar la organización del usuario logueado para facturación.');
            return;
        }

        organizacionFacturadoraStore.load({callback:function (records) {
            if (records.length > 0) {
                var orgId = records[0].get('Id');
                view.down('#organizacionfacturadora').setValue(records[0]);

                var categoriasImpositivasStore = Ext.create('Ext.data.Store',{
                    model: controller.getT_categorias_impositivas_fcSearchModelModel(),
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'cat_orgicodigoid',
                        value: orgId,
                        id: 'cat_orgicodigoid'
                    }]
                });
                view.down('#categoriasimpositivas').bindStore(categoriasImpositivasStore);
                categoriasImpositivasStore.load();

                var condicionesPagoStore = Ext.create('Ext.data.Store',{
                    model: controller.getT_condiciones_pago_fcSearchModelModel(),
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'con_orgidcodigoid',
                        value: orgId,
                        id: 'con_orgidcodigoid'
                    }]
                });
                view.down('#condicionespago').bindStore(condicionesPagoStore);
                condicionesPagoStore.load();
            } else {
                Ext.getCmp('move-next').setDisabled(true);
                view.down('#buscar').setDisabled(true);
                view.down('#facturar').setDisabled(true);
                Ext.MessageBox.alert('Permisos', 'No tiene organizaciones facturadoras habilitadas para facturar.');
            }
        }})
        
        view.TipoComprobanteStore = Ext.create('Ext.data.Store',{
            model: this.getT_comprobantes_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            /*filters:[{
                property:'cbt_ntipo',
                value:1
            }],*/
            sorters:[{
                property:'cbt_cdescripcion',
                direction:'ASC'
            }],
            listeners: {
                load: function (store,records) {
                    if (records.length > 0)
                        view.down('#cbc_ctipocbte').setValue(records[0])
                }
            }
        })
        
        
        view.down('#cbc_ctipocbte').bindStore(view.TipoComprobanteStore)

        Ext.getCmp('move-next').setDisabled(false);

        
        var templateStore = Ext.create('Ext.data.Store',{
            model: this.getSmartMailTemplateSearchModelModel()
        });
        var combo = view.down('#comboTemplate');
        combo.bindStore(templateStore);
        templateStore.load();
	}
});