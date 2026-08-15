Ext.define('WebMG.view.t_novedades_fcFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_novedades_fcformview'],
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
    			name : 'nov_idproducto',
        		itemId : 'Id',
                fieldLabel: 'Código',
    			allowBlank : false
    		},
            {
    			xtype : 'displayfield',
    			name : 'nov_cdescripcion',
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
        		xtype : 'hiddenfield',
    			name : 'nov_cimpuesto1',
                itemId : 'nov_cimpuesto1'
    		},{
        		xtype : 'displayfield',
    			name : 'Price',
        		itemId : 'Price',
                fieldLabel: 'Valor',
                renderer: function (value, obk,record){
                   // console.log(this.up('comprobanteitemformview').)
                   if(this.up('t_novedades_fcformview').recordSelected) {
                        return Ext.util.Format.currency(value,this.up('t_novedades_fcformview').recordSelected.get('mon_csymbol')+' ')
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
			allowBlank : false
		},{
            xtype : 'displayfield',
        	name : 'nov_mimporte',
            itemId : '_subTotal',
            fieldLabel: 'SubTotal',
            renderer: function (value,obj,record){
              if(this.up('t_novedades_fcformview').recordSelected) {
                    return Ext.util.Format.currency(value,this.up('t_novedades_fcformview').recordSelected.get('mon_csymbol')+' ')
                } else {
                    return 'value'
                }
            },
			allowBlank : false
		},{
            xtype : 'displayfield',
    		name : '_VAT',
        	itemId : '_VAT',
            fieldLabel: 'Impuesto',
            renderer: function (value,obj,record){
               if(this.up('t_novedades_fcformview').recordSelected) {
                    return Ext.util.Format.currency(value,this.up('t_novedades_fcformview').recordSelected.get('mon_csymbol')+' ')
                } else {
                    return ''
                }
            },
			allowBlank : false
		},{
            xtype : 'displayfield',
			name : '_total',
    		itemId : 'Total',
            fieldLabel: 'Total',
            renderer: function (value,obj,record){
                if(this.up('t_novedades_fcformview').recordSelected) {
                    return Ext.util.Format.currency(value,this.up('t_novedades_fcformview').recordSelected.get('mon_csymbol')+' ')
                } else {
                    return 'value'
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