Ext.define('SgAppWebReport.view.ReporteTgTiempoDetenidoView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportetgtiempodetenidoview',

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
                        var iframe = button.up('reportetgtiempodetenidoview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 500,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    padding: '0 0 0 0',
                                    border: 0,
                                    layout: 'hbox',
                                    margin: '0 0 5 0',                                    
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Tabla Histórico',
                                            labelWidth: 100,
                                            displayField: '_periodo',
                                            queryMode: 'local',
                                            valueField: 'c_periodo',
                                            anchor: '100%',
                                            itemId: 'combohistorico',
                                            name: 'tablahistorico',
                                            width: 330,
                                            plugins: ['clearbutton'],
                                            //  hidden:true // se pidio habilitar el dia 5/6/2017
                                        },                                        
                                    ]
                                },{
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [                                 
                                    {
                                    xtype: 'datefield',
                                    fieldLabel: 'Desde',
                                    name: "FechaDesde",
                                    bindToModel: false,
                                    itemId: 'FechaDesde',
                                    labelWidth: 100,
                                    width: 230,
                                    name: 'FechaDesde'
                                }, {
                                    fieldLabel: 'Hora',
                                    xtype: 'timefield',
                                    itemId: 'HoraDesde',
                                    format: 'H:i',
                                    altFormats: 'H:i',
                                    value: '00:00',
                                    increment: 10,
                                    labelWidth: 40,
                                    width: 123,
                                    margin: '0 0 0 7',
                                    name: 'HoraDesde'
                                }]
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 5 0',
                                items: [{
                                    xtype: 'datefield',
                                    fieldLabel: 'Hasta',
                                    labelWidth: 100,
                                    itemId: 'FechaHasta',
                                    bindToModel: false,
                                    name: "FechaHasta",
                                    width: 230,
                                    name: 'FechaHasta'
                                }, {
                                    fieldLabel: 'Hora',
                                    xtype: 'timefield',
                                    itemId: 'HoraHasta',
                                    format: 'H:i',
                                    altFormats: 'H:i',
                                    value: '23:50',
                                    increment: 10,
                                    labelWidth: 40,
                                    width: 123,
                                    margin: '0 0 0 7',
                                    name: 'HoraHasta'
                                }]
                            }, {
                                xtype: 'numberfield',
                                name: 'Minutos',
                                itemId: 'Minutos',
                                fieldLabel: 'Minutos detenido',
                                minValue: 1,
                                labelWidth: 100,
                                value: getParametro('TGTIEMPODETENIDO'),
                                allowBlank: false
                            }, {
                                xtype: 'fieldset',
                                padding: '0 0 0 0',
                                border: 0,
                                layout: 'hbox',
                                margin: '0 0 10 0',
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Seleccione un vehículo',
                                        iconCls: 'icon-find',
                                        itemId: 'seleccionarcuenta',
                                        margin: '0 10 0 0',
                                        listeners: {
                                            click: function (button) {
                                                var view = button.up('reportetgtiempodetenidoview');
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
                                                button.up('reportetgtiempodetenidoview').down('#idcuenta').setValue('')
                                                button.up('reportetgtiempodetenidoview').down('#nombrecuenta').setValue('')
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
                        }]
                    }
                }, {
                    xtype: 'button',
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