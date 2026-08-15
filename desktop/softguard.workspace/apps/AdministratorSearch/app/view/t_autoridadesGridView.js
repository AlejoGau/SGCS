Ext.define('AdministratorSearch.view.t_autoridadesGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.t_autoridadesgridview'],
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
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('t_autoridadesgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Codigo',
        	dataIndex : 'aut_ccodigo',
            hidden:true,
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre',
    		dataIndex : 'aut_cnombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Dealer',
            dataIndex : 'aut_cdealer',
            width:60
        },{
            xtype : 'gridcolumn',            
            header : 'Provincia',
            dataIndex : 'pro_cdescripcion',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Reporte manual',
            dataIndex : 'aut_meventos',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Reporte automático',
            dataIndex : 'aut_meventosauto',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Reporte autoprocedados',
            dataIndex : 'aut_cAutoProcesados',
            flex: 1
        }
        
        
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['aut_ccodigo',getLocale('Codigo')],
                             ['aut_cnombre',getLocale('Nombre')]
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