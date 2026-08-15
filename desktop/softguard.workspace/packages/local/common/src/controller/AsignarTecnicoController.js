//MIGRADO2024
Ext.define('Common.controller.AsignarTecnicoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ServTecModel', 'TecnicosSearchModel' ],
    views : [ 'AsignarTecnicoGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'asignartecnicogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick
               
			},
            'asignartecnicogridview button[action=search]': {
                click: this.onSearchClick
            },
            'asignartecnicogridview button[action=getall]': {
                click: this.onGetAllClick
            }
            
            
		});
	},
	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTecnicosSearchModelModel(),
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
        
        var view = button.up('asignartecnicogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('asignartecnicogridview');
        
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
        var view = grid.up('asignartecnicogridview');
        var recordTecnico = record;
        var selection = view.selection;
        
        var cantidad = selection.length;
        for(var key in selection) {
            
            
            
            var model = this.getServTecModelModel();
            
            model.load(selection[key].get('Id'), {callback: function (record) {
                
                record.set('stc_ctecnico_1',recordTecnico.get('tec_ccodigo'));
                if(record.get('stc_nestado') == 1) {
                    record.set('stc_nestado',2);
                }
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