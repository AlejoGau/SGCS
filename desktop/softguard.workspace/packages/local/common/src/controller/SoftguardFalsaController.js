//MIGRADO2024
Ext.define( 'Common.controller.SoftguardFalsaController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.TablaCodigosAlarmasStore', 'Common.store.TestReinicioStore', 'Common.store.TestTipoStore' ],
    models: [ 'SoftguardCuentasXtraInfoModel', 'SoftguardFalsaModel', 'SoftguardTestModel', 'SoftguardCodigoAlarmaModel' ],
    views: [ 'SoftguardFalsaFormView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            'formfalsetest button[action=save]': {
                click: this.onSaveClick
            },
            'formfalsetest': {
                beforerender: this.initview
            }
        });
    }, // cierro init
    initview: function(view ) {
        var cuenta = view.record;
        var module = view.module;
        var profile = module.get( 'profile' );
        view.profile = profile;
        var record = view.record;
        view.cuenta = cuenta;
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        var controller = this;
        /* var administratorModule = modules.findRecord('KeyReference','Administrator');
        
        if (administratorModule.get('Available')){
            
            var falsaalarma = view.down('#formfalse');
            falsaalarma.show();
            
        }*/
        var falsaalarma = view.down( '#formfalse' );
        falsaalarma.show();
        if( profile < 2 ) {
            view.down( 'toolbar' ).hide();
        }/* else {
                var falsaalarma = view.down('#formfalse');
                falsaalarma.show();
            }*/
        var objectId = cuenta.get( 'cue_iid' );
        this.getSoftguardFalsaModelModel().load( objectId, {
            view: view,
            scope: this,
            success: function( record, operation ) {
                var controller = operation.scope;
                var view = operation.view;
                if( !record && record.length < 10 ) {
                    controller.createFalsa( operation.view );
                } else {
                    view.falsa = record;
                    view.down( '#formfalse' ).loadRecord( view.falsa );
                }
            },
            failure: function() {
                console.log( 'error:', arguments );
            }// cierro function
        }); // cierro load
        Ext.Ajax.request({
              url: '/Rest/m_CuentasXtraInfo/',
              params: { filter:'[{"property":"cue_iidCuenta", "value":'+objectId+'}]'},
              method: 'GET',
              scope: this,
              success: function(response){
                  console.log('Response: '+response);
                  var jsonData = Ext.JSON.decode(response.responseText);
                  controller.loadCuentasXtraInfo(jsonData.rows[0].Id,view);
              }
        });
    },
    loadCuentasXtraInfo(objectId,view){
        this.getSoftguardCuentasXtraInfoModelModel().load(objectId,{
            view: view,
            scope: this,
            success: function(record, operation){
                var controller = operation.scope;
                var view = operation.view;
                if(!record){
                    controller.createCuentasXtraInfo(operation.view);
                } else {
                    view.cuentasXtra = record;
                    view.down('#formfalse').loadRecord(view.cuentasXtra);
                }
            },
            failure: function(arguments){
                console.log('error: '+arguments);
            }            
        });
    },        
    createCuentasXtraInfo(view){
        var model = this.getSoftguardCuentasXtraInfoModel();
        var cuenta = view.cuenta;
        view.falsa = model.create( {
            cue_iidCuenta: cuenta.get( 'cue_iid' )
        });
        view.down( '#formfalse' ).loadRecord( view.falsa );
    },  
    createFalsa: function(view ) {
        var model = this.getSoftguardFalsaModelModel();
        var cuenta = view.cuenta;
        view.falsa = model.create( {
            fal_iidcuenta: cuenta.get( 'cue_iid' )
        });
        view.down( '#formfalse' ).loadRecord( view.falsa );
    },
        
    createTest: function(view ) {
        var model = this.getSoftguardTestModelModel();
        var cuenta = view.cuenta;
        view.test = model.create( {
            cue_iidCuenta: cuenta.get( 'cue_iid' )
        });
        view.down( '#formtest' ).loadRecord( view.test );
    },
    onSaveClick: function(button, event, options ) {
        var view = button.up( 'formfalsetest' );
        var falsa = view.falsa;
        var cuentasXtra = view.cuentasXtra;
        var falsaForm = view.down( '#formfalse' );
        falsaForm.getForm().updateRecord(falsa);
        falsaForm.getForm().updateRecord(cuentasXtra);
        if(!cuentasXtra.get('cue_iExcesoLimiteDia'))
            cuentasXtra.set('cue_iExcesoLimiteDia',-1);
        if(!cuentasXtra.get('cue_iExcesoLimiteHora'))    
            cuentasXtra.set('cue_iExcesoLimiteHora',-1);
        var cuenta = view.cuenta;
        falsa.data.fal_iidcuenta = cuenta.get( 'cue_iid' );
        falsa.save( {
            controller: this,
            view: view,
            failure: function( record, operation ) {
                var controller = operation.controller;
                if( operation.error.status = 404 ) {
                    controller.createFalsa( operation.view );
                } else {
                    console.log( arguments )
                }
            },// cierro function
            success: function( record, operation ) {
                var controller = operation.controller;
                notify( 'Los cambios en falsas se guardaron con exito' );
            }// cierro function
        });// cierro save
        cuentasXtra.save({
            controller: this,
            view: view,
            failure: function( record, operation ) {
                var controller = operation.controller;
                if( operation.error.status = 404 ) {
                    controller.createCuentasXtraInfo( operation.view );
                } else {
                    console.log( arguments )
                }
            },// cierro function
            success: function( record, operation ) {
                var controller = operation.controller;
                notify( 'Los cambios en eventos permitidos se guardaron con exito' );
            }// cierro function
            
        });
    }
});