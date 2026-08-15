Ext.define('Common.controller.PersonController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.GeographyStore', 'Common.store.PersonModuleStore' ],
    models : [ 'PersonModel', 'OrganizationSearchModel' ],
    views : [ 'ExtUxNotification', 'PersonGridView', 'PersonNorthView', 'PersonView' ],

    init : function(config) {
		// genero los eventos
		this.control({
            'viewport button[action=createperson]': {
                click: this.onCreatePersonClick
            },
            'personview' : {
                beforerender : this.initview
        	}

		});
        
        var store = this.getGeographyStoreStore();
        store.load();
	}, // cierro init
    
    initview: function(view){
        var objectId = view.objectId;
        record = this.loadRecord(objectId,view);
    },


    loadRecord: function(objectId,view){
        record = this.getPersonModelModel();
        if (objectId == 0) {    
            var now = new Date();
        	var myobject = record.create({
				Name : getLocale('Nuevo contacto')
			});            
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    				this.setRecord(record,view);
    			}
			});
		} else {            
		    record.load(objectId, {
				callback : function(record,operation) {
                    if (operation.success){
					    this.setRecord(record,view);
                    }
				},
				scope : this
			});
        }
    },

    openObjectList: function(){
        var viewport = Ext.getCmp('viewport');
        var myPanel = Ext.getCmp('center');
        var newTab = Ext.widget('persongridview',{        
            title: 'Personas',
            closable: false
        });
        
        myPanel.add(newTab);		
        var west = Ext.getCmp('west');
        if(west){
            west.hide();
            //viewport.doLayout();
        };
        var viewport = Ext.getCmp('viewport');
        viewport.objectList = true;
        //viewport.doLayout();
	},

	openObjectById : function(objectId) {
        var viewport = Ext.getCmp('viewport');
		record = this.getPersonModelModel();        
        
        if (viewport.objectList){
            this.openObjectIframe(objectId);    
            return true;
        };
        
        if (objectId == 0) {
            var btn = Ext.getCmp('btnNewPerson');
            console.log(btn);
            //btn.hide();
            
            var now = new Date();
			var myobject = record.create({
				Name : getLocale('Nueva persona')
			});            
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    				this.setRecord(record);
    			}
			});
		} else {            
		    record.load(objectId, {
				callback : function(record,operation) {
                    if (operation.success){
					    this.setRecord(record);
                    }
				},
				scope : this
			});
        }
        
	},
    
    setRecord: function(record, viewport){
        var myPanel = viewport.down('tabpanel');
        var center = viewport.down('#center');
        var targetTab = viewport.targetTab;
        center.record = record;
        var title = 'Datos principales';
        
        // si center es un tabpanel agrego el tab, 
        // sino supongo que el form esta cargado y le agrego el record
        if (myPanel){
            var mytab = myPanel.down('[title='+title+']');
            if (!mytab) {
                
               var filters = [];
               filters.push({
                    property: 'o.Id',
                    value: _UserData.Company
                });
                
                var store =Ext.create('Ext.data.Store',{
                    model: this.getOrganizationSearchModelModel(),
                    pageSize: 50,
                    filters: filters,
                    remoteSort: true,
                    remoteFilter: true,
                });
                
                var organizacionSecundaria = {};
                if(viewport.section) {
                   organizacionSecundaria = {record:viewport.section, titleTab: viewport.section.get('LegalName'), multiSelect:true}
                }
                
                store.load({callback:function (records) {
                    var mismaOrganizacion;
                    if (records[0]){
                        mismaOrganizacion = {record:records[0], titleTab: records[0].get('LegalName'), multiSelect:true};
                    }
                    
            		var newTab = Ext.widget('personformview',{
                        record: record,
                        title: title,
                        targetTab: targetTab,
                        closable: false,
                        helperConfig : {
                            xtype: 'contextpersonhelperview',
                            mismaOrganizacion:mismaOrganizacion,
                            organizacionSecundaria: organizacionSecundaria,
                            mostrarTodo: {mostrar:true, multiSelect:true},
                        },
                        recordOrganizacion: viewport.recordOrganizacion
                        
                	});
        
        			// agrego la paleta creada
        			myPanel.add(newTab);
        			myPanel.setActiveTab(newTab);
                }})
    		}
    		// el existe, lo activo
    		else {
    			myPanel.setActiveTab(mytab);
    		}
        } else {
            var form = viewport.down('personformview');
            form.record = record;
            form.loadRecord(record);
            
            // cambio el titulo del padre
            var center = window.parent.Ext.getCmp('center');
            if (center){
                center.getActiveTab().setTitle(record.get('Name'));
            }
        };

        var _module = viewport.down('moduletreeview');
        if (_module) {
            record.recordOrganizacion = viewport.recordOrganizacion
            _module.down('treeview').record= record;           
            _module.record = record;
            _module.targetTab = center;
            _module.down('treeview').targetTab = center;
        }
    
    },
        
    onCreatePersonClick: function(button, event, options){
        var id = 0;
        var view = button.up('viewport').down('personsearchview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Persona';

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('personview', {
                iconCls: 'icon-Person',
    			title : title,
                targetTab: panel,
    			objectId : id,
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
    
    openObjectIframe: function(objectId, objectTypeName, title){
        var myPanel = Ext.getCmp('center');  
        if (!objectTypeName){ objectTypeName = 'person'}
        
        var url = '/a/'+objectTypeName+'?objectId='+objectId;
        var newTab = Ext.create('Ext.ux.IFrame', {
    		title : title,
			border : false,
			src : url,
			closable : true,
            autoDestroy: true
		});
        
        myPanel.add(newTab);
		myPanel.setActiveTab(newTab);
    },

    openObjectIframe: function(objectId){
        var myPanel = Ext.getCmp('center');
        var url = '/a/person?objectId='+objectId;
        var newTab = Ext.create('Ext.ux.IFrame', {
			title : 'Persona',
			border : false,
			src : url,
			closable : true,
            autoDestroy: true
		});
        
        myPanel.add(newTab);
		myPanel.setActiveTab(newTab);
    }
});