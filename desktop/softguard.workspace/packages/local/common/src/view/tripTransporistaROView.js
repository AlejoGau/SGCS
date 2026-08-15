//MIGRADO2024
Ext.define('Common.view.tripTransporistaROView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.triptransportistaroview'],
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
            itemId: '_transportista_nombre',
            name : '_transportista_nombre',
            allowBlank : false
        },
        {
            xtype: 'displayfield',
            fieldLabel : 'Matrícula',
            itemId: '_transportista_matricula',
            name : '_transportista_matricula',
            allowBlank : false
        },
        {
            xtype: 'displayfield',
            fieldLabel : 'Identificador',
            itemId: '_transportista_chasis',
            name : '_transportista_chasis',
            allowBlank : false
        },
        {
            xtype: 'displayfield',
            fieldLabel : 'responsable',
            itemId: '_transportista_responsable',
            name : '_transportista_responsable',
            allowBlank : false
        }
    ],
	initComponent : function() {
		this.callParent();
	} // cierro init
});