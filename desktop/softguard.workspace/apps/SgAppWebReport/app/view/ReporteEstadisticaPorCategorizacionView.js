Ext.define('SgAppWebReport.view.ReporteEstadisticaPorCategorizacionView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportestadisticacategorizacionview',

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
                    /**handler: function (button) {
                        var iframe = button.up('reportestadisticacategorizacionview').down('#Iframe');
                        var ele = iframe.getEl();
                        document.getElementById(ele.id + '-iframeEl').contentWindow.print();
                    }*/
                }, {
                    xtype: 'button',
                    text: 'Filtros',
                    iconCls: 'icon-find',
                    action: 'openmenu'
                }
            ]// cierro items
        });



        this.addDocked(toolbar);
    }
});