//MIGRADO2024
Ext.define('Common.controller.EventoFormController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.TablasCategorizacionStore', 'Common.store.EventoEstadoStore', 'Common.store.EventoOrigenStore'],
    models: ['TablasCategorizacionSearchModel', 'TablasPuertosSearchModel', 'TablasIpConSearchModel', 'InstruccionesModel', 'm_usuariosSearchModel', 'OrganizationHelperSearchModel', 'OrganizationSearchModel', 'OrganizationModel', 'EventosPendientesSearchModel', 'EventosTiemLineModel', 'GeographyModel', 'TablasCodigosAlarmaSearchModel', 'p_rxlogSearchModel', 'EventosTiempoRealModel', 'MapguardModel', 'TablasMovilesPatrullaSearchModel', 'CuentaSearchModel', 'ServTecSearchModel', 'KeyModulesModel', 'm_llavesSearchModel', 'm_CuentasXtraInfoSearchModel', 'OrganizationSearchMobileModel'],
    views: ['EventoFormView', 'DetalleCuentaView'],
    init: function (config) {
        // genero los eventos
        this.control({
            'eventoformview': {
                afterrender: this.initview,
                beforedestroy: this.beforeDestroy
            },
            'eventoformview button[action=cod_cinstrucciones_DSS_show]': {
                click: this.onCodigoInstruccionesClick
            },
            'eventoformview button[action=mInstrucciones]': {
                click: this.mInstrucciones
            },
            'eventoformview #logx': {
                click: this.onXlogClick
            },
            'eventoformview #legx': {
                click: this.onXlegClick
            },
            'eventoformview #comment': {
                click: this.onCommentClick
            },
            'eventoformview #logxe': {
                click: this.onXlogClick
            },
            'eventoformview #observaciones': {
                click: this.onObservacionesClick
            },
            'eventoformview button[action=serviciopatrulla]': {
                click: this.onServicioPatrullaClick
            },
            'eventoformview button[action=eventosespera]': {
                click: this.onEventosEsperaClick
            },
            'eventoformview button[action=patrullaasignada]': {
                click: this.onPatrullaAsignadaClick
            },
            'eventoformview #moresound': {
                click: this.onMoreSoundClick
            },
            'eventoformview #loggerlauncher': {
                click: this.onLoggerLauncherClick
            },
            'eventoformview displayfield[action=usuarioAction]': {
                click: this.onUsuarioClick
            },
            'eventoformview #victimarios': {
                click: this.onVictimariosClick
            },
            'eventoformverticalview': {
                afterrender: this.initviewvertical
            }
        });
    },
    beforeDestroy: function (view) {
        clearInterval(view.reloj);
    },
    onUsuarioClick: function (button) {
    },
    initviewvertical: function (view) {
        var controller = this;
        view.SYS = this.application.SYS;
        if (view.record) {
            var record = view.record;
            var logstore = Ext.create('Ext.data.Store', {
                model: controller.getP_rxlogSearchModelModel(),
                remoteFilter: true,
                filters: {
                    property: 'rxl_iRecId',
                    value: record.get('rec_iid')
                }
            });
            logstore.load({
                callback: function (records) {
                    if (records[0]) {
                        view.xlog = records[0].get('rxl_cLog');
                        var btnxlog = view.down('#logxe');
                        if (Ext.util.Format.trim(view.xlog) != '') {
                            btnxlog.show();
                        }
                    }
                }
            });
            // nmo hace falta hacer este query se puede sumar el estado al join
            var mystoreEstadoPanel = Ext.create('Ext.data.Store', {
                model: this.getCuentaSearchModelModel(),
                pageSize: 100,
                filters: {
                    property: 'cue_iid',
                    value: record.get('cue_iid')
                }
            });
            mystoreEstadoPanel.load({
                callback: function (records) {
                    if (records.length > 0) {
                        if (records[0].get('sta_nestado') == 1) {
                            if (view.down('#estadopanelactivadoe')) {
                                view.down('#estadopanelactivadoe').hide();
                            }
                            if (view.down('#estadopaneldesactivadoe')) {
                                view.down('#estadopaneldesactivadoe').show();
                            }
                        } else {
                            if (view.down('#estadopaneldesactivadoe')) {
                                view.down('#estadopaneldesactivadoe').hide();
                            }
                            if (view.down('#estadopanelactivadoe')) {
                                view.down('#estadopanelactivadoe').show();
                            }
                        }
                        //  view.down('#lin_crazonsocial').setValue(records[0].get('lin_crazonsocial'));
                    }
                }
            });
        }
    },

    initview: function (view) {
        var controller = this;
        view.SYS = this.application.SYS;
        const record = view.record;
        if (view.record) {
            console.log("record----------------------", record);

            // --- NUEVA VALIDACIÓN PARA TIPO "CRI" ---
            if (record.get('cue_ctipo') === 'CRI') {
                // Buscamos el contenedor 'vbox' padre que contiene al nombreevento
                var mainContainer = view.down('#nombreevento').up('container');

                // Inyectamos el componente solo si no existe ya (evita duplicados si la vista se repinta)
                if (mainContainer && !view.down('#cartelCRI')) {
                    mainContainer.insert(1, {
                        xtype: 'displayfield',
                        itemId: 'cartelCRI',
                        value: record.get('tip_cdescripcion'), // Puedes poner '🔥 Incendio' si lo deseas
                        width: '100%',
                        style: {
                            backgroundColor: '#FFFFFF',
                            marginTop: '2px',
                            marginBottom: '2px'
                        },
                        fieldStyle: {
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#000000',
                            textAlign: 'center',
                            backgroundColor: '#FFFFFF',
                            padding: '4px',
                            width: '100%'
                        }
                    });
                }
            }
            //---------mostrar victimarios-------
            controller.showTieneVictimarios(view);
            //---------mostrar instrucciones-----
            controller.showInstruccion(view);
            //-----------------------------------
            if (view.showInfo) {
                view.down("#info").show();
            }
            view.loadRecord(record);
            // oculto linea de tarjeta
            if (record.get('rxl_clinecard') == '' && view.down('#linecardheader')) {
                view.down('#linecardheader').setValue('');
            }
            var AJUSTAHORARIO = getParametro('AJUSTAHORARIO', true, true).get('par_ivalor');
            var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
            var recordWebremoto = storeSecurity.findRecord('KeyReference', 'WebRemoto')
            var _security = recordWebremoto.get('_Security');
            // Federico V. muestro u oculto la hora de la cuenta segun si esta el check tildado y si ademas tiene o no Zona panel
            if ((record.get('cue_iZonaHoraria') == 0 || AJUSTAHORARIO == 0) && view.down('#horaPanel')) {
                view.down('#horaPanel').hide();
            } else if (_security && _security.horaIngreso === "true") {
                view.down('#horaIngreso').hide();
            }
            // me fijo si tengo nivel senial
            var nvs_nNivel = record.get('nvs_nNivel');
            var nivel_img = '';
            if (nvs_nNivel > 0 && nvs_nNivel <= 8) {
                nivel_img = '/resources/softguard/images/signal/1.png'
            } else if (nvs_nNivel >= 9 && nvs_nNivel <= 16) {
                nivel_img = '/resources/softguard/images/signal/2.png'
            } else if (nvs_nNivel >= 17 && nvs_nNivel <= 24) {
                nivel_img = '/resources/softguard/images/signal/3.png'
            } else if (nvs_nNivel >= 25) {
                nivel_img = '/resources/softguard/images/signal/4.png'
            }
            if (nivel_img != '') {
                // agrego el icono de nivel a la barra
                var toolbar = view.down('toolbar');
                toolbar.add({
                    xtype: 'button',
                    tooltip: getLocale('Nivel de señal') + ':' + nvs_nNivel,
                    translate: false,
                    icon: nivel_img
                });
            }
            // agrego la llave a la barra
            if (record.get('cue_nsonidoul') == 1) {
                var toolbar = view.down('toolbar');
                toolbar.add({
                    xtype: 'button',
                    tooltip: getLocale('Posee llave'),
                    translate: false,
                    iconCls: 'icon-key',
                    handler: function () {
                        controller.showKey(record, view);
                    }
                });
            }
            if (!view.down('#headerevento')) {
                if (Ext.util.Format.trim(record.get('rec_calarma')) != '') {
                    var txtColor = this.decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                    var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                    view.setBodyStyle('background-color:' + backColor);
                    view.down("#nombreevento").setFieldStyle('color:' + txtColor);
                } else {
                    view.setBodyStyle('background-color:transparent');
                    view.down("#nombreevento").setFieldStyle('color:#333');
                }
            } else {
                if (Ext.util.Format.trim(record.get('rec_calarma')) != '') {
                    var txtColor = this.decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                    var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                    // view.setBodyStyle('background-color:' + backColor);
                    view.down("#nombreevento").setFieldStyle('color:' + txtColor);
                    view.down('#headerevento').el.setStyle('background-color', backColor);
                } else {
                    view.down('#headerevento').el.setStyle('background-color', 'transparent');
                    // view.setBodyStyle('background-color:transparent');
                    view.down("#nombreevento").setFieldStyle('color:#333');
                }
                view.record = record
            }
            var timer = view.down('#timer');
            var acumulado = view.down('#acumulado');
            if (view.contadores) {
                var segundosTotal = 0;
                if (view.reloj) {
                    clearInterval(view.reloj);
                }
                view.reloj = setInterval(function () {
                    if (!view || view.isDestroyed) {
                        clearInterval(view.reloj);
                        return;
                    }
                    if (!view.isVisible()) {
                        return;
                    }
                    var timerField = (timer && !timer.destroyed) ? timer : view.down('#timer');
                    var acumuladoField = (acumulado && !acumulado.destroyed) ? acumulado : view.down('#acumulado');
                    if (!timerField || !acumuladoField) {
                        return;
                    }
                    Ext.suspendLayouts();
                    try {
                        var segundos = segundosTotal;
                        var dias = Math.floor(segundosTotal / 86400);
                        segundos -= dias * (86400);
                        var horas = Math.floor(segundosTotal / 3600);
                        segundos -= horas * (3600);
                        var minutos = Math.floor(segundos / 60);
                        segundos -= minutos * (60);
                        segundosTotal++;
                        timerField.setValue(dias + ':' + Ext.String.leftPad(horas, 2, '0') + ':' + Ext.String.leftPad(minutos, 2, '0') + ':' + Ext.String.leftPad(segundos, 2, '0'));
                        // actualizo tiempo acumulado
                        var start = record.get('rec_isoFechaHora');
                        // me fijo si la cuenta tiene diferencia horaria y la tomo como base.
                        var timezoneFinal = 0;
                        if (record.get('ttz_nOffSet') != 0 && _SYS && _SYS.timezone) {
                            var timezoneSys = _SYS.timezone;
                            timezoneFinal = record.get('ttz_nOffSet') - timezoneSys;
                            if (timezoneFinal > 0) {
                                start = Ext.Date.add(new Date(record.get('rec_isoFechaHora')), Ext.Date.HOUR, timezoneFinal);
                            }
                        }
                        var end = new Date();
                        if (timezoneFinal < 0) {
                            end = Ext.Date.add(end, timezoneFinal);
                        }
                        var elapsed = (end - start) / 1000;
                        var segundos2 = elapsed;
                        var dias2 = Math.floor(segundos2 / 86400);
                        segundos2 -= dias2 * (86400);
                        var horas2 = Math.floor(segundos2 / 3600);
                        segundos2 -= horas2 * (3600);
                        var minutos2 = Math.floor(segundos2 / 60);
                        segundos2 -= minutos2 * (60);
                        acumuladoField.setValue(dias2 + ':' + Ext.String.leftPad(horas2, 2, '0') + ':' + Ext.String.leftPad(minutos2, 2, '0') + ':' + Ext.String.leftPad(segundos2.toFixed(), 2, '0'));
                    } finally {
                        Ext.resumeLayouts(true);
                    }
                }, 1000);
            } else {
                timer.hide();
                acumulado.hide();
                var acumuladolabel = view.down('#acumuladolabel');
                var procesadolabel = view.down('#procesadolabel');
                acumuladolabel.hide();
                //procesadolabel.hide();
            }
            var puertoField = view.down('#puerto');
            var controller = this;
            var rec_nOrigen = record.get('rec_nOrigen');
            var rec_ipuerto = record.get('rec_iPuerto');
            var origenStore = Ext.data.StoreManager.lookup('EventoOrigenStore');
            var origenRec = origenStore.findRecord('Value', rec_nOrigen);
            var origen = '';
            if (origenRec)
                origen = origenRec.get('Name');
            if (rec_nOrigen == 2 && rec_ipuerto < 100) {
                origen = getLocale('PG');
                var puerto = rec_ipuerto
                // no viene esto en el rest completo? mover al store y sacar de aca
                // poner if si esta el dato por si se reutiliza en otro lugar
                if (record.get('_puerto') && record.get('_puerto') != '') {
                    puerto = record.get('_puerto');
                }
                else {
                    var mystore = Ext.create('Ext.data.Store', {
                        model: controller.getTablasPuertosSearchModelModel(),
                        remoteFilter: true,
                        filters: {
                            property: 'pue_npuerto',
                            value: puerto
                        }
                    });
                    mystore.load({
                        callback: function (records) {
                            var recordPuerto = records[0];
                            puerto = recordPuerto.get('pue_cdescripcion');
                        }
                    });
                }
                origen = origen + ' : ' + puerto;
                puertoField.setValue(origen);
            };
            if (rec_nOrigen == 2 && rec_ipuerto > 100) {
                origen = getLocale('IR');
                var puerto = rec_ipuerto
                // no viene esto en el rest completo? mover al store y sacar de aca
                // poner if si esta el dato por si se reutiliza en otro lugar
                if (record.get('_puerto') && record.get('_puerto') != '') {
                    puerto = record.get('_puerto');
                } else {
                    var mystore = Ext.create('Ext.data.Store', {
                        model: controller.getTablasIpConSearchModelModel(),
                        remoteFilter: true,
                        filters: {
                            property: 'ipc_nport',
                            value: puerto
                        }
                    });
                    mystore.load({
                        callback: function (records) {
                            var recordPuerto = records[0];
                            puerto = recordPuerto.get('ipc_cdescripcion');
                        }
                    });
                }
                origen = origen + ' : ' + puerto;
                puertoField.setValue(origen);
            };
            if (rec_nOrigen == 6 && rec_ipuerto < 0)
                origen = 'TR';
            if (rec_ipuerto <= 0) {
                if (origen == getLocale('Manual')) {
                    // view.down('#eventomanual').show();
                }
                puertoField.setValue(origen);
            } else {
            }
        }
        const container = view.down('#usuContainer');
        if (container) {
            const containerEl = container.getEl();
            containerEl.on('click', function () {
                const view = container.up('eventoformview');
                const eventomonitoreoview = view.up('eventomonitoreoview');
                const title = view.record.get('usu_cnombre');
                const imagen = view.record.get('usu_cimagen') ? '/gallery/' + view.record.get('usu_cimagen') : '/gallery/' + 'usernophoto.png';
                var regex = /\((.*?)\)/;
                var match = title.match(regex);
                const modelUsuario = controller.getM_usuariosSearchModelModel();
                const modelOrganization = controller.getOrganizationSearchMobileModelModel();
                if (match && match.length >= 2) {
                    var contenidoEntreParentesis = match[1];
                    var storeUsuarios = Ext.create('Ext.data.Store', {
                        model: modelUsuario,
                        remoteFilter: true,
                        filters: [
                            {
                                property: 'usu_icodigo',
                                value: view.record.get('rec_iusuario')
                            }
                            , {
                                property: 'usu_iidcuenta',
                                value: view.record.get('rec_iidcuenta')
                            }]
                    });
                    storeUsuarios.load({
                        callback: function (records, operation, success) {
                            if (success) {
                                Ext.Ajax.request({
                                    url: '/Rest/search/OrganizationSearchMobile',
                                    method: 'GET',
                                    params: {
                                        Numero: contenidoEntreParentesis
                                    },
                                    disableCaching: false,
                                    success: function (response, options) {
                                        var responseData = Ext.JSON.decode(response.responseText);
                                        var detalleview = Ext.widget('detallecuentaview', {
                                            caller: view,
                                            imagen: imagen,
                                            record: view.record,
                                            usuario: records[0],
                                            organization: responseData.rows[0]
                                        });
                                        var win = Ext.create('Ext.Window', {
                                            layout: 'fit',
                                            title: title,
                                            border: false,
                                            width: 600,
                                            height: 420,
                                            items: detalleview,
                                            listeners: {
                                                afterrender: function (_window) {
                                                    var img = _window.down('image');
                                                    _window.down('detallecuentaview').down('container').setWidth(250);
                                                    _window.down('detallecuentaview').down('container').setHeight(400);
                                                    _window.center();
                                                }
                                            },
                                        });
                                        win.show();
                                    },
                                    failure: function (response, options) {
                                        console.error('Error en la solicitud AJAX:', response.status, response.statusText);
                                    }
                                });
                            }
                        }
                    });
                } else if (imagen) {
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title: title,
                        border: false,
                        width: 'auto',
                        minHeight: 200,
                        minWidth: 200,
                        items: {
                            xtype: 'image',
                            src: imagen,
                            minWidth: 150,
                            margin: 20
                        },
                        listeners: {
                            afterrender: function (_window) {
                                var img = _window.down('image');
                                _window.center();
                            }
                        },
                    });
                    win.show();
                } else {
                    console.log("sin detalle de usuario")
                }
            });
        }
        // instrucciones del codigo de alarma
        view.instrucciones = record.get('cod_cinstrucciones_DSS');
        if (view.instrucciones && Ext.util.Format.trim(view.instrucciones) != '') {
            view.down('#cod_cinstrucciones_DSS_button').show();
        }
        view.xlog = record.get('rxl_clog');
        var btnxlog = view.down('#logx');
        if (view.xlog && Ext.util.Format.trim(view.xlog) != '') {
            btnxlog.show();
        }
        Ext.Ajax.request({
            url: '/rest/search/serviciopatrullafromcuenta',
            params: { IdCuenta: record.get('cue_iid') },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                if (rec) {
                    if (view.down('#serviciopatrulla')) {
                        var color = '#000';
                        if (record.get('tsp_cpathicon') && record.get('tsp_cpathicon').indexOf("#") >= 0) {
                            color = record.get('tsp_cpathicon');
                        }
                        var iconPatrulla = '<div class="icon-car" style="width: 16px;height: 16px;"><div class="circulo indicadorIcono" style="background-color:' + color + ' "></div></div>'
                        view.down('#serviciopatrulla').setText(iconPatrulla, false);
                        view.down('#serviciopatrulla').setTooltip(record.get('tsp_cdescripcion'))
                        view.down('#serviciopatrulla').show();
                    }
                }
            }
        });
        var mystoreEventosEspera = Ext.create('Ext.data.Store', {
            model: this.getEventosPendientesSearchModelModel(),
            remoteGroup: false,
            remoteSort: true,
            remoteFilter: true,
            pageSize: 100,
            autload: false,
            params: { completo: false },
            filters: [
                { property: 'rec_nestado', value: 2 },
                { property: 'rec_iidcuenta', value: record.get('cue_iid') }
            ]
        });
        mystoreEventosEspera.load({
            callback: function (records) {
                if (records && records.length > 0) {
                    view.down('#eventosespera').show();
                    if (records.length > 1) {
                        view.down('#eventosespera').setTooltip(records.length + ' ' + getLocale('Eventos en espera'))
                    } else {
                        view.down('#eventosespera').setTooltip(records.length + ' ' + getLocale('Evento en espera'))
                    }
                }
            }
        });
        // traer en el store
        var mystoreMapGuard = Ext.create('Ext.data.Store', {
            model: this.getTablasMovilesPatrullaSearchModelModel(),
            pageSize: 100,
            filters: {
                property: 'tmp_iAsignado',
                value: record.get('cue_iid')
            }
        });
        mystoreMapGuard.load({
            callback: function (records) {
                if (records.length > 0) {
                    view.down('#patrullaasignada').show();
                }
            }
        });
        var sta_nestado = record.get('sta_nestado');
        view.down('#lin_crazonsocial').setValue(record.get('lin_crazonsocial'));
        if (sta_nestado == 1) {
            if (view.down('#estadopanelactivado')) {
                view.down('#estadopanelactivado').hide();
            }
            if (view.down('#estadopaneldesactivado')) {
                view.down('#estadopaneldesactivado').show();
            }
        } else {
            if (view.down('#estadopaneldesactivado')) {
                view.down('#estadopaneldesactivado').hide();
            }
            if (view.down('#estadopanelactivado')) {
                view.down('#estadopanelactivado').show();
            }
        }
        if (!view.noIframe) {
            var t = this;
            var storeLlave = KeyModulesStore;//controller.getKeyModulesStoreStore();
            var mostrarVideo = true;
            if (record.get('rxt_nSPIP') == 1 || record.get('rxt_nSPSMS') == 1) {
                //no compruebo nada
            } else {
                if (!storeLlave.isModuleAvailable('Video')) {
                    mostrarVideo = false;
                }
            }
            if (mostrarVideo) {
                var storeKey = SecurityModulesStore; // Ext.data.StoreManager.lookup('SecurityModulesStore');
                var recordModule = storeKey.findRecord('ModuleName', 'video');

                if (recordModule) {
                    // Verifico videolauncher        
                    Ext.Ajax.request({
                        url: '/rest/search/SGSP_VideoLinkParser',
                        params: {
                            iRecID: record.get('rec_iid'),
                            noRximg: 1
                        },
                        method: 'GET',
                        scope: this,
                        success: function (response) {
                            var parametros = Ext.JSON.decode(response.responseText);
                            var rec = parametros.rows[0];

                            // DEDALO 19/08/2019: Saco filtro webm para que pueda lanzar el launcher
                            if (rec && rec.tvi_nLaunch == '1' && view.eventoformverticalview != true) {
                                var videoLauncherBtn = view.down('#videolauncher');

                                videoLauncherBtn.on('click', function (e) {
                                    controller.openVideoLauncher(controller, view, rec, record);
                                });

                                if (view.autoLaunchVideoEnabled) {
                                    videoLauncherBtn.show();
                                    controller.openVideoLauncher(controller, view, rec, record);
                                } else {
                                    videoLauncherBtn.hide();
                                }
                            }
                        }
                    });
                }
            }
        }
        // me fijo si tiene audios
        if (record.get('rec_cContenido').match(/Audio/g) || record.get('rec_cContenido').match(/\[MP4\]/g) || record.get('rec_cContenido').match(/MP3/g)) {
            this.getSound(record, view);
        }
        if (record.get('situacion_cuenta') == 'Prueba') {
            view.down('#msgcuentaprueba').show()
        }
        if (record.get('situacion_cuenta') == 'Prueba x Zonas ') {
            view.down('#msgzonaprueba').show()
        }
        if (record.get('situacion_cuenta') == 'Eliminar') {
            view.down('#msgcuentaeliminar').show()
        }
        var lin_cimagen = record.get('lin_cimagen');
        var LOGODEALERMWR = getParametro('LOGODEALERMWR');
        if (lin_cimagen && LOGODEALERMWR == 1) {
            var _lin_cimagen = view.down('#lin_cimagen');
            _lin_cimagen.setSrc('/gallery/' + lin_cimagen);
            _lin_cimagen.show();
        }
        // muestro icono de zona y usuario si corresponden
        var zon_cimagen = record.get('zon_cimagen');
        var usu_cimagen = record.get('usu_cimagen');
        if (zon_cimagen) {
            var zonaContainer = view.down('#zonaContainer');
            zonaContainer.insert(0, {
                xtype: 'image',
                src: '/gallery/' + zon_cimagen,
                height: 30,
                width: 30,
                style: {
                    borderRadius: '50%',
                    cursor: 'hand'
                },
                listeners: {
                    el: {
                        click: function () {
                            controller.openZonaImageWindow(view, record);
                        }
                    }
                }
            });
            var IMAGENZONAVISIBLE = getParametro('IMAGENZONAVISIBLE');
            if (IMAGENZONAVISIBLE && record.get('zon_nmostrar') == 1) {
                controller.openZonaImageWindow(view, record);
            }
        }
        if (usu_cimagen) {
            var usuContainer = view.down('#usuContainer');
            usuContainer.insert(0, {
                xtype: 'image',
                src: '/gallery/' + usu_cimagen,
                height: 30,
                width: 30,
                style: {
                    borderRadius: '50%',
                    cursor: 'hand'
                },
                /*  listeners: {
                      el: {
                          click: function() {
                         /*     var eventomonitoreoview = view.up( 'eventomonitoreoview' );
                              var myWindow = Ext.widget( 'window', {
                                  title: record.get( 'usu_cnombre' ),
                                  translate: false,
                                  height: 470,
                                  width: 400,
                                  x: 300,
                                  y: 50,
                                  modal: false,
                                  items: {
                                      xtype: 'image',
                                      src: '/gallery/' + usu_cimagen,
                                      style: {
                                          maxHeight: '100%',
                                          maxWidth: '100%'
                                      }
                                  },
                                  listeners: {
                                      afterrender: function( _window ) {
                                          var img = _window.down( 'image' );
                                          var height = img.getHeight();
                                          var width = img.getWidth();
      
                                          if( width > 640 ) { width = 640 }
                                          if( height > 480 ) { height = 480 }
      
                                          _window.setWidth( width );
                                          _window.setHeight( height + 18 );
                                          _window.center();
                                      }
                                  },
                                  closable: true,
                                  //layout: 'fit',
                              }).show();
                              //declaro la windo como hija par aque cuando se cierra el evento cierre tambien las ventanas
                              eventomonitoreoview.windowsHijas.push( myWindow ) 
                          }
                      }
                  },*/
            });
        }
        Ext.Function.defer(function () {
            if (record.get('fal_nmargen') != 0 && !view.eventoformverticalview == true) {
                if (record.get('sta_ncontadorfa') > record.get('fal_nmargen')) {
                    view.down('#msgfalsaalarma').show();
                    notify('Se superaro la cantidad de falsas alarma para esta cuenta')
                }
            }
            if (
                //!view.down( '#msgcuentaeliminar' ).isHidden() ||
                !view.down('#msgcuentaprueba').isHidden() ||
                !view.down('#msgzonaprueba').isHidden() ||
                !view.down('#msgfalsaalarma').isHidden() ||
                !view.down('#msgmoroso').isHidden()) {
                view.down('#msgatencion').show()
            }
        }, 1000, this, arguments);
        if (record.get('cli_nsituacion') > 0) {
            view.down('#msgmoroso').show()
        }
        // miro el estado de la cuenta si es prueba // CUANDO ES PRUEBA POR ZONAS MIRAR EL CODIGO DE ZONA
        if (record.get('situacion_cuenta') == 'Prueba') {
            // notify('El estado de la cuenta es: '+rec.Situacion)
            view.down('#nombre').setFieldStyle({ backgroundColor: '#f0ff1e' })
        }
        if (record.get('situacion_cuenta') == 'Prueba x Zonas ') {
            var items = Ext.create('Ext.data.Store', {
                model: 'DealerSearch' + '.model.EstadoItemModel'
            });
            items.load({
                ObjectId: objectId, view: view, callback: function (records, operation, success) {
                    Ext.each(records, function () {
                        //   console.log(Ext.util.Format.trim(this.get('est_czona')),Ext.util.Format.trim(record.get('cue_clinea')))           
                        if (Ext.util.Format.trim(this.get('est_czona')) == Ext.util.Format.trim(record.get('rec_czona'))) {
                            //notify('El estado de la zona es: '+rec.Situacion)
                            view.down('#nombre').setFieldStyle({ backgroundColor: '#f0ff1e' })
                        }
                    });
                }
            });
        }
        if (record.get('rec_calarma') == '_DI') {
            view.down('#rec_ccontenido').show()
        }
        /**
         * BC 394088837 : Mas informacion para Ubicacion, ahora se guarda en formato JSON si es con dato extra.
         * 
         * isValid : true - Se pudo parsear JSON.
         * isHidden : true - La cuenta tiene cue_cubicacion en blanco
         *          * 
         */
        var moreInfoBtn = view.down('#moreInfoBtn');
        var ubicacionOriginal = record.get('cue_cubicacion');
        var json = '';
        var isValid = false;
        var isHidden = false;;
        try {
            json = JSON.parse(ubicacionOriginal);
            isValid = true;
            if (moreInfoBtn &&
                json.ubicacion == "" &&
                json.entreCalleA == "" &&
                json.entreCalleB == "" &&
                json.torre == "" &&
                json.piso == "" &&
                json.dpto == "" &&
                json.barrio == "" &&
                json.manzana == ""
            ) {
                moreInfoBtn.hide();
                isHidden = true;
            }
        } catch (e) {
            if (ubicacionOriginal != "") {
                json = record.get('cue_cubicacion');
            } else if (moreInfoBtn) {
                moreInfoBtn.hide();
                isHidden = true;
            }
        }
        if (!isHidden && json && isValid && moreInfoBtn) {
            moreInfoBtn.setTooltip('<div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">' + getLocale('Ubicación') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json.ubicacion + '</p></div>\
            <div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">'+ getLocale('Entre calles') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json.entreCalleA + ' y ' + json.entreCalleB + '</p></div>\
            <div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">'+ getLocale('Torre') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json.torre + '</p></div>\
            <div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">'+ getLocale('Piso') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json.piso + '</p></div>\
            <div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">'+ getLocale('Departamento') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json.dpto + '</p></div>\
            <div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">'+ getLocale('Barrio') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json.barrio + '</p></div>\
            <div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">'+ getLocale('Manzana') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json.manzana + '</p></div>\
            ')
        } else if (!isHidden && moreInfoBtn) {
            moreInfoBtn.setTooltip('<div style=""><p style="font-weight: bold; display: inline-block; margin: 0 0 5px 0;">' + getLocale('Ubicación') + '</p><p style="display: inline-block; margin: 0 0 5px 0;">: ' + json + '</p></div>');
        }
    },
    showTieneVictimarios: function (view) {
        var record = view.record;
        var filter = [
            { property: "vct_idKeyCuenta", "value": record.get('cue_iid') }
        ];
        Ext.Ajax.request({
            url: '/rest/search/VictimarioCuentaSearch',
            params: {
                filter: Ext.encode(filter)
            },
            method: 'GET',
            success: function (resp, operation) {
                var respArr = Ext.JSON.decode(resp.responseText);
                if (respArr.rows.length > 0) {
                    view.down('#victimarios').show();
                }
            }
        })
    },
    mInstrucciones: function (button) {
        var view = button.up('eventoformview');
        var record = view.record;
        var controller = this
        var store = Ext.create('Ext.data.Store', {
            model: this.getM_CuentasXtraInfoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'cue_iidCuenta',
                value: record.get('cue_iid')
            }],
        }).load({
            callback: function (records) {
                if (records.length > 0) {
                    controller.getInstruccionesModelModel().load(records[0].get('Id'), {
                        view: view,
                        scope: this,
                        success: function (record, operation) {
                            var controller = operation.scope;
                            var view = operation.view;
                            win = Ext.create('Ext.Window', {
                                layout: 'fit',
                                autoScroll: true,
                                title: 'Instrucciones de Cuenta',
                                width: 750,
                                height: 550,
                                border: true,
                                view: view,
                                bodyStyle: {
                                    background: 'white',
                                },
                                html: record.get('cue_cInstrucciones')
                            });
                            win.show();
                        },
                        failure: function () {
                            console.log('error:', arguments);
                        }// cierro function
                    })
                }
            }
        })
    },
    showInstruccion: function (view) {
        var record = view.record;
        var controller = this
        var win;
        var store = Ext.create('Ext.data.Store', {
            model: this.getM_CuentasXtraInfoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'cue_iidCuenta',
                value: record.get('cue_iid')
            }],
        }).load({
            callback: function (records) {
                if (records.length > 0) {
                    controller.getInstruccionesModelModel().load(records[0].get('Id'), {
                        view: view,
                        scope: this,
                        success: function (record, operation) {
                            var controller = operation.scope;
                            var view = operation.view;
                            win = Ext.create('Ext.Window', {
                                layout: 'fit',
                                autoScroll: true,
                                title: 'Instrucciones de Cuenta',
                                width: 750,
                                height: 550,
                                border: true,
                                view: view,
                                bodyStyle: {
                                    background: 'white',
                                },
                                html: record.get('cue_cInstrucciones')
                            });
                            if (record.get('cue_cInstrucciones') != '') {
                                view.down('#instruccionesCuenta').show();
                                if (record.get('cue_iInstrMostrar') == 1) {
                                    win.show();
                                }
                            }
                        },
                        failure: function () {
                            console.log('error:', arguments);
                        }// cierro function
                    })
                }
            }
        })
    },
    addVideoTimeline: function (view, record, recordVideo) {
        var controller = this;
        var obs = '%Visualizacion de% <b>' + recordVideo.tvi_cnombre + '</b>';
        if (recordVideo.cvl_czona) {
            obs += ' %en zona% <b>' + record.get('_zon_cdescripcion') + '</b>';
        }
        timelineRecord = controller.getEventosTiemLineModelModel().create({
            etl_icuenta: record.get('cue_iid'),
            etl_tfechahora: new Date(),
            etl_caccion: '%Video%',
            etl_cobservacion: obs,
            etl_cowner: '%MWR%',
            etl_ioperador: view.up('viewport').operadorId,
            etl_irecid: record.get('rec_iid')
        });
        timelineRecord.set('Id', 0);
        timelineRecord.save();
    },
    openZonaImageWindow: function (view, record) {
        var eventomonitoreoview = view.up('eventomonitoreoview');
        var myWindow = Ext.widget('window', {
            title: getLocale('Imagen de la zona') + " " + record.get('zon_cdescripcion'),
            height: 470,
            width: 400,
            x: 300,
            y: 50,
            modal: false,
            items: {
                xtype: 'zonaimagenbyeventoview',
                record: view.record,
                module: view.module
            },
            closable: true,
            layout: 'fit',
            listeners: {
                afterrender: function (_window) {
                    var img = _window.down('zonaimagenbyeventoview');
                    var height = img.getHeight();
                    var width = img.getWidth();
                    if (width > 640) { width = 640 }
                    if (height > 480) { height = 480 }
                    if (width < 400) { width = 400 }
                    if (height < 400) { height = 400 }
                    _window.setWidth(width);
                    _window.setHeight(height + 18);
                    _window.center();
                }
            }
        }).show();
        //declaro la windo como hija par aque cuando se cierra el evento cierre tambien las ventanas
        eventomonitoreoview.windowsHijas.push(myWindow);
    },

    onCommentClick: function (button) {
        var view = button.up('eventoformview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Log',
            width: 500,
            height: 250,
            border: true,
            view: view,
            html: '<div style="word-wrap: break-word">' + Ext.String.htmlEncode(view.record.get('rec_cobservaciones').match(/(\[.*?\] (\[SmartPanics\]|\[VigiControl\]).*)/g)) + '</div>'
        });
        win.show();
    },
    openVideoLauncher: function (controller, view, rec, record) {
        var eventomonitoreoview = view.up('eventomonitoreoview');

        if (rec.rxi_cTipo != 'webm' && rec.rxi_cTipo != 'jpg' && rec.tvi_cdescripcion != 'CWU:') {
            var sgvideo = 'SGVIDEO';

            if (rec.tvi_iplatform == 1) {
                sgvideo = sgvideo + 'X64';
            }

            var src = `${sgvideo}://${record.get('rec_iid').toString()}/?UUID=${Ext.util.Cookies.get('OAuth_Token')}&Url=${getParametro('URLDESKTOP')}`;

            var iframe = Ext.create('Ext.ux.IFrame', {
                src: src,
                hidden: true
            });
            view.add(iframe);

        } else if (rec.tvi_cdescripcion == 'CWU:') {
            var iframe = Ext.create('Ext.ux.IFrame', {});

            var myWindow = Ext.widget('window', {
                title: getLocale('Video'),
                height: 470,
                width: 400,
                x: 300,
                y: 50,
                modal: false,
                items: iframe,
                closable: true,
                layout: 'fit'
            }).show();

            // Declaro la window como hija para que cuando se cierre el evento, cierre también las ventanas
            eventomonitoreoview.windowsHijas.push(myWindow);

            iframe.load({
                src: rec.cLinkVideo.replace('CWU:', '')
            });
        }

        controller.addVideoTimeline(view, record, rec);
    },
    showKey: function (record, view) {
        var controller = this;
        // busco si hay una llave para la cuenta
        var store = Ext.create('Ext.data.Store', {
            model: controller.getM_llavesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'lla_iidcuenta',
                value: record.get('cue_iid')
            }],
        }).load({
            callback: function (records) {
                var recordLlave;
                if (records.length > 0) {
                    // existe, asigno el primero
                    recordLlave = records[0];
                    var myWindow = Ext.widget('window', {
                        title: 'Información de la llave',
                        height: 250,
                        width: 400,
                        layout: 'fit',
                        items: [{
                            xtype: 'm_llavesroformview',
                            record: recordLlave
                        }]
                    }).show();
                } else {
                    notifyError('No existen datos para la llave');
                }
            }
        })
    },

    getSound: function (record, view) {
        Ext.Ajax.request({
            url: '/Rest/search/p_rximg',
            params: {
                rxi_irecid: record.get('rec_iid'),
                rxi_cTipo: 'mp4,mp3'
            },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                if (parametros.total >= 1) {
                    view.down('#moresound').show();
                }
            }
        });
    },

    onMoreSoundClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var newView = Ext.widget('eventsoundview', {
            record: view.record
        });
        var myWindow = Ext.widget('window', {
            title: '(' + view.record.get('rec_iid') + ') ' + getLocale('Reproducir Audio'),
            height: 380,
            translate: false,
            width: 400,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit',
        }).show();
    },

    onLoggerLauncherClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var url = "sglogger://";
        url += record.get('cue_clinea') + "|";
        url += record.get('cue_ncuenta').trim() + "|";
        url += record.get('rec_iid') + "|";
        url += record.get('cue_iid') + "|";
        url += view.up('viewport').operadorId + "|";
        //url += "http://gcs.softguard.com:9090"
        url += "|/rest/upload/new?search=softguardMiscFile&Path=/Logger";
        url += "|oauth_token=" + Ext.util.Cookies.get('OAuth_Token');
        url += "|5";
        var iframe = Ext.create('Ext.ux.IFrame', {
            src: url,
            hidden: true
        });
        view.add(iframe);
    },

    onVictimariosClick: function (button) {
        var view = button.up('eventoformview');
        var record = view.record;
        var idCuenta = record.get('cue_iid');
        //--------------------------
        var panel = button.up('tabpanel')
        var title = getLocale('Victimarios') + ' - ' + record.get('cue_clinea', ' ' + record.get('cue_cnombre'));
        var mytab = panel.down('victimariosview');
        if (!mytab) {
            var newTab = Ext.widget('victimariosview', {
                title: title,
                idCuentaPrin: idCuenta,
                closable: true
            });
            panel.add(newTab);
            panel.setActiveTab(newTab);
        } else
            panel.setActiveTab(mytab);
        //---------------------------
        /* var win = Ext.create('Ext.Window', {
             layout: 'fit',
             title : 'Victimarios',
             width : 750,
             height : 550,
             border : true,
             view: view,
             items : [{
                 xtype: 'victimariosview',
                 idCuentaPrin: idCuenta
             }]
         });
         win.show();  */
    },
    onPatrullaAsignadaClick: function (button) {
        var view = button.up('eventoformview');
        var tabpanel = button.up('tabpanel')
        var record = view.record;
        var cuenta = view.cuenta;
        var rec_iid = record.get('rec_iid');
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        var newTab = Ext.widget('mapguardgpsview', {
            record: record,
            targetTab: tabpanel,
            cuenta: cuenta,
            title: 'Mapguard',
            translate: false,
            forceCuenta: true,
            closable: true,
            closeAction: 'destroy',
            //autoDestroy: true
        });
        tabpanel.add(newTab);
        tabpanel.setActiveTab(newTab);
    },

    onEventosEsperaClick: function (button) {
        var view = button.up('eventoformview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Eventos en espera',
            width: 750,
            height: 550,
            border: true,
            view: view,
            items: [{
                xtype: 'eventostrgridview',
                estados: 2,
                showMaximizer: false,
                Cuentas: view.record.get('cue_iid'),
                showprocesartodos: true,
                title: ''
            }]
        });
        win.show();
    },

    onServicioPatrullaClick: function (button) {
    },
    onXlogClick: function (button) {
        var view = button.up('eventoformview');
        if (!view.winLog || view.winLog.isDestroyed == true) {
            view.winLog = Ext.create('Ext.Window', {
                layout: 'fit',
                title: 'Log',
                width: 250,
                height: 550,
                border: true,
                view: view,
                closeAction: 'destroy',
                html: '<div style="word-wrap: break-word">' + Ext.String.htmlEncode(view.xlog) + '</div>'
            });
            view.winLog.show();
        } else {
            view.winLog.toFront()
        }
    },

    onXlegClick: function (button) {
        var view = button.up('eventoformview');
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        if (!view.winLog || view.winLog.isDestroyed == true) {
            view.winLog = Ext.create('Ext.Window', {
                layout: 'fit',
                title: 'Legajo',
                width: 450,
                height: 150,
                border: true,
                view: view,
                closeAction: 'destroy',
                html: '<div style="word-wrap: break-word; font-size: 16px"> Legajo numero: ' + rec_iid + '</div>'
            });
            view.winLog.show();
        } else {
            view.winLog.toFront()
        }
    },
    onObservacionesClick: function (button) {
        var view = button.up('eventoformview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Log',
            width: 750,
            height: 550,
            border: true,
            view: view,
            items: [
                {
                    xtype: 'eventobservacionesgridview',
                    record: view.record
                }
            ]
        });
        win.show();
    },

    onCodigoInstruccionesClick: function (button) {
        var view = button.up('eventoformview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            autoScroll: true,
            title: 'Instrucciones',
            width: 750,
            height: 550,
            border: true,
            modal: true,
            view: view,
            html: view.instrucciones
        });
        win.show();
    },

    decimalColorToHTMLcolor: function (number) {
        var intnumber = number - 0;
        var red, green, blue;
        var template = "#000000";
        red = (intnumber & 0x0000ff) << 16;
        green = intnumber & 0x00ff00;
        blue = (intnumber & 0xff0000) >>> 16;
        intnumber = red | green | blue;
        var HTMLcolor = intnumber.toString(16);
        HTMLcolor = template.substring(0, 7 - HTMLcolor.length) + HTMLcolor;
        return HTMLcolor;
    },
    openObjectTab: function (tabpanel, objectId, objectTypeName, title) {
        var container = objectTypeName.toLowerCase() + 'view';
        var newTab = tabpanel.down('[title="' + title + '"]');
        if (!newTab) {
            var newTab = Ext.widget(container, {
                title: title,
                border: false,
                closable: true,
                objectId: objectId,
                targetTab: tabpanel,
                autoDestroy: true
            });
            tabpanel.add(newTab);
        }
        tabpanel.setActiveTab(newTab);
    },

    openObjectIframe: function (objectId, objectTypeName, title) {
        var center = window.parent.Ext.getCmp('center');
        if (center) {
            var url = '/a/' + objectTypeName + '?objectId=' + objectId;
            var newTab = Ext.create('Ext.ux.IFrame', {
                title: title,
                border: false,
                src: url,
                closable: true,
                autoDestroy: true
            });
            center.add(newTab);
            center.setActiveTab(newTab);
        }
    }
});
