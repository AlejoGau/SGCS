//MIGRADO2024
Ext.define('Common.view.t_iprsconeccionesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_iprsconeccionesformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    scroll: 'auto',
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 120,
        anchor: '100%',
        enforceMaxLength: true
    },
    items : [
        {
            xtype : 'combo',
            fieldLabel : 'Conexión',
            itemId: 'iprsc_ipcidkey',
            queryMode: 'local',
            displayField: 'ipc_cdescripcion',
            valueField: 'Id',
            emptyText: 'Seleccione la conexión',
            allowBlank: false,
            name : 'iprsc_ipcidkey',
            anchor: '100%'
        },
        {
            xtype: 'combo',
            name: 'iprsc_status',
            store:[['A',getLocale('Habilitada')],['I',getLocale('Deshabilitada')]],
            value: 'I',
            fieldLabel: 'Estado',
            anchor: '100%'
        },
        {
            xtype: 'fieldset',
            itemId: 'cconfig',
            title: getLocale('Configuración'),
            margin: '20,0,0,0',
            translate: false,
            padding: '5,0,0,0'
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