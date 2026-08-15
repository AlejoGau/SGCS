//MIGRADO2024



function oauth2Callback(params) {
    var wildixApi = (typeof window !== 'undefined') ? window.wtapi : undefined;
    if (wildixApi && typeof wildixApi.handleCallbackData === 'function') {
        wildixApi.handleCallbackData(params);
    } else {
        console.warn('Received Wildix OAuth callback but wtapi is not available', params);
    }
}
Ext.define( 'Common.controller.LlamadaHelperController', {
    extend: 'Ext.app.Controller',
    stores: [ ],
    models: [ 'TablasTelefonosJuridiccionalesSearchModel', 'TablasResolucionesSearchModel', 'LlamadasModel', 'LlamadasSearchModel', 'SoftguardTelefonoModel', 'TablasResolucionesLlamadaSearchModel', 'TelefonoSearchModel', 'TelefonosDealerModel', 'TablasLineasSearchModel', 'm_telefonoModel', 'SoftguardUsuarioModel', 'EventosTiemLineModel', 'KeyModulesModel', 'p_grabacion_audioModel', 'SmartPanicSearchModel' ],
    views: [ 'LlamadaHelperView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            'llamadahelperview': {
                afterrender: this.initView,
                llamar: this.onLlamar,
                llamarDealer: this.onLlamarDealer,
                destroy: this.onDestroy,
                genesysConnectTokenLlamar: this.onGenesysConnectTokenLlamar
            },
            'llamadahelperview button[action=save]': {
                click: this.onSaveClick
            },
            'llamadahelperview button[action=close]': {
                click: this.onCloseClick
            },
            'llamadahelperview #usuarios': {
                select: this.onUsuarioSelect
            },
            'llamadacontactargridview': {
                itemdblclick: this.onItemClick,
            },
            'llamadacontactarjuridiccionalesgridview': {
                itemdblclick: this.onItemJuridiccionalesClick,
            },
            'llamadahelperview #loggerLauncher': {
                click: this.onLoggerLauncherClick
            },
            'llamadahelperview #btnsllamado button': {
                click: this.onLlamarClick
            },
            'llamadasmartpanicsgridview': {
                itemdblclick: this.onItemSmartpanicsClick,
            },
            'llamadahelperview #colgarMini': {
                click: this.onLlamarClick,
            },
            'llamadatelefonosdealergridview': {
                itemdblclick: this.onItemTelefonosDealerClick,
            }
        });
    }, // cierro init
    onDestroy: function(view, opt){
        console.log('EVENTO DESTROY DE LLAMADAHELPERVIEW');
        try{
            this.WildixColgar(view);
        }catch(e){
            console.log('No es una llamada wildix');
        }
        
    },
    onLlamar: function (view, rec ) {
        //forceNumber se encarga de no dejar que pase al siguiente numero
        view.forceNumber = true;
        this.onItemClick( view, rec )
        var buttons = this.getCallButtons( view );
        if( buttons.length > 0 ) {
            this.onLlamarClick( buttons[ 0 ] )
        } else {
            console.warn( 'LlamadaHelperView does not have call buttons available.' );
        }
    },   
        
    onLlamarDealer: function (view, rec ) {
        //armo este model para que sea todo compatible
        var modelLlamadaHelp = this.getM_telefonoModelModel().create( {
            tel_cnombre: rec.get( 'nombre' ),
            tel_ctelefono: rec.get( 'telefono' ),
            tel_cobservacion: rec.get( 'descripcion' )
        })
        this.onItemClick( view, modelLlamadaHelp )
        var buttons = this.getCallButtons( view );
        if( buttons.length > 0 ) {
            this.onLlamarClick( buttons[ 0 ] )
        } else {
            console.warn( 'LlamadaHelperView does not have call buttons available.' );
        }
    },
    onWindowGenesysOAuthCallback: function(event) {
        if (event.data.code) {
            var view = Ext.ComponentQuery.query('llamadahelperview')[0];
            view.genesysConfig.authorizedCode = event.data.code;
            console.log("Código genesys generado: " + view.genesysConfig.authorizedCode);
            view.fireEvent('genesysConnectTokenLlamar', view);
        }
    },

    addGenesysWindowEventListeners: function(view) {
        var controller = this;  
        window.removeEventListener("message", controller.onWindowGenesysOAuthCallback);
        window.addEventListener("message", controller.onWindowGenesysOAuthCallback);
    },
    initView: function(view ) {
        console.log("ENtro")
        console.log(view.record.get( 'cue_cclave' ))
        
        this.addGenesysWindowEventListeners(view);// agrego listener para genesys oauth en window javascript

        // si la view tiene llamada abierta no dejo que se cierre
        if( view.called ) {
            view.called.isLlamadaOpen = true;
        }
        if( view.hideClose ) {
            view.down( '#close' ).hide();
        }
        var comboJurisdiccionales = view.down( '#teljuridiccionales' );
        var comboUsuarios = view.down( '#usuarios' );
        var comboResoluciones = view.down( '#resoluciones' );
        var comboResolucionesMini = view.down( '#resolucionesMini' )
        var clave = view.down( '#clave' );
        var permisos = view.down( '#permisos' );
        var controller = this;
        
        view.down( '#formllamada' ).setDisabled( true );
        var store = KeyModulesStore;//this.getKeyModulesStoreStore();
        if( store.isModuleAvailable( 'Logger' ) ) {
            view.keyLogger = true;
        } else {
            view.keyLogger = false;
        }
        // busco en la meta de webremoto si tien operador
        var url = '/Rest/Security/Modules/2/Security';
        Ext.Ajax.request( {
            url: url,
            method: 'GET',
            success: function( resp, operation ) {
                
                var json = resp.responseText ? JSON.parse( resp.responseText ) : null;
                if( json ) {
                    if( !view.operador ) {
                        view.operador = json.Usuario;
                        view.operadorId = json.ope_iid;
                    }
                    view.net2phone_extension = json.net2phone_extension;
                    //view.net2phone_callerid = json.net2phone_callerid;
                    view.net2phone_callerid = json.net2phone_callerid_name+' <' +json.net2phone_callerid_number+'>';
                    view.wildix_extension = json.wildix_extension;
                    view.wildix_password = json.wildix_password;
                    view.asterixOperador = json.asterix_extension;
                    
                            if (json.SIPPROTOCOLTAG) {
                                var protocols = Ext.JSON.decode(json.SIPPROTOCOLTAG) || [];
                                Ext.Array.each(protocols, function(value) {
                                    view.down('#btnsllamado').add({
                                        xtype: 'button',
                                        itemId: 'btn_' + value.protocolo,
                                        translate: false,
                                        disabled: false,
                                        text: getLocale('Llamar por') + ' ' + value.protocolo,
                                        margin: '0 10 0 5',
                                        iconCls: 'icon-telephone-go',
                                        protocolo: value.protocolo
                                    });

                                

                                console.log("json.SIPPROTOCOLTAG",value)
                                console.log("controller.getSIPPROTOCOLTAGConfig(value.protocolo)",controller.getSIPPROTOCOLTAGConfig(value.protocolo))
                                console.log('actualizo')    
                                //si no tiene permiso logger no lo muestro
                                if( value.protocolo == 'Logger' && view.keyLogger != true ) {
                                    return false;
                                }
                                if( value.protocolo.toUpperCase() == 'WILDIX') {
                                    var _config = controller.getSIPPROTOCOLTAGConfig(value.protocolo);
                                    // agrego la librería de wildix y conecto
                                    console.log(window.hasOwnProperty('wtapi'));
                                    
                                    if (window.hasOwnProperty('wtapi')){
                                        if (wtapi.isConnected()){
                                            console.log('wildix api connected');
                                            var btn = view.down('#btn_'+value.protocolo);
                                            if (btn){
                                                view.down('#btn_'+value.protocolo).enable();
                                            }
                                            view.wildix_domain = _config.domain;
                                        }
                                        else {
                                            wtapi.on("connected", function(){
                                                console.log('wildix api connected');
                                                    var btn = view.down('#btn_'+value.protocolo);
                                                    if (btn){
                                                        view.down('#btn_'+value.protocolo).enable();
                                                    }
                                                view.wildix_domain = _config.domain;
                                                //console.log('Credenciales del wtapi: '+Ext.JSON.decode(wtapi.getCredentials()));
                                                
                                                
                                            });
                                            wtapi.on('oauthAuthorizationSuccess', (data) => {
                                                //console.log('OAuth authorization success', data);
                                                
                                            });        
                                            /*wtapi.telephony.on("call_updated", function(call){
                                                        console.log('call_updatedxxxxxxxxx');
                                                        console.log('getFormattedStatexxxxxx:'+call.getFormattedState());
                                                        console.log('isRecordedxxxxxx:'+call.isRecorded());
                                                        console.log('wildix_recordstarted:'+view.wildix_recordstarted);
                                                        if (call && call.getFormattedState()=='Connected' && !call.isRecorded() && !view.wildix_recordstarted && view.keyLogger){
                                                            console.log('Connected no esta grabando comienzo a grabar');
                                                            wtapi.telephony.startRecord(call,function(error){//wtapi.telephony.startRecord(call,controller.WildixGetRecordedFiles(call, view));
                                                                console.log('Error en startRecord: '+error);
                                                                
                                                                if(error==null){
                                                                    controller.WildixGetRecordedFiles(call, view);
                                                                    view.wildix_recordstarted=true;
                                                                }
                                                            });
                                                        } else if (call && call.getFormattedState()=='Connected' && call.isRecorded() && !view.wildix_recordstarted && view.keyLogger){
                                                            view.wildix_recordstarted=true;
                                                            controller.WildixGetRecordedFiles(call, view);
                                                        }
                                                    });*/
                                                                        
                                            wtapi.connect(); 
                                        }
                                    } else {
                                       
                                        Ext.Loader.loadScript({                                           
                                            url: getParametro('DESKTOPEXTERNALURL')+'/v2demo/dist/wtapi.v2.js',
                                                                                            
                                             onLoad: function () {
                                                    wtapi = new WTAPI();
 
                                                    

                                                    console.log('aun no ingreso a wildix');
                                                    wtapi.setOptions({
                                                        pbxUrl: _config.domain,//'https://usateam502.wildixin.com',
                                                        applicationId: _config.aplicationId,//'oauth2-softguard-0931886001672421446',
                                                        redirectUri: _config.redirectUri ,//'https://gcs.softguard.com/v2demo/demo/oauth2redirect.html',
                                                    });
                                                    console.log('seteo parametros wildix');
                                                    wtapi.on('connected', () => {
                                                        
                                                        console.log('Connected');
                                                        console.log('wildix api connected');
                                                        var btn = view.down('#btn_'+value.protocolo);
                                                        if (btn){
                                                            view.down('#btn_'+value.protocolo).enable();
                                                        }
                                                        //_config.protocol='http'
                                                        view.wildix_domain = _config.domain;     
                                                       // console.log('Credenciales del wtapi: '+Ext.JSON.decode(wtapi.getCredentials()));
                                                                                                     
                                                    });
                                                    console.log('no paso nada');
                                                    wtapi.on('disconnected', () => {
                                                        console.log('Disconnected');
                                                        
                                                    });
 
                                                    wtapi.on('oauthAuthorizationError', (error) => {
                                                        console.error('OAuth authorization error', error);
                                                        
                                                        notifyError( 'Error de autorización' );
                                                    });
                                                    wtapi.on('oauthAuthorizationSuccess', (data) => {
                                                        console.log('OAuth authorization success', data);
                                                        
                                                    });
                                                    wtapi.on("connected", function(){
                                                        console.log('wildix api connected');
                                                        var btn = view.down('#btn_'+value.protocolo);
                                                        if (btn){
                                                            view.down('#btn_'+value.protocolo).enable();
                                                        }
                                                        view.wildix_domain = _config.domain;
                                                        
                                                    });
                                                    wtapi.telephony.on("call_terminated",function(call){
                                                        console.log("Causa de el colgar: "+call.getHangupCause());
                                                        if(call.getHangupCause()==16 && view.wildix_colgado != true 
                                                            && call.isIncoming()== false){//16 es colgado por la otra parte
                                                            
                                                            controller.WildixHangupCallback(view,call);
                                                          
                                                            view.wildix_recordstarted = false;
                                                            //controller.popularGrids( view );
                                                        }
                                                        view.wildix_colgado = false;
                                                        //controller.WildixHangupCallback(view,call)
                                                    });
                                                    wtapi.telephony.on("call_updated", function(call){
                                                                console.log('call_updated Event view.wildix_recordstarted: '+view.wildix_recordstarted);
                                                                if (call && call.getFormattedState()=='Connected' && !call.isRecorded() && !wtapi.wildix_recordstarted && view.keyLogger){
                                                                    console.log('Connected no esta grabando comienzo a grabar');
                                                                    wtapi.telephony.startRecord(call,function(error){//wtapi.telephony.startRecord(call,controller.WildixGetRecordedFiles(call, view));
                                                                        console.log('Error en startRecord: '+error);
                                                                        
                                                                        if(error==null){
                                                                            controller.WildixGetRecordedFiles(call, view);
                                                                            wtapi.wildix_recordstarted=true;
                                                                        }
                                                                    });
                                                                } else if (call && call.getFormattedState()=='Connected' && call.isRecorded() && !wtapi.wildix_recordstarted && view.keyLogger){
                                                                    wtapi.wildix_recordstarted=true;
                                                                    controller.WildixGetRecordedFiles(call, view);
                                                                }
                                                            });
                                                    wtapi.connect();
                                            
                                        }
                                           // url:'https://www.wildix.com/webapi/wtapi.min.js' // vieja
                                            //url:'https://webapi.wildix.com/v1/wtapi.min.js' // nueva
                                           
                                            //url: _config.domain + '/public/wtapi.js' // dinamica v1
                                           // url: _config.domain + '/dist/wtapi.v2.js'
                                          // url:'https://usateam502.wildixin.com/dist/wtapi.v2.js' // v2
                                            //url:'https://gcs.softguard.com/v2demo/demo/wtapi.v2.js' // v2
                                            /*
                                            onLoad:function(){
                                                // busco el dominio de wildix
                                                
                                                  let options = {
                                                        applicationId: _config.aplicationId,// 'oauth2-softguard-0931886001672421446',
                                                        redirectUri:_config.redirectUri ,//'https://gcs.softguard.com/v2demo/demo/oauth2redirect.html',
                                                        pbxUrl: _config.domain,//'https://usateam502.wildixin.com',
                                                    }
                                                    console.log(options);
                                               
                                               window.wtapi = new WTAPI(); //VOLVER ATRAS new WTAPI(view.wildix_extension, view.wildix_password, _config.domain);
                                              
                                               window.wtapi.setOptions(options);
                                              // window.wtapi = new WTAPI(view.wildix_extension, view.wildix_password, url);
                                                wtapi.on("connected", function(){
                                                    console.log('wildix api connected');
                                                    var btn = view.down('#btn_'+value.protocolo);
                                                    if (btn){
                                                        view.down('#btn_'+value.protocolo).enable();
                                                    }
                                                    view.wildix_domain = _config.domain;
                                                });
                                              window.wtapi.on('oauthAuthorizationError', (error) => {
                                                    console.error('OAuth authorization error', error);
                                               });
                                                window.wtapi.on('oauthAuthorizationSuccess', (data) => {
                                                    console.log('OAuth authorization success', data);
                                                });
                                                window.wtapi.connect(); 
                                            }*/
                                        })
                                        
                                    }
                                } else{
                                    view.down('#btn_'+value.protocolo).enable();
                                    
                                    if(value.protocolo.toUpperCase() == 'GENESYS'){
                                        controller.genesysGetCode(view,value.protocolo.toUpperCase());
                                        controller.genesysConnect(view);
                                        
                                    }
                                }    
                            }
                        )
                    } else {
                        // parametro protocolo VOIP   
                        siptags = getParametro( "SIPPROTOCOLTAG" );
                        Ext.Array.each( Ext.JSON.decode( siptags ), function( value ) {
                            view.down( '#btnsllamado' ).add( {
                                xtype: 'button',
                                translate: false,
                                text: getLocale( 'Llamar por' ) + ' ' + value.protocolo,
                                margin: '0 10 0 5',
                                iconCls: 'icon-telephone-go',
                                protocolo: value.protocolo
                            })
                        })
                    }
                }
            }
        })
        view.down( '#clavetelefono' ).setValue( view.record.get( 'cue_cclave' ) );
        view.down( '#permisotelefono' ).setValue( view.record.get( 'cue_cpermiso' ) );
        view.down( '#telfonocuenta' ).setValue( view.record.get( 'cue_ctelefono' ) );
        view.filters = [ {
            property: "tel_cprovincia",
            value: view.record.get( 'cue_cprovincia' )
        }];
        var mystore = Ext.create( 'Ext.data.Store', {
            model: controller.getSoftguardUsuarioModelModel()
        });
        var _ObjectId = view.record.get( 'cue_iid' );
        comboUsuarios.bindStore( mystore );
        // una vez que cargue el store hago el binding con la view
        mystore.load( { ObjectId: _ObjectId, view: view, store: mystore });
        view.resoluciones = Ext.create( 'Ext.data.Store', {
            model: this.getTablasResolucionesLlamadaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: false
        })
        comboResoluciones.bindStore( view.resoluciones );
        comboResolucionesMini.bindStore( view.resoluciones );
        var DSSLLAMADASIMPLE = getParametro( 'DSSLLAMADASIMPLE' );
        view.resoluciones.load( {
            callback: function() {
                if( DSSLLAMADASIMPLE == 1 && ( comboResoluciones.getValue() == '0' || comboResoluciones.getValue() == 0 || !comboResoluciones.getValue() ) ) {
                    comboResoluciones.setValue( comboResoluciones.getStore().getAt( 0 ) );
                }
            }
        });
        this.popularGrids( view );
        var visualizar = getParametro( "VISUALIZANROTEL" );
        if( !visualizar ) {
            view.down( '#contactar' ).down( '[dataIndex=tel_cpredigito]' ).setVisible( false );
            view.down( '#contactar' ).down( '[dataIndex=tel_ctelefono]' ).setVisible( false );
            view.down( '#contactar' ).down( '[dataIndex=tel_cpostdigito]' ).setVisible( false );
            view.down( 'llamadacontactarjuridiccionalesgridview' ).down( '[dataIndex=tel_ctelefono]' ).setVisible( false );
        }
    },
          
    getSIPPROTOCOLTAGConfig(protocolo) {
        var SIPPROTOCOLTAG = getParametro('SIPPROTOCOLTAG');
// este config de Asterix para llevar al cliente : [{"protocolo":"Logger","config":""},{"protocolo":"Zoiper","config":""},{"protocolo":"SIP","config":"{\"recordPBX\":true}"},{"protocolo": "Asterix", "config":" {\"BearerToken\":\"YJspJQyDVwT5Q2RwnTchjp8jMmDU8Qah\" , \"IP\":\"https://192.168.1.90\", \"Operador\" : \"SIP/10\" }"}]

        //Federico V. Modifique el codigo para que no requiera de un json valido para activar el config 11/08/2023
        // Asegurarse de que SIPPROTOCOLTAG tenga un valor válido antes de decodificar
        if (SIPPROTOCOLTAG) {
            try {
                var jsonSIPPROTOCOLTAG = Ext.JSON.decode(SIPPROTOCOLTAG);
                
                var _config;
                Ext.Array.each(jsonSIPPROTOCOLTAG, function(value) {
                    if (value.protocolo && value.protocolo.toUpperCase() === protocolo.toUpperCase() && value.config) {
                        try {
                            _config = Ext.JSON.decode(value.config);
                        } catch (error) {
                            console.error("Error decoding protocol config:", error);
                        }
                    }
                });
                return _config;
            } catch (error) {
                console.error("Error decoding SIPPROTOCOLTAG:", error);
            }
        }
        return null; // Manejar la situación donde no se pudo obtener la configuración
    },
        
    hideButtons: function (siptag, view ) {
        view.down( '#btnllamar' ).show();
        view.down( '#loggerLauncher' ).hide();
    },
    getCallButtons: function(view) {
        var container = view && view.down ? view.down('#btnsllamado') : null;
        if( !container || !container.items ) {
            return [];
        }
        return container.items.items || [];
    },
    getWtapi: function() {
        if( typeof window !== 'undefined' && window.wtapi ) {
            return window.wtapi;
        }
        return null;
    },
    popularGrids: function (view ) {
        var controller = this;
        var filter = [];
        var emergencia = view.down('#listaemergencia');
        var contactar = view.down( '#contactar' );
        var hasEmergencia = false;
        filter.push( {
            property: 'o2.rec_iid',
            value: view.record.get( 'rec_iid' )
        });
        filter.push( {
            property: 'o.rec_nestado',
            value: 8
        });
        var storeLlamadas = Ext.create( 'Ext.data.Store', {
            model: this.getLlamadasSearchModelModel(),
            remoteFilter: true,
            autoload: false,
            filters: filter,
            pageSize: 10000
        });
        storeLlamadas.load( {
            callback: function( recordsLlamadas ) {
                var storeTelefonos = Ext.create( 'Ext.data.Store', {
                    model: controller.getTelefonoSearchModelModel(),
                    remoteFilter: true,
                    autoload: false,
                    remoteSort: false,
                    pageSize: 10000,
                    sorters: [
                        {
                            property: 'tel_norden',
                            direction: 'ASC'
                        }
                    ],
                    filters: [
                        {
                            property: 'tel_nsp:ININT',
                            value: '0,2,3'
                        }, {
                            property: 'tel_iidcuenta',
                            value: view.record.get( 'cue_iid' )
                        }
                    ]
                });
                var DSSLLAMADASIMPLE = getParametro( 'DSSLLAMADASIMPLE' );
                storeTelefonos.load( {
                    ObjectId: view.record.get( 'cue_iid' ), callback: function( recordsTelefonos ) {
                        storeTelefonos.each( function( record ) {
                            Ext.Array.each( recordsLlamadas, function( recordx ) {
                                var telefono = recordx.get( 'rec_cContenido' ).split( " " );
                                if( record ) {
                                    if( telefono[ 0 ] == controller.armarNumero( record ) ) {
                                        record.set( '_usado', true );
                                        record.set( 'tel_ctelefono', record.get( 'tel_ctelefono' ) );
                                    }
                                }
                            });
                            // me fijo si el contacto tiene lista de emergencia y si es igual a la del evento
                            if (record.get('tel_clista')!='' && view.record.get('zon_clistaemergencia')!='' && record.get('tel_clista') == view.record.get('zon_clistaemergencia')){
                                emergencia.getStore().add(record);
                                hasEmergencia = true;
                            }
                        });
                        var llamar = '';
                        var storellamar = hasEmergencia ? emergencia.getStore() : storeTelefonos;
                        
                        storellamar.each( function( record ) {
                            if( ( record.get( '_usado' ) == 'false' && DSSLLAMADASIMPLE != 1 ) || ( record.get( '_usado' ) == 'false' && !view.telefono ) ) {
                                llamar = controller.armarNumero( record ) + " " + record.get( 'tel_cnombre' );
                                view.down( '#llamadatelefono' ).setValue( controller.armarNumero( record ) );
                                view.down( '#llamadanombre' ).setValue( record.get( 'tel_cnombre' ) );
                                view.down( '#tel_cobservacion' ).setValue( record.get( 'tel_cobservacion' ) );
                                view.down( '#clavecontacto' ).setValue( record.get( 'tel_cclave' ) );
                                view.down( '#permisoscontacto' ).setValue( record.get( 'tel_cpermiso' ) );
                                view.down( '#llamada' ).setValue( llamar );
                                view.telefono = record;
                            }
                            if( llamar != '' )
                                return false;
                        });
                        var tel = hasEmergencia ? emergencia.getStore().getAt( 0 ) : storeTelefonos.getAt( 0 );
                        if( ( llamar == '' && tel && DSSLLAMADASIMPLE != 1 ) || ( llamar == '' && tel && !view.telefono ) ) {
                            llamar = tel.get( 'tel_cpredigito' ) + tel.get( 'tel_ctelefono' ) + tel.get( 'tel_cpostdigito' ) + " " + tel.get( 'tel_cnombre' );
                            view.down( '#llamadatelefono' ).setValue( controller.armarNumero( tel ) );
                            //llamar = tel.get('tel_ctelefono')+ " " +tel.get('tel_cnombre');
                            //view.down('#llamadatelefono').setValue(tel.get('tel_ctelefono'));
                            view.down( '#llamadanombre' ).setValue( tel.get( 'tel_cnombre' ) );
                            view.down( '#tel_cobservacion' ).setValue( tel.get( 'tel_cobservacion' ) );
                            view.down( '#llamada' ).setValue( llamar );
                            view.telefono = tel;
                        }
                        
                        //var toolbar = null;
                        if( contactar ) {
                            //toolbar = contactar.down('pagingtoolbar');         
                            contactar.bindStore( storeTelefonos );
                        }
                        if (!hasEmergencia){
                            emergencia.tab.hide();
                            view.down('tabpanel').setActiveTab(contactar);
                        } else {
                            emergencia.getView().refresh();
                            view.down('tabpanel').setActiveTab(emergencia);
                        }
                    }
                });
                
                var storeTelefonosJuridiccionales = Ext.create( 'Ext.data.Store', {
                    model: controller.getTablasTelefonosJuridiccionalesSearchModelModel(),
                    remoteFilter: true,
                    autoload: false,
                    pageSize: 10000,
                    filters: [
                        {
                            property: 'tel_cprovincia',
                            value: view.record.get( 'cue_cprovincia' )
                        }
                    ]
                });
                //storeTelefonosJuridiccionales.getProxy().setExtraParam( "cue_iid", view.record.get( 'cue_iid' ) );
                view.down( 'llamadacontactarjuridiccionalesgridview' ).bindStore( storeTelefonosJuridiccionales );
                storeTelefonosJuridiccionales.load( {
                    callback: function( recordsTelefonos ) {
                        Ext.Array.each( recordsTelefonos, function( record ) {
                            Ext.Array.each( recordsLlamadas, function( recordx ) {
                                var telefono = recordx.get( 'rec_cContenido' ).split( " " );
                                if( record ) {
                                    if( telefono[ 0 ] == controller.armarNumero( record ) ) { //record.get('tel_ctelefono')) {
                                        record.set( '_usado', true );
                                        record.set( 'tel_ctelefono', record.get( 'tel_ctelefono' ) );
                                    }
                                }
                            });
                        });
                    }
                });
                var storeTelefonosSmartPanics = Ext.create( 'Ext.data.Store', {
                    model: controller.getTelefonoSearchModelModel(),
                    remoteFilter: true,
                    autoload: false,
                    remoteSort: false,
                    pageSize: 10000,
                    sorters: [
                        {
                            property: 'tel_norden',
                            direction: 'ASC'
                        }
                    ],
                    filters: [
                        {
                            property: 'tel_nsp:ININT',
                            value: '1,3'
                        }, {
                            property: 'tel_iidcuenta',
                            value: view.record.get( 'cue_iid' )
                        }
                    ]
                });
                //var toolbar = view.down('llamadasmartpanicsgridview').down('pagingtoolbar');
                if( view.down( 'llamadasmartpanicsgridview' ) ) {
                    view.down( 'llamadasmartpanicsgridview' ).bindStore( storeTelefonosSmartPanics );
                    storeTelefonosSmartPanics.load( {
                        ObjectId: view.record.get( 'cue_iid' ), callback: function( recordsSmartpanicsTelefonos ) {
                            storeTelefonosSmartPanics.each( function( record ) {
                                Ext.Array.each( recordsLlamadas, function( recordx ) {
                                    var telefono = recordx.get( 'rec_cContenido' ).split( " " );
                                    if( record ) {
                                        if( telefono[ 0 ] == controller.armarNumero( record ) ) {
                                            record.set( '_usado', true );
                                            record.set( 'tel_ctelefono', record.get( 'tel_ctelefono' ) );
                                        }
                                    }
                                });
                            })
                        }
                    });
                }
                //telefonos dealer
                var model = controller.getTelefonosDealerModelModel()
                var storeTelefonosDealer = Ext.create( 'Ext.data.Store', {
                    model: controller.getTablasLineasSearchModelModel(),
                    pageSize: 10000
                })
                view.down( 'llamadatelefonosdealergridview' ).bindStore( storeTelefonosDealer )
                var storeLinea = Ext.create( 'Ext.data.Store', {
                    model: controller.getTablasLineasSearchModelModel(),
                    pageSize: 10000,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [ {
                        property: 'lin_ccodigo',
                        value: view.record.get( 'cue_clinea' )
                    }]
                })
                storeLinea.load( {
                    callback: function( records ) {
                        var record = records[ 0 ]
                        view.telefonos = []
                        if( record.get( 'lin_cMetaData' ) != '' ) {
                            view.metadata = Ext.JSON.decode( record.get( 'lin_cMetaData' ) );
                            if( view.metadata && view.metadata.telefonos ) {
                                view.telefonos = view.metadata.telefonos;
                                Ext.Array.each( view.telefonos, function( v, k ) {
                                    //agrego al store de la grilla
                                    storeTelefonosDealer.add( model.create( v ) )
                                })
                            }
                        }
                    }
                });
            }
        });
    },
        
    armarNumero: function (record ) {
        var pre = record.get( 'tel_cpredigito' );
        var post = record.get( 'tel_cpostdigito' );
        var numero = record.get( 'tel_ctelefono' );
        var numeroCompleto = '';
        if( Ext.util.Format.trim( pre ) ) {
            numeroCompleto = pre + "-"
        }
        numeroCompleto += numero;
        if( Ext.util.Format.trim( post ) ) {
            numeroCompleto += "-" + post
        }
        return numeroCompleto;
    },
        
    onCloseClick: function (button ) {
        var view = button.up( 'llamadahelperview' );
        view.called.isLlamadaOpen = false;
        var timeline = view.called.down( 'eventotimelinegridview' );
        var controller = this;
        if( timeline ) {
            timeline.fireEvent( 'objectchanged', { record: view.record, view: view.called.down( 'eventotimelinegridview' ) });
        }
        // por si el evento se cerro y ya no esta la ventana
        if( view && view.called && view.called.down( '#procesa2' ) ) {
            view.called.down( '#procesa2' ).setDisabled( false )
            view.called.down( '#procesarmultiple' ).setDisabled( false )
            view.called.down( '#pendiente' ).setDisabled( false )
            view.called.down( '#espera' ).setDisabled( false )
            view.called.down( '#cerrar' ).setDisabled( false )
        }
        view.closing = true;
        if( getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            Ext.Array.each( controller.getCallButtons( view ), function( bt ) {
                if( bt.colgar ) {
                    controller.onLlamarClick( bt )
                }
            })
        }
        
        //wtapi.disconnect();
        view.up( 'window' ).close();
    },
        
    onSaveClick: function (button ) {
        var view = button.up( 'llamadahelperview' );
        var observaciones = view.down( '#observaciones' );
        var resolucion = view.down( '#resoluciones' );
        var resolucionTxt = resolucion.findRecordByValue( resolucion.getValue() ).get( 'rll_cdescripcion' );
        var usuario = view.down( '#usuarios' );
        var llamadar = view.down( '#llamada' );
        var llamadanombre = view.down( '#llamadanombre' ).getValue();
        var llamadatelefono = view.down( '#llamadatelefono' ).getValue();
        var operador = view.operador;
        var date = new Date();
        date = Ext.Date.format( date, 'd-m-Y H:i:s' );
        var controller = this;
        var operadorId = view.operadorId;
        var strOperador = '';
        if( operador ) {
            strOperador = "[" + operador + "]";
        }
        var msgPosProcesado = '';
        if( view.posProcesado ) {
            msgPosProcesado = getLocale( 'Llamada realizada post-procesado' );
        }
        var modelLlamadas = this.getLlamadasModelModel().create( {
            rec_iidcuenta: view.record.get( 'cue_iid' ),
            rec_tfechahora: view.fechaInicioLlamada,
            rec_tFechaRecepcion: new Date(),
            rec_tFechaProceso: new Date(),
            rec_cObservaciones: getLocale( "Llamó a : " ) + llamadanombre + ' ' + llamadatelefono + " (" + resolucionTxt + ")" + " [" + view.down( '#timer' ).getValue() + "]",
            rec_idResolucion: resolucion.getValue(),
            rec_iusuario: usuario.getValue(),
            rec_iTE: view.record.get( 'rec_iid' ),
            rec_calarma: '_TE',
            rec_cContenido: llamadar.getValue(),
            rec_nestado: 8,
            rec_ioperador: operadorId
        });
        modelLlamadas.setId(0);
        modelLlamadas.save( {
            scope: this,
            callback: function( record, operation ) {
                var rec_iid = view.record.get( 'rec_iid' );
                var timer = '';
                if(view.down( '#timer' )){
                    timer = view.down( '#timer' ).getValue();
                }
                Ext.Ajax.request( {
                    url: '/rest/search/AtencionEventoObservacion',
                    params: {
                        rec_iid: rec_iid,
                        rec_cObservaciones: "(" + llamadatelefono + " " + resolucionTxt + ") " + msgPosProcesado + " " + llamadanombre + " " + observaciones.getValue() + " [" + timer + "]"
                    },
                    method: 'GET',
                    scope: this,
                    success: function( response ) {
                        var parametros = Ext.JSON.decode( response.responseText );
                        var rec = parametros.rows[ 0 ];
                        if( !getParametro( 'DSSLLAMADASIMPLE' ) ) {
                            observaciones.setValue( '' );
                            usuario.setValue( '' );
                            resolucion.setValue( '' );
                            llamadar.setValue( '' );
                        }
                        if( !view.closing )
                            controller.popularGrids( view );
                        //guardo en eventostimeline
                        var eventosTimeLine=controller.getEventosTiemLineModelModel().create( {
                            etl_icuenta: view.record.get( 'cue_iid' ),
                            etl_tfechahora: new Date(),
                            etl_caccion: '%LlamadoTelefonico% : ' + msgPosProcesado + " (" + resolucionTxt + ") " + observaciones.getValue(),
                            etl_cobservacion: "(" + llamadatelefono + " " + resolucionTxt + ") " + observaciones.getValue() + " [" + view.down( '#timer' ).getValue() + "]",
                            etl_cowner: '%MWR%',
                            etl_ioperador: operadorId,
                            etl_irecid: rec_iid,
                            etl_iaccioncode: 202
                        });
                        eventosTimeLine.setId(0);
                        eventosTimeLine.save();
                        //este evento lo utiliza eventocontroller para refrescar otras grillas
                        view.fireEvent( 'save', view, modelLlamadas )
                    }
                });
                if( !getParametro( 'DSSLLAMADASIMPLE' ) ) {
                    view.resetOriginal();
                    view.down( 'llamadarealizadasgridview' ).store.load();
                }
                observaciones.setValue( '' );
                usuario.setValue( '' );
                // view.up('window').close();
            }
        });
    },
    onItemSmartpanicsClick: function(view, record, item, index, e, options ) {
        var view = view.up( 'llamadahelperview' );
        var controller = this;
        if( getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            Ext.Array.each( controller.getCallButtons( view ), function( bt ) {
                if( bt.colgar ) {
                    controller.onLlamarClick( bt, record )
                }
            })
        } else if( !getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            //no hace nada
        } else if( !view.llamando ) {
            controller.setFormlarioLlamada( view, record )
        }
    },
        
    onItemTelefonosDealerClick: function(view, record, item, index, e, options ) {
        var view = view.up( 'llamadahelperview' );
        var controller = this;
        //armo este model para que sea todo compatible
        var modelLlamadaHelp = this.getM_telefonoModelModel().create( {
            tel_cnombre: record.get( 'nombre' ),
            tel_ctelefono: record.get( 'telefono' ),
            tel_cobservacion: record.get( 'descripcion' )
        })
        if( getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            Ext.Array.each( controller.getCallButtons( view ), function( bt ) {
                if( bt.colgar ) {
                    controller.onLlamarClick( bt, modelLlamadaHelp )
                }
            })
        } else if( !getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            //no hace nada
        } else if( !view.llamando ) {
            controller.setFormlarioLlamada( view, modelLlamadaHelp )
        }
    },
        
    onItemJuridiccionalesClick: function(view, record, item, index, e, options ) {
        var view = view.up( 'llamadahelperview' );
        var controller = this;
        if( getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            Ext.Array.each( controller.getCallButtons( view ), function( bt ) {
                if( bt.colgar ) {
                    controller.onLlamarClick( bt, record )
                }
            })
        } else if( !getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            //no hace nada
        } else if( !view.llamando ) {
            controller.setFormlarioLlamada( view, record )
        }
    },
    onItemClick: function(view, record, item, index, e, options ) {
        var view = view.up( 'llamadahelperview' ) ? view.up( 'llamadahelperview' ) : view;
        var controller = this;
        if( getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            Ext.Array.each( controller.getCallButtons( view ), function( bt ) {
                if( bt.colgar ) {
                    controller.onLlamarClick( bt, record )
                }
            })
        } else if( !getParametro( 'DSSLLAMADASIMPLE' ) && view.llamando ) {
            //no hace nada
        } else if( !view.llamando ) {
            controller.setFormlarioLlamada( view, record )
        }
    },

    genesys03ConsultarConversacion: function(view){

        getSIPPROTOCOLTAGConfig
        const searchCriteria = {
            "criteria": {
                "clauses": [{
                    "predicates": [{
                        "column": "AUX01",
                        "columnType": "alphabetic",
                        "operator": "EQUALS",
                        "value": "idsoftguard"
                    }]
                }]
            }
        };

        fetch('https://api.usw2.pure.cloud/api/v2/outbound/contactlists/{contactListId}/contacts/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+view.genesysConfig.token_colgar
            },
            body: JSON.stringify(searchCriteria)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Contact search successful:', data);
        })
        .catch(error => {
            console.error('Error searching for contacts:', error);
        });

    },

    genesys02Colgar: function(view){
        var resolucion = view.down( '#resoluciones' );
        var resolucionTxt = resolucion.findRecordByValue( resolucion.getValue() ).get( 'rll_cdescripcion' );

        const flowData = {
            "flowId": view.genesysConfig.flowId+"", // el flowid se debería agregar al config de genesys
            "inputData": {
                "Flow.SoftGuard": view.genesysAUX01, // aquí va el AUX01 que se obtiene de la llamada
                                                               // por ahora va el id del evento 
                "Flow.CodigoDeConclusion": resolucionTxt,
                "Flow.agent": _UserData.UserId // id del operador que cuelga
            }
        };

        //fetch('https://api.usw2.pure.cloud/api/v2/flows/executions', {
        fetch(view.genesysConfig.URL+'flows/executions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+view.genesysConfig.token_colgar
            },
            body: JSON.stringify(flowData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Flow execution successful:', data);
        })
        .catch(error => {
            console.error('Error executing flow:', error);
        });

    },

    cancelarInterfazLlamando: function(view){
        var controller = this;
        var btn = view.down( '#btnsllamado' ).items.items[ 0 ];
        btn.setText( getLocale( view.btnColgar ) );
        btn.colgar = false;
        view.down( '#agenda' ).setDisabled( false );
        view.down( '#close' ).setDisabled( false );
        view.down( '#timer' ).hide();
        view.llamando = false;

        //vuelvo a mostrar toodos los otros botones
        Ext.Array.each( view.down( '#btnsllamado' ).items.items, function( bt ) {
            bt.setDisabled( false )
            bt.setText( bt._text )
        })
        view.btnColgar = ''
        view.down( '#formllamada' ).setDisabled( true );        
        controller.setFormlarioLlamada( view, recordLlamando )
        clearInterval( view.timerInteval );
    },


    consultarEstadoOperador: function(view){
        var controller = this;
        var loadingMessage = 'Verificando el estado del operador...';
        if (view && view.setLoading) {
            view.setLoading(loadingMessage);
        } else {
            Ext.getBody().mask(loadingMessage);
        }
        const searchPostData = {
              query: [
                    {
                        type: "EXACT",

                        fields: [

                            "addresses.email"

                        ],

                        value: _UserData.UserId

                    }
                ]  
        }     
        //fetch(view.genesysConfig.URL+"/users/search", {
        fetch(view.genesysConfig.URL+view.genesysConfig.GetUserByIdUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+view.genesysConfig.token_colgar
                },
                body: JSON.stringify(searchPostData)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red de Genesys');
            }
            return response.json();
        } ).then(data => {  
            console.log('El search del Id del estado del operador es', data);
            if(data.results.length>0){
                var userData = data.results[0];
                var getUserStateUrl = view.genesysConfig.URL+view.genesysConfig.GetUserStateUrl.toUpperCase().replace("{USERID}", userData.id);
                //verifico el estado
                //fetch(view.genesysConfig.URL+"/users/"+userData.id+"/routingstatus", {
                fetch(getUserStateUrl, {
                    method:"GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+view.genesysConfig.token_colgar
                    },                    
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la red de Genesys al consultar Id del estado operador');
                    }
                    return response.json();
                }).then(statusData => {
                    console.log('El estado del operador es', statusData);
                    if(statusData.status=="OFF_QUEUE"){
                        controller.genesys01InsertarBarraLlamar(view);
                    }else{
                        notifyError("El operador no está disponible para realizar la llamada");
                        controller.cancelarInterfazLlamando(view);
                    }
                }).catch(error => {
                    console.error('Error al buscar el estado del operador:', error);
                }).finally(function(){
                    // hide loading mask
                    if (view && view.setLoading) {
                        view.setLoading(false);
                    } else {
                        Ext.getBody().unmask();
                    }
                });

            }

        })
        .catch(error => {
            console.error('Error al buscar el estado del usuario:', error);
        }).finally(function(){
           console.log('Fin de primera consulta para obtener el Id del estado del operador'); 
        });

    },


    genesysTraerColaDealeryLlamar: function(view){
        const nombreCola = view.record.get("cue_clinea");
        const colaDealerUrl = view.genesysConfig.URL+'routing/queues?name='+nombreCola;//'https://api.usw2.pure.cloud/api/v2/routing/queues?name='+nombreCola;
        var controller = this;
        fetch(colaDealerUrl,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+view.genesysConfig.token_llamar
            }
        }).then(response=>{
            if(!response.ok){

            }
            return response.json();
        }).then(data =>{
            console.log('Genesys cola dealer', data);
            if(data.total>0){
                view.genesysConfig.dealerQueue = data.entities[0].id;
            }
            controller.genesys01InsertarBarraLlamar(view);
        })
        .catch(error => {
            console.error('Error fetching Genesys cola dealer',error);
        });
    },

    genesys01InsertarBarraLlamar: function(view) {
       var controller = this;
       view.genesysAUX01 = new Date().getTime().toString().substring(3,13);
            const contactData = {
                //"flowId":   view.genesysConfig.flowIdInsertarBarraLlamar+"" ,// "bffaf2c8-660c-482c-a953-7332ad6bc8ff",
                "phoneNumber" : view.telefono.get("tel_ctelefono"),
                "callerIdName": "WeMonitor",
                "callFromQueueId": view.genesysConfig.dealerQueue,
                "sessionType":"softphone",                                            // antiguo "68357de5-4da2-40f9-b814-b18718509f55"
                "attributes": {
                    //"Flow.CampaignId": view.genesysConfig.CampaignId+"",// "0fc7ffd2-45c2-4fc3-a5bb-20ae545ab1e9"   
                    "ContactListId": view.genesysConfig.contactListId,                   
                    "DEALER": view.record.get("cue_clinea"),
                    "NOCUENTA": view.record.get("cue_ncuenta"),
                    "NOMBREDELACUENTA": view.record.get("cue_cnombre"),
                    "NOMBREDELCONTACTO": view.telefono.get("tel_cnombre"),
                    "TELEFONO": view.telefono.get("tel_ctelefono"),
                    "OBSERVACION": view.telefono.get("tel_cobservacion"), 
                    "ORDEN": view.telefono.get("tel_norden")+"", 
                    "agent": _UserData.UserId, 
                    "ZONAHORARIO": "America/Mexico_City",
                    "AUX01": view.genesysAUX01 //por ahora mando el id del evento

                }
            };
            //se debe traer desde el config de genesys el token de contactListId
            //fetch('https://api.usw2.pure.cloud/api/v2/outbound/contactlists/b6712b7f-4d94-4616-bbdd-fb8aa7307ba9/contacts', {
            fetch(view.genesysConfig.URL+'conversations/calls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+view.genesysConfig.token_llamar
                },
                body: JSON.stringify(contactData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Contact creation successful:', data);
            })
            .catch(error => {
                console.error('Error creating contact:', error);
            });        
    },      
    genesysGetCode: function(view, protocolo){
        view.genesysConfig = this.getSIPPROTOCOLTAGConfig(protocolo);
        view.genesysConfig.token_llamar = Ext.util.Cookies.get('genesys_tokenllamada'); // reviso si ya tengo el token en la cookie
        if (!view.genesysConfig.token_llamar){ // sino existen el token 
            const clientId=  encodeURIComponent(view.genesysConfig.ClientId);//'0404fa7c-8097-4f94-875f-ffe554a91dd9'; //SETEAR EN CONFIG
            const redirectUri = encodeURIComponent(view.genesysConfig.RedirectGetCode);//'https://gcs.softguard.com/genesysmonitor/GetCode.html'; //SETAR DESDE CONFIG
            window.open("https://login.usw2.pure.cloud/oauth/authorize?client_id="+clientId+"&response_type=code&redirect_uti="+redirectUri, "popup", "width=500,height=400");
        }
    },

    //con este método se obtiene el token tipo pcke para realizar llamadas
    //son dos token distintos que se usan para llamar y para colgar
    onGenesysConnectTokenLlamar: function(view){
        var controller = this;
        const body =
        "grant_type="+encodeURIComponent("authorization_code") +
        "&code="+encodeURIComponent(view.genesysConfig.authorizedCode )+
        "&redirect_uri="+encodeURIComponent(view.genesysConfig.RedirectGetCode);//encodeURIComponent("https://gcs.softguard.com/genesysmonitor/GetCode.html"); //SETEAR DESDE CONFIG        
        //"https://gcs.softguard.com/genesys/login/oauth/token"
        // https://login.usw2.pure.cloud/oauth/authorize nuevo esquema de autorización

        //fetch('https://gcs.softguard.com/genesys/login/oauth/token', {
        fetch(view.genesysConfig.LoginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
               /*SETEAR DESDE CONFIG */ 'Authorization': 'basic '+view.genesysConfig.AuthorizationCall//'basic MDQwNGZhN2MtODA5Ny00Zjk0LTg3NWYtZmZlNTU0YTkxZGQ5OkEtb2h5UTJHWnRucUs4TENYUGxyOXNPSzlfdHFHSms2WWl6aFJXRTQtanM='//'Basic '+view.genesysConfig.Authorization//'Basic '+view.genesysConfig.Authorization//'Basic '+btoa(clientId+":"+clientSecret)
            },
            body: body
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                view.genesysConfig.token_llamar = data.access_token;

                // Calculate expiration date 12 hs
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (12 * 60 * 60 * 1000)); // 12 hs de experiración para token de llmada genesys

                Ext.util.Cookies.set('genesys_tokenllamada', data.access_token, expirationDate);

                //controller.genesysTraerColaDealer(view);             
            })
            .catch(error => {
                console.error('Error fetching GenesysConfig:', error);
            });
            
    },      
    
    //con este método se obtiene el token tipo client_credentials para colgar
    //son dos token distintos que se usan para llamar y para colgar
    genesysConnect: function(view){

        
        
        //fetch('https://login.usw2.pure.cloud/oauth/token', {
        fetch(view.genesysConfig.LoginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+view.genesysConfig.Authorization//ZjVmYzAxZTktZjc2Mi00YzIyLWIwYWEtOTI5ZjgyOWI1MDUwOlNPcnEtWXNQN1hSX05uREppQVh3c2o5cHlMQy1CcmpmV0VSTURIRG13SVk
            },
            body: 'grant_type=client_credentials'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('GenesysConfig', data);
                view.genesysConfig.token_colgar = data.access_token
            })
            .catch(error => {
                console.error('Error fetching GenesysConfig:', error);
            });
    }, 
    

    setFormlarioLlamada: function (view, record ) {
        var controller = this;
        view.telefono = record;
        view.down( '#llamada' ).setValue( record.get( 'tel_cpredigito' ) + record.get( 'tel_ctelefono' ) + record.get( 'tel_cpostdigito' ) + " " + record.get( 'tel_cnombre' ) );
        view.down( '#clavecontacto' ).setValue( record.get( 'tel_cclave' ) );
        view.down( '#permisoscontacto' ).setValue( record.get( 'tel_cpermiso' ) );
        view.down( '#tel_cobservacion' ).setValue( record.get( 'tel_cobservacion' ) );
        view.down( '#llamadatelefono' ).setValue( controller.armarNumero( record ) );
        view.down( '#llamadanombre' ).setValue( record.get( 'tel_cnombre' ) );
        view.down( '#contactoclave' ).setValue( record.get( 'tel_cclave' ) );
        view.down( '#ccuentaclave' ).setValue( view.record.get( 'cue_cclave' ) );
        
    },
    onUsuarioSelect: function (field, newValue, oldValue ) {
        var view = field.up( 'llamadahelperview' );
        /*var usuario = this.getAwccUsuariosByCuentaSearchModelModel().load(newValue, {callback:function (record) {
        console.log(record);
        
        }});*/
        view.down( '#claveusuario' ).setValue( newValue[ 0 ].get( 'usu_cclave' ) );
        view.down( '#descripcionusuario' ).setValue( newValue[ 0 ].get( 'usu_mobservacion' ) );
        // view.down('#permisosusuario').setValue()F;
    },  
        
    onLlamarMiniClick: function (btn ) {
        var view = btn.up( 'llamadahelperview' );
        console.log('mini mini mini', view)
    },
        
    onLlamarClick: function(btn, recordLlamando ) {
        var view = btn.up( 'llamadahelperview' ) ? btn.up( 'llamadahelperview' ) : btn;
        var tel = view.down( '#llamadatelefono' ).getValue();
        var controller = this;
        var telefono = view.telefono;
        //verifico si esta llamando
        if( view.llamando ) {
            if( !view.down( '#resoluciones' ).getValue() ) {
                notify( 'Debe selecionar una resolucion para continuar.' )
                return;
            }
            //cierro el llamado
            view.down( '#agenda' ).setDisabled( false );
            view.down( '#close' ).setDisabled( false );
            view.down( '#timer' ).hide();
            if (view.net2phone){
                controller.Net2PhoneColgar(view);
            } else if (view.wildix){
                controller.WildixColgar(view);
            } else if (view.genesys){
                controller.genesys02Colgar(view);
            } else if (view.asterix){
                controller.asterixColgar(view);
            }
            
            btn.setText( getLocale( view.btnColgar ) );
            btn.colgar = false;
            //vuelvo a mostrar toodos los otros botones
            Ext.Array.each( controller.getCallButtons( view ), function( bt ) {
                bt.setDisabled( false )
                bt.setText( bt._text )
            })
            view.btnColgar = ''
            view.down( '#formllamada' ).setDisabled( true ); //18/12/2023 Daniel O. Medina https://softguard.atlassian.net/browse/DSS-840
            //freno el logger si estaba grabando
            if( view.grabando && typeof window[ 'stopRecording' ] != 'undefined' ) {
                //document.getElementById('iframe-'+eleIframe.id).contentWindow
                /*******/
                stopRecording( function( retunLogger, filename ) {
                    var SIPConfig = controller.getSIPPROTOCOLTAGConfig(btn.protocolo);
                    if (SIPConfig && SIPConfig.recordPBX){
                        // Obtener la fecha y hora actual en milisegundos desde Epoch
                        //const fechaActualEnMilisegundos = new Date().getTime();
                        // Convertir los milisegundos a segundos (dividir por 1000)
                        //const fechaActualEnSegundos = Math.floor(fechaActualEnMilisegundos / 1000);
                        var filenameNew = "";
                        /*if (SIPConfig.recordType == "GrandStream"){
                            filenameNew = "auto-" + fechaActualEnSegundos + "-" + view.record.get('cue_iid') + "-"+ tel + ".wav" ;
                        } else if (SIPConfig.recordType == "MicroSip"){
                            const fechaActual = new Date();
                            const anio = fechaActual.getFullYear();
                            const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Meses son 0-indexados
                            const dia = fechaActual.getDate().toString().padStart(2, '0');
                            // Formatear la fecha en el formato YYYYMMDD
                            const fechaFormateada = `${anio}${mes}${dia}`;
                            filenameNew = fechaFormateada + "-" + fechaActualEnSegundos + "-" + tel + "-outgoing-" + view.record.get('cue_iid') + ".mp3" ;
                        } // else if*/
                        var grabacionModel = controller.getP_grabacion_audioModelModel().create( {
                            gra_carchivo: filenameNew,
                            gra_cterminal: '_WW',
                            gra_dfechahora: new Date(),
                            gra_iidcuenta: view.record.get( 'cue_iid' ),
                            gra_iidrecepcion: view.record.get( 'rec_iid' ),
                            gra_ioperador: view.operadorId,
                            gra_nduracion: view.segundosTotal,
                            gra_nestado: 0,
                            gra_ctelefono: tel
                        });
                        grabacionModel.set("Id",0);
                        grabacionModel.save();
    
                        //console.log( 'calbackrecorder', filenameNew )
                    } else {
                        var grabacionModel = controller.getP_grabacion_audioModelModel().create( {
                            gra_carchivo: filename.replace( ".mp3", "" ),
                            gra_cterminal: '_WW',
                            gra_dfechahora: new Date(),
                            gra_iidcuenta: view.record.get( 'cue_iid' ),
                            gra_iidrecepcion: view.record.get( 'rec_iid' ),
                            gra_ioperador: view.operadorId,
                            gra_nduracion: view.segundosTotal
                        });
                        grabacionModel.set("Id",0);
                        grabacionModel.save();
    
                        console.log( 'calbackrecorder', filename )
                    }
                    
                });
                /*******/
                // view.down('#Iframe').destroy()
            }
            if( view.up( 'window' ) && !view.down( '#llamadahelperMini' ).isHidden() ) {
                view.up( 'window' ).fireEvent( 'minimize' )
            }
            controller.onSaveClick( btn );
            //cambio valores en formulario
            // if(recordLlamando && recordLlamando.data) {
            if( !recordLlamando || !recordLlamando.data ) {
                recordLlamando = view.telefonoLlamando;
            }
            //forcenumber es par aque no busque el sigueinte numero y se quede con el actual
            if( !view.forceNumber ) {
                //tomo el sigueinte registro si ya se llego al ultimo se muestra el ultimo
                var siguiente = false;
                view.down( '#contactar' ).getStore().each( function( rec ) {
                    if( siguiente == true ) {
                        recordLlamando = rec;
                        return false;
                    }
                    if( recordLlamando.get( 'Id' ) == rec.get( 'Id' ) ) {
                        siguiente = true;
                    }
                })
            }
            controller.setFormlarioLlamada( view, recordLlamando )
            clearInterval( view.timerInteval );
            view.llamando = false;
        } else if( tel && tel != '' ) {
            //abro el llamado
            if(btn.protocolo.toUpperCase().search( "WILDIX" )>=0){
                wtapi.record = view.record;
                wtapi.operadorId = view.operadorId;
            }
           
            view.down( '#colgarMini' ).show()
            view.down( '#timer' ).show();
            view.fechaInicioLlamada = new Date();
            if( getParametro( 'DSSLLAMADASIMPLE' ) != 1 ) {
                view.down( '#agenda' ).setDisabled( true );
                view.down( '#close' ).setDisabled( true );
            }
            view.down( '#clavecontacto' ).setValue( telefono.get( 'tel_cclave' ) );
            view.down( '#permisoscontacto' ).setValue( telefono.get( 'tel_cpermiso' ) );
            view.telefonoLlamando = telefono;
            //gaurdo el texto del boton que se esta usuando
            view.btnColgar = btn.text
            //oculto toodos los otros botones
            Ext.Array.each( controller.getCallButtons( view ), function( bt ) {
                bt.setDisabled( false )
                bt._text = bt.getText()
            })
            btn.setDisabled( false )
            btn.setText( getLocale( 'Colgar' ) );
            btn.colgar = true;
            view.down( '#formllamada' ).setDisabled( false );
            console.log("btn.protocolo.toUpperCase()", btn.protocolo.toUpperCase());
            //timer
            var timer = view.down( '#timer' );
            var timerMini = view.down( '#timerMini' )
            view.segundosTotal = 0;
            view.timerInteval = setInterval( function() {
                if( view.isVisible() ) {
                    var segundos = view.segundosTotal;
                    var dias = Math.floor( view.segundosTotal / 86400 );
                    segundos -= dias * ( 86400 );
                    var horas = Math.floor( view.segundosTotal / 3600 );
                    segundos -= horas * ( 3600 );
                    var minutos = Math.floor( segundos / 60 );
                    segundos -= minutos * ( 60 );
                    view.segundosTotal++;
                    var tiempo = Ext.String.leftPad( horas, 2, '0' ) + ':' + Ext.String.leftPad( minutos, 2, '0' ) + ':' + Ext.String.leftPad( segundos, 2, '0' );
                    timer.setValue( tiempo );
                    timerMini.setValue( tiempo );
                    if(btn.protocolo.toUpperCase().search( "WILDIX" )>0)
                        wtapi.segundosTotal = view.segundosTotal;
                }
            }, 1000 );
            view.llamando = true;
            if( btn.protocolo && btn.protocolo.toUpperCase().search( "SKYPE" ) >= 0 ) {
                window.location = btn.protocolo + ':+' + tel + '?call';
            } else if( btn.protocolo && btn.protocolo.toUpperCase().search( "DIALER" ) >= 0 ) {
                controller.onLoggerLauncherClick( btn, 'DIALER:' )
            } else if( btn.protocolo && btn.protocolo.toUpperCase().search( "NET2PHONE" ) >= 0 ) {
                controller.onNet2PhoneClick( btn)
            }else if( btn.protocolo && btn.protocolo.toUpperCase().search( "WILDIX" ) >= 0 ) {
                controller.onWildixClick( btn)
            }else if( btn.protocolo && btn.protocolo.toUpperCase().search( "GENESYS" ) >= 0 ){
                controller.onGenesysClick(btn);
            }else if( btn.protocolo && btn.protocolo.toUpperCase().search("ASTERIX") >= 0 ){    
                controller.onAsterixClick(btn);
            } else if( btn.protocolo && btn.protocolo.toUpperCase().search( "LOGGER" ) >= 0 ) {
                //verifico keymodule dependencias
                var store = KeyModulesStore;//this.getKeyModulesStoreStore();
                var webremotoKey = store.getModuleAvailable( 'WebRemoto' );
                var loggerkey = store.getModuleAvailable( 'Logger' );
                if( loggerkey ) {
                    controller.onLoggerLauncherClick( btn, 'LOGGER' )
                }
                else if( webremotoKey ) {
                    Ext.Array.each( webremotoKey.get( 'Dependencies' ).split( ',' ), function( v, k ) {
                        if( v == 'Logger' ) {
                            controller.onLoggerLauncherClick( btn, 'LOGGER' )
                        }
                    })
                }
            } else if( btn.protocolo && btn.protocolo != '' ) {
                var _url;
                if(btn.protocolo == '3CX'){
                    _url = btn.protocolo+"://" + tel;
                } else{
                    _url = btn.protocolo + ":" + tel;
                }
                if (window.self !== window.top) { // checking if it is an iframe
                    window.parent.location.href = _url;
                    } else {
                    window.location.href = _url;
                    }
            }
            console.log("view.keyLogger", view.keyLogger)
            console.log("window[ 'startRecording' ]", window[ 'startRecording' ])
            //&& !btn.protocolo.toUpperCase().search("LOGGER") && !btn.protocolo.toUpperCase().search("DIALER")
            // DEDALO 6/7/2015 agrego lo comentado arriba para que no grabe en logger ni dialer
            // agrego que controle solo https para grabar
            // agregar control de parametro utilizaloggerweb
            
            if( location.protocol == 'https:'
                && view.keyLogger
                && btn.protocolo.toUpperCase().search( "LOGGER" ) == -1
                && btn.protocolo.toUpperCase().search( "DIALER" ) == -1
                && btn.protocolo.toUpperCase().search( "NET2PHONE" ) == -1
                && btn.protocolo.toUpperCase().search( "WILDIX" ) == -1
                && btn.protocolo.toUpperCase().search( "GENESYS" ) == -1
                && btn.protocolo.toUpperCase().search( "ASTERIX" ) == -1

                 ) { //&& typeof window[ 'startRecording' ] != 'undefined'
                console.log("grabandoo...")
                /*****/
                view.grabando = true;
                startRecording();
                /****/
            }
        }
    },
    Net2PhoneColgar: function(view){
        var record = view.record;
        var _url = "/handler/Net2Phone";
	    // armo la url de la llamada
        _url = Ext.String.urlAppend(_url, "action=delete"); 
        _url = Ext.String.urlAppend(_url, "extension="+view.net2phone_extension); 
        _url = Ext.String.urlAppend(_url, "reciid="+record.get( 'rec_iid' ));
        _url = Ext.String.urlAppend(_url, "callid="+view.net2phone_callid);
        //hago el llamado
        Ext.Ajax.request({
            url: _url,
            method: 'GET'
        })
    },
    asterixDescargarGrabacion: function(view, filename){
        var controller = this;
        Ext.Ajax.request({
            url: '/handler/AsterixRecording',
            method: 'POST',
            params: {
                uri: view.asterixIP,
                token: view.asterixToken,
                filename: filename,
                linkedid: view.asterixLinkedId
            },
            success: function(response) {
                console.log('Grabacion descargada con Asterix:', response);
                //  
            }
            
        });
    },

    buscarRegistroLlamadaAsterix: function(view){
        var controller = this;
        var view = view;
        Ext.Ajax.request({
            url: '/handler/AsterixCdr',
            method: 'POST',
            params: {
                uri: view.asterixIP,
                token: view.asterixToken,
                linkedid: view.asterixLinkedId 
            },
            success: function(response) {
                console.log('Llamada colgada con Asterix:', response);
                //{"success": true, "linkedid" : "call_1773926025_3416", "channel_id" : "call_177392625_3416", "channel" : "PJSIP/200", "destination" : "300"}
                //response.responseText
                var resp = Ext.decode(response.responseText);
                view.asterixRecordingfile = resp.recordingfile;
                console.log('Registro de llamada Asterix:', resp);
                var audioModel = controller.getP_grabacion_audioModelModel().create( {
                    gra_carchivo: resp.recordingfile,
                    gra_cterminal: '_WW',
                    gra_dfechahora:  new Date() , 
                    gra_iidcuenta: view.record.get( 'cue_iid' ),
                    gra_iidrecepcion: view.record.get( 'rec_iid' ),
                    gra_ioperador: view.operadorId,
                    gra_nduracion: resp.duration,
                    gra_nestado: 0,
                    gra_ctelefono: view.asterixTelefono.get( 'tel_ctelefono' )
                });
                audioModel.set("Id",0);
                audioModel.save();
                controller.asterixDescargarGrabacion(view, resp.recordingfile);



            },
            failure: function(response) {
                console.error('Error al buscar registro de llamada con Asterix:', response);
            }
        });

    },
    asterixColgar: function(view){
        var controller = this;
        var view = view;
        view.asterix = false;
        Ext.Ajax.request({
            url: '/handler/AsterixHangup',
            method: 'POST',
            params: {
                uri: view.asterixIP,
                token: view.asterixToken,
                destination: view.asterixLinkedId,
                operador: view.asterixOperador
            },
            success: function(response) {
                console.log('Llamada colgada con Asterix:', response);
                //{"success": true, "linkedid" : "call_1773926025_3416", "channel_id" : "call_177392625_3416", "channel" : "PJSIP/200", "destination" : "300"}
                //response.responseText
                var resp = Ext.decode(response.responseText);
                controller.buscarRegistroLlamadaAsterix(view);


            },
            failure: function(response) {
                console.error('Error al colgar la llamada con Asterix:', response);
            }
        });


    },
    onAsterixClick: function(button){
        var controller = this;
        var view = button.up( 'llamadahelperview' );
        var operadorId = view.operadorId;
        var record = view.record;
        var telefono = view.telefono;
        view.asterixTelefono = view.telefono;
        var cTelefono = telefono.get( 'tel_cpredigito' ) + telefono.get( 'tel_ctelefono' ) + telefono.get( 'tel_cpostdigito' ) ;
        view.asterix = true;
        if(!view.asterixToken || !view.asterixIP){
            var config = controller.getSIPPROTOCOLTAGConfig('ASTERIX');
            view.asterixToken = config.BearerToken;
            view.asterixIP = config.IP;
        }
        Ext.Ajax.request({
            url: '/handler/AsterixCalling',
            method: 'POST',
            params: {
                uri: view.asterixIP,
                token: view.asterixToken,
                telefono: cTelefono,
                operador: view.asterixOperador
            },
            success: function(response) {
                console.log('Llamada iniciada con Asterix:', response);
                //{"success": true, "linkedid" : "call_1773926025_3416", "channel_id" : "call_177392625_3416", "channel" : "PJSIP/200", "destination" : "300"}
                //response.responseText
                var resp = Ext.decode(response.responseText);
                view.asterixLinkedId = resp.linkedid;
                console.log('LinkedId de la llamada Asterix:', view.asterixLinkedId);


            },
            failure: function(response) {
                console.error('Error al iniciar la llamada con Asterix:', response);
            }
        });

        
    },
    onWildixClick: function(button){
        var controller = this;
        var view = button.up( 'llamadahelperview' );
        var operadorId = view.operadorId;
        var record = view.record;
        var telefono = view.telefono;
        var cTelefono = telefono.get( 'tel_cpredigito' ) + telefono.get( 'tel_ctelefono' ) + telefono.get( 'tel_cpostdigito' ) ; 
        view.wildix=true;
        
        
        /*console.log('Asignando evento call_updated');
       /*CODIGO ORIGINAL wtapi.telephony.on("call_updated", function(call){
            console.log('call_updatedxxxxxxxxx');
            console.log('getFormattedStatexxxxxx:'+call.getFormattedState());
            console.log('isRecordedxxxxxx:'+call.isRecorded());
            console.log('wildix_recordstarted:'+view.wildix_recordstarted);
            if (call && call.getFormattedState()=='Connected' && !call.isRecorded() && !view.wildix_recordstarted && view.keyLogger){
                console.log('Connected no esta grabando comienzo a grabar');
                wtapi.telephony.startRecord(call,function(error){//wtapi.telephony.startRecord(call,controller.WildixGetRecordedFiles(call, view));
                    console.log('Error en startRecord: '+error);
                     view.wildix_recordstarted=true;
                    if(error==null){
                        controller.WildixGetRecordedFiles(call, view);
                    }
                });
            } else if (call && call.getFormattedState()=='Connected' && call.isRecorded() && !view.wildix_recordstarted && view.keyLogger){
                view.wildix_recordstarted=true;
                controller.WildixGetRecordedFiles(call, view);
            }
        });*/
            view.wildix_recordstarted = false;
            var wildixApi = controller.getWtapi();
            if( !wildixApi || !wildixApi.telephony || typeof wildixApi.telephony.getRegisteredDevices !== 'function' ) {
                console.warn( 'Wildix API is not available to initiate the call.' );
                view.wildix = false;
                return;
            }
            var devices = wildixApi.telephony.getRegisteredDevices();
            if( !devices || devices.length === 0 ) {
                console.warn( 'No Wildix devices registered for the current operator.' );
                view.wildix = false;
                return;
            }
            wildixApi.telephony.call( devices[ 0 ], cTelefono, function() {
                console.log( 'Wildix call callback executed.' )
            });
    },
    onGenesysClick: function(button){
        var controller = this;
        var view = button.up( 'llamadahelperview' );
        var operadorId = view.operadorId;
        var record = view.record;
        var telefono = view.telefono;
        var cTelefono = telefono.get( 'tel_cpredigito' ) + telefono.get( 'tel_ctelefono' ) + telefono.get( 'tel_cpostdigito' ) ; 
        view.genesys=true;
        controller.genesysTraerColaDealeryLlamar(view);

    },
    WildixGetRecordedFiles: function(call, view){
        var controller = this;
        if( !controller.getWtapi() ) {
            return;
        }
        if (!view.keyLogger){
            return;
        }
        console.log('WildixFetRecordedFiles');
        console.log(arguments);
        Ext.Function.defer(function(call,view){
            console.log('record started, llamo getrecordedfiles');
            console.log(arguments);
            call.getRecordedFiles(function(call, files){
                console.log('getRecordedFiles: files.length: '+files.length);
                if (files.length>0){
                    var api = controller.getWtapi();
                    if( api ) {
                        api.wildix_file = files;//view.wildix_domain+'/spoolview/recordings/'+files[0].file;
                        console.log('wildix_file asignado:'+api.wildix_file);
                    }
                }
            },function(){console.log('ERROR: getrecordedfiles\n\r'+arguments)});
        }, 1000, controller, [call,view])
    },
    WildixColgar: function(view){
        var controller = this;
        view.wildix_colgado = true;
        console.log('WildixColgar');
        console.log('ANTES ANTES DE wtapi.telephony.getActiveCalls()[0];');
        //--el código de abajo estaba anulado y debía estar habilitado según versión 23.04.2 de webremoto
        var wildixApi = controller.getWtapi();
        if( !wildixApi || !wildixApi.telephony || typeof wildixApi.telephony.getActiveCalls !== 'function' ) {
            view.wildix_colgado = false;
            return;
        }
        var activeCalls = wildixApi.telephony.getActiveCalls();
        var call = activeCalls && activeCalls.length ? activeCalls[ 0 ] : null;
        if (call){
            // si estaba grabando termino de grabar y descargo llamada
            console.log('Tiene call y va a stoprecord');
            if(wtapi){
                wtapi.telephony.stopRecord(call,function(error){
                    console.log('stopRecord callback: '+error);
                    view.wildix_recordstarted = false;
                    
                });
                wtapi.telephony.hangup(call,controller.WildixHangupCallback(view,call));
            }
        }else{
            view.wildix_colgado = false;
        }
        //----------------------------------------------
        //var call = wtapi.telephony.getActiveCalls()[0];
        //wtapi.telephony.hangup(call);
        
    },
    WildixHangupCallback: function(view, call){
        var controller = this;
        if( !controller.getWtapi() ) {
            return;
        }
        //view.wildix_colgado = false;
        console.log('WildixHangupCallback');
        Ext.Function.defer(function(){
            var wildixApi = controller.getWtapi();
            if( wildixApi ) {
                wildixApi.wildix_recordstarted=false;
            }
            console.log('hangup callback');
            
            console.log('Antes de llamar handler de grabación, archivo: '+view.wildix_file);
            if (wildixApi && wildixApi.wildix_file){
                view.wildix=false;
                console.log('descargo el archivo de la grabación si es que existe');
                //view.wildix_domain+'/spoolview/recordings/'+files[0].file;
                //for(var i=0; i<=view.wildix_file.length-1; i++){
                    var file_to_download = view.wildix_domain+'/api/spoolview/recordings/'+ wildixApi.wildix_file[0].file;
                    file_to_download = file_to_download.replace('https','http');
                    Ext.Ajax.request({
                        //preventHMAC: true,
                        url: '/handler/WilldixRecording',
                        method: 'POST',
                        params: {
                            file: file_to_download,//view.wildix_file,
                            login: view.wildix_extension, //'202',//VOLVER ATRAS 
                            password: view.wildix_password,//'hm!PX1q1Zd',//VOLVER ATRAS 
                            domain: view.wildix_domain
                        },
                        success: function( response ) {
                            console.log('Path de archivo grabado: '+response.responseText.trim());
                            var apiRecord = wildixApi && wildixApi.record ? wildixApi.record : view.record;
                            var apiOperador = wildixApi && wildixApi.operadorId ? wildixApi.operadorId : view.operadorId;
                            var apiDuracion = wildixApi && wildixApi.segundosTotal ? wildixApi.segundosTotal : view.segundosTotal;
                            var audioModel = controller.getP_grabacion_audioModelModel().create( {
                                gra_carchivo: response.responseText.trim(),
                                gra_cterminal: '_WW',
                                gra_dfechahora:  new Date() , 
                                gra_iidcuenta: apiRecord ? apiRecord.get( 'cue_iid' ) : view.record.get( 'cue_iid' ),
                                gra_iidrecepcion: apiRecord ? apiRecord.get( 'rec_iid' ) : view.record.get( 'rec_iid' ),
                                gra_ioperador: apiOperador,
                                gra_nduracion: apiDuracion,
                                gra_ctelefono: view.telefono.get( 'tel_ctelefono' )
                            });
                            audioModel.set('Id',0);
                            audioModel.save();
                            
                            if( wildixApi ) {
                                wildixApi.wildix_file = null;
                            }
                            //if(view.up( 'window' ))
                            //    view.up( 'window' ).close();
                            
                        }
                    })
                //}
            }
        },5000)
    },
    onNet2PhoneClick: function(button){
        var view = button.up( 'llamadahelperview' );
        var operadorId = view.operadorId;
        var record = view.record;
        var telefono = view.telefono;
        var cTelefono = telefono.get( "tel_ctelefono" );
        view.net2phone=true;
        // armo la url de la llamada
        var _url = "/handler/Net2Phone";
        _url = Ext.String.urlAppend(_url, "action=call"); 
        _url = Ext.String.urlAppend(_url, "extension="+view.net2phone_extension); 
        _url = Ext.String.urlAppend(_url, "source="+view.net2phone_extension);
        _url = Ext.String.urlAppend(_url, "destination="+cTelefono);
        _url = Ext.String.urlAppend(_url, "callerId="+view.net2phone_callerid);
        _url = Ext.String.urlAppend(_url, "reciid="+record.get( 'rec_iid' ));
        //hago el llamado
        Ext.Ajax.request({
            url: _url,
            method: 'GET',
            success: function( response ) {
                var json = Ext.JSON.decode( response.responseText );
                var id = json.id;
                view.net2phone_callid = id;
            }
        })
    },
        
    onLoggerLauncherClick: function(button, protocolo ) {
        var view = button.up( 'llamadahelperview' );
        var operadorId = view.operadorId;
        var record = view.record;
        var telefono = view.telefono;
        var url = "sglogger://";
        var urlexterna = getParametro( 'DESKTOPEXTERNALURL' );
        var URLDESKTOP = getParametro( 'URLDESKTOP' );
        var defaultUrl = "http://DesktopURL:PORT";
        if( urlexterna.toUpperCase() == defaultUrl.toUpperCase() ) {
            notifyError( 'Debe configurar el parametro DESKTOPEXTERNALURL' );
        } else {
            var cTelefono = telefono.get( "tel_ctelefono" );
            var cPredigito = telefono.get( "tel_cpredigito" );
            var cPostDigito = telefono.get( "tel_cpostdigito" );
            if( cPredigito ) {
                cTelefono = cPredigito + ',' + cTelefono;
            }
            if( cPostDigito ) {
                cTelefono = cTelefono + ',' + cPostDigito;
            }
            cTelefono = cTelefono.replace( '-', '' );
            cTelefono = cTelefono.replace( '_', '' );
            cTelefono = cTelefono.replace( ' ', '' );
            url += record.get( 'cue_clinea' ) + "|";
            url += record.get( 'cue_ncuenta' ).trim() + "|";
            url += record.get( 'rec_iid' ) + "|";
            url += record.get( 'cue_iid' ) + "|";
            url += operadorId + "|";
            url += urlexterna
            url += "|/rest/upload/new?search=softguardMiscFile&Path=/Logger";
            url += "|oauth_token=" + Ext.util.Cookies.get( 'OAuth_Token' );
            if( view.llamadoNoAutomatico ) {
                url += "|5|0|" + cTelefono;
            } else {
                url += "|5|1|" + cTelefono;
            }
            if( protocolo == 'DIALER:' ) {
                url += "|0";
            } else {
                url += "|1";
            }
            // argego parametro urldesktop pedido por pablo BC
            url += '|' + URLDESKTOP;
            var iframe = Ext.create( 'Ext.ux.IFrame', {
                //src: url,
                hidden: true
            });
            view.add( iframe );
            iframe.load({
                src: encodeURI(url)
            });

        }
    }
});