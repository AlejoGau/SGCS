Ext.define('WeSafe.controller.ConfiguraLandingController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_encuestasModel', 'p_encuestasSearchModel', 'ConfiguraLandingModel', 'ConfuguraLandingSearchModel' ],
    views : [ 'ConfiguraLandingFormView', 'ConfuguraLandingView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
                'ConfuguraLandingView' : {
    			    afterrender : this.initView,
                    itemdblclick: this.onItemClick             
			    }
		    });
	},
    
	initView : function(view) { 
        view.store =Ext.create('Ext.data.Store',{
            model: this.getConfuguraLandingSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        
        view.store.load();
        
	}, 
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('ConfuguraLandingView');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('nombreForm');

        var view = Ext.widget('ConfiguraLandingFormView',{
            caller: grid,
            record: record,
            objectId : id,
        });
        
        var newTab = Ext.widget('ConfiguraLandingFormView',{
            record: record,
			tabConfig: {translate: false},
			translate: false,
			targetTab: panel,
			title: title,
			closable: true,
			closeAction: 'destroy',
			autoDestroy: true,
			caller: view,
			// Parche porque el autodestroy no quiere
		});
        /*var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
    		width : 750,
			height : 700,
			border : false,
			items : view
		});
		win.show();*/
        

        panel.add(newTab);
        panel.setActiveTab(newTab);
    },    
    
});