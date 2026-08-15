Ext.define('AdministratorSearch.view.AdministradorTareasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.administradortareasformview'],
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
    		xtype : 'combo',
        	fieldLabel: 'Estado',
            store: [
                    [1, getLocale('ACTIVO')],
                    [0, getLocale('INACTIVO')]
                    ],     
			displayField: 'Name',								
			valueField: 'Value',
            name: 'Status',
            allowBlank : false,
            queryMode:'local',
           
            
		},{
    		xtype : 'numberfield',
			name : 'Repetition',
            fieldLabel: 'Minutos',
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