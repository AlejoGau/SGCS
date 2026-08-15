Ext.define('SGWebCrm.controller.AttachFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'AttachModuleStore' ],
    models : [ 'RelationSearchModel', 'AttachModel' ],
    views : [ 'AttachFormView', 'AttachViewer', 'AttachDescriptionFormView' ],

    init : function(config) {
		// genero los eventos

		this.control({
			'attachformview' : {
				afterrender : this.initview
			},
			'attachformview button[action="save"]' : {
				click : this.onSaveClick
			},
            'attachdescriptionformview button[action="save"]' : {
    			click : this.onSaveClick
			},
			'attachformview button[action="delete"]' : {
				click : this.onDeleteClick
			},
            'attachformview button[action="newContent"]' : {
                click: this.onNewClick
            },
            'attachformview #structureList' : {
    			beforerender : this.loadStructureData
			},

            'attachformview button[action="newHighlight"]' : {
                click: this.onNewHighlightClick
            }
        });
	}, 

	initview : function(view) {
        view.loadRecord(view.record);
        view.searchName = 'attachfile';
	},    
    
    loadStructureData : function(view) {
        var store = this.getStructureStoreStore();
        view.bindStore(store);
    },

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		myform = button.up('form').getForm();
		mymodel = myform.getRecord();
		
        oldname = mymodel.get('Name');
		myform.updateRecord(mymodel);
		newname = mymodel.get('Name');

		mymodel.save({
			scope : this,
			callback : function(record, operation) {
                if (operation.wasSuccessful())
                    notify('Los datos se guardaron correctamente');
			},
			button : button
		});

	},

	onDeleteClick : function(button, event, options) {
		var view = button.up('attachformview');
        var record = view.record;
		this.deleteObject(record);
        
        
	},
    
    onNewClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        
        var view = button.up('attachformview');
        var record = view.record;
        var parentId = record.get('Id');
        
        var model = this.getContentModelModel();
        var proxy = model.getProxy();
        var url = '/Rest/attach/'+parentId+'/attach';
        var me = this;
        
        proxy.url = url;
        var content = Ext.create(model,{
            Name: 'Nuevo archivo'
        });
        
        content.save({callback: function(record, operation){
            var contentId = record.get('Id');
            me.openObjectIframe(contentId,'attach',record.get('Name'));
        }});
        
    },
    
    openObjectIframe: function(objectId, objectTypeName, title){
        var center = window.parent.Ext.getCmp('center');
        if (center){
            var url = '/a/'+objectTypeName+'?objectId='+objectId;
            var newTab = Ext.create('Ext.ux.IFrame', {
                title : title,
    			border : false,
    			src : url,
    			closable : true,
                autoDestroy: true
    		});
            
            center.add(newTab);
    		center.setActiveTab(newTab);
        }
        
    },
    
    onNewHighlightClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var controller = this;
        var view = button.up('attachformview');
        var container = view.up('attachview');
        var record = view.record;
        var attach = record;
        var parentId = record.get('Id');
        var targetTab = container.targetTab?container.targetTab:Ext.getCmp('center');
        var section = container.section;
        
        if (section){
            this.createHighlight(attach, section.get('Id'), targetTab);
        } else {
            var win = Ext.widget('window',{
                title: 'Seleccione la sección',
                width: 300,
                height: 400,
                layout: 'fit',
                tbar:[
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Sitio',
                        labelWidth: 53,
                        store: 'SiteStore',
                        queryMode: 'remote',
                        displayField: 'Name',
                        forceSelection: true,
                        itemId: 'sitelist',
                        valueField: 'Id',
                        listeners:{
                            select: function(combo, records){
                                var record = records[0];
                                var relationsTree =  Ext.widget('treepanel',{
                                    preventHeader: true,
                                    targetTab: targetTab,
                                    record: record,
                                    listeners: {
                                        select: function(tree,record,index){
                                            var sectionId = record.get('ObjectId'); 
                                            controller.createHighlight(attach, sectionId, targetTab);
                                            win.close();
                                        }
                                    },
                                    store: {
                                        model: controller.getRelationSearchModelModel(),
                                        folderSort: true,
                                        sorters: [
                                            {
                                                property : 'ObjectName',//ObjectName
                                                direction: 'ASC'
                                            }
                                        ],
                                        root: {
                                            text : record.get('Name'),
                                            id : record.get('Id'),
                                            expanded: true,
                                            ObjectId: record.get('Id'),
                                            ObjectTypeName : 'Site'
                                        }
                                    }
                                });
                                win.add(relationsTree);
                            }
                        }
                    }
                ],
                items:[
                    
                ],
                autoShow: true
            })
            
        }
        
        
    },
    
    createHighlight: function(attach, sectionId,targetTab){
        var model = this.getHighlightModelModel();
        var proxy = model.getProxy();
        var oldUrl = proxy.url;
        var url = '/Rest/section/'+sectionId+'/Highlight';
        var controller = this;
        
        proxy.url = url;
        var object = Ext.create(model,{
            Name: attach.get('Name'),
            ObjectTypeId: attach.get('ObjectTypeId'),
            SmallComment: attach.get('SmallComment'),
            LargeComment: attach.get('LargeComment'),
            ObjectId: attach.get('Id'),
            DateStart: new Date(),
            DateEnd: new Date(Ext.Date.add(new Date(),Ext.Date.Day,1))
        });
        
        object.save({callback: function(record, operation){
            proxy.url = oldUrl;
            if (operation.success)
                var newTab = Ext.widget('highlightview', {
                    iconCls: 'icon-Highlight',
                    title : record.get('Name'),
                    border : false,
        			closable : true,
                    sectionId: sectionId,
                    record: record,
                    objectId: record.get('Id'),
                    targetTab: targetTab,
                    autoDestroy: true
        		});
                
                targetTab.add(newTab);
                targetTab.setActiveTab(newTab);
        }});
        
    },
    
    deleteObject: function(record){
        record.destroy({callback: function(){
            var center = window.parent.Ext.getCmp('center');
            if (center){
                center.getActiveTab().close();
            
                var paging = center.down('attachgridview').down('pagingtoolbar');
                paging.moveFirst();
                paging.doRefresh();
            }
        }});
		//location.href = location.pathname;
    }
});