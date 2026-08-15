//MIGRADO2024
Ext.define( 'Common.model.m_CuentasConnModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'cco_idKey', type: 'int' },
        {name: 'cco_iidCuenta', type: 'int'},
        {name: 'cco_iConexion', type: 'int'}
    ],
    proxy: {
        type: 'rest',
        url: '/rest/m_CuentasConn/'
    }
});