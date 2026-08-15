Ext.define('SgAppAccountAdministration.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
            {
                xtype: 'accountadministrationtoolbarview',
                itemId: 'north',
                id: 'north',
                region: 'north'
            }      
            ,{
                xtype: '',
                region: 'south',
                itemId: 'south',
                id: 'south'
            }
        
        
        
            ,{
                xtype: 'tabpanel',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});