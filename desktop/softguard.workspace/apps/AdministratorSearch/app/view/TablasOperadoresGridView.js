Ext.define('AdministratorSearch.view.TablasOperadoresGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablasoperadoresgridview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
       
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
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablasoperadoresgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Login',
            dataIndex : 'ope_clogin',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre',
			dataIndex : 'ope_cnombre',
            flex: 1,
            hidden:true
		},{
            xtype : 'gridcolumn',            
            header : 'Sql',
    		dataIndex : 'ope_nsql',
            flex: 1,
            hidden:true
		},{
            xtype : 'gridcolumn',            
            header : 'Supervisor',
    		dataIndex : 'ope_nsupervisor',
            flex: 1,
            hidden:true
		},{
            xtype : 'gridcolumn',            
            header : 'Linea',
    		dataIndex : 'ope_clinea',
            flex: 1,
            hidden:true
		},{
            xtype : 'gridcolumn',            
            header : 'Prioridad',
    		dataIndex : 'ope_nprioridad',
            flex: 1,
            hidden:true
		},{
            xtype : 'datecolumn',            
            header : 'Cambio',
        	dataIndex : 'ope_dCambio',
            flex: 1,
            hidden:true
		},{
            xtype : 'gridcolumn',            
            header : 'Sereno',
        	dataIndex : 'ope_nSereno',
            flex: 1,
            hidden:true
		}


    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                           //  ['ope_cnombre',getLocale('Nombre')],
                             ['ope_clogin',getLocale('Login')]
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