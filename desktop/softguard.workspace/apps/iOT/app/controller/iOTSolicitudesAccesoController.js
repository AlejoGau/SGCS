Ext.define('iOT.controller.iOTSolicitudesAccesoController', {
    extend: 'Ext.app.Controller',
    stores: ['iOTPendienteProcesadaStore'],
    models: ['iOTSolicitudesSearchModel'],
    views: ['iOTSolicitudesAccesoView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iotsolicitudesaccesoview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                //objectedit: this.onObjectEdit,
                refresh: this.onRefresh
            },
            'iotsolicitudesaccesoview button[action=search]': {
                click: this.onSearchClick
            },
            'iotsolicitudesaccesoview button[action="todos"]': {
                click: this.onTodosClick
            },
            'iotsolicitudesaccesoview button[action="filterPendientes"]': {
                click: this.onFilterPendientes
            },
            'iotsolicitudesaccesoview button[action="filterProcesadas"]': {
                click: this.onFilterProcesadas
            }                                          
        });
    },

	onRefresh: function (view) {
		view.store.load();
        //view.getStore().load()
    },    
    initView: function (view) {

        /*var comboPendienteProcesada = view.down('#estado');
        comboPendienteProcesada.bindStore(this.getIOTPendienteProcesadaStoreStore());
        */
        var store = Ext.create('Ext.data.Store', {
            model: this.getIOTSolicitudesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{"property":"pdl_tReqFechaHora","direction":"DESC"}]

        });
        
        
       
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        view.getStore().load();

    },

    onItemClick: function (grid, record, item, index, e, options) {
        var view = grid.up('iotsolicitudesaccesoview') ? grid.up('iotsolicitudesaccesoview') : grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        //var title = getLocale('Ficha') + ': ' + record.get('usu_cnombre');}
        var readOnly =  false;
        if(record.get('pdl_cAuthorized'))
            readOnly = true;
        var view = Ext.widget('iotsolicitudesaccesoformview', {
            caller: view,
            record: record,
            readOnly: readOnly,
            filterFromSearchContainer: view.filterFromSearchContainer ? view.filterFromSearchContainer : false
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Información de Solicitud de Acceso',
            translate: false,
            width: 800,
            //height: 700,
            border: false,
            modal: true,
            items: view            
        });
        win.show();
    },  
    onSearchClick: function(button, event, options){
       // var view = button.up('notasactivasgridview');
       // this.filtrarPorFecha(view.store,view);     
       var view = button.up('iotsolicitudesaccesoview');
       var store = view.store;
       var filters = [];
       var dealer = view.down('#dealer').getValue();
       var cuenta = view.down('#cuenta').getValue();
       var ID = view.down('#ID').getValue();

       var nombre = view.down('#nombre').getValue();
       var ID = view.down('#ID').getValue();
       if (dealer){
            filters.push({
                property: 'cue_clinea',
                value: dealer
            });
       }
       if (cuenta){
            filters.push({
                property: 'cue_ncuenta',
                value: cuenta
            });
       }    
       if (nombre){
            filters.push({
                property: 'cue_cnombre:LIKE',
                value: nombre
            });
        }           
        if (ID){
            filters.push({
                property: 'pdl_cLockName:LIKE',
                value: ID
            });
        } 
                
       store.clearFilter(true);
       store.filter(filters);      
       store.load();     
    },
    filtrarPorFecha: function(_store,_view){

        /*
        var filters = Ext.clone(_view.filters);
        var datedesde = _view.down('#datedesde').getValue();
        var datehasta = new Date(_view.down('#datehasta').getValue());
        datehasta.setDate(datehasta.getDate()+1);
        if (datedesde){
            filters.push({
                property: 'sgn_datecreated:GTEDATESTRING',
                id: 'fechadesde',
                value: Ext.Date.format(datedesde, 'Y-m-d ')+'00:00:00'
            });
        }
        if (datehasta){
            filters.push({
                property: 'sgn_datecreated:LTEDATESTRING',
                id: 'fechahasta',
                value: Ext.Date.format(datehasta, 'Y-m-d ')+'00:00:00'
            });            
        }
        _store.clearFilter(true);
        _store.filter(filters);*/

    },
    onTodosClick: function(button, event, options){
        var view = button.up('iotsolicitudesaccesoview');
        view.store.clearFilter(true);
        view.store.filter(view.filters);
        view.store.load();
        view.down('#dealer').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#ID').setValue('');     
        view.down('#filterPendientes').toggle(false);
        view.down('#filterProcesadas').toggle(false);             
    },        
    onFilterPendientes: function (button, event, options){
        var view = button.up('iotsolicitudesaccesoview');
        var store = view.store;
        var filters = [];
        filters.push({
            property: 'pdl_iStatus',
            value: 1
        });
        store.clearFilter(true);
        store.filter(filters);      
        store.load();         
    },
    onFilterProcesadas: function (button, event, options){
        var view = button.up('iotsolicitudesaccesoview');
        var store = view.store;
        var filters = [];
        filters.push({
            property: 'pdl_iStatus:NOT',
            value: '1'
        });
        store.clearFilter(true);
        store.filter(filters);      
        store.load();         
    }          

});
