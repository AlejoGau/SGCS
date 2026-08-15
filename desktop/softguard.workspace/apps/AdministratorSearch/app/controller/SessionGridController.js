Ext.define('AdministratorSearch.controller.SessionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SessionSearchModel' ],
    views : [ 'SessionGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'sessiongridview' : {
				afterrender : this.initView,
             //   itemdblclick: this.onItemClick,
                closeSession: this.onCloseSession,
                refresh: this.onRefreshClick
               // groupclick: this.onGroupClick
               
			},
           /* 'sessiongridview button[action=search]': {
                click: this.onSearchClick
            },*/
            'sessiongridview #search': {
                click: this.onRefreshClick
            },
            'sessiongridview #all': {
                click: this.onAllClick
            },
            'sessiongridview button[action=refresh]': {
                click: this.onRefreshClick
            },
           /* 'sessiongridview button[action=add]': {
                click: this.onAdd
            },*/
            'sessiongridview button[action="cerrar"]' : {
    			click : this.onCerrarClick
			},
            'sessiongridview button[action="groupmodule"]' : {
        		click : this.onGroupModuleClick
			},
            'sessiongridview button[action="groupuser"]' : {
            	click : this.onGroupUserClick
			},
            'sessiongridview button[action="grouporganization"]' : {
                click : this.onGroupOrganizationClick
			}
            
            
            
		});
	},
    
    
  /*  onGroupClick: function(view, node, group, e, eOpts) {
        console.log(arguments);
        if (e.getTarget().type === 'button'){
            this.onCloseSession(view,node)
        }
    },*/
    
    
    onAllClick: function(btn) {
        var view = btn.up('sessiongridview');
        
        var fieldName = view.down('#fieldName').setValue('');
        var query = view.down('#query').setValue('');
        
        this.onRefreshClick(view);
    },
    
    
    onGroupModuleClick: function (btn) {
         var view = btn.up('sessiongridview');
         view.store.group('modulo','ASC');
    },
    onGroupUserClick: function (btn) {
         var view = btn.up('sessiongridview');
         view.store.group('udw_usuarios','ASC');
    },
    onGroupOrganizationClick: function (btn) {
         var view = btn.up('sessiongridview');
         view.store.group('OrganizationName','ASC');
    },
    
    onRefreshClick: function (btn) {
        var view = btn.up('sessiongridview')?btn.up('sessiongridview'):btn;
        view.store.loadData([],false);
        
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
         var filters = [];
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        
         Ext.Ajax.request({
                  url: '/handler/SessionsSearchHandlerAlt',
                  method: 'GET',
                  params: {filter:Ext.JSON.encode(filters)},
                  scope: this,
                  success: function(response){
                    var data = Ext.JSON.decode(response.responseText);
                    
                    
            
                    Ext.Array.each(data, function(obj){
                 
                        
                        view.store.add({
                            udw_nombre: obj.nombre,
                            udw_apellido: obj.apellido,
                            udw_usuarios: obj.userId,
                            modulo: obj.modulo,
                            AccessToken: obj.AccessToken,
                            OrganizationName: obj.OrganizationName
                        });
                    });
                    view.store.group('udw_usuarios','ASC');
                  }
            });
        
    },

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getSessionSearchModelModel(),
            pageSize: 50,
            remoteSort: false,
            remoteFilter: true,
            filters: view.filters,
            remoteGroup: false,
            groupField: 'modulo',
        })
        view.bindStore(view.store);
      
        view.groupingFeature = view.getView().getFeature('groupingMSTSession');
        //view.store.sorters.clear();
        //view.store.groupers.clear();
        view.store.group('modulo','ASC');
        view.groupingFeature.enable();
        view.groupingFeature.pruneGroupedHeader();
		view.groupingFeature.unblock();
		//view.groupingFeature.refreshIf();
        
        Ext.Ajax.request({
                  url: '/handler/SessionsSearchHandlerAlt',
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var data = Ext.JSON.decode(response.responseText);
                    
                    
            
                    Ext.Array.each(data, function(obj){
                 
                        
                        view.store.add({
                            Id:0,
                            Name: "",
                            ObjectTypeId: 3102,
                            ObjectTypeName: "usertoken",
                            udw_nombre: obj.nombre,
                            udw_apellido: obj.apellido,
                            udw_usuarios: obj.userId,
                            modulo: obj.modulo,
                            AccessToken: obj.AccessToken,
                            OrganizationName: obj.OrganizationName
                        });
                    });
                    
                    view.store.group('udw_usuarios','ASC');
                  }
            });
        
        
	},
    
    onCloseSession: function (record,view) {    
       // view.down('pagingtoolbar').doRefresh();       
        //cerrar sesion
        
        view.caller.fireEvent('closesession',view.caller, record,view)
    },
    
 
    
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('sessiongridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        //var filters = Ext.clone(view.filters);
        var filters = [];
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                id: fieldName,
                value: query
            });
            
        }
        
        
        if (filters.length>0){
        
            
           // view.down('#filtros').setValue(
            store.filter(filters);
            
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onCerrarClick : function(button, event, options) {
            
        var view = button.up('sessiongridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            
            Ext.MessageBox.confirm('Confirm', 'Estas seguro que quieres cerrar todas las sesiones seleccionadas ?', function (btn) {
                        if(btn == 'yes') {
                          // view.store.remove(selection);
                        //   var delRec = view.store.getRemovedRecords();
                            Ext.Array.each(selection, function (rec) {
                                /*rec.destroy({callback: function(record, operation){
                                   
                                   
                                        if (operation.success)
                                        {
                                            notify('Se cerro exitosamente');
                                            
                                        }
                                        else
                                        {
                                           notify('No se puede cerrar la sesion.');
                                        }                    
                                        view.store.load();
                                }*/
                                
                               
                                
                           // });
                             view.caller.fireEvent('closesession',view.caller, rec,view)
                             
                            },this);
                        }
                    });
            
            
            
        }
        		
	}

});