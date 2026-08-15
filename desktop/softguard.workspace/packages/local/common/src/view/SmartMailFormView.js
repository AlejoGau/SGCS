//MIGRADO2024
Ext.define("Common.view.SmartMailFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.smartmailformview"],
  preventHeader: true,
  frame: true,
  border: 0,
  layout: {
    type: "vbox",
    align: "stretch",
  },

  //requires: 'Slbf.ux.uxiframe',
  emptyText: getLocale("No hay archivos adjuntos."),
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 80,
  },
  items: [
    {
      xtype: "combo",
      name: "From",
      fieldLabel: "De",
      valueField: "AccountName",
      displayField: "completeName",
      itemId: "sender",
      lastQuery: "",
      multiSelect: false,
      editable: false,
      forceSelection: true,
      allowBlank: false,
    },
    {
      xtype: "displayfield",
      name: "_From",
      itemId: "fromfield",
      fieldLabel: "De",
      hidden: true,
      disabled: true,
    },
    {
      xtype: "textfield",
      name: "Destino",
      itemId: "destino",
      fieldLabel: "Para",
      allowBlank: true,
      hidden: true,
      emptyText: "email@dominio.com (o varios separados por coma)",
    },
    {
      xtype: "textfield",
      name: "Name",
      itemId: "asunto",
      fieldLabel: "Asunto",
      allowBlank: false,
      emptyText: "Asunto",
    },
    {
      xtype: "combo",
      name: "Status",
      fieldLabel: "Estado",
      allowBlank: false,
      hidden: true,
      forceSelection: true,
      store: [
        ["A", getLocale("Activo")],
        ["I", getLocale("Inactivo")] /*,
                ['C', getLocale('Completo')]*/,
      ],
    },
    {
      xtype: "fieldset",
      collapsed: true,
      collapsible: true,
      title: getLocale("Archivos adjuntos"),
      layout: "fit",
      itemId: "adjuntos",
      disabled: true,
      items: [{ xtype: "smpattachgridview" }],
    },
    {
      xtype: "fieldset",
      collapsed: true,
      collapsible: true,
      title: getLocale("Programar envío..."),
      itemId: "programarEnvio",
      layout: "hbox",
      items: [
        {
          xtype: "datefield",
          disabled: false,
          name: "DateStart",
          itemId: "programstart",
          allowBlank: false,
          //value: new Date(),
          flex: 1,
        },
        {
          xtype: "timefield",
          disabled: false,
          name: "Time",
          allowBlank: false,
          itemId: "programtime",
          //value: new Date(),
          flex: 1,
        },
      ],
    },
    {
      xtype: "htmleditor",
      shrinkWrap: false,
      flex: 1,
      itemId: "body",
      name: "Body",
      allowBlank: false,
      // disabled: true
    },
    {
      xtype: "uxiframe",
      itemId: "iframe",
      flex: 1,
      hidden: true,
    },
  ],
  initComponent: function () {
    //this.addEvents('objectchanged');
    this.callParent();

    this.down("smpattachgridview").record = this.record;

    const items = [
      {
        iconCls: "icon-delete",
        text: "Eliminar",
        action: "delete",
        scope: this,
      },
      "->",
      {
        xtype: "combo",
        fieldLabel: "Template",
        queryMode: "local",
        displayField: "Name",
        valueField: "Id",
        labelWidth: 50,
        width: 250,
        itemId: "comboTemplate",
      },
      {
        text: "Aplicar",
        action: "applyTemplate",
      },
    ];

    const shouldShowSend = this.record.get("Status") !== "C" && this.record.get("Status") !== "P";

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: shouldShowSend
        ? [
            {
              iconCls: "save",
              text: "Enviar",
              scope: this,
              action: "save",
            },
            ...items,
          ]
        : items,
      // cierro items
    });
    this.addDocked(toolbar);

    // --- Validación manual de Asunto, De (sender) y Destino ---
    const asunto    = this.down("#asunto");          // textfield Asunto
    const sender    = this.down("#sender");          // combo De
    const destino   = this.down("#destino");         // textfield Destino (con tu regex)

    const updateSendBtn = () => {
      const btnSend   = toolbar.down();      // botón Enviar

      // Asunto válido y no vacío
      const asuntoValido = asunto && asunto.isValid() && !!Ext.String.trim(asunto.getValue() || "");

      // Sender (De) válido y con valor (forzando selección)
      const senderValido = sender && sender.isValid() && !Ext.isEmpty(sender.getValue());

      // Destino: solo exigir si está visible (si lo ocultás a veces)
      const destinoVisible = destino && !destino.isHidden();
      const destinoValido = !destinoVisible
        ? true
        : (destino.isValid() && !!Ext.String.trim(destino.getValue() || ""));

      const habilitar = asuntoValido && senderValido && destinoValido;
      if (btnSend) btnSend.setDisabled(!habilitar);
    };

    // Escuchá cambios y validez de cada campo
    [asunto, sender, destino].forEach((cmp) => {
      if (!cmp) return;
      cmp.on("change", updateSendBtn, this);
      cmp.on("validitychange", updateSendBtn, this);
    });

    // Llamada inicial
    updateSendBtn();
  }, // cierro init
});
