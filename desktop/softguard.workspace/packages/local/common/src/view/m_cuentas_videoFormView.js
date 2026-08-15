//MIGRADO2024
Ext.define('Common.view.m_cuentas_videoFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.cuentavideoformview'],
    frame: false,
    //layout: 'anchor',
    //anchor: '80%',
    autoScroll: true,
    width: 600,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 100,
        //width:'100%',
        //width:'50%'//,
        //enforceMaxLength: true
    },
    layout: 'auto',
    /*layout: {
        type: 'absolute'//,
        //align : 'stretch'
    },*/
    items: [

        {
            xtype: 'fieldset',
            margin: '10 0 0 0',
            flex: 1,
            //anchor: '100%',
            title: 'Eventos',
            defaults: {
                labelWidth: 250
            },
            layout: 'form',
            items: [
                {
                    xtype: 'checkbox',
                    inputValue: 1,
                    uncheckedValue: 0,
                    fieldLabel: 'Eventos de alerta',
                    itemId: 'cuv_iTodosLosEventos',
                    name: 'cuv_iTodosLosEventos'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Seleccionados',
                    height: '120',
                    minHeight: '120',
                    name: '_eventos',
                    itemId: 'eventos'


                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Seleccionados',
                    name: 'cuv_meventos',
                    itemId: 'eventoshide',
                    hidden: true
                },
                {
                    xtype: 'button',
                    text: 'Modificar',
                    itemId: 'agregarevento',
                    margin: '0 0 10 0',
                }
            ]
        }, {
            xtype: 'container',
            padding: '10,0,0,0',
            layout: 'form',
            defaults: {
                labelAlign: 'left',
                labelWidth: 250,
                //anchor: '80%',

                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    itemId: 't_videoid',
                    fieldLabel: 'Tipo video',
                    name: 'cuv_ivideoid',
                    displayField: 'tvi_cnombre',
                    queryMode: 'local',
                    forceSelection: true,
                    editable: false,
                    valueField: 'Id',
                    hidden: false,
                    allowBlank: false,
                    defaultValue: 0
                }
            ]
        }, {
            xtype: 'displayfield',
            itemId: 't_videoidAux',
            fieldLabel: 'Tipo',
            margin: '15 0 0 0',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'cuv_rlatitud',
            itemId: 'latitud',
            fieldLabel: 'Latitud',
            allowBlank: true,
            width: '100%',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'cuv_rlongitud',
            fieldLabel: 'Longitud',
            itemId: 'longitud',
            allowBlank: true,
            width: '100%',
            hidden: true
        },
        {
            xtype: 'fieldset',
            title: 'Link de video',
            itemId: 'defaultfields',
            hidden: true,
            items: [{
                xtype: 'textarea',
                name: 'cuv_clinkdss',
                fieldLabel: 'cuv_clinkdss',
                itemId: 'cuv_clinkdss',
                hidden: true,
                width: '100%'
            },
            {
                xtype: 'textfield',
                name: 'cuv_clink',
                fieldLabel: 'cuv_clink',
                hidden: true,
                allowBlank: true,
                width: '100%'
            }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Configuración',
            itemId: 'configfields',
            //layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    itemId: 'configfieldcontainer',
                    layout: 'form',

                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 250,
                        anchor: '100%',

                        enforceMaxLength: true
                    },
                }
            ],
            hidden: true
        }/*,
        {
    		xtype : 'textfield',
			name : 'cuv_iidcuenta',
            fieldLabel: 'cuv_iidcuenta',
			allowBlank : false,
            width:'100%',
            hidden:true
		}*/
    ],
    initComponent: function () {
        this.callParent();
        var view = this;
        // this.down('videoxcuentagridview').record = this.record;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',

                    scope: this,
                    action: 'save',
                    itemId: 'save',
                    formBind: true
                }, {
                    xtype: 'button',
                    text: 'Mapa',
                    iconCls: 'icon-map',
                    action: 'map'
                }, '-',
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar datos de camara',
                    action: 'deletevideo',
                    itemId: 'deletevideo',
                    scope: this
                }, '-', {
                    iconCls: 'icon-cctv-camera',
                    text: 'Ver video',
                    itemId: 'vervideo', // se muestra si if(view.module.get('profile') >= 3)
                    handler: function (btn) {
                        var cuenta = view.cuenta;
                        var rec = view.cuentaVideo;
                        var searchvideo = view.searchvideo;
                        var cuv_clink = rec.get('cuv_clink');

                        // Forma nueva pedido por pablo 20/4/2017 no escapo
                        if (cuv_clink.indexOf("hik-online") != -1) {
                            var count = cuv_clink.split('/').length - 1;
                            if (count > 4) {
                                for (var i = 0; i < count - 4; i++) {
                                    cuv_clink = cuv_clink.replace('/', '%');
                                }
                            }
                        }

                        var sgvideo = 'SGVIDEO';
                        if (searchvideo.get('tvi_iPlatform') == 1) {
                            sgvideo = sgvideo + 'X64';
                        }

                        console.log(cuenta.get('cue_clinea'));
                        var src = sgvideo + '://';

                        // Extrae dinámicamente "P2P" o "EZV" antes de los dos puntos
                        var protocolPrefix = cuv_clink.split(':')[0];
                        src += protocolPrefix + '/?';

                        var cuv_ivideoid = rec.get('cuv_ivideoid');
                        var jsonvideo = {};

                        // ---------------------------------------------------------
                        // LÓGICA HIKVISION (34)
                        // ---------------------------------------------------------
                        if (cuv_ivideoid == 34) {
                            var HIKVISIONP2P = getParametro('HIKVISIONP2P', true, true).get('_par_cvalor');
                            var _p2psetting = HIKVISIONP2P;

                            if (HIKVISIONP2P.Regions) {
                                Ext.Array.each(HIKVISIONP2P.Regions, function (_region) {
                                    if (_region.KeyDealers.includes(cuenta.get('cue_clinea'))) {
                                        _p2psetting = _region;
                                    }
                                });
                            }

                            var KeyDomain = _p2psetting.KeyDomain;
                            var KeyAuthAddress = '';
                            var KeyPlatformAddress = '';

                            if (KeyDomain >= 0) {
                                var store = Ext.getStore('parametro_HIKVISIONP2DomainStore');
                                if (store) {
                                    var region = store.findRecord('Id', KeyDomain);
                                    if (region) {
                                        KeyAuthAddress = region.get('authAddress');
                                        KeyPlatformAddress = region.get('platformAddress');
                                    }
                                }
                            }

                            jsonvideo = {
                                VideoLink: cuv_clink,
                                Dealer: cuenta.get('cue_clinea'),
                                Cuenta: Ext.String.trim(cuenta.get('cue_ncuenta')),
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
                            };

                            // ---------------------------------------------------------
                            // LÓGICA EZVIZ (51)
                            // ---------------------------------------------------------
                        } else if (cuv_ivideoid == 51) {
                            var EZVIZP2P = getParametro('EZVIZP2P', true, true).get('_par_cvalor');
                            var _ezvsetting = EZVIZP2P;

                            // Revisamos regiones si EZVIZ también las usa
                            if (EZVIZP2P.Regions) {
                                Ext.Array.each(EZVIZP2P.Regions, function (_region) {
                                    if (_region.KeyDealers.includes(cuenta.get('cue_clinea'))) {
                                        _ezvsetting = _region;
                                    }
                                });
                            }

                            var KeyAuthAddressEzv = _ezvsetting.KeyAuthAddress || '';
                            var KeyPlatformAddressEzv = _ezvsetting.KeyPlatformAddress || '';

                            // Si EZVIZ utiliza un Domain Store de forma similar a HIKVISION:
                            if (_ezvsetting.KeyDomain >= 0) {
                                // Ajustá el nombre del store si EZVIZ tiene uno propio, ej: parametro_EZVIZP2DomainStore
                                var storeEzv = Ext.getStore('parametro_EZVIZP2DomainStore');
                                if (storeEzv) {
                                    var regionEzv = storeEzv.findRecord('Id', _ezvsetting.KeyDomain);
                                    if (regionEzv) {
                                        KeyAuthAddressEzv = regionEzv.get('authAddress');
                                        KeyPlatformAddressEzv = regionEzv.get('platformAddress');
                                    }
                                }
                            }

                            jsonvideo = {
                                VideoLink: cuv_clink,
                                Dealer: cuenta.get('cue_clinea'),
                                Cuenta: Ext.String.trim(cuenta.get('cue_ncuenta')),
                                Contenido: '',
                                RecID: '',
                                RemoteHostIP: '',
                                TiempoFotos: '0',
                                UrlDesktop: getParametro('URLDESKTOP'),
                                DesktopExternalUrl: getParametro('DESKTOPEXTERNALURL'),
                                RestURLdeUpLoad: '/rest/upload/new?search=softguardMiscFile&Path=/videoverificacion',
                                TokenURLdeUpLoad: 'oauth_token=' + Ext.util.Cookies.get('OAuth_Token'),
                                DiasBorrado: '5',
                                KeyAppKey: _ezvsetting.KeyAppKey,
                                KeyAppSecret: _ezvsetting.KeyAppSecret,
                                KeyAuthAddress: KeyAuthAddressEzv,
                                KeyPlatformAddress: KeyPlatformAddressEzv,
                                IdiomaMSJ: _UserData.metadata.language
                            };

                            // ---------------------------------------------------------
                            // LÓGICA POR DEFECTO (OTROS)
                            // ---------------------------------------------------------
                        } else {
                            jsonvideo = {
                                VideoLink: cuv_clink,
                                Dealer: cuenta.get('cue_clinea'),
                                Cuenta: Ext.String.trim(cuenta.get('cue_ncuenta')),
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
                            };
                        }

                        // Armado dinámico de la QueryString, ignorando las propiedades que sean undefined o vacías
                        // Esto ayuda a que si EZVIZ no necesita Auth/Platform, no te lo imprima sucio en la URL.
                        var queryString = Object.keys(jsonvideo)
                            .filter(function (key) { return jsonvideo[key] !== undefined && jsonvideo[key] !== null && jsonvideo[key] !== ''; })
                            .map(function (key) { return key + '=' + jsonvideo[key]; })
                            .join('&');

                        src += queryString;

                        var iframe = Ext.create('Ext.ux.IFrame', {
                            src: src
                        });
                        view.add(iframe);
                        console.log('iframe', src);
                    },
                    hidden: true
                }, {
                    iconCls: 'icon-cctv-camera',
                    text: 'Ver video',
                    itemId: 'videopreview',//se muestra si hay una serie de condiciones en el 
                    //if(row.get('tvi_nLaunch') == 0) {...
                    // if(view.down('#videopreview') && (row.get('tvi_iid') == 19 || row.get('tvi_iid') == 22 || row.get('tvi_iid')== 30|| row.get('tvi_iid')== 36)) {...
                    hidden: true
                }
            ]// cierro items
        });
        this.addDocked(toolbar);
    } // cierro init
});