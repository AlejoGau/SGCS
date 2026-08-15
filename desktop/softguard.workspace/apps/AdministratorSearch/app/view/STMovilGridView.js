Ext.define('AdministratorSearch.view.STMovilGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.stmovilview'],
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
                    var view = grid.up('stmovilview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
        	dataIndex : 'tmp_cnombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Estado',
    		dataIndex : '_nestado',
            flex: 1
		},
        {
            xtype : 'gridcolumn',            
            header : 'Número',
        	dataIndex : 'tmp_cnumero',
            width: 120
		},{
            xtype : 'gridcolumn',            
            header : 'Marca',
            dataIndex : 'tmp_cmarca',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Modelo',
        	dataIndex : 'tmp_cmodelo',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Licencia',
        	dataIndex : 'tmp_clicencia',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['par_ccodigo',getLocale('Codigo')],
                             ['par_cvalor',getLocale('Valor')]
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