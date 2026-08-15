//MIGRADO2024
Ext.define('Common.model.HorarioExcepcionSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id',type: 'int'},
		{name:'eve_ccodigo',type:'string'},
        {name:'eve_cdescripcion',type:'string'},
        {name:'eve_dfechadesdes',type:'date'},
        {name:'eve_choradesde',type:'date'},
        {name:'eve_dfechahasta',type:'date'},
        {name:'eve_chorahasta',type:'date'},
        {name:'exc_iidcuenta',type:'int'},
        {name:'exc_cevento',type:'string'},
        {name:'exc_idKey',type:'string'},
        {name: 'exc_cHoraApertura', type : 'string' },
		{name: 'exc_cHoraCierre', type : 'string' }
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/HorarioExcepcion',
		appendId : true
	}
});