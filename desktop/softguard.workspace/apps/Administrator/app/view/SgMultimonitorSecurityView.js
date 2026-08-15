Ext.define('Administrator.view.SgMultimonitorSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Configuracion',
    alias : 'widget.SgAppMultiMonitorWebSecurity',
    autoScroll:true,
    items: [
        
       
            {
                xtype: 'checkbox',
                fieldLabel: 'Sonido',
                itemId: 'sonido'
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
                    action: 'saveMultimonitor'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    } // cierro init

});

