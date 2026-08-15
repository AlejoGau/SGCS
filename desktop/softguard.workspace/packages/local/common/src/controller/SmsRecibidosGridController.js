//MIGRADO2024
Ext.define('Common.controller.SmsRecibidosGridController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
            models : [ 'SmsRecibidosModel', 'SmsRecibidosSearchModel' ],
            views : [ 'SmsRecibidosGridView' ],
    init: function () {
        // genero los eventos
        this.control({
            'smsrecibidosgridview': {
                afterrender: this.loadData,
                itemdblclick: this.onItemClick
            },
            'smsrecibidosgridview button[action=refresh]': {
                click: this.onRefreshClick
            },
            'smsrecibidosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'smsrecibidosgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'smsrecibidosgridview button[action=export]': {
                click: this.onExportClick
            }
        });
    }, // cierro init
    
    
    onItemClick: function(grid,record,item,index,e,options){
        
        var view = grid.up('smsrecibidosgridview');
        var title = '('+record.get('rec_cContenido')+') '+getLocale('Sms transmitidos');
 
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            title : title,
            translate: false,
            width : 450,
    		height : 300,
			border : false,
			items : [
                    {
                        xtype : 'displayfield',  
        				fieldLabel : 'Destino',
                        value: record.get('rec_cContenido')
                        
                    },{
                        xtype : 'displayfield',  
						fieldLabel : 'Fecha',
                        value: Ext.Date.format(new Date(record.get('rec_tFechaHora')), 'Y/m/d H:i:s')
                        
                    },
					
					{
                        xtype : 'displayfield',                    	
                        value: 'Asunto'
                        
                    },
                    {
                        xtype : 'displayfield',
                        value: record.get('rec_cObservaciones')
                        
                    }
                ]
		});
		win.show();
        
    },  
    
    loadData: function (view) {
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
       /* var mystore =Ext.create('Ext.data.Store',{
            model: this.getSmsSearchModelModel()
        });
        mystore.load();*/
       /* var record = record;
        if (record){
            var _rec_iid = record.get('rec_iid');
            
            // una vez que cargue el store hago el binding con la view
            mystore.load({rec_iid:_rec_iid,store:mystore,panel:panel,callback: this.doBindStore});
        }*/
        
        var record = view.record;
        
        view.filters = [];
        
        if (record){
            view.filters = [
                    {
                        property: 'rec_iidcuenta',
                        value : record.get('cue_iid')
                    }
                ];
                
                 //view.columns[2].setVisible(false);
                 //view.columns[2].setTriggerVisible(false) 
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getSmsRecibidosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: [{
                 property: 'rec_tFechaHora',
                 direction: 'DESC'
             }],
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
        
        
        if(view.showMaximizer != false) {
             view.addTool({
                    type: 'maximize', 
                    itemId: 'maximizer',
                    handler: function(event,img,view,tool){
                        var view = tool.up('smsrecibidosgridview');
                        var tabpanel = tool.up('tabpanel');
                        
                                                
                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                            title : 'Sms recibidos',
                        	closeAction : 'hide',
                			width : 750,
                			height : 550,
                			border : true,
                            modal: false,
                            view: view,
                			items : [
                                {
                                    xtype: 'smsrecibidosgridview',
                                    caller: view,
                                    showMaximizer: false,
                                    record: record
                                    
                                }
                            ]
                		});
                        
                        win.show();
                        
                    }
                });
                
             
                
         }
         
         
         
         
        if (view.hideColumns){
            Ext.Array.each(view.hideColumns, function(index){
                var column =view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.hide();
            });
        }
        
        if (view.showColumns){
            Ext.Array.each(view.showColumns, function(index){
                var column =view.down("gridcolumn[dataIndex=" + index + "]");
                if (column) column.show();
            });
        }
        // BC 404430734 - Cargo la seguridad del modulo en base CuentaView (Si se abre notificaciones desde AdminCuentas / DealerSearch)
         var existCuentaView = view.up('cuentaview')
         if ( existCuentaView )
            var _security = view.up('cuentaview').security
         
         if ( _security ) {
             var btnExport = view.down('#btnExport');
             
             if (_security.rights && !_security.rights.exportar && btnExport){
                btnExport.hide();
            }
         }
        
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            var view = operation.panel;
            view.bindStore(operation.store);
            
            var timeline = view.up('tabpanel').down('eventotimelinegridview');
            
            Ext.Array.each(records, function(record){
                timeline.store.add({
                    fecha: record.get('rec_isoFechaHora'),
                    usuario: record.get('ope_cnombre'),
                    comentario: record.get('rec_cObservaciones'),
                    iconCls: 'icon-email'
                });
            })
        }
    },
    
    onRefreshClick: function(button, object, options){
        var view= button.up('smsrecibidosgridview');
        this.doRefresh(view);
    },
    
    doRefresh: function(view){
        if(!view){
            view = Ext.ComponentQuery.query('smsrecibidosgridview')[0];
        }
        
        var _rec_iid = view.record.get('rec_iid');
        var store = view.getStore();
        
        store.load({
            rec_iid:_rec_iid,
            store:store,
            panel:view
        });
    },
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('smsrecibidosgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('smsrecibidosgridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        store.clearFilter(true);
        var filters = Ext.clone(view.filters);
        
        
        
        if(fieldName == 'cue_clinea-cue_ncuenta') {
            var querySplit =  query.split('-');
            filters.push({ 
                    property: 'cue_clinea',
                    value: querySplit[0]
                });
            filters.push({ 
                    property: 'cue_ncuenta',
                    value: querySplit[1]
                });
        } else {
        
            if (fieldName){
                filters.push({ 
                    property: fieldName+':LIKE',
                    value: query
                });
                
            }
            
        }
        
        
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        
        if(fechadesde) {
            filters.push({ 
                    property: 'rec_tFechaHora:GTE',
                    value: fechadesde
                });
        }
        
        if(fechahasta) {
            
            fechahasta = Ext.Date.add(fechahasta, Ext.Date.HOUR, 23);
            fechahasta = Ext.Date.add(fechahasta, Ext.Date.MINUTE, 59);
            fechahasta = Ext.Date.add(fechahasta, Ext.Date.SECOND, 59);
            
            filters.push({ 
                    property: 'rec_tFechaHora:LTE',
                    value: fechahasta
                });
        }
        
        
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
    },
    
    /* Funcion de exportacion */
    onExportClick : function(button, e, eOpts) {
        var view = button.up('smsrecibidosgridview');
        var store = view.getStore();
        var filters = store.filters;
        var url = '/handler/ReporteSmsRecibidosGridHTML';
        
        /* Agrego los filtros aplicados al Store en la URL */
        var min = [],
            length = filters.getCount(),
            i = 0;
        for (; i < length; i++) {
            min[i] = {
                property: filters.get(i).property,
                value   : filters.get(i).value
            };
        }
        url = Ext.urlAppend(url,'filter='+Ext.encode(min));
        
        /* Obtengo por separado FechaDesde y FechaHasta para el encabezado */
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        if(fechadesde) {
            url = Ext.String.urlAppend(url, 'fechadesde='+Ext.Date.format(new Date(fechadesde),'d/m/Y'));
        }
        if(fechahasta) {
            url = Ext.String.urlAppend(url, 'fechahasta='+Ext.Date.format(new Date(fechahasta),'d/m/Y'));
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