Ext.define('WeSafe.view.SpinBoxFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.spinboxformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100
    },
    items : [
         {                                            
            xtype: 'combo',
            queryMode: 'local',
            name : 'ToId',
            itemId: 'to',
            fieldLabel: 'Enviar a',       
            anchor:'100%',
            valueField: 'udw_idKey',
            displayField: 'udw_usuario'                            
        },{
            xtype : 'displayfield',
    		name : 'ToId',
            fieldLabel: 'Enviar a',        
            anchor:'100%',
            itemId:'toFijo',
            hidden:true
		},{
            xtype : 'textfield',
        	name : 'ToId',
            fieldLabel: 'Enviar a',        
            anchor:'100%',
            itemId:'toFijoId',
            hidden:true
		},{
            xtype : 'textfield',
			name : 'Name',
            fieldLabel: 'Subject',        
            anchor:'100%'
		},{
            xtype : 'displayfield',			
            fieldLabel: 'Body',           
            anchor:'100%'
		},{
        	xtype : 'htmleditor',
			name : 'Body',
            fieldLabel: '',           
            anchor:'100%',
            height:250
		}
    ],

	initComponent : function() {
		this.callParent();
        var me = this;
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Enviar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
         
         
         
     
         
         
	},
    
    
   
});