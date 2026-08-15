Ext.define('AdministratorSearch.store.ScriptsStore', {
    extend: 'Ext.data.Store',
    model: 'AdministratorSearch.model.ScriptsModel',
    storeId: 'TareaTipoStore',
    data: [
        {
            Name:getLocale('Permisos'),
            Value:'1',
            Description:getLocale('Establece los permisos necesarios en la base _Desktop'),
            Stauts:0,
            Url: '/rest/search/SGSP_Permisos'
        }
	]
});