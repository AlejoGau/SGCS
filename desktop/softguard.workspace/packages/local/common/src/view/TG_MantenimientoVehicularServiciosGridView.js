//MIGRADO2024
Ext.define('Common.view.TG_MantenimientoVehicularServiciosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.mantvehicularserviciosgridview',
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
                    var view = grid.up('mantvehiculargridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
        },{
            xtype : 'gridcolumn',            
            header : 'Servicio',
            dataIndex : 'tgms_cnombre',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
			dataIndex : 'tgms_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Kilometros',
            dataIndex : 'tgms_kilometros',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Meses',
            dataIndex : 'tgms_meses',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Estado',
            dataIndex : 'tgms_iestado',
            flex: 1,
            renderer: function (v,metadata,r) {
                if (r.get('tgms_iestado') == 0 ) {
                    return getLocale('Inactivo')
                } else if(r.get('tgms_iestado') == 1 ) {
                    return getLocale('Activo')
                }
            }
		}
    ],
    
    initComponent: function () {
                       
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };
        
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
                                            xtype: 'textfield',
                                            itemId: 'fieldName',
                                            fieldLabel: 'Nombre'              
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Descripcion'
                                          
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