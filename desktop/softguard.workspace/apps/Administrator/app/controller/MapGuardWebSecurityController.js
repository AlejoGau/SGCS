Ext.define('Administrator.controller.MapGuardWebSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasMovilesPatrullaSearchModel', 'TablasMovilesPatrullaModel' ],
    views : [ 'MapGuardWebConfigView', 'MapGuardWebSecurityView' ],

    init : function(config) {
        this.control({
            'SgAppMapGuardWebSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'SgAppMapGuardWebConfig button[action=saveConfig]': {
                click: this.onSaveConfigClick
            },
            'SgAppMapGuardWebSecurity' : {
                afterrender : this.initview
    		},
            'SgAppMapGuardWebSecurity #agregarpatrulla' : {
                click : this.onAgregarPatrullaClick
        	},
            '#patrullasasigandas #delete' : {
                click : this.onDeletePatrullaClick
            }
		});
	}, // administratormoduleformview
    
    initview : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var module = view.module;
        var moduleId= module.get('udm_idKey');
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var security = {filters:{}}
        var controller = this;
        view.url = url;
        
        
        
        
        
        Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
            if (resp.responseText)
                var json = JSON.parse(resp.responseText);
            if (json)
                security = json;
            
            view.security = security;            
            view.url = url;
            
            var value = -1;
            if (security.filters.patrullas){
                
                
              value = security.filters.patrullas

            }
            
            
            view.patrullaAsignadasStore =Ext.create('Ext.data.Store',{
                    model: controller.getTablasMovilesPatrullaSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: 'tmp_idKey:ININT',
                        value: value
                    }]
                })
                view.down('#patrullasasigandas').bindStore(view.patrullaAsignadasStore);
                
                view.patrullaAsignadasStore.load();
                
                
                //agrego tab de configuraciones
                if (!view.up('tabpanel').down('SgAppMapGuardWebConfig')){
                    var tab = view.up('tabpanel').insert(0,Ext.widget('SgAppMapGuardWebConfig',{               
                    }));
                    
                    if(security.rights) {
                       
                        tab.down('#moviles').setValue(security.rights.moviles)
                        tab.down('#trackguard').setValue(security.rights.trackguard)
                        tab.down('#smartpanics').setValue(security.rights.smartpanics)
                        tab.down('#vigicontrol').setValue(security.rights.vigicontrol)
                        tab.down('#serviciotecnico').setValue(security.rights.serviciotecnico)
                        tab.down('#cuentasfijas').setValue(security.rights.cuentasfijas)
                        tab.down('#camarascuenta').setValue(security.rights.camarascuenta)
                        tab.down('#camaraszona').setValue(security.rights.camaraszona)
                        tab.down('#eventos').setValue(security.rights.eventos)
                    
                    }
                }
            
          }
        });



        var patrullaStore =Ext.create('Ext.data.Store',{
            model: this.getTablasMovilesPatrullaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: false,
            filters: []
        })
        view.down('#patrullas').bindStore(patrullaStore);
        
        patrullaStore.load();


    },
    
    onDeletePatrullaClick: function(button, event, options) {
        
        var view = button.up('#patrullasasigandas');      
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            /*Ext.Array.each(delRec, function (rec) {
                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            notify('Se eliminio exitosamente');
                            
                        }
                        else
                        {
                           notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }    
                        view.store.load();
                   
                }
                
            });
            
            },this);*/
            
            
        }
      
    },


    onAgregarPatrullaClick : function(button, event, options) {
        
        var view = button.up('SgAppMapGuardWebSecurity');
        var combopatrullas = view.down('#patrullas');
        var value = combopatrullas.getValue();
        var record = combopatrullas.findRecord(combopatrullas.valueField , value);
        if(view.patrullaAsignadasStore) {
            var asiganadas = view.patrullaAsignadasStore.findRecord('tmp_idKey' , record.get('tmp_idKey'));
        }
        if(!asiganadas) {
            view.patrullaAsignadasStore.add(record)
        } else {
            notify('El patrullero ya se encuentra agregado.');
        }
    },
    
    onSaveConfigClick: function(button, event, options) {
        var view = button.up('SgAppMapGuardWebConfig');
        this.onSaveClick(view.up('tabpanel').down('SgAppMapGuardWebSecurity'))
    },

	onSaveClick : function(button, event, options) {
		var view = button.up('SgAppMapGuardWebSecurity')? button.up('SgAppMapGuardWebSecurity'):button;
        var tabpanel = view.up('tabpanel')
        var configpanel = tabpanel.down('SgAppMapGuardWebConfig')

        var listPatrullasArr = new Array();
        view.patrullaAsignadasStore.each(function (value,index) {
            listPatrullasArr.push(value.get('tmp_idKey'));
            
        })


        view.security.filters={
            patrullas:listPatrullasArr.join(",")
        }
        
        
        
        
        view.security.rights = {
            moviles:configpanel.down('#moviles').getValue(),
            trackguard:configpanel.down('#trackguard').getValue(),
            smartpanics:configpanel.down('#smartpanics').getValue(),
            vigicontrol:configpanel.down('#vigicontrol').getValue(),
            serviciotecnico:configpanel.down('#serviciotecnico').getValue(),
            cuentasfijas:configpanel.down('#cuentasfijas').getValue(),
            camarascuenta:configpanel.down('#camarascuenta').getValue(),
            camaraszona:configpanel.down('#camaraszona').getValue(),
            eventos:configpanel.down('#eventos').getValue()
        }
      
        
        var json = Ext.encode(view.security);
        
        Ext.Ajax.request({
          url: view.url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
        
    }
});