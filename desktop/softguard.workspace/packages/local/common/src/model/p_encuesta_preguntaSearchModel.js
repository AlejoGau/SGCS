//MIGRADO2024
Ext.define('Common.model.p_encuesta_preguntaSearchModel', {
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
            defaultValue: 'Event'
        },
	    {name:'epg_encidkey',type:'int'},
        {name:'epg_name',type:'string'},
        {name:'epg_descripcion',type:'string'},
        
        {name:'epg_tipo',type:'int'},
        {name:'_epg_tipo',type:'string', convert: function (value, record){
            return record.get('epg_tipo') == 1? getLocale('Multiples opciones'): getLocale('Unica opcion')
        }},
        {name:'epg_status',type:'int'},
        {name:'_epg_status',type:'string', convert: function (value, record){
            return record.get('epg_status') == 1? getLocale('Habilitado'): getLocale('Deshabilitado')
        }}
    ],
    idProperty: 'Id',
    proxy: {
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url: '/rest/search/p_encuesta_pregunta',
        appendId: true
    }
});