//MIGRADO2024
Ext.define('Common.controller.HorarioExcepcionFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaEventosFeriadosStore' ],
    models : [ 'TablaEventosFeriadosModel' ],
	views : [ 'HorarioExcepcionFormView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos

		this.control({
			'horarioexcepcionformview button[action="save"]' : {
				click : this.onSaveClick
			},
            'horarioexcepcionformview button[action="cancel"]' : {
    			click : this.onCancelClick
			},
            'horarioexcepcionformview' : {
                afterrender : this.initview
			},
            'horarioexcepcionformview #exc_cevento' : {
                select : this.onFeriadoSelect
			}

            
		});
	}, // cierro init

	initview : function(view) {
        var record = view.record;
        view.loadRecord(record);
	},
    
    onCancelClick: function(button){
        var win = button.up('window');
        win.close();
    },

    onFeriadoSelect: function(combo, records){
        var record = records[0];
        var view = combo.up('horarioexcepcionformview');

        var horadesde = record.get('HoraDesde').trim();
        var HoraHasta = record.get('HoraHasta').trim();

        view.down('#exc_cHoraApertura').setValue(horadesde== '0:00'?'00:00':horadesde);
        view.down('#exc_cHoraCierre').setValue(HoraHasta== '0:00'?'00:00':HoraHasta);
    },

	onSaveClick : function(button, event, options) {
        var win = button.up('window');
		var view = button.up('horarioexcepcionformview');
        var record = view.record;
        var _form = view.getForm();
        console.log('_form', _form);
        console.log('record', record)
        if (_form.isValid()){
            button.disable();
            _form.updateRecord(record);

            record.set('exc_cHoraApertura', view.down('#exc_cHoraApertura').getRawValue());
            record.set('exc_cHoraCierre', view.down('#exc_cHoraCierre').getRawValue());
            console.log('proxy',record.proxy)
            record.save({callback:function () {
                if(view.caller) {
                    view.caller.fireEvent('refresh', view.caller)
                    console.log('view.caller', view.caller)
                }
                win.close();
            }})
        } else {
            notifyError('Debe ingresar valores de horarios válidos');
        }
	}
});