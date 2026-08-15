//MIGRADO2024
Ext.define('Common.view.IprServicioFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.iprservicioformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        {
        	xtype : 'textfield',
			name : 'iprs_ccnombre',
            fieldLabel: 'Nombre'
		},{
        	xtype : 'textfield',
			name : 'iprs_localip',
            fieldLabel: 'Ip'
		},{
            xtype : 'numberfield',
			name : 'iprs_commandport',
            fieldLabel: 'Comandos'
		},{
            xtype : 'numberfield',
			name : 'iprs_websocketport',
            fieldLabel: 'WebSocket'
		},{
            xtype: 'combo',
            name: 'iprs_status',
            itemId : 'iprs_status',
            store:[['A',getLocale('Habilitada')],['I',getLocale('Deshabilitada')]],
            value: 'I',
            fieldLabel: 'Estado',
            anchor: '100%'
        },{
    	    xtype:'iprsconecciongridview',
            title:'Conexiones',
            flex: 1
		}
    ],
	initComponent : function() {
		this.callParent();
        
        var iprsconecciongridview = this.down('iprsconecciongridview');
        iprsconecciongridview.record = this.record;
        iprsconecciongridview.filters = [{
                property:'iprsc_iprsiid',
                value:this.record.get('Id')
            }];
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                },{
                    iconCls: 'icon-page-refresh',
                    text: 'Reiniciar',
                    scope: this,
                    action: 'resetall'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});