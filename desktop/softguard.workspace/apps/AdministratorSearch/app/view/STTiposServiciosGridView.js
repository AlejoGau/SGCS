Ext.define('AdministratorSearch.view.STTiposServiciosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.sttiposserviciosview'],
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
            items: [{
                iconCls: 'icon-table-edit',
                tooltip: getLocale('Editar'),
                handler: function(grid, rowIndex, colIndex,item, event) {
                    var view = grid.up('tablasparametrosgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',  //Se pidio volver a habilitar el dia 9/5/2017 por Marcos Avalos         
            header : 'Codigo',
            dataIndex : 'tip_ccodigo',
            width: 70
    	},{
            xtype : 'gridcolumn',            
            header : 'Descripcion',
            dataIndex : 'tip_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Tipo',
            dataIndex : 'tip_ntipo',
            renderer: function(value, object, record) {
              
                 if(value == 0) {
                     return getLocale('Preventivo');
                 } else  if(value == 1) {
                     return getLocale('Correctivo')
                 } else if(value == 2) {
                    return getLocale('Instalacion')
                 }
                 
            },
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Valor',
            dataIndex : 'tip_yvalor',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'Dias proximo servicio',
			dataIndex : 'tip_ndias',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Dias de vencimiento',
    		dataIndex : 'tip_nvto',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
            ['tip_cdescripcion',getLocale('Descripcion')]
            //,['tip_ccodigo',getLocale('Código')]
        ];
        
        this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };

        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
      
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
                    //disabled: true,
                    scope: this
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
                                            value: 'tip_cdescripcion',
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
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});