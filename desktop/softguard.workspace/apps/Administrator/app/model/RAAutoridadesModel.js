Ext.define('Administrator.model.RAAutoridadesModel', {
    extend : 'Ext.data.Model',
    idProperty : 'aut_ccodigo',
    fields: [{
            name: 'aut_ccodigo',
            type: 'string'
        },
        {
            name: 'aut_cnombre',
            type: 'string'
        },
        {
            name: 'aut_cusuario',
            type: 'string'
        },
        {
            name: 'aut_cclave',
            type: 'string'
        },
        {
            name: 'aut_meventos',
            type: 'string'
        },
        {
            name: 'aut_natiende',
            type: 'int'
        },
        {
            name: 'aut_cdealer',
            type: 'string'
        },
        {
            name: 'aut_nrefreshDealer',
            type: 'int'
        }
        ],
    proxy : {
        type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/Search/RAAutoridades',
		appendId : true
	}
});