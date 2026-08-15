Ext.define("Administrator.view.EventosMWRView", {
        extend: "Ext.form.Panel",
        title: "Eventos",
        alias: "widget.EventosMWRView",
        autoScroll: !0,
        items: [
            {
                xtype: "checkbox",
                fieldLabel: "Generador de eventos",
                itemId: "generadoreventos",
                listeners: {
                    change: function (check,value) {
                        var view = check.up('EventosMWRView')
                        if(check.checked) {
                            view.down('#sineventosdeposicion').setDisabled(false)
                            view.down('#sineventosdeposicion').setValue(true)
                        } else {
                            view.down('#sineventosdeposicion').setDisabled(true)                            
                            view.down('#sineventosdeposicion').setValue(false)
                        }
                    }
                }
            },{
                xtype: "checkbox",
                labelWidth: 250,
                fieldLabel: "Ocultar la función geoposición de eventos",
                itemId: "sineventosdeposicion",
                disabled:true,
                margin:'0 0 0 15'
            }/** viejo,{
                xtype: "checkbox",
                fieldLabel: "Proceso Multiple",
                itemId: "procesarmultiple"
            },{
                xtype: "checkbox",
                fieldLabel: "Proceso masivo",
                itemId: "procesarporlote",
                disabled:true,
                margin:'0 0 0 15'
            },{
                xtype: "checkbox",
                fieldLabel: "Procesar todos",
                itemId: "procesartodos",
                disabled:true,
                margin:'0 0 0 15'
            },*/
            
            
            ,{
                xtype: "fieldset",
                title: "Proceso multiple",
                items: [
                    {
                        xtype: "checkbox",
                        fieldLabel: "Habilitar proceso de multiples eventos en grilla PENDIENTES",
                        itemId: "procesarmultiplependientes",
                        labelWidth:400
                    },{
                        xtype: "checkbox",
                        fieldLabel: "Proceso masivo",
                        itemId: "procesarporlotependientes",
                        disabled:true,
                        margin:'0 0 0 15'
                    },{
                        xtype: "checkbox",
                        fieldLabel: "Procesar todos",
                        itemId: "procesartodospendientes",
                        disabled:true,
                        margin:'0 0 0 15'
                    },{
                        xtype: 'box',
                        autoEl: {tag: 'hr'}
                    },{
                        xtype: "checkbox",
                        fieldLabel: "Habilitar proceso de multiples eventos en ventana EN PROCESO",
                        itemId: "procesarmultipleproceso",
                        labelWidth:400
                    },{
                        xtype: "checkbox",
                        fieldLabel: "Proceso masivo",
                        itemId: "procesarporloteproceso",
                        disabled:true,
                        margin:'0 0 0 15'
                    },{
                        xtype: "checkbox",
                        fieldLabel: "Procesar todos",
                        itemId: "procesartodosproceso",
                        disabled:true,
                        margin:'0 0 0 15'
                    },
                ]
            }
            ,{
                xtype: "numberfield",
                fieldLabel: "Tiempo atención automática (expresado en segundos)",
                itemId: "tiempoatencion",
                labelWidth: 400,
                width: 450,
                minValue:1,
                maxValue:10,
                value: 5
            }
        ],
        initComponent: function() {
            var n = Ext.create("Ext.toolbar.Toolbar", {
                items: [{
                    iconCls: "save",
                    text: "Guardar",
                    scope: this,
                    action: "saveSecurity",
                    itemId: "eventosSave"
                }]
            });
            this.callParent(arguments);
            this.addDocked(n)
        }
    })
