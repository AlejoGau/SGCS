//MIGRADO2024
Ext.define('Common.controller.ServTecObservacionesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ServTecSearchModel', 'ServTecHistoricoSearchModel', 'ServTecHistoricoModel' ],
    views : [ 'ServTecObservacionesGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'servtecobservacionesgridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
               
			},
            'servtecobservacionesgridview button[action=add]': {
                click: this.onAddClick
            },
            'servtecobservacionesgridview #send': {
                click: this.onMailClick
            },
            'servtecobservacionesgridview #imprimir': {
                click: this.onImprimirClick
            }
            
            
		});
	},
    
    
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('servtecobservacionesgridview')
        var win = Ext.widget('window',{
            width: 600,
            height: 500,
            layout: 'fit',            
            translate:false,
            title : getLocale('Observacion'),
            closable: true,
            items: [
                    {
                        xtype:'displayfield',
                        value:record.get('stl_cObservacion')
                    }
                ]
        }).show();
        
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
                        value: 'Observacion'
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
        
        var view = button.up('servtecobservacionesgridview');         
        var controller = this;      
        var myWindow = Ext.widget('window',{
                    title: 'Nueva observacion',
                    height: 300,
                    translate: false,
                    width: 600,
                    modal: true, 
                    closable: true,
                    layout: 'fit',
                    items: [
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
                                              Id : 0,
                                              stl_iServicio : view.record.get('Id'),
                                              stl_tFechaHora : new Date(),
                                              stl_cAccion : 'Observacion',
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
    },
    
    onMailClick: function (button) {
        var view = button.up('servtecobservacionesgridview');
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
                    url : '/handler/ReporteObservacionesSerTecHTML',
                    method: 'GET',
                    params:{
                        filter:Ext.encode([{"property":"stl_iServicio","value":view.record.get('Id')},{"property":"stl_cAccion","value":"Observacion"}]),
                        IdCuenta:view.record.get('cue_iid'),
                        idServtec:view.record.get('Id')
                    },
                    success: function(response, action) {            				
                            var from = getParametro('MAILSENDERNAME') + " <" +  getParametro('MAILSENDER') +">";
                            var mail = Ext.widget('mailformview',{
                                mailbody: response.responseText,
                                from: from,
                                to: records[0].get('lin_cmail'),
                                autoScroll: true,
                                subject: getLocale('Envio de Observaciones'),
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
    
    onImprimirClick: function (button) {
        var view = button.up('servtecobservacionesgridview');
        var iframe = view.down('#Iframe');
        //var mailbody = document.getElementById('iframe-'+iframe.getEl().id).contentWindow.document.documentElement.innerHTML;
        var filter = Ext.encode([{'property':'stl_iServicio','value':view.record.get('Id')},{'property':'stl_cAccion','value':'OBSERVACION'}]);
        
        var url = '/handler/ReporteObservacionesSerTecHTML'
        url = Ext.String.urlAppend(url, 'filter='+encodeURI(filter));   
        url = Ext.String.urlAppend(url, 'IdCuenta='+view.record.get('cue_iid'));  
        
        var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : getLocale('Imprimir'),
            	width : '60%',
        		height : '60%',
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
                            var ele = iframe.getEl();
                            
                            document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                            
                        }
                    }
            	],
                caller: view
    		});
    		win.show();
    }
 
});