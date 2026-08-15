Ext.define('AdministratorSearch.view.TablasTecnicosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablastecnicosgridview','widget.tablastecnicosearchview'],
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
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablastecnicosgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Codigo',
    		dataIndex : 'tec_ccodigo',
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Nombre',
    		dataIndex : 'tec_cnombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
            dataIndex : 'tec_ctelefono',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Email',
            dataIndex : 'tec_cmail',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Observaciones',
            dataIndex : 'tec_cobservaciones',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Estado',
            dataIndex : 'tec_nestado',
            flex: 1,
            renderer: function (value) {
                switch(value){
                    case 0:
                        return getLocale('Instalador')
                    break;
                    case 1:
                        return getLocale('Tecnico')
                    break;
                    case 2:
                        return getLocale('Tecnico/Instalador')
                    break
                    case 3:
                        return getLocale('Deshabilitado')
                    break;
                }
                    
            }
        }
        
        
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['tec_ccodigo',getLocale('Codigo')],
                             ['tec_cnombre',getLocale('Nombre')]
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