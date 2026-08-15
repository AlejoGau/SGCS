Ext.define('Trackguard.controller.GeocercasProgramadasProgramFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'tg_route_programsModel', 'tg_route_programsSearchModel' ],
    views : [ 'GeocercasProgramadasProgramFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			'geocercasprogramadasprogramformview' : {
						beforerender : this.initview
					},
					'geocercasprogramadasprogramformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'geocercasprogramadasprogramformview #comboprogramtype' : {
						change : this.onProgramTypeChange
					}
    				
                });
	}, // cierro init
    
    
    onProgramTypeChange: function(combo, value, old){
        
        var view = combo.up('geocercasprogramadasprogramformview');
        
        view.down('#combodayofweek').hide();
        view.down('#combodayofmonth').hide();   
        view.down('#combodayofweek').setValue('');
        view.down('#combodayofmonth').setValue('');
        
        if(value == 3) {
            if(!view.record.get('Id')) {
                view.down('#combodayofweek').show();
            } else {
                view.down('#combodayofweekedit').setValue(view.record.get('dayofweek'));
                view.down('#combodayofweekedit').show();
            }
        } else if(value == 4) {
            view.down('#combodayofmonth').show();            
        }
    },

	initview : function(view) {
        var controller = this;
	    view.loadRecord(view.record);
        
        if(view.edit) {
            view.down('#horario1').hide();
            view.down('#horario2').hide();
            view.down('#horario3').hide();
            view.down('#horario4').hide();
            view.down('#horario5').hide();
            view.down('#horario').show();
        }
	},


	onSaveClick : function(button, event, options) {
	
		var myform = button.up('form').getForm();
        var view = button.up('geocercasprogramadasprogramformview');
		var record = myform.getRecord();

        var model = this.getTg_route_programsModelModel();        
        record.setConfig({
            proxy: model.getProxy()
        });


        var camposHorario = [
                    {"hora":"hours1", "minuto":"minutes1"},
                    {"hora":"hours2", "minuto":"minutes2"},
                    {"hora":"hours3", "minuto":"minutes3"},
                    {"hora":"hours4", "minuto":"minutes4"},
                    {"hora":"hours5", "minuto":"minutes5"}
                ];
        
        
 
        if(view.down('#comboprogramtype').getValue() == 3 && view.record.get('Id') == '') {
            
            myform.updateRecord(record); 
            var diasDeSemana = view.down('#combodayofweek').items.items;
            var diasDeSemanaLen = diasDeSemana.length;
            var i = 1;
            
            Ext.Array.each(diasDeSemana, function(r){
                
                    var win = view.up('window');     
                    record.set('dayofweek', r.inputValue )                    
                    if (r.checked == true && myform.isValid()){
                        
                        Ext.Array.each(camposHorario, function(campo){
                            
                                if(view.down("#"+campo.hora).getValue() && view.down("#"+campo.minuto).getValue()) {
                            
                                    record.set("starthour",view.down("#"+campo.hora).getValue());
                                    record.set("startminutes",view.down("#"+campo.minuto).getValue());
                                    
                                    record.save({
                            			scope : this,                                   
                                        view: view,
                            			callback : function(record, operation) {
                                            if (operation.success){
                                                var win = view.up('window');           
                                                notify('Los datos se guardaron correctamente');
                                                view.caller.fireEvent('objectchanged',view.caller,record);
                                                
                                            } else {
                                                notifyError('Hubo un error al guardar los datos');
                                            }
                                            
                            			},
                            			button : button
                            		});
                                    
                                }
                            
                        });
                        
                    }
                    if(diasDeSemanaLen <= i) {
                    win.close();
                    }
                    i++;
                
            })
            
            
        }else {
            
            myform.updateRecord(record);    
            var camposHorarioLen = camposHorario.length;
            var i = 1;
            
            if(view.down('#comboprogramtype').getValue() == 3) {
                record.set('dayofweek', view.down('#combodayofweekedit').getValue() )
            } else {
                record.set('dayofweek', 0)
            }
            
            if (myform.isValid()){
                
                if (record.get('Id') > 0){
                    record.save({
                		scope : this,
                       
                        view: view,
            			callback : function(record, operation) {
                            if (operation.success){
                                var win = view.up('window');           
                                notify('Los datos se guardaron correctamente');
                                view.caller.fireEvent('objectchanged',view.caller,record);

                            } else {
                                notifyError('Hubo un error al guardar los datos');
                            }
                            
                            var win = view.up('window');
                            win.close();
            			},
            			button : button
            		});
                }
                else {
                    Ext.Array.each(camposHorario, function(campo){
                            
                        if(view.down("#"+campo.hora).getValue()!=null && view.down("#"+campo.minuto).getValue()!=null) {
                            
                            record.set("starthour",view.down("#"+campo.hora).getValue());
                            record.set("startminutes",view.down("#"+campo.minuto).getValue());
                
                            record.save({
                    			scope : this,
                               
                                view: view,
                    			callback : function(record, operation) {
                                    if (operation.success){
                                        var win = view.up('window');           
                                        notify('Los datos se guardaron correctamente');
                                        view.caller.fireEvent('objectchanged',view.caller,record);

                                    } else {
                                        notifyError('Hubo un error al guardar los datos');
                                    }
                                    
                    			},
                    			button : button
                    		});
                        }
                        
                        if(camposHorarioLen <= i) {
                            var win = view.up('window');
                            win.close();
                        }
                        i++;
                            
                  });
                }
                 
            }
            
        }

	}

});