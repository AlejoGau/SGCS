Ext.define('WebRemoto.controller.PanelDescripcionByEventoController', {
    extend: 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardPanelModel', 'SoftguardTablaPanelesModel' ],
    views : [ 'PanelDescripcionByEventoView' ],

    init : function(config) {
    	this.control({
			'paneldescripcionbyeventoview' : {
				afterrender : this.initView
			},
            
		});
	}, // cierro init
    
    
    
	initView : function(view) {
        
        var record = view.record;
        
        var idcuenta = record.get('rec_iidcuenta');
        var controller = this;
      
        
            var model = controller.getSoftguardPanelModelModel();
            
            model.load(idcuenta, {callback: function (record,operation) {
                               
                var store =Ext.create('Ext.data.Store',{
                    model: controller.getSoftguardTablaPanelesModelModel()
                })
                
                store.load({ 
                    ObjectId: idcuenta,
                    callback : function(records, operation, success) {
                        if(success) {
                             
                          
                             Ext.Array.each(records, function(recordx){
                                 
                                 if(recordx.get('Codigo') == record.get('pan_ccodigo')) {
                                     view.down('#descripcion').setValue(recordx.get('Descripcion') + "<br>" + recordx.get('Observacion'));
                                 }
                                
                             })
                        }                  
                        
                       
                    }});
                
                
            }});
                    
        
        
       
	}
    
    
});