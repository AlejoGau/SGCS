Ext.define('Common.controller.ContratoTemplateGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_template_contratoModel', 'm_template_contratoSearchModel' ],
    views : [ 'ContratoTemplateGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'contratotemplategridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                refresh: this.refresh
			},
            'contratotemplategridview button[action=search]': {
                click: this.onSearchClick
            },
            'contratotemplategridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'contratotemplategridview button[action="newAviso"]' : {
                click: this.onNewAvisoClick
            },
            'contratotemplategridview button[action="new"]' : {
                click: this.onNewOrderClick
            },
            'contratotemplategridview #newheader' : {
                click: this.onNewHeaderClick
            },            
            'contratotemplategridview button[action=groupStatus]' : {
				click : this.onGroupStatusClick
			}
		});
	},
    
    refresh: function (view) {
        view.getStore().load()
    },

	initView : function(view) {
        
        view.filters = []
        if(view.tipo) {
            view.filters = [
                    {
                        property:'tmp_itipo:ININT',
                        value: view.tipo
                    }
                ];    
        }
        
        if(view.tipo == 2) {
            view.setTitle(getLocale('Templates de aviso'))
            view.down('#newAviso').show()
            view.down('#new').hide()
            view.down('#newheader').hide()
        }
        
    	var store = Ext.create('Ext.data.Store', {
            model : this.getM_template_contratoSearchModelModel(),
            remoteFilter: true,
            filters: view.filters,
        	autoload: false
        });
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        view.bindStore(store);
        store.load();
        
        
       
        
	},
    onGetAllClick: function(button, event, options) {    
        var view = button.up('contratotemplategridview');
        var store = view.getStore();
        store.clearFilter(true);
        
      
        
        
        store.filter(view.filters)
    },
    
    onNewAvisoClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('contratotemplategridview');
        
        var model = this.getM_template_contratoModelModel();
      
        var record = Ext.create(model,{
            tmp_itipo: 2
        });

        var title = getLocale('Nuevo Template de aviso');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
      
        
        if (!mytab) {
            var newTab = Ext.widget('avisoprogramadotemplateformview', {
                record: record,
                translate:false,
                targetTab: newTab,
    			title : title,
    			closable : true,
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
    
    onNewOrderClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('contratotemplategridview');
        
        var model = this.getM_template_contratoModelModel();
      
        var record = Ext.create(model,{
            tmp_itipo: 1
        });

        var title = getLocale('Nuevo Template de contrato');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
      
        
    	if (!mytab) {
            var newTab = Ext.widget('contratotemplateformview', {
                record: record,
                translate:false,
                targetTab: newTab,
    			title : title,
    			closable : true
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
       
        
    },
    
    onNewHeaderClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('contratotemplategridview');
        
        var model = this.getM_template_contratoModelModel();
      
        var record = Ext.create(model,{
            tmp_itipo: 3
        });

        var title = getLocale('Nuevo header');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
      
        
        if (!mytab) {
            var newTab = Ext.widget('contratotemplateformview', {
                record: record,
                translate:false,
                targetTab: newTab,
    			title : title,
    			closable : true
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
        var view = button.up('contratotemplategridview');
        
        var store = view.getStore();
        var query = view.down('#query');
        var field = view.down('#fieldName');
        
 
        var filters = Ext.Array.clone(view.filters);
 
        var nombre = view.down('#nombre').getValue();
        var asunto = view.down('#asunto').getValue();
        
       
        
        if  (nombre) {
            
             filters.push({ 
                property: 'Name:LIKE',
                value: nombre,
                id: 'nombre'
            });
            
        }
        
        if  (nombre) {
            
             filters.push({ 
                property: 'tmp_asunto:LIKE',
                value: asunto,
                id: 'asunto'
            });
            
        }
        
        
        
        
        
        store.clearFilter(true);
        if (filters)
            store.filter(filters);
            
            
    },
    
    onGroupStatusClick: function(button, event, options){
        var view = button.up('contratotemplategridview');
        var grid = view.view;
        store = view.getStore();
            
        if (button.pressed){
            
            store.group('cnt_estado','ASC');
        }else {
            store.clearGrouping();
        }
        
    },
    
    onItemClick: function(view,record,item,index,e,options){
        var id = record.get('Id');
        var model = this.getM_template_contratoModelModel();
        var proxy = model.getProxy();
        record.getProxy().url = proxy.url;
        panel=view.up('tabpanel')
        var title = getLocale('Template')+': '+ record.get('Id');
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        
        
        if (!mytab) {
                if(record.get('tmp_itipo') == 2) {
                    var newTab = Ext.widget('avisoprogramadotemplateformview', {
                        record: record,
                        translate:false,
                        targetTab: newTab,
                		title : title,
            			closable : true,
                        caller:view
            		});
                } else {
                    var newTab = Ext.widget('contratotemplateformview', {
                        record: record,
                        translate:false,
                        targetTab: newTab,
                    	title : title,
            			closable : true,
                        caller:view
            		});
                }
                
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
