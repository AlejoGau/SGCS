//MIGRADO2024
Ext.define('Common.model.ResolucionModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
      {name:'iprs_idKey',type:'int'}, 
      {name:'Id',type:'int'},
      { name: 'iprsc_ipcidkey', type: 'int' },
      {name:'iprs_ccnombre',type:'string'},
      {name:'ipc_cdescripcion',type:'string'},
      {name:'ipc_nport',type:'int'},
      {name:'ipc_ireceptor',type:'int'},
    ],
    	
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/ReceptorConexionSearch',
		appendId : true
	}
});