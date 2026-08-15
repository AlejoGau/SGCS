Ext.define('WebMG.controller.ComprobantesDePagoGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TipoComprobanteStore' ],
    models : [ 'm_comprobantes_cab_fcSearchModel', 't_comprobantes_fcSearchModel', 'm_comprobantes_cab_fcModel' ],
    views : [ 'ComprobantesDePagoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'comprobantesdepagogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchange: this.onGetAllClick,
                realizarpago: this.onRealizarPago,
                refresh: this.onRefresh
               
			},
            'comprobantesdepagogridview button[action=search]': {
                click: this.onSearchClick
            },
            'comprobantesdepagogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'comprobantesdepagogridview button[action="new"]' : {
                click: this.onNewOrderClick
            },
            'comprobantesdepagogridview button[action=groupStatus]' : {
				click : this.onGroupStatusClick
			}
		});
	},
    
    
    onRefresh: function (view) {
        view.getStore().load()
    },
    
    onRealizarPago: function (rec, view) {
        
        var myWindow = Ext.widget('window',{
            title: getLocale('Realizar pago'),
            height: 400,
            width: 400,
            modal: true, 
            items: [{
                xtype:'pagoformview',
                recordComprobante: rec
            }],
            layout: 'fit',
            caller: view
        }).show();
        
    },

	initView : function(view) {
        var controller = this;
        var record = view.record;
        
        if(!view.filters) {
           view.filters = [] 
        }
        
        var objectTypeId = 0
        if (record){
            
            view.filters.push({
                property: 'cbc_iCliente',
                value: record.get('cli_icodigo_ID')
            })
            
            view.down('[dataIndex=nombreOrganizacion]').setVisible(false);
        }
                
        view.TipoComprobanteStore = Ext.create('Ext.data.Store',{
                model: this.getT_comprobantes_fcSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
            })
        
        
        view.down('#cbc_ctipocbte').bindStore(view.TipoComprobanteStore)
        view.TipoComprobanteStore.load({callback:function () {
            
            var store = Ext.create('Ext.data.Store', {
                model : controller.getM_comprobantes_cab_fcSearchModelModel(),
                pageSize: 50,
                remoteFilter: true,
                filters: view.filters,
                autoload: false
            });
            
            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(store);
            view.bindStore(store);
            store.load();
        
        }})
        
    	
        
        
       /* var TipoComprobanteStore = this.getTipoComprobanteAFIPStoreStore()
        view.down('#cbc_ctipocbte').bindStore(TipoComprobanteStore)*/
        
        
        
        if(view.hideNew) {
            view.down('#new').hide()
        }
        
        
        if(view.hideGroup) {
            view.down('#groupStatus').hide()
        }
        
         
       
        
	},
    onGetAllClick: function(button, event, options) {    
        var view = button.up('comprobantesdepagogridview')?button.up('comprobantesdepagogridview'):button;
        var store = view.getStore();
        store.clearFilter(true);
        
        view.down('#datedesde').setValue('')
        view.down('#datehasta').setValue('')
        view.down('#estado').setValue('')
        view.down('#prefijo').setValue('')
        view.down('#numerocomprobante').setValue('')
        view.down('#cbc_ctipocbte').setValue('')
        
        
        
        
        store.filter(view.filters)
    },
    
    onNewOrderClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('comprobantesdepagogridview');
        
        var model = this.getM_comprobantes_cab_fcModelModel();
      
        var record = Ext.create(model,{
            Id:0,
            cnt_fechaalta: new Date()
        });

        var title = getLocale('Nuevo Comprobante');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        if(view.record) {
            var organizacionId = view.record.get('Id');
        }
    
        
    	if (!mytab) {
            var newTab = Ext.widget('comprobanteformview', {
                record: record,
                translate:false,
                targetTab: newTab,
    			title : title,
    			record: record,
    			closable : true,
                organizacionId: organizacionId,
                caller: view
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
       
        
    },
    
    
    onSearchClick: function(button, event, options) {    
        var view = button.up('comprobantesdepagogridview');
        
        var store = view.getStore();
        var query = view.down('#query');
        var field = view.down('#fieldName');
        
 
        var filters = Ext.Array.clone(view.filters);
 
        var fechadesde = view.down('#datedesde').getValue();
        var fechahasta = view.down('#datehasta').getValue();
      
        var estado = view.down('#estado').getValue();
        
       
        
        var prefijo = view.down('#prefijo').getValue();
        var numerocomprobante = view.down('#numerocomprobante').getValue();
        var cbc_ctipocbte = view.down('#cbc_ctipocbte').getValue();
     
        
        
        if  (fechadesde) {
            
             filters.push({ 
                property: 'cbc_dFecha:GTEDATESTRING',
                value: Ext.Date.format(fechadesde,'Y-m-d'),
                id: 'fechadesde'
            });
            
        }
        
        if  (fechahasta) {
            
             filters.push({ 
                property: 'cbc_dFecha:LTEDATESTRING',
                value: Ext.Date.format(fechahasta,'Y-m-d'),
                id: 'fechahasta'
            });
            
        }
        
      
        
        if  (estado != null) {
            
             filters.push({ 
                property: 'cbc_cEstado',
                value: estado,
                id: 'estado'
            });
            
        }
        
        if  (cbc_ctipocbte != null) {
            
             filters.push({ 
                property: 'cbc_ctipocbte',
                value: cbc_ctipocbte,
                id: 'cbc_ctipocbte'
            });
            
        }
        
        
        
        
    
        
        if  (prefijo) {
            
             filters.push({ 
                property: 'cbc_cPrefijoCbte',
                value: Ext.String.leftPad(Ext.util.Format.trim(prefijo), 4, '0'),
                id: 'prefijo'
            });
            
            view.down('#prefijo').setValue(Ext.String.leftPad(Ext.util.Format.trim(prefijo), 4, '0'));
            
        }
        
        if  (numerocomprobante) {
            
             filters.push({ 
                property: 'cbc_iNumeroCbte',
                value: numerocomprobante,
                id: 'numerocomprobante'
            });
            
        }
        
        
        
        
        
        store.clearFilter(true);
        if (filters)
            store.filter(filters);
            
            
    },
    
    onGroupStatusClick: function(button, event, options){
        var view = button.up('comprobantesdepagogridview');
        var grid = view.view;
        store = view.getStore();
            
        if (button.pressed){
            
            store.group('cbc_cestado','ASC');
        }else {
            store.clearGrouping();
        }
        
    },
    
    onItemClick: function(view,record,item,index,e,options){
        var viewgrid = view;
        var id = record.get('Id');
        var model = this.getM_comprobantes_cab_fcModelModel();
        var proxy = model.getProxy();
        panel=view.up('tabpanel')
        var title = getLocale('Comprobante')+': '+ record.get('_ncomprobante');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        
        
        if(viewgrid.record) {
            var organizacionId = viewgrid.record.get('Id');
        }
		if (!mytab) {
            
            var viewOpen = 'comprobanteformview'
            var filters = [];
            
            if(viewgrid.editorView) {
                viewOpen = viewgrid.editorView
                filters = [{
                    property:'pag_iCodigoCbte',
                    value: record.get('Id')
                },{
                    property:'cbc_iCliente',
                    value: record.get('cbc_icliente')
                }]
            }
            var newTab = Ext.widget(viewOpen, {
                record: record,
                translate:false,
                targetTab: newTab,
    			title : title,
    			closable : true,
                caller: viewgrid,
                organizacionId: organizacionId,
                filters: filters
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    openObjectTab: function(tabpanel,objectId, objectTypeName, title){
        var title = object.get('Name');
        var newTab = tabpanel.down('[title="' + title + '"]');
        if (!newTab){
            var newTab = Ext.widget(container, {
                title : title,
            	border : false,
    			closable : true,
                objectId: objectId,
                targetTab: tabpanel,
                autoDestroy: true
    		});
            
            tabpanel.add(newTab);
        }
        
		tabpanel.setActiveTab(newTab);
    },
    
    onContentCreated: function(view){
        var record = view.record;
        var grid = view.caller;
        var paging = view.down('pagingtoolbar');
        
        paging.moveFirst();
        paging.doRefresh();
        this.onItemClick(grid, record);
    },
    
    openObjectTab: function(targetTab,object){
        var objectId = object.get('Id');
        var title = object.get('Name');

        var newTab = Ext.widget('contratoformview', {
            title : title,
        	border : false,
			closable : true,
            record: object,
            objectId: objectId,
            targetTab: targetTab,
            autoDestroy: true
		});
        
        targetTab.add(newTab);
		targetTab.setActiveTab(newTab);
    }

});