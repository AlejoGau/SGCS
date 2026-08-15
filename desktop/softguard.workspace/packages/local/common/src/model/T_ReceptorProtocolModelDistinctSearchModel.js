//MIGRADO2024
Ext.define('Common.model.T_ReceptorProtocolModelDistinctSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        
          
          {name:'rpm_cMarca',type:'string'}
          
          
    ],
        
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/T_ReceptorProtocolModelDistinct',
		appendId : true
	}
});
																