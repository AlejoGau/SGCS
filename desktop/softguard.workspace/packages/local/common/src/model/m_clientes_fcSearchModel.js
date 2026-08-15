//MIGRADO2024
Ext.define('Common.model.m_clientes_fcSearchModel', {
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
        defaultValue: 600
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'Organization'
        },
		{name:'cli_icodigo_ID',type:'int'},
        {name:'cli_cnombre',type:'string'},
        {name:'cli_cidentificacion',type:'string'},
        {name:'cli_ccategoriaimpositiva',type:'string'},
        {name:'cli_ivendedor',type:'int'},
        {name:'cli_icobrador',type:'int'},
        {name:'cli_czona',type:'string'},
        {name:'cli_ccallefiscal',type:'string'},
        {name:'cli_clocalidadfiscal',type:'string'},
        {name:'cli_cprovinciafiscal',type:'string'},
        {name:'cli_ccodigopostalfiscal',type:'string'},
        {name:'cli_ccallecobranza',type:'string'},
        {name:'cli_clocalidadcobranza',type:'string'},
        {name:'cli_cprovinciacobranza',type:'string'},
        {name:'cli_ccodigopostalcobranza',type:'int',defaultValue:0},
        {name:'cli_nlunes',type:'int',defaultValue:0},
        {name:'cli_nmartes',type:'int'},
        {name:'cli_nmiercoles',type:'int'},
        {name:'cli_njueves',type:'int'},
        {name:'cli_nviernes',type:'int'},
        {name:'cli_nsabado',type:'int'},
        {name:'cli_ndomingo',type:'int'},
        {name:'cli_chora',type:'string'},
        {name:'cli_cservicio',type:'string'},
        {name:'cli_dproximafactura',type:'date'},
        {name:'cli_cformatoimpresion',type:'string'},
        {name:'cli_ccondicionpago',type:'string'},
        {name:'cli_ctelefono',type:'string'},
        {name:'cli_ccontacto',type:'string'},
        {name:'cli_cobservacion',type:'string'},
        {name:'cli_nsituacion',type:'string'},
        {name:'cli_inumero',type:'string'},
        {name:'cli_nDocCAE',type:'string'},
        {name:'cli_cDatosExtra',type:'string'},
        {name:'cli_iorganizacion',type:'int'},
        
        {name:'org_nombre',type:'string'},
        {name:'org_csymbol',type:'string'},
        
        {name:'mon_csymbol',type:'string'},
        {name:'mon_ccodigo',type:'string'}
    ],
		
    proxy: {
		type : 'rest', 
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_clientes_fc',
		appendId : true
		}
});