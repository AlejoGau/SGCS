Ext.define('AdministratorSearch.controller.ReceptorFormatosHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ReceptorFormatosHelperModel', 'ReceptorFormatosHelperSearchModel' ],
    views : [ 'ReceptorFormatosHelperView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
			'receptorformatoshelperview' : {
				afterrender : this.initView
			},
            
            'receptorformatoshelperview button[action=selected]' : {
                click: this.onSelectedClick
            },
            'receptorformatoshelperview button[action=search]': {
                click: this.onSearchClick
            },
            'receptorformatoshelperview button[action=getall]': {
                click: this.onGetAllClick
            },
            
		});
	},

	initView : function(view) {
        view.filters = [];
        var record = view.record;
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getReceptorFormatosHelperSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
        
	},
    
    onSelectedClick: function(button, event, options){
        
        var view = button.up('receptorformatoshelperview');
        
        var store = view.getStore();
        
        var selecteds = view.getSelectionModel().getSelection();
        
         // busco si estan seleccionados todos.
        var headerCt = view.headerCt;
        var checkHd  = headerCt.child('gridcolumn[isCheckerHd]');
        
        var all = checkHd.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
        
        var win = view.up('window');
        var caller = win.view;
            
        if (selecteds.length > 0  && !all){
            caller.fireEvent('relacionselected',selecteds,caller);
        } else {
           caller.fireEvent('relacionselected',store.data.items,caller);
        }
        
        win.close();
      
    },
    
    
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('receptorformatoshelperview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('receptorformatoshelperview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        //var filters = Ext.clone(view.filters);
        
        
        if (fieldName != ''){
            store.filter({ 
                property: fieldName+':LIKE',
                value: query,
                id: fieldName
            });
        }
    },

   

});