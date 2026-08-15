//MIGRADO2024
Ext.define('Common.view.t_novedades_fcGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.novedadesfcgridview'],
    title : 'Novedades',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp:true,
    columns : [
    /*{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('novedadesfcgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
    },*/{
            xtype : 'gridcolumn',            
            header : 'Codigo',
            dataIndex : 'nov_icodigo_ID',  
            hidden: true,         
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
            dataIndex : 'nov_cdescripcion',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Importe',
            dataIndex : 'nov_mimporte',
            renderer: function (value, obj, record){
                return Ext.util.Format.currency(value,record.get('mon_csymbol')?record.get('mon_csymbol'):getParametro('SYSTEMCURRENCY',false,true).codigo)
            },
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Impuesto 1',
            dataIndex : 'nov_cimpuesto1',
            hidden: true,      
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Impuesto 2',
            dataIndex : 'nov_cimpuesto2',
            hidden: true,      
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Impuesto 3',
            dataIndex : 'nov_cimpuesto3',
            hidden: true,      
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Recurrente',
            dataIndex : 'nfc_nrecurrente',
            flex: 1,
            hidden: true,      
            renderer: function (value) {
                if(value == 1) {                    
                    return getLocale('Si')
                } else {
                    return getLocale('No')
                }
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Estado',
            dataIndex : 'nfc_nestado',
            flex: 1,
            renderer: function (value, obj,record) {
                if(value == 1) {                    
                    return getLocale('Realizado')
                } else if(value == -1) {                    
                    return getLocale('Bloqueado')
                } else {
                    return getLocale('Pendiente')
                }
            }
        },{
            xtype : 'gridcolumn',            
            header : 'Cliente',
            dataIndex : 'cli_cnombre',
            flex: 1
        },{
            xtype:'actioncolumn',
            width:30,
            hidden: true,      
            items: [{
                iconCls: 'icon-cancel',
                tooltip: 'Deshabilitar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('novedadesfcgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('bloquear',rec,grid);
                },
                getClass: function(v, meta, rec) {          
                    if(rec.data.nfc_nestado == 9 || rec.data.nfc_nestado == 1) {                                                                      
                        return 'x-hide-display';
                    } else {
                        return 'icon-cancel';
                    }
                }
            },{
                iconCls: 'icon-tick',
                tooltip: 'Habilitar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('novedadesfcgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('desbloquear',rec,grid);
                },
                getClass: function(v, meta, rec) {          
                    if(rec.data.nfc_nestado == 0 || rec.data.nfc_nestado == 1) {                                                                      
                        return 'x-hide-display';
                    } else {
                        return 'icon-tick';
                    }
                }
            }
        ]
    }
    ],
    
    initComponent: function () {
        var comboSearch =  [
            ['nov_icodigo_ID',getLocale('Codigo')],
            ['nov_cdescripcion',getLocale('Descripcion')]
        ];
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
                    itemId:'btnCrear',
                    text: 'Crear',
                    scope: this,
                    action: 'add'
                },"-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',                    
                    disabled: false,
                    scope: this
                },"-",{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        plain: true,
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