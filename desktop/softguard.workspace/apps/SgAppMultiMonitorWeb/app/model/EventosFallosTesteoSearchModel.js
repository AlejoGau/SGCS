Ext.define('SgAppMultiMonitorWeb.model.EventosFallosTesteoSearchModel', {
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
        defaultValue: 3107
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'EventosEnFalloTesteo'
        },
    	{name:'eft_iRecID',type:'int'},
        {name:'eft_iidCuenta',type:'int'},
        {name:'eft_tEventoFechaHora',type:'date'},
        {name:'eft_cLinea',type:'string'},
        {name:'eft_cCuenta',type:'string'},
        {name:'eft_cNombre',type:'string'},
        {name:'eft_cAlarma',type:'string'},
        {name:'eft_cAlarmaDescripcion',type:'string'},
        {name:'eft_nAlarmaColor',type:'int'},
        {name:'eft_nAlarmaColorLetra',type:'int'},
        {name:'eft_cAlarmaAutoprocesa',type:'string'},




        ],
		
   
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/SearchEventosEnFalloTesteo',
		appendId : true
	}
});