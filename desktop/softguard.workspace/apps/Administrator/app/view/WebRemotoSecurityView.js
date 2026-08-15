Ext.define("Administrator.view.WebRemotoSecurityView", {
        extend: "Ext.form.Panel",
        title: "Supervision",
        alias: "widget.WebRemotoSecurity",
        autoScroll: !0,
        items: [
            {
                xtype: "combobox",
                fieldLabel: "Supervision",
                itemId: "supervision",
                //multiselect: !1,
                editable: !1,
                queryMode: "local",
                forceSelection: !0,
                value: "ASC",
                typeAhead: !1,
                store: [
                    [0, getLocale("Desactivado")],
                    [1, getLocale("Permiso para enviar a supervision")],
                    [2, getLocale("Supervisor")]
                ]
            }
        
       ],
        initComponent: function() {
            var n = Ext.create("Ext.toolbar.Toolbar", {
                items: [{
                    iconCls: "save",
                    text: "Guardar",
                    scope: this,
                    action: "saveSecurity",
                    itemId: "preferenciasVisualesSave"
                }]
            });
            this.callParent(arguments);
            this.addDocked(n)
        }
    })