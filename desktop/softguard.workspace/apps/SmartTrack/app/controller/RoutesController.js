Ext.define('SmartTrack.controller.RoutesController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'tg_routesModel' ],
    views : [ 'RoutesView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            'routesview' : {
                beforerender : this.initview
            }
        });
	}, // cierro init

	initview : function(view) {
        var myPanel = view.down('#centerroutes');  
       
        var newTab = Ext.widget('routesgridview',{
            title: 'Lista',
        	closable: false,
    		record: view.record,
            module:view.module
        });	

        var newTabAgenda = Ext.widget('routesagendaformview',{
            title: 'Agenda',
        	closable: false,
    		record: view.record,
            module:view.module
        });	        

		// agrego la paleta creada
		myPanel.add(newTab);
        myPanel.add(newTabAgenda);
		myPanel.setActiveTab(newTab);
    }
})