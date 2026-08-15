Ext.Ajax.timeout = 10 * 60 * 1000;
Ext.override(Ext.form.Basic, { timeout: Ext.Ajax.timeout / 1000 });
Ext.override(Ext.data.proxy.Server, { timeout: Ext.Ajax.timeout });

/*
Ext.override(Ext.Component, {
    setHidden: function(hidden) {
        console.log('[DEBUG] setHidden called on', this.getItemId?.() || this.id, '->', hidden);
        console.trace();
        return this.callParent(arguments);
    }
});
*/

        Ext.override(Ext.layout.container.Card, {
                setActiveItem: function(newCard) {
                    var me = this,
                        owner = me.owner,
                        oldCard = me.activeItem,
                        rendered = owner.rendered,
                        newIndex, focusNewCard;
                    newCard = me.parseActiveItem(newCard);
                    newIndex = owner.items.indexOf(newCard);
                    // If the card is not a child of the owner, then add it.
                    // Without doing a layout!
                    if (newIndex === -1) {
                        newIndex = owner.items.items.length;
                        Ext.suspendLayouts();
                        newCard = owner.add(newCard);
                        Ext.resumeLayouts();
                    }
                    // Is this a valid, different card?
                    if (newCard && oldCard !== newCard) {
                        // Fire the beforeactivate and beforedeactivate events on the cards
                        if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                            return false;
                        }
                        if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                            return false;
                        }
                        if (rendered) {
                            Ext.suspendLayouts();
                            // If the card has not been rendered yet, now is the time to do so.
                            if (!newCard.rendered) {
                                me.renderItem(newCard, me.getRenderTarget(), owner.items.length);
                            }
                            if (oldCard) {
                                if (me.hideInactive) {
                                    focusNewCard = oldCard.el.contains(Ext.Element.getActiveElement());
                                    oldCard.hide();
                                    if (oldCard.hidden) {
                                        oldCard.hiddenByLayout = true;
                                        oldCard.fireEvent('deactivate', oldCard, newCard);
                                    } else // Hide was vetoed, we cannot change cards.
                                    {
                                        return false;
                                    }
                                }
                            }
                            // Make sure the new card is shown
                            if (newCard.hidden || newCard.el.isStyle('display', 'none')) {
                                // Brutally force visible
                                newCard.hidden = false;
                                newCard.hiddenByLayout = false;
                                if (newCard.el) {
                                    newCard.el.setStyle('display', '');
                                    newCard.el.show(); // Just in case
                                }
                            }

                            // Let ExtJS finish layout updates
                            Ext.defer(function () {
                                if (newCard && newCard.isVisible(true)) {
                                    newCard.updateLayout();
                                    owner.updateLayout();
                                }
                            }, 10);                            
                            // Layout needs activeItem to be correct, so clear it if the show has been vetoed,
                            // set it if the show has *not* been vetoed.
                            //if (newCard.hidden) {
                            //    me.activeItem = newCard = null;
                            //} else {
                                me.activeItem = newCard;
                                // If the card being hidden contained focus, attempt to focus the new card
                                // So as not to leave focus undefined.
                                // The focus() call will focus the defaultFocus if it is a container
                                // so ensure there is a defaultFocus.
                                if (focusNewCard) {
                                    if (!newCard.defaultFocus) {
                                        newCard.defaultFocus = ':focusable';
                                    }
                                    newCard.focus();
                                }
                            //}
                            Ext.resumeLayouts(true);
                        } else {
                            me.activeItem = newCard;
                        }
                        //newCard.fireEvent('activate', newCard, oldCard);
                        return me.activeItem;
                    }
                    return false;
                }
        });



// HMAC
Ext.override(Ext.data.Connection, {
    timeout: Ext.Ajax.timeout,
    openRequest: function (options, requestOptions, async, username, password) {
        if (!this.isXdr) {
            options.headers = options.headers || {};
            var token = controller.application.getToken();//Ext.util.Cookies.get("OAuth_Token");
            // calculo las partes del HMAC
            var _m = requestOptions.method;// method
            var _u = window.location.origin + decodeURIComponent(requestOptions.url); // url
            var _t = Date.now(); // timestamp
            var _n = nonce(64); // nonce
            var _k = [token, _t].join(":"); // key

            // calculo la firma
            var _f = [token, _t, _u, _m, _n].join(":"); // firma
            console.log(_f);

            // encripto HMAC-sha256 -> base64
            var hmacObj = new jsSHA("SHA-256", "TEXT");
            hmacObj.setHMACKey(_k, "TEXT");
            hmacObj.update(_f);

            var _h = hmacObj.getHMAC("B64");

            // agrego los headers al request
            options.headers._t = _t;
            options.headers._n = _n;
            options.headers._h = _h;
        }
        return this.callParent(arguments);
    }
});
// Sobrescribe Ext.JSON.decode con la función personalizada

function permissiveDecode(jsonString) {
    // Elimina comas al final de listas y objetos
    jsonString = jsonString.replace(/,\s*([\]}])/g, '$1');

    // Escapar comillas no escapadas dentro de cadenas
    jsonString = jsonString.replace(/"(.*?)":\s*"(.*?)"/g, function (match, p1, p2) {
        // Esta función reemplazará las comillas no escapadas en p2
        return `"${p1}":"${p2.replace(/([^\\])"/g, '$1\\"')}"`;
    });

    // Asegura que las claves de los objetos estén entre comillas dobles
    jsonString = jsonString.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');

    // Eliminar caracteres no válidos
    jsonString = jsonString.replace(/[\t\n\r]/g, '');

    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('Error decoding JSON:', e);
        return null; // O algún valor por defecto
    }
}







function is_json(str) {
    try {
        Ext.JSON.decode(str);
    } catch (e) {
        return false;
    }
    return true;
};
function sanitizarTitulo(titulo) {
    return titulo.replace(/,/g, '')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .replace(/#/g, '')
        .replace(/\./g, '')
        .replace(/>/g, '');
};
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
        autoDestroyDelay: 3000,
        slideInAnimation: 'elasticIn',
        slideDownAnimation: 'elasticIn',
        paddingY: 100,
        height: 100
    }).show();
};

function deepCloneStore(source) {
    var target = Ext.create('Ext.data.Store', {
        model: source.model
    });

    Ext.each(source.getRange(), function (record) {
        var newRecordData = Ext.clone(record.copy().data);
        // var model = new source.model (newRecordData, newRecordData.id);
        var model = new source.model(newRecordData, null);

        target.add(model);
    });

    return target;
}

function deepCloneRoot(node) {
    var result;
    if (node != null) {
        result = node.copy(),
            len = node.childNodes ? node.childNodes.length : 0, i;
        // Move child nodes across to the copy if required

        for (i = 0; i < len; i++) {
            if (node.childNodes != null) {
                if (node.childNodes[i] != null) {
                    result.appendChild(deepCloneRoot(node.childNodes[i]));
                }
            }
        }
    }
    return result;
}

function printHTMLContent(htmlContent) {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-10000px';
    document.body.appendChild(iframe);


    let iframeDoc = iframe.contentWindow || iframe.contentDocument;
    if (iframeDoc.document) {
        iframeDoc = iframeDoc.document; 
    }

    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();


    iframe.onload = () => {
        setTimeout(() => {
            iframe.contentWindow.print();
            document.body.removeChild(iframe);
        }, 500);
    };
}

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


Ext.data.Types.DATE = {
    convert: function (v) {
        var df = this.dateReadFormat || this.dateFormat,
            parsed;

        if (!v) {
            return null;
        }

        if (Ext.isString(v) && v.search('62135586000000') != -1) {
            return null;
        }

        if (Ext.isDate(v)) {
            return v;
        }
        if (df) {
            parsed = Ext.Date.parse(v, df);
            var date = new Date(parsed);
            if (Ext.isDate(date) && date.getFullYear() <= 1900) {
                return null
            } else {
                return date;
            }
        }

        parsed = Date.parse(v);
        var date = new Date(parsed);
        if (Ext.isDate(date) && date.getFullYear() <= 1900) {
            return null
        } else {
            return parsed ? new Date(parsed) : null;
        }
    },
    sortType: Ext.data.SortTypes.asDate,
    type: 'date'
};

Ext.Date.formatFunctions['MS'] = function () {
    // UTC milliseconds since Unix epoch (MS-AJAX serialized date format (MRSF))
    return '\/Date(' + this.getTime() + Ext.Date.getGMTOffset(this) + ')\/';
};


Ext.JSON.encodeDate = function (d) {
    var s = "\"" + Ext.Date.format(d, "MS") + "\"";
    return s;
};


_dirty = false;
function isAppDirty() {
    return _dirty;
};

function loadLocale() {
    if (myQueryString.Language) {
        Language = myQueryString.Language;
    } else if (_UserData && _UserData.metadata && _UserData.metadata.language) {
        Language = _UserData.metadata.language;
    } console.log(Language);
    var language2 = Language.split('-')[0];
    // cargo el locale
    Ext.Loader.loadScript(`/apps/locale/ext-lang-${language2}.js`);
};
myQueryString = new Object();

var qs = location.search.substr(1).replace(/\+/g, ' ').split('&');
for (var i = 0; i < qs.length; i++) {
    qs[i] = qs[i].split('=');
    if (qs[i][0])
        myQueryString[qs[i][0]] = decodeURIComponent(qs[i][1]);
}

// DK-1540: acceso externo por link con token en URL
if (myQueryString.OAuth_Token) {
    Ext.util.Cookies.set("OAuth_Token", myQueryString.OAuth_Token);
}

if (myQueryString.bundle) {
    var appFolder = '/JsUiApplicationBundleAdd/' + '@ViewBag.UIApplicationName';
} else {
    var appFolder = '/js/' + '@ViewBag.UIApplicationName';
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
                var rawValor = objParametro.get('par_cvalor');
                if (typeof rawValor === 'string') {
                    rawValor = rawValor.trim();
                }
                if (rawValor) {
                    try {
                        objParametro.data._par_cvalor = Ext.JSON.decode(rawValor);
                    } catch (e) {
                        console.warn('getParametro: JSON invalido en par_cvalor para', codigoParamentro, e);
                        objParametro.data._par_cvalor = {};
                    }
                } else {
                    objParametro.data._par_cvalor = {};
                }
            }

            return objParametro;
        } else {
            if (objParametro.get('par_cvalor') != '') {
                if (forceDecode) {
                    try {
                        return Ext.JSON.decode(objParametro.get('par_cvalor'))
                    } catch (e) {
                        console.warn('getParametro: JSON invalido en par_cvalor para', codigoParamentro, e);
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
function getToken2() {
    var currentURL = window.location.href;
    var parser = document.createElement('a');
    parser.href = currentURL;


    if (parser.hostname === "localhost") {
        return "7D450B5B-D9C7-4836-96D3-D89856FBD7ED";
    } else {
        var token = '';

        if (typeof myQueryString !== 'undefined' && myQueryString) {
            token = myQueryString.oauth_token || myQueryString.token || myQueryString.OAuth_Token || '';
        }

        if (!token && typeof window !== 'undefined') {
            token = window.oauth_token || window.token || '';
        }

        if (!token && typeof Ext !== 'undefined' && Ext.util && Ext.util.Cookies) {
            token = Ext.util.Cookies.get("OAuth_Token") ||
                Ext.util.Cookies.get("oauth_token") ||
                Ext.util.Cookies.get("token") || '';
        }

        return token || '';
    }
}

function getLocale(name) {
    var store = localizationStore;

    /// si la localizacion esta cargando espero...
    if (!store || store.isLoading()) {
        //console.log(name, "localizacion cargando...");
        return name;
    }

    var translation = store.findRecord('Name', name, 0, false, false, true);

    if (translation) {
        //console.log(name, translation.get('Translation'));
        return translation.get('Translation');
    }



    try{
        if (name && name != '' && name != '&#160;' && userLanguageStore.data.items[0].get('language')=='es-ar' && name.charAt(0) != '*' && myQueryString.createLangKey == 'true') {
            
            var newKey = Ext.create('Common.model.LocalizationModel', {
                Language: userLanguageStore.data.items[0].get('language'),
                UiApplication: _uiApplicationName,
                Name: name,
                Status: 'New',
                Translation: name
            });

            console.warn('[Nueva palabra]', name);
            newKey.setId(0);
            newKey.save();
            store.add(newKey)
            return "*" + name;
        }
    }catch(e){
        notCreatedLangKeyStore.add({id:0,name: name})
    }

    return name;
}
function getModuleData(_module, right) {
    var record = getSecurityModule(_module);
    if (record && record.get('Available')) {
        if (record.get('_Security')) {
            if (record.get('_Security')[right]) {
                if (record.get('_Security')[right] == 'true') {
                    return true;
                } else if (record.get('_Security')[right] == 'false') {
                    return false
                } else {
                    return record.get('_Security')[right]
                }
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        if (isModuleAvailable('Administrator')) {
            return true
        } else {
            return false;
        }
    }
}
// resuelvo ? del editor
Ext.override(Ext.form.HtmlEditor, {
    // private
    defaultValue: (Ext.isOpera || Ext.isIE6) ? '&#160;' : '',
});

if (Ext.grid.RowEditor) {
    Ext.apply(Ext.grid.RowEditor.prototype, {
        saveBtnText: 'Aceptar',
        cancelBtnText: 'Cancelar',
        errorsText: 'Errores',
        dirtyText: 'Necesita confirmar o cancelar los cambios.'
    });
}

Ext.override(Ext.data.writer.Writer, {
    writeAllFields: true
});

Ext.override(Ext.form.Basic, {
    updateRecord: function () {
        this.callParent(arguments);
        this.resetOriginal();
    },

    resetOriginal: function () {
        var fields = this.getFields();
        for (var i = 0; i < fields.length; ++i) {
            fields.items[i].resetOriginalValue();
        }
    }
});

// Seteo Defaults para formpanel
Ext.override(Ext.form.Panel, {
    frame: false,
    //trackResetOnLoad : true,
    layout: 'anchor',
    bodyPadding: 5,
    border: 0,
    // anchor: '100% 100%',
    //preventHeader : true,
    fieldDefaults: {
        anchor: '100%',
        labelWidth: 150,
        bindToModel: true
    },

    disableForm: function () {
        var fields = this.query('field');
        Ext.Array.each(fields, function (field) {
            field.disable();
        })

        var datefields = this.query('datefield');
        Ext.Array.each(datefields, function (field) {
            field.disable();
        })

        var timefields = this.query('timefield');
        Ext.Array.each(datefields, function (field) {
            field.disable();
        })
    },

    resetOriginal: function () {
        this.getForm().resetOriginal();
    },

    initComponent: function () {
        this.callParent(arguments);

        this.getForm().trackResetOnLoad = true;

        this.on('dirtychange', function (basic, dirty, eOpts) {
            _dirty = dirty;
            window.onbeforeunload = (dirty && !this.ignoreDirty) ? my_onbeforeunload : null;
        });
    }
});

// seteo defaults para el spinner
//
Ext.override(Ext.form.field.Number, {
    minValue: 0
});

Ext.override(Ext.menu.Menu, {
    enableKeyNav: false
});


function my_onbeforeunload(e) {
    message = getLocale('Podría tener datos sin guardar, está seguro que desea salir?');
    e = e || window.event;
    if (e) {
        e.returnValue = message;
    }
    return message;
}

Ext.override(Ext.data.Store, {
    sync: function () {
        this.callParent(arguments);
        this.checkDirty();
    },

    initComponent: function () {
        this.callParent(arguments);

        this.on('datachanged', this.checkDirty);
    },

    checkDirty: function () {
        var dirty = this.isDirty();
        _dirty = dirty;
        window.onbeforeunload = (dirty && !this.ignoreDirty) ? my_onbeforeunload : null;
    },

    isDirty: function () {
        var me = this,
            toCreate = me.getNewRecords(),
            toUpdate = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            needsSync = true;
        }

        return needsSync;
    }
});

// Guarda un array de modelos de manera sincronica
function saveSync(records,callback, index, delay=500){
    // guardo el record del index
    if (!index){index=0}
    var record = records[index];
    //console.log(index);
    if (record){
        record.save({callback:function(){
            index++
            if (records.length > index){
                Ext.Function.defer(saveSync, delay, this, [records, callback,index]);
            } else if (callback){
                Ext.callback(callback)
            }
        }})
    }
};

Ext.override(Ext.panel.Panel, {
    forceClose: true,
    initComponent: function () {
        var key = this.title;

        if (typeof this.translate == 'undefined' || this.translate == true) {
            this.title = getLocale(key);
            this.translate == false;
        }
        this.callParent(arguments);

        this.on('beforeclose', function (view) {
            var forms = view.query('form');
            var grids = view.query('grid');
            var iframe = view.query('Iframe');
            var dirty = false;

            var xtype = view.getXTypes();

            if (xtype.search('form') != -1) {
                forms.push(view);
            }

            if (xtype.search('grid') != -1) {
                grids.push(view);
            }

            if (xtype.search('Iframe') != -1) {
                iframe.push(view);
            }

            if (view.forceClose) {
                //view.forceClose =false;
                return true;
            } else {
                Ext.Array.each(forms, function (form) {
                    if (form.getForm().isDirty()) {
                        dirty = true;

                        if (dirty) {
                            Ext.Msg.show({
                                title: getLocale('Esta seguro?'),
                                msg: getLocale('Podría tener datos sin guardar, está seguro que desea salir?'),
                                buttons: Ext.Msg.OKCANCEL,
                                icon: Ext.Msg.QUESTION,
                                fn: function (btn) {
                                    if (btn == 'ok') {
                                        form.resetOriginal();
                                        form.getForm().checkDirty();
                                        view.forceClose = true;
                                        view.close();
                                    }
                                }
                            });
                        }
                        return false;
                    }
                })

                Ext.Array.each(grids, function (grid) {
                    if (!grid.ignoreDirty && grid.getStore().isDirty()
                        && grid.itemId != 'gridname') {
                        dirty = true;

                        Ext.Msg.show({
                            title: getLocale('Esta seguro?'),
                            msg: getLocale('Está cerrando una grilla sin guardar los cambios, desea continuar?'),
                            buttons: Ext.Msg.OKCANCEL,
                            icon: Ext.Msg.QUESTION,
                            fn: function (btn) {
                                if (btn == 'ok') {
                                    view.forceClose = true;
                                    grid.getStore().checkDirty();
                                    view.close();
                                }
                            }
                        });
                        return false;
                    }
                })

                _dirty = dirty;
                window.onbeforeunload = (dirty && !this.ignoreDirty) ? my_onbeforeunload : null;

                return !dirty;

            }

        })

    }
});

Ext.override(Ext.form.FieldSet, {
    initComponent: function () {
        if (this.title) {
            this.title = getLocale(this.title);
        }
        this.callParent(arguments);
    }
});


Ext.override(Ext.form.field.Checkbox,{
    initComponent: function () {
        if (this.fieldLabel) {
            this.fieldLabel = getLocale(this.fieldLabel);
        }
        this.callParent(arguments);
    }
});






Ext.override(Ext.grid.column.Action, {
    initComponent: function () {

        // comportamiento viejo
        if (this.tooltip) {
            this.tooltip = getLocale(this.tooltip);
        }

        // nuevo: traducir iconToolTips pero sin romper jamás
        var tips = this.iconToolTips;

        if (tips) {
            if (Ext.isArray(tips)) {
                Ext.Array.each(tips, function (val, idx) {
                    if (!val) { return; }
                    if (val.tip) {
                        val.tip = getLocale(val.tip);
                    } else if (Ext.isString(val)) {
                        tips[idx] = getLocale(val);
                    }
                });
            } else if (Ext.isObject(tips)) {
                Ext.Object.each(tips, function (key, val) {
                    if (!val) { return; }
                    if (val.tip) {
                        val.tip = getLocale(val.tip);
                    } else if (Ext.isString(val)) {
                        tips[key] = getLocale(val);
                    }
                });
            }
        }

        this.callParent(arguments);
    }
});

// traduzco el label de cada field
Ext.override(Ext.form.field.Base, {
    getFieldLabel: function () {
        var key = this.trimLabelSeparator();
        var r = getLocale(key);
        //console.log(key, r);
        return r;
        //return key;
    },

    listeners: {
        afterrender: function (field) {
            var showLblHlp = field.showLblHlp;

            if (field.up('form') && field.up('form').showLblHlp) {
                showLblHlp = true;
            }

            if (showLblHlp) {
                Ext.QuickTips.register({
                    dismissDelay: 10000,
                    target: field.labelEl.dom,
                    text: getLocale('help_' + this.trimLabelSeparator())
                });

                field.labelEl.dom.style.cursor = 'help';
            }
        }
    }
});

// traduzco el texto de cada boton
Ext.override(Ext.button.Button, {
    initComponent: function () {
        var key = this.text;
        if (typeof this.translate == 'undefined' || this.translate == true) {
            this.text = getLocale(key);
            this.translate == false;
        }
        this.callParent(arguments);
    }
});

// hago que las grillas sean stateful

Ext.override(Ext.grid.Panel, {
    stateful: true,
    viewConfig: {
        loadingText: getLocale('Cargando...')
    },
    initComponent: function () {
        Ext.apply(this, { stateId: '@ViewBag.UIApplicationName' + '_' + this.itemId });
        this.callParent(arguments);
    }
})

// traduzco el header de cada columna de grilla
Ext.override(Ext.grid.column.Column, {
    beforeRender: function () {
        var key = this.text;
        if (typeof this.translate == 'undefined' || this.translate == true) {
            this.text = getLocale(key);
            this.translate == false;
        } else {
            this.text = key;
        }
        this.callParent(arguments);
    }
});

if (Ext.LoadMask) {
    Ext.LoadMask.prototype.msg = getLocale("Cargando...");
}

Ext.override(Ext.selection.Model, {
    selectAll: function (suppressEvent) {
        var me = this,
            selections = me.store.getRange(),
            i = 0,
            len = selections.length,
            start = me.getSelection().length;


        me.bulkChange = true;
        for (; i < len; i++) {
            me.doSelect(selections[i], true, suppressEvent);
        }
        delete me.bulkChange;
        // fire selection change only if the number of selections differs
        me.maybeFireSelectionChange(me.getSelection().length !== start && !suppressEvent);
    }
});


var external = '';
var js = 'js';
var bundle = false;
var UiApplicationVersion = '';


Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Ext.ux.AcePanel': '/js/Ace/AcePanel.js',
        'Slbf': external + '/js/Slbf',
        'Desktop': '/js/Desktop',
        'Desktop.store.LocalizationStore': '/js/Desktop/LocalizationStore.js',
        'Desktop.store.ParametrosStore731': '/js/Desktop/ParametrosStore731.js',
        'Desktop.store.SecurityModulesStore': '/js/Desktop/SecurityModulesStore.js',
        'Desktop.store.': '/js/Desktop/KeyModulesStore.js',
        'Desktop.store.NotCreatedStore' : '/js/Desktop/NotCreatedLangKeyStore.js',
        'Desktop.store.UserLanguageStore' : '/js/Desktop/UserLanguageStore'
    }
});

//Ext.Loader.loadScript(localeScript);
var localizationStore = Ext.create('Desktop.store.LocalizationStore');
var parametrosStore = Ext.create('Desktop.store.ParametrosStore731');
var KeyModulesStore = Ext.create('Desktop.store.KeyModulesStore');
var SecurityModulesStore = Ext.create('Desktop.store.SecurityModulesStore');
var notCreatedLangKeyStore = Ext.create('Desktop.store.NotCreatedLangKeyStore');
var userLanguageStore = Ext.create('Desktop.store.UserLanguageStore');
var urldev = 'https://gcs.softguard.com';
var oauth_tokendev = '7D450B5B-D9C7-4836-96D3-D89856FBD7ED';

//keycustomerinfo
var KeyCustomerInfo;
// Helper safe JSON decode to avoid breaking the app if backend returns invalid JSON
function safeJsonDecode(text, fallback) {
    try {
        return JSON.parse(text);
    } catch (e) {
        console.warn('safeJsonDecode: invalid JSON, using fallback', e);
        try {
            if (window && window.localStorage) {
                localStorage.setItem('lastInvalidJson', (text || '').toString().slice(0, 2048));
            }
        } catch (_) { }
        return fallback;
    }
}

Ext.Ajax.request({
    url: '/Rest/Security/KeyCustomerInfo',
    failure: function (r, o) {
        //alert("No se pudieron cargar los modulos, por favor, intente nuevamente");
        //window.location.href="/";
    },
    success: function (response, action) {
        KeyCustomerInfo = Ext.JSON.decode(response.responseText);
    },
    scope: this
});

var _UserData;
var _SYS;

var UiApplicationMetadata = {};

Ext.Ajax.request({
    url: '/Rest/Security/UserData',
    method: 'GET',
    scope: this,
    success: function (response) {
        if (response) {

            var userData = Ext.JSON.decode(response.responseText);

            _UserData = userData;

            Ext.Ajax.request({
                url: '/Rest/security/UserData/' + _UserData.udw_idKey + '/MetaData',
                success: function (resp, operation) {
                    // si la metadata del usuario tiene una provincia la sobre escribe para centrar el mapa
                    if (resp.responseText) {

                        var metadata = Ext.JSON.decode(resp.responseText);
                        if (metadata) {
                            _UserData.metadata = metadata
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
                url: '/Rest/search/SYS_initInfo',
                success: function (resp, operation) {
                    if (resp.responseText) {

                        var metadata = Ext.JSON.decode(resp.responseText);
                        if (metadata) {
                            _SYS = metadata.rows[0]
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
                    }
                }
            })


        } else {
            notify('No hay datos de usuario');
        }
    }
});


Ext.define('Common.Application', {
    extend: 'Ext.app.Application',
    models: ['Common.model.LocalizationModel'],
    storeModules: SecurityModulesStore,
    KeyModulesStore: KeyModulesStore,
    UserData: _UserData,
    getModuleIdByName: function (name) {
        //var record = this.storeModules.findRecord('udm_key_reference',name);
        var idModule = 0;
        /*******Daniel Orlando Medina********************** */
        Ext.Array.each(this.storeModules.data.items, function (r, k) {//Ext.Array.each(this.storeModules.rows,function (r,k) {
            //if(name == r.udm_key_reference) {
            //    idModule = r.udm_idKey;  
            //}
            if (name == r.data.KeyReference) {
                idModule = r.data.ModuleId;
            }
        })
        /*************************************************** */
        return idModule;
    },
    getToken: function () {
        var currentURL = window.location.href;
        var parser = document.createElement('a');
        parser.href = currentURL;


        if (parser.hostname === "localhost") {
            return "7D450B5B-D9C7-4836-96D3-D89856FBD7ED";
        } else {
            return Ext.util.Cookies.get("OAuth_Token");
        }

        return '';
    }
});

//Traduce los componentes de sencha Dinamicamente
Ext.Ajax.request({
    url: '/Rest/Security/UserData',
    method: 'GET',
    scope: this,
    success: function (response) {
        if (response) {
            var userData = safeJsonDecode(response.responseText, null);
            if (!userData) { return; }
            _UserData = userData;
            Ext.Ajax.request({
                url: '/Rest/security/UserData/' + _UserData.udw_idKey + '/MetaData',
                success: function (resp, operation) {
                    if (resp.responseText) {
                        var metadata = safeJsonDecode(resp.responseText, null);
                        if (metadata) {
                            _UserData.metadata = metadata;
                            if (metadata.language) {
                                this.loadLocale();
                            }
                        }
                    }
                }
            })
        }
    }
});

function getRight(_module, right) {
    var record = getSecurityModule(_module);

    if (record && record.get('Available')) {
        if (record.get('_Security') && record.get('_Security').rights) {
            var value = record.get('_Security').rights[right];
            if (value) {
                if (value == true || value == 'true') {
                    return true;
                } else if (value == 'false' || value == false) {
                    return false;
                } else {
                    return value;
                }
            } else {
                return false;
            }
        } else if (record.get('_Security') && record.get('_Security')[right]) {
            var value = record.get('_Security')[right];
            if (value) {
                if (value == true || value == 'true') {
                    return true;
                } else if (value == 'false' || value == false) {
                    return false;
                } else {
                    return value;
                }
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    } else {
        if (isModuleAvailable('Administrator')) {
            return true
        } else {
            return false;
        }
    }
};

function isModuleAvailable(_module) {
    var recordModule = getSecurityModule(_module);
    var result = false;

    if (recordModule && recordModule.get('Available') == true) {
        result = true;
    }

    return result;
};
function getSecurityModule(_module) {
    var storeSecurity = Ext.data.StoreManager.lookup('SecurityModulesStore');
    var recordModule = storeSecurity.findRecord('KeyReference', _module);

    return recordModule;
}


/** 
 * clase para mask con timeout 
 */
var maskAutoDown = {
    mask:null,
    tiemout:null,
    timeMilisecond: 10000,
    init: function (view, msg, time) {
        var t = this;      
        if(time != null) {
            this.timeMilisecond = time
        }
                
        this.mask = Ext.create('Ext.LoadMask', view, {
                msg: msg
        }).show()

        this.timeout = setTimeout(function () {
                console.log('Cierre forzado de mask', msg)
                t.hide()
        }, this.timeMilisecond)     

        return this;
    },
    hide: function () {
        
        this.mask.hide();
        clearTimeout(this.timeout)
    }
}



/**
 * decimalColorToHTMLcolor: Calcula el color de INT a HEX y lo almacena en un array global y no lo vuelve a calcular
 * INPUT: number INT
 * OUTPUT: color en hexadecimal STRING
 */
 function calculateColor (number) {
        var intnumber = number - 0;
        var red, green, blue;
    	var template = "#000000";
	        red = (intnumber&0x0000ff) << 16;
		green = intnumber&0x00ff00;
		blue = (intnumber&0xff0000) >>> 16;
	        intnumber = red|green|blue;
	
		var HTMLcolor = intnumber.toString(16);
		HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
	
		return HTMLcolor;
    }
var arrayColors = []
var decimalColorToHTMLcolor = function(number) {
    if(this.arrayColors[number]) {
        return this.arrayColors[number]
    } else {
        this.arrayColors[number] = calculateColor(number)
        return this.arrayColors[number]
    }
};

/* fin calculo color */


function insertTextAtCursor(el, text) {
    var val = el.value, endIndex, range, doc = el.ownerDocument;
    if (typeof el.selectionStart == "number"
            && typeof el.selectionEnd == "number") {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (doc.selection != "undefined" && doc.selection.createRange) {
        el.focus();
        range = doc.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
};

/**
 * Esta funcion es para retornar un objeto de los features en geojson
 */
function getProperties (feature) {
    var obj = {}
    feature.forEachProperty(function (value,property) {
        obj[property] = value
    })
    return obj
}
