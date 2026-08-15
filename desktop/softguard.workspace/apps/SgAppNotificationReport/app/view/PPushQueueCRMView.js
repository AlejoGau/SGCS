Ext.define('SgAppNotificationReport.view.PPushQueueCRMView', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.ppushqueuecrmgridview',
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    autoScroll : true,
    columns : [
        {
            xtype: 'datecolumn',
            dataIndex: 'ppq_fechacreacion',
            header: 'Fecha de Creacion',
            sortable: true,
            flex: 1,
            format: 'd/m/Y H:i:s'
        },{   
            xtype: 'gridcolumn',
            dataIndex : 'nombreOrigen',
            header : 'Cuenta',
            sortable : true,
            flex : 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'ppq_estado',
            header: 'Estado',
            sortable: true,
            flex: 1,
            renderer: function (value, metadata, record, colIndex, store, view) {
                if(value == 0) {
                    return getLocale('No leido');
                }
                    return getLocale('Leido');
            }
        },{
            xtype: 'gridcolumn',
            dataIndex: 'cnombreDestino',
            header: 'Cuenta Destino',
            sortable: true,
            flex: 1,
            render : function(value, metadata, record, colIndex, store, view) {
                var destino = record.get('clineaDestino')+'-'+record.get('ncuentaDestino')+' '+record.get('cnombreDestino');
            }
        },
        /*{
            xtype: 'gridcolumn',
            dataIndex: 'telefonoDestino',
            header: 'Telefono Destino',
            sortable: true,
            flex: 1 
        },*/
        {
            xtype: 'gridcolumn',
            dataIndex: 'msgTitle',
            header: 'Mensaje',
            sortable: true,
            flex: 1
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
        
        /* Creo las opciones del combo tipo de mensaje */
        var comboSearch =  [
            ['UPDATE_LOGIN',getLocale('UPDATE_LOGIN')],
            ['INBOX_MESSAGE',getLocale('INBOX_MESSAGE')],
            ['ALARM_STOP',getLocale('ALARM_STOP')]
        ];
        
        /* Agrego el menu de filtros */
        var items= [
                {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 280,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        /*{
                                            xtype: 'combo',
                                            fieldLabel: 'Tipo de mensaje',
                                            queryMode: 'local',
                                            itemId: 'message',
                                            store: comboSearch                                                                                                       
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Mensaje'
                                          
                                        },*/
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Fecha creacion',
                                            name : "fechacreacion",
                                            itemId : 'fechacreacion'    		
                                        }
                                        /*,{
                                            xtype : 'datefield',
                                            fieldLabel : 'Fecha envio',
                                            itemId : 'fechaenvio',
                                            name : "fechaenvio"
                        				}*/
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
                },'->',{
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }];   
            
             
         
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         });      
        
        this.addDocked(toolbar);
        
    }
});
