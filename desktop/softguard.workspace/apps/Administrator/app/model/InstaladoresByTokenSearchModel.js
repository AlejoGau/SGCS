Ext.define('Administrator.model.InstaladoresByTokenSearchModel', {
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
        defaultValue: 3029
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_instaladoresbytoken'
        },
		{name:'ins_ccodigo',type:'string'},
        {name:'ins_cnombre',type:'string'},
        {name:'ins_cempresa',type:'string'},
        {name:'ins_ccalle',type:'string'},
        {name:'ins_inumero',type:'string'},
        {name:'ins_npiso',type:'string'},
        {name:'ins_cdepartamento',type:'string'},
        {name:'ins_ctelefono',type:'string'},
        {name:'ins_cmail',type:'string'},
        {name:'ins_cDealer',type:'string'},
        {name:'ins_idKey',type:'int'},
        {name:'ins_iTipo',type:'string'}
        ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/t_instaladoresbytoken',        
    	appendId : false
	}
});   