Ext.define('AdministratorSearch.view.TablaIpconPanelView', {
    extend : 'Ext.tab.Panel',
    alias : ['widget.tablasipcongridview'],
    translate : false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },    
    preventHeader : true,
    flex : 1,
    items: [
        {xtype:'tablasiprsconexionpanelview'},
        {xtype:'tablasipconexgridview'}
     ],
     initComponent: function () {                
        this.callParent(arguments);   
        
        
     }
});