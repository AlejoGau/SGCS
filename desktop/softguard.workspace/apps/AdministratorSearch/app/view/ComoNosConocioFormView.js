Ext.define('AdministratorSearch.view.ComoNosConocioFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.comonosconocioformview'],
    frame : false,   
    autoScroll:true,
   
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items : [
       {
           xtype:'textfield',
           fieldLabel:'Nombre',
           name:'Name'
       }
        
    ],
    
	initComponent : function() {
		this.callParent();
                
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-disk',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]
         }); 
         this.addDocked(toolbar);
	} 

});