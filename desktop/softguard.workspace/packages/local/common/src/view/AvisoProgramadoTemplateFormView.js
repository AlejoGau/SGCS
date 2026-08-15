//MIGRADO2024
Ext.define( 'Common.view.AvisoProgramadoTemplateFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.avisoprogramadotemplateformview' ],
    title: '',
    autoScroll: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelWidth: 150,
        labelAlign: 'left',
        editable: false,
        width: '100%'
    },
    //layout: 'vbox',
    items: [
        {
            xtype: 'textfield',
            name: 'Name',
            fieldLabel: 'Asunto',
            labelWidth: 100,
            itemId: 'name',
            allowBlank: false
        }, {
            xtype: 'fieldset',
            title: 'Destinatarios',
            width: '100%',
            items: [
                {
                    xtype: 'button',
                    text: 'Agregar mi usuario',
                    itemId: 'agregaryo',
                    margin: '5 0 5 0'
              }, {
                    xtype: 'textarea',
                    name: 'prg_to',
                    itemId: 'to',
                    allowBlank: false,
                    width: '100%',
                }
            ]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 0 5 0',
            items: [
                {
                    xtype: 'button',
                    text: 'Datos del template',
                    margin: '0 5 0 0',
                    menu: {
                        xtype: 'menu',
                        width: 200,
                        itemId: 'etiquetas',
                        items: [
                        ]
                    },
                    maxWidth: 200,
                    hidden: true
                }, {
                    xtype: 'button',
                    text: 'Datos del contrato',
                    menu: {
                        xtype: 'menu',
                        width: 200,
                        itemId: 'etiquetasfijas',
                        items: [
                        ]
                    },
                    maxWidth: 200
                }
            ]
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Cuerpo'
        }, {
            xtype: 'htmleditor',
            name: 'prg_mensaje',
            fieldLabel: '',
            itemId: 'editor',
            flex: 1,
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
                    var view = editor.up( 'avisoprogramadotemplateformview' );
                    var record = view.record;
                    record.set( 'prg_mensaje', html );
                }
            }
        }, {
            xtype: 'combo',
            store: [
                [ 0, getLocale( 'Pendiente' ) ],
                [ 1, getLocale( 'Activo' ) ]
            ],
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Estado',
            lastQuery: '',
            name: 'prg_estado',
            value: 1,
            disabled: true,
            hidden: true
        }, {
            xtype: 'checkbox',
            fieldLabel: 'Adjuntar Contrato',
            itemId: 'adjuntarcontrato',
            hidden: true
        }
    ],
    initComponent: function() {
        this.callParent();
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    itemId: 'save'
                }
            ]
        });
        this.addDocked( toolbar );
    }
});