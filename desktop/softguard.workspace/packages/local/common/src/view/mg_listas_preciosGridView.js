//MIGRADO2024
Ext.define('Common.view.mg_listas_preciosGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : ['widget.mg_listas_preciosgridview'],
    title : '',
    autoHeight : true,
   // selModel: Ext.create('Ext.selection.CheckboxModel'),
    //plugins: [{ptype : '//pagingselectpersist'}],   
    viewConfig: {
        trackOver: true,
        stripeRows: true,
        loadMask: false
    },
    activeHelp:true,
    columns:[
                {
                    xtype : 'gridcolumn',
                    header : 'Nombre',
                    dataIndex : 'mglp_nombre',                    
                    flex:1               
            	},{
                    xtype : 'gridcolumn',
                    header : 'Tipo',
                    dataIndex : 'mglp_tipo',                    
                    flex:1,
                    renderer:function (value) {
                        if(value == 1) {
                            return getLocale('Fijo')
                        } else {
                            return getLocale('Dinamico')
                        }
                    }
            	},{
                    xtype : 'gridcolumn',
                    header : 'Moneda',
                    dataIndex : 'mglp_currency',                    
                    flex:1               
                },{
                    xtype : 'gridcolumn',
                    header : 'Valor',
                    dataIndex : 'mglpd_valor',                    
                    flex:1 ,
                    renderer:  function(value, obj,record){
                        var view = this.up('productolistaprecioview')
                        if(record.get('mglp_tipo') == 1) {
                           // return Ext.util.Format.currency(value)
                           return ''
                        } else {
                            return record.get('mglp_multiplicador')
                        }
                    }
                },{
                    xtype : 'gridcolumn',
                    header : 'Organizacion',
                    dataIndex : 'nombreOrganizacion',                    
                    flex:1               
                },{
                    xtype:'actioncolumn',
                    header: '',
                    width: 60,
                    items: [
                        {
                            iconCls: 'icon-application-cascade',
                            tooltip: 'Ver detalles',
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('mg_listas_preciosgridview');
                                var rec = grid.getStore().getAt(rowIndex);
                                view.fireEvent('loaddetalle',rec,view);
                            },                                                          
                              getClass: function(v, meta, rec) {          
                                  if(rec.data.mglp_tipo == 0) {                                                                      
                                      return 'x-hide-display';
                                  } else {
                                      return 'icon-application-cascade';
                                  }
                              }
                        },{
                            iconCls: 'icon-delete',
                            tooltip: 'Borrar',
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('mg_listas_preciosgridview');
                                var rec = grid.getStore().getAt(rowIndex);
                                view.fireEvent('delete',rec,view);
                            }/*,                                                          
                              getClass: function(v, meta, rec) {          
                                  if(rec.data.mglp_tipo == 0 || rec.data.mglpd_idkey == 0) {                                                                      
                                      return 'x-hide-display';
                                  } else {
                                      return 'icon-delete';
                                  }
                              }*/
                        }
                    ]
          
    }],    
    initComponent: function () {
        this.callParent(arguments); 
             
             
             
         var comboSearch =  [
                             ['mglp_nombre',getLocale('Nombre de lista')]
                           ];
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls : 'icon-page-white-text',
                    text    : 'Nueva lista',
                    itemId: 'new',
                    action  : 'new'
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
                                            fieldLabel: 'Campo',
                                            editable: false,
                                                            
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
        
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);        
        
    } 
});