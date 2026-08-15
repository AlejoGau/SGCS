//MIGRADO2024
Ext.define('Common.model.HorarioExcepcionModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
    	{name: 'exc_iidcuenta', type : 'int' },
		{name: 'exc_cHoraApertura', type : 'string' },
		{name: 'exc_cHoraCierre', type : 'string' },
		{name: 'exc_cevento', type: 'string', convert: function(v, record){return (v ? v.trim() : '');}}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/HorarioExcepcion/',
		appendId : true
	}
});