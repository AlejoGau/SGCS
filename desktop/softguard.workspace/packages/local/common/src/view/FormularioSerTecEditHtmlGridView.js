Ext.define('Common.view.FormularioSerTecEditHtmlGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.formulariosertecedithtmlgridview'],
    title : 'Templates',
    //requires: ['Slbf.ux.grid.plugin.PagingSelectionPersistence'],
    autoHeight : true,
    selModel: Ext.create('Ext.selection.CheckboxModel', {
        mode: 'SINGLE',
        allowDeselect: true // Opcional: permite desmarcar el check si ya está seleccionado
    }),
    //plugins: [{ptype : 'pagingselectpersist'}],   
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
                    var view = grid.up('formulariosertecedithtmlgridview');
                    var rec = grid.getStore().getAt(rowIndex);
                    view.fireEvent('objectedit',rec,grid);
                }
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'Nombre',
        	dataIndex : 'fst_cNombre',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Estado',
			dataIndex : 'fst_iStatus',
            renderer: function(value){
                if(value === 0)
                    return getLocale('Habilitado');
                if(value === 1)
                    return getLocale('No Habilitado');
            },
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Servicio',
			dataIndex : 'fst_iTipo',
            flex: 1,
            renderer: function(value){
                var store = Ext.data.StoreManager.get( 'tipoServicioFormSerTecStore' );
                var record = store.findRecord( 'tip_idKey', value );
                if( record == undefined )
                    return value;
                else
                    return record.get( 'tip_cdescripcion' );                
            }
		},{
            xtype : 'gridcolumn',            
            header : 'Dealers',
			dataIndex : 'fst_cDealer',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'Archivo',
			dataIndex : 'fst_cArchivo',
            flex: 1
		}
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['flo_ccodigo',getLocale('Codigo')],
                             ['flo_cdescripcion',getLocale('Descripcion')]
                           ];
        
        
        /*this.onSelectChange = function (selModel, selections) {
            this.down('[action="delete"]').setDisabled(selections.length == 0);
        };*/

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
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    itemId: 'btnprint',
                    disabled: true,
                    action: 'btnprint',

                },
                /*{
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
                },"-",*/{
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 300,
                        items: [
                                {
                                    xtype: 'panel',
                                    bodyPadding: 5,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre',
                                            itemId: 'filterNombre'
                                        },{
                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'filterEstado',
                                            store:[
                                                [0,getLocale('Habilitado')],
                                                [1,getLocale('No Habilitado')]
                                            ],
                                            fieldLabel: 'Estado',
                                            plugins : ['clearbutton'],
                                                            
                                        },{
                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'filterTipo',
                                            fieldLabel: 'Servicio',
                                            displayField: 'tip_cdescripcion',
                                            valueField: 'Id',
                                            plugins : ['clearbutton'],               
                                        },{
                                                xtype : 'combo',
                                                fieldLabel : 'Dealer',
                                                itemId: 'filterDealer',
                                                store : 'TablaLineasStore',
                                                displayField : 'lin_crazonsocial',
                                                valueField : 'lin_ccodigo',
                                                //margin:'0 0 0 3',
                                                plugins : ['clearbutton'],
                                                width: 280,            
                                                queryMode: 'local'                                             
                                        },{
                                                xtype:'button',
                                                //iconCls: 'icon-find',
                                                text: 'Aplicar',
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
                },'->',{
                    xtype: 'button',
                    disabled: true,
                    text: 'Enviar',
                    iconCls: 'icon-email',
                    action: 'mail'
                }
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});