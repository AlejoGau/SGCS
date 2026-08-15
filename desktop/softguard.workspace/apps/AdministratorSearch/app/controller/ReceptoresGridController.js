Ext.define('AdministratorSearch.controller.ReceptoresGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ReceptoresCabUNIQUEModel', 'ReceptoresModel', 'ReceptoresSearchModel', 'm_receptores_cabSearchModel' ],
    views : [ 'ReceptoresGridView' ],

    init : function(config) {
        // genero los eventos
		this.control(
            {
			'receptoresgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick
			},
            'receptoresgridview button[action=search]': {
                click: this.onSearchClick
            },
            'receptoresgridview button[action=getall]': {
                click: this.onGetAllClick
            },
           
		});
	},

	initView : function(view) {
        view.filters = [];
        var record = view.record;
            
        var store =Ext.create('Ext.data.Store',{
            model: this.getReceptoresCabUNIQUEModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: 'rec_cdescripcion'
        })
        view.bindStore(store);
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
        
	},
    
    
    
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('RowNumber');
        
        var view = grid.up('receptoresgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('rec_cdll')+') '+record.get('rec_cdescripcion');       
        
        var model = this.getReceptoresModelModel();
        
        record.setConfig({
            proxy: model.getProxy()
        });
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
    	if (!mytab) {
            var newTab = Ext.widget('receptorview', {
                iconCls: 'icon-transmit',
    			title : title,
                translate:false,
                parent: view.record,
                targetTab: panel,
                record: record,
    			objectId : id,
    			closable : true
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    }, 
    
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('receptoresgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('receptoresgridview');
        
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