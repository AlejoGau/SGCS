Ext.define("Administrator.view.AjustesOperadorMWRView", {
        extend: "Ext.form.Panel",
        title: "Ajustes del operador",
        alias: "widget.AjustesOperadorMWRView",
        autoScroll: !0,
        items: [
            {
                xtype: "combobox",
                fieldLabel: "Seleccion de operador",
                itemId: "operadorCombo",
              //  multiselect: false,
            //    editable: false,
              //  queryMode: "local",
              //  forceSelection: true,
              //  typeAhead: false,
                displayField: "comboText",
                valueField: "ope_clogin"
            }, {
                xtype: "checkbox",
                fieldLabel: "Colaboracion de eventos",
                itemId: "colaborador"
            }, 
            
            {
                xtype: "combobox",
                fieldLabel: "Modo de atencion",
                itemId: "modoatencionCombo",
                multiselect: false,
                editable: false,
                queryMode: "local",
                forceSelection: true,
                value:'manual',
                store: [
                    ['manual', getLocale('Manual')],
                    ['automatica', getLocale('Automatica')]
                    ]
            },
            
           /* {
                xtype: "checkbox",
                fieldLabel: "Atencion automatica",
                itemId: "atencionautomatica"
            },*/{
                xtype: "checkbox",
                fieldLabel: "Ver claves",
                itemId: "claves"
            },{
                xtype: "checkbox",
                fieldLabel: "Sonido",
                itemId: "sonido"
            }
            ,{
                xtype: "checkbox",
                fieldLabel: "No permitir silenciar alarmas",
                itemId: "nomutealarm"
            }
        ],
        initComponent: function() {
            var n = Ext.create("Ext.toolbar.Toolbar", {
                items: [{
                    iconCls: "save",
                    text: "Guardar",
                    scope: this,
                    action: "saveSecurity",
                    itemId: "ajustesOperadorSave"
                }]
            });
            this.callParent(arguments);
            this.addDocked(n)
        }
    })