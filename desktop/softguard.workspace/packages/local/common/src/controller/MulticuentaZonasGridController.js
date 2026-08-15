//MIGRADO2024
Ext.define('Common.controller.MulticuentaZonasGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventosTiempoRealModel', 'CuentaSearchModel', 'ZonasSearchModel', 'ZonaByCuentaSearchModel', 'SoftguardZonaModel' ],
    views : [ 'MulticuentaZonasGridView' ],

    init: function (config) {
        var me=this;
        // genero los eventos
        this.control({
           
            /*'multicuentazonasgridview button[action=add]': {
                click: this.onAddClick
            },*/
            'multicuentazonasgridview button[action=save]': {
                click: this.onSaveClick
            },
           /* 'multicuentazonasgridview button[action=copy]': {
                click: this.onCopyClick
            },*/
          /*  'multicuentazonasgridview button[action=delete]': {
                click: this.onDeleteClick
            },*/
            'multicuentazonasgridview button[action=actualizar]': {
                click: this.onActualizarClick
            },
            
            'multicuentazonasgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemDblClick,
                objectchange : this.onObjectChange,
                opencuenta : this.onOpenCuenta,
                objectedit : this.onObjectEdit,
                particionedit : this.onParticionEdit
            },
            'multicuentazonasgridview #uploadPhoto': {
                click: this.onUploadPhotoAction
            }
        });
    }, // cierro init
    initView: function (view) {
        var record = view.record;
        var module = view.module;
        var profile = module?module.get('profile'):1;
        view.profile = profile;
        var controller = this;
                
        if(!view.particiones) {   
            var title, idMadre;
            
            if(view.record.get('cue_nparticion') == 0) {     
                idMadre = view.record.get('cue_iid');   
            } else {        
                idMadre = view.record.get('cue_nparticion');
            }  
                        
                        
            var store = Ext.create('Ext.data.Store',{
                model: this.getZonaByCuentaSearchModelModel(),
                remoteFilter: true,
                listeners: {
                    beforeload: function(store, operation){
                        operation.params = {cuentaId:idMadre};
                    }
                },
                filters: [{
                    property: 'zon_ccodigo:like',
                    value: 'PAR'
                    } 
                ]
            });
            view.particionesStore = store;
            store.load({callback:function(records) {
                view.particiones = records; 
                if(view.record.get('cue_nparticion') == 0) {     
                    view.particiones.push(view.record);// sumo a la madre para que se vean sus zonas
                    store.add(view.record);
                }
                controller.openParticiones(view.particiones,view);
            }});
            
        
        } else {
            controller.openParticiones(view.particiones,view);            
        }  
       
        
    },
    
    onUploadPhotoAction: function(grid,cell,row,col,e) {
            var controller = this;
            var rec = grid.getStore().getAt(row),
            photo = rec.get('zon_cimagen'),
            zona = rec.get('zon_cdescripcion'),

            model = Ext.create('Common.model.SoftguardZonaModel');

        /*rec.setConfig({
            proxy: model.getProxy()
        });*/
        var zoneModel = controller.getSoftguardZonaModelModel();
        zoneModel.load(rec.get("Id"),{
            callback: function(record){
                myimg = Ext.widget('photopanel', {
                    field: 'zon_cimagen',
                    record: record
                });                
                Ext.create('Ext.Window', {
                    title: 'Foto: ',
                    height: 252+32,
                    width: 360+10,
                    record: record,
                    closeAction: 'destroy',
                    border: false,
                    layout: 'fit',
                    modal: true,
                    items: [myimg],
                    listeners:{
                        close: function(panel, eOpts){
                            grid.getStore().load();
                        }
                    }
                }).show();
            }
        });


    },

    openParticiones : function (arrayParticiones,view) {
        var controller = this;
        
        
        var list = new Array();
        Ext.Array.each(arrayParticiones, function(record){
            list.push(record.get('cue_iid'));
        });
        var listString = list.join(",");                     
        
        view.mystore =Ext.create('Ext.data.Store',{
            model: controller.getZonasSearchModelModel(),
            remoteFilter: true,
            pageSize: 500,
            remoteSort: false,                 
            filters: [
                {
                    property: 'zon_ccodigo:LIKENOT',
                    value: 'PAR'
                },{
                    property: 'zon_ccodigo:NOT',
                    value: '0'
                },{
                    property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                    value: ''
                },{
                    property: 'zon_iidcuenta:ININT',
                    value:listString
                }
            ]
        });
        
        view.bindStore(view.mystore);
        //view.down('pagingtoolbar').bindStore(mystore);
        
        view.mystore.load({callback:function () {
            view.mystore.sort('_codigo');
        }});
       /*  var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(view.mystore);*/
        
    },
    onOpenCuenta: function(record,view){        
        var id = record.get('cue_iid');
        
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
        
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('cuentaview', {
                tabConfig: {translate: false},
        		title : title,
                objectId: id,
                translate: false,
                closable: true,
                closeAction: 'destroy'
    		});
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },
    
     onActualizarClick: function (button,event,options) {
         var view = button.up('multicuentazonasgridview');
      
         
         view.mystore.sorters.clear();
         
         view.mystore.reload({callback: function () {    	 
		    view.mystore.sort('_codigo');
		 }});
         
     },
    onSaveClick: function (button,event,options) {
        var view = button.up('multicuentazonasgridview');
        var store = view.store;
        var t = this;
        var valido = true;
        
        var model = this.getSoftguardZonaModelModel();
        var proxy = model.getProxy();            
        
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
            var oldproxy = store.getProxy();
            store.setProxy(proxy);
            /*store.setConfig({
				proxy: store.getProxy()
			});*/

            store.sync({callback: function(){

                /*store.setConfig({
                    proxy: store.getProxy()
                });*/
  

                store.sorters.clear();
                store.load({callback:function () {
                    store.sort('_codigo');
                }});
                notify('Los cambios se guardaron con éxito');
            }});   
            store.setProxy(oldproxy);            
        }
    },
    
    
    trim: function(str){
        return str.replace(/^\s+|\s+$/g, '');
        
    },
    
    onParticionEdit : function(record,view){
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getZonaByCuentaSearchModelModel(),
            remoteFilter: true,
            listeners: {
                beforeload: function(store, operation){
                    operation.params = {cuentaId:view.record.get('Id')};
                }
            },
            filters: [{
                property: 'zon_ccodigo:like',
                value: 'PAR'
                }
            ]
        });
        
        store.load({callback:function (records) {
            var title  = 'Particion';
            var newView = Ext.widget('multicuentazonacuentaformview',{
                record: record,
                store: store,
                caller: view,
                particiones : view.particiones
            });
           
            // Lo agregamos al panel
            var myWindow = Ext.widget('window',{
                title: title,
                height: 200,
                width: 400,
                modal: true, 
                items: newView,
                caller: view,
                closable: false,
                layout: 'fit'
            }).show();
        
        }})
        
        
        
    },
    
    onObjectEdit : function(record,view){
        this.onItemDblClick(view,record);
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        this.openFormWindow(record.get('zon_cdescripcion'),record,view);
    },
    
    openFormWindow: function(title,record,grid){
        var view = grid.up('#gridzone')?grid.up('#gridzone'):grid;
        
        var cod = record.get('zon_ccodigo').substr(0,3).toUpperCase();
        
        if ( cod !='PAR'){
            
            var model = this.getSoftguardZonaModelModel();

            record.setConfig({
				proxy: model.getProxy()
			});
            
            var newView = Ext.widget('zonaformview',{
                record: record,
                caller: grid,
                profile: view.profile
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
            }/*else{
                notifyError('No posee derechos para esta operación');
            }*/
        }
    },
    
    onObjectChange: function(record,view){
       var paging = view.down('pagingtoolbar');
        paging.doRefresh();
    }
});