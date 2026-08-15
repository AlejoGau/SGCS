Ext.define('AdministratorSearch.view.TablasOperadoresFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasoperadoresformview'],
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
			xtype : 'textfield',
			name : 'ope_clogin',
            fieldLabel: 'Login',
			allowBlank : false,            
            anchor:'100%'
		}/*,{
    		xtype : 'textfield',
			name : 'ope_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,            
            anchor:'100%',
            hidden:true
		}*,{
        	xtype : 'textfield',
			name : 'ope_cclave',
            fieldLabel: 'Clave',
			allowBlank : false,            
            anchor:'100%'
		}/*,{
            xtype : 'combo',
            fieldLabel : 'Supervisor',
            name : 'ope_nsupervisor',
            store: [
                [1,getLocale('Si')],
                [2,getLocale('No')],
            ],
        	allowBlank : false,
            hidden:true
		},{
            xtype : 'combo',
            fieldLabel : 'Sereno',
            name : 'ope_nSereno',
            store: [
                [1,getLocale('Si')],
                [2,getLocale('No')],
            ],
            allowBlank : false,
            hidden:true
		},{
            xtype : 'numberfield',
			name : 'ope_nprioridad',
            fieldLabel: 'Prioridad',
            hidden:true
		}*/
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