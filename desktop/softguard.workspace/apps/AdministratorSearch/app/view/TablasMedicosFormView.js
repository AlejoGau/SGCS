Ext.define('AdministratorSearch.view.TablasMedicosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasmedicosformview'],
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
			name : 'med_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 60,
            anchor:'100%'
		},{
    		xtype : 'textfield',
			name : 'med_ccalle',
            fieldLabel: 'Calle',
            maxLength: 60,
            anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'med_clocalidad',
            fieldLabel: 'Ciudad',
            maxLength: 40,
            anchor:'100%'
		},{
                
            xtype : 'combo',
    		fieldLabel : 'Provincia / Estado',
            itemId: 'provincia',
			name : 'med_cprovincia',
			store : 'ProvinciasStore',			
        	displayField : 'pro_cdescripcion',
    		valueField : 'pro_ccodigo',
            anchor : '100%',
            queryMode: 'local'
		},{
        	xtype : 'textfield',
			name : 'med_ccodigopostal',
            fieldLabel: 'Codigo postal',
            maxLength: 8,
            inputWidth :100
            
		},{
        	xtype : 'textfield',
			name : 'med_ctelefono',
            fieldLabel: 'Telefono',
            maxLength: 60,
		},{
        	xtype : 'textfield',
			name : 'med_cfax',
            fieldLabel: 'Fax',
            maxLength: 40,
		},{
            xtype : 'combo',
            fieldLabel : 'Tipo',
    		name : 'med_ntipo',
            store: [
                [2,getLocale('Emergencia medica')],
                [0,getLocale('Doctor')],
                [1,getLocale('Hospital')],
            ],
			allowBlank : false,
            inputWidth :200
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