//MIGRADO2024
Ext.define('Common.controller.AutomonitoreoFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.SiNoStore' ],
    models : [ 'SoftguardCuentaModel' ],
    views : [ 'AutomonitoreoFormView' ],
    init : function(config) {
		// genero los eventos
		this.control({
            'automonitoreoformview button[action=save]' : {
                click : this.onSaveClick
            },
            'automonitoreoformview' : {
                afterrender : this.initview
            },
            'automonitoreoformview #autoprocesa' : {
                change : this.onAutoprocesaChange
            }
        });
	}, // cierro init
    
    initview : function(view) {
        var module = view.module;
        var profile = module.get('profile');
        view.profile = profile;
        if (profile < 2){
            view.down('toolbar').hide();
        }
        
        if (view.cuenta && (!view.record || view.record.data.ObjectTypeId!=3001)){
            view.record=view.cuenta;
        }
        view.loadRecord(view.record);
	},
	onSaveClick : function(button, event, options) {
        var view = button.up('automonitoreoformview');
        var form = view.getForm();
		var cuenta = view.record;
        
        form.updateRecord(cuenta);
        cuenta.setConfig({
            proxy: this.getSoftguardCuentaModelModel().getProxy()
        });
        var cue_dfechaalta = cuenta.get('cue_dfechaalta');        
        if ((cue_dfechaalta instanceof Date &&  cue_dfechaalta.getFullYear()<=1970) ||  cue_dfechaalta == null){
            cuenta.set('cue_dfechaalta',new Date('1/1/1900'));
        } else {
            cuenta.set('cue_dfechaalta', new Date(cuenta.get('cue_dfechaalta')));
        }
        
        var cue_dservicio = cuenta.get('cue_dservicio');
        if ((cue_dservicio instanceof Date &&  cue_dservicio.getFullYear()<=1970) ||  cue_dservicio == null){
            cuenta.set('cue_dservicio',new Date('1/1/1900'));
        } else {
            cuenta.set('cue_dservicio', new Date(cuenta.get('cue_dservicio')));
        }
        
		cuenta.save({
            controller: this,
            view: view,
            failure : function(record,operation) {
            },// cierro function
            success : function(record,operation) {
                notify('Los cambios se guardaron con exito');
            }// cierro function
        });// cierro save
	},
    
    onAutoprocesaChange: function(combo, value, old){
        var view = combo.up('form');
        if (value == 1){
            view.down('#prioridad').setValue(2);
        }
    }
});