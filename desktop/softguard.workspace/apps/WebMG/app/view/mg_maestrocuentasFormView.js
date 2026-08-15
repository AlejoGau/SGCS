Ext.define('WebMG.view.mg_maestrocuentasFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.mg_maestrocuentasformview'],
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
        	xtype : 'displayfield',
			name : 'mgmc_ccodigo',
            fieldLabel: 'Código',
            itemId: 'mgmc_ccodigo',
			allowBlank : false
		},{
            xtype : 'textfield',
        	name : 'mgmc_descripcion',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype:'combo',
            fieldLabel: 'Tipo',
            name: 'mgmc_ctipo',
            store: 'mgmc_ctipoStore',
            valueField: 'Value',
            displayField: 'Name',
            queryMode: 'local'
		},{
            xtype : 'displayfield',
    		name : 'mgmc_saldo',
            fieldLabel: 'Saldo',
            renderer: function (value){
                if(this.up('mg_maestrocuentasformview').moneySymbol) {
                        return Ext.util.Format.currency(value,this.up('mg_maestrocuentasformview').moneySymbol)
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
                    iconCls: 'icon-disk',
        			text : 'Guardar',
                    itemId: 'btnGuardar'
    			}
                
            ]// cierro items
         }); 
        
        this.addDocked(toolbar);
        
        
        if(this.recordOrganizacion) {
            this.moneySymbol = this.recordOrganizacion.get('mon_csymbol')+' '
        } 
        
        if (!this.moneySymbol){
            // BC 380460088 : JUAN, obtengo del parametro si no viene por VIEW el currency
            this.moneySymbol = getParametro('SYSTEMCURRENCY',false,true).codigo+' '
        }
	} // cierro init
});