//MIGRADO2024
Ext.define('Common.view.EventoFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.eventoformview'],
    title: 'Evento',
    preventHeader: true,
    layout: 'hbox',
    showtoolbar: true,
    autoScroll: false,
    fieldDefaults: {
        labelWidth: 120,
        anchor: '100%',
        height: "auto",
        marginTop: "0px",
        labelAlign: 'left'
    },
    //bodyPadding :0,
    items: [
        {
            xtype: 'image',
            flex: 1,
            hidden: true,
            width: 150,
            height: 300,
            style: 'width: 100%; height: 100%; object-fit: contain;',
            itemId: 'lin_cimagen',
            //margin: '5 5 5 5',

        },
        {
            xtype: 'container',
            flex: 5,
            title: '',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'displayfield',
                    name: 'cod_cdescripcion',
                    itemId: 'nombreevento',
                    fieldStyle: {
                        fontSize: "20px",
                        height: "auto",
                        fontWeight: "bold",
                        marginTop: "0px",
                        textAlign: "center"
                    },
                    renderer: function (value, field) {
                        var view = field.up('eventoformview');
                        var record = view.record;
                        var nombre = '';
                        if (Ext.util.Format.trim(record.get('rec_calarma')) != '') {
                            nombre = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                        } else {
                            nombre = record.get('rec_cContenido');
                        }
                        if (Ext.util.Format.trim(record.get('_origen')) == '%MAN : Evento Generado Manualmente%') {
                            nombre = nombre + ' <span style="font-size:12px"> (' + getLocale(record.get('_origen')) + ')</span>'
                        }
                        var path = '/handler/getImage?u=/images/codala/' + record.get('rec_calarma') + '.png';
                        var operadorVirtual = '';

                        if (record.get('pro_nProceso') == 63) {
                            operadorVirtual =
                                '<span ' +
                                'data-qtip="' + getLocale('Evento derivado por el Operador virtual.') + '" ' +
                                'style="' +
                                'position:absolute;' +
                                'right:8px;' +
                                'top:0px;' +
                                'display:inline-block;' +
                                'cursor:help;' +
                                '">' +
                                '<img ' +
                                'src="/resources/global/images/icons/op-virtual-icon.png" ' +
                                'width="24" ' +
                                'height="24" ' +
                                'onerror=\'this.style.display = "none"\'>' +
                                '</span>';
                        }

                        return '<div style="position:relative;width:100%;min-height:26px;">' +
                            '<span>' +
                            '<img src="' + path + '" width="16" height="16" ' +
                            'onerror=\'this.style.display = "none"\'> ' +
                            nombre +
                            '</span>' +
                            operadorVirtual +
                            '</div>';

                    },
                    fieldLabel: '',
                    margin: '5 0 0 0',
                    width: '100%'
                },
                {
                    // divido entre imagen del dealer y el resto.
                    xtype: 'container',
                    title: '',
                    /*layout: {
                        type: 'hbox',
                        align: 'middle'
                    },*/
                    items: [

                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelStyle: "color:#FFFFFF;background-color:#003366;padding:3"
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    name: 'lin_crazonsocial',
                                    fieldStyle: {
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        marginTop: "0px",
                                        height: "auto",
                                        width: '100%'
                                    },
                                    fieldLabel: '',
                                    itemId: 'lin_crazonsocial',
                                    width: '100%',
                                }, {
                                    xtype: 'displayfield',
                                    name: 'cue_cnombre',
                                    fieldLabel: '',
                                    fieldStyle: {
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        marginTop: "0px",
                                        height: "auto",
                                        width: '100%'
                                    },
                                    itemId: 'nombre',
                                    width: '100%',
                                    renderer: function (value, field) {
                                        var view = field.up('eventoformview');
                                        var record = view.record;
                                        var nombre = '';
                                        if (record.get('cue_nparticion') != 0) {
                                            nombre = record.get('madre_clinea') + '-' + record.get('madre_ncuenta') + ' ' + record.get('madre_cnombre') + ' / ' + getLocale('En partición:') + ' (' + record.get('_ZonaParticion') + ') ';
                                        }
                                        nombre = nombre + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');
                                        return nombre;
                                    }
                                }, {
                                    xtype: 'container',
                                    //layout: 'hbox',
                                    defaults: {
                                        labelStyle: "color:#FFFFFF;background-color:#003366;padding:3"
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            name: 'cue_ccalle',
                                            fieldLabel: 'Direccion'
                                            /*renderer: function(value,field){
                                            var view = field.up('eventoformview');
                                            var record = view.record;                                               
                                                
                                            var direccion = record.get('cue_ccalle')+" "+record.get('cue_clocalidad');
                                            
                                            return direccion;
                                            }*/
                                        }, {
                                            xtype: 'displayfield',
                                            name: 'rec_cContenido',
                                            itemId: 'rec_ccontenido',
                                            fieldLabel: 'Contenido',
                                            hidden: true
                                        }
                                    ]
                                }, {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelStyle: "color:#FFFFFF;background-color:#003366;padding:3"
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            name: 'cue_clocalidad',
                                            fieldLabel: 'Localidad'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'icon-application-form',
                                            align: 'rigth',
                                            tooltipType: 'qtip',
                                            itemId: 'moreInfoBtn'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    title: '',
                    margin: '5 0 0 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            title: '',
                            flex: 1,
                            itemId: 'horaIngreso',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Hora de ingreso'),
                                    width: '100%',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    name: 'rec_isoFechaHora',
                                    fieldLabel: '',
                                    width: 200,
                                    renderer: function (value, metadata, record) {
                                        if (value) {
                                            return Ext.Date.format(new Date(value), 'd/m/Y H:i:s');
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            title: '',
                            flex: 1,
                            itemId: 'horaPanel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Hora de panel (zona horaria)'),
                                    width: '100%',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    name: '',
                                    fieldLabel: '',
                                    width: 200,
                                    renderer: function (value, field, record) {
                                        var view = field.up('eventoformview');
                                        var record = view.record;
                                        if (record.get('rec_isoFechaHora') && record.get('cue_iZonaHoraria') != 0) {
                                            if (_SYS && _SYS.timezone) {
                                                var timezoneSys = _SYS.timezone
                                                var timezoneFinal = record.get('ttz_nOffSet') - timezoneSys;
                                                return Ext.Date.format(Ext.Date.add(new Date(record.get('rec_isoFechaHora')), Ext.Date.HOUR, timezoneFinal), 'd/m/Y H:i:s') + ' (GMT ' + record.get('ttz_nOffSet') + ')';
                                            }
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            title: '',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Acumulado'),
                                    itemId: 'acumuladolabel',
                                    width: '100%',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                }, {
                                    xtype: 'displayfield',
                                    name: '_acumulado',
                                    itemId: 'acumulado',
                                    flex: 1,
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            title: '',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Procesando'),
                                    itemId: 'procesadolabel',
                                    width: '100%',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                }, {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    itemId: 'timer',
                                    fieldLabel: ''
                                }
                            ]
                        }
                    ]
                },
                // Ultimo renglon Dedalo 7/11/2019 paso de tabla a containers
                {
                    xtype: 'container',
                    flex: 1,
                    title: '',
                    layout: 'hbox',
                    /*defaults: {
                        columnWidth: 0.25,
                    },  */
                    items: [
                        {
                            xtype: 'container',
                            title: '',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Usuario'),
                                    itemId: 'usuario',
                                    action: 'usuarioAction',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                }, {
                                    xtype: 'container',
                                    /*layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },*/
                                    itemId: 'usuContainer',
                                    width: 100,
                                    margin: '0 0 0 0',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            name: 'usu_cnombre',
                                            fieldLabel: '',
                                            fieldStyle: {
                                                marginTop: "-5px",
                                                fontWeight: 'bold'
                                            },
                                            margin: '0 0 0 0',
                                            flex: 1
                                        }
                                    ]
                                }
                            ]
                        }
                        , {
                            xtype: 'container',
                            title: '',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Zona'),
                                    //itemId:'procesadolabel',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                }, {
                                    xtype: 'container',
                                    /*layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },*/
                                    itemId: 'zonaContainer',
                                    margin: '0 0 0 0',
                                    height: '30',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            name: '_zon_cdescripcion',
                                            fieldLabel: '',
                                            fieldStyle: {
                                                marginTop: "0px"
                                            },
                                            width: '100%',
                                            height: '30',
                                            margin: '0 0 0 5'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            title: '',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Origen'),
                                    //itemId:'procesadolabel',
                                    width: '100%',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                }, {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    itemId: 'puerto',
                                    name: '_origen',
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            title: '',
                            flex: 1,
                            width: 60,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('Prioridad'),
                                    //itemId:'procesadolabel',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        testAlign: 'center',
                                        color: "#FFFFFF"
                                    }
                                }, {
                                    xtype: 'displayfield',
                                    name: 'rec_iprioridad',
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            title: '',
                            flex: 1,
                            width: 70,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    value: getLocale('L. tarjeta'),
                                    //itemId:'procesadolabel',
                                    width: '100%',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    }
                                }, {
                                    xtype: 'displayfield',
                                    name: 'rxl_clinecard',
                                    itemId: 'linecardvalue',
                                    fieldLabel: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'table',
                                columns: 4,
                                tableAttrs: {
                                    style: {
                                        width: '100%'
                                    }
                                }
                            },
                            defaults: {
                                labelStyle: "color:#FFFFFF;background-color:#003366;padding:5px"
                            },
                            itemId: "info",
                            //hidden: true,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    name: '',
                                    value: 'Estado',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    width: '100%',
                                    margin: '0 0 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    name: '',
                                    value: 'Origen',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    width: '100%',
                                    margin: '0 0 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    name: '',
                                    value: 'Categoría',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    width: '100%',
                                    margin: '0 0 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    name: '',
                                    value: 'Resolución',
                                    style: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    fieldStyle: {
                                        backgroundColor: "#003366",
                                        marginTop: "0px",
                                        color: "#FFFFFF"
                                    },
                                    width: '100%',
                                    margin: '0 0 0 0'
                                },
                                {
                                    xtype: 'displayfield',
                                    name: '_estado',
                                    fieldLabel: '',
                                    width: '100%',
                                    fieldStyle: {
                                        marginTop: "0px"
                                    },
                                    margin: '0 0 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    name: '_origen',
                                    fieldLabel: '',
                                    fieldStyle: {
                                        marginTop: "0px"
                                    },
                                    width: '100%',
                                    margin: '0 0 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    name: '_categoria',
                                    fieldLabel: '',
                                    fieldStyle: {
                                        marginTop: "0px"
                                    },
                                    width: '100%',
                                    margin: '0 0 0 0'
                                }, {
                                    xtype: 'displayfield',
                                    name: '_resolucion',
                                    fieldLabel: '',
                                    fieldStyle: {
                                        marginTop: "0px"
                                    },
                                    width: '100%',
                                    margin: '0 0 0 0'
                                }
                            ]
                        }
                    ]
                }



            ]//cierro items del grupo que estaría a la deecha de la imagen del dealer
        },
    ],
    initComponent: function () {
        this.callParent();
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            itemId: 'toolbar',
            items: [
                { xtype: 'button', text: '', hidden: true, action: 'cod_cinstrucciones_DSS_show', itemId: 'cod_cinstrucciones_DSS_button', iconCls: 'icon-text-list-numbers', tooltip: 'Instrucciones' },
                { xtype: 'button', text: '', hidden: true, action: 'logx', itemId: 'logx', iconCls: 'icon-page-white-text', tooltip: 'Log' },
                { xtype: 'button', hidden: true, text: '', action: 'observaciones', itemId: 'observaciones', iconCls: 'icon-book', tooltip: 'Observaciones' },
                { xtype: 'button', text: '', hidden: true, action: 'serviciopatrulla', itemId: 'serviciopatrulla' /*,iconCls: 'icon-car'*/, tooltip: 'Servicio patrulla' },
                { xtype: 'button', text: '', hidden: true, action: 'eventosespera', itemId: 'eventosespera', iconCls: 'icon-hourglass', tooltip: 'Eventos en espera' },
                { xtype: 'button', text: '', hidden: true, action: 'patrullaasignada', itemId: 'patrullaasignada', iconCls: 'icon-car-add', tooltip: 'Patrulla asignada' },
                { xtype: 'button', text: '', hidden: true, action: 'estadopanelactivado', itemId: 'estadopanelactivado', iconCls: 'icon-lock', tooltip: 'Estado del panel activado' },
                { xtype: 'button', text: '', hidden: true, action: 'estadopaneldesactivado', itemId: 'estadopaneldesactivado', iconCls: 'icon-lock-open', tooltip: 'Estado del panel desactivado' },
                { xtype: 'button', text: '', hidden: true, action: '', itemId: 'videolauncher', iconCls: 'icon-cctv-camera', tooltip: 'Ver video' },
                /*{ xtype: 'button', text: '', hidden:false, action: 'loggerlauncher', itemId:'loggerlauncher' ,iconCls: 'icon-telephone-link', tooltip: getLocale('Grabar llamada') },*/
                { xtype: 'button', text: 'Eventos mas recientes', hidden: true, action: 'eventosnuevos', itemId: 'eventosnuevos', iconCls: 'icon-bell-error', tooltip: 'Hay eventos mas recientes' },
                { xtype: 'button', text: '', hidden: false, action: 'legx', itemId: 'legx', iconCls: 'icon-page-red-text', tooltip: 'Legajo' },
                { xtype: 'button', text: 'Tiene victimarios', hidden: true, action: 'victimarios', itemId: 'victimarios', iconCls: 'icon-victimario', tooltip: 'Tiene victimarios' },
                { xtype: 'button', text: '', hidden: true, action: 'mInstrucciones', itemId: 'instruccionesCuenta', iconCls: 'icon-inscuenta', tooltip: 'Instrucciones de Cuenta' },
                { xtype: 'button', text: '', hidden: true, action: 'comment', itemId: 'comment', iconCls: 'icon-comment', tooltip: 'Nota' },
                {
                    xtype: 'button',
                    iconCls: 'icon-sound',
                    itemId: 'moresound',
                    text: 'Reproducir Audio',
                    hidden: true
                }
                , "->",
                { xtype: 'displayfield', value: getLocale('ATENCION'), hidden: true, itemId: 'msgatencion', cls: 'blink' },
                { xtype: 'button', text: '', hidden: true, action: 'msgfalsaalarma', itemId: 'msgfalsaalarma', iconCls: 'icon-date-error', tooltip: 'Se supero la cantidad de falsas alarma para esta cuenta' },
                { xtype: 'button', text: '', hidden: true, action: 'msgzonaprueba', itemId: 'msgzonaprueba', iconCls: 'icon-layout-error', tooltip: 'Zona en prueba' },
                { xtype: 'button', text: '', hidden: true, action: 'msgcuentaprueba', itemId: 'msgcuentaprueba', iconCls: 'icon-vcard-delete', tooltip: 'Cuenta en prueba' },
                { xtype: 'button', text: '', hidden: true, action: 'msgmoroso', itemId: 'msgmoroso', iconCls: 'icon-moneyguard-16', tooltip: 'Moroso' },
                { xtype: 'button', text: '', hidden: true, action: 'msgcuentaeliminar', itemId: 'msgcuentaeliminar', iconCls: 'icon-vcard-delete', tooltip: 'Solicitud de eliminacion de cuenta' },
                // { xtype: 'displayfield', text: '', hidden:true,  itemId:'msgfalsaalarma' ,iconCls: 'icon-lock',value: '<img src="/resources/global/images/icons/date_error.png"> ' }
            ],
            dock: 'bottom'
        });
        //if (this.showtoolbar){
        this.addDocked(toolbar);
        if (this.up('atencioneventoguiadoview')) //Esto se agrega por Monitoreo Guiado
            toolbar.hide();
        //}
    } // cierro init
});
Ext.define('DealerSearch' + '.view.EventoFormVertical', {
    extend: 'Common.view.EventoFormView',
    alias: ['widget.eventoformverticalview'],
    title: 'Evento',
    preventHeader: true,
    eventoformvertical: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: '100%',
    showtoolbar: true,
    autoScroll: true,
    fieldDefaults: {
        labelWidth: 120,
        anchor: '100%',
        labelAlign: 'left'
    },
    //bodyPadding :0,
    items: [
        {
            xtype: 'container',
            itemId: 'headerevento',
            width: '100%',
            margin: '0 0 10 0',
            defaults: {
                fieldStyle: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center"
                }
            },
            items: [
                {
                    xtype: 'displayfield',
                    name: 'cod_cdescripcion',
                    itemId: 'nombreevento',
                    renderer: function (value, field) {
                        var view = field.up('eventoformverticalview');
                        var record = view.record;
                        var nombre = '';
                        if (Ext.util.Format.trim(record.get('rec_calarma')) != '') {
                            nombre = record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion');
                        } else {
                            nombre = record.get('rec_cContenido');
                        }
                        var path = '/handler/getImage?u=/images/codala/' + record.get('rec_calarma') + '.png';
                        return '<img data-qtip="' + value + '" src="' + path + '"   width=16 height=16 onerror=\'this.style.display = "none"\'> ' + nombre;
                    },
                    fieldLabel: '',
                    width: '100%'
                }
            ]
        }, {
            xtype: 'displayfield',
            name: 'cue_clocalidad',
            fieldLabel: 'Localidad'
        }, {
            xtype: 'displayfield',
            name: 'rec_isoFechaHora',
            fieldLabel: 'Hora ingreso',
            renderer: function (value, metadata, record) {
                if (value) {
                    return Ext.Date.format(new Date(value), 'd/m/Y H:i:s');
                } else {
                    return '';
                }
            }
        }, {
            xtype: 'displayfield',
            name: 'rec_isoFechaHora',
            fieldLabel: 'Hora panel',
            renderer: function (value, metadata, record) {
                if (value) {
                    return Ext.Date.format(new Date(value), 'd/m/Y H:i:s');
                } else {
                    return '';
                }
            }
        }, {
            xtype: 'displayfield',
            name: 'Usuario_cnombre',
            fieldLabel: 'Usuario'
        }, {
            xtype: 'displayfield',
            name: '_zon_cdescripcion',
            fieldLabel: 'Zona'
        }, {
            xtype: 'displayfield',
            //name : '_puerto',
            itemId: 'puerto',
            fieldLabel: 'Origen'
        }, {
            xtype: 'displayfield',
            name: 'rec_iprioridad',
            fieldLabel: 'Prioridad'
        }, {
            xtype: 'displayfield',
            name: 'rec_cContenido',
            itemId: 'rec_ccontenido',
            fieldLabel: 'Contenido',
            hidden: true
        },
        {
            xtype: 'displayfield',
            name: 'lin_crazonsocial',
            fieldLabel: '',
            itemId: 'lin_crazonsocial',
            width: '100%',
            hidden: true
        }, {
            xtype: 'displayfield',
            value: getLocale('Acumulado'),
            itemId: 'acumuladolabel',
            width: '100%',
            style: {
                backgroundColor: "#003366",
                color: "#FFFFFF"
            },
            fieldStyle: {
                backgroundColor: "#003366",
                color: "#FFFFFF"
            }
        }, {
            xtype: 'displayfield',
            name: '_acumulado',
            itemId: 'acumulado',
            flex: 1,
            fieldLabel: ''
        }, {
            xtype: 'displayfield',
            flex: 1,
            itemId: 'timer',
            fieldLabel: ''
        }
    ],
    initComponent: function () {
        this.callParent();
        this.down('toolbar').hide();
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                { xtype: 'button', text: '', hidden: true, action: 'logx', itemId: 'logxe', iconCls: 'icon-page-white-text', tooltip: 'Log' },
                { xtype: 'button', text: '', hidden: true, action: 'estadopanelactivado', itemId: 'estadopanelactivadoe', iconCls: 'icon-lock', tooltip: 'Estado del panel activado' },
                { xtype: 'button', text: '', hidden: true, action: 'estadopaneldesactivado', itemId: 'estadopaneldesactivadoe', iconCls: 'icon-lock-open', tooltip: 'Estado del panel desactivado' }
            ],
            dock: 'bottom'
        });
        this.addDocked(toolbar);
    } // cierro init
});