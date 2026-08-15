//-----------------model--------------------


Ext.define('Common.model.tree.Task', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'text',
        type: 'string'
    }, {
        name: 'duration',
        type: 'float'
    }, {
        name: 'done',
        type: 'boolean'
    }]
});
//-------------------------------------------
//---------DATA-------------


//-------------------------------------------


Ext.define('Common.controller.TaxonomyTreeController', {
    extend: 'Ext.app.Controller',
            //stores : [ 'Common.store.TaxonomiesStore' ],
    		models : [ 'TaxonomyTreeSearchModel','TaxonomyModel' ],
			views : [ 'TaxonomyTreeView' ],


    init: function (config) {
        // genero los eventos
        this.control({
            // cargo datos antes de mostrar
            'taxonomiestree': {
                beforeload: this.loadEvent,
                select: this.onSelect,
                afterrender: this.initView
            },
            'taxonomiestree button[action=taxonomySave]': {
                click: this.saveEvent
            },
            'taxonomiestree button[action=taxonomyEdit]': {
                click: this.editEvent
            },
            'taxonomiestree button[action=taxonomyAdd]': {
                click: this.addEvent
            },
            'taxonomiestree button[action=taxonomyDelete]': {
                click: this.deleteEvent
            }
        });

    }, // cierro init
    
    initView: function(view){
        var model = this.getTaxonomyTreeSearchModelModel();//this.getTaxonomyModelModel();// 
        var record = view.record;
        var objectTypeName = record.get('ObjectTypeName')?record.get('ObjectTypeName'):getObjectTypeName(record.get('ObjectTypeId'))
        var objectId = record.get('Id');

        

       
        var proxy = new Ext.data.proxy.Rest({
            url: '/Rest/'+objectTypeName+'/'+ 34/* hardcode */ + '/taxonomies?node=0&',
            
                listeners: {
                    'exception': function (proxy, response, operation) {
                        //console.log(arguments);
                        var error = response.statusText;
                        var description = response.responseText;
            
                        // me fijo si es token invalido (esto debe cambiar a error 403)
                        if (description && description.match(/Invalid Token/)) {
                            notifyError('La sesión expiró, por favor vuelva a ingresar al sistema.');
                            parent.location.href = "/";
                        }
                        else{
                            
                        }
                            
                    }
                }
                    
        });
        //model.setProxy(proxy);
        var store = Ext.create('Ext.data.TreeStore', {
            model: model,//'Common.model.tree.Task',
            //storeId: 'Taxonomies',
            proxy: {
                type: 'ajax',
                //https://desktop.softguard.com/Rest/Organization/1493/taxonomies?node=0
                url: '/Rest/Organization/'+objectId+'/taxonomies',
                writer:{ writeAllFields:true },
                appendId : false    
            },            
            //ObjectTypeName: record.get('ObjectTypeName')?record.get('ObjectTypeName'):getObjectTypeName(record.get('ObjectTypeId')),
            //ObjectId: record.get('id'),
            autoLoad: false,
            autoSync: false,  
          
            root: {
                text : getLocale('Grupos'),
                root: true,
                expanded: true,
                id : 0,
                //ObjectId: objectId,
                //ObjectTypeName : record.get('ObjectTypeName')?record.get('ObjectTypeName'):getObjectTypeName(record.get('ObjectTypeId'))

            }
             
            /*root: {
                text : '.',
                root: false,
                expanded: true,
                //Id : view.rootId,
                //ObjectId: objectId,
                //ObjectTypeName : record.get('ObjectTypeName')?record.get('ObjectTypeName'):getObjectTypeName(record.get('ObjectTypeId'))
            }*/
        });         
        view.bindStore (store);
        store.load();
    
    },

    loadEvent: function (store, operation, options) {
        operation.scope = store;
        return operation;
    },

    saveEvent: function (button, event) {
        var view = button.up('taxonomiestree');
        var store = view.getStore();
        var records = store.getUpdatedRecords();
        if(records.length==0)
            return; // no hay modificaciones no se guarda nada        
        var objectId = records[0].get("ObjectId");

        //y luego hago el 
        //guardo los cambios con Taxo_ObjectTaxonomyInsORUpd

        Ext.Array.each(records, function (rec) {
            var objectid = rec.get("");
            if (!rec.get('root')){
                rec.getProxy().api={
                    update: '/Rest/Organization/'+view.record.get('Id')/*aqui mando el Id de la organización*/+'/taxonomies'
                }
                rec.save({scope:store, callback: function(record,operation){
                    if (operation.success)
                    {
                        notify('Se guardó con éxito');
                    }
                    else
                    {
                        notifyError('Error de comunicación con el servidor');
                    }
                }});
                
            }
        },this);
    },
    
    editEvent: function () {
        var component =Ext.getCmp('taxonomiesTree');
    	var view = component.getView();
    	var selectionmodel = view.getSelectionModel();
    	this.selectednode = selectionmodel.selected.items[0];
    	
		Ext.MessageBox.show({
		   title:    'Editar grupo',
		   msg:      'Nuevo Nombre:<br /><br /><input id="nuevonombretaxonomia" style="width:100%" />',
		   buttons:  Ext.MessageBox.OKCANCEL,
		   fn: function(btn, o, i) {
		      if( btn == 'ok') {
		         var nombre = Ext.get('nuevonombretaxonomia').getValue();
		         var node = this.selectednode;
		         node.set('text', nombre);
		         node.save({scope:this.application});
		      }
		   },
		   scope:this
		});
    },
    
    onSelect: function(selModel, record, index, options){
        this.uncheckChildren(record,this);
        this.uncheckParent(record,this);
        return true
    },
    
    uncheckChildren: function(node, controller){
        node.eachChild(function(child){
            child.set('checked', false);
            controller.uncheckChildren(child, controller)
        })
    },
    
    uncheckParent: function(node, controller){
        if(node){
            var parent = node.parentNode;
            if (parent){
                parent.set('checked', false);
                controller.uncheckParent(parent, controller)
            }
        }
    },
    
    addEvent: function (button, event) {
    	var view = button.up('taxonomiestree');
    	var selectionmodel = view.getSelectionModel();
    	var node = selectionmodel.selected.items[0];
        
		Ext.MessageBox.show({
		   title:    'Nuevo grupo',
		   msg:      'Nombre:<br /><br /><input id="nuevonombretaxonomia" />',
		   buttons:  Ext.MessageBox.OKCANCEL,
		   fn: function(btn, o, i) {
		      if( btn == 'ok') {
		         var nombre = Ext.get('nuevonombretaxonomia').getValue();
		         if (node){
    	             var nodeId = node.get('id');
		         }
				 else {
    			    var nodeId = 0;
				 }
				 var taxonomyModel = this.getTaxonomyModelModel().create({
					text: nombre,
					parentId: nodeId
				 });
				 console.log("TaxonomyController.BeforeSave");
				 taxonomyModel.save({callback:function(record,operation){
					console.log("TaxonomyController.OnSave", arguments);
					if(operation.success){
						var recordId = record.get('id');
						node.appendChild({id: recordId, 'text':nombre, leaf:false});
					}
				 }});
		      }
		   },
		   scope:this
		});
    },
    
    deleteEvent: function () {
    	var component =Ext.getCmp('taxonomiesTree'); 
    	var view = component.getView();
    	var selectionmodel = view.getSelectionModel();
    	this.selectednode = selectionmodel.selected.items[0];
    	
		Ext.MessageBox.show({
		   title:    'Eliminar grupo',
		   msg:      '¿Está seguro?',
		   buttons:  Ext.MessageBox.YESNO,
		   fn: function(btn, o, i) {
		      if( btn == 'yes') {
		         var node = i.scope.selectednode;
		         node.destroy({scope:this.application, node: node});
		         console.log("taxonomyDelete", node);
		      }
		   },
		   scope:this
		});
    }

});
