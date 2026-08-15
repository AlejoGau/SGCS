Ext.define('AdministratorSearch.model.TablasTipoServicioSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
            {name: 'Id',type: 'int'},
            {name: 'Name',type: 'string'},
            {name: 'ObjectTypeId',type: 'int',defaultValue: 3224},
            {name: 'ObjectTypeName',type: 'string',defaultValue: 't_CuentasTipoServicio'},
            {name:'cts_cnombre',type: 'string'},
            {name:'cts_iestado',type:'int',defaultValue:0}
        ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/t_CuentasTipoServicio/',
		appendId : true
	}
});