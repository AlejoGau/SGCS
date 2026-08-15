Ext.define('Trackguard.controller.GeocercasProgramadasGeocercasHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GeocercaSearchModel', 'tg_route_geofencesModel' ],
    views : [ 'GeocercasProgramadasGeocercasHelperView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			'geocercasprogramadasgeocercashelperview' : {
						beforerender : this.initview
					},
					'geocercasprogramadasgeocercashelperview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'geocercasprogramadasgeocercashelperview button[action="map"]' : {
    				//	click : this.onMapClick
					}
    				
                });
	}, // cierro init
 
    
	initview : function(view) {
        

        view.filters = [ {
                property: 'Cuenta',
                value: view.record.get('cuentaId')
            } ];     
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getGeocercaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.down('#gridcheckpoints').bindStore(view.store);
        view.store.load();
        
	},


	onSaveClick : function(button, event, options) {		
        
      
        var view = button.up('geocercasprogramadasgeocercashelperview');
        var win = button.up('window');
        var controller = this;
        
        
        var selectionModel = view.down('#gridcheckpoints').getSelectionModel();   
        var selectedRecords = selectionModel.getSelection();
        var selectedRecordsLen = selectedRecords.length;
        var i = 1;
        
        Ext.Array.each(selectedRecords, function(r){
        
            var model = controller.getTg_route_geofencesModelModel();
            var record = model.create({
                'geofenceid': r.get('Id'),
                'aftertolerance': view.down('#toleranciapost').getValue(),
                'beforetolerance': view.down('#toleranciapre').getValue(),
                'routeId':view.record.get('Id')
            });
            record.save({
        		scope : this,
    			callback : function(record, operation) {
                      
    			}
			});
            
            if(selectedRecordsLen <= i) {
                view.caller.fireEvent('objectchanged',view.caller,record);
                win.close();
            }
            i++;
        
        })
        
       

	}
   
});