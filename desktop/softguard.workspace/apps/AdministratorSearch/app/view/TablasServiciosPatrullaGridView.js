Ext.define('AdministratorSearch.view.TablasServiciosPatrullaGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablasserviciospatrullagridview','widget.tablasserviciospatrullasearchview'],
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
                    var view = grid.up('tablasserviciospatrullagridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Codigo',
        	dataIndex : 'tsp_ccodigo',
            width: 100
		},{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
			dataIndex : 'tsp_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : '',
    		dataIndex : '',
            width: 40,
            renderer: function(value, metaData, record){
                var color = '#000';
                
                if(record.get('tsp_cpathicon').indexOf("#") >=0) {
                    color = record.get('tsp_cpathicon');
                }
                return '<div class="circulo" style="background-color:'+color+'"></div>'
            }
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['tsp_ccodigo',getLocale('Codigo')],
                             ['tsp_cdescripcion',getLocale('Descripcion')]
                           ];
        
        this.onSelectChange = function (selModel, selections) {
            this.down('button[action="delete"]').setDisabled(selections.length == 0);
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