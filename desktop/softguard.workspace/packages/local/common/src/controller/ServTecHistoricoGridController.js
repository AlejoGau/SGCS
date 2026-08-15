//MIGRADO2024
Ext.define('Common.controller.ServTecHistoricoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ServTecHistoricoSearchModel', 'ServTecHistoricoModel' ],
    views : [ 'ServTecHistoricoGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'servtechistoricogridview' : {
            	afterrender : this.initView,
                itemdblclick: this.onItemClick,
			},
            'servtechistoricogridview button[action=search]': {
                click: this.onSearchClick
            },
            'servtechistoricogridview button[action=getall]': {
                click: this.onGetAllClick
            },
		});
	},
     onItemClick: function(view,record){
        Ext.widget('window',{
            title: 'Observacion',
            width: 400,
            height: 400,
            
            items: [
                   {
                    xtype : 'displayfield',            
                    fieldLabel: 'Fecha',
                    value : Ext.Date.format(record.get('stl_tFechaHora'), 'd-m-Y H:i:s')
                },{
                   
                    xtype : 'displayfield',            
                    value: 'Observacion',
                },{
                   
                    xtype : 'component',      
                    html : record.get('stl_cObservacion'),
                },{
                    xtype : 'displayfield', 
                    fieldLabel: 'Accion',
                    value : record.get('stl_cAccion'),
        		} 
                ]
        }).show();
        
    }, // cierro init
	initView : function(view) {
        view.filters = [
                    {
                        property:'stl_iServicio',
                        value: view.record.get('Id')
                    }
            ]
        view.store =Ext.create('Ext.data.Store',{
            model: this.getServTecHistoricoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
	},
    
 
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('servtecproductosordengridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) { 
        var view = button.up('servtecproductosordengridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
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
    }
 
});