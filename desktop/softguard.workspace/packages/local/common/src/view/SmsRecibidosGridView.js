//MIGRADO2024
Ext.define('Common.view.SmsRecibidosGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.smsrecibidosgridview',
    
    autoHeight : true,    
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns: [{
        header: 'Cuenta',
        flex: 1,
        dataIndex: 'cue_clinea',
        renderer : function(value, metadata, record, colIndex,store, view) {
                var cuenta = record.get('cue_clinea')+"-"+record.get('cue_ncuenta')+" "+record.get('cue_cnombre');
                return cuenta;
            },
        hidden: true
    },{
        xtype: 'datecolumn',
        header: 'Fecha y Hora',
        flex: 1,
        dataIndex: 'rec_tFechaHora',
        format: 'Y/m/d H:i:s'
    },{
        header: 'Nombre',
        flex: 1,
        dataIndex: 'ope_cnombre'
    },{
        header: 'Contenido',
        flex: 1,
        dataIndex: 'rec_cContenido'
    },{
        header: 'Observaciones',
        flex: 1,
        dataIndex: 'rec_cObservaciones'
    }],
    initComponent: function () {
        this.callParent(arguments);     
        var me = this;
        
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
       
        var comboSearch =  [
            ['cue_clinea',getLocale('Dealer')],
            ['cue_clinea-cue_ncuenta',getLocale('Dealer-Cuenta')],
            ['cue_ncuenta',getLocale('Cuenta')],  
            ['rec_cContenido',getLocale('Contenido')],
            ['rec_cObservaciones',getLocale('Observaciones')]
        
        ];
       
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
                                        	xtype : 'datefield',
                        					fieldLabel : 'Fecha desde',
                        					name : "fechadesde",
                        					itemId : 'fechadesde'
                        				},{
                        					xtype : 'datefield',
                        					fieldLabel : 'Fecha hasta',
                        					itemId : 'fechahasta',
                        					name : "fechahasta"
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
                },'->',{
                    xtype : 'button',
                    itemId : 'btnExport',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }];   
            
             
         
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         });      
        
        this.addDocked(toolbar);
        
       
        
    } 
});  // cierro define