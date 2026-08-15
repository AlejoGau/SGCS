Ext.define('Trackguard.controller.DMNewCuentaNewCuentaController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablaLineasStore' ],
    models : [ 'SoftguardCuentaModel', 'CuentaTipoSearchModel' ],
	views : [ 'DMNewCuentaView' ],

	init : function(config) {
		// genero los eventos

		this.control({

			'dmnewcuentaview button[action="create"]' : {
				click : this.saveObject
			},
            'dmnewcuentaview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'dmnewcuentaview' : {
                beforerender : this.initview,
                selectedDealer: this.onSelectedDealer
			},
            'dmnewcuentaview #dealer' : {
                select : this.onDealerSelect
    		},
            'dmnewcuentaview #selectDealer' : {
                click : this.onSelectDealer
        	}
		});
	}, // cierro 
    
    onSelectedDealer: function (value,view) {
        view.down('#dealer').setValue(value.get('lin_ccodigo'))
        console.log("entro selected")
        
        
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
        console.log("entro en select")
        var view = btn.up('dmnewcuentaview')
        
        
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
      
        var fecha = new Date();
        var controller = this;
        // cambio a hora local
        //fecha.setHours(fecha.getHours()-(fecha.getTimezoneOffset()/60)); // no funcionaba bien.
        
        //saco _MP de la lista de dealers
        /** 
        var dealercombo = view.down('#dealer');
        var dealerstore = dealercombo.getStore();
        
        dealerstore.remoteFilter= false;
        dealerstore.filter({filterFn: function(item) { 
            return item.get("lin_ccodigo") != "_MP"; }
        });
        */
        var situacion = 'habilitada';
        
        /*if (view.isAdmin || view.isAccount)
            situacion = 'habilitada';*/
        
        if(view.recordCuenta) { 
            var record = controller.getSoftguardCuentaModelModel().load(view.recordCuenta.get('cue_iid'),{
                callback:function(record) {
                    console.log(record)
                    view.recordCuenta = record
                    
                    if(!view.recordCuenta.get('cue_dfechaalta')) {
                        view.recordCuenta.set('cue_dfechaalta',fecha)
                    }
                    if(!view.recordCuenta.get('cue_dservicio')) {
                        view.recordCuenta.set('cue_dservicio',fecha)
                    }
                    var record = view.recordCuenta;
                    
                    controller.loadData(view, record,controller)
                    
                }                
            })
            
            
            
            
        } else {
            
            var record = this.getSoftguardCuentaModelModel().create({
                cue_nmostrar: 2,
                cue_nsonidoul: 2,
                cue_nllaveul: 2,
                Situacion: situacion,
                cue_dfechaalta: fecha,
                cue_dservicio: fecha
            });
            
            controller.loadData(view, record,controller)
            
            
        }
        
	},
    
    loadData : function (view, record,controller) {
        view.record = record;
        
          var form = view.getForm();
        var tipostore =Ext.create('Ext.data.Store',{
            model: controller.getCuentaTipoSearchModelModel() ,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'tip_nTipo:ININT',
                    value: '1,2,3'
                }
            ]
        })        
        view.down('#tipoCombo').bindStore(tipostore);
        tipostore.load({callback: function(){
            form.loadRecord(record);
            
            if(record.get('cue_clinea') != '') {
                view.down('#dealerceunta').setValue(record.get('cue_clinea')+"-"+record.get('cue_ncuenta'))
                view.down('#dealerceunta').show()
                view.down('#dealer').hide()
                view.down('#cuenta').hide()
                
                view.down('#dealer').setValue(record.get('cue_clinea'))
                view.down('#cuenta').setValue(record.get('cue_ncuenta'))
            }
        }})
        
    },

	saveObject : function(button, event, options) {
        var view = button.up('dmnewcuentaview');
		var myform = view.getForm();
		var record = view.record;
        var win =  button.up('window');
        
            myform.updateRecord(record);
            record.setConfig({
				proxy: this.getSoftguardCuentaModelModel().getProxy()
			});
            
        if (myform.isValid()){
            
            record.set('cue_ncuenta', Ext.String.leftPad(record.get('cue_ncuenta'),4,'0').toUpperCase());
            record.set('cue_cnombre', record.get('cue_cnombre').toUpperCase());
            
            //le guardo un IMEI por si no tiene
            if (record.get('cue_cIMEI') == null || record.get('cue_cIMEI') == ''){
                var imei = record.get('cue_clinea')+'-'+record.get('cue_ncuenta');
                record.set('cue_cIMEI',imei)
            }
            
            record.save({
                win: win,
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var view = operation.view;
                        var win = operation.win;
                        if(view.caller) {
                           
                           var panel = view.caller.up('#center');

                            var tabName = record.get('cue_cnombre')+' ('+record.get('cue_ncuenta')+')';
                            if(tabName == undefined) {
                               tabName = record.get('Name'); 
                            }
                               
                               
                             tabName = tabName
                            .replace(/,/g,'')
                            .replace(/\[/g,'')
                            .replace(/\]/g,'')
                            .replace(/#/g,'')
                            .replace(/\./g,'')
                            .replace(/>/g,'');
                            
                            var mytab = panel.down('[title="' + tabName + '"]');
                            
                            
                            if(view.caller.up('cuentagridview')) {
                                //view.caller = view.caller.up('cuentagridview')
                                //view.caller.fireEvent('objectcreated', view)
                                
                                var store = view.caller.up('cuentagridview').getStore();
                                var filters = [];
                               filters.push(view.caller.up('cuentagridview').filterTipoObj);
                               store.filter(filters);
                            }
                    
                            if (!mytab) {
                                var newTab = Ext.widget('vehicleview', {
                                    tabConfig: {translate: false},
                                    title : tabName,
                                    objectId: record.get('Id'),
                                    translate: false,
                                    closable: true,
                                    cuenta:record,
                                    closeAction: 'destroy'
                        		});
                                panel.add(newTab);
                                panel.setActiveTab(newTab);
                    		}
                    		// el existe, lo activo
                    		else {
                                mytab.show();
                    		}
                           
                           
                        }
                        
                       // view.caller.fireEvent('objectcreated',view.caller, record);

                        win.close();
                    }
                    else{
                        console.log(operation);
                    }
    			}
    		});
            
        }
	},

    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    },
    
    onDealerSelect: function(combo, records, options){
        var view = combo.up('dmnewcuentaview');
        var form = view.getForm();
        var cuenta = form.findField('cue_ncuenta');
        
        cuenta.validate();
    }
});