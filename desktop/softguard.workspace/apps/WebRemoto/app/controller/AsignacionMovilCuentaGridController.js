Ext.define('WebRemoto.controller.AsignacionMovilCuentaGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventosPendientesSearchModel', 'AlarmasEnEventosPendientesSearchModel', 'm_asignacion_movilPendientesSearchModel' ],
    views : [ 'AsignacionMovilCuentaGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'asignacionmovilcuentagridview' : {
            	afterrender : this.initView,
                itemdblclick: this.onItemClick,
               
			},
            'asignacionmovilcuentagridview button[action=search]': {
                click: this.onSearchClick
            },
            'asignacionmovilcuentagridview button[action=getall]': {
                click: this.onGetAllClick
            }
		});
	},
    
    
    onItemClick: function(view,record){
        var rec_iid = record.get('rec_iid');
        var nombreEvento = '['+record.get('rec_calarma') +  ' - ' +record.get('cod_cdescripcion')+']';
        var title = getLocale('Mapguard');
        var evento =Ext.create('Ext.data.Store',{
            model: this.getEventosPendientesSearchModelModel(),          
            remoteSort: true,
            autoDestroy: true,
            pageSize: 1,
            remoteFilter:true,
            filters:[{
                property:'rec_iid',
                value:record.get('rec_iid')
            }]
        }).load({callback:function (records) {
            
            Ext.widget('window',{
                title: 'Asignacion',
                width: 900,
                height: 600,
                layout: 'fit',
                items:[Ext.widget('mapguardeventosview',{
                    record: records[0],
                    title: title,
                    keepSelected: true,
                    forceCuenta: true,
                    closable: true,
                    closeAction: 'destroy',
                    autoDestroy: true,
                    translate: false,
                    operadorId : view.up('viewport').operadorId,
                    preventHeader:true,
                    header:false,
                    forceEvaluateData: true //sirve para que verifique si tiene los datos necesarios para iniciar
            	})]
            }).show();
        
        }})
    },

	initView : function(view) {
        view.filters = [{
            property:'amv_estado:ININT',
            value:'1,11,12'
        }];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getM_asignacion_movilPendientesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        
        var storeComboAlarmas =Ext.create('Ext.data.Store',{
            model:this.getAlarmasEnEventosPendientesSearchModelModel(),// this.getSoftguardCodigoAlarmaModelModel(),
            pageSize: 500,
            remoteSort: false,
            remoteFilter: false,
            filters: [
                    
                ]
        })
        view.down('#comboalarmas').bindStore(storeComboAlarmas);
        storeComboAlarmas.load();
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    
   

    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('asignacionmovilcuentagridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        
        view.down('#cuentaMovil').setValue('')
        view.down('#dealerMovil').setValue('')
        view.down('#cuentaEvento').setValue('')
        view.down('#dealerEvento').setValue('')
        view.down('#comboalarmas').setValue('')
        
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('asignacionmovilcuentagridview');
        
        var store = view.getStore();
        store.clearFilter(true);
        
        var filters = Ext.clone(view.filters);
        
        if(view.down('#cuentaMovil').getValue()) {
            filters.push({
                property:'cue_ncuentaMovil',
                value:view.down('#cuentaMovil').getValue()
            })
        }
        
        if(view.down('#dealerMovil').getValue()) {
            filters.push({
                property:'cue_clineaMovil',
                value:view.down('#dealerMovil').getValue()
            })
        }
        
        
        if(view.down('#cuentaEvento').getValue()) {
            filters.push({
                property:'cue.[cue_ncuenta]:LIKE',
                value:view.down('#cuentaEvento').getValue()
            })
        }
        
        if(view.down('#dealerEvento').getValue()) {
            filters.push({
                property:'cue.[cue_clinea]:LIKE',
                value:view.down('#dealerEvento').getValue()
            })
        }
        
        if(view.down('#comboalarmas').getValue()) {
            filters.push({
                property:'cod_ccodigo',
                value:view.down('#comboalarmas').getValue()
            })
        }
        
        if(view.down('#tipodispositivo').getValue()) {
            filters.push({
                property:'tipoDispositivo',
                value:view.down('#tipodispositivo').getValue()
            })
        }
        
         
       
        
       
        store.filter(filters);
        
        
       
    },
    
   

});