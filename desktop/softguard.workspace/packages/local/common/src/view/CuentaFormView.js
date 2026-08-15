//MIGRADO2024
Ext.define( 'Common.view.CuentaFormView', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.cuentaformview',
    //title : 'Vehículo',
    bodyPadding: 0,
    border: 0,
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'cuentanumeroformview',
            margin: 5
        },// cierro container

        {
            xtype: 'form',

            collapsible: true,
            title: 'Dirección',
            height: 240,
            width: 500,
            bodyPadding: 5,
            layout: 'anchor',
            fieldDefaults: {
                anchor: '100%',
                labelWidth: 150,
                bindToModel: true
            },
            itemId: 'direccion',
            items: [ {
                xtype: 'textfield',
                fieldLabel: 'Calle',
                name: "cue_ccalle",
                itemId: 'calle'
            }, {
                    xtype: 'textfield',
                    fieldLabel: 'Ciudad',
                    name: "cue_clocalidad"
                },
                {
                    xtype: 'selecterfield',
                    itemId: 'provincias',
                    simpleSelect: true,
                    config: {
                        disponible: {
                            title: 'Provincia',
                            field: 'pro_cdescripcion'
                        },
                        selecionado: {
                            title: 'Provincia',
                            field: 'pro_cdescripcion'
                        },
                        valueField: 'pro_ccodigo',
                        modelItems: 'Common.model.t_provinciasSearchModel'
                    },
                    title: 'Provincia'
                },
                {
                    xtype: 'fieldset',
                    title: 'Buenos Aires, Partido y localidad',
                    itemId: 'OPGSP',
                    padding: '5 5 5 5',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Partido',
                            displayField: 'OPGSP_cPartido',
                            queryMode: 'local',
                            valueField: 'OPGSP_idPartido',
                            itemId: 'OPGSP_Partido',
                            name: 'OPGSP_Partido',
                            plugins: [ 'clearbutton' ],
                            flex: 1
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Localidad',
                            displayField: 'OPGSP_cLocalidad',
                            queryMode: 'local',
                            valueField: 'OPGSP_idLocalidad',
                            itemId: 'OPGSP_Localidad',
                            name: 'OPGSP_Localidad',
                            plugins: [ 'clearbutton' ],
                            labelAlign: 'right',
                            flex: 1
                        }
                    ]
                }
                , {
                    xtype: 'textfield',
                    fieldLabel: 'Código postal / Zip',
                    name: "cue_ccodigopostal"
                }
            ]
        },// cierro panel direcciones
        {
            xtype: 'direntregaview',

            collapsible: true,
            collapsed: true,
            height: 160,
            itemId: 'direccionentrega'
        },// cierro panel direccione entrega
        {
            xtype: 'cuentadatosformview',
            collapsible: true,
            title: 'Datos'
        },	// cierro panel datos
        {
            xtype: 'form',

            collapsible: true,
            title: 'Datos extra',
            bodyPadding: 5,
            layout: 'anchor',
            itemId: 'datosextra',

            fieldDefaults: {
                anchor: '100%',
                labelWidth: 150,
                bindToModel: true
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'top'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Acceso Web',
                                    store: 'SiNoStore',
                                    displayField: 'Name',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    labelWidth: 100,
                                    valueField: 'Value',
                                    name: "cue_nllaveul",
                                    hidden: true,
                                    itemId: 'accesoweb'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Llave',
                                            store: 'SiNoStore',
                                            displayField: 'Name',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            editable: false,
                                            valueField: 'Value',
                                            name: "cue_nsonidoul",
                                            hidden: true,
                                            labelWidth: 100,
                                            flex: 1,
                                            itemId: 'llave'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Más información',
                                            disabled: true,
                                            iconCls: 'icon-key',
                                            action: 'keyMasInfo',
                                            itemId: 'keyMasInfo',
                                            margin: '0 0 0 5'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Relevancia',
                                    labelAlign: 'right',
                                    store: [
                                        [ 1, getLocale( 'Alta prioridad' ) ],
                                        [ 2, getLocale( 'Media prioridad' ) ],
                                        [ 3, getLocale( 'Baja prioridad' ) ],
                                        [ 4, getLocale( 'No controla prioridad' ) ],
                                    ],
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    name: "cue_iImportancia",
                                    itemId: 'cue_iImportancia'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Tipo de servicio',
                                    labelAlign: 'right',
                                    displayField: 'cts_cnombre',
                                    valueField: 'Id',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    name: "cue_iTipoServicio",
                                    itemId: 'cue_iTipoServicio'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Mostrar foto principal',
                                    store: 'SiNoStore',
                                    labelAlign: 'right',
                                    displayField: 'Name',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    valueField: 'Value',
                                    name: "cue_nmostrar",
                                    hidden: true,
                                    itemId: 'mostrarfoto'
                                }, {
                                    xtype: 'textfield',
                                    labelAlign: 'right',
                                    name: 'cue_cCustom',
                                    itemId: 'fieldCustom'
                                }
                            ]
                        }
                    ]
                }
            ]
        },// cierro panel direcciones

        {
            xtype: 'cuentanotifiacionesformview',
            title: 'Notificaciones',
            itemId: 'notifiacionespanel',
            hidden: true
        }
    ],
    // cierro items
    initComponent: function() {
        this.callParent();
        this.down( 'cuentadatosformview' ).record = this.record;
        this.down( 'cuentadatosformview' ).filterTipo = this.filterTipo;
        this.down( 'cuentanumeroformview' ).record = this.record;


        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [ {
                text: 'Guardar',
                iconCls: 'save',
                itemId: 'save',
                action: 'save'
            }, {
                    text: 'Solicitar cambio',
                    iconCls: 'save',
                    itemId: 'solitarcambio',
                    action: 'solitarcambio',
                    hidden: true
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    text: 'Cambiar Clave',
                    itemId: 'passwordChange',
                    iconCls: 'icon-passwordChange',
                    action: 'passwordChange',
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Foto',
                    iconCls: 'icon-photo',
                    action: 'photo'
                }, {
                    xtype: 'button',
                    text: 'Mapa',
                    iconCls: 'icon-map',
                    action: 'map'

                }/*, {
					xtype : 'button',
					text : 'Auditoría',
					iconCls : 'icon-audit',
					action: 'audit'

				}*/, {
                    xtype: 'button',
                    text: getLocale( 'Exportar datos de la cuenta' ),
                    itemId: 'btnExportar',
                    action: 'export',
                    iconCls: 'icon-page-excel'
                }
            ]
        });
        this.addDocked( toolbar );
    }

});



/*
  __      ___       _                 _             _ 
 \ \    / (_)     (_)               | |           | |
  \ \  / / _  __ _ _  ___ ___  _ __ | |_ _ __ ___ | |
   \ \/ / | |/ _` | |/ __/ _ \| '_ \| __| '__/ _ \| |
    \  /  | | (_| | | (_| (_) | | | | |_| | | (_) | |
     \/   |_|\__, |_|\___\___/|_| |_|\__|_|  \___/|_|
              __/ |                                  
             |___/                                   
             
*/

Ext.define( 'Common.view.SmartTrackCuentaFormView', {
    extend: 'Common.view.CuentaFormView',
    //extend : 'Ext.form.FormPanel',
    alias: 'widget.smarttrackcuentaformview',
    //title : 'Vehículo',
    bodyPadding: 0,
    border: 0,
    autoScroll: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        autoSize: true,
        shrinkToFit: false
    },

    items: [
        {
            xtype: 'cuentanumeroformview',
            margin: 5
        },// cierro container
        {
            xtype: 'form',

            collapsible: true,
            title: 'Dirección',
            height: 240,
            width: 500,
            bodyPadding: 5,
            layout: 'anchor',
            fieldDefaults: {
                anchor: '100%',
                labelWidth: 150,
                bindToModel: true
            },
            itemId: 'direccion',
            items: [ {
                xtype: 'textfield',
                fieldLabel: 'Calle',
                name: "cue_ccalle"
            }, {
                    xtype: 'textfield',
                    fieldLabel: 'Ciudad',
                    name: "cue_clocalidad"
                },
                {
                    xtype: 'selecterfield',
                    itemId: 'provincias',
                    simpleSelect: true,
                    config: {
                        disponible: {
                            title: 'Provincia',
                            field: 'pro_cdescripcion'
                        },
                        selecionado: {
                            title: 'Provincia',
                            field: 'pro_cdescripcion'
                        },
                        valueField: 'pro_ccodigo',
                        modelItems: 'Common.model.t_provinciasSearchModel'
                    },
                    title: 'Provincia'
                },
                {
                    xtype: 'fieldset',
                    title: 'Buenos Aires, Partido y localidad',
                    itemId: 'OPGSP',
                    padding: '5 5 5 5',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Partido',
                            displayField: 'OPGSP_cPartido',
                            queryMode: 'local',
                            valueField: 'OPGSP_idPartido',
                            itemId: 'OPGSP_Partido',
                            name: 'OPGSP_Partido',
                            plugins: [ 'clearbutton' ],
                            flex: 1
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Localidad',
                            displayField: 'OPGSP_cLocalidad',
                            queryMode: 'local',
                            valueField: 'OPGSP_idLocalidad',
                            itemId: 'OPGSP_Localidad',
                            name: 'OPGSP_Localidad',
                            plugins: [ 'clearbutton' ],
                            labelAlign: 'right',
                            flex: 1
                        }
                    ]
                }
                , {
                    xtype: 'textfield',
                    fieldLabel: 'Código postal / Zip',
                    name: "cue_ccodigopostal"
                }
            ]
        },// cierro panel direcciones

        {
            xtype: 'direntregaview',
            collapsible: true,
            collapsed: true,
            height: 160,
            itemId: 'direccionentrega'
        },// cierro panel direccione entrega

        /*
        Comento esto porque aparecía duplicado en CleanApp y VigiControl fjalil 1/12/2023
        {
            xtype: 'cuentadatosformview',
            collapsible: true,
            title: 'Datos'
        },	*/
        {
            xtype: 'smarttrackcuentadatosformview',
            collapsible: true,
            title: 'Datos'
        },	// cierro panel datos
        {
            xtype: 'form',
            collapsible: true,
            title: 'Datos extra',
            bodyPadding: 5,
            layout: 'anchor',
            itemId: 'datosextra',
            hidden: true,
            fieldDefaults: {
                anchor: '100%',
                labelWidth: 150,
                bindToModel: true
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'top'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Acceso Web',
                                    store: 'SiNoStore',
                                    displayField: 'Name',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    labelWidth: 100,
                                    valueField: 'Value',
                                    name: "cue_nllaveul",
                                    hidden: true,
                                    itemId: 'accesoweb'
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Llave',
                                            store: 'SiNoStore',
                                            displayField: 'Name',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            editable: false,
                                            valueField: 'Value',
                                            name: "cue_nsonidoul",
                                            hidden: true,
                                            labelWidth: 100,
                                            flex: 1,
                                            itemId: 'llave'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Más información',
                                            disabled: true,
                                            iconCls: 'icon-key',
                                            action: 'keyMasInfo',
                                            itemId: 'keyMasInfo',
                                            margin: '0 0 0 5'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Relevancia',
                            flex: 1,
                            labelAlign: 'right',
                            store: [
                                [ 1, getLocale( 'Alta prioridad' ) ],
                                [ 2, getLocale( 'Media prioridad' ) ],
                                [ 3, getLocale( 'Baja prioridad' ) ],
                                [ 4, getLocale( 'No controla prioridad' ) ],
                            ],
                            queryMode: 'local',
                            forceSelection: true,
                            editable: false,
                            name: "cue_iImportancia",
                            itemId: 'cue_iImportancia'
                        }, {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Mostrar foto principal',
                                    store: 'SiNoStore',
                                    labelAlign: 'right',
                                    displayField: 'Name',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    editable: false,
                                    valueField: 'Value',
                                    name: "cue_nmostrar",
                                    hidden: true,
                                    itemId: 'mostrarfoto'
                                }, {
                                    xtype: 'textfield',
                                    labelAlign: 'right',
                                    name: 'cue_cCustom',
                                    itemId: 'fieldCustom'
                                }
                            ]
                        }
                    ]
                }
            ]
        },// cierro panel direcciones
        {
            xtype: 'cuentanotifiacionesformview',
            title: 'Notificaciones',
            itemId: 'notifiacionespanel',
            hidden: true
        }
    ]
});
