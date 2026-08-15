//MIGRADO2024
Ext.define( 'Common.view.CuentaRecepcionView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.recepcionview',
    title: 'Histórico de eventos',
    //requires: 'Slbf.ux.uxiframe',
    layout: 'fit',
    viewConfig: {
        loadMask: false,
    },
    items: [
        {
            xtype: 'gridpanel',
            itemId: 'gridrecepcion',
            //flex: 1,
            autoScroll: true,
            scroll: true,
            columns: [
                {
                    xtype: 'gridcolumn',
                    header: "Método",
                    //flex: 1,
                    dataIndex: "gps_cMethod",
                    hideable: true,
                    width: 26,
                    renderer: function( value, metaData ) {
                        metaData.style += "padding:0px;";
                        var cropMethod = value.split( ';' );
                        if( cropMethod[ 1 ] ) {
                            if( cropMethod[ 1 ] == 1 ) {
                                return '<div class="icon-marker-red" title="' + getLocale( 'Sin acceso al GPS' ) + '" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> '
                            } else if( cropMethod[ 1 ] == 2 ) {
                                return '<div class="icon-marker-orange" title="' + getLocale( 'Uso del GPS solo en primer plano' ) + '" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> '
                            } else if( cropMethod[ 1 ] == 3 ) {
                                return '<div class="icon-marker-green" title="' + getLocale( 'Uso full del GPS' ) + '" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> '
                            }
                        }
                        return '';
                    }
                }, {
                    xtype: 'gridcolumn',
                    header: "Contenido",
                    //dataIndex: "rec_cContenido",
                    dataIndex: "rxi_cTipo",
                    //flex: 1,
                    hideable: true,
                    width: 26,
                    renderer: function( value, metaData ) {
                        metaData.style += "padding:0px;";
                        if( value.match( /MP3/g ) || value.match( /\[VigiControl\]\[MP4\]/g ) ) {
                            return "&nbsp;<img src=\"/resources/global/images/icons/sound.png\" data-qtip=\"" + getLocale( 'Posee imágenes' ) + "\"/>";
                        }
                        if( value.match( /IMG|JPG/g ) ) {
                            return "&nbsp;<img src=\"/resources/global/images/icons/photo.png\" data-qtip=\"" + getLocale( 'Posee imágenes' ) + "\"/>";
                        } else if( value.match( /AVI|VIDEO|Video|WEBM|MP4|mp4/g ) ) {
                            return "&nbsp;<img src=\"/resources/softguard/images/icons/cctv_camera.png\" data-qtip=\"" + getLocale( 'Posee video' ) + "\"/>";
                        }
                        return '';
                    }
                    /*}, {
                        header: "&nbsp;",
                        dataIndex: "_rec_cContenido",
                        hideable: false,
                        width: 26,
                        renderer: function( value, metaData ) {
                            metaData.style += "padding:0px;";
                            if( value.match( /MP3/g ) )
                                return "&nbsp;<img src=\"/resources/global/images/icons/sound.png\" data-qtip=\"" + getLocale( 'Posee sonido' ) + "\"/>";
                            return '';
                        }*/
                }, {
                    text: 'Fecha y Hora del Evento',
                    hideable: true,
                    dataIndex: 'rec_isoFechaHora', // el campo debe conicidir con el sort para que la grilla lo marque.
                    xtype: 'datecolumn',
                    format: 'D d-m-Y G:i:s',
                    /*renderer: function(value,metadata,record){
                       return Ext.Date.format(record.get('rec_isoFechaHora'), 'D d-m-Y G:i:s');
                    },*/
                    width: 170
                },
                {
                    text: 'Fecha GPS',
                    hideable: true,
                    itemId: 'fechaGps',
                    dataIndex: 'gps_tRawfechahora',
                    xtype: 'datecolumn',
                    format: 'D d-m-Y G:i:s',
                    width: 170
                }, {
                    text: 'Fecha de Proceso',
                    hideable: true,
                    dataIndex: '_rec_isoFechaProceso',
                    format: 'D d-m-Y G:i:s',
                    xtype: 'datecolumn',
                }, {
                    text: 'Horario Cuenta',
                    hideable: true,
                    dataIndex: 'ttz_noffset',
                    xtype: 'datecolumn',
                    //format : 'd-m-Y G:i:s',
                    renderer: function( value, metadata, record ) {
                        var fecha = record.get( "_tfechahoraOffset" );
                        return Ext.Date.format( fecha, 'D d-m-Y G:i:s' );
                    },
                    hidden: true,
                    width: 170
                }, {
                    xtype: 'gridcolumn',
                    hideable: true,
                    header: 'Prioridad',
                    sortable: true,
                    dataIndex: 'rec_iPrioridad',
                    itemId: 'rec_iPrioridad',
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var prioridad = value == 0 ? record.get( 'cod_nprioridad' ) : value;
                        var rclass = 'prioridad' + prioridad;
                        /*	se saco el dia 26/10/2017 se hablo por chat
                if(record.get('tiene_notificaciones'))						   
                        rclass = rclass + " icon-reporte-prioridad";*/
                        metadata.tdCls = rclass;
                        return prioridad;
                    },
                    width: 50
                }, {
                    xtype: 'gridcolumn',
                    hideable: true,
                    header: 'Evento',
                    dataIndex: 'rec_calarma',
                    sortable: true,
                    groupable: true,
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var texto = '';
                        var panel = this.up( 'recepcionview' );
                        if( Ext.util.Format.trim( record.get( 'rec_calarma' ) ) != '' ) {
                            texto = record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' );
                            var txtColor = decimalColorToHTMLcolor( record.get( 'cod_ncolorletra' ) );
                            var backColor = decimalColorToHTMLcolor( record.get( 'cod_ncolor' ) );
                            metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
                        } else {
                            texto = record.get( 'rec_cContenido' );
                            metadata.style = 'color:#333; background-color:transparent;';
                        }
                        return texto
                    },
                    width: 180
                }, {
                    xtype: 'gridcolumn',
                    hideable: true,
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
                }, {
                    xtype: 'gridcolumn',
                    hideable: true,
                    header: 'Observaciones',
                    dataIndex: 'rec_cObservaciones',
                    itemId: 'col_observaciones',
                    //flex: 1,
                },
                {
                    xtype: 'gridcolumn',
                    hideable: true,
                    header: 'Origen',
                    dataIndex: '_origen',
                    itemId: '_origen',
                    sortable: true,
                    //flex: 1,
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        var ret = '';
                        if( value == '' ) {
                            if( record.get( 'rec_norigen' ) != 0 ) {
                                var store = Ext.data.StoreManager.lookup( 'EventoOrigenStore' );
                                var origen = store.findRecord( 'Value', record.get( 'rec_norigen' ) );
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
                }, {
                    xtype: 'gridcolumn',
                    header: 'Zona',
                    hideable: true,
                    dataIndex: 'rec_czona',
                    itemId: 'rec_czona',
                    sortable: true,
                    width: 140,
                    renderer: function( value, metadata, record ) {
                        //dedalo 28/6/2017 copio zona de eventospendientes
                        var zona = record.get( '_zon_cdescripcion' );
                        zona = zona.replace( '(   )', '' );
                        zona = zona.replace( '()', '' );
                        zona = zona.replace( '(0)', '' );
                        return zona;
                        /*
                        if(Ext.util.Format.trim(record.get('rec_czona')) == '0'  && record.get('cod_ntipo') == 0) {
                            return ''
                        } else if (record.get('_zon_cdescripcion')!=''){
                            return record.get('_zon_cdescripcion');
                        } else if (record.get('zon_cdescripcion') == ''){
                            return record.get('rec_czona');
                        } else if(Ext.util.Format.trim(record.get('rec_czona')) == '') {
                            return '';
                        } else if(Ext.util.Format.trim(record.get('zon_cdescripcion')) == '0') {
                            return '('+record.get('rec_czona')+')'
                        } else{
                            return '('+record.get('rec_czona')+') '+record.get('zon_cdescripcion');
                        }
                        */
                    }
                }, {
                    /**
                     * Daniel O. Medina 14/04/2023 Error reportado por slack
                     * Se vueve al render original y se anula el de más con comentario "copie el mismo renderer que eventiopendientes" */
                    renderer: function( value, metadata, record ) {
                        if( record.get( '_usu_cnombre' ) == '' ) {
                            return value;
                        } else {
                            return record.get( '_usu_cnombre' );
                        }
                    },
                    xtype: 'gridcolumn',
                    header: 'Usuario',
                    hideable: true,
                    dataIndex: 'Usuario_cnombre',
                    itemId: 'Usuario_cnombre',
                    sortable: true,
                    width: 140,
                    /** copie el mismo renderer que eventiopendientes */
                    /*renderer: function( value, metadata, record, colIndex, store, view ) {
                        value = value.replace( '()', '' );
                        //value = value.replace('(0)',''); //Se pidio sacar el dia 27/12/2016
                        if( Ext.util.Format.trim( value ) == '(0)' && record.get( 'cod_ntipo' ) == 0 ) {
                            value = ''; //se pidio saca el (0) dia  13/02/2017
                        }
                        return value;
                    }*/
                }, {
                    xtype: 'gridcolumn',
                    header: 'Operador',
                    hideable: true,
                    dataIndex: 'ope_cnombre',
                    sortable: true,
                    width: 140
                }, {
                    xtype: 'gridcolumn',
                    header: 'Cuenta madre',
                    hideable: true,
                    dataIndex: '_cuentamadre',
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        return record.get( 'madre_clinea' ) + '-' + record.get( 'madre_ncuenta' ) + ' ' + record.get( 'madre_cnombre' );
                    },
                    width: 140,
                    hidden: true
                }, {
                    xtype: 'gridcolumn',
                    header: 'Cuenta',
                    hideable: true,
                    hidden: true,
                    dataIndex: 'cue_cnombre',
                    renderer: function( value, metadata, record, colIndex, store, view ) {
                        return record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' );
                    },
                    width: 140,
                    hidden: true
                }, {
                    xtype: 'gridcolumn',
                    header: 'Origen',
                    hideable: true,
                    dataIndex: '_rec_nOrigen',
                    width: 140,
                    hidden: true
                }, {
                    xtype: 'gridcolumn',
                    header: 'Categorizacion',
                    hideable: true,
                    dataIndex: 'res_cdescripcion',
                    width: 140,
                    hidden: true
                }, {
                    xtype: 'gridcolumn',
                    header: 'Resolucion',
                    hideable: true,
                    dataIndex: 'cat_cDescripcion',
                    width: 140,
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Linea de tarjeta',
                    hideable: true,
                    dataIndex: 'rxl_clinecard',
                    sortable: true,
                    width: 100,
                    hidden: true
                }
            ]
        }, {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
        }
    ],
    initComponent: function() {
        /*esta funcion está definida en Application.js
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
        */
        var me = this;
        if( me.options ) {
            if( me.options.fechaHasta != '' ) {
                this.options = {
                    fechaHasta: me.options.fechaHasta,
                    fechaDesde: me.options.fechaDesde ? me.options.fechaDesde : '',
                    alertas: '',
                    tipos: '',
                    mostrar: 0,
                    orden: 'ASC',
                    Id: 0
                };
            } else {
                this.options = {
                    fechaHasta: '',
                    fechaDesde: '',
                    alertas: '',
                    tipos: '',
                    mostrar: 0,
                    orden: 'ASC',
                    Id: 0
                };
            }
        }
        this.callParent();
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Observaciones',
                    iconCls: 'icon-comment',
                    itemId: 'observaciones',
                    enableToggle: true
                }, "-",
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'imprimir'
                }, "-",
                {
                    text: 'Filtros',
                    menu: {
                        xtype: 'menu',
                        itemId: 'filtermenu',
                        width: 950,
                        items: [
                            {
                                xtype: 'form',
                                itemId: 'filterview',
                                defaultButton: 'recepcionview #search',
                                bodyPadding: 5,
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '0 10 0 0',
                                        items: [
                                            {
                                                xtype: 'combo',
                                                fieldLabel: 'Tabla',
                                                displayField: '_periodo',
                                                queryMode: 'local',
                                                valueField: 'c_periodo',
                                                itemId: 'combohistorico',
                                                //plugins: [ 'clearbutton' ],
                                                //multiSelect: true,
                                                width: 300
                                            }, {
                                                xtype: 'fieldset',
                                                title: 'Eventos',
                                                layout: 'vbox',
                                                width: 300,
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
                                                        padding: '0 0 0 0',
                                                        border: 0,
                                                        layout: 'hbox',
                                                        margin: '0 0 5 0',
                                                        items: [
                                                            {
                                                                xtype: 'datefield',
                                                                fieldLabel: 'Desde',
                                                                name: "fechadesde",
                                                                bindToModel: false,
                                                                itemId: 'fechadesde',
                                                                labelWidth: 50,
                                                                width: 150
                                                            }, {
                                                                fieldLabel: 'Hora',
                                                                xtype: 'timefield',
                                                                itemId: 'horadesde',
                                                                format: 'H:i',
                                                                altFormats: 'H:i',
                                                                increment: 10,
                                                                labelWidth: 40,
                                                                width: 120,
                                                                value: '00:00',
                                                                margin: '0 0 0 7'
                                                            }
                                                        ]
                                                    }, {
                                                        xtype: 'fieldset',
                                                        padding: '0 0 0 0',
                                                        border: 0,
                                                        layout: 'hbox',
                                                        margin: '0 0 5 0',
                                                        items: [
                                                            {
                                                                xtype: 'datefield',
                                                                fieldLabel: 'Hasta',
                                                                itemId: 'fechahasta',
                                                                bindToModel: false,
                                                                name: "fhasta",
                                                                labelWidth: 50,
                                                                width: 150
                                                            }, {
                                                                fieldLabel: 'Hora',
                                                                xtype: 'timefield',
                                                                itemId: 'horahasta',
                                                                format: 'H:i',
                                                                altFormats: 'H:i',
                                                                increment: 10,
                                                                labelWidth: 40,
                                                                width: 120,
                                                                value: '23:59',
                                                                margin: '0 0 0 7'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        itemId: 'combooperador',
                                                        fieldLabel: 'Operador',
                                                        displayField: 'ope_cnombre',
                                                        valueField: 'ope_clogin',
                                                        queryMode: 'local',
                                                        width: '100%',
                                                        hidden: true
                                                    }, {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Tipo de evento',
                                                        store: [
                                                            [ 0, getLocale( 'General' ) ],
                                                            [ 4, getLocale( 'Restauracion' ) ],
                                                            [ 2, getLocale( 'Activacion' ) ],
                                                            [ 1, getLocale( 'Desactivacion' ) ],
                                                            [ 3, getLocale( 'Estado' ) ]
                                                        ],
                                                        multiSelect: true,
                                                        itemId: 'tipoevento',
                                                        width: '100%'
                                                    },/*,{                                        
                                                                        xtype : 'combo',
                                                                        fieldLabel : 'Codigo alarma',                                                          
                                                                        itemId: 'codigoalarma',
                                                                        displayField : 'Descripcion',
                                                                        queryMode: 'local',
                                                                    	valueField : 'cod_ccodigo',
                                                            			name : "cod_cdescripcion",
                                                                        typeAhead:true,
                                                                        //multiSelect: true,
                                                                       // lastQuery: '',
                                                                        width:'100%'
                                                                        
                                                                    },*/
                                                    {
                                                        xtype: 'eventselecterfield',
                                                        itemId: 'eventhelper',
                                                        filter: [],
                                                        simpleSelect: false
                                                    }, {
                                                        xtype: 'combo',
                                                        itemId: 'comboregistros',
                                                        itemId: 'cantRegistros',
                                                        fieldLabel: 'Cantidad de registros',
                                                        width: '100%',
                                                        store: [
                                                            [ 500, 500 ],
                                                            [ 1000, 1000 ],
                                                            [ 1500, 1500 ],
                                                            [ 2000, 2000 ],
                                                            [ 2500, 2500 ],
                                                            [ 5000, 5000 ],
                                                            [ 10000, 10000 ],
                                                            [ 20000, 20000 ],
                                                            [ 30000, 30000 ],
                                                            [ 40000, 40000 ],
                                                            [ 50000, 50000 ],
                                                            [ 75000, 75000 ],
                                                            [ 100000, 100000 ]
                                                        ]
                                                    }, {
                                                        xtype: 'combo',
                                                        itemId: 'feventos',
                                                        fieldLabel: 'Eventos',
                                                        name: 'rec_calarma',
                                                        queryMode: 'local',
                                                        typeAhead: true,
                                                        width: '100%',
                                                        valueField: 'field1',
                                                        displayField: 'field2'
                                                    }, {
                                                        xtype: 'combo',
                                                        itemId: 'estadoevento',
                                                        fieldLabel: 'Estados',
                                                        name: 'estadoevento',
                                                        queryMode: 'local',
                                                        width: '100%',
                                                        store: 'EventoEstadoStore',
                                                        valueField: 'Value',
                                                        displayField: 'Name',
                                                        multiSelect: true,
                                                    }
                                                ]
                                            }, {
                                                xtype: 'checkbox',
                                                itemId: 'particiones',
                                                fieldLabel: 'Incluir particiones'
                                            }, {
                                                xtype: 'combo',
                                                itemId: 'particionescombo',
                                                //flex: 1,
                                                /* Indico que campo de la DB que hice Bind deseo mostrar
                                                 * dentro del combo, en este caso fue de ZonaByCuentaSeachModel
                                                 */
                                                displayField: 'cue_cnombre',
                                                valueField: 'cue_iid',
                                                name: 'cue_iid',
                                                queryMode: 'local',
                                                multiSelect: true,
                                                //plugins: [ 'clearbutton' ],
                                                disabled: true
                                            }
                                        ]
                                    }, {
                                        xtype: 'container',
                                        margin: '0 10 0 0',
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                itemId: 'rango',
                                                title: 'Cuentas',
                                                layout: 'vbox',
                                                width: 300,
                                                items: [
                                                    {
                                                        xtype: 'fieldset',
                                                        padding: '0 0 0 0',
                                                        border: 0,
                                                        layout: 'hbox',
                                                        margin: '0 0 5 0',
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                fieldLabel: 'Dealer',
                                                                itemId: 'dealer',
                                                                width: 150
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                itemId: 'cuentadesde',
                                                                fieldLabel: '- Cuenta desde',
                                                                enforceMaxLength: true,
                                                                maxLength: 4,
                                                                width: 140,
                                                                labelWidth: 90,
                                                                margin: '0 0 0 7'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldset',
                                                        padding: '0 0 0 0',
                                                        border: 0,
                                                        layout: 'hbox',
                                                        margin: '0 0 5 0',
                                                        items: [
                                                            {
                                                                xtype: 'textfield',
                                                                itemId: 'cuentahasta',
                                                                fieldLabel: 'Cuenta hasta',
                                                                enforceMaxLength: true,
                                                                maxLength: 4,
                                                                width: 130,
                                                                margin: '0 0 0 167',
                                                                labelWidth: 80
                                                            }
                                                        ]
                                                    }
                                                    , {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Nombre',
                                                        itemId: 'nombre',
                                                        width: '100%'
                                                    }, {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Tipo de cuenta',
                                                        store: 'TablaTiposStore',
                                                        displayField: 'Descripcion',
                                                        queryMode: 'local',
                                                        valueField: 'Codigo',
                                                        name: "cue_ctipo",
                                                        itemId: 'tipocuenta',
                                                        width: '100%'
                                                    }, {
                                                        xtype: 'combo',
                                                        itemId: 'comboestado',
                                                        fieldLabel: 'Estado',
                                                        displayField: 'Name',
                                                        valueField: 'Value',
                                                        //store: 'SoftguardEstadoEstadoStore',
                                                        queryMode: 'local',
                                                        width: '100%'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'fieldset',
                                                title: 'Mostrar',
                                                layout: 'vbox',
                                                itemId: 'mostrar',
                                                width: 300,
                                                items: [
                                                    {
                                                        xtype: 'checkbox',
                                                        columnIndex: 10,
                                                        itemId: 'origencheck',
                                                        checked: true,
                                                        fieldLabel: 'Origen',
                                                        listeners: {
                                                            specialkey: function( field, e ) {
                                                                if( e.getKey() == e.ENTER ) { }
                                                            },
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }, {
                                                        xtype: 'checkbox',
                                                        itemId: 'cuentamadrecheck',
                                                        columnIndex: 14,
                                                        fieldLabel: 'Cuenta panel',
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }, {
                                                        xtype: 'checkbox',
                                                        columnIndex: 18,
                                                        itemId: 'categorizacioncheck',
                                                        fieldLabel: 'Categorizacion',
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }, {
                                                        xtype: 'checkbox',
                                                        itemId: 'observacionescheck',
                                                        columnIndex: 9,
                                                        fieldLabel: 'Observaciones',
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }
                                                    , {
                                                        xtype: 'checkbox',
                                                        itemId: 'operadorcheck',
                                                        columnIndex: 13,
                                                        fieldLabel: 'Operador',
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }, {
                                                        xtype: 'checkbox',
                                                        itemId: 'resolucioncheck',
                                                        columnIndex: 17,
                                                        fieldLabel: 'Resolucion',
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }
                                                    // BC 379771841 : Agregado del check para Linea de Tarjeta
                                                    , {
                                                        xtype: 'checkbox',
                                                        itemId: 'lineatarjetacheck',
                                                        columnIndex: 19,
                                                        fieldLabel: 'Linea de tarjeta',
                                                        checked: false,
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }
                                                    // 20/05/2020 : https://basecamp.com/2249105/projects/14758734/todos/413732096
                                                    , {
                                                        xtype: 'checkbox',
                                                        itemId: 'fechahoraeventocheck',
                                                        columnIndex: 2,
                                                        fieldLabel: 'Horario del evento',
                                                        checked: true,
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }
                                                    // 04/03/2019 : Solicitado por Fernando Canonico, cliente Mexicano
                                                    , {
                                                        xtype: 'checkbox',
                                                        itemId: 'horacuentacheck',
                                                        columnIndex: 5,
                                                        fieldLabel: 'Horario Cuenta',
                                                        checked: false,
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                var view = check.up( 'recepcionview' );
                                                                view.items.items[ 0 ].columnManager.getColumns()[ check.columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }, {
                                                        xtype: 'checkbox',
                                                        itemId: 'fechaProceso',
                                                        columnIndex: 4,
                                                        fieldLabel: 'Fecha de Proceso',
                                                        checked: false,
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                const view = check.up( 'recepcionview' );
                                                                const columns = view.items.items[ 0 ].columnManager.getColumns();
                                                                const columnIndex = check.columnIndex;;
                                                                columns[ columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'checkbox',
                                                        fieldLabel: 'Fecha GPS',
                                                        columnIndex: 3,
                                                        checked: false,
                                                        action: 'onFechaGpsChange',
                                                        listeners: {
                                                            change: function( check, newValue, oldValue, eOpts ) {
                                                                const view = check.up( 'recepcionview' );
                                                                const columns = view.items.items[ 0 ].columnManager.getColumns();
                                                                const columnIndex = columns.findIndex( function( column, i ) {
                                                                    return column.text === 'Fecha Gps';
                                                                });
                                                                columns[ columnIndex ].setVisible( newValue );
                                                            }
                                                        }
                                                    }
                                                ]
                                            }, {
                                                xtype: 'fieldset',
                                                title: 'Solo email o impresion',
                                                layout: 'vbox',
                                                width: 300,
                                                items: [
                                                    {
                                                        xtype: 'checkbox',
                                                        itemId: 'timelinecheck',
                                                        fieldLabel: 'Timeline'
                                                    }, {
                                                        xtype: 'checkbox',
                                                        itemId: 'llamadascheck',
                                                        fieldLabel: 'Llamadas'
                                                    }
                                                ]
                                            }
                                        ]
                                    }, {
                                        xtype: 'container',
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                title: 'Orden para Mail',
                                                layout: 'vbox',
                                                width: 300,
                                                items: [
                                                    {
                                                        xtype: 'combo',
                                                        itemId: 'ordenarpor',
                                                        fieldLabel: 'Fecha',
                                                        queryMode: 'local',
                                                        width: '100%',
                                                        store: [
                                                            [ 'ASC', getLocale( 'Mas antiguo primero' ) ],
                                                            [ 'DESC', getLocale( 'Mas reciente primero' ) ]
                                                        ]
                                                    }
                                                ]
                                            }, {
                                                xtype: 'fieldset',
                                                title: 'Cuenta',
                                                width: 300,
                                                items: [
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Zona',
                                                        displayField: 'zon_cdescripcion',
                                                        queryMode: 'local',
                                                        valueField: 'zon_ccodigo',
                                                        name: "zona",
                                                        itemId: 'zona',
                                                        width: '100%'
                                                    }, {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Usuario',
                                                        displayField: 'usu_cnombre',
                                                        queryMode: 'local',
                                                        valueField: 'usu_iid',
                                                        itemId: 'usuario',
                                                        width: '100%'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'fieldset',
                                                layout: 'vbox',
                                                width: 300,
                                                items: [
                                                    {
                                                        xtype: 'checkbox',
                                                        itemId: 'reportecompleto',
                                                        fieldLabel: 'Reporte completo',
                                                        name: 'reportecompleto'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'combo',
                                                width: 300,
                                                fieldLabel: 'Autoridad',
                                                displayField: 'aut_cnombre',
                                                queryMode: 'local',
                                                valueField: 'aut_ccodigo',
                                                itemId: 'autoridades'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }, {
                    xtype: 'button',
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    action: 'search',
                    itemId: 'search'
                },/*"-",{
                    xtype: 'button',
                    text:'Ver Todos',
                    iconCls: 'icon-find',
                    action: 'todos'
                },*/'->', {
                    xtype: 'button',
                    text: 'Exportar',
                    itemId: 'btnExportar',
                    action: 'export',
                    iconCls: 'icon-page-excel',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail',
                    itemId: 'mail',
                    hidden: true
                }, {
                    type: 'button',
                    itemId: 'maximizer',
                    hidden: false,
                    iconCls: 'icon-arrow-out',
                    text: '',
                    handler: function( btn ) {
                        var view = me;
                        var tabpanel = btn.up( 'tabpanel' );
                        var record = view.record;
                        var observaciones = view.down( '#observaciones' );
                        var item = Ext.widget( 'recepcionview', me.getInitialConfig() );
                        item.record = view.record;
                        item.header = false;
                        item.showObservaciones = observaciones ? observaciones.pressed : false;
                        var win = Ext.create( 'Ext.Window', {
                            layout: 'fit',
                            translate: false,
                            title: me.title,
                            closeAction: 'destroy',
                            closable: true,
                            width: 750,
                            height: 400,
                            border: true,
                            modal: false,
                            view: view,
                            items: [ item ]
                        });
                        win.show();
                    }
                }
            ]
        });
        var pagingtoolbar = Ext.create( 'Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        this.addDocked( pagingtoolbar );
        this.addDocked( toolbar );
    },
    setCuentaId: function( id ) {
        this.options.Id = id;
    }
});
Ext.define( 'Common.view.CuentaRecepcionSPView', {
    extend: 'Common.view.CuentaRecepcionView',
    alias: 'widget.cuentarecepcionspview',
    title: 'Histórico de transacciones',
    //rec_cdll: '\'SMARTPANICS\',\'SMARTPANICSHTTP\'',
    for_cProtocolo: 'SMARTPANICS',
    Origenes: 'SMARTPANICS',
    layout: 'fit',
    items: [
        {
            xtype: 'gridpanel',
            itemId: 'gridrecepcion',
            flex: 1,
            autoScroll: true,
            scroll: true,
            columns: [
                {
                    text: 'Fecha y Hora del Evento',
                    dataIndex: 'rec_tfechahora',
                    xtype: 'datecolumn',
                    format: 'D d-m-Y G:i:s',
                    //dedalo 25/9/2018 uso el formato de fecha
                    /*
                    renderer: function(value,metadata,record){
                        return Ext.Date.format(record.get('rec_isoFechaHora'), 'D d-m-Y G:i:s');
                    },*/
                    width: 170
                }, {
                    xtype: 'gridcolumn',
                    header: 'Prioridad',
                    sortable: true,
                    dataIndex: 'cod_nprioridad',
                    renderer: function( value, metadata, record, colIndex,
                        store, view ) {
                        var rclass = 'prioridad' + record.get( 'cod_nprioridad' );
                        /*	se saco el dia 26/10/2017 se hablo por chat
                        if(record.get('tiene_notificaciones'))						   
                                rclass = rclass + " icon-reporte-prioridad";*/
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
                        var panel = this.up( 'recepcionview' );
                        if( record.get( 'rec_calarma' ) ) {
                            texto = record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' );
                            var txtColor = decimalColorToHTMLcolor( record.get( 'cod_ncolorletra' ) );
                            var backColor = decimalColorToHTMLcolor( record.get( 'cod_ncolor' ) );
                            metadata.style = 'color:' + txtColor + '; background-color:' + backColor;
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
                }, {
                    xtype: 'gridcolumn',
                    header: 'Zona',
                    dataIndex: 'rec_czona',
                    sortable: true,
                    width: 140,
                    renderer: function( value, metadata, record ) {
                        if( record.get( 'rec_czona' ) == '(0)' && record.get( 'cod_ntipo' ) == 0 ) {
                            return '';
                        } else if( record.get( 'zon_cdescripcion' ) == '' ) {
                            return record.get( 'rec_czona' );
                        } else {
                            return '(' + record.get( 'rec_czona' ) + ') ' + record.get( 'zon_cdescripcion' );
                        }
                    }
                }, {
                    xtype: 'gridcolumn',
                    header: 'Operador',
                    dataIndex: 'ope_cnombre',
                    sortable: true,
                    width: 140
                }, {
                    xtype: 'gridcolumn',
                    //index 6
                    header: 'Origen',
                    itemId: 'origenes',
                    dataIndex: 'origenes',
                    sortable: false,
                    width: 150,
                    renderer: function( value, metadata, record ) {
                        if( record.get( 'rxt_nSPIP' ) == 1 )
                            return 'IP'
                        if( record.get( 'rxt_nSPSMS' ) == 1 )
                            return "SMS";
                    }
                }, {
                    xtype: 'gridcolumn',
                    header: 'Usuario',
                    dataIndex: 'Usuario_cnombre',
                    sortable: true,
                    hidden: true, // no va porque es un dispositivo solo, siempre el mismo usuario
                    width: 140,
                    renderer: function( value, metadata, record ) {
                        if( record.get( 'Usuario_cnombre' ) == '(0)' && record.get( 'cod_ntipo' ) == 0 ) {
                            return '';
                        } else {
                            return record.get( 'Usuario_cnombre' )
                        }
                    }
                }
            ]
        }, {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
        }
    ],
    initComponent: function() {
        this.callParent();
        this.down( '#tipoevento' ).hide();
    }
});