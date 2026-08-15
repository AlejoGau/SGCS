//MIGRADO2024
Ext.define('Common.view.ZonaImagenByEventoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.zonaimagenbyeventoview',
    //title : 'Eventos en Tiempo Real',
    /*layout : {
        type : 'fit'
    },*/
    autoScroll:true,
	items : [
       {
			xtype:'image',
            itemId : 'zonaImagen',
            style: {
                maxHeight: '100%',
                maxWidth:'100%'
            }
		}
    ],
    
    initComponent: function(){
        
        
        this.callParent();
        /*
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'paging',
            displayInfo: true
        });
        */
        /*
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                
                ]// cierro items
         }); 
        */
        //this.addDocked(pagingtoolbar);
        //this.addDocked(toolbar);
    }
});