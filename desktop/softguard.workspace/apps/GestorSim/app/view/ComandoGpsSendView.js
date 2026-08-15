Ext.define('GestorSim.view.ComandoGpsSendView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.comandogpssendview',
    layout: 'anchor',
    autoScroll: true,

    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        margin: 5,
        anchor : '100%',
        width: '100%'
    },
    
    items : [

                {
                    xtype : 'displayfield',
                    fieldLabel : 'Cuenta',
                    itemId:'cuentanombre',
                    anchor: '100%'
                },
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Equipo',
                    itemId:'equipo',
                    anchor: '100%'
                },
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Comando',
                    itemId:'comando',
                    anchor: '100%'
                },
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Valores',
                    name : 'cmd_cValores',
                    anchor: '100%'
                },
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Comando',
                    itemId:'comando',
                    anchor: '100%'
                },
                {
                    xtype : 'displayfield',
                    fieldLabel : 'Valores',
                    name : 'cmd_cValores',
                    anchor: '100%'
                },                
        {
            xtype: 'form',
            title: 'Parámetros',
            hidden: true,
            itemId: 'parametros',
            items:[]
        }
    ],

    initComponent: function(){
        this.callParent();


        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items : [{
                text : 'Enviar',
				iconCls : 'icon-ipod-cast',
				action : 'send'
			}]
        }); 
        this.addDocked(toolbar);
    }
});