Ext.define("SgAppAccessControl.view.AC_accesoPersonaIdentificacionView", {
  extend: "Ext.form.Panel",
  alias: ["widget.ac_accesopersonaidentificacionview"],
  border: 0,
  bodyPadding: 0,
  items: [
    {
      xtype: "container",
      layout: "column",
      items: [
        {
          columnWidth: "0.25",
          xtype: "image",
          src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNy4wMDFjMCAzLjg2NS0zLjEzNCA3LTcgN3MtNy0zLjEzNS03LTdjMC0zLjg2NyAzLjEzNC03LjAwMSA3LTcuMDAxczcgMy4xMzQgNyA3LjAwMXptLTEuNTk4IDcuMThjLTEuNTA2IDEuMTM3LTMuMzc0IDEuODItNS40MDIgMS44Mi0yLjAzIDAtMy44OTktLjY4NS01LjQwNy0xLjgyMi00LjA3MiAxLjc5My02LjU5MyA3LjM3Ni02LjU5MyA5LjgyMWgyNGMwLTIuNDIzLTIuNi04LjAwNi02LjU5OC05LjgxOXoiLz48L3N2Zz4=",
          name: "Photo",
          itemId: "Photo",
          padding: 2,
        },
        {
          columnWidth: "0.75",
          xtype: "container",

          bodyStyle: { "background-color": "lightgrey" },
          layout: "vbox",
          items: [
            {
              xtype: "panel",
              width: "100%",
              height: "200",
              items: [
                {
                  xtype: "container",
                  layout: "column",
                  items: [
                    {
                      xtype: "container",
                      columnWidth: "0.50",
                      items: [
                        {
                          xtype: "panel",
                          bodyStyle: { "background-color": "lightgrey" },
                          padding: "5,5,5,5",
                          items: [
                            {
                              xtype: "displayfield",
                              fieldLabel: "Nombre",
                              labelAlign: "top",
                              name: "usu_cnombre",
                              itemId: "usu_cnombre",
                              fieldStyle:
                                "font-size:15px!important;font-weight: bold!important;",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      xtype: "container",
                      columnWidth: "0.50",
                      items: [
                        {
                          xtype: "panel",
                          padding: "5,5,5,5",
                          bodyStyle: { "background-color": "lightgrey" },
                          items: [
                            {
                              xtype: "displayfield",

                              fieldLabel: "Identificación",
                              fieldStyle:
                                "font-size:15px!important;font-weight: bold!important;",
                              labelAlign: "top",
                              name: "usu_cidentificacion",
                              itemId: "usu_cidentificacion",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              xtype: "panel",
              width: "100%",

              bodyStyle: { "background-color": "lightgrey" },
              items: [
                {
                  xtype: "displayfield",
                  fieldStyle:
                    "font-size:15px!important;font-weight: bold!important;",
                  fieldLabel: "Observaciones",
                  labelAlign: "top",
                  name: "usu_mobservacion",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  initComponent: function () {
    this.callParent();
  },
});
