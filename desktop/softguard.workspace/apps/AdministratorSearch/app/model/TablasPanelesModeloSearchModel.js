Ext.define('AdministratorSearch.model.TablasPanelesModeloSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'pam_idKey',
    fields: [
        { name: 'pam_idKey', type: 'int' },
        { name: 'pam_cMarca', type: 'string' },
        { name: 'pam_cModelo', type: 'string' },
        { name: 'pan_cImagen', type: 'string' },
        { name: 'Descripcion',
        	convert: function(v, r){
        		return r.get('pam_cMarca')+ ' - ' + r.get('pam_cModelo');
        	}
    	},
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/t_panelesmodelos',
		appendId : true
		}
});