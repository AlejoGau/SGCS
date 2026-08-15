Ext.define('Common.view.AwccCuentaGridView', {
    extend: 'Common.view.CuentaGridView',
    alias: 'widget.awcccuentagridview',
    title: 'Cuentas',
    autoHeight: true,
    viewConfig: {
        loadMask: false
    },
    itemId: 'cuentagridview',
    stateId: 'cuentagridview_1',
    columns: [{
        xtype: 'actioncolumn',
        header: 'Acciones',
        width: 100,
        hidden: true,
        items: [{
            iconCls: 'icon-cuentaEdit',
            tooltip: getLocale('Modificar Cuenta'),
            handler: function (grid, rowIndex, colIndex, item, event) {
                var view = grid.up('cuentagridview');
                var rec = grid.getStore().getAt(rowIndex);
                view.fireEvent('objectedit', rec, view);
            }, getClass: function (value, metadata, record, a, b, c, view) {
                if (view.cambioSituacionShow) {
                    return 'x-hide-display';
                } else {
                    return 'icon-cuentaEdit';
                }

            }
        }, {
            tooltip: getLocale('Copiar'),
            iconCls: 'icon-cuentaAdd',
            getClass: function (value, metadata, record, a, b, c, view) {
                if (view.cambioSituacionShow) {
                    return 'x-hide-display';
                } else {
                    return 'icon-cuentaAdd';
                }

            },
            handler: function (grid, rowIndex, colIndex, item, event) {

                var view = grid.up('cuentagridview');

                if (!view.cuentasDisponibles) {
                    notify('Supero la cantidad de cuentas disponibles.');
                    return false;
                }

                if (!view.copiHide && view.cuentasDisponibles) {
                    var record = grid.getStore().getAt(rowIndex);
                    var cuenta = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');

                    Ext.create('Ext.Window', {
                        title: getLocale('Copiar cuenta') + ': ' + cuenta,
                        height: 450,
                        width: 400,
                        closeAction: 'hide',
                        border: false,
                        layout: 'fit',
                        modal: true,
                        items: [{
                            xtype: 'cuentacopyview',
                            record: record
                        }]
                    }).show();
                } else {

                    notify('No tiene el permiso necesario.');
                }
            }
        }, {
            iconCls: 'icon-clock-red',
            tooltip: getLocale('Modificar situación'),

            handler: function (grid, rowIndex, colIndex) {
                var view = grid.up('cuentagridview');
                var modules = view.security.modules;

                var situacion = Ext.Array.filter(modules, function (module) {
                    if (module.view == 'estadoview')
                        return true
                    else
                        return false
                })[0];

                if (situacion.profile >= '2') {
                    var record = grid.getStore().getAt(rowIndex),
                        cuenta = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre'),
                        view = Ext.widget('estadopruebaformview', {
                            cuenta: record
                        });

                    Ext.create('Ext.Window', {
                        title: getLocale('Modificar situación') + ': ' + cuenta,
                        height: 250,
                        width: 750,
                        closeAction: 'hide',
                        border: false,
                        layout: 'fit',
                        modal: true,
                        items: [view]
                    }).show();
                } else {
                    notifyError('No posee derechos para esta operación');
                }
            }
        }, {
            iconCls: 'icon-reportes',
            tooltip: getLocale('Eventos'),
            getClass: function (value, metadata, record, a, b, c, view) {
                if (view.cambioSituacionShow) {
                    return 'x-hide-display';
                } else {
                    return 'icon-cuentaAdd';
                }

            },
            handler: function (grid, rowIndex, colIndex, item, event) {
                var view = grid.up('cuentagridview');
                var rec = grid.getStore().getAt(rowIndex);
                view.fireEvent('mostrarEventos', rec, view);
            }
        }, {
            iconCls: 'icon-application-cascade',
            tooltip: getLocale('Ver particiones'),
            getClass: function (value, metadata, record, a, b, c, view) {
                if (view.partitionHide || view.cambioSituacionShow) {
                    return 'x-hide-display';
                } else {
                    return 'icon-application-cascade';
                }

            },

            handler: function (grid, rowIndex, colIndex) {
                var view = grid.up('cuentagridview');
                var modules = view.security.modules;

                var record = grid.getStore().getAt(rowIndex),
                    cuenta = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre'),
                    view = Ext.widget('particioneschooserview', {
                        record: record,
                        targetTab: view.up('#center'),
                        hideEdit: true,
                        ultimaAlarma: true
                    });

                Ext.create('Ext.Window', {
                    title: getLocale('Particiones') + ': ' + cuenta,
                    height: 250,
                    width: 750,
                    closeAction: 'hide',
                    border: false,
                    layout: 'fit',
                    modal: true,
                    items: [view]
                }).show();

            }
        }
        ]
    },
    {
        xtype: 'gridcolumn',
        header: 'Cuenta',
        sortable: true,
        dataIndex: 'cue_ncuenta',
        renderer: function (value, object, record) {
            return record.get('cue_clinea') + '-' + value;
        },
        hidden: true,
        flex: 1
    }, {
        xtype: 'gridcolumn',
        header: 'Nombre',
        dataIndex: 'cue_cnombre',
        sortable: true,
        width: 250,
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        header: 'Estado',
        dataIndex: 'sta_nestado',
        sortable: true,
        width: 100,
        renderer: function (value, metadata, record, colIndex, store, view) {

            var text = '';
            if (value == 1) {
                text = getLocale('Desactivado');
                color = "#00FF00";
            } else {
                text = getLocale('Activado');
                color = "#FF0000";
            }

            metadata.style = 'background: ' + color;

            return text;
        }
    }, {
        xtype: 'gridcolumn',
        hidden: false,
        header: 'Último evento',
        dataIndex: 'rec_calarma',
        renderer: function (value, metadata, record, colIndex, store, view) {
            var texto = '';
            if (record.get("Situacion") != 'No Habilitado' && record.get('rec_calarma') && record.get('rec_calarma').trim() != '') {
                texto = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcionUAP');
                var txtColor = this.decimalColorToHTMLcolor(record.get('cod_nColorLetraUAP'));
                var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolorUAP'));
                metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
            }
            return texto
        },
        sortable: true,
        flex: 1
    }, {
        xtype: 'datecolumn',
        hidden: false,
        header: 'Fecha ult. evento',
        dataIndex: 'rec_tfechahoraUAP',
        format: 'd/m/Y H:i:s',
        sortable: true,
        hidden: true,
        width: 120
    }, {
        xtype: 'datecolumn',
        hidden: false,
        header: 'Fecha Cuenta',
        dataIndex: '_tfechahoraUAPOffzet',
        format: 'd/m/Y H:i:s',
        sortable: true,
        hidden: true,
        width: 120
    }, {
        xtype: 'gridcolumn',
        header: 'Cuenta madre',
        dataIndex: '_cuentamadre',
        renderer: function (value, metadata, record, colIndex, store, view) {
            if (record.get('madre_clinea')) {
                return record.get('madre_clinea') + '-' + record.get('madre_ncuenta') + ' ' + record.get('madre_cnombre');
            } else {
                return "";
            }
        },
        width: 140
    }
    ],

    initComponent: function () {

        this.callParent(this);
        this.removeDocked(this.down('toolbar'));

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [

                {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Nueva Cuenta',
                    itemId: 'cuentaCreate',
                    action: 'crearCuenta',
                    disabled: true,
                    hidden: true
                }, {
                    text: 'Filtros',
                    itemId: 'filtro',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'dealer',
                                                emptyText: getLocale('Dealer'),
                                                width: 110

                                            }, {
                                                xtype: 'textfield',
                                                itemId: 'cuenta',
                                                emptyText: getLocale('Cuenta'),
                                                width: 147,
                                                margin: '0 0 0 5'
                                            }
                                        ]
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'nombre',
                                        emptyText: getLocale('Nombre'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'calle',
                                        emptyText: getLocale('Calle'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'email',
                                        emptyText: getLocale('Email'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'telefono',
                                        emptyText: getLocale('Teléfono'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'clave',
                                        emptyText: getLocale('Clave'),
                                        width: 260
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'equipogprs',
                                        displayField: 'pan_cdescripcion',
                                        valueField: 'pan_ccodigo',
                                        emptyText: getLocale('Equipo GPRS'),
                                        name: 'pan_cgprs',
                                        queryMode: 'local',
                                        flex: 1
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'campocustom',
                                        emptyText: getLocale('Campo custom'),
                                        width: 260
                                    }, {
                                        xtype: 'combo',
                                        store: 'ProvinciasStore',
                                        name: "cue_cprovincia",
                                        displayField: 'pro_cdescripcion',
                                        itemId: 'comboProvincia',
                                        valueField: 'pro_ccodigo',
                                        editable: false,
                                        emptyText: getLocale('Provincia'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'localidad',
                                        emptyText: getLocale('Ciudad'),
                                        width: 260
                                    }, {
                                        xtype: 'button',
                                        iconCls: '',
                                        text: 'Buscar',
                                        action: 'filterText'
                                    }
                                ]
                            }
                        ]
                    }
                },
                '-',
                {
                    iconCls: 'icon-cuenta_filter_fallotest ',
                    text: 'Fallo TST',
                    action: 'filterFalloTest',
                    itemId: 'filterFalloTest',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    itemId: 'fallotst',
                    hidden: true
                },
                {
                    iconCls: 'icon-cuenta_filter_nohabilitadas ',
                    text: 'No Habilitadas',
                    action: 'filterNoHabilitadas',
                    itemId: 'filterNoHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    hidden: true
                },
                {
                    iconCls: 'icon-cuenta_filter_habilitadas',
                    text: 'Habilitadas',
                    action: 'filterHabilitadas',
                    itemId: 'filterHabilitadas',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    hidden: true
                },
                {
                    iconCls: 'icon-cuenta_filter_enprueba',
                    text: 'En Prueba',
                    itemId: 'filterEnprueba',
                    action: 'filterEnprueba',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    hidden: true
                },
                {
                    iconCls: 'icon-cuenta_filter_eliminar',
                    text: 'Eliminar',
                    action: 'filterEliminar',
                    itemId: 'filterEliminar',
                    toggleGroup: 'filter',
                    enableToggle: true,
                    hidden: true
                }, {
                    iconCls: 'icon-application-cascade',
                    text: 'particiones',
                    action: 'particiones',
                    itemId: 'particiones',
                    pressed: false,
                    toggleGroup: 'filter',
                    enableToggle: true,
                    hidden: true
                },
                {
                    iconCls: 'icon-cuenta_filter_todas',
                    text: 'Todas',
                    action: 'removefilter',
                    pressed: true,
                    toggleGroup: 'filter',
                    enableToggle: false
                }, {
                    xtype: 'button',
                    text: 'Exportar',
                    itemId: 'btnExportar',
                    action: 'export',
                    iconCls: 'icon-page-excel',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Activados',
                    itemId: 'btnActivados',
                    action: 'activador',
                    iconCls: 'icon-bullet-red',
                    toggleGroup: 'filter',
                    pressed: false,
                    enableToggle: false
                }, {
                    xtype: 'button',
                    text: 'Desactivados',
                    itemId: 'btnDesactivados',
                    action: 'desactivados',
                    iconCls: 'icon-bullet-green',
                    toggleGroup: 'filter',
                    pressed: false,
                    enableToggle: false
                }
            ]// cierro items
        });


        this.addDocked(toolbar);
        var LABELCAMPOCUSTOM = getParametro('LABELCAMPOCUSTOM');

        if (LABELCAMPOCUSTOM) {

            toolbar.down('#campocustom').emptyText = LABELCAMPOCUSTOM;
            //toolbar.down('#campocustom').applyEmptyText();
            toolbar.down('#campocustom').show();
        }

        var view = this;

        if (UiApplicationMetadata.viewConfig) {
            var viewConfig = Ext.JSON.decode(UiApplicationMetadata.viewConfig);
            Ext.Array.each(viewConfig, function (item) {
                if (item.view == view.alias[0].split('.')[1]) {
                    if (item.showColumns) {
                        Ext.Array.each(item.showColumns, function (index) {
                            var column = view.down("gridcolumn[dataIndex=" + index + "]");
                            if (column) column.show();
                        });
                    }
                }
            });
        }


        this.decimalColorToHTMLcolor = function (number) {
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
        };
    }
});













Ext.define('Common.view.CuentaForMapGuardGridView', {
    extend: 'Common.view.CuentaGridView',
    alias: 'widget.cuentaformapguardgridview',
    title: 'Cuentas',
    autoHeight: true,
    itemId: 'cuentagridview',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns: [
        {
            xtype: 'gridcolumn',
            header: '',
            dataIndex: 'cue_nAutoMonitoreo',
            width: 26,
            hidden: true,
            renderer: function (value, metadata, record) {
                if (value == 1) {
                    return '<img data-qtip="' + getLocale('Automonitoreo') + '" src="/resources/global/images/icons/monitor_lightning.png" width=16 height=16>';
                }
                return '';
            }
        },
        {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            sortable: true,
            dataIndex: 'cue_ncuenta',
            renderer: function (value, object, record) {
                return record.get('cue_clinea') + '-' + value;
            },
            width: 100
        }, {
            xtype: 'gridcolumn',
            header: 'Nombre',
            dataIndex: 'cue_cnombre',
            sortable: true,
            width: 250
        }, {
            xtype: 'gridcolumn',
            hidden: false,
            header: 'Último evento',
            dataIndex: 'sta_cultimaalarma',
            renderer: function (value, metadata, record, colIndex, store, view) {
                var texto = '';
                if (record.get("Situacion") != 'No Habilitado' && record.get('sta_cultimaalarma') && record.get('sta_cultimaalarma') != '   ') {
                    texto = record.get('sta_cultimaalarma') + ' - ' + record.get('cod_cdescripcion');
                    var txtColor = this.decimalColorToHTMLcolor(record.get('cod_nColorLetra'));
                    var backColor = this.decimalColorToHTMLcolor(record.get('cod_ncolor'));
                    metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                }
                return texto
            },
            sortable: true,
            width: 100
        },// cue_clinea                
        {
            xtype: 'gridcolumn',
            header: 'Situacion',
            dataIndex: 'Situacion',
            renderer: function (value, metadata, record, colIndex, store, view) {
                var s = record.get("Situacion");
                var rclass = 'habilitado';
                switch (Ext.String.trim(s)) {
                    case 'No Habilitado':
                        rclass = 'nohabilitado';
                        break;
                    case 'Prueba':
                        rclass = 'prueba';
                        break;
                    case 'Prueba x Zonas':
                        rclass = 'pruebazonas';
                        break;
                    case 'Eliminar':
                        rclass = 'eliminar';
                        break;
                }
                metadata.tdCls = rclass;
                return getLocale(value);
            },
            sortable: true,
            width: 100
        },
        {
            xtype: 'gridcolumn',
            hidden: false,
            header: 'Estado',
            dataIndex: 'act_nestado',
            renderer: function (value, metadata, record, colIndex, store, view) {
                var texto = '';
                var color = '';

                if (record.get("act_nestado") == 1) {
                    texto = "Desactivado / Abierto";
                    color = "#00FF00";
                }
                else if (record.get("act_nestado") == 0) {
                    texto = "Activado / Cerrado";
                    color = "#FF0000";
                }
                //metadata.style = 'color: ' + color;
                return getLocale(texto);
            },
            sortable: true,
            width: 140
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            header: 'Imei',
            dataIndex: 'cue_cIMEI',
            sortable: true,
            width: 140,
            hidden: true
        },
        {
            xtype: 'datecolumn',
            hidden: false,
            header: 'Fecha ult. evento',
            dataIndex: 'sta_dfechautimaalarma',
            format: 'd/m/Y H:i:s',
            sortable: true,
            hidden: true,
            width: 120
        }, {
            xtype: 'datecolumn',
            hidden: false,
            header: 'Última posición',
            dataIndex: 'gps_tfechahora',
            format: 'd/m/Y H:i:s',
            sortable: true,
            hidden: true,
            width: 120
        },
        {
            xtype: 'datecolumn',
            hidden: false,
            header: 'Último Test',
            format: 'd/m/Y H:i:s',
            dataIndex: 'sta_dfechaultimotst',
            sortable: true,
            hidden: true,
            width: 120
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            header: 'Provincia/Estado',
            dataIndex: 'cue_provincia',
            sortable: true,
            hidden: true,
            width: 120
        },
        {
            xtype: 'gridcolumn',
            hidden: false,
            header: 'Localidad',
            dataIndex: 'cue_clocalidad',
            sortable: true,
            hidden: true,
            width: 150
        },
        {
            xtype: 'gridcolumn',
            hidden: false,
            header: 'Calle',
            dataIndex: 'cue_ccalle',
            sortable: true,
            hidden: true,
            width: 250
        }
    ],

    initComponent: function () {

        this.callParent(this);


        this.down('toolbar').hide();

        //this.removeDocked(this.down('toolbar'));


        Ext.Ajax.request({
            url: '/Rest/t_parametros/',
            params: 'filter=[{"property":"par_ccodigo:IN","value":"LABELCAMPOCUSTOM"}]',
            method: 'GET',
            scope: this,
            success: function (response) {
                var configs = Ext.JSON.decode(response.responseText);

                if (configs) {
                    //this.down('#queryType').getStore().add({field1:'cue_cCustom',field2:configs.rows[0].par_cvalor}) 
                    this.down('#campocustom').emptyText = configs.rows[0].par_cvalor;
                    //this.down('#campocustom').applyEmptyText();
                    this.down('#campocustom').show();
                }
            }
        })



        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [

             /*  {
                    iconCls: 'icon-cuentaAdd',
                    text: 'Nueva Cuenta',
                    itemId: 'cuentaCreate',
                    action: 'crearCuenta',
                    disabled:true,
                    hidden:true
                },*/{
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
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'dealer',
                                                emptyText: getLocale('Dealer'),
                                                width: 110

                                            }, {
                                                xtype: 'textfield',
                                                itemId: 'cuenta',
                                                emptyText: getLocale('Cuenta'),
                                                width: 147,
                                                margin: '0 0 0 5'
                                            }
                                        ]
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'nombre',
                                        emptyText: getLocale('Nombre'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'calle',
                                        emptyText: getLocale('Calle'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'email',
                                        emptyText: getLocale('Email'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'telefono',
                                        emptyText: getLocale('Teléfono'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'clave',
                                        emptyText: getLocale('Clave'),
                                        width: 260
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'equipogprs',
                                        displayField: 'pan_cdescripcion',
                                        valueField: 'pan_ccodigo',
                                        emptyText: getLocale('Equipo GPRS'),
                                        name: 'pan_cgprs',
                                        queryMode: 'local',
                                        flex: 1
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'campocustom',
                                        emptyText: getLocale('Campo custom'),
                                        width: 260
                                    }, {
                                        xtype: 'combo',
                                        //fieldLabel : 'Provincia / Estado',
                                        store: 'ProvinciasStore',
                                        name: "cue_cprovincia",
                                        displayField: 'pro_cdescripcion',
                                        itemId: 'comboProvincia',
                                        valueField: 'pro_ccodigo',
                                        editable: false,
                                        emptyText: getLocale('Provincia'),
                                        width: 260
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'localidad',
                                        emptyText: getLocale('Ciudad'),
                                        width: 260
                                    }, {
                                        xtype: 'button',
                                        iconCls: '',
                                        text: 'Buscar',
                                        action: 'filterText'
                                    }
                                ]
                            }
                        ]
                    }
                },

            ]// cierro items
        });


        this.addDocked(toolbar);
        /*
        *  PERSONALIZO la vista según metadata
        */
        var view = this;

        if (UiApplicationMetadata.viewConfig) {
            var viewConfig = Ext.JSON.decode(UiApplicationMetadata.viewConfig);
            Ext.Array.each(viewConfig, function (item) {
                if (item.view == view.alias[0].split('.')[1]) {
                    if (item.showColumns) {
                        Ext.Array.each(item.showColumns, function (index) {
                            var column = view.down("gridcolumn[dataIndex=" + index + "]");
                            if (column) column.show();
                        });
                    }
                }
            });
        }
        this.decimalColorToHTMLcolor = function (number) {
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
        };
    }
});



