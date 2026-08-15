Ext.define('SgAppWebReport.view.ReporteEventosByCuentaZonaView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventosbycuentazonaview',

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
                        var iframe = button.up('eventosbycuentazonaview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                },

                {
                    xtype: 'button',
                    text: 'Filtrar',
                    iconCls: 'icon-find',
                    itemId: 'abrirfiltros',
                    action: 'abrirfiltros'
                }, '->', {
                    xtype: 'button',
                    text: 'Exportar',
                    iconCls: 'icon-page-excel',
                    action: 'export'
                }, {
                    xtype: 'button',
                    text: 'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                }



            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});