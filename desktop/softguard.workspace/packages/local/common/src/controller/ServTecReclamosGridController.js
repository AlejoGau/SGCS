//MIGRADO2024
Ext.define('Common.controller.ServTecReclamosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ServTecSearchModel', 'ServTecHistoricoSearchModel', 'ServTecHistoricoModel' ],
    views : [ 'ServTecReclamosGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'servtecreclamosgridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
               
    		},
            'servtecreclamosgridview button[action=add]': {
                click: this.onAddClick
            },
            'servtecreclamosgridview #send': {
                click: this.onMailClick
            },
            'servtecreclamosgridview #imprimir': {
                click: this.onImprimirClick
            }
     
            
            
		});
	},
    
    
    onItemClick: function (view,record) {
        var controller = this;
        var view = view.up('servtecreclamosgridview')
    
        var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : getLocale('Observacion')+': '+Ext.Date.format(record.get('stl_tFechaHora'),'d/m/Y H:i:s'),
            	width : 390,
    			height : 450,
    			border : false,
    			items : [
                        {
                            xtype:'container',
                            html:record.get('stl_cObservacion')
                        }
                    ]
        }).show()
    },
    
    onImprimirClick: function (button) {
        var view = button.up('servtecreclamosgridview');
        var iframe = view.down('#Iframe');
        //var mailbody = document.getElementById('iframe-'+iframe.getEl().id).contentWindow.document.documentElement.innerHTML;
        var filter = Ext.encode([{'property':'stl_iServicio','value':view.record.get('Id')},{'property':'stl_cAccion','value':'Reclamo'}]);
        
        var url = '/handler/ReporteReclamosServTecHTML'
        url = Ext.String.urlAppend(url, 'filter='+encodeURI(filter));   
        url = Ext.String.urlAppend(url, 'IdCuenta='+view.record.get('cue_iid'));  
        
        var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : getLocale('Imprimir'),
        		width : 390,
    			height : 450,
    			border : false,
    			items : [
                         {
                            xtype: 'uxiframe',
                            itemId: 'Iframe',
                            height: 0,
                            border : false,
                            width:'100%',
                            src: url
                        }
                    ],
                tbar: [  
                	{
                        text:'Imprimir',
                        iconCls : 'icon-printer',
                        handler: function(button){
                            var iframe = button.up('window').down('#Iframe');
                            //var ele = iframe.getEl();
                            
                            //document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                            url = iframe.src;
                            fetch(url)
                            .then(function (response) {
                                return response.text();
                            }).then(function (body) { 
                                printHTMLContent(body);
                            });
                            
                        }
                    }
            	],
                caller: view
    		});
    		win.show();
       
        
       
        
       
        
        
        
    },
    
    onMailClick: function (button) {
        var view = button.up('servtecreclamosgridview');
        var iframe = view.down('#Iframe');
        //var mailbody = document.getElementById('iframe-'+iframe.getEl().id).contentWindow.document.documentElement.innerHTML;
        
        
        
        var store = Ext.create('Ext.data.Store', {
            model : this.getServTecSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            remoteGroup: false,
            autoload: false,
            pageSize: 1,
            filters: [{
                property:'stc_iid',
                value:view.record.get('Id')
            }],
            sorters: [{
                property: 'stc_dfecha_modificacion',
                direction: 'ASC'
            }]
        });
        
        
        store.load({callback:function (records) {
            if(records.length>0) {
                
                Ext.Ajax.request({
                    url : '/handler/ReporteReclamosServTecHTML',
                    method: 'GET',
                    params:{
                        filter:Ext.encode([{"property":"stl_iServicio","value":view.record.get('Id')},{"property":"stl_cAccion","value":"Reclamo"}]),
                        IdCuenta:view.record.get('cue_iid'),
                        idServtec:view.record.get('Id')
                    },
                    success: function(response, action){
        					
                            
                             var from = getParametro('MAILSENDERNAME') + " <" +  getParametro('MAILSENDER') +">";
                            var mail = Ext.widget('mailformview',{
                                mailbody: response.responseText,
                                from: from,
                                to: records[0].get('lin_cmail'),
                                autoScroll: true,
                                subject: getLocale('Envio de reclamos'),
                                cue_iid: view.record.get('cue_iid')
                            });
                            
                            var win = Ext.widget('window',{
                                title: 'Envío de correo',
                                layout: 'fit',
                                items: mail,
                                width: 600,
                                height: 600
                            }).show();
            		}    		
            	});
                
            }
        }});
       
        
        
        
       
        
        
        
    },
	initView : function(view) {
         Ext.Ajax.request({
            url : '/rest/security/UserData',    	
    		success: function(response, action){
					var infoUser = Ext.JSON.decode(response.responseText);
                    view.userdata = infoUser;	
    		}    		
    	});
       
        view.filters = [
                    {
                        property:'stl_iServicio',
                        value: view.record.get('Id')
                    },{
                        property:'stl_cAccion',
                        value: 'Reclamo'
                    }
            ]
        view.store =Ext.create('Ext.data.Store',{
            model: this.getServTecHistoricoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
	},
    
 
    
    onAddClick: function(button, event, options) {  
        
        var view = button.up('servtecreclamosgridview');         
        var controller = this;      
        var record = controller.getServTecHistoricoModelModel().create({
                Id:0,
                stl_iServicio : view.record.get('Id'),
                stl_tFechaHora : new Date(),
                stl_cAccion : 'Reclamo',
                stl_iUsuarioDSS: _UserData.udw_idKey
            });
        var myWindow = Ext.widget('window',{
                    title: 'Nuevo reclamo',
                    height: 300,
                    translate: false,
                    width: 600,
                    modal: true, 
                    closable: true,
                    layout: 'fit',
                    items: [
                            /*{
                                xtype: 'sertecreclamoview',
                                record: record
                            }*/
                            {
                                xtype:'textarea',
                                itemId:'msg'
                            }
                        ],
                    bbar: [
                            
                            {
                                xtype:'button',
                                text: 'Guardar',
                                iconCls: 'icon-disk',
                                handler: function () {
                                    console.log(arguments)
                                    
                                    if(myWindow.down('#msg').getValue() != '') {
                                        controller.getServTecHistoricoModelModel().create({
                                              Id:0,
                                              stl_iServicio : view.record.get('Id'),
                                              stl_tFechaHora : new Date(),
                                              stl_cAccion : 'Reclamo',
                                              stl_cObservacion :"["+view.userdata.UserId+"] "+myWindow.down('#msg').getValue(),
                                              stl_iUsuarioDSS: _UserData.udw_idKey
                                        }).save({callback:function () {
                                            view.down('pagingtoolbar').doRefresh();
                                            myWindow.hide();
                                        }});
                                        
                                    }
                                    
                                }
                            }
                        ]
                    
                    
                }).show();
     
        
       
    }
 
});