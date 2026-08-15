//MIGRADO2024
Ext.define('Common.view.TablasInstaladoresFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasinstaladoresformview'],
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
			name : 'ins_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 40,
		},{
    		xtype : 'textfield',
			name : 'ins_cempresa',
            fieldLabel: 'Empresa',
            maxLength: 40,
		},{
        	xtype : 'textfield',
			name : 'ins_ccalle',
            fieldLabel: 'Calle',
            maxLength: 40,
		},{
        	xtype : 'numberfield',
			name : 'ins_inumero',
            fieldLabel: 'Numero',
            hidden: false
		},/*{
        	xtype : 'textfield',
			name : 'ins_npiso',
            fieldLabel: 'Piso'
		},{
        	xtype : 'textfield',
			name : 'ins_cdepartamento',
            fieldLabel: 'Departamento',
            maxLength: 3,
		},*/{
        	xtype : 'textfield',
			name : 'ins_ctelefono',
            fieldLabel: 'Teléfono',
            maxLength: 40,
		},{
        	xtype : 'textfield',
			name : 'ins_cmail',
            fieldLabel: 'Email',
            vtype: 'email',
            maxLength: 40,
		},{
            xtype : 'combo',
        	fieldLabel : 'Dealer',
            itemId: 'delaer',
			name : 'ins_cDealer',
			store : Ext.create('Ext.data.Store', {
                fields: ['lin_crazonsocial', 'lin_ccodigo'],
                data: []
            }),
			displayField : 'lin_crazonsocial',
			valueField : 'lin_ccodigo',
            anchor : '100%',
            queryMode: 'local',
    		allowBlank : false
		},{                                            
            xtype: 'combo',
            queryMode: 'local',
            name : 'ins_iTipo',
            itemId: 'tipo',
            fieldLabel: 'Tipo',       
            anchor:'100%',
            valueField: 'Value',
            displayField: 'Name',
            store: Ext.create('Ext.data.Store', {
                fields: ['Value', 'Name'],
                data: [
                    {Value: 0, Name: 'Instalador'},
                    {Value: 1, Name: 'Tecnico'},
                    {Value: 2, Name: 'Tecnico/Instalador'},
                    {Value: 3, Name: 'Deshabilitado'}
                ]
            }),
        	allowBlank : false
        },{
            xtype:'t_instaladoresdealergridview',
            height:200,
            disabled:true
        }
    ],
	initComponent : function() {
		this.callParent();
        this.down('t_instaladoresdealergridview').record = this.record
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