Ext.define('Tablas.model.VehicleBrandModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: ['Id', 'Name'],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/VehicleBrand/'
    }
});