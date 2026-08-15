//MIGRADO2024
Ext.define('Common.view.SoftguardEstadoView', {
    extend : 'Ext.panel.Panel',
	alias : 'widget.estadoview',
	title : 'Situacion',
	autoScroll : true,
    preventHeader: true,
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
	items : [
        {
    		xtype:'estadoformview',
            flex: 1
		}
		,{
			xtype:'estadoitemgridview',
            flex: 1
		}
	],
    initComponent: function () {
        this.callParent(arguments);  
        
        var form = this.down('estadoformview');
        form.record = this.record;
        form.cuenta = this.cuenta;
        form.rights = this.rights;
    }
});