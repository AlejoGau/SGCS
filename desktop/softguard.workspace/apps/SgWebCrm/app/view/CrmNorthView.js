Ext.define("SGWebCrm.view.CrmNorthView", {
  extend: "Ext.panel.Panel",
  alias: ["widget.crmnorthview", "widget.moduletoolbar"],
  region: "north",
  id: "app-header",
  collapsible: false,
  tbar: [
    {
      xtype: "box",
      html: getLocale("SoftGuard Web CRM"),
      id: "crudTitle",
    },
    "->",
    {
      text: "Entidades",
      iconCls: "icon-Organization",
      itemId: "btnOrganization",
      //view : 'organizationgridview',
      closable: true,
    },
    {
      text: "Smartpanics",
      //translate:false,
      iconCls: "icon-smartpanic",
      view: "smartpaniccrmgridview",
      itemId: "btnSmartpanics",
      closable: true,
    },
    {
      text: "Calendario",
      iconCls: "icon-date",
      view: "eventcalendarview",
      itemId: "btnCalendar",
      closable: true,
    },
    {
      text: "Encuestas",
      iconCls: "icon-textfield",
      itemId: "btnEncuestas",
      view: "encuestasview",
      closable: true,
    } /*,{

    /*,{
        text : 'Historial',
        iconCls : 'icon-hourglass',
		view : 'actiongridview',
        closable: true
	}*/,
    //       text : 'Comprobante',
    //       iconCls : 'icon-money-dollar',
    //   	view : 'comprobantegridview',
    //       closable: true
    // }*/,
    {
      text: "SmartMail",
      //translate:false,
      itemId: "btnsmartmail",
      iconCls: "icon-email",
      view: "smartmailprogramgridview",
      closable: true,
      viewConfig: {
        /**Daniel O. Medina 11/11/2020 https://basecamp.com/2249105/projects/14758734/todos/428894954 */
        /************** */
        // filters:[{
        //    property: 'Priority:ltint',
        //    value: 600
        // }]
      },
    },
    //   closable: true,
    // },
    {
      text: "MoneyGuard",
      iconCls: "SgWebMG-icon",
      menu: [
        {
          text: "Productos",
          iconCls: "icon-Product",
          //view : 'productgridview',
          itemId: "btnProduct",
          hidden: true, // Temporalmente oculto - se mostrara cuando el filtrado este listo
        },
        {
          text: "Contratos",
          iconCls: "icon-money-dollar",
          //view : 'contratotabpanelview',
          itemId: "btnContratos",
          //translate:false,
          closable: true,
        },
        {
          text: "Cotizaciones",
          iconCls: "icon-money-dollar",
          itemId: "cotizaciones",
          //view : 'ordergridview',
          //translate:false,
          closable: true,
        },
        {
          text: "Contactos",
          iconCls: "icon-Person",
          itemId: "btnPerson",
          //view : 'persongridview',
          //translate:false,
          closable: true,
          hidden: true, // Temporalmente oculto - se mostrara cuando el filtrado este listo
        },
      ],
    },
    '-',
    // ,{
    //     text : 'Grupos',
    //     //translate:false,
    //     iconCls : 'icon-Taxonomy',
    // 	view : 'taxonomymanagertree',
    //     itemId:'btngrupos',
    //     closable: true
    // }
  ],
});
