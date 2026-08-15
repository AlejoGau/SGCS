Ext.define('Logger.model.TablasCodigosAlarmaSearchModel', {
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
    	defaultValue: 3089
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_codigos_alarma'
        },
		{name:'cod_ccodigo',type:'string'},
        {name:'cod_cdescripcion',type:'string'},
        {name:'cod_nalerta',type:'int',defaultValue:0},
        {name:'cod_nprioridad',type:'int',defaultValue:0},
        {name:'cod_ntipo',type:'int',defaultValue:0},
        {name:'cod_nsistema',type:'int',defaultValue:0},
        {name:'cod_ncolor',type:'int',defaultValue:0},
        {name:'cod_cSonido',type:'string'},
        {name:'cod_nColorLetra',type:'int',defaultValue:0},
        {name:'cod_nResuelve',type:'int',defaultValue:0},
        {name:'cod_cGrupo',type:'string'},
        {name:'cod_nSms',type:'int',defaultValue:0},
        {name:'cod_nMail',type:'int',defaultValue:0},
        {name:'cod_nVideo',type:'int',defaultValue:0},
        {name:'cod_nManual',type:'int',defaultValue:0},
        {name:'cod_nMovil',type:'int',defaultValue:0},
        {name:'cod_nAutoridad',type:'int',defaultValue:0},
        {name:'cod_nLeeSonido',type:'int',defaultValue:0},
        {name:'cod_nMultiMonitor',type:'int',defaultValue:0},
        {name:'cod_cconfiguracion_DSS',type:'string'},
        {name:'cod_cinstrucciones_DSS',type:'string'},
        {name:'nombre',type:'string',convert: function(v, record){
                
                return record.get('cod_cdescripcion');
            }},
        {name:'cod_nWebCliente',type:'int', defaultValue:1},
        {name:'Descripcion',type:'string',convert: function(v, record){
                
                return record.get('cod_cdescripcion')+ ' - ' + record.get('cod_ccodigo');
            }},
             
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/rest/search/t_codigos_alarmas',
		appendId : true
	}
});