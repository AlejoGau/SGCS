Ext.define('AdministratorSearch.view.t_monedasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_monedasformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true,
        anchor: '100%'
    },
    items : [
        {
            xtype : 'textfield',
    		name : 'mon_ccodigo',
            fieldLabel: 'Codigo'
		},{
            xtype : 'textfield',
			name : 'mon_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype : 'textfield',
			name : 'mon_csymbol',
            fieldLabel: 'Simbolo',
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
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});