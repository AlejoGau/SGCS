Ext.define('Administrator.view.WebRemotoMobileSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.WebRemotoMobileSecurity',
    
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Pin',
            itemId: 'pin',
            enforceMaxLength: true,
            maxLength: 6,
            minLength: 4,
            maskRe: /[0-9]/
        }
    ],
    
	initComponent : function() {
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
	} // cierro init

});
