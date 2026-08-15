Ext.define('Administrator.view.AWDMobileSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.AWDMobileSecurity', //le cambie el nombre para que no se muestr ya que da error
    
    items: [

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
