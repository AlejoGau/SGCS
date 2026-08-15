//MIGRADO2024
Ext.define('Common.view.ProductoListaPreciosView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.productolistaprecioview'],
    title : '',
    autoHeight : true,   
    items:[{
        title:'Lista de precios',
        xtype:'grid',
        itemId:'listasprecios',
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
                            return Ext.util.Format.currency(value,record.get('mon_csymbol'))
                        } else {
                            var precioBase = view.up('stproductosformview').down('#Price').getValue()
                            //return Ext.util.Format.currency(((record.get('mglp_multiplicador')/100)+1)*precioBase,record.get('mon_csymbol'))
                            return Ext.util.Format.currency(record.get('mglp_multiplicador')*precioBase,record.get('mon_csymbol'))
                        }
                    }
                },{
                    xtype:'actioncolumn',
                    header: '',
                    width: 80,
                    items: [
                        {
                            iconCls: 'icon-application-cascade',
                            tooltip: 'Ver detalles',
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('productolistaprecioview');
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
                                var view = grid.up('productolistaprecioview');
                                var rec = grid.getStore().getAt(rowIndex);
                                view.fireEvent('delete',rec,view);
                            },                                                          
                              getClass: function(v, meta, rec) {          
                                  if(rec.data.mglp_tipo == 0 || rec.data.mglpd_idkey == 0) {                                                                      
                                      return 'x-hide-display';
                                  } else {
                                      return 'icon-delete';
                                  }
                              }
                        },{
                            iconCls: 'icon-add',
                            tooltip: 'Agregar a la lista',
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('productolistaprecioview');
                                var rec = grid.getStore().getAt(rowIndex);
                                view.fireEvent('addProduct',view,rec);
                            },                                                          
                              getClass: function(v, meta, rec) {          
                                  if(rec.data.mglp_tipo == 0 || (rec.data.mglp_tipo == 1  && rec.data.mglpd_idkey != 0)) {                                                                   
                                      return 'x-hide-display';
                                  } else {
                                      return 'icon-add';
                                  }
                              }
                        }
                    ]
                }
            ]
    }],    
    initComponent: function () {
        this.callParent(arguments); 
               
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls : 'icon-page-white-text',
                    text    : 'Nueva lista',
                    itemId: 'new',
                    action  : 'new'
                },{
                    text:'Listas que afectan este producto',
                    itemId:'listasconproducto',
                    enableToggle : true,
                    toggleGroup :'lista',
                    iconCls:'icon-page-white'
                },{
                    text:'Todas las listas',
                    itemId:'todaslistas',
                    enableToggle : true,
                    toggleGroup :'lista',
                    iconCls:'icon-page-white-copy'
                }
                
            ]// cierro items
         }); 
        
        this.down('#listasprecios').addDocked(toolbar);
        
    } 
});