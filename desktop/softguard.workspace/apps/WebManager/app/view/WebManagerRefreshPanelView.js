Ext.define('WebManager.view.WebManagerRefreshPanelView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.webmanagerrefreshpanel',
    
    tools: [
    {
       itemId: 'refreshTool',
        type: 'refresh'
    },{
        itemId: 'helperTool',
        type: 'help'
    }]
});