Ext.define('Cuenta.controller.SoftguardCuentaCopyController', {
    extend : 'Ext.app.Controller',
    stores : [],
    models : ['SoftguardCuentaModel'],
	//views : ['SoftguardCuentaCopyView'],

	init : function(config) {
		// genero los eventos

		this.control({

			'cuentacopyview button[action="create"]' : {
				click : this.saveObject
			},
            'cuentacopyview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'cuentacopyview' : {
                beforerender : this.initview
			},
            'cuentacopyview #dealer' : {
                select : this.onDealerSelect
    		}
		});
	}, // cierro init

	initview : function(view) {
        view.down('#dealer').setValue('')
        
        /*
        view.storeLinea =Ext.create('Ext.data.Store',{
            model: this.getTablasLineasSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: false,            
            sorters: [
                {
                    property : 'lin_ccodigo',
                    direction: 'ASC'
                    //,root: 'data'
                }
            ]
        })
        view.down('#dealer').bindStore(view.storeLinea)
        
        view.storeLinea.load()
        */
	},

	saveObject : function(button, event, options) {
        var view = button.up('cuentacopyview');
		var myform = view.getForm();
        var win =  button.up('window');
        var values = myform.getValues();
        var record = this.getSoftguardCuentaModelModel();
        var controller = this;

        if (myform.isValid()){

              // zerofill
              var width = 4
              var number = values.cue_ncuenta.toUpperCase();
              width -= number.toString().length;
              if ( width > 0 )
              {
                number = new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
              }

            
            Ext.Ajax.request({
              url: '/rest/Search/CuentaCopy',
              params: {
                    setParticionInfo : 0,
                    cue_clinea: values.cue_clinea, 
                    cue_ncuenta: number,
                    cue_cnombre: values.cue_cnombre.toUpperCase(),
                    cue_iid: view.record.get('Id'),
                    skipTabPrincipal : controller.valorCheckbox(view.down('#principal').getValue()) ,
                    skipTabUsuarios : controller.valorCheckbox(view.down('#usuarios').getValue()),
                    skipTabContactos : controller.valorCheckbox(view.down('#contactos').getValue()),
                    skipTabZonas : controller.valorCheckbox(view.down('#zonas').getValue()),
                    skipTabNotas : controller.valorCheckbox(view.down('#notas').getValue()),
                    skipTabHorarios : controller.valorCheckbox(view.down('#horarios').getValue()) ,
                    skipTabInformacionMedica : controller.valorCheckbox(view.down('#medica').getValue()),
                    skipTabNotificaciones : controller.valorCheckbox(view.down('#notificaciones').getValue()),
                    skipTabFalsa : controller.valorCheckbox(view.down('#controlfalsasalarmas').getValue()),
                    skipTabTest : controller.valorCheckbox(view.down('#controltest').getValue()),
                    skipTabPaneles : controller.valorCheckbox(view.down('#panelalarma').getValue()),
                    skipSchedule : controller.valorCheckbox(view.down('#scheduler').getValue()),
                    skipVideoLink : controller.valorCheckbox(view.down('#videolink').getValue()),
                    skipEstadosDinamicos : controller.valorCheckbox(view.down('#estadosdinamicos').getValue()),
              },
              method: 'GET',
              scope: this,
              success: function(response){
                    notify('Los datos se guardaron con éxito');
                    var json = Ext.JSON.decode(response.responseText);
                    var cuenta = json.rows[0];
                    if (json.total > 0){
                        var id = cuenta.Id;
                        var panel = Ext.getCmp('center');
                        var title = cuenta.cue_clinea + '-' + cuenta.cue_ncuenta + ' - ' + cuenta.cue_cnombre;
                        
                        title = title
                            .replace(/,/g,'')
                            .replace(/\[/g,'')
                            .replace(/\]/g,'')
                            .replace(/#/g,'')
                            .replace(/\./g,'')
                            .replace(/>/g,'');
                        // me fijo si el tab existe, si es nuevo lo creo
                        var mytab = panel.down('[title="' + title + '"]');
                        
                        var readonly = false;
                        
                        if (cuenta.Situacion=="No Habilitado"){
                            readonly=true;
                        }
                        
                        var openView = 'cuentaview';
                        if(view.itemDbClickView) {
                            openView = view.itemDbClickView;
                        }
                        
                    	if (!mytab) {
                            var newTab = Ext.widget(openView, {
                                tabConfig: {translate: false},
                    			title : title,
                                objectId: id,
                                translate: false,
                                closable: true,
                                readonly: readonly,
                                closeAction: 'destroy',
                                recordCuenta: Ext.create(record,cuenta)
                    		});
                                                         
                            
                            panel.add(newTab);
                            panel.setActiveTab(newTab);
                		}
                		// el existe, lo activo
                		else {
                            mytab.show();
                		}
                         win.close();
                         
                         if(view.caller) {
                             // lo pidieron en un mail que no se abra la cuenta origen
                            //view.caller.fireEvent('objectcreated',view);
                         }
                        
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
    },
    
    onDealerSelect: function(combo, records, options){
        var view = combo.up('cuentacopyview');
        var form = view.getForm();
        var cuenta = form.findField('cue_ncuenta');
        
        cuenta.validate();
    }
});