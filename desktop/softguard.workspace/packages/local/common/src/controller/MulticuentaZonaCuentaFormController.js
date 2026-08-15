//MIGRADO2024
Ext.define('Common.controller.MulticuentaZonaCuentaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ZonasSearchModel', 'SoftguardZonaModel' ],
    views : [ 'MulticuentaZonaCuentaFormView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
            'multicuentazonacuentaformview' : {
                beforerender : this.initview,
			},
            /*'multicuentazonacuentaformview #particion' : {
                change : this.onParticionChange
            },*/
            'multicuentazonacuentaformview button[action=cancel]': {
                click: this.onCancelClick
            },
            'multicuentazonacuentaformview button[action=save]': {
                click: this.onSaveClick
            }
		});
	}, // cierro init
	initview : function(view) {
        var controller = this;
        var comboCuenta = view.down('#cuentas');
        
        if(!view.store) {
           var list = new Array();
           Ext.Array.each(view.particiones, function(record){
                list.push(record.get('cue_iid'));
            });
           var listString = list.join(",");                     
            var mystore =Ext.create('Ext.data.Store',{
            model: controller.getZonasSearchModelModel(),
                remoteFilter: true,
                pageSize: 500,
                remoteSort: false,                 
                    filters: [
                        {
                            property: 'zon_ccodigo:LIKENOT',
                            value: 'PAR'
                        },{
                            property: 'zon_ccodigo:NOT',
                            value: '0'
                        },{
                            property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                            value: ''
                        },{
                            property: 'zon_iidcuenta:ININT',
                            value:listString
                        }/*,{
                            property: 'zon_iidcuenta',
                            value:record.get('cue_iid')
                        }*/
                    ]
                });
                
                
                comboCuenta.bindStore(mystore);  
              
                mystore.load({callback: function(){
                    var zonaModel = controller.getZonasSearchModelModel();
                    zonaModel.load(record.get("Id"),{
                        callback: function(recZone){
                            view.loadRecord(recZone);
                            view.record = recZone;
                        }
                    });
                    
                }});
            
        } else {
            comboCuenta.bindStore(view.store); 
            var zonaModel = controller.getSoftguardZonaModelModel();
            zonaModel.load(view.record.get("Id"),{
                callback: function(recZone){
                    view.loadRecord(recZone);
                    view.record = recZone;
                }
            });            
            
        }
     
	},
    
    
    
    
    onSaveClick : function(button, event, options) {
        var view = button.up('multicuentazonacuentaformview');
    	var myform = view.getForm();
        var win =  button.up('window');
        var values = myform.getValues();
        var record = view.record;
        var cuenta = view.cuenta;
        var controller = this;
        button.disable();
        var combo = view.down('#cuentas');
        
        var mystore =Ext.create('Ext.data.Store',{
            model: controller.getZonasSearchModelModel(),
            remoteFilter: true,
            pageSize: 500,
            remoteSort: false,                 
            filters: [
                {
                    property: 'zon_ccodigo',
                    value: record.get('zon_ccodigo')
                },{
                    property: 'zon_iidcuenta',
                    value: combo.getValue()
                }
            ]
        });
        
        mystore.load({callback: function(records){
         if (records.length == 0){
             myform.updateRecord(record);
             
             record.save({
                callback: function(record){
                    notify('El registro se guardo correctamenter');
                    if(view.caller){
                        view.caller.getStore().load();
                    }
                }
             });
             win.close();
         } else {
             notifyError('Ya existe ese código de zona en la cuenta destino')
         }
        }})
	},
     
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
      
        myWin.close();
    }
});