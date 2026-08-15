//MIGRADO2024
Ext.define('Common.controller.LlamadasJuridiccionalesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'LlamadasJuridiccionalesGridView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
			'llamadacontactarjuridiccionalesgridview' : {
				afterrender : this.initView
			}
		});
	}, // cierro init
    
	initView : function(view) {
        
        var record = view.record;        
        var filter = [];   
        
        //si no tengo el parametro escondo la columna 
        var DSSLLAMADASIMPLE = getParametro('DSSLLAMADASIMPLE');
        if(DSSLLAMADASIMPLE == 0) {
            if (view.down('[xtype=actioncolumn]')) {
                view.down('[xtype=actioncolumn]').setVisible(false);   
            }
        }
        
	}
    
    
});