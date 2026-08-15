Ext.define('Trackguard.store.VehicleModelStore', {
    extend : 'Ext.data.Store',
    model : 'Trackguard'+'.model.VehicleModelSearchModel',
    id: 'VehicleModelStore',
	autoLoad: false
});