Ext.define('AdministratorSearch.controller.TablasFormaDePagoFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SiNoStore' ],
    models : [ 't_formas_pago_fcModel', 'mg_maestrocuentasSearchModel', 't_organizacion_fcSearchModel', 'TablasFormaDePagoSearchModel', 't_tipos_formapago_fcSearchModel', 't_tipos_formapago_fcModel' ],
    views : [ 'TablasFormaDePagoFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				'tablasformadepagoformview' : {
						beforerender : this.initview
					},
					'tablasformadepagoformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'tablasformadepagoformview #nuevotipodepago' : {
						click : this.onNuevoTipoPagoClick
					}
    				
                });
	}, // cierro init
    
    onNuevoTipoPagoClick: function (btn) {
        var view = btn.up('tablasformadepagoformview')
        
        var title = 'Nuevo Tipo de forma de pago';
        
        
         record = this.getT_tipos_formapago_fcModelModel();
         
            
            var myobject = record.create({
         
			});            
		
                    
             var viewWin = Ext.widget('tablastipoformadepagoformview',{
                caller: view,
                record: myobject,
                callback: function () {
                    view.storeTipoFormaPago.load()
                }
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 300,
    			height : 300,
    			border : false,
    			items : viewWin
    		});
    		win.show();
    },
    
	initview : function(view) {
        
        var organizacionFacturadoraStore = Ext.create('Ext.data.Store',{
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#organizacionfacturadora').bindStore(organizacionFacturadoraStore);
        organizacionFacturadoraStore.load();
        
        var mgmcStore = Ext.create('Ext.data.Store',{
            model: this.getMg_maestrocuentasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'mgmc_ctipo',
                value:'CASH'
            }]
        })
        view.down('#fpg_mgmcidkey').bindStore(mgmcStore);
        mgmcStore.load();
        
        view.storeTipoFormaPago =Ext.create('Ext.data.Store',{
            model: this.getT_tipos_formapago_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#tipodepago').bindStore(view.storeTipoFormaPago);        
        view.storeTipoFormaPago.load();
        
        view.loadRecord(view.record);
        
	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablasformadepagoformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
      
        if (myform.isValid()){

            record.setConfig({
                proxy: this.getT_formas_pago_fcModelModel().getProxy()
            });

    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        if(view.callback) {
                            view.callback(record);
                        }
                        win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }

	}
    
   

	
   
});