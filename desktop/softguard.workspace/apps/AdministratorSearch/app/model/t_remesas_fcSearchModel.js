Ext.define('AdministratorSearch.model.t_remesas_fcSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
        name: 'Id',
        type: 'int',
        mapping:'rem_icodigo_ID'
        },
        {
        name: 'Name',
        type: 'string'
        },
      {name:'RowNumber',type:'int'},
        {name:'rem_icodigo_ID',type:'int'},
        {name:'rem_cdescripcion',type:'string'},
        {name:'rem_cnombrearchivo',type:'string'},
        {name:'rem_cnrocomercio',type:'string'},
        {name:'rem_cidentificacion',type:'string'},
        {name:'rem_cconfig',type:'string'}
    ],
        
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/rest/search/t_remesas_fc',
		appendId : true
	}
});									