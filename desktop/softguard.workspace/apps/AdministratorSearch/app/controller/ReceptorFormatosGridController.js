Ext.define('AdministratorSearch.controller.ReceptorFormatosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ReceptorFormatosModel', 'ReceptorFormatosSearchModel' ],
    views : [ 'ReceptorFormatosGridView' ],

    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'receptorformatosgridview' : {
				afterrender : this.initView
			}
		});
	},

	initView : function(view) {
        view.filters = [];
        var record = view.record;

        view.filters = [
            {
                property: 'o.rec_iid',
                value: record.get('rec_iid').toString()
            }
        ]

        var store =Ext.create('Ext.data.Store',{
            model: this.getReceptorFormatosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
	} 
});