Ext.define('SgAppSerTecForm.controller.SerTecController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'SerTecView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'sertecview' : {
                afterrender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        this.application._nameModule  = 'SerTec';
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule)
        var controller = this;
        // me fijo quien es el operador
        //Federico V. Modifique la url porque el qr no redireccionaba a ningun lado 
       var url= getParametro('DESKTOPEXTERNALURL');        
        var profile = {profile:3};
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordServtec = storeSecurity.findRecord('KeyReference', 'SerTec')

        if(isNaN(recordServtec.id)){
            recordServtec.id = 0;
            recordServtec.data.Id = 0;
        }        
        if(recordServtec && recordServtec.get('Available') == true) {  
            var _security = recordServtec.get('_Security');
            
            if(_security && _security.profile) {
                profile = {profile: _security.profile};
            }
        }
        var administratorModule = storeSecurity.findRecord('KeyReference','Administrator');
        var isAdmin = administratorModule?administratorModule.get('Available'):false;
        view.isAdmin = isAdmin;

        var tabpanel = view.down('tabpanel');
        /*
        var newTab = Ext.widget('multicuentaserviciotecnicogridview', {
                iconCls: 'icon-servtec',
        		title : getLocale('SerTec'),
                translate:false,
                targetTab: tabpanel,
                selModel: Ext.create( 'Ext.selection.CheckboxModel' ), 
                module: profile, 
    			closable : false,
                iconShow : 'icon-servtec',
                itemId:'SerTec',
                tip_nCondicion: '0,1,2,3,4'
    		});
            
            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
            
        var newTab = Ext.widget('multicuentaserviciotecnicogridview', {
                iconCls: 'icon-preventivo',
            	title : getLocale('Preventivo'),
                translate:false,
                targetTab: tabpanel,
                selModel: Ext.create( 'Ext.selection.CheckboxModel' ), 
    			closable : false,
                tipo: 'preventivo',
                module: profile,
                iconShow : 'icon-preventivo',
                itemId:'Preventivo',
                tip_nCondicion: '0,1,2,3'
    		});
            
            tabpanel.add(newTab);
        
        var newTab = Ext.widget('multicuentaserviciotecnicogridview', {
                iconCls: 'icon-correctivo',
                title : getLocale('Correctivo'),
                translate:false,
                targetTab: tabpanel,
    			closable : false,
                selModel: Ext.create( 'Ext.selection.CheckboxModel' ), 
                tipo: 'correctivo',
                module: profile,
                iconShow : 'icon-correctivo',
                itemId:'Correctivo',
                tip_nCondicion: '0,1,2,3'
    		});
        tabpanel.add(newTab);
        var newTab = Ext.widget('multicuentaserviciotecnicogridview', {
                iconCls: 'icon-instalacion',
                title : getLocale('Instalaciones'),
                translate:false,
                targetTab: tabpanel,
                selModel: Ext.create( 'Ext.selection.CheckboxModel' ), 
        		closable : false,
                tipo: 'instalaciones',
                module: profile,
                iconShow : 'icon-instalacion',
                itemId:'Instalaciones',
                tip_nCondicion: '0,1,2,3'
    		});
            
            tabpanel.add(newTab);
            
         var newTab = Ext.widget('tablasinstaladoresgridview', {
            iconCls: 'icon-user',
            title : getLocale('Instaladores'),
            translate:false,
            targetTab: tabpanel,
        	closable : false,
            readOnly: true,
            soloInstaladores: true,
            checkSoloInstaladores: true,
            filters: [{
                property: 'ins_iTipo:ININT',
                id: 'ins_iTipo',
                value: '1,2'
            }]
		});
        
        tabpanel.add(newTab);

        var newTab = Ext.widget('sertecmapgpsview', {
            iconCls: 'icon-map',
            title : getLocale('Mapa (Beta)'),
            translate : false,
            targetTab: tabpanel,
            closable : false
		});
        
        tabpanel.add(newTab);
        var title = getLocale('Qr Conexión');
        var qr = Ext.create('Ext.ux.IFrame', {
            title : 'Qr Conexión',
            border : false,
            src : '/handler/QrCodeHandler?Language='+_UserData.metadata.language+'&showLink=true&title='+title+'&code=/'+url+'/',
            closable : false,
            autoDestroy: true
        });

        var newTab = Ext.widget('tabpanel', {
            iconCls: 'icon-servtec',
            title : 'TecGuard',
            items: [
                {
                    xtype:'cuentagridview', 
                    iconCls: 'icon-servtec',
                    title : 'Dispositivos',
                    isAdmin: isAdmin,
                    closable: false,
                    closeAction: 'destroy',
                    filterTipo: 11,
                    createTipo: 11,
                    itemDbClickView: 'cuentaview',
                    partitionHide: true,
                    falloTSTHide: true,
                    falloAC: true,
                    securityId: controller.application._idModule
                },
                {   
                    xtype:'tecguardallseguimientomapview',
                    title : 'Seguimiento'
                },qr
            ]
        });
        
        tabpanel.add(newTab);
        
        
        if(_security && _security.depositos == true) {
            var newTab = Ext.widget('stdepositoview', {
                iconCls: 'icon-building',
                title : getLocale('Depositos'),
                translate : false,
                targetTab: tabpanel,
                closable : false,
                idOrganizacion:this.application.UserData.Company
            });
            
            tabpanel.add(newTab);
        }*/
    }
});