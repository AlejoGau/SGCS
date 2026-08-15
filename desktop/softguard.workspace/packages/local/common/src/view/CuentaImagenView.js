//MIGRADO2024
Ext.define('Common.view.CuentaImagenView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.cuentaimagenview',
    //title : 'Eventos en Tiempo Real',
    layout : 'fit',
    autoScroll: true,
    
	items : [
       {
			xtype:'image',
			
            id: 'cuentaFotoImage',
            itemId : 'cuentaFotoImage'
		}
    ],
    
    initComponent: function(){
        
        
        this.callParent();
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                
                ]// cierro items
         }); 
        
        this.addDocked(pagingtoolbar);
        this.addDocked(toolbar);
    }
});