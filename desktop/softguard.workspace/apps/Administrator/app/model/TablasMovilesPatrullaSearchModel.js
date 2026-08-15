Ext.define('Administrator.model.TablasMovilesPatrullaSearchModel', {
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
    	defaultValue: 3087
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_movilespatrulla'
        },
		{name:'tmp_cnombre',type:'string'},
        {name:'tmp_cnumero',type:'string', convert: function(value){return Ext.String.trim(value);}},
        {name:'_tmp_cnumero',type:'string', convert: function(value,record){
            return Ext.String.trim(record.get('tmp_cnumero').replace("ST", ""));
            
        }},
        {name:'tmp_clicencia',type:'string'},
        {name:'tmp_cmarca',type:'string'},
        {name:'tmp_cmodelo',type:'string'},
        {name:'tmp_cpathfoto',type:'string'},
        {name:'tmp_cflota',type:'string'},
        {name:'tmp_nestado',type:'int',defaultValue:0},
        {name:'tmp_idKey',type:'int',defaultValue:0},
        {name:'_nestado',type:'string',convert:function(v, record){
    
            switch(record.get('tmp_nestado')) {
                case 1:
                    return 'Disponible listado';
                break;
                case 2:
                    return 'Fuera de servicio';
                break;
            }
            
        }},
{name:'tmp_icuenta',type:'int',defaultValue:0},
{name:'tmp_iAsignado',type:'int',defaultValue:0},
        {
            name: 'tmp_iid',
            type: 'int'
        } 
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_movilespatrulla',
		appendId : true
	}
});