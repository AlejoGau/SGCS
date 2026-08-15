//MIGRADO2024
Ext.define('Common.view.t_monitoreo_dealerGridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.t_monitoreo_dealergridview'],
    title : 'Templates',
    autoHeight : true,
  
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    
    features : [
        {
        	ftype : 'grouping',
            id: 'groupingOrg',
            groupHeaderTpl : '{name} ({rows.length})',
            enableGroupingMenu: false,
            hideGroupedHeader: true,
		}
    ],
    
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('t_monitoreo_dealergridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },/*{
            xtype : 'gridcolumn',            
            header : 'Dealer',
    		dataIndex : 'tmd_clinea',
            flex: 1
		},*/{
            xtype : 'gridcolumn',            
            header : 'Dia de la semana',
    		dataIndex : 'tmd_diasemana',
            flex: 1,
            renderer: function (value) {
                if(value == 1) {
                    return getLocale('Lunes')
                } else if(value == 2) {
                    return getLocale('Martes')
                } else if(value == 3) {
                    return getLocale('Miercoles')
                } else if(value == 4) {
                    return getLocale('Jueves')
                } else if(value == 5) {
                    return getLocale('Viernes')
                } else if(value == 6) {
                    return getLocale('Sabados')
                } else if(value == 0) {
                    return getLocale('Domingo')
                }
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Hora desde',
        	dataIndex : 'tmd_horadesde',
            flex: 1,
            renderer: function (value, a, record) {
                if(value == '00:00' && record.get('tmd_horahasta') == '23:59') {
                    return getLocale('Todo el dia')
                } else {
                    return value
                }
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Hora hasta',
        	dataIndex : 'tmd_horahasta',
            flex: 1,
            renderer: function (value, a, record) {
                if(value == '23:59' && record.get('tmd_horadesde') == '00:00') {
                    return ''
                } else {
                    return value
                }
            }
		}/*,{
            xtype : 'gridcolumn',            
            header : 'Organizacion',
            dataIndex : 'organizacion',
            flex: 1
		}*/
        
        
        
    ],
    
    initComponent: function () {
        
        var comboSearch =  [
            ['org.[Name]',getLocale('Organizacion')]
        ];
        
        //this.onSelectChange = function (selModel, selections) {
        //    this.down('[action="delete"]').setDisabled(selections.length == 0);
        //};
        
  
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