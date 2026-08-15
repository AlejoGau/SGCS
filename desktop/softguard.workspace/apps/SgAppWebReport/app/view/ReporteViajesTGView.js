Ext.define('SgAppWebReport.view.ReporteViajesTGView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteviajestgview',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
        }
    ],
    activeHelp: true,
    initComponent: function () {

        this.callParent();

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [{
                                    xtype: 'textfield',
                                    name: 'Dealer',
                                    itemId: 'Dealer',
                                    fieldLabel: 'Dealer',
                                    width: 230,
                                    enforceMaxLength: true,
                                    maxLength: 3
                                }, {
                                    xtype: 'textfield',
                                    name: 'Cuenta',
                                    itemId: 'Cuenta',
                                    fieldLabel: 'Cuenta',
                                    width: 230,
                                    enforceMaxLength: true,
                                    maxLength: 4
                                }, {
                                    xtype: 'textfield',
                                    name: 'NumeroViaje',
                                    itemId: 'NumeroViaje',
                                    fieldLabel: 'Número viaje',
                                    width: 230
                                }, {
                                    xtype: 'textfield',
                                    name: 'Marchamo',
                                    itemId: 'Marchamo',
                                    fieldLabel: 'Marchamo',
                                    width: 230
                                }, {
                                    xtype: 'textfield',
                                    name: 'LugarInicio',
                                    itemId: 'LugarInicio',
                                    fieldLabel: 'Lugar inicio',
                                    width: 230
                                }, {
                                    xtype: 'textfield',
                                    name: 'LugarFin',
                                    itemId: 'LugarFin',
                                    fieldLabel: 'Lugar fin',
                                    width: 230
                                }, {
                                    xtype: 'datefield',
                                    name: 'FechaInicioDesde',
                                    itemId: 'FechaInicioDesde',
                                    fieldLabel: 'Inicio desde',
                                    format: 'd/m/Y',
                                    bindToModel: false,
                                    width: 230
                                }, {
                                    xtype: 'datefield',
                                    name: 'FechaInicioHasta',
                                    itemId: 'FechaInicioHasta',
                                    fieldLabel: 'Inicio hasta',
                                    format: 'd/m/Y',
                                    bindToModel: false,
                                    width: 230
                                }, {
                                    xtype: 'datefield',
                                    name: 'FechaFinDesde',
                                    itemId: 'FechaFinDesde',
                                    fieldLabel: 'Fin desde',
                                    format: 'd/m/Y',
                                    bindToModel: false,
                                    width: 230
                                }, {
                                    xtype: 'datefield',
                                    name: 'FechaFinHasta',
                                    itemId: 'FechaFinHasta',
                                    fieldLabel: 'Fin hasta',
                                    format: 'd/m/Y',
                                    bindToModel: false,
                                    width: 230
                                }, {
                                    xtype: 'combo',
                                    name: 'Estado',
                                    itemId: 'Estado',
                                    fieldLabel: 'Estado',
                                    queryMode: 'local',
                                    editable: false,
                                    valueField: 'value',
                                    displayField: 'text',
                                    plugins: ['clearbutton'],
                                    width: 230,
                                    store: {
                                        fields: ['value', 'text'],
                                        data: [
                                            { value: 1, text: 'Iniciado' },
                                            { value: 2, text: 'Finalizado' },
                                            { value: 4, text: 'Viaje Sin finalizar' }
                                        ]
                                    }
                                }]
                            }
                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, {
                    xtype: 'button',
                    text: 'Todos',
                    iconCls: 'icon-find',
                    action: 'removeall'
                }, '->', {
                    xtype: 'button',
                    text: 'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                }, {
                    xtype: 'button',
                    text: 'Exportar',
                    iconCls: 'icon-page-excel',
                    action: 'export'
                }
            ]// cierro items
        });

        this.addDocked(toolbar);
    }
});
