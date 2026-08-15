Ext.define('AdministratorSearch.controller.SystemTestGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SystemTestSearchModel' ],
    views : [ 'SystemTestGridView' ],

    init : function(config) {
        // genero los eventos
        this.control({
    		'systemtestgridview' : {
				afterrender : this.initView,
                refresh: this.onRefreshClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];
        var record = view.record;
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getSystemTestSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            remoteGroup: false,
            groupField: 'Category',
            filters: view.filters
        })
        view.bindStore(store);
        
        store.load();
	},
    
    onRefreshClick: function (btn) {
        var view = btn.up('systemtestgridview')?btn.up('systemtestgridview'):btn;
        view.getStore().load();
        
    }

});