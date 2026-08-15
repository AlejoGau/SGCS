Ext.define('AdministratorSearch.controller.ObjectForeignTableGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ObjectForeignTableModel', 'ObjectForeingTableSearchModel' ],
    views : [ 'ObjectForeignTableGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'objectforeigntablegridview' : {
				afterrender : this.initView,
                //itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit
			},
            'objectforeigntablegridview button[action=search]': {
                click: this.onSearchClick
            },
            'objectforeigntablegridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'objectforeigntablegridview button[action=add]': {
                click: this.onAdd
            },
            'objectforeigntablegridview button[action=save]' : {
        		click : this.onSaveClick
			},
            'objectforeigntablegridview button[action=delete]' : {
            	click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];
        
        view.controller = this;
        
        if (view.record){
            view.filters = [
                {
                    property: 'ParentTypeId',
                    value: view.record.get('ParentTypeId')
                },{
                    property: 'FieldName',
                    value: view.record.get('FieldName')
                }
            ]
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getObjectForeingTableSearchModelModel(),
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
    
   
   
    onAdd: function(button, event, options){
            
      
        var view = button.up('objectforeigntablegridview');
       
        var title = 'Editar Campo';
        
        
         model = this.getObjectForeignTableModelModel();
         
            var now = new Date();
            var record = model.create({
                ParentTypeId: view.record.get('ParentTypeId'),
                FieldName: view.record.get('FieldName'),
                NameText: 'texto',
                Name: 'código o clave'
    		});            
			record.save({
    			scope : this,
    			callback : function(record, operation) {
                      var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title : title,
                		closeAction : 'hide',
                        itemId: 'versionesWin',
            			width : 300,
            			height : 300,
            			border : true,
                        modal: true,
                        caller: view, 
                        iconCls: 'icon-brick-edit',
            			items : [
                            {
                                xtype: 'objectforeingtableformview',
                                record: record,
                                parent: view.record
                            }
                        ]
            		});
            		win.show();
    			}
			});
        
    },
   
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = 0;
        var title = 'Nuevo Campo';
        var view = grid.up('objectforeigntablegridview');
        
        console.log(record);
        var model = this.getObjectForeignTableModelModel();
        console.log(record.get('ParentTypeId')+' --');
        var bundle = Ext.create(model, {
            ParentTypeId: record.get('ParentTypeId'),
            ObjectTypeId: record.get('ObjectTypeId')
        })

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
        	title : title,
			closeAction : 'hide',
            itemId: 'versionesWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view: view, 
            iconCls: 'icon-brick-edit',
			items : [
                {
                    xtype: 'objectforeingtableformview',
                    record: record
                }
            ]
		});
		win.show();
        
    },    
    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


     onGetAllClick: function(button, event, options) {    
        
        var view = button.up('objectforeigntablegridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('objectforeigntablegridview');
        
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
    
    onSaveClick: function(button, event, options){
        var view = button.up('objectforeigntablegridview');

        var store = view.getStore();
        store.sync();
    },
    
    onDeleteClick: function(button, event, options){
        var view = button.up('objectforeigntablegridview');
        var controller = this;
        var selected = view.selModel.getSelection();
        Ext.Array.each(selected,function(record){
            var model = controller.getObjectForeignTableModelModel();
            record.setConfig({
                proxy: model.getProxy()
            }); 
            record.destroy();
        });
        
        view.getStore().load();
    }
    

});