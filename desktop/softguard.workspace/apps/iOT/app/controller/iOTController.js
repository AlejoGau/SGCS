Ext.define('iOT.controller.iOTController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.SiNoStore', 'iOT.store.SeccionesStore'],
    models: [],
    views: ['iOTView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iot': {
                afterrender: this.initview
            }

        });
    }, // cierro init  

    initview: function (view) {
        this.application._nameModule = 'iOT';
        this.application._idModule = this.application.getModuleIdByName(this.application._nameModule);
        var idModule = this.application._idModule;
        var tienePermiso = this.tieneModuloAsignado();

        var tabpanel = view.down('tabpanel');
        var url = '/Rest/Security/Modules/' + this.application._idModule + '/Security';
        var json = null;

        if (tienePermiso) {

            /* var tabActivas = Ext.widget('iotcuentagridgmapview',{
                 closable: false,
                 title: getLocale('iOT'),
                 iconCls:'icon-user-green',            
                 securityId: idModule,
             });  
             tabpanel.add(tabActivas); 
             */


        } else
            Ext.Msg.alert(getLocale('Error de Usuario'), getLocale('El usuario no tiene acceso a este modulo.'));
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
        
        /*var _store = Ext.create('Ext.data.TreeStore', {
            model: this.getIOT_seccionesModelModel(),

            data: [
                {
                    text : 'Sera4',
                    iconCls : 'icon-book-error',
                    view: 'reportecuentasincontrolconfiguracionview',
                    leaf: true, 		
                    closable: true,
                    closeAction: 'destroy',
                    folder : 'Candados'
                }       
            ]            


        });   */
        var datos = Ext.widget('moduletreeview', {
            store: this.getSeccionesStoreStore(),
            targetTab: view.down('#center'),
            preventHeader: true,
            record: '',
            rootVisible: false,
            bodyPadding: '0 0 5 0',
            collapsed: false,
            listeners: {
                itemclick(ss, record, item, index, e, eOpts) {
                    var tabpanel = view.down('tabpanel');
                    if (!tabpanel.down('[title="Candados - Sera4"]')) {
                        if (record.get('view') == 'iotcuentaview') {
                            var tab = Ext.widget('iotcuentaview', {
                                title: 'Candados - Sera4',
                                closable: false,
                                closeAction: 'destroy',
                                iconCls: 'icon-house'
                            });
                            tabpanel.add(tab);
                        }
                    }

                    if (!tabpanel.down('[title="Medidor de Energía"]')) {
                        if (record.get('view') == 'iotenergyview') {
                            var tab = Ext.widget('iotenergyview', {
                                title: 'Medidor de Energía',
                                closable: false,
                                closeAction: 'destroy'
                            });
                            tabpanel.add(tab);
                        }
                    }
                }
            }
        });
        var root = datos.getRootNode();
        //se agrega el nodo en el treeview de candados
        root.childNodes[0].appendChild({
            text: 'Sera4',
            iconCls: 'icon-book-error',
            view: 'iotcuentaview',
            leaf: true,
            closable: true,
            closeAction: 'destroy',
            folder: 'candado'
        });

        //se agrega el nodo en el treeview de energy monitor
        /* root.childNodes[1].appendChild( {
                 text : 'Medidor de Energía',
                 iconCls : 'icon-book-error',
                 view : 'iotenergyview',
                 leaf : true,
                 closable : true,
                 closeAction : 'destroy',
                 folder : 'candado'
             });*/

        var west = view.down('#west');
        west.setTitle(getLocale('Secciones'));

        west.insert(0, datos);
    },
    tieneModuloAsignado: function () { /** fucntion Agregada por Daniel Orlando Medina******* */
        var controller = this;
        var url = '/Rest/Security/Modules/' + controller.application._idModule + '/Security';
        var modules = SecurityModulesStore;

        console.log("SecurityModuleStore class: " + modules.data);
        modules.data.items.forEach(function (item) {
            //console.log(item);
        });

        //modules.load({callback: function(){
        var administratorModule = modules.findRecord('KeyReference', 'Administrator');
        var sgAppNotes = modules.findRecord('KeyReference', 'iOT');
        if (administratorModule.get('Available') || sgAppNotes.get('Available')) {
            console.log("Tiene módulo admin o iot");
            return true;
        } else {
            return false;
            console.log("No tiene módulo sgappnotes");
        }
    }    /************************** */
});