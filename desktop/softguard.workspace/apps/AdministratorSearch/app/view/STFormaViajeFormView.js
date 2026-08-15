Ext.define('AdministratorSearch.view.STFormaViajeFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.stformaviajeformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        {
			xtype : 'textfield',
			name : 'sfv_cNombre',
            fieldLabel: 'Nombre',
			allowBlank : false,
            anchor:'100%'
		}
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});