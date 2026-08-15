Ext.define('AdministratorSearch.model.TipoServicioModel', {
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
        defaultValue: 3102
       },
       {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_tiposervicio'
       },
        {name:'tip_ccodigo',type:'string',defaultValue:0},
        {name:'tip_cdescripcion',type:'string'},
        {name:'tip_yvalor',type:'float', defaultValue:0},
        {name:'tip_ndias',type:'int', defaultValue:0},
        {name:'tip_nvto',type:'int', defaultValue:0},
        {name:'tip_idKey',type:'int'},
        {name:'tip_ntipo',type:'int'}
    ],

    proxy: {
    	type : 'rest',
		url : '/Rest/t_tiposervicio/',
		appendId : true
	}
});