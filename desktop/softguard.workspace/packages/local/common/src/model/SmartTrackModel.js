//MIGRADO2024
Ext.define('Common.model.SmartTrackModel', {
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
        defaultValue: 3113
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'SmartPanic'
        },
		{name:'Telefono',type:'string'},
        {name:'Imei',type:'string'},
        {name:'Modelo',type:'string'},
        {name:'Marca',type:'string'},
        {name:'Version',type:'string'},
        {name:'Tipo',type:'string'},
        {name:'CuentaId',type:'int',defaultValue:0},
        {name:'cue_cnombre',type:'string'},
        {name:'Nombre',type:'string'},
        {name:'pushToken',type:'string'},
        {name:'Config',type:'string'},
        
        {name:'HBTime',type:'int', defaultValue:0},
        {name:'EnFalloDeTesteo',type:'int', defaultValue:0},
        {name:'EnFalloDeTesteoDesde',type:'string'},
        
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/SmartTrack/',
		appendId : true
	}
});