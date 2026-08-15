Ext.define("Common.view.MailActionFormView", {
  extend: "Ext.form.Panel",
  alias: ["widget.mailactionformview"],
  preventHeader: true,
  frame: false,
  border: 0,
  layout: {
    type: "vbox",
    align: "stretch",
  },
  emptyText: getLocale("No hay archivos adjuntos."),
  fieldDefaults: {
    labelAlign: "left",
    labelWidth: 80,
    anchor: "100%",
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
      xtype: "container",
      layout: "hbox",
      width: "100%",
      items: [
        {
          xtype: "textfield",
          name: "_to",
          itemId: "to",
          fieldLabel: "Para",
          allowBlank: false,
          emptyText: getLocale("Completar"),
          flex: 1,
        },
        {
          xtype: "button",
          text: "",
          qtip: "Agregar emails",
          iconCls: "icon-user-add",
          listeners: {
            click: function () {
              this.up("mailactionformview").targetField = "#to";

              var win = Ext.create("Ext.Window", {
                layout: "fit",
                title: "Seleccione los contactos",
                closeAction: "hide",
                itemId: "personWin",
                width: 750,
                height: 550,
                border: true,
                modal: true,
                view: this.up("mailactionformview"),
                items: [this.up("mailactionformview").helperConfig],
              });
              win.show();
            },
          },
        },
      ],
    } /*,{
            xtype:'container',
            layout:'hbox',
            items: [
                    
                    {
                        xtype : 'textfield',
            			name : '_cc',
                        itemId: 'cc',
                        fieldLabel: 'CC',
            			allowBlank : true,
                        emptyText: getLocale('Completar'),
                        flex:1
            		},{
                        xtype: 'button',
                        text: '',
                        qtip: 'Agregar emails',
                        iconCls: 'icon-user-add',
                        listeners: {
                            click: function () {
                                
                                
                                
                                this.up('mailactionformview').targetField= '#cc';
                            
                                var win = Ext.create('Ext.Window', {
                                    layout: 'fit',
                        			title : 'Seleccione los contactos',
                        			closeAction : 'hide',
                                    itemId: 'personWin',
                        			width : 750,
                        			height : 550,
                        			border : true,
                                    modal: true,
                                    view: this.up('mailactionformview'),
                        			items : [
                                       this.up('mailactionformview').helperConfig
                                    ]
                        		});
                        		win.show();
                                
                            }
                        }
                    }
                ]
		},{
            xtype:'container',
            layout:'hbox',
            items: [
                    {
                        xtype : 'textfield',
            			name : '_cco',
                        itemId: 'cco',
                        fieldLabel: 'CCO',
            			allowBlank : true,
                        emptyText: getLocale('Completar'),
                        flex:1
            		},{
                        xtype: 'button',
                        text: '',
                        qtip: 'Agregar emails',
                        iconCls: 'icon-user-add',
                        listeners: {
                            click: function () {
                                
                               
                                
                                this.up('mailactionformview').targetField = '#cco';
                            
                                var win = Ext.create('Ext.Window', {
                                    layout: 'fit',
                        			title : 'Seleccione los contactos',
                        			closeAction : 'hide',
                                    itemId: 'personWin',
                        			width : 750,
                        			height : 550,
                        			border : true,
                                    modal: true,
                                    view: this.up('mailactionformview'),
                        			items : [
                                        this.up('mailactionformview').helperConfig
                                    ]
                        		});
                        		win.show();
                                
                            }
                        }
                    }
                ]
		}*/,
    {
      xtype: "textfield",
      name: "Name",
      itemId: "asunto",
      fieldLabel: "Asunto",
      allowBlank: false,
      emptyText: getLocale("Asunto"),
    },
    {
      xtype: "fieldset",
      collapsed: true,
      collapsible: true,
      title: getLocale("Archivos adjuntos"),
      layout: "fit",
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
          flex: 1,
        },
        {
          xtype: "timefield",
          disabled: false,
          name: "Time",
          allowBlank: false,
          itemId: "programtime",
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
    },
    //---------oculto esto, es solo para enviar un post de action-----
    {
      xtype: "datefield",
      //  disabled: true,
      hidden: true,
      name: "Date",
      allowBlank: false,
    },
    {
      xtype: "combo",
      name: "ActionType",
      hidden: true,
      itemId: "ActionType",
      store: "ActionTypeStore",
      displayField: "Name",
      valueField: "Value",
      queryMode: "local",
      editable: false,
      allowBlank: false,
    },
    {
      xtype: "textfield",
      hidden: true,
      name: "Name",
      itemId: "Name",
      allowBlank: false,
    },
    {
      xtype: "htmleditor",
      hidden: true,
      anchor: "100% 100%",
      name: "Description",
      allowBlank: false,
    },
  ],

  initComponent: function () {
    this.callParent();

    this.down("smpattachgridview").record = this.record;

    var toolbar = Ext.create("Ext.toolbar.Toolbar", {
      items: [
        {
          iconCls: "icon-email-go",
          text: "Enviar",
          scope: this,
          action: "save",
        },
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
      ], // cierro items
    });
    this.addDocked(toolbar);
  }, // cierro init
});
