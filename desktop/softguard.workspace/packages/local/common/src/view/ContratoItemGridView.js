Ext.define('Common.view.ContratoItemGridView', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.contratoitemsearchview',
    title : 'Items',
    autoHeight : true,
    features: [{
        ftype: 'summary'
    }],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns : [{
            xtype:'actioncolumn',
            header: '',
            width: 40,
            items: [
                {
                    iconCls: 'icon-delete',
                    tooltip: getLocale('Eliminar'),
                    handler: function(grid, rowIndex, colIndex,item, event) {
                        var view = grid.up('contratoitemsearchview');
                        var rec = grid.getStore().getAt(rowIndex);
                        view.fireEvent('deleteitem',rec,view);
                    }
                }
            ]
        },{
            xtype : 'gridcolumn',
            header : 'Artículo',
            dataIndex : 'Code',    				
            width : 60,
            sortable : true
		},{
            xtype : 'gridcolumn',
            header : 'Nombre',
            dataIndex : 'Description',					
            width : 200,
            sortable : true
		},{
            xtype : 'numbercolumn',
            header : 'Cantidad',
            dataIndex : 'Quantity',
            width : 100,
            sortable : true,
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                var text = value !== 1 ? getLocale('Items') : getLocale('Item');
                if(value>0)
                    return value + ' '+text; 
                else
                    return '';
            }
        },{
            xtype : 'numbercolumn',
            header : 'Valor',
            dataIndex : 'Price',    
            renderer: function (value){
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('org_csymbol'))
                } else {
                   if(value>0)
                        return value;
                   else
                        return '';
                }
            },
            width : 100,
            sortable : true
		},{
            xtype : 'numbercolumn',
            header : 'Impuesto (%)',
            dataIndex : 'VAT',    
            width : 100,
            sortable : true
        },{
            xtype : 'numbercolumn',
            header : 'Neto',
            dataIndex : '_subtotal',    
            width : 100,
            sortable : false,
            summaryType: 'sum',
            summaryRenderer: function(value){
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('org_csymbol'))
                } else {
                   if(value>0)
                        return value
                   else
                        return '';
                }
            },
            renderer: function (value){
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('org_csymbol'))
                } else {
                   return ''
                }
            }
    	},{
            xtype : 'numbercolumn',
            header : 'Impuesto',
            dataIndex : '_VAT',   
            summaryType: 'sum',
            summaryRenderer: function (value){
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('org_csymbol'))
                } else {
                    if(value>0)
                        return value;
                    else
                        return '';
                }
            },
            renderer: function (value){
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('org_csymbol'))
                } else {
                   return value
                }
            },
            width : 100,
            sortable : true
        },{
            xtype : 'numbercolumn',
            header : 'Total',
            dataIndex : '_total',    
            renderer: function (value){
               if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('org_csymbol'))
                } else {
                   return value
                }
            },
            width : 100,
            sortable : false,
            summaryType: 'sum',
            summaryRenderer: function(value){
               /* var view = this.view.panel;
                var record = view.record;
                if(record.get('Id') != 0) {
                    var current = record.get('TotalPrice');
                    var vat = this.summaryData[this.grid.down('[dataIndex = _VAT]').id];
                    if (value != current){
                        record.set('TotalPrice', value);
                        record.set('VAT', vat);
                        if (record.get('ForecastDate') == null){
                            record.set('ForecastDate',new Date(-62135586000000));
                        };
                        record.save();
                    }
                }*/
                if(this.recordOrganizacion) {
                    return Ext.util.Format.currency(value,this.recordOrganizacion.get('org_csymbol'))
                } else {
                    if(value>0)
                        return value
                    else
                        return '';
                }
            }
        },{
            xtype : 'gridcolumn',
            header : 'Estado',
            dataIndex : 'Status',
            width : 200,
            hidden: true,
            sortable : true,
            editor: {
                xtype: 'combo',
                allowBlank: false,
                store: 'Common.store.OrderItemStatusStore',
                queryMode: 'local',
                displayField: 'Name',
                valueField: 'Value'
            },
            renderer: function(value) {
                var s = Ext.data.StoreManager.lookup('Common.store.OrderItemStatusStore');
                var r = s.findRecord('Value', value);
                if (r){
                   var n = r.get('Name');
                    return n; 
                } else {
                    return value;
                }
                
            }
		}
    
    ],
        
        
    initComponent: function () {
        this.callParent(arguments);  

        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-add',
                    text: 'Nuevo item',
                    scope: this,
                    action: 'add'
                }
                
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
    } 
});
