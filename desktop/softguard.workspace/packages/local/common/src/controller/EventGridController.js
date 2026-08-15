Ext.define('Common.controller.EventGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.EventTypeStore' ],
    models : [ 'RelationModel', 'EventModel', 'EventSearchModel' ],
    views : [ 'EventGridView' ],

    init : function(config) {
		// genero los eventos
		this.control({
			'eventgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick
			},
            'eventgridview button[action=search]' : {
                click: this.onSearchClick
            },
            'eventgridview button[action=getall]' : {
                click: this.onGetAllClick
            },
			'eventformview' : {
				objectchanged : this.onEventChanged
			},
            'eventgridview button[action="newEvent"]' : {
                click: this.onNewEventClick
            }
		});
	}, // cierro init

	initView : function(view) {
        var record = view.record;
        
        if (!view.filters){
            view.filters = [];
            view.filters.push({ 
                property: 'StartDate:GTE',
                value: new Date(),
                id: 'dateStart'
            });
        }
        
        if (view.hideToolbar){
            view.down('toolbar').hide();
        }
        
        var objectTypeId = 0
        if (record){
            var objectTypeId = record.get('ObjectTypeId');
            var objectTypeName = record.get('ObjectTypeName');
            
            if (objectTypeName == 'Person' || objectTypeName == 'UsersDesktopWeb'){
                view.filters = [
                    {
                        property: objectTypeName+':RelationChild',
                        value: record.get('Id')
                    }
                ]
            } else {
                view.filters = [
                    {
                        property: objectTypeName+':RelationParent',
                        value: record.get('Id')
                    }
                ]
            }
            
            
            
        };
        
		var store = Ext.create('Ext.data.Store', {
            model : this.getEventSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            filters: view.filters,
        	autoload: false
        });
        
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        view.bindStore(store);
        store.load();
	},
    
    onNewEventClick: function(button, event, options) {    
        var me = this;
        var panel = button.up('tabpanel'); 
        
        var view = button.up('eventgridview');
        var record = view.record;
        var parentId = record.get('Id');
        
        var objectTypeName = record.get('ObjectTypeName');
        var model = this.getEventModelModel();      
            
        if (objectTypeName == 'Person' || objectTypeName == 'UsersDesktopWeb'){
            // creo el objeto y agrego el objeto como hijo
            var object = Ext.create(model,{
                Id: 0,
                Name: record.get('Name')+' / '+record.get('Company'),
                EventType: 1,
                Schedule: _UserData.UserId,
                StartDate: new Date(),
                EndDate: Ext.Date.add(new Date(), Ext.Date.HOUR, 1)
            });

            object._parentRecord = record;
            object._needsRelation = true;

            me.onItemClick(view.getView(), object);

        } else if (objectTypeName == 'Organization'){
            // creo el objeto y agrego el objeto como hijo
            var object = Ext.create(model,{
                Id: 0,
                Name: record.get('Name') +' / '+_UserData.FirstName+" "+_UserData.LastName,
                EventType: 1,
                PlaceAddress: record.get('Address'),
                PlaceLat: record.get('AddressLat'),
                PlaceLong: record.get('AddressLong'),
                Schedule: _UserData.UserId,
                StartDate: new Date(),
                EndDate: Ext.Date.add(new Date(), Ext.Date.HOUR, 1)
            });

            // SOLUCION: NO llamar a object.save() aquí
            // Guardar información del padre para crear la relación después del save
            object._parentRecord = record;
            object._needsRelation = true;

            me.onItemClick(view.getView(), object);

        }else {
            // creo el evento como hijo del objeto (compatibilidad general, no se deberia usar)
            var proxy = model.getProxy();
            var oldUrl = proxy.url;
            var url = '/Rest/'+record.get('ObjectTypeName')+'/'+parentId+'/event';

            proxy.url = url;
            var object = Ext.create(model,{
                Id: 0,
                Name: record.get('Name'),
                EventType: 1,
                Schedule: _UserData.UserId,
                StartDate: new Date(),
                EndDate: Ext.Date.add(new Date(), Ext.Date.HOUR, 1)
            });

            proxy.url = oldUrl;
            object._parentRecord = record;
            object._needsRelation = true;

            me.openObjectTab(panel, object);
        }
        
        
        
    },
    
    onEventChanged: function(){
        var view = Ext.ComponentQuery.query('eventgridview')[0];
        if (view){
            var store = view.getStore();
            store.load();
        }
    },
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('eventgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+id+') '+record.get('Name');

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('eventview', {
                iconCls: 'icon-date',
    			title : title,
                record: record,
                translate:false,
                targetTab: panel,
    			objectId : id,
                parentGrid: view,
    			closable : true,
                organizationRecord: view.record
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },
    onGetAllClick: function(button){
        var view = button.up('eventgridview');
        var store = view.getStore();
        var filters = Ext.Array.clone(view.filters);
        store.clearFilter(true);
        store.filter(filters);
    },
    
    onSearchClick: function(button){
        var view = button.up('eventgridview');
        var store = view.getStore();
        var tipo = view.down('#tipo');
        var date = view.down('#date');
        
        var filters = Ext.Array.clone(view.filters);
        
        if (tipo.getValue()){
            filters.push({ 
                property: 'EventType',
                value: tipo.getValue(),
                id: 'tipo'
            });
        }
        
        if (date.getValue()){
            filters.push({ 
                property: 'StartDate:GTE',
                value: date.getValue(),
                id: 'date'
            });
        }
        
        store.clearFilter(true);
        store.filter(filters);
    },
    
    openObjectTab: function(targetTab,object){
        var objectId = object.get('Id');
        var objectTypeName = object.get('ObjectTypeName');
        var title = object.get('Name');
        var container = objectTypeName.toLowerCase() + 'view';
        var newTab = Ext.widget(container, {
            title : title,
        	border : false,
			closable : true,
            record: object,
            objectId: objectId,
            targetTab: targetTab,
            organizationRecord: view.record,
            autoDestroy: true
		});
        
        targetTab.add(newTab);
		targetTab.setActiveTab(newTab);
    }
});
