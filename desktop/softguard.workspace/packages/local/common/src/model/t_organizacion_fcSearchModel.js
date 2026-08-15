//MIGRADO2024
Ext.define('Common.model.t_organizacion_fcSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
      {name:'RowNumber',type:'int'},
        {name:'org_icodigo_ID',type:'int'},
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
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_organizacion_fc/',
		appendId : true
	}
});									