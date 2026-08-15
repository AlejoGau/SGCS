Ext.define('WebManager.view.WebManagerEvolucionDeMiCentralView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.webmanagerevoluciondemicentralview',
    
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
        border: false,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'webmanagerrefreshpanel',
            title: getLocale('EVOLUCION DE CUENTAS'),
            bodyCls: 'redemption-body',
            margin: '0 10px 0 20px',
            
            border: false,
            
            flex: 1, 
            layout: 'fit',
            
            items: [{
                height: 600,            
                xtype: 'chartevolucioncuentas12mesesview'
            }]        
        }]   
    },{
        xtype: 'container',
        cls: 'kpi-meta-charts',
        border: false,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'webmanagerrefreshpanel',
            title: getLocale('EVOLUCION DE SMARTPANICS'),
            bodyCls: 'redemption-body',
            margin: '0 10px 0 20px',
            
            border: false,
            
            flex: 1, 
            layout: 'fit',
            
            items: [{
                height: 600,            
                xtype: 'chartevolucionsmartpanicsview'
            }]        
        }]
    
    },{
        xtype: 'container',
        cls: 'kpi-meta-charts',
        border: false,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'webmanagerrefreshpanel',
            title: getLocale('EVOLUCION DE VIGICONTROL'),
            bodyCls: 'redemption-body',
            margin: '0 10px 0 20px',
            
            border: false,
            
            flex: 1, 
            layout: 'fit',
            
            items: [{
                height: 600,            
                xtype: 'chartevolucionvigicontrolview'
            }]        
        }]
    
    }]   

});