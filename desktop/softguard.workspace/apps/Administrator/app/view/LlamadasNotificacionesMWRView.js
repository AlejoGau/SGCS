Ext.define( "Administrator.view.LlamadasNotificacionesMWRView", {
    extend: "Ext.form.Panel",
    title: "Llamadas y notificaciones",
    alias: "widget.LlamadasNotificacionesMWRView",
    autoScroll: !0,
    items: [
        {
            xtype: "fieldset",
            title: "Notificacion manual por SMS",
            items: [ {
                xtype: "checkbox",
                fieldLabel: "Envio masivo de SMS",
                itemId: "enviosmsmasivo"
            }, {
                    xtype: "checkbox",
                    fieldLabel: "Envio de SMS",
                    itemId: "enviosmssimple"
                }]
        }, {
            xtype: "fieldset",
            title: "Marcacion automatica",
            itemId: "protocolos",
            items: []
        },
        {
            xtype: "fieldset",
            title: "Net2Phone",
            itemId: 'Net2Phone',
            padding: '5 5 5 5',
            hidden: true,
            items: [
                {
                    xtype: "textfield",
                    name: "net2phone_extension",
                    fieldLabel: "Extension (interno)",
                    itemId: "net2phone_extension"
                }, {
                    xtype: "textfield",
                    fieldLabel: "Caller ID",
                    name: "net2phone_callerid",
                    itemId: "net2phone_callerid",
                    hidden: true
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: "textfield",
                            name: "net2phone_callerid_name",
                            fieldLabel: "Caller Id Nombre",
                            itemId: "net2phone_callerid_name"
                        },{
                            xtype: "textfield",
                            name: "net2phone_callerid_number",
                            fieldLabel: "Caller Id número",
                            labelAlign: 'right',
                            itemId: "net2phone_callerid_number"
                        }
                    ]
                }
            ]
        },
        {
            xtype: "fieldset",
            title: "Wildix",
            itemId: 'Wildix',
            padding: '5 5 5 5',
            hidden: true,
            items: [
                {
                    xtype: "textfield",
                    name: "wildix_extension",
                    fieldLabel: "Extension (interno)",
                    itemId: "wildix_extension"
                }, {
                    xtype: "textfield",
                    fieldLabel: "Clave",
                    inputType: 'password',
                    name: "wildix_password",
                    itemId: "wildix_password",
                    hidden: false
                }
            ]
        },
        {
            xtype: "combobox",
            fieldLabel: "Grabar llamadas entrantes",
            itemId: "grabarllamadasCombo",
            queryMode: "local",
            store: [
                [ '0', getLocale( 'No' ) ],
                [ '1', getLocale( 'Si' ) ]
            ]
        }
    ],
    initComponent: function() {
        var n = Ext.create( "Ext.toolbar.Toolbar", {
            items: [ {
                iconCls: "save",
                text: "Guardar",
                scope: this,
                action: "saveSecurity",
                itemId: "llamdasNotificacionesSave"
            }]
        });
        this.callParent( arguments );
        this.addDocked( n )
    }
})