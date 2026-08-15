
Ext.define('SgAppWebReport.view.ReporteEstadoCuentaView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteestadocuentaview',

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
                    action: 'btnprint'
                    /*handler: function(button){
                        var iframe = button.up('reporteestadocuentaview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 400,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Dealer',
                                                itemId: 'dealer',
                                                width: 150,
                                                enforceMaxLength: true,
                                                maxLength: 3
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'cuentadesde',
                                                fieldLabel: 'Cuenta desde',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                width: 170,
                                                labelWidth: 120,
                                                margin: '0 0 0 7'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'cuentahasta',
                                                fieldLabel: 'Cuenta hasta',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                width: 170,
                                                margin: '0 0 0 7',
                                                labelWidth: 120,
                                                margin: '0 0 0 155'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'cuentaNombre',
                                        fieldLabel: 'Nombre cuenta'
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo',
                                        //store : 'TablaTiposStore',
                                        displayField: 'tip_cdescripcion',
                                        queryMode: 'local',
                                        //plugins: ['clearbutton'],
                                        valueField: 'tip_ccodigo',
                                        name: "cue_ctipo",
                                        itemId: 'tipo',
                                        editable: false
                                    }, {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: 'Estados',
                                        itemId: 'sta_nestado',
                                        layout: 'vbox',
                                        width: '100%',
                                        fieldDefaults: {
                                            labelWidth: 160
                                        },
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Activado',
                                                name: 'estados',
                                                inputValue: 0,
                                                checked: true,
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Desactivado',
                                                name: 'estados',
                                                inputValue: 1,
                                                checked: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: 'Fechas',
                                        layout: 'vbox',
                                        width: '100%',
                                        fieldDefaults: {
                                            labelWidth: 160
                                        },
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Fecha de Alta',
                                                name: 'fechas',
                                                inputValue: 0,
                                                checked: true,
                                                itemId: 'chkFechaAlta',
                                                listeners: {
                                                    change: function (chk, newValue) {
                                                        if (newValue) {
                                                            // CAMBIO AQUÍ: de 'form' a 'panel'
                                                            var panel = chk.up('panel');
                                                            if (panel) {
                                                                panel.down('#chk_fecha_servicio').setValue(false);
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Fecha de Servicio',
                                                itemId: 'chk_fecha_servicio', // <--- AGREGA ESTO
                                                name: 'fechas',
                                                inputValue: 1,
                                                checked: false,
                                                listeners: {
                                                    change: function (chk, newValue) {
                                                        if (newValue) {
                                                            // CAMBIO AQUÍ: de 'form' a 'panel'
                                                            var panel = chk.up('panel');
                                                            if (panel) {
                                                                panel.down('#chkFechaAlta').setValue(false);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }, {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: 'Situacion',
                                        itemId: 'situacion',
                                        layout: 'vbox',
                                        width: '100%',
                                        fieldDefaults: {
                                            labelWidth: 160
                                        },
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Habilitado',
                                                name: 'situacion',
                                                inputValue: '0',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'En Prueba',
                                                name: 'situacion',
                                                inputValue: '1',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'No Habilitado',
                                                name: 'situacion',
                                                inputValue: '2',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'En Prueba por zonas',
                                                name: 'situacion',
                                                inputValue: '3',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Eliminar',
                                                name: 'situacion',
                                                inputValue: '4',
                                                checked: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: 'Cuenta',
                                        layout: 'vbox',
                                        width: '100%',
                                        fieldDefaults: {
                                            labelWidth: 160
                                        },
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Incluye particiones',
                                                itemId: 'madre_cnombre',
                                                name: 'particiones',
                                                checked: true
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: 'Monitoreo',
                                        layout: 'vbox',
                                        width: '100%',
                                        fieldDefaults: {
                                            labelWidth: 160
                                        },
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Automonitoreo',
                                                itemId: 'cue_nAutoMonitoreo',
                                                checked: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
                , {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    itemId: 'buscar',
                    action: 'search'
                }, '->',
                {
                    xtype: 'button',
                    text: 'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                }, {
                    text: 'Exportar',
                    menu: {
                        xtype: 'menu',
                        items: [{
                            xtype: 'container',
                            layout: 'vbox',
                            padding: 10,
                            items: [{
                                xtype: 'button',
                                text: 'Exportar a Excel',
                                itemId: 'btnExportar',
                                action: 'export',
                                iconCls: 'icon-page-excel',
                                width: 170,
                            }, {
                                xtype: 'button',
                                text: 'Exportar a Csv',
                                itemId: 'btnExportarCsv',
                                action: 'exportCsv',
                                iconCls: 'icon-page-excel',

                                width: 170,
                                margin: '10 0 0 0'
                            }, {
                                xtype: 'button',
                                text: 'Exportar Contenido Split',
                                itemId: 'btnExportarSplit',
                                action: 'exportSplit',
                                hidden: true,
                                iconCls: 'icon-page-excel',
                                width: 170,
                                margin: '10 0 0 0'
                            }]
                        }]
                    }
                }
            ]// cierro items
        });
        this.addDocked(toolbar);
    }
});