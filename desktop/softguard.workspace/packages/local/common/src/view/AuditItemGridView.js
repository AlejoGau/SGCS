//MIGRADO2024
Ext.define('Common.view.AuditItemGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.audititemgridview',
    title : 'Auditoría',
    autoHeight : true,
    store: {
        fields:[
            'field','oldValue','newValue'
        ]
    },
	columns : [
        {
            xtype : 'gridcolumn',
			header : 'Campo',
			dataIndex : 'field',
			sortable : true,
			groupable : true,
            hidden: true,
			width : 80
		},{
    	    xtype : 'gridcolumn',
    		header : 'Dato',
			dataIndex : 'field',
            renderer: function(value){
                return getLocale(value);
            },
			sortable : true,
			groupable : true,
			width : 200
		},{
			xtype : 'gridcolumn',
			header : 'Valor Original',
			dataIndex : 'oldValue',
			sortable : true,
			groupable : true,
			flex : 1
		},{
    		xtype : 'gridcolumn',
			header : 'Valor modificado',
			dataIndex : 'newValue',
			sortable : true,
			groupable : true,
    		flex : 1
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
    } // cierro init
});