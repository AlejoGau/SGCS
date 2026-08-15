Ext.define('WebMG.controller.WebMGController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'mg_maestrocuentasSearchModel', 'mg_maestrocuentasModel', 't_organizacion_fcSearchModel' ],
    views : [ 'ExtUxNotification', 'WebMGNorthView', 'MetadataViewport','STProductosGridView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'viewport' : {
                afterrender : this.initview
			},
            'viewport #closeall' : {
                click : this.onCloseAllClick
    		},
            'viewport #contratorfull' : {
                click : this.onContratoFullClick
        	},
            'viewport #facturadorwizard' : {
                click : this.onFacturadorWizardClick
            },
            'viewport #facturadorContrato' : {
                click : this.onFacturadorContratoClick
            },
            'viewport #cuentassincontrato' : {
                click : this.onCuentasSinContratoClick
            },
            'viewport #productos' : {
                click : this.onProductosClick
            },
            'viewport #novedades' : {
                click : this.onNovedadesClick
            },
            'viewport #comprobantes' : {
                click : this.onComprobantesClick
            },
            'viewport #mg_maestrocuentasgridview' : {
                click : this.onMg_maestrocuentasgridview
            },
            'viewport #contratotemplategridview' : {
                click : this.onContratotemplategridview
            },
            'viewport #avisotemplategridview' : {
                click : this.onAvisotemplategridview
            },
            'viewport #remesaExport' : {
                click : this.onRemesaExportClick
            },
            'viewport #exportTxt' : {
                click : this.onExportTxtClick
            },
            'viewport #org_organizacionId' : {
				change : this.onorganizacionFacturadoraChange
			}
		});
	}, // cierro init
    
    onContratotemplategridview: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('#contratotemplate');
        
        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
             var newTab = Ext.widget('contratotemplategridview',{      
                title: 'Plantillas de contrato',
                itemId: 'contratotemplate',
                tipo: 1,
                closable: true,
                hideNew: false
            });
            
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        }    
    },

    onRemesaExportClick: function () {
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
			title : 'Exportar archivos de cobranza',
			closeAction : 'destroy',
            width : 500,
			height : 300,
			border : false,
			items : [{
                xtype:'remesaexportformview' 		
			}]
        }).show()   
    },

    onExportTxtClick: function () {
        Ext.create('Ext.Window', {
            layout : 'fit',
			title : 'Exportar TXT mensual',
			closeAction : 'destroy',
            width : 520,
			height : 340,
			border : false,
			items : [{
                xtype:'exporttxtformview'
			}]
        }).show();
    },
    
    onAvisotemplategridview: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('#avisotemplate');
        
        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
             var newTab = Ext.widget('contratotemplategridview',{      
                title: 'Plantillas de Avisos',
                itemId: 'avisotemplate',
                tipo: 2,
                closable: true,
                hideNew: false
            });
            
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        }    
    },
    
    onMg_maestrocuentasgridview: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('#MaestroCuentas');
        
        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
             var newTab = Ext.widget('mg_maestrocuentasgridview',{      
                title: 'Maestro de Cuentas',
                itemId: 'MaestroCuentas',
                closable: true,
                hideNew: false
            });
            
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        } 
    },

    onComprobantesClick: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('#Comprobantes');
        
        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
             var newTab = Ext.widget('comprobantegridview',{      
                iconCls : 'icon-page-white',
                title: 'Comprobantes',
                itemId: 'Comprobantes',
                closable: true,
                hideNew: true
            });
            
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);  
        }
    },
    
    onNovedadesClick: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('#Novedades');
        
        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
             var newTab = Ext.widget('novedadesfcgridview',{      
                title: 'Novedades',
                itemId: 'Novedades',
                closable: true
            });
            
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);  
        }
    },
    
    onProductosClick: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('#Productos');
        
        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
            var newTab = Ext.widget('stproductosview',{      
                title: 'Productos',
                iconCls : 'icon-basket', 
                itemId: 'Productos',
                closable: true,
                idOganizacionUsuario: _UserData.Company
               
            });
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        }      
    },
    
    
    onFacturadorWizardClick: function () {
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
			title : 'Facturador novedades',
			closeAction : 'destroy',
            width : 450,
			height : 300,
			border : false,
			items : [{
                xtype:'facturacionautomaticawizardview' 		
			}]
        }).show() 
    },

    onFacturadorContratoClick: function () {
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
			title : 'Facturador contratos',
			closeAction : 'destroy',
            width : 450,
			height : 300,
			border : false,
			items : [{
                xtype:'contratosfacturawizardview' 		
			}]
        }).show() 
    },
    
    onCuentasSinContratoClick: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('cuentassincontratogridview');

        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
            var newTab = Ext.widget('cuentassincontratogridview',{      
                title: 'Cuentas sin contrato',
                closable: true,
                itemId: 'cuentassincontratogridview'
            });
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        }

    },

    
    onContratoFullClick: function () {
        var myPanel = Ext.getCmp('center');
        var mytab = myPanel.down('#Contratos');
        
        if (mytab){
            myPanel.setActiveTab(mytab);
        } else{
            var newTab = Ext.widget('contratogridview',{      
                title: 'Contratos',
                closable: true,
                itemId: 'Contratos',
                hideComponents:['#new']
            });
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        }
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
        controller.openObjectList(view);
        controller.application._nameModule = 'WebDealer';
        controller.application._idModule = controller.application.getModuleIdByName(controller.application._nameModule);

        // Ocultar 'Cuentas sin contrato' si no tiene permiso de Dealer
        if (!SecurityModulesStore.isModuleAvailable('WebDealer')) {
            var cuentasSinContratoItem = view.down('#cuentassincontrato');
            if (cuentasSinContratoItem) {
                cuentasSinContratoItem.setVisible(false);
            }
        }
   
        var nombreOrgField = view.down('#nombreorganizacion');
        if (nombreOrgField) {
            if (typeof desktopData !== 'undefined' && desktopData && desktopData.infoUser && desktopData.infoUser.OrganizationName) {
                nombreOrgField.setValue(desktopData.infoUser.OrganizationName);
            } else {
                nombreOrgField.setValue(getLocale('Central no definida'));
            }
        }
       var record = view.record;

        if(!view.filters) {
           view.filters = [] 
        }
        
        var objectTypeId = 0
        if (record){
            view.filters.push({
                property: 'org_organizacionId',
                value: record.get('org_organizacionId')
            })
            
            view.down('[dataIndex=nombreOrganizacion]').setVisible(false);
        }

        var organizationStore =  Ext.create('Ext.data.Store', {
            model : controller.getT_organizacion_fcSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            sorters: [{
                property: 'org_cnombre',
                direction: 'ASC'
            }],
            filters: [{
                property: 'org_organizacionId',
                value: (typeof desktopData !== 'undefined' && desktopData && desktopData.infoUser && desktopData.infoUser.OrganizationId) ? desktopData.infoUser.OrganizationId : 0
            }],
            autoload: false
        });

        var organizationCombo = view.down('#org_organizacionId');
        organizationCombo.bindStore(organizationStore);

        organizationStore.load({callback:function(records){
            var store = Ext.create('Ext.data.Store', {
            model : controller.getT_organizacion_fcSearchModelModel(),
                remoteFilter: true,
                remoteSort: true,
                pageSize:10000,
                /*sorters: [{
                    property: 'mgmc_ccodigo',
                    direction: 'ASC'
                }],*/
                autoload: false
            });

            var toolbar = view.down('pagingtoolbar');
            //volver atrás toolbar.bindStore(store);
            //view.bindStore(store);

            organizationCombo.select(records[0]);
     
        }});

    },

    onorganizacionFacturadoraChange: function(combo,newValue, oldValue, eOpts){
        //store.add(newValue);
    },

    openObjectList: function(view){
        var newTab = Ext.widget('organizationgridview',{
            iconCls: 'icon-Organization',          
            title: 'Clientes',
            closable: false,
            editorView:'organizationmgview',
            hideEmail:true,
            hideGroups:true,
            hideImportEntities:true,
            hideImportMg:true,
            forceType: 'CLI',
            forceStatus:'7,8,9',
            hideLanding:true,
            enableCliente:true
        });
        
        var myPanel =view.down('tabpanel');
        myPanel.add(newTab);

        var prov = Ext.widget('organizationgridview',{
            iconCls: 'icon-Organization',          
            title: 'Proveedores (Beta)',
            closable: false,
            editorView:'organizationmgprovview',
            hideEmail:true,
            hideGroups:true,
            hideDealerCuenta: true,
            hideImportEntities:true,
            hideImportMg:true,
            forceType: 'PROV',
            //forceStatus:'7,8,9',
            hideLanding:true,
            enableCliente:true
        });
        myPanel.add(prov);

        myPanel.setActiveTab(newTab);
	},

	openObjectById : function(objectId) {
    
	}    
});