Ext.define('AdministratorSearch.view.TablasEscalaPrioriOrganizacionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasescalamientoprioridadesorganizacionesformview'],
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
    		xtype : 'displayfield',
			name : 'Id',
            fieldLabel: 'Prioridad',
            width:'100%'
		},
        {
			xtype : 'numberfield',
			name : 'teo_iTiempo',
            fieldLabel: 'Tiempo',
			allowBlank : false,
            minValue: 3,
            maxValue: 99,
            width:'100%'
		},{
            xtype : 'combo',
            fieldLabel : 'Controla',
            name : 'teo_nControla',
            store: [
                [1,getLocale('Si')],
                [0,getLocale('No')],
            ],
			allowBlank : false,
            width:'100%'
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