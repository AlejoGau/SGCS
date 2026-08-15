Ext.define('WebManager.view.WebManagerEstadoDeMiCentralView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.webmanagerestadodemicentralview',

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
            title: getLocale('EVENTOS PENDIENTES POR PRIORIDAD'),
            bodyCls: 'redemption-body',
            margin: '0 10px 0 20px',
            
            border: false,
            
            flex: 1, 
            layout: 'fit',
            
            items: [{
                height: 350,
                xtype: 'chartestadoeventospendientesporprioridadview'
            }]
        }]
    },{
        xtype: 'container',
        cls: 'kpi-meta-charts',
        
        border: false,
        height: 400,
        
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
    
        items: [{
            xtype: 'webmanagerrefreshpanel',
            bodyCls: 'redemption-body',
            margin: '0 10px 0 20px',
            
            title: getLocale('ESTADO DE EVENTOS ACTUALES'),
            flex: 1, 
            layout:'fit',
    
            items:[{
                xtype: 'chartestadoeventosactualesview'        
            }]
        },{
            xtype: 'webmanagerrefreshpanel',
            title: getLocale('ULTIMOS 25 EVENTOS ALERTA'),
            
            margin: '0 20px 0 0',                
            flex: 2,
            layout:'fit',            
            
            items : [{
               xtype: 'gridultimos25eventosalertaview'
            }]
            
        }]
    },{
        xtype: 'container',
        cls: 'kpi-meta-charts',
        
        height: 400,
        border: false,
        
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        
        items: [{
            xtype: 'webmanagerrefreshpanel',
            title: getLocale('RESOLUCION DE EVENTOS DEL DIA'),
            
            margin: '0 10px 0 20px',
            bodyCls: 'redemption-body',
            flex: 1,
            layout: 'fit',

            items: [{
                 xtype: 'chartresoluciondeeventosdeldiaview'
            }]
        
        },{
            xtype: 'webmanagerrefreshpanel',
            title: getLocale('EVENTOS DEL DIA POR OPERADOR'),

            margin: '0 10px 0 20px',
            bodyCls: 'redemption-body',
            flex: 1,
            layout: 'fit',
            
            items: [{
                xtype: 'charteventosdeldiaporoperadorview'
                }]
                
        }]
    },{
        xtype: 'container',
        cls: 'kpi-meta-charts',
        
        border: false,
        height: 400,
        
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
                
        items: [{
            xtype: 'webmanagerrefreshpanel',
            title: getLocale('EVENTOS POR TIPO DE HOY'),

            bodyCls: 'redemption-body',
            margin: '0 10 0 20',
            
            flex: 1,
            layout: 'fit',
                                                    
            items: [{  
                xtype: 'container',
                height: 400,
                scrollable: 'vertical',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'charteventosportipodehoyview'  
                }]
            }]
        }]
    }]
    
});