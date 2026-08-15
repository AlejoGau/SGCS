//MIGRADO2024
Ext.define('Common.model.BitacoraSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'string'
        },
        {
        name: 'Name',
        type: 'string'
        },
		{name:'rec_iidrecepcion',type:'string'},
        {name:'rec_itipo',type:'string'},
        {name:'rec_mnota',type:'string'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/p_recepcion_notas',
		appendId : true
	}
});