Ext.define('AdministratorSearch.view.TablasFlotasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasflotasformview'],
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
			name : 'flo_ccodigo',
            fieldLabel: 'Codigo',
			allowBlank : false,
            maxLength: 3,
            inputWidth :40
            
		},{
			xtype : 'textfield',
			name : 'flo_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            maxLength: 40,
            anchor :'100%'
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