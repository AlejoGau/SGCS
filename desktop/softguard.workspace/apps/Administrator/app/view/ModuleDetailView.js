Ext.define('Administrator.view.ModuleDetailView', {
    extend : 'Ext.tab.Panel',
    alias : 'widget.moduledetail',
    preventHeader: true,

	items : [
        ],

	initComponent : function() {
		this.callParent(arguments);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            itemId: 'footer',
            dock: 'bottom',
            ui: 'footer',
            items: [
                "->",{
                	text : 'Cancelar',
                    action: 'cancel'
        		}/*, {
            		text : 'Eliminar',
                    action: 'deleteModule'
        		}*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
	} // cierro init

});
