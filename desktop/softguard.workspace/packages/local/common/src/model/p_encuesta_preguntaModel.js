//MIGRADO2024
Ext.define('Common.model.p_encuesta_preguntaModel', {
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
        defaultValue: 3203
       },
       {
       name: 'ObjectTypeName',
       type: 'string',
        defaultValue: 'p_encuesta_pregunta'
       },
        {name:'epg_encidkey',type:'int'},
        {name:'epg_name',type:'string'},
        {name:'epg_descripcion',type:'string'},
        
        {name:'epg_tipo',type:'int'},
        {name:'_epg_tipo',type:'string', convert: function (value, record){
                    return record.get('epg_tipo') == 1? getLocale('Multiples opciones'): getLocale('Campo de texto')
                }},
        {name:'epg_status',type:'int'},
        {name:'_epg_status',type:'string', convert: function (value, record){
            return record.get('epg_status') == 1? getLocale('Habilitado'): getLocale('Deshabilitado')
        }}
       ],
   proxy: {
    type : 'rest',
    url : '/Rest/p_encuesta_pregunta/',
    writer: {writeAllFields:true},
    appendId : true
}
});