//MIGRADO2024
Ext.define('Common.view.IprServiciosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.iprserviciosgridview',
    title : 'Servicios',
	autoHeight : true,
	columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 25,
           /* items: [
                {
                    getClass: function(field, metadata,record, rowindex, colindex, store){
                        return 'icon-Event-'+record.get('EventType');
                    },
                    getTip: function(field, metadata,record, rowindex, colindex, store){
                        return this.getTypeName(record.get('EventType'));
                    }
                }
            ]*/
        },{
        	text : '',
			dataIndex : 'iprs_status',
			sortable : true,
            renderer: function(value, metadata, record, colIndex,store, view){
                if (value=='A'){
                    return "<img src=\"/resources/global/images/icons/accept.png\"/>";
                }else{
                    return "<img src=\"/resources/global/images/icons/cross.png\"/>";
                }
            },
			width: 30
		},{
            xtype : 'gridcolumn',
    		header : 'Id',
			dataIndex : 'Id',
			sortable : true,
			width: 30
		},{
            xtype : 'gridcolumn',
    		header : 'Nombre',
			dataIndex : 'iprs_ccnombre',
			sortable : true,
			flex: 1
		}, {
            xtype : 'gridcolumn',
        	header : 'Ip',
			dataIndex : 'iprs_localip',
			sortable : true,
			flex: 1
		},{
    		xtype : 'datecolumn',
			header : 'Ultima actualización',
            format : 'd/m/Y H:i',
			sortable : true,
			dataIndex : 'iprs_lastserviceupdate',
			width : 120
		},{
            xtype:'actioncolumn',
            header: '',
            width: 25,
            items: [{
                iconCls: 'icon-delete',
                tooltip: 'Eliminar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('iprserviciosgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('deleteservicio',rec,view);
                }
            }]
		}
    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
    }
});