Ext.define('Common.view.SmartpanicsCrmGridView', {
    extend: 'Ext.grid.GridPanel',
    alias: ['widget.smartpaniccrmgridview'],
    title: 'Productos',
    autoHeight: true,
    closeAction: 'destroy',
    selType: 'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    columns: [{
        xtype: 'gridcolumn',
        header: 'Cuenta',
        dataIndex: 'cue_cnombre',
        renderer: function (value, p, r) {
            var linea = r.data['cue_clinea'];
            var ncuenta = r.data['cue_ncuenta'];
            if (linea != '' && ncuenta != 0) {
                return r.data['cue_clinea'] + "-" + Ext.String.leftPad(r.data['cue_ncuenta'], 4, '0');
            } else {
                return '';
            }
        },
        width: 80
    }, {
        xtype: 'gridcolumn',
        header: 'Dealer',
        dataIndex: 'cue_clinea',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        header: 'Nombre de cuenta',
        dataIndex: 'cue_cnombre',
        width: 200
    }, {
        xtype: 'gridcolumn',
        header: 'Usuario',
        dataIndex: 'Nombre',
        width: 150,
        sortable: true
    }, {
        xtype: 'gridcolumn',
        header: 'Telefono',
        dataIndex: 'Telefono',
        width: 80
    }, {
        xtype: 'gridcolumn',
        header: 'Id',
        dataIndex: 'Id',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        header: 'Modelo',
        dataIndex: 'Modelo',
        sortable: true
    }, {
        xtype: 'gridcolumn',
        header: 'Marca',
        dataIndex: 'Marca',
        sortable: true
    }, {
        xtype: 'gridcolumn',
        header: 'Version',
        dataIndex: 'Version',
        sortable: true,
        width: 100
    }, {
        xtype: 'gridcolumn',
        header: 'Tipo',
        dataIndex: 'Tipo'
    }, {
        xtype: 'gridcolumn',
        header: 'Imei',
        dataIndex: 'Imei',
        flex: 1,
        sortable: true
    }
    ],

    initComponent: function () {
        this.callParent(arguments);
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });


        var grid = this;
        this.onSelectChange = function (selModel, selections) {
            var btn = this.down('[action="sendmail"]');
            if (btn) {
                btn.setDisabled(selections.length == 0);
            }

            var btnEncuestaMenu = grid.down('#enviarencuesta');
            var btnEncuestaSeleccionados = null;
            if (btnEncuestaMenu && btnEncuestaMenu.menu && btnEncuestaMenu.menu.items) {
                btnEncuestaMenu.menu.items.each(function (item) {
                    if (item.items) {
                        item.items.each(function (subitem) {
                            if (subitem.itemId === 'sendsurvey') {
                                btnEncuestaSeleccionados = subitem;
                            }
                        });
                    }
                });
            }
            var enableEncuesta = grid.metadataGlobal && grid.metadataGlobal.Config && grid.metadataGlobal.Config.btnEncuesta > 0;
            if (btnEncuestaSeleccionados) {
                btnEncuestaSeleccionados.setDisabled(!(enableEncuesta && selections.length > 0));
            }
        };

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        var mensajeCmp = Ext.ComponentQuery.query('#mensaje')[0];
        if (mensajeCmp && mensajeCmp.on) {
            mensajeCmp.on('change', function (field, newValue) {
                var btn = this.down('[action="sendmail"]');
                var selections = this.getSelectionModel().getSelection();
                if (btn) {
                    btn.setDisabled(selections.length === 0);
                }
            }, this);
        }

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Enviar Mensaje',
                    iconCls: 'icon-email-go',
                    menu: {
                        xtype: 'menu',
                        width: 242,
                        height: 66,
                        bodyPadding: 5,
                        items: [{
                            xtype: 'container',
                            items: [{
                                xtype: 'button',
                                iconCls: 'icon-email-go',
                                text: 'Enviar mensaje a seleccionados',
                                scope: this,
                                action: 'sendmail',
                                itemId: 'sendmail',
                                width: 230,
                                margin: '0 0 10 0',
                                listeners: {
                                    show: function (btn) {
                                        var grid = btn.up('smartpaniccrmgridview');
                                        if (grid) {
                                            var selections = grid.getSelectionModel().getSelection();
                                            btn.setDisabled(selections.length == 0);
                                        }
                                    },
                                    render: function (btn) {
                                        var grid = btn.up('smartpaniccrmgridview');
                                        if (grid) {
                                            var selections = grid.getSelectionModel().getSelection();
                                            btn.setDisabled(selections.length == 0);
                                        }
                                    }
                                }
                            }, {
                                xtype: 'button',
                                iconCls: 'icon-email-go',
                                text: 'Enviar mensaje a lista',
                                scope: this,
                                action: 'sendmailall',
                                itemId: 'sendmailall',
                                width: 230,
                            }]
                        }]
                    }
                }, {
                    text: 'Enviar Encuesta',
                    iconCls: 'icon-ipod-cast',
                    itemId: 'enviarencuesta',
                    menu: {
                        xtype: 'menu',
                        width: 242,
                        height: 66,
                        bodyPadding: 5,
                        items: [{
                            xtype: 'container',
                            items: [{
                                xtype: 'button',
                                iconCls: 'icon-ipod-cast',
                                text: 'Enviar encuesta a seleccionados',
                                scope: this,
                                action: 'sendsurvey',
                                itemId: 'sendsurvey',
                                width: 230,
                                margin: '0 0 10 0',
                                listeners: {
                                    show: function (btn) {
                                        var grid = btn.up('smartpaniccrmgridview');
                                        if (grid) {
                                            var selections = grid.getSelectionModel().getSelection();
                                            btn.setDisabled(selections.length == 0);
                                        }
                                    },
                                    render: function (btn) {
                                        var grid = btn.up('smartpaniccrmgridview');
                                        if (grid) {
                                            var selections = grid.getSelectionModel().getSelection();
                                            btn.setDisabled(selections.length == 0);
                                        }
                                    }
                                }
                            }, {
                                xtype: 'button',
                                iconCls: 'icon-ipod-cast',
                                text: 'Enviar encuesta a lista',
                                scope: this,
                                action: 'sendsurveyall',
                                itemId: 'sendsurveyall',
                                width: 230,
                            }]
                        }]
                    }
                }, '-', {
                    xtype: 'combo',
                    store: [
                        ['telefono', getLocale('Telefono')],
                        ['nombre', getLocale('Nombre de cuenta')],
                        ['usuario', getLocale('Usuario')],
                        ['cuenta', getLocale('Cuenta')],
                        ['imei', getLocale('Imei')],
                        ['dealer', getLocale('Dealer')]
                    ],
                    queryMode: 'local',
                    value: 'telefono',
                    itemId: 'queryType',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'query',
                    fieldLabel: '',
                    labelWidth: 50
                },
                {
                    xtype: 'button',
                    text: 'Buscar',
                    itemId: 'btnBuscar'
                },
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }, '->', {
                    xtype: 'button',
                    text: 'Salir',
                    itemId: 'salir',
                    hidden: true
                }
            ]// cierro items
        });

        this.addDocked(toolbar);

        this.addDocked(pagingtoolbar);

    }
});
