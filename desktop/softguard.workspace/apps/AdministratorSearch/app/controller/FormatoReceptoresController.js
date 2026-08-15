Ext.define('AdministratorSearch.controller.FormatoReceptoresController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'FormatoReceptoresModel', 'FormatoReceptoresSearchModel' ],
    views : [ 'FormatoReceptoresView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'formatoreceptoresgridview' : {
				afterrender : this.initView
			},
            'formatoreceptoresgridview button[action=search]': {
                //click: this.onSearchClick
            }
            
		});
	},

	initView : function(view) {
        view.filters = [];
        
        var record = view.record;
        
            view.filters = [
                {
                    property: 'rec_cformato',
                    value: record.get('for_ccodigo').toString()
                }
            ]
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getFormatoReceptoresSearchModelModel(),
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
        
        var view = button.up('formatoreceptoresgridview');
        var selected = view.getSelectionModel().getSelection();
       
        var win = view.up('window');
        var caller = win.view;
        
        caller.fireEvent('relacionselected',selected,caller);
        
    }


    

});