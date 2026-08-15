//MIGRADO2024
Ext.define('Common.controller.LlamadaContactarGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AwccUsuariosByCuentaSearchModel', 'TablasTelefonosJuridiccionalesSearchModel', 'TelefonoSearchModel' ],
    views : [ 'LlamadaContactarGridView' ],
    init : function(config) {
        // genero los eventos
		this.control({
			'llamadacontactargridview' : {
				afterrender : this.initView
			}
		});
	}, // cierro init
    
	initView : function(view) {
        var record = view.record;        
        var filter = [];
        var storeTelefonos = Ext.create( 'Ext.data.Store', {
            model: this.getTelefonoSearchModelModel(),
            remoteFilter: true,
            autoload: false,
            remoteSort: true,
        });
        view.bindStore(storeTelefonos);
        
        //si no tengo el parametro escondo la columna 
        var DSSLLAMADASIMPLE = getParametro('DSSLLAMADASIMPLE');
        if(DSSLLAMADASIMPLE == 0) {
            if (view.down('[xtype=actioncolumn]')) {
                view.down('[xtype=actioncolumn]').setVisible(false);   
            }
        }
	}
});