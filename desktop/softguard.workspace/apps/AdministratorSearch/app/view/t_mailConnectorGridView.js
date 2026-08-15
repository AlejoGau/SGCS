Ext.define('AdministratorSearch.view.t_mailConnectorGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.t_mailconnectorgridview'],
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
                    var view = grid.up('t_mailconnectorgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'mcn_name',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Usuario',
    		dataIndex : 'mcn_username',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Server',
            dataIndex : 'mcn_popserver',
            width:60
        },{
            xtype : 'gridcolumn',            
            header : 'Puerto',
            dataIndex : 'mcn_popport',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'SSL',
            dataIndex : 'mcn_popssl',
            flex: 1,
            renderer:function (value) {
                if(value == 1) {
                    return getLocale('Si')
                } else {
                    return getLocale('No')
                }
            }
		}
        
        
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['mcn_name',getLocale('Nombre')],
                             ['mcn_username',getLocale('Usuario')]
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