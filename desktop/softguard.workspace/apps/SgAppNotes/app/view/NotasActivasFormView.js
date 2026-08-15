Ext.define('SgAppNotes.view.NotasActivasFormView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.notasactivasformview'],
    preventHeader: true,
    frame: false,
    border : 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    emptyText: getLocale('No hay notas.'),
    fieldDefaults : {
    	labelAlign : 'left',
		labelWidth : 80,
		anchor : '100%'
	},
	items: [

		{
            xtype : 'htmleditor',
            shrinkWrap: false,
            flex: 1,
            itemId: 'note',
			name : 'sgn_body',
			allowBlank : false
		}		
    ],
    buttons : [{
        text : 'Guardar',
        itemId : 'guardarBtn',
        action:'save'
    }, {
        text : 'Cancelar',
        action:'cancel'
    }],
	initComponent : function() {

		this.callParent();
	} // cierro init    
});