//MIGRADO2024
Ext.define('Common.controller.LlamadasSmartpanicsGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'LlamadasSmartpanicsGridView' ],
    init : function(config) {
        // genero los eventos
        this.control({
			'llamadasmartpanicsgridview' : {
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
            if (view.down('[itemId=llamar]')) {
                view.down('[itemId=llamar]').setVisible(false);   
            }
        }
        
	}
    
    
});