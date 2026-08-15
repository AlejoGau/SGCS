//MIGRADO2024
Ext.define('Common.controller.RoutesProgramFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesProgramModel', 'RoutesProgramSearchModel' ],
    views : [ 'RoutesProgramFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'routesprogramformview' : {
                beforerender : this.initview
            },
            'routesprogramformview button[action="save"]' : {
                click : this.onSaveClick
            },
            'routesprogramformview #comboprogramtype' : {
                change : this.onProgramTypeChange
            }
        });
	}, // cierro init
    
    onProgramTypeChange: function(combo, value, old){
        var view = combo.up('routesprogramformview');
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
        var view = button.up('routesprogramformview');
		var record = myform.getRecord();
        var controller = this;
        var model = this.getRoutesProgramModelModel();        
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
        
        var recordsToSave = []; // la lista de recors a guardar de manera lineal 
        
        if(view.down('#comboprogramtype').getValue() == 3 && view.record.get('Id') == '') {
            myform.updateRecord(record); 
            var diasDeSemana = view.down('#combodayofweek').items.items;
            var diasDeSemanaLen = diasDeSemana.length;
            Ext.Array.each(diasDeSemana, function(r){
                var win = view.up('window');       
                if (r.checked == true && myform.isValid()){
                    Ext.Array.each(camposHorario, function(campo){
                        if(view.down("#"+campo.hora).getValue()!=null) {
                            var record = controller.getRoutesProgramModelModel().create()
                            myform.updateRecord(record); 
                            record.set('dayofweek', r.inputValue )    
                            record.set("starthour",view.down("#"+campo.hora).getValue());
                            record.set("startminutes",view.down("#"+campo.minuto).getValue()||0);
                            record.set("routeId",view.record.get('routeId'));
                            
                            // sumo al array para guardar mas tarde
                            recordsToSave.push(record);
                        }
                    });
                }
            })
        }
        else {
            myform.updateRecord(record);    
            var camposHorarioLen = camposHorario.length;
            
            if(view.down('#comboprogramtype').getValue() == 3) {
                record.set('dayofweek', view.down('#combodayofweekedit').getValue() )
            } else {
                record.set('dayofweek', 0)
            }
            if (view.down('#hours').isValid() && view.down('#minutes').isValid()){ //hay campos ocultos invalidos, no puedo preguntar por el form completo
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
                            Ext.Ajax.request({
                                url : '/rest/search/SchedulercreateVCRoutes?days=0&idcuenta='+view.cuentaId,
                                success: function(response){
                                    var text = response.responseText;
                                    var object = Ext.JSON.decode(text);
                                    
                                    if (object.success){
                                        notify('Se regeneraron las rutas con éxito.')
                                    }
                                }
                            });
                            
                            var win = view.up('window');
                            win.close();
            			},
            			button : button
            		});
                }
                else {
                    Ext.Array.each(camposHorario, function(campo){
                        if(view.down("#"+campo.hora).getValue()!=null && view.down("#"+campo.minuto).getValue()!=null) {
                            var record = controller.getRoutesProgramModelModel().create()
                            myform.updateRecord(record); 
                            record.set("starthour",view.down("#"+campo.hora).getValue());
                            record.set("startminutes",view.down("#"+campo.minuto).getValue());
                            record.set("dayofweek",0);
                            record.set("routeId",view.record.get('routeId'));
                            
                            recordsToSave.push(record);
                        }
                  });
                }
            }
        }
        if (recordsToSave.length>0){
            controller.saveArrayRecords(recordsToSave, view, controller);
        }
	},
    saveArrayRecords(records, view, controller){
        // tomo el próximo registro a guardar
        var record = records.pop();
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
                
                // si quedan records vuelvo a llamar
                if (records.length>0){
                    controller.saveArrayRecords(records, view, controller);
                }
                else {
                    // termine, recalculo los programas
                    Ext.Ajax.request({
                        url : '/rest/search/SchedulercreateVCRoutes?days=0&idcuenta='+view.cuentaId,
                        success: function(response){
                            var text = response.responseText;
                            var object = Ext.JSON.decode(text);
                            win.close();
                            if (object.success){
                                notify('Se regeneraron las rutas con éxito.')
                            }
                        }
                    });
                }
            }
        });
    }
});