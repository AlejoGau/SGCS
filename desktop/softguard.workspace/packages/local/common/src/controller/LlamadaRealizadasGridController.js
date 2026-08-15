//MIGRADO2024
Ext.define('Common.controller.LlamadaRealizadasGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'LlamadasSearchModel' ],
    views : [ 'LlamadaRealizadasGridView' ],
    init : function(config) {
        // genero los eventos
		this.control({
			'llamadarealizadasgridview' : {
				afterrender : this.initView
			},
         /*   'llamadarealizadasgridview button[action=search]' : {
                click: this.onSearchClick
            },*/
            'llamadarealizadasgridview button[action=abrir]' : {
                click: this.onAbrirClick
            },
            'llamadarealizadasgridview #buscarrealizadas' : {
                click: this.onSearchClick
            },
            'llamadarealizadasgridview #todosrealizadas' : {
                click: this.onTodosClick
            }
		});
	}, // cierro init
    
	initView : function(view) {
        
        var record = view.record;
        
        if(view.abrir) {            
            view.down('#abrir').show();
        } 
           view.filter = [];
        
        
            /*if(record.get('cue_iid')) {
                filter.push({
                    property: 'rec_iidcuenta',
                    value:record.get('cue_iid')
                });
            }*/
            
            if(record) {
            
                if(record.get('rec_iid') != undefined) {
                
                    view.filter.push({
                        property: 'o.rec_iid',//property: 'o2.rec_iid',
                        value:record.get('rec_iid')
                    });
                } else {
                    view.filter.push({
                        property: 'o.rec_iidcuenta',//property: 'o2.rec_iidcuenta',
                        value:record.get('cue_iid')
                    });
                    
                }
            }
            
           view.filter.push({
                    property: 'o.rec_nestado',
                    value:8
                });
            
            
                  
        	view.store = Ext.create('Ext.data.Store', {
                model : this.getLlamadasSearchModelModel(),
                 remoteFilter: true,
            	autoload: false,
                filters: view.filter
                
            });
            
            //var toolbar = view.down('pagingtoolbar');
            //toolbar.bindStore(store);
            view.bindStore(view.store);
            view.store.load({callback:function (recordws) {
                
               console.log("llamadas recordws ",recordws)
            }});
        
        
       
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
    
    
    /*onSearchClick: function(button){
        var view = button.up('llamadagridview');
        var store = view.getStore();
        var estado = view.down('#estado');
        
        var filters = [];
        
        if (estado.getValue()){
            filters.push({ 
                property: 'stc_nestado',
                value: estado.getValue(),
                id: 'estado'
            });
        }
        
        store.filter(filters);
    }*/
    
     onSearchClick: function(button, event, options) {  
        
        var view = button.up('llamadarealizadasgridview');
        
  
      
        var filters = Ext.clone(view.filter);
        view.store.clearFilter(true);
        
       if(view.down('#telefono').getValue()) {
            
            
            filters.push( {
                property: 'o.[rec_cContenido]:LIKE',
                value: view.down('#telefono').getValue(),
                id:'telefono'
            })
        }
        
       
        
        
        if(view.down('#nombre').getValue()) {            
            
            filters.push( {
                property: 'o.[rec_cContenido]:LIKE',
                value: view.down('#nombre').getValue(),
                id:'nombre'
            })
        }
        
        
        if (view.down('#fechadesde').getValue()) {
            filters.push({ 
                property: 'o.[rec_tfechahora]:GT' ,
                value: view.down('#fechadesde').getValue(),
                id: 'fechadesde'
            });
        }
            
        if (view.down('#fechahasta').getValue()) {
            filters.push({ 
                property: 'o.[rec_tfechahora]:LT',
                value: Ext.Date.add(view.down('#fechahasta').getValue(),Ext.Date.DAY,+1),
                id: 'fechahasta'
            });
        }
        
        
        
      
        
        view.store.filter(filters);
    },
    
    
     onTodosClick: function(button){ 
        var view = button.up('llamadarealizadasgridview');
        view.store.clearFilter(true);
        view.store.filter(view.filter);
        //store.load();
        
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#nombre').setValue('');
        view.down('#telefono').setValue('');
        
      
        
        
    }
});