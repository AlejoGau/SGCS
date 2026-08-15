//MIGRADO2024
Ext.define('Common.controller.ExAwccUsuarioByDealerGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AwccUsuariosByCuentaSearchModel', 'AwccUsuariosByEntidadSearchModel', 'AwccUsuarioModel' ],
    views : [ 'ExAwccUsuarioByDealerGridView' ],
        init: function() {
            var n = this;
            this.control({
                "exawccusuariosgridview button[action=delete]": {
                    click: this.onDeleteClick
                },
                "exawccusuariosgridview button[action=add]": {
                    click: this.onAddClick
                },
                "exawccusuariosgridview button[action=createUser]": {
                    click: this.onCreateUserClick
                },
                "exawccusuariosgridview": {
                    beforerender: this.loadData,
                    itemdblclick: this.onItemDblClick,
                    objectedit: this.onObjectEdit,
                    enviarmail: this.onEnviarMail,
                    agregarcuentas: this.onAgregarCuenta,
                    cuentaselected: this.onCuentaSelected,
                    objectchanged: this.onObjectChanged
                }
            })
        },
        onObjectChanged: function(n) {
            var t = n;
            t.down("pagingtoolbar").doRefresh()
        },
        loadData: function(n) {
            var s = n.record,
                f = n.module,
                e = f ? f.get("profile") : 1,
                t, o, i, r, u;
            n.profile = e;
            e < 2 && n.down("toolbar").hide();
            this.application.UserData.Company || (notifyError("Debe asignar una organización al usuario"), n.down("toolbar").hide());
            t = Ext.create("Ext.data.Store", {
                model: this.getAwccUsuariosByCuentaSearchModelModel()
            });
            n.bindStore(t);
            n.down("pagingtoolbar").bindStore(t);
            o = s.get("Id");
            t.getProxy().setExtraParam("cue_iid", o);
            t.load();
            i = Ext.create("Ext.data.Store", {
                model: this.getAwccUsuariosByEntidadSearchModelModel(),
                filters: [{
                    property: "entidad",
                    value: this.application.UserData.Company
                }]
            });
            r = n.down("#usuarioCombo");
            r.bindStore(i);
            i.load({
                callback: function(t) {
                    t > 0 && (r.show(), n.down("#asignar").show())
                }
            });
            u = KeyModulesStore;//this.getKeyModulesStoreStore();
            u.load({
                callback: function() {
                    u.isModuleAvailable("AWCC") || (notify("No es posible acceder a la funcionalidad completa de esta solapa. Consulte con el proveedor del servicio."), n.down("gridview").setDisabled(!0))
                }
            })
        },
        onCuentaSelected: function(n, t, i) {
            Ext.Array.each(n, function(n) {
                var u = n.get("cue_iid"),
                    r = i.get("nombrelogin"),
                    f = "/rest/security/AWCC/AsignarCuentas/" + r + "/" + u;
                r && Ext.Ajax.request({
                    url: f,
                    method: "POST",
                    scope: this,
                    success: function() {
                        notify("El usuario se agregó con éxito");
                        t.down("pagingtoolbar").doRefresh()
                    }
                })
            })
        },
        onAgregarCuenta: function(n, t) {
            var i = Ext.create("Ext.Window", {
                layout: "fit",
                title: "Seleccione Cuentas",
                closeAction: "destroy",
                itemId: "cuentaWin",
                width: 750,
                height: 550,
                border: !0,
                modal: !0,
                view: t,
                items: [{
                    xtype: "cuentahelperview",
                    tip_ncondicion: "0",
                    caller: t,
                    recordPreSelected: n,
                    multiSelect: !0
                }]
            });
            i.show()
        },
        onEnviarMail: function(n) {
            if (n.get("email") == "") notifyError("El usuario no tiene email.");
            else var t = Ext.widget("window", {
                title: getLocale("Enviar mail a:") + " " + n.get("nombre_mostrar"),
                closable: !1,
                height: 150,
                width: 400,
                modal: !0,
                items: [{
                    xtype: "form",
                    layout: {
                        type: "vbox",
                        align: "stretch"
                    },
                    items: [{
                        xtype: "displayfield",
                        fieldLabel: "Nombre",
                        value: n.get("nombre_mostrar")
                    }, {
                        xtype: "displayfield",
                        fieldLabel: "Login",
                        value: n.get("nombrelogin")
                    }, {
                        xtype: "displayfield",
                        fieldLabel: "Email",
                        value: n.get("email"),
                        itmeId: "email"
                    }]
                }],
                buttons: [{
                    text: "Enviar",
                    handler: function() {
                        Ext.Ajax.request({
                            url: "/Rest/t_parametros/",
                            params: {
                                filter: '[{"property":"par_ccodigo", "value":"URLAWCC"}]'
                            },
                            method: "GET",
                            scope: this,
                            success: function(t) {
                                var r = Ext.JSON.decode(t.responseText).rows[0].par_cvalor,
                                    i = "http://" + r + "/backpanel/send-mail-usuario.asp";
                                i = Ext.urlAppend(i, "id_usuario=" + n.get("Id"));
                                i = Ext.urlAppend(i, "clave=" + n.get("contrasena"));
                                i = Ext.urlAppend(i, "email=" + n.get("email"));
                                Ext.Ajax.request({
                                    url: "/rest/request/get/?" + i,
                                    method: "GET",
                                    scope: this,
                                    success: function(n) {
                                        n.responseText == "true" ? (notify("El mail fue enviado con exito."), this.up(".window").close()) : notifyError("Ocurrio un error al enviar el email.")
                                    }
                                })
                            }
                        })
                    }
                }, {
                    text: "Cancelar",
                    handler: function() {
                        this.up(".window").close()
                    }
                }],
                layout: "fit"
            }).show()
        },
        onDeleteClick: function(n) {
            var t = n.up("exawccusuariosgridview"),
                i = t.getSelectionModel().getSelection()[0];
            if (i) {
                var r = t.record,
                    u = r.get("Id"),
                    f = i.get("nombrelogin"),
                    e = "/rest/security/AWCC/AsignarCuentas/" + f + "/" + u;
                Ext.Ajax.request({
                    url: e,
                    method: "DELETE",
                    scope: this,
                    success: function() {
                        notify("El usuario se eliminó con éxito");
                        t.down("pagingtoolbar").doRefresh()
                    }
                })
            }
        },
        onAddClick: function(n) {
            var t = n.up("exawccusuariosgridview"),
                r = t.record,
                u = r.get("Id"),
                i = t.down("#usuarioCombo").getValue(),
                f = "/rest/security/AWCC/AsignarCuentas/" + i + "/" + u;
            i && Ext.Ajax.request({
                url: f,
                method: "POST",
                scope: this,
                success: function() {
                    notify("El usuario se agregó con éxito");
                    t.down("pagingtoolbar").doRefresh()
                }
            })
        },
        onCreateUserClick: function(n) {
            var t = n.up("exawccusuariosgridview");
            this.openFormWindow("Nuevo usuario", null, t)
        },
        onCreateUserClick: function(n) {
            var r = n.up("exawccusuariosgridview"),
                o = this,
                s = r.record,
                u = s.get("Id"),
                f = this.application.UserData.Company,
                e = this.getAwccUsuarioModelModel(),
                t = Ext.create(e, {
                    CueIId: u,
                    Entity: f
                }),
                i = Ext.create("Ext.Window", {
                    layout: "fit",
                    title: "Nuevo usuario",
                    closeAction: "destroy",
                    record: t,
                    itemId: "AwccUserWindow",
                    width: 300,
                    height: 200,
                    border: !0,
                    modal: !0,
                    view: r,
                    listeners: {
                        beforerender: function() {
                            var n = Ext.create("Ext.data.Store", {
                                model: o.getAwccUsuariosByEntidadSearchModelModel(),
                                remoteFilter: !0,
                                filters: [{
                                    property: "EsTemplate",
                                    value: !0
                                }]
                            });
                            i.down("#templateCombo").bindStore(n);
                            n.load()
                        }
                    },
                    tbar: [{
                        text: "Guardar",
                        action: "save",
                        iconCls: "save",
                        handler: function() {
                            var n = i.down("form");
                            if (!n.getForm().isValid()) {
                                notifyError("Por favor corrija los valores");
                                return
                            }
                            n.down("#clave1").getValue() == n.down("#clave2").getValue() ? n.down("#email").getValue() && (t.set("Login", n.down("#email").getValue()), t.set("Password", n.down("#clave1").getValue()), t.set("Email", n.down("#email").getValue()), t.set("Name", n.down("#name").getValue()), t.set("LoginTemplate", n.down("#templateCombo").getValue()), t.save({
                                success: function(n, o) {
                                    var s = o.response.responseText,
                                        h = JSON.parse(s),
                                        c = h.Resultado;
                                    c == "ERR_DUP_USER" ? (notify("Error: El usuario está duplicado"), t = Ext.create(e, {
                                        CueIId: u,
                                        Entity: f
                                    })) : (r.down("pagingtoolbar").doRefresh(), notify("El usuario se creó con éxito"), i.close())
                                }
                            })) : notifyError("Las claves deben ser iguales")
                        }
                    }],
                    items: [{
                        xtype: "form",
                        items: [{
                            xtype: "textfield",
                            fieldLabel: "Login",
                            labelWidth: 90,
                            name: "Email",
                            itemId: "email",
                            vtype: "email",
                            allowBlank: !1
                        }, {
                            xtype: "textfield",
                            fieldLabel: "Clave",
                            itemId: "clave1",
                            labelWidth: 90,
                            inputType: "password",
                            allowBlank: !1
                        }, {
                            xtype: "textfield",
                            fieldLabel: "Repetir clave",
                            itemId: "clave2",
                            labelWidth: 90,
                            inputType: "password",
                            allowBlank: !1
                        }, {
                            xtype: "textfield",
                            fieldLabel: "Nombre",
                            labelWidth: 90,
                            name: "Name",
                            itemId: "name",
                            allowBlank: !1
                        }, {
                            xtype: "combo",
                            fieldLabel: "Template",
                            labelWidth: 90,
                            editable: !1,
                            forceSelection: !1,
                            itemId: "templateCombo",
                            queryMode: "local",
                            displayField: "nombre_mostrar",
                            valueField: "nombrelogin",
                            emptyText: getLocale("Template por defecto"),
                            allowBlank: !0
                        }]
                    }]
                });
            i.show()
        },
        onSaveClick: function(n) {
            var t = n.up("gridawccuser"),
                i = t.store;
            i.sync();
            notify("Los cambios se guardaron con éxito")
        },
        onItemDblClick: function(n, t) {
            this.openFormWindow(t.get("usu_cnombre"), t, n)
        },
        openFormWindow: function(n, t, i) {
            var r = i.up("awccusuariosgridview") ? i.up("awccusuariosgridview") : i;
            if (r.profile >= "2") var u = t,
                f = Ext.widget("awccusuariosbycuentaformview", {
                    objectId: u ? u.get("id_login") : null,
                    caller: r
                }),
                e = Ext.widget("window", {
                    title: n,
                    closable: !1,
                    height: 350,
                    width: 400,
                    modal: !0,
                    items: f,
                    layout: "fit"
                }).show();
            else notifyError("No posee derechos para esta operación")
        },
        onObjectEdit: function(n, t) {
            this.openFormWindow(n.get("usu_cnombre"), n, t)
        }
    })