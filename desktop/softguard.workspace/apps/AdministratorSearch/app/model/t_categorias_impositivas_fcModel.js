Ext.define('AdministratorSearch.model.t_categorias_impositivas_fcModel', {
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
        {name:'cat_ccodigo',type:'string'},
        {name:'cat_cdescripcion',type:'string'},
        {name:'cat_cimpuesto1',type:'string'},
        {name:'cat_cimpuesto2',type:'string'},
        {name:'cat_cimpuesto3',type:'string'},
        {name:'cat_nTipoResp',type:'int'},
        {name:'cat_orgicodigoid',type:'int'},
        {name:'cat_cbtidkey',type:'int'}
    ],
        
    proxy: {
        type : 'rest',        
    	url : '/Rest/t_categorias_impositivas_fc/',
		appendId : true
	}
});									