Ext.define('AdministratorSearch.view.TablasPortAiasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablaspostaliasformview'],
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
			name : 'tpa_icodigo',
            fieldLabel: 'Codigo',
			allowBlank : false,
            maxLength: 3,
            
		},{
			xtype : 'numberfield',
			name : 'tpa_cdealer',
            fieldLabel: 'Dealer',
			allowBlank : false
		},{
    		xtype : 'numberfield',
			name : 'tpa_ipuerto',
            itemId: 'tpa_ipuerto',
            fieldLabel: 'Puerto',
			allowBlank : false
		},{
        	xtype : 'textfield',
			name : 'tpa_iportip',
            fieldLabel: 'Port ip',
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