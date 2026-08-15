Ext.define('AdministratorSearch.view.ObjectForeingTableGroupByFieldNameGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.objectforeigntablegroupbyfieldnamegridview',
    title : 'Data Applicacion',
    autoHeight : true,

    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        {
            xtype : 'gridcolumn',            
            header : 'Esquema de datos',
            dataIndex : 'ParentTypeName',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Campo',
        	dataIndex : 'FieldName',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Cantidad de valores',
			dataIndex : 'Count',
            flex: 1
		}



    ],
    
    initComponent: function () {
                     
        this.callParent(arguments);   

        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                  {
                    iconCls: 'icon-add',
                    action: 'add',
                    scope: this,
                    text: 'Nuevo'
                                          
                },"-",{                                         
                    xtype: 'combo',
                    queryMode: 'local',
                    itemId: 'slbfObject',
                    store: 'SlbfObjectStore',
                    displayField: 'Name',
                    valueField: 'Id',
                    fieldLabel: 'Esquema de datos'
    			},{
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    scope: this,
                    action: 'search'
                },'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});