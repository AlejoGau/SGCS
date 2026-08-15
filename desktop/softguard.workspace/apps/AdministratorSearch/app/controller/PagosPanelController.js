Ext.define('AdministratorSearch.controller.PagosPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'PagosPanelView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'pagospanelview' : {
				afterrender : this.initView
			}
		});
	},

	initView : function(view) {
        var tabpanel = view.down('tabpanel');

        newTab = Ext.widget('tablascondicionesdepagogridview', {
            iconCls: 'icon-page-white-error',
            title : getLocale('Condiciones de pago'),                
            targetTab: view,
            closable : false,
            translate:false
        });

        tabpanel.add(newTab);
        tabpanel.setActiveTab(newTab);

        var newTab = Ext.widget('tablasformadepagogridview', {
            iconCls: 'icon-money-dollar',
            title : getLocale('Formas de pago'),                
            targetTab: view,
            closable : false,
            translate:false
        });
        
        tabpanel.add(newTab);

        /*
        newTab = Ext.widget('tablastipoformadepagogridview', {
            iconCls: 'icon-money-dollar',
            title : getLocale('Tipos de forma de pago'),
            targetTab: view,
            closable : false,
            translate:false
        });
        
        tabpanel.add(newTab);
        */

        newTab = Ext.widget('t_monedasgridview', {
            iconCls: 'icon-money-dollar',
            title : getLocale('Monedas'),                
            targetTab: view,
            closable : false,
            translate:false
        });
        
        tabpanel.add(newTab);

	}
    
});