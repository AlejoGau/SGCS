Ext.define('AdministratorSearch.view.FormatosView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.formatosview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 80,
		anchor : '100%'
	},
	items : [
         {
    		xtype : 'displayfield',
            fieldLabel : 'Descripcion',
            name : 'for_cdescripcion'    
		},{
        	xtype : 'displayfield',
            fieldLabel : 'Formato',
            name : 'for_cformato'    
		},{
    		xtype : 'displayfield',
            fieldLabel : ' Nombre',
            name : 'for_cnombre'    
		},{
            xtype : 'displayfield',
            fieldLabel : ' Alarma',
            itemId: 'alarma'
    	},{
            xtype : 'formatoreceptoresgridview',            
			allowBlank : false
		}
        
    ],

	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                
            ]// cierro items
         }); 
         this.addDocked(toolbar);
        
        this.down('formatoreceptoresgridview').record = this.record;
       
         
         
         
         
	} // cierro init
});