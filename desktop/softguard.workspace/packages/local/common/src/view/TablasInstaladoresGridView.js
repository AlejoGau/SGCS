//MIGRADO2024
Ext.define('Common.view.TablasInstaladoresGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablasinstaladoresgridview','widget.tablasinstaladoressearchview'],
    title : 'Templates',
    autoHeight : true,
    store: Ext.create('Ext.data.Store', {
        fields: ['ins_cnombre', 'ins_cempresa', 'ins_cDealer', 'ins_iTipo', 'ins_ctelefono', 'ins_cmail'],
        data: []
    }),
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    //plugins: [{ptype : 'pagingselectpersist'}],   
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
                    var view = grid.up('tablasinstaladoresgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
			dataIndex : 'ins_cnombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Empresa',
    		dataIndex : 'ins_cempresa',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Dealer',
            dataIndex : 'ins_cDealer',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Tipo',
            dataIndex : 'ins_iTipo',
            flex: 1,
            renderer: function (value) {
                switch(parseInt(value)){
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
        },{
            xtype : 'gridcolumn',            
            header : 'Telefono',
            dataIndex : 'ins_ctelefono',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Email',
            dataIndex : 'ins_cmail',
            flex: 1
        }
    ],
    
    initComponent: function () {
       
        var comboSearch =  [
                             ['ins_cnombre',getLocale('Nombre')],
                             ['ins_cempresa',getLocale('Empresa')],
                             ['ins_cDealer',getLocale('Dealer')]
                           ];
        //this.onSelectChange = function (selModel, selections) {
        //    this.down('[action="delete"]').setDisabled(selections.length == 0);
        //};
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
                    action: 'add',
                    itemId:'add'
                },"-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',   
                    itemId:'delete',
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
                                          
                                        },{
                                            xtype:'checkbox',
                                            fieldLabel:'Tecnicos',
                                            itemId:'tecnicoscheck',
                                            checked:true
                                        },{
                                            xtype:'checkbox',
                                            fieldLabel:'Instaladores',
                                            itemId:'instaldorescheck',
                                            checked:true
                                        },{
                                            xtype:'checkbox',
                                            fieldLabel:'Tecnicos e Instaladores',
                                            itemId:'tecnicosinstaldorescheck',
                                            checked:true
                                        },{
                                            xtype:'checkbox',
                                            fieldLabel:'Deshabilitados',
                                            itemId:'deshabilitadoscheck',
                                            checked:true
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
                },
               /* {
                    iconCls: 'icon-find',
                    text: 'Tecnicos',
                    scope: this,
                    action: 'searchtecnicos'
                },
                {
                    iconCls: 'icon-find',
                    text: 'Instaladores',
                    scope: this,
                    action: 'searchinstaladores'
                },*/'-',
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