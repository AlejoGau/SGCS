//MIGRADO2024
Ext.define('Common.view.TablasLineasGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablaslineasgridview','widget.tablaslineassearchview'],
    title : 'Templates',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    columns : [
       {
            xtype:'actioncolumn',
            width:30,
            itemId:'actioncolumnedit',
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-phone',
                tooltip: getLocale('Telefonos'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('openphones',rec,grid);
                }
            }]
       },{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-user',
                tooltip: getLocale('Instaladores'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('openinstaladores',rec,grid);
                }
            }]
       },{
            xtype:'actioncolumn',
            width:30,
            items: [{
                iconCls: 'icon-monitor-link',
                tooltip: getLocale('Monitoreo'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('openmonitoreo',rec,grid);
                }
            }]
       },{
            xtype:'actioncolumn',
            width:30,
            itemId : 'configTG',
            items: [{
                iconCls: 'icon-google-maps',
                tooltip: getLocale('Configuración Trackguard'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('configtrackguard',rec,grid);
                }
            }]
       },{
           xtype: 'actioncolumn',
           width: 30,
           itemId: 'notificacionEncuesta',
           items: [
               {
                   iconCls: 'SgSerTec-icon',
                   tooltip: getLocale('Servicio Técnico'),
                   handler: function(grid, rowIndex,colIndex,item,event){
                       var view = grid.up('tablaslineasgridview');
                       var rec = grid.getStore().getAt(rowIndex);
                       view.fireEvent('notificacionencuesta',rec,grid);
                   }
               }
           ]
       },{
            xtype:'actioncolumn',
            width:30,
            itemId : 'configSP',
            items: [{
                iconCls: 'icon-smartpanic',
                tooltip: getLocale('Configuración Smartpanic'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('configsmartpanic',rec,grid);
                }
            }]
       },{
            xtype:'actioncolumn',
            width:30,
            itemId : 'configVC',
            items: [{
                iconCls: 'icon-vigicontrol',
                tooltip: getLocale('Configuración SmartTrack'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('configsmarttrack',rec, grid);
                }
            }]
       },{
            xtype:'actioncolumn',
            width:30,
            itemId : 'configCLEANAPP',
            items: [{
                iconCls: 'icon-cleanapp',
                tooltip: getLocale('Configuración CleanApp'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablaslineasgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('configcleanapp',rec, grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Codigo',
    		dataIndex : 'lin_ccodigo',
            width:50
		},{
            xtype : 'gridcolumn',            
            header : 'Razon social',
			dataIndex : 'lin_crazonsocial',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Calle',
    		dataIndex : 'lin_ccalle',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Autoprocesa',
        	dataIndex : 'lin_iAutoProcesa',
            renderer: function(value,metadata,record){    
                var estado = '';
                if (value == 1){
                    estado = getLocale("Si");
                } else {
                    estado = getLocale("No");
                }
                
                return estado;
            },
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['lin_ccodigo',getLocale('Codigo')],
                             ['lin_crazonsocial',getLocale('Razon social')]
                           ];
        
        /*this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };*/
        
        
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
                    action: 'add',
                    itemId: 'add'
                }, "-", {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    itemId: 'delete',
                    disabled: true,
                    scope: this
                }, "-", {
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
                                            value: 'lin_ccodigo'
                                            
                                                            
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
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});