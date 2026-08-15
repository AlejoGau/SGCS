Ext.define('AdministratorSearch.view.t_comprobantes_fcGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.t_comprobantes_fcgridview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
       
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp:true,
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('t_comprobantes_fcgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'cbt_cdescripcion',
            flex:1
		},{
            xtype : 'gridcolumn',            
            header : 'Letra',
    		dataIndex : 'cbt_cletra',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Prefijo',
            dataIndex : 'cbt_cprefijo',
            flex:1
        },{
            xtype : 'gridcolumn',            
            header : 'Ult. numero',
            dataIndex : 'cbt_inumero',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Organizacion facturadora',
            dataIndex : 'org_cnombre',
            flex: 1
        }
        
        
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['cbt_cdescripcion',getLocale('Nombre de factura')],
                             ['org_cnombre',getLocale('Nombre organizacion')]
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