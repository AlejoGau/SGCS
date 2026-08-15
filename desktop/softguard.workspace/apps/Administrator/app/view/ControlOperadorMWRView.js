Ext.define("Administrator.view.ControlOperadorMWRView", {
        extend: "Ext.form.Panel",
        title: "Control Operador",
        alias: "widget.ControlOperadorMWRView",
        autoScroll: !0,
        items: [
            {
                xtype: "checkbox",
                fieldLabel: "Activado",
                itemId: "controloperador"
            }, {
                xtype: "timefield",
                fieldLabel: "Hora Desde",
                itemId: "horadesde",
                format: "H:i",
                submitFormat: "Hi"
            }, {
                xtype: "timefield",
                fieldLabel: "Hora Hasta",
                itemId: "horahasta",
                format: "H:i",
                submitFormat: "Hi"
            }

        ],
        initComponent: function() {
            var n = Ext.create("Ext.toolbar.Toolbar", {
                items: [{
                    iconCls: "save",
                    text: "Guardar",
                    scope: this,
                    action: "saveSecurity",
                    itemId: "controlOperadorSave"
                }]
            });
            this.callParent(arguments);
            this.addDocked(n)
        }
    })