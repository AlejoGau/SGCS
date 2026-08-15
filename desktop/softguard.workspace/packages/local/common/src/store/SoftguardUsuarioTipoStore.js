//MIGRADO2024
Ext.define('Common.store.SoftguardUsuarioTipoStore', {    
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'SoftguardUsuarioTipoStore',
    data : ( function() {
        var data = []

            /*if ( _uiApplicationName == 'SgAppAccessControl' ) {
                data.push(
                    {Name: getLocale('Acceso Administrador'),    Value: 5},
                    {Name: getLocale('Acceso Propietario'),    Value: 6},
                    {Name: getLocale('Acceso Visita'),    Value: 7},
                    {Name: getLocale('Acceso Proveedor'),    Value: 8}                
                );
            } else {*/
                data.push(
                    {Name: getLocale('Seleccione'),    Value: 0},
                    {Name: getLocale('Superior'),    Value: 1},
                    {Name: getLocale('Normal'),    Value: 2},
                    {Name: getLocale('Bajo'),    Value: 3}
                )
           // }
     

        return data;
    })() 
});