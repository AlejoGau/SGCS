Ext.define('AdministratorSearch.view.STMovilFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.stmovilformview'],
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
			name : 'tmp_cnombre',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 50,
            anchor:'100%'
		},{
    		xtype : 'checkbox',
			name : '_sertec',
            itemId: 'sertec',
            fieldLabel: 'Servicio técnico',
            hidden: true,
            value: true,
            anchor:'100%'
		},{
            xtype : 'numberfield',
			name : '_cnumero',
            itemId: 'cnumero',
            fieldLabel: 'Número',
            maxLength: 50,
            inputWidth:100
		},{
        	xtype : 'hiddenfield',
			name : 'tmp_cnumero',
            fieldLabel: 'Numero',
            maxLength: 50,
            inputWidth:100
		},{
    		xtype : 'textfield',
			name : 'tmp_clicencia',
            fieldLabel: 'Matrícula',
            maxLength: 50,
            anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'tmp_cmarca',
            fieldLabel: 'Marca',
            maxLength: 50,
            anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'tmp_cmodelo',
            fieldLabel: 'Modelo',
            maxLength: 50,
            anchor:'100%'
		},{
        	xtype : 'textfield',
			name : 'tmp_cpathfoto',
            fieldLabel: 'Foto',
            hidden: true,
            maxLength: 60,
		},{
            xtype: 'hiddenfield',
            name: 'tmp_cflota',
            value: 'ST'
		}/*,{
            xtype : 'combo',
            fieldLabel : 'Flota',
            itemId: 'comboflota',
    		name : 'tmp_cflota',
            emptyText: getLocale('Seleccione una flota'),
            forceSelection: true,
        	allowBlank : false,
            displayField : 'flo_cdescripcion',
    		valueField : 'flo_ccodigo',
            
            anchor:'100%',
            lastQuery: ''
		}*/,{
            xtype : 'combo',
            fieldLabel : 'Estado',
            itemId: 'estadoSertec',
			name : 'tmp_nestado',
            emptyText: getLocale('Seleccione un estado'),
            forceSelection: true,
            store: [
                [1,getLocale('Disponible listado')],
                [2,getLocale('Fuera de servicio')]
            ],
            anchor:'100%'
		},{
            xtype : 'displayfield',
            fieldLabel: 'Estado',
            itemId: 'estadodisplay',
            hidden: true,
		},{
            
            xtype : 'combo',
    		fieldLabel : 'Cuenta',
            itemId: 'cuenta',
			name : 'tmp_icuenta',
			displayField : 'cue_cnombre',
			valueField : 'Id',
            anchor:'100%',
            emptyText: getLocale('Seleccione una cuenta'),
            forceSelection: true,
    		allowBlank : false,
            lastQuery: ''
			
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