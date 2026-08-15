Ext.define('SgAppSerTec.model.TecguardCuentaSeguimientoModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        mapping: 'cue_iid'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3001
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'TecGuard'
        },
        {name:'cue_iid',type:'int'},
        {name:'cue_cnombre',type:'string'},
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'cue_ccalle',type:'string'},
        {name:'cue_clocalidad',type:'string'},
        {name:'cue_cprovincia',type:'int'},
        {name:'cue_ccodigopostal',type:'int'},
        {name:'cue_ccallecorreo',type:'string'},
        {name:'cue_clocalidadcorreo',type:'string'},
        {name:'cue_cprovinciacorreo',type:'string'},
        {name:'cue_ccodigopostalcorreo',type:'string'},
        {name:'cue_ctelefono',type:'string'},
        {name:'cue_cclave',type:'string'},
        {name:'cue_cpermiso'},
        {name:'cue_ctipo',type:'int'},
        {name:'cue_cubicacion',type:'string'},
        {name:'cue_nparticion',type:'int'},
        {name:'cue_cobservacion',type:'string'},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'date', dateFormat:'c'},
        {name:'cue_dservicio',type:'date', dateFormat:'c'},
        {name:'cue_nmostrar',type:'int'},
        {name:'cue_nsonidoul',type:'int'},
        {name:'cue_nllaveul',type:'int'},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'cue_nEfectiva',type:'int'},
        {name:'sp_rLatitud',type:'string'},
        {name:'sp_rLongitud',type:'string'},
        {name:'sp_tfechahora',type:'date', dateFormat:'n/j/Y g:i:s A'},
        {name:'gps_tfechahora',type:'date', dateFormat:'n/j/Y g:i:s A'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/rest/search/tecguardcuentaseguimiento',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});