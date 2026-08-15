//MIGRADO2024
Ext.define('Common.view.tripClienteROView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tripclienteroview'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    showtoolbar: true,
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 80,
        anchor : '100%',
    	labelAlign: 'left'					
	},
	items : [
        {
            xtype: 'displayfield',
            fieldLabel : 'Nombre',
            itemId: '_cliente_nombre',
            name : '_cliente_nombre',
            allowBlank : false
        },
        {
            xtype: 'displayfield',
            fieldLabel : 'Número',
            itemId: '_cliente_numero',
            name : '_cliente_numero',
            allowBlank : false
        },
        {
            xtype: 'displayfield',
            fieldLabel : 'Documento',
            itemId: '_cliente_documento',
            name : '_cliente_documento',
            allowBlank : false
        },
        {
            xtype: 'displayfield',
            fieldLabel : 'Contrato',
            itemId: '_cliente_contrato',
            name : '_cliente_contrato',
            allowBlank : false
        }
    ],
	initComponent : function() {
		this.callParent();
	} // cierro init
});