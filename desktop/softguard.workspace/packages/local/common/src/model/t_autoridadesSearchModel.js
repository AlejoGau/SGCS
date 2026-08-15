//MIGRADO2024
Ext.define('Common.model.t_autoridadesSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        mappgin:'aut_idkey'
        
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
    	defaultValue: 'Tecnico'
        },
		{name:'aut_ccodigo',type:'string'},
        {name:'aut_cnombre',type:'string'},
        {name:'aut_meventos',type:'string'},
        {name:'aut_cdealer',type:'string'},
        {name:'aut_meventosauto',type:'string'},
        {name:'aut_cprovincia',type:'string'},
        {name:'pro_cdescripcion',type:'string'},
        {name:'aut_cAutoProcesados',type:'string'},
        {name:'aut_cautoprocesados',type:'string'},
        {name:'aut_idestino',type:'int',defaultValue:1,mapping:'aut_iDestino'}
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/search/t_autoridades',        
    	appendId : false
	}
});