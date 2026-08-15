Ext.define('Common.view.RelationFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.relationformview',
    preventHeader: true,
    frame : true,
	fieldDefaults : {
		labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},
	items : [{
            xtype : 'displayfield',
			fieldLabel : 'Id',
			name : 'Id'
		},{
			xtype : 'numberfield',
			fieldLabel : 'ObjectId',
			name : 'ObjectId',
			allowBlank : false
		},{
            xtype : 'numberfield',
			fieldLabel : 'ObjectTypeId',
			name : 'ObjectTypeId',
			allowBlank : false
		},{
            xtype : 'numberfield',
			fieldLabel : 'RelationObjectId',
			name : 'RelationObjectId',
			allowBlank : false
		},{
            xtype : 'numberfield',
			fieldLabel : 'RelationObjectTypeId',
			name : 'RelationObjectTypeId',
			allowBlank : false
		}],
	buttons : [{
			text : 'Guardar'
		}, {
			text : 'Cancelar'
		}],

	initComponent : function() {

		this.callParent(arguments);
	} // cierro init

});
