//MIGRADO2024
Ext.define('Common.model.m_template_contratoModel', {
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
    defaultValue: 624
       },
       {
       name: 'ObjectTypeName',
       type: 'string',
        defaultValue: 'Order'
       },
        {name:'tmp_asunto',type:'string'},
        {name:'tmp_cuerpo',type:'string'},
        {name:'tmp_metadata',type:'string'},
        {name:'tmp_iorganizacion',type:'int'},
        {name:'tmp_itipo',type:'int'}
   ],
   proxy: {
    type : 'rest',
    url : '/Rest/m_template_contrato/',
    appendId : true
    }
});