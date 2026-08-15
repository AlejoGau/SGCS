//MIGRADO2024
Ext.define('Common.model.p_encuestasModel', {
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
        defaultValue: 410
       },
       {
       name: 'ObjectTypeName',
       type: 'string',
        defaultValue: 'p_encuestas'
       },
        {name:'enc_name',type:'string'},
        {name:'enc_descripcion',type:'string'},
        {name:'enc_status',type:'int'}
       ],
   proxy: {
    type : 'rest',
    url : '/Rest/p_encuesta/',
    writer: { writeAllFields:true },
    appendId : true
}
});