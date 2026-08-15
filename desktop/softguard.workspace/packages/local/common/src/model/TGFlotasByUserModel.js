//MIGRADO2024
Ext.define('Common.model.TGFlotasByUserModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'dwm_dealer',type:'string'},
        {name:'dwm_cuenta_desde',type:'string'},
        {name:'dwm_cuenta_hasta',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/rest/search/TGFlotasByUser',
		appendId : true
	}
});