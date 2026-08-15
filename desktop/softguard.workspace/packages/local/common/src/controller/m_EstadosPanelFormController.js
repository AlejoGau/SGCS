//MIGRADO2024
Ext.define('Common.controller.m_EstadosPanelFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardCodigoAlarmaModel', 'UsuarioSearchModel', 'm_EstadosPanelModel' ],
    views : [ 'm_EstadosPanelFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
					'm_estadospanelformview' : {
						beforerender : this.initview
					},
					'm_estadospanelformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				
                });
	}, // cierro init
	initview : function(view) {
        
       view.loadRecord(view.record)
       if(view.recordCuenta) {
            var filtroParaUsuario = [{
                property:'usu_iidcuenta',
                value:view.record.get('mep_idCuenta')
            }]
            
            view.down('#mep_iUsuarioControl').filter = filtroParaUsuario 
            view.down('#mep_iUsuarioEsperado').filter = filtroParaUsuario 
            
        }
        
        //if(view.record && view.record.get('Id') > 0) {
            view.down('#mep_iAutoProcesa').setValue(view.record.data.mep_iAutoProcesa)
            view.down('#mep_cAlarmaControl').setValue(view.record.data.mep_cAlarmaControl)
            view.down('#mep_iUsuarioControl').setValue(view.record.data.mep_iUsuarioControl)
            view.down('#mep_cAlarmaEsperada').setValue(view.record.data.mep_cAlarmaEsperada)
            view.down('#mep_iUsuarioEsperado').setValue(view.record.data.mep_iUsuarioEsperado)
            view.down('#mep_iMinutos').setValue(view.record.data.mep_iMinutos)
            view.down('#mep_cAlarmaAGenerar').setValue(view.record.data.mep_cAlarmaAGenerar)
        //}
	},
	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('m_estadospanelformview');
        var win = button.up('window');
		var record = myform.getRecord();
        var controller = this;
		myform.updateRecord(record);
        
        if(!view.down('#mep_cAlarmaAGenerar').getValue()) {
            notify('Alarma a generar es requerido')
            return false;
        }
        if(!view.down('#mep_iMinutos').getValue()) {
            notify('Minutos es requerido')
            return false;
        }
        /*
        if(!view.down('#mep_iUsuarioEsperado').getValue()) {
            notify('Usuario esperado es requerido')
            return false;
        }
        */
        // se pide que no sea requerido, pablo cas 5/4/2019
        if(!view.down('#mep_cAlarmaEsperada').getValue()) {
            notify('Alarma a esperada es requerido')
            return false;
        }
        /*
        if(!view.down('#mep_iUsuarioControl').getValue()) {
            notify('Usuario control es requerido')
            return false;
        }
        */
        if(!view.down('#mep_cAlarmaControl').getValue()) {
            notify('Alarma a control es requerido')
            return false;
        }
       
        
      
        if (myform.isValid()){
            
            record.set('mep_cAlarmaAGenerar',view.down('#mep_cAlarmaAGenerar').getValue())
            record.set('mep_iMinutos',view.down('#mep_iMinutos').getValue())
            record.set('mep_iUsuarioEsperado',view.down('#mep_iUsuarioEsperado').getValue())
            record.set('mep_cAlarmaEsperada',view.down('#mep_cAlarmaEsperada').getValue())
            record.set('mep_iUsuarioControl',view.down('#mep_iUsuarioControl').getValue())
            record.set('mep_cAlarmaControl',view.down('#mep_cAlarmaControl').getValue())
            record.set('mep_iAutoProcesa',view.down('#mep_iAutoProcesa').getValue())
            
            

            record.setConfig({
                proxy: controller.getM_EstadosPanelModelModel().getProxy()
            });


            if(isNaN(record.id)){
                record.id = 0;
                record.data.Id = 0;
            }

            record.modified = record.data;

    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }
	},
    
   
	
   
});