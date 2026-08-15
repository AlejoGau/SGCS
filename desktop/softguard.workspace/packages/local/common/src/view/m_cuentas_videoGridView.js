//MIGRADO2024
Ext.define('Common.view.m_cuentas_videoGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: ['widget.videoxgridview'],
    /*title : 'Templates',*/

    autoHeight: true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),

    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    features: [
        {
            ftype: 'grouping',
            // groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {name} ({rows.length})</input>',
            groupByText: getLocale('Agrupar'),
            showGroupsText: getLocale('Mostrar en grupos')
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            width: 40,
            header: 'Ver video',
            items: [{
                //iconCls: 'icon-cctv-camera',
                tooltip: getLocale('Ver video'),
                getClass: function (v, metadata, record, rowindex, colindex, store) {
                    var tipo = record.get('tvi_cdescripcion').split(':')[0];
                    var tvi_iid = record.get('tvi_iid');
                    if (tvi_iid == 12
                        || tvi_iid == 19
                        || tvi_iid == 22
                        || tvi_iid == 24
                        || tvi_iid == 30 || record.get('tvi_nLaunch') == "1") {
                        return 'icon-cctv-camera';
                    }
                },
                handler: function (grid, rowIndex, colIndex, item, event) {
                    var view = grid.up('videoxgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    var cuenta = view.cuenta || rec;
                    var jsonvideo;
                    var cuv_clink = rec.get('cuv_clink');

                    if (cuv_clink.indexOf("hik-online") != -1) { // dejo solo hik-online pedido por pablo
                        // es hik cambio los separadores
                        // cuento la cantidad de /
                        var count = cuv_clink.split('/').length - 1;
                        if (count > 4) {
                            for (var i = 0; i < count - 4; i++) {
                                cuv_clink = cuv_clink.replace('/', '%');
                            }
                        }
                    }

                    var HIKVISIONP2P = getParametro('HIKVISIONP2P', true, true).get('_par_cvalor')
                    var sgvideo = 'SGVIDEO';
                    if (rec.get('tvi_iPlatform') == 1) {
                        sgvideo = sgvideo + 'X64';
                    }

                    var src = sgvideo + '://';

                    // Extrae dinámicamente "P2P" o "EZV" antes de los dos puntos
                    var protocolPrefix = cuv_clink.split(':')[0];
                    src += protocolPrefix + '/?';
                    //para hik se agrega los campos keyapp
                    if (rec.get('cuv_iVideoID') == 34) {
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
                            Dealer: rec.get('cue_clinea'),
                            Cuenta: Ext.String.trim(rec.get('cue_ncuenta')),
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
                    } else if (rec.get('cuv_iVideoID') == 51) {
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
                            Dealer: rec.get('cue_clinea'),
                            Cuenta: Ext.String.trim(rec.get('cue_ncuenta')),
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
                        var jsonvideo = {
                            VideoLink: cuv_clink,
                            Dealer: rec.get('cue_clinea'),
                            Cuenta: Ext.String.trim(rec.get('cue_ncuenta')),
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
                        .filter(function (key) { return jsonvideo[key] !== undefined && jsonvideo[key] !== null && jsonvideo[key] !== ''; })
                        .map(function (key) { return key + '=' + jsonvideo[key]; })
                        .join('&');
                    src += queryString;
                    var iframe = Ext.create('Ext.ux.IFrame', {
                        //src:'SGVIDEO://'+cuv_clink+'|'+cuenta.get('cue_clinea')+'|'+Ext.String.trim(cuenta.get('cue_ncuenta'))+'||'+new Date().getTime().toString()+'|'+'nada'
                        src: src
                    });
                    view.add(iframe);
                    console.log('iframe', src)
                }
            }]
        }, {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            dataIndex: 'cue_clinea',
            hidden: true,
            renderer: function (value, object, record) {
                return record.get('cue_clinea') + "-" + record.get('cue_ncuenta') + " " + record.get('cue_cnombre');
            },
            groupable: true,
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            header: 'Eventos Asociados',
            dataIndex: 'cuv_meventos',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'cuv_clink',
            dataIndex: 'cuv_clink',
            hidden: true,
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'cuv_clinkdss',
            dataIndex: 'cuv_clinkdss',
            hidden: true,
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'tvi_cnombre',
            hidden: false,
            flex: 1
        }
    ],
    initComponent: function () {

        var comboSearch = [
            ['', '']
        ];

        this.onSelectChange = function (selModel, selections) {
            this.down('[action="deletevideo"]').setDisabled(selections.length == 0);
        };
        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);


        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    itemId: 'addvideo',
                    action: 'addvideo'
                }, "-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'deletevideo',
                    itemId: 'deletevideo',
                    disabled: true,
                    scope: this
                }, "-", {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {

                                        xtype: 'combo',
                                        queryMode: 'local',
                                        itemId: 'fieldName',
                                        store: comboSearch,
                                        fieldLabel: 'Campo',
                                        editable: false,

                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'query',
                                        fieldLabel: 'Valor'

                                    }
                                ]
                            }
                        ]
                    }

                }, {
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                }, '-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
        });

        this.addDocked(toolbar);
    }
});
