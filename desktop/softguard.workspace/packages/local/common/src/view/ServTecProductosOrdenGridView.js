//MIGRADO2024
Ext.define('Common.view.ServTecProductosOrdenGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.servtecproductosordengridview'],
    title : '',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype:'actioncolumn',
            width:50,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtecproductosordengridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            },{
                iconCls: 'icon-delete',
                tooltip: getLocale('Borrar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtecproductosordengridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectdelete',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'Name',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Cantidad',
        	dataIndex : 'spr_iCantidad',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Codigo',
            dataIndex : 'Code',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Estado',
            dataIndex : '_Status',
            flex: 1
    	}
    ],
    
    initComponent: function () {
       
        //this.addEvents('productSelected');
        var comboSearch =  [
                             ['Name',getLocale('Nombre')],
                             ['Code',getLocale('Codigo')]
                           ];
        
     /*   this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };
        
    */    
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
                    text: 'Agregar',
                    scope: this,
                    action: 'add',
                    itemId: 'add'
                },{
                    iconCls: 'icon-basket-go',
                    text: 'Asignar stock',
                    scope: this,
                    action: 'asignarstock',
                    itemId: 'asignarstock',
                    hidden:true
                },{
                    iconCls: 'icon-basket-go',
                    text: 'Productos insumidos',
                    scope: this,
                    action: 'productosinsumidos',
                    itemId: 'productosinsumidos',
                    hidden:true
                }
                
                
                ,{
                    iconCls: 'icon-basket-put',
                    text: 'Ver movimientos',
                    scope: this,
                    action: 'vermovimientos'
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'fieldName',
                                            store: comboSearch,
                                            fieldLabel: 'Campo'
                                            
                                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Valor'
                                          
                                        }
                                    ]
                                 }
                             ]
            		    }
                    
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
                }/*,'-',
                {
                    iconCls: 'icon-delete',
                    text: 'Borrar',
                    scope: this,
                    action: 'delete'
                }*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});