Ext.define('SmartTrack.model.p_vcrestriccionesModel', {
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
        defaultValue: 3079
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_categorizacion'
        },
    	{name:'vcr_distance',type:'int'},
        {name:'vcr_idorganizacion',type:'int'},
        {name:'vcr_list',type:'string'},
        {name:'vcr_status',type:'int'},
        {name:'vcr_name',type:'string'},


        {name:'_vcr_status',type:'int', convert: function (value,record) {
                if(record.get('vcr_status') == 1) {
                    return getLocale('Activo')
                } else {
                    return getLocale('Desactivado')
                }
            }},
        
        ],
		

    proxy: {
        type : 'rest',
        
		url : '/Rest/p_vcrestricciones',
		appendId : true
	}
});
