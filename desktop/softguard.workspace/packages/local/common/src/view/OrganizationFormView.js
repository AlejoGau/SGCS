Ext.define("Common.view.OrganizationFormView", {
  extend: "Ext.form.Panel",
  alias: "widget.organizationformview",
  title: "Propiedades",
  preventHeader: true,
  height: 600,
  width: 700,
  //layout: 'anchor',
  autoScroll: true,
  bodyPadding: 5,
  fieldDefaults: {
    labelWidth: 120,
    anchor: "100%",
    labelAlign: "left",
  },
  items: [
    {
      xtype: "fieldset",
      //title: 'Principal',
      //collapsible: true,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "displayfield",
          name: "Id",
          fieldLabel: "Id",
          hidden: true,
        },
        {
          xtype: "textfield",
          name: "Name",
          fieldLabel: "Nombre",
          itemId: "nombre",
          margin: "5 0 5 0",
          flex: 1,
          allowBlank: false,
          validator: function (value, field, record) {
            var t = this;
            var view = t.up("organizationformview");
            if (!value) {
              t.clearInvalid();
              t.textValid = false;
              view.down("#save").setDisabled(true);
              return t.textValid;
            }
            //if(this.originalValue == '' && value != this.originalValue && value != '') {
            var record = view.record;
            var filters = [
              {
                property: "o.Name",
                value: value,
              },
            ];

            var model = "Common.model.OrganizationSearchModel";
            var storeSP = Ext.create("Ext.data.Store", {
              model: model,
              pageSize: 50,
              remoteFilter: true,
              filters: filters,
            });

            storeSP.load({
              callback: function (records, operation, success) {
                if (records.length > 0) {
                  if (
                    typeof (view.record.get("Id") === "number") &&
                    records[0].get("Id") == view.record.get("Id")
                  ) {
                    t.clearInvalid();
                    t.textValid = true;
                    view.down("#save")
                      ? view.down("#save").setDisabled(false)
                      : null;
                  } else {
                    t.markInvalid("La organizacion ya existe");
                    t.textValid = false;
                    view.down("#save")
                      ? view.down("#save").setDisabled(true)
                      : null;
                  }
                } else {
                  t.clearInvalid();
                  t.textValid = true;
                  view.down("#save")
                    ? view.down("#save").setDisabled(false)
                    : null;
                }
              },
            });
            /*} else {
                            t.markInvalid('');
                            t.clearInvalid();
                            t.textValid = true;
                            view.down('#save').setDisabled(false)
                        }*/
            return t.textValid;
          },
          listeners: {
            change: function (field, newValue) {
              const view = field.up("organizationformview");
              const saveBtn = view.down("#save");

              if (newValue && newValue.length > 0 && saveBtn.disabled) {
                saveBtn.setDisabled(false);
              } else if (!newValue && !saveBtn.disabled) {
                saveBtn.setDisabled(true);
              }
            },
            keypress: function (field) {
              const view = field.up("organizationformview");
              const saveBtn = view.down("#save");

              if (!field.getValue() || field.getValue().trim() === "") {
                saveBtn.setDisabled(true);
              }
            },
          },
        },
        {
          xtype: "textfield",
          name: "LegalName",
          fieldLabel: "Nombre legal",
          flex: 1,
          allowBlank: true,
        },
        {
          xtype: "textfield",
          name: "StateTax",
          maxLength: 128,
          enforceMaxLength: true,
          fieldLabel: "Identificador",
          flex: 1,
          allowBlank: true,
        },
        {
          xtype: "textfield",
          name: "NationalTax",
          fieldLabel: "CUIT",
          maxLength: 128,
          enforceMaxLength: true,
          flex: 1,
          allowBlank: true,
        },

        {
          xtype: "combo",
          queryMode: "local",
          valueField: "Value",
          displayField: "Name",
          foceSelection: true,
          editable: false,
          fieldLabel: "Tipo",
          name: "OrganizationType",
          itemId: "organizationtype",
          store: [
            ["CLI", getLocale("Cliente")],
            ["PROV", getLocale("Proveedor")],
            ["CENTRAL", getLocale("Central")],
          ],
        },
        {
          xtype: "container",
          layout: "hbox",
          margin: "0 0 5 0",
          itemId: "grupoEstado",
          items: [
            {
              xtype: "displayfield",
              fieldLabel: "Grupo Estado",
            },
            {
              xtype: "image",
              itemId: "itemImg",
              margin: "0 10 0 0",
              width: 16,
            },
            {
              xtype: "combo",
              queryMode: "local",
              valueField: "Value",
              displayField: "Name",
              foceSelection: true,
              editable: false,
              fieldLabel: "",
              itemId: "prestatus",
              listConfig: {
                itemTpl: Ext.create(
                  "Ext.XTemplate",
                  '<div style="height:16px;"><img src="{Icon}" align="left"> {Name}</div>'
                ),
              },
              store: "GrupoEstadosStore",
              listeners: {
                change: function (combo, value) {
                  var view = combo.up("organizationformview");
                  switch (value) {
                    case "inactivo":
                      view.filterCombo(view.down("#status"), "0");
                      break;
                    case "prospecto":
                      view.filterCombo(view.down("#status"), "1,2,3");
                      break;
                    case "enventa":
                      view.filterCombo(view.down("#status"), "4,5,6");
                      break;
                    case "cliente":
                      view.filterCombo(view.down("#status"), "7,8,9");
                      break;
                  }
                  var store = combo.getStore();
                  var record = store.findRecord("Value", value);
                  view.down("#itemImg").setSrc(record.get("Icon"));
                } /*,
                                select: function (combo,record, opt){
                                    var view = combo.up( 'organizationformview' )
                                    switch( combo.getValue() ) {
                                        case 'inactivo':
                                            view.filterCombo( view.down( '#status' ), '0' )
                                            break;
                                        case 'prospecto':
                                            view.filterCombo( view.down( '#status' ), '1,2,3' )
                                            break;
                                        case 'enventa':
                                            view.filterCombo( view.down( '#status' ), '4,5,6' )
                                            break;
                                        case 'cliente':
                                            view.filterCombo( view.down( '#status' ), '7,8,9' )
                                            break;
                                    }
                                    view.down( '#itemImg' ).setSrc( record.get( 'Icon' ) );

                                }*/,
              },
            },
          ],
        },

        {
          xtype: "combo",
          name: "Status",
          queryMode: "local",
          valueField: "Value",
          displayField: "Name",
          foceSelection: true,
          editable: false,
          fieldLabel: "Estado",
          itemId: "status",
          //store: 'OrganizationStatusStore'
        },
      ],
    },

    {
      xtype: "fieldset",
      title: "Dirección",
      collapsible: true,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "combo",
          name: "Country",
          itemId: "comboPais",
          queryMode: "local",
          valueField: "Id",
          displayField: "Name",
          plugins: ["clearbutton"],
          forceSelection: true,
          editable: false,
          parentCb: "fieldset",
          plugins: ["clearbutton"],
          lastQuery: "",
          fieldLabel: "País",
        },
        {
          xtype: "combo",
          name: "State",
          itemId: "comboProvincia",
          parentCb: "fieldset",
          plugins: ["clearbutton"],
          fieldLabel: "Provincia",
          plugins: ["clearbutton"],
          queryMode: "local",
          forceSelection: true,
          editable: false,
          valueField: "Id",
          displayField: "Name",
          lastQuery: "",
        },
        {
          xtype: "container",
          layout: {
            type: "hbox",
            align: "stretch",
          },
          margin: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              name: "City",
              fieldLabel: "Ciudad",
              margin: "0 5 0 0",
              flex: 1,
            },
            {
              xtype: "textfield",
              name: "Zip",
              labelWidth: 120,
              fieldLabel: "Código Postal",
            },
          ],
        },
        {
          xtype: "textfield",
          name: "Address",
          fieldLabel: "Calle y Número",
        },
        {
          xtype: "container",
          hidden: true,
          layout: {
            type: "hbox",
            align: "stretch",
          },
          margin: "0 0 5 0",
          items: [
            {
              xtype: "textfield",
              name: "AddressLat",
              margin: "0 5 0 0",
              fieldLabel: "Latitud",
            },
            {
              xtype: "textfield",
              name: "AddressLong",
              labelWidth: 80,
              fieldLabel: "Longitud",
            },
          ],
        },
      ],
    },
    {
      xtype: "fieldset",
      title: "Teléfonos",
      collapsible: true,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "textfield",
          name: "Phone",
          fieldLabel: "Teléfono",
        },
        {
          xtype: "textfield",
          name: "Mobile",
          fieldLabel: "Móvil",
        } /* {
                    xtype: 'textfield',
                    name: 'Fax',
                    hidden: true, //anulado según https://softguard.atlassian.net/browse/DK-345
                    fieldLabel: 'Fax'

                }*/,
      ],
    },

    {
      xtype: "fieldset",
      title: "OnLine",
      collapsible: true,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "textfield",
          name: "Email",
          fieldLabel: "Email",
          vtype: "email",
        },
        {
          xtype: "textfield",
          name: "Web",
          fieldLabel: "Sitio Web",
        },
        {
          xtype: "textfield",
          name: "Facebook",
          fieldLabel: "Facebook",
        },
        {
          xtype: "textfield",
          name: "Twitter",
          fieldLabel: "Twitter",
        },
      ],
    },
    {
      xtype: "fieldset",
      title: "Otros",
      collapsible: true,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "textareafield",
          name: "SmallComment",
          fieldLabel: "Nota",
        },
        {
          xtype: "combo",
          queryMode: "local",
          valueField: "Id",
          displayField: "Name",
          foceSelection: true,
          editable: false,
          fieldLabel: "Como nos conocio?",
          itemId: "comonosconociocombo",
        },
      ],
    },
  ],

  filterCombo: function (field, values) {
    var view = field.up("organizationformview");
    var store = view.storeStatus;
    var storeFilted = [];
    store.each(function (v, k) {
      if (values.toString().indexOf(v.get("Value")) >= 0) {
        storeFilted.push(v);
      }
    });
    var fieldStore = field.getStore();
    fieldStore.removeAll();
    fieldStore.add(storeFilted);
    
    // Si el campo ya tiene un valor y ese valor está en el store filtrado, no lo cambiamos
    // Esto evita que al cargar el form se resetee el status a "Inactivo" (primer elemento) accidentalmente
    if (field.getValue() && fieldStore.find('Value', field.getValue()) !== -1) {
        return;
    }
    
    // if(!field.getValue()) {
    if (fieldStore.getCount() > 0) {
        field.select(fieldStore.getAt(0));
    }
    // }
  },
  initComponent: function () {
    this.callParent();

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "save",
          text: "Guardar",
          scope: this,
          action: "save",
          itemId: "save",
        },
        {
          iconCls: "icon-delete",
          text: "Eliminar",
          itemId: "deleteDecision",
          scope: this,
        },
        "-",
        {
          xtype: "button",
          text: "Mapa",
          iconCls: "icon-map",
          action: "map",
        },
        "->",
        {
          xtype: "button",
          text: "Información contable",
          iconCls: "icon-user",
          action: "cliente",
          itemId: "cliente",
          hidden: true,
        },
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});

Ext.define("Common.view.OrganizationClientFormView", {
  extend: "Common.view.OrganizationFormView",
  alias: "widget.organizationclientformview",

  initComponent: function () {
    this.callParent();
    this.getForm().findField("Status").hide();
  }, // cierro init
});
