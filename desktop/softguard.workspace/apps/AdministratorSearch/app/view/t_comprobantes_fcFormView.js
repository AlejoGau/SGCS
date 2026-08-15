Ext.define('AdministratorSearch.view.t_comprobantes_fcFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_comprobantes_fcformview'],
    frame: false,
    
    layout: {
        type: 'vbox',
        align : 'stretch'
    },
    items : [
        {
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            name:'cbt_cdescripcion',
            allowBlank:false
        }/*,{
            xtype: 'textfield',
            fieldLabel: 'Nombre reducido',
            name:'cbt_cdescripcionreducida',
            maxLength:3,
            enforceMaxLength:3,
            allowBlank:false,
            hidden:true
        }*/,{
            xtype: 'textfield',
            fieldLabel: 'Letra',
            name:'cbt_cletra',
            maxLength:1,
            enforceMaxLength:1,
            fieldStyle: 'text-transform:uppercase',
            allowBlank:false
        },{
            xtype: 'textfield',
            fieldLabel: 'Prefijo',
            name:'cbt_cprefijo'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Cantidad de copias',
            name:'cbt_ncopias',
            hidden:true
        },{
            xtype : 'combo',
            itemId: 'comboorganizacionfacturadora',
            fieldLabel : 'Organizacion facturadora',
			name : 'cbt_idOrganizacionFacturadora',
            displayField: 'org_cnombre',
            valueField: 'Id',
            queryMode: 'local',
            allowBlank:false
		},{
            xtype : 'combo',
            itemId: 'combotipocomprobante',
            fieldLabel : 'Tipo comprobante',
			name : 'cbt_ntipo',            
            queryMode: 'local',
            store: 'TipoComprobanteStore',
            displayField: 'Name',
            valueField: 'Id'
            /*store:[
                [1,getLocale('Factura')],
                [2,getLocale('Nota Debito')],
                [3,getLocale('Ajuste Debito')],
                [4,getLocale('Orden Pedido')],
                [7,getLocale('Recibo')],
                [8,getLocale('Nota Credito')],
                [9,getLocale('Ajuste Credito')]
            ]*/
		},{
            xtype: 'numberfield',
            fieldLabel: 'Último número',
            name:'cbt_inumero',
            hidden:false
        }
    ],   

    initComponent : function() {
        
		this.callParent();
        var view = this;
       // this.down('videoxcuentagridview').record = this.record;

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