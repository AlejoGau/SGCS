Ext.define('WebRemoto.view.PanelDescripcionByEventoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.paneldescripcionbyeventoview',
    //title : 'Eventos en Tiempo Real',
    layout : {
        type : 'vbox',
        align: 'stretch'
    },
    
    items : [
       {
			xtype:'displayfield',
			
            id: 'descripcion',
            itemId : 'descripcion'
		}
    ],
    
    initComponent: function(){
        
        
        this.callParent();
        
      
    }
});