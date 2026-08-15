
Ext.define('SgAppWebReport.model.TablasPanelesSearchModel', {

    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3072
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_paneles'
        },
		{name:'pan_ccodigo',type:'string'},
        {name:'pan_cdescripcion',type:'string'},
        {name:'pan_mobservacion',type:'string'},
        {name:'pan_nesgprs',type:'int', mapping:'pan_nEsGPRS'},
        {name:'pan_iModelo',type:'int', defaultValue:0},

        {name:'pam_idKey',type:'int'},
        {name:'pam_cMarca',type:'string'},
        {name:'pam_cModelo',type:'string'},
        {name:'pam_cMetadata',type:'string'},
        {name: 'Descripcion',
        	convert: function(v, r){
                if ( r.get('pam_cMarca') != '' && r.get('pam_cModelo') != '') {
                    return r.get('pam_cMarca')+ ' - ' + r.get('pam_cModelo');
                }        		
        	}
    	},
        {name: '_pan_cdescripcion',
        	convert: function(v, r){
                if ( r.get('pam_cMarca') != '' && r.get('pam_cModelo') != '') {
                    return '['+r.get('pam_cMarca')+ '-' + r.get('pam_cModelo')+'] '+r.get('pan_cdescripcion');
                } else {
                    return r.get('pan_cdescripcion');
                }		
        	}
    	}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/t_paneles',
		appendId : false
	}
});
