Ext.define('SgAppWebReport.view.ReporteHistorialAsignacionView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportehistorialasignacionview',

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
        //('cuentachanged');

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint',
                    /*handler: function (button) {
                        var iframe = button.up('reportehistorialasignacionview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        //-----------------------------------------
                                        xtype: 'combo',
                                        fieldLabel: 'Tabla Histórico',
                                        displayField: '_periodo',
                                        queryMode: 'local',
                                        valueField: 'c_periodo',
                                        anchor: '100%',
                                        itemId: 'combohistorico',
                                        //multiSelect: true,
                                        name: 'tablahistorico',
                                        //plugins: ['clearbutton']
                                    },
                                    {
                                        xtype: 'datefield',
                                        name: 'fechadesde',
                                        itemId: 'fechadesde',
                                        fieldLabel: 'Fecha Desde',
                                        bindToModel: false,
                                        labelWidth: 100,
                                        width: 250
                                    }, {
                                        xtype: 'datefield',
                                        name: 'fechahasta',
                                        itemId: 'fechahasta',
                                        fieldLabel: 'Fecha Hasta',
                                        bindToModel: false,
                                        labelWidth: 100,
                                        width: 250
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Vigilador',
                                        displayField: 'Nombre',
                                        queryMode: 'local',
                                        valueField: 'Id',
                                        itemId: 'vigilador',
                                        labelWidth: 100,
                                        width: 250
                                    }, {
                                        xtype: 'fieldset',
                                        padding: '0 0 0 0',
                                        border: 0,
                                        layout: 'hbox',
                                        margin: '0 0 10 0',
                                        items: [{
                                            xtype: 'displayfield',
                                            value: 'Cuenta',
                                            width: 100
                                        }, {
                                            xtype: 'button',
                                            text: 'Seleccione una cuenta',
                                            iconCls: 'icon-find',
                                            itemId: 'seleccionarcuenta',
                                            margin: '0 10 0 0',
                                            action: 'seleccionarCuenta'
                                        }]
                                    }, {
                                        xtype: 'fieldset',
                                        padding: '0 0 0 0',
                                        border: 0,
                                        layout: 'hbox',
                                        margin: '0 0 10 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: '',
                                                iconCls: 'icon-cancel',
                                                itemId: 'sacarcuenta',
                                                hidden: true,
                                                margin: '0 5 0 0',
                                                listeners: {
                                                    click: function (button) {
                                                        button.up('reportehistorialasignacionview').down('#idcuenta').setValue('')
                                                        button.up('reportehistorialasignacionview').down('#nombrecuenta').setValue('')
                                                        button.hide()
                                                    }
                                                }
                                            }, {
                                                xtype: 'displayfield',
                                                itemId: 'nombrecuenta',
                                                name: 'nombrecuenta'
                                            }, {
                                                xtype: 'displayfield',
                                                hidden: true,
                                                itemId: 'idcuenta',
                                                name: 'idcuenta'
                                            }
                                        ]
                                    }, {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Ordenar por Vigilador',
                                        itemId: 'ordenar',
                                        labelWidth: 200
                                    }
                                ]
                            }

                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, '->', {
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