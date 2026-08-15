Ext.define('AdministratorSearch.controller.LogGatewayController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'LogGatewaySearchModel' ],
    views : [ 'LogGatewayView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'loggateway' : {
				afterrender : this.initView,
            },            
            'loggateway button[action=search]' : {
				click : this.onSearchClick
            },            
            'loggateway button[action=getall]' : {
				click : this.onGetAll
            }

		});
	},

	initView : function(view) {
        var controller = this;

        view.store = Ext.create('Ext.data.Store',{
            model: this.getLogGatewaySearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property : 'Level',
                value : 'Info',
                id : 'level'  
            },{
                property : 'ServiceName',
                value : 'MessagingGatewayService'
            }]
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
	},

    onSearchClick : function(button, e, eOpts) {
        var controller = this;
        var view = button.up('loggateway');

        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var horaDesde = view.down('#horadesde').getValue();
        var horaHasta = view.down('#horahasta').getValue();

        var levelOpt = view.down('#levelOpt').getValue();
        var levelOptFilter = 'Info';

        var filter = [];
        var store = view.getStore();

        if (fechadesde) {
            filter.push({
                property : 'Logged:GTESTRING',
                value : Ext.Date.format(new Date(fechadesde),'Y-m-d')+'T'+Ext.Date.format(new Date(horaDesde),'H:i:s'),
                id: 'fechaDesde'
            })
        }
        if (fechahasta) {
            filter.push({
                property : 'Logged:LTESTRING',
                value : Ext.Date.format(new Date(fechahasta),'Y-m-d')+'T'+Ext.Date.format(new Date(horaHasta),'H:i:s'),
                id: 'fechaDHasta'
            })
        }
        if (levelOpt) {
            switch (levelOpt) {
                case 0:
                    levelOptFilter = 'Info';
                break;
                case 1:
                    levelOptFilter = 'Trace';
                break;
                case 2:
                    levelOptFilter = 'Debug';
                break;
                case 3:
                    levelOptFilter = 'Error';
                break;
                
            }
        }

        if (levelOptFilter != '') {
			filter.push({
				property : 'Level',
				value : levelOptFilter,
				id: 'level'
			})
		}

        if (filter && filter.length > 0)
            store.filter(filter);
        else 
        	store.clearFilter();
        
    },

    onGetAll : function(button, e, eOpts) {
        var controller = this;
        var view = button.up('loggateway');
        var store = view.getStore();

        store.clearFilter();
    }

});