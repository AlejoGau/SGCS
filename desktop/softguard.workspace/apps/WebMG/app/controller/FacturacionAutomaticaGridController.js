Ext.define('WebMG.controller.FacturacionAutomaticaGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'MoneyguardClientSearchModel', 'FacturacionAutomaticaSearchModel', 't_comprobantes_fcSearchModel', 't_categorias_impositivas_fcSearchModel', 'Common.model.t_condiciones_pago_fcSearchModel', 't_organizacion_fcSearchModel' ],
    views : [ 'FacturacionAutomaticaGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'facturacionautomaticagridview' : {
				afterrender : this.initView,
               
			},
            'facturacionautomaticagridview button[action=search]': {
                click: this.onSearchClick
            },
            'facturacionautomaticagridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'facturacionautomaticagridview button[action="new"]' : {
                click: this.onNewOrderClick
            },
            'facturacionautomaticagridview button[action=groupStatus]' : {
				click : this.onGroupStatusClick
			},
            'facturacionautomaticagridview #facturar' : {
                click: this.onFacturarClick
            }
            
            
		});
	},
    
    onFacturarClick : function (btn) {
        var view = btn.up('facturacionautomaticagridview')
        
        var arrayIdsClientes = []
        Ext.Array.each(view.store.tree.root.childNodes,function(record){
            if(record.get('activo') == true){
                arrayIdsClientes.push(record.get('Id'))
            }
        });
        
        
        if(arrayIdsClientes.length>0) {        
             Ext.Ajax.request({
                  url: '/rest/search/MG_LoteFacturas',
                  params: {arrayClientes:arrayIdsClientes.join(',')},
                  method:'GET',
                  success: function(resp,operation) {
                      if(resp.responseText)  {
                          notify('Se facturo')
                      }
                  }
             })
        } else {
            notify('Debe seleccionar almenos 1 cliente')
        }
        
        
    
    },
    
   

	initView : function(view) {
        var controller = this;
        var record = view.record;



       view.filters = [];

        view.store = Ext.create('Ext.data.TreeStore', {
            model: this.getFacturacionAutomaticaSearchModelModel(),
            root: {
                name: 'rows',
                expanded: true
            },
            remoteFilter: true,
            filters:view.filters
        });

         view.bindStore(view.store);


         var tipoComprobanteStore = Ext.create('Ext.data.Store',{
                model: this.getT_comprobantes_fcSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
            })
        view.down('#cbc_ctipocbte').bindStore(tipoComprobanteStore)
        tipoComprobanteStore.load()


        var organizacionFacturadoraStore = Ext.create('Ext.data.Store',{
            model: controller.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'org_organizacionId',
                value: _UserData.Company
            }]
        });

        organizacionFacturadoraStore.load({callback: function (records) {
            var orgId = records.length > 0 ? records[0].get('Id') : null;

            var categoriasImpositivasStore = Ext.create('Ext.data.Store',{
                model: controller.getT_categorias_impositivas_fcSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: orgId ? [{
                    property: 'cat_orgicodigoid',
                    value: orgId,
                    id: 'cat_orgicodigoid'
                }] : []
            });
            view.down('#categoriasimpositivas').bindStore(categoriasImpositivasStore);
            categoriasImpositivasStore.load();

            var condicionesPagoStore = Ext.create('Ext.data.Store',{
                model: controller.getT_condiciones_pago_fcSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: orgId ? [{
                    property: 'con_orgidcodigoid',
                    value: orgId,
                    id: 'con_orgidcodigoid'
                }] : []
            });
            view.down('#condicionespago').bindStore(condicionesPagoStore);
            condicionesPagoStore.load();
        }});
	},
    onGetAllClick: function(button, event, options) {    
        var view = button.up('facturacionautomaticagridview');
        var store = view.getStore();
        store.clearFilter(true);
        
        view.down('#date').setValue('')
        view.down('#cbc_ctipocbte').setValue('')
        view.down('#categoriasimpositivas').setValue('')
        view.down('#condicionespago').setValue('')
        
        
        
        view.store.destroyStore();
        view.store = Ext.create('Ext.data.TreeStore', {
            model: this.getFacturacionAutomaticaSearchModelModel(),
            root: {
                name: 'rows',
                expanded: true
            },
            remoteFilter: true,
            filters:view.filters
        });

         view.bindStore(view.store);
    },
    
    
   
    
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('facturacionautomaticagridview');
        
        var store = view.getStore();
        var query = view.down('#query');
        var field = view.down('#fieldName');
        
 
        var filters = Ext.Array.clone(view.filters);
 
        var fechadesde = view.down('#date').getValue();
        
        var cbc_ctipocbte = view.down('#cbc_ctipocbte').getValue();
        var categoriasimpositivas = view.down('#categoriasimpositivas').getValue();
        var condicionespago = view.down('#condicionespago').getValue();
        
        
     /*   
        if  (cbc_ctipocbte) {            
             filters.push({ 
                property: 'cbc_ctipocbte',
                value: cbc_ctipocbte,
                id: 'cbc_ctipocbte'
            });            
        }
        */
        
        if  (categoriasimpositivas) {            
             filters.push({ 
                property: 'cli_ccategoriaimpositiva',
                value: categoriasimpositivas,
                id: 'cli_ccategoriaimpositiva'
            });            
        }
        
        if  (condicionespago) {            
             filters.push({ 
                property: 'cli_ccondicionpago',
                value: condicionespago,
                id: 'cli_ccondicionpago'
            });            
        }
        if  (fechadesde) {            
             filters.push({ 
                property: 'cli_dproximafactura ',
                value: Ext.Date.format(fechadesde,'Y-m-d'),
                id: 'cli_dproximafactura'
            });            
        }
     
        
        
        /*
        
        if  (fechahasta) {
            
             filters.push({ 
                property: 'cnt_fechaalta:LTEDATESTRING',
                value: Ext.Date.format(fechahasta,'Y-m-d'),
                id: 'fechahasta'
            });
            
        }*/
        
      
        view.store.destroyStore();
        view.store = Ext.create('Ext.data.TreeStore', {
            model: this.getFacturacionAutomaticaSearchModelModel(),
            root: {
                name: 'rows',
                expanded: true
            },
            remoteFilter: true,
            filters:filters
        });

         view.bindStore(view.store);
        
        
        
       /*store.clearFilter(true);
        if (filters)
            store.filter(filters);*/
            
            
    }
   

});