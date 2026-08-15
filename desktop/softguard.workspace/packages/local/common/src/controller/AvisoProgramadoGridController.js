Ext.define('Common.controller.AvisoProgramadoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_aviso_programadoSearchModel', 'm_aviso_programadoModel' ],
    views : [ 'AvisoProgramadoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'avisoprogramadogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectdelete: this.onObjectDelete,
                refresh: this.onRefresh
               
			},
            
            'avisoprogramadogridview button[action="new"]' : {
                click: this.onNewClick
            },
            
            'avisoprogramadogridview button[action="template"]' : {
                click: this.onOpenTemplates
            }
           
            
            
		});
	},
    
    onOpenTemplates: function (btn) {
        
        var view = btn.up('avisoprogramadogridview');
        var panel = view.up('tabpanel');
        var title =  getLocale('Avisos templates');
        var mytab = panel.down('[title="' + title + '"]');
        
     
        
        if (!mytab) {
            var newTab = Ext.widget('contratotemplategridview', {
                iconCls: 'icon-page-white-code',
                title : title,
                targetTab: view,
                closable : true,
                translate:false,
                tipo:2
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },
    
    onRefresh: function (view) {
        view.storeAvisos.load();
    },

	initView : function(view) {
        
       var record = view.record;
        
        
       var controller = this;
       view.storeAvisos = Ext.create('Ext.data.Store', {
            model : this.getM_aviso_programadoSearchModelModel(),
            remoteFilter: true,
            filters: [{
                property:'prg_objecttypeid',
                value:view.idParent
            },{
                property:'prg_objectid',
                value:view.idRecord
            }],
            autoload: false
        });
        
        
        view.bindStore(view.storeAvisos);
        view.storeAvisos.load();

        
        
        
        
	},
   
   
    onNewClick: function(button, event, options) {        
        var panel = button.up('tabpanel'); 
        var view = button.up('avisoprogramadogridview');
        
        
        var record =  this.getM_aviso_programadoModelModel().create({
                //    prg_estado: 1,
                    prg_from: '',
                    prg_gateway: 'MAIL',
                    prg_objectid: view.idRecord,
                    prg_objecttypeid: view.idParent,
                    prg_prgdatetime: new Date()
                });

         var win = Ext.create('Ext.Window', {
                layout : 'fit',
                title : 'Aviso programado',
                closeAction : 'destroy',
                caller: view,
                modal: true,
        		width : 600,
    			height : 400,
    			border : false,
    			items : Ext.widget('avisoprogramadohelperview', {
                            record: record,
                            caller:view,
                            metadata: view.metadata,
                            idOrganizacion: view.idOrganizacion
                            
                		})
    		});
    		win.show();  
        
       
        
    },
    
    
    
    onItemClick: function(view,record,item,index,e,options){
        var id = record.get('Id');
          
        
        
         var win = Ext.create('Ext.Window', {
                layout : 'fit',
                title : 'Aviso programado',
                closeAction : 'destroy',
                caller: view,
                modal: true,
    			width : 600,
    			height : 400,
    			border : false,
    			items : Ext.widget('avisoprogramadohelperview', {
                            record: record,
                            caller:view.panel,
                            metadata: view.panel.metadata,
                            idOrganizacion: view.panel.idOrganizacion
                            ,
                            
                            
                		})
    		});
            if(record.get('prg_estado') == 1) {
                win.down('avisoprogramadohelperview').disableForm()
                win.down('avisoprogramadohelperview').down('toolbar').hide()
                
            }
    		win.show();  
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    
    onObjectDelete: function(record,view){

        record.setConfig({
            proxy: this.getM_aviso_programadoModelModel().getProxy()
        }); 

        record.destroy({callback:function() {
            notify('Se elimino con exito el aviso.')
            view.storeAvisos.load()
        }})
    }
   
    
 
   

});