Ext.define('SgAppMultiMonitorWeb.model.EventosEnFalloRestauracionSearchModel', {
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
        defaultValue: 's_operadores'
        },
		{name:'efr_iRecID',type:'int'},
        {name:'efr_iidCuenta',type:'int'},
        {name:'efr_tEventoFechaHora',type:'date'},
        {name:'efr_cLinea',type:'string'},
        {name:'efr_cCuenta',type:'string'},
        {name:'efr_cNombre',type:'string'},
        {name:'efr_tFallaFechaHora',type:'date'},
        {name:'efr_cAlarma',type:'string'},
        {name:'efr_cAlarmaDescripcion',type:'string'},
        {name:'efr_nAlarmaColor',type:'int'},
        {name:'efr_nAlarmaColorLetra',type:'int'},
        {name:'efr_cZona',type:'string'},
        {name:'efr_cZonaDescripcion',type:'string'}

        ],
		
   
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/EventosEnFalloRestauracion',
		appendId : true
	}
});