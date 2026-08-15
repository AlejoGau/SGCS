Ext.define('WebMG.view.ComprobanteItemManualFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.comprobanteitemmanualformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 80,
		anchor : '100%'
	},
	items : [
        {
            xtype : 'textfield',
            name : 'cbi_cdescripcion',
            itemId : 'cbi_cdescripcion',
            fieldLabel: 'Descripción',
            allowBlank : false
        },{
            xtype : 'numberfield',
            name : 'cbi_yimporte',
            itemId : 'cbi_yimporte',
            allowDecimals: true,
            decimalPrecision: 2,
            decimalSeparator:',',
            fieldLabel: 'Valor',
            renderer: function (value, obk,record){
                var view = this.up('comprobanteitemmanualformview');
                if(view.mon_csymbol) {
                    return Ext.util.Format.currency(value,view.mon_csymbol)
                } else {
                    return value
                }
            },
            allowBlank : false
        },
        {
        	xtype : 'numberfield',
			name : 'Quantity',
            fieldLabel: 'Cantidad',
            itemId: 'Quantity',
            minVAlue: 1,
            value: 1,
			allowBlank : false
		},{
            xtype : 'combo',
            fieldLabel : 'Impuesto',
            forceSlection: true,
            editable: false,
            allowBlank: false,            
            valueField : 'Id',
            queryMode: 'local',
            lastQuery: '',
            displayField : 'imp_cdescripcion',
			allowBlank : false,
            itemId: 'impuesto'
		},{
            xtype : 'displayfield',
        	name : '_subTotal',
            itemId : '_subTotal',
            fieldLabel: 'SubTotal',
            renderer: function (value,obj,record){
                var view = this.up('comprobanteitemmanualformview');
                if(view.mon_csymbol) {
                    return Ext.util.Format.currency(value,view.mon_csymbol)
                } else {
                    return value
                }
            },
			allowBlank : false
		},{
            xtype : 'displayfield',
    		name : '_VAT',
        	itemId : '_VAT',
            fieldLabel: 'Impuesto',
            renderer: function (value,obj,record){
                var view = this.up('comprobanteitemmanualformview');
                if(view.mon_csymbol) {
                    return Ext.util.Format.currency(value,view.mon_csymbol)
                } else {
                    return value
                }
            },
			allowBlank : false
		},{
            xtype : 'displayfield',
			name : 'Total',
    		itemId : 'Total',
            fieldLabel: 'Total',
            renderer: function (value,obj,record){
                var view = this.up('comprobanteitemmanualformview');
                if(view.mon_csymbol) {
                    return Ext.util.Format.currency(value,view.mon_csymbol)
                } else {
                    return value
                }
            },
			allowBlank : false
		}
    ],

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
        if (this.recordOrganizacion){
            this.mon_csymbol = this.recordOrganizacion.get('mon_csymbol')+' ';
        }
        
	} // cierro init
});