Ext.define('AdministratorSearch.model.FormatosModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
      { name: 'Id', type: 'int'},
      { name: 'Name', type: 'string' },
      {name:'for_ccodigo',type:'string'},
      {name:'for_cdescripcion',type:'string'},
      {name:'for_cformato',type:'string'},
      {name:'for_cnombre',type:'string'},
      {name:'for_calarma',type:'string'},
      {name:'for_idKey',type:'int', mapping : 'Id'} 
    ],
    	
    proxy: {
		type : 'rest',       
		url : '/Rest/m_formatos/',
		appendId : true
	}
});

									