Ext.define('AdministratorSearch.model.ReceptoresModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        
      {name:'RowNumber',type:'int'},
      {name:'rec_iid',type:'int'},
      {name:'rec_cdescripcion',type:'string'},
      {name:'rec_cdll',type:'string'},
      {name:'rec_ntcpip',type:'int'}
        
        
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/SeachReceptoresCab',
		appendId : true
	}
});

																
