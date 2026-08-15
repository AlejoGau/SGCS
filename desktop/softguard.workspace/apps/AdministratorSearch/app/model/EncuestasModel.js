Ext.define('AdministratorSearch.model.EncuestasModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',

    fields: [
        {
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {name:'RowNumber',type:'int'},
        {name:'enc_idkey',type:'int'},
        {name:'enc_name',type:'string'},
        {name:'enc_descripcion',type:'string'},
        {name:'enc_status',type:'string'},
        
    ],
        
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/p_encuestas',
		
	}
});									