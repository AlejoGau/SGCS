Ext.define('SmartTrack.model.SmartTrackUserLoggedSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'vucs_idkey',
    fields: [
        {
            name: 'vucs_idkey',
            type: 'int'
        },{
            name: 'vucs_usuidkey',
            type: 'int'
        },
        {
            name: 'vucs_cueiid',
            type: 'int'
        },
        {
            name: 'vucs_loginidrec',
            type: 'int'
        },
        {
            name: 'vucs_vcid',
            type: 'int'
        },
        {
            name: 'vucs_token',
            type: 'string'
        },
        {
            name: 'vucs_lastmodification',
            type : 'date',
            dateFormat : 'n/j/Y g:i:s A'
        },
        {
            name: 'usu_iidcuenta',
            type: 'int'
        },
        {
            name: 'usu_icodigo',
            type: 'int'
        },
        {
            name: 'usu_cnombre',
            type: 'string'
        },
        {
            name: 'telefono',
            type: 'string'
        },
        {
            name: 'usu_iid',
            type: 'int'
        },
        {
            name: 'usu_cclave',
            type: 'int'
        },
        {
            name: 'usu_ntipo',
            type: 'int'
        },
        {
            name: 'usu_cimagen',
            type: 'string'
        },
        {
            name: 'usu_mobservacion',
            type: 'string'
        },
        {
            name: 'usu_idKey',
            type: 'int'
        },
        {
            name: 'usu_cIdExtendido',
            type: 'int'
        },
        {
            name: 'usu_cmetadata',
            type: 'string'
        },
        {
            name: 'usu_teliid',
            type: 'int'
        },
        {
            name: 'usu_cidentificacion',
            type: 'string'
        },
        {
            name: 'pushToken',
            type: 'string'
        },
        {
            name: 'rec_iid',
            type: 'int'
        },
        {
            name: 'rec_calarma',
            type: 'string'
        },
        {
            name: 'rec_tfechahora',
            type : 'date',
            dateFormat : 'n/j/Y g:i:s A'
        },
        {
            name: 'cod_ccodigo',
            type: 'string'
        },
        {
            name: 'cod_cdescripcion',
            type: 'string'
        },
        {
            name: 'cod_ncolor',
            type: 'int'
        },
        {
            name: 'cod_nColorLetra',
            type: 'int'
        },
        {
            name: 'cue_clinea',
            type: 'string'
        },
        {
            name: 'cue_ncuenta',
            type: 'string'
        },
        {
            name: 'cue_cnombre',
            type: 'string'
        },
        {
            name: 'objetivo',
            type: 'string',
            convert: function(value, record){
                return record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+ ' ' +record.get('cue_cnombre')
            }
        }

    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/rest/search/SmartTrackUserLoggedSearch',        
        appendId : false
	}
});


