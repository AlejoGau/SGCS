Ext.define('Cuenta.controller.SoftguardCuentaNewController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
	models : [ 'Cuenta.model.SoftguardCuentaModel', 'Cuenta.model.CuentaSearchModel' ],
	views : [ 'Cuenta.view.SoftguardCuentaNewView' ],

	init : function(config) {
		// genero los eventos

		this.control({

			'cuentanewview button[action="create"]' : {
				click : this.saveObject
			},
            'cuentanewview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'cuentanewview' : {
                beforerender : this.initview,
                selectedDealer: this.onSelectedDealer
			},
            'cuentanewview #dealer' : {
                select : this.onDealerSelect
    		},
            'cuentanewview #selectDealer' : {
                click : this.onSelectDealer
        	}
		});
	}, // cierro init
    
    
    onSelectedDealer: function (value,view) {
        view.down('#dealer').setValue(value.get('lin_ccodigo'))
        
        
        Ext.Ajax.request({
                      url: '/rest/search/CuentaProximoNumero?cue_clinea='+value.get('lin_ccodigo'),
                      method: 'GET',
                      scope: this,
                      success: function(response){
                          var respuesta = Ext.JSON.decode(response.responseText);
                          view.down('#cuenta').setValue(respuesta.rows[0].cue_ncuenta);
                      }
             });
    },
    
    onSelectDealer: function (btn) {
        var view = btn.up('cuentanewview')
        
        
        var viewHelper = Ext.widget('dealerhelpersimpleview',{
            caller: view,
            simpleSelect: true
        });
        
        var win = Ext.create('Ext.Window', {
        	layout : 'fit',
			title : 'Seleccione un dealer',
			width : 450,
			height : 220,
			border : false,
			items : viewHelper
		});
		win.show();
        
    },

	initview : function(view) {
        var form = view.getForm();
        var fecha = new Date();
        // cambio a hora local
        //fecha.setHours(fecha.getHours()-(fecha.getTimezoneOffset()/60)); // no funcionaba bien.
        
        var situacion = '';
        
        if (view.isAdmin || view.isAccount)
            situacion = 'habilitada';
            
        
            
            
        var tipoCuenta;
        var filters = [];
        if(view.createTipo) {
            tipoCuenta = view.createTipo;
            filters = [{
                property:"tip_nTipo:ININT","value":"7,8,13"
            }]
        }
        //traer store para combo de tipos        
        var storeComboTipos =Ext.create('Ext.data.Store',{
            model: Ext.create('Tablas.model.TablasTiposSearchModel'),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: filters
        })
        view.down('#comboTipos').bindStore(storeComboTipos);
        storeComboTipos.load();

        var record = this.getSoftguardCuentaModelModel().create({
            cue_nmostrar: 2,
            cue_nsonidoul: 2,
            cue_nllaveul: 1,
            Situacion: view.situacion?view.situacion:situacion,
            cue_dfechaalta: fecha,
            cue_dservicio: fecha,
            cue_cnombre: ''
            
        });
       
        if(view.organizacionRecord) {
            record.set('cue_cnombre', view.organizacionRecord.get('Name'))
            record.set('cue_ctelefono', view.organizacionRecord.get('Phone'))
            record.set('cue_ccalle', view.organizacionRecord.get('Address'))
            record.set('cue_cemail', view.organizacionRecord.get('Email'))  
        }
        
        
        
        view.record = record;
        form.loadRecord(record);
        
        if(view.fenceOptions) {
            var cuentasFence = [{
                name:'_SG-CON1',
                dealer:'_SG',
                cuenta:'CON1'
            },{
                name:'_SG-CON2',
                dealer:'_SG',
                cuenta:'CON2'
            },{
                name:'_SG-CON3',
                dealer:'_SG',
                cuenta:'CON3'
            }]
             var storeCuentasFence =Ext.create('Ext.data.Store',{})
             storeCuentasFence.add(cuentasFence)
             view.down('#cuentasFence').bindStore(storeCuentasFence)
             view.down('#cuentasFence').show()
            
            
        }
	},

	saveObject : function(button, event, options) {
        var view = button.up('cuentanewview');
		var myform = view.getForm();
		var record = view.record;
        var win =  button.up('window');
        var controller = this;
        
        if(myform.isValid()) {
        button.disable();
        
        
                var campoLinea = myform.findField('cue_clinea')
                var linea = campoLinea.getValue();
                
                
                if(linea == '') {
                    notify('Es necesario seleccionar un dealer.')
                    button.enable();
                    return false;
                    
                }
                var campoCuenta = myform.findField('cue_ncuenta');
                
                value = Ext.String.leftPad(campoCuenta.getValue(),4,'0');
                
            Ext.Ajax.request({
              url: '/rest/Search/CuentaByDealerValidate',
              params: { linea: linea, cuenta: value},
              method: 'GET',
              scope: this,
              success: function(response){
                var errors = Ext.JSON.decode(response.responseText);
    
                if (errors.total){
                    var error = errors.rows[0];
                    campoCuenta.markInvalid(error.Descripcion + ' cuenta: ' + value);
                    campoCuenta.textValid = false;
                    button.enable();
                } else {
                    campoCuenta.clearInvalid();
                    campoCuenta.textValid = true;
                    
                    
                    if(view.fenceOptions == true && record.get('Id')) {
                        var valueCombo = view.down('#cuentasFence').selection
                         var storeCuenta =Ext.create('Ext.data.Store',{
                            model: this.getCuentaSearchModelModel(),
                            pageSize: 1,
                            remoteSort: true,
                            remoteFilter: true,
                            filters: [
                                {
                                    property:'cue_clinea',
                                    value:valueCombo.get('dealer')                                    
                                },{
                                    property:'cue_ncuenta',
                                    value:valueCombo.get('cuenta')                                    
                                }
                                ]
                             
                        });
                        
                        storeCuenta.load({callback:function (records) {
                            if(records.length>0) {
                            var record = records[0]
                        
                                
                                Ext.Ajax.request({
                                  url: '/rest/Search/CuentaCopy',
                                  params: {
                                        setParticionInfo : 0,
                                        cue_clinea: campoLinea.getValue(), 
                                        cue_ncuenta: Ext.String.leftPad(campoCuenta.getValue(),4,'0').toUpperCase(),
                                        cue_cnombre: myform.findField('cue_cnombre').getValue(),
                                        cue_iid: record.get('Id'),
                                        skipTabPrincipal : 1 ,
                                        skipTabUsuarios : 1,
                                        skipTabContactos : 1,
                                        skipTabZonas : 1,
                                        skipTabNotas : 1,
                                        skipTabHorarios : 1 ,
                                        skipTabInformacionMedica : 1,
                                        skipTabNotificaciones : 1,
                                        skipTabFalsa : 1,
                                        skipTabTest : 1,
                                        skipTabPaneles : 1,
                                        skipSchedule : 1,
                                        skipVideoLink : 1,
                                        skipEstadosDinamicos : 1
                                  },
                                  method: 'GET',
                                  scope: this,
                                  success: function(response){
                                        notify('Los datos se guardaron con éxito');
                                        var json = Ext.JSON.decode(response.responseText);
                                        var cuenta = json.rows[0];
                                        if (json.total > 0){
                                            view.record = controller.getSoftguardCuentaModelModel().create(cuenta)
                                            view.fireEvent('objectcreated',view);
                                             win.close();
                                        }
                                  }
                                })
                                
                            } else {
                                notify('No se encontro la cuenta origen.')
                            }
                        
                        }})
                       
                        
                    } else {
                    
                        if (myform.isValid()){
                            myform.updateRecord(record);
                            
                            record.set('cue_ncuenta', Ext.String.leftPad(record.get('cue_ncuenta'),4,'0').toUpperCase());
                            record.set('cue_cnombre', record.get('cue_cnombre').toUpperCase());
                            
                            
                            if(campoLinea.getValue() == '_MP') {
                                record.set('cue_ctipo', 5);
                            }
                            
                            //esto se armo para cuando se crea desde Organizaciones CRM
                            if(view.marca) {
                                record.set('cue_cnombre',view.marca+' '+record.get('cue_cnombre'))
                            }
                            
                            
record.setId(0)                            
                            
                            
                            
                            record.save({
                                win: win,
                                view: view,
                            	callback : function(record, operation) {
                                    if (operation.success){
                                        var view = operation.view;
                                        
                                        
                                        
                                        //var win = operation.win;
                                        view.fireEvent('objectcreated',view);
                                        
                                        /**
                                         * se saco el dia 11/10/2017 por que pasan a copiar cuentas
                                         * if(view.createTipo == 6) {
                                            //le creo los estados dinamicos por default
                                             Ext.Ajax.request({
                                                  url: '/rest/Search/EstadosDinamicosDefaults',
                                                  params: { IdCuenta: record.get('cue_iid')},
                                                  method: 'GET',
                                                  scope: this,
                                                  success: function(response){
                                                  }
                                             })
                                        }*/
                                        
                                        
                                        win.close();
                                    }
                                    else{
                                        console.log(operation);
                                    }
                    			}
                    		});
                            
                        }
                    }    
              
              }
            }});
        
        } else {
            notify('Verifique los datos del formulario')
        }
        
	},

    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    },
    
    onDealerSelect: function(combo, records, options){
        var view = combo.up('cuentanewview');
        var form = view.getForm();
        var cuenta = form.findField('cue_ncuenta');
        var dealer = form.findField('cue_clinea');
        var controller = this;
        
        var storeCuenta =Ext.create('Ext.data.Store',{
            model: this.getCuentaSearchModelModel(),
            pageSize: 1,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property:'cue_clinea',
                    value:dealer.getValue()
                    
                }
                ],
             sorters: [
                {
                    property : 'cue_ncuenta',
                    direction: 'DESC'
                }
            ]
        });
        
        storeCuenta.load({callback:function (records) {
            var siguiente =  controller.succ(records[0].get('cue_ncuenta')).toUpperCase();
            
            
            if(siguiente != 'AAAAA') {
                cuenta.setValue(siguiente)    
            } else {
                cuenta.setValue(records[0].get('cue_ncuenta'))
            }
            
            
            Ext.Ajax.request({
              url: '/rest/Search/CuentaByDealerValidate',
              params: { linea: dealer.getValue(), cuenta: cuenta.getValue()},
              method: 'GET',
              scope: this,
              success: function(response){
                var errors = Ext.JSON.decode(response.responseText);
    
                if (errors.total){
                    var error = errors.rows[0];
                    cuenta.markInvalid(error.Descripcion + ' cuenta: ' + cuenta.getValue());
                    cuenta.textValid = false;
                    
                }
                
                cuenta.validate();
              }
            })
            
            
        }})
        
        
      
        if(dealer.getValue() == '_MP') {
            view.down('#vigicontrol').show();
            view.down('#comboTipos').hide();
             view.down('#comboTipos').setValue(' ');
            view.down('#comboTipos').clearInvalid();
            view.down('#comboTipos').textValid = true;
        } else {
            view.down('#vigicontrol').hide();
            view.down('#comboTipos').show();
            view.down('#comboTipos').setValue(' ');
          //  this.markInvalid("Debe seleccionar un tipo");
         //   this.textValid = false;
        }
        
    },
    
    
    succ: function (input) {
          var alphabet = 'abcdefghijklmnopqrstuvwxyz',
            length = alphabet.length,
            result = input,
            i = input.length;
        
          while(i >= 0) {
            var last = input.charAt(--i),
                next = '',
                carry = false;
        
            if (isNaN(last)) {
                index = alphabet.indexOf(last.toLowerCase());
        
                if (index === -1) {
                    next = last;
                    carry = true;
                }
                else {
                    var isUpperCase = last === last.toUpperCase();
                    next = alphabet.charAt((index + 1) % length);
                    if (isUpperCase) {
                        next = next.toUpperCase();
                    }
        
                    carry = index + 1 >= length;
                    if (carry && i === 0) {
                        var added = isUpperCase ? 'A' : 'a';
                        result = added + next + result.slice(1);
                        break;
                    }
                }
            } else if(input == 9999) {
                result = 'A000';
            	break;
            } else {
                next = +last + 1;
                if(next > 9) {
                    next = 0;
                    carry = true
                }
        
                if (carry && i === 0) {
                    result = '1' + next + result.slice(1);
                    break;
                }
            }
        
            result = result.slice(0, i) + next + result.slice(i + 1);
            if (!carry) {
                break;
            }
          }
          return result;
        }
});