Ext.define('AdministratorSearch.model.SessionSearchModel', {
   extend: 'Ext.data.Model',
   idProperty: 'Id',
   fields: [{
       name: 'Id',
       type: 'int',
       defaultValue: 0
       },
       {
       name: 'Name',
       type: 'string'
       },
       {
       name: 'ObjectTypeId',
       type: 'int',
defaultValue: 3102
       },
       {
       name: 'ObjectTypeName',
       type: 'string',
defaultValue: 'usertoken'
       },
        {name:'udw_nombre',type:'string'},
        {name:'udw_apellido',type:'string'},
        {name:'udw_usuarios',type:'string'},
        {name:'modulo',type:'string'},
        {name:'AccessToken',type:'string'},
        {name:'OrganizationName',type:'string'}


       ],
    proxy: {
        type : 'rest',
        url : '/Rest/search/UserWithTokenOrder',
        appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
    }
});