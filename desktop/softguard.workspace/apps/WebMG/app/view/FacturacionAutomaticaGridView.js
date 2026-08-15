Ext.define('WebMG.view.FacturacionAutomaticaGridView', {
   // extend : 'Ext.grid.GridPanel',
    extend : 'Ext.tree.Panel',   
    alias : ['widget.facturacionautomaticagridview'],
    title : 'Pedidos',
    autoHeight : true,
    //selModel: Ext.create('Ext.selection.CheckboxModel'),

    activeHelp:true,//trae el help
    
    
    rootVisible: false,
   
    columns : [/*{
            xtype:'actioncolumn',
            header: '',
            width: 30,
            items: [
                {
                    iconCls: 'icon-money-dollar',
                    tooltip: 'Modificar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('contratogridview');
                        var rec = grid.getStore().getAt(rowIndex);
        		},{
                    header : 'Tipo cantidad',
                    dataIndex : 'cantidadTipoLabel',
                    flex:1,
                    sortable : true,
                    renderer: function(value, metadata, record) {
                        if (value) {
                            return value;
                        }

                        switch (parseInt(record.get('cantidadTipo'), 10)) {
                            case 1:
                                return 'Cuentas activas';
                            case 0:
                                return 'Manual';
                            default:
                                return '';
                        }
                    }

        		},{
                    header : 'Cuentas',
                    dataIndex : 'cantidadCalculada',
                    flex:1,
                    sortable : true,
                    renderer: function(value) {
                        return Ext.isEmpty(value) ? '' : value;
                    }

                        view.fireEvent('objectedit',rec,view);
                    }
                }
            ]
        },*/
        {
            xtype: 'checkcolumn',
            header: '',
            dataIndex: 'activo',
            width: 55,
            stopSelection: false,
            menuDisabled: true,
            renderer: function(value, check, record){
                
                if (record.get('leaf') == true) {
                    return '';
                  } else {
                    return (new Ext.ux.CheckColumn()).renderer(value, check);
                  }
                
               
                
            }
        },{
            xtype : 'treecolumn',
            header : 'Nombre',
            dataIndex : 'Name',                	
            flex:1,
            sortable : true
            
		},{
            header : 'Cantidad',
            dataIndex : 'Count',                    
            flex:1,
            sortable : true
            
		},{
            header : 'Valor',
            dataIndex : 'Value',                    
            flex:1,
            sortable : true
            
    	}
    
    ],
    
    initComponent: function () {
        this.callParent(arguments); 
       
        this.view.targetTab = this.targetTab;
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls : 'icon-page-white-text',
                    text    : 'Facturar',
                    itemId: 'facturar',
                    action  : 'facturar'
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 310,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'date',
                                            fieldLabel: 'Proximo vencimiento'
                                        }, {
                                    		xtype : 'combo',		
                                			displayField : 'cbt_cdescripcion',
                                            queryMode: 'local',
                                            itemId: 'cbc_ctipocbte',
                                			valueField : 'cbt_ccodigo',
                                            editable: false,
                                            fieldLabel:'Comprobante'
                                                
                                		},{
                                            xtype: 'combo',           
                                            editable: false,
                                            queryMode: 'local',
                                            fieldLabel: 'Categoria impositiva',
                                            lastQuery: '',
                                            itemId:'categoriasimpositivas',
                                            displayField: 'cat_cdescripcion',
                                            valueField: 'cat_ccodigo'
                                        },{
                                            xtype: 'combo',           
                                            editable: false,
                                            queryMode: 'local',
                                            fieldLabel: 'Condicion de pago',
                                            lastQuery: '',
                                            itemId:'condicionespago',
                                            displayField: 'con_cdescripcion',
                                            valueField: 'con_ccodigo'
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
        
        this.addDocked(pagingtoolbar);
    } 
});