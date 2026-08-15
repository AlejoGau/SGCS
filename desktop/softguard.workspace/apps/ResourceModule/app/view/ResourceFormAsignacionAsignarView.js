Ext.define('ResourceModule.view.ResourceFormAsignacionAsignarView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.resourceformasignacionasignarview',
    //title: 'Asignar Recurso',
    bodyPadding: 5,
    bodyStyle: 'background-color: #d0d0d062;',
    style: 'background-color: #d0d0d062;',
    height: '100%',
    fieldDefaults: {
        labelWidth: 110,
        //fieldStyle: 'background-color: #fff;'
    },
    border: 0,
    layout: {
        type: 'vbox',
        //align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            height: 100,
            width: '100%',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    name: 'rmo_cNombre',
                    readOnly: true,
                    flex: 1,
                    labelAlign: 'top',
                    fieldLabel: 'Recurso a asignar'
                }, {
                    xtype: 'tbseparator',
                    margin: '0 15 0 15'
                }, {
                    xtype: 'combobox',
                    name: 'rmo_rmbidkey',
                    itemId: 'comboIntegrante',
                    allowBlank: false,
                    queryMode: 'local',
                    displayField: 'rmb_cNombre',
                    valueField: 'Id',
                    flex: 2,
                    labelAlign: 'top',
                    fieldLabel: 'Integrante que recibirá'
                }
            ]
        }, {
            xtype: 'fieldset',
            height: 100,
            layout: 'hbox',
            items: [
                {
                    xtype: 'datetimefield',
                    itemId: 'rmo_tfechaasignacion',
                    name: 'rmo_tfechaasignacion',
                    fieldLabel: 'Fecha de entrega',
                    allowBlank: false,
                    value: new Date()
                }, {
                    xtype: 'tbseparator',
                    margin: '0 15 0 15'
                }, {
                    xtype: 'datetimefield',
                    itemId: 'rmo_tfechadevolucion',
                    name: 'rmo_tfechadevolucion',
                    allowBlank: false,
                    value: null,
                    //readOnly: true,
                    fieldLabel: 'Fecha devolución'
                }
            ]
        }, {
            xtype: 'textarea',
            name: 'rmo_cObservacion',
            width: '100%',
            fieldLabel: 'Observaciones',
            readOnly: true,
        }, {
            xtype: 'container',
            itemId: 'archivoContainer',
            layout: 'hbox',
            items: [
                {
                    xtype: 'label',
                    text: 'Documentos adjuntos:'
                }, {
                    xtype: 'label',
                    itemId: 'labelNomArchivo'
                }
            ]
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
        }
    ]
});