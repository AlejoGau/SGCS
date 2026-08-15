Ext.define('WebManager.view.WebManagerInformacionDeCuentasView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.webmanagerinformaciondecuentasview',

    
    cls: 'kpi-main',
    scrollable: 'y',
    minWidth: 600,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'container',
        cls: 'kpi-meta-charts',
        
        height: 400,
        border: false,
        
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {   xtype: 'webmanagerrefreshpanel',
                title: getLocale('ESTADO DE CUENTAS'),
                margin: '0 10px 0 20px',
                flex: 1,
                layout: 'fit',
                            
                items: [{
                    xtype: 'chartestadodecuentasview'
                }]
            }
        ] 
    }]
});