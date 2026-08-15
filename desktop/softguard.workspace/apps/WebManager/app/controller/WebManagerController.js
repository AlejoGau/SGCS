/* Defino la funcion del Controller */
function helpWebmanger(t, alias, Language) {
    Ext.Ajax.request({
        url: '/Rest/search/s_online_help',
        params:{filter:Ext.encode([{
            property:'Name',
            value: alias
        },{
            property:'Language',
            value: Language
        }])},
        method: 'GET',
        scope: t,
        success: function(response){
            if (response) {
                var help = Ext.JSON.decode(response.responseText);                        
                if(help.total>0) {
                    if(Ext.util.Format.trim(help.rows[0].Translation)) {                                                
                        var myWindow = Ext.widget('window',{
                            title: getLocale('Ayuda')+': '+help.rows[0].UiApplication,
                            translate: false,
                            iconCls:'icon-help',
                            height: '60%',
                            width: '60%',
                            modal: true,                                                    
                            layout: 'fit',
                            autoScroll: false,
                            cls: 'helpwin',                                                    
                            items:[{
                                xtype: 'component',
                                html:''+help.rows[0].Translation+'',
                                autoScroll:true,
                                padding:'10 10 10 10'
                            }]
                        }).show()
                    } else {
                        notify('Aun no se encuentra disponible la ayuda.')
                    }
                
                } else {
                    
                    var title = 'Titulo no definido';
                    
                    if(t.title) {
                        //saco pies
                        title = t.title.split('|').join('')
                    }
                    
                    Ext.Ajax.request({
                        url: '/Rest/Search/LocalizationLanguageList',
                        method: 'GET',
                        scope: t,
                        success: function(response){
                            if (response) {                   
                                var languages = Ext.JSON.decode(response.responseText);
            
                                Ext.Array.each(languages.rows, function (lang) {
                                    //creo el help en base
                                    Ext.Ajax.request({
                                        url: '/Rest/s_online_help',
                                        method: 'POST',
                                        scope: this,
                                        jsonData: {
                                            Created:new Date(),
                                            Id:0,
                                            Language:lang.Language,
                                            Modified:new Date(),
                                            Name:alias,
                                            ObjectTypeId:17,
                                            ObjectTypeName:"Localization",
                                            Status:'',
                                            Translation:'',
                                            UiApplication:title,
                                            UserId:0,
                                            UserName:''
                                        },
                                        success: function(response){
                                            if (response) {
                                                notify("Se creo ayuda ("+lang.Language+"). debe editarlo en el panel.")
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    })
                }
            }   
        }
    }) 
};

/* funcion para el creado de colores aleatorios */
function coloresvarios() {
    var colorAA = [
            '#581845',
            '#900C3F',
            '#C70039',
            '#FF5733',
            '#FFC30F',
            '#588C73',
            '#F2E394',
            '#F2AE72',
            '#D96459',
            '#008BBA',
            '#D0C91F',
            '#5E412F',
            '#F07818',
            '#F0A830',
            '#B1EB00',
            '#FF85CB',
            '#354458',
            '#E9E0D6',
            '#92B06A',
            '#8C6954',
            '#BFAF80' 
    ];
    colorAA.sort(function() { return 0.5 - Math.random() });
    return colorAA;
};

Ext.define('WebManager.controller.WebManagerController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'UsersDesktopWebModulosModelSearch' ],
    views : [ 'WebManagerMainView', 'ExtUxNotification' ],

    init : function(config) {
    	this.control({
			'webmanagermainview' : {
				afterrender : this.initview, 
			}
        });
	},
    
	initview : function(view) {
        if(_UserData)
        {
            var controller = this;
            
            this.application._nameModule  = 'WebManager';
            // Lo agregamos al panel
            var myPanel = Ext.getCmp('center');
            
            var webmanagerestadodemicentralview = Ext.widget('webmanagerestadodemicentralview',{
                title: getLocale('Estado de mi Central'),
                closable: false
            });	
            
            var webmanagerevoluciondemicentralview = Ext.widget('webmanagerevoluciondemicentralview',{
                title: getLocale('Evolucion de Mi Central'),
                closable: false
            });
            
            var webmanagerrecepciondeeventosview = Ext.widget('webmanagerrecepciondeeventosview',{
                title: getLocale('Recepcion de Eventos'),
                closable: false
            });
            
            var webmanagerinformaciondecuentasview = Ext.widget('webmanagerinformaciondecuentasview',{
                title: getLocale('Informacion de Cuentas'),
                closable: false
            });
            
            // Consulta de RANGOS del usuario logueado
            var userLogueadoRangosStore = Ext.create('Ext.data.Store',{
                model: controller.getModel(),
                pageSize: 500,
                remoteFilter: true,
                filters: [{
                    property: 'dwm_idModules',
                    value: 0
                },{
                    property: 'dwm_idWeb',
                    value: _UserData.udw_idKey,//controller.application.UserData.udw_idKey
                }]
            }).load({callback:function (recordsLogueado) {
                
                if(recordsLogueado.length>0) {
                    myPanel.add(webmanagerestadodemicentralview);
                    myPanel.add(webmanagerrecepciondeeventosview);
                    myPanel.add(webmanagerinformaciondecuentasview);
                }
                else {
                
                    myPanel.add(webmanagerestadodemicentralview);
                    myPanel.add(webmanagerevoluciondemicentralview);
                    myPanel.add(webmanagerrecepciondeeventosview);
                    myPanel.add(webmanagerinformaciondecuentasview);
                };
            }})
        }
	}
    
});