Ext.define('SgAppWebReport.view.ReporteEstadisticaPorServicioView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteestadisticaporservicioview',

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
                        var iframe = button.up('reporteestadisticaporservicioview').down('#Iframe');
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
                                        title: 'Fecha de generación',
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
                                        title: 'Fecha de modificación',
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
                                        itemId: 'estados'
                                    }, {

                                        xtype: 'combo',
                                        fieldLabel: 'Servicio',
                                        displayField: 'tip_cdescripcion',
                                        queryMode: 'local',
                                        forceSelection: true,
                                        allowBlank: true,
                                        editable: false,
                                        valueField: 'tip_ccodigo',
                                        name: "stc_ctipo_servicio",
                                        itemId: "tiposervicio"
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