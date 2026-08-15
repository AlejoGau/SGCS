Ext.define('SgAppNotes.controller.SgAppNotesController', {
    extend: 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'SgAppNotesView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'sgappnotes' : {
                afterrender : this.initview
			}
            
		});
	}, // cierro init  
    
    initview: function(view){
        this.application._nameModule = 'SgAppNotes';
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);
        var idModule = this.application._idModule;
        var tienePermiso = this.tieneModuloAsignado();

        var tabpanel = view.down('tabpanel');
        var url = '/Rest/Security/Modules/'+this.application._idModule+'/Security';
        var json=null;
   
        if(tienePermiso){   

            var tabActivas = Ext.widget('notasactivasgridview',{
                closable: false,
                title: getLocale('Notas Activas'),
                iconCls:'icon-user-green',            
                securityId: idModule,
            });  
            tabpanel.add(tabActivas); 
            var tabArchivadas = Ext.widget('notasarchivadasgridview',{
                closable:false,
                title: getLocale('Notas Archivadas'),
                iconCls:'icon-email'
            });
            tabpanel.add(tabArchivadas);                      
            
        }else
            Ext.Msg.alert(getLocale('Error de Usuario'),getLocale('El usuario no tiene acceso a este modulo.'));
        /*Ext.Ajax.request({
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

                    if(esAdmin || json.rights.tabIntegrantesUsuarios){
                        var tab2 = Ext.widget('ac_m_usuariosgridview',{
                            closable: false,
                            title: getLocale('Integrantes/Usuarios'),
                            iconCls:'icon-user-green',            
                            securityId: idModule,
                        });      
                        tabpanel.add(tab2);    
                    }

                    if(esAdmin || json.rights.tabAccesosIO){
                        var tab3 = Ext.widget('p_controlacceso_ioview',{
                            closable: false,
                            title: getLocale('Accesos IO'),
                            iconCls:'icon-door-in',            
                            securityId: idModule,
                        });
                        tabpanel.add(tab3);
                    }
                    
                    if(esAdmin || json.rights.tabUnidadesFuncionales){        
                        var tab4 = Ext.widget('cuentagridview', {
                                title : 'Unidades funcionales',
                                closable: false,
                                closeAction: 'destroy',
                                filterTipo: 7,
                                createTipo: 7,
                                itemDbClickView: 'accesscontrolcuentaview',
                                partitionHide: true,
                                falloTSTHide: true,
                                falloAC: true,
                                securityId: idModule,
                                filiacionHide: true,
                                iconCls:'icon-house'
                            });
                        tabpanel.add(tab4)  
                    }



                }
            }
        });  
        */
        
    },
    tieneModuloAsignado: function(){ /** fucntion Agregada por Daniel Orlando Medina******* */
                var controller = this;
                var url = '/Rest/Security/Modules/'+controller.application._idModule+'/Security';
                var modules = SecurityModulesStore;
                
                console.log("SecurityModuleStore class: "+modules.data);    
                modules.data.items.forEach(function(item){
                    console.log(item);
                });
                
                //modules.load({callback: function(){
                var administratorModule = modules.findRecord('KeyReference','Administrator');
                var sgAppNotes = modules.findRecord('KeyReference','SgNotes');        
                if ( administratorModule.get('Available') || sgAppNotes.get('Available')){               
                    console.log("Tiene módulo admin o sgappnotes");
                    return true;
                }else{
                    return false;
                    console.log("No tiene módulo sgappnotes");
                }
    }    /************************** */
});