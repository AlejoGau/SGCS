//MIGRADO2024
Ext.define('Common.model.DesktopModulesAvailableByUserModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{name: 'Id', mapping: 'dwm_idKey'},
        {name: 'Name', type:'string'},
        {name:'udm_idKey',type:'int'},
        {name:'udm_disponible',type:'bool'},
        {name:'udm_modulo',type:'string'},
        {name:'udm_key_reference',type:'string'},
        {name:'QuantityOfUsers',type:'int'},
        {name:'_localeModule', type: 'string', convert:function(v, record){
            return getLocale(record.get('udm_modulo'))
        }}
    ],
    proxy : {
        
        type : 'desktopmodulesavailablebyuserproxy',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
    	appendId : false,
        
	}
});