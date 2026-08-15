Ext.define('Trackguard.view.GeocercasProgramadasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.geocercasprogramadasgridview',
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
                    var view = grid.up('geocercasprogramadasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },
       {
            xtype : 'datecolumn',            
            header : 'Fecha inicio',
            dataIndex : 'datestart',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Nombre',
			dataIndex : 'Name',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Usuario',
    		dataIndex : 'usu_cnombre',
            flex: 1
		}

    ],
    
    initComponent: function () {
        
        var comboSearch =  [
                             ['Name',getLocale('Nombre')]
                             
                           ];
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };

        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        //https://basecamp.com/2249105/projects/14758734/todos/445486332
        //-----para controlar seguridad según el profile asignado 
        //-----en AdministratorSearch ------
        var ocultar = false;
        if(this.profile<=1){
            ocultar = true;
        }


        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    hidden: ocultar,
                    action: 'add'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    hidden: ocultar,                    
                    disabled: true,
                    scope: this
                }, {
                    iconCls: 'x-tbar-loading',
                    text: 'Regenerar',
                    action: 'rebuild',
                    hidden: ocultar,                    
                    disabled: false,
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