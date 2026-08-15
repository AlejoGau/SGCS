Ext.define('AdministratorSearch.view.TablasTiposGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.tablastiposgridview','widget.tablastipossearchview'],
    title : 'Templates',
    autoHeight : true,    
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
                    var view = grid.up('tablastiposgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },
        {
            xtype:'actioncolumn', 
            header: 'Icono',
            width:40,
            renderer: function(value, metadata,record){
                var folder = "poi";
                var condicion = record.get('tip_nCondicion');
                if (condicion == 0 || condicion==8) folder = 'poi';
                if (condicion == 1 || condicion==2 || condicion==3) folder = 'TypeTG';
                if ( record.get('tip_curlimagen')!== '')
                    return '<img src="/resources/softguard/images/'+ folder +'/' + record.get('tip_curlimagen') + '" width="19">';
            }
        },
        {
            xtype : 'gridcolumn',            
            header : 'Código',
    		dataIndex : 'tip_ccodigo',
            
		},
       {
            xtype : 'gridcolumn',            
            header : 'Descripcion',
			dataIndex : 'tip_cdescripcion',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Condición',
    		dataIndex : 'tipo_string',
            flex: 1
		}
    ],
    
    initComponent: function () {
        var comboSearch =  [        
            ['tip_ccodigo',getLocale('Codigo')],
            ['tip_cdescripcion',getLocale('Descripcion')],
            ['tip_nTipo',getLocale('Condicion')]
        ];
                           
       var comboCondiciones =  [
            [0,getLocale('Objetivo Fijo o SmartPanics')],
            [1,getLocale('TrackGuard - Vehículo')],
            [2,getLocale('TrackGuard - Persona')],
            [3,getLocale('TrackGuard - Mascota')],
            [4,getLocale('MapGuard - Móvil de respuesta o de servicio técnico')],
            [5,getLocale('Vigicontrol')],
            [6,getLocale('Cercos')],
            [7,getLocale('Unidad funcional')],
            [8,getLocale('Acceso')],
            [9,getLocale('CleanApp')],
            [10,getLocale('SmartPanicsPC')],
            [11,getLocale('TecGuard')],
            [12,getLocale('IOT - Candado')]
        ];          
        
       this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };

        ////this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
 
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
                        width: 400,
                        items: [
                            {
                                xtype: 'panel',
                                bodyPadding: 5,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
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
                                        
                                        xtype: 'combo',
                                        queryMode: 'local',
                                        itemId: 'combocondiciones',
                                        store: comboCondiciones,
                                        fieldLabel: 'Tipo',
                                        hidden:true               
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