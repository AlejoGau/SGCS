//MIGRADO2024
Ext.define('Common.controller.AuditGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SlbfObjectSearchModel', 'AuditSearchModel' ],
    views : [ 'AuditGridView' ],

	init : function(config) {
		// genero los eventos
		this.control({
            'auditgridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick
            },
            'auditgridview button[action=filterModificaciones]' : {
                click: this.onModificacionesClick
            },
            'auditgridview combo[reference=queryTabla]': { // Selector del combo utilizando su referencia
                select: this.onComboSelect // Enlaza el evento select del combo con el método onComboSelect del controlador
            },
            'auditgridview button[action=filterAltas]' : {
                click: this.onAltasClick
            },
            'auditgridview button[action=filterEliminados]' : {
                click: this.onEliminadosClick
            },
            'auditgridview button[action=removefilter]' : {
                click: this.onRemovefilterClick
            },
            'auditgridview button[action=filterText]' : {
                click: this.onFiltertextClick
            },
            'auditgridview button[action=searchAll]' : {
                click: this.onSearchAllClick
            },
            'auditgridview button[action=export]' : {
                click: this.onExportarClick
            }
        });
	}, // cierro init
    onComboSelect: function (combo, record, eOpts) {
        // Maneja el evento de selección del combo aquí
        console.log('Combo seleccionado:', record.get('id'), record.get('name'));
    },
    onBeforeQuery: function (queryPlan) {
        // Verificar si el valor del combo está vacío
        if (queryPlan.query.trim() === '') {
            // Si el valor está vacío, borrar selección
            this.getView().lookupReference('queryTabla').clearValue();
        }
    },
	initView : function(view) {
        // cargo los nombres de las tablas en el combo
        var queryTabla = view.down('#queryTabla');
        var tablaStore = Ext.create('Ext.data.Store',{
            model: this.getSlbfObjectSearchModelModel(),
            pageSize: 250,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: false,
            filters: [{property: 'GetSqlFilter_SlbfObjectWithAudit:function', value:''}],
            sorters: [{property:'NameLocale', direction:'ASC'}]
        })

        queryTabla.bindStore(tablaStore);
        tablaStore.load();

        view.filters = [
            {
                property:'FunctionId:NOT',value:'1'
            }  
        ];

        // me fijo si tengo un registro (cuenta)
        var record = view.record;
        if (record){
            var cuenta = record.get('cue_clinea')+'-'+record.get('cue_ncuenta');
            view.filters.push({property:'ParentDescription:LIKE', value:cuenta});
        }
        var filters = Ext.clone(view.filters);
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = Ext.Date.add(view.down('#fechaHasta').getValue(), Ext.Date.DAY, 1);
        var milliseconds = fechadesde.getTime();
        var offset = fechadesde.getTimezoneOffset() * 60000;
        var offsetHours = Math.abs(fechadesde.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes = Math.abs(fechadesde.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign = fechadesde.getTimezoneOffset() < 0 ? '+' : '-';
        fechadesde = `/Date(${milliseconds}${offsetSign}${offsetHours}${offsetMinutes})/`;
        var milliseconds2 = fechahasta.getTime();
        var offset2 = fechahasta.getTimezoneOffset() * 60000;
        var offsetHours2 = Math.abs(fechahasta.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes2 = Math.abs(fechahasta.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign2 = fechahasta.getTimezoneOffset() < 0 ? '+' : '-';
        fechahasta = `/Date(${milliseconds2}${offsetSign2}${offsetHours2}${offsetMinutes2})/`;
        //var fechadesde = '/Date(' + fechadesde.getTime() + fechadesde.getTimezoneOffset() * 60000 + ')/';
        //var fechahasta = '/Date(' + fechahasta.getTime() + fechahasta.getTimezoneOffset() * 60000 + ')/';
        filters.push({property:'auditdate:GT',value:fechadesde,id: 'auditdate:GT'});
        filters.push({property:'auditdate:LT',value:fechahasta,id: 'auditdate:LT'});  

        var store =Ext.create('Ext.data.Store',{
            model: this.getAuditSearchModelModel(),
            pageSize: 250,
            autoLoad: false,
            remoteFilter: true,
            remoteSort:true,
            filters: filters,
            listeners: {
                beforeload: function(store, operation){
                    operation.store = store;
                }
            }
        })
        view.bindStore(store);
        view.exportFilters = filters;
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store); 
        store.load();


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
    
    onExportarClick: function(button){
        var view = button.up('auditgridview');
       // var grid = view.down('grid');
        var store = view.getStore();

        var url = store.getProxy().url;//store.lastUrl;
        //var partes = url.split(/\?/);
        url = url+'.xls?filter='+Ext.encode(view.exportFilters);

        url = Ext.urlAppend(url,'limit=5000');
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        location.href=url;
    },
    
    onItemClick: function(Fview,record,item,index,e,options){
		// si el modulo es una view
		//if (record.get('view') != '' && record.get('FunctionId') == 6) {
			var panel = Ext.widget('audititemgridview', {
                record : record,
                preventHeader: true,
    			border : false
    		});
            var win = Ext.create('Ext.Window', {
                layout : 'fit',
    			title : 'Cambios en el registro',
    			width : 500,
                maximizable: true,
    			height : 200,
    			border : false,
    			items : panel
    		});
    		win.show();
		//} // cierro if
    },

    onModificacionesClick: function(button, event, options){
        var view = button.up('auditgridview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;

        var filters = Ext.clone(view.filters);
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = Ext.Date.add(view.down('#fechaHasta').getValue(), Ext.Date.DAY, 1);
        var milliseconds = fechadesde.getTime();
        var offset = fechadesde.getTimezoneOffset() * 60000;
        var offsetHours = Math.abs(fechadesde.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes = Math.abs(fechadesde.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign = fechadesde.getTimezoneOffset() < 0 ? '+' : '-';
        fechadesde = `/Date(${milliseconds}${offsetSign}${offsetHours}${offsetMinutes})/`;
        var milliseconds2 = fechahasta.getTime();
        var offset2 = fechahasta.getTimezoneOffset() * 60000;
        var offsetHours2 = Math.abs(fechahasta.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes2 = Math.abs(fechahasta.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign2 = fechahasta.getTimezoneOffset() < 0 ? '+' : '-';
        fechahasta = `/Date(${milliseconds2}${offsetSign2}${offsetHours2}${offsetMinutes2})/`;
        //var fechadesde = '/Date(' + fechadesde.getTime() + fechadesde.getTimezoneOffset() * 60000 + ')/';
        //var fechahasta = '/Date(' + fechahasta.getTime() + fechahasta.getTimezoneOffset() * 60000 + ')/';
        filters.push({property:'auditdate:GT',value:fechadesde,id: 'auditdate:GT'});
        filters.push({property:'auditdate:LT',value:fechahasta,id: 'auditdate:LT'});  
        filters.push({property:'FunctionId',value:'6', id:'FunctionId'});

        store.filter(filters);
        view.down('#queryUsername').setValue('');
        view.down('#queryCuenta').setValue('');
        view.down('#queryTabla').setValue('');
    },
    
    onAltasClick: function(button, event, options){
        var view = button.up('auditgridview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;
        var filters = Ext.clone(view.filters);
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = Ext.Date.add(view.down('#fechaHasta').getValue(), Ext.Date.DAY, 1);
        var milliseconds = fechadesde.getTime();
        var offset = fechadesde.getTimezoneOffset() * 60000;
        var offsetHours = Math.abs(fechadesde.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes = Math.abs(fechadesde.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign = fechadesde.getTimezoneOffset() < 0 ? '+' : '-';
        fechadesde = `/Date(${milliseconds}${offsetSign}${offsetHours}${offsetMinutes})/`;
        var milliseconds2 = fechahasta.getTime();
        var offset2 = fechahasta.getTimezoneOffset() * 60000;
        var offsetHours2 = Math.abs(fechahasta.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes2 = Math.abs(fechahasta.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign2 = fechahasta.getTimezoneOffset() < 0 ? '+' : '-';
        fechahasta = `/Date(${milliseconds2}${offsetSign2}${offsetHours2}${offsetMinutes2})/`;
        //var fechadesde = '/Date(' + fechadesde.getTime() + fechadesde.getTimezoneOffset() * 60000 + ')/';
        //var fechahasta = '/Date(' + fechahasta.getTime() + fechahasta.getTimezoneOffset() * 60000 + ')/';
        filters.push({property:'auditdate:GT',value:fechadesde,id: 'auditdate:GT'});
        filters.push({property:'auditdate:LT',value:fechahasta,id: 'auditdate:LT'});  
        filters.push({property:'FunctionId',value:'4', id:'FunctionId'});

        store.filter(filters);
        view.down('#queryUsername').setValue('');
        view.down('#queryCuenta').setValue('');
        view.down('#queryTabla').setValue('');
    },
    
    onEliminadosClick: function(button, event, options){
        var view = button.up('auditgridview');
        var store = view.getStore();
        store.filters.clear();
        store.currentPage = 1;
        var filters = Ext.clone(view.filters);
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = Ext.Date.add(view.down('#fechaHasta').getValue(), Ext.Date.DAY, 1);
        var milliseconds = fechadesde.getTime();
        var offset = fechadesde.getTimezoneOffset() * 60000;
        var offsetHours = Math.abs(fechadesde.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes = Math.abs(fechadesde.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign = fechadesde.getTimezoneOffset() < 0 ? '+' : '-';
        fechadesde = `/Date(${milliseconds}${offsetSign}${offsetHours}${offsetMinutes})/`;
        var milliseconds2 = fechahasta.getTime();
        var offset2 = fechahasta.getTimezoneOffset() * 60000;
        var offsetHours2 = Math.abs(fechahasta.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes2 = Math.abs(fechahasta.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign2 = fechahasta.getTimezoneOffset() < 0 ? '+' : '-';
        fechahasta = `/Date(${milliseconds2}${offsetSign2}${offsetHours2}${offsetMinutes2})/`;
        //var fechadesde = '/Date(' + fechadesde.getTime() + fechadesde.getTimezoneOffset() * 60000 + ')/';
        //var fechahasta = '/Date(' + fechahasta.getTime() + fechahasta.getTimezoneOffset() * 60000 + ')/';
        filters.push({property:'auditdate:GT',value:fechadesde,id: 'auditdate:GT'});
        filters.push({property:'auditdate:LT',value:fechahasta,id: 'auditdate:LT'});   
        filters.push({property:'FunctionId',value:'3', id:'FunctionId'});

        store.filter(filters);
        view.down('#queryUsername').setValue('');
        view.down('#queryCuenta').setValue('');
        view.down('#queryTabla').setValue('');
    },
    
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('auditgridview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = Ext.Date.add(view.down('#fechaHasta').getValue(), Ext.Date.DAY, 1);
        var queryUsername = view.down('#queryUsername').getValue();
        var queryCuenta = view.down('#queryCuenta').getValue();
        var queryTabla = view.down('#queryTabla').getValue();
        store.filters.clear(true);
        store.currentPage = 1;       
        
        var milliseconds = fechadesde.getTime();
        var offset = fechadesde.getTimezoneOffset() * 60000;
        var offsetHours = Math.abs(fechadesde.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes = Math.abs(fechadesde.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign = fechadesde.getTimezoneOffset() < 0 ? '+' : '-';
        fechadesde = `/Date(${milliseconds}${offsetSign}${offsetHours}${offsetMinutes})/`;
        var milliseconds2 = fechahasta.getTime();
        var offset2 = fechahasta.getTimezoneOffset() * 60000;
        var offsetHours2 = Math.abs(fechahasta.getTimezoneOffset() / 60).toString().padStart(2, '0');
        var offsetMinutes2 = Math.abs(fechahasta.getTimezoneOffset() % 60).toString().padStart(2, '0');
        var offsetSign2 = fechahasta.getTimezoneOffset() < 0 ? '+' : '-';
        fechahasta = `/Date(${milliseconds2}${offsetSign2}${offsetHours2}${offsetMinutes2})/`;
        //var fechadesde = '/Date(' + fechadesde.getTime() + fechadesde.getTimezoneOffset() * 60000 + ')/';
        //var fechahasta = '/Date(' + fechahasta.getTime() + fechahasta.getTimezoneOffset() * 60000 + ')/';
        filters.push({property:'auditdate:GT',value:fechadesde,id: 'auditdate:GT'});
        filters.push({property:'auditdate:LT',value:fechahasta,id: 'auditdate:LT'});  

        if (queryUsername) {
            filters.push({property:'UserName:LIKE',value:queryUsername,id: 'UserName:LIKE'});  
        }
        if (queryCuenta) {
            filters.push({property:'ParentDescription:LIKE',value:queryCuenta,id: 'ParentDescription:LIKE'});  
        }
        if (queryTabla) {
            filters.push({property:'oj.[Name]:LIKE',value:queryTabla,id: 'oj.[Name]:LIKE'});  
        }
        view.exportFilters = filters;
        store.filter(filters);
        var todas = view.down('#todas');
        todas.toggle(false,true);
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('auditgridview');
        var store = view.getStore();
        store.currentPage = 1;
        store.filters.clear(true);
        store.currentPage = 1;
        
        var filters = Ext.clone(view.filters);
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = Ext.Date.add(view.down('#fechaHasta').getValue(), Ext.Date.DAY, 1);
        filters.push({property:'auditdate:GT',value:fechadesde,id: 'auditdate:GT'});
        filters.push({property:'auditdate:LT',value:fechahasta,id: 'auditdate:LT'});  

        store.filter(filters);
        view.down('#queryUsername').setValue('');
        view.down('#queryCuenta').setValue('');
        view.down('#queryTabla').setValue('');
    }
});