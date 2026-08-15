//MIGRADO2024
Ext.define('Common.view.ImagenROView', {
    extend:'Ext.panel.Panel',
    alias : 'widget.imagenropanel', 
    border : false,
	layout : 'fit',
   
    items : [
    	{
    		xtype:'image',
            id: 'fotoImage'
    	}
    ],
    
    initComponent: function() {
        this.callParent(arguments);
    }
});