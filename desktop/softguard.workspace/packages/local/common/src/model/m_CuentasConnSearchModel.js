//MIGRADO2024
Ext.define( 'Common.model.m_CuentasConnSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        { name: 'cco_idKey', type: 'int' },
        { name: 'cco_iidCuenta', type: 'int' },
        { name: 'ipc_cdescripcion', type: 'string' },
        { name: 'iprs_ccnombre', type: 'string' },
        { name: 'cco_iConexion', type: 'int' }
    ],
    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/search/m_CuentasConn_itemSearch',
        appendId: true
    }
});