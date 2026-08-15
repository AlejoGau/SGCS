//MIGRADO2024
Ext.define('Common.controller.MGCuentaController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.MoneyGuardModuleStore' ],
    models : [ 'MoneyguardClientSearchModel', 'MoneyguardClientByCuentaSearchModel', 'm_clientes_fcSearchModel', 'OrganizationSearchModel', 'DealerRangoModel', 'OrganizationModel', 't_condiciones_pago_fcSearchModel', 'm_clientes_fcModel' ],
    views : [ 'MGCuentaView', 'OrganizationFormView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
            'mgcuentaview' : {
                beforerender : this.initView,
                organizationsave : this.onOrganizationSave,
                organizationchanged : this.onOrganizationChanged,
                objectchange : this.onObjectChange
    		},
            'mgcuentaview button[action=addorganization]' : {
                click : this.onAddOrganization
            },
            'mgcuentaview button[action=selectorganization]' : {
                click : this.onSelectOrganization
            }
            
            
		});
	}, // cierro init
    
    initView: function(view){
        var objectId = view.objectId;
        var record = view.record;
        view.organization= record;
        console.log(record);
        this.loadOrganizacion(view);
        //this.loadRecordCliente(record.get('cue_iid'),view);
        //CuentaByFilter
        //[{"property":"GetSqlFilter_CuentasByOrganization:Function","value":911},{"property":"cue_iid","value":14619}]
    },
    onObjectChange: function(view){
        var controller = this;
        controller.loadOrganizacion(view);
    },
    onOrganizationChanged: function(record,view){
        var controller = this;
        var dealerRangoModel = this.getDealerRangoModelModel();
        dealerRangoNewRecord = Ext.create(dealerRangoModel,{
            Name:'DealerRango',
            Dealer: view.record.get('cue_clinea'),
            CuentaDesde: view.record.get('cue_ncuenta'),
            CuentaHasta: view.record.get('cue_ncuenta'),
            IdEntidad: record.get('Id')
        }); 
        dealerRangoNewRecord.save({
            callback: function(rangoRecord,operation){
                
                controller.loadOrganizacion(view);
                
            }
        });
    },
    onSelectOrganization: function(button){
        var view = button.up('mgcuentaview');
        var filters =  [];
        filters.push({
                    property: 'OrganizationType:IN',
                    value: "CLI",
                    id: 'OrganizationType'
            });
        var win = Ext.widget('window',{
            title : getLocale('Seleccione organización'),
            height: 600,
            width: 600,
            resizable: false,
            modal: true,
            items: [
                {
                    xtype: 'organizationhelperview',
                    filter: filters,
                    caller: view,
                    disableFilterOrgType: true
                }
            ]
        });
        win.show();
    },
    onAddOrganization: function(button){
        var view = button.up('mgcuentaview');
        var win = Ext.widget('window',{
                title : getLocale('Alta de Organización'),
                height: 650,
                width: 600,
                resizable: false,
                modal: true,
                items: [
                    {
                        xtype: 'organizationformview',
                        //record: view.record,
                        recordSearch: view.record,
                        organization: view.organization,
                        caller: view,
                        title: 'Datos',
                        organizationtype:'CLI',
                        objectId: 0,
                        targetTab: view.targetTab,
                        
                    }
                ]
  
        });
        win.show();
    },
    addInfoContable: function(view,record/* record de la organización */){
          
        var controller =this;
            var storeCliente = Ext.create('Ext.data.Store',{
                model: controller.getM_clientes_fcSearchModelModel(),
                remoteFilter: true,           
                filters:[{
                    property: 'cli_icodigo_ID',
                    value: view.record.get('Account')
                    }
                ]
            }).load({callback:function (records) {
                if(records.length<=0 || !view.record.get('Account')) {
                    var CondicionPagoStore = Ext.create('Ext.data.Store',{
                        model: controller.getT_condiciones_pago_fcSearchModelModel(),
                        pageSize: 50,
                        remoteSort: true,
                        remoteFilter: true,
                    })
                    CondicionPagoStore.load({callback:function (recordsCondicionPago) {
                        if(recordsCondicionPago.length <= 0) {
                                Ext.MessageBox.alert('Falta configuracion', 'Es necesario tener creadas las las condiciones de pago. Ingrese a AdministratorSearch para crearlas.', function(){});
                                return false;                                  
                        }
                        var recordCliente = controller.getM_clientes_fcModelModel().create({
                            cli_cnombre: view.record.get('Name'),
                            cli_cidentificacion:null,
                            cli_ccategoriaimpositiva:null,
                            cli_ivendedor:null,
                            cli_icobrador:null,
                            cli_czona:null,
                            cli_ccallefiscal: view.record.get('Address'),
                            cli_clocalidadfiscal: view.record.get('City'),
                            cli_cprovinciafiscal: view.record.get('State'),
                            cli_ccodigopostalfiscal: view.record.get('Zip'),
                            cli_ccallecobranza: '',//view.record.get('Name'),
                            cli_clocalidadcobranza: view.record.get('City'),
                            cli_cprovinciacobranza: view.record.get('State'),
                            cli_ccodigopostalcobranza: view.record.get('Zip'),
                            cli_nlunes:0,
                            cli_nmartes:0,
                            cli_nmiercoles:0,
                            cli_njueves:0,
                            cli_nviernes:0,
                            cli_nsabado:0,
                            cli_ndomingo:0,
                            cli_chora:'',
                            cli_cservicio: null,
                            cli_cformatoimpresion:null,
                            cli_ccondicionpago:recordsCondicionPago[0].get('con_ccodigo'),
                            cli_ctelefono: view.record.get('Phone'),
                            cli_ccontacto: '',
                            cli_cobservacion:null,
                            cli_nsituacion:1,
                            cli_inumero:0,
                            cli_nDocCAE:0,
                            cli_cdatosextra:null
                        })
                        var win = Ext.create('Ext.Window', {
                            title : getLocale('Información contable'),
                            closeAction : 'hide',
                            width : 800,
                            height : 500,
                            layout:'fit',
                            border : true,
                            modal: true,                
                            items : [{
                                xtype:'clienteformview',
                                recordCliente: recordCliente,
                                recordOrganizacion: record,//view.record,
                                caller:view
                            }]
                        }).show()
                    }})
                } else {
                    controller.getM_clientes_fcModelModel().load(records[0].get('Id'),{callback:function (recordCli) {
                        var win = Ext.create('Ext.Window', {
                            title : getLocale('Cliente'),
                            closeAction : 'hide',
                            width : 550,
                            height : 500,
                            border : true,
                            layout:'fit',
                            modal: true,                
                            items : [{
                                xtype:'clienteformview',
                                recordCliente: recordCli,
                                recordOrganizacion: record,//view.record,
                                caller:view
                            }]
                        }).show()
                    }})
                }
        }})
    },
    onOrganizationSave: function(view, record){
        //var dealerRango
        var controller = this;
        var dealerRangoModel = this.getDealerRangoModelModel();
        dealerRangoNewRecord = Ext.create(dealerRangoModel,{
            Name:'DealerRango',
            Dealer: view.record.get('cue_clinea'),
            CuentaDesde: view.record.get('cue_ncuenta'),
            CuentaHasta: view.record.get('cue_ncuenta'),
            IdEntidad: record.get('Id')
        }); 
        dealerRangoNewRecord.save({
            callback: function(rangoRecord,operation){
                
                //controller.loadOrganizacion(view);
                controller.addInfoContable(view,record);
                
            }
        });
    },
    loadOrganizacion: function(view){
        var dealerRangoModel = this.getDealerRangoModelModel();
        var dealerRangoStore = Ext.create('Ext.data.Store',{
            model: dealerRangoModel,
            remoteFilter: true,
            filters: [
                {"property":"Dealer", "value":view.record.get('cue_clinea')},
                {"property":"CuentaDesde:GTESTRING","value":""+view.record.get('cue_ncuenta')},
                {"property":"CuentaHasta:LTESTRING","value":""+view.record.get('cue_ncuenta')}
            ]
        });
        var orgSearchModel = this.getOrganizationSearchModelModel();
        //var organizationModel = this.getOrganizationModelModel();
        var controller = this;
        dealerRangoStore.load({
            callback: function(records){
                if(records.length){
                    if(records[0].get('IdEntidad')){
                        /*organizationModel.load(records[0].get('IdEntidad'),{
                            callback: function(record,operation){
                                
                                if(record){
                                    var tab = view.down('#datosAgregarAsignar');
                                    view.down('tabpanel').remove(tab);
                                    controller.setRecord(record,view);
                                }else{
                                }
                                    
                            }
                        });*/
                        var orgSearchStore = Ext.create('Ext.data.Store',{
                            model: orgSearchModel,
                            remoteFilter: true,
                            filters:[
                                {"property": "o.Id", "value": records[0].get('IdEntidad') }
                            ]
                        });  
                        orgSearchStore.load({
                            callback: function(records){
                                 if(records.length>0){
                                    var tab = view.down('#datosAgregarAsignar');
                                    view.down('tabpanel').remove(tab);
                                    controller.setRecord(records[0],view);
                                }else{
                                }                               
                            }
                        });                     
                    }
                }
            }
        });
        
    },
    /*loadRecordCliente: function(account,view){
        var clienteStore = Ext.create('Ext.data.Store',{
            model: this.getMoneyguardClientByCuentaSearchModelModel(),
            pageSize: 1,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'cue_iid',
                value: account
            }]
        })
        if (account == '') {    
            // dejo para que busquen la cuenta
            this.setRecord(undefined,view);
		} else {            
		   clienteStore.load({
                callback : function(records,operation) {
                    var record = records[0];
                    if (operation.success){
					    this.setRecord(record,view);
                    }
				},
				scope : this
			});
        }
    },*/
    
    setRecord: function(record,viewport){
        var myPanel = viewport.down('tabpanel');
        var center = viewport.down('#center');
        var targetTab = viewport.targetTab;
        
        // si center es un tabpanel agrego el tab, 
        // sino supongo que el form esta cargado y le agrego el record
        if (myPanel){
                
            var datos = Ext.widget('organizationformview',{
                record: record,
                recordSearch: record,
                organization: viewport.organization,
                title: 'Datos',
                targetTab: targetTab,
                closable: false
            });
            // para dejar en readonly los fields
            Ext.suspendLayouts();
            if(datos.getForm()){
                datos.getForm().getFields().each(function(field) {
                    field.setReadOnly(true);
                });
            }
            Ext.resumeLayouts();
            
            var serviciosContratados = Ext.widget('mgservicioscontratadosview',{
                record: record,
                recordCuenta: viewport.record,
                title: 'Servicios contratados',
                closable: false
            });
			var comprobantes = Ext.widget('comprobantegridview',{
                record: record,
                organization: viewport.organization,
                title: 'Comprobantes',
                targetTab: targetTab,
                hideNew: true,
                closable: false
        	});
            var cuentacorriente = Ext.widget('mg_movimientoscuentasgridview',{
                record: record,
                organization: viewport.organization,
                title: 'Cuenta corriente',
                targetTab: targetTab,
                hideNew: true,
                closable: false
        	});
    		myPanel.add(datos);
            if(datos.down('#save'))
                datos.down('#save').hide();
            if(datos.down('#map'))
                datos.down('#map').hide();
            if(datos.down('#deleteDecision'))
                datos.down('#deleteDecision').hide();
            if(datos.down('#cliente'))
                datos.down('#cliente').show();
            myPanel.add(serviciosContratados);
			myPanel.add(comprobantes);
            myPanel.add(cuentacorriente);
			myPanel.setActiveTab(datos);
                
        } else {
            var form = viewport.down('moneyguardclientformview');
            form.record = record;
            form.loadRecord(record);
            
            // cambio el titulo del padre
            var center = window.parent.Ext.getCmp('center');
            if (center){
                center.getActiveTab().setTitle(record.get('Name'));
            }
        };
        var _module = viewport.down('moduletreeview');
        if (_module) {
            _module.down('treeview').record= record;
            _module.record = record;
            _module.targetTab = center;
            _module.down('treeview').targetTab = center;
        }
        
        
        var asignarbtn = Ext.ComponentQuery.query('#asignarbtn')[0];
        var deletebtn = Ext.ComponentQuery.query('#deletebtn')[0];
        if (deletebtn){
            deletebtn.hide();
        }
        
        if (record && asignarbtn){
            asignarbtn.hide();
        }
    
    }
});