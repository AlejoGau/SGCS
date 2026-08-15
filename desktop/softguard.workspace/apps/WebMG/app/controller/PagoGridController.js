Ext.define('WebMG.controller.PagoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_pagos_fcSearchModel' ],
    views : [ 'PagoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'pagogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchange: this.onObjectChange,
                refresh: this.onRefresh
               
			},
            'pagogridview button[action=search]': {
                click: this.onSearchClick
            },
            'pagogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'pagogridview button[action="new"]' : {
                click: this.onNewOrderClick
            },
            'pagogridview button[action=groupStatus]' : {
				click : this.onGroupStatusClick
			},
            'pagogridview button[action="template"]' : {
                click: this.onTemplateClick
            },
            'pagogridview #nuevopago' : {
                click: this.onNuevoPagoClick
            }
            
            
		});
	},
    
    
    onRefresh: function (view) {
      view.getStore().load();  
    },
    
    onNuevoPagoClick: function (btn) {
        var view = btn.up('pagogridview')
        var myWindow = Ext.widget('window',{
            title: getLocale('Realizar pago'),
            height: 500,
            width: 700,
            modal: true, 
            items: [{
                xtype:'pagoformview',
                record: view.record
            }],
            layout: 'fit',
            caller: view
        }).show();
    },
    
    onObjectChange: function (view) {
        view.getStore().load()
    },

	initView : function(view) {
        
        var record = view.record;
        
        var filters = []
        if(view.filters) {
            filters = view.filters
        } else {
            filters.push({
                property: 'cbc_iCliente',
                value: record.get('Id')
            })
        }
   
        
    	var store = Ext.create('Ext.data.Store', {
            model : this.getM_pagos_fcSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            filters: filters,
            sorters: view.sorters,
        	autoload: false
        });
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        view.bindStore(store);
        store.load();
        
        
	},
    onGetAllClick: function(button, event, options) {    
        var view = button.up('pagogridview');
        var store = view.getStore();
        store.clearFilter(true);
        
        view.down('#datedesde').setValue('')
        view.down('#datehasta').setValue('')
        view.down('#datevencimientodesde').setValue('')
        view.down('#datevencimientohasta').setValue('')
        view.down('#estado').setValue('')
        view.down('#cliente').setValue('')
        view.down('#organizaciones').setValue('')
        view.down('#formadepago').setValue('')
        
        
        store.filter(view.filters)
    },
    
  
    onNewOrderClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('pagogridview');
        
        var model = this.getCrm_contratoModelModel();
      
        var record = Ext.create(model,{
            cnt_fechaalta: new Date()
        });

        var title = getLocale('Nuevo Contrato');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        if(view.record) {
            var organizacionId = view.record.get('Id');
        }
    
        
    	if (!mytab) {
            var newTab = Ext.widget('contratoformview', {
                record: record,
                translate:false,
                targetTab: newTab,
    			title : title,
    			record: record,
    			closable : true,
                organizacionId: organizacionId,
                caller:view
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
        var view = button.up('pagogridview');
        
        var store = view.getStore();
        var query = view.down('#query');
        var field = view.down('#fieldName');
        
 
        var filters = Ext.Array.clone(view.filters);
 
        var fechadesde = view.down('#datedesde').getValue();
        var fechahasta = view.down('#datehasta').getValue();
        var fechavencimientodesde = view.down('#datevencimientodesde').getValue();
        var fechavencimientohasta = view.down('#datevencimientohasta').getValue();
        var estado = view.down('#estado').getValue();
        
        var cliente = view.down('#cliente').getValue();
        var organizaciones = view.down('#organizaciones').getValue();
        
        var formadepago = view.down('#formadepago').getValue();
        
        var proximovencimientosdias = view.down('#proximovencimientosdias').getValue()
        
        
     
        
        
        if  (fechadesde) {
            
             filters.push({ 
                property: 'cnt_fechaalta:GTEDATESTRING',
                value: Ext.Date.format(fechadesde,'Y-m-d'),
                id: 'fechadesde'
            });
            
        }
        
        if  (fechahasta) {
            
             filters.push({ 
                property: 'cnt_fechaalta:LTEDATESTRING',
                value: Ext.Date.format(fechahasta,'Y-m-d'),
                id: 'fechahasta'
            });
            
        }
        
        if  (fechavencimientodesde) {
            
             filters.push({ 
                property: 'cnt_fechavto:GTEDATESTRING',
                value: Ext.Date.format(fechavencimientodesde,'Y-m-d'),
                id: 'fechavencimientodesde'
            });
            
        }
        
        if  (fechavencimientohasta) {
            
             filters.push({ 
                property: 'cnt_fechavto:LTEDATESTRING',
                value: Ext.Date.format(fechavencimientohasta,'Y-m-d'),
                id: 'fechavencimientohasta'
            });
            
        }
        
        
        if(proximovencimientosdias && view.showProximosVencimientoDias) {
            filters.push({
                        property:'cnt_fechavto:LT',
                        value: Ext.Date.add(new Date(), Ext.Date.DAY, proximovencimientosdias),
                        id:'fechavencimientohasta'
                    });
        }
        
        if  (estado != null) {
            
             filters.push({ 
                property: 'cnt_estado',
                value: estado,
                id: 'estado'
            });
            
        }
        
        if  (cliente) {
            
             filters.push({ 
                property: 'orgs.[Name]:LIKE',
                value: cliente,
                id: 'cliente'
            });
            
        }
        
        if  (organizaciones) {
            
             filters.push({ 
                property: 'cnt_org_fc',
                value: organizaciones,
                id: 'organizaciones'
            });
            
        }
        
        
        if  (formadepago) {
            
             filters.push({ 
                property: 'cnt_formapago',
                value: formadepago,
                id: 'formadepago'
            });
            
        }
        
        
        
        store.clearFilter(true);
        if (filters)
            store.filter(filters);
            
            
    },
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var model = this.getCrm_contratoModelModel();
        var proxy = model.getProxy();
        panel=grid.up('tabpanel')
        var title = getLocale('Contrato')+': '+ record.get('Id');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        var view = grid.up('pagogridview')
        
        
        
		if (!mytab) {
            var newTab = Ext.widget('contratoformview', {
                record: record,
                translate:false,
                targetTab: newTab,
    			title : title,
    			closable : true,
                organizacionId: view.record?view.record.get('Id'):false,
                caller:view
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