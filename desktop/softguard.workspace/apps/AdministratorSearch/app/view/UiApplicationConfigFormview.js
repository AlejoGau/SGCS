Ext.define('AdministratorSearch.view.UiApplicationConfigFormview', {
    extend : 'Ext.form.Panel',
	alias : 'widget.uiapplicationconfigformview',
    title : 'Propiedades',

    items : [
        {
			xtype : 'displayfield',
			fieldLabel : 'Nombre',
			name : 'Name',
			allowBlank : false
		},  {
            name : 'Description',
            fieldLabel : 'Descripción',
			xtype : 'textfield',
            allowBlank : true
		},  {
            xtype: 'hiddenfield',
            name : 'SmallComment',
            fieldLabel : 'SmallComment',
            allowBlank : true
		},  {
            name : 'Icon',
            fieldLabel : 'Icono',
			xtype : 'hidden',
            allowBlank : true
		},  {
            xtype: 'hiddenfield',
            name : 'MenuName',
            fieldLabel : 'MenuName',
            allowBlank : true
		},  {
            xtype: 'hiddenfield',
            name : 'RazorTemplateId',
            fieldLabel : 'ApplicationHtmlId',
            allowBlank : false
	    },  {
            xtype: 'hiddenfield',
            name : 'Viewport',
            fieldLabel : 'Viewport',
            allowBlank : false
	    },  {
            xtype: 'combobox', 
            queryMode: 'local',
            width: 400,
            fieldLabel : 'Version actual',
            name: 'Version',
            displayField: 'Version',
            valueField: 'Version',
            itemId: 'comboVersion'
        }
    ],
	
	initComponent: function(){
        this.callParent();
        
        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
			items : [{
				text : 'Guardar',
				iconCls : 'icon-disk',
				action : 'save'
			}]
        }); 
        this.addDocked(toolbar);
    }
});