Ext.define('AdministratorSearch.controller.ComoNosConocioGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'Taxo_ComoNosConocioSearchModel', 'TaxonomyModel', 'TaxonomyNewModel' ],
    views : [ 'ComoNosConocioGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
			'comonosconociogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                refresh: this.onRefresh
			},
            'comonosconociogridview button[action=search]': {
                click: this.onSearchClick
            },
            'comonosconociogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'comonosconociogridview button[action=add]': {
                click: this.onAdd
            },
            'comonosconociogridview button[action="delete"]' : {
        		click : this.onDeleteClick
			},
           
		});
	},
    onEventoClick: function (btn) {
        var view = btn.up('comonosconociogridview');
        var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                caller: view,
                filter: [{property:'cod_nManual', value:1}],
                simpleSelect: true
                
            }],
            layout: 'fit'
        }).show();

        myWindow.on('selectedEvents',function () {
            console.log(arguments)
        })
    },
    

    onRefresh : function (view,record) {
        view.store.load();
    },

	initView : function(view) {
        view.filters = [];
        var record = view.record;

        view.store =Ext.create('Ext.data.Store',{
            model: this.getTaxo_ComoNosConocioSearchModelModel(),
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
    
    onAdd: function(grid,record,item,index,e,options){
        var id = 0;
        var view = grid.up('comonosconociogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo item';
        var model = this.getTaxonomyModelModel();
        var newtaxo = Ext.create(model,{
            Id:0,
            Name: getLocale('Nuevo item'),
            text: getLocale('Nuevo item'),
            Parent: view.store.data.items[0].get('ParentId')
        });
        
        var newTab = Ext.widget('comonosconocioformview', {           
            translate: false,
            record: newtaxo,
            caller: view
        });
    
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
            title : title,
            closeAction : 'destroy',
            width : 450,
            height : 100,
            border : false,
            view : view,
            items : [newTab]
        }).show()
    },    
    
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('for_cdescripcion');
        var view = grid.up('comonosconociogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = getLocale('')+' '+record.get('Name');       
        

        if(record.get('editable') == 1) {
            notify('Este registro no puede ser editado.')
            return false;
        }
        
        this.getTaxonomyNewModelModel().load(record.get('Id'), {callback:function (recordx) {

        	var newTab = Ext.widget('comonosconocioformview', {          
                    translate: false,
                    record: recordx,
                    caller: view
        		});
            
             var win = Ext.create('Ext.Window', {
                layout : 'fit',
    			title : title,
    			closeAction : 'destroy',
                width : 450,
    			height : 100,
    			border : false,
                view : view,
    			items : [newTab]
             }).show()
                
                
    	
        }})
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('comonosconociogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('comonosconociogridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        //var filters = Ext.clone(view.filters);
        var filters = []
        
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query,
                id: fieldName
            });
        }
        
        if (view.down('#codevento').getValue() != ''){
            filters.push({ 
                property: 'for_calarma',
                value: view.down('#codevento').getValue()
                
            });
        }
        
        store.filter(filters);
        
    },
    
    
     onDeleteClick : function(button, event, options) {
        var model = this.getTaxonomyNewModelModel();
        var view = button.up('comonosconociogridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setConfig({
                    proxy: model.getProxy()
                });
                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            notify('Se eliminio exitosamente');
                            
                        }
                        else
                        {
                           notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }                    
                        view.store.load();
                }
                
            });
            
            },this);
            
            
        }
            	
	}
    


});