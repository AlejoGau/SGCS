//MIGRADO2024
Ext.define('Common.controller.ParticionesCopyFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ParticionesCopyFormView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
		
            'particionescopyformview' : {
                beforerender : this.initview,
			},
           
            'particionescopyformview button[action=cancel]': {
                click: this.onCancelClick
            },
            'particionescopyformview button[action=save]': {
                click: this.onSaveClick
            }
		});
	}, // cierro init
	initview : function(view) {
        console.log('view.selection: ',view.selection);                       
	},
    
    
    
    
    onSaveClick : function(button, event, options) {
        var view = button.up('particionescopyformview');
    	var myform = view.getForm();
        var win =  button.up('window');
        var values = myform.getValues();
        var record = view.record;
        var cuenta = view.cuenta;
        var controller = this;
        var selection = view.selection;
        
        if (myform.isValid()){
           
           
            for(var key in selection) {
                                
                
                Ext.Ajax.request({
                      url: '/Rest/Search/CuentaCopy',
                      params: { 
                            cue_clinea: selection[key].get('zon_cdealer'), 
                            cue_ncuenta: Ext.String.leftPad(selection[key].get('zon_ccuenta'),4,'0'),
                            cue_cnombre: selection[key].get('zon_cdescripcion'),
                            cue_iid: view.callerView.record.get('Id'),
                            setParticionInfo : 1,
                            skipTabPrincipal : controller.valorCheckbox(view.down('#principal').getValue()) ,
                            skipTabUsuarios : controller.valorCheckbox(view.down('#usuarios').getValue()),
                            skipTabContactos : controller.valorCheckbox(view.down('#contactos').getValue()),
                            skipTabZonas : controller.valorCheckbox(view.down('#zonas').getValue()),
                            skipTabNotas : controller.valorCheckbox(view.down('#notas').getValue()),
                            skipTabHorarios : controller.valorCheckbox(view.down('#horarios').getValue()) ,
                            skipTabInformacionMedica : controller.valorCheckbox(view.down('#medica').getValue()),
                            skipTabNotificaciones : controller.valorCheckbox(view.down('#notificaciones').getValue()),
                            skipTabFalsa : 1,
                            skipTabTest : 1,
                            skipTabPaneles : 1,
                            skipSchedule: controller.valorCheckbox(view.down('#schedule').getValue()),
                      },
                      method: 'GET',
                      scope: this,
                      success: function(response){
                          
                          notify('Se actualizo con exito '+selection[key].get('zon_cdealer')+" - "+ Ext.String.leftPad(selection[key].get('zon_ccuenta'),4,'0'));
                      }
                });
             
            }
            win.close();
        }
	},
    
    valorCheckbox : function (value) {
        if(value) {
            return 0;
        } else {
            return 1;
        }
    },
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
      
        myWin.close();
    }
});