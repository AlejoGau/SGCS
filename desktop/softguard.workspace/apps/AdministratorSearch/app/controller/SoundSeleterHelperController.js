Ext.define('AdministratorSearch.controller.SoundSeleterHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoundsSearchModel' ],
    views : [ 'SoundSeleterHelperView', 'UploadButton' ],

    init : function(config) {
        // genero los eventos
		this.control(
            {
			'soundsgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick
			}
		});
	},
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('soundsgridview');

        if(view.caller) {
            view.caller.fireEvent('soundSelected', record,view.caller)
        }   

        view.up('window').close()
        
    }, 

	initView : function(view) {
        var searchName = 'SoftguardMiscFile';
      
        
        view.path = 'codAlarmSound/';
        view.searchName = searchName;
        
      
        
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getSoundsSearchModelModel(),
            searchName: searchName ,
            path: view.path,
            type: 'File',
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            listeners: {
                beforeload: function(store,operation) {
                    operation.scope = store;
                }
            }
           
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        store.load();
	}

});