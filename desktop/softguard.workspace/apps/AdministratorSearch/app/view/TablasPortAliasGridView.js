Ext.define('AdministratorSearch.view.TablasPortAliasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablasportaliasgridview','widget.tablasportaliassearchview'],
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
                    var view = grid.up('tablasportaliasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Codigo',
        	dataIndex : 'tpa_icodigo',
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Dealer',
			dataIndex : 'tpa_cdealer',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Puerto',
    		dataIndex : 'pue_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Conexion Ip',
        	dataIndex : 'ipc_cdescripcion',
            flex: 1
		}
    ],
    
    initComponent: function () {
        var comboSearch =  [
            ['tpa_icodigo',getLocale('Codigo')],
            ['tpa_cdealer',getLocale('Dealer')],
            ['pue_cdescripcion',getLocale('Puerto')],
            ['ipc_cdescripcion',getLocale('Conexion Ip')]
        ];
        
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
                }
            ]// cierro items
         }); 
        this.addDocked(toolbar);
    } 
});