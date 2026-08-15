Ext.define('WebRemoto.controller.DocumentosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'DocumentosSearchModel' ],
    views : [ 'DocumentosGridView' ],

    init : function(config) {
        // genero los eventos
		this.control(
            {
			'documentosnewgridview' : {
				afterrender : this.initView
			}
		});
	},

	initView : function(view) {
        var searchName = 'SoftguardMiscFile';
        var module = view.module;
        var profile = module.get('profile');
        var record = view.record;
        
        if (record.get('ObjectTypeName') == 'Cuenta' || record.get('ObjectTypeName') == 'EventosPendientes'){
             var path ='Docs/'+Ext.util.Format.trim(record.get('cue_clinea')+"-"+record.get('cue_ncuenta'))+"/";
        } else {
             var path ='Docs/'+record.get('ObjectTypeName')+"/"+record.get('cue_iid')+"/";
        }
       
        view.path = path;
        view.searchName = searchName;
        
        view.profile = profile;
        
        if (profile < 2){
            view.down('toolbar').hide();
        }
        
        
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getDocumentosSearchModelModel(),
            searchName: searchName ,
            path: path,
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