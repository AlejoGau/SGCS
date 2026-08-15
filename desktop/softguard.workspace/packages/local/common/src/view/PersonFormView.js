Ext.define("Common.view.PersonFormView", {
  extend: "Ext.form.Panel",
  alias: "widget.personformview",
  title: "Propiedades",
  preventHeader: true,
  layout: "anchor",
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
          xtype: "container",
          layout: {
            type: "hbox",
            align: "stretch",
          },
          margin: "5 0 5 0",
          items: [
            {
              xtype: "textfield",
              name: "Name",
              fieldLabel: "Nombre",
              flex: 1,
              margin: "0 5 0 0",
              allowBlank: false,
              validator: function (value) {
                var field = this;
                var form = field.up("form");
                if (value == getLocale("Nuevo contacto")) {
                  this.originalValue = "";
                  this.checkDirty();
                  return getLocale("Debe completar con el valor real");
                } else {
                  return true;
                }
              },
            },
            {
              xtype: "textfield",
              name: "LastName",
              fieldLabel: "Apellido",
              labelWidth: 120,
              flex: 1,
              allowBlank: false,
            },
          ],
        },
        {
          xtype: "datefield",
          fieldLabel: "Nacimiento",
          name: "Birthday",
          itemId: "Birthday",
          format: "d/m/Y",
          validator: function (value) {
            if (!value) return true;

            var today = new Date();
            today.setHours(0, 0, 0, 0);

            var selectedDate = new Date(value);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate > today) {
              return "La fecha de nacimiento no puede ser posterior a la fecha actual";
            }
            return true;
          },
          listeners: {
            afterrender: function (field) {
              // Establecer maxValue después del render
              field.setMaxValue(new Date());
            },
            change: function (field, newvalue, oldvalue, event) {
              if (!newvalue) return;

              var today = new Date();
              today.setHours(0, 0, 0, 0);

              var selectedDate = new Date(newvalue);
              selectedDate.setHours(0, 0, 0, 0);

              if (selectedDate > today) {
                field.markInvalid(
                  "La fecha de nacimiento no puede ser posterior a la fecha actual"
                );
              } else {
                field.clearInvalid();
              }
            },
          },
        },
      ],
    },
    {
      xtype: "fieldset",
      title: "Laboral",
      collapsible: true,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "textfield",
          name: "Company",
          fieldLabel: "Empresa",
        },
        {
          xtype: "textfield",
          name: "JobTitle",
          fieldLabel: "Cargo",
        } /*,
                {
                    xtype: 'combo',
                    name: 'Occupation',
                    fieldLabel: 'Ocupación'
                }*/,
      ],
    },
    {
      xtype: "fieldset",
      title: "Teléfonos",
      collapsible: true,
      layout: {
        type: "table",
        columns: "2",
      },
      items: [
        {
          xtype: "textfield",
          name: "HomePhone",
          fieldLabel: "Principal",
        },
        {
          xtype: "textfield",
          name: "MobilePhone",
          labelWidth: 50,
          margin: "0 0 0 5",
          fieldLabel: "Móvil",
        },
        {
          xtype: "textfield",
          name: "BusinessPhone",
          fieldLabel: "Trabajo",
        } /*,{
                    xtype: 'textfield',
                    name: 'Fax',
                    labelWidth: 50,
                    margin: '0 0 0 5',
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
          vtype: "email",
          fieldLabel: "Email",
        } /*,{
                   xtype: 'textfield',
                   name: 'Web',
                   fieldLabel: 'Sitio Web'
        		}*/,
        {
          xtype: "textfield",
          name: "Facebook",
          fieldLabel: "Facebook",
        },
        {
          xtype: "textfield",
          name: "Linkedin",
          fieldLabel: "Linkedin",
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
      title: "Dirección particular",
      collapsible: true,
      collapsed: false,
      layout: {
        type: "vbox",
        align: "stretch",
      },
      items: [
        {
          xtype: "combo",
          name: "Country",
          itemId: "comboPais",
          forceSelection: true,
          editable: false,
          queryMode: "local",
          valueField: "Id",
          displayField: "Name",
          lastQuery: "",
          fieldLabel: "País",
        },
        {
          xtype: "combo",
          name: "State",
          itemId: "comboProvincia",
          forceSelection: true,
          editable: false,
          fieldLabel: "Provincia",
          queryMode: "local",
          valueField: "Id",
          displayField: "Name",
          lastQuery: "",
        },
        {
          xtype: "textfield",
          name: "City",
          fieldLabel: "Ciudad",
        },
        {
          xtype: "textfield",
          name: "PostalCode",
          fieldLabel: "Código Postal",
        },
        {
          xtype: "textfield",
          name: "Address",
          fieldLabel: "Calle y Número",
        },
        {
          xtype: "textareafield",
          name: "Location",
          fieldLabel: "Indicaciones",
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
              name: "AddressLat",
              margin: "0 5 0 0",
              fieldLabel: "Latitud",
            },
            {
              xtype: "textfield",
              name: "AddressLong",
              fieldLabel: "Longitud",
            },
          ],
        },
      ],
    },
  ],
  initComponent: function () {
    this.callParent();
    //this.down('combobox').bindStore(Ext.create('WebMG'+'.store.RazorTypeStore'));
    // agrego la toolbar
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "save",
          text: "Guardar",
          scope: this,
          action: "save",
        },
        {
          iconCls: "icon-delete",
          text: "Eliminar",
          action: "delete",
          scope: this,
        },
        "-" /*, {
    				xtype : 'button',
					text : 'Foto',
					iconCls : 'icon-photo',
					action: 'photo'
				}*/,
        {
          xtype: "button",
          text: "Mapa",
          iconCls: "icon-map",
          action: "map",
        },
        {
          iconCls: "icon-email-go",
          text: "Enviar correo",
          scope: this,
          action: "mailsend",
          hidden: true,
        } /*,'-', {
    				xtype : 'button',
					text : 'Nueva acción',
					iconCls : 'icon-Action',
                    action: 'newAction'
				}*/,
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});
