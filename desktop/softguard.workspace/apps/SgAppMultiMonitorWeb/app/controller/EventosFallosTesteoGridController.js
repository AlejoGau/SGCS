Ext.define('SgAppMultiMonitorWeb.controller.EventosFallosTesteoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventosFallosTesteoSearchModel', 'SoftguardCodigoAlarmaModel' ],
    views : [ 'EventosFallosTesteoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'eventosenfallotesteogridview' : {
            	afterrender : this.initView,
                objectrdelete: this.onObjectDelete
               
			},
            'eventosenfallotesteogridview button[action=search]': {
                click: this.onSearchClick
            },
            'eventosenfallotesteogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'eventosenfallotesteogridview button[action=play]': {
                click: this.onPlayClick
            },
            'eventosenfallotesteogridview button[action=stop]': {
                click: this.onStopClick
            }
            
            
		});
	},
    
    
    onObjectDelete: function(rec,view) {
        
            Ext.Ajax.request({
              url: '/rest/search/DeleteEventosEnFalloTesteo',
              method: 'GET',
              params: {
                idFallo:rec.get('Id')                
              },
              success: function(resp,operation) {
                 notify('Se elimino con exito.')
                 view.store.load()
              }
            });
            
    },

	initView : function(view) {
        view.filters = [];      
        var controller = this;
        


        var storeComboAlarmas =Ext.create('Ext.data.Store',{
            model: this.getSoftguardCodigoAlarmaModelModel(),
            pageSize: 500,
            remoteSort: false,
            remoteFilter: false,
            filters: [
                    
                ]
        })
        view.down('#comboalarmas').bindStore(storeComboAlarmas);
        storeComboAlarmas.load();
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getEventosFallosTesteoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        controller.onPlayClick(view)
         
	},
    
    
    onPlayClick: function (btn) {
        var view = btn.up('eventosenfallotesteogridview')?btn.up('eventosenfallotesteogridview'):btn
        var controller = this;
        view.task = Ext.TaskManager.start({
                args: [view,controller],
                run: controller.loadData,
                interval: 10000
            });
    },
    onStopClick: function (button) {
        var view = button.up('eventosenfallotesteogridview');
        var task = view.task;
        Ext.TaskManager.stop(task);
    },
    
    
    loadData: function (view) {
        
        
        view.store.load();
    },
     

    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('eventosenfallotesteogridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#cuenta').setValue('');
        view.down('#dealer').setValue('');
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#comboalarmas').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('eventosenfallotesteogridview');
        
        var store = view.getStore();
        var cuenta = view.down('#cuenta').getValue();
        var dealer = view.down('#dealer').getValue();
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var alarma = view.down('#comboalarmas').getValue();
        
        var filters = [];
        
        if(cuenta) {
            filters.push({ 
                property: 'eft_cCuenta',
                value: cuenta,
                id:'eft_cCuenta'
            });
            
        }
        
        if(dealer) {
            filters.push({ 
                property: 'eft_cLinea',
                value: dealer,
                id:'eft_cLinea'
            });
            
        }
        
        if(fechadesde) {
            filters.push({ 
                property: 'eft_tEventoFechaHora:GTEDATESTRING',
                value: Ext.Date.format(new Date(fechadesde),'Y-m-d 00:00:00'),
                id:'eft_tEventoFechaHoradesde'
            });
            
        }
        
        if(fechahasta) {
            filters.push({ 
                property: 'eft_tEventoFechaHora:LTEDATESTRING',
                value: Ext.Date.format(new Date(fechahasta),'Y-m-d 23:59:59'),
                id:'eft_tEventoFechaHoraHasta'
            });
            
        }
        
        if(alarma.join(',') != '') {
            filters.push({ 
                property: 'eft_cAlarma:IN',
                value: alarma.join(','),
                id:'eft_cAlarma'
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