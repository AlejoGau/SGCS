//MIGRADO2024
Ext.define('Common.view.m_llavesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.m_llavesformview'],
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
            xtype: 'textfield',
            fieldLabel: 'Descripción',
            name: 'lla_cdescripcion'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Ubicación',
            name: 'lla_cubicacion'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Responsable',
            name: 'lla_responsable'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Número',
            name: 'lla_cnumero'
        }
    ],
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-key-go',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                },
                {
                    iconCls: 'icon-key-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'delete'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});