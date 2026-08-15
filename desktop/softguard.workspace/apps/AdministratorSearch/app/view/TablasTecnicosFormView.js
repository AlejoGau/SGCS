Ext.define('AdministratorSearch.view.TablasTecnicosFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablastecnicosformview'],
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
        {
			xtype : 'textfield',
			name : 'tec_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false
		},{
            xtype : 'textfield',
			name : 'tec_ctelefono',
            fieldLabel: 'Telefono',
            maxLength: 40,
    		allowBlank : false
		},{
            xtype : 'textfield',
			name : 'tec_cmail',
            fieldLabel: 'Email',
            maxLength: 40,
		},{
        	xtype : 'checkbox',
			name : 'tec_ningreso',
            itemId:'ingreso',
            fieldLabel: 'Ingresa Stock',
            inputValue: '1'
		},{
            xtype : 'checkbox',
			name : 'tec_negreso',
            itemId:'egreso',
            fieldLabel: 'Egresa Stock',
            inputValue: '1'
		},{
            xtype : 'textarea',
			name : 'tec_cobservaciones',
            fieldLabel: 'Observaciones'
		}/*,{
        	xtype : 'checkbox',
			name : 'tec_nestado',
            fieldLabel: 'Disponible',
            itemId:'disponible',
            inputValue: '1'
		}*/
        
        ,{                                            
            xtype: 'combo',
            queryMode: 'local',
            name : 'tec_nestado',
            itemId: 'estado',
            fieldLabel: 'Estado',       
            anchor:'100%',
            valueField: 'field1',
            displayField: 'field2',
            store: [
                [0, getLocale('Instalador')],
                [1, getLocale('Tecnico')],
                [2, getLocale('Ambos')],
                [3, getLocale('Deshabilitado')],
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
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});