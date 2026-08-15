Ext.define('Common.view.EventosPendientesPosterioresGridView', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.eventospendientesposteriorestrgridview'],
    columns: {
        defaults: {
            menuDisabled: true
        },
        items: [
            {
                xtype: 'actioncolumn',
                header: '&nbsp;',
                width: 26,
                sortable: false,
                items: [{
                    iconCls: 'icon-cuentaEdit',
                    tooltip: getLocale('Abrir evento'),
                    sortable: false,
                    handler: function (grid, rowIndex, colIndex, item, event) {
                        var view = grid.up('eventospendientestrgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('openEvent', view, rec);
                    }
                }
                ]
            }, {
                header: "&nbsp;",
                dataIndex: "rec_ccontenido",
                width: 26,
                sortable: false,
                renderer: function (value, metaData) {
                    metaData.style += "padding:0px;";
                    var msg = [];
                    var iconos = ''
                    if (value.match(/IMG|JPG/g)) {
                        msg.push(getLocale('Posee imágenes'))
                    }
                    if (value.match(/MPEG|MPG|MP4|AVI|VIDEO|Video|WEBM/g)) {
                        msg.push(getLocale('Posee video'))
                    }
                    if (value.match(/MP3/g) || value.match(/\[VigiControl\]\[MP4\]/g)) {
                        msg.push(getLocale('Posee sonido'))
                    }
                    if (msg.length > 0) {
                        iconos += "<img src=\"/resources/global/images/icons/film.png\" data-qtip=\"" + msg.join(', ') + "\" />";
                    }
                    return iconos;
                }
            }, {
                header: "&nbsp;",
                dataIndex: "rec_cobservaciones",
                width: 26,
                sortable: false,
                renderer: function (value, metaData) {
                    metaData.style += "padding:0px;";
                    if (value && (value.match(/\[SmartPanics\]/g) || value.match(/\[SmartPanics\]/g)))
                        return "&nbsp;<img src=\"/resources/global/images/icons/comment.png\" data-qtip=\"" + getLocale('Posee notas') + "\"/>";
                    return '';
                }
            },
            {
                text: 'Fecha y Hora del Evento',
                dataIndex: 'rec_tfechahora',
                renderer: function (value, metadata, record) {
                    return Ext.Date.format(record.get('rec_isofechahora'), 'D d-m-Y G:i:s');
                },
                width: 150
            },
            {
                xtype: 'gridcolumn',
                header: 'Cuenta',
                dataIndex: 'rec_iidcuenta',
                sortable: true,
                flex: 2,
                renderer: function (value, metadata, record, colIndex, store, view) {
                    if (!this.nombreMadre) {
                        var nombre = '';
                        if (record.get('cue_nparticion') != 0) {
                            nombre = record.get('madre_clinea') + '-' + record.get('madre_ncuenta') + ' ' + record.get('madre_cnombre') + ' / ' + getLocale('En partición:') + ' ';
                        }
                        return nombre + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');
                    } else {
                        return record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');
                    }
                }
            }, {
                xtype: 'gridcolumn',
                header: 'Icono',
                width: 50,
                sortable: false,
                hidden: true,
                renderer: function (value, metadata, record) {
                    var t = this;
                    var path = '/handler/getImage?u=/images/codala/' + record.get('rec_calarma') + '.png';
                    value = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                    return '<img data-qtip="' + value + '" src="' + path + '"   width=16 height=16 onerror=\'this.style.display = "none"\'>';
                }
            }, {
                xtype: 'gridcolumn',
                header: 'Evento',
                columnId: 'Evento',
                dataIndex: 'rec_calarma',
                sortable: false,
                renderer: function (value, metadata, record, colIndex, store, view) {
                    var texto = '';
                    metadata.tdCls += ' ultimo-evento';
                    var panel = this;
                    if (Ext.util.Format.trim(value) != '') {
                        texto = value + ' - ' + record.get('cod_cdescripcion');
                        record.txtColor = decimalColorToHTMLcolor(record.get('cod_ncolorletra'));
                        record.backColor = decimalColorToHTMLcolor(record.get('cod_ncolor'));
                        metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                    } else {
                        texto = record.get('rec_cContenido');
                        metadata.style = 'color:#333; background-color:transparent;';
                    }
                    return texto;
                },
                width: 210
            }, {
                xtype: 'gridcolumn',
                header: 'Zona',
                dataIndex: 'rec_czona',
                renderer: function (value, metadata, record, colIndex, store, view) {
                    var zona = record.get('_zon_cdescripcion');
                    zona = zona.replace('(   )', '');
                    zona = zona.replace('(0)', '');
                    return zona;
                },
                sortable: true,
                flex: 1
            }, {
                xtype: 'gridcolumn',
                header: 'Usuario',
                dataIndex: '_usu_cnombre',
                renderer: function (value, metadata, record, colIndex, store, view) {
                    value = value.replace('()', '');
                    value = value.replace('(0)', '');
                    return value;
                },
                sortable: true,
                flex: 1
            }, {
                text: 'Prioridad',
                columnId: 'Prioridad',
                dataIndex: 'rec_iprioridad',
                xtype: 'gridcolumn',
                format: '0',
                width: 50
            }, {
                xtype: 'gridcolumn',
                header: 'Estado',
                dataIndex: 'rec_nestado',
                sortable: true,
                groupable: true,
                width: 60,
                renderer: function (value, metadata, record) {
                    var store = this.EventoEstadoStore;
                    var text = '';
                    var estado = store.findRecord('Value', value);
                    if (estado)
                        text = estado.get('Name');
                    return '<div class="circulo estado' + value + '" title="' + text + '"></div>';
                }
            },
            {
                xtype: 'gridcolumn',
                header: 'Origen',
                dataIndex: '_origen',
                sortable: true,
                flex: 1,
                renderer: function (value, metadata, record, colIndex, store, view) {
                    var ret;
                    if (value == '') {
                        if (record.get('rec_norigen') != 0) {
                            var store = this.EventoOrigenStore;
                            var origen = store.findRecord('Value', record.get('rec_norigen'));
                            if (origen) {
                                ret = origen.get('Name');
                            } else {
                                ret = '';
                            }
                        } else {
                            ret = '';
                        }
                        ret += record.get('_puerto');
                    } else {
                        ret = value + record.get('_puerto');
                        var re = /%(.*?)%/g;
                        function replacer(str, p1, offset, s) {
                            return getLocale(p1);
                        }
                        ret = ret.replace(re, replacer);
                        ret = ret.replace(/%/, '');
                    }
                    return ret;
                }
            },
            {
                xtype: 'gridcolumn',
                header: 'Dirección',
                dataIndex: 'cue_ccalle',
                hidden: true,
                sortable: true,
                flex: 2
            },
            {
                xtype: 'gridcolumn',
                header: 'Operador',
                dataIndex: 'ope_cnombre',
                renderer: function (value, metadata, record) {
                    var terminal = record.get('rec_cterminal');
                    if (terminal && terminal != "_WW") {
                        return "(" + terminal + ") " + value;
                    } else {
                        return value;
                    }
                },
                sortable: true,
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                header: 'Linea de tarjeta',
                dataIndex: 'rxl_clinecard',
                sortable: true,
                flex: 1
            }
        ]
    },
    initComponent: function () {
        this.callParent();
        this.POSTERIORES = 'POSTERIORES';
        console.log('EventoPendientesPosterioresGridView: ', this);
        var VISUALIZAPARTICIONMWR = getParametro('VISUALIZAPARTICIONMWR');
        if (VISUALIZAPARTICIONMWR == 1) {
            this.nombreMadre = true;
        } else {
            this.nombreMadre = false;
        }
        //stores        
        this.EventoOrigenStore = Ext.data.StoreManager.lookup('EventoOrigenStore');
        this.EventoEstadoStore = Ext.data.StoreManager.lookup('EventoEstadoStore')

    }
});
