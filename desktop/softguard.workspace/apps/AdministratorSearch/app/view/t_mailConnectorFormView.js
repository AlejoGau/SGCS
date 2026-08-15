Ext.define('AdministratorSearch.view.t_mailConnectorFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_mailconnectorformview'],
    frame: false,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        //width:'100%',
        anchor:'100%',
        enforceMaxLength: true
    },
    layout: {
        type: 'vbox',
        align : 'stretch'
    },
    items : [
        {
    		xtype : 'textfield',
			name : 'mcn_name',
            fieldLabel: 'Nombre'
		},{
        	xtype : 'textfield',
			name : 'mcn_username',
            fieldLabel: 'Ususario'
		},{
        	xtype : 'textfield',
			name : 'mcn_password',
            fieldLabel: 'Clave'
		},{
        	xtype : 'textfield',
			name : 'mcn_popserver',
            fieldLabel: 'Host'
		},{
        	xtype : 'numberfield',
			name : 'mcn_popport',
            fieldLabel: 'Puerto'
		},{
            xtype : 'combo',
            itemId: 'combossl',
            store:[
                    ["0",getLocale('No')],
                    ["1",getLocale('Si')]
                ],
            fieldLabel : 'SSL',
			name : 'mcn_popssl'
		},{
        	xtype : 'combo',
            itemId: 'comboipcon',
            fieldLabel : 'Conección IP',
			name : 'mcn_ipconid',
            displayField: 'ipc_cdescripcion',
            valueField: 'Id',
            queryMode: 'local',
		}
    ],   

    initComponent : function() {
        
		this.callParent();
        var view = this;
       // this.down('videoxcuentagridview').record = this.record;

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