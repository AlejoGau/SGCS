Ext.define('AdministratorSearch.view.mg_listas_preciosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.mg_listas_preciosformview'],
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
    			name : 'mglp_nombre',
                fieldLabel: 'Nombre',
    			allowBlank : false
    		},{
                xtype: 'combo',
                name: 'mglp_tipo',
                itemId:'mglp_tipo',
                queryMode: 'local',
                lastQuery: '',
                fieldLabel: 'Tipo',
                store:[
                        [1,getLocale('Fijo')],
                        [0,getLocale('Dinamico')]
                    ]
            },{
        		xtype : 'textfield',
    			name : 'mglp_multiplicador',
        		itemId : 'mglp_multiplicador',
                fieldLabel: 'Multiplicador',
    			allowBlank : false
    		},{
                xtype:'selecterfield',
                itemId:'moneda',
                simpleSelect: true,
                config: {
                    disponible: {
                        title:'Moneda',
                        field:'_nombre',
                        searchField: 'mon_cnombre'
                    },
                    selecionado: {
                        title:'Moneda',
                        field:'_nombre'
                    },
                    valueField:'mon_ccodigo',
                    modelItems: 'AdministratorSearch.model.t_monedasSearchModel'
                        
                },
                title:'Moneda'
            
            },{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                itemId:'organizacion',
                items:[
                    {
                        xtype : 'displayfield',    
                        fieldLabel : 'Cliente',
                        name : '_organization',
                        width: 350
                    },
                    {
                        xtype: 'button',
                        action: 'organizationChange',
                        text: 'Seleccionar cliente'
                    }
                ]
            },
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