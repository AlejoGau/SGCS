Ext.define('AdministratorSearch.view.ReceptorFormatosGridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.receptorformatosgridview'],
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
    		xtype : 'gridcolumn',            
			header : 'Formato',
			dataIndex : 'for_cformato',
            flex: 1
		},{
        	xtype : 'gridcolumn',            
			header : 'Descripcion',
			dataIndex : 'for_cdescripcion',
             flex: 1
		},{
            xtype : 'gridcolumn',            
			header : 'Alarma',
			dataIndex : 'for_calarma',
            flex: 1
		},{
            xtype : 'gridcolumn',            
			header : 'Descripcion alarma',
			dataIndex : 'cod_cdescripcion',
             flex: 1
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        var me = this;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
    } 
});