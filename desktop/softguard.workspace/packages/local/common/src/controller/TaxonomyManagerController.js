Ext.define('Common.controller.TaxonomyManagerController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TaxonomyModel' ],
    views : [ 'TaxonomyManagerTreeView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'taxonomymanagertree' : {
                beforerender : this.initView,
                itemcontextmenu : this.onItemContextMenu,
                edit: this.onEdit,
                beforeedit: this.beforeEdit
    		},
    		'taxonomymanagertree button[action="taxonomySave"]' : {
				click : this.onSaveClick
			},
        	'taxonomymanagertree button[action="createparent"]' : {
				click : this.onCreateParentClick
			}
		});
	}, // cierro init
    
    beforeEdit: function(editor, e) {                       
        // no deja que se edite                
        if(e.record.get('Id') == 0) {
            return false;
        }
    },
    
    initView: function(view){
        this.viewRef = view;
        view.on('beforeedit', function(editor, e) {
          if (e.colIdx === 0 && e.record.get('status') == 4)
            return false;
        });
    },

    onSaveClick : function(button, event, options) {
        var view = button.up('taxonomymanagertree');
		var store = view.getStore();
        store.sync({callback: function(batch){
            Ext.Array.each(batch.operations, function(operation, index, array){
                if (operation.success)
                {
                    notify('El grupo se guardó con éxito');
                }
                else
                {
                    notifyError('Error de comunicación con el servidor');
                }
            })
        }});
	},
    
    onCreateParentClick: function(button, event, options) {
        var view = button.up('taxonomymanagertree');
    	var store = view.getStore();
        var model = this.getTaxonomyModelModel();

        var newtaxo = Ext.create(model,{
            Id:0,
            Name: getLocale('Nuevo grupo'),
            text: getLocale('Nuevo grupo'),
            Parent: 0
        });
        
        newtaxo.save({callback: function(taxo){
            store.setRootNode({
                text : getLocale('Grupos'),
                root: true,
                expanded: true,
                Id : 0
            });
        }});
	},
    sync: function(){
        var controller = this;
		var store = controller.viewRef.getStore();
        store.sync({callback: function(batch){
            Ext.Array.each(batch.operations, function(operation, index, array){
                if (operation.success)
                {
                    notify('El grupo se guardó con éxito');
                }
                else
                {
                    notifyError('Error de comunicación con el servidor');
                }
            })
        }});        

    },
    onEdit: function(editor){
        var record = editor.context.record;
        var value = editor.context.value;
        
        record.set('Name',value);
        this.sync();
    },
    
    onItemContextMenu: function(view,record,item,index,e) {
        e.stopEvent();
        var controller = this;

        // si la taxo es nueva no puedo agregar hijos.
        if (record.get('Id')){
            view.contextMenu = new Ext.menu.Menu({
                record: record,
                items: [
                {
                   text: 'Nuevo grupo',
                   iconCls: 'icon-Taxonomy-add',
                   handler: this.onTaxonomyAdd,
                   scope: controller
                },
                {
                   text: 'Eliminar grupo',
                   iconCls: 'icon-Taxonomy-delete',
                   handler: this.onTaxonomyDel,
                   scope: controller
                }
                ]
            }).showAt(e.clientX, e.clientY);
        }
    },
    
    onTaxonomyAdd: function(button, event, options) {        
        var menu = button.up('menu');
        var record = menu.record;
        var model = this.getTaxonomyModelModel();
        var controller = this;
        var newtaxo = Ext.create(model,{
            Id:0,
            Name: getLocale('Nuevo grupo'),
            text: getLocale('Nuevo grupo'),
            Parent: record.get('Id')
        });
        
        newtaxo.save({callback: function(taxo){
            
            controller.viewRef.store.load();
            /*
            record.store.treeStore.setRootNode({
                text : getLocale('Grupos'),
                root: true,
                expanded: true,
                Id : 0
            });
            */
        }});
        
    },
    
    onTaxonomyDel: function(button, event, options) {        
        var menu = button.up('menu');
        var record = menu.record;
        record.remove();
        this.sync();

    }

    
});
