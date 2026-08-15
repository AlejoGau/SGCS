//MIGRADO2024
Ext.define('Common.view.EncuestaPreguntaOpcionesFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.encuestaspreguntaopcionesformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true,
        anchor : '100%',
    },
    items : [
        {
                
            xtype : 'combo',
            fieldLabel : 'Estado',            
            name : 'epo_status',
			store : [
                [0, getLocale('Deshabilitado')],
                [1, getLocale('Habilitado')]
                ],			
        	
            anchor : '100%',
            queryMode: 'local'
		},{
                
            xtype : 'combo',
            fieldLabel : 'Tipo',            
            name : 'epo_tipo',
    		store : [
                [0, getLocale('Seleccion')],
                [1, getLocale('Texto libre')]
                ],			
        	
            anchor : '100%',
            queryMode: 'local'
		},{
            fieldLabel: 'Nombre',
            name: 'epo_name',
            xtype: 'textfield'
        },{
            fieldLabel: 'Descripcion',
            name: 'epo_descripcion',
            xtype: 'textarea'
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