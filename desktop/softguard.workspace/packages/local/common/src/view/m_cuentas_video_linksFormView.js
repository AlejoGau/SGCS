//MIGRADO2024
Ext.define('Common.view.m_cuentas_video_linksFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.videoxcuentaformview'],
    preventHeader: true,
    frame: true,
    border: 0,
    autoScroll: true,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        //width:'100%',
        width: '100%',
        enforceMaxLength: true
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'checkbox',
            xtype: 'checkbox',
            inputValue: '1',
            itemId: 'cuv_iTodosLosEventos',
            fieldLabel: 'Eventos de alarma',
            name: 'cuv_iTodosLosEventos'
        }, {
            xtype: 'combo',
            itemId: 'comboeventos',
            fieldLabel: 'Selector Eventos',
            store: 'VideoAlarmasStore',
            allowBlank: false,
            name: 'cvl_calarma',
            displayField: 'Descripcion',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            valueField: 'Codigo',
            width: '100%'
        },
        {
            xtype: 'combo',
            itemId: 'cvl_czona',
            fieldLabel: 'Zona',
            name: 'cvl_czona',
            displayField: '_codydesc',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            valueField: 'zon_ccodigo',
            width: '100%'
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Zona',
            itemId: 'zonadescripcion',
            hidden: true
        },
        {
            xtype: 'combo',
            itemId: 'tvideo',
            fieldLabel: 'Dispositivo:',
            name: '_cvl_clinkdss',
            displayField: 'tvi_cnombre',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            valueField: 'Id',
            width: '100%',
            allowBlank: false,
        }, {
            xtype: 'displayfield',
            itemId: 't_videoidAux',
            fieldLabel: 'Tipo',
            margin: '15 0 0 0',
            hidden: true
        },
        {
            xtype: 'fieldset',
            title: 'Link de video',
            itemId: 'defaultfields',
            hidden: false,
            width: '100%',
            layout: 'vbox',
            items: [{
                xtype: 'textarea',
                name: 'cvl_clinkdss',
                fieldLabel: 'cvl_clinkdss',
                itemId: 'cvl_clinkdss',
                hidden: true,
                anchor: '100%'
            },
            {
                xtype: 'textfield',
                name: 'cvl_clink',
                fieldLabel: 'cvl_clink',
                allowBlank: false,
                anchor: '100%'
            }
            ]
        },
        {
            xtype: 'textfield',
            name: 'cvl_rlatitud',
            itemId: 'latitud',
            fieldLabel: 'Latitud',
            allowBlank: true,
            width: '100%',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'cvl_rlongitud',
            fieldLabel: 'Longitud',
            itemId: 'longitud',
            allowBlank: true,
            width: '100%',
            hidden: true
        },
        {
            xtype: 'fieldset',
            title: 'Configuración',
            itemId: 'configfields',
            width: '100%',
            margin: '0 5 0 0',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'cvl_iidcuenta',
            fieldLabel: 'cvl_iidcuenta',
            allowBlank: false,
            anchor: '100%',
            hidden: true
        }
    ],
    initComponent: function () {
        this.callParent();
        var view = this;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId: 'savezone'
                }, {
                    xtype: 'button',
                    text: 'Mapa',
                    iconCls: 'icon-map',
                    action: 'map'
                }, '-', {
                    iconCls: 'icon-cctv-camera',
                    text: 'Ver video',
                    itemId: 'vervideo',
                    handler: function (btn) {
                        var cuenta = view.cuenta;
                        var rec = view.cuentaVideo;
                        var searchvideo = view.searchvideo;
                        // window.open('SGVIDEO://'+rec.get('cvl_clink')+'|'+cuenta.get('cue_clinea')+'|'+Ext.String.trim(cuenta.get('cue_ncuenta'))+'|'+new Date().getTime().toString()+'|'+'nada','_self');
                        var cvl_clink = rec.get('cvl_clink');
                        //console.log(cvl_clink);
                        // Forma nueva pedido por pablo 20/4/2017 no escapo
                        if (cvl_clink.indexOf("hik-online") != -1) { // dejo solo hik-online pedido por pablo
                            // es hik cambio los separadores
                            // cuento la cantidad de /
                            var count = cvl_clink.split('/').length - 1;
                            if (count > 4) {
                                for (i = 0; i < count - 4; i++) {
                                    cvl_clink = cvl_clink.replace('/', '%');
                                }
                            }
                        }

                        var HIKVISIONP2P = getParametro('HIKVISIONP2P', true, true).get('_par_cvalor')
                        var sgvideo = 'SGVIDEO';
                        if (rec.get('tvi_iPlatform') == 1) {
                            sgvideo = sgvideo + 'X64';
                        }
                        var src = sgvideo + '://';
                        src += cvl_clink.substring(0, 4) + '|';
                        var src = sgvideo + '://';
                        var cvl_clink = rec.get('cvl_clink');
                        src += cvl_clink.substring(0, 4) + '/?';
                        //para hik se agrega los campos keyapp
                        if (rec.get('tvi_iid') == 34) {
                            var _p2psetting = HIKVISIONP2P;
                            // me fijo si tengo que usar una region secundaria.
                            if (HIKVISIONP2P.Regions) {
                                // busco una region que tenga el dealer
                                Ext.Array.each(HIKVISIONP2P.Regions, function (_region) {
                                    if (_region.KeyDealers.includes(rec.get('cue_clinea'))) {
                                        _p2psetting = _region;
                                    }
                                })
                            }
                            // me fijo si tiene domain en el parametro
                            var KeyDomain = _p2psetting.KeyDomain;
                            var KeyAuthAddress;
                            var KeyPlatformAddress;
                            console.log('Es tipo de video tvi_iid: 34');
                            if (KeyDomain >= 0) { // 16/05/2023 Daniel O. Medina https://softguard.atlassian.net/browse/DSS-593
                                // este IF estaba evaluando como booleano y los keydomain de regiones igual a CERO
                                // no entraban en el IF.
                                // tengo dominio busco las urls
                                var store = Ext.getStore('parametro_HIKVISIONP2DomainStore');
                                var region = store.findRecord('Id', KeyDomain);
                                if (region) {
                                    KeyAuthAddress = region.get('authAddress');
                                    KeyPlatformAddress = region.get('platformAddress');
                                }
                            }

                            jsonvideo = {
                                VideoLink: cvl_clink,
                                Dealer: rec.get('cue_clinea'),
                                rec: Ext.String.trim(rec.get('cue_ncuenta')),
                                Contenido: '',
                                RecID: '',
                                RemoteHostIP: '',
                                TiempoFotos: '0',
                                UrlDesktop: getParametro('URLDESKTOP'),
                                DesktopExternalUrl: getParametro('DESKTOPEXTERNALURL'),
                                RestURLdeUpLoad: '/rest/upload/new?search=softguardMiscFile&Path=/videoverificacion',
                                TokenURLdeUpLoad: 'oauth_token=' + Ext.util.Cookies.get('OAuth_Token'),
                                DiasBorrado: '5',
                                KeyAppKey: _p2psetting.KeyAppKey,
                                KeyAppSecret: _p2psetting.KeyAppSecret,
                                KeyAuthAddress: KeyAuthAddress,
                                KeyPlatformAddress: KeyPlatformAddress,
                                IdiomaMSJ: _UserData.metadata.language
                                //IdiomaMSJ:t.application.UserData.metadata.language
                            }
                        } else {
                            jsonvideo = {
                                VideoLink: cvl_clink,
                                Dealer: rec.get('cue_clinea'),
                                rec: Ext.String.trim(rec.get('cue_ncuenta')),
                                Contenido: '',
                                RecID: '',
                                RemoteHostIP: '',
                                TiempoFotos: '0',
                                UrlDesktop: getParametro('URLDESKTOP'),
                                DesktopExternalUrl: getParametro('DESKTOPEXTERNALURL'),
                                RestURLdeUpLoad: '/rest/upload/new?search=softguardMiscFile&Path=/videoverificacion',
                                TokenURLdeUpLoad: 'oauth_token=' + Ext.util.Cookies.get('OAuth_Token'),
                                DiasBorrado: '5',
                                IdiomaMSJ: _UserData.metadata.language
                                //IdiomaMSJ:t.application.UserData.metadata.language
                            }
                        }

                        var queryString = Object.keys(jsonvideo)
                            .map(key => `${key}=${jsonvideo[key]}`)
                            .join('&');
                        src += queryString;
                        var iframe = Ext.create('Ext.ux.IFrame', {
                            //src:'SGVIDEO://'+cuv_clink+'|'+cuenta.get('cue_clinea')+'|'+Ext.String.trim(cuenta.get('cue_ncuenta'))+'||'+new Date().getTime().toString()+'|'+'nada'
                            src: src
                        });
                        view.add(iframe);
                        console.log('iframe', src)
                    },
                    hidden: true
                }, {
                    iconCls: 'icon-cctv-camera',
                    text: 'Ver video',
                    itemId: 'videopreview',
                    hidden: true
                }
            ]// cierro items
        });
        this.addDocked(toolbar);
    } // cierro init
});