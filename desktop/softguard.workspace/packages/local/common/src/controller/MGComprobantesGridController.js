//MIGRADO2024
Ext.define('Common.controller.MGComprobantesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_clientes_fcModel', 'm_comprobantes_cab_fcSearchModel', 'm_comprobantes_cab_fcModel', 'OrganizationSearchModel', 'MGCuentaCorrienteSearchModel' ],
    views : [ 'MGComprobantesGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
			'mgcomprobantesgridview' : {
				afterrender : this.initView,
                vercomprobante: this.onVerComprobante,
                refresh: this.onRefresh
			}
		});
	},
    
    onRefresh: function (view) {
        view.getStore().load()
    },
    
    onVerComprobante: function (rec,view) {
        var viewgrid = view.up('mgcomprobantesgridview')
        var id = rec.get('Id');
        panel=view.up('tabpanel')
        
        this.getM_comprobantes_cab_fcModelModel().load(rec.get('cbc_iCodigo_ID'),{callback:function (record) {
            
            var title = getLocale('Comprobante')+': '+ record.get('cbc_cprefijocbte')+'-'+record.get('cbc_inumerocbte');
           
           
            var mytab = panel.down('[title="' + title + '"]');
        
            var organizacionId = rec.get('cbc_iCliente');
            if (!mytab) {
                var newTab = Ext.widget('comprobanteformview', {
                    record: record,
                    translate:false,
                    targetTab: newTab,
        			title : title,
        			closable : true,
                    caller: viewgrid,
                    organizacionId: organizacionId,
                    hideToolbar: view.hideToolbar,
                    recordOrganizacion: view.recordOrganizacion
        		});
                
                panel.add(newTab);
                panel.setActiveTab(newTab);
    		}
    		// el existe, lo activo
    		else {
                mytab.show();
    		}
        }})
        
        
    },
	initView : function(view) {
        var filters = [];
        var record = view.record;
        var controller = this;
        
        filters = [
            {
                property: 'cbc_iCliente',
                value: record.get('cli_icodigo_ID')
            }
        ]
        
        var store =Ext.create('Ext.data.Store',{
            model: controller.getMGCuentaCorrienteSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            //remoteGroup: false,
            //groupField : '_grouptitle',
            filters: filters,
            sorters:[{
                property:'cta_iCodigo_ID',
                direction:'DESC'
            }]
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load({callback:function () {
           
        }});
        
        
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