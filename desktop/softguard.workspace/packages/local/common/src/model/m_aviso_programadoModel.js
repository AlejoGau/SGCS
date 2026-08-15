//MIGRADO2024
Ext.define('Common.model.m_aviso_programadoModel', {
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
        defaultValue: 'm_aviso_programdo'
       },
        {name:'prg_from',type:'string'},
        {name:'prg_to',type:'string'},
        {name:'prg_estado',type:'int'},
        {name:'prg_gateway',type:'string'},
        {name:'prg_objecttypeid',type:'int'},
        {name:'prg_objectid',type:'int'},
        {name:'prg_prgdatetime',type:'date', dateFormat:'MS'},
        {name:'prg_enviodatetime',type:'date', dateFormat:'MS'},
        {name:'prg_mensaje',type:'string'}
   ],
   proxy: {
    type : 'rest',
    
    url : '/Rest/m_aviso_programado/',
    appendId : true
    }
});