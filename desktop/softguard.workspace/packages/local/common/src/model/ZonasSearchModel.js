//MIGRADO2024
Ext.define('Common.model.ZonasSearchModel', {
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
        {name:'_codigo',type:'string',
        convert: function(v,record){
            return Ext.String.leftPad(Ext.util.Format.trim(record.get('zon_ccodigo')),3,'0');
        }},
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
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_cprovincia',type:'string'},
        {name:'cue_ccodigopostal',type:'string'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso',type:'string'},
        {name:'cue_ctipo',type:'string'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_nparticion',type:'int',defaultValue:0},
        {name:'cue_cobservacion',type:'string'},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'date', dateFormat:'MS'},
        {name:'cue_dservicio',type:'date', dateFormat:'MS'},
        {name:'cue_nmostrar',type:'int',defaultValue:0},
        {name:'cue_nsonidoul',type:'int',defaultValue:0},
        {name:'cue_nllaveul',type:'int',defaultValue:0},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'Situacion',type:'string'},
        {name:'cue_nEfectiva',type:'int',defaultValue:0},
        {name:'cue_cIdExtendido',type:'string'},
        {name:'cue_iZonaHoraria',type:'int',defaultValue:0},
        {name:'cue_cPartitionInfo',type:'string'},
        {name:'cue_iid',type:'int',mapping:'Id'}
        ],
    	
    proxy: {
		type : 'rest',
		url : ' /rest/search/m_zonas',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});