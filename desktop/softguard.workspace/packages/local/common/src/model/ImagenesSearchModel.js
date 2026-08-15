//MIGRADO2024
Ext.define('Common.model.ImagenesSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'cue_iid',
    fields: [
        {
            name: 'gri_dfechahora',
            type:'string'
        },
        {
            name: 'gri_carchivo',
            type: 'string'
        },
        {
            name: 'gri_ccarpeta',
            type: 'string'
        }, 
        {
    		name : 'cod_cdescripcion',
    		type : 'string'
    	}, {
    		name : 'rec_calarma',
    		type : 'string'
    	},{
    		name : 'cod_nprioridad',
			type : 'int'
		}, {
			name : 'cod_ncolor',
			type : 'int'
		},{
			name : 'cod_ncolorletra',
			type : 'int'
		},{
            name : 'rec_iid',
            type: 'int'
        },{
            name: 'gri_iidcuenta',
            type: 'int'
        }
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/rest/search/AWCC_ImagenesDeEventos',        
        appendId : false
    }
});