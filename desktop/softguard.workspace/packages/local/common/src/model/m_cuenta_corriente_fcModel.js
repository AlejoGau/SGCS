Ext.define('Common.model.m_cuenta_corriente_fcModel', {
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
        defaultValue: 'm_cuenta_corriente_fc'
       },
        {name:'cta_iCodigoCbte',type:'string'},
        {name:'cta_nCuota',type:'int'},
        {name:'cta_yTotal',type:'string'},
        {name:'cta_ySaldo',type:'string'},
        {name:'cta_dVencimiento',type:'date', dateFormat:'MS'},
        {name:'cta_dCobro',type:'date', dateFormat:'MS'}
   ],

   proxy: {
    type : 'rest',
    url : '/Rest/m_cuenta_corriente_fc/',
    appendId : true
    }
});