Ext.define('AdministratorSearch.model.ServTecFormaViajeVisitasModel', {
   extend: 'Ext.data.Model',
   idProperty: 'Id',
   fields: [{
       name: 'Id',
       type: 'int'
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
defaultValue: 'SerTecFormaViajeVisitas'
       },
        {name:'sfv_cNombre',type:'string'}
       ],

   
    proxy: {
        type : 'rest',
		url : '/Rest/SerTecFormaViajeVisitas/',
		appendId : true
		}
});