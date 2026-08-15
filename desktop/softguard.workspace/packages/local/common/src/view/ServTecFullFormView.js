//MIGRADO2024
Ext.define( 'Common.view.ServTecFullFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.sertecfullformview' ],
    preventHeader: true,
    frame: true,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 150,
        anchor: '100%'
    },
    autoScroll: true,
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 10 0',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Tipo de servicio',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: true,
                    editable: false,
                    store: 'tip_ntipoStore',
                    itemId: "tiposervicio",
                    width: '49%',
                    valueField: 'Value',
                    displayField: 'Name',
                    name: "tip_ntipo"
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Servicio',
                    displayField: 'tip_cdescripcion',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: true,
                    editable: false,
                    valueField: 'tip_ccodigo',
                    name: "stc_ctipo_servicio",
                    itemId: "servicio",
                    width: '49%',
                    margin: '0 0 0 10',
                    labelWidth: 50,
                    allowBlank: false,
                    listeners: {
                        change: function() {
                            if( this.getValue() == '' ) {
                                this.up( 'sertecfullformview' ).down( '#save' ).setDisabled( true )
                            } else {
                                this.up( 'sertecfullformview' ).down( '#save' ).setDisabled( false )
                            }
                        }
                    }
                }
            ]
        },
        {
            xtype: 'container',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Estado',
                            itemId: 'stc_nestado',
                            width: '49%',
                            name: "stc_nestado",
                            /*  store: [
                                  [1,getLocale('Pendiente')],
                                  [2,getLocale('Asignado')],
                                  [3,getLocale('Cancelado')],
                                  [4,getLocale('Finalizado')],
                                  [5,getLocale('En Ejecución')],
                                  
                                  ]*/
                            renderer: function( value, object, record ) {
                                if( value == 1 ) {
                                    return getLocale( 'Pendiente' );
                                }
                                else if( value == 2 ) {
                                    return getLocale( 'Asignado' );
                                }
                                else if( value == 3 ) {
                                    return getLocale( 'Cancelado' );
                                }
                                else if( value == 4 ) {
                                    return getLocale( 'Finalizado' );
                                }
                                else if( value == 5 ) {
                                    return getLocale( 'En Ejecución' );
                                }
                                else if( value == 6 ) {
                                    return getLocale( 'En Camino' );
                                }
                            },
                        }, {
                            xtype: 'combobox',
                            displayField: 'stc_iPrioridad',
                            queryMode: 'local',
                            forceSelection: true,
                            multiSelect: false,
                            editable: false,
                            name: 'stc_iPrioridad',
                            valueField: 'stc_iPrioridad',
                            itemId: 'prioridad',
                            fieldLabel: 'Prioridad',
                            store: [
                                [ 0, getLocale( 'Alta' ) ],
                                [ 1, getLocale( 'Media' ) ],
                                [ 2, getLocale( 'BajaP' ) ]
                            ]
                        }
                    ]
                }
                , {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [ {
                        xtype: 'combo',
                        fieldLabel: 'Contacto',
                        displayField: 'tel_cnombre',
                        queryMode: 'local',
                        forceSelection: false,
                        allowBlank: true,
                        editable: true,
                        valueField: 'tel_cnombre',
                        name: "stc_ccontacto",
                        itemId: "contacto"
                    }, {
                            xtype: 'displayfield',
                            fieldLabel: '',
                            value: getLocale( 'Si en la lista no se encuentra el usuario, puede escribirlo.' ),
                            margin: '0 0 0 10'
                        }]
                }, {
                    xtype: 'displayfield',
                    name: 'stf_dfecha_vto_orden',
                    itemId: 'fechadevencimiento',
                    fieldLabel: 'Vencimiento',
                    flex: 1,
                    renderer: function( value ) {
                        return Ext.Date.format( new Date( value ), 'd/m/Y' )
                    },
                    hidden: true
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            name: 'stc_yValor',
                            fieldLabel: 'Valor',
                            allowDecimals: true,
                            alwaysDisplayDecimals: true,
                            hideTrigger: true,
                            anchor: '49%',
                            itemId: 'precio'
                        }, {
                            xtype: 'numberfield',
                            name: 'stc_nvalorpagotecnico',
                            fieldLabel: 'Valor pago técnico',
                            allowDecimals: true,
                            alwaysDisplayDecimals: true,
                            hideTrigger: true,
                            anchor: '49%',
                            itemId: 'stc_nvalorpagotecnico'
                        }
                    ]
                }, {
                    xtype: 'numberfield',
                    name: 'stc_ncostomanodeobra',
                    fieldLabel: 'Costo mano de obra',
                    allowDecimals: true,
                    alwaysDisplayDecimals: true,
                    hideTrigger: true,
                    anchor: '100%',
                    itemId: 'stc_ncostomanodeobra'
                },{
                    xtype: 'combo',
                    name: 'stc_iOrganizacion',
                    fieldLabel: 'Empresa',
                    hidden: true,
                    editable: false,
                    forceSelection: false,
                    queryMode: 'local',
                    itemId: 'stc_iOrganizacion',
                    pageSize: 10000,
                    displayField: 'Name',
                    valueField: 'Id'

                }, {
                    xtype: 'datefield',
                    name: 'stc_dfechapago',
                    fieldLabel: 'Fecha de pago',
                    anchor: '100%',
                    allowBlank: true,
                    itemId: 'stc_dfechapago'
                }
            ]
        }, {
            xtype: 'textarea',
            name: 'stc_mobservaciones',
            fieldLabel: 'Observaciones'
        }, {
            xtype: 'htmleditor',
            name: 'stc_cconformidad_html',
            fieldLabel: getLocale( 'Conformidad' ),
            height: 200,
            getDocMarkup: function() {
                var me = this,
                    h = me.iframeEl.getHeight() - me.iframePad * 2,
                    oldIE = ( Ext.isIE6 || Ext.isIE7 || Ext.isIE8 );
                // - IE9+ require a strict doctype otherwise text outside visible area can't be selected.
                // - Opera inserts <P> tags on Return key, so P margins must be removed to void double line-height.
                // - On browsers other than IE, the font is not inherited by the IFRAME so it must be specified.
                return Ext.String.format(
                    ( oldIE ? '' : '<!DOCTYPE html>' )
                    + '<html><head><style type="text/css">'
                    + 'table {' +
                    '  border:1px solid black;' +
                    '  border-collapse:collapse;' +
                    '  width:100%;' +
                    '  margin: 0 0 15px 0;' +
                    ' }' +
                    'td {' +
                    ' border:1px solid black;  ' +
                    '  min-height:30px;' +
                    ' padding:1px;' +
                    '  font-size:12px;' +
                    ' }' +
                    ' th {' +
                    '  background:#e7e7e7;' +
                    ' padding:2px;' +
                    ' border:0;' +
                    ' font-size:14px;' +
                    ' }' +
                    ' .firma {' +
                    '     height:40px;' +
                    '     vertical-align:top;' +
                    '  }'
                    + ( Ext.isOpera ? 'p{margin:0}' : '' )
                    + 'body{border:0;margin:0;padding:{0}px;'
                    + ( oldIE ? '' : 'min-' )
                    + 'height:{1}px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:text;background-color:white;'
                    + ( Ext.isIE ? '' : 'font-size:12px;font-family:{2}' )
                    + '}</style></head><body></body></html>'
                    , me.iframePad, h, me.defaultFont );
            },
            listeners: {
                sync: function( editor, html ) {
                    var view = editor.up( 'sertecfullformview' );
                    var record = view.record;
                    record.set( 'stc_cconformidad_html', html );
                }
            }
        }
    ],
    initComponent: function() {
        //this.addEvents( 'objectchanged' );
        this.callParent( arguments );
        // agrego la toolbar
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Guardar',
                    action: 'save',
                    itemId: 'save',
                    iconCls: 'icon-disk',
                    disabled: true
                }, "-",
                {
                    text: 'Finalizar',
                    action: 'finalizar',
                    itemId: 'finalizar',
                    iconCls: 'icon-tick'
                },
                {
                    text: 'Cancelar',
                    action: 'cancelar',
                    itemId: 'cancelar',
                    iconCls: 'icon-cancel'
                },
                {
                    text: 'Pendiente',
                    action: 'pendiente',
                    itemId: 'pendiente',
                    iconCls: 'icon-hourglass'
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    } // cierro init
});