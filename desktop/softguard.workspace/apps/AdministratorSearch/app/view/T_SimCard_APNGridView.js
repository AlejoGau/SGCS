Ext.define('AdministratorSearch.view.T_SimCard_APNGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.t_simcard_apngridview'],
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
                    var view = grid.up('t_simcard_apngridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
           xtype: 'gridcolumn',
           header: 'Código',
           dataIndex: 'Id'  
       },{
            xtype : 'gridcolumn',            
            header : 'Descripción',
			dataIndex : 'tsa_cDescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'URL',
    		dataIndex : 'tsa_cURL',
            // renderer: function(value, metaData, record, row, col, store, gridView){
            //     var valor = '';
            //     if (value == 1) {
            //         valor = 'SI';
            //     } else {
            //         valor = 'NO';
            //     }
            //     return valor;
            // },

            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'User',
        	dataIndex : 'tsa_cUser',
            // renderer: function(value, metaData, record, row, col, store, gridView){
            //     var valor = '';
            //     if (value == 1) {
            //         valor = 'SI';
            //     } else{
            //         valor = 'NO';
            //     }
            //     return valor;
            // },
            
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Password',
        	dataIndex : 'tnd_cPassword',
            // renderer: function(value, metaData, record, row, col, store, gridView){
            //     var valor = '';
            //     if (value == 1) {
            //         valor = 'SI';
            //     } else{
            //         valor = 'NO';
            //     }
            //     return valor;
            // },
            
            flex: 1
		}
    ],
    
    initComponent: function () {
        
        
        var comboSearch =  [
                             //['pan_ccodigo',getLocale('Codigo')],
                             ['tsa_cDescripcion',getLocale('Descripción')],
                             ['tsa_cURL',getLocale('URL')],
                             ['tsa_cUser',getLocale('User')]
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