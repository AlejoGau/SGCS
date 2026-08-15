//MIGRADO2024
Ext.define('Common.view.TripGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tripgridview',
    autoHeight : true,    
    editor : 'tripformview',
    stateful: false,
    //editorTarget: 'window',
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns: [
        {
            xtype:'actioncolumn',
            menuDisabled: true,
            itemId: 'actionMap',
            width:23,
            items: [
                {
                    iconCls: 'icon-map',
                    tooltip: 'Ver recorrido',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('tripgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('viewtrip', grid, rec, item, colIndex);
                    }
                }
            ]
       },
       {
            xtype:'actioncolumn',
            menuDisabled: true,
            itemId: 'actionCrud',
            dataIndex: 'actionCrud',
            width:40,
            items: [
                {
                    iconCls: 'icon-map-edit',
                    tooltip: 'Modificar',       
                    handler: function(grid, rowIndex, colIndex, item, event) {
                        var view = grid.up('tripgridview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('modifytrip', grid, rec, item, colIndex);
                    }
                },{
                    text: 'eliminar',
                    iconCls: 'delete',
                    handler: function(grid, rowIndex, colIndex, item, event) {
                        Ext.MessageBox.confirm(getLocale('Delete'), getLocale('Esta a punto de borrar un viaje, está seguro?'), function(btn){
                            if(btn === 'yes') {
                                var view = grid.up('tripgridview');
                                var rec = grid.getStore().getAt(rowIndex);
                                view.fireEvent('removetrip', grid, rec, item, colIndex);
                            }
                        });
                    }
                }
            ]
       }
       ,{
            header: 'Cuenta',
            dataIndex: 'c.cue_cnombre',
            renderer: function(value, metadata, record) {
                return record.get('_cuentanombre');
            },
            flex : 1 
        }
       ,{
            xtype: 'gridcolumn',
            header: 'Nombre del viaje',
            dataIndex: 'tgv_nombre',
            width: 260
        },{
            xtype: 'gridcolumn',
            header: 'Numero de viaje',
            dataIndex: 'tgv_codigoexterno',
            flex : 1
        },{
            xtype: 'datecolumn',
            header: 'Fecha y Hora de inicio',
            dataIndex: 'tgv_fechainicio',
            width : 150,
            renderer: function(value,metadata,record){
                if (value.getFullYear()>1900){
                    return Ext.Date.format(value, 'd-m-Y G:i');
                } else {
                    return '';
                }
                
            }
        },{
            xtype: 'datecolumn',
            header: 'Fecha y Hora de finalización',
            dataIndex: 'tgv_fechafin',
            width : 150,
            renderer: function(value,metadata,record){
               if (value.getFullYear()>1900){
                    return Ext.Date.format(value, 'd-m-Y G:i');
                } else {
                    return '';
                }
            }
        },{
            xtype: 'gridcolumn',
            header: 'Responsable',
            dataIndex: 'usu.usu_cnombre',
            flex : 1
        },{
            header: 'Estado',
            dataIndex: 'tgv_estado',
            renderer: function(value, metadata, record) {
                var fechaDesde = record.get('tgv_fechainicio');
                var fechaHasta = record.get('tgv_fechafin');
                var estado =  record.get('tgv_estado');
                var dt = new Date();
                if (estado == 4){
                    // Viaje Sin finalizar
                    metadata.style = 'color: #FFF; background-color:red';
                    return getLocale('Viaje Sin finalizar');
                }
                if (estado == 2 || (fechaHasta && fechaHasta.getFullYear()>1970)) {
                    metadata.style = 'color: #FFF; background-color:green';
                    return getLocale('Finalizado');
                }
                
                if (estado == 1 || (fechaDesde && fechaDesde.getFullYear()>1970 && fechaDesde < dt)) {
                    metadata.style = 'color: #000; background-color: #FF0';
                    return getLocale('Iniciado');
                } else {
                    metadata.style = 'color: #FFF; background-color: #FB6500';
                    return getLocale('Programado');
                }            
            },
            flex : 1    
        }
    ],
    initComponent: function () {
        this.callParent(arguments);     
        var me = this;
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype : 'button',
                    iconCls: 'icon-map',
                    text: 'Nuevo Viaje',
                    scope: this,
                    itemId: 'newTrip',
                    action: 'newTrip'
                },'-',{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 350,
                        items: [{
                            xtype: 'panel',
                            bodyPadding: 5,
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'fechadesde',
                                    itemId:'fechadesde',
                                    fieldLabel: 'Fecha Inicio',
                                    bindToModel : false,
                                    width : 330
                                },{
                                    xtype: 'datefield',
                                    name: 'fechahasta',
                                    itemId:'fechahasta',
                                    fieldLabel: 'Fecha Fin',
                                    bindToModel : false,
                                    width : 330
                                },/*{
                                        xtype: 'textfield',
                                        name: 'dealer',
                                        itemId: 'dealer',
                                        fieldLabel: 'Dealer',
                                        bindToModel : false,
                                        width : 330
                                },*/{
                                        xtype: 'textfield',
                                        name: 'cuenta',
                                        itemId: 'cuenta',
                                        fieldLabel: 'Cuenta',
                                        bindToModel : false,
                                        width : 330
                                },{
                                        xtype: 'textfield',
                                        name: 'numero',
                                        itemId: 'numero',
                                        fieldLabel: 'Numero',
                                        bindToModel : false,
                                        width : 330
                                },{
                                        xtype: 'textfield',
                                        name: 'nombreViaje',
                                        itemId: 'nombreViaje',
                                        fieldLabel: 'Nombre Viaje',
                                        bindToModel : false,
                                        width : 330
                                },{
                                    xtype: 'combo',
                                    fieldLabel : 'Responsable',
                                    displayField : 'usu_cnombre',
                                    queryMode: 'local',
                                    valueField : 'usu_iid',
                                    itemId: 'responsable',
                                    name : 'responsable'
                                },{
                                    xtype: 'button',
                                    iconCls: '',
                                    text: 'Buscar',
                                    action: 'filter',
                                    itemId:'search'
                                }
                            ]
                        }]
                    }
                },
                {
                    iconCls: 'icon-find',
                    text: 'Todas',
                    action: 'removefilter'
                },'->',{
                    xtype : 'button',
                    text: 'Reporte',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }
            ]
         });      
        
        this.addDocked(toolbar);
    } 
});  // cierro define