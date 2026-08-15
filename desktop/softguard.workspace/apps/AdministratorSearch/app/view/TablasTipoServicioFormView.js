Ext.define('AdministratorSearch.view.TablasTipoServicioFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablastiposervicioformview'],
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
			name : 'cts_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,            
            anchor:'100%'
		},
        {
            xtype : 'combo',
            fieldLabel: 'Estado',
            valueField : 'Value',
            store : 'ActivadoDesactivadoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            name : 'cts_iestado',
            itemId: 'comboEstado',
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
            ]
         }); 
         this.addDocked(toolbar);
	}
});