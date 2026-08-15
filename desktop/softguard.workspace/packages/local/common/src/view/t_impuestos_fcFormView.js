//MIGRADO2024
Ext.define('Common.view.t_impuestos_fcFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_impuestos_fcfromview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 150,
        enforceMaxLength: true,
        anchor: '100%'
    },
    items : [
       {
            xtype : 'textfield',
			name : 'imp_cdescripcion',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype : 'textfield',
			name : 'imp_nporcentaje',
            fieldLabel: 'Porcentaje',
    		allowBlank : false
		},{
            xtype: 'combo',  
            name:'imp_idorganizacion',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Empresa Facturadora',
            lastQuery: '',
            itemId:'organizacionfacturadora',
            displayField: 'org_cnombre',
            valueField: 'Id',
            forceSelection: true,
    		allowBlank : false
        },{
            xtype: 'combo',  
            name:'imp_mgmcidkey',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Plan de cuentas',
            lastQuery: '',
            itemId:'imp_mgmcidkey',
            displayField: 'mgmc_descripcion',
            valueField: 'Id',
            forceSelection: true,
        	allowBlank : true
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