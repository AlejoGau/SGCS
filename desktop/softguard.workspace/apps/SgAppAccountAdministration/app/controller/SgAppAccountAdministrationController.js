Ext.define('SgAppAccountAdministration.controller.SgAppAccountAdministrationController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'KeyModulesModel', 'CuentaSearchModel' ],
    views : [ 'AccountAdministratorToolbarView', 'ExtUxNotification', 'MetadataViewport' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'viewport' : {
                afterrender : this.initview
			},
            'viewport #closeall' : {
                click : this.onCloseAllClick
        	},
            'viewport #generareventoformview': {
                click: this.onGenerarEventoClick
            },
            'viewport #btnMulticuenta':{
                click: this.onBtnMulticuentaClick
            }
            
		});
	}, // cierro init
    onBtnMulticuentaClick: function(btn){
       var viewport =  Ext.getCmp('viewport');
        var controller = this;
		// Lo agregamos al panel
		var panel = Ext.getCmp('center');
        var title = 'Reporte Multi-cuenta';
        var mytab = panel.down('multicuentagridview');
        if (!mytab) {
            var newTab = Ext.widget('multicuentagridview', {
                iconCls : 'icon-reportes',
    			title : title,
                _security : controller._security,
                targetTab: panel,
                
    			
    			closable : true
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);     
        } 
    },
    onGenerarEventoClick: function (btn) {
        var view = btn.up('generareventoformview')
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Generar evento',
    		closeAction : 'destroy',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'generareventoformview',                    
                    caller: view
                }
            ]
		});
		win.show();
    },
    
    onCloseAllClick: function (btn) {
      var view = btn.up('viewport')
      var tabpanel = view.down('tabpanel')
      tabpanel.items.each(function(c){
         if(c.closable != false) {
            tabpanel.remove(c);
         }
       })
    },
    
    initview: function(view){
        var controller = this;
       // view.down('#victimariosgest').hide();
       //  view.down('#victimariosgest').setDisabled(true);
        this.application._nameModule = 'Administrator';
        this.application._idModule = controller.application.getModuleIdByName(this.application._nameModule);
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordAdminsitrator = storeSecurity.findRecord('KeyReference', 'Administrator')
        /* if (view.fromAdministrator) {     
            view.down('#victimariosgest').hide();
         
        }
          if(view.victimariosgestHide) {
            view.down('#victimariosgest').hide();            
        }*/
        if(recordAdminsitrator && recordAdminsitrator.get('Available') == true) {  
            var _security = recordAdminsitrator.get('_Security');
            controller._security = _security; // para mandar _security en botón btnMulticuenta
            if(_security && _security.rights && _security.rights.dealerreadonly == false && _security.rights.cuenta == true) {
                view.down('#tablaslineas').hide()
            }
            console.log(_security)
            if(_security && _security.rights &&  _security.rights.cuenta == true) {
                if(_security && _security.rights && _security.rights.solicitudescambio == true) {
                    var storeKeyModules = SecurityModulesStore;//Ext.data.StoreManager.lookup('KeyModulesStore'); 
                    if (storeKeyModules.isModuleAvailable('AWCC')){
                        view.down('#solicitudescambio').show()
                    } else {
                        view.down('#solicitudescambio').hide()
                    }
                }
             } else {
                 view.down('#solicitudescambio').show()   
             }
           
             
         if(_security && _security.rights &&  _security.rights.cuenta == true) {
                if(_security && _security.rights && _security.rights.chkvictimario == true) {
                    view.down('#victimariosgest').show()
                } else {
                        view.down('#victimariosgest').hide()
                    }
             } else {

                 view.down('#victimariosgest').show()   
             }
            
            if(_security && _security.rights && _security.rights.generareventos == true) {
                view.down('#generareventoformview').show()
            }
        } 
        controller.application._idModule = controller.application.getModuleIdByName( controller.application._nameModule );

        var view = Ext.widget( 'cuentagridview' );
        view.closable = false;
        view.createTipo = '0,12';
        view.securityId = '5';
    
        var myPanel = Ext.getCmp( 'center' );
        myPanel.add( view );
        myPanel.setActiveTab( view );
    },

    

    openObjectList: function(){
		var view = Ext.widget('cuentagridview');
		view.closable = false;
        view.createTipo= [0,8,12];
        view.securityId = '9';

        var myPanel = Ext.getCmp('center');
        myPanel.add(view);
        myPanel.setActiveTab(view);
	},

	openObjectById : function(objectId) {
		record = this.getSoftguardCuentaModelModel();
        var north = Ext.getCmp('north');
        north.hide();
        var south = Ext.getCmp('south');
        south.hide();
        
        if (objectId == 0) {
			var myobject = record.create({
				Name : getLocale('Nueva cuenta'),
                cue_dfechaalta: new Date(),
                cue_dservicio: new Date()
			});
                    
            this.setRecord(myobject);
		}
        else {
		    record.load(objectId, {
                callback : function(record,operation) {
                    if (operation.success){
                        
                        // cargo la lista de modulos
                        var modules = Ext.widget('moduletreeview', {
                            store : 'CuentaDealerModuleStore'
                        });
                        var west = Ext.getCmp('west');
                        if (west.collapsed){west.toggleCollapse();}
                        west.add(modules);

                        // seteo el registro
                        this.setRecord(record);
                    }
                },
                scope : this
            });
        }
	},
    
    setRecord: function(record){
        text = record.get('Name');
        document.title = text;
        
        var viewport =  Ext.getCmp('viewport');
        viewport.record = record;
        viewport.cuenta = record;
        
		// Lo agregamos al panel
		var myPanel = Ext.getCmp('center');
        
        myPanel.closeAction = 'hide';
        
        // me fijo si el tab existe, si es nuevo lo creo
		// if (!myPanel.getComponent(record.get('text'))) {
		var mytab = myPanel.down('[title='+getLocale('Cuenta')+']');
		if (!mytab) {
			var newTab = Ext.widget('cuentaformview',{
                record: record,
    		    title: 'Cuenta',
    		    closable: false,
			    record: record
			});

			// agrego la paleta creada
			myPanel.add(newTab);
			myPanel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
			myPanel.setActiveTab(mytab);
		} 
    }
});