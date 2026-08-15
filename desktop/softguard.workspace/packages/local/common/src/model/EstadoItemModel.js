//MIGRADO2024
Ext.define( 'Common.model.EstadoItemModel', {
    extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: [ {
		name: 'Id',
		type: 'int'
	}, {
			name: 'Name',
			type: 'string'
		},
		{ name: 'est_czona', type: 'string' },
		{ name: 'est_iidcuenta', type: 'int', defaultValue: 0 },
		{ name: 'est_cData', type: 'string' }
    ],
	proxy: {
		type: 'estadoitemproxy',
		url: '/Rest/Cuenta/{0}/EstadoItem',
		replaceIdRegex: /\{0\}/,
        appendId: true,
		writer: {
			writeAllFields: true
		}
	}// cierro el proxy
});