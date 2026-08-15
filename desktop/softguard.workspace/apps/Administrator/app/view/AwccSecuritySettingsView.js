Ext.define('Administrator.view.AwccSecuritySettingsView', {
    extend : 'Ext.form.Panel',
    title: 'Configuracion',
    alias : 'widget.AwccSecuritySettingsView',
    autoScroll:true,
    items: [        
        {
            xtype:'fieldset',
            title: 'Dealer',
            items: [

                {
                    xtype: 'combo',
                    itemId: 'dealer',
                    fieldLabel: 'Dealer',
        		    displayField: '_descripcion',
                    queryMode: 'local',                  
                    editable: false,
        		    valueField: 'lin_ccodigo'
                }                
            ]
        }        
    ],
    
    initComponent : function() {
        this.callParent(arguments);
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
         
         this.addDocked(toolbar);
    } // cierro init

});