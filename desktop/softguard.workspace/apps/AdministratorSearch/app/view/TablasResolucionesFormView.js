Ext.define('AdministratorSearch.view.TablasResolucionesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasresolucionesformview'],
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
			name : 'res_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,     
            enforceMaxLength: true,
            maxLength: 40,       
            anchor:'100%'
		},{
            xtype : 'combo',
            fieldLabel : 'Falsa alarma',
            name : 'res_nfalsaalarma',
            store: [
                [1,getLocale('Si')],
                [0,getLocale('No')],
            ],
        	allowBlank : false
		},{
            xtype : 'combo',
            fieldLabel : 'Mostrar',
            name : 'res_nEstado',
            store: [
                [0,getLocale('Web Remoto')],
                [1,getLocale('No')],
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