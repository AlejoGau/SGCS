//MIGRADO2024
Ext.define('Common.controller.ServTecProductHelper', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ProductSearchModel' ],
    views : [  ],
    init : function(config) {
        // genero los eventos
		this.control({
			'servtechelperview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemDblClick
			},
            'servtechelperview button[action=search]' : {
                click: this.onSearchClick
            },
           /* 'servtechelperview button[action=todos]' : {
                click: this.onTodosClick
            }*/
          
            
		});
	}, // cierro init
    
    
    
	initView : function(view) {
        var record = view.record;
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getProductSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
	},
    
 
    
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('multicuentaserviciotecnicogridview');
        
        var store = view.getStore();
        
        this.activarFiltroEstados(view);
            
        
        this.habilitarOrdenesYReporte(view.filters, view);
      
        
        store.filter(view.filters);
       
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
                
                
                 var view = view.up('multicuentaserviciotecnicogridview');
               
                 var cabecera = this.getM_st_cabeceraModelModel().load(record.get('Id'), {callback:function (recordx,operation,success) {
                     
                        if(recordx.get('stc_nestado') != 3 && recordx.get('stc_nestado') != 4) {
                         
                          /*  var win = Ext.create('Ext.Window', {
                                layout: 'fit',
                                title : 'Editar servicio técnico',
                                closeAction : 'destroy',
                            	width : 750,
                        		height : 450,
                        		border : true,
                                modal: true,
                                view : view,
                        		items : [
                                    {
                                        xtype: 'sertepanelcview',                    
                                        caller: view,
                                        operador : view.operador,
                                        record : recordx
                                        
                                    }
                                ]
                        	});
                        	win.show();*/
                            var tabpanel = view.up('tabpanel');
                            var title = getLocale('Servicio')+"("+recordx.get("stc_inumero")+")";
                            var mytab = tabpanel.down('[title="' + title+'"]');
	                        if (!mytab) {
                        
                                 var newTab = Ext.widget('sertepanelview', {
                                    iconCls: 'icon-group',
                                    title : title ,
                                    targetTab: view,
                        			closable : true,
                                    tipo: 'preventivo',
                                    operador : view.operador,
                                    record : recordx
                        		});
                                
                                
                                tabpanel.add(newTab);
                                tabpanel.setActiveTab(newTab);
	                        }
                            
                        } else {
                            
                             notifyError('Este servicio no puedo ser editado.')
                            
                        }
                
                
                }})
                    
                
       
    },
 
    
    
    
});