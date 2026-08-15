Ext.define('AdministratorSearch.view.TablasListasEmergenciaFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablaslistasemergenciaformview'],
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
			name : 'lis_cdescripcion',
            fieldLabel: 'Descripcion',
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