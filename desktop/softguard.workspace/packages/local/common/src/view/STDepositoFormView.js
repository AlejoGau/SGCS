//MIGRADO2024
Ext.define('Common.view.STDepositoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.stdepositoformview'],
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
			xtype : 'textfield',
			name : 'Name',
            itemId : 'Name',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 40,
            anchor:'100%'
		},{
            xtype: 'container',
            layout: 'hbox',
            itemId:'organizacion',
            margin: '0 0 5 0',
            items:[
                {
                    xtype : 'displayfield',    
                    fieldLabel : 'Entidad',
                    name : '_organization',
                    itemId:'organizationName',
                    flex: 1
                },
                {
                    xtype: 'button',
                    action: 'organizationChange',
                    text: 'Seleccionar organización'
                }
            ]
        },{
            xtype : 'combo',
            fieldLabel : 'Habilitado',
            store:'SiNoStore',
        	name : 'tsd_estado',
            itemId : 'tsd_estado',
			displayField : 'Name',
			valueField : 'Value',
            anchor : '100%',
            queryMode: 'local',
    		allowBlank : false
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