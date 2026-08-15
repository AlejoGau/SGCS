Ext.define('WeSafe.controller.SmartPanicsController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartPanicSearchModel', 'TablaHistoricoSPSearchModel' ],
    views : [ 'ExtUxNotification', 'WeSafeMainView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
            'viewport' : {
    			afterrender : this.initView
            },
            'eventosspgridview' : {
        		mostrarMonitoreo : this.onMostrarMonitoreo
            },

            'smartpanicgridview' :{
                licenseviolation : this.onLicenseViolation
            }
		});
	}, // cierro init
    
    initView: function(view){
        this.application._nameModule  = 'SmartPanics';
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule)
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        var administratorModule = modules.findRecord('KeyReference','Administrator');
        var WeSafeApp = modules.findRecord('KeyReference','WeSafeApp');
        console.log("WeSafeApp:",WeSafeApp);
        var isAdmin = administratorModule?administratorModule.get('Available'):false;
        var isAdminCuenta = false;
        var controller = this;
        view.isAdmin = isAdmin;
        
        if (isAdmin) {
            var security = administratorModule.get('Security');
            var json;
            if (security && security != ''){
                json = Ext.JSON.decode(security);
                view.security = json;
            }
            // Caso en el cual se encuentra modulo Administrator habilitado y con el tilde de SOLO ADMIN CUENTAS.
            if (json && json.rights && json.modules && json.rights.cuenta){
                isNeededReadRights = true; // Habilito el flag de lectura de los permisos de las opciones de la vista.
                isAdminCuenta = true;
                isAdmin = false; // Deshabilito el flag de Admin
                view.isAdmin = isAdmin;
                view.isAccount = isAdminCuenta; 
            }
        }

        var imei = myQueryString.imei
        var panel = view.down('#center');
        var newTab2 = Ext.widget('smartpanicgridview', {
            //tabConfig: {translate: false},
            title : 'Dispositivos activos',
            isAdmin: isAdmin,
            itemId: 'activos',
            closable: false,
            closeAction: 'destroy'
        });
        panel.add(newTab2);
            
        var newTab = Ext.widget('smartpanicpendinggridview', {
            //tabConfig: {translate: false},
            title : 'Dispositivos sin asignar',
            hideCounter: true,
            itemId: 'sinasignar',
            closable: false,
            closeAction: 'destroy'
        });

        


        panel.add(newTab);
        
        var newTab3 = Ext.widget('eventosspgridview', {
            //tabConfig: {translate: false},
            title : 'Eventos',
            closable: false,
            short:1,
            mostrar: 250,
            closeAction: 'destroy'
        });    
        if (imei){
            newTab3.imei= imei;
            newTab3.hideComponents=['#filtrostr','#clearfilters','#groupCuenta','#excluir'];
        }       
        /* Carga el combo de historico */
        var historicoStore = Ext.create('Ext.data.Store',{
            model: this.getTablaHistoricoSPSearchModelModel(),
            autoload: false,
            sorters: [{
                 property: 'c_periodo',
                 direction: 'DESC'
             }],
             pageSize: 10000
        });
        var comboHistorico = newTab3.down('#combohistorico');
        comboHistorico.bindStore(historicoStore);        
        historicoStore.load();


        panel.add(newTab3);
        
        panel.setActiveTab(newTab2);
        
        var newTab4 = Ext.widget('tabpanel',{
            title : 'Seguimiento',
            itemId:'seguimiento',
            closable: false,
            closeAction: 'destroy',
            items: [
                Ext.widget('spseguimientogridview', {
                    //tabConfig: {translate: false},
                    title : 'Dispositivos',
                    isAdmin: isAdmin,
                    closable: false,
                    closeAction: 'destroy',
                    filterImei: imei
                }),
                {xtype:'spallseguimientoview',
                    title : 'Mapa',
                    filterImei: imei
                }
            ]
        });

        panel.add(newTab4);

        var newTab5 = Ext.widget('encuestasview', {
            //tabConfig: {translate: false},
            title : 'Formularios',
            itemId: 'formularios',
            closable: false,
            closeAction: 'destroy'
        });   

        panel.add(newTab5);

        if (WeSafeApp != "") {
            
            var newTab6 = Ext.widget('WeSafeMainView', {
                tabConfig: {translate: false},
                translate: false,
                title : 'WeSafe',
                itemId: 'wesafe',
                closable: false,
                closeAction: 'destroy'
            });   

            panel.add(newTab6);
        }

        if(isAdmin) {
            view.add(Ext.widget('smartpanicnorthview', {region:"north"}));
        }

        controller.checkSmartPanicsPC(view);
    },

    checkSmartPanicsPC: function(view){
        // agrego smartpanispc si tiene llave y es admin o tiene el modulo
        // primero me fijo si esta en la llave
        if (KeyModulesStore.isModuleAvailable('SmartPanicsPC')){
            // me fijo si es admin y agrego la tab
            if (view.isAdmin){
                this.addSmartPanicsPC(view);
            }
        }
    },

    addSmartPanicsPC: function(view){
        var panel = view.down('#center');
        // obtengo el modulo para ver la cantidad disponible
        var _module = KeyModulesStore.getModuleAvailable('SmartPanicsPC');
        _module.QtyAccounts = _module.get('QuantityOfUsers');

        var newTab = Ext.widget('cuentagridview', {
            //tabConfig: {translate: false},
            title : 'SmartPanicsPC',
            isAdmin: view.isAdmin,
            isAccount: view.isAccount,
            closable: false,
            closeAction: 'destroy',
            filterTipo: 10,
            createTipo: 10,
            nameModule: 'SmartPanicsPC',
            KeyCustomerInfo: _module, // mando el modulo de smaprtpanics pc con la cantidad para que controle como si fuera el header de la llave
            QtyAccounts: _module.QtyAccounts,
            partitionHide: true,
            falloTSTHide: true,
            falloAC: true,
            securityId: this.application.getModuleIdByName('SmartPanicsPC')
        });

        panel.add(newTab);
    },
    
    onLicenseViolation: function(){
        Ext.ComponentQuery.query('smartpanicpendinggridview')[0].close();
        Ext.ComponentQuery.query('eventosspgridview')[0].close();
    },
    
    onMostrarMonitoreo: function(record, view){
        var mon = Ext.widget('smartpanicgpsview',{
            eventId:record.get('rec_iid'),
            center:record.get('gps_rLatitud')+','+record.get('gps_rLongitud'),
            record: record,
        })
        
        var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');//"Evento: " + record.get('rec_iid');
        title = title.replace(',','');
        var win = Ext.widget('window', {
            title : title,
            closable : true,
            closeAtion: 'Destroy',
            translate: false,
            autoShow : true,
            width:600,
            height:400,
            layout:'fit',
            items:[mon]
		});
    }
});