Ext.define('Common.view.ActionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.actionformview','widget.actionview'],
    preventHeader: true,
    frame: true,
    border : 0,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 80,
		anchor : '100%'
	},
	items : [{
    			xtype : 'datefield',
              //  disabled: true,
				name : 'Date',
				allowBlank : false
			},{
    			xtype : 'combo',
				name : 'ActionType',
                itemId: 'ActionType',
                store: 'ActionTypeStore',
                displayField: 'Name',        						
		        valueField: 'Value',    
                queryMode: 'local',
                editable: false,
				allowBlank : false,
				forceSelection: true
			},{
				xtype : 'textfield',
				name : 'Name',
				allowBlank : false
			},{
                xtype : 'htmleditor',
                anchor: '100% 100%',
				name : 'Description',
				allowBlank : false
			}],
	buttons : [{
				text : 'Guardar',
                action:'Guardar'
			}, {
				text : 'Cancelar',
                action:'Cancelar'
			}, {
                text : 'Eliminar',
                action:'Eliminar',
                itemId:'eliminar'
			}],

	initComponent : function() {
		this.callParent();
	} // cierro init
});