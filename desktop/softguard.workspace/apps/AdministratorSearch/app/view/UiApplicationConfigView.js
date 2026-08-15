Ext.define('AdministratorSearch.view.UiApplicationConfigView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.uiapplicationconfigview',
    title : 'Configuración',
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch',
        autoSize: true,
        shrinkToFit: false
    },
	items : [    
        {
            xtype: 'uiapplicationconfigformview',
            collapsible: true,
            height: 150
        },
        {
            xtype:'bundlegridview',
            title: 'Historial',
            height: 200,
            autoScroll: true,
            //collapsed: true,
            collapsible: true
        },
        {
            xtype: 'metadatagridview',
            title: 'Configuración',
            //collapsed: true,
            collapsible: true
        }
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        
        this.down('uiapplicationconfigformview').record = this.record;
        this.down('bundlegridview').record = this.record;
        this.down('metadatagridview').record = this.record;
                
    } // cierro init
});