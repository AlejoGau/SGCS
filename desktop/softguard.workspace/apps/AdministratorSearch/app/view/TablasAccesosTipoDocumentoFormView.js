Ext.define('AdministratorSearch.view.TablasAccesosTipoDocumentoFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tablasaccesostipodocumentoformview'],
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
			name : 'atd_cDescripcion',
            fieldLabel: 'Nombre',
			allowBlank : false,
            maxLength: 60,
            anchor:'100%'
		},{
    		xtype : 'checkbox',
			name : 'atd_iPideVto',
            itemId : 'atd_iPideVto',
            fieldLabel: '¿Pide fecha de Vencimiento?',
            inputValue: 1,
            anchor:'100%'
		},{
        	xtype : 'checkbox',
			name : 'atd_iUploadFile',
            fieldLabel: '¿Sube archivo?',
            itemId : 'atd_iUploadFile',
            uncheckedValue: 0,
            inputValue: 1,
            anchor:'100%'
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