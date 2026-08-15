Ext.define('Administrator.view.MapGuardWebConfigView', {
    extend : 'Ext.form.Panel',
    title: 'Configuracion',
    alias : 'widget.SgAppMapGuardWebConfig',  
    layout:'hbox',
    items: [
        {
            xtype:'container',
            layout:'vbox',
            flex:1,
            items: [{
                    xtype: "checkbox",
                    fieldLabel: "Móviles",
                    itemId: "moviles"
                },{
                    xtype: "checkbox",
                    fieldLabel: "TrackGuard",
                    itemId: "trackguard"
                },{
                    xtype: "checkbox",
                    fieldLabel: "SmartPanics",
                    itemId: "smartpanics"
                },{
                    xtype: "checkbox",
                    fieldLabel: "VigiControl",
                    itemId: "vigicontrol"
                },{
                    xtype: "checkbox",
                    fieldLabel: "Servicio técnico",
                    itemId: "serviciotecnico"
                }
                ]
        },{
            xtype:'container',
            layout:'vbox',
            flex:1,
            items: [
                {
                    xtype: "checkbox",
                    fieldLabel: "Cuentas fijas",
                    itemId: "cuentasfijas"
                },{
                    xtype: "checkbox",
                    fieldLabel: "Camaras cuenta",
                    itemId: "camarascuenta"
                },{
                    xtype: "checkbox",
                    fieldLabel: "Camaras zona",
                    itemId: "camaraszona"
                },{
                    xtype: "checkbox",
                    fieldLabel: "Eventos",
                    itemId: "eventos"
                }
                ]
        }
        
       
    ],

    
    initComponent : function() {
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveConfig'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
         
       
    } // cierro init

});
