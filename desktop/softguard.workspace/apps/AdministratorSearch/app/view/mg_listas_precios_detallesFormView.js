Ext.define('AdministratorSearch.view.mg_listas_precios_detallesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.mg_listas_precios_detallesformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
	items : [
        

        {
            xtype:'fieldset',
            title:'Producto',
            items:[
                {
                    xtype : 'displayfield',
                    itemId: 'nombreproducto'
        		},{
                    xtype:'button',
                    text:'Seleccionar producto',
                    itemId:'seleccionproducto'
                }]
        },
        {
    		xtype : 'textfield',
			name : 'mglpd_valor',
            fieldLabel: 'Precio',
			allowBlank : false,
            maskRe:/[0-9,\.]/,
            //currencySymbol: Ext.util.Format.currencySign,
            //useThousandSeparator: true,
            //thousandSeparator: Ext.util.Format.thousandSeparator,
            alwaysDisplayDecimals: true
		}

    ],

	initComponent : function() {
		this.callParent();
        
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