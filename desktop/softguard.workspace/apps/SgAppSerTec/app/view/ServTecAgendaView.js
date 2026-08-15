Ext.define('SgAppSerTec.view.ServTecAgendaView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.servtecagendaview',
    title: 'Agenda técnica',
    layout: 'border',
    closable: false,

    items: [
        {
            xtype: 'panel',
            region: 'west',
            width: 240,
            collapsible: true,
            split: true,
            title: 'Técnicos',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 10,
            autoScroll: true,
            items: [
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    margin: '0 0 8 0',
                    defaults: { margin: '0 5 0 0' },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Filtrar',
                            itemId: 'btnFiltro',
                            iconCls: 'icon-find',
                            menu: {
                                xtype: 'menu',
                                plain: true,
                                showSeparator: false,
                                width: 240,
                                items: [
                                    {
                                        xtype: 'form',
                                        bodyPadding: 8,
                                        border: false,
                                        fieldDefaults: { labelAlign: 'left', labelWidth: 80, anchor: '100%' },
                                        items: [
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Tecnico',
                                                itemId: 'comboTecnico',
                                                displayField: 'ins_cnombre',
                                                valueField: 'ins_ccodigo',
                                                queryMode: 'local',
                                                editable: true,
                                                typeAhead: true,
                                                emptyText: 'Seleccione',
                                                margin: '0 0 5 0'
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Cuenta',
                                                itemId: 'filtroCuenta',
                                                margin: '0 0 5 0'
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Dealer',
                                                itemId: 'filtroDealer',
                                                margin: '0 0 5 0'
                                            },
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Nro. Orden',
                                                itemId: 'filtroOrden',
                                                margin: '0 0 10 0'
                                            },
                                            {
                                                xtype: 'container',
                                                layout: { type: 'hbox', pack: 'start' },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        text: 'Buscar',
                                                        iconCls: 'icon-find',
                                                        action: 'aplicarFiltro',
                                                        itemId: 'btnAplicar'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Borrar filtro',
                            iconCls: 'icon-delete',
                            action: 'borrarFiltro'
                        }
                    ]
                },
                {
                    // DK-1552 P2: checkbox para mostrar/ocultar visitas sin tecnico asignado
                    xtype: 'checkbox',
                    itemId: 'chkSinTecnico',
                    boxLabel: 'Mostrar visitas sin tecnico',
                    checked: true,
                    margin: '5 0 5 0'
                },
                {
                    xtype: 'container',
                    itemId: 'leyendaTecnicos',
                    margin: '10 0 10 0'
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'center',
            layout: 'fit',
            itemId: 'agendaCenter',
            autoScroll: true,
            bodyStyle: 'background: #fff;'
        }
    ],

    initComponent: function() {
        this.callParent(arguments);

        var me = this;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    xtype: 'button',
                    iconCls: 'icon-control-rewind',
                    itemId: 'btnPrev',
                    action: 'prevDate'
                },
                {
                    xtype: 'datefield',
                    itemId: 'fechaAgenda',
                    value: new Date(),
                    format: 'd/m/Y',
                    width: 200,
                    editable: false
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-control-fastforward',
                    itemId: 'btnNext',
                    action: 'nextDate'
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Día',
                    itemId: 'btnDia',
                    action: 'viewDia',
                    enableToggle: true,
                    toggleGroup: 'agendaView',
                    pressed: true
                },
                {
                    xtype: 'button',
                    text: 'Semana',
                    itemId: 'btnSemana',
                    action: 'viewSemana',
                    enableToggle: true,
                    toggleGroup: 'agendaView'
                },
                {
                    xtype: 'button',
                    text: 'Mes',
                    itemId: 'btnMes',
                    action: 'viewMes',
                    enableToggle: true,
                    toggleGroup: 'agendaView'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Actualizar',
                    iconCls: 'x-tbar-loading',
                    action: 'refresh'
                }
            ]
        });
        this.addDocked(toolbar);
    }
});
