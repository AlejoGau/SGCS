Ext.define('Common.view.WebRemotoNorthView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.webremotonorthview',
    mute: false,
    layout : {
        type : 'hbox',
        align: 'stretch'
    },
	/*items : [
        Ext.create('Ext.ux.IFrame', {
            itemId: 'sound',
            height: 0,
            border : false
        })
    ],*/
    
    initComponent: function(){
        this.callParent();
        /*
        Ext.Ajax.request({
              url: '/rest/tablas/parametros/',
              params: { par_ccodigo: 'DSSSONIDO'},
              method: 'GET',
              scope: this,
              success: function(response){
                this.DSSSONIDO = Ext.JSON.decode(response.responseText)[0].par_ivalor;
              }
        });
        */
        this.DSSSONIDO = getParametro('DSSSONIDO');

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-bell',
                    text: 'Eventos con voz',
                    enableToggle: true,
                    action: 'play',
                    itemId:'play',
                    pressed: true
                },{
                    xtype:'displayfield',
                    itemId:'loading'
                },{
                    iconCls: 'icon-linkurl',
                    itemId:'linkbtn',
                    text: 'Link',
                    hidden: true,
                    menu: {
                        xtype: 'menu',
                        width: 650,
                        items: [
                            {
                                xtype:'linkurlgridview',
                                onlyRead: true
                            }
                        ]
                    }
                }
                , "->", {
                    iconCls: 'icon-baliza-alarma',
                    text: getLocale( 'Modo Emergencia' ),
                    action: 'modoEmergencia',
                    itemId: 'modoEmergencia',
                    disabled: false
                }, {

                    
                    iconCls:'icon-sound-add',
                    text: 'Grabar llamada entrante',
                    itemId:'grabarllamada',
                    disabled:true                    
                },                
                {
                    iconCls: 'icon-find',
                    text: 'Buscar cuenta',
                    action: 'buscarcuenta',
                    itemId:'buscarcuenta',
                    disabled:true
                },
                {
                    iconCls: 'icon-email-go',
                    text: 'Enviar sms masivo',
                    action: 'send',
                    itemId:'send',
                    disabled:true
                },"|",
                { xtype: 'button', text: 'Cambio operador', itemId: 'cambiooperador', action: 'cambiooperador', iconCls: 'icon-user-go' },
                
                { 
                    xtype: 'button', 
                    text: 'Salir sin tomar evento', 
                    itemId: 'logoutatencionautomatica', 
                    action: 'logoutatencionautomatica', 
                    iconCls: 'icon-door-out',                    
                    enableToggle: true,
                    hidden:true
                },
                
                {
                    iconCls: 'icon-bell',
                    text: 'Generar evento manual',                    
                    action: 'newevent',
                    itemId: 'newevent',
                    disabled:true
                }
            ]
         }); 
        this.addDocked(toolbar);
    }
});