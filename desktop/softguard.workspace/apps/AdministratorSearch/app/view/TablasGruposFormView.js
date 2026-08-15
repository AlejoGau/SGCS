Ext.define('AdministratorSearch.view.TablasGruposFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasgruposformview'],
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
			name : 'gru_ccodigo',
            fieldLabel: 'Codigo',
			allowBlank : false,
            maxLength: 3,
            inputWidth :40
            
		},{
			xtype : 'textfield',
			name : 'gru_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            maxLength: 40,
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