//MIGRADO2024
Ext.define('Common.controller.m_tstconexionFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_tstconexionModel', 'TablasIpConSearchModel' ],
    views : [ 'm_tstconexionFormView' ],
    init : function(config) {
		// genero los eventos
		this.control({
            'm_tstconexionformview button[action=save]' : {
                click : this.onSaveClick
            },
            'm_tstconexionformview' : {
                beforerender : this.initview
            },
            'm_tstconexionformview #cualquiera2' : {
                change : this.cualquiera2Change
            },
            'm_tstconexionformview button[action=delete]' : {
                click : this.onDeleteClick
            }
        });
	}, // cierro init
    
    initview : function(view) {
        var cuenta = view.recordCuenta;
        var module = view.module;
        var profile = 3;//module.get('profile');
        view.profile = profile;
        var record = view.record;
        view.cuenta = cuenta;
        //var modules = this.getSecurityModulesStoreStore();
        var controller = this;
        
        // genero los store de codigos alarma y asigno a los combo por separado.
        view.setLoading("Cargando");
        var combo = view.down('#conexionip');
        var combostore = Ext.create('Ext.data.Store',{
            model: this.getTablasIpConSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [{property:'iprs_status',value:'A'}],
            listeners:{
                beforeload: function(store){
                    store.getProxy().setExtraParam("onlyConnIP", 0);
                }
            }
        })
        combo.bindStore(combostore);
	    combostore.load();
        view.test=record;
        view.down('#formtest').loadRecord(view.test);
        if (record.get('txc_cAlarmaAutoprocesa').trim()!=""){
            view.down('#txc_cAlarmaAutoprocesa').setValue(view.test.get('txc_cAlarmaAutoprocesa'))
        }
        
        if (record.get('txc_cAlarmaAGenerar').trim()!=""){
            view.down('#txc_cAlarmaAGenerar').setValue(view.test.get('txc_cAlarmaAGenerar'))
        }
        
        if (record.get('txc_cAlarmaEsperada').trim()!=""){
            view.down('#txc_cAlarmaEsperada').setValue(view.test.get('txc_cAlarmaEsperada'))
        }
        var txc_cAlarmaEsperada = view.test.get('txc_cAlarmaEsperada');
        if (txc_cAlarmaEsperada == '_Q_'){
            view.down('#cualquiera2').setValue(true);
        }
        view.setLoading(false);
        if (profile < 2){
            view.down('toolbar').hide();
            var forms = view.query('form');
            
            Ext.Array.each(forms, function(form){
                form.disableForm();
            })
        }
	},
    cualquiera2Change: function(chck, newValue, oldValue, eOpts ){
        var view = chck.up('m_tstconexionformview');
        var _combo = view.down('#txc_cAlarmaEsperada');
        if (newValue){
            _combo.setValue('_Q_');
            _combo.hide();
        } else {
            _combo.setValue('');
            _combo.show();
        }
    },
    onDeleteClick: function(button, event, options) {
        var view = button.up('m_tstconexionformview');
		var test = view.test;
        
        test.setConfig({
            proxy: this.getM_tstconexionModelModel().getProxy()
        });
        test.destroy({callback:function(){
            notify('El control se eliminó con éxito');
            view.close();
        }});
	},
	onSaveClick: function(button, event, options) {
    var view = button.up('m_tstconexionformview');
    var test = view.test;
    var testForm = view.down('#formtest');
    var conexionIpField = view.down('#conexionip');
    // Validar si el campo "Conexion Ip" está seleccionado
    if (conexionIpField.getValue()) {
        testForm.getForm().updateRecord(test);
        
        test.setConfig({
            proxy: this.getM_tstconexionModelModel().getProxy()
        });
        test.set('txc_cAlarmaAGenerar', view.down('#txc_cAlarmaAGenerar').getValue());
        test.set('txc_cAlarmaEsperada', view.down('#txc_cAlarmaEsperada').getValue());
        test.set('txc_cAlarmaAutoprocesa', view.down('#txc_cAlarmaAutoprocesa').getValue());

        if(isNaN(test.id)){
            test.id = 0;
            test.data.Id = 0;
        }

        test.modified = record.data;

        test.save({
            controller: this,
            view: view,
            failure: function(record, operation) {
                var controller = operation.controller;
                if (operation.error.status = 404) {
                    //controller.createTest(operation.view);
                } else {
                    console.log(arguments);
                }
            },
            success: function(record, operation) {
                var controller = operation.controller;
                notify('Los cambios en test se guardaron con éxito');
            }
        });
    } else {
        notify('El campo "Conexion Ip" es obligatorio');
        console.log('El campo "Conexion Ip" es obligatorio');
    }
}
});