Ext.define('ResourceModule.view.ResourceFormAsignacionDevolverView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.resourceformasignaciondevolverview',
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
                    xtype: 'displayfield',
                    fieldStyle: 'background-color: #fff;',
                    itemId: 'integranteDevuelve',
                    flex: 1,
                    labelAlign: 'top',
                    fieldLabel: 'Usuario que devuelve'
                }, {
                    xtype: 'tbseparator',
                    margin: '0 15 0 15'
                }, {
                    xtype: 'displayfield',
                    fieldStyle: 'background-color: #fff;',
                    name: 'rmo_cNombre',
                    itemId: 'recursoDevolver',
                    flex: 1,
                    labelAlign: 'top',
                    fieldLabel: 'Recurso'
                }
            ]
        }, {
            xtype: 'fieldset',
            height: 100,
            layout: 'hbox',
            items: [
                {
                    xtype: 'datetimefield',
                    fieldLabel: 'Fecha de Devolución',
                    itemId: 'rmo_tfechaentrega',
                    name: 'rmo_tfechaentrega',
                    allowBlank: true
                }, {
                    xtype: 'tbseparator',
                    margin: '0 15 0 15'
                }, {
                    xtype: 'datetimefield',
                    itemId: 'rmo_tfechadevolucion',
                    name: 'rmo_tfechadevolucion',
                    readOnly: true,
                    fieldLabel: 'Fecha esperada'
                }
            ]
        }, {
            xtype: 'textarea',
            name: 'rmo_cObservacion',
            width: '100%',
            fieldLabel: 'Observaciones',
            labelWidth: 150,
            readOnly: true,
        }, {
            xtype: 'fieldcontainer',
            itemId: 'archivoContainer',
            fieldLabel: 'Información del recurso',
            width: '100%',
            labelWidth: 150,
            layout: 'hbox',
            items: [
                {
                    xtype: 'button',
                    text: 'Ver',
                    itemId: 'btnVerInfo'
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