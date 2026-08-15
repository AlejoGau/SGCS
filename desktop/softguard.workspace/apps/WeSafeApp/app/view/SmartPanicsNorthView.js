Ext.define('WeSafe.view.SmartPanicsNorthView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.smartpanicnorthview'],
    title : '',
   
	initComponent : function() {
		this.callParent();
        var view = this;
        var url= getParametro('DESKTOPEXTERNALURL');
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
                items: [            
                    {
                        iconCls: 'icon-cog',
                        text: 'Configurar servicio',
                        scope: this,
                        itemId: 'btnconfig',
                        action: 'configurar',
                        hidden:true,
                        listeners: {
                            click: function () {
                                console.log("Configurar Servicio!")
                                var tabpanel = view.up('viewport').down('tabpanel')
                                var title = 'Configuración del servicio';
                                var mytab = tabpanel.down('[title="' + title + '"]');
                                
                                if (!mytab) {
                                    var config = Ext.widget('smartpanicconfigview', {
                                        title : 'Datos',
                                        closable: false,
                                        closeAction: 'destroy'
                                	});
                                    
                                    var filemanager = Ext.create('Ext.ux.IFrame', {
                                		title : 'Interfaz gráfica',
                            			border : false,
                            			src : '/a/filemanager?searchName=SmartPanicsUI',
                            			closable : false,
                                        autoDestroy: true
                            		});
                                   
                                    var qr = Ext.create('Ext.ux.IFrame', {
                                    	title : 'Qr Conexión',
                            			border : false,
                            			src : '/handler/QrCodeHandler?Language='+_UserData.metadata.language+'&showLink=true&title='+title+'&code=/'+url+'/',
                            			closable : false,
                                        autoDestroy: true
                            		});
                                    var configuracion = Ext.widget('ConfuguraLandingView', {
                                        title : 'Configuracion',
                                        closable: false,
                                        closeAction: 'destroy'
                                	});                                                                        
                                    var newTab = Ext.widget('tabpanel', {
                                    	title : title,
                                        closable: true,
                                        closeAction: 'destroy',
                                        items:[
                                            config,
                                            filemanager,
                                            qr,
                                            configuracion
                                        ]
                            		});
                                    
                                    tabpanel.add(newTab);
                                    tabpanel.setActiveTab(newTab);
                        		}
                        		// el existe, lo activo
                        		else {
                                    mytab.show();
                        		}
                            }
                        }
                    },"->",{
                        xtype: 'displayfield',
                        value: '',
                        align: 'right',
                        scope: this,
                        itemId: 'toolbardisplayfield',
                        width: 250,
                        margin: '0 10 0 10' // dedalo saco -10 porque se ve mal
                    }
                ],// cierro items
                
             }); 
            view.addDocked(toolbar);
	} // cierro init
});