Ext.define('AdministratorSearch.view.LogGatewayView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.loggateway'],
    autoHeight : true,
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        /*{
            xtype : 'gridcolumn',            
            header : 'Nombre',
            dataIndex : 'MachineName',
            flex: 1
		},*/{
            xtype : 'gridcolumn',            
            header : 'Logged',
            dataIndex : 'Logged',
            width : 180,
            renderer: function(value,metadata,record){
               return Ext.Date.format(record.get('Logged'), 'D d-m-Y G:i:s');
            }
        }/*,{
            xtype : 'gridcolumn',            
            header : 'Level',
            dataIndex : 'Level',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'ServiceName',
            dataIndex : 'ServiceName',
            flex: 1
		}*/,{
            xtype : 'gridcolumn',            
            header : 'Message',
            dataIndex : '_Message',
            flex: 1
        }/*,{
            xtype : 'gridcolumn',            
            header : 'Logger',
            dataIndex : 'Logger',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Properties',
            dataIndex : 'Properties',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Callsite',
            dataIndex : 'Callsite',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Exception',
            dataIndex : 'Exception',
            flex: 1
		}*/
    ],
    
    initComponent: function () {
        
        this.callParent(arguments);
                
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
                text : 'Filtros',
                menu: {
                    xtype: 'menu',
                    //width: 280,
                    items: [{
                        xtype: 'panel',
                        bodyPadding: 5,
                        items: [
                            {
                                xtype:'fieldset',                                                    
                                padding:'0 0 0 0',
                                border:0,
                                layout: 'hbox',
                                margin:'0 0 5 0',
                                items:[
                                        {
                                            xtype: 'datefield',
                                            itemId: 'fechadesde',
                                            fieldLabel: 'Fecha desde'
                                        },{
                                            fieldLabel: 'Hora',
                                            xtype: 'timefield',
                                            itemId: 'horadesde',
                                            format: 'H:i',
                                            altFormats:'H:i',
                                            value: '00:00',
                                            increment: 5,
                                            labelWidth: 40,
                                            width: 123,
                                            margin:'0 0 0 7',
                                            name:'horadesde'
                                        }
                                    ]
                            },{
                                xtype:'fieldset',                                                    
                                padding:'0 0 0 0',
                                border:0,
                                layout: 'hbox',
                                margin:'0 0 5 0',
                                items:[
                                        {
                                            xtype: 'datefield',
                                            itemId: 'fechahasta',
                                            fieldLabel: 'Fecha hasta'
                                        },{
                                            fieldLabel: 'Hora',
                                            xtype: 'timefield',
                                            itemId: 'horahasta',
                                            format: 'H:i',
                                            altFormats:'H:i',
                                            value: '23:50',
                                            increment: 5,
                                            labelWidth:40,
                                            width: 123,                                                                        
                                            margin:'0 0 0 7',
                                            name:'horahasta'
                                        }
                                    ]
                            },{
                                xtype : 'combo',
                                itemId : 'levelOpt',
                                fieldLabel: 'Level',
                                store : [
                                    [0, getLocale('Info')],
                                    [1, getLocale('Trace')],
                                    [2, getLocale('Debug')],
                                    [3, getLocale('Error')]
                                ],
                            }]
                        }]
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
            ]
        }); 
        
        this.addDocked(toolbar);
        
    } 
});