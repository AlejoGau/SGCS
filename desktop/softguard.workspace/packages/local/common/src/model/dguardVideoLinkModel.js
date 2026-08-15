//MIGRADO2024
Ext.define('Common.model.dguardVideoLinkModel', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'_uri',type:'string'},
        {name:'_port',type:'string'},
        {name:'_user',type:'string'},
        {name:'_password',type:'string'},
        {name:'_camara',type:'string'}
    ]
});