Ext.define('AdministratorSearch.view.TablasTelefonosJuridiccionalesFormView', {
    extend : 'Ext.form.Panel',
    showLblHlp: true,
    alias : ['widget.tablastelefonosjuridiccionalesformview'],
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
            xtype : 'combobox',
        	fieldLabel: 'Lista',
            store: 'TablaListasEmergenciaStore',     
			displayField: 'Descripcion',								
			valueField: 'Codigo',
            //plugins: ['clearbutton'],
            name: 'tel_clista',
            queryMode: 'local',
            allowBlank : false,
            anchor:'100%'
		},{
			xtype : 'textfield',
			name : 'tel_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,
             maxLength: 40,
             anchor:'100%'
		},{
    		xtype : 'textfield',
			name : 'tel_cobservacion',
            fieldLabel: 'Observacion',
			allowBlank : false,
             maxLength: 200,
             anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'tel_ctelefono',
            fieldLabel: 'Telefono',
			allowBlank : false,
             maxLength: 200,
             anchor:'100%'
		},{
            xtype : 'combobox',
    		fieldLabel: 'Discado',
            store: 'TelefonoDiscadoStore',     
			displayField: 'Name',								
			valueField: 'Value',
            name: 'tel_ndiscado',
            queryMode: 'local'
		},{
            xtype: 'fieldset',
            title: 'Dígitos',
            layout: 'hbox',
            items: [{
                    xtype : 'numberfield',
                	fieldLabel : 'Pre',
                    labelWidth : 60,
                    flex: 1,
        			name : 'tel_cpredigito'
        		},{
                    xtype : 'numberfield',
            		fieldLabel : 'Post',
                    labelWidth : 60,
                    margin: '0 0 10 5',
                    flex: 1,
        			name : 'tel_cpostdigito'
        		} 
            ]
		}, {
			xtype : 'combo',
			fieldLabel : 'Provincia / Estado',
            labelWidth : 120,
			store : 'ProvinciasStore',
			name : "tel_cprovincia",			
        	displayField : 'pro_cdescripcion',
    		valueField : 'pro_ccodigo',
            itemId: 'comboProvincia',
            plugins : ['clearbutton'],
            anchor:'100%'
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