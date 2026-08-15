//MIGRADO2024
Ext.define('Common.view.ServTecVisitaGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.servtecvisitagridview'],
    title : 'Templates',
    autoHeight : true,
    //plugins: [{ptype : '//pagingselectpersist'}],   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    selType:'checkboxmodel',
    selModel: {
        checkOnly: true,
        mode: "MULTI"
    },
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('servtecvisitagridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'datecolumn',
            // DK-1552 P3: mostrar la fecha asignada a la visita (Fecha de inicio), no la fecha de creacion
            header : 'Fecha',
            dataIndex : 'svi_tSalidaHaciaCliente',
            flex: 1,
            renderer : function(value, object, record) {
                var v = record.get('svi_tSalidaHaciaCliente');
                if( v && Ext.Date.format(v,'Y') > '1900' ) {
                    return Ext.Date.format(v,'d/m/Y H:i');
                }
                return '';
            },
            format: 'd/m/Y H:i'
        },{
            xtype : 'gridcolumn',            
            header : 'Observacion',
            dataIndex : 'svi_cObservacion',
            flex: 1
		},{
            xtype : 'gridcolumn',
            header : 'Estado',
            dataIndex : 'svi_iEstado',
            flex: 1,
            renderer: function(value, object, r) {
                var v = r.get('svi_iEstado');
                // DK-1552 P11: si no hay estado seleccionado, mostrar "Pendiente" por defecto
                if(v == null || v === '' || v == 0 || v == 1) {
                    return 'Pendiente';
                } else if(v == 2) {
                    return getLocale('Asignado');
                } else if(v == 3) {
                    return getLocale('En Ejecucion');
                } else if(v == 4) {
                    return getLocale('Finalizado');
                } else if(v == 5) {
                    return getLocale('Cancelado');
                } else if(v == 6) {
                    return getLocale('Programada');
                }
                return 'Pendiente';
            }
    	}
    ],
    
    initComponent: function () {
       
        //this.addEvents('productSelected');
        //this.addEvents('objectchanged');
        
        var comboSearch =  [
                             ['svi_iEstado',getLocale('Estado')]
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
                    text: 'Agregar',
                    scope: this,
                    action: 'add',
                    itemId:'agregar'
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
                                            store: 'ServTecVisitaEstadoStore',
                                            fieldLabel: 'Estado',
                                            valueField : 'Value',
                                            displayField : 'Name'
                                                            
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
                },'-',
                {
                    iconCls: 'icon-delete',
                    text: 'Borrar',
                    scope: this,
                    action: 'delete',
                    itemId:'delete'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});