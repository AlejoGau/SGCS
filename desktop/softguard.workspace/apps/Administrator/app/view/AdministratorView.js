Ext.define('Administrator.view.AdministratorView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.administratorview',    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },   
    items: [
        {
            xtype: 'administratorformview'
            
        },
        {
            xtype: 'tabpanel', 
            flex: 1,
            items: [
                {
                    xtype:'administratormodulesview'
                },
                {
                    xtype:'rangedetail',
                    disabled:true,
                    itemId:'rangegrid'
                    
                }
            ]
        }
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        this.down('administratorformview').record = this.record;
        this.down('administratorformview').caller = this;
        this.down('administratorformview').perfiles = this.perfiles;
        this.down('administratormodulesview').record = this.record;
        this.down('rangedetail').record = this.record;
        if(this.perfiles == 1) {
            this.down('rangedetail').tab.hide()
            this.down('#enviardatos').hide()
            this.down('#cerrarsesion').hide()
            this.down('#nombre').hide()
            this.down('#apellido').hide()
            this.down('#perfil').hide()
            
            
            //cambio el vtype del email para que me deje poner un nombre comun
            Ext.apply(this.down('#emailuser'), {vtype: null});
            
            this.down('administratorformview').setHeight(140)
        }
        
    }
});