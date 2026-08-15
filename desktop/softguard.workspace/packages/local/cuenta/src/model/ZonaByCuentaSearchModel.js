Ext.define('Cuenta.model.ZonaByCuentaSearchModel', {
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
        {name:'zon_iidcuenta',type:'int',defaultValue:0},
        {name:'zon_ccodigo',type:'string'},
        {name:'zon_cdescripcion',type:'string'},
        {name:'zon_codigoalarma',type:'string'},
        {name:'zon_clistaemergencia',type:'string'},
        {name:'zon_cimagen',type:'string'},
        {name:'zon_mobservacion',type:'string'},
        {name:'zon_ccodigorestauracion',type:'string'},
        {name:'zon_nminutosrestauracion',type:'int',defaultValue:0},
        {name:'zon_nmostrar',type:'int',defaultValue:0},
        {name:'zon_cdealer',type:'string'},        
        {name:'zon_ccuenta',type:'string', convert: function(v, record){
            if (v){
                v = v.substr(0,4)
            }
            return v
        }},
        {name:'zon_nautoprocesa',type:'int',defaultValue:0},
        {name:'zon_cAlarmaAGenerar',type:'string'},
        
        /// datos de la cuenta
        {name:'cue_cnombre',type:'string'},
        {name:'cue_iid',type:'int'},
        
        {name:'sta_cUltimaAlerta',type:'string'},
        {name:'sta_cultimaalarma',type:'string'},
        {name:'sta_dFechaUltimaAlerta',type:'string'},
        {name:'cod_cdescripcion',type:'string'},
        {name:'cod_nColorLetra',type:'string'},
        {name:'cod_ncolor',type:'string'},
        {name:'_cuentacopy',type:'string', 
            convert: function(v, record){
                return record.get('zon_cdealer')+"-"+record.get('zon_ccuenta')+' '+record.get('cue_cnombre');
            }
        },
        {name:'tip_nTipo',type:'int'},
        {name:'tip_nCondicion',type:'int'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/rest/search/zonabycuenta',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});