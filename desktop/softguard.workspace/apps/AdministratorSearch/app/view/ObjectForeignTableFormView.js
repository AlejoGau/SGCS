Ext.define('AdministratorSearch.view.ObjectForeignTableFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.objectforeingtableformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 100,
		anchor : '100%'
	},
	items : [
        {
        	xtype : 'displayfield',
			name : '_tabla',
            fieldLabel: 'Tabla',
			allowBlank : false,
            
		},
        {
        	xtype : 'displayfield',
			name : 'FieldName',
            fieldLabel: 'Campo',
			allowBlank : false,
            
		},
        {
    		xtype : 'textfield',
			name : 'NameText',
            fieldLabel: 'Valor a mostrar',
			allowBlank : false,
            
		},{
			xtype : 'textfield',
			name : 'Name',
            fieldLabel: 'Código / Clave',
			allowBlank : false
		}
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});