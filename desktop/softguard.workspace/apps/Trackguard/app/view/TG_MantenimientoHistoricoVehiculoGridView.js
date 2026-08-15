Ext.define('Trackguard.view.TG_MantenimientoHistoricoVehiculoGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.manthistoricovehiculogridview',
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
            width: 30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Modificar',
                handler: function (grid, rowIndex, e, colIndex,item, event) {
                    var view = grid.up('mantvehiculogridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    this.fireEvent('onItemClick', grid, rec );
                }
            }]
        },{
            xtype : 'datecolumn',            
            header : 'Fecha',
            dataIndex : 'tgmh_dfecha',
            format: 'd/m/Y',
            flex: 1            
        },{
            xtype : 'gridcolumn',            
            header : 'Servicio',
            dataIndex : 'tgms_cnombre',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Comentario',
            dataIndex : 'tgmh_cdescripcion',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'Kilometraje',
            dataIndex : 'tgmh_iodometro',
            flex: 1
        }
    ],
    
    initComponent: function () {

        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
                
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                /*
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
                },"-",
                */
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 350,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            itemId: 'fechaDesde',
                                            fieldLabel: 'Fecha',
                                            anchor:'100%',
                                            labelWidth: 150
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'nombreServicio',
                                            fieldLabel: 'Nombre del Servicio',
                                            anchor:'100%',
                                            labelWidth: 150
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'descripcionServicio',
                                            fieldLabel: 'Descripcion',
                                            anchor:'100%',
                                            labelWidth: 150
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
                }/*,'->',{
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});