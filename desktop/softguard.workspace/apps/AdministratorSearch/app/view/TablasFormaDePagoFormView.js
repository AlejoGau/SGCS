Ext.define('AdministratorSearch.view.TablasFormaDePagoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasformadepagoformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
        
       /* {
			xtype : 'textfield',
			name : 'fpg_ccodigo',
            fieldLabel: 'Codigo'
		},*/{
    		xtype : 'textfield',
			name : 'fpg_cdescripcion',
            fieldLabel: 'Descripcion'
		},/*{
    		xtype : 'textfield',
			name : 'fpg_cdescripcionreducida',
            fieldLabel: 'Descripcion reducida'
		},*//*{
            xtype : 'combo',
    		fieldLabel : 'PI de numero',
			store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
			valueField : 'Value',
			name : "fpg_npidenumero"
		},{
            xtype : 'combo',
        	fieldLabel : 'PI de vencimiento',
			store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
			valueField : 'Value',
			name : "fpg_npidevencimiento"
		},{
            xtype : 'combo',
        	fieldLabel : 'PI de banco',
			store : 'SiNoStore',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            editable: false,
			valueField : 'Value',
			name : "fpg_npidebanco"
		},*/
        {
            xtype: 'combo',  
            name:'fpg_orgidcodigoid',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Empresa Facturadora',
            lastQuery: '',
            itemId:'organizacionfacturadora',
            displayField: 'org_cnombre',
            valueField: 'Id',
            forceSelection: true,
        	allowBlank : false
        },{
            xtype: 'combo',  
            name:'fpg_mgmcidkey',
            editable: false,
            queryMode: 'local',
            fieldLabel: 'Plan de cuentas',
            lastQuery: '',
            itemId:'fpg_mgmcidkey',
            displayField: 'mgmc_descripcion',
            valueField: 'Id',
            forceSelection: true,
        	allowBlank : true
        },
        {
            xtype:'container',
            margin:'0 0 5 0',
            items:[
                    {
                        xtype : 'combo',
                        fieldLabel : 'Tipo',
                        displayField : 'tfp_cdescripcion',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                		valueField : 'tfp_ccodigo',
            			name : "fpg_ctipo",
                        itemId:'tipodepago'
            		},{
                	    xtype:'button',
                        text:'Nuevo tipo de pago',
                        itemId:'nuevotipodepago',
                        iconCls:'icon-money',
                        hidden:true
            		}
                
                ]
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