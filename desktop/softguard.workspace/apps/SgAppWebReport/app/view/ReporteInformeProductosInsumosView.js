Ext.define('SgAppWebReport.view.ReporteInformeProductosInsumosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteinformeproductoinsumosview',

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
                        var iframe = button.up('reporteinformeproductoinsumosview').down('#Iframe');
                        var ele = iframe.getEl();

                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();

                    }*/
                }, {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 420,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: 'Fecha de servicio tecnico',
                                        layout: 'vbox',
                                        width: 400,

                                        hidden: true,
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
                                        title: 'Fecha de servicio tecnico',
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
                                        xtype: 'combo',
                                        fieldLabel: 'Estado',
                                        queryMode: 'local',
                                        store: [
                                            [2, 'Asignado'],
                                            [3, 'En Ejecucion'],
                                            [4, 'Finalizado'],
                                            [5, 'Cancelado']
                                        ],
                                        itemId: 'estados',
                                        hidden: true
                                    },

                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Dealer desde',
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                itemId: 'dealer',
                                                width: 150
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'cuentadesde',
                                                fieldLabel: 'Cuenta desde',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                width: 170,
                                                labelWidth: 115,
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
                                                labelWidth: 115,
                                                margin: '0 0 0 157'
                                            }
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Insumo',
                                        displayField: 'Name',
                                        queryMode: 'local',
                                        valueField: 'Id',
                                        itemId: 'producto'
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
                    action: 'todos',
                    itemId: 'todos'
                }
            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});