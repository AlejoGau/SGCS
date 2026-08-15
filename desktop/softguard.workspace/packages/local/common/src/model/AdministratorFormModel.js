//MIGRADO2024
Ext.define( 'Common.model.AdministratorFormModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [ { name: 'Id', type: 'int', mapping: 'udw_idKey' },
        { name: 'Name', type: 'string', mapping: 'udw_usuario' },
        { name: 'ObjectTypeName', type: 'int', defaultValue: 3050 },
        { name: 'ObjectTypeName', type: 'string', defaultValue: 'UsersDesktopWeb' },
        { name: 'udw_idKey', type: 'int' },
        { name: 'udw_usuario', type: 'string' },
        { name: 'udw_clave', type: 'string' },
        { name: 'udw_nombre', type: 'string' },
        { name: 'udw_apellido', type: 'string' },
        { name: 'udw_empresa', type: 'string' },
        { name: 'udw_tipo', type: 'int' },
        { name: 'udw_iperfil', type: 'int' },
        { name: 'udw_estado', type: 'int' }
    ],
    proxy: {
        type: 'rest',
        url: '/rest/usersdesktopweb/',
        appendId: true,
        writer: {writeAllFields: true},
        listeners: {
            'exception': function( proxy, response, operation, eOpts ) {
                console.log('El exception  was overrided');
            }
        }
    }
});