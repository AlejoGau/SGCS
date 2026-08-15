Ext.define('WebManager.controller.WebManagerRecepcionDeEventosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ '' ],
    views : [ 'gridflujosenalesreceptortotalview', 'WebManagerRecepcionDeEventosView', 'chartanalisisipr30diasview', 'chartanalisispg30diasview', 'chartcategorizaciondeeventosdelmesview', 'chartcategorizaciondeeventosview', 'chartresoluciondeeventosdelmesview', 'gridflujosenalesreceptorview', 'charteventosautoprocesadosdeldiaview', 'charteventosautoprocesadosdeldiaFULLview', 'chartanalisisipr30diasFULLview', 'chartanalisispg30diasFULLview', 'chartresoluciondeeventosdelmesFULLview' ],
    
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
    
    checkRangos : function(view) {
      // Consulta de RANGOS del usuario logueado para quitar el panel que no debe verse
        var userLogueadoRangosStore = Ext.create('Ext.data.Store',{
            model: this.getModel(),
            pageSize: 500,
            remoteFilter: true,
            filters: [{
                property: 'dwm_idModules',
                value: 0
            },{
                property: 'dwm_idWeb',
                value: _UserData.udw_idKey
            }]
        }).load({callback:function (recordsLogueado) {
            
            if(recordsLogueado.length>0) {
                /* Elijo el elemento que no quiero que aparezca y lo destruyo */
                var gridflujosenales = view.down('#gridflujosenalesreceptorview');
                var gridfuljosenalespanel = gridflujosenales.up('webmanagerrefreshpanel');
                gridflujosenales.destroy();
                gridfuljosenalespanel.destroy();
            }
            else {
                /* Realizo la carga normal de la view con el Load del Store */
                var gridflujosenales = view.down('#gridflujosenalesreceptorview');
                var gridflujosenalesStore = gridflujosenales.getStore();
                gridflujosenalesStore.load();
            }
        }})  
    },
    
    init : function(config) {
       this.control({
            'webmanagerrecepciondeeventosview' : {
                beforerender : this.checkRangos
                //afterrender : this.initView
		    }
       })
    },
});
    