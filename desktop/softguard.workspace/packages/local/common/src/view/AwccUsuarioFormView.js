//MIGRADO2024
Ext.define("Common.view.AwccUsuarioFormView", {
  extend: "Ext.form.FormPanel",
  alias: "widget.awccusuariosformview",
  title: "",
  dockedItems: [
    {
      xtype: "toolbar",
      items: [
        {
          text: "Guardar",
          iconCls: "save",
          action: "save",
        },
        /*{
                text: 'Eliminar',
                iconCls: 'delete',
                action: 'delete'
            }*/
      ],
    },
  ], // cierro dockeditems
  items: [
    {
      xtype: "textfield",
      fieldLabel: "Usuario",
      name: "udw_usuario",
      itemId: "emailuser",
      allowBlank: false,
      vtype: "email",
    },
    {
      xtype: "container",
      layout: "hbox",
      margin: "0 0 5 0",
      items: [
        {
          xtype: "textfield",
          fieldLabel: "Clave",
          name: "udw_clave",
          allowBlank: false,
          disabled: true,
          flex: 1,
          inputType: "password",
          itemId: "password",
        },
        {
          xtype: "button",
          text: "Cambiar clave",
          action: "passwordChange",
        },
      ],
    },
    {
      xtype: "textfield",
      fieldLabel: "Nombre",

      name: "udw_nombre",
    },
    {
      xtype: "textfield",
      fieldLabel: "Apellido",

      name: "udw_apellido",
    },
    {
      xtype: "container",
      layout: "hbox",
      margin: "0 0 5 0",
      items: [
        {
          xtype: "displayfield",
          fieldLabel: "Entidad",
          name: "_organization",
          flex: 1,
        },
        {
          xtype: "button",
          action: "organizationChange",
          text: "Seleccionar organización",
        } /*,{
                    xtype: 'button',
                    margin: '0 0 0 5',
                    text: 'Nueva Organización',
                    tooltip: 'Nueva Organización',
                	iconCls : 'icon-add',
            		action : 'createorganization'
            	}*/,
      ],
    },
    {
      xtype: "combo",
      fieldLabel: "Provincia",
      itemId: "provincia",
      name: "lin_cprovincia",
      store: "ProvinciasStore",
      displayField: "pro_cdescripcion",
      valueField: "Id",
      anchor: "100%",
      queryMode: "local",
    },
    {
      xtype: "combo",
      store: "LocalizationLanguageStore",
      editable: false,
      queryMode: "local",
      fieldLabel: "Idioma",
      lastQuery: "",
      allowBlank: true,
      itemId: "language",
      displayField: "_Language",
      valueField: "Language",
    },
    {
      xtype: "combo",
      store: [
        [0, getLocale("Central")],
        [1, getLocale("Dealer")],
        [2, getLocale("Usuario final (AWCC)")],
      ],
      editable: false,
      queryMode: "local",
      fieldLabel: "Tipo",
      lastQuery: "",
      allowBlank: true,
      itemId: "tipousuario",
      name: "udw_tipo",
    },
  ],
  initComponent: function () {
    this.callParent(arguments);
  }, // cierro init
});
