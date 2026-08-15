Ext.define('Trackguard.controller.GeocercaGroupGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'GeoGroupModel' ],
    views: [ 'GeocercaGroupGridView' ],
    init: function(config) {
        this.control({
            'geocercagroupgridview': {
                afterrender: this.initView
            },
            'button[action=btnMostrar]': {
                click: this.onFilter
            }
        });
    },

    initView: function(view) {
        var record = view.record;        
        var filter = [];
        var geoGroupStore = Ext.create('Ext.data.Store', {
            model: this.getGeoGroupModelModel()
        });
        
        var comboGrupo = view.down('#comboGrupo');
        view.bindStore(geoGroupStore);
        geoGroupStore.load();
    },
    
    onFilter: function(button){
        console.log("ONFILTER");
        var flotaGPSControllerCall = this.getController('FlotaGpsController');
        var grid = button.up('geocercagroupgridview'); // Find the grid in the component hierarchy
        var selectedRecords = grid.getSelectionModel().getSelection(); // Get selected records
        console.log(selectedRecords);
        
        Ext.Array.each(selectedRecords, function(record) {
            flotaGPSControllerCall.filterGeocercaGroup(record.get('Id'))
        });
    }
});
