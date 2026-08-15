Ext.define('AdministratorSearch.controller.UpdateGridController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ 'UiApplicationSearchModel', 'RemoteUiApplicationSearchModel', 'BundleModel', 'RemoteBundleModel', 'RemoteBundleSearchModel', 'BundleSearchModel', 'UiApplicationModel', 'KeyModulesModel' ],
    views : [ 'UpdateGridView' ],

    init : function(config) {
		// genero los eventos
		this.control({
			'updategridview' : {
                beforerender: this.prepareData,
				afterrender : this.initView
			},
            'updategridview button[action=update]' : {
				click : this.onUpdateClick
			}
		});
	}, //
    
    prepareData : function(view) {
        Ext.Ajax.request({
            url: '/rest/t_parametros/',
            params: { filter:'[{"property":"par_ccodigo", "value":"_VERSIONUPDATE"}]'},
            method: 'GET',
            scope: this,
            success: function(response){
                var parametros = Ext.JSON.decode(response.responseText).rows;
                if (parametros){
                    view.csversion = parametros[0].par_cvalor;
                }
            }
        });
    },
    

	initView : function(view) {
        view.controller = this;
        var remote =Ext.create('Ext.data.Store',{
            model: this.getRemoteUiApplicationSearchModelModel(),
            pageSize: 200
        })
        
        var local =Ext.create('Ext.data.Store',{
            model: this.getUiApplicationSearchModelModel(),
            pageSize: 200
        })
        
        var keyModules = KeyModulesStore;//this.getKeyModulesStoreStore();
        
        Ext.define('updateModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'Name',  type: 'string'},
                {name: 'Version',  type: 'string'},
                {name: 'NewVersion',  type: 'string'},
                {name: 'RemoteUiApplication'},
                {name: 'RemoteCSVersion'},
                {name: 'CSupdated', type: 'bool'},
                {name: 'LocalUiApplication'}
            ]
        });
        
        var store = Ext.create('Ext.data.Store',{
            model: updateModel,
            pageSize: 200
        });
        
        view.bindStore(store);
        
        remote.load({keyModules: keyModules,view: view,callback: function(remoteRecords, remoteoperation,success){
            local.load({keyModules: keyModules,view: remoteoperation.view,callback: function(localRecords, localoperation,success){
                var view = localoperation.view;
                var keyModules = localoperation.keyModules;
                var csversion = view.csversion;
                // filtro los record locales por los modulos que estan en la llave.
                Ext.Array.each(localRecords, function(localRecord, index, array){
                    var r = remote.findRecord('Name',localRecord.get('Name'),0,false,false,true);
                    //console.log(keyModules.isModuleAvailable(localRecord.get('Name')));
                    var localVersion = new Ext.Version(localRecord.get('Version'));
                    if (r && keyModules.isModuleAvailable(localRecord.get('Name'))){
                        var remoteVersion = new Ext.Version(r.get('Version'));
                        if (Ext.Version.compare(localVersion,remoteVersion) == -1){
                            //console.log(r.get('Version'),localRecord.get('Version'), this);
        					var customdata = r.get('CustomData');
							var decodedata = customdata?Ext.JSON.decode(customdata):null;
							var RemoteCSVersion = decodedata?decodedata.requirements.csversion:null;
                            var CSupdated = true;
							console.log(r.get('CustomData'), r.get('Name'), RemoteCSVersion);
							// comparo las versiones local y la que pide el bundle
                            if (RemoteCSVersion && view.csversion){
                                var localcsversion = new Ext.Version(view.csversion);
                                var bundlecsversion = new Ext.Version(RemoteCSVersion);
                                var CSupdated = Ext.Version.compare(localcsversion,bundlecsversion)==-1?false:true;
                                console.log(r.get('Name'),CSupdated)
                            }
                            
                            //console.log(RemoteCSVersion,view.csversion);
                            view.getStore().add({
                                Name: r.get('Name'),
                                Version:localRecord.get('Version'),
                                NewVersion: r.get('Version'),
                                RemoteUiApplication: r,
                                RemoteCSVersion: RemoteCSVersion,
                                CSupdated: CSupdated,
                                LocalUiApplication: localRecord
                            });
                        }
                            
                    } else {
                        //console.log(localRecord.get('Name'));
                    }
                    
                }, view)
            }})
        }});
	},
    
    onUpdateClick: function(button, event, options){
        var view = button.up('updategridview');
        var controller = view.controller;
        var selected = view.selModel.getSelection();
        var forceVersion = view.down('#forceVersionBtn').pressed;
        Ext.Array.each(selected,function(module){
            var localBundleModel = controller.getBundleModelModel();
            var remoteVersion = module.get('RemoteUiApplication').get('Version');
            var uiApplicationId = module.get('LocalUiApplication').get('Id');
            var uiappModel = controller.getUiApplicationModelModel();
            var remoteBundleStore = Ext.create('Ext.data.Store',{
                model: controller.getRemoteBundleSearchModelModel(),
                pageSize: 1,
                remoteFilter : true,
                filters:[{
                     property: 'Version',
                     value: remoteVersion
                 },{
                     property: 'Name',
                     value: module.get('LocalUiApplication').get('Name')
                 }]
            })
            Ext.create('Ext.LoadMask', view, {
                msg: getLocale("Cargando version ")+
                    module.get('RemoteUiApplication').get('Version')+
                    getLocale(' de ')+
                    module.get('LocalUiApplication').get('Name')+
                    '...',
                store: remoteBundleStore
            });
            remoteBundleStore.load({
                callback: function(records){
                    var localBundleModel = controller.getBundleModelModel();
                    var localBundle = Ext.create(localBundleModel);
                    var bundle = records[0];
                    localBundle.data = bundle.data;
                    localBundle.set('ObjectId',uiApplicationId);
                    //localBundle.set('Id',0);
                    var mask = Ext.create('Ext.LoadMask', view, {
                        msg: getLocale("Guardando ")+module.get('LocalUiApplication').get('Name')
                    }).show();
                    localBundle.save({callback: function(){
                        mask.hide();
                        if (forceVersion){
                            var uiapp = module.get('LocalUiApplication');
                            uiapp.setConfig({
                                proxy: uiappModel.getProxy()
                            });
                            uiapp.set('Version',bundle.get('Version'));
                            uiapp.save();
                        }
                        view.getStore().remove(module);
                    }});      
                }
            })       
        })
    }
});