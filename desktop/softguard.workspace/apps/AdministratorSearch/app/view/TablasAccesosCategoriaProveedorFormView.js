Ext.define('AdministratorSearch.view.TablasAccesosCategoriaProveedorFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasaccesoscategoriaproveedorformview'],
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
			name : 'acp_cDescripcion',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 60,
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