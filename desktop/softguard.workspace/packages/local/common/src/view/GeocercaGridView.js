//MIGRADO2024
Ext.define('Common.view.GeocercaGridView', {
    extend:'Ext.grid.GridPanel',
    alias : 'widget.geocercagridview', 
    title: 'Geocerca',
    itemId: 'geocercagridview',
    anchor: '100%',
    autoHeight: true,
    columns: [
        {
            dataIndex: 'Name',
            header: 'Nombre',
            sortable: true,
            flex:1
        },
        {
            dataIndex: 'GeoType',
            header: 'Tipo',
            sortable: true,
            width: 150,
            renderer: function(value){
                switch (value){
                    case 'I':
                        return getLocale('Inclusión');
                    break;
                    case 'E':
                        return getLocale('Exclusión');
                    break;
                    case 'X':
                        return getLocale('Inclusión ó Exclusión');
                    break;
                }
            }
        },
        {
            dataIndex: 'lin_crazonsocial',
            header: 'Dealer',
            sortable: true,
            flex: 1,
            renderer: function(value, metadta, record){
                return record.get('Dealer')+'-'+record.get('lin_crazonsocial')
            }
        },
        {
            dataIndex: 'GeoGroupName',
            header: 'Grupo',
            sortable: true,
            flex:1
        }
    ],
    
    setRecord: function(record){
        this.record=record;
        this.fireEvent('recordchanged', this);
    },
    initComponent: function () {
        this.callParent(arguments);
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        var profile = this.module.profile?this.module.profile:this.module.get('profile');
        this.addDocked(pagingtoolbar);
        //------------para fijar perfiles de seguridad según AdministratorSearch-------------
        ///-----https://basecamp.com/2249105/projects/14758734/todos/445486332
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordTrackGuard = storeSecurity.findRecord('KeyReference', 'TrackGuard');
        //var masterModule = storeSecurity.findRecord('KeyReference','MasterWebDealer');
        //var administratorModule = storeSecurity.findRecord('KeyReference','Administrator');
        //var _security = recordTrackGuard.get('Security');
        var url = '/Rest/Security/Modules/'+recordTrackGuard.get('Id')+'/Security';
        //var modules = deepCloneStore(controller.getSecurityModulesStoreStore());
        
        //modules.load({callback: function(){
        //    var masterModule = modules.findRecord('KeyReference','MasterWebDealer');
        //    var administratorModule = modules.findRecord('KeyReference','Administrator');
            
        var view = this;
                Ext.Ajax.request({
                  url: url,
                  method: 'GET',
                  success: function(resp,operation) {
                    var json = resp.responseText?JSON.parse(resp.responseText):null;
                    if (json && json.modules && json.modules.length>0){
                        var modules = json.modules;
                        //datos.rights = json.rights;
                        //var root = datos.getRootNode();
                        Ext.Array.each(modules,function(module){
                            //var model = controller.getModuleModelModel();
                            //var node = Ext.create(model, module);
                            //if (module.profile!='0')
                            //root.appendChild(node)
                            if(module.view == 'geocercagridview'){
                                console.log('Module: '+module);
                                profile = module.profile;
                            }
                                
                        });
                    } 
                    if (profile <=1){
                        view.down('#saveGeo').hide();
                        view.down('#addGeo').hide();
                        view.down('#deleteGeo').hide();
                    }
                    
                  }
                });
        //}})
        
        //----------------------------------------------------------------------------------
                        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                            items: [
                                {
                                    text: 'Guardar',
                                    iconCls: 'save',
                                    itemId: 'saveGeo',
                                    action: 'save'
                                },
                                {xtype: 'tbseparator'},
                                {
                                    iconCls: 'icon-add',
                                    text: 'Nueva',
                                    itemId: 'addGeo',
                                    action: 'add'
                                }, {
                                    iconCls: 'icon-delete',
                                    // itemId: 'btnDelete',
                                    action: 'delete',
                                    itemId: 'deleteGeo',
                                    text: 'Eliminar',
                                    disabled: true
                                },'-',
                                {
                                    xtype: 'combo',
                                    queryMode: 'local',
                                    displayField: 'Name',
                                    itemId: 'geocercaDisponible',
                                    fieldLabel: 'Disponibles',
                                    lastQuery: '',
                                    labelWidth: 60,
                                    listeners: {
                                        change: function(combo, newValue, oldValue) {
                                            console.log(combo.up('toolbar').down('#viusalizarbtn').enable())
                                        }
                                    }
                                },
                                {
                                    text: 'Asignar',
                                    action: 'geoAssign'
                                },
                                {
                                    text: 'Desasignar',
                                    action: 'geoDesAssign'
                                },
                                {
                                    text: 'Visualizar',
                                    action: 'geoVisualizar',
                                    itemId: 'viusalizarbtn',
                                    disabled: true
                                }
                            ]// cierro items
                        }); 
                                        
                        this.addDocked(toolbar);
        
        
    } // cierro init
});