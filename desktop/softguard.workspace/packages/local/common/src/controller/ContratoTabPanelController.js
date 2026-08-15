Ext.define('Common.controller.ContratoTabPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ContratoTabPanelView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'contratotabpanelview' : {
				afterrender : this.initView
			}
		});
	},

	initView : function(view) {

        var newTab = Ext.widget('contratogridview', {
                iconCls: 'icon-money-dollar',
                title : getLocale('Contratos'),
                targetTab: view,
                closable : false,
                translate:false,
                filters:[
                    {
                        property:'cnt_fechavto:GT',
                        value: new Date(),
                        id:'fechavencimientohasta'
                    }
                ],
            });
            
            var tabpanel = view.down('tabpanel');
            //tabpanel.add(newTab);
            //tabpanel.setActiveTab(newTab);

            /* estas grillas ahora quedan integradas como filtros en esta view https://softguard.atlassian.net/browse/DK-325
        var newTab = Ext.widget('contratogridview', {
                iconCls: 'icon-page-white-error',
                title : getLocale('Contratos por vencer'),
                hidebuttons: '#new',
                filters:[
                    {
                        property:'cnt_fechavto:GT',
                        value: new Date(),
                        id:'fechavencimientodesde'
                    },{
                        property:'cnt_fechavto:LT',
                        value: Ext.Date.add(new Date(), Ext.Date.DAY, 30),
                        id:'fechavencimientohasta'
                    }
                ],
                sorters: [
                    {
                        property:'cnt_fechavto',
                        direction:'ASC'
                    }
                ],
                showProximosVencimientoDias:true,
                targetTab: view,
                closable : false,
                translate:false
            });
            
            var tabpanel = view.down('tabpanel');
            tabpanel.add(newTab);
            
        var newTab = Ext.widget('contratogridview', {
                iconCls: 'icon-page-white-error',
                title : getLocale('Contratos vencidos'),
                hidebuttons: '#new',
                filters:[
                    {
                        property:'cnt_fechavto:LT',
                        value: new Date(),
                        id:'fechavencimientohasta'
                    }
                ],
                sorters: [
                    {
                        property:'cnt_fechavto',
                        direction:'ASC'
                    }
                ],
                targetTab: view,
                closable : false,
                translate:false
            });
            */
            var tabpanel = view.down('tabpanel');
            tabpanel.add(newTab);
            
        var newTab = Ext.widget('contratotemplategridview', {
                iconCls: 'icon-page-white-code',
                title : getLocale('Contratos templates'),
                targetTab: view,
                closable : false,
                translate:false,
                tipo:1
            });
            
            var tabpanel = view.down('tabpanel');
            tabpanel.add(newTab);
        
	}
    
});
