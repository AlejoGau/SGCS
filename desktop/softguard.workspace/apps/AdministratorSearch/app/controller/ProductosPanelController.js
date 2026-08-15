Ext.define('AdministratorSearch.controller.ProductosPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ProductosPanelView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'prodcutospanelview' : {
				afterrender : this.initView
			}
		});
	},

	initView : function(view) {
        var newTab = Ext.widget('stproductosview', {
            iconCls: 'icon-page-white-wrench',
            title : getLocale('Productos'),
            targetTab: view,
            closable : false,
            translate:false,
        });
        
        var tabpanel = view;
        tabpanel.add(newTab);
        tabpanel.setActiveTab(newTab);

        var newTab = Ext.widget('mg_listas_preciosgridview', {
            iconCls: 'icon-table',
            title : getLocale('Listas'),
            targetTab: view,
            closable : false,
            translate:false
        });
        
        tabpanel.add(newTab);
	}
});