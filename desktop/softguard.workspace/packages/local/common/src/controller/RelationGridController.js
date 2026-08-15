//MIGRADO2024
Ext.define('Common.controller.RelationGridController', {
    extend: 'Ext.app.Controller',
        models : [ 'RelationModel', 'RelationSearchModel' ],
        stores : [ 'Common.store.RelationStore' ],
		views : [ 'RelationGridView' ],
    init: function () {
        // genero los eventos
        this.control({
            'relationgridview': {
                afterrender: this.loadData,
                itemdblclick: this.onItemClick
            },
            'relationgridview button[action=relationdelete]': {
                click: this.onDeleteClick
            },
            'relationgridview button[action=add]': {
                click: this.onAddClick
            },
            'relationgridview button[action=refresh]': {
                click: this.onRefreshClick
            },
            'relationformview' : {
    			objectchanged : this.onRelationChanged
			}
        });
    }, // cierro init
    
    loadData: function (panel) {
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getRelationSearchModelModel(),
            sorters: [
                {
                    property : 'ObjectName',
                    direction: 'ASC'
                }
            ]
        });
        
        var record = panel.record;
        if (record){
            var _ObjectId = panel.record.get('Id');
            var _ObjectTypeName = panel.record.get('ObjectTypeName');
            
            // una vez que cargue el store hago el binding con la view
            mystore.load({ObjectId:_ObjectId,ObjectTypeName:_ObjectTypeName,store:mystore,panel:panel,callback: this.doBindStore});
        }
        panel.controller = this;
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            var view = operation.panel;
            var paging = view.down('pagingtoolbar');
            view.bindStore(operation.store);
        }
    },
    
    onDeleteClick: function(button, object, options){
        var view= button.up('relationgridview');
        var controller = view.controller;
        var selected = view.selModel.getSelection();
        Ext.Msg.show({
             title:'Eliminar relaciones',
             msg: 'Se van a eliminar '+selected.length+' relaciones, está seguro?',
             buttons: Ext.Msg.YESNOCANCEL,
             icon: Ext.Msg.QUESTION,
             fn: function(btn, text){
                 if (btn == 'yes'){
                    Ext.Array.each(selected,function(record){
                        var model = controller.getRelationModelModel();
                        var relation = Ext.create(model,{
                            Id: record.get('RelationId')
                        })
            
                        relation.destroy({
                            record: record,
                            callback: function(records,operation){
                                if (operation.success){
                                    controller.onRelationChanged(view);
                                    notify('La relación se eliminó con éxito');
                                }
                            }
                        });
                    });
                }
             }
        });
    },
    
    onAddClick: function(button, object, options){
        var view= button.up('relationgridview');
        var myobject = view.record;
        var myModel = view.controller.getRelationModelModel();
        var record = Ext.create(myModel);
        record.set('ObjectTypeId',myobject.get('ObjectTypeId'));
        record.set('ObjectTypeName', myobject.get('ObjectTypeName'));
        record.set('ObjectId',myobject.get('Id'));
        
        // si el padre es razor o application clavo el hijo en razor
        if (myobject.get('ObjectTypeId') == 50 || myobject.get('ObjectTypeId') == 51){
             record.set('RelationObjectTypeId',50);
        }
        this.openFormWindow('Nueva Relación',record,view);
    },
    
    onRefreshClick: function(button, object, options){
        var view= button.up('relationgridview');
        this.onRelationChanged(view);
    },
    
    onItemClick: function(view,record,item,index,e,options){
        this.openObject(record,view.up('relationgridview'));
    },
    openObject : function(record,grid) {
        var myobject = grid.record;
        var view = grid;
        var myModel = view.controller.getRelationModelModel();
        if (record){
            myModel.load(record.get('RelationId'),{
                callback: function(rec, operation){
                    this.openFormWindow('Relación',rec,grid);
                }, 
                scope: this});
        } 
	},
    
    openFormWindow: function(title,record,grid){
        var newView = Ext.widget('relationformview',{
            record: record,
            callback: this.onFormEdit,
            scope: this,
            grid: grid
            }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: 250,
            width: 400,
            modal: true, 
            items: newView,
            layout: 'fit'
        }).show();
    },
    
    onRelationChanged: function(view){
        if(!view){
            view = Ext.ComponentQuery.query('relationgridview')[0];
        }
        
        var ObjectId = view.record.get('Id');
        var store = view.getStore();
        var ObjectTypeName = view.record.get('ObjectTypeName');
        
        store.load({
            ObjectId:ObjectId,
            store:store,
            panel:view,
            ObjectTypeName: ObjectTypeName
        });
    }
});