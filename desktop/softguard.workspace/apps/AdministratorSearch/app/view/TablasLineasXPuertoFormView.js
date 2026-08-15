Ext.define('AdministratorSearch.view.TablasLineasXPuertoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablaslineasxpuertoformview'],
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
    		xtype : 'textfield',
			name : 'lxp_iAlias',
            fieldLabel: 'Alias',
			allowBlank : false,
            
		},{
			xtype : 'textfield',
			name : 'lxp_nLinea',
            fieldLabel: 'Linea',
			allowBlank : false
		},{
    		xtype : 'textfield',
			name : 'lxp_nEstado',
            fieldLabel: 'Estado',
			allowBlank : false
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