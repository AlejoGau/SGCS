//MIGRADO2024
Ext.define('Common.controller.SmsGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SmsSearchModel', 'SmsModel', 'SmsAWCCSearchModel'],
    views: ['SmsGridView'],
    init: function () {
        // genero los eventos
        this.control({
            'smsgridview': {
                afterrender: this.loadData,
                itemdblclick: this.onItemClick
            },
            'smsgridview button[action=refresh]': {
                click: this.onRefreshClick
            },
            'smsgridview button[action=search]': {
                click: this.onSearchClick
            },
            'smsgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'smsgridview button[action=export]': {
                click: this.onExportClick
            }
        });
    }, // cierro init


    onItemClick: function (grid, record, item, index, e, options) {

        var view = grid.up('smsgridview');
        var title = '(' + record.get('que_cDestino') + ') ' + getLocale('Sms transmitidos');
        var estado = record.get('que_nEstado');
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            title: title,
            translate: false,
            width: 450,
            height: 300,
            border: false,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Destino',
                    value: record.get('que_cDestino')

                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Fecha',
                    value: Ext.Date.format(new Date(record.get('que_tfechahora')), 'Y/m/d H:i:s')

                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Estado',
                    renderer: function (value, metadata, record) {

                        switch (estado) {
                            case 0:
                                return getLocale('Pendiente');
                                break;
                            case 1:
                                return getLocale('Enviado');
                                break;
                            case 2:
                                return getLocale('Rechazado');
                            case 3:
                                return getLocale('Conmuto a mail');
                                break;
                        }
                    }


                },

                {
                    xtype: 'displayfield',
                    value: 'Asunto'

                },
                {
                    xtype: 'displayfield',
                    value: record.get('que_cAsunto')

                }
            ]
        });
        win.show();

    },

    loadData: function (view) {
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        /* var mystore =Ext.create('Ext.data.Store',{
             model: this.getSmsSearchModelModel()
         });
         mystore.load();*/
        /* var record = record;
         if (record){
             var _rec_iid = record.get('rec_iid');
             
             // una vez que cargue el store hago el binding con la view
             mystore.load({rec_iid:_rec_iid,store:mystore,panel:panel,callback: this.doBindStore});
         }*/

        var record = view.record;

        view.filters = [];

        if (record) {
            view.filters = [
                {
                    property: 'cue_iid',
                    value: record.get('cue_iid')
                }, {
                    property: 'que_nEstado:NOT',
                    value: 3
                }
            ];

            //view.columns[2].setVisible(false);
        }

        var store = Ext.create('Ext.data.Store', {
            model: this.getSmsSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: [{
                property: 'que_tfechahora',
                direction: 'DESC'
            }],
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);

        store.load();

        if (view.showMaximizer != false) {
            view.addTool({
                type: 'maximize',
                itemId: 'maximizer',
                handler: function (event, img, view, tool) {
                    var view = tool.up('smsgridview');
                    var tabpanel = tool.up('tabpanel');


                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title: 'Sms enviados',
                        closeAction: 'hide',
                        width: 750,
                        height: 550,
                        border: true,
                        modal: false,
                        view: view,
                        items: [
                            {
                                xtype: 'smsgridview',
                                caller: view,
                                showMaximizer: false,
                                record: record

                            }
                        ]
                    });

                    win.show();

                }
            });



        }
        // BC 404430734 - Cargo la seguridad del modulo en base CuentaView (Si se abre notificaciones desde AdminCuentas / DealerSearch)
        var existCuentaView = view.up('cuentaview')
        if (existCuentaView)
            var _security = view.up('cuentaview').security

        if (_security) {
            var btnExport = view.down('#btnExport');

            if (_security.rights && !_security.rights.exportar && btnExport) {
                btnExport.hide();
            }
        }

    },

    doBindStore: function (records, operation, success) {
        if (success) {
            var view = operation.panel;
            view.bindStore(operation.store);

            var timeline = view.up('tabpanel').down('eventotimelinegridview');

            Ext.Array.each(records, function (record) {
                timeline.store.add({
                    fecha: record.get('rec_isoFechaHora'),
                    usuario: record.get('ope_cnombre'),
                    comentario: record.get('rec_cObservaciones'),
                    iconCls: 'icon-email'
                });
            })
        }
    },

    onRefreshClick: function (button, object, options) {
        var view = button.up('smsgridview');
        this.doRefresh(view, '');
    },

    doRefresh: function (view, option) {
        if (!view) {
            view = Ext.ComponentQuery.query('smsgridview')[0];
        }

        var _rec_iid = view.record.get('rec_iid');
        var store = view.getStore();
        if (option == 'getall') {
            store.clearFilter(true);
        }
        store.load({
            rec_iid: _rec_iid,
            store: store,
            panel: view
        });
    },

    onGetAllClick: function (button, event, options) {
        var view = button.up('smsgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },

    onSearchClick: function (button, event, options) {
        var view = button.up('smsgridview');

        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();

        store.clearFilter(true);
        var filters = Ext.clone(view.filters);

        if (fieldName == 'cue_clinea-cue_ncuenta') {
            var querySplit = query.split('-');
            filters.push({
                property: 'cue_clinea',
                value: querySplit[0]
            });
            filters.push({
                property: 'cue_ncuenta',
                value: querySplit[1]
            });
        } else {

            if (fieldName) {
                filters.push({
                    property: fieldName + ':LIKE',
                    value: query
                });

            }

        }

        if (fechadesde) {
            filters.push({
                property: 'que_tfechahora:GTE',
                value: fechadesde
            });
        }

        if (fechahasta) {

            fechahasta = Ext.Date.add(fechahasta, Ext.Date.HOUR, 23);
            fechahasta = Ext.Date.add(fechahasta, Ext.Date.MINUTE, 59);
            fechahasta = Ext.Date.add(fechahasta, Ext.Date.SECOND, 59);

            filters.push({
                property: 'que_tfechahora:LTE',
                value: fechahasta
            });
        }

        if (filters.length > 0) {
            store.filter(filters);
        }
        else {
            store.clearFilter();
        }
    },

    /* Funcion de exportacion */
    onExportClick: function (button, e, eOpts) {
        var view = button.up('smsgridview');
        var store = view.getStore();
        var filters = store.filters;
        var url = '/handler/ReporteSmsGridHTML';

        /* Agrego los filtros aplicados al Store en la URL */
        var min = [],
            length = filters.getCount(),
            i = 0;
        for (; i < length; i++) {
            min[i] = {
                property: filters.items[i].config.property,
                value: filters.items[i].config.value
            };
        }
        url = Ext.urlAppend(url, 'filter=' + Ext.encode(min));

        /* Obtengo por separado FechaDesde y FechaHasta para el encabezado */
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        if (fechadesde) {
            url = Ext.String.urlAppend(url, 'fechadesde=' + Ext.Date.format(new Date(fechadesde), 'd/m/Y'));
        }
        if (fechahasta) {
            url = Ext.String.urlAppend(url, 'fechahasta=' + Ext.Date.format(new Date(fechahasta), 'd/m/Y'));
        }

        /* Agrego _DC */
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        /* Pongo el flag de export en Yes y procede a exportar */
        var exportToExcel = 'yes';
        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
        }

        /* Redirijo a la URL armada */
        location.href = url;

    }



});