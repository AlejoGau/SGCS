//MIGRADO2024
Ext.define('Common.controller.VehicleConductorListController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardUsuarioModel' ],
    views : [ 'VehicleConductorGridView' ],
    init: function (config) {
        var me=this;
        // genero los eventos
        this.control({
            'gridconductor':{
                expand: this.loadData
            },
            'flotagpsview' : {
                vehicleSelected: this.onVehicleSelected
            }
            
        });
    
    }, // cierro init
    
    onVehicleSelected: function(record, view){
        var dataPanel = view.down('#datapanel');
        if (dataPanel)
        var grid = dataPanel.down('gridconductor');
        
        if (grid){
            grid.record = record;
            if (!grid.collapsed){
                this.loadData(grid);
            }
        }
        
    },
    
    loadData: function (view) {
        var record = view.record;
        if (record){
            // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
            var mystore =Ext.create('Ext.data.Store',{
                model: 'Common.model.SoftguardUsuarioModel'
                /*
                sorters: [
                    {
                        property : 'ObjectName',
                        direction: 'ASC'
                    }
                ]*/
            });
            
            var _ObjectId = view.record.get('cue_iid');
            
            // una vez que cargue el store hago el binding con la view
            mystore.load({ObjectId:_ObjectId,view:view,store:mystore,callback: this.doBindStore});
        }
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            operation.view.bindStore(operation.store);
        }
    }
});