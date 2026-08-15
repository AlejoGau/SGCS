Ext.define('Trackguard.controller.TG_MantenimientoHistoricoVehiculoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TG_MantenimientoHistoricoVehiculoServiciosSearchModel' ],
    views : [ 'TG_MantenimientoHistoricoVehiculoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'manthistoricovehiculogridview' : {
        		afterrender : this.initView,
                objectchanged: this.objectChanged
            },
            'manthistoricovehiculogridview button[action=getall]' : {
                click : this.onGetAll
            },
            'manthistoricovehiculogridview button[action=search]' : {
                click : this.onSearchClick
            },
            /* Agrego los eventos de los iconos para Modificar / Crear uno nuevo */
            'manthistoricovehiculogridview actioncolumn' : {                
                onItemClick : this.onItemClick
            },
        })
    },

    initView : function(view) {
        var controller = this;
        var idispositivomovil = view.idispositivomovil;
        
        /* Obtengo el numero de compania del usuario */ 
        var usuarioLogueadoCompany = controller.application.UserData.Company;
        
        view.store = Ext.create('Ext.data.Store',{
            model: this.getTG_MantenimientoHistoricoVehiculoServiciosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{
                property: 'tgmh_dfecha',
                direction: 'DESC',
                id: 'dfecha'
            }],
            filters: [{
                property : 'tgmh_idispositivomovil',
                value : idispositivomovil,
                id: 'idispositivomovil'
            }/*
            // con filtrar por vehiculo alcanza saco el filtro por organizacion para ver todos los mentenimientos sin importar que organizacion estoy parado.
            ,{
                property : 'ms.tgms_iorganizacion',
                value : usuarioLogueadoCompany
            }*/]
            
        })
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.bindStore(view.store);
        view.store.load();
    },
    
    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },
    
    onGetAll : function(button, event, options) {
        var controller = this;
        var view = button.up('manthistoricovehiculogridview');
        var store = view.getStore();
        /* Obtengo el numero de dispositivompovil
         * y el numero de compania del usuario
         */
        var idispositivomovil =  view.idispositivomovil;
        var usuarioLogueadoCompany = controller.application.UserData.Company;
        /* Limpio los campos del Menu Filtro */
        view.down('#fechaDesde').setValue('');
        view.down('#nombreServicio').setValue('');
        view.down('#descripcionServicio').setValue('');
                
        var filters = [];
        var filters = [
            {
                property : 'tgmh_idispositivomovil',
                value : idispositivomovil,
                id: 'idispositivomovil'
            }
        ];
        
        /* Limpio los filtros que esten aplicados*/
        store.clearFilter(true);
        /* Cargo los filtros en el Store */
        store.filter(filters);
    },
    
    onSearchClick : function(button, event, options) {
        var controller = this;
        var view = button.up('manthistoricovehiculogridview');
        /* Obtengo el Store de la View */
        var store = view.getStore();
        
        /* Obtengo el numero de dispositivompovil
         * y el numero de compania del usuario
         */
        var idispositivomovil =  view.idispositivomovil;
        
        /* Le sumo los valores de los combo */
        var fechaDesde = view.down('#fechaDesde').getValue();
        var nombreServicio = view.down('#nombreServicio').getValue();
        var descripcionServicio = view.down('#descripcionServicio').getValue();
                
        var filters = [];
        var filters = [
            {
                property : 'tgmh_idispositivomovil',
                value : idispositivomovil,
                id: 'idispositivomovil'
            }
        ];
        
        if(fechaDesde){
            filters.push( 
                {
                    property : 'tgmh_dfecha',
                    value : Ext.Date.format(fechaDesde,'Y-m-d'),
                    id: 'dfecha'
                }
            )
        }
        if(nombreServicio){
            filters.push(
                {
                    property : 'tgms_cnombre:LIKE',
                    value : nombreServicio,
                    id: 'nombreServicio'
                }
            )    
        }
        if(descripcionServicio){
            filters.push( 
                {
                    property : 'tgmh_cdescripcion:LIKE',
                    value : descripcionServicio,
                    id: 'descripcionServicio'
                }
            )
        }
        
        /* Limpio los filtros que esten aplicados*/
        store.clearFilter(true);
        store.filter(filters);
        
    },
    
    onItemClick: function(grid, record, item, index, e, options) {        
        var view = grid.up('manthistoricovehiculogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var serviceName = record.get('tgms_cnombre');
        var serviceDescription = record.get('tgms_cdescripcion');
        var serviceId = record.get('tgms_idkey');
        var vehicleId = record.get('tgmh_idispositivomovil');
        
        /* Crear el formulario con los datos de la tabla de t_TG_mantenimiento_servicios */
        var view = Ext.widget('mantvehiculoformview',{
            caller: view,
            record: record,
            serviceId : serviceId,
            vehicleId : vehicleId,
            serviceName : serviceName,
            serviceDescription : serviceDescription
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
        	title : getLocale('Modificar Servicio'),
			width : 450,
			height : 260,
            translate: false,
			border : false,
			items : view
		});
		win.show();
    }
});