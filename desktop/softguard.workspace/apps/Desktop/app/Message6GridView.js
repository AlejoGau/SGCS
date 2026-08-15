Ext.define('Desktop.Message6GridView', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.Desktopmessagegridview'],
    title: '',
    autoHeight: true,
    //autoScroll: true,
    viewConfig: {
        trackOver: true,
        stripeRows: false,
        getRowClass: function (record) {
            return record.get('DateRead') ? '' : 'rowBold';
        },
        loadMask: false
    },

    initComponent: function () {
        this.columns = [{
            xtype: 'gridcolumn',
            header: getLocale('De'),
            dataIndex: 'FromName',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: getLocale('Subject'),
            dataIndex: 'Name',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            header: getLocale('Fecha de entrada'),
            dataIndex: 'DateCreatedText',
            width: 150
        }];

        this.callParent(arguments);
        var me = this;

        this.on({
            afterrender: this.initView,
            itemdblclick: this.onItemClick,
            objectedit: this.onObjectEdit
        });

        var comboSearch = [
            ['FromName', getLocale('De')],
            ['Name', getLocale('Subject')],
            ['DateCreated', getLocale('Fecha de entrada')]
        ];

        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                    iconCls: 'icon-find',
                    text: getLocale('Nuevo mensaje'),
                    scope: this,
                    action: 'search',
                    listeners: {
                        click: me.onNewMessageClick
                    }
                }, '-', {
                    text: getLocale('Filtros'),
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [{

                                xtype: 'combo',
                                queryMode: 'local',
                                itemId: 'fieldName',
                                store: comboSearch,
                                fieldLabel: getLocale('Campo')


                            }, {
                                xtype: 'textfield',
                                itemId: 'query',
                                fieldLabel: getLocale('Valor')

                            }]
                        }]
                    }

                }, {
                    iconCls: 'icon-find',
                    text: getLocale('Buscar'),
                    scope: this,
                    action: 'search',
                    listeners: {
                        click: me.onSearchClick
                    }
                }, '-',
                {
                    iconCls: 'icon-find',
                    text: getLocale('Todos'),
                    scope: this,
                    action: 'getall',
                    listeners: {
                        click: me.onGetAllClick
                    }
                }
            ] // cierro items
        });

        this.addDocked(toolbar);

    },

    onNewMessageClick: function (button, event, options) {
        //var id = record.get('Id');
        var view = button.up('Desktopmessagegridview');
        var title = 'Nuevo mensaje';
        var msgview = Ext.widget('desktopmessagenewformview', {
            iconCls: 'icon-table-edit',
            caller: view
        });

        var win = Ext.create('Ext.window.Window', {
            title: title,
            height: 500,
            width: 800,
            layout: 'fit',
            items: msgview
        }).show();
    },

    initView: function (view) {
        Ext.Ajax.request({
            url: '/Rest/Security/UserData',
            success: function (response, action) {
                var infoUser = Ext.JSON.decode(response.responseText);
                view.filters = [{
                        property: 'ToId',
                        value: infoUser.udw_idKey
                    },
                    {
                        property: 'ToTypeId',
                        value: 3050
                    }
                ];

                var store = Ext.create('Ext.data.Store', {
                    model: view.getMessageSearchModelModel(),
                    pageSize: 50,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: view.filters
                });

                view.bindStore(store);
                var toolbar = view.down('pagingtoolbar');
                toolbar.bindStore(store);

                store.load();
            }
        });
    },

    getMessageSearchModelModel: function () {
        return Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.Message6SearchModel'); //Ext.ModelManager.getModel('Desktop.model.Message6SearchModel');
    },

    getMessageModelModel: function () {
        return Ext.data.schema.Schema.instances.default.getEntity('Desktop.model.Message6Model'); //Ext.ModelManager.getModel('Desktop.model.Message6Model');
    },

    onItemClick: function (grid, record, item, index, e, options) {
        var id = record.get('Id');
        var view = grid.up('Desktopmessagegridview');
        var title = record.get('Name');

        this.getMessageModelModel().load(id, {
            callback: function (editrecord) {
                // 26-11 : Modifico a formato MS por el Objeto Message.
                editrecord.set('DateRead', Ext.Date.format(new Date(), 'MS'));
                editrecord.save({
                    callback: function () {
                        var store = view.getStore();
                        var fieldName = view.down('#fieldName').getValue();
                        var query = view.down('#query').getValue();

                        var filters = Ext.clone(view.filters);

                        if (fieldName != '' && query != '') {
                            filters.push({
                                property: fieldName + ':LIKE',
                                value: query
                            });
                        }

                        if (filters.length > 0) {
                            store.filter(filters);
                        } else {
                            store.clearFilter();
                        }
                    }
                });

                // si es de series llamo a la lectura remota
                if (editrecord.get('MessageType') == 'SERIES') {
                    try {
                        var _Customdata = Ext.JSON.decode(editrecord.get('Customdata'));
                        var usuario_name = desktopData.infoUser.FirstName + ' ' + desktopData.infoUser.LastName;
                        var usertype;
                        if (desktopData.isAdmin && !desktopData.AdminOnlyAccounts){
                            usertype = 1;
                        } else if (desktopData.infoUser.udw_tipo==0){
                            usertype = 2;
                        }
                        if (_Customdata && _Customdata.id > 0) {
                            Ext.Ajax.request({
                                url: '/handler/SeriesMessageDownloader?action=MarkRead&userid=' + desktopData.infoUser.IdDesktop + '&messageId=' + _Customdata.id + '&username=' + desktopData.infoUser.Email +'&usuario_name='+usuario_name+ '&usertype'+usertype+'&nroserie=' + desktopData.KeyCustomerInfo.Serial.split('-')[1],
                                failure: function (r, o) {
                                    console.log('hubo un error al obtener el token');
                                },
                                success: function (response, action) {
                                    console.log("lectura:"+response);
                                },
                                scope: this
                            });
                        }
                    } catch (e) {
                        console.log('Error al guardar lectura:' + e);
                    }
                }

                var msgview = Ext.widget('message6desktopview', {
                    iconCls: 'icon-table-edit',
                    parent: view.record,
                    record: record,
                    objectId: id
                });

                var win = Ext.create('Ext.window.Window', {
                    title: title,
                    height: 600,
                    width: 800,
                    layout: 'fit',
                    scrollable: true,
                    maximizable: true,
                    items: msgview
                }).show();
            }
        })
    },

    onObjectEdit: function (record, view) {
        this.onItemClick(view, record);
    },

    onGetAllClick: function (button, event, options) {
        var view = button.up('Desktopmessagegridview');
        var store = view.getStore();
        store.remoteFilter = false;
        store.clearFilter(true);
        store.remoteFilter = true;
        store.filter(view.filters);
        view.down('#query').setValue('');
    },

    onSearchClick: function (button, event, options) {
        var view = button.up('Desktopmessagegridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.filters);

        if (fieldName != '') {
            filters.push({
                property: fieldName + ':LIKE',
                value: query
            });
        }

        if (filters.length > 0) {
            store.filter(filters);
        } else {
            store.clearFilter();
        }
    }
});