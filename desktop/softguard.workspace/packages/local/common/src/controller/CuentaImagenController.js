//MIGRADO2024
Ext.define('Common.controller.CuentaImagenController', {
    extend: 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardCuentaModel' ],
    views : [ 'CuentaImagenView' ],
	init : function(config) {
		this.control({
			'cuentaimagenview' : {
				afterrender : this.initView
			},
            
		});
	}, // cierro init
    
    
    
	initView : function(view) {
        var viewport = view.up('cuentaview')?view.up('cuentaview'):view;
        var record = view.record;
        var photo;
        console.log('view-------aaaa', view)
        if (view.cue_cfoto){
            photo = view.cue_cfoto;
        } else {
            if (!record){
                record = viewport.cuenta;
                view.record = record;
            }
            
            if (view.cuenta){
                record = view.cuenta;
                view.record = record;
            }
            photo = record.get('cue_cfoto');
        }
        
        view.down("#cuentaFotoImage").setSrc('/gallery/' +photo);
       
	}
    
    
});