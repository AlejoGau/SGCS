//MIGRADO2024
Ext.define('Common.model.HorarioModel', {
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
			name:'hor_iidcuenta', 
			type:'int'
		},
		{	
			name: 'hor_ndiaapertura',
			type: 'int',
            defaultValue: 1
		}, 
		'hor_choraapertura', 
		{
			name: 'hor_ndiacierre', 
			type: 'int',
            defaultValue: 1
		},
		'hor_choracierre'
        ],
    proxy: {
        type: 'horarioproxy',
        url : '/Rest/Horario/',
        appendId: true,
	}// cierro el proxy
});