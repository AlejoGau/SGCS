//MIGRADO2024
Ext.define('Common.controller.EventosMonitorController', {
    extend: 'Ext.app.Controller',
    stores : [ 'Common.store.SgAppMWStore', 'Common.store.EventoEstadoStore', 'Common.store.EventoOrigenStore', 'Common.store.EventoTipoStore' ],
    models : [ 'EventosPendientesSearchModel', 'EventoSonidoSearchModel', 'NameValueModel', 'EventosTiempoRealModel' ],
    views : [ 'EventosMonitorGridView' ],
	init : function(config) {
		this.control({
			'eventosmonitorgridview' : {
				afterrender : this.initView
			},
			'eventosmonitorgridview button[action=play]' : {
				click : this.onPlayClick
			},
    		/*'eventosmonitorgridview #atencionautomatica' : {
				change : this.onAtencionAutomaticaClick
			},*/
            'eventosmonitorgridview button[action=cambiooperador]' : {
                click : this.onCambioOperadorClick
            }
		});
	}, // cierro init
    
    onCambioOperadorClick: function(button, object, options){
        var view = button.up('eventosmonitorgridview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Login',
			width : 400,
			height : 300,
			border : true,
            modal: false,
            modal:true,
			items : [
                {
                    xtype:'panel',
                    items:[                                    
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Usuario',
                            itemId: 'usuario'
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Clave',
                            itemId: 'clave'
                        },{
                            xtype: 'button',
                            text: 'Ingresar',
                            listeners: {
                                click: function () {
                                    console.log(this.up('window').down('#usuario').getValue(), this.up('window').down('#clave').getValue())
                                    console.log(view.operadorId, 'Login',arguments)
                                    
                                    
                                    // este debe ser el ope_iid del nuevo usuario
                                    var operadorTo = 4;
                                    
                                     Ext.Ajax.request({
                                        url: '/rest/search/ReasignarEventosAUsuario',
                                        params: { 
                                              idOperadorFrom: view.operadorId,
                                              idOperadorTo: operadorTo
                                        },
                                        method: 'GET',
                                        scope: this,
                                        success: function(response){
                                            var parametros = Ext.JSON.decode(response.responseText);
                                            console.log(parametros)
                                            notify('El nuevo usuario ya tiene '+parametros.total+' eventos asignados');
                                            
                                            //redireccionar al login OJO QUE EL PASS SE ESTA PASANDO POR URL Y ES MUY CROTO >D
                                            //window.location.href = "/?u="+this.up('window').down('#usuario').getValue()+"&p="+this.up('window').down('#clave').getValue();
                                        } 
                                    });
                                }
                            }
                        }
                    ]
                }
            ]
		});
        
        win.show();
    },
	initView : function(view) {
        var me = this;
        view.lastiid=0;
        
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMultimonitor = storeSecurity.findRecord('KeyReference', 'SgAppMultiMonitorWeb')
        if(recordMultimonitor && recordMultimonitor.get('Available') == true) {
            var _security = recordMultimonitor.get('_Security');
            if(_security &&  _security.hasOwnProperty('sonido') && _security.sonido == false) {
                view.mute = true
                view.down('#play').toggle(false);
            }
        }
        view.task = Ext.TaskManager.start({
            args: [view],
            scope: me,
            run: me.loadData,
            interval: 5000
        });
	},
    
    onPlayClick: function(button, event, options){
        var view = button.up('eventosmonitorgridview');
        var task = view.task;
        if (button.pressed)
            Ext.TaskManager.start(task);
        else
            Ext.TaskManager.stop(task);
    },
	loadData : function(view) {
        var pageSize = view.lastiid == 0 ? 10 : 1; //si es la primera vez traigo hasta 100 pendientes
        var me = controller=this;
        
        if (!view.mystore){
            view.mystore=Ext.create('Ext.data.Store',{
                model: this.getEventoSonidoSearchModelModel(),//this.getEventosPendientesSearchModelModel(), 
                remoteFilter: true
            });
        }
        
        var generaalerta;
        if (getParametro('MMSONIDONOALERTAS') == 1){
            generaalerta=0;
        }else {
            generaalerta=1;
        }
        view.mystore.proxy.extraParams = {soloGeneraAlerta:generaalerta};
        
        if (!view.mute && !view.mystore._loading)
        view.mystore.load({callback: function(records){
            var text = '';
            var baseurl = '/rest/request/get/?http://translate.google.com/translate_tts?tl='+locale+'&q=';
            var target = view.down('#sound');
            var separador = '';
            
            if (view.lastiid == 0){
                text = getLocale('El sistema comienza con ')+view.mystore.count()+getLocale(' eventos ya anunciados');
                if (view.DSSSONIDO == 0){
                    // no hago nada por ahora
                } else if (view.mystore.count()>0){
                    target.setSrc(baseurl+text);
                }
                
                if (records[view.mystore.count()-1]){
                    view.lastiid = records[view.mystore.count()-1].get("rec_iid");
                }
                
            } else {
                view.mystore.each(function(item, index, count){
                    if (text != '')
                        separador = ' - ';
                        
                    if (item.get("rec_iid") > view.lastiid){
                        if (view.DSSSONIDO == 0){// && item.get("cod_nLeeSonido") == 1){ // no hace falta el query solo trae los que tienen sonido en 1
                            controller.intiPlayVoice(view, item, false)
                        } else {
                            text = text+separador+item.get('cod_cdescripcion');
                        }
                        
                        view.lastiid = item.get("rec_iid");
                    }   
                })
                
                if (text != ''){
                    target.setSrc(baseurl+text);                    
                }
            }
        }});
	},
    
    intiPlayVoice: function (view, record, repetirSonido) {
        var controller = this;
        var text = '';
        var separador = '';
        if(!controller.application.MUTE) {
            if(!view.audio) {
                view.audio = new Audio();
            }
         
            view.repetirSonido = repetirSonido;
            
            var rsonido = record.get('cod_cSonido');
            var prioridad =  record.get('rec_iPrioridad');
            if (!rsonido){
                if (prioridad >10){
                    prioridad = prioridad.toString().substring(0, 1);
                }
                rsonido = "prioridad"+prioridad+'_'+locale+".mp3"
            }
            if (view.DSSSONIDO == 0 && prioridad!= 0){
                view.audio.pause();
                view.audio.src = '/gallery/codAlarmSound/'+rsonido;
                
                view.audio.onended = function() {
                    if(view.repetirSonido) {
                        //console.log('Repito sonido')
                        controller.intiPlayVoice(view, record, view.repetirSonido)
                        
                        document.onmousemove = function(e){
                            view.repetirSonido = false
                            document.onmousemove = function () {}
                        }
                    } else {                            
                        view.ultimoSonidoEvento = record.get('rec_iid')
                    }
                };
                
                if(view.ultimoSonidoEvento < record.get('rec_iid') || view.repetirSonido) {
                    view.audio.play();                        
                }
                
                view.ultimoSonidoEvento = record.get('rec_iid')
            } else {
                //text = text+separador+item.get('cod_cdescripcion');
            }
        }
    },
    
    onBeforeload: function(store,operation,options){
        var view = operation.scope; // llega vacio dedalo 19/9/2016
        var estados = "0,1,2,4,9";
        var alertas = 1;
        
        /*
        if (view.multimonitor){
            estados = null;
            alertas = null;
        }
        */
        operation.params ={
            //Alertas: alertas,
           // cod_nLeeSonido: 1,
            Origenes: null,
            est_nestado: 0, // solo cuentas habilitadas, pedido por fer G4S 11/10/2016
            Tipos: null,
            Mostrar: 1
        };
     /*   view.searchFilters.push({
                property:'rec_nestado',
                value: 0,
                id:'rec_nestado',
                base:true
            })*/
            
        //view.EventosStore.proxy.extraParams = {completo:false};
    }
});