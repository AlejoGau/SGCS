//MIGRADO2024
Ext.define('Common.view.SmsAWCCGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.smsawccgridview'],
    title : 'Llamadas',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [
        {
    		xtype : 'gridcolumn',
			header : 'Para',
			sortable : false,
			dataIndex : 'para',
    		flex : 1
		}/*,
        {
    		xtype : 'gridcolumn',
			header : 'CDEvento',
			dataIndex : 'cdevento',
			sortable : true,
			flex : 1
		}*/,
        {
        	xtype : 'gridcolumn',
			header : 'DSEvento',
			dataIndex : 'dsevento',
			sortable : true,
			flex : 1
		}, 
        {
        	xtype : 'gridcolumn',
			header : 'Email',
			dataIndex : 'email',
			sortable : true,
			flex : 1
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
               
         
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);
        
        /*
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    itemId: 'estado',
                    store: 'ServTecEstadoStore',
                    displayField: 'Name',
                    valueField: 'Value',
                    fieldLabel: 'Estado',
                    labelWidth: 40
                },{
                    xtype: 'button',
                    iconCls: 'icon-find',
                    action: 'search'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
         
         */
         
    } // cierro init
});