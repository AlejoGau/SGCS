//MIGRADO2024
Ext.define('Common.controller.t_monitoreo_dealerFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_monitoreo_dealerModel', 'OrganizationSearchModel', 't_monitoreo_dealerSearchModel' ],
    views : [ 't_monitoreo_dealerFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
					't_monitoreo_dealerformview' : {
						beforerender : this.initview
					},
					't_monitoreo_dealerformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				
                });
	}, // cierro init
	initview : function(view) {
        view.loadRecord(view.record);
        
        if(view.record.get('tmd_diasemana') == 0) {
            view.down('#diasemana').setValue(1)
        }
        
        view.down('#organizacion').setValue(view.record.get('tmd_iorganizacion'))
	
	},
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_monitoreo_dealerformview');
        var win = button.up('window');
		var record = myform.getRecord();
    	var controller = this
		myform.updateRecord(record);
        
        
        if(view.down('#organizacion').getValue() == ''  || view.down('#organizacion').getValue() == 0) {
            notify('Debe seleccionar una organizacion.')
            return false;
        }
        
        var horadesde = view.down('#tmd_horadesde').getValue()
        var horahasta = view.down('#tmd_horahasta').getValue()
        var horadesdeFinal = Ext.Date.format(horadesde,'H:i')
        var horahastaFinal = Ext.Date.format(horahasta,'H:i')
        
        if(horadesde >= horahasta) {
            notify('El horario desde no puede ser meno o igual al horario hasta.')
            return false;
        }
        
        
        
        
        Ext.create('Ext.data.Store',{
                model: controller.getT_monitoreo_dealerSearchModelModel(),
                pageSize: 999,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property:'tmd_clinea',
                    value: view.record.get('tmd_clinea')
                },{
                    property:'tmd_iorganizacion',
                    value: view.down('#organizacion').getValue()
                },{
                    property:'tmd_idkey:NOT',
                    value: view.record.get('Id')
                }]
            }).load({callback:function (records) {
                
                
               
                 //verifico colicion
                var colicion = false;
                //Ext.Array.each(dias,function (iddia,k) {
                    
                   
                    Ext.Array.each(records,function (rec) {
                        if(view.down('#diasemana').getValue() == rec.get('tmd_diasemana')) {
                            if(parseInt(rec.get('tmd_horadesde').replace(':','')) <= parseInt(horahastaFinal) &&
                                parseInt(rec.get('tmd_horahasta').replace(':','')) >= parseInt(horadesdeFinal) ) {                                    
                                    colicion = true
                                }
                        }
                        
                    })
                //})
                 
                if(colicion) {
                    
                   
                    
                    Ext.MessageBox.alert('No se pudo crear', 'No se permiten días y horarios solapados, revise los datos para poder guardar', function() {
                           //action to complete when user clicks ok.
                     });
                     return false;
                } 
    
                 record.set('tmd_iorganizacion',view.down('#organizacion').getValue())
                 record.set('tmd_horadesde', horadesdeFinal)
                 record.set('tmd_horahasta', horahastaFinal)
                 
        
              
                if (myform.isValid()){


                    record.setConfig({
                        proxy: controller.getT_monitoreo_dealerModelModel().getProxy()
                    });

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
        
            }})
	},
    
   
	
   
});