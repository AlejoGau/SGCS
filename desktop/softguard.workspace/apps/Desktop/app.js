/**
 * ToDo: 
 * 
 * Al 05/03/2020
 * https://basecamp.com/2249105/projects/14758734/todos/399707732
 * 
 * Add Grouping to ALERTAS button on Desktop.
 * 
 * 
 */
var myDesktopApp;
var myQueryString = new Object();
var Language = '';

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Slbf': '/js/Slbf',
        'Desktop.store.LocalizationStore': '/js/Desktop/store/LocalizationStore.js',
        'Desktop.model.LocalizationSearchModel': '/js/Desktop/model/LocalizationSearchModel.js',
        'Desktop.store.ParametrosStore': '/js/Desktop/store/ParametrosStore.js',
    }
});

var localizationStore = Ext.create('Desktop.store.LocalizationStore');
var parametrosStore = Ext.create('Desktop.store.ParametrosStore');


Ext.onReady(function () {
    // llamo luego de tener la metadata
    //launchDesktop();
});

var qs = location.search.substr(1).replace(/\+/g, ' ').split('&');
for (var i = 0; i < qs.length; i++) {
    qs[i] = qs[i].split('=');
    if (qs[i][0])
        myQueryString[qs[i][0]] = decodeURIComponent(qs[i][1]);
}

var _UserData;
var _SYS;
var UiApplicationMetadata = {};

Ext.Ajax.request({
    url: '/handler/SysInfoHandler'
})

Ext.Ajax.request({
    url: '/Rest/Security/UserData',
    method: 'GET',
    scope: this,
    success: function (response) {
        if (response) {
            var userData = Ext.JSON.decode(response.responseText);
            _UserData = userData;
            Ext.Ajax.request({
                url: '/rest/security/UserData/' + _UserData.udw_idKey + '/MetaData',
                success: function (resp, operation) {
                    // si la metadata del usuario tiene una provincia la sobre escribe para centrar el mapa
                    if (resp.responseText) {
                        var metadata = Ext.JSON.decode(resp.responseText);
                        if (metadata) {
                            _UserData.metadata = metadata;
                            if (!myDesktopApp) {
                                launchDesktop();
                            }
                        }
                    }
                }
            })
            /**
             * IMPORTANTE:
             * Este store procedure se ejecuta al inicio. La idea es que todos los 
             * datos que son CONSTANTES ingresen por aca
             */
            Ext.Ajax.request({
                url: '/rest/search/SYS_initInfo',
                success: function (resp, operation) {
                    if (resp.responseText) {

                        var metadata = Ext.JSON.decode(resp.responseText);
                        if (metadata) {
                            _SYS = metadata.rows[0];
                            if (!myDesktopApp) {
                                launchDesktop();
                            }
                        }
                    }
                }
            })

            Ext.Ajax.request({
                url: '/Rest/Search/DesktopModules',
                success: function (respModule, operation) {
                    // si la metadata del usuario tiene una provincia la sobre escribe para centrar el mapa
                    if (respModule.responseText) {
                        var modules = Ext.JSON.decode(respModule.responseText);
                        if (!myDesktopApp) {
                            launchDesktop();
                        }
                    }
                }
            })

        } else {
            notify('No hay datos de usuario');
        }
    }
});


function launchDesktop() {
    if (myQueryString.Language) {
        Language = myQueryString.Language;
    } else if (_UserData && _UserData.metadata && _UserData.metadata.language) {
        Language = _UserData.metadata.language;
    } else {
        Language = 'es-ar';
    }

    var language2 = Language.split('-')[0];
    // cargo el locale
    Ext.Loader.loadScript(`/apps/locale/ext-lang-${language2}.js`);
    myDesktopApp = Ext.create('Desktop.DesktopApp', {
        authToken: Ext.util.Cookies.get('OAuth_Token')
    });
}



/**
 * getParametro: toma el parametro segun su condigo de paramentroStore.js
 * INPUT
 *  codigoParamentro(string): codigo del parametro
 *  returnObject(bool): si se define en true devuelve el record completo de parametro, sirve para definiciones de paramentros mas complejas
 *  forceDecode(bool): si se define en true toma el campo par_cvalor y lo decodea
 * OUTPUT
 *  Segun se para metrisa returnObject devuelve un string(en false) o un objeto(en true) tipo record
 */
function getParametro(codigoParamentro, returnObject, forceDecode) {
    var store = parametrosStore;
    var objParametro = '';
    store.each(function (v, k) {
        if (Ext.util.Format.trim(v.get('par_ccodigo')) == Ext.util.Format.trim(codigoParamentro)) {
            objParametro = v;
            return;
        }
    })
    if (objParametro) {
        if (returnObject) {

            if (forceDecode) {
                try {
                    //esto para extjs 4
                    objParametro.store.model.setFields([{ name: '_par_cvalor', type: 'string', }])
                } catch (e) {
                    //esto para version 6.5.1
                    objParametro.store.setFields([{ name: '_par_cvalor', type: 'string', }])
                }
                try {
                    objParametro.data._par_cvalor = JSON.parse(objParametro.get('par_cvalor'))
                } catch (e) {
                    console.warn('getParametro(Desktop): JSON inválido en par_cvalor para', codigoParamentro, e);
                    objParametro.data._par_cvalor = {}
                }
            }

            return objParametro;
        } else {
            if (objParametro.get('par_cvalor') != '') {
                if (forceDecode) {
                    try {
                        return JSON.parse(objParametro.get('par_cvalor'))
                    } catch (e) {
                        console.warn('getParametro(Desktop): JSON inválido en par_cvalor para', codigoParamentro, e);
                        return {}
                    }
                } else {
                    return objParametro.get('par_cvalor')
                }
            } else {
                return objParametro.get('par_ivalor')
            }
        }
    } else {
        console.warn('El parametro ' + codigoParamentro + ' no existe.')
        if (typeof notify === 'function') {
            notify('El parametro ' + codigoParamentro + ' no existe.')
        }
    }

}

// Funcion para Traducciones
function getLocale(name) {
    console.log(name);
    if (name == '&nbsp;') {
        return name;
    }

    /** si una palabra entra con | la ignoramos */
    if (name && (String(name).indexOf("|") >= 0)) {
        return name;
    }

    var store = localizationStore;
    var createLangKey = myQueryString.createLangKey;
    var url = window.location.href.toUpperCase();

    //String con traduccion parcial entre %%
    if (name && typeof name == "string") {
        //tomo apariciones
        var arrayMatch = name.match(/%.*?%/g)
        if (arrayMatch) {
            //busco todas la aparicioenes y pido traducir
            Ext.Array.each(arrayMatch, function (v, k) {
                var key = v.replace(/%/g, '')
                name = name.replace(v, getLocale(key))
            })
            return name;
        }
    }

    // casos que no debo traducir ni marcar
    if (typeof name === "string" || !name) {
        if (!name || name == '' || name == '&#160;' || name.charAt(0) == '*' || name.charAt(0) == '<' || name == undefined) {
            return name;
        }
    }

    if (typeof name === "number") {
        return name;
    }

    /**
     *  Esto se saco el dia 15-02-2017 por pedido de rodrigo
     *  [27-03-2017] Se volcio a aagregar createlanykey para el dominio sotguard
     */
    if (myQueryString.Version == "" && url.toUpperCase.indexOf("GCS.SOFTGUARD") > 1 && Language == 'es-ar') {
        //createLangKey = 'true';
    }

    /// si la localizacion esta cargando espero...
    if (!store || store.isLoading()) {
        //console.log(name, "localizacion cargando...");
        if (myQueryString.Version == "") {
            name = '|' + name + '|';
        }
        return name;
    }

    //TODO: REVISAR ESTO !!!! // esta por los botones del html editor de sencha
    if (typeof name === 'object') {
        name = name.text;
    }

    var translation = store.findRecord('Name', Ext.util.Format.trim(name), 0, false, false, true);
    if (!translation) {
        //si aun no se encontro se busca que sea parcial la busqueda
        // freno por problemas de doble llamado (llama a trducir algo ya traducido)
        // translation = store.findRecord('Name', Ext.util.Format.trim(name),0,true,false,false);
    }

    if (translation) {
        //console.log(name, translation.get('Translation'));
        name = translation.get('Translation');
        if (myQueryString.Version == "")
            name = '|' + name + '|';
        return name;
    }


    if (createLangKey == 'true' && Language == 'es-ar' && myQueryString.bundle != "true") { // solo genero cuando se navega en es-ar
        console.warn('[Nueva palabra]', name);
        var name = name.replace(/\|/g, '');
        var now = new Date();
        var newKey = Ext.create('Desktop.model.LocalizationModel', {
            Language: Language,
            UiApplication: 'Desktop',
            Name: name.trim(),
            Status: 'New',
            Created: now,
            Modified: now,
            Translation: name.trim()
        });

        newKey.save();
        store.add(newKey)

        if (myQueryString.Version == "")
            name = '|' + name + '|';
        return name;
    }

    // dedalo: no se puede ver rojo en clientes 
    if (!translation && url.indexOf("GCS.SOFTGUARD") > 1) {
        name = "|<b style='background:#ff0000'>" + name + "</b>|";
        return name;
    }

    return name;
}

// Funcion para alerta de errores
function notifyError(text) {
    var tranlation = getLocale(text);
    Ext.create('widget.uxNotification', {
        corner: 'br',
        manager: Ext.getCmp('viewport'),
        cls: 'ux-notification-light',
        iconCls: 'ux-notification-icon-error',
        closable: false,
        title: getLocale('Error!'),
        html: tranlation,
        slideInDelay: 800,
        slideDownDelay: 1500,
        autoDestroyDelay: 4000,
        slideInAnimation: 'elasticIn',
        slideDownAnimation: 'elasticIn'
    }).show();
};

// Funcion para alerta de notificaciones
function notify(text) {
    var tranlation = getLocale(text);
    Ext.create('widget.uxNotification', {
        corner: 'br',
        manager: Ext.getCmp('viewport'),
        cls: 'ux-notification-light',
        iconCls: 'ux-notification-icon-information',
        closable: false,
        title: '',
        html: tranlation,
        slideInDelay: 800,
        slideDownDelay: 1500,
        autoDestroyDelay: 4000,
        slideInAnimation: 'elasticIn',
        slideDownAnimation: 'elasticIn'
    }).show();
};

var shakingElements = [];

var shake = function (element, magnitude = 16, angular = false) {
    //First set the initial tilt angle to the right (+1) 
    var tiltAngle = 1;

    //A counter to count the number of shakes
    var counter = 1;

    //The total number of shakes (there will be 1 shake per frame)
    var numberOfShakes = 50;

    //Capture the element's position and angle so you can
    //restore them after the shaking has finished
    var startX = 0,
        startY = 0,
        startAngle = 0;

    // Divide the magnitude into 10 units so that you can 
    // reduce the amount of shake by 10 percent each frame
    var magnitudeUnit = magnitude / numberOfShakes;

    //The `randomInt` helper function
    var randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //Add the element to the `shakingElements` array if it
    //isn't already there
    if (shakingElements.indexOf(element) === -1) {
        //console.log("added")
        shakingElements.push(element);

        //Add an `updateShake` method to the element.
        //The `updateShake` method will be called each frame
        //in the game loop. The shake effect type can be either
        //up and down (x/y shaking) or angular (rotational shaking).
        if (angular) {
            angularShake();
        } else {
            upAndDownShake();
        }
    }

    //The `upAndDownShake` function
    function upAndDownShake() {

        //Shake the element while the `counter` is less than 
        //the `numberOfShakes`
        if (counter < numberOfShakes) {

            //Reset the element's position at the start of each shake
            element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Randomly change the element's position
            var randomX = randomInt(-magnitude, magnitude);
            var randomY = randomInt(-magnitude, magnitude);

            element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

            //Add 1 to the counter
            counter += 1;

            requestAnimationFrame(upAndDownShake);
        }

        //When the shaking is finished, restore the element to its original 
        //position and remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'translate(' + startX + ', ' + startY + ')';
            shakingElements.splice(shakingElements.indexOf(element), 1);
        }
    }

    //The `angularShake` function
    function angularShake() {
        if (counter < numberOfShakes) {
            //Reset the element's rotation
            element.style.transform = 'rotate(' + startAngle + 'deg)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Rotate the element left or right, depending on the direction,
            //by an amount in radians that matches the magnitude
            var angle = Number(magnitude * tiltAngle).toFixed(2);
            element.style.transform = 'rotate(' + angle + 'deg)';
            counter += 1;

            //Reverse the tilt angle so that the element is tilted
            //in the opposite direction for the next shake
            tiltAngle *= -1;

            requestAnimationFrame(angularShake);
        }

        //When the shaking is finished, reset the element's angle and
        //remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'rotate(' + startAngle + 'deg)';
            shakingElements.splice(shakingElements.indexOf(element), 1);
            //console.log("removed")
        }
    }

};



Ext.QuickTips.init();

Ext.define('Desktop.DesktopApp', {
    extend: 'Ext.ux.desktop.App',
    requires: [
        'Ext.window.MessageBox',
        'Ext.layout.boxOverflow.Menu',
        'Desktop.*',
        'Ext.ux.desktop.*'
    ],

    desktopMetadata: null,
    desktopModuleId: 8,

    init: function () {
        var me = this;

        var enviar = false;
        var totalAvailable = 0;
        var openModule;
        var html = '<h1>' + getLocale('Vencimientos de modulos de Softguard') + '</h1><BR>';
        var body = '';

        var parseModuleDueDate = function (value) {
            if (!value) {
                return null;
            }

            if (Ext.isDate(value)) {
                return Ext.Date.add(value, Ext.Date.MINUTE, value.getTimezoneOffset());
            }

            if (Ext.isString(value)) {
                var msMatch = value.match(/\/Date\((\d+)(?:[+-]\d+)?\)\//);
                if (msMatch) {
                    return Ext.Date.add(new Date(parseInt(msMatch[1], 10)), Ext.Date.MINUTE, new Date(parseInt(msMatch[1], 10)).getTimezoneOffset());
                }

                var parts = value.split(/\D/).filter(Boolean);
                if (parts.length === 3) {
                    var first = parseInt(parts[0], 10);
                    var second = parseInt(parts[1], 10);
                    var third = parseInt(parts[2], 10);

                    if (parts[0].length === 4) {
                        return new Date(first, second - 1, third);
                    }

                    return new Date(third, second - 1, first);
                }
            }

            var parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
                return parsedDate;
            }

            return null;
        };

        Ext.each(desktopData.modules, function (row) {
            // Chequeo de vencimiento de módulos
            var now = Ext.Date.clearTime(new Date(), true);
            var fechaVencimientoModulo = parseModuleDueDate(row.DueDate);

            if (!fechaVencimientoModulo) {
                return;
            }

            fechaVencimientoModulo = Ext.Date.clearTime(fechaVencimientoModulo, true);

            var diff = fechaVencimientoModulo.getTime() - now.getTime();
            var diffDay = Math.round(diff / 86400000);

            if (row.perpetual) {
                diffDay = 30;
            }

            var fecha = Ext.Date.format(fechaVencimientoModulo, 'd/m/Y');
            if (diffDay == -1 || diffDay == 0 && getParametro('AVISOVTOLLAVE ') == 1) {
                body += '<h3>' + row.name + '</h3><h4 style="color: red">' + getLocale('Fecha de vencimiento') + ': ' + fecha + '</h4><h4 style="color: red">' + getLocale('Se encuentra vencido') + '</h4><BR>';
                enviar = true;
            } else if (diffDay < 1 && diffDay >= 0 && getParametro('AVISOVTOLLAVE ') == 1) {
                body += '<h3>' + row.name + '</h3><h4>' + getLocale('Fecha de vencimiento') + ': ' + fecha + '</h4><h4>' + getLocale('En menos de 1 día') + '</h4><BR>';
                enviar = true;
            } else if (diffDay < 4 && diffDay > 0 && getParametro('AVISOVTOLLAVE ') == 1) {
                body += '<h3>' + row.name + '</h3><h4>' + getLocale('Fecha de vencimiento') + ': ' + fecha + '</h4><h4>' + getLocale('En menos de 4 días') + '</h4><BR>';
                enviar = true;
            } else if (diffDay < 7 && diffDay > 0 && getParametro('AVISOVTOLLAVE ') == 1) {
                body += '<h3>' + row.name + '</h3><h4>' + getLocale('Fecha de vencimiento') + ': ' + fecha + '</h4><h4>' + getLocale('En menos de 7 días') + '</h4><BR>';
                enviar = true;
            } else if (diffDay < 10 && diffDay > 0 && getParametro('AVISOVTOLLAVE ') == 1) {
                body += '<h3>' + row.name + '</h3><h4>' + getLocale('Fecha de vencimiento') + ': ' + fecha + '</h4><h4>' + getLocale('En menos de 10 días') + '</h4><BR>';
                enviar = true;
            } else if (diffDay < 0 && getParametro('AVISOVTOLLAVE ') == 1) {
                body += '<h3>' + row.name + '</h3><h4>' + getLocale('Fecha de vencimiento') + ': ' + fecha + '</h4><h4>';
                enviar = true;
            }


            // Funcion encargada de traer la posición y tamaño de las ventanas que se hayan guardado o bien, chequear que se tiene solo 1 modulo asignado y debe abrir en Maximizado
            if (row.keyAvailable && row.keyReference != 'Desktop') {
                if (totalAvailable == 0) {
                    totalAvailable++
                    openModule = row.keyReference;
                } else {
                    totalAvailable++
                }
            }

        }, this);

        if (desktopData.isAdmin && enviar) {
            body += '<CENTER><H3>' + getLocale('IMPORTANTE: una vez vencido el módulo, no se podrá acceder al mismo.') + '<H3></CENTER>';
            me.enviarMensajeYMostrarlo(me, html + body)
        }

        // Funcion encargada de hacer dropModule al cerrar una App.
        Ext.override(Ext.ux.desktop.Desktop, {
            onWindowClose: function (win) {
                var me = this;
                me.windows.remove(win);
                me.taskbar.removeTaskButton(win.taskButton);
                me.updateActiveWindow();

                // descuento el modulo al cerrar
                if (win.baseurl) {
                    Ext.Ajax.request({
                        url: win.baseurl + '?dropModuleSession=true',
                        success: function (response) {
                            var text = response.responseText;
                        }
                    });
                }
            }
        });

        // Funcion encargada de chequear el token, cierra sesion de haber iniciado en otra PC.
        me.tokenTask = {
            run: function () {
                Ext.Ajax.request({
                    url: '/rest/token/IsValid',
                    success: function (response) {
                        var text = response.responseText;
                        var object = Ext.JSON.decode(text);

                        if (object.Status == 0) {
                            Ext.Msg.alert(getLocale('Sesión del usuario'), getLocale('Su sesión expiró, ingrese nuevamente.'));
                            Ext.Function.defer(function () {
                                parent.location.href = "/"
                            }, 2000, this);
                        }
                    }
                });
            },
            interval: 10000
        }
        Ext.TaskManager.start(this.tokenTask);

        // Funcion encargada de chequear los mensajes.
        me.msgStore = Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Message6SearchModel',
            pageSize: 50,
            _firstLoad: true,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'ToId',
                value: desktopData.infoUser.IdDesktop
            },
            {
                property: 'ToTypeId',
                value: '3050'
            },
            {
                property: 'DateRead:LTEORNULLDATESTRING',
                value: '1/1/1970'
            }
            ]
        });

        // armo el tipo de usuario validando si es central y si es admin
        var usertype = 3 // no traigo datos de series

        // si es admin el usertype es 0 para traer todo
        if (desktopData.isAdmin && !desktopData.AdminOnlyAccounts) {
            usertype = 1;
        } else if (desktopData.infoUser.udw_tipo == 0) {
            usertype = 2;
        }
        // busco los mensajes en series
        if (usertype < 3) {
            var filters = [];
            filters.push({
                property: 'par_ccodigo',
                value: 'SERIESMESSAGE_REQUESTINTERVAL'
            });
            Ext.Ajax.request({
                url: '/rest/search/t_parametros',
                params: { filter: Ext.JSON.encode(filters) },
                method: 'GET',
                success: function (response) {
                    console.log(response);
                    console.log(Ext.JSON.decode(response.responseText));
                    var parametros = Ext.JSON.decode(response.responseText);
                    if (parametros.rows.length > 0) {
                        var interval = parametros.rows[0].par_ivalor * 1000;
                        if (interval > 0) {


                            me.seriestask = {
                                run: function () {
                                    // obtengo un token
                                    Ext.Ajax.request({
                                        url: '/handler/SeriesMessageDownloader?userid=' + desktopData.infoUser.IdDesktop + '&username=' + desktopData.infoUser.Email + '&usertype=' + usertype + '&nroserie=' + desktopData.KeyCustomerInfo.Serial.split('-')[1],
                                        failure: function (r, o) {
                                            console.log('hubo un error al obtener el token');
                                        },
                                        success: function (response, action) {
                                            console.log(response);
                                        },
                                        scope: this
                                    });
                                },
                                fireOnStart: true,
                                interval: interval//20000 //AQUI SE DEBE PONER EL PARAMETRO DE PERIODO DE TIEMPO PARA EL ENVIO DE REQUEST
                            }
                            Ext.TaskManager.start(me.seriestask);
                        }

                    }
                }
            });
        }


        me.task = {
            run: function () {
                // cargo los mensajes
                me.msgStore.load({
                    callback: function (records) {
                        //console.log(records.length);
                        if (records && records.length > 0) {
                            me.desktop.down('#messages').setText('<span id="contadormensajes"></span><svg class="icon-mensajes" style="fill:#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>' + ' ' + getLocale('Mensajes') + ' (' + records.length + ')');
                            var iconEl = Ext.dom.Query.selectNode('.icon-mensajes');
                            iconEl.task = {
                                run: function () {
                                    if (iconEl) {
                                        shake(iconEl, 20, true);
                                    }
                                },
                                interval: 5000
                            }
                            Ext.TaskManager.start(iconEl.task);

                            if (me.msgStore._firstLoad) {
                                // muestro la ventana de mensajes porque tiene pendientes.
                                var dlg = new Desktop.Message6Window();
                                dlg.show();
                            }
                        } else if (records) {
                            me.desktop.down('#messages').setText(getLocale('Sin mensajes'));
                        }

                        me.msgStore._firstLoad = false;
                    }
                });
            },
            interval: 20000
        }
        Ext.TaskManager.start(this.task);

        me.callParent();
        me.desktop.stopContextmenu = true;
        me.desktop.addCls('x-desktop');

        me.loadStartUpModules(openModule, totalAvailable);
        me.desktop.down('#alerts').setText(getLocale('Alertas'));
    },

    /**
     * Funcion encargada de obtener los modulos de la variable desktopData.modules
     * Transformarlos a iconos, posterior llama a getIframeModule para bindearle el evento de click y generacion de ventana
     *  
     */
    getModules: function (modules) {
        var records = modules ? modules : desktopData.modules;
        var modules = [];
        var me = this;

        if (myQueryString.Language) {
            Language = myQueryString.Language;
        } else if (_UserData && _UserData.metadata && _UserData.metadata.language) {
            Language = _UserData.metadata.language;
        } else {
            Language = 'es-ar';
        }

        console.log(records);

        Ext.Array.each(records, function (record) {
            var name = record.Text;
            var menuName = record.MenuName ? record.MenuName : record.Text;
            var icon = record.StartMenuIconCls;
            var url = record.url + '/?version=' + record.AppVersion + '&Language=' + Language;
            var id = record.Id
            var view = record.View
            var children = record.Children
            var idString = record.idString
            var Target = record.Target
            var module = record.module
            var keyAvailable = record.keyAvailable
            var AppVersion = record.AppVersion
            var Disponible = record.udm_disponible

            // Como traigo el modulo del Desktop en el Array por tema de MetaData, ese lo quito al momento de hacer el PUSH en el escritorio

            modules.push(me.getIframeModule({
                Id: id,
                Title: name,
                Name: getLocale(name),
                Icon: icon,
                Url: url,
                View: view,
                Children: children,
                idString: idString,
                Target: Target,
                module: module,
                keyAvailable: keyAvailable,
                AppVersion: AppVersion,
                Disponible: Disponible
            }));
            // console.log(name, getLocale(name));

        });

        return modules;
    },

    /**
     * Funcion encargada de generar el iFrame para cada icono
     * 
     */
    getIframeModule: function (object) {
        var title = object.Title ? object.Title : getLocale(object.Name);
        var title = title + ' (' + object.AppVersion + ')';

        var name = object.module;
        var id = object.Id;
        var iconCls = object.Icon;
        var url = object.Url;
        var me = this;
        var Target = object.Target;

        if (url) {
            url = '//' + location.host + url.replace(/{token}/, Ext.util.Cookies.get("oauth_token")); /// dedalo ajusto para que no sea http cuando el certificado esta en un proxy externo
        }

        var module = Ext.create('Ext.ux.desktop.Module', {

            id: object.idString ? object.idString : getLocale(object.Name),
            objIcon: object,
            init: function () {
                me.launcher = {
                    text: getLocale(name),
                    iconCls: iconCls,
                    handler: me.createWindow,
                    scope: me,
                    windowId: id
                };
            },

            createWindow: function (c) {
                var desktop = me.app ? me.app.getDesktop() : me.desktop;

                // Valores default de ventana
                var maximized = c ? c.maximized : true;
                var width = 900;
                var height = 480;
                var minWidth = 640;
                var minHeigth = 480;
                var x = 0;
                var y = 0;


                // Funcion encargada que, si se tilda en el taskbar que abra en nueva ventana, ejecute la URL del modulo en una nueva TAB
                if (myQueryString.isMobile) {
                    var win = window.open(url, '_blank');
                    win.focus();
                } else if (!object.keyAvailable) {
                    me.loadAlertNotAvailableMessage(object);
                } else {
                    var win = null;
                    var win = desktop.getWindow(name.replace(/ |\(|\)|\[\]/g, '-'));

                    // Consulto si la App a abrirse, tiene metadata guardada de Position y Size
                    if (desktopData.DesktopMetadata) {
                        var _desktopData = {};
                        _desktopData.DesktopMetadata = me.getDesktopMetaData();

                        if (_desktopData.DesktopMetadata.windows && _desktopData.DesktopMetadata.windows.length > 0) {

                            Ext.each(_desktopData.DesktopMetadata.windows, function (appEnMetadata, size, position) {
                                // Si la App que estoy abriendo, se encuentra cno Metadata de Position y Size, le aplico al crear la ventana.
                                if (appEnMetadata.id == name) {
                                    maximized = appEnMetadata.maximixed;
                                    width = appEnMetadata.size.width;
                                    height = appEnMetadata.size.height;
                                    x = appEnMetadata.position[0];
                                    y = appEnMetadata.position[1];
                                }
                            })
                        }
                    }

                    if (!win) {
                        var html = "<iframe style='overflow:auto;width:100%;height:100%;' frameborder='0'  src='" + url + "'></iframe>"

                        win = desktop.createWindow({
                            id: name.replace(/ |\(|\)|\[\]/g, '-'),
                            cls: name.replace(/ |\(|\)|\[\]/g, '-'),
                            title: title,
                            iconCls: iconCls,
                            border: false,
                            layout: 'fit',

                            maximized: maximized,
                            width: width,
                            height: height,
                            minWidth: minWidth,
                            minHeigth: minHeigth,

                            x: x,
                            y: y,

                            constrainHeader: true,
                            translate: false,

                            baseurl: url,
                            html: html
                        });
                        win.on('show', function (win) {

                        })
                        win.on('destroy', function (win) {

                        })

                        // Cuando no hay metadata de posicion, y al ser default 0, centro al window en el medio de la pantalla.
                        if (x == 0 && y == 0) {
                            win.center();
                        }


                    }

                    win.show();

                    return win;
                }
            }
        });

        return module;
    },

    getDesktopConfig: function () {
        var me = this,
            ret = me.callParent();

        var wallpaper = '/desktop/wallpapers/softguard-grey.jpg';
        var wallpaperStretch = true;
        var metadata = me.getDesktopMetaData()

        if (metadata && metadata.wallpaper) {
            wallpaper = "/handler/getImage?u=" + metadata.wallpaper;
            wallpaperStretch = metadata.wallpaperStretch;
        }

        let contextMenuItems = [{
            text: getLocale('Preferencias'),
            handler: me.onSettings,
            scope: me
        },
        {
            text: getLocale('Perfil'),
            handler: me.onProfile,
            scope: me
        },
        {
            text: getLocale('About'),
            tag: "AcercaDe",
            handler: me.onAbout,
            scope: me,
            /*hidden: !me.isAdmin*/
        }
        ];


        if ((_UserData.udw_tipo == 2 || _UserData.udw_tipo == 1))
            contextMenuItems = contextMenuItems.filter(e => !(e.tag && e.tag == "AcercaDe"));

        return Ext.apply(ret, {
            contextMenuItems: contextMenuItems,

            getDesktopItems: function () {
                var me = this;

                return [{
                    xtype: 'wallpaper',
                    id: me.id + '_wallpaper'
                }, {
                    xtype: 'dataview',
                    //overItemCls: 'x-view-over',
                    cls: 'desktop-dataview',
                    itemId: 'iconos',
                    itemSelector: me.shortcutItemSelector,
                    store: me.shortcuts,
                    tpl: new Ext.XTemplate(me.shortcutTpl),
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    style: {
                        "z-index": 2
                    }
                }, {
                    xtype: 'container',
                    itemId: 'desktopwidgets',
                    id: 'desktopwidgets',
                    cls: 'desktopwidgets',
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    style: {
                        "z-index": 1
                    },
                    width: 400,
                    border: false,
                    items: [{
                        xtype: 'desktopclock',
                        margin: '70 0 0 0'
                    }, {
                        xtype: 'desktopstatus',
                        margin: '20px 0 0 0',
                        listeners: {
                            showMessages: function () {
                                console.log("Di click en mensajes");
                                var dlg = new Desktop.Message6Window();
                                dlg.show();
                            },
                            showAlerts: function () {
                                console.log("Di click en alertas");
                                var dlg = new Desktop.Alerts6Window();
                                dlg.show();
                            }
                        }
                    }]
                }]
            },

            shortcutTpl: [
                '<tpl for=".">',
                '<div class="ux-desktop-shortcut" id="{name}-shortcut">',
                '<div class="ux-desktop-shortcut-icon {iconCls}">',
                '<img src="', Ext.BLANK_IMAGE_URL, '" title="{name}" />',
                '</div>',
                '<span class="ux-desktop-shortcut-text">{Text}</span>',
                '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: desktopData.modules
            }),

            onShortcutItemClick: function (dataView, record) {
                var me = this,
                    module = me.app.getModule(record.data.idString),
                    win = module && module.createWindow();
            },

            wallpaper: wallpaper,
            wallpaperStretch: wallpaperStretch
        });
    },

    getDesktopMetaData: function () {
        var metadata;
        if (desktopData.DesktopMetadata) {
            try {
                metadata = Ext.JSON.decode(desktopData.DesktopMetadata);
            } catch (error) {
                metadata = eval("(" + desktopData.DesktopMetadata + ')');
            }
        } else {
            metadata = {};
        }

        return metadata;
    },

    getStartConfig: function () {
        var me = this,
            ret = me.callParent();

        Ext.each(desktopData.modules, function (shortcut) {
            // console.log(shortcut);

            var launcher = {
                text: shortcut.name,
                iconCls: shortcut.StartMenuIconCls,
                handler: Ext.bind(me.createWindow, me, [me.getModule(shortcut.idString)])
            };
            ret.menu.push(launcher);
        });

        let items = [{
            text: getLocale('Preferencias'),
            iconCls: 'settings',
            handler: me.onSettings,
            textAlign: 'left',
            scope: me
        }, {
            text: getLocale('Perfil'),
            iconCls: 'user',
            handler: me.onProfile,
            textAlign: 'left',
            scope: me
        }, {
            tag: "AcercaDe",
            text: getLocale('Acerca de'),
            iconCls: 'user',
            handler: me.onAbout,
            //hidden: !me.isAdmin,
            textAlign: 'left',
            scope: me
        },
            '-',
        {
            text: getLocale('Salir'),
            iconCls: 'logout',
            handler: me.onLogout,
            textAlign: 'left',
            scope: me
        }
        ]

        if ((_UserData.udw_tipo == 2 || _UserData.udw_tipo == 1))
            items = items.filter(e => !(e.tag && e.tag == "AcercaDe"));


        return Ext.apply(ret, {
            title: desktopData.infoUser.FirstName + ' ' + desktopData.infoUser.LastName,
            iconCls: 'user',
            height: 480,
            showSeparator: false,
            width: 400,
            toolConfig: {
                width: 150,
                items: items
            }
        });
    },

    getTaskbarConfig: function () {
        var me = this,
            ret = me.callParent();


        return Ext.apply(ret, {
            startBtnText: getLocale('Inicio'),

            /**
             * El menu de iconos rapidos se quita, dado que duplica la lista de Apps del menu principal
             */
            //quickStart: desktopData.startMenuModules,

            userButton: [
                /**
                 * Originalmente los botones de infoUser venian aca, lo quite y puse en trayItems
                 */
            ],
            trayItems: [{
                xtype: 'button',
                text: desktopData.infoUser.FirstName + ' ' + desktopData.infoUser.LastName,
                cls: 'taskbar-infouser',
                menu: [{
                    text: getLocale('Guardar posicion de ventanas'),
                    iconCls: 'save',
                    handler: this.saveWindows,
                    scope: this
                }, {
                    text: getLocale('Ver reporte de usuario'),
                    iconCls: 'icon-user',
                    handler: this.showUserReport,
                    scope: this
                }, {
                    xtype: 'menucheckitem',
                    text: getLocale('Abrir en nueva ventana'),
                    listeners: {
                        checkchange: function (item, checked) {
                            if (checked) {
                                myQueryString.isMobile = true;
                            } else {
                                myQueryString.isMobile = false;
                            }
                        }
                    },
                    scope: this
                }]
            }, {
                text: getLocale('Salir'),
                iconCls: 'logout',
                handler: this.onLogout,
                textAlign: 'left',
                scope: this
            }, {
                xtype: 'button',
                itemId: 'msgBtn',
                text: getLocale('Mensajes'),
                scope: this,
                hidden: true
                //handler:this.showMessages
            }, '-', {
                xtype: 'trayclock',
                flex: 1
            }]
        });
    },

    getWindowBarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            height: 40
        });
    },

    // Funcion de cierre de sesion
    onLogout: function () {
        Ext.Msg.confirm(getLocale('Salir'), getLocale('Está seguro que desea salir?'), function (button) {
            if (button === 'yes') {
                window.location.href = '/handler/logout';
            } else {
                // do something when No was clicked.
            }
        });
    },

    // Funcion de configuracion de Wallpapers
    onSettings: function () {
        //levanto wallpapers en directorio /desktop/wallpapers
        var me = this;
        Ext.Ajax.request({
            url: '/rest/desktop/wallpapers',
            failure: function (r, o) {
                Ext.Msg.alert(getLocale('Error'), getLocale('No se han guardado las preferencias, por favor, intente nuevamente'));
            },
            success: function (response, action) {
                var dlg = new Desktop.Settings6({
                    desktop: this.desktop,
                    wallpapers: Ext.JSON.decode(response.responseText)
                });
                dlg.show();
            },
            scope: this
        });

    },

    // Funcion de PERFIL del usuario, para reemplazo de Password.
    onProfile: function () {
        var me = this;
        var dlg = new Desktop.Profile6({
            infoUser: desktopData.infoUser
        });
        dlg.show();
    },

    // Funcion para visuailzar detalles de la llave.
    onAbout: function () {
        var me = this;
        var dlg = new Desktop.About6({
            infoUser: desktopData.infoUser,
            KeyCustomerInfo: desktopData.KeyCustomerInfo
        });
        dlg.show();
    },

    // Funcion de Ver reporte Usuario (opcion de menu en BottomBar)
    showUserReport: function () {
        var me = this;
        var filters = [];

        filters.push({
            property: 'udw_usuario',
            value: desktopData.infoUser.Email
        });

        var baseurl = '/handler/htmlusermodule?Filter=' + Ext.encode(filters);
        var myWindow = Ext.widget('window', {
            title: getLocale('Reporte usuario'),
            height: 400,
            width: 800,
            modal: false,
            html: "<iframe id='webdealerFrame' style='overflow:auto;width:100%;height:100%;' frameborder='0'  src='" + baseurl + "'></iframe>",
            closable: true,
            layout: 'fit'
        }).show();
    },

    // Funcion para avisar sobre vencimiento de modulos
    enviarMensajeYMostrarlo: function (view, body) {
        var controller = this;
        var subject = getLocale('Información importante sobre vencimiento de módulos');
        var model = Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.Message6Model');
        var recordMsg = model.create({
            FromId: desktopData.infoUser.IdDesktop,
            ToId: desktopData.infoUser.IdDesktop,
            ToTypeId: 3050, //desktopwebuser
            Name: subject,
            MessageType: 'LICENSE',
            Body: body,
            Status: 'A',
            DateCreated: new Date(),
            Id: 0
        })
        recordMsg.phantom = true;
        recordMsg.save({
            callback: function (record) {

                var store = Ext.create('Ext.data.Store', {
                    model: Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.Message6SearchModel'),
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'Id',
                        value: record.get('Id')
                    }]
                });

                store.load({
                    callback: function (records) {
                        var record = records[0];

                        var msgview = Ext.widget('message6desktopview', {
                            header: false,
                            record: record,
                            objectId: record.get('Id'),
                            closable: false
                        });

                        var win = Ext.create('Ext.window.Window', {
                            title: 'Mensaje',
                            height: 400,
                            width: 700,
                            layout: 'fit',
                            closable: false,
                            modal: true,
                            x: 500,
                            y: 180,
                            items: msgview,
                            bbar: ["->", {
                                xtype: 'button',
                                iconCls: 'icon-accept',
                                text: 'Aceptar',
                                handler: function (btn) {

                                    record.set('DateRead', Ext.Date.format(new Date(), 'MS'));
                                    record.proxy.url = Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.Message6Model').getProxy().url;
                                    record.save();

                                    this.up('window').close()
                                }
                            }]
                        }).show();

                        msgview.down('#fromfield').hide();

                        // me fijo si tengo que mandar el mail o no
                        var storemessages = Ext.create('Ext.data.Store', {
                            model: Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.Message6SearchModel'),
                            pageSize: 50,
                            remoteSort: true,
                            remoteFilter: true,
                            filters: [{
                                property: 'MessageType',
                                value: 'LICENSEMAIL'
                            }, {
                                property: 'DateRead:GT',
                                value: Ext.Date.add(new Date(), Ext.Date.DAY, -4)
                            }]
                        });

                        storemessages.load({
                            callback: function (records) {
                                if (records.length == 0) {
                                    var infoCliente = '<hr /><br /><h2>' + getLocale('Informacion del Cliente') + '</h2><h3>' + desktopData.KeyCustomerInfo.Name + '</h3><p>' + desktopData.KeyCustomerInfo.Serial + '</p><p>' + desktopData.KeyCustomerInfo.QtyAccounts + '</p><p>' + desktopData.infoUser.FirstName + ' ' + desktopData.infoUser.LastName + '</p><p>' + desktopData.infoUser.UserId + '</p>'

                                    var model = Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.SmartMailProgramaForDesktopModel');
                                    var mail = Ext.create(model, {
                                        DateStart: new Date(),
                                        Name: subject + ' (' + desktopData.KeyCustomerInfo.Name + ')',
                                        From: '',//getParametro('MAILSENDER'),
                                        Status: 'A',
                                        TransportType: 'MAIL',
                                        Priority: 750,
                                        Body: body + infoCliente,
                                        //Query: "Select 'juan@synapticlinks.com.ar' As Email"
                                        Query: "Select 'licensing_alerts@softguard.com' As Email"
                                    });

                                    mail.setId(0);
                                    mail.save();

                                    recordMsg.set('MessageType', 'LICENSEMAIL');
                                    record.set('MessageType', 'LICENSEMAIL');
                                    recordMsg.save(); // cuando mando mail cambio el tipo
                                }
                            }
                        });
                    }
                });
                notify(subject);
            }
        })
    },

    // Funcion para Guardar la posicion de las ventanas
    saveWindows: function () {
        windows = this.getDesktop().windows.items;
        winSave = Array();
        Ext.each(windows, function (win, position, allwins) {
            tempWin = {};
            tempWin.id = win.getId();
            tempWin.size = win.getSize();
            tempWin.position = win.getPosition();
            tempWin.minimized = win.minimized;
            tempWin.maximized = win.maximized;
            winSave.push(tempWin);
        });


        //save windows in desktop module preferences (metadata)
        objEnviar = {};

        //BUSCO LA DATA DEL WALLPAPER ACTUAL PARA NO PERDERLA EN EL UPDATE
        var _desktopData = myDesktopApp.getDesktopMetaData();

        //ANULADO DANIEL objEnviar.wallpaper = _desktopData.DesktopMetadata.wallpaper;
        //ANULADO DANIEL objEnviar.wallpaperStretch = _desktopData.DesktopMetadata.wallpaperStretch;
        objEnviar.windows = winSave;


        Ext.Ajax.request({
            url: '/Rest/Security/Modules/' + this.desktopModuleId + '/MetaData?',
            failure: function (r, o) {
                Ext.Msg.alert(getLocale('Error'), getLocale('No se han guardado las preferencias, por favor, intente nuevamente'));
            },
            method: 'PUT',
            jsonData: Ext.encode(Ext.encode(objEnviar)),//Ext.encode(Ext.encode(_desktopData)),

            success: function (response, action) {
                Ext.Msg.alert(getLocale('Wallpaper'), getLocale('Sus preferencias se guardaron exitosamente'));
            },
            scope: this
        });
    },

    // Funcion encargada de abrir el modulo si hay solo 1
    loadStartUpModules: function (openModule, totalAvailable) {
        var me = this;

        /**
         *                             Ext.each(_desktopData.DesktopMetadata.windows, function (appEnMetadata, size, position) {
                                // Si la App que estoy abriendo, se encuentra cno Metadata de Position y Size, le aplico al crear la ventana.
                                if (appEnMetadata.id == name) {
                                    maximized = appEnMetadata.maximixed;
                                    width = appEnMetadata.size.width;
                                    height = appEnMetadata.size.height;
                                    x = appEnMetadata.position[0];
                                    y = appEnMetadata.position[1];
                                }
                            }) 
         * 
         * 
         * 
         * 
         * 
         *                 
         * var modu = me.getModule(module.idString);
                var win = modu.createWindow({
                    maximized: true
                });
         * 
         */
        var _desktopData = {};
        _desktopData.DesktopMetadata = me.getDesktopMetaData();
        /*Ext.each(desktopData.modules, function (module,position,allmodules) {       
                Ext.each(_desktopData.DesktopMetadata.windows, function (appEnMetadata, size, position) {
                    // Si la App que estoy abriendo, se encuentra cno Metadata de Position y Size, le aplico al crear la ventana.
                    if (appEnMetadata.id == module.keyReference) {
                        //maximized = appEnMetadata.maximixed;
                        //width = appEnMetadata.size.width;
                        //height = appEnMetadata.size.height;
                        //x = appEnMetadata.position[0];
                        //y = appEnMetadata.position[1];
                        var modu = me.getModule(module.idString);
                        var win = modu.createWindow();
        
                    }
                })
        });*/

        Ext.each(desktopData.modules, function (module, position, allmodules) {

            // Usuario comun cuando tiene 1 solo modulo
            if (module.keyReference == openModule && totalAvailable == 1) {
                var modu = me.getModule(module.idString);
                var win = modu.createWindow({
                    maximized: true
                });
            } else
                // Usuario MasterWebDealer, al tener Administrator y WebDealer, hay que abrir igual WebDealer, se cuenta como uno solo
                if (module.keyReference == 'WebDealer' && totalAvailable == 2 && desktopData.isMasterWebDealer) {
                    var modu = me.getModule(module.idString);
                    var win = modu.createWindow({
                        maximized: true
                    });
                } else {
                    Ext.each(_desktopData.DesktopMetadata.windows, function (appEnMetadata, size, position) {
                        // Si la App que estoy abriendo, se encuentra cno Metadata de Position y Size, le aplico al crear la ventana.
                        if (appEnMetadata.id == module.keyReference) {
                            //maximized = appEnMetadata.maximixed;
                            //width = appEnMetadata.size.width;
                            //height = appEnMetadata.size.height;
                            //x = appEnMetadata.position[0];
                            //y = appEnMetadata.position[1];
                            var modu = me.getModule(module.idString);
                            var win = modu.createWindow();

                        }
                    })


                }

        });
    },

    // Funcion encargada de mostrar los mensajes de los modulos cuando no están habilitados
    loadAlertNotAvailableMessage(object) {
        var textToShow = "";
        switch (object.module) {
            case "SgAppMapGuardWeb":
                textToShow = "mapguard_textoExplicativo";
                break;
            case "SgAppMultiMonitorWeb":
                textToShow = "multimonitor_textoExplicativo";
                break;
            case "SgAppAccountAdministration":
                textToShow = "administratoraccount_textoExplicativo";
                break;
            case "SgAppNotificationReport":
                textToShow = "notificationreport_textoExplicativo";
                break;
            case "SerTec":
                textToShow = "servtec_textoExplicativo";
                break;
            case "SgAppWebReport":
                textToShow = "webreport_textoExplicativo";
                break;
            case "Situator":
                textToShow = "situator_textoExplicativo";
                break;
            case "SmartPanics":
                textToShow = "smartpanics_textoExplicativo";
                break;
            case "TrackGuard":
                textToShow = "trackguard_textoExplicativo";
                break;
            case "TrackGuardMonitoreo":
                textToShow = "trackguardmonitoreo_textoExplicativo";
                break;
            case "Video":
                textToShow = "video_textoExplicativo";
                break;
            case "VigiControl":
                textToShow = "vigicontrol_textoExplicativo";
                break;
            case "WebCrm":
                textToShow = "crm_textoExplicativo";
                break;
            case "WebDealer":
                textToShow = "dealer_textoExplicativo";
                break;
            case "WebManager":
                textToShow = "webmanager_textoExplicativo";
                break;
            case "WebRemoto":
                textToShow = "webremoto_textoExplicativo";
                break;
            case "WebReportAut":
                textToShow = "reporteautoridades_textoExplicativo";
                break;
            case "SgWebSiteBP":
                textToShow = "websitebp_textoExplicativo";
                break;
            case "AWCC":
                textToShow = "awcc_textoExplicativo";
                break;
            case "FenceManager":
                textToShow = "fence_textoExplicativo";
                break;
            case "IPRSManager":
                textToShow = "IPRS_textoExplicativo";
                break;
            case "Link":
                textToShow = "link_textoExplicativo";
                break;
            case "Logger":
                textToShow = "logger_textoExplicativo";
                break;
            case "SgMasterWebDealer":
                textToShow = "masterwebdealer_textoExplicativo";
                break;
        }

        Ext.Msg.alert(getLocale(object.module), getLocale(textToShow));
        return;
    }
});
