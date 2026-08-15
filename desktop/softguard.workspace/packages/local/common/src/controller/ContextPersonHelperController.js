Ext.define('Common.controller.ContextPersonHelperController', {
    extend : 'Ext.app.Controller',
   // stores : @ViewBag.ExtStoreList,
   // models : @ViewBag.ExtModelList,
    views : ['ContextPersonHelperView'],

    init : function(config) {
        // genero los eventos
		this.control({
					'contextpersonhelperview' : {
						afterrender : this.initView
					},
                    'contextpersonhelperview button[action=selected]' : {
                        click: this.onSelectedClick
                    }
				});
	}, //

	initView : function(view) {
        /**
         * input:
         * {
         *   mismaOrganizacion: {record:(obj Organizacion),titleTab:(string)},
         *   organizacionSecundaria: {record:(obj Organizacion),titleTab:(string)},
         *   mostrarTodo: {mostrar:(bool)}
         * }
         */

        var record = view.record;
        
        if (record && view.filterByParentTaxonomy == true){
            var taxonomiesArray = [];
            if (taxonomiesArray.length > 0){
                view.filters.push({
                    property: 'Taxonomy',
                    value: taxonomies,
                    id: 'taxonomy'
                });
            }
        }

        var targetTab = view.down('#center_person');

        //Personas de la misma organizacion
        if(view.mismaOrganizacion) {
            var filters;
            if (view.mismaOrganizacion.record && !view.filterByParentTaxonomy){
                filters = [
                    {
                        property: view.mismaOrganizacion.record.get('ObjectTypeName')+':RelationParent',
                        value: view.mismaOrganizacion.record.get('Id')
                    }
                ]
            }

            view.tabMismaOrganizacion = Ext.widget('contextpersongridview', {
                title : view.mismaOrganizacion.titleTab,
                border : false,
    			closable : false,
                autoDestroy: true,
    		});
            var store =Ext.create('Ext.data.Store',{
                model: this.getPersonSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: filters
            })
            view.tabMismaOrganizacion.bindStore(store);
            store.load();
            
            
            targetTab.add(view.tabMismaOrganizacion);
    		targetTab.setActiveTab(view.tabMismaOrganizacion);
            
        }
        
        //Personas otra organizacion
        if(view.organizacionSecundaria) {
            var filters;
            if (view.organizacionSecundaria.record && !view.filterByParentTaxonomy){
                filters = [
                    {
                        property: view.organizacionSecundaria.record.get('ObjectTypeName')+':RelationParent',
                        value: view.organizacionSecundaria.record.get('Id')
                    }
                ]
            }
            
            
             view.tabOrganizacionSecundaria = Ext.widget('contextpersongridview', {
                title : view.organizacionSecundaria.titleTab,
                border : false,
        		closable : false,
                autoDestroy: true,
    		});
            
            var store =Ext.create('Ext.data.Store',{
                model: this.getPersonSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: filters
            })
            view.tabOrganizacionSecundaria.bindStore(store);
            store.load();
            
            targetTab.add(view.tabOrganizacionSecundaria);
        }
        
        //Personas todas las organizaciones
        if(view.mostrarTodo.mostrar) {
            view.tabMstrarTodo = Ext.widget('contextpersongridview', {
                title : 'Todo',
                border : false,
        		closable : false,
                autoDestroy: true,
    		});
            var store =Ext.create('Ext.data.Store',{
                model: this.getPersonSearchModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: view.filters
            })
            view.tabMstrarTodo.bindStore(store);
            view.tabMstrarTodo.down('pagingtoolbar').bindStore(store);
            store.load();
            
            
            targetTab.add(view.tabMstrarTodo);
        }

	},
    
    onSelectedClick: function(button, event, options){
        var view = button.up('contextpersonhelperview');
        
        
        var selectedMismaOrganizacion = [];
        var selectedOrganizacionSecundaria = [];
        var selectedTodo = [];
        
        if(view.tabMismaOrganizacion) {
            selectedMismaOrganizacion = view.tabMismaOrganizacion.getSelectionModel().getSelection();
        }
        if(view.tabOrganizacionSecundaria) {
            selectedOrganizacionSecundaria = view.tabOrganizacionSecundaria.getSelectionModel().getSelection();
        }
        if(view.tabMstrarTodo) {
            selectedTodo = view.tabMstrarTodo.getSelectionModel().getSelection();
        }
        
        var selected = selectedMismaOrganizacion.concat(selectedOrganizacionSecundaria,selectedTodo);
        
        var win = view.up('window');
        var caller = win.view;
        caller.fireEvent('personselected',selected,caller);
        win.close();
    },

});
