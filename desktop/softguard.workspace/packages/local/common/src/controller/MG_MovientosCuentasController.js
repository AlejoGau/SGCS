//MIGRADO2024
Ext.define('Common.controller.MG_MovientosCuentasController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'MG_MovientosCuentasSearchModel' ],
    views : [ 'MG_MovientosCuentasGridView' ],
    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'mg_movimientoscuentasgridview' : {
				afterrender : this.initView,
                refresh: this.onRefresh
			}
		});
	},
    
    onRefresh: function (view) {
        view.getStore().load()
    },
    
   
	initView : function(view) {
        var record = view.record;
        var controller = this;
        var filters = view.filters?view.filters:[];
        
        if (view.mgm_idcuenta>0){
            filters.push({
                property: 'mgm_idcuenta',
                value: view.mgm_idcuenta
            })
        } else if (record){
            filters.push({
                property: 'cbc_iCliente',
                value: (record.get('cli_icodigo_ID')?record.get('cli_icodigo_ID'):record.get('Id'))
            })
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: controller.getMG_MovientosCuentasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            //remoteGroup: false,
            //groupField : '_grouptitle',
            filters: filters,
            sorters:[{
                property:'mgm_fecha',
                direction:'DESC'
            },{
                property:'cbc_iNumeroCbte',
                direction:'DESC'
            }]
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load({callback:function () {}});
        
	},
     
    
    onSearchClick: function(button, event){
        var view = button.up('mgcomprobantesgridview');
        var store = view.getStore();
        var query = view.down('#query');
        var id = view.down('#queryid');
        var filter = [];
        
        if (query)
            filter.push({ 
                property: 'Name:Like',
                value: query.getValue(),
                id: 'Name'
            })
            
        if (id)
            filter.push({ 
                property: 'Id',
                value: id.getValue(),
                id: 'Id'
            })
            
            
        store.filter(filter);
    }
});