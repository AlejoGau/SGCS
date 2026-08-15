Ext.define('AdministratorSearch.model.TablasTagsAgSearchModel', {
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
    	defaultValue: 3083
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_tags_ag'
        },
		{name:'tag_ccodigo',type:'string'},
        {name:'tag_ctag',type:'string'},
        {name:'tag_czona',type:'string'},
        {name:'tag_iCuenta',type:'int',defaultValue:0},
        
        
        {name:'cue_iid',type:'string'},
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
        {name:'cue_nparticion',type:'string'},
        {name:'cue_cobservacion',type:'string'},
        {name:'cue_cfoto',type:'string'},
        {name:'cue_dfechaalta',type:'string'},
        {name:'cue_dservicio',type:'string'},
        {name:'cue_nmostrar',type:'string'},
        {name:'cue_nsonidoul',type:'string'},
        {name:'cue_nllaveul',type:'string'},
        {name:'cue_cemail',type:'string'},
        {name:'cue_cinstalador',type:'string'},
        {name:'cue_cIMEI',type:'string'},
        {name:'cue_cLatLng',type:'string'},
        {name:'cue_nEfectiva',type:'string'}
         ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_tags_ag',
		appendId : true
	}
});