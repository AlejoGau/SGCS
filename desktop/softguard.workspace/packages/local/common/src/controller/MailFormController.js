//MIGRADO2024
Ext.define('Common.controller.MailFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'MailTablasPlantillasSearchModel', 'NotificacionesSearchModel', 'p_lista_correosSearchModel', 'SmartMailProgramModel' ],
    views : [ 'MailFormView' ],
    init : function(config) {
		// genero los eventos
		this.control({
    		'mailformview' : {
    			afterrender : this.initview
    		},
    
    		'mailformview button[action="send"]' : {
    			click : this.onSendClick
    		},
    
        	'mailformview #agregarlista' : {
    			click : this.onAgregarListaClick
    		},
            'mailformview #plantillaNotificaciones' : {
                change: this.onPlantillasChange
            }            
        });
	}, // cierro init
    
    onPlantillasChange : function(combo, newValue, oldValue, eOpts ){
        var view = combo.up('mailformview');
        var store = combo.getStore();
        console.log('store: '+store);
        var index = store.find('Id',newValue);
        var item = store.getAt(index);
        var record = view.recordEvent;
        console.log(record)
        var pls_cdescripcion = item.data.pls_mplantilla;
        pls_cdescripcion = pls_cdescripcion.replace('<<CTADEALER>>',record.data.cue_clinea);
        pls_cdescripcion = pls_cdescripcion.replace('<<CTACODIGO>>',record.data.cue_ncuenta);
        pls_cdescripcion = pls_cdescripcion.replace('<<CTANOMBRE>>',record.data.cue_cnombre);
        pls_cdescripcion = pls_cdescripcion.replace('<<CTADIR>>',record.data.cue_ccalle);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTODESC>>',record.data._eventDescripcion);
        var date = new Date( Date.parse(record.data.rec_tfechahora));   
        
        var dateStr =   ("00" + date.getDate()).slice(-2) + "/" 
                        +("00" + (date.getMonth() + 1)).slice(-2) + "/" 
                        +date.getFullYear();
        var horaStr =  ("00" + date.getHours()).slice(-2) + ":" 
                       +("00" + date.getMinutes()).slice(-2) + ":" 
                       + ("00" + date.getSeconds()).slice(-2);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOFECHA>>',dateStr);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOHORA>>',horaStr);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODZONA>>',record.data.zon_ccodigo);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTODESZONA>>',record.data._zon_cdescripcion);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODUSUARIO>>',record.data.rec_iusuario);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTONOMUSUARIO>>',record.data._usu_cnombre);
        pls_cdescripcion = pls_cdescripcion.replace('<<DEALERNOMBRE>>',record.data.lin_crazonsocial);
        view.down('#body').setValue(pls_cdescripcion);
    },
    
    onAgregarListaClick: function (btn) {
        var view = btn.up('mailformview')
        
         var to = view.down('#to').getValue();
         
         if(to != '') {
             view.down('#to').setValue(to+','+view.down('#listacorreos').getValue())
         } else {
             view.down('#to').setValue(view.down('#listacorreos').getValue())
         }
    },
	initview : function(view) {
        var controller = this;
        // cargo el registro
        var to = view.down('#to');
        var cc = view.down('#cc');
        var cco = view.down('#cco');
        var from = view.down('#from');
        var body = view.down('#body');
        var subject = view.down('#asunto');
        
        var model = this.getSmartMailProgramModelModel();//this.getMailTablasPlantillasSearchModelModel();
        view.record= Ext.create(model,{
            Id:0,
            DateStart: new Date(),
            Name: ''
            
        })
        view.loadRecord(view.record);
        
        
        to.setValue(view.to);
        cc.setValue(view.cc);
        cco.setValue(view.cco);
        from.setValue(view.from);
        body.setValue(view.mailbody);
        subject.setValue(view.subject);
        
        
        if(view.emailsAccountAndNotificaction) {
            
            view.down('#from').hide()
            var combo = view.down('#emails');            
            combo.show()
            
            
            var notiStore = Ext.create('Ext.data.Store',{
                model: this.getNotificacionesSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [{
                    property:'sms_cmailparaeventos:ISNOTNULLOREMPTYTRIM',
                    value:''
                },{
                    property:'sms_iidcuenta',
                    value:view.recordEvent.get('rec_iidcuenta')
                }]
            })
            combo.bindStore(notiStore);
            notiStore.load({callback:function () {
                console.log(view)
                
                var emailModel = controller.getNotificacionesSearchModelModel().create({
                    sms_cmailparaeventos:view.recordEvent.get('cue_cemail')
                })
                notiStore.add(emailModel)
            
            }});            
            
            
        }
        
        
        
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordAdminsitrator = storeSecurity.findRecord('KeyReference', 'Administrator')
        if(recordAdminsitrator && recordAdminsitrator.get('Available') == true) {  
            
            var listaCorreosStore = Ext.create('Ext.data.Store',{
                model: this.getP_lista_correosSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true
            })
        
            view.down('#listacorreos').bindStore(listaCorreosStore)
            listaCorreosStore.load()
            
            
            view.down('#listacorreomenu').show()
            
        }
        
        
        
            //-----------------Se agregan plantillas manuales------------------
            var comboPlantillas = view.down('#plantillaNotificaciones');
            var storePlantillas = Ext.create('Ext.data.Store', {
                model : this.getMailTablasPlantillasSearchModelModel(),
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
        
        
	},
	onSendClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('mailformview');
        var win = button.up('window');
		var record = myform.getRecord();
        
        
        
        myform.updateRecord(record);
        if (record.get('DateEnd') == null){
            record.set('DateEnd',new Date(1900,1,1));
        };
        
        if (record.get('DateStart') == null){
            record.set('DateStart',new Date());
        };
        
        if (record.get('RecurrentDateEnd') == null){
            record.set('RecurrentDateEnd',new Date(1900,1,1));
        };
        
        if (record.get('TransportType') == null || record.get('TransportType') == ''){
            record.set('TransportType', 'MAIL');
        };
        
        // agrego la hora del programa
       /* var fechaDesde = record.get('DateStart');
        var tiempoDesde = view.down('#programtime').getValue();
        
        if (tiempoDesde){
            fechaDesde.setHours(tiempoDesde.getHours());
            fechaDesde.setMinutes(tiempoDesde.getMinutes());
            
            record.set('DateStart',fechaDesde);
        }
        */
        
        record.set('Query', 
            'select strval as Email from dbo.ParseArray( \''+record.get('Query').split(';').join(',')+'\',\',\')')
        
        //select strval as Email from dbo.ParseArray('dedalo@test.com,otro@coaso.com.ar',',')
        
        record.set('Status','A');
        
        
        if(view.cue_iid ) {           
        
            record.set('CueIid', view.cue_iid?view.cue_iid:view.recordEvent.get('rec_iidcuenta'))
        } else if (view.recordEvent && view.recordEvent.get('rec_iidcuenta')) {          
            record.set('CueIid', view.cue_iid?view.cue_iid:view.recordEvent.get('rec_iidcuenta'))
            
        }
        
        if (!record.get('From')) {               
            record.set('From', getParametro('MAILSENDERNAME') + " <" +  getParametro('MAILSENDER') +">");
        }
        // Seteo en ID = 0 por que si no hay id se rompe el handler por que le llega un string en lugar de un numero
        record.set('Id', 0)
        
    	record.save({
			scope : this,
            win: win,
            view: view,
			callback : function(record, operation) {
                if (operation.success){
                    
                    notify('Se envio el correo.');
                    
                    
                    var params = {
                        Id: record.get('Id'),
                        CueIid: record.get('CueIid')?record.get('CueIid'):record.get('cue_iid')
                    };
                    //TODO: sacar esto cuando rodrigo vuelva (se armo el dia 26/12/2016
                    Ext.Ajax.request({
                          url: '/rest/search/SmartMailProgramInsert',
                          method: 'GET',
                          scope: this,
                          params: params,
                          success: function(response){
                               // notify('Se envio el correo.');
                                
                                
                                if (view){
                                    view.fireEvent('objectchanged',operation);
                                    
                                    if (win){
                                        win.close();
                                    } else if (view.up('mailformview')){
                                        view.up('mailformview').close();
                                    } else{
                                        view.close();
                                    }
                                        
                                }
                          }
                    });
                    
                    
                  /*  
                    if (view){
                        view.fireEvent('objectchanged',operation);
                        
                        if (win){
                            win.close();
                        } else if (view.up('mailformview')){
                            view.up('mailformview').close();
                        } else{
                            view.close();
                        }
                            
                    }*/
                } else {
                    notifyError('Hubo un error al guardar los datos');
                }
                
			},
			button : button
		});
    
                
        
        /*
        // armo el mail para enviar
        var params = {
            from: view.down('#from').getValue(),
            to: view.down('#to').getValue(),
            cc: view.down('#cc').getValue(),
            cco: view.down('#cco').getValue(),
            subject: view.down('#asunto').getValue(),
            body: view.down('#body').getValue(),
            attach: ''
        };
        
        // mando el mail
        view.setLoading(getLocale('Enviando correo...'));
        Ext.Ajax.request({
              url: '/handler/MailSender',
              method: 'POST',
              scope: this,
              params: params,
              success: function(response){
                    notify('El correo se envió con éxito');
                    if (win)
                        win.close();
              }
        });*/
        
	}
    
});