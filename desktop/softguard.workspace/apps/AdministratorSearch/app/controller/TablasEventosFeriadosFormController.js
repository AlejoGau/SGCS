Ext.define('AdministratorSearch.controller.TablasEventosFeriadosFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasEventosFeriadosModel' ],
    views : [ 'TablasEventosFeriadosFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
            'tablaseventosferiadosformview' : {
                beforerender : this.initview
            },
            'tablaseventosferiadosformview button[action="save"]' : {
                click : this.onSaveClick
            }
            
	    });
	}, // cierro init

	initview : function(view) { 
        var record = view.record;
        var form = view.getForm();

        view.loadRecord(record); 

        var horadesde = record.get('eve_choradesde').trim();
        var HoraHasta = record.get('eve_chorahasta').trim();
        
        form.findField('_choradesde').setValue(horadesde== '0:00'?'00:00':horadesde);
        form.findField('_chorahasta').setValue(HoraHasta== '0:00'?'00:00':HoraHasta);
	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablaseventosferiadosformview');
        var win = button.up('window');
		var record = myform.getRecord();

		myform.updateRecord(record);

        record.set('eve_dfechahasta', record.get('eve_dfechadesdes'));
        
        // tomo los horarios de los fields
        var horadesde = Ext.Date.format(myform.findField('_choradesde').getValue(),'H:i');
        var horahasta = Ext.Date.format(myform.findField('_chorahasta').getValue(),'H:i');
        
        // piso los horarios
        record.set('eve_choradesde', horadesde);
        record.set('eve_chorahasta', horahasta);
        
        if (myform.isValid()){
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
	}
});