//MIGRADO2024
Ext.define('Common.model.ConexionesModel', {
    extend: 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{
    			name : 'Id',
				type : 'int',
                mapping:'iprs_idKey'
			},
        {name:'Codigo',mapping:'iprsc_ipcidkey'},
        'iprsc_ipcidkey', 
        {name: 'Descripcion',
        	convert: function(v, r){
        		return r.get('ipc_cdescripcion')
        	}
    	},
        'ipc_cdescripcion',
     
    ],
    proxy: {
        type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
        url: '/rest/search/ReceptorCuentaSearch'  	 
    }
});