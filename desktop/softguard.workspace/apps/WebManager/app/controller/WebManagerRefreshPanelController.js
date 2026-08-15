Ext.define('WebManager.controller.WebManagerRefreshPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'WebManagerRefreshPanelView' ],
    
    
    onRefreshPanelClick: function(button, event, options) {
        var view = button.up('webmanagerrefreshpanel');
        this.doChildRefresh(view);
    },
    
    onDoRefresh : function(view, event, options){
        this.doChildRefresh(view);
    },
    
    doChildRefresh: function(view) {
        var item = view.items.items[0];
        item.fireEvent('refreshData');
        /* carga de informacion por refresh para las graficas bar3D que tienen scroll
         * y un contenedor en el medio 
         */
        var item2 = view.items.items[0].items.items[0];
        item2.fireEvent('refreshData');
    },
    
    /* Tooltip para el help de cada grafico */
    onLoadHelp : function(button, event, options) {
        var view = button.up('webmanagerrefreshpanel');
        this.doChildLoadHelp(view);
    },
    doChildLoadHelp : function(view) {
        var item = view.items.items[0];
        item.fireEvent('loadHelp');
        /* carga de helper para las graficas bar3D que tienen scroll
         * y un contenedor en el medio 
         */
        var item2 = view.items.items[0].items.items[0];
        item2.fireEvent('loadHelp');
        
    },
    
    
    /* Inicio del Controllador */
    init : function(config) {
        this.control({
            'webmanagerrefreshpanel #refreshTool' : {
                click: this.onRefreshPanelClick  
            },
            'webmanagerrefreshpanel' : {
                doRefresh : this.onDoRefresh
            },
            'webmanagerrefreshpanel #helperTool' : {
                click : this.onLoadHelp
            }
        })
    },

});