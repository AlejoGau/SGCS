Ext.define('SGWebCrm.controller.CrmController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'CrmNorthView' ],

    init : function(config) {
        // genero los eventos
		this.control({
            'viewport' : {
    			afterrender : this.initview
			},
           
            'crmnorthview #btnSmartpanics' : {
        		//click : this.onSmartpanicsClick
			},
            'crmnorthview #btnsmartmail': {
                //click : this.onSmartMaillick
            },
            'crmnorthview #btnProduct': {
                click: this.onProductClick
            },
            'crmnorthview #btnContratos': {
                click: this.onContratosClick
            },
            'crmnorthview #cotizaciones': {
                click: this.onCotizacionesClick
            },
            'crmnorthview #btnPerson': {
                click: this.onContactosClick
            },
            'crmnorthview #btnOrganization': {
                click: this.onOrganizacionesClick
            }             
            
		});
        
	}, // cierro init
    onOrganizacionesClick: function(btn){
        var view = btn.up('viewport')
        var panel = view.down('tabpanel')
        var title = getLocale('Organizaciones')
        var mytab = panel.down('[title="' + title + '"]');
        
        if (!mytab) {
            var newTab = Ext.widget('organizationgridview', {
                iconCls: '',
                title : title,
                itemId: 'organizacionesGridId',
                closable : true,
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
		// el existe, lo activo
		else {
            panel.setActiveTab('organizacionesGridId');
		}
    },     
    onCotizacionesClick: function(btn){
        var view = btn.up('viewport')
        var panel = view.down('tabpanel')
        var title = getLocale('Cotizaciones')
        var mytab = panel.down('[title="' + title + '"]');
        
        if (!mytab) {
            var newTab = Ext.widget('ordergridview', {
                iconCls: '',
                title : title,
                itemId: 'cotizacionesGridId',
                closable : true,
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
		// el existe, lo activo
		else {
            panel.setActiveTab('cotizacionesGridId');
		}
    },       
    onContactosClick: function(btn){
        var view = btn.up('viewport')
        var panel = view.down('tabpanel')
        var title = getLocale('Contactos')
        var mytab = panel.down('[title="' + title + '"]');
        
        if (!mytab) {
            var newTab = Ext.widget('persongridview', {
                iconCls: '',
                title : title,
                itemId: 'contactosGridId',
                showGroupsButton: false,
                closable : true,
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
		// el existe, lo activo
		else {
            panel.setActiveTab('contactosGridId');
		}
    },     
    onContratosClick: function(btn){
        var view = btn.up('viewport')
        var panel = view.down('tabpanel')
        var title = getLocale('Contratos')
        var mytab = panel.down('[title="' + title + '"]');
        
        if (!mytab) {
            var newTab = Ext.widget('contratotabpanelview', {
                iconCls: '',
                title : title,
                itemId: 'contratosGridId',
                closable : true,
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
		// el existe, lo activo
		else {
            panel.setActiveTab('contratosGridId');
		}
    },    
    onProductClick: function(btn){
        var view = btn.up('viewport')
        var panel = view.down('tabpanel')
        var title = getLocale('Productos')
        var mytab = panel.down('[title="' + title + '"]');
        
        if (!mytab) {
            var newTab = Ext.widget('productgridview', {
                iconCls: '',
                title : title,
                itemId: 'productoGridId',
                closable : true,
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
		// el existe, lo activo
		else {
            panel.setActiveTab('productoGridId');
		}
    },
    onSmartpanicsClick: function(btn) { //anulado se instancia desde el toolbar
        var view = btn.up('viewport')
        var panel = view.down('tabpanel')
        var title = getLocale('SmartPanics')
        var mytab = panel.down('[title="' + title + '"]');
        
        if (!mytab) {
            var newTab = Ext.widget('smartpaniccrmgridview', {
                iconCls: '',
                title : title,
                closable : true,
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
        }
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
    
    onSmartMaillick: function(btn){//anulado se instancia desde el treeview
        var view = btn.up('viewport')
        var panel = view.down('tabpanel')
        var title = 'SmartMail'
        var mytab = panel.down('[title="' + title + '"]');
        
        if (!mytab) {
            var newTab = Ext.widget('smartmailprogramgridview', {
                iconCls: '',
                title : title,
                closable : true,
                itemId: 'smartmailprogramgridview'
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
    	}
		// el existe, lo activo
		else {
            panel.setActiveTab(mytab);
		}
    },
    
    initview: function(view){
        var controller = this;
        
        //defino pestañas que se van a abri
        view.organizaciones = true
        view.smartpanics = false
        
        // BC 371734102 : Se agrega seguridad al modulo de CRM
        // Asigno el nombre de la aplicacion y el Id en base al nombre
        this.application._nameModule = 'WebCRM';
        this.application._idModule = controller.application.getModuleIdByName(this.application._nameModule);
        
        // Busco el Store de Seguridad de Modulos y cargo los particulares de Administrator y CRM
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordAdminsitrator = storeSecurity.findRecord('KeyReference', 'Administrator');
        var recordSgWebCrm = storeSecurity.findRecord('KeyReference', 'WebCRM');
        
        // Si es Admin, los derechos actuales los cargo a mano (mejorar)
        if(recordAdminsitrator && recordAdminsitrator.get('Available') == true) {
            // Escribo a mano el unico derecho disponible de SgWebCrm
            view.security = Ext.decode("{\"modules\":[],\"rights\":{\"eliminarTodo\":true},\"event\":[]}");
        } else if (recordSgWebCrm && recordSgWebCrm.get('Available') == true) {
            // Si tiene habilitado WebRemoto chequeo JSON de permisos, de no existir los dejo en blanco. Esto es por compatibilidad.
            var _security = recordSgWebCrm.get('_Security');
            if(_security && _security.rights && _security.rights.eliminarTodo == true) {
                view.security = Ext.decode(recordSgWebCrm.get('Security'));
            } else {
                view.security = [];
            }
            
            if(_security && _security.rights) {
                view.organizaciones = true
                view.smartpanics = true
                
                if(_security.rights.encuesta != true) {
                    var btnEncuestas = view.down('#btnEncuestas');
                    if (btnEncuestas) btnEncuestas.hide();
                }                
                if(_security.rights.organizaciones != true) {
                    var btnOrganization = view.down('#btnOrganization');
                    if (btnOrganization) btnOrganization.hide();
                    view.organizaciones = false
                }
                if(_security.rights.contactos != true) {
                    var btnPerson = view.down('#btnPerson');
                    if (btnPerson) btnPerson.hide();
                }
                if(_security.rights.productos != true) {
                    var btnProduct = view.down('#btnProduct');
                    if (btnProduct) btnProduct.hide();
                }
                if(_security.rights.calendario != true) {
                    var btnCalendar = view.down('#btnCalendar');
                    if (btnCalendar) btnCalendar.hide();
                }
                if(_security.rights.cotizaciones != true) {
                    var btnCotizaciones = view.down('#cotizaciones');
                    if (btnCotizaciones) btnCotizaciones.hide();
                }
                if(_security.rights.contratos != true) {
                    var btnContratos = view.down('#btnContratos');
                    if (btnContratos) btnContratos.hide();
                }
                if(_security.rights.smartmail != true) {
                    var btnSmartmail = view.down('#btnsmartmail');
                    if (btnSmartmail) btnSmartmail.hide();
                }
                if(_security.rights.grupos != true) {
                    var btnGrupos = view.down('#btngrupos');
                    if (btnGrupos) btnGrupos.hide();
                }
                if(_security.rights.smartpanics != true) {
                    var btnSmartpanics = view.down('#btnSmartpanics');
                    if (btnSmartpanics) btnSmartpanics.hide();
                    view.smartpanics = false
                }
            } 
        } 

        var tabpanel = view.down('tabpanel');
        
        if(view.organizaciones) {
            var newTab = Ext.widget('organizationgridview',{
                xtype: 'organizationgridview',
                itemId: 'organizacionesGridId',
                title: 'Entidades',
                hideCuentaCorriente: true,
                showLanding: true,
                security : view.security
            });
            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
        } else if(view.smartpanics) {
            var newTab = Ext.widget('smartpaniccrmgridview',{
                xtype: 'smartpaniccrmgridview',
                title: 'Smartpanics',
                showLanding: true,
                security : view.security
            });
            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
        }
    }
});
