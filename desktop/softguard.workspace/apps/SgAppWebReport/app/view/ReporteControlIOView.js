Ext.define('SgAppWebReport.view.ReporteControlIOView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportecontrolioview',

    layout: 'fit',
    closeAction: 'Destroy',
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
        //( 'cuentachanged' );
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function( button ) {
                        var iframe = button.up( 'reportecontrolioview' ).down( '#Iframe' );
                        var ele = iframe.getEl();
                        document.getElementById( 'iframe-' + ele.id ).contentWindow.printMe();
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
                                itemId: 'btnExportarCsv',
                                action: 'exportCsv',
                                iconCls: 'icon-page-excel',
                                width: 170,
                                margin: '10 0 0 0'
                            }, {
                                xtype: 'button',
                                hidden: true,
                                text: 'Exportar Contenido Split',
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