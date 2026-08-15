//MIGRADO2024
Ext.define('Common.model.HorarioExcepcionCuentaModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name: 'Id', type: 'int'},
    	{name: 'exc_iidcuenta', type : 'int' },
		{name: 'exc_cHoraApertura', type : 'string' },
		{name: 'exc_cHoraCierre', type : 'string' },
		{name: 'exc_cevento', type: 'string', convert: function(v, record){return v.trim();}}
    ],
    proxy: {
        type: 'horarioexcepcioncuentaproxy',
        url: '/Rest/Cuenta/{0}/HorarioExcepcion',
        replaceIdRegex: /\{0\}/,
        appendId: true,
		writer:{ writeAllFields:true },
	}// cierro el proxy
});