Ext.define('AdministratorSearch.view.TablasTagsAgFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablastagsagformview'],
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
			name : 'tag_ctag',
            fieldLabel: 'Tag',
			allowBlank : false,
            maxLength: 20,
            inputWidth :100
		},{
    		xtype : 'textfield',
			name : 'tag_czona',
            fieldLabel: 'Zona',
			allowBlank : false,
            maxLength: 3,
            inputWidth :100
		},{
            xtype : 'displayfield',
            fieldLabel : 'Cuenta',
            name : '_cuenta',
    		allowBlank : false,
            anchor: '100%'
        },{
            xtype : 'displayfield',
            fieldLabel : 'Nombre',
    		allowBlank : false,
            name : '_nombre'
        },{
            xtype : 'displayfield',
            fieldLabel : '',
            name : 'tag_iCuenta',
            hidden: true
        },
        {
            xtype: 'button',
            action: 'cambiarCuenta',
            text: 'Cambiar cuenta asociada',
            margin: '0 0 5 0'
        },
        {
            xtype: 'hiddenfield',
            name: 'tag_iCuenta'
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