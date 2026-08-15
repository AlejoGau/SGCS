Ext.define('Trackguard.store.VehicleTipoSearchStore', {
    extend : 'Ext.data.Store',
    model : 'Trackguard'+'.model.CuentaTipoSearchModel',
    id: 'VehicleTipoSearchStore',
    autoLoad: false
});