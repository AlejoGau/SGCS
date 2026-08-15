Ext.define('DealerSearch.view.GrabarLlamadaEntranteView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.grabarllamadaentranteview'],
    preventHeader: true,
    frame : true,
    fieldDefaults : {
        labelAlign : 'left',
    	labelWidth : 80,
        anchor:'100%'
	},
	items : [
        {
            xtype:'displayfield',
            itemId:'cuenta',
            fieldLabel:'Cuenta'
        },
        {
            xtype:'button',
            iconCls:'icon-sound-add',
            text:'Comenzar a grabar',
            itemId:'grabar'
            
        }
    ],

	initComponent : function() {
		this.callParent(arguments);
	} // cierro init

});
