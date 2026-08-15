//MIGRADO2024
Ext.define('Common.controller.ServTecTabsController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ServTecTabsView' ],
    init : function(config) {
        // this.initConfig(config);
		// genero los eventos
		this.control({
		
            'sertectabsview' : {
                beforerender : this.initview,
			}
		});
	}, // cierro init
	initview : function(view) {
            var tabpanel = view.down('tabpanel');
            var initStore = view.initStore;
            var initRecord = view.initRecord;
            var title = getLocale('Orden')+' ('+initRecord.get('stc_inumero')+')';
            var newTab = Ext.widget('sertecroview',{
                initStore: initStore,
                initRecord: initRecord,
                translate: false,
                title: title,
                closable: true,
                loseAction: 'destroy' 
            });
            
           
            // agrego la paleta creada
            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
        
    }
});