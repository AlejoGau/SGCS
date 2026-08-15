Ext.define('Common.view.ComprobanteItemFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.comprobanteitemformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 80,
		anchor : '100%'
	},
	items : [{
        xtype: 'fieldset',
        title: 'Producto',
        layout: 'anchor',
        frame: true,
        items:[
            {
    			xtype : 'displayfield',
    			name : 'Id',
        		itemId : 'Id',
                fieldLabel: 'Código',
    			allowBlank : false
    		},{
    			xtype : 'displayfield',
    			name : 'Name',
        		itemId : 'Name',
                fieldLabel: 'Producto',
    			allowBlank : false
    		},{
        		xtype : 'displayfield',
    			name : 'VAT',
                itemId : 'VAT',
                fieldLabel: 'Impuesto',
    			allowBlank : false
    		},{
        		xtype : 'displayfield',
    			name : 'Price',
        		itemId : 'Price',
                fieldLabel: 'Valor',
                renderer: function (value, obk,record){
                   // console.log(this.up('comprobanteitemformview').)
                   if(this.up('comprobanteitemformview').recordSelected) {
                        return Ext.util.Format.currency(value,this.up('comprobanteitemformview').recordSelected.get('mon_csymbol'))
                    } else {
                        return ''
                    }
                },
    			allowBlank : false
    		},{
                xtype: 'button',
                itemId: 'changeProduct',
                text: 'Seleccione',
                margin: '0 0 5 0'
            }
        ]
        },
        {
        	xtype : 'numberfield',
			name : 'Quantity',
            fieldLabel: 'Cantidad',
            itemId: 'quantityCombo',
            minVAlue: 1,
            value: 1,
			allowBlank : false
		},{
            xtype : 'displayfield',
        	name : '_subTotal',
            itemId : '_subTotal',
            fieldLabel: 'SubTotal',
            renderer: function (value,obj,record){
              if(this.up('comprobanteitemformview').recordSelected) {
                    return Ext.util.Format.currency(value,this.up('comprobanteitemformview').recordSelected.get('mon_csymbol'))
                } else {
                    return ''
                }
            },
			allowBlank : false
		},{
            xtype : 'displayfield',
    		name : '_VAT',
        	itemId : '_VAT',
            fieldLabel: 'Impuesto',
            renderer: function (value,obj,record){
               if(this.up('comprobanteitemformview').recordSelected) {
                    return Ext.util.Format.currency(value,this.up('comprobanteitemformview').recordSelected.get('mon_csymbol'))
                } else {
                    return ''
                }
            },
			allowBlank : false
		},{
            xtype : 'displayfield',
			name : 'Total',
    		itemId : 'Total',
            fieldLabel: 'Total',
            renderer: function (value,obj,record){
                if(this.up('comprobanteitemformview').recordSelected) {
                    return Ext.util.Format.currency(value,this.up('comprobanteitemformview').recordSelected.get('mon_csymbol'))
                } else {
                    return ''
                }
            },
			allowBlank : false
		}],
	

	initComponent : function() {

		this.callParent();
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    action: 'save',
                    itemId:'save'
                }/*, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                },'-', {
    				xtype : 'button',
					text : 'Cancelar',
					action: 'map'

				}*/
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});