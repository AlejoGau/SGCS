Ext.define("Common.view.ContratoFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.contratoformview"],
  requires: [],
  title: "Order",
  frame: false,
  autoScroll: true,
  bodyPadding: 5,
  fieldDefaults: {
    labelWidth: 150,
    labelAlign: "left",
    editable: false,
  },
  items: [
    {
      xtype: "displayfield",
      value: "Contrato vencido",
      itemId: "contratovencido",
      hidden: true,
      fieldStyle:
        "background-color:#ff0000; text-align:center; color:#fff; font-size:20px; padding:10px; width:100%",
      width: "100%",
    },
    {
      xtype: "displayfield",
      fieldLabel: "ID contrato",
      itemId: "idcontrato",
      hidden: true,
    },
    {
      xtype: "container",
      itemId: "contratoHeaderContainer",
      minWidth: 1080,
      layout: {
        type: "hbox",
        align: "stretch",
      },
      defaults: {
        margin: "0 20 0 0",
      },
      items: [
        {
          xtype: "container",
          layout: {
            type: "vbox",
            align: "stretch",
          },
          flex: 1.7,
          minWidth: 360,
          items: [
            {
              xtype: "fieldset",
              title: "Info. Contacto",
              items: [
                //--------------------
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 5 0",
                  itemId: "organizacion",
                  items: [
                    {
                      xtype: "displayfield",
                      fieldLabel: "Cliente",
                      name: "_organization",
                      width: 300,
                    },
                    {
                      xtype: "button",
                      action: "organizationChange",
                      itemId: "clientButton",
                      text: "Seleccionar cliente",
                    },
                  ],
                },
                {
                  xtype: "textfield",
                  hidden: true,
                  itemId: "cnt_idcliente",
                  name: "cnt_idcliente",
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 5 0",
                  items: [
                    {
                      xtype: "combo",
                      editable: false,
                      queryMode: "local",
                      fieldLabel: "Condicion de pago",
                      lastQuery: "",
                      name: "cnt_formapago",
                      itemId: "formadepago",
                      displayField: "con_cdescripcion",
                      valueField: "Id",
                      margin: "0 10 0 0",
                      hidden: true,
                    },
                    {
                      xtype: "displayfield",
                      itemId: "infoformadepago",
                    },
                  ],
                },
                {
                  xtype: "combo",
                  name: "cnt_org_fc",
                  displayField: "org_cnombre",
                  queryMode: "local",
                  itemId: "organizaciones",
                  valueField: "Id",
                  editable: false,
                  fieldLabel: "Empresa",
                  hidden: true,
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  margin: "0 0 5 0",
                  items: [
                    {
                      xtype: "datefield",
                      fieldLabel: "Vencimiento",
                      name: "cnt_fechavto",
                      itemId: "cnt_fechavto",
                      allowBlank: false,
                    },
                  ],
                },

                {
                  xtype: "combo",
                  store: [
                    [0, getLocale("Pendiente")],
                    [1, getLocale("Activo")],
                    [2, getLocale("Cancelado")],
                    [3, getLocale("Vencido")],
                  ],
                  editable: false,
                  queryMode: "local",
                  fieldLabel: "Estado",
                  lastQuery: "",
                  name: "cnt_estado",
                },
                {
                  xtype: "container",
                  layout: "hbox",
                  items: [
                    {
                      xtype: "checkboxfield",
                      name: "cnt_dinamico",
                      fieldLabel: "Contrato dinamico",
                      margin: "0 5 5 0",
                      itemId: "cnt_dinamico",
                      inputValue: 1,
                      queryMode: "local",
                    },
                    {
                      xtype: "button",
                      width: 20,
                      iconCls: "icon-help",
                      listeners: {
                        click: function (button) {
                          var view = button.up("contratoformview");
                          view.tip.showBy(button);
                        },
                      },
                    },
                  ],
                },
                {
                  xtype: "combo",
                  store: [
                    [0, getLocale("Manual")],
                    [1, getLocale("Por cuentas activas")],
                  ],
                  editable: false,
                  queryMode: "local",
                  fieldLabel: "Tipo cantidad",
                  lastQuery: "",
                  name: "cnt_cantidad_auto",
                  itemId: "cnt_cantidad_auto",
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          xtype: "fieldset",
          title: "Template de contrato",
          layout: {
            type: "vbox",
            align: "stretch",
          },
          flex: 1.35,
          minWidth: 320,
          items: [
            {
              xtype: "selecterfield",
              itemId: "contratotemplate",
              simpleSelect: true,
              cls: "fieldset-template",
              config: {
                disponible: {
                  title: "Template",
                  field: "tmp_asunto",
                  searchField: "o.[tmp_asunto]",
                },
                selecionado: {
                  title: "Template",
                  field: "tmp_asunto",
                },
                valueField: "Id",
                prefijoParaFiltro: "o",
                modelItems: "Common.model.m_template_contratoSearchModel",
                nuevoView: "contratotemplateformview",
                editorView: "contratotemplateformview",
              },
              filter: [
                {
                  property: "tmp_itipo",
                  value: 1,
                },
              ],
              //title: 'Templates de contrato'
            },
            {
              xtype: "formbuilderedithelperview",
              cls: "fieldset-template",
            },
          ],
        },
        {
          xtype: "container",
          layout: {
            type: "vbox",
            align: "stretch",
          },
          flex: 1.15,
          minWidth: 340,
          margin: "0",
          items: [
            {
              xtype: "fieldset",
              itemId: "renovacionFieldset",
              title: "Renovacion",
              layout: "anchor",
              margin: "0 0 15 0",
              defaults: {
                anchor: "100%",
                labelWidth: 85,
              },
              items: [
                {
                  xtype: "numberfield",
                  itemId: "cantidadrenovacion",
                  fieldLabel: "Cantidad",
                },
                {
                  xtype: "combo",
                  store: [
                    ["dia", getLocale("Dias")],
                    ["mes", getLocale("Meses")],
                    ["ano", getLocale("Años")],
                    ["sinrenovacion", getLocale("Sin renovacion")],
                  ],
                  editable: false,
                  queryMode: "local",
                  fieldLabel: "Período",
                  lastQuery: "",
                  itemId: "tipoperiodo",
                },
              ],
            },
            {
              xtype: "fieldset",
              itemId: "bonificacionFieldset",
              title: "Bonificacion",
              layout: "anchor",
              margin: "0",
              defaults: {
                anchor: "100%",
                labelWidth: 130,
              },
              items: [
                {
                  xtype: "checkboxfield",
                  itemId: "bonificacion_habilitada",
                  fieldLabel: "Aplicar",
                  boxLabel: "Bonificacion activa",
                },
                {
                  xtype: "combo",
                  itemId: "bonificacion_tipo",
                  fieldLabel: "Tipo",
                  editable: false,
                  queryMode: "local",
                  displayField: "text",
                  valueField: "value",
                  store: Ext.create("Ext.data.Store", {
                    fields: ["value", "text"],
                    data: [
                      { value: "porcentaje", text: "Porcentaje" },
                      { value: "monto_fijo", text: "Monto fijo" },
                    ],
                  }),
                },
                {
                  xtype: "numberfield",
                  itemId: "bonificacion_valor",
                  fieldLabel: "Valor",
                  minValue: 0,
                  decimalPrecision: 2,
                  step: 0.01,
                },
                {
                  xtype: "checkboxfield",
                  itemId: "bonificacion_permanente",
                  fieldLabel: "Vigencia",
                  boxLabel: "Permanente",
                },
                {
                  xtype: "datefield",
                  itemId: "bonificacion_desde",
                  fieldLabel: "Desde",
                  format: "d/m/Y",
                },
                {
                  xtype: "datefield",
                  itemId: "bonificacion_hasta",
                  fieldLabel: "Hasta",
                  format: "d/m/Y",
                },
                {
                  xtype: "displayfield",
                  itemId: "bonificacion_estado",
                  fieldLabel: "Estado",
                  value: "Sin bonificacion",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      xtype: "contratoitemsearchview",
      itemId: "contratoitemsearchview",
      flex: 1,
      margin: "5 0 0 0",
      minHeight: 200,
    },
    {
      xtype: "contratocuentagridview",
      itemId: "contratocuentagridview",
      flex: 1,
      margin: "5 0 0 0",
      minHeight: 200,
    },
  ],
  setRecord: function (record) {
    this.record = record;
    this.down("contratoitemsearchview").record = record;

    var v_contratocuentagridview = this.down("contratocuentagridview");
    if (v_contratocuentagridview) {
      v_contratocuentagridview.record = record;
      v_contratocuentagridview.recordOrganizacion = this.recordOrganizacion;
    }

    this.down("formbuilderedithelperview").view = this;
    this.down("contratoitemsearchview").recordOrganizacion =
      this.recordOrganizacion;
  },
  initComponent: function () {
    this.callParent();
    this.down("#contratotemplate").config.recordParaNuevo = Ext.create(
      "Common.model.m_template_contratoModel",
      {
        tmp_itipo: 1,
      },
    );
    if (this.record) {
      this.setRecord(this.record);
    }

    this.tip = Ext.create("Ext.tip.ToolTip", {
      html: getLocale(
        "El contrato dinámico, permite actualizar automáticamente el valor del servicio adquirido según las políticas de comercialización de la empresa.<br>Al seleccionar esta opción, se aplicará al cliente cualquier cambio en su contratación de forma automática.",
      ),
    });
    var record = this.record;
    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "save",
          text: "Guardar",
          scope: this,
          action: "save",
          itemId: "save",
        },
        "-",
        {
          text: "Aviso programado",
          iconCls: "icon-clock",
          disabled: true,
          itemId: "avisosprogramados",
          menu: {
            xtype: "menu",
            width: 400,
            items: [
              {
                xtype: "avisoprogramadogridview",
                idParent: record.get("ObjectTypeId"),
                idRecord: record.get("Id"),
                idOrganizacion: record.get("cnt_idcliente"),
                metadata: record.get("cnt_metadata"),
              },
            ],
          },
        },

        "->",
        {
          iconCls: "icon-page-white",
          text: "Ver contrato",
          action: "verContrato",
        },
        {
          iconCls: "icon-page-white-acrobat",
          text: "Descargar",
          action: "descargar",
        },
      ],
    });
    this.addDocked(toolbar);
  },
});
