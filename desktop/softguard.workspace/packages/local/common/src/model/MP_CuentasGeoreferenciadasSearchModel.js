//MIGRADO2024
Ext.define('Common.model.MP_CuentasGeoreferenciadasSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string',
            mapping: 'cue_cnombre'
        },
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string',convert: function(v, record){
            if (v){
                v = v.substr(0,4)
            }
            return v
        }},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_cprovincia',type:'string'},
        {name:'cue_ccodigopostal',type:'string'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_provincia',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso',type:'string'},
        {name:'cue_ctipo',type:'string'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_nparticion',type:'int',defaultValue:0},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'date', dateFormat:'MS'},
        {name:'cue_dservicio',type:'date', dateFormat:'MS'},
        {name:'gps_tfechahora',type:'date', dateFormat:'c'},
        {name:'cue_nmostrar',type:'int',defaultValue:0},
        {name:'cue_iid',type:'int',defaultValue:0},
        {name:'cue_nsonidoul',type:'int',defaultValue:0},
        {name:'cue_nllaveul',type:'int',defaultValue:0},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
    ],
    proxy : {
        
        type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/Search/MP_CuentasGeoreferenciadas',
		appendId : false
	}
});