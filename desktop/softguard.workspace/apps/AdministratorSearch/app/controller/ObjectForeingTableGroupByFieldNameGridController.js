Ext.define('AdministratorSearch.controller.ObjectForeingTableGroupByFieldNameGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SlbfObjectStore' ],
    models : [ 'ObjectForeignTableModel', 'ObjectForeignTableGroupByFieldNameModel', 'ObjectForeignTableGroupByFieldNameSearchModel', 'SblfObjectSearchModel' ],
    views : [ 'ObjectForeingTableGroupByFieldNameGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'objectforeigntablegroupbyfieldnamegridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit
			},
            'objectforeigntablegroupbyfieldnamegridview button[action=search]': {
                click: this.onSearchClick
            },
            'objectforeigntablegroupbyfieldnamegridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'objectforeigntablegroupbyfieldnamegridview button[action=add]': {
                click: this.onAdd
            }
		});
	},

	initView : function(view) {
        view.filters = [];
        
        view.controller = this;
        
        if (view.record){
            // espera un SlbfObject como record padre
            view.filters = [
                {
                    property: 'ParentTypeId',
                    value: view.record.get('Id')
                }
            ]
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getObjectForeignTableGroupByFieldNameSearchModelModel(),
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
    
    onAdd: function(button){
        var id = 0;
        var view = button.up('objectforeigntablegroupbyfieldnamegridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva tabla';
        
        var combo = button.ownerCt.down('#slbfObject');
        var parent = combo.findRecordByValue(combo.getValue());
        
        if (parent){
            model = this.getObjectForeignTableModelModel();
         
            var title = 'Editar Campo';
             
            var record = model.create({
                ParentTypeId: parent.get('Id'),
                FieldName: parent.get('Name'),
                NameText: 'texto',
                Name: 'código o clave'
            });
            
    		record.save({
    			scope : this,
    			callback : function(record, operation) {
                    notify('Los datos se grabaron con éxito');
                    view.down('pagingtoolbar').doRefresh();
    			}
    		});
        } else{
            notifyError('Debe seleccionar un esquema');
        }
        
    },    
    
    
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('RowNumber');
        var view = grid.up('objectforeigntablegroupbyfieldnamegridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('ParentTypeName')+' ('+record.get('FieldName')+')';

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('objectforeigntablegridview', {
                iconCls: 'icon-database',
    			title : title,
                parent: view.record,
                record: record,
                targetTab: panel,
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


     onGetAllClick: function(button, event, options) {    
        
        var view = button.up('objectforeigntablegroupbyfieldnamegridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        button.ownerCt.down('#slbfObject').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('objectforeigntablegroupbyfieldnamegridview');
        
        var store = view.getStore();
        var slbfObject = button.ownerCt.down('#slbfObject').getValue();
        
        var filters = Ext.clone(view.filters);
        
        
        if (slbfObject != ''){
            filters.push({ 
                property: 'ParentTypeId',
                value: slbfObject,
                id: 'objectFilter'
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