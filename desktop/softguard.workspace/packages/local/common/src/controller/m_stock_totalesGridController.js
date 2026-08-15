//MIGRADO2024
Ext.define('Common.controller.m_stock_totalesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_stock_totalesSearchModel' ],
    views : [ 'm_stock_totalesGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'm_stock_totalesgridview' : {
                afterrender : this.initView
    		},
            'm_stock_totalesgridview button[action=search]': {
                click: this.onSearchClick
            },
            'm_stock_totalesgridview button[action=getall]': {
                click: this.onGetAllClick
            }
            
		});
	},
    
	initView : function(view) {
        
        if(view.readOnly) {
            view.down('toolbar').hide()
        }
        
        
        view.filters = [];
        
        if(view.record) {
            view.filters.push({
                property:'stt_iddeposito',
                value: view.record.get('Id')
            })
           
        }
       
       
        view.store =Ext.create('Ext.data.Store',{
            model: this.getM_stock_totalesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        
        
        
       
        
     
	},
  
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('m_stock_totalesgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
       // view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('m_stock_totalesgridview');
        
        var store = view.getStore();       
      
        var filters = Ext.clone(view.filters);
        
        
        store.clearFilter(true);
        
        if (view.down('#producto').getValue()){
            filters.push({ 
                property: 'p.[Name]:LIKE',
                value: view.down('#producto').getValue()
            });
            
        }
               
        store.filter(filters);
       
       
    },
   
});