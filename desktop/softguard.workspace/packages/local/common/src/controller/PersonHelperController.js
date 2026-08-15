Ext.define('Common.controller.PersonHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'PersonSearchModel' ],
    views : [ 'PersonHelperView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
					'personhelperview' : {
						afterrender : this.initView,
                        itemclick: this.onItemClick
					},
                    'personhelperview button[action=getall]' : {
                        click: this.onGetAllClick
            		},
                    'personhelperview button[action=search]' : {
                        click: this.onSearchClick
                	},
                    'personhelperview button[action=selected]' : {
                        click: this.onSelectedClick
                    }
				});
	}, //

	initView : function(view) {
        view.filters = [];
        var record = view.record;
        
        if (record && view.filterByParentTaxonomy == true){
            var taxonomiesArray = [];
            if (taxonomiesArray.length > 0){
                view.filters.push({
                    property: 'Taxonomy',
                    value: taxonomies,
                    id: 'taxonomy'
                });
            }
        }
        
        if (view.record && !view.filterByParentTaxonomy){
            view.filters = [
                {
                    property: record.get('ObjectTypeName')+':RelationParent',
                    value: record.get('Id')
                }
            ]
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getPersonSearchModelModel(),
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
    
    onItemClick: function(view,record,item,index,e,options){
        if (!view.up('panel').multiSelect) {
            var win = view.up('window');
            var caller = win.view;
            caller.fireEvent('personchanged',record,caller);
            win.close();
        }
    },

    
    onSelectedClick: function(button, event, options){
        var view = button.up('personhelperview');
        var selected = view.getSelectionModel().getSelection();
        var win = view.up('window');
        var caller = win.view;
        caller.fireEvent('personselected',selected,caller);
        win.close();
    },
    
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('persongridview');
        var store = view.getStore();
        store.clearFilter(false);
        store.filter(view.filters);
        view.down('#query').setValue('');
        view.down('#fieldName').setValue('');
        
        var taxonomytree = view.query('taxonomiesmastertree')[0]; 
        var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
        var taxonomiesArray = [];
        Ext.Array.each(taxonomiesSelected, function (rec) {
            if (rec.get('checked'))
            rec.set('checked', false)
        },this);
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('persongridview');
        
        var store = view.getStore();
        var query = view.down('#query').getValue();
        var field = view.down('#fieldName').getValue();
        
        var taxonomytree = view.query('taxonomiesmastertree')[0];
        var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
        //var taxonomiesSelected = taxonomytree.getSelectionModel().getSelection();
        
        
        var taxonomiesArray = [];
        Ext.Array.each(taxonomiesSelected, function (rec) {
            if (rec.get('checked'))
            taxonomiesArray.push(rec.get('Id'));
        },this);
        
        var taxonomies = taxonomiesArray.join();

        var filters = Ext.clone(view.filters);
        
        if (field)
            filters.push({ 
                property: field+':LIKE',
                value: query,
                id: 'Name'
            });
        
        var orChk = view.down('#or');
        var or = orChk.checked?':OR':'';
        
        
        if (taxonomiesArray.length > 0){
            filters.push({
                property: 'Taxonomy'+or,
                value: taxonomies,
                id: 'taxonomy'
            });
        }
        
        if (filters.length>0)
            store.filter(filters);
            else
            store.clearFilter();
    }

});