//MIGRADO2024
Ext.define('Common.controller.BundleGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'BundleSearchModel', 'BundleModel', 'RemoteBundleSearchModel' ],
    views : [ 'BundleGridView' ],
    init : function(config) {
        // genero los eventos
		this.control(
            {
			'bundlegridview' : {
				afterrender : this.initView,
                //validateedit: this.onEdit,
                itemdblclick: this.onItemClick
			},
            'bundlegridview button[action=bundledelete]' : {
				click : this.onDeleteClick
			}
		});
	},
	initView : function(view) {
        var filters = [];
        var record = view.record;
        
        view.controller = this;
        
        if (record){
            filters= [{
                     property: 'ObjectId',
                     value: record.get('Id')
                 },
                 {
                     property: 'ObjectTypeId',
                     value: record.get('ObjectTypeId')
                 }
            ];
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getBundleSearchModelModel(),
            pageSize: 50,
            remoteSort: false,
            remoteFilter: true,
            filters: filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        store.proxy.extraParams.list = true;
        store.load();
	},
    
    onItemClick: function(grid,record,item,index,e,options){
      
       var view = grid.up('bundlegridview');
        
        var id = record.get('Id');
        var title = record.get('Name')+' '+record.get('Version');
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
			title : title,
			closeAction : 'hide',
            itemId: 'versionesWin',
			width : 750,
			height : 550,
			border : true,
            translate: false,
            modal: true,
            view: view,  
            iconCls: 'icon-brick-edit',
			items : [
                {
                    xtype: 'bundleview',
                    objid: id
                }
            ]
		});
		win.show();
        
    },
    
    onDeleteClick: function(button, event, options){
        var view = button.up('bundlegridview');
        var controller = view.controller;
        var selected = view.selModel.getSelection();
        Ext.Array.each(selected,function(bundle){
            var bundleModel = controller.getBundleModelModel();
            bundle.setConfig({
				proxy: bundleModel.getProxy()
			});        
            bundle.destroy();
        });
        
        view.getStore().load({params:{list: true}});
    },
    
    /*onEdit: function(plugin, edit) {
        var view = edit.grid;
        var controller = view.controller;
        var record = edit.record;
        var bundleModel = controller.getBundleModelModel();
        record.set('Description', edit.value)
        record.save();
    }*/
});