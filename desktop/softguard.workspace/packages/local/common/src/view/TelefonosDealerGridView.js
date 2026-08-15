//MIGRADO2024
Ext.define('Common.view.TelefonosDealerGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.telefonodealergridview'],
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
                iconCls: 'icon-delete',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('telefonodealergridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('deleteItem',rec,view);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
        	dataIndex : 'nombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Telefono',
            dataIndex : 'telefono',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
			dataIndex : 'descripcion',
            flex: 1
		}
    ],
    
    initComponent: function () {
       this.callParent(arguments);     
       /* 
        var comboSearch =  [
                             ['flo_ccodigo',getLocale('Codigo')],
                             ['flo_cdescripcion',getLocale('Descripcion')]
                           ];
        
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };
        
        
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);*/
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                }/*,{
                    iconCls: 'icon-table-add',
                    text: 'Save',
                    scope: this,
                    action: 'save'
                }*//*,"-", {
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
                }*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});