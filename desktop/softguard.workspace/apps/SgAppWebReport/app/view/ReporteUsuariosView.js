Ext.define('SgAppWebReport.view.ReporteUsuariosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteusuariosview',

    activeHelp: true,//trae el help
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
                        var iframe = button.up('reporteusuariosview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, "-", {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 450,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: 'fit',
                                items: [
                                    {

                                        xtype: 'combo',
                                        itemId: 'comboorganizacion',
                                        fieldLabel: 'Organizacion',
                                        displayField: 'Name',
                                        valueField: 'Id',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        anchor: '100%'

                                    }
                                ]
                            }
                        ]
                    }
                },

                {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-search',
                    action: 'filter'
                }/*,{
                    xtype: 'button',
                    text: 'Ver Todos',
                    iconCls : 'icon-search',
                    action: 'todos'
                }
                */
            ]
        });

        this.addDocked(toolbar);
    }
});