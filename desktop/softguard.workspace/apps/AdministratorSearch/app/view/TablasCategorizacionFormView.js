Ext.define('AdministratorSearch.view.TablasCategorizacionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablascategorizacionformview'],
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
			name : 'cat_cDescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            enforceMaxLength: true,
            maxLength: 40,
            anchor: '100%'
		},{
            xtype : 'combo',
            fieldLabel : 'Mostrar',
            name : 'cat_iEstado',
            store: [
                [1,getLocale('Web Remoto')],
                [0,getLocale('No')],
                [2,getLocale('Autoridades')],
            ],
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