//MIGRADO2024
Ext.define('Common.controller.SmsConmutadosGridController', {
    extend: 'Ext.app.Controller',
        stores : [  ],
        models : [ 'SmsSearchModel' ],
        views : [ 'SmsConmutadosGridView' ],
    init: function () {
        // genero los eventos
        this.control({
            'smsconmutadosgridview': {
                afterrender: this.loadData,
                itemdblclick: this.onItemClick
            },
            'smsconmutadosgridview button[action=refresh]': {
                click: this.onRefreshClick
            },
            'smsconmutadosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'smsconmutadosgridview button[action=getall]': {
                click: this.onGetAllClick
            },
        });
    }, // cierro init
    
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('smsconmutadosgridview');
        var title = '('+record.get('que_cDestino')+') '+getLocale('Sms transmitidos');
        var estado = record.get('que_nEstado');
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            title : title,
            width : 450,
        	height : 300,
			border : false,
			items : [
                {
                    xtype : 'displayfield',  
                    fieldLabel : 'Destino',
                    value: record.get('que_cDestino')
                    
                },
                {
                    xtype : 'displayfield',  
                    fieldLabel : 'Estado',
                    renderer: function(value, metadata,record){  
                        switch (estado) {
                            case 0:
                                return getLocale('Pendiente');
                            break;
                            case 1:
                                return getLocale('Enviado');
                            break;
                            case 2:
                                return getLocale('Rechazado');
                            case 3:
                                return getLocale('Conmuto a mail');
                            break;
                        }                            
                    }                    
                }                               
                ,{
                    xtype : 'displayfield',  
                    fieldLabel : 'Fecha',
                    value: Ext.Date.format(new Date(record.get('que_tfechahoraiso')), 'Y/m/d H:i:s')
                    
                },
                {
                    xtype : 'displayfield',                    	
                    value: 'Asunto'    
                },
                {
                    xtype : 'displayfield',
                    value: record.get('que_cAsunto')
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
                        property: 'cue_iid',
                        value : record.get('cue_iid')
                    },{
                        property: 'que_nEstado',
                        value : 3
                    }
                ];
                
                 //view.columns[2].setVisible(false);
                 //view.columns[2].setTriggerVisible(false)
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getSmsSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: [{
                 property: 'que_tfechahora',
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
                    var view = tool.up('smsgridview');
                    var tabpanel = tool.up('tabpanel');
            
                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title : 'Sms enviados',
                        closeAction : 'hide',
                        width : 750,
                        height : 550,
                        border : true,
                        modal: false,
                        view: view,
                        items : [
                            {
                                xtype: 'smsgridview',
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
        var view= button.up('smsconmutadosgridview');
        this.doRefresh(view);
    },
    
    doRefresh: function(view){
        if(!view){
            view = Ext.ComponentQuery.query('smsconmutadosgridview')[0];
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
        var view = button.up('smsconmutadosgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        view.down('#hasta').setValue('');
    },
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('smsconmutadosgridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var hasta = view.down('#hasta').getValue();
        
        store.clearFilter(true);
        var filters = Ext.clone(view.filters);
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
    },
});