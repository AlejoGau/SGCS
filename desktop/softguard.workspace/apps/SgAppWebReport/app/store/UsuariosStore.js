Ext.define('SgAppWebReport.store.UsuariosStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 999,
    remoteFilter: true,
    sorters: [{
        property : 'o.udw_idKey',
        direction: 'ASC'
    }],
    storeId: 'usuariosStore',    
    model: 'SgAppWebReport.model.AdministratorSearchModel'
});