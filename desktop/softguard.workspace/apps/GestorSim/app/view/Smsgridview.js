Ext.define('GestorSim.view.Smsgridview', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.smsgridview',
    
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
            xtype : 'gridcolumn',            
			header : 'Cuenta',
			dataIndex : '',
			sortable : true,
            renderer: function(value,a,model) {
                
                if(model.get('cue_clinea') != '') {
                 return model.get('cue_clinea')+"-"+model.get('cue_ncuenta')+"-"+model.get('cue_cnombre');
                } else {
                 return getLocale('Sin relacion')   
                }
            }
		},{
            header: 'Gateway',
            dataIndex: 'sms_cdescripcion'
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
             ['cue_clinea',getLocale('Dealer')],
             ['cue_clinea-cue_ncuenta',getLocale('Dealer-Cuenta')],
             ['cue_ncuenta',getLocale('Cuenta')],  
             ['que_cAsunto',getLocale('Asunto')],
             ['que_cDestino',getLocale('Destino')],
             ['sms_cdescripcion',getLocale('Gateway')]
          
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