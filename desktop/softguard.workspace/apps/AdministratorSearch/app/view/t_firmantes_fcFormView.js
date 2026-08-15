Ext.define('AdministratorSearch.view.t_firmantes_fcFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_firmantes_fcformview'],
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
			name : 'fir_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype : 'textfield',
			name : 'fir_ccuenta',
            fieldLabel: 'Cuenta'
		},{
            xtype : 'numberfield',
			name : 'fir_nlimite',
            fieldLabel: 'Limite'
		},{
            xtype : 'textfield',
			name : 'fir_mlegajo',
            fieldLabel: 'Legajo'
		},{
            xtype : 'combo',
            fieldLabel : 'Estado',
            itemId: 'estado',
            name : 'fir_nestado',
            multiSelect: false,
            flex:1,
            queryMode: 'local',
            store:[
                [0, getLocale('Sin confirmar')],
                [1, getLocale('Confirmado')]
                ]
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