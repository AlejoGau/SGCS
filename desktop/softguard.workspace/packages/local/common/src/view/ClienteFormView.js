//MIGRADO2024
Ext.define("Common.view.ClienteFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.clienteformview"],
  title: "",
  frame: false,
  bodyPadding: 5,
  fieldDefaults: {
    labelWidth: 150,
    labelAlign: "left",
    editable: false,
    anchor: "100%",
  },
  items: [
    {
      xtype: "combo",
      name: "cli_iorganizacion",
      editable: false,
      queryMode: "local",
      fieldLabel: "Empresa Facturadora",
      lastQuery: "",
      itemId: "organizacionfacturadora",
      displayField: "org_cnombre",
      valueField: "Id",
      labelWidth: 150,
    },
    {
      xtype: "combo",
      name: "cli_ccategoriaimpositiva",
      editable: false,
      queryMode: "local",
      fieldLabel: "Categoria impositiva",
      lastQuery: "",
      itemId: "categoriasimpositivas",
      displayField: "cat_cdescripcion",
      valueField: "cat_ccodigo",
      plugins: ["clearbutton"],
      labelWidth: 150,
      allowBlank: false,
    },
    {
      xtype: "combo",
      name: "cli_ccondicionpago",
      editable: false,
      queryMode: "local",
      fieldLabel: "Condicion de pago",
      lastQuery: "",
      //name:'',
      itemId: "condicionpago",
      displayField: "_con_cdescripcion",
      valueField: "con_ccodigo",
    },
    {
      xtype: "fieldset",
      title: "Información de pago",
      itemId: "mginformacionpago",
      items: [],
      martin: "10 0 0 0",
      hidden: true,
    },
    {
      xtype: "combo",
      name: "cli_cformatoimpresion",
      editable: false,
      queryMode: "local",
      fieldLabel: "Formato impresion",
      lastQuery: "",
      itemId: "formatoimpresion",
      displayField: "for_cDescripcion",
      valueField: "for_cCodigo",
      hidden: true,
    },
  ],
  initComponent: function () {
    this.callParent();
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "save",
          text: "Guardar",
          scope: this,
          action: "save",
        },
      ],
    });
    this.addDocked(toolbar);
  },
});
