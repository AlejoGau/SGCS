//MIGRADO2024
Ext.define('Common.model.HorarioAlternativoModel', {
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
    	{name:'alt_iidcuenta'},
        {
            name:'alt_ndiaapertura',
            type:'int'
        },
        {name:'alt_choraapertura'},
        {
            name:'alt_ndiacierre',
            type:'int'
        },
        {name:'alt_choracierre'}
    ],
    proxy: {  
        type : 'horarioalternativoproxy',
        url : '/Rest/HorarioAlternativo',
        appendId: true,
	}// cierro el proxy
});