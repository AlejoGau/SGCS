Ext.define('Cuenta.store.SoftguardEstadoEstadoStore', {
    extend: 'Ext.data.Store',
    storeId: 'SoftguardEstadoEstadoStore',
    model: 'Cuenta.model.NameValueIntModel',
    data: [
        {
            Name: getLocale('Habilitado'),
            Code: 'Habilitada',
            Value: 0
        },
        {
            Name: getLocale('En Prueba'),
            Code: 'En Prueba',
            Value: 1
        },
        {
            Name: getLocale('No Habilitado'),
            Code: 'No Habilitada',
            Value: 2
        },
        {
            Name: getLocale('En Prueba x Zonas'),
            Code: 'En Prueba',
            Value: 3
        },
        {
            Name: getLocale('Pedir eliminar'),
            Code: 'Eliminar',
            Value: 4
        },
        {
            Name: getLocale('Prueba parcial'),
            Code: 'Prueba parcial',
            Value: 5
        }
    ]
});