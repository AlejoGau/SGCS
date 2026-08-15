//MIGRADO2024
Ext.define('Common.controller.SmsEnvioFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaModemsSmsStore' ],
    models : [ 'TablasModemsSmsSearchModel','SmsEnvioTablasPlantillasSearchModel', 'SoftguardUsuarioModel', 'SoftguardTelefonoModel', 'TelefonoSearchModel', 'SoftguardSmsModel' ],
    views : [ 'SmsEnvioFormView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
					'smsenvioformview' : {
						afterrender : this.initview
					},
					'smsenvioformview button[action="send"]' : {
						click : this.onSendClick
					},
                    'smsenvioformview #plantillaNotificaciones' : {
                        change: this.onPlantillasChange
                    }
                });
	}, // cierro init
	initview : function(view) {
        // cargo el registro
        var to = view.down('#to');
        var subject = view.down('#asunto');
        
        
        to.setValue(view.to);
        subject.setValue(view.subject);   
        var comboTelefonos = view.down('#to')
        var storeTelefonos = Ext.create('Ext.data.Store', {
                model : this.getTelefonoSearchModelModel(),
                remoteFilter: true,
                autoload: false,
                remoteSort: true,
                sorters: [
                    {
                        property : 'tel_norden',
                        direction: 'ASC'
                    }
                ],
                filters:[
                    {
                        property: 'tel_nsp:ININT',
                        value: '2,3'
                    },{
                        property: 'tel_nsms',
                        value: 1
                    },{
                        property: 'tel_iidcuenta',
                        value: view.record.get('cue_iid')
                    }
                ]
            });      
            comboTelefonos.bindStore(storeTelefonos);
            storeTelefonos.load();
            //-----------------Se agregan plantillas manuales------------------
            var comboPlantillas = view.down('#plantillaNotificaciones');
            var storePlantillas = Ext.create('Ext.data.Store', {
                model : this.getSmsEnvioTablasPlantillasSearchModelModel(),
                remoteFilter: true,
                autoload: false,
                remoteSort: true,
                sorters: [
                    {
                        property : 'pls_cdescripcion',
                        direction: 'ASC'
                    }
                ],
                filters:[
                    {
                        property: 'pls_iTipo:ININT',
                        value: '1'
                    }
                ]
            });
            
            
            comboPlantillas.bindStore(storePlantillas);
            storePlantillas.load();

            var modemSmsCombo = view.down('#modemsms');
            var modemSmsModel = this.getTablasModemsSmsSearchModelModel();
            var modemSmsStore = Ext.create('Ext.data.Store', {
                model : modemSmsModel,
                remoteFilter: true,
                autoload: true,
                remoteSort: true,
                sorters: [
                    {
                        property : 'sms_cdescripcion',
                        direction: 'ASC'
                    }
                ],
                filters:[
                    {
                        property: 'sms_cDealer:LIKE',
                        value: view.record.get('cue_clinea').trim()
                    },{
                        property: 'sms_nEstado',
                        value: 2
                }
                ]
            });
            
            modemSmsCombo.bindStore(modemSmsStore);
            modemSmsStore.load({
                callback: function(records, operation, success) {
                    if (records.length==0)
                        notify(getLocale('No hay modems SMS habilitados para el dealer del evento'));
                }
            });

	},
    onPlantillasChange : function(combo, newValue, oldValue, eOpts ){
        var view = combo.up('smsenvioformview');
        var store = combo.getStore();
        console.log('store: '+store);
        var index = store.find('Id',newValue);
        var item = store.getAt(index);
        console.log('Record de grilla: '+view.record);
        /**
         * <<CTADEALER>>
            <<CTACODIGO>>
            <<CTANOMBRE>>
            <<CTADIR>>
            <<EVENTODESC>>
            <<EVENTOFECHA>>
            <<EVENTOHORA>>
            <<EVENTOCODZONA>>
            <<EVENTODESZONA>>
            <<EVENTOCODUSUARIO>>
            <<EVENTONOMUSUARIO>>
            <<DEALERNOMBRE>>
         */
        var pls_cdescripcion = item.data.pls_mplantilla;
        pls_cdescripcion = pls_cdescripcion.replace('<<CTADEALER>>',view.record.data.cue_clinea.trim());
        pls_cdescripcion = pls_cdescripcion.replace('<<CTACODIGO>>',view.record.data.cue_ncuenta.trim());
        pls_cdescripcion = pls_cdescripcion.replace('<<CTANOMBRE>>',view.record.data.cue_cnombre);
        pls_cdescripcion = pls_cdescripcion.replace('<<CTADIR>>',view.record.data.cue_ccalle);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTODESC>>',view.record.data._eventDescripcion);
        var date = new Date( Date.parse(view.record.data.rec_tfechahora));   
        
        var dateStr =   ("00" + date.getDate()).slice(-2) + "/" 
                        +("00" + (date.getMonth() + 1)).slice(-2) + "/" 
                        +date.getFullYear();
        var horaStr =  ("00" + date.getHours()).slice(-2) + ":" 
                       +("00" + date.getMinutes()).slice(-2) + ":" 
                       + ("00" + date.getSeconds()).slice(-2);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOFECHA>>',dateStr);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOHORA>>',horaStr);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODZONA>>',view.record.data.zon_ccodigo.trim());
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTODESZONA>>',view.record.data._zon_cdescripcion.trim());
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODUSUARIO>>',view.record.data.rec_iusuario);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTONOMUSUARIO>>',view.record.data._usu_cnombre);
        pls_cdescripcion = pls_cdescripcion.replace('<<DEALERNOMBRE>>',view.record.data.lin_crazonsocial);
        view.down('#asunto').setValue(pls_cdescripcion);
    },
	onSendClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('smsenvioformview');
        var win = button.up('window');
		var record = myform.getRecord();
        
        if (!myform.isValid()) {
            notify(getLocale('Complete los campos requeridos'));
            return;
        }
        
        // mando el mail
        view.setLoading(getLocale('Enviando mensaje...'));
        
        
        Ext.Array.each(view.down('#to').getValue(),function(contacto) {
        
            Ext.Ajax.request({
                  params: {
                    iCuenta : view.record.get('cue_iid'),
                    iModemSMS : view.down('#modemsms').getValue(),
                    cMessageMerge : view.down('#asunto').getValue(),
                    cDestinoSMS : contacto
                  },
                  url: '/rest/search/SaveSms',
                  method: 'GET',
                  scope: this,
                  success: function(response){
                        notify('El sms se envió con éxito');
                        if (win)
                            win.close();
                  }
            });
        
        
        })
        
        
       
        
        Ext.Ajax.request({
          url: '/rest/search/AlarmaGenerar',
          method: 'GET',
          params: {
            idCta:view.record.get('cue_iid'),
            cAlarma: '_MT',
            cContenido : getLocale('Envio SMS a :')+ ' '+view.down('#to').getValue().join(','),        
            cObservaciones : getLocale('Envio SMS a :')+ ' '+view.down('#to').getValue().join(',')     
          },
          success: function(resp,operation) {
          
          }})
        
        
        
	}
    
});