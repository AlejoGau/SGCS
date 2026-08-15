Ext.define('AdministratorSearch.model.t_organizacion_fcModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
        name: 'Id',
        type: 'int',
        mapped: 'idKey'
        },
        {
        name: 'Name',
        type: 'string'
        },
        
        {name:'org_cnombre',type:'string'},
        {name:'org_ccallefiscal',type:'string'},
        {name:'org_clocalidadfiscal',type:'string'},
        {name:'org_cprovinciafiscal',type:'string'},
        {name:'org_ccodigopostalfiscal',type:'string'},
        {name:'org_ctelefono',type:'string'},
        {name:'org_cmail',type:'string'},
        {name:'org_ccategoriaimpositiva',type:'string'},
        {name:'org_cidentificacion',type:'string'},
        {name:'org_cinicioactividades',type:'string'},
        {name:'org_cempresacb',type:'string'},
        {name:'org_cheadercbte',type:'string'},
        {name:'org_csymbol',type:'string'},
        {name:'org_factelect',type:'string'},
        {name:'org_cmetadata',type:'string'},
        {name:'org_organizacionId',type:'int'}
        
    ],
        
    proxy: {
		type : 'rest',
		url : '/Rest/t_organizacion_fc/',
		appendId : true,
		writer: {
			type: 'json',
			writeAllFields: true
		}
	}
});

											