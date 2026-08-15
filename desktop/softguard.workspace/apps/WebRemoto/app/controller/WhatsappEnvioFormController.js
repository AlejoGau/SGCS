Ext.define('WebRemoto.controller.WhatsappEnvioFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TelefonoSearchModel', 'MobilePhoneFromAccountModel', 't_mensajes_whatsappSearchModel', 'WhatsappTablasPlantillasSearchModel' ],
    views : [ 'WhatsappEnvioFormView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'whatsappenvioformview' : {
                afterrender : this.initview
            },
            'whatsappenvioformview button[action="send"]' : {
                click : this.onSendClick
            },
            'whatsappenvioformview #gmaplink' : {
                click : this.onGmapLinkClick
            },
            'whatsappenvioformview #wazelink' : {
                click : this.onWazeLinkClick
            },
            'whatsappenvioformview #tmw_send' : {
                click : this.onMensajeSelect
            },
            'whatsappenvioformview #plantillaNotificaciones' : {
                change: this.onPlantillasChange
            }              
        });
	}, // cierro init

	initview : function(view) {
        var controller = this;
        var to = view.down('#to');
        var subject = view.down('#asunto');
        var record = view.record;
        to.setValue(view.to);
        subject.setValue(view.subject);   

        var comboMensajes = view.down('#tmw');
        var storeMensajes = Ext.create('Ext.data.Store', {
            model : this.getT_mensajes_whatsappSearchModelModel(),
            autoload: false
        });      
        comboMensajes.bindStore(storeMensajes);
        storeMensajes.load();

        // según el parámetro cargo los contactos de whatsapp
        var NUMEROWHATSAPP = getParametro('NUMEROWHATSAPP');
        console.log('Init view');
        if (NUMEROWHATSAPP == 1){
            controller.loadWhatsappInternacional(view);
        } else {
            controller.loadWhatsapp(view);
        }

            //-----------------Se agregan plantillas manuales------------------
            var comboPlantillas = view.down('#plantillaNotificaciones');
            var storePlantillas = Ext.create('Ext.data.Store', {
                model : this.getWhatsappTablasPlantillasSearchModelModel(),
                remoteFilter: true,
                autoload: false,
                remoteSort: true,
                pageSize: 1000,
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

    onPlantillasChange : function(combo, newValue, oldValue, eOpts ){
        var view = combo.up('whatsappenvioformview');
        var store = combo.getStore();
        console.log('store: '+store);
        var index = store.find('Id',newValue);
        var item = store.getAt(index);
        console.log('Record de grilla: '+view.record);

        var pls_cdescripcion = item.data.pls_mplantilla;
        pls_cdescripcion = pls_cdescripcion.replace('<<CTADEALER>>',view.record.data.cue_clinea);
        pls_cdescripcion = pls_cdescripcion.replace('<<CTACODIGO>>',view.record.data.cue_ncuenta);
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
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODZONA>>',view.record.data.zon_ccodigo);

        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTODESZONA>>',view.record.data._zon_cdescripcion);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTOCODUSUARIO>>',view.record.data.rec_iusuario);
        pls_cdescripcion = pls_cdescripcion.replace('<<EVENTONOMUSUARIO>>',view.record.data._usu_cnombre);
        pls_cdescripcion = pls_cdescripcion.replace('<<DEALERNOMBRE>>',view.record.data.lin_crazonsocial);

        view.down('#asunto').setValue(pls_cdescripcion);

    },
    

    loadWhatsappInternacional: function(view){
        var record = view.record;
        var comboTelefonos = view.down('#to')
        var storeTelefonos = Ext.create('Ext.data.Store', {
            model : this.getTelefonoSearchModelModel(),
            remoteFilter: true,
            autoload: false,
            remoteSort: true,
            filters: [
                {property:'tel_iidcuenta',value:record.get('cue_iid')}
                ,{property:'tel_iismobile',value:1}
            ]
        });      
        storeTelefonos.load(); 
        comboTelefonos.bindStore(storeTelefonos);
    },

    loadWhatsapp: function(view){
        var record = view.record;
        // me fijo si el evento tiene posicion
        var _rlatitud = record.get('cue_cLatLng').split(',')[0];
        var _rlongitud = record.get('cue_cLatLng').split(',')[1]; 

        var comboTelefonos = view.down('#to')
        var storeTelefonos = Ext.create('Ext.data.Store', {
            model : this.getMobilePhoneFromAccountModelModel(),
            //remoteFilter: true,
            autoload: false,
            //remoteSort: true
        });          
        comboTelefonos.bindStore(storeTelefonos);

        var pais = getParametro('NOMBREPAIS');
        
        // si el evento no tiene posicion busco los datos de la cuenta
        if (!(_rlatitud && _rlongitud)){
             _rlatitud = record.get('gps_rlatitud');
            _rlongitud = record.get('gps_rlongitud');
        }
        // si tengo lat y lngo busco el pais de la posicion
        if (_rlatitud && _rlongitud){
            var latlng = {lat: parseFloat(_rlatitud), lng: parseFloat(_rlongitud)};

            var KEYGOOGLEMAPS = getParametro('KEYGOOGLEMAPS');
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+parseFloat(_rlatitud)+','+parseFloat(_rlongitud)+'&key='+KEYGOOGLEMAPS
            Ext.Ajax.request({
                url: '/handler/RemoteUrlProxy',
                params: {
                    url: new URL(url)
                },
                method: 'GET',
                success: function(response,operation) {
                    var json = Ext.JSON.decode(response.responseText);
                    //var code = json.Code;
                    console.log(json);
                    for (var i = 0; i < json.results[0].address_components.length; i++) {
                        var addressType = json.results[0].address_components[i].types[0];
                        // for the country, get the country code (the "short name") also
                        if (addressType == "country") {
                           pais = json.results[0].address_components[i].short_name;
                        }
                    }

                    storeTelefonos.load({
                        params: {
                            country: pais,
                            idcuenta: record.get('cue_iid')
                        }
                    });
                }
            })
        }
        // si no consegui ninguna posicion busco el pais del parametro
        else {
            Ext.Ajax.request({
                url: '/handler/CountryCodeFromName',
                method: 'GET',
                params: {
                    country: pais
                },
                success: function(response,operation) {
                    var json = Ext.JSON.decode(response.responseText);
                    var code = json.Code;
                    storeTelefonos.load({
                        params: {
                            country: code,
                            idcuenta: view.record.get('cue_iid')
                        }
                    });
                }
            })
        }
    },

    onMensajeSelect: function(btn){
        var view = btn.up('whatsappenvioformview');
        var combo =  view.down('#tmw');
        var msg = combo.getValue();

        if (msg){
             view.down('#asunto').setValue(msg);
        }
    },

    onGmapLinkClick: function(button){
        var view = button.up('whatsappenvioformview'); 
        var record = view.record;
        var textarea = view.down('#asunto');
        var id = textarea.getInputId();
        var element = document.getElementById(id);
        var latlng;

        if (record.get('gps_rlatitud') != ''){
            latlng = record.get('gps_rlatitud')+'%2C'+record.get('gps_rlongitud')
        } else {
            latlng = record.get('cue_cLatLng')
        }

        var link = 'https://www.google.com/maps/search/?api=1&query='+latlng;

        insertTextAtCursor(element,link);
    },

    onWazeLinkClick: function(button){
        var view = button.up('whatsappenvioformview'); 
        var record = view.record;
        var textarea = view.down('#asunto');
        var id = textarea.getInputId();
        var element = document.getElementById(id);
        var latlng;

        if (record.get('gps_rlatitud') != ''){
            latlng = record.get('gps_rlatitud')+'%2C'+record.get('gps_rlongitud')
        } else {
            latlng = record.get('cue_cLatLng')
        }
        var link = 'https://www.waze.com/ul?ll='+latlng+'&navigate=yes&zoom=17'

        insertTextAtCursor(element,link);
    },

	onSendClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('whatsappenvioformview');
        var win = button.up('window');
		var record = myform.getRecord();
        var rawValue = view.down('#to').getRawValue();
        var to = view.down('#to').getValue();
        if (!rawValue){
            notify('Debes seleccionar un numero')
            return
        }                 
        
        // armo el link de whatsappenvioformview
        var numero = rawValue.replace('+','');
        var text = view.down('#asunto').getValue();
        
        //uso la forma del protocolo par aqu eno me abra una web nueva cada vez que quiero enviar un mensaje.
        var uritext = encodeURI(text);
        //var link = "whatsapp://send/?phone="+numero+"&text="+uritext.replace(/&/g,'%26');
        //var link = "https://wa.me/"+numero+"?text="+uritext.replace(/&/g,'%26');
        //var link = "https://api.whatsapp.com/send?phone="+numero+"&text="+uritext.replace(/&/g,'%26');
        var link = "https://web.whatsapp.com/send?phone="+numero+"&text="+uritext.replace(/&/g,'%26');

        // abro en ventana nueva
        var unloadFunction = window.onbeforeunload;
        window.onbeforeunload = null;
        window.open(link,'_blank');
        window.onbeforeunload = unloadFunction;

        Ext.Ajax.request({
            url: '/rest/search/AlarmaGenerar',
            method: 'GET',
            params: {
                idCta:view.record.get('cue_iid'),
                cAlarma: '_WA',
                cContenido : getLocale('Envio WhatsApp a :')+ ' '+rawValue,        
                cObservaciones : getLocale('Envio WhatsApp a :')+ ' '+rawValue+"\r\n"+text
            },
            success: function(resp,operation) {
            
            }
        })
	}
});