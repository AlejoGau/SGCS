//MIGRADO2024
Ext.define('Common.view.m_EstadosPanelGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.m_estadospanelgridview'],
    title : 'Templates',
    autoHeight : true,
    selType: 'checkboxmodel',
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: 'Editar',
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('m_estadospanelgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Alarma control',
    		dataIndex : 'alarmaControl',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Usuario control',
    		dataIndex : 'usuarioControl',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Alarma espera',
        	dataIndex : 'alarmaEsperada',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Usuario esperando',
        	dataIndex : 'usuarioEsperado',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Minutos',
            dataIndex : 'mep_iMinutos',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Autoprocesar',
            dataIndex : 'autoprocesar',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Alarma generar',
            dataIndex : 'alarmaGenerar',
            flex: 1
		}
    ],
    
    initComponent: function () {
        
        var comboSearch =  [
                             ['mep_cAlarmaControl',getLocale('mep_cAlarmaControl')],
                             ['mep_cAlarmaEsperada',getLocale('Alarma espera')],
                             ['mep_cAlarmaAGenerar',getLocale('Alarma generar')]
                           ];
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };
        
        
                
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
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
                }/*,"-",{
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
                }*/
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});