Ext.define('AdministratorSearch.view.FormatoReceptoresView', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.formatoreceptoresgridview',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
        	xtype : 'gridcolumn',            
			header : 'Descripcion',
			dataIndex : 'rec_cdescripcion',
			sortable : true,
			width : 100
		},{
			xtype : 'gridcolumn',
			header : 'Origen',
            dataIndex : 'rec_cdll',
            width : 200,
            //flex: 1
			sortable : true			
		},{
    		xtype : 'gridcolumn',
			header : 'TCP IP',
            dataIndex : 'rec_ntcpip',
            width : 300,
			sortable : true			
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