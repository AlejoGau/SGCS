Ext.define('AdministratorSearch.view.s_ip_rangeFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.s_ip_rangeformview'],
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
			name : 'ipr_name',
            fieldLabel: 'Nombre'
		},{
            xtype : 'textfield',
			name : 'ipr_desde',
            vtype: 'ip',
            fieldLabel: 'Desde'
		},{
            xtype : 'textfield',
    		name : 'ipr_hasta',
            vtype: 'ip',
            fieldLabel: 'Hasta'
		},{
            xtype : 'combo',
    		fieldLabel : 'Activo',
			store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
			valueField : 'Value',
			name : "ipr_estado",
            hidden:false,
            anchor: '20%',
            minWidth: 100,
            itemId: 'ipr_estado'
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