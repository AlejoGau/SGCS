//MIGRADO2024
Ext.define('Common.controller.SmsAWCCGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmsAWCCSearchModel' ],
    views : [ 'SmsAWCCGridView' ],
    init : function(config) {
        // genero los eventos
		this.control({
			'smsawccgridview' : {
				afterrender : this.initView
			},
            'smsawccgridview button[action=search]' : {
                click: this.onSearchClick
            }
		});
	}, // cierro init
    
	initView : function(view) {
        var record = view.record;
        
		var store = Ext.create('Ext.data.Store', {
            model : this.getSmsAWCCSearchModelModel(),
            remoteFilter: false,
        	autoload: false
        });
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        view.bindStore(store);
        
        if (record){
            store.load({params:{cue_iid: record.get('cue_iid')}});
        } else {
            store.load();
        }
        
	},
    
    
    onSearchClick: function(button){
        var view = button.up('llamadagridview');
        var store = view.getStore();
        var estado = view.down('#estado');
        
        var filters = [];
        
        if (estado.getValue()){
            filters.push({ 
                property: 'stc_nestado',
                value: estado.getValue(),
                id: 'estado'
            });
        }
        
        store.filter(filters);
    }
});