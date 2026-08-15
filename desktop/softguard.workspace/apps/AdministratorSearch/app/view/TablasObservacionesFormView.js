Ext.define('AdministratorSearch.view.TablasObservacionesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasobservacionesformview'],
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
			name : 'obs_cdescripcion',
            fieldLabel: 'Descripcion',
			allowBlank : false,
            maxLength: 40
		},{
    		xtype : 'textareafield',
			name : 'obs_mobservacion',
            fieldLabel: 'Observacion'
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