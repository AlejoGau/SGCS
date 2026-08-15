//MIGRADO2024
Ext.define('Common.view.DirEntregaFormView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.direntregaview',
    title : 'Dirección de entrega',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        anchor: '100%',
        margin: '2 2 0 2'
    },
	itemId : 'formaccountdirentrega',
	items : [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'box',
                    html: getLocale('(Si deja la dirección de entrega vacía se completará con los datos de Dirección)  '),
                    height: 20
                },{
                    xtype: 'button',
                    text: 'Actualizar',
                    action: 'direccionCopy'
                }
            ]
        },
        
        {
		xtype : 'textfield',
		fieldLabel : 'Calle',
		name : "cue_ccallecorreo"
	}, {
		xtype : 'textfield',
		fieldLabel : 'Ciudad',
		name : "cue_clocalidadcorreo"
	}, {
		xtype : 'combo',
		fieldLabel : 'Provincia / Estado',
		store : 'ProvinciasStore',
		name : 'cue_cprovinciacorreo',
		displayField : 'pro_cdescripcion',
		valueField : 'pro_ccodigo'
	}, {
		xtype : 'textfield',
		fieldLabel : 'Código postal / Zip',
		name : "cue_ccodigopostalcorreo"
	}
	]
});