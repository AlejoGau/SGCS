Ext.define('Common.view.EventDescriptionFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.eventdescriptionformview',
    bodyPadding : 0,    
    layout: 'fit',
    items : [
        {
    	    xtype: 'htmleditor',
            name: 'LargeComment',
            labelWidth: 0,
            fieldLabel: '',
            listeners: {
                sync: function(editor, html){
                    var view = editor.up('eventdescriptionformview');
                    var record = view.record;
                    record.set('LargeComment', html);
                }
            }
		}
    ],
	initComponent : function() {
		this.callParent();      
        // agrego la toolbar
        this.loadRecord(this.record);
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init

});