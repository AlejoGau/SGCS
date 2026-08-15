//MIGRADO2024
Ext.define('Common.model.MoneyguardClientSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'cli_icodigo_ID',
    fields: [
        {
            name: 'ObjectTypeName',
            type: 'string',
        	defaultValue: 'MoneytGuardClient'
        },
        {name:'cli_cnombre',type:'string'},
        {name:'cli_cidentificacion',type:'string'},
        {name:'cli_czona',type:'string'},
        {name:'cli_ccategoriaimpositiva',type:'string'},
        {name:'cli_ivendedor',type:'int'},
        {name:'cli_icobrador',type:'int'},
        {name:'cli_ccallefiscal',type:'string'},
        {name:'cli_clocalidadfiscal',type:'string'},
        {name:'cli_cprovinciafiscal',type:'string'},
        {name:'cli_ccodigopostalfiscal',type:'string'},
        {name:'cli_ccallecobranza',type:'string'},
        {name:'cli_clocalidadcobranza',type:'string'},
        {name:'cli_cprovinciacobranza',type:'string'},
        {name:'cli_ccodigopostalcobranza',type:'int'},
        {name:'cli_nlunes',type:'int'},
        {name:'cli_nmartes',type:'int'},
        {name:'cli_nmiercoles',type:'int'},
        {name:'cli_njueves',type:'int'},
        {name:'cli_nviernes',type:'int'},
        {name:'cli_nsabado',type:'int'},
        {name:'cli_ndomingo',type:'int'},
        {name:'cli_chora',type:'string'},
        {name:'cli_cservicio',type:'int'},
        {name:'cli_dproximafactura',type: 'date', dateFormat: 'MS', defaultValue: new Date( '1/1/1' ) },
        {name:'cli_cformatoimpresion',type:'string'},
        {name:'cli_ccondicionpago',type:'string'},
        {name:'cli_ctelefono',type:'int'},
        {name:'cli_ccontacto',type:'string'},
        {name:'cli_cobservacion',type:'string'},
        {name:'cli_nsituacion',type:'int'},
        {name:'cli_inumero',type:'int'},
        {name:'cli_nDocCAE',type:'int'},
        {name:'cli_cDatosExtra',type:'string'}
    ],
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_clientes_fc',
		appendId : false
	}
});
																