Ext.define('SmartTrack.controller.SmartTrackController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartTrackSearchModel', 'AdministratorModulesModel' ],
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
            'smarttrackgridview' :{
                licenseviolation : this.onLicenseViolation
            }
		});
	}, // cierro init
    
    initView: function(view){
        var controller = this;
        this.application._nameModule  = 'VigiControl';
        var cuentaTipo = 5;

        /*if (uiApplicationName == 'CleanApp'){
            this.application._nameModule = 'CleanApp';
            cuentaTipo = 9;
        }
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule)//31;
        */
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        var administratorModule = modules.findRecord('KeyReference','Administrator');
        var smarttrackModule = modules.findRecord('KeyReference','VigiControl');
        var panel = view.down('#center');
        var isAdmin = administratorModule?administratorModule.get('Available'):false;
        view.isAdmin = isAdmin;
        
        /**
         * 28/05 : Al ingresar con un usuario Dealer el cual no es Admin y no tiene configurado los permisos especiales de VC por primera vez
         * Daba error en la condicion de smarttrackModule.get ... 
         * Se suma a cada condicion la existencia de smarttrackModuleSecurity && para solventar esto.
         * 
         */
        smarttrackModuleSecurity = smarttrackModule.get('_Security');

        if(view.isAdmin || smarttrackModuleSecurity && smarttrackModuleSecurity.chkObjetivos == true) {
            var newTab4 = Ext.widget('cuentagridview', {
                //tabConfig: {translate: false},
                title : 'Objetivos',
                isAdmin: isAdmin,
                closable: false,
                closeAction: 'destroy',
                filterTipo: cuentaTipo,
                createTipo: cuentaTipo,
                itemDbClickView: 'smartrackcuentaview',
                partitionHide: true,
                falloTSTHide: true,
                falloAC: true,
                securityId: controller.application._idModule
            });
            panel.add(newTab4);
            
            panel.setActiveTab(newTab4);
        }
        
        if(view.isAdmin || smarttrackModuleSecurity && smarttrackModuleSecurity.chkDispositivosActivos == true) {
            var newTab2 = Ext.widget('smarttrackgridview', {
                //tabConfig: {translate: false},
                title : 'Dispositivos activos',
                filterTipo: cuentaTipo,
                createTipo: cuentaTipo,
                isAdmin: isAdmin,
                closable: false,
                closeAction: 'destroy'
            });
            panel.add(newTab2);
        }
                    
        if(view.isAdmin || smarttrackModuleSecurity && smarttrackModuleSecurity.chkDispositivosSinAsignar == true) {
                var newTab = Ext.widget('smarttrackpendinggridview', {
                //tabConfig: {translate: false},
                title : 'Dispositivos sin asignar',
                closable: false,
                isAdmin: isAdmin,
                filterTipo: cuentaTipo,
                createTipo: cuentaTipo,
                closeAction: 'destroy'
            });
            panel.add(newTab);
            } else {
                if(view.down('#btnconfig')) {
                view.down('#btnconfig').hide();
                }
            }
        
        if(view.isAdmin || smarttrackModuleSecurity && smarttrackModuleSecurity.chkEventos == true) {
                var newTab3 = Ext.widget('eventosspgridview', {
                tabConfig: {translate: false},
                translate: false,
                title : getLocale('Eventos'),                
                closable: false,
                isAdmin: isAdmin,
                rec_cdll: '',
                for_cProtocolo: 'VIGICONTROL',
                Origenes: '',
                closeAction: 'destroy',
                filterTipo: 5,
                hideAlarmFilter: true,
                hideTypeFilter: true,
                imagenesSoloDelEvento:true
            });
            
            panel.add(newTab3);
        }

        if(view.isAdmin || smarttrackModuleSecurity && smarttrackModuleSecurity.chkSeguimiento == true) {
            var newTab4 = Ext.widget('tabpanel',{
                title : 'Seguimiento',
                closable: false,
                closeAction: 'destroy',
                items: [
                    Ext.widget('vcseguimientogridview', {
                        //tabConfig: {translate: false},
                        title : 'Dispositivos',
                        isAdmin: isAdmin,
                        closable: false,
                        closeAction: 'destroy',
                        filterTipo: 5
                    }),
                    Ext.widget('vcallseguimientoview', {
                        //tabConfig: {translate: false},
                        title : 'Mapa',
                        isAdmin: isAdmin,
                        closable: false,
                        closeAction: 'destroy',
                        filterTipo: 5
                    })
                ]
            });
            panel.add(newTab4);
            }
            
            var restriccionesTab = Ext.widget('restriccionesgridview', {
            //tabConfig: {translate: false},
            title : 'Restricciones',                
            closable: false,
            isAdmin: isAdmin,
            closeAction: 'destroy'
        });
            
        panel.add(restriccionesTab);

        /**
         * BC 387098520 : Agregado de la nueva TAB para el envío de PUSH a los Vigicontrol.
         */

        if(view.isAdmin || smarttrackModuleSecurity && smarttrackModuleSecurity.chkPushNotificaciones == true) {
            var tabPushNotifications = Ext.widget('vcpushnotificacionesgridview',{
                title : 'Usuarios conectados',
                closable: false,
                isAdmin: isAdmin,
                filterTipo: cuentaTipo,
                closeAction: 'destroy'
            });
            panel.add(tabPushNotifications);
        }
    },
    
    onLicenseViolation: function(){
        Ext.ComponentQuery.query('smarttrackpendinggridview')[0].close();
        Ext.ComponentQuery.query('eventosspgridview')[0].close();
    },
    
    onMostrarMonitoreo: function(record, view){
        var mon = Ext.widget('vigicontrolgpsview',{
            eventId:record.get('rec_iid')
        })
        
        var title = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' - ' + record.get('cue_cnombre');//"Evento: " + record.get('rec_iid');
        title = title.replace(',','');
        var win = Ext.widget('window', {
            title : title,
            closable : true,
            translate: false,
            closeAtion: 'Destroy',
            autoShow : true,
            width:600,
            height:400,
            layout:'fit',
            items:[mon]
		});
    }
});