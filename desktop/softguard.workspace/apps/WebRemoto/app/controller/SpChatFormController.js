Ext.define('WebRemoto.controller.SpChatFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartPanicSearchModel', 't_mensajes_whatsappSearchModel', 'ChatMessageModel' ],
    views : [ 'SpChatFormView', 'ChatDataView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'spchatformview' : {
                afterrender : this.initview
                ,beforeclose : this.onBeforeClose
            },
            'spchatformview #gmaplink' : {
                click : this.onGmapLinkClick
            },
            'spchatformview #wazelink' : {
                click : this.onWazeLinkClick
            },
            'spchatformview #tmw_add' : {
                click : this.onMensajeSelect
            },
            'spchatformview #chatSend' : {
                click : this.onChatSend
            },
            'spchatformview #iniciarchat' : {
                click : this.onIniciarChatClick
            },
            'spchatformview #cerrarchat' : {
                click : this.onCerrarChatClick
            }
        });
	}, // cierro init

	initview : function(view) {
        var controller = this;
        var to = view.down('#to');
        var subject = view.down('#mensaje');
        var record = view.record;
        var connection = new signalR.HubConnectionBuilder().withUrl("/sgChat/chatHub").build();
        view.connection = connection;

        view.connection.on("ReceiveMessage", function (user, message) {
            var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var usersp = to.getRawValue();
            if (user == view.userId){
                storeChat.add({Name:view.username,Message:message, Date: new Date(), side:'right'});
            } else{
                storeChat.add({Name:usersp,Message:message, Date: new Date()});
            }
            view.down('#chat').getEl().scroll('b', Infinity);
        });
        //view.room = record.get('rec_iid');
        view.token = Ext.util.Cookies.get('OAuth_Token');
        view.username = _UserData.FirstName+" "+_UserData.LastName;
        view.userId = _UserData.udw_idKey;

        to.setValue(view.to);
        subject.setValue(view.subject);

        var comboMensajes = view.down('#tmw');
        var storeMensajes = Ext.create('Ext.data.Store', {
            model : this.getT_mensajes_whatsappSearchModelModel(),
            autoload: false
        });      
        comboMensajes.bindStore(storeMensajes);
        storeMensajes.load();

        var comboSP = view.down('#to');
        var storeSP = Ext.create('Ext.data.Store', {
            model : this.getSmartPanicSearchModelModel(),
            filters: [{property:"cue_iid",value:record.get('cue_iid')}
                    ,{property:"Config:LIKE",value:"groupEnabled\":1"}
                    ,{property:"Config:LIKE",value:"btnChat\":1"}
                ],
            remoteFilter: true,
            remoteSort: true,
            autoload: false
        });      
        comboSP.bindStore(storeSP);
        storeSP.load();

        var storeChat = Ext.create('Ext.data.Store', {
            model : this.getChatMessageModelModel(),
            autoload: false
        }); 
        view.down('#chat').bindStore(storeChat); 
	},

    onBeforeClose: function(view){
        var button = view.down('#cerrarchat');
        if (view.room){
            this.onCerrarChatClick(button);
        }
    },

    onCerrarChatClick: function(button){
        var view = button.up('spchatformview'); 
        var record = view.record;
        var comboSP = view.down('#to');
        var chat = view.down('#chat');
        var storeChat = chat.getStore();
	    storeChat.removeAll();

        if (view.room){
            view.connection.invoke("SendMessage", view.userId.toString(), getLocale('El chat fue cerrado por el operador'),view.room.toString(),view.token,false);
            view.connection.stop();
            Ext.Ajax.request({
                url: '/rest/search/chatStatusClose?chs_idkey='+view.room,
                method: 'GET',
                success: function(response,operation) {
                    view.down('#chat').hide();
                    view.down('#msgHelper').hide();
                    view.down('#sender').hide();
                    button.hide();
                    view.down('#iniciarchat').show();
                }
            });
        } else {
            console.log('estoy cerrando un chat no iniciado');
            view.down('#chat').hide();
            view.down('#msgHelper').hide();
            view.down('#sender').hide();
            button.hide();
            view.down('#iniciarchat').show();
        }
        
    },

    onIniciarChatClick: function(button){
        var view = button.up('spchatformview'); 
        var record = view.record;
        var comboSP = view.down('#to');
        var storeChat = view.down('#chat').getStore();

        button.disable();
        view.mask(getLocale('Conectando chat'));
        //creo la room de chat y asigno los participantes
        Ext.Ajax.request({
            url: '/rest/search/chatEventoCreate?rec_iid='+record.get('rec_iid')+'&oper_idusuario='+_UserData.udw_idKey+'&sp_idkey='+comboSP.getValue(),
            method: 'GET',
            success: function(response,operation) {
                // tomo el chatid recien creado para guardar los mensajes.
                try{
                    var _json = Ext.JSON.decode(response.responseText);
                    var chat = _json.rows[0];
                    if (chat.error == "1"){
                        notifyError(chat.message);
                        view.unmask();
                        button.enable();
                    } else{
                        view.room = chat.chs_idKey;
                        view.connection.start().then(function () {
                            //document.getElementById("sendButton").disabled = false;
                            view.unmask();
                            view.down('#chat').show();
                            view.down('#msgHelper').show();
                            view.down('#sender').show();
                            button.enable();
                            button.hide();
                            view.down('#cerrarchat').show();
                            view.connection.invoke("SendMessage",view.userId.toString() , getLocale("se unió a la conversación"), view.room.toString(),view.token,true).catch(function (err) {
                                return;
                            });
                        }).catch(function (err) {
                            return;
                        });
                    }
                }
                catch(exception){
                    notifyError('Hubo un error al crear el canal de chat');
                    console.log(exception);
                    view.unmask();
                    button.enable();
                }
            }
        })
    },

    onMensajeSelect: function(btn){
        var view = btn.up('spchatformview');
        var combo =  view.down('#tmw');
        var msg = combo.getValue();
        if (msg){
             view.down('#mensaje').setValue(msg);
        }
    },

    onGmapLinkClick: function(button){
        var view = button.up('spchatformview'); 
        var record = view.record;
        var textarea = view.down('#mensaje');
        var id = textarea.getInputId();
        var element = document.getElementById(id);
        var link = 'https://www.google.com/maps/search/?api=1&query='+record.get('gps_rlatitud')+'%2C'+record.get('gps_rlongitud')

        insertTextAtCursor(element,link);
    },

    onWazeLinkClick: function(button){
        var view = button.up('spchatformview'); 
        var record = view.record;
        var textarea = view.down('#mensaje');
        var id = textarea.getInputId();
        var element = document.getElementById(id);
        var link = 'https://www.waze.com/ul?ll='+record.get('gps_rlatitud')+'%2C'+record.get('gps_rlongitud')+'&navigate=yes&zoom=17'

        insertTextAtCursor(element,link);
    },

	onChatSend : function(button, event, options) {
        var view = button.up('spchatformview');
        var win = button.up('window');
		var record = view.record;
        var mensaje = view.down('#mensaje');
        var _txt = mensaje.getValue();
        if (_txt != ''){
            view.connection.invoke("SendMessage", view.userId.toString(), _txt,view.room.toString(),view.token,false).catch(function (err) {
                notifyError('Hubo un error al enviar el mensaje')
                return ;
            });
            mensaje.setValue('');
            mensaje.focus();
        }
	}
});