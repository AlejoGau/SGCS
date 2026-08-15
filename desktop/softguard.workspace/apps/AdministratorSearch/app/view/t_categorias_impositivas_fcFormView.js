Ext.define('AdministratorSearch.view.t_categorias_impositivas_fcFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_categorias_impositivas_fcformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true,
        anchor: '100%'
    },
    items : [
        /*{
            xtype : 'textfield',
        	name : 'cat_ccodigo',
            fieldLabel: 'Codigo'
		},*/{
            xtype : 'textfield',
			name : 'cat_cdescripcion',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype : 'combo',
            itemId: 'cat_nTipoResp',
            fieldLabel : 'Responsable',
            store: 'categoriaImpositivaStore',
    		name : 'cat_nTipoResp',
            displayField: 'Name',
            valueField: 'Value',
            queryMode: 'local'
		},{
            xtype : 'combo',
            itemId: 'comboorganizacionfacturadora',
            fieldLabel : 'Organización facturadora',
			name : 'cat_orgicodigoid',
            displayField: 'org_cnombre',
            valueField: 'Id',
            queryMode: 'local',
            allowBlank:false
		},{
            xtype: 'combo',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Comprobante factura',
            lastQuery: '',
            name:'cat_cbtidkey',
            itemId:'cat_cbtidkey',
            displayField : 'cbt_cdescripcion',
    		valueField : 'Id',
            allowBlank:false
        },{
            xtype : 'combo',
            itemId: 'cat_cimpuesto1',
            fieldLabel : 'Impuesto',
			name : 'cat_cimpuesto1',
            displayField: '_imp_cdescripcion',
            valueField: 'imp_ccodigo',
            queryMode: 'local'
		},{
            xtype : 'combo',
            itemId: 'cat_cimpuesto2',
            fieldLabel : 'Impuesto 2',
    		name : 'cat_cimpuesto2',
            displayField: '_imp_cdescripcion',
            valueField: 'imp_ccodigo',
            queryMode: 'local',
            hidden:true
		},{
            xtype : 'combo',
            itemId: 'cat_cimpuesto3',
            fieldLabel : 'Impuesto 3',
    		name : 'cat_cimpuesto3',
            displayField: '_imp_cdescripcion',
            valueField: 'imp_ccodigo',
            queryMode: 'local',
            hidden:true
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
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});