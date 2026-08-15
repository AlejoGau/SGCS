Ext.define('SgAppNotificationReport.controller.PPushQueueCRMController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'PPushQueueCRMSearchModel' ],
    views : [ 'PPushQueueCRMView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'ppushqueuecrmgridview' : {
        		afterrender : this.initView,
                itemdblclick: this.onItemClick
			},
            'ppushqueuecrmgridview button[action=search]': {
                click: this.onSearchClick
            },
            'ppushqueuecrmgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'ppushqueuecrmgridview button[action=export]': {
                click: this.onExportClick
            }             
		});
	},
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('ppushqueuecrmgridview');
        var store = view.getStore();
        
        store.clearFilter(true);
        store.load();
        
        view.down('#fechacreacion').setValue('');

    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('ppushqueuecrmgridview');
        
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
        var view = grid.up('ppushqueuecrmgridview');
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
                value : record.get('msgTitle')
            },{
                xtype : 'displayfield',
                fieldLabel : 'Mensaje',
                value : record.get('msgBody')/*,
                renderer : function(value, metadata, record, item){
                    var notificacion = Ext.JSON.decode(value);
                
                    //console.log(notificacion.data.action);
                    var action = notificacion.data.action;
    
                    // Guardo en el campo Action el record del mensaje 
                    if (action === "INBOX_MESSAGE") {
                        return notificacion.notification.text
                    }     
                }*/
            }]    
        });
    	win.show();
    },
    
    initView : function(view) {
        view.filters = [];
       
        if (view.record){
            view.filters = [
                {
                    property: 'ppq_idcuenta',
                    value: view.record.get('Id')
                }
            ]
        }
        
        view.store = Ext.create('Ext.data.Store',{
            model: this.getPPushQueueCRMSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters : view.filters
        })
        view.bindStore(view.store);

        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
    },
    
    /* Funcion de exportacion */
    onExportClick : function(button, e, eOpts) {
        var view = button.up('ppushqueuecrmgridview');
        var store = view.getStore();
        var filters = store.filters;
        var url = '/handler/ReportePPushQueueCRMGridHTML';
        
        /* Agrego los filtros aplicados al Store en la URL */
        var min = [],
            length = filters.getCount(),
            i = 0;
        for (i = 0; i < length; i++) {
            min[i] = {
                property: filters.items[i]._property,
                value   : filters.items[i]._value
        }
        console.log(filters);
        }
        url = Ext.urlAppend(url,'filter='+Ext.encode(min));
        
        /* Obtengo por separado FechaDesde y FechaHasta para el encabezado */
        var fechacreacion = view.down('#fechacreacion').getValue();
        if(fechacreacion) {
            url = Ext.String.urlAppend(url, 'fechacreacion='+Ext.Date.format(new Date(fechacreacion),'d/m/Y'));
        }
        
        /* Agrego _DC */
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        /* Pongo el flag de export en Yes y procede a exportar */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }
        
        /* Redirijo a la URL armada */
        location.href = url;
        
    }

});