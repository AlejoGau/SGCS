//MIGRADO2024
Ext.define('Common.controller.GeographyController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ 'GeographyModel', 'GeographybyparentModel' ],
    views : [ 'ExtUxNotification', 'GeographyManagerTreeView' ],
    init : function(config) {
        // genero los eventos
		this.control({
            'geographymanagertree' : {
                afterrender : this.initView,
                itemcontextmenu : this.onItemContextMenu,
                edit: this.onEdit
    		},
    		'geographymanagertree button[action="geographySave"]' : {
				click : this.onSaveClick
			}
		});
	}, // cierro init
    
    initView: function(view){
    },
    onSaveClick : function(button, event, options) {
        var view = button.up('geographymanagertree');
        this.treeSync(view);
	},
    treeSync: function(view){
        var model = this.getGeographyModelModel();
		var store = view.getStore();
        var oldproxy = store.model.getProxy();
        store.setConfig({
            proxy: model.getProxy()
        });

        store.sync({callback: function(batch){
            Ext.Array.each(batch.operations, function(operation, index, array){
                if (!operation.success)
                {
                    notifyError('No se pudo guardar el cambio. El registro modificado puede estar asociado a otros datos');
                }
                store.setProxy(oldproxy);

                store.getRootNode().removeAll();
                store.load();    
                            
            })
        }});
    },
    
    onEdit: function(editor){
        var record = editor.context.record;
        var value = editor.context.value;
        
        record.set('Name',value);
        var view = editor.getCmp();
        this.treeSync(view);
    },
    
    onItemContextMenu: function(view,record,item,index,e) {
        e.stopEvent();
        var controller = this;
        var parent = view.up('geographymanagertree');
        if (record){
            if (!view.contextMenu){
                view.contextMenu = new Ext.menu.Menu({
                    record: record,
                    items: [
                        {
                            text: 'Nuevo Lugar',
                            iconCls: 'icon-Geography-add',
                            handler: this.onGeographyAdd,
                            parent: parent,
                            scope: controller
                        },
                        {
                            text: 'Eliminar Lugar',
                            iconCls: 'icon-Geography-delete',
                            handler: this.onGeographyDel,
                            parent: parent,
                            scope: controller
                        }
                    ]
                });
            }
            else{
                view.contextMenu.record = record;
            }
        } 
        view.contextMenu.showAt(e.xy);
    },
    
    onGeographyAdd: function(button, event, options) {        
        var menu = button.up('menu');
        var view = button.parent;
        var record = menu.record;
        var child = record.appendChild({
            Name: getLocale('Nuevo Lugar'),
            Parent: record.get('Id')
        });
        this.treeSync(view);
    },
    
    onGeographyDel: function(button, event, options) {        
        var menu = button.up('menu');
        var view = button.parent;
        var record = menu.record;
        var controller = this;
        
        //-------remove de nodos provincias --
         /*var mystore =Ext.create('Ext.data.Store',{
            model: this.getGeographyModelModel(),
            remoteFilter:true,
            filters:[{
                property:'pro_iParentID',
                value: record.get('Id')
            }]
        }).load({
            callback:function (records) {
                console.log('Padres de provincia');
                for(var i = 0 ; i < records.length ; i++){
                    mystore.remove(records[i]);
                    mystore.sync();
                }
                record.remove();
                controller.treeSync(view);                
            }
        });*/
        this.onRecursiveDelete(record.get('Id'),record,view);
        record.remove();
        this.treeSync(view);
        //-----------------------------
    },
    onRecursiveDelete(id,rootRecord,view){
         var controller = this;
         var mystore =Ext.create('Ext.data.Store',{
            model: this.getGeographyModelModel(),
            remoteFilter:true,
            filters:[{
                property:'pro_iParentID',
                value: id
            }]
        }).load({
            callback:function (records) {
                console.log('Padres de provincia');
                for(var i = 0 ; i < records.length ; i++){
                    controller.onRecursiveDelete((records[i]).get('Id'),rootRecord,view);
                    mystore.remove(records[i]);
                    
                    mystore.sync();
                    
                    
                }
                
                if(id == rootRecord.get('Id')){
                    mystore.remove(rootRecord);
                    
                    mystore.sync();
                }
                               
            }
        });
    }
});