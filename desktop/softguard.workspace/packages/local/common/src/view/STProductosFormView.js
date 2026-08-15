//MIGRADO2024
Ext.define("Common.view.STProductosFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.stproductosformview"],
  preventHeader: true,
  frame: true,
  border: 0,
  autoScroll: true,
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 100,
    enforceMaxLength: true,
  },
  items: [
    {
      xtype: "textfield",
      name: "Code",
      itemId: "Code",
      fieldLabel: "SKU",
      allowBlank: false,
      maxLength: 40,
      anchor: "100%",
    },
    {
      xtype: "textfield",
      name: "Name",
      fieldLabel: "Nombre",
      allowBlank: false,
      maxLength: 128,
      anchor: "100%",
    },
    {
      xtype: "displayfield",
      name: "pro_currency",
      fieldLabel: "Moneda",
      anchor: "100%",
    },
    {
      xtype: "numberfield",
      name: "Price",
      itemId: "Price",
      allowDecimals: true,
      alwaysDisplayDecimals: true,
      decimalSeparator: ",",
      decimalPrecision: 2,
      fieldLabel: "Precio",
      hideTrigger: true,
      anchor: "100%",
    },
    {
      xtype: "textarea",
      name: "Body",
      fieldLabel: "Observacion",
      anchor: "100%",
    },
    {
      xtype: "numberfield",
      name: "Cost",
      fieldLabel: "Costo",
      allowDecimals: true,
      alwaysDisplayDecimals: true,
      hideTrigger: true,
      anchor: "100%",
      allowBlank: false,
      hidden: true,
    },
    {
      xtype: "numberfield",
      name: "Weight",
      fieldLabel: "Peso",
      allowDecimals: true,
      alwaysDisplayDecimals: true,
      hideTrigger: true,
      anchor: "100%",
      allowBlank: false,
    },
    {
      xtype: "combobox",
      fieldLabel: "Estado",
      store: [
        ["1", getLocale("Disponible")],
        ["0", getLocale("No Disponible")],
      ],
      multiselect: false,
      editable: false,
      queryMode: "local",
      name: "Status",
    },
    {
      xtype: "combo",
      editable: false,
      queryMode: "local",
      fieldLabel: "Organización",
      lastQuery: "",
      name: "org_organizacionId",
      itemId: "org_organizacionId",
      displayField: "org_cnombre",
      valueField: "Id",
    },
    {
      xtype: "combo",
      editable: false,
      queryMode: "local",
      fieldLabel: "Tipo",
      name: "pro_itipo",
      store: [
        [0, getLocale("Otros")],
        [1, getLocale("Producto")],
        [2, getLocale("Servicio")],
      ],
    },
    {
      xtype: "combo",
      editable: false,
      queryMode: "local",
      fieldLabel: getLocale("Cantidad automática"),
      name: "pro_cantidad_auto",
      itemId: "proCantidadAuto",
      store: [
        [0, getLocale("No (manual)")],
        [1, getLocale("Por cuentas activas")],
      ],
    },
    {
      xtype: "checkbox",
      boxLabel: "Este producto se visualiza en todas las organizaciones",
      itemId: "todaslasorganizaciones",
      hidden: true,
      submitValue: false, // No enviarlo en el form ya que no tiene name
    },
    {
      xtype: "productolistaprecioview",
    },
    {
      xtype: "impuestoitemgridview",
      itemId: "vat",
      name: "VAT",
    },
    // {
    //     xtype : 'combo',
    //     fieldLabel : 'Impuesto',
    //     //name : 'tip_ntipo',
    //     forceSelection: true,
    //     editable: false,
    //     allowBlank: true,
    //     valueField : 'Id',
    //     queryMode: 'local',
    //     lastQuery: '',
    //     displayField : '_imp_cdescripcion',
    //     anchor:'100%',
    //     itemId: 'impuesto',
    //     margin: '5 0 5 0',
    //     plugins : ['clearbutton']
    // }
  ],
  initComponent: function () {
    this.callParent();
    const view = this.up();
    this.down("productolistaprecioview").record = this.record;
    const id = this.record.data.Id;
    const that = this;
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-table-save",
          text: "Guardar",
          scope: this,
          action: "save",
          // El handler se define en el controlador STProductosFormController.onSaveClick
        },
      ], // cierro items
    });
    this.addDocked(toolbar);

    // For edit
    if (this.record) {
      this.loadRecord(this.record);
    }
  }, // cierro init
});
