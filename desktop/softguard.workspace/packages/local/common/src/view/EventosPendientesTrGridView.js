//MIGRADO2024
Ext.define('Common.view.EventosPendientesTrGridView', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.eventospendientestrgridview'],
    itemId: 'eventospendientes',
    filterTotal: 0,
    //DS-641|adrianlara|20230426 => Se agrega nueva propiedad para que forzar la actualizacion del store
    refreshOnHidden: false,
    viewConfig: {
        loadMask: false,
        preserveScrollOnRefresh: true,
        getRowClass: function (record) {
            if (this.up('eventospendientestrgridview').noResaltarEventosMismaCuenta == true) {
                return '';
            } else {
                return record.get('operadorAtendiendoCuenta') > 0 ? 'cuenta-atendida' : '';
            }
        }
    },
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: '{name} ({children.length})',
            id: 'grouping',
            enableGroupingMenu: false
        }
    ],
    columns: {
        defaults: {
            //  menuDisabled: false
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
                        //iconos += "<img src=\"/resources/global/images/icons/photo.png\" data-qtip=\""+getLocale('Posee imágenes')+"\"/>";
                        msg.push(getLocale('Posee imágenes'))
                    }
                    if (value.match(/MPEG|MPG|MP4|AVI|VIDEO|Video|WEBM/g)) {
                        //iconos += "<img src=\"/resources/softguard/images/icons/cctv_camera.png\" data-qtip=\""+getLocale('Posee video')+"\"/>";
                        msg.push(getLocale('Posee video'))
                    }
                    if (value.match(/MP3/g) || value.match(/\[VigiControl\]\[MP4\]/g)) {
                        //iconos += "<img src=\"/resources/global/images/icons/sound.png\" data-qtip=\""+getLocale('Posee sonido')+"\"/>";
                        msg.push(getLocale('Posee sonido'))
                    }
                    if (msg.length > 0) {
                        iconos += "<img src=\"/resources/global/images/icons/film.png\" data-qtip=\"" + msg.join(', ') + "\" />";
                    }
                    return iconos;
                }
            }, {
                header: "&nbsp;",
                dataIndex: "amv_idkey",
                sortable: false,
                width: 26,
                renderer: function (value, metaData) {
                    metaData.style += "padding:0px;";
                    if (metaData.record.get('amv_idkey') > 0) {
                        if (metaData.record.get('amv_objecttypeid') != 3113) {
                            return "<img src=\"/resources/global/images/icons/car.png\" data-qtip=\"" + getLocale('Movil asignado') + "\" />";
                        } else {
                            return "<img src=\"/resources/global/images/icons/shield.png\" data-qtip=\"" + getLocale('Vigicontrol asignado') + "\" />";
                        }
                    }
                    return '';
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
                //xtype : 'datecolumn',
                //format : 'd-m-Y G:i:s',
                renderer: function (value, metadata, record) {
                    return Ext.Date.format(record.get('rec_isofechahora'), 'D d-m-Y G:i:s');
                },
                width: 170
            },
            {
                text: 'Hora del evento (zona cuenta)',
                dataIndex: '_tfechahoraOffset',
                xtype: 'datecolumn',
                format: 'D d-m-Y G:i:s',
                hidden: true,
                /*
                renderer: function(value,metadata,record){
                    return Ext.Date.format(record.get('rec_isofechahora'), 'D d-m-Y G:i:s');
                },
                */
                width: 170
            },
            {
                xtype: 'gridcolumn',
                header: 'Cuenta',
                dataIndex: 'rec_iidcuenta',
                sortable: true,
                flex: 2,
                renderer: function (value, metadata, record, colIndex, store, view) {
                    if (!this.nombreMadre) {
                        /* if(record.get("cue_nparticion") == 0) {
                            return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
                        } else {
                            return record.get('madre_clinea')+'-'+record.get('madre_ncuenta')+' '+record.get('madre_cnombre') + '/'+record.get('cue_cnombre');
                        }*/
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
                hidden: false,
                header: 'Estado',
                dataIndex: 'sta_nestado',
                renderer: function (value, metadata, record, colIndex, store, view) {
                    if (record.get("sta_nestado") == 1) {
                        texto = "Desactivado / Abierto";
                    }
                    else if (record.get("sta_nestado") == 0) {
                        texto = "Activado / Cerrado";
                    }
                    return getLocale(texto);
                },
                sortable: true,
                width: 140,
                // hideable:false
            }, {
                xtype: 'gridcolumn',
                header: 'Icono',
                width: 50,
                sortable: false,
                renderer: function (value, metadata, record) {
                    var proceso = record.get('pro_nProceso');

                    if (proceso == 63) {
                        return '<img data-qtip="' + getLocale('Operador Virtual') + '" ' +
                            'src="/resources/global/images/icons/op-virtual-icon.png" ' +
                            'width="16" height="16" ' +
                            'onerror=\'this.style.display = "none"\'>';
                    }

                    var path = '/handler/getImage?u=/images/codala/' + record.get('rec_calarma') + '.png';

                    value = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');

                    var key = 'icono_' + record.get('rec_calarma');
                    var url = localStorage.getItem(key);

                    if (!url) {
                        const imageUrl = path;
                        const img = new Image();

                        img.src = imageUrl;

                        img.onload = () => {
                            const canvas = document.createElement('canvas');

                            canvas.width = img.width;
                            canvas.height = img.height;

                            const context = canvas.getContext('2d');

                            context.drawImage(img, 0, 0);

                            const base64Image = canvas.toDataURL('image/png');

                            localStorage.setItem(key, base64Image);
                        };
                    } else {
                        path = url;
                    }

                    return '<img data-qtip="' + value + '" src="' + path + '" ' +
                        'width="16" height="16" ' +
                        'onerror=\'this.style.display = "none"\'>';
                }
            }, {
                xtype: 'gridcolumn',
                header: 'Evento',
                columnId: 'Evento',
                dataIndex: 'cod_cdescripcion',
                sortable: true,
                renderer: function (value, metadata, record, colIndex, store, view) {
                    var texto = '';
                    metadata.tdCls += ' ultimo-evento';
                    var panel = this;
                    if (Ext.util.Format.trim(record.get('rec_calarma')) != '') {
                        texto = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
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
                text: 'Prioridad',
                columnId: 'Prioridad',
                dataIndex: 'rec_iprioridad',
                /*renderer: function(value, metadata, record){
                    return value==0?record.get('cod_nprioridad'):value;
                },*/
                xtype: 'gridcolumn',
                format: '0',
                width: 50
            }, {
                /*    header: 'Template',
                    xtype: 'gridcolumn',
                    dataIndex: 'cod_iTemplate',
                }, {*/
                xtype: 'gridcolumn',
                header: 'Estado',
                dataIndex: 'rec_nestado',
                sortable: true,
                groupable: true,
                width: 60,
                renderer: function (value, metadata, record) {
                    var store = this.EventoEstadoStore; //Ext.data.StoreManager.lookup('EventoEstadoStore');
                    var text = '';
                    var estado = store.findRecord('Value', value);
                    if (estado) {
                        text = estado.get('Name');
                    }
                    var iconos = '<div class="circulo estado' + value + '" title="' + text + '" style="display:inline-block"></div>'
                    var pro_nProceso = record.get('pro_nProceso');
                    if (pro_nProceso == 32 || pro_nProceso == 30 || pro_nProceso == 31 || pro_nProceso == 34) {
                        iconos += '<div class="icon-hourglass" title="' + getLocale('Evento pendiente desde espera') + '" style="width: 16px;height: 16px;display:inline-block"></div>'
                    }
                    return iconos;
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
                            var store = this.EventoOrigenStore; //Ext.data.StoreManager.lookup('EventoOrigenStore');
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
                        // localizo los mensajes
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
                header: 'Usuario',
                dataIndex: '_usu_cnombre',
                renderer: function (value, metadata, record, colIndex, store, view) {
                    value = value.replace('()', '');
                    value = value.replace('(0)', '');
                    return value;
                },
                sortable: true,
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                header: 'Localidad',
                dataIndex: 'cue_clocalidad',
                hidden: true,
                sortable: true,
                flex: 2
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
                header: 'Zona',
                dataIndex: 'rec_czona',
                renderer: function (value, metadata, record, colIndex, store, view) {
                    var zona = record.get('_zon_cdescripcion');
                    zona = zona.replace('(   )', '');
                    zona = zona.replace('()', '');
                    zona = zona.replace('(0)', '');
                    return zona;
                },
                sortable: true,
                flex: 1
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
            }, {
                xtype: 'gridcolumn',
                header: 'Utimo Evento',
                dataIndex: 'sta_cod_ccodigo',
                sortable: false,
                hidden: true,
                renderer: function (value, metadata, record, colIndex, store, view) {
                    var texto = '';
                    metadata.tdCls += ' ultimo-evento';
                    var panel = this;
                    if (Ext.util.Format.trim(record.get('sta_cod_ccodigo')) != '') {
                        texto = record.get('sta_cod_ccodigo') + ' - ' + record.get('sta_cod_cdescripcion');
                        record.txtColor = decimalColorToHTMLcolor(record.get('sta_cod_ncolorletra'));
                        record.backColor = decimalColorToHTMLcolor(record.get('sta_cod_ncolor'));
                        metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                    }
                    return texto;
                },
                width: 210
            }, {
                text: 'Fecha y Hora ultimo Evento',
                dataIndex: 'sta_dfechautimaalarma',
                hidden: true,
                renderer: function (value, metadata, record) {
                    return Ext.Date.format(record.get('sta_dfechautimaalarma'), 'D d-m-Y G:i:s');
                },
                width: 170
            }, {
                text: 'Organizacion',
                dataIndex: 'organizacionName',
                hidden: true,
                flex: 1
            }
        ]
    },
    initComponent: function () {
        var view = this;
        this.initialConfig.columns = this.columns;
        this.callParent();
        console.log('EventosPendientesTrGridView: ', this);
        var VISUALIZAPARTICIONMWR = getParametro('VISUALIZAPARTICIONMWR');
        if (VISUALIZAPARTICIONMWR == 1) {
            this.nombreMadre = true;
        } else {
            this.nombreMadre = false;
        }
        //stores        
        this.EventoOrigenStore = Ext.data.StoreManager.lookup('EventoOrigenStore');
        this.EventoEstadoStore = Ext.data.StoreManager.lookup('EventoEstadoStore')
        /* function calculateColor (number) {
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
         this.arrayColors = []
         this.decimalColorToHTMLcolor = function(number) {
             
                         
             
             
             if(this.arrayColors[number]) {
                 return this.arrayColors[number]
             } else {
                 this.arrayColors[number] = calculateColor(number)
                 return this.arrayColors[number]
             }
             
         };*/
        /*    
            var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
                dock: 'bottom',
                itemId: 'paging',
                displayInfo: true
            });
          */
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'icon-control-play',
                    action: 'play',
                    itemId: 'play',
                    pressed: true,
                    toggleGroup: 'control'
                },
                {
                    iconCls: 'icon-control-stop',
                    pressed: false,
                    toggleGroup: 'control',
                    action: 'stop',
                    itemId: 'stop'
                },
                '-',
                {
                    text: 'Filtros',
                    itemId: 'filtrostr',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                itemId: 'panelfiltro',
                                items: [
                                    /*{
                                        xtype: 'combo',
                                        store: 'EventoEstadoStore',
                                        queryMode: 'local',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        itemId: 'comboEstados',
                                        emptyText: getLocale('Estados'),
                                        multiSelect: true
                                    },*/
                                    {
                                        xtype: 'combo',
                                        store: 'EventoOrigenStore',
                                        queryMode: 'local',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        itemId: 'comboOrigenes',
                                        //fieldLabel: 'Origen',
                                        emptyText: 'Origen',
                                        multiSelect: true
                                    }, {
                                        xtype: 'combo',
                                        store: 'EventoTipoStore',
                                        queryMode: 'local',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        itemId: 'comboTipos',
                                        //fieldLabel: 'Tipo',
                                        emptyText: 'Tipo',
                                        multiSelect: true
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'grupos',
                                        emptyText: 'Grupo',
                                        value: '',
                                        queryMode: 'local',
                                        displayField: 'gru_cdescripcion',
                                        valueField: 'gru_ccodigo',
                                        labelWidth: 50
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'prioridad',
                                        emptyText: 'Prioridad',
                                        queryMode: 'local',
                                        store: 'EventoPrioridadesStore',
                                        multiSelect: true,
                                        displayField: 'Name',
                                        valueField: 'Value',
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'feventos',
                                        name: 'rec_calarma',
                                        value: '',
                                        queryMode: 'local',
                                        labelWidth: 50,
                                        valueField: 'field1',
                                        displayField: 'field2',
                                        emptyText: 'Eventos',
                                    },/*{
                                            xtype:'container',
                                            layout:'hbox',
                                            width:270,
                                            margin:'0 0 5 0',
                                            items:[*/
                                    {
                                        xtype: 'textfield',
                                        itemId: 'dealer',
                                        emptyText: getLocale('Dealer'),
                                        itemId: 'dealer',
                                        qtip: getLocale('Es posible separar por coma varios dealers'),
                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'nombre',
                                        emptyText: getLocale('Nombre cuenta'),


                                    }, {
                                        xtype: 'textfield',
                                        itemId: 'cuenta',
                                        emptyText: getLocale('Cuenta'),
                                        //  width:147,
                                        margin: '0 0 5 0',
                                        enforceMaxLength: true,
                                        maxLength: 4
                                    }
                                          /*  ]
                                        }*/, {
                                        xtype: 'combo',
                                        itemId: 'comboalarmas',
                                        emptyText: 'Codigo alarma',
                                        store: 'EventoPrioridadesStore',
                                        multiSelect: true,
                                        displayField: 'Descripcion',
                                        valueField: 'Codigo',
                                        queryMode: 'local'/*,
                                            typeAhead: true,*/
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'datefield',
                                                itemId: 'fechadesde',
                                                emptyText: 'Fecha Desde',
                                                width: 129
                                            }, {
                                                xtype: 'datefield',
                                                itemId: 'fechahasta',
                                                emptyText: 'Fecha Hasta',
                                                width: 128,
                                                margin: '0 0 0 5'
                                            }
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        //store: 'EventoEstadoStore',
                                        queryMode: 'local',
                                        displayField: 'Name',
                                        fieldLabel: '',
                                        valueField: 'Value',
                                        itemId: 'comboEstados',
                                        emptyText: 'Estados',
                                        labelWidth: 43,
                                        width: 250,
                                        multiSelect: true
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: 'Buscar',
                                                action: 'search',
                                                itemId: 'search',
                                                iconCls: 'icon-find'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    text: 'Excluir',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'combo',
                                        itemId: 'grupos-excluir',
                                        emptyText: 'Grupo',
                                        value: '',
                                        queryMode: 'local',
                                        displayField: 'gru_cdescripcion',
                                        valueField: 'gru_ccodigo',
                                        labelWidth: 50,
                                        // plugins: ['clearbutton']
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: 'Buscar',
                                                action: 'search',
                                                itemId: 'search',
                                                iconCls: 'icon-find'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Ver todos',
                    action: 'clearfilters',
                    itemId: 'clearfilters',
                    iconCls: 'icon-find'
                }
                /*,{
                    xtype: 'button',
                    //style: {padding: "0 0 0 0"},
                    action: 'soloAlarmas',
                    text: 'Solo Alertas',
                    pressed: false,
                    enableToggle: true,
                    margin: '0 0 0 5'
                }*/
                , '-',
                //se comento por que extjs 4.2 tiene problemas con los grupos
                getLocale('Grupos:'),
                {
                    iconCls: 'icon-application-view-list',
                    text: 'Evento',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupAlarmas'
                },
                {
                    iconCls: 'icon-application-view-list',
                    text: 'Prioridad',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupPrioridad'
                },
                {
                    iconCls: 'icon-application-view-list',
                    text: 'Cuenta',
                    enableToggle: true,
                    toggleGroup: 'group',
                    action: 'groupCuenta'
                },
                "-",
                /*{
                    iconCls: 'icon-accept',
                    text: 'Procesar Todos',
                    action: 'procesartodosfull',
                    itemId: 'procesartodosfull',
                    hidden: true
                }*/{
                    iconCls: 'icon-accept',
                    text: 'Proceso multiple',
                    action: 'procesarmultiple',
                    itemId: 'procesarmultiple',
                    hidden: true
                }, {
                    iconCls: 'icon-bell',
                    text: 'Mostrar utimas alarmas',
                    action: 'ultimasalarmas',
                    itemId: 'ultimasalarmas',
                    enableToggle: true,
                    hidden: true
                }, '->',
                {
                    iconCls: 'icon-cog',
                    text: 'Columnas',
                    tooltip: 'Mostrar columnas originales',
                    handler: function () {
                        var grid = this.up('grid');
                        Ext.state.Manager.clear(grid.stateId);
                        grid.reconfigure(null, grid.initialConfig.columns.items); //agrego la propiedad .items a columns porque el objeto initialconfig cambio en 4.2.3
                    }
                }
            ]// cierro items
        });
        // this.addDocked(pagingtoolbar);
        this.addDocked(toolbar);
        if (view.hideColumns) {
            Ext.Array.each(view.hideColumns, function (index) {
                var column = view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.hide();
            });
        }
        if (view.showColumns) {
            Ext.Array.each(view.showColumns, function (index) {
                var column = view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.show();
            });
        }
    }
});