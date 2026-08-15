Ext.define('Common.controller.EncuestaEstadisticaEstadoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EncuestaEstadisticaEstadoSearchModel' ],
    views : [ 'EncuestaEstadisticaEstadoGridView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            	'encuestasestadisticaestadogridview' : {
					afterrender : this.initView,
                    itemdblclick: this.onItemClick,
				},
				'encuestasestadisticaestadogridview button[action="search"]' : {
					click : this.onSearchClick
				},
    			'encuestasestadisticaestadogridview button[action="export"]' : {
					click : this.onExportarClick
				},
        		'encuestasestadisticaestadogridview button[action="getall"]' : {
    				click : this.onViewAll
				}
            });
	}, // cierro init

    initView : function(view) {
        var controller = this;
        var encuesta = view.up('encuestaview').down('encuestasformview').record; // El record viene de la solapa principal, correspondiente a la Encuesta consultada
        view.filters = [{
            property: "enr_encidkey",
            value: encuesta.get('Id')
        }];      
        
        view.store = Ext.create('Ext.data.Store',{
            model: this.getEncuestaEstadisticaEstadoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
    },

    onSearchClick : function(button, event, eOpts) {
        var controller = this;
        var view = button.up('encuestasestadisticaestadogridview');
        var filters = view.filters;
        var store = view.getStore();
        
        store.clearFilter(true);
        var comboEstado = view.down('#comboEstado').getValue();
        if (comboEstado >= 0 && comboEstado){
            filters.push({ 
                property : 'enr_estado',
                value : comboEstado
            });
        }
        store.filter(filters);
        
    },
    
    onViewAll : function(button, event, eOpts) {
        var controller = this;
        var view = button.up('encuestasestadisticaestadogridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
    },
    
    onExportarClick : function(button, event, eOpts) {
        var controller = this;
        var view = button.up('encuestasestadisticaestadogridview');
        var store = view.getStore();
        
        var filters = [];
        var comboEstado = view.down('#comboEstado').getValue();
        if (comboEstado >= 0 && comboEstado){
            filters.push({ 
                property : 'enr_estado',
                value : comboEstado
            });
        }
        
        /* Tomo los valores de los combo creado en la view */
        var url = '/handler/EncuestaEstadisticaEstadoHTML';
        
        if (filters.length > 0) {
            url = Ext.String.urlAppend(url,"filters="+Ext.encode(filters));
        }
        
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    },

    onItemClick : function(grid,record,item,index,e,options){
        var controller = this;
        var title = 'Respuestas brindadas por '+record.get('Nombre')+', Imei: '+record.get('Imei');

        var surveyrepsonseview = Ext.widget('encuestaresultadoporpregunta',{
            caller: grid,
            record: record
        });
                    
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 700,
            height : 400,
            border : false,
            translate: false,
            items : surveyrepsonseview
        });
        win.show();
        

    }


    
});
