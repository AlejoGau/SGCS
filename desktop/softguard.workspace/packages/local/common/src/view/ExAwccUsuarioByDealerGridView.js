//MIGRADO2024
Ext.define('Common.view.ExAwccUsuarioByDealerGridView', {
        extend: "Ext.grid.GridPanel",
        alias: "widget.exawccusuariosgridview",
        itemId: "gridawccuser",
        title: "Listado de Usuarios",
        autoHeight: !0,
        columns: [{
            xtype: "actioncolumn",
            width: 30,
            items: [{
                iconCls: "icon-vcard",
                tooltip: getLocale("Asignar cuentas"),
                handler: function(n, t) {
                    var i = n.up("exawccusuariosgridview"),
                        r = n.getStore().getAt(t);
                    i.fireEvent("agregarcuentas", r, i)
                }
            }]
        }, {
            xtype: "actioncolumn",
            width: 30,
            items: [{
                iconCls: "icon-userEdit",
                tooltip: getLocale("Modificar datos"),
                handler: function(n, t) {
                    var i = n.up("exawccusuariosgridview"),
                        r = n.getStore().getAt(t);
                    i.fireEvent("objectedit", r, i)
                }
            }]
        }, {
            xtype: "actioncolumn",
            width: 30,
            items: [{
                iconCls: "icon-email",
                tooltip: getLocale("Enviar email"),
                handler: function(n, t) {
                    var i = n.up("exawccusuariosgridview"),
                        r = n.getStore().getAt(t);
                    i.fireEvent("enviarmail", r, i)
                }
            }]
        }, {
            xtype: "gridcolumn",
            header: "Nombre",
            sortable: !0,
            dataIndex: "nombre_mostrar",
            width: 100
        }, {
            xtype: "gridcolumn",
            header: "Login",
            sortable: !0,
            dataIndex: "nombrelogin",
            width: 250
        }],
        initComponent: function() {
            var n, t;

            this.onSelectChange = function(n, t) {
                this.down("button[action=delete]").setDisabled(t.length === 0)
            };
            this.getSelectionModel().on("selectionchange", this.onSelectChange, this);
            n = Ext.create("Ext.toolbar.Toolbar", {
                items: [{
                    xtype: "combo",
                    fieldLabel: "Usuario",
                    labelWidth: 55,
                    plugins: ["clearbutton"],
                    editable: !0,
                    forceSelection: !0,
                    itemId: "usuarioCombo",
                    queryMode: "local",
                    displayField: "nombrelogin",
                    valueField: "nombrelogin",
                    hidden: !0
                }, {
                    iconCls: "icon-add",
                    text: "Asignar",
                    action: "add",
                    itemId: "asignar",
                    hidden: !0
                }, {
                    iconCls: "icon-delete",
                    text: "Eliminar",
                    disabled: !0,
                    action: "delete"
                }, "-", {
                    iconCls: "icon-user-add",
                    text: "Nuevo usuario",
                    action: "createUser"
                }]
            });
            this.callParent(arguments);
            this.addDocked(n);
            t = Ext.create("Ext.toolbar.Paging", {
                dock: "bottom",
                displayInfo: !0
            });
            this.addDocked(t)
        }
    })