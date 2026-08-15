//MIGRADO2024
Ext.define('Common.view.m_stock_cabeceraGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.mstockcabeceraview'],
    title : '',
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
            width:60,
            items: [{
                    iconCls: 'icon-table-edit',
                   // tooltip: getLocale('Movimiento'),
                    getClass: function(v,metadata,record,rowindex,colindex,store){
                        var tipo = record.get('stc_tipomov');
                        if (tipo =="EG" ){
                            return 'icon-bullet-delete';
                        } else if (tipo =="IN" ){
                            return 'icon-bullet-add';
                        } if (tipo =="MO" ){
                            return 'icon-bullet-go';
                        }
                        
                    },
                   /* getTip: function (a, b, r) {
                         var tipo = record.get('stc_tipomov');
                        if (tipo =="EG" ){
                            return getLocale('Egreso');
                        } else if (tipo =="IN" ){
                            return getLocale('Ingreso');
                        } if (tipo =="MO" ){
                            return getLocale('Movimiento');
                        }
                    },*/
                   /* renderer: function(v,metadata,r,rowIndex,colIndex,store,view){
                        
                         var tipo = r.get('stc_tipomov');
                         var text = '';
                        if (tipo =="EG" ){
                            text = getLocale('Egreso');
                        } else if (tipo =="IN" ){
                            text = getLocale('Ingreso');
                        } if (tipo =="MO" ){
                            text = getLocale('Movimiento');
                        }
                            
                       metadata.tdAttr = 'data-qtip="' + Ext.htmlEncode(text) + '"';
                    },*/
                    handler: function(grid, rowIndex, colIndex,item, event) {
                      /*  var view = grid.up('stdepositoview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,grid);*/
                    }
                },{
                    iconCls: 'icon-table-edit',
                    tooltip: 'Editar',
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('mstockcabeceraview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('objectedit',rec,grid);
                    },
                    /*getClass: function(v,metadata,record,rowindex,colindex,store){
                        if(view.readOnly) {
                            return 'x-hide-display'; 
                        } else{
                            return 'icon-table-edit';
                        }
                        
                    },*/
            }]
       },{
            xtype : 'gridcolumn',            
            header : 'stc_fecha',
            dataIndex : 'stc_fecha',
            flex: 1,
            renderer: function(value,metadata,record){
               return Ext.Date.format(record.get('stc_fecha'), 'D d-m-Y G:i:s');
            },
        },{
            xtype : 'gridcolumn',            
            header : 'stc_iddepositoorigen',
            dataIndex : 'nameOrigen',
            flex: 1
        },{
            xtype : 'gridcolumn',            
            header : 'stc_iddepositodestino',
        	dataIndex : 'nameDestino',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'udw_usuario',
            dataIndex : 'udw_usuario',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'stc_tipomov',
            dataIndex : 'stc_tipomov',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'stc_comprobantetipo',
            dataIndex : 'stc_comprobantetipo',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'stc_comprobante',
            dataIndex : 'stc_comprobante',
            flex: 1
		},{
            xtype : 'gridcolumn',            
            header : 'stc_referencia',
            dataIndex : 'stc_referencia',
            flex: 1
    	},{
            xtype : 'gridcolumn',            
            header : 'stc_descripcion',
            dataIndex : 'stc_descripcion',
            flex: 1
    	}
        
    ],
    
    initComponent: function () {
       
        
        var comboSearch =  [
                             ['o.[Name]',getLocale('Nombre deposito')],
                             ['org.[Name]',getLocale('Nombre organizacion')]
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
                    scope: this,
                    hidden:true //se pidio esconder
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
                                            itemId: 'depositoOrigen',
                                            fieldLabel: 'Desposito origen',
                                            displayField: 'Name',                    
                                            valueField: 'Id',
                                            name : 'stc_iddepositoorigen'
                                                            
                                        },{
                                                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'depositoDestino',
                                            fieldLabel: 'Deposito destino',
                                            displayField: 'Name',                    
                                            valueField: 'Id',
                                        	name : 'stc_iddepositodestino'
                                                            
                                        },
                                        
                                        {
                                            
                                            xtype: 'combo',
                                            queryMode: 'local',
                                            itemId: 'tipomovimiento',
                                            store: [
                                                ['EG', getLocale('Egreso')],
                                                ['IN', getLocale('Ingreso')],
                                                ['MO', getLocale('Movimiento')]
                                                ],
                                            fieldLabel: 'Tipo movimiento'
                                            
                                                            
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