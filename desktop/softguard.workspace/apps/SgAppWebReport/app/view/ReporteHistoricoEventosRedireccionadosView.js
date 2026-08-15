Ext.define('SgAppWebReport.view.ReporteHistoricoEventosRedireccionadosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reporteeventosredireccionadosview',

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
                        var iframe = button.up('reporteeventosredireccionadosview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, "-", {
                    xtype: 'button',
                    text: 'Filtros',
                    iconCls: 'icon-find',
                    action: 'openmenu'
                }, '->', {
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
                                hidden: true,
                                itemId: 'btnExportarCsv',
                                action: 'exportCsv',
                                iconCls: 'icon-page-excel',
                                width: 170,
                                margin: '10 0 0 0'
                            }, {
                                xtype: 'button',
                                text: 'Exportar Contenido Split',
                                hidden: true,
                                itemId: 'btnExportarSplit',
                                action: 'exportSplit',
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