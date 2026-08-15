Ext.define('WebRemoto.view.m_llavesROFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.m_llavesroformview'],
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
            xtype: 'displayfield',
            fieldLabel: 'Descripción',
            name: 'lla_cdescripcion'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Ubicación',
            name: 'lla_cubicacion'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Responsable',
            name: 'lla_responsable'
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Número',
            name: 'lla_cnumero'
        }
    ],

	initComponent : function() {
		this.callParent();
        
        
	} // cierro init
});