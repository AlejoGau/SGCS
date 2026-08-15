//MIGRADO2024
Ext.define('Common.controller.SoftguardTestController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TestTipoStore', 'Common.store.TestReinicioStore', 'Common.store.TablaCodigosAlarmasStore' ],
    models : [ 'SoftguardTestModel', 'SoftguardCodigoAlarmaModel', 'TestModel' ],
    views : [ 'SoftguardTestFormView' ],
    init : function(config) {
		// genero los eventos
		this.control({
            'formtest button[action=save]' : {
                click : this.onSaveClick
            },
            'formtest' : {
                beforerender : this.initview
            },
            'formtest #cualquiera2' : {
                change : this.cualquiera2Change
            }
        });
	}, // cierro init
    
    initview : function(view) {
        var cuenta = view.record;
        var module = view.module;
        var profile = module.get('profile');
        view.profile = profile;
        var record = view.record;
        view.cuenta = cuenta;
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        var controller = this;
        
        console.log('Initview del test. Módulo: '+this.application._nameModule);
        // genero los store de codigos alarma y asigno a los combo por separado.
        view.setLoading("Cargando");
        controller.getTestModelModel().load(cuenta.get('cue_iid'), {
            view: view,
            scope: controller,
            success : function(record,operation) {
                var controller = operation.scope;
                var view = operation.view;
                
                if (record.get('Id') == 0){
                    controller.createTest(view);
                } else {
                    view.test=record;
                    view.down('#formtest').loadRecord(view.test);
                    if (record.get('tst_cAlarmaAutoprocesa').trim()!=""){
                        view.down('#tst_cAlarmaAutoprocesa').setValue(view.test.get('tst_cAlarmaAutoprocesa'))
                    }
                    
                    if (record.get('tst_cAlarma2Autoprocesa').trim()!=""){
                        view.down('#tst_cAlarma2Autoprocesa').setValue(view.test.get('tst_cAlarma2Autoprocesa'))
                    }
                    
                    if (record.get('tst_cAlarma3Autoprocesa').trim()!=""){
                        view.down('#tst_cAlarma3Autoprocesa').setValue(view.test.get('tst_cAlarma3Autoprocesa'))
                    }
                    
                    if (record.get('tst_calarma').trim()!=""){
                        view.down('#tst_calarma').setValue(view.test.get('tst_calarma'))
                    }
                    
                    /**
                     * BC Quito el codigo viejo, dado que en el record, no viene alarmagenerar, sino que con tst_calarmagenerar
                     * 
                     *
                    if (record.get('alarmagenerar') && record.get('alarmagenerar').trim()!=""){
                        view.down('#alarmagenerar').setValue(view.test.get('tst_calarmagenerar'))
                    }
                     */
                    if (record.get('tst_calarmagenerar') && record.get('tst_calarmagenerar').trim()!=""){
                        view.down('#alarmagenerar').setValue(view.test.get('tst_calarmagenerar'))
                    }
                    
                    if (record.get('tst_calarma3esperada').trim()!=""){
                        view.down('#tst_calarma3esperada').setValue(view.test.get('tst_calarma3esperada'))
                    }
                    
                    if (record.get('tst_calarma3generar').trim()!=""){
                        view.down('#tst_calarma3generar').setValue(view.test.get('tst_calarma3generar'))
                    }
                    if (record.get('tst_cAlarmaCtrlGenerar').trim()!=""){
                        view.down('#tst_cAlarmaCtrlGenerar').setValue(view.test.get('tst_cAlarmaCtrlGenerar'))
                    }
                    var tst_calarmaesperada = view.test.get('tst_calarmaesperada');
                    if (record.get('tst_calarmaesperada').trim()!=""){
                        view.down('#tst_calarmaesperada').setValue(view.test.get('tst_calarmaesperada'))
                    }
                    if (tst_calarmaesperada == '_Q_'){
                        view.down('#cualquiera2').setValue(true);
                    }                    
                }
                
                view.setLoading(false);
            },
            failure : function() {
                console.log('error:', arguments);
                view.setLoading(false);
            }// cierro function
        }); // cierro load
        if (profile < 2){
            view.down('toolbar').hide();
            var forms = view.query('form');
            
            Ext.Array.each(forms, function(form){
                form.disableForm();
            })
            
        } else {
        //    var falsaalarma = view.down('#formfalse');
          //  falsaalarma.show();
        }
        
        var objectId = cuenta.get('cue_iid');
      
        if(this.application._nameModule == 'TrackGuard') {
            view.down('#testcontrollpanel').hide();
            //view.down('#testseguidorpanel').hide();
            view.down('#controlusopanel').hide();
            view.down('#testseguidorpanel').setTitle('Test secundario');
        }
        
        if(this.application._nameModule == 'VigiControl') {
            view.down('#testseguidorpanel').hide()
        }
	},
    cualquiera2Change: function(chck, newValue, oldValue, eOpts ){
        var view = chck.up('formtest');
        var _combo = view.down('#tst_calarmaesperada');
        if (newValue){
            _combo.setValue('_Q_');
            _combo.hide();
        } else {
            _combo.setValue('');
            _combo.show();
        }
        
    },
    
    createFalsa: function(view){
        var model = this.getSoftguardFalsaModelModel();
        var cuenta = view.cuenta;
        view.falsa = model.create({
            fal_iidcuenta: cuenta.get('cue_iid')
        });
        view.down('#formfalse').loadRecord(view.falsa);
    },
    
    createTest: function(view){
        
        // no hay idkey con lo cual no se puede crear desde el objeto... hay qeu armar un search.
        // en realidad tiene qeu venir creado desde que se genera la cuenta.
        // se resuelve en TEST ins
        var model = this.getSoftguardTestModelModel();
        var cuenta = view.cuenta;
        view.test = model.create({
            Id: cuenta.get('cue_iid')
        });
        view.down('#formtest').loadRecord(view.test);
    },
	onSaveClick : function(button, event, options) {
        console.log("Prueba")
        var view = button.up('formtest');
		var test = view.test;
        var testForm = view.down('#formtest');
        
        testForm.getForm().updateRecord(test);
        
        var tiempoControl = view.down('#tst_ncada').getValue();
        var alarmaControl = view.down('#tst_calarma').getValue();
        var tiempoGprs = view.down('#tst_ncada2').getValue();
        var alarmaGprs = view.down('#alarmagenerar').getValue(); 
        var tiempoSeguidor = view.down('#tst_ncada3').getValue();
        var eventoSeguidor = view.down('#tst_calarma3esperada').getValue();
        var alarmaSeguidor = view.down('#tst_calarma3generar').getValue()
        
        test.set('tst_cAlarmaAutoprocesa', view.down('#tst_cAlarmaAutoprocesa').getValue());
        test.set('tst_calarmaesperada', view.down('#tst_calarmaesperada').getValue());
        test.set('tst_cAlarma2Autoprocesa', view.down('#tst_cAlarma2Autoprocesa').getValue());
        test.set('tst_cAlarma3Autoprocesa', view.down('#tst_cAlarma3Autoprocesa').getValue())
        test.set('tst_calarmagenerar', alarmaGprs);  
        test.set('tst_calarma', alarmaControl);  
        test.set('tst_calarma3esperada', eventoSeguidor);  
        test.set('tst_calarma3generar', alarmaSeguidor);  
        test.set('tst_cAlarmaCtrlGenerar', view.down('#tst_cAlarmaCtrlGenerar').getValue());  
        
        if(tiempoControl == 0 && alarmaControl != ''){  
            notify('Debe asignarle un tiempo a la alarma en control de test');
        }
        else if(tiempoControl > 0 && alarmaControl == ''){
            notify('Debe seleccionar una alarma en control de test');
        }else if(tiempoGprs == 0 && alarmaGprs != ''){  
            notify('Debe asignarle un tiempo a la alarma en test GPRS ');
        }
        else if(tiempoGprs > 0 && alarmaGprs == ''){
            notify('Debe seleccionar una alarma en test GPRS');
        }else if(tiempoSeguidor > 0 && (eventoSeguidor == '' || alarmaSeguidor == '')){
            notify('Debe seleccionar una alarma y un evento en test Seguidor');
        }else{
            test.save({
            controller: this,
            view: view,
            failure : function(record,operation) {
                var controller = operation.controller;
                if (operation.error.status = 404){
                    controller.createTest(operation.view);
                }else{
                    console.log(arguments)
                }    
            },// cierro function
            success : function(record,operation) {
                var controller = operation.controller;
                notify('Los cambios en test guardaron con exito');
            }// cierro function
        });// cierro save
        }
        
	}
});