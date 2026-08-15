Ext.define('SGWebCrm.controller.MailAttachController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AttachModel', 'AttachSearchModel' ],
    views : [ 'MailAttachGridView' ],

    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'mailattachgridview' : {
				afterrender : this.initView,
                deleteattach: this.onDeleteAttach
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
        
        store.load();
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
    
    onDeleteAttach: function(record,view){
        var model = this.getSmartMailProgramAttachModelModel();
        //record.setProxy(model.getProxy());
        record.setConfig({
            proxy: model.getProxy()
        });
        record.destroy();
        view.getStore().load();
    }

});