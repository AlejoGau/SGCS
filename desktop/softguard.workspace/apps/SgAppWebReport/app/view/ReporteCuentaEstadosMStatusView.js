Ext.define('SgAppWebReport.view.ReporteCuentaEstadosMStatusView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteestadocuentamstatusview',

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
                        var iframe = button.up('reporteestadocuentamstatusview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        items: [
                            {
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

                            }, {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'Fecha',
                                        items: [
                                            {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 5 0',
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
                                                        fieldLabel: 'Hora',
                                                        xtype: 'timefield',
                                                        itemId: 'horadesde',
                                                        format: 'H:i',
                                                        altFormats: 'H:i',
                                                        increment: 10,
                                                        labelWidth: 40,
                                                        width: 120,
                                                        margin: '0 0 0 7'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'container',
                                                layout: 'hbox',
                                                margin: '0 0 5 0',
                                                items: [
                                                    {
                                                        xtype: 'datefield',
                                                        fieldLabel: 'Hasta',
                                                        itemId: 'fechahasta',
                                                        bindToModel: false,
                                                        name: "fhasta",
                                                        labelWidth: 50,
                                                        width: 250
                                                    }, {
                                                        fieldLabel: 'Hora',
                                                        xtype: 'timefield',
                                                        itemId: 'horahasta',
                                                        format: 'H:i',
                                                        altFormats: 'H:i',
                                                        increment: 10,
                                                        labelWidth: 40,
                                                        width: 120,
                                                        margin: '0 0 0 7'
                                                    }
                                                ]
                                            }
                                        ]
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'dealer',
                                        fieldLabel: 'Dealer',
                                        enforceMaxLength: true,
                                        maxLength: 3,
                                        //emptyText: getLocale('Dealer')                                          
                                    }, {
                                        xtype: 'checkboxgroup',
                                        fieldLabel: 'Estados',
                                        itemId: 'estados',
                                        layout: 'vbox',
                                        width: '100%',
                                        items: [
                                            {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Alta',
                                                name: 'estados',
                                                inputValue: 'ALTA',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Cambio a situacion no habilitado',//'Habilitado',
                                                name: 'estados',
                                                inputValue: '_SN',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Cambio a situación en prueba',//'No Habilitado',
                                                name: 'estados',
                                                inputValue: '_SP',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Cambio a situación en prueba por zonas',//'Pruebas por zonas',
                                                name: 'estados',
                                                inputValue: '_SZ',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Cambio a situación habilitado',//Pruebas',
                                                name: 'estados',
                                                inputValue: '_SH',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: 'Cambio Situación en Cuenta',//'Pedir Eliminar',
                                                name: 'estados',
                                                inputValue: '_CS',//'_CS,_EC',
                                                checked: true
                                            }, {
                                                xtype: 'checkbox',
                                                fieldLabel: ' Solicitud de Eliminacion de Cuenta',//'Eliminadas',
                                                name: 'estados',
                                                inputValue: '_EC',//ELIMINADA',
                                                checked: true
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
                }
            ]// cierro items
        });
        this.addDocked(toolbar);
    }
});