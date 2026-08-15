//MIGRADO2024
Ext.define('Common.model.p_encuestasSearchModel', {
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
	    {name:'enc_name',type:'string'},
        {name:'enc_descripcion',type:'string'},
        {name:'enc_status',type:'int'},
        {name:'_enc_status',type:'string', convert: function (value, record){
            return record.get('enc_status') == 1? getLocale('Habilitado'): getLocale('Deshabilitado')
        }},
        {name:'enc_idkey',type:'int'}
        ],
    idProperty: 'Id',
    proxy: {
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url: '/rest/search/p_encuestas',
        appendId: true
    }
});