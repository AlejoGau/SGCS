Ext.define('SgAppWebReport.view.ReporteServiciosPorEstadoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteservicioporestadoview',

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
                        console.log(button)
                        var iframe = button.up('reporteservicioporestadoview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();

                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 420,
                        closable: true,
                        closeAction: 'hide',
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'Cuenta',
                                        width: 400,
                                        layout: 'hbox',
                                        margin: '0 0 10 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: 'Seleccionar Cuenta',
                                                iconCls: 'icon-find',
                                                action: 'buscarporcuenta',
                                                itemId: 'selcuenta'
                                            }, {
                                                xtype: 'button',
                                                text: '',
                                                iconCls: 'icon-cancel',
                                                itemId: 'sacarcuenta',
                                                hidden: true,
                                                margin: '0 15 0 15',
                                                listeners: {
                                                    click: function (button) {
                                                        button.up('reporteservicioporestadoview').down('#idcuenta').setValue('')
                                                        button.up('reporteservicioporestadoview').down('#nombrecuenta').setValue('')
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
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: 'Estados',
                                        layout: 'vbox',
                                        width: 400,
                                        items: [
                                            {
                                                xtype: 'button',
                                                iconCls: 'icon-cuenta_filter_nohabilitadas',
                                                text: 'Cancelado',
                                                itemId: 'cancelado',
                                                action: 'cancelado',
                                                enableToggle: true
                                            }, {
                                                xtype: 'button',
                                                iconCls: 'icon-cuenta_filter_enprueba',
                                                text: 'Asignado',
                                                action: 'asignado',
                                                enableToggle: true,
                                                itemId: 'asignado'
                                            }, {
                                                xtype: 'button',
                                                iconCls: 'icon-cuenta_filter_enprueba',
                                                text: 'En Ejecución',
                                                action: 'enejecucion',
                                                enableToggle: true,
                                                itemId: 'enejecucion'
                                            }, {
                                                xtype: 'button',
                                                iconCls: 'icon-cuenta_filter_enprueba',
                                                text: 'Pendiente',
                                                itemId: 'pendiente',
                                                action: 'pendiente',
                                                enableToggle: true
                                            }, {
                                                xtype: 'button',
                                                iconCls: 'icon-cuenta_filter_habilitadas',
                                                text: 'Finalizado',
                                                itemId: 'finalizado',
                                                action: 'finalizado',
                                                enableToggle: true,
                                                margin: '0 0 10 0',
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        title: 'Fecha de generacion',
                                        layout: 'vbox',
                                        width: 400,
                                        items: [

                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Desde',
                                                name: "fechadesdegeneracion",
                                                bindToModel: false,
                                                itemId: 'fechadesdegeneracion',
                                                labelWidth: 50,
                                                width: 250
                                            }, {
                                                xtype: 'datefield',
                                                fieldLabel: 'Hasta',
                                                itemId: 'fechahastageneracion',
                                                bindToModel: false,
                                                name: "fechahastageneracion",
                                                labelWidth: 50,
                                                width: 250
                                            }

                                        ]
                                    }, {
                                        xtype: 'fieldset',
                                        title: 'Fecha',
                                        layout: 'vbox',
                                        width: 400,
                                        items: [

                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Desde',
                                                name: "fechadesde",
                                                bindToModel: false,
                                                itemId: 'fechadesde',
                                                labelWidth: 50,
                                                width: 250
                                            }, {
                                                xtype: 'datefield',
                                                fieldLabel: 'Hasta',
                                                itemId: 'fechahasta',
                                                bindToModel: false,
                                                name: "fechahasta",
                                                labelWidth: 50,
                                                width: 250
                                            }


                                        ]
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tecnico',
                                        displayField: 'ins_cnombre',
                                        queryMode: 'local',
                                        valueField: 'ins_idKey',
                                        itemId: 'tecnicos'
                                    }, {
                                        xtype: 'fieldset',
                                        title: 'Mostrar',
                                        layout: 'vbox',
                                        items: [{
                                            xtype: 'checkbox',
                                            itemId: 'observacionescheck',
                                            fieldLabel: 'Observaciones',
                                            name: 'observacionescheck',
                                            checkboxSelect: true
                                        }]
                                    }

                                ]

                            }, {
                                xtype: 'button',
                                text: 'Buscar',
                                iconCls: 'icon-find',
                                action: 'search'
                            }

                        ]
                    }
                }, "-", {
                    xtype: 'button',
                    text: 'Todos',
                    iconCls: 'icon-find',
                    action: 'removeFilter',
                    itemId: 'removeFilter'
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