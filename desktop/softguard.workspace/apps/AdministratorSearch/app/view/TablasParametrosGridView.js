Ext.define('AdministratorSearch.view.TablasParametrosGridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.tablasparametrosgridview','widget.tablasparametrossearchview'],
    title : 'Parámetros',
    autoHeight : true,
    features : [
        {
            ftype :'grouping',
            id: 'groupingMST',
            enableGroupingMenu: false,
            //groupHeaderTpl : '{name} ({rows.length})',
            hideGroupedHeader: true
		}
    ],
    /*viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },*/
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablasparametrosgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Categoría',
            dataIndex : 'par_ccategoria',
            hidden: true,
            width: 150
		},{
            xtype : 'gridcolumn',            
            header : 'Codigo',
        	dataIndex : 'par_ccodigo',
            width: 230
		},{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
			dataIndex : 'par_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Observacion',
        	dataIndex : 'par_mobservacion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Valor texto',
            dataIndex : 'par_cvalor',
            //hidden: true,
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Valor numérico',
            dataIndex : 'par_ivalor',
            //hidden: true,
            flex: 1
    	}
    ],
    
    initComponent: function () {
        var comboSearch =  [
            ['par_ccodigo',getLocale('Codigo')],
            ['par_cdescripcion',getLocale('Descripcion')]
        ];
        
     /*   this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    */    
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                /*{
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
                },"-",*/{
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
                                            value: 'par_ccodigo',
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