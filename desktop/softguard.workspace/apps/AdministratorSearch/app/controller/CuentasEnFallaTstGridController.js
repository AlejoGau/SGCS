Ext.define('AdministratorSearch.controller.CuentasEnFallaTstGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'CuentaSearchModel', 'SoftguardCuentaModel' ],
    views : [ 'CuentasEnFallaTstGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'cuentaenfallotstgridview' : {
				afterrender : this.initView
			},
            'cuentaenfallotstgridview button[action=search]': {
                click: this.onSearchClick
            },
            'cuentaenfallotstgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'cuentaenfallotstgridview button[action="reiniciar"]' : {
    			click : this.onReiniciarClick
			}
		});
	},

	initView : function(view) {
        view.filters = [{
            property:'sta_ncuentaenfallo',
            value:1
        }];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getCuentaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
	},

    onGetAllClick: function(button, event, options) {    
        var view = button.up('cuentaenfallotstgridview');
        var store = view.getStore();

        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#dealer').setValue();
        view.down('#cuenta').setValue();
        view.down('#nombre').setValue();
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('cuentaenfallotstgridview');
        var store = view.getStore();
        var dealer = view.down('#dealer').getValue();
        var cuenta = view.down('#cuenta').getValue();
        var nombre = view.down('#nombre').getValue();
        var filters = Ext.clone(view.filters);

        if (dealer != ''){
            filters.push({ 
                property: 'cue_clinea',
                value: dealer
            });
        }
        
        if (cuenta != ''){
            filters.push({ 
                property: 'cue_ncuenta',
                value: cuenta
            });
        }
        
        if (nombre != ''){
            filters.push({ 
                property: 'cue_cnombre',
                value: nombre
            });
        }
        
        store.clearFilter(true);
        if (filters.length>0){
            store.filter(filters);
        }
    },
    
    onReiniciarClick : function(button, event, options) {
        var view = button.up('cuentaenfallotstgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            var count = delRec.length
            var i = 0;
            Ext.Array.each(delRec, function (rec) {
                Ext.Ajax.request({
                    url: '/rest/search/RestaurarCuentaEnFalloTst',
                    params: { 
                    'idCuenta': rec.get('cue_iid')
                    },
                    method: 'GET',
                    scope: this,
                    success: function(response){
                        if(count>=i) {
                            view.store.load()
                        }
                    }
                })
                i++;
            });
        }
    }
});