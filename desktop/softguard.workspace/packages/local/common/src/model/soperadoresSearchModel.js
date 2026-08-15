//MIGRADO2024
Ext.define('Common.model.soperadoresSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'ope_iid',
    fields: [{
        name: 'ope_iid',
        type: 'int'
        },
        {
            name: 'Name',
            type: 'string',
            mapping: 'ope_clogin'
        },
        {name: 'comboText', convert: function(v,record){
            return record.get('ope_clogin') + ' ('+record.get('ope_cnombre')+')';
        }},
		{name:'ope_clogin'},
        {name:'ope_cnombre'},
        {name:'ope_cclave'},
        {name:'ope_nsupervisor'},
        {name:'ope_nsql'},
        {name:'ope_iperfil'},
        {name:'ope_clinea'},
        {name:'ope_nprioridad'},
        {name:'ope_dCambio'},
        {name:'ope_nSereno'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/rest/search/s_operadores',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		appendId : true
	}
});