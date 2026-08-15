Ext.define('Tablas.model.TablasModemsSmsSearchModel', {
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
    	defaultValue: 3082
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_modems_sms'
        },
		{name:'sms_icodigo',type:'int',defaultValue:0},
        {name:'sms_cdescripcion',type:'string'},
        {name:'sms_nport',type:'int',defaultValue:0},
        {name:'sms_cseteo',type:'string'},
        {name:'sms_cinbox',type:'string'},
        {name:'sms_ndefault',type:'int',defaultValue:0},
        {name:'sms_cterminal',type:'string'},
        {name:'sms_csource',type:'string'},
        {name:'sms_nEstado',type:'int',defaultValue:0},
        {name:'sms_iGateway',type:'int'},
        {name:'tgm_cdescripcion',type:'string'},
        
        {name:'estado_string', type:'string',
            convert: function(v, record){
                
                if(record.get('sms_nEstado') == 1) {
                    return getLocale('Deshabilitado');
                } else {
                    return getLocale('Habilitado');
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
		url : '/Rest/search/t_modems_sms',
		appendId : true
	}
});
																
