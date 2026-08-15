Ext.define('AdministratorSearch.view.TablasCodigosAlarmaGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablascodigosalarmagridview','widget.tablascodigosalarmasearchview'],
    title : 'Templates',
    autoHeight : true,
  //  selModel: Ext.create('Ext.selection.CheckboxModel'),
       
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
                    var view = grid.up('tablascodigosalarmagridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },
       {
            xtype : 'gridcolumn',
    		header : '',
			dataIndex : 'cService',
			sortable : true,
			groupable : true,
			width : 26,
           
            renderer: function(value, metadata,record){
                var t = this;
                var path = '/handler/getImage?u=/images/codala/'+record.get('cod_ccodigo')+'.png';     
               //  var path = '/images/codala/'+record.get('cod_ccodigo')+'.png';
                return '<img data-qtip="'+value+'" src="'+path+'"   width=16 height=16 onerror=\'this.style.display = "none"\'>';
            
            }
		},
       {
            xtype : 'gridcolumn',            
            header : 'Codigo',
    		dataIndex : 'cod_ccodigo',
            width: 100
		},       
       {
            xtype : 'gridcolumn',            
            header : 'Descripcion',
			dataIndex : 'cod_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Alerta',
    		dataIndex : 'cod_nalerta',
            renderer: function(v, metadata,record){
            if (v == 1)
                return getLocale('Genera alerta');
            else if (v == 0)
                return getLocale('No genera alerta');
            else
                return getLocale('No genera evento');
            },
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Prioridad',
        	dataIndex : 'cod_nprioridad',
            flex: 1
		}
    ],
    
   /* preLoadImg : function () {
            var t = this;
            t.onload = function () { 
                t.style = 'display:block'; 
                return 
                
            }; 
               
        },*/
    
    initComponent: function () {
        
        
        
       
        
        var comboSearch =  [
                             ['cod_ccodigo',getLocale('Codigo')],
                             ['cod_cdescripcion',getLocale('Descripcion')]
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
                    disabled: true,
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
                                            value:'cod_ccodigo',
                                            fieldLabel: 'Campo'
                                            
                                                            
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'query',
                                            fieldLabel: 'Valor'
                                          
                                        },{
                                            xtype: 'button',
                                            iconCls: 'icon-find',
                                            text: 'Buscar',
                                            scope: this,
                                            action: 'search'
                                        }
                                    ]
                                 }
                             ]
            		    }
                    
    			},'-',
                {
                    iconCls: 'icon-find',
                    text: 'Todos',
                    scope: this,
                    action: 'getall'
                },'-',
                {
                    xtype: 'displayfield',
                    text: 'Filtros',
                    scope: this,
                    itemId: 'filtros'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});