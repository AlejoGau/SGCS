Ext.define('Common.model.FormularioSerTecSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
        name: 'Id',
        type: 'int',
        
        },
        {
        name: 'Name',
        type: 'string'
        },
      {name:'RowNumber',type:'int'},
      {name:'fst_cNombre',type:'string'},
      {name:'fst_iStatus',type:'int'},
      {name:'fst_iTipo',type:'int'},
      {name:'fst_cDealer',type:'string'},
      {name:'fst_cArchivo',type:'string'}
    ],
        
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            root : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_FormulariosSTSearch',
		appendId : true
	}
});									