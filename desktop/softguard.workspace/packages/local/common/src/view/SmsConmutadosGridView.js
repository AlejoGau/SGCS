//MIGRADO2024
Ext.define('Common.view.SmsConmutadosGridView',
{ extend: 'Ext.grid.Panel',
    alias: 'widget.smsconmutadosgridview',
    
    autoHeight : true,    
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns: [
        {
            xtype: 'datecolumn',
            header: 'Fecha y Hora',
            dataIndex: 'que_tfechahora',
            format: 'Y/m/d H:i:s',
            width : 150
        },{
            header: 'Estado',
            dataIndex: 'que_nEstado',
            renderer: function(value, metadata, record){
                
                switch (value) {
                    case 0:
                        return getLocale('Pendiente');
                    break;
                    case 1:
                        return getLocale('Enviado');
                    break;
                    case 2:
                        return getLocale('Rechazado');
                    case 3:
                        return getLocale('Conmuto a mail');
                    break;
                }
                return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
            }    
        },{
            header: 'Destino',
            dataIndex: 'que_cDestino'
        },{
            header: 'Asunto',
            flex: 1,
            dataIndex: 'que_cAsunto'
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
                             ['que_cAsunto',getLocale('Asunto')],
                             ['que_cDestino',getLocale('Destino')]
                          
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
                                            fieldLabel: 'Campo',
                                            listeners: {
                                                select: function(t) { 
                                                    
                                                    if(t.value == 'que_tfechahora') {
                                                        me.down('#hasta').show();
                                                    } else {
                                                        me.down('#hasta').hide();
                                                    }
                                                }
                                            }
                                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Valor'
                                          
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'hasta',
                                            fieldLabel: 'Valor Hasta',
                                            hidden: true
                                          
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
                }];    
            
             
         
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: items
         });      
        
        this.addDocked(toolbar);
        
    } 
});  // cierro define