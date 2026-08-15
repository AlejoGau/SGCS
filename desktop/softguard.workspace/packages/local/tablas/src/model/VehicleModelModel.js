Ext.define('Tablas.model.VehicleModelModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: ['Id', 'Name','VehicleBrand'],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/VehicleModelSearch'
    }
});