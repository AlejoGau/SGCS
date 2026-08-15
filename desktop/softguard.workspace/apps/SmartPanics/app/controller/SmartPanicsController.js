Ext.define('SmartPanics.controller.SmartPanicsController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartPanicSearchModel', 'TablaHistoricoSPSearchModel' ],
    views : [ 'ExtUxNotification' ],
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

//--------------------------------
/*
var data = [
    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 112, description: 'Integrate 2.0 Forms with 2.0 Layouts', estimate: 6, rate: 150, due: '06/24/2007' },
    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 113, description: 'Implement AnchorLayout', estimate: 4, rate: 150, due: '06/25/2007' },
    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 114, description: 'Add support for multiple types of anchors', estimate: 4, rate: 150, due: '06/27/2007' },
    { projectId: 100, project: 'Ext Forms: Field Anchoring', taskId: 115, description: 'Testing and debugging', estimate: 8, rate: 0, due: '06/29/2007' },
    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 101, description: 'Add required rendering "hooks" to GridView', estimate: 6, rate: 100, due: '07/01/2007' },
    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 102, description: 'Extend GridView and override rendering functions', estimate: 6, rate: 100, due: '07/03/2007' },
    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 103, description: 'Extend Store with grouping functionality', estimate: 4, rate: 100, due: '07/04/2007' },
    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 121, description: 'Default CSS Styling', estimate: 2, rate: 100, due: '07/05/2007' },
    { projectId: 101, project: 'Ext Grid: Single-level Grouping', taskId: 104, description: 'Testing and debugging', estimate: 6, rate: 100, due: '07/06/2007' },
    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 105, description: 'Ext Grid plugin integration', estimate: 4, rate: 125, due: '07/01/2007' },
    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 106, description: 'Summary creation during rendering phase', estimate: 4, rate: 125, due: '07/02/2007' },
    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 107, description: 'Dynamic summary updates in editor grids', estimate: 6, rate: 125, due: '07/05/2007' },
    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 108, description: 'Remote summary integration', estimate: 4, rate: 125, due: '07/05/2007' },
    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 109, description: 'Summary renderers and calculators', estimate: 4, rate: 125, due: '07/06/2007' },
    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 110, description: 'Integrate summaries with GroupingView', estimate: 10, rate: 125, due: '07/11/2007' },
    { projectId: 102, project: 'Ext Grid: Summary Rows', taskId: 111, description: 'Testing and debugging', estimate: 8, rate: 125, due: '07/15/2007' }
];


store = Ext.create('Ext.data.Store', {
    model: 'Task',
    data: data,
    sorters: { property: 'due', direction: 'ASC' },
    groupField: 'project'
});
        //store.load();
        
        var borrarTab = Ext.widget('borrarestaview');
        
        borrarTab.reconfigure(store);
        //borrarTab.getView().refresh();
        panel.add(borrarTab);
*/
//---------------------------------        

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