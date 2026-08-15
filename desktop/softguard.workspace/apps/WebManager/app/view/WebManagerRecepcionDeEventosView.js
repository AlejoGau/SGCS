Ext.define('WebManager.view.WebManagerRecepcionDeEventosView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.webmanagerrecepciondeeventosview',
        
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
            {
                xtype: 'webmanagerrefreshpanel',
                title: getLocale('CATEGORIZACIÓN DE EVENTOS DEL DIA'),
                margin: '0 10px 0 20px',
                flex: 1,
                layout: 'fit',
                items: [{  
                    xtype: 'container',
                    height: 300,
                    scrollable: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'chartcategorizaciondeeventosview' 
                    }]
                }]
            },{
                xtype: 'webmanagerrefreshpanel',
                title: getLocale('CATEGORIZACIÓN DE EVENTOS DEL MES'),
                margin: '0 10px 0 20px',
                bodyCls: 'redemption-body',
                flex: 1,
                layout: 'fit',
                items: [{  
                    xtype: 'container',
                    height: 300,
                    scrollable: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'chartcategorizaciondeeventosdelmesview' 
                    }]
                }] 
            }]        
    },{
        xtype: 'container',
        cls: 'kpi-meta-charts',
        
        height: 400,
        border: false,
        padding: 0,
        
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'webmanagerrefreshpanel',
                title: getLocale('RESOLUCION DE EVENTOS DEL MES'),
                margin: '0 10px 0 20px',
                flex: 1,
                layout: 'fit',                    
                items: [{
                   xtype: 'chartresoluciondeeventosdelmesview'
                }]
            
            },{
                xtype: 'webmanagerrefreshpanel',
                title: getLocale('EVENTOS AUTOPROCESADOS DEL DIA'),
                margin: '0 10px 0 20px',
                bodyCls: 'redemption-body',
                flex: 1,
                layout: 'fit',   
                items: [{
                    xtype: 'charteventosautoprocesadosdeldiaview'
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
        items: [/*
                Facundo Janeiro
                5/7/2022
                https://softguard.atlassian.net/browse/DS-6
                Eliminar Grafico PortGuad 
                
            {
                xtype: 'webmanagerrefreshpanel',
                title: getLocale('ANALISIS DE PG 30 DIAS'),
                margin: '0 10px 0 20px',
                flex: 1,
                layout: 'fit',
                       
                items: [{
                    xtype: 'chartanalisispg30diasview'
                }]
            },*/{
                xtype: 'webmanagerrefreshpanel',
                title: getLocale('ANALISIS DE IPR 30 DIAS'),
                margin: '0 10px 0 20px',
                bodyCls: 'redemption-body',
                flex: 1,
                layout: 'fit',
                        
                items: [{
                   xtype: 'chartanalisisipr30diasview'
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
        items : [
            {
                xtype: 'webmanagerrefreshpanel',
                title: getLocale('FLUJO DE SEÑALES POR RECEPTOR  (Últimas 24 Hs.)'),
                margin: '0 10px 0 20px',
                flex: 1,
                layout: 'fit',
                        
                items: [{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    scrollable: 'vertical',
                    items : [
                        {
                            xtype: 'gridflujosenalesreceptorview'
                        }
                    ]
                }]
            }]
    }]
});