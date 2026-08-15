Ext.define('SGWebCrm.controller.AttachGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AttachModel', 'AttachSearchModel', 'm_aviso_programadoSearchModel' ],
    views : [ 'AttachGridView' ],

    init : function(config) {
    	// genero los eventos
		this.control(
            {
			'attachsearchview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit
			},
            'attachsearchview #btnBuscar' : {
                click: this.onSearchClick
            },
            'attachsearchview [action=create]' : {
                click: this.onCreateClick
			}
		});
	},

	initView : function(view) {
        var record = view.record;
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getAttachSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        
        if (record){
            var objectTypeName = record.get('ObjectTypeName');
            var objectId = record.get('Id');
            var url = '/Rest/'+objectTypeName+'/'+objectId+'/Attach';
            
            var proxy = store.model.getProxy();
            proxy.url = url;
        }
        
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
	},
    
    
    onSearchClick: function(button, event){
        var view = button.up('attachsearchview');
        var store = view.getStore();
        var query = view.down('#query');
        var id = view.down('#queryid');
        var filter = [];
        
        if (query)
            filter.push({ 
                property: 'Name:Like',
                value: query.getValue(),
                id: 'Name'
            })
            
        if (id)
            filter.push({ 
                property: 'Id',
                value: id.getValue(),
                id: 'Id'
            })
            
            
        store.filter(filter);
    },
    
    onItemClick: function(view,record,item,index,e,options){
        var id = record.get('Id');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '(Archivo: '+id+') '+record.get('Name');

        title = title.replace(',','');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
		if (!mytab) {
            var newTab = Ext.widget('attachview', {
    			title : title,
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
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    onObjectCreated: function(view){
        var record = view.record;
        var grid = view.caller;
        var paging = view.down('pagingtoolbar');
        
        paging.moveFirst();
        paging.doRefresh();
        this.onItemClick(grid, record);
    },
    
    onCreateClick: function(button, event, options) {        
        var targetTab = button.up('tabpanel'); 
        var view = button.up('attachsearchview');
        var record = view.record;
        var parentId = record.get('Id');
        var model = this.getAttachModelModel();
        var me = this;
        var text = 'Nuevo Archivo';
        

        if (record){
            var proxy = model.getProxy();
            var oldUrl = proxy.url;
            var url = '/Rest/'+record.get('ObjectTypeName')+'/'+parentId+'/Attach';
            
            
            proxy.url = url;
            var issue = Ext.create(model,{
                Name: text
            });
            
            issue.save({callback: function(record, operation){
                proxy.url = oldUrl;
                me.openObjectTab(targetTab,record);
            }});
        } else {
            var issue = Ext.create(model,{
                Name: text
            });
            
            issue.save({callback: function(record, operation){
                me.openObjectTab(targetTab,record);
            }});
        }
            
        
    },

    
    openObjectTab: function(tabpanel,record){
        title = record.get('Name').replace(/\,/g, '');
        var container = record.get('ObjectTypeName').toLowerCase() + 'view';
        
        var newTab = tabpanel.down('[title="' + title + '"]');
        if (!newTab){
            var newTab = Ext.widget(container, {
                title : title,
                border : false,
    			closable : true,
                record: record,
                objectId: record.get('Id'),
                targetTab: tabpanel,
                autoDestroy: true
    		});
            
            tabpanel.add(newTab);
        }
        
		tabpanel.setActiveTab(newTab);
    }

});