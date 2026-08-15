Ext.define('AdministratorSearch.view.GatewayGridView', {
    extend : 'Ext.grid.Panel',
    alias : ['widget.gatewaygridview'],
    title : 'Gateway',
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
        // agregar una columna para abrir la lista de receptores del formato.
        {
        	xtype : 'gridcolumn',
			header : 'Descripcion',
            dataIndex : 'tgm_cdescripcion',
            flex: 1
		},{
    		xtype : 'gridcolumn',
			header : 'Tipo',
            dataIndex : 'tgm_ntipo',
            flex: 1,
            renderer: function (value) {
                var desc = '';
                if(value == 0) {
                    desc = 'Modem';
                } else if(value == 1) {
                    desc = 'SMPP';
                } else if(value == 2) {
                    desc = 'HTTP';
                } else if(value == 3) {
                    desc = 'API MAIL';
                }else if(value == 4) {
                    desc = 'SMARTSMS';
                }else if(value == 5) {
                    desc = 'OPENVOX';
                }else if(value == 7) {
                    desc = 'Broadcaster';
                }else if(value == 8) {
                    desc = 'C3NTRO';
                }else if(value == 9) {
                    desc = 'Nomination';
                }
                return getLocale(desc);
            }
		}
        
    ],
    
    initComponent: function () {
        this.callParent(arguments);     
        var me = this;
        
        
        this.getSelectionModel().on(
            'selectionchange', 
            function(selModel, selections, options){
                me.down('[action="delete"]').setDisabled(selections.length == 0)
            }
        );
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        
        this.addDocked(pagingtoolbar);
        
       var comboSearch =  [
         ['tgm_cdescripcion',getLocale('Descripcion')],
       ];
       
       
        var items= [
                {
                    iconCls: 'icon-table-add',
                    text: 'Nuevo',
                    scope: this,
                    action: 'add'
                },{
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    scope: this,
                    action: 'delete'
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
                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'fieldName',
                                            store: comboSearch,
                                            fieldLabel: 'Campo'
                                            
                                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Valor'
                                          
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
});