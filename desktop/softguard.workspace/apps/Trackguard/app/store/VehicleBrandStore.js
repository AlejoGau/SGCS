Ext.define('Trackguard.store.VehicleBrandStore', {
    extend : 'Ext.data.Store',
	model : 'Trackguard'+'.model.VehicleBrandSearchModel',
	id: 'VehicleBrandStore',
	autoLoad: true
});