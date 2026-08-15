Ext.define('SgAppSerTec.controller.AsignarMovilController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasMovilesPatrullaSearchModel', 'TablasMovilesPatrullaModel', 'ServTecModel' ],
    views : [ 'AsignarMovilView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'asignarmovilgridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick
               
			},
            'asignarmovilgridview button[action=search]': {
                click: this.onSearchClick
            },
            'asignarmovilgridview button[action=getall]': {
                click: this.onGetAllClick
            }
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasMovilesPatrullaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
	},
    
    
    
    
  
    

    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('asignarmovilgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('asignarmovilgridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        var filters = Ext.clone(view.filters);
        
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    
    onItemClick: function (grid,record,item,index,e,options){
        var view = grid.up('asignarmovilgridview');
        var recordMovil = record;
        var selection = view.selection;
        
        var cantidad = selection.length;
        for(var key in selection) {
            
            
            
            var model = this.getServTecModelModel();
            
            model.load(selection[key].get('Id'), {callback: function (record) {
                
                record.set('stc_cmovil_1',recordMovil.get('tmp_cnumero'));
               

                record.save({callback: function(records,operation ){ 
                    
                    if(cantidad >= key) {
                
                        view.caller.fireEvent('objectchanged', record,view.caller);
                        
                        
                        view.up('window').close();
                        
                    }
                
                }});
            
            
            }})
            
            
            
        }
        
        
    }

});