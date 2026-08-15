Ext.define('AdministratorSearch.view.t_mensajes_whatsappFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tmensajeswhatsappformview'],
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
			name : 'tmw_ctitulo',
            fieldLabel: 'Título',
			allowBlank : false,
            enforceMaxLength: true,
            maxLength: 255
		},{
    		xtype : 'textareafield',
			name : 'tmw_cmensaje',
            maxLength: 2048,
            enforceMaxLength: true,
            fieldLabel: 'Mensaje'
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