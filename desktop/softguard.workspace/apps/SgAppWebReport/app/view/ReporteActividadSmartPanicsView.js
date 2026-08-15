Ext.define('SgAppWebReport.view.ReporteActividadSmartPanicsView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteactividadsmartpanicsview',
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
                    /*handler: function(button){
                        var iframe = button.up('reporteactividadsmartpanicsview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                }, "-", {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 430,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [{
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Dealer',
                                        itemId: 'dealer',
                                        enforceMaxLength: true,
                                        maxLength: 3,
                                        width: 200,
                                        name: 'dealer'
                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        itemId: 'cuentadesde',
                                        fieldLabel: 'Cuenta desde',
                                        enforceMaxLength: true,
                                        maxLength: 4,
                                        width: 200,
                                        name: 'cuentadesde'
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'cuentahasta',
                                        fieldLabel: 'Cuenta hasta',
                                        enforceMaxLength: true,
                                        maxLength: 4,
                                        width: 200,
                                        margin: '0 0 0 9',
                                        name: 'cuentahasta'
                                    }
                                ]
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Nombre',
                                itemId: 'nombreCuenta',
                                anchor: '100%',
                                name: 'nombreCuenta'
                            }, {
                                xtype: 'combo',
                                itemId: 'comboregistros',
                                fieldLabel: 'Cantidad de registros',
                                anchor: '100%',
                                store: [
                                    [25, 25],
                                    [50, 50],
                                    [100, 100],
                                    [500, 500],
                                    [1000, 'Todos']
                                ]
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Usuario',
                                itemId: 'usuario',
                                anchor: '100%',
                                name: 'usuario'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Imei',
                                itemId: 'imei',
                                anchor: '100%',
                                name: 'imei'
                            }, {
                                xtype: 'fieldset',
                                title: 'Datos Extra',
                                layout: 'vbox',
                                items: [{
                                    xtype: 'checkbox',
                                    itemId: 'cuentasasociadaschk',
                                    fieldLabel: 'Cuentas asociadas',
                                    name: 'cuentasasociadaschk',
                                    labelWidth: 200

                                }, {
                                    xtype: 'checkbox',
                                    itemId: 'ultimos5chk',
                                    fieldLabel: 'Ultimos 5 eventos',
                                    name: 'ultimos5chk',
                                    labelWidth: 200

                                }, {
                                    xtype: 'checkbox',
                                    itemId: 'geocercaschk',
                                    fieldLabel: 'Geocercas',
                                    name: 'geocercaschk',
                                    labelWidth: 200

                                }]
                            }
                            ]
                        }]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                }, '->', {
                    xtype: 'button',
                    text: 'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                }, {
                    xtype: 'button',
                    text: 'Exportar',
                    itemId: 'btnExportar',
                    action: 'export',
                    iconCls: 'icon-page-excel'
                }
            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});