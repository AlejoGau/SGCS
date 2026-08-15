//MIGRADO2024
Ext.define('Common.model.TgeEquipoSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string',
            mapping: 'Equipo'
        },
        {
            name: 'Equipo',
            type: 'string'
        }
    ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/Search/TGEquipos',
		appendId : false
		}
});