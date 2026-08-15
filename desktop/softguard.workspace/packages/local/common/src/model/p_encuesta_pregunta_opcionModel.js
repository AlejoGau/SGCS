//MIGRADO2024
Ext.define('Common.model.p_encuesta_pregunta_opcionModel', {
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
        defaultValue: 'p_encuesta_pregunta_opcion'
       },
         {name:'epo_epgidkey',type:'int'},
        {name:'epo_name',type:'string'},
        {name:'epo_descripcion',type:'string'},
        {name:'epo_status',type:'int'},
        {name:'_epo_status',type:'string', convert: function (value, record){
            return record.get('epo_status') == 1? getLocale('Habilitado'): getLocale('Deshabilitado')
        }},
        {name:'epo_tipo',type:'int'},
        {name:'_epo_tipo',type:'string', convert: function (value, record){
            return record.get('epo_tipo') == 1? getLocale('Texto libre'): getLocale('Seleccion')
        }},
        {name:'epo_values',type:'string'},
       ],
   proxy: {
    type : 'rest',
    url : '/Rest/p_encuesta_pregunta_opcion/',
    writer: {writeAllFields:true},
    appendId : true
}
});