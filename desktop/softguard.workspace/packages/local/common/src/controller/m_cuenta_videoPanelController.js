//MIGRADO2024
Ext.define('Common.controller.m_cuenta_videoPanelController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ 'm_cuentas_video_linksModel', 'm_cuentas_videoModel', 'm_cuentas_video_linksSearchModel', 'm_cuentas_videoSearchModel' ],
    views : [ 'm_cuenta_videoPanelView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'videoxcuentapanelview' : {
        		beforerender : this.initView               
			},
            'videoxcuentapanelview #deletevideo' : {
            	//click : this.onClickDelete
			}   
		});
	},
	initView : function(view) {
        view.profile = view.module.profile?view.module.profile:view.module.get('profile');
        
        if(view.profile < 2) {
                       
            view.down('#deletevideo').hide()
        
        }
        
        var storeKey = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var module = storeKey.findRecord('KeyReference', 'Video');
        var admnintrator = storeKey.findRecord('KeyReference', 'Administrator');
        var key = storeKey.findRecord('Video');
        
        /*if (!key ||( (!module || module.get('Available') != true) && (!admnintrator || admnintrator.get('Available') != true))){
            
            //notify('No es posible acceder a la funcionalidad completa de esta solapa. Consulte con el proveedor del servicio.')
            //view.down('#videolinks').hide();
            //view.down('#cuentavideo').hide();
            //view.down('#save').hide();
            
            view.down('#deletevideo').setDisabled(true);
            
        }*/
	},
    
    
    // BC 374402728 : Revisar que no rompa nada en otros modulos, 
    // Quite el evento de click del panel dado que se pisaba con el del m_cuentas_videoFormController, dando error de AJAX por duplicar llamado en destroy
    onClickDelete:function (btn) {
        var view = btn.up('videoxcuentapanelview');
        var t = this;
        
        this.getM_cuentas_videoModelModel()
        
        var storeVideo = Ext.create('Ext.data.Store',{
            model: this.getM_cuentas_videoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'cuv_iidCuenta',
                    value: view.record.get('cue_iid')
                }
            ]
        })
       
        
        storeVideo.load({callback:function (records) {  
            var record = records[0];
            
            if (record){

                record.setConfig({
                    proxy: t.getM_cuentas_videoModelModel().getProxy()
                });

                record.destroy({callback: function(record, operation){
                        console.log(operation);
    					console.log(record);
                        //view.down('cuentavideoformview').getForm().reset(true);
                        //view.down('cuentavideoformview').t.initview(view.down('cuentavideoformview'));
                    }
                    
                })
            }
            
        }});
        
        
        var storeVideoLink =Ext.create('Ext.data.Store',{
            model: this.getM_cuentas_video_linksSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:  [
                {
                    property: 'cvl_iidcuenta',
                    value: view.record.get('cue_iid')
                }
            ]  
        })
       
        
        storeVideoLink.load({callback:function (records) {
            Ext.Array.each(records,function (rec,k) {

                rec.setConfig({
                    proxy: t.getM_cuentas_video_linksModelModel().getProxy()
                });

                rec.destroy();
                
            })
            //no se puede hacer en el callback de cada uno... hay que repensar esto.
            view.down('videolinksgridview').store.load();
        }});
        
    }
    
});