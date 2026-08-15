Ext.define('Administrator.view.VideoSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.VideoSecurity',
    
    items: [
        {
            xtype: 'checkbox',
            fieldLabel: 'Modificar datos',
            itemId: 'chckmodificar',
            multiselect : false,
            name: 'modificar'
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
