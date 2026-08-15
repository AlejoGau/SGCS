//MIGRADO2024
Ext.define('Common.controller.SPReadOnlyController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartPanicSearchModel', 'SmartPanicModel', 'UsuarioSearchModel', 'SmartPanicGpsModel' ],
    views : [ 'SPReadOnlyView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'spreadonlyview' : {
    			afterrender : this.initView
            }
		});
        
	}, // cierro init
    
    initView: function(view){
        if(view.initStore){
            var record = view.initStore.data.items[0];
            var initModule = view.initModule;
            view.loadRecord(record);
        }
        
        /* var mystore =Ext.create('Ext.data.Store',{
            model: this.getUsuarioSearchModelModel(),
            filters: {
                property: 'usu_icodigo',
                value : initModule.get('rec_iusuario')
            }
        });                                
        mystore.load({callback: function (records,operation,success) {
            
            console.log(records);
        
        }});*/
       
     
    }
});