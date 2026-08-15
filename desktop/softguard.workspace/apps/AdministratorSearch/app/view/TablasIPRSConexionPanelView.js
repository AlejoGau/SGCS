Ext.define('AdministratorSearch.view.TablasIPRSConexionPanelView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.tablasiprsconexionpanelview'],
    title : 'Servicios IPRS',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },    
   
    items: [

        {
            xtype:'tabpanel',
            flex:1,
            items: [
                {
                    xtype:'iprserviciosgridview'
                    
                },{
                    xtype:'iprsconecciongridview',
                    openFromConfiguration : true
                }
            ]
        }
        
     ],
     initComponent: function () {                
        this.callParent(arguments);   
        
        
     }
});