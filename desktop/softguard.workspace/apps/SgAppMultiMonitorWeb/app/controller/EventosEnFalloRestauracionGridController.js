Ext.define('SgAppMultiMonitorWeb.controller.EventosEnFalloRestauracionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventosEnFalloRestauracionSearchModel', 'SoftguardCodigoAlarmaModel' ],
    views : [ 'EventosEnFalloRestauracionGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'eventosenfallorestauraciongridview' : {
        		afterrender : this.initView,
                objectrestaurar: this.onObjectRestaurar
               
			},
            'eventosenfallorestauraciongridview button[action=search]': {
                click: this.onSearchClick
            },
            'eventosenfallorestauraciongridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'eventosenfallorestauraciongridview button[action=play]': {
                click: this.onPlayClick
            },
            'eventosenfallorestauraciongridview button[action=stop]': {
                click: this.onStopClick
            }
            
            
		});
	},
    
    
    onObjectRestaurar: function(rec,view) {
        
            Ext.Ajax.request({
              url: '/rest/search/RestaurarEventosEnFalloRestauracion',
              method: 'GET',
              params: {
                idKey:rec.get('Id'),
                idCtaEvento: rec.get('efr_iidCuenta'),
                cAlarmaEvento: '_RM',
                cObservacionesEvento: '['+Ext.Date.format(new Date(),'d/m/Y H:m')+'] '+this.application.UserData.UserId,
              },
              success: function(resp,operation) {
                 notify('Se restauro con exito.')
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
            model: this.getEventosEnFalloRestauracionSearchModelModel(),
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
        var view = btn.up('eventosenfallorestauraciongridview')?btn.up('eventosenfallorestauraciongridview'):btn
        var controller = this;
        view.task = Ext.TaskManager.start({
                args: [view,controller],
                run: controller.loadData,
                interval: 10000
            });
    },
    onStopClick: function (button) {
        var view = button.up('eventosenfallorestauraciongridview');
        var task = view.task;
        Ext.TaskManager.stop(task);
    },
    
    
    loadData: function (view) {
        
        
        view.store.load();
    },
     

    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('eventosenfallorestauraciongridview');
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
        
        var view = button.up('eventosenfallorestauraciongridview');
        
        var store = view.getStore();
        var cuenta = view.down('#cuenta').getValue();
        var dealer = view.down('#dealer').getValue();
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var alarma = view.down('#comboalarmas').getValue();
        
        var filters = [];
        
        if(cuenta) {
            filters.push({ 
                property: 'efr_cCuenta',
                value: cuenta,
                id:'efr_cCuenta'
            });
            
        }
        
        if(dealer) {
            filters.push({ 
                property: 'efr_cLinea',
                value: dealer,
                id:'efr_cLinea'
            });
            
        }
        
        if(fechadesde) {
            filters.push({ 
                property: 'efr_tFallaFechaHora:GTEDATESTRING',
                value: Ext.Date.format(new Date(fechadesde),'Y-m-d 00:00:00'),
                id:'efr_tFallaFechaHoradesde'
            });
            
        }
        
        if(fechahasta) {
            filters.push({ 
                property: 'efr_tFallaFechaHora:LTEDATESTRING',
                value: Ext.Date.format(new Date(fechahasta),'Y-m-d 23:59:59'),
                id:'efr_tFallaFechaHorahasta'
            });
            
        }
        
        if(alarma.join(',') != '') {
            filters.push({ 
                property: 'efr_cAlarma:IN',
                value: alarma.join(','),
                id:'efr_cAlarma'
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