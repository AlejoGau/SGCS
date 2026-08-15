Ext.define('Trackguard.controller.TG_MantenimientoVehiculoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TG_MantenimientoHistoricoVehicularModel', 'TG_MantenimientoHistoricoVehiculoSearchModel' ],
    views : [ 'TG_MantenimientoVehiculoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'mantvehiculogridview' : {
            	afterrender : this.initView,
                objectchanged : this.objectChanged,
                //itemdblclick: this.onItemClick
                itemdblclick : this.onAdd
                //itemclick : this.onItemClick
            },
            'mantvehiculogridview button[action=getall]' : {
                click : this.onGetAll
            },
            'mantvehiculogridview actioncolumn' : {
                onAdd : this.onAdd,
                onItemClick : this.onItemClick
            },
            'mantvehiculogridview button[action=search]' : {
                click : this.onSearchClick
            }
        })
    },
    
    initView : function(view) {
        var controller = this;
        var record = view.record;    
        
        /* Obtengo el numero de dispositivompovil */
        var idispositivomovil = record.get('OwnerId');
        
        /* Obtengo el numero de compania del usuario  */
        var usuarioLogueadoCompany = controller.application.UserData.Company;
        
        /* Model correspondiente al SP para la tabla t_TG_mantenimiento_servicios */
        view.store = Ext.create('Ext.data.Store',{
            model: this.getTG_MantenimientoHistoricoVehiculoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,            
            /* Aplico para filtrar por la Organizacion del usuario del Desktop */ 
            sorters: [{
                property : 'tgmh_dfecha',
                direction: 'DESC'
            }],
            filters: [
                    {
                    property : 'ms.tgms_iorganizacion',
                    value : usuarioLogueadoCompany
                },{
                    property : 'ms.tgms_iestado',
                    value : 1
                },{
                    property : 'tgmh_idispositivomovil',
                    value : idispositivomovil
                }
            ]

        });
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.bindStore(view.store);
        view.store.load();
        
        /* Cargo la solapa de Historico de matenimiento del vehículo */
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');;
        var title = "Historico de Mantenimiento";
        
        var newTab = Ext.widget('manthistoricovehiculogridview', {
            title: title,
            idispositivomovil : idispositivomovil,
            record: record,
            closable: true
        });
        
        panel.add(newTab);
        panel.setActiveTab(newTab);

    },
    
    onGetAll : function(button, event, options) {
        var controller = this;
        var view = button.up('mantvehiculogridview');
        var store = view.getStore();
        
        /* Obtengo el numero de dispositivompovil
         * y el numero de compania del usuario
         */
        var record = view.record;
        var idispositivomovil = record.get('OwnerId');
        var usuarioLogueadoCompany = controller.application.UserData.Company;
        
        /* Limpio los campos del Menu Filtro */
        view.down('#fechaDesde').setValue('');
        view.down('#nombreServicio').setValue('');
        view.down('#descripcionServicio').setValue('');
        
        /* Limpio los filtros que esten aplicados*/
        store.clearFilter(true);
        var filters = [];
        
        filters.push(
            {
                property : 'ms.tgms_iorganizacion',
                value : usuarioLogueadoCompany
            },{
                property : 'ms.tgms_iestado',
                value : 1
            },{
                property : 'tgmh_idispositivomovil',
                value : idispositivomovil
            }
        );
        store.filter(filters);
    },
    
    onSearchClick : function(button, event, options) {
        var controller = this;
        var view = button.up('mantvehiculogridview');
        /* Obtengo el Store de la View */
        var store = view.getStore();
        /* Cargo en la variable de filtros lo mismo declarado en la view */
        var filters = [];
        
        /* Obtengo el numero de dispositivompovil
         * y el numero de compania del usuario
         */
        var record = view.record;
        var idispositivomovil = record.get('OwnerId');
        var usuarioLogueadoCompany = controller.application.UserData.Company;
        /* Le sumo los valores de los combo */
        var fechaDesde = view.down('#fechaDesde').getValue();
        var nombreServicio = view.down('#nombreServicio').getValue();
        var descripcionServicio = view.down('#descripcionServicio').getValue();
        
        /* Limpio los filtros que esten aplicados*/
        store.clearFilter(true);
                
        filters.push(
            {
                property : 'ms.tgms_iorganizacion',
                value : usuarioLogueadoCompany
            },{
                property : 'ms.tgms_iestado',
                value : 1
            },{
                property : 'tgmh_idispositivomovil',
                value : idispositivomovil
            }
        );
        
        /* Aplico nuevos filtros en base a los valores del menu Filtro, manteniendo los anteriores */
        if(fechaDesde){
            filters.push( 
                {
                    property : 'tgmh_dfecha',
                    value : Ext.Date.format(fechaDesde, 'Y-m-d')
                }
            )
        };

        if(nombreServicio){
            filters.push( 
                {
                    property : 'tgms_cnombre:LIKE',
                    value : nombreServicio
                }
            )
        };
        
        store.filter(filters);
        
    },

    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },
    
    
    onAdd: function(grid,record,item,index,e,options){
        var id = 0;
        var view = grid.up('mantvehiculogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var serviceName = record.get('tgms_cnombre');
        var serviceDescription = record.get('tgms_cdescripcion');
        var serviceId = record.get('tgms_idkey');
        var vehicleId = view.record.get('OwnerId');
        var odometer = record.get('Odometer');
        
        /* Crear el formulario con los datos de la tabla de t_TG_mantenimiento_servicios */
        record = this.getTG_MantenimientoHistoricoVehicularModelModel();
        
        var myobject = record.create({
           
		});            
        
        var view = Ext.widget('mantvehiculoformview',{
            caller : view,
            record : myobject,
            serviceId : serviceId,
            vehicleId : vehicleId,
            serviceName : serviceName,
            serviceDescription : serviceDescription,
            odometer : odometer
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
			title : getLocale('Nuevo Servicio'),
			width : 450,
			height : 260,
			border : false,
			items : view
		});
		win.show();   
    },
    
    
    onItemClick: function(grid, record, item, index, e, options) {        
        var id = record.get('Id');
        var view = grid.up('mantvehiculogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var serviceName = record.get('tgms_cnombre');
        var serviceDescription = record.get('tgms_cdescripcion');
        var serviceId = record.get('tgms_idkey');
        var vehicleId = view.record.get('OwnerId');
        
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
        
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    }
});