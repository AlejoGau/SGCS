//MIGRADO2024
Ext.define('Common.controller.TripGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TripSearchModel', 'SoftguardCuentaModel', 'TripModel', 'SoftguardUsuarioModel' ],
    views : [ 'TripGridView' ],
    
    init : function(config) {
		this.control({
            'tripgridview': {
                afterrender: this.initview,
                modifytrip : this.onEdit,
                viewtrip : this.viewTrip,
                inittrip : this.initTrip,
                endtrip : this.endTrip,
                removetrip : this.removeTrip,
                
                objectchanged : this.objectChanged,
                itemdblclick : this.onEdit
            },
            'tripgridview button[action = newTrip]' : {
                click : this.newTrip,
            },
            'tripgridview button[action=filter]' : {
                click: this.onFilterClick
            },
            'tripgridview button[action=removefilter]' : {
                click: this.onRemoveFilterClick
            },
            'tripgridview button[action=export]' : {
                click: this.onExportClick
            }
        })
    },
    initview : function(view) {
        var controller = this;
        /** Obtengo los datos de la cuenta abierta (solapa) */
        var caller = view.up('vehicleview');
        if (!caller){
            caller = view.up('#datapanel');
        }
        /** Obtengo el cue_iid de la cuenta abierta (solapa), para filtrar los responsables */
        var cue_iid;
        var record;
        if (!view.filters){
            view.filters= [];
        }
        if (caller){
            record = caller.record;
            cue_iid = record.get('cue_iid');
            view.filters.push({
                property : 'tgv_cueiid',
                value : cue_iid
            });
            /* Carga el combo de responsables */
            var responsablesStore = Ext.create('Ext.data.Store',{
                model: this.getSoftguardUsuarioModelModel(),
                autoload: false,
                sorters: [{
                    property: 'usu_cnombre',
                    direction: 'ASC'
                }],
                pageSize: 999
            });
            var comboResponsables = view.down('#responsable');
            comboResponsables.bindStore(responsablesStore);        
            responsablesStore.load({ObjectId : cue_iid});
            // oculto la cuenta
            //if (view.down('#_cuentanombre')){
            //    view.down('#_cuentanombre').hide();
            //}
            
        } else{
            view.down('#newTrip').hide();
            view.down('#responsable').hide();
        }
        /* Cargo grilla con la informacion del Store TripSearchModel */
        view.store = Ext.create('Ext.data.Store',{
            model: this.getTripSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,            
            sorters: [{
                property : 'tgv_fechainicio',
                direction: 'ASC'
            }],
            filters: view.filters
        });
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        view.bindStore(view.store);
        view.store.load();
        if (view.hideComponents){
            Ext.Array.each(view.hideComponents, function(comp){
                var _comp = view.down(comp);
                if (_comp){
                    _comp.hide();
                    _comp.disable();
                }
            })
        }
    },
    onExportClick: function(button){
        var url = '/handler/ReporteViajesHTML'
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }
        location.href=url;
    },
    onRemoveFilterClick: function(button){
        var view = button.up('tripgridview');
        /*var store = view.store;
        var filters= [];
        store.clearFilter(true);
        store.filter(filters);*/
                /* Cargo grilla con la informacion del Store TripSearchModel */
        view.store = Ext.create('Ext.data.Store',{
            model: this.getTripSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,            
            sorters: [{
                property : 'tgv_fechainicio',
                direction: 'ASC'
            }],
            filters: view.filters
        });
        view.bindStore(view.store);
        view.store.load();
    },
    onFilterClick: function(button, event, options){
        var view = button.up('tripgridview');
        var store = view.store;
        var filters = Ext.clone(view.filters);
        var fechaDesde = view.down('#fechadesde').getValue();
        var fechaHasta = view.down('#fechahasta').getValue();
        var cuenta = view.down('#cuenta').getValue();
        var numero = view.down('#numero').getValue();
        var nombreViaje = view.down('#nombreViaje').getValue();
        if(fechaDesde != null)
        {
            filters.push({
                    property:'tgv_fechainicio:GTEDATESTRING',
                    id: 'fechaDesde',
                    value: Ext.Date.format(fechaDesde, 'Y-m-d ')+'00:00:00'
            });
        }
        if(fechaHasta != null)        
        {
            filters.push({    
                property:'tgv_fechafin:LTEDATESTRING',
                id: 'fechaHasta',
                value: Ext.Date.format(fechaHasta, 'Y-m-d ')+'23:59:59'
            });
        }
        if(nombreViaje != null && nombreViaje != "")
        {
            filters.push({
                property:'tgv_nombre',
                id: 'nombreViaje',
                value: nombreViaje
            });
        }
        if(numero != null && numero != "")
        {
            filters.push({
                property:'tgv_codigoexterno',
                id: 'numero',
                value: numero
            });
        }
        if(cuenta != null && cuenta != "")
        {
            filters.push({
                property:'c.cue_ncuenta',
                id: 'cuenta',
                value: cuenta
            });
        }        
        store.clearFilter(true);
        store.filter(filters);
    },
    newTrip : function(btn, e, eOpts) {
        var controller = this;
        var view = btn.up('tripgridview');
        var record = view.record;
        /**
         * Genero el objecto del model
         */
        var tripModel = controller.getTripModelModel();
        var tripObject = tripModel.create({
            tgv_cueiid: record.get('cue_iid')
        }); 
        /**
         * Llamo a la creacion de la ventana, pasandole la view (para el Caller) y el objeto a ser creado (en blanco). Flag en 0 para INICIO de viaje.
         */
        controller.openAddOrEditWindow(view, tripObject, getLocale('Nuevo viaje'), 0);
    },
    objectChanged: function (view) {
        view.down('pagingtoolbar').doRefresh();
    },
    onEdit : function(grid, record, item, index, e, eOpts) {
        var controller = this;
        var view = grid.up('tripgridview');
        var model = controller.getTripModelModel();
        var id = record.get('tgv_idkey');
        if (id >0){
            var trip = model.load(id, {callback: function(record2){
                /**
                 * Llamo a la creacion de la ventana, pasandole la view (para el Caller) y el objeto a ser modificado. Flag en 1 para FIN de viaje.
                 */
                controller.openAddOrEditWindow(view, record2, getLocale('Viaje'), 1);
            }})
        }else{
            /**
             * Llamo a la creacion de la ventana, pasandole la view (para el Caller) y el objeto a ser modificado. Flag en 1 para FIN de viaje.
             */
            controller.openAddOrEditWindow(view, record, getLocale('Viaje'), 1);
        }
    },
    /** Funcion de apertura de ventana para formulario de viaje */
    openAddOrEditWindow : function(view, record, title, tripStatus) {
        var tripform = Ext.widget(view.editor,{
            scope: this,
            caller: view,
            record : record,
            tripStatus : tripStatus
        });
        if (view.editorTarget == 'window'){
            var myWindow = Ext.widget('window',{
                title: title,
                height: 600,
                width: 800,
                modal: true, 
                items: tripform,
                resizable : false,
                layout: 'fit'
            }).show();
        }else{
            // muestro en una tabpanel
            var tabpanel = view.up('tabpanel');
            Ext.apply(tripform,{
                title:getLocale('Viaje')+': '+record.get('tgv_nombre'),
                translate: false,
                closable: true,
                closeAction: 'destroy'
            });
            tabpanel.add(tripform);
            tabpanel.setActiveTab(tripform);
        }
        
    },
    removeTrip : function(grid, record, item, index, e, eOpts) {
        var controller = this;
        var view = grid.up('tripgridview');
        var model = this.getTripModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        record.destroy({callback: function(record, operation){          
            if (operation.success) {
                notify('Se eliminio exitosamente');
            }
            else {
               notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
            }
            view.store.load();
        }})
    },
    initTrip : function(grid, record, item, index, e, eOpts) {
        var controller = this;
        var view = grid.up('tripgridview');
    },
    endTrip : function(grid, record, item, index, e, eOpts) {
        var controller = this;
        var view = grid.up('tripgridview');
    },
    viewTrip : function(grid, record, item, index, e, eOpts) {
        var controller = this;
        var view = grid.up('tripgridview');
        var title = getLocale('Viaje')+': '+record.get('tgv_nombre');
        var panel = view.up('tabpanel'); 
        var mon = Ext.widget('tripmapview',{
            title : title,
            record: record,
            caller: view,
            translate: false,
            closable : true,
            translate: false,
            closeAtion: 'Destroy'
        });
        
        panel.add(mon);
        panel.setActiveTab(mon);
    }
})