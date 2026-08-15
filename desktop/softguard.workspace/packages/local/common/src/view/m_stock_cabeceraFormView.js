//MIGRADO2024
Ext.define('Common.view.m_stock_cabeceraFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.mstockcabeceraformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true,
        width:'100%'
    },
    items : [
        {                           
            xtype: 'combo',
            queryMode: 'local',
            name : 'stc_tipomov',
            itemId : 'stc_tipomov',
            store: [
                ['IN', getLocale('Ingreso')],
                ['EG', getLocale('Egreso')],
                ['MO', getLocale('Movimeinto')]
            ],
            fieldLabel: 'Tipo movimiento'
        },{
            xtype : 'datefield',
            name : 'stc_fecha',
            fieldLabel: 'Fecha',
            itemId:'fecha'
    	},{
                                            
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
                            
        },{
                                            
            xtype: 'combo',
            queryMode: 'local',
            itemId: 'comboTecnicos',
            fieldLabel: 'Tecnico',
            displayField: 'ins_cnombre',                    
            valueField: 'ins_idKey',
    		name : 'stc_itecnico',
            hidden:true
                            
        },{                           
            xtype: 'combo',
            queryMode: 'local',
            name : 'stc_comprobantetipo',
            store: [
                ['1', getLocale('Tipo 1')]
            ],
            fieldLabel: 'stc_comprobantetipo'
        },{
            xtype : 'textfield',
    		name : 'stc_comprobante',
            fieldLabel: 'Comprobante'
		},{
            xtype : 'textfield',
        	name : 'stc_referencia',
            fieldLabel: 'Referencia'
		},{
            xtype : 'textarea',
            name : 'stc_descripcion',
            fieldLabel: 'Descripcion'
		},{
            xtype:'grid',
            itemId:'productosgrid',
            autoScroll: true,
            /*plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]*/
            columns:[
                    {
                        xtype : 'gridcolumn',            
                        header : 'Producto',
                        dataIndex : 'nombreProducto',
                        flex:1
                    },{
                        xtype : 'gridcolumn',            
                        header : 'Cantidad',
                        dataIndex : 'sti_cant',
                        flex:1,
                        editor: {
                            xtype: 'numberfield',
                            
                        },
                    },{
                        xtype:'actioncolumn', 
                        width:30,
                        items: [{
                            iconCls: 'icon-delete',
                            tooltip: getLocale('Eliminar protocolo'),
                            handler: function(grid, rowIndex, colIndex,item, event) {
                                var view = grid.up('mstockcabeceraformview');
                                var rec = grid.getStore().getAt(rowIndex);
                                grid.getStore().remove(rec)
                            }
                        }]
                    }
                ]
       }
    ],
	initComponent : function() {
		this.callParent();
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Agregar',
                    scope: this,
                    action: 'agregarproducto',
                    itemId:'agregarproducto'
                }
            ]// cierro items
         }); 
         this.down('#productosgrid').addDocked(toolbar);
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});