//MIGRADO2024
Ext.define('Common.view.SmartMailTemplateEditorView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.smartmailtemplateeditorview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
		labelWidth : 80,
		anchor : '100%'
	},
    layout: 'fit',
	items : [
       {
			xtype: 'htmleditor',
            enableColors: false,
            enableAlignments: false,
            fieldLabel: '',
            name: 'HtmlBody',
            flex: 1
		}
    ],
	initComponent : function() {
        //this.addEvents('objectchanged');
		this.callParent();
        
        if (!this.hideToolbar){
            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                items: [
                    {
                        iconCls: 'save',
                        text: 'Guardar',
                        scope: this,
                        action: 'smartmaileditorsave'
                    }
                ]// cierro items
             }); 
             this.addDocked(toolbar);
        }
        
	} // cierro init
});