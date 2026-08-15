//MIGRADO2024
Ext.define('Common.controller.PPushQueueSPController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'PPushQueueCRMSearchModel', 'PPushQueueSearchModel' ],
    views : [ 'PPushQueueSPView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'ppushqueuespview' : {
            	afterrender : this.initView,
                itemdblclick: this.onItemClick
			},
            'ppushqueuespview button[action=search]': {
                click: this.onSearchClick
            },
            'ppushqueuespview button[action=getall]': {
                click: this.onGetAllClick
            },             
		});
	},
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('ppushqueuespview');
        var store = view.getStore();
        
        view.down('#fechacreacion').setValue('');
        
        store.clearFilter(true);
        store.filter([
            {
                property: 'sp.Id',
                value: view.record.get('Id')
            }
        ]);
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('ppushqueuespview');
        
        /* Obtengo los valores de los filtros */
        var store = view.getStore();
        
        var fechacreacion = view.down('#fechacreacion').getValue();
        /* Limpio los filtros - probar por lo de idcuenta */
        store.clearFilter(true);
        
        /* Cargo en la variable de filtros lo mismo declarado en la view */
        var filters = Ext.clone(view.filters);
                
        if(fechacreacion) {
            filters.push({ 
                property: 'o.ppq_fechacreacion',
                value: Ext.Date.format(fechacreacion, 'Y-m-d H:i:s')
            },{
                property: 'o.ppq_fechacreacionEND',
                value: Ext.Date.format(fechacreacion, 'Y-m-d H:i:s')
            });
        }
        
        /* recargo el Store con los filtros */
        if (filters.length > 0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
    },
    
    onItemClick: function(grid, record, item, index, e, options) {
        var view = grid.up('ppushqueuespview');
        var estado = record.get('ppq_estado');
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            title : getLocale("Mensaje"),
            translate: false,
            width : 450,
        	height : 300,
			border : false,
			items : [{
                xtype : 'displayfield',  
				fieldLabel : 'Destino',
                value: record.get('cnombreDestino')                
            },{
                xtype : 'displayfield',  
				fieldLabel : 'Fecha',
                value: Ext.Date.format(new Date(record.get('ppq_fechacreacion')), 'd/m/Y H:i:s')
                
            },{
                xtype : 'displayfield',  
                fieldLabel : 'Estado',
                renderer: function (value, metadata, record) {
                    switch (estado) {
                        case 0:
                            return getLocale('No leido');
                        break;
                        case 1:
                            return getLocale('Leido');
                        break;
                    }
                }
            },{
                xtype : 'displayfield',
                fieldLabel : 'Asunto',
                value : record.get('ppq_msg'),
                renderer : function(value, metadata, record, item){
                    var notificacion = Ext.JSON.decode(value);
                
                    //console.log(notificacion.data.action);
                    var action = notificacion.data.action;
    
                    /* Guardo en el campo Action el record del mensaje */
                    if (action === "INBOX_MESSAGE") {
                        return notificacion.notification.text
                    }     
                }
            },{
                xtype : 'displayfield',
                fieldLabel : 'Mensaje',
                value : record.get('msgBody')
            }]    
        });
    	win.show();
    },
    
    initView : function(view) {
        
        console.log(view);
        
        view.filters = [];
       
        if (view.record){
            view.filters = [
                {
                    property: 'sp.Id',
                    value: view.spId
                }
            ]
        }
        
        view.store = Ext.create('Ext.data.Store',{
            model: this.getPPushQueueSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters : view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
    }
});