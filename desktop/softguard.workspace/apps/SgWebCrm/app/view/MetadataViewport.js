Ext.define("SGWebCrm.view.MetadataViewport", {
  extend: "Ext.container.Viewport",
  requires: ["SGWebCrm.view.CrmNorthView"],
  alias: "widget.viewport",
  id: "viewport",
  layout: "border",
  items: [
    {
      xtype: "moduletoolbar",
      region: "north",
    },
    {
      xtype: "tabpanel",
      id: "center",
      itemId: "center",
      region: "center",
    },
  ],
});
