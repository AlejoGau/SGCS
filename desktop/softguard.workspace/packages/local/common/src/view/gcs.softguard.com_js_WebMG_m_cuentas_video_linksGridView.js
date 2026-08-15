Ext.define('Common.view.m_cuentas_video_linksGridView', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.videolinksgridview'],
    /*title : 'Templates',*/
    autoHeight: true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    features: [
        {
            ftype: 'grouping',
            //  groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> {name} ({rows.length})</input>',
            groupByText: getLocale('Agrupar'),
            showGroupsText: getLocale('Mostrar en grupos')
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            width: 40,
            items: [{
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
                    var view = grid.up('videolinksgridview');
                    var rec = grid.getStore().getAt(rowIndex);

                    console.log(rec);
                    var jsonvideo;
                    // window.open('SGVIDEO://'+rec.get('cuv_clink')+'|'+cuenta.get('cue_clinea')+'|'+Ext.String.trim(cuenta.get('cue_ncuenta'))+'|'+new Date().getTime().toString()+'|'+'nada','_self');
                    var cvl_clink = rec.get('cvl_clink');
                    //console.log(cuv_clink);
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

                }
            }]
        },
        {
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
            header: 'Alarma',
            dataIndex: 'cvl_calarma',
            renderer: function (value, metadata, record, colIndex, store, view) {
                return record.get('cod_cdescripcion');
            },
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: 'Código de Zona',
            dataIndex: 'zon_ccodigo',
            flez: 1

        }, {
            xtype: 'gridcolumn',
            header: 'Descripcion',
            dataIndex: 'zon_cdescripcion',
            flex: 1
        }/*,{
            xtype : 'gridcolumn',            
            header : 'cvl_clink',
        	dataIndex : 'cvl_clink',
            hidden: true,
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'cvl_clinkdss',
        	dataIndex : 'cvl_clinkdss',
            hidden: true,
            flex: 1
		}*/, {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'tvi_cnombre',
            hidden: false,
            flex: 1
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        var view = this;
        var comboSearch = [
            ['cvl_calarma', getLocale('Alarma')]
        ];

        /*   this.onSelectChange = function (selModel, selections) {
               view.down('#deletevideolink').setDisabled(selections.length == 0);
           };
   
           this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
           
                   */

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
                    action: 'add'
                }, "-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    itemId: 'deletevideolink',
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
                                        editable: false

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