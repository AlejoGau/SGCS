Ext.define('Administrator.view.AWCCBPSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.AWCCBPSecurity',
    
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Usuario',
            itemId: 'awccCombo',
            //multiselect : false,
            editable : false,
            queryMode: 'local',
            forceSelection: true,
            typeAhead: false,
            displayField: 'comboText',
            valueField: 'ope_clogin'
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
