
Ext.define('SmartPanics.controller.SpinBoxGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SpinBoxMessageSearchModel', 'SpinBoxMessageModel' ],
    views : [ 'SpinBoxGridView' ],

    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'spinboxgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectchanged: this.onObjectChange
			},
            'spinboxgridview button[action=search]': {
                click: this.onSearchClick
            },
            'spinboxgridview button[action=getall]': {
                click: this.onGetAllClick
            },
           
            'spinboxgridview button[action=nuevomensaje]' : {
        		click : this.onNewMessageClick
			}
            
            
		});
	},
    
    
    
    onObjectChange: function(view) {
        var controller = this;
        
        controller.initView(view)
    },


    onNewMessageClick: function(button, event, options) {  
            //var id = record.get('Id');
             var view = button.up('spinboxgridview');
            var title = 'Nuevo mensaje';
            
            //record.set('DateRead', new Date());
    
            var msgview = Ext.widget('spinboxformview', {
                iconCls: 'icon-table-edit',
                caller: view,
                cuenta: view.cuenta
             //   parent: view.record,
               // record: record,
            //    objectId : id,
    		});
            
            var win = Ext.create('Ext.window.Window', {
                title: title,
                height: 400,
                width: 600,
                layout: 'fit',
                items: msgview
            }).show();
        
    },
    
    initView : function(view) {
        
        
        
        var controller = this;
        
        if(view.cuenta) {
            view.filters = [
                                {
                                    property: 'ToId',
                                    value: view.cuenta.get('Id')
                                },{
                                    property:'ToTypeId',
                                    value:3067
                                }
                            ];   
                            
            controller.loadData(view)
        } else {
            Ext.Ajax.request({
                url : '/Rest/Security/UserData',        
        		success: function(response, action){
    					var infoUser = Ext.decode(response.responseText);
        
        
                        view.filters = [
                            {
                                property: 'ToId',
                                value: infoUser.udw_idKey
                            },{
                                property:'ToTypeId',
                                value:3067
                            }
                        ];      
                            
                        controller.loadData(view)               
        		}
            });
        }
    },
    
    loadData: function (view) {
        
        var controller = this;
        
        var store =Ext.create('Ext.data.Store',{
                model: controller.getSpinBoxMessageSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: view.filters
            });
            
            view.bindStore(store);
            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(store);
            
            store.load();
    },
    
    
    
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('spinboxgridview');
        var title = '('+record.get('Id')+') '+record.get('Name');
        


        var msgview = Ext.widget('spinboxroview', {
            iconCls: 'icon-table-edit',
            parent: view.record,
            record: record,
			objectId : id,
			closable : false
		});
        
        var win = Ext.create('Ext.window.Window', {
            title: title,
            height: 400,
            width: 600,
            layout: 'fit',
            items: msgview
        }).show();

    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('desktopmessagegridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('spinboxgridview');
        
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
        
       
    }


    

});




