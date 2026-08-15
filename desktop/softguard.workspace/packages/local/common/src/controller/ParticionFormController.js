//MIGRADO2024
Ext.define('Common.controller.ParticionFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasTiposSearchModel', 'SoftguardCuentaModel', 'SoftguardZonaModel', 'ZonaByCuentaSearchModel' ],
	views : [ 'ParticionFormView' ],
	init : function(config) {
		// this.initConfig(config);
		// genero los eventos
		this.control({
            'particionesformview' : {
                beforerender : this.initview,
			},
            'particionesformview #particion' : {
                change : this.onParticionChange
            },
            'particionesformview button[action=cancel]': {
                click: this.onCancelClick
            },
            'particionesformview button[action=save]': {
                click: this.onSaveClick
            }
		});
	}, // cierro init
	initview : function(view) {
        if(view.cuenta) {
            var comboCuenta = view.down('#dealer');
            comboCuenta.setValue(view.cuenta.get('cue_clinea'));
            Ext.Ajax.request({
                url: '/rest/search/CuentaProximoNumero',
                params:{cue_clinea:view.cuenta.get('cue_clinea')},
                method: 'GET',
                scope: this,
                success: function(response){
                    var respuesta = Ext.JSON.decode(response.responseText);
                    view.down('#cuenta').setValue(respuesta.rows[0].cue_ncuenta);
                }
            });
            var idMadre = view.cuenta.get('cue_iid');  
                        
            var store = Ext.create('Ext.data.Store',{
                model: this.getZonaByCuentaSearchModelModel(),
                remoteFilter: true,
                listeners: {
                    beforeload: function(store, operation){
                        operation.params = {cuentaId:idMadre};
                    }
                },
                filters: [{
                    property: 'zon_ccodigo:like',
                    value: 'PAR'
                    } 
                ]
            });
            view.particionesStore = store;
            var comboCuenta = view.down('#cuentasparticiones');
            comboCuenta.bindStore(store);
            store.load({callback:function(records) {
                if (comboCuenta.isVisible()){
                    store.insert(0,{cue_iid: view.cuenta.get('Id'), zon_cdealer: view.cuenta.get('cue_clinea'), zon_ccuenta:view.cuenta.get('cue_ncuenta'), cue_cnombre:view.cuenta.get('cue_cnombre') });
                    comboCuenta.setValue(view.cuenta.get('Id'));
                }
            }});   
            var tipoCuenta;
            var filters = [];
            console.log(view, view.createTipo);
            if(view.createTipo) {
                tipoCuenta = view.createTipo;
                filters = [{
                    property: 'tip_nTipo:ININT',
                    value: tipoCuenta.toString()
                }]
            }
            //traer store para combo de tipos        
            var storeComboTipos =Ext.create('Ext.data.Store',{
                model: this.getTablasTiposSearchModelModel(),
                pageSize: 1000,
                remoteSort: true,
                remoteFilter: true,
                filters: filters
            });
            
            view.down('#comboTipos').bindStore(storeComboTipos);
            storeComboTipos.load();
            // si particiones esta oculto habilito el guardar.
            if (view.down('#particion').hidden){
                view.down('#save').setDisabled(false);
            }
        }
	},
    
    onParticionChange: function(field, newValue, oldValue, options){
        var view = field.up('particionesformview');
        var grid = view.callerView;
        var particion = field;
        var codigo = view.down('#codigo');
        
        var par = particion.getValue()
        var validador = view.down('#validador');
        var save = view.down('#save');
        if (par) {
            par = 'PAR'+Ext.String.leftPad(par.toString(),2,'0');
            
            if (grid.getStore().find('zon_ccodigo',par) != -1){
               // notifyError('Ya existe una partición con ese número');
                field.markInvalid('Ya existe una partición con ese número');
                validador.setValue(getLocale('En uso'));
                validador.setFieldStyle('color:#ff0000');
                save.setDisabled(true);
            } else{
                codigo.setValue(par);
                validador.setValue(getLocale('Libre'));
                validador.setFieldStyle('color:#000000');
                field.clearInvalid();
                save.setDisabled(false);
            }
        }
    },
    onSaveClick : function(button, event, options) {
        var view = button.up('particionesformview');
    	var myform = view.getForm();
        var values = myform.getValues();
        var controller = this;
        button.disable();
        if (values._cuentacopy){
            controller.SaveCopy(view);
        } else{
            controller.SaveNew(view);
        }
	},
    SaveNew : function(view) {
    	var myform = view.getForm();
        var win =  view.up('window');
        var values = myform.getValues();
        var record = view.record;
        var cuenta = view.cuenta;
        var controller = this;
        var fecha = new Date();
        var cuentaNew = this.getSoftguardCuentaModelModel().create({
            Id: 0,
            cue_nmostrar: 2,
            cue_nsonidoul: 2,
            cue_nllaveul: 1,
            Situacion: view.situacion?view.situacion:'',
            cue_dfechaalta: fecha,
            cue_dservicio: fecha,
            cue_cnombre: values.zon_cdescripcion.toUpperCase(),
            cue_clinea: values.zon_cdealer, 
            cue_ncuenta: Ext.String.leftPad(values.zon_ccuenta,4,'0'),
            cue_nparticion: cuenta.get('cue_iid'),
            cue_ctipo: values.cue_ctipo
        });
        var _codigo = 'PAR'+Ext.String.leftPad(values.particion,2,'0').toUpperCase();
        if (view.createTipo == 8){
            _codigo = 'ACC';
        }
        cuentaNew.save({callback:function(){
            var zonaModel =controller.getSoftguardZonaModelModel().create({
                zon_iidcuenta :  cuenta.get('Id'),
                zon_ccodigo : _codigo,
                zon_cdescripcion : values.zon_cdescripcion.toUpperCase(),
                zon_cdealer : values.zon_cdealer,
                zon_ccuenta : Ext.String.leftPad(values.zon_ccuenta,4,'0').toUpperCase(),
                zon_mobservacion : values.zon_cdescripcion.toUpperCase(),
                zon_cAlarmaAGenerar: 'NYR',
                zon_nmostrar: 2,                            
                zon_nautoprocesa: 2
            });
            zonaModel.save({
                scope : this,
                callback : function(record, operation) {
                    view.callerView.fireEvent('objectchange', record,view.callerView);
                    win.close();
                }
            });
        }})
    },
    SaveCopy : function(view) {
    	var myform = view.getForm();
        var win =  view.up('window');
        var values = myform.getValues();
        var record = view.record;
        var cuenta = view.cuenta;
        var controller = this;
        if (myform.isValid()){
            Ext.Ajax.request({
                url: '/Rest/Search/CuentaCopy',
                params: { 
                    cue_clinea: values.zon_cdealer, 
                    cue_ncuenta: Ext.String.leftPad(values.zon_ccuenta,4,'0'),
                    cue_cnombre: values.zon_cdescripcion.toUpperCase(),
                    cue_iid: values._cuentacopy,//cuenta.get('Id'),
                    skipTabPrincipal : controller.valorCheckbox(view.down('#principal').getValue()) ,
                    skipTabUsuarios : controller.valorCheckbox(view.down('#usuarios').getValue()),
                    skipTabContactos : controller.valorCheckbox(view.down('#contactos').getValue()),
                    skipTabZonas : controller.valorCheckbox(view.down('#zonas').getValue()),
                    skipTabNotas : controller.valorCheckbox(view.down('#notas').getValue()),
                    skipTabHorarios : controller.valorCheckbox(view.down('#horarios').getValue()) ,
                    skipTabInformacionMedica : controller.valorCheckbox(view.down('#medica').getValue()),
                    skipTabNotificaciones : controller.valorCheckbox(view.down('#notificaciones').getValue()),
                    skipVideoLink : controller.valorCheckbox(view.down('#videolink').getValue()),
                    skipTabFalsa : 1,
                    skipTabTest : 1,
                    skipTabPaneles : 1 ,
                    setParticionInfo : 1,
                    isPartition : 1,
                    skipSchedule: controller.valorCheckbox(view.down('#schedule').getValue())
                },
                method: 'GET',
                scope: this,
                success: function(response){
                    notify('Los datos se guardaron con éxito');
                    var json = Ext.JSON.decode(response.responseText);
                    if (json.total>0){
                       // si consume licencia lo guardo en xtrainfo
                        Ext.Ajax.request({
                            url: '/rest/search/m_CuentasXtraInfoUpdateCreate',
                            params: {
                                cue_iidCuenta: json.rows[0].Id,
                                cue_ilicenciapar:view.down('#cue_ilicenciapar').getValue()?view.down('#cue_ilicenciapar').getValue():0
                            },
                            method: 'GET',
                            scope: this,
                            success: function(response){
                                var configs = Ext.JSON.decode(response.responseText);
                                if(configs) {
                                    console.log(configs)
                                }
                            }
                        })
                        var zonaModel =controller.getSoftguardZonaModelModel().create({
                            //Id: 0,
                            zon_iidcuenta :  cuenta.get('Id'),
                            zon_ccodigo : 'PAR'+Ext.String.leftPad(values.particion,2,'0').toUpperCase(),
                            zon_cdescripcion : values.zon_cdescripcion.toUpperCase(),
                            zon_cdealer : values.zon_cdealer,
                            zon_ccuenta : Ext.String.leftPad(values.zon_ccuenta,4,'0').toUpperCase(),
                            zon_mobservacion : values.zon_cdescripcion.toUpperCase(),
                            zon_cAlarmaAGenerar: 'NYR',
                            zon_nmostrar: 2,                            
                            zon_nautoprocesa: 2
                        });
                        zonaModel.set("Id",0);
                        zonaModel.save({
                            scope : this,
                            callback : function(record, operation) {
                                view.callerView.fireEvent('objectchange', record,view.callerView);
                                win.close();
                                
                            }
                        });
                    }
                    else {
                        console.log('Error al copiar: ', json, response);
                    }
                }
            });
        }
	},
    
    valorCheckbox : function (value) {
        if(value) {
            return 0;
        } else {
            return 1;
        }
    },
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
      
        myWin.close();
    }
});