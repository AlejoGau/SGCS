Ext.define('AdministratorSearch.view.TablasResolucionesLlamadaFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasresolucionesllamadaformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
    	anchor : '100%',
         enforceMaxLength: true
	},
	items : [
       {
			xtype : 'textfield',
			name : 'rll_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            maxLength: 50,
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