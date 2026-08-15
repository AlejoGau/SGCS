//MIGRADO2024
Ext.define('Common.controller.EncuestaController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.EncuestaSecurityModuleStore' ],
    models : [ 'ModuleModel' ],
    views : [ 'EncuestaView' ],
    init : function(config) {
        // genero los eventos
        this.control({
			'encuestaview' : {
				afterrender : this.initview
			}
    				
        });
	}, // cierro init
    initview : function(view) {
        var controller = this;
        var record = view.record;
        
        /**
         * Obtengo el elemento ModuleTreeView de la vista principal
         * Se le crea un Store con el modelo de datos en base a ModuleModel
         * Se debe relacionar al controlador dicho modelo
         */
        var west = view.down('moduletreeview')
        var securityTreeStore = Ext.create('Ext.data.TreeStore', {
            //model : this.getModuleModelModel(),
            //autoLoad : false,
            root: {
                expanded: true,
                text : 'Opciones',
                /*children: [ Dejo esto como ejemplo funcional
                    { text: "detention", leaf: true },
                    { text: "homework", expanded: true, children: [
                        { text: "book report", leaf: true },
                        { text: "algebra", leaf: true}
                    ] },
                    { text: "buy lottery tickets", leaf: true }
                ]*/
            }
        });
        west.targetTab = view.down('tabpanel');
        west.bindStore(securityTreeStore);
        
        
        /**
         * Obtengo el root del Nodo principal del ModuleTreeView y lo clono igual al del Store creado anteriormente
         */
        west.setRootNode(deepCloneRoot(securityTreeStore.getRootNode()));
                
        /**
         * Traigo el Store que tiene las vistas a ser agregadas al ModuleTreeView
         * Por cada una de estas vistas, hago un appendChild al ModuleTreeView
         * expando el arbol para que se vea completo
         */
        var modules = Ext.data.StoreManager.lookup('Common.store.EncuestaSecurityModuleStore')
        
        modules.each(function(_module){
            /**
             * Genero tab del elemento principal que deseamos ver que esta en el Store
             */
             switch(_module.get('view')) {
                case "encuestasformview":
                    var newTab = Ext.widget('encuestasformview',{
                        iconCls: _module.get('iconCls'),
                        record: record,
                        translate: false,
                        title: getLocale(_module.get('text')),
                        closable: false,
                        module: _module,
                        profile: _module.get('profile'),
                        caller : view.caller
                    });
                    // agrego la paleta creada
                    west.targetTab.add(newTab);
                    
                    west.store.getRootNode().appendChild({
                        text : getLocale(_module.get('text')),
                        iconCls : _module.get('iconCls'),
                        leaf : true,
                        view : _module.get('view'),
                        closable: true,
                        translate:false,
                        closeAction: 'destroy',
                        viewConfig: "{ closeAction: 'destroy' }" 
                	})
                break
                default:
                   west.store.getRootNode().appendChild({
                        text : getLocale(_module.get('text')),
                        iconCls : _module.get('iconCls'),
                        leaf : true,
                        view : _module.get('view'),
                        closable: true,
                        translate:false,
                        closeAction: 'destroy',
                        viewConfig: "{ closeAction: 'destroy' }" 
            		})
             }
        })
        west.getRootNode().expand();
        
        
         
        
    }
})