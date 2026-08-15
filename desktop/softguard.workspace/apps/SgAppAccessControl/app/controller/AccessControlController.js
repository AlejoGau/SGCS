Ext.define('SgAppAccessControl.controller.AccessControlController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'AccessControlView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'accesscontrol' : {
                afterrender : this.initview
			}
            
		});
	}, // cierro init  
    
    initview: function(view){
        this.application._nameModule = 'SgAppAccessControl';
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);
        var idModule = this.application._idModule;
        var esAdmin = this.esAdministrador();
        /********banner********** */
        var banner = view.down('#bannerId');
        Ext.Ajax.request({
            url: '/Rest/Security/UserData',
            method: 'GET',
            scope: this,
            success: function(response){
                if (response) {
                    var userData = Ext.JSON.decode(response.responseText);
                    //banner.setSrc('https://gcs.softguard.com/MisAccesos/assets/SPH/21313.jpg');
                    banner.setSrc('/MisAccesos/assets/Organizaciones/'+userData.Company+'/banner.jpg');
                }
            }
        });
        banner.setSrc('https://gcs.softguard.com/MisAccesos/assets/SPH/21313.jpg');
        //_UserData.Company;
        
        //banner.setSrc('https://gcs.softguard.com/MisAccesos/assets/SPH/21313.jpg');
        /************************* */
        var tabpanel = view.down('tabpanel');
        var url = '/Rest/Security/Modules/'+this.application._idModule+'/Security';
        var _idModule = this.application._idModule;
        var json=null;
        /***********************Daniel Orlando Medina*********/
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            success: function(resp,operation) {
                
                if (resp.responseText && resp.responseText!=''){
                   var json = JSON.parse(resp.responseText);
                  
                    if(esAdmin || json.rights.tabBienvenido ){
                        var tab1 = Ext.widget('ac_controlioformview', {
                            closable: false,
                            title: getLocale('Bienvenido'),
                            securityId: idModule,
                        });
                        tabpanel.add(tab1);
                    }

                    if(esAdmin || json.rights.tabUnidadesFuncionales){        
                        var tab2 = Ext.widget('cuentagridview', {
                                title : 'Unidades funcionales',
                            //  isAdmin: isAdmin,
                                closable: false,
                                closeAction: 'destroy',
                                filterTipo: "7,8",
                                createTipo: [7,8],
                                itemDbClickView: 'accesscontrolcuentaview',
                            //  columnHide: '5',//,12,13',
                                partitionHide: true,
                                falloTSTHide: true,
                                falloAC: true,
                                securityId: idModule,
                                filiacionHide: true,
                                iconCls:'icon-house'
                            });
                        tabpanel.add(tab2)  
                    }


                    if(esAdmin || json.rights.tabIntegrantesUsuarios){
                        var tab3 = Ext.widget('ac_m_usuariosgridview',{
                            closable: false,
                            title: getLocale('Personas'),
                            iconCls:'icon-user-green',            
                            securityId: idModule,
                        });      
                        tabpanel.add(tab3);    
                    }
  

                    if(esAdmin || json.rights.tabAccesosIO){
                        var tab4 = Ext.widget('p_controlacceso_ioview',{
                            closable: false,
                            title: getLocale('Ingresos/Egresos'),
                            iconCls:'icon-door-in',            
                            securityId: idModule,
                        });
                        tabpanel.add(tab4);
                    }
                    
                   //var tab5 = Ext.widget('p_controlaccesoview',{
                   //      closable: false,
                   //      title: getLocale('p_controlaccesoview')
                   //  });           
                   //  tabpanel.add(grid);
                    
                     var tab5 = Ext.widget('p_controlacceso_autorizacionview',{
                         closable: false,
                         iconCls:'icon-email-edit',
                         title: getLocale('Autorizaciones')
                     });
                     tabpanel.add(tab5);
                     
                     if(esAdmin || json.rights.tabProveedores){
                        var tab6 = Ext.widget('m_accesscontrolproveedoresgridview',{
                            closable : false,
                            iconCls:'icon-email-edit',
                            title: getLocale('Proveedores')
                        });
                        tabpanel.add(tab6);
   
                     }

                     var tab7 = Ext.widget('t_accesosvehiculoproveedorgridview',{
                            closable: false,
                            iconCls: 'icon-email-edit',
                            title: 'Vehículos'
                     });
                     tabpanel.add(tab7);

                     
                     var tab8 =  Ext.widget('p_controlacceso_autorizaciondeliverygridview',{
                        closable: false,
                        iconCls: 'icon-email-edit',
                        title: 'Delivery'
                    });
                 tabpanel.add(tab8);

                     /*var tab8 = Ext.widget('griduser',{
                        closable: false,
                        iconCls: 'icon-email-edit',
                        title: 'Acceso Proveedores xxxx'

                     });
                     tabpanel.add(tab8);*/



                }else{
                    Ext.Msg.alert(getLocale("Debe asignar permisos de Pestañas Principales"));                    
                }
            }
        });  
        /********************************** */
    },
    esAdministrador: function(){ /** fucntion Agregada por Daniel Orlando Medina******* */
                var controller = this;
                var url = '/Rest/Security/Modules/'+controller.application._idModule+'/Security';
                var modules = SecurityModulesStore;
                
                console.log("SecurityModuleStore class: "+modules.data);    
                modules.data.items.forEach(function(item){
                    console.log(item);
                });
                
                //modules.load({callback: function(){
                var administratorModule = modules.findRecord('KeyReference','Administrator');
                var accessControlModules = modules.findRecord('KeyReference','AccessControl');        
                if ( administratorModule.get('Available')){               
                    console.log("Tiene permisos de administrador");
                    return true;
                }else
                    return false;
    }    /************************** */
});