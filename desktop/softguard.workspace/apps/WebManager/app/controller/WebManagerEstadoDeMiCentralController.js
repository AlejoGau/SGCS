Ext.define('WebManager.controller.WebManagerEstadoDeMiCentralController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'WebManagerEstadoDeMiCentralView', 'chartestadoeventosactualesview', 'charteventosdeldiaporoperadorview', 'charteventosportipodehoyview', 'chartresoluciondeeventosdeldiaview', 'gridultimos25eventosalertaview', 'chartestadoeventospendientesporprioridadview', 'chartresoluciondeeventosdeldiaFULLview', 'charteventosdeldiaporoperadorFULLview' ],
    
    refreshPanel : function(view) {  
        
        /* Pregunto si la VIEW esta visible, para correr la actualizacion en la que se encuentra abierta y no en las demas */
        if (view.isVisible()){
           /* Armo array con los paneles de la vista WebManagerRefreshPanelController que maneja este controlador
           con view.query + nombre del widget creado 
            */
            var panels = view.query('webmanagerrefreshpanel')
            /* Recorro cada panel del array y le asigno un evento a realizar */
            Ext.Array.each (panels, function(panels){
                /* Refresco de paneles, tomo cada panel y lo envio como parametro al listener del controller de RefreshPanelController*/
                var panel = this;            
                panel.fireEvent('doRefresh',panel);
            }) 
        }
        
        
    },
    
    initView : function(view) {
        var controller = this;
        /* Declaro la tarea a ejecutar por el controller cada X interval */
        var runner = new Ext.util.TaskRunner();
        /* Busco la view que maneja este controller para utilizarla 
         * En este caso no hace falta, esta declarada en el init
         */
        task = runner.start({
            /* Paso como argumento a la tarea la view a refrescar */
            args: [view],
            run: controller.refreshPanel,
            interval: 60000
        });
    },
    
    
    init : function(config) {
       this.control({
            'webmanagerestadodemicentralview' : {
    	        afterrender : this.initView
		    }
       })
    },
    
});