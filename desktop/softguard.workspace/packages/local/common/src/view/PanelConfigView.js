//MIGRADO2024
Ext.define('Common.view.PanelConfigView', {
    extend : 'Ext.form.Panel',
	alias : 'widget.panelconfigview',
	layout : 'anchor',
    
	defaults : {
		width : 200,
		labelWidth : 60
	},
    
	items : [{
			xtype : 'displayfield',
			fieldLabel : 'Id',
			name : 'Id'
		},{
			xtype : 'textfield',
			fieldLabel : 'Nombre',
			name : 'Name',
			allowBlank : false
		}, {
			xtype : 'combobox',
			fieldLabel : 'Columnas',
			name : 'ColumnCount',
			queryMode : 'local',
			displayField : 'ColumnCount',
			valueField : 'ColumnCount',
			store : 'TablaColumnasStore'
		}
    ],
	initComponent : function() {
		this.callParent(arguments);
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
            		text : 'Guardar',
                    iconCls: 'save',
                    action: 'save'
        		}, {
        			text : 'Eliminar',
                    iconCls: 'delete',
                    action: 'delete'
        		}
            ]//cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});