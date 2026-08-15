Ext.define('SmartTrack.view.VCSeguimientoInfoObjetivoView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.vcseguimientoinfoobjectivoview',
    title:'Datos del objetivo',
    fieldDefaults : {
    	labelAlign : 'left',
		labelWidth : 120,
		anchor : '100%'
	},    
	items : [
        {
            xtype:'displayfield',
            fieldLabel:'Cuenta',
            itemId:'cuenta'
        },{
            xtype:'displayfield',
            fieldLabel:'Direccion',
            itemId:'direccion'
        },{
            xtype:'displayfield',
            fieldLabel:'Fecha',
            itemId:'fecha'
        },{
            xtype:'displayfield',
            fieldLabel:'',
            itemId:'ultimaposicion'
        }
        
        
        
    ],
	initComponent : function() {
		this.callParent(arguments);
       
        
	} // cierro init

});
