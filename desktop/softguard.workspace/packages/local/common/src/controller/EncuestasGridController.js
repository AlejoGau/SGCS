Ext.define('Common.controller.EncuestasGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_encuestasModel', 'p_encuestasSearchModel' ],
    views : [ 'EncuestasGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'encuestasview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                refresh: this.refresh,
                deleteitem: this.onDelete
               
			},
            'encuestasview button[action=search]': {
                click: this.onSearchClick
            },
            'encuestasview button[action=getall]': {
                click: this.onGetAllClick
            },
            'encuestasview button[action=add]': {
                click: this.onAdd
            },
            'encuestasview #enviarencuesta': {
                click: this.onEnviarEncuestaClick
            }
            
            
		});
	},
    
    onEnviarEncuestaClick: function (btn) {
         
         
         /**
          * BC 385211321 : Se procede a quitar el selector actual de Dispositivos y se procede a la apertura de la TAB de SP
          * A la misma se procede a agregarle el boton de envío de encuestas a los seleccionados o  a la lista total.
          * 
         var view = btn.up('encuestasview');
         var view = Ext.widget('encuestasenvioformview',{
                caller: view
         });
            
            
         var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : 'Enviar encuesta',
            	width : 700,
    			height : 300,
    			border : false,
    			items : view
    		});
    		win.show();
            */
            
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
		else {
            mytab.show();
		}
         
    },

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getP_encuestasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        
        /**
         * BC 385211321 : Se bloquea o visualiza el boton de enviar encuesta en base al permiso de la configuracion Global de SmartPanics
         */
        var _ObjectId = 30;
        var _ObjectTypeName = 'UiApplication';
        var _restPath = (myQueryString.restPath != undefined) ? myQueryString.restPath : 'Rest';
        var url = '/'+_restPath+'/' +_ObjectTypeName+'/'+ _ObjectId + '/Metadata';
        var btnEncuesta = view.down('#enviarencuesta');
        
        Ext.Ajax.request({
            url: url,
            scope: this,
            success: function(resp,operation) {
                view.metadataGlobal = Ext.decode(resp.responseText);
                view.metadataGlobal.Config = Ext.decode(view.metadataGlobal.Config);

                if(view.metadataGlobal.Config.btnEncuesta>0){
                    btnEncuesta.enable();
                }else{
                    btnEncuesta.disable(true);              
                }
                
            }
        });
        
	},
    
    refresh: function (view) {    
        view.getStore().load()
    },
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('encuestasview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo';
        
        
         record = this.getP_encuestasModelModel();
         
            
        	var myobject = record.create({
                Id:0,
                Name: 'Name',
                enc_status:0
			});            
	
                    
                    
             var view = Ext.widget('encuestasformview',{
                caller: view,
                record: myobject,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 700,
    			height : 400,
    			border : false,
    			items : view
    		});
    		win.show();
      
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('encuestasview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('enc_name');
        
        this.getP_encuestasModelModel().load(record.get('Id'), {callback:function(record) {    
            
            var newTab = Ext.widget('encuestaview',{
    			record: record,
				tabConfig: {translate: false},
				translate: false,
				targetTab: panel,
				title: title,
				closable: true,
				closeAction: 'destroy',
				autoDestroy: true,
				caller: view,
				// Parche porque el autodestroy no quiere
			});
			panel.add(newTab);
            panel.setActiveTab(newTab);
            
            /**
             * 07/03/2019 : JUAN - Se modifica Window a nueva solapa
             * 
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
                translate: false,
                width : 700,
    			height : 400,
    			border : false,
    			items : {
                    xtype : 'encuestaview',
                    record: record,
                    caller: view,
                    header : false
    			}
                
    		});
    		win.show();
             */
            
        }})
                
        /* Original, se cambia a moduletree
        this.getP_encuestasModelModel().load(record.get('Id'), {callback:function(record) {
            var viewWin = Ext.widget('encuestasformview', {
                caller: view,
                record: record,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
                translate: false,
            	width : 700,
    			height : 400,
    			border : false,
    			items : viewWin
    		});
    		win.show();
            
        }})
        */
    
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('encuestasview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('encuestasview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        var filters = Ext.clone(view.filters);
        
        
        if ( fieldName && fieldName != '' && query != '' &&  query.trim() != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onDelete : function(rec,view) {
        var model = this.getP_encuestasModelModel();
        model.load(rec.get('Id'),{
            callback: function(record,operation,success){
                record.erase({
                    success: function(record,operation){
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
            }
        });
        		
	}

});
