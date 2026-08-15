Ext.define('IPRSManager.controller.IPRSManagerController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'IprServiciosSearchModel' ],
    views : [  ],

    init : function(config) {
		this.control({
			'viewport' : {
				afterrender : this.initview,
                
			}
        });
	},
	initview : function(view) {
        this.application._nameModule  = 'IPRSManager';
        // Lo agregamos al panel
        // se movio la configuracion a administratorsearch, lo oculto
        /*
    	var myPanel = Ext.getCmp('center');
        
        var iprserviciosgridview = Ext.widget('iprserviciosgridview',{
         	title: 'Servicios IPR',
		    closable: false
		});	
        
        
		myPanel.add(iprserviciosgridview);
        */
        
        this.addServices(view);
	},
    
    addServices(view) {
        var center = view.down('#center');
        
        // BC 356860596 - Se agrega que filtre los Servicios IPRS Habilitados, hago un IF previo, 
        // porque no se si este Controller se utiliza en otra APP, pero para esta de IPRSManager, viene Undefined
        // por lo tanto, lo "actualizo" con lo que quiero mostrar.
        if (!view.filters) {
            view.filters = [{
                property: 'iprs_status',
                value: 'A'
            }]
        }
        
        // busco los servicios
        var socketstore =Ext.create('Ext.data.Store',{
            model: this.getIprServiciosSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        });
        
        socketstore.load({
            callback:function(records, operation, success){
                // por cada servicio creo una paleta
                Ext.Array.each(records,function(record){
                    var servicegrid = Ext.widget('iprsmonitorview',{
                        translate:false,
                        tabConfig: {translate:false},
                        title: getLocale('Eventos')+' '+record.data.iprs_ccnombre,
                        record: record,
                        closable: false,
                        itemId: record.data.iprs_ccnombre.replaceAll(' ','')
                	});	
            		// agrego la paleta creada
                    center.add(servicegrid);
                })
            }
        });
    }
});
