//MIGRADO2024
Ext.define('Common.model.SecurityModulesModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{name: 'Id', type: 'int', mapping: 'ModuleId'},
        {name: 'Available', type: 'bool'},
        {name:'KeyReference',type:'string'},
        {name:'MetaData',type:'string'},
        {name:'ModuleId',type:'int'},
        {name:'ModuleName',type:'string'},
        {name:'profile',type:'int'},
        {name:'Security',type:'string'},
        {name:'UserId',type:'int'},
        {name:'_Security',convert: function(value,record){
            if (record.get('Security'))
            return Ext.JSON.decode(record.get('Security'));
            else
            return null
        }},
    ],
    proxy : {
        
        type : 'rest',
        url: '/Rest/Security/Modules',
    	appendId : false
	}
});