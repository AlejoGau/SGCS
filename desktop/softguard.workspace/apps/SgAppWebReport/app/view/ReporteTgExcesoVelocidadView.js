Ext.define('SgAppWebReport.view.ReporteTgExcesoVelocidadView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportetgexcesovelocidadview',

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
                    action: 'btnprint',
                    /*handler: function (button) {
                        var iframe = button.up('reportetgexcesovelocidadview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 400,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'Patente',
                                    itemId: 'patente',
                                    fieldLabel: 'Patente',
                                    labelWidth: 50
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'fechadesde',
                                    itemId: 'fechadesde',
                                    fieldLabel: 'Fecha Inicio',
                                    bindToModel: false
                                }, {
                                    xtype: 'datefield',
                                    name: 'fechahasta',
                                    itemId: 'fechahasta',
                                    fieldLabel: 'Fecha Fin',
                                    bindToModel: false
                                },
                                {
                                    xtype: 'button',
                                    text: 'Seleccione un vehiculo',
                                    iconCls: 'icon-find',
                                    itemId: 'seleccionarcuenta',
                                    margin: '0 10 0 0',
                                    listeners: {
                                        click: function (button) {
                                            var view = button.up('reportetgexcesovelocidadview');
                                            view.fireEvent('onsSeleccionarCuenta', button, view);
                                        }
                                    }
                                }, {
                                    xtype: 'button',
                                    text: '',
                                    iconCls: 'icon-cancel',
                                    itemId: 'sacarcuenta',
                                    hidden: true,
                                    margin: '0 5 0 0',
                                    listeners: {
                                        click: function (button) {
                                            button.up('reportetgexcesovelocidadview').down('#idcuenta').setValue('')
                                            button.up('reportetgexcesovelocidadview').down('#nombrecuenta').setValue('')
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
                                }, {
                                    xtype: 'displayfield',
                                    hidden: true,
                                    itemId: 'cue_cimei',
                                    name: 'cue_cimei'
                                }

                            ]
                        }]
                    }
                }, {
                    xtype: 'button',
                    itemId: 'buscar',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                },
                "->"
                , {
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