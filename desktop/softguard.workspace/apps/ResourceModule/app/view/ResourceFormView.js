Ext.define('ResourceModule.view.ResourceFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.resourceformview',
    itemId: 'resourceformview',
    bodyPadding: 5,
    config: {

    },
    fieldDefaults: {
        labelWidth: 150
    },
    border: 0,
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'combo',
            name: 'rmo_iTypeId',
            itemId: 'tipoRecursoCombo',
            allowBlank: false,
            fieldLabel: 'Tipo de Recurso',
            valueField: 'Id',
            displayField: 'rmt_cNombre',
            queryMode: 'local'
        },
        {

            xtype: 'textfield',
            allowBlank: false,
            name: 'rmo_cNombre',
            fieldLabel: 'Nombre',
        }, {
            xtype: 'selecterfield',
            itemId: 'cuenta',
            hidden: true,
            simpleSelect: true,
            config: {
                disponible: {

                    title: 'Cuenta',
                    field: '_fullname',
                    searchField: 'cue_cnombre',
                    deleteLike: true
                },
                selecionado: {
                    title: 'Cuenta',
                    field: '_fullname'
                },
                valueField: 'cue_iid',
                modelItems: 'Common.model.CuentaSearchModel'
            },
            /*filter: [ {
                property: 'tip_ntipo:ININT',
                value: '7,8'
            }],*/
            title: 'Cuenta Vinculada',


        }, {
            xtype: 'fieldset',
            title: 'Opcionales',
            defaults: {
                labelWidth: 140
            },
            items: [
                {
                    xtype: 'textarea',
                    name: 'rmo_cObservacion',
                    fieldLabel: 'Observaciones',
                }, {
                    xtype: 'textfield',
                    name: 'rmo_cMarcaModelo',
                    allowBlank: false,
                    fieldLabel: 'Marca y modelo',
                }, {
                    xtype: 'textfield',
                    name: 'rmo_cNumeroSerie',
                    allowBlank: false,
                    fieldLabel: 'Número de serie',
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'column',
                        align: 'middle'
                    },
                    itemId: 'archivoContainer',
                    items: [
                        {
                            xtype: 'label',
                            columnWidth: 0.35,
                            text: 'Imagen:',
                            width: 140,
                            cls: 'x-form-item-label x-form-item-label-default'
                        },
                        {

                            xtype: 'image',
                            columnWidth: 0.10,
                            src: 'data:image/png;base64,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',
                            minHeight: 50,
                            maxHeight: 50,
                            minWidth: 50,
                            maxWidth: 50,
                            name: 'imagen',
                            itemId: 'imagen',
                            margin: '0 10 0 0'
                        }
                    ]
                }
            ]

        },
        {
            xtype: 'textfield',
            fieldLabel: 'Notificar',
            triggers: {
                info: {
                    baseCls: 'x-fa fa-info-circle',
                    clearCls: true,
                    weight: 1,
                    handler: function () {
                    }
                }
            },
            listeners: {
                render: function (field) {
                    var infoEl = field.getTrigger('info').getEl();

                    Ext.create('Ext.tip.ToolTip', {
                        target: infoEl,
                        title: 'Tip',
                        html: 'En de cambios significativos en el recurso',
                        anchor: 'left',
                        showDelay: 100
                    });
                }
            }
        }
    ],
    buttons: [
        {
            text: 'Cancelar',
            action: 'cancel'
        },

        {
            text: 'Guardar',
            action: 'save'
        },
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});