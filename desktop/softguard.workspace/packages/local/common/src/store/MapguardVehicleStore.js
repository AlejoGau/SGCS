//MIGRADO2024
Ext.define('Common.store.MapguardVehicleStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.MapguardModel',
    storeId: 'MapguardVehicleStore',
    remoteFilter: true,
	autoload: true
});