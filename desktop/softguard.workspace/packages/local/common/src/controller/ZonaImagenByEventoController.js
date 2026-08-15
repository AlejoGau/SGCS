//MIGRADO2024
Ext.define('Common.controller.ZonaImagenByEventoController', {
    extend: 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardZonaModel', 'ZonaSearchModel' ],
    views : [ 'ZonaImagenByEventoView' ],
    init : function(config) {
		this.control({
			'zonaimagenbyeventoview' : {
				afterrender : this.initView
			},
            
		});
	}, // cierro init
    
    
    
	initView : function(view) {
        
        var record = view.record;
        
        //var idcuenta = record.get('rec_iidcuenta');
        //var idzona = record.get('rec_czona');
        
        // NUEVO RECORD TRONCAL
        var img = view.record.getZonaImagen().zon_cimagen
        view.down("#zonaImagen").setSrc('/gallery/' +img);
        
        
        
       // if(idzona.trim() != '') {
      
           /* var store =Ext.create('Ext.data.Store',{
                model: this.getZonaSearchModelModel(),
                filters: [
                    {
                        property: 'zon_ccodigo',
                        value: idzona
                    },{
                        property: 'zon_iidcuenta',
                        value:idcuenta
                    }
                ]
            })*/
            
            /*store.load({ 
                ObjectId: idcuenta,
                callback : function(records, operation, success) {
                    if(success) {
                         Ext.Array.each(records, function(record){
                             console.log(idzona.trim()+"--"+record.get('zon_ccodigo').trim());
                             if(idzona.trim() == record.get('zon_ccodigo').trim()) {
                                 view.down("#zonaImagen").setSrc('/gallery/' +record.get('zon_cimagen'));
                                 return false;
                             }
                            
                         })
                    }                  
                    
                   
            }});*/
            
	}
    
    
});