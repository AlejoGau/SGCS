Ext.define('AdministratorSearch.view.w_destinatarios_correoFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.w_destinatarios_correoformview',
    title: 'Marca',
    autoHeight: true,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [        
        {
			xtype : 'textfield',
			name : 'destino',
			disabled : false,
			fieldLabel : 'Destino'
	    },
        {
			xtype : 'textfield',
			name : 'email_destino',
			disabled : false,
			fieldLabel : 'Email'
	    }
    ],

	initComponent : function() {
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    action: 'save',
                    itemId: 'save'
                }
            ]// cierro items
         });
         
		this.callParent(arguments);
        this.addDocked(toolbar);
	} // cierro init

});