//MIGRADO2024
Ext.define('Common.model.p_grabacion_audioModel', {
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
        defaultValue: 3100
    },
    {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'p_grabacion_audio'
    },
    {name:'gra_carchivo',type:'string'},
    {name:'gra_cterminal',type:'string'},
    {name:'gra_dfechahora',type:'date', dateFormat: 'MS', defaultValue: new Date( -62135586000000 )},
    {name:'gra_iidcuenta',type:'int'},
    {name:'gra_iidrecepcion',type:'int'},
    {name:'gra_ioperador',type:'int'},
    {name:'gra_nduracion',type:'string'},
    {name:'gra_ctelefono',type:'string'}
   ],
   proxy: {
    type : 'rest',
    url : '/Rest/p_grabacion_audio/',
    appendId : true,
    writer: { writeAllFields:true },

    }
});