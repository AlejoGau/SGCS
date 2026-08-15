Ext.define('AdministratorSearch.view.TelefonosDealerFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.telefonodealerformview'],
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
			name : 'Nombre',
            fieldLabel: 'nombre',
            itemId: 'nombre'
            
		},{
        	xtype : 'textfield',
			name : 'Telfono',
            fieldLabel: 'telefono',
            itemId: 'telefono'
            
		},{
        	xtype : 'textfield',
			name : 'Descripcion',
            fieldLabel: 'descripcion',
            itemId: 'descripcion'
            
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