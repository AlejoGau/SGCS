Ext.define('GestorSim.controller.ComandosEnviadosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ComandosIpModel', 'ComandosIpSearchModel' ],
    views : [ 'ComandosEnviadosGridView' ],

	init : function(config) {
		// genero los eventos
		this.control({
			'comandosenviadosgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick
			}
		});
	}, // cierro init

	initView : function(view) {
        var id = view.record.get('sim_cuenta');
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getComandosIpSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            filters : [
                {
                    property : 'cmd_idCuenta',
                    value: id
                }
            ],
            sorters: [
                {
                    property : 'cmd_tfechahora',
                    direction: 'DESC'
                }
            ] 
        })
        view.bindStore(store);
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        store.load();
	    
	},
    
    onItemClick: function(view,record){
        var cRespuesta = record.get('cmd_cRespuesta');
        try{
            var oRespuesta = JSON.parse(cRespuesta);
            var win = Ext.create('Ext.Window', {
                layout : 'fit',
            	title : record.get('cmd_cObservaciones'),
    			width : 450,
    			height : 300,
    			border : false,
                translate: false,
    			items : [
                    {
                        xtype:'propertygrid',
                        source: oRespuesta
                    }
                ]
                
    		});
    		win.show();
        } 
        catch(e){
            notifyError('No hay una respuesta válida');
            console.log(e);
        }
    }
});