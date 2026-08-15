//MIGRADO2024
Ext.define('Common.controller.ParticionesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SoftguardZonaModel', 'ZonaByCuentaSearchModel', 'SoftguardCuentaModel', 'SoftguardEstadoModel' ],
    views : [ 'ParticionesGridView' ],
    ignoreState: true,
    init: function (config) {
        var me=this;
        // genero los eventos
        this.control({
           
            'particionesgridview button[action=add]': {
                click: this.onAddClick
            },
            'particionesgridview button[action=save]': {
                click: this.onSaveClick
            },
            'particionesgridview button[action=copy]': {
                click: this.onCopyClick
            },
            'particionesgridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'particionesgridview': {
                afterrender: this.initView,
                itemdblclick: this.onOpenCuenta,
                objectchange : this.onObjectChange,
                opencuenta : this.onOpenCuenta,
                objectedit : this.onObjectEdit,
                addzona : this.onAddZona,
                
                selectionchange : this.onSelectionChange
            }
        });
    }, // cierro init
    initView: function (view) {
        var record = view.record;
        var module = view.module;
        var profile = module?module.get('profile'):1;
        view.profile = profile;
        
        if(!view.filters) {
           view.filters = [{
                property: 'zon_ccodigo:like',
                value: 'PAR',
                id: 'zon_ccodigo'
            }]; 
        }
        
        if(view.ultimaAlarma) {
            var col = view.down('[dataIndex=sta_cultimaalarma]');
            col.show();
        }
        
        if (profile < 2){
            view.down('toolbar').hide();
        }
        
        if(view.hideEdit == true) {
            view.down('#editparticion').hide();
        }
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var cue_iid = view.record.get('cue_iid');

        var mystore =Ext.create('Ext.data.Store',{
            model: this.getZonaByCuentaSearchModelModel(),
            remoteFilter: true,
            filters: view.filters,
        });
        //if(mystore.getProxy().url.indexOf('cuentaId=')===-1)
        //    view.mystore.getProxy().setUrl(view.mystore.getProxy().url + '?cuentaId=' + cue_iid);

        mystore.on('beforeload', function(store, operation, eOpts) {
            store.getProxy().setExtraParam('cuentaId', cue_iid);
        });        
        view.bindStore(mystore);
        view.down('#pagingParticionesGrid').bindStore(mystore);
        view.relayEvents(view.getStore(), ['load']);
        mystore.load();
    },
    
   onSelectionChange : function(selModel,selRecords,opt){
        var view = selModel.views[0].up('particionesgridview');
        var button = view.down('button[action=delete]');
        if (button)
            button.setDisabled(selRecords.length === 0);    
            
        var button = view.down('button[action=copy]');
        if (button)
            button.setDisabled(selRecords.length === 0);        
   },
    
    onAddZona: function(record,view){
        //var view = view.up('particionesgridview');
        var idparticion =  record.config.record.get('Id');
    	
        var record = this.getSoftguardZonaModelModel().create({
            zon_iidcuenta: idparticion,
            zon_cAlarmaAGenerar: 'NYR',
            zon_nmostrar: 2,
            zon_nautoprocesa: 2
        });
        
        this.openZonaFormWindow('Nueva zona',record,view);
       
    },
    
    
    openZonaFormWindow: function(title,record,view){
        //var view = grid.up('particionesgridview');
        
        var cod = '';
        
        if (view.profile >= 2 && cod !='PAR'){
            var newView = Ext.widget('zonaformview',{
                record: record,
                caller: view,
                profile: view.profile,
                relacionado:false
            });
           
            // Lo agregamos al panel
            var myWindow = Ext.widget('window',{
                title: title,
                height: 500,
                width: 400,
                modal: true, 
                items: newView,
                closable: false,
                layout: 'fit'
            }).show();
        }else {
            if (cod == 'PAR'){
                notifyError('Utilice la paleta Particiones');
            }else{
                notifyError('No posee derechos para esta operación');
            }
        }
    },
    
    onOpenCuenta: function(grid, record){
        var view = grid.up('particionesgridview');
        var id = record.get('cue_iid');
        //if (view.profile >= 2){
            var readonly = false;
            if(view.profile <= 1){
                readonly = true;    
            }
            
            var panel;
            if(view.up('cuentaview')) {
                panel = view.up('cuentaview').up('tabpanel');
            } else {
                panel = view.up('#center');
            }
            if(view.targetTab) {
                panel = view.targetTab;
            }
            
            var title = record.get('zon_cdealer') + '-' + record.get('zon_ccuenta') + ' - ' + record.get('cue_cnombre');
            title = title.replace(',','');
            var mytab = panel.down('[title="' + title + '"]');
            if (!mytab) {
                var newTab = Ext.widget('cuentaview', {
                    tabConfig: {translate: false},
        			title : title,
                    objectId: id,
                    translate: false,
                    closable: true,
                    closeAction: 'destroy',
                    readonly:readonly,
                    recordCuenta: record
        		});
                panel.add(newTab);
                panel.setActiveTab(newTab);
    		}
    		// el existe, lo activo
    		else {
                mytab.show();
    		}
            
       // }
        
    },
    
     onCopyClick: function(button,event,options){
        var view = button.up('particionesgridview');
        var selection = view.getSelectionModel().getSelection();
        var newView = Ext.widget('particionescopyformview',{
            
            selection: selection,
            callerView: view
        });
       
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: getLocale('Actualizar datos'),
            height: 350,
            width: 400,
            modal: true, 
            items: newView,
            closable: false,
            layout: 'fit'
        }).show();                
     },
     onDeleteClick: function(button,event,options){
        var view = button.up('particionesgridview');
        var controller = this;
        var selection = view.getSelectionModel().getSelection();
        var record = view.record;
        button.disable();
        if (selection.length>0) {
            //view.store.remove(selection);
            
            var len = selection.length-1;
            var zonaModel = controller.getSoftguardZonaModelModel();
            for(var key in selection) {
                zonaModel.load(selection[key].get('Id'),{
                    callback: function(recordErase){
                        recordErase.erase({
                            callback: function(record){
                                var model = controller.getSoftguardEstadoModelModel();
                                model.load(selection[key].get('cue_iid'), {callback: function(record){
                                    
                                    record.set('est_nestado', 4);
                                    if(key >= len) {
                                        var paging = view.down('pagingtoolbar');
                                        paging.doRefresh();
                                    }                                     
                                    record.save({
                                        controller: this,
                                        failure : function(record,operation) {
                                            console.log(arguments)
                                        },// cierro function
                                        success : function(record,operation) {
                                            
                                            notify('El estado se guardó con éxito');
                                        }// cierro function
                                    });// cierro save
                                }});                               
                            }
                        });
                    }
                });
                /*
                Ext.Ajax.request({
                    url: '/Rest/Zona/'+selection[key].get('Id'),
                    method: 'DELETE',
                    scope: this,
                    success: function(response){
                        
                        
                        var model = this.getSoftguardEstadoModelModel();
                        model.load(selection[key].get('cue_iid'), {callback: function(record){
                            
                            record.set('est_nestado', 4);
                            
                            record.save({
                                controller: this,
                                failure : function(record,operation) {
                                    console.log(arguments)
                                },// cierro function
                                success : function(record,operation) {
                                    
                                    notify('El estado se guardó con éxito');
                                }// cierro function
                            });// cierro save
                        }});
                        
                        
                        
                        
                        
                        
                    }
                    });
                    */
                    
                    

            }  
        } 
    },
    onAddClick: function(button,event,options){
        var view = button.up('particionesgridview');
        var cuenta =  view.record;
        var store = view.getStore();
		
       /* var records = store.add({
            zon_iidcuenta: cuenta.get('Id'),
            zon_cAlarmaAGenerar: 'NYR',
            zon_nmostrar: 2,
            zon_ccuenta: '',
            zon_nautoprocesa: 2
        });*/
        
        this.openFormWindow(view.newText,null,view);
    },
    onSaveClick: function (button,event,options) {
        var view = button.up('particionesgridview');
        var store = view.store;
        var t = this;
        var valido = true;
        store.each(function (record) {
            
            var codigo = record.get('zon_ccodigo');
            var idcodigo = record.get('Id');
            
            store.each(function (recordx) {
                var codigox = recordx.get('zon_ccodigo');
                var idcodigox = recordx.get('Id');
                
                
                
                if(t.trim(codigo) == t.trim(codigox) && t.trim(codigo).indexOf("PAR") != -1) {
                   
                   
                    if(idcodigo != idcodigox) {
                       valido = false;
                       
                       
                        notify('El codigo '+record.get('zon_ccodigo')+' ya se encuentra en uso.');
                        
                    }
                    
                }
            });
           
           
        });
        
        
        if(valido) {
            store.sync();
            notify('Los cambios se guardaron con éxito');
        }
    },
    trim: function(str){
        return str.replace(/^\s+|\s+$/g, '');
        
    },   
    
    onObjectEdit : function(record,view){
        
        this.onItemDblClick(view,record);
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        var view = view.up('particionesgridview')?view.up('particionesgridview'):view;
        var newView = Ext.widget('particionesformeditview',{
            record: record,
            cuenta: view.record,
            callerView: view,
            profile: view.profile
        });
       
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: record.get('zon_cdescripcion'),
            height: 250,
            width: 400,
            modal: true, 
            items: newView,
            closable: false,
            layout: 'fit'
        }).show();
    },
    
    openFormWindow: function(title,record,grid){
        var view = grid.up('particionesgridview')?grid.up('particionesgridview'):grid;
        if (view.profile >= 2){
            var _config = {
                record: record,
                cuenta: view.record,
                callerView: grid,
                profile: view.profile
            }
            if (view.newConfig){
                Ext.apply(_config,view.newConfig)
            }
            // me aseguro que la config este en el momento de initcomponent para que haga el hide.
            var newView = Ext.widget('particionesformview',_config);
            // Lo agregamos al panel
            var myWindow = Ext.widget('window',{
                title: title,
                height: 550,
                width: 400,
                modal: true, 
                items: newView,
                closable: false,
                layout: 'fit'
            }).show();
        }else {
            notifyError('No posee derechos para esta operación');
        }
    },
    
    onObjectChange: function(record,view){
       var paging = view.down('pagingtoolbar');
        paging.doRefresh();
    }
});