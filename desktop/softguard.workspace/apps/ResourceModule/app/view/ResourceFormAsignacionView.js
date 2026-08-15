Ext.define('ResourceModule.view.ResourceFormAsignacionView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.resourceformasignacionview',
    itemId: 'resourceformasignacionview',
    bodyPadding: 5,
    bodyStyle: 'background-color: #d0d0d062;',
    style: 'background-color: #d0d0d062;',
    fieldDefaults: {
        labelWidth: 140,
        fieldStyle: 'background-color: #fff;'
    },
    border: 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            style: 'background-color: transparent;',
            layout: 'hbox',
            items: [
                {
                    xtype: 'displayfield',
                    flex: 1,
                    name: 'rmo_cNombre',
                    fieldStyle: 'font-size:16px;font-weight: bold;'
                }
            ]

        },
        {
            xtype: 'container',
            layout: 'hbox',
            style: 'background-color: transparent;',
            items: [
                {
                    xtype: 'container',
                    style: 'background-color: transparent;',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    padding: '0 15 0 0',
                    items: [
                        {
                            xtype: 'displayfield',
                            width: '100%',
                            name: 'estadoStr',
                            fieldStyle: 'font-size: 16px; background: #2896df; color: #ffffff; text-align: center; padding: 6px; border-radius: 4px;'
                        }, {
                            xtype: 'displayfield',
                            itemId: 'integrante',//el member que tiene el recurso asignado
                            fieldLabel: 'Usuario'
                        }
                    ]
                }, {
                    xtype: 'tbseparator', // Built-in Ext JS vertical toolbar separator
                    margin: '0 15 0 15'
                }, {
                    xtype: 'container',
                    layout: 'vbox',
                    style: 'background-color: transparent;',
                    flex: 1,
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Fecha asignación',
                            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
                            name: 'rmo_tfechaasignacion'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Fecha devolución',
                            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
                            name: 'rmo_tfechadevolucion'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            collapsible: true,
            style: 'background-color: transparent;',
            title: 'Información del recurso',
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    style: 'background-color: transparent;',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            style: 'background-color: transparent;',
                            flex: 3,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Tipo de recurso',
                                    name: 'rmt_cNombre'
                                }, {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Cuenta',
                                    name: 'cuentaVinculada'
                                }, {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Marca y modelo',
                                    name: 'rmo_cMarcaModelo'

                                }, {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Número de serie',
                                    name: 'rmo_cNumeroSerie'
                                },
                            ]
                        }, {
                            xtype: 'tbseparator', // Built-in Ext JS vertical toolbar separator
                            margin: '0 15 0 15'

                        }, {
                            xtype: 'container',
                            style: 'background-color: transparent;',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'center', // Centers horizontally
                                pack: 'center'   // Centers vertically
                            },
                            padding: '0 15 0 0',

                            items: [
                                {
                                    xtype: 'image',
                                    src: 'data:image/png;base64,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',
                                    layout: 'vbox',
                                    minHeight: 150,
                                    maxHeight: 250,
                                    minWidth: 150,
                                    maxWidth: 250,
                                    itemId: 'imagen'
                                }
                            ]
                        }
                    ]
                }, {

                    xtype: 'displayfield',
                    fieldLabel: 'Observaciones',
                    width: '100%',
                    name: 'rmo_cObservacion',
                    height: 100,
                    anchor: '100%',
                    fieldBodyCls: 'x-form-trigger-wrap-default x-form-text x-form-text-default',
                    fieldStyle: 'white-space: pre-wrap; overflow-y: auto; padding: 5px;'

                }
            ]
        }, {

        }
    ],
    buttons: [
        {
            text: 'Cerrar',
            action: 'cancel'
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

        if (!Ext.util.CSS.getRule('.btn-icon-green')) {
            Ext.util.CSS.createStyleSheet(
                '.btn-icon-green { color: #2ecc71 !important; } .btn-icon-yellow { color: #f1c40f !important; }',
                'btn-icon-styles'
            );
        }

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            dock: 'top',
            defaults: { scale: 'medium' },
            items: [{
                text: 'Asignar',
                itemId: 'asignar',
                action: 'asignar',
                iconCls: 'x-fa fa-redo btn-icon-green'
            }, {
                text: 'Devolver',
                itemId: 'devolver',
                action: 'devolver',
                iconCls: 'x-fa fa-undo btn-icon-yellow'
            },
                '->',
            {
                text: '[Opciones]',
                action: 'opciones',
                iconCls: 'x-fa fa-cog',
                items: [

                ]
            }
            ]
        });
        me.addDocked(toolbar);

    }
});