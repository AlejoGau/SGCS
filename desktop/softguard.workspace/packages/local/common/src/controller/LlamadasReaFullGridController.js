//MIGRADO2024
Ext.define('Common.controller.LlamadasReaFullGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'LlamadasSearchModel' ],
    views : [ 'LlamadasReaFullGridView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
			'llamadarealizadasfullgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick
			},
            'llamadarealizadasfullgridview button[action=search]' : {
                click: this.onSearchClick
            },
            'llamadarealizadasfullgridview button[action=abrir]' : {
                click: this.onAbrirClick
            }
		});
	}, // cierro init
    onItemClick: function(grid,record,item,index,e,options){
        
        var view = grid.up('llamadarealizadasfullgridview');
        var title = '('+record.get('rec_cContenido')+') '+getLocale('Llamadas realizadas');
 
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
                        value: record.get('rec_cContenido')
                        
                    },{
                        xtype : 'displayfield',  
						fieldLabel : 'Fecha',
                        value: Ext.Date.format(new Date(record.get('_rec_tfechahora')), 'Y/m/d H:i:s')
                        
                    },
					
					{
                        xtype : 'displayfield',                    	
                        value: 'Observaciones'
                        
                    },
                    {
                        xtype : 'displayfield',
                        value: record.get('rec_cObservaciones')
                        
                    }
                ]
		});
		win.show();
        
    },  
	initView : function(view) {
        var record = view.record;
        
        if(view.abrir) {            
            view.down('#abrir').show();
        } else {
            var filter = [];
        
        
            if(record.get('cue_iid')) {
                filter.push({
                    property: 'o.rec_iidcuenta',
                    value:record.get('cue_iid')
                });
            }
            
           filter.push({
                    property: 'o.rec_nestado',
                    value:8
                });
            
            
                  
        	var store = Ext.create('Ext.data.Store', {
                model : this.getLlamadasSearchModelModel(),
                filters: filter
                
            });
            
            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(store);
            view.bindStore(store);
            store.load({callback: function (records) {
                console.log(records, store)
            
            }});
        }
        
       
	},
    
    onAbrirClick: function(button){
        
        var view = button.up('llamadarealizadasgridview');
        
        var newView = Ext.widget('llamadarealizadasgridview',{
            abrir: false,            
            scope: this,
            record: view.record
        }
        );
        
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: '',
            height: 400,
            width: 400,
            modal: false, 
            items: newView,
            closable: true,
            layout: 'fit'
        }).show();
    },
    
    
    onSearchClick: function(button){
        var view = button.up('llamadagridview');
        var store = view.getStore();
        var estado = view.down('#estado');
        
        var filters = [];
        
        if (estado.getValue()){
            filters.push({ 
                property: 'o.stc_nestado',
                value: estado.getValue(),
                id: 'estado'
            });
        }
        
        store.filter(filters);
    }
});