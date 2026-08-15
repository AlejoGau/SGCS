Ext.define('AdministratorSearch.view.s_ip_rangeGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.s_ip_rangegridview'],
    title : 'Templates',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('s_ip_rangegridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
    		dataIndex : 'ipr_name',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Desde',
    		dataIndex : 'ipr_desde',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Hasta',
            dataIndex : 'ipr_hasta',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Activo',
            dataIndex : 'ipr_estado',
            flex: 1,
            renderer: function(v,r){
                if (v==1){
                    return getLocale('Si');
                } else 
                    {
                    return getLocale('No');
                }
            }
        }
    ],
    
    initComponent: function () {

        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },"-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',                    
                    disabled: true,
                    scope: this
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});