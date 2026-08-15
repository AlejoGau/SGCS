//MIGRADO2024
Ext.define('Common.view.IprsConeccionGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.iprsconecciongridview',
    title : 'Conexiones IPR',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true
    },
	columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 25,
            hidden:true
           /* items: [
                {
                    getClass: function(field, metadata,record, rowindex, colindex, store){
                        return 'icon-Event-'+record.get('EventType');
                    },
                    getTip: function(field, metadata,record, rowindex, colindex, store){
                        return this.getTypeName(record.get('EventType'));
                    }
                }
            ]*/
        },{
            xtype : 'gridcolumn',
			header : 'Id',
			dataIndex : 'Id',
			sortable : true,
            hidden:true,
			width: 30
		},{
            text: '',
            dataIndex: 'iprsc_status',
            renderer: function(value, metadata, record, colIndex,store, view){
                if (value=='A'){
                    return "<img src=\"/resources/global/images/icons/accept.png\"/>";
                }else{
                    return "<img src=\"/resources/global/images/icons/cross.png\"/>";
                }
            },
            width: 30
        },{
            xtype : 'gridcolumn',
    		header : 'Nombre',
			dataIndex : 'ipc_cdescripcion',
			sortable : true,
			flex: 1
		},{
            xtype : 'gridcolumn',
    		header : 'Protocolo',
			dataIndex : 'iprsc_config',
			sortable : true,
			flex: 1,
            renderer : function(value, metadata, record, colIndex,store, view) {
                /** BC 395889102 : Se suma informacion sobre el protocolo de conexion */
                
                var iprscConfig = Ext.JSON.decode(value);
                var formdata = iprscConfig.formdata
                return formdata.connectionMethod
            }
		},{
            xtype : 'gridcolumn',
            header : 'Puerto',
			dataIndex : 'ipc_nport',
			sortable : true,
			width: 80
		}, {
            xtype : 'gridcolumn',
        	header : 'Receptor',
			dataIndex : 'rec_cdescripcion',
			sortable : true,
			flex: 1
		},{
    		xtype : 'datecolumn',
			header : 'Ultima actualización',
            format : 'd/m/Y H:i',
			sortable : true,
			dataIndex : 'iprs_lastserviceupdate',
            hidden:true,
			width : 120
		},{
           xtype : 'gridcolumn',
            header : 'Servicio IPRS',
			dataIndex : 'iprs_ccnombre',
			sortable : true,
			flex: 1,
            hidden : true
        },{
            xtype:'actioncolumn',
            header: '',
            width: 25,
            items: [{
            iconCls: 'icon-delete',
            tooltip: 'Eliminar',
            handler: function(grid, rowIndex, colIndex,item, event) {
                var view = grid.up('iprsconecciongridview');
                var rec = grid.getStore().getAt(rowIndex);
                view.fireEvent('deleteconexion',rec,view);
            }
        }]
            
        },
    ],
    
    initComponent: function () {
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            itemId : 'toolbar',
            items: [
                {
                    iconCls: '',
                    text: 'Nueva relación',
                    action: 'create',
                    hidden: true
                },{
                    iconCls: '',
                    text: 'Nueva conexión',
                    action: 'createConexion',
                    itemId : 'newConnection'
                },{
                    iconCls: '',
                    text: 'Nueva conexión SMS',
                    action: 'createConexionSms',
                    itemId : 'newConnectionSms'
                },{
                    iconCls: '',
                    text: 'Cambiar de servicio',
                    itemId: 'cambiarservicio'
                }
            ]// cierro items
        }); 
         
         /** BC : 371312207 - Toolbar para el ingreso desde AdministratorSearch - Configuracion
          * Se habilita por medio de la propiedad openFromConfiguration en la view
          **/
        var toolbarConfiguration = Ext.create('Ext.toolbar.Toolbar', {
            itemId : 'toolbarConfiguration',
            hidden : true,
            items: [
                {
                    text : getLocale('Filtrar'),
                    itemId: 'filter',
                    menu: {
                        xtype: 'menu',
                        width: 250,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [
                                   {
                                        xtype : 'textfield',
                                        fieldLabel: 'Nombre de Conexion',
                                        itemId: 'connectionName',
                                        width : 230
                                    },{
                                        xtype : 'textfield',
                                        fieldLabel: 'Puerto',
                                        itemId: 'connectionPort',
                                        width : 230
                                    },{
                                        xtype : 'textfield',
                                        fieldLabel: 'Receptor',
                                        itemId: 'connectionReceptor',
                                        width : 230
                                    } 
                                ]
                            }
                        ]
                    }
                },'-',{
                    xtype : 'button',
                    iconCls: 'icon-find',
                    text: 'Buscar',
                    itemId: 'btnSearch',
                    action: 'searchIPRS'
                },'-',{
                    xtype : 'button',
                    iconCls: 'icon-find',
                    text: 'Todos',
                    itemId: 'getAll',
                    action: 'getAllIPRS'
                }
            ]// cierro items
        });
         
        var toolbarFinal = Ext.create('Ext.toolbar.Toolbar', {
            layout: 'vbox',
            items: [toolbar, toolbarConfiguration]
        });
        
        this.addDocked(toolbarFinal);
        
    }
});