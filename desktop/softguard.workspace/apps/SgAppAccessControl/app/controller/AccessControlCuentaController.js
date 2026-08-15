Ext.define('SgAppAccessControl.controller.AccessControlCuentaController', {
    extend : 'Ext.app.Controller',
    stores : [ 'AccessControlCuentaStore' ],
    models : [ 'SoftguardCuentaModel','ModuleModel'],
    views : [ 'AccessControlCuentaView' ],
    readonly: false,

    init : function(config) {
        // genero los eventos
    	this.control({
            'accesscontrolcuentaview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        var objectId = view.objectId;
        var controller = this;
        var me = this;
        var datos = view.down('#west');
        
        record = this.getSoftguardCuentaModelModel();
 
        var myPanel = view.down('#center');  
        record.load(objectId, {
			callback : function(record,operation) {

                var url = '/Rest/Security/Modules/'+controller.application._idModule+'/Security';
                var modules = SecurityModulesStore;
                //var modules = controller.getSecurityModulesStoreStore();
                    
                // reemplazar por los datos precacardados
                var datos = view.down('#west');
                
                //modules.load({callback: function(){
                var administratorModule = modules.findRecord('KeyReference','Administrator');
                var accessControlModules = modules.findRecord('KeyReference','AccessControl');
                    Ext.Ajax.request({
                        url: url,
                        method: 'GET',
                        success: function(resp,operation) {
                            var json = null;
                            if (resp.responseText && resp.responseText!='')
                                json = JSON.parse(resp.responseText);
                            if (json && json.modules && json.modules.length>0){
                                var modules = json.modules;
                                // datos.rights = json.rights;
                                view.security = json;
                                
                                var root = datos.getRootNode();
                                Ext.Array.each(modules,function(_module){
                                    var model = controller.getModuleModelModel();
                                    var node = Ext.create(model, _module);
                                    datos.record = record;
                                    if (_module.profile!='0')
                                    root.appendChild(node)
                                    if (_module.text == 'Cuenta'){
                                        cuentaModule = _module;
                                        me.openTab(record, view, cuentaModule);
                                    }
                                    if(_module.text == 'Usuarios'){
                                        console.log('Modulo de usuarios encontrado');
                                    }
                                })
                            } else if ( administratorModule.get('Available')){
                                var accessControlModules = controller.getAccessControlCuentaStoreStore();
                                var root = datos.getRootNode();
                                datos.record = record;
                                accessControlModules.each(function(_module){
                                    _module.set('profile', '3');
                                    root.appendChild(_module)
                                    if (_module.get('text') == 'Cuenta'){
                                        cuentaModule = _module;
                                        me.openTab(record, view, cuentaModule);
                                    }
                                    if(_module.get('text') == 'Usuarios'){
                                        console.log('Modulo de usuarios encontrado');
                                    }
                                })
                            }else {
                                notifyError('Falta de derechos, configure el módulo.')
                            }
                        }
                    });
                //}})
			} 		
        })   
    },
    
    openTab: function(record, view, module){
        text = record.get('Name');
        
        // Lo agregamos al panel
		var myPanel = view.down('#cuentasaccesscontrol');
        
        // me fijo si el tab existe, si es nuevo lo creo
		// if (!myPanel.getComponent(record.get('text'))) {
		var mytab = myPanel.down('[title=Cuenta]');
		if (!mytab) {
			var newTab = Ext.widget('cuentaformview',{
                record: record,
                title: 'Cuenta',
                closable: false,
                module: module,
                profile: module.profile,
                security: view.security,
               // rights: view.rights
    		});

			// agrego la paleta creada
			myPanel.add(newTab);
			myPanel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
			myPanel.setActiveTab(mytab);
		}
        
    },
    
    setRecord: function(record, view){
        text = record.get('Name');
    
        view.record = record;
        view.cuenta = record;
    } 
    
});