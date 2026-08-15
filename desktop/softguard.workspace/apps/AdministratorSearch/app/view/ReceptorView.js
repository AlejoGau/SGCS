Ext.define('AdministratorSearch.view.ReceptorView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.receptorview'],
    preventHeader: true,
    autoHeight : true,
    frame: true,
    border : 0,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
	items : [
        {
			xtype : 'displayfield',
            fieldLabel : 'Descripcion',
            name : 'rec_cdescripcion'    
		},{
        	xtype : 'displayfield',
            fieldLabel : 'Origen',
            name : 'rec_cdll'    
		},{
    		xtype : 'displayfield',
            fieldLabel : 'TCP/IP',
            name : 'rec_ntcpip'    
		},        
        {                                        
            xtype : 'combo',
            itemId: 'cuentasel',
            displayField: 'ipc_cdescripcion',
            valueField: 'iprsc_ipcidkey',
            name : 'cuentasel_name',
            queryMode: 'local',
            width: 100, 
            fieldLabel: 'Seleccionar Conexion',
		},
        {
            xtype:'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            items:[
                {
                    xtype : 'gridpanel',
                    itemId : 'gridtodos',
                    flex: 1,
                    autoScroll : true,
                    scroll: true,
                    title: 'Disponibles',
                    selType:'checkboxmodel',
                    selModel: {
                        checkOnly: true,
                        mode: "MULTI"
                    },
                    viewConfig: {
                        getRowClass: function (record, index) {
                            if (record.get('_used') == 'true') {
                                
                                return 'nohabilitado';
                            }
                        },      
                    },
                    columns : [
                        {
                            xtype : 'gridcolumn',            
                            header : 'Formato',
                            dataIndex : 'for_cformato',
                            flex: 1
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Descripcion',
                            dataIndex : 'for_cdescripcion',
                                flex: 1
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Alarma',
                            dataIndex : 'for_calarma',
                            flex: 1
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Descripcion alarma',
                            dataIndex : 'cod_cdescripcion',
                                flex: 1
                        }
                        
                    ]
                },{
                    xtype:'container',
                    layout:'vbox',
                    margin:'120 5 0 5',
                    itemId:'botones',
                    items: [
                            {
                                xtype:'button',
                                text: 'Agregar',
                                iconCls: 'icon-add',       
                                itemId:'agregar',
                                    margin:'0 0 5 0',
                                    width:120
                            },{
                                xtype:'button',
                                text: 'Quitar',
                                iconCls: 'icon-cancel',
                                itemId:'quitar',
                                    width:120
                            }
                        ]
                },{
                    xtype : 'gridpanel',
                    itemId : 'gridselecionados',
                    flex: 1,
                    autoScroll : true,
                    scroll: true,
                    title: 'Seleccionados',
                    selType:'checkboxmodel',
                    selModel: {
                        checkOnly: true,
                        mode: "MULTI"
                    },
                    columns : [
                        {
                            xtype : 'gridcolumn',            
                            header : 'Formato',
                            dataIndex : 'for_cformato',
                            flex: 1
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Descripcion',
                            dataIndex : 'for_cdescripcion',
                                flex: 1
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Alarma',
                            dataIndex : 'for_calarma',
                            flex: 1
                        },{
                            xtype : 'gridcolumn',            
                            header : 'Descripcion alarma',
                            dataIndex : 'cod_cdescripcion',
                                flex: 1
                        }
                        
                    ],            
                    flex:1
                }
            ]
        }
    ],

	initComponent : function() {
		this.callParent();
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });

        this.down('#gridtodos').addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
              /*  {
                    iconCls: 'icon-add',
                    text: 'Agregar Formatos',
                    action: 'add',
                    scope: this
                },
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar Formatos',
                    action: 'delete',
                    scope: this
                }*/
            ]// cierro items
        }); 
        this.addDocked(toolbar);

        var toolbarTodos = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype:'textfield',
                    fieldLabel : '',                    
                    itemId:'query',
                    flex:1
                    
                },{
                    xtype:'button',
                    text:'Buscar',
                    itemId:'buscar'
                },{
                    xtype:'button',
                    text:'Todos',
                    itemId:'todos'
                }
            ]// cierro items
        }); 
        this.down('#gridtodos').addDocked(toolbarTodos);
	} // cierro init
});