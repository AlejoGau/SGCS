//MIGRADO2024
Ext.define('Common.model.TablasTiposSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'tip_idKey',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3070
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_tipos'
        },
		{name:'tip_ccodigo',type:'string'},
        {name:'tip_cdescripcion',type:'string'},
        {name:'tip_curlimagen',type:'string'},
        {name:'tip_cservicio',type:'string'},
        {name:'tip_nTipo',type:'int',defaultValue:0},
        {name:'tip_nCondicion',type:'int',defaultValue:0},
        {name:'tipo_string', type:'string',
            convert: function(v, record){
                if(record.get('tip_nTipo') == 0) {
                    return getLocale('Otros');
                } else if(record.get('tip_nTipo') == 1) {
                    return getLocale('Vehiculo');
                } else if(record.get('tip_nTipo') == 2) {
                    return getLocale('Persona');
                } else if(record.get('tip_nTipo') == 3) {
                    return getLocale('Mascota');
                } else if(record.get('tip_nTipo') == 4) {
                    return getLocale('Patrulla');    
                } else if(record.get('tip_nTipo') == 5) {
                    return getLocale('Vigicontrol');    
                } else if(record.get('tip_nTipo') == 6) {
                    return getLocale('Cercos');    
                }else if(record.get('tip_nTipo') == 7) {
                    return getLocale('Unidad funcional');    
                }else if(record.get('tip_nTipo') == 8) {
                    return getLocale('Acceso');    
                }else if(record.get('tip_nTipo') == 9) {
                    return getLocale('CleanApp');    
                }else if(record.get('tip_nTipo') == 10) {
                    return getLocale('SmartPanicsPC');    
                }else if(record.get('tip_nTipo') == 11) {
                    return getLocale('TecGuard');    
                }else if(record.get('tip_nTipo') == 12) {
                    return getLocale('Candado');  
                }else if(record.get('tip_nTipo') == 13) {
                    return getLocale('Camara');  
                }
            }
        },
        {name:'tip_cRubro',type:'string'}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_tipos',
		appendId : true
	}
});
																