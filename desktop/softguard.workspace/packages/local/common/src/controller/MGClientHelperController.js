//MIGRADO2024
Ext.define('Common.controller.MGClientHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'MGClientSinEntidadModel', 'MoneyguardClientSearchModel' ],
    views : [ 'MGClientHelperView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
					'mgclienthelperview' : {
						afterrender : this.initView,
                        itemclick: this.onItemClick
					},
                    'mgclienthelperview button[action=removefilter]' : {
                        click: this.onRemovefilterClick
            		},
                    'mgclienthelperview button[action=filterText]' : {
                        click: this.onFiltertextClick
                	},
                    'mgclienthelperview button[action=selected]' : {
                        click: this.onSelectedClick
                    }
				});
	}, //
	initView : function(view) {
        var filter = view.filter?view.filter:[];
        
        
        var store = view.helperStore?view.helperStore: Ext.create('Ext.data.Store',{
            model: this.getMGClientSinEntidadModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: filter
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        store.load();
	},
    
    onItemClick: function(view,record,item,index,e,options){
        if (!view.up('panel').multiSelect) {
            var win = view.up('window');
            var caller = win.view;
            caller.fireEvent('clientchanged',record,caller);
            win.close();
        }
    },
    
    onSelectedClick: function(button, event, options){
        var view = button.up('mgclienthelperview');
        var selected = view.getSelectionModel().getSelection();
        var win = view.up('window');
        var caller = win.view;
        caller.fireEvent('cuentaselected',selected,caller);
        win.close();
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('mgclienthelperview');
        var store = view.getStore();
        var query = view.down('#query');
        var queryType = view.down('#queryType');
        store.currentPage = 1;
        store.filter([{property:queryType.getValue(),value:query.getValue()},{property:'tip_nCondicion',value:1}]);
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('mgclienthelperview');
        var store = view.getStore();
        store.currentPage = 1;
        store.filters.clear();
        store.filter('tip_nCondicion',1);
        view.down('#query').setValue('');
    }
});