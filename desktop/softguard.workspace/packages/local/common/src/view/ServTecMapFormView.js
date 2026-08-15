//MIGRADO2024
Ext.define('Common.view.ServTecMapFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sertecmapformview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 150,
        anchor : '100%'
	},
    layout:'fit',
	items : [
        
        
        ],
	buttons : [],
	initComponent : function() {
        //this.addEvents('objectchanged');
		this.callParent(arguments);
	} // cierro init
});