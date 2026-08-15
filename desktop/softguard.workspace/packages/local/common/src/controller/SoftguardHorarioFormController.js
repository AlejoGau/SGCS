//MIGRADO2024
Ext.define('Common.controller.SoftguardHorarioFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
	models : [ 'HorarioAlternativoModel', 'HorarioModel' ],
	views : [ 'SoftguardHorarioFormView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
			'horarioformview button[action="save"]' : {
				click : this.saveObject
			},
            'horarioformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'horarioformview' : {
                afterrender : this.initview
			}
		});
	}, // cierro init
	initview : function(myview) {
        var myform = myview.getForm();
        var record = myview.record;
        //myform.loadRecord(record);

        // Detectar tipo de modelo para usar los campos correctos
        var values;
        if(record.$className && record.$className.includes('HorarioAlternativosPlantilla')) {
            // Modelo HorarioAlternativosPlantilla (con A mayúscula)
            values = {
                diaApertura: record.get('Alt_ndiaapertura'),
                tiempoApertura: Ext.Date.parse(record.get('Alt_choraapertura'),'H:i'),
                diaCierre: record.get('Alt_ndiacierre'),
                tiempoCierre: Ext.Date.parse(record.get('Alt_choracierre'),'H:i')
            };
        } else if(record.$className && record.$className.includes('HorarioAlternativo')) {
            // Modelo HorarioAlternativo (con a minúscula)
            values = {
                diaApertura: record.get('alt_ndiaapertura'),
                tiempoApertura: Ext.Date.parse(record.get('alt_choraapertura'),'H:i'),
                diaCierre: record.get('alt_ndiacierre'),
                tiempoCierre: Ext.Date.parse(record.get('alt_choracierre'),'H:i')
            };
        } else {
            // Modelo Horario
            values = {
                diaApertura: record.get('hor_ndiaapertura'),
                tiempoApertura: Ext.Date.parse(record.get('hor_choraapertura'),'H:i'),
                diaCierre: record.get('hor_ndiacierre'),
                tiempoCierre: Ext.Date.parse(record.get('hor_choracierre'),'H:i')
            };
        }
        
        myform.setValues(values);
        
        if(myview.profile <=1) {
            myview.down('#save').hide()
            myview.disableForm()
        }
	},
	saveObject : function(button, event, options) {
		// accedo al registro y lo salvo
        
		var myform = button.up('form').getForm();
        var view = button.up('horarioformview');
        var win =  button.up('window');
        var mymodel = view.record;
        var controller = this;
        
        // manejo los horarios
        var tiempoApertura = myform.findField('tiempoApertura');
        var tiempoCierre = myform.findField('tiempoCierre');
        var diaApertura = myform.findField('diaApertura');
        var diaCierre = myform.findField('diaCierre');
        
        var valores = {
            tiempoApertura: tiempoApertura.getRawValue(),
            tiempoCierre: tiempoCierre.getRawValue(),
            diaApertura: diaApertura.getValue(),
            diaCierre: diaCierre.getValue()
        };
        
        if (myform.isValid() && this.validateHorario(valores, mymodel)){
            // Detectar tipo de modelo para usar los campos correctos
            if(mymodel.$className && mymodel.$className.includes('HorarioAlternativosPlantilla')) {
                // Modelo HorarioAlternativosPlantilla (con A mayúscula)
                mymodel.set('Alt_ndiaapertura', diaApertura.getValue());
                mymodel.set('Alt_choraapertura', tiempoApertura.getRawValue());
                mymodel.set('Alt_ndiacierre', diaCierre.getValue());
                mymodel.set('Alt_choracierre', tiempoCierre.getRawValue());
            } else if(mymodel.$className && mymodel.$className.includes('HorarioAlternativo')) {
                // Modelo HorarioAlternativo (con a minúscula)
                mymodel.set('alt_ndiaapertura', diaApertura.getValue());
                mymodel.set('alt_choraapertura', tiempoApertura.getRawValue());
                mymodel.set('alt_ndiacierre', diaCierre.getValue());
                mymodel.set('alt_choracierre', tiempoCierre.getRawValue());
            } else {
                // Modelo Horario
                mymodel.set('hor_ndiaapertura', diaApertura.getValue());
                mymodel.set('hor_choraapertura', tiempoApertura.getRawValue());
                mymodel.set('hor_ndiacierre', diaCierre.getValue());
                mymodel.set('hor_choracierre', tiempoCierre.getRawValue());
            }
            
            /*if(mymodel.id.includes('HorarioSearchModel')) {
                record.setConfig({
                    proxy: controller.getHorarioModelModel().getProxy()
                });
            } else if (mymodel.id.includes('HorarioAlternativoSearchModel')) {
                mymodel.setProxy(
                    controller.getHorarioAlternativoModelModel().getProxy()
                );
            }*/
            button.disable();
            mymodel.save({callback:function () {
                view.caller.fireEvent('refresh',view.caller)
            }})
            win.close();
        };
	},
	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('horarioformview');
		mymodel.destroy({
    		scope : this.application
    	});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close()
	},
    
    onCancelClick: function(button, event, options){
        var view = button.up('horarioformview');
        var myform = button.up('form').getForm();
    	var mymodel = view.record;
        myWin = button.up('window');
        
        // si el model es nuevo lo elimino
        if (mymodel.get('Id') == 0){
            var store = view.grid.getStore();
            store.remove(mymodel);
        }
        
        myWin.close();
    },
    
    validateHorario: function(values, record){
        var valid = true;
        var store = record.store;
        
        // tengo en cuetna horarios de tolerancia
        var tolerancia = Ext.getCmp('viewport').down('horariotoleranciaview').record;
        if(tolerancia) {
            var cierreDespues = tolerancia.get('tol_ncierredespues');
            var aperturaAntes = tolerancia.get('tol_naperturaantes');
        } else {
            var cierreDespues = 0;
            var aperturaAntes = 0;
        }
        
        // el horario de apertura - la tolerancia de apertura antes no puede pasar de dia
        var apertura = values.tiempoApertura.split(':');
        if (apertura[0] == "00" && (parseInt(apertura[1]) - parseInt(aperturaAntes) < 0)){
            Ext.Msg.show({
                 title:getLocale('Error!'),
                 msg: 'El horario de apertura y su tolerancia pasan al día anterior!',
                 icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }
        
        var cierre = values.tiempoCierre.split(':');
        
        if (cierre[0] == "23" && (parseInt(cierre[1]) + parseInt(cierreDespues) >= 60)){
            Ext.Msg.show({
                 title:getLocale('Error!'),
                 msg: getLocale('El horario de cierre y su tolerancia pasan al día posterior!'),
                 icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }
        // modifico para medir "distancia entre dias", pedido por GASPAR, acordado con Pablo Canonico 29/04/2020
        
        var cantDias = 0;
        // me fijo si el dia de cierre es menor al de apertura 
        if ((values.diaCierre - values.diaApertura)>=0){
            cantDias = values.diaCierre - values.diaApertura;
        } else {
            cantDias = (7-values.diaApertura)+values.diaCierre;
        }
        // modificado a 6 pedido por Pablo 31/08/2020 (estaba en 5)
        if (cantDias>6){
            Ext.Msg.show({
                    title:getLocale('Error!'),
                    msg: getLocale('El dia de cierre no puede ser anterior al de apertura!'),
                    icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }
        
        // hora apertura menor que hora cierre si es mismo dia (hay que mejorar la comparacion de texto no siempre funciona)
        if (values.diaCierre == values.diaApertura && values.tiempoCierre < values.tiempoApertura){
            Ext.Msg.show({
                 title:getLocale('Error!'),
                 msg: getLocale('El horario de cierre no puede ser anterior al de apertura!'),
                 icon: Ext.Msg.ERROR
            });
            valid = false;
            return false;
        }
        
        // interseccion con los otros registros
        /*store.each(function(item){
            // no tomo en cuenta el registro que estoy editando
            
            if (record.get('Id') != item.get('Id')){
                // Los dias no se pueden cruzar
                
                //concateno dia de la semana y el horario
                var fechApertura = parseInt((values.diaApertura.toString()+''+values.tiempoApertura.toString()).replace(':',''))
                var fechCierre = parseInt((values.diaCierre.toString()+''+values.tiempoCierre.toString()).replace(':',''))
                
                
                var fechAperturaIti = parseInt((item.get(item.fields.items[3].name).toString()+''+item.get(item.fields.items[4].name).toString()).replace(':',''))
                var fechCierreIti = parseInt((item.get(item.fields.items[5].name).toString()+''+item.get(item.fields.items[6].name).toString()).replace(':',''))
                
                
                console.log(fechApertura,fechCierre,fechAperturaIti,fechCierreIti)
                //detecto colicion
                if (fechAperturaIti <= fechCierre && fechCierreIti >= fechApertura ){
                    Ext.Msg.show({
                         title:getLocale('Error!'),
                         msg: getLocale('El horario se solapa con otros horarios!'),
                         icon: Ext.Msg.ERROR
                    });
                    valid = false
                    return false;
                }
            }
        });*/
        
        return valid
    }
});