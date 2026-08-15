//MIGRADO2024
Ext.define('Common.model.SoftguardFalsaModel', {
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
        	{ name: 'fal_iidcuenta',type:'int',defaultValue:0},
            { name: 'fal_nmargen' ,type:'int',defaultValue:0},
            { name: 'fal_nmeses' ,type:'int',defaultValue:0},
            { name: 'fal_mnota' }
        ],
    validations: [
    /*{ type: 'presence', name: 'Name', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'LastName', message: 'Nombre es requerido.' },
    { type: 'presence', name: 'Email', message: 'Email es requerido.' }*/
    ],
    proxy: {
        type: 'softguardfalsaproxy',
        //url: '/Rest/Cuenta/{0}/Falsa',
        url: '/Rest/Falsa/',
        //replaceIdRegex: /\{0\}/,
        //appendId: true,
    }
});