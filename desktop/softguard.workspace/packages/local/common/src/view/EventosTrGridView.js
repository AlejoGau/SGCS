//MIGRADO2024
Ext.define( 'Common.view.EventosTrGridView', {
    extend: 'Ext.grid.Panel',
    alias: [ 'widget.eventostrgridview', 'gridrecepcion' ],
    //itemId : 'gridrecepcion',
    autoScroll: true,
    scroll: true,
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: '<input class="grpCheckbox" type="checkbox"> ' + getLocale( 'Prioridad' ) + ': {name} ({rows.length})</input>',
            groupByText: getLocale( 'Agrupar' ),
            id: 'grouping',
            showGroupsText: getLocale( 'Mostrar en grupos' )
        }
    ],
    columns: [
        {
            xtype: 'actioncolumn',
            header: 'Acciones',
            width: 70,
            items: [
                {
                    iconCls: 'icon-cuentaEdit',
                    tooltip: getLocale( 'Abrir evento' ),
                    handler: function( grid, rowIndex, colIndex, item, event ) {
                        var view = grid.up( 'eventostrgridview' );
                        var rec = grid.getStore().getAt( rowIndex );
                        view.fireEvent( 'openEvent', view, rec );
                    }
                }
            ]
        }, {
            header: "&nbsp;",
            dataIndex: "rec_cContenido",
            width: 26,
            renderer: function( value, metaData ) {
                metaData.style += "padding:0px;";
                if( value.match( /IMG|JPG/g ) ) {
                    return "&nbsp;<img src=\"/resources/global/images/icons/photo.png\" data-qtip=\"" + getLocale( 'Posee imágenes' ) + "\"/>";
                } else if( value.match( /AVI|VIDEO|Video|WEBM|MP4/g ) ) {
                    return "&nbsp;<img src=\"/resources/softguard/images/icons/cctv_camera.png\" data-qtip=\"" + getLocale( 'Posee video' ) + "\"/>";
                }
                return '';
            }
        }, {
            header: "&nbsp;",
            dataIndex: "_rec_cContenido",
            width: 26,
            renderer: function( value, metaData ) {
                metaData.style += "padding:0px;";
                if( value.match( /MP3/g ) )
                    return "&nbsp;<img src=\"/resources/global/images/icons/sound.png\" data-qtip=\"" + getLocale( 'Posee sonido' ) + "\"/>";
                return '';
            }
        }, {
            header: "&nbsp;",
            dataIndex: "rec_cObservaciones",
            width: 26,
            sortable: false,
            renderer: function( value, metaData ) {
                metaData.style += "padding:0px;";
                if( value && ( value.match( /\[SmartPanics\]/g ) || value.match( /\[SmartPanics\]/g ) ) )
                    return "&nbsp;<img src=\"/resources/global/images/icons/comment.png\" data-qtip=\"" + getLocale( 'Posee notas' ) + "\"/>";
                return '';
            }
        },
        {
            text: 'Fecha y Hora del Evento',
            dataIndex: 'rec_tFechaHora',
            //xtype : 'datecolumn',
            //format : 'd-m-Y G:i:s',
            renderer: function( value, metadata, record ) {
                return Ext.Date.format( record.get( 'rec_isoFechaHora' ), 'D d-m-Y G:i:s' );
            },
            width: 170
        },
        {
            xtype: 'gridcolumn',
            header: 'Cuenta',
            dataIndex: 'rec_iidcuenta',
            sortable: true,
            flex: 2,
            renderer: function( value, metadata, record, colIndex, store, view ) {
                if( !this.nombreMadre ) {
                    var nombre = '';
                    if( record.get( 'cue_nparticion' ) != 0 ) {
                        nombre = record.get( 'madre_clinea' ) + '-' + record.get( 'madre_ncuenta' ) + ' ' + record.get( 'madre_cnombre' ) + ' / ' + getLocale( 'En partición:' ) + ' ';
                    }
                    return nombre + record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
                } else {
                    return record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
                }
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Icono',
            width: 50,
            sortable: false,
            renderer: function( value, metadata, record ) {
                var t = this;
                var path = '/handler/getImage?u=/images/codala/' + record.get( 'rec_calarma' ) + '.png';
                value = record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' );
                //DS-591|adrianlara|20230406 => El código carga una imagen de una ruta o desde el almacenamiento local, la convierte en Base64 y la guarda en la memoria caché.
                var key = 'icono_' + record.get( 'rec_calarma' );
                var url = localStorage.getItem( key );
                if( !url ) {
                    const imageUrl = path;
                    const img = new Image();
                    img.src = imageUrl;
                    img.onload = () => {
                        const canvas = document.createElement( 'canvas' );
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const context = canvas.getContext( '2d' );
                        context.drawImage( img, 0, 0 );
                        const base64Image = canvas.toDataURL( 'image/png' );
                        localStorage.setItem( key, base64Image );
                    };
                } else {
                    path = url;
                }
                return '<img data-qtip="' + value + '" src="' + path + '"   width=16 height=16 onerror=\'this.style.display = "none"\'>';
            }
        }, {
            xtype: 'gridcolumn',
            header: 'Evento',
            columnId: 'Evento',
            dataIndex: 'rec_calarma',
            sortable: false,
            /*renderer: function( value, metadata, record, colIndex, store, view ) {
                var texto = '';
                var panel = this;
                if( Ext.util.Format.trim( record.get( 'rec_calarma' ) ) != '' ) {
                    texto = record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' );
                    record.txtColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolorletra' ) );
                    record.backColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolor' ) );
                    metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                } else {
                    texto = record.get( 'rec_cContenido' );
                    metadata.style = 'color:#333; background-color:transparent;';
                }
                return texto;
            },*/
            width: 210
        }, {
            xtype: 'gridcolumn',
            header: 'Evento',
            columnId: 'Evento',
            dataIndex: 'rec_calarma',
            sortable: false,
            renderer: function( value, metadata, record, colIndex, store, view ) {
                var texto = '';
                var panel = this;
                if( Ext.util.Format.trim( record.get( 'rec_calarma' ) ) != '' ) {
                    texto = record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' );
                    record.txtColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolorletra' ) );
                    record.backColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolor' ) );
                    metadata.style = 'color:' + record.txtColor + '; background-color:' + record.backColor;
                } else {
                    texto = record.get( 'rec_cContenido' );
                    metadata.style = 'color:#333; background-color:transparent;';
                }
                return texto;
            },
            width: 210            
        }, {
            text: 'Prioridad',
            columnId: 'Prioridad',
            dataIndex: 'rec_iPrioridad',
            renderer: function( value, metadata, record ) {
                return value == 0 ? record.get( 'cod_nprioridad' ) : value;
            },
            xtype: 'numbercolumn',
            format: '0',
            width: 50
        }, {
            xtype: 'gridcolumn',
            header: 'Estado',
            dataIndex: 'rec_nestado',
            sortable: true,
            groupable: true,
            width: 60,
            renderer: function( value, metadata, record ) {
                var store = Ext.data.StoreManager.lookup( 'EventoEstadoStore' );
                var text = '';
                var estado = store.findRecord( 'Value', value );
                if( estado ) {
                    text = estado.get( 'Name' );
                }
                return '<div class="circulo estado' + value + '" title="' + text + '"></div>'
            }
        },
        {
            xtype: 'gridcolumn',
            header: 'Origen',
            dataIndex: '_origen',
            sortable: true,
            flex: 1,
            renderer: function( value, metadata, record, colIndex, store, view ) {
                var ret;
                if( value == '' ) {
                    if( record.get( 'rec_nOrigen' ) != 0 ) {
                        var store = Ext.data.StoreManager.lookup( 'EventoOrigenStore' );
                        var origen = store.findRecord( 'Value', record.get( 'rec_nOrigen' ) );
                        if( origen ) {
                            ret = origen.get( 'Name' );
                        } else {
                            ret = '';
                        }
                    } else {
                        ret = '';
                    }
                    ret += record.get( '_puerto' );
                } else {
                    ret = value + record.get( '_puerto' );
                    // localizo los mensajes
                    var re = /%(.*?)%/g;
                    function replacer( str, p1, offset, s ) {
                        return getLocale( p1 );
                    }
                    ret = ret.replace( re, replacer );
                    ret = ret.replace( /%/, '' );
                }
                return ret;
            }
        },
        {
            xtype: 'gridcolumn',
            header: 'Usuario',
            dataIndex: 'u.Usuario_cnombre',
            /**
            Esto se saco el dia 08/09/2016
            renderer : function(value, metadata, record, colIndex,store, view) {
             
                if(record.get('_zon_cdescripcion') == '' || record.get('usu_icodigo') == 706 ) {
                    return record.get('_usu_cnombre');
                }
            },*/
            /** copie el mismo renderer que eventiopendientes */
            renderer: function( value, metadata, record, colIndex, store, view ) {
                var value = record.get( 'Usuario_cnombre' )
                value = value.replace( '()', '' );
                value = value.replace( '(0)', '' );
                console.log( value )
                return value;
            },
            sortable: true,
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            header: 'Dirección',
            // dataIndex : 'cue_ccalle',
            dataIndex: 'gps_cDireccion',
            sortable: true,
            flex: 2
        },
        {
            xtype: 'gridcolumn',
            header: 'Zona',
            dataIndex: 'rec_czona',
            renderer: function( value, metadata, record, colIndex, store, view ) {
                var zona = record.get( '_zon_cdescripcion' );
                zona = zona.replace( '(   )', '' );
                zona = zona.replace( '()', '' );
                zona = zona.replace( '(0)', '' );
                return zona;
            },
            sortable: true,
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            header: 'Operador',
            dataIndex: 'ope_cnombre',
            hidden: true,
            sortable: true,
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            header: 'Linea de tarjeta',
            dataIndex: 'rxl_clinecard',
            hidden: true,
            sortable: true,
            flex: 1
        }
    ],
    initComponent: function() {
        var view = this;
        this.initialConfig.columns = this.columns;
        this.callParent();
        var VISUALIZAPARTICIONMWR = getParametro( 'VISUALIZAPARTICIONMWR' );
        if( VISUALIZAPARTICIONMWR == 1 ) {
            this.nombreMadre = true;
        } else {
            this.nombreMadre = false;
        }
        this.decimalColorToHTMLcolor = function( number ) {
            var intnumber = number - 0;
            var red, green, blue;
            var template = "#000000";
            red = ( intnumber & 0x0000ff ) << 16;
            green = intnumber & 0x00ff00;
            blue = ( intnumber & 0xff0000 ) >>> 16;
            intnumber = red | green | blue;
            var HTMLcolor = intnumber.toString( 16 );
            HTMLcolor = template.substring( 0, 7 - HTMLcolor.length ) + HTMLcolor;
            return HTMLcolor;
        };
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                // DEDALO 05/03/2020 tiene refresh abajo, saco por repetido
                /*
                {
                    iconCls: 'x-tbar-loading',
                    action: 'refresh',
                    itemId:'refresh'
                },
                */
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
                        width: 580,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
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
                                        editable: false,
                                        emptyText: 'Tabla Histórico',
                                        displayField: '_periodo',
                                        queryMode: 'local',
                                        valueField: 'c_periodo',
                                        anchor: '100%',
                                        itemId: 'combohistorico',
                                        //plugins: ['clearbutton']
                                    },
                                    {
                                        xtype: 'combo',
                                        editable: false,
                                        store: 'EventoOrigenStore',
                                        queryMode: 'local',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        itemId: 'comboOrigenes',
                                        //fieldLabel: 'Origen',
                                        emptyText: 'Origen',
                                        //multiSelect: true
                                    }, {
                                        xtype: 'combo',
                                        editable: false,
                                        store: 'EventoTipoStore',
                                        queryMode: 'local',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        itemId: 'comboTipos',
                                        //fieldLabel: 'Tipo',
                                        emptyText: 'Tipo',
                                        //multiSelect: true
                                    }, {
                                        xtype: 'combo',
                                        editable: false,
                                        itemId: 'grupos',
                                        emptyText: 'Grupo',
                                        value: '',
                                        queryMode: 'local',
                                        displayField: 'gru_cdescripcion',
                                        valueField: 'gru_ccodigo',
                                        labelWidth: 50
                                    }, {
                                        xtype: 'combo',
                                        editable: false,
                                        itemId: 'prioridad',
                                        emptyText: 'Prioridad',
                                        queryMode: 'local',
                                        store: 'EventoPrioridadesStore',
                                        //multiSelect: true,
                                        displayField: 'Name',
                                        valueField: 'Value',
                                    }, {
                                        xtype: 'combo',
                                        editable: false,
                                        itemId: 'feventos',
                                        name: 'rec_calarma',
                                        value: '',
                                        queryMode: 'local',
                                        labelWidth: 50,
                                        valueField: 'field1',
                                        displayField: 'field2',
                                        emptyText: 'Eventos',
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: 270,
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                itemId: 'dealer',
                                                emptyText: getLocale( 'Dealer' ),
                                                itemId: 'dealer',
                                                width: 110,
                                                enforceMaxLength: true,
                                                maxLength: 3
                                            }, {
                                                xtype: 'textfield',
                                                itemId: 'cuenta',
                                                emptyText: getLocale( 'Cuenta' ),
                                                width: 147,
                                                margin: '0 0 0 5',
                                                enforceMaxLength: true,
                                                maxLength: 4
                                            }
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        //editable: false,
                                        itemId: 'comboalarmas',
                                        emptyText: 'Codigo alarma',
                                        // store: 'EventoPrioridadesStore',
                                        //multiSelect: true,
                                        displayField: 'Descripcion',
                                        valueField: 'Codigo',
                                        queryMode: 'local',
                                        typeAhead: true,
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
                                        editable: false,
                                        //store: 'EventoEstadoStore',
                                        queryMode: 'local',
                                        displayField: 'Name',
                                        fieldLabel: '',
                                        valueField: 'Value',
                                        itemId: 'comboEstados',
                                        emptyText: getLocale( 'Estados' ),
                                        labelWidth: 43,
                                        width: 250,
                                        //multiSelect: true
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
                    itemId: 'excluir',
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
                                        editable: false,
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
                , '-', getLocale( 'Grupos:' ),
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
                    action: 'groupCuenta',
                    itemId: 'groupCuenta'
                }, "-",
                {
                    iconCls: 'icon-accept',
                    text: 'Procesar Todos',
                    action: 'procesartodosfull',
                    itemId: 'procesartodosfull',
                    hidden: true
                }, '->',
                {
                    iconCls: 'icon-cog',
                    text: 'Columnas',
                    tooltip: 'Mostrar columnas originales',
                    handler: function() {
                        var grid = this.up( 'grid' );
                        Ext.state.Manager.clear( grid.stateId );
                        grid.reconfigure( grid.getStore(), grid.initialConfig.columns );
                    }
                }, {
                    xtype: 'button',
                    text: 'Mapa',
                    itemId: 'btnMapa',
                    //action: 'eventMap',
                    handler: function( btn ) {
                        var view = btn.up( 'eventostrgridview' );
                        //var grid = view.down('#gridrecepcion');
                        var map = Ext.widget( 'eventosmapview', {
                            closeAction: 'destroy',
                            markerList: view.getStore().getRange()
                        });
                        var win = Ext.widget( 'window', {
                            title: getLocale( 'Mapa de eventos' ),
                            width: 600,
                            height: 400,
                            layout: 'fit',
                            closeAction: 'destroy',
                            items: map
                        }).show();
                    },
                    hidden: true,
                    iconCls: 'icon-map'
                }, {
                    xtype: 'button',
                    text: 'Imágenes',
                    itemId: 'btnImage',
                    handler: function( btn ) {
                        var view = btn.up( 'eventostrgridview' );
                        //var grid = view.down('#gridrecepcion');
                        var image = Ext.widget( 'eventosimagesview', {
                            recordList: view.getStore().getRange()
                        });
                        var win = Ext.widget( 'window', {
                            title: 'Imágenes de eventos',
                            width: 600,
                            height: 400,
                            layout: 'fit',
                            autoShow: true,
                            closeAction: 'destroy',
                            items: image
                        });
                    },
                    hidden: true,
                    iconCls: 'icon-photo'
                }
            ]// cierro items
        });
        this.addDocked( pagingtoolbar );
        this.addDocked( toolbar );
        if( view.hideColumns ) {
            Ext.Array.each( view.hideColumns, function( index ) {
                var column = view.down( "gridcolumn[dataIndex=" + index + "]" );
                if( column ) column.hide();
            });
        }
        if( view.showColumns ) {
            Ext.Array.each( view.showColumns, function( index ) {
                var column = view.down( "gridcolumn[dataIndex=" + index + "]" );
                if( column ) column.show();
            });
        }
    }
});
/*
   _____                      _ _______             _    
  / ____|                    | |__   __|           | |   
 | (___  _ __ ___   __ _ _ __| |_ | |_ __ __ _  ___| | __
  \___ \| '_ ` _ \ / _` | '__| __|| | '__/ _` |/ __| |/ /
  ____) | | | | | | (_| | |  | |_ | | | | (_| | (__|   < 
 |_____/|_| |_| |_|\__,_|_|   \__||_|_|  \__,_|\___|_|\_\
                                                         
                                                         
                                                         
*/
Ext.define( 'Common.view.EventosTrSpGridView', {
    extend: 'Common.view.EventosTrGridView',
    alias: 'widget.eventosspgridview',
    hideComboEventos: true,
    title: 'Histórico de eventos',
    Origenes: 'SMARTPANICS',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'gridpanel',
            itemId: 'gridrecepcion',
            flex: 1,
            autoScroll: true,
            scroll: true,
            layout: 'fit',
            viewConfig: {
                loadMask: false
            },
            features: [
                {
                    ftype: 'grouping',
                    groupHeaderTpl: [
                        '<input class="grpCheckbox" type="checkbox">',
                        '{[this.getTitle(values)]}',
                        '({rows.length})</input>',
                        {
                            getTitle: function( values ) {
                                //console.log(values);
                                if( values.groupField == "rec_iidcuenta" ) {
                                    var record = values.rows[ 0 ];
                                    var title = ' ' + record.data.cue_clinea + "-" + record.data.cue_ncuenta;
                                    //console.log(values);
                                    return title;
                                } else {
                                    return values.name + " "
                                }
                            }
                        }
                    ],
                    groupByText: getLocale( 'Agrupar' ),
                    startCollapsed: true,
                    enableGroupingMenu: false,
                    showGroupsText: getLocale( 'Mostrar en grupos' )
                }
            ],
            columns: [ {
                xtype: 'actioncolumn',
                width: 20,
                items: [ {
                    iconCls: 'icon-map',
                    tooltip: getLocale( 'Mapa' ),
                    itemId: 'icospmonitoreo',
                    getClass: function( value, metadata, record ) {
                        if( record.get( 'gps_cIMEI' ) != '' ) {
                            return 'icon-map'
                        }
                    },
                    handler: function( grid, rowIndex, colIndex, item, event ) {
                        var rec = grid.getStore().getAt( rowIndex );
                        var view = grid.up( 'eventosspgridview' );
                        if( rec.get( 'gps_cIMEI' ) != '' )
                            view.fireEvent( 'mostrarMonitoreo', rec, view );
                    }
                }
                ]
            }, {
                    header: "&nbsp;",
                    dataIndex: "rec_iid",
                    width: 26,
                    renderer: function( value, metadata ) {
                        metadata.style += "padding:0px;";
                        metadata.tdCls = 'recepcionview';
                        return "&nbsp;<img src=\"/resources/softguard/images/icons/database_table.png\" data-qtip=\"" + getLocale( 'Ver Reporte Histórico' ) + "\"/>";
                    }
                }, {
                    header: "&nbsp;",
                    dataIndex: "rec_cContenido",
                    width: 26,
                    renderer: function( value, metaData ) {
                        metaData.style += "padding:0px;";
                        if( value.match( /IMG|JPG/g ) ) {
                            return "&nbsp;<img src=\"/resources/global/images/icons/photo.png\" data-qtip=\"" + getLocale( 'Posee imágenes' ) + "\"/>";
                        } else if( value.match( /AVI|VIDEO|Video/g ) ) {
                            return "&nbsp;<img src=\"/resources/softguard/images/icons/cctv_camera.png\" data-qtip=\"" + getLocale( 'Posee video' ) + "\"/>";
                        }
                        return '';
                    }
                }, {
                    header: "&nbsp;",
                    dataIndex: "_rec_cContenido",
                    width: 26,
                    renderer: function( value, metaData ) {
                        metaData.style += "padding:0px;";
                        if( value.match( /\[Audio\]/g ) )
                            return "&nbsp;<img src=\"/resources/global/images/icons/sound.png\" data-qtip=\"" + getLocale( 'Posee sonido' ) + "\"/>";
                        else if( value.match( /\[VigiControl\]\[MP4\]/g ) )
                            return "&nbsp;<img src=\"/resources/global/images/icons/sound.png\" data-qtip=\"" + getLocale( 'Posee sonido' ) + "\"/>";
                        return '';
                    }
                }, {
                    header: "&nbsp;",
                    dataIndex: "rec_cObservaciones",
                    width: 26,
                    renderer: function( value, metaData ) {
                        metaData.style += "padding:0px;";
                        if( value.match( /\[SmartPanics\]/g ) )
                            return "&nbsp;<img src=\"/resources/global/images/icons/comment.png\" data-qtip=\"" + getLocale( 'Posee notas' ) + "\"/>";
                        return '';
                    }
                },
                {
                    text: 'Fecha y Hora del Evento',
                    dataIndex: 'rec_iid',
                    xtype: 'datecolumn',
                    //format : 'D d-m-Y G:i:s',
                    renderer: function( value, object, record ) {
                        return Ext.Date.format( record.get( 'rec_isoFechaHora' ), 'D d-m-Y G:i:s' );
                    },
                    width: 170
                }, {
                    text: 'Cuenta',
                    dataIndex: 'cue_cnombre',
                    xtype: 'gridcolumn',
                    minWidth: 300,
                    flex: 1,
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var text = '';
                        if( !this.up( 'multicuentagridview' ).nombreMadre ) {
                            if( record.get( 'madre_clinea' ) == '' ) {
                                text = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
                            } else {
                                text = record.get( 'madre_clinea' ) + '-' + record.get( 'madre_ncuenta' ) + ' ' + record.get( 'madre_cnombre' ) + '/' + record.get( 'cue_cnombre' );
                            }
                        } else {
                            text = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
                        }
                        return text;
                    }
                }, {
                    xtype: 'gridcolumn',
                    header: 'Prioridad',
                    sortable: true,
                    dataIndex: 'rec_iPrioridad',
                    renderer: function( value, metadata, record, colIndex,
                        store, view ) {
                        var rclass = 'prioridad' + record.get( 'rec_iPrioridad' );
                        if( record.get( 'tiene_notificaciones' ) )
                            rclass = rclass + " icon-reporte-prioridad";
                        metadata.tdCls = rclass;
                        return value;
                    },
                    width: 50
                }, {
                    xtype: 'gridcolumn',
                    header: 'Evento',
                    dataIndex: 'rec_calarma',
                    sortable: true,
                    groupable: true,
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var texto = '';
                        var panel = this.up( 'multicuentagridview' );
                        if( Ext.util.Format.trim( record.get( 'rec_calarma' ) ) != '' ) {
                            texto = record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' );
                            var txtColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolorletra' ) );
                            var backColor = panel.decimalColorToHTMLcolor( record.get( 'cod_ncolor' ) );
                            metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                        } else {
                            texto = record.get( 'rec_cContenido' );
                            metadata.style = 'color:#333; background-color:transparent;';
                        }
                        return texto
                    },
                    width: 210
                }, {
                    xtype: 'gridcolumn',
                    header: 'Estado',
                    dataIndex: 'rec_nestado',
                    sortable: true,
                    groupable: true,
                    width: 100,
                    renderer: function( value, metadata, record ) {
                        var store = Ext.data.StoreManager.lookup( 'EventoEstadoStore' );
                        var text = '';
                        var estado = store.findRecord( 'Value', value );
                        if( estado )
                            text = estado.get( 'Name' );
                        return '<img data-qtip="' + text + '"src="/resources/softguard/images/icons/estado' + value + '.png" height=16>';
                    }
                },/* {
				xtype : 'gridcolumn',
				header : 'Zona',
				dataIndex : 'zon_cdescripcion',
				sortable : true,
				width : 160
			}, {
				xtype : 'gridcolumn',
				header : 'Usuario',
				dataIndex : 'usu_cnombre',
				sortable : true,
				width : 150
			},*/ {
                    xtype: 'gridcolumn',
                    header: 'Usuario', //nombre del contacto
                    dataIndex: 'usu_cnombre',
                    sortable: true,
                    width: 150
                }, {
                    xtype: 'gridcolumn',
                    header: 'Origen',
                    dataIndex: 'rec_nOrigen',
                    sortable: false,
                    width: 150,
                    renderer: function( value, metadata, record ) {
                        if( record.get( 'rxt_nSPIP' ) == 1 )
                            return 'IP'
                        else if( record.get( 'rxt_nSPSMS' ) == 1 )
                            return "SMS";
                        else if( record.get( 'rxt_nVCIP' ) == 1 )
                            return 'IP'
                        else if( record.get( 'rxt_nVCSMS' ) == 1 )
                            return "SMS";
                        else {
                            var store = Ext.data.StoreManager.lookup( 'EventoOrigenStore' );
                            var origen = store.findRecord( 'Value', value );
                            if( origen )
                                return origen.get( 'Name' );
                            else
                                return value
                        }
                    }
                }, {
                    xtype: 'gridcolumn',
                    header: 'Zona descripcion',
                    dataIndex: 'zon_cdescripcion',
                    sortable: true,
                    width: 150
                }, {
                    xtype: 'gridcolumn',
                    header: 'Comentarios auxiliares',
                    dataIndex: 'rec_cContenido',
                    sortable: true,
                    width: 150
                }
            ]
        }],
    setCuentaId: function( id ) {
        this.options.Id = id;
    },
    initComponent: function() {
        this.callParent( arguments );
        this.down( '#btnMapa' ).show();
        this.down( '#btnImage' ).show();
        Ext.Ajax.request( {
            url: '/rest/tablas/parametros/',
            params: { par_ccodigo: 'VISUALIZAPARTICIONMWR' },
            method: 'GET',
            scope: this,
            success: function( response ) {
                var parametros = Ext.JSON.decode( response.responseText );
                var rec = parametros[ 0 ];
                if( rec.par_ivalor == 0 ) {
                    this.nombreMadre = true;
                } else {
                    this.nombreMadre = false;
                }
            }
        });
    }
});