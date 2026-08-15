Ext.define('SgAppWebReport.view.ReporteOPGSPView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.reporteopgspview',
    preventHeader: true,
    frame : true,
    autoScroll: true,
	items : [{ 
        xtype:'container',                                                    
        padding:'0 0 0 0',
        border: 0,
        layout: 'hbox',
        margin:'0 0 5 0',
        items:[{
            xtype : 'textfield',
            fieldLabel : 'Dealer desde',
            itemId: 'dealer',
            enforceMaxLength: true,
            maxLength: 3,
            //labelWidth: 110,
            width: 300,
            name:'dealer'
        },{
            xtype : 'textfield',
            itemId: 'cuentadesde',
            fieldLabel : 'Cuenta desde',
            enforceMaxLength: true,
            maxLength: 4,
            width: 300,
            margin: '0 0 0 9',
            name: 'cuentadesde'
        }]
    },{
        xtype:'container',                                                    
        padding:'0 0 0 0',
        border: 0,
        layout: 'hbox',
        margin:'0 0 5 0',
        items:[{
            xtype : 'textfield',
            fieldLabel : 'Dealer hasta',
            itemId: 'dealerhasta',
            enforceMaxLength: true,
            maxLength: 3,
            width: 300,
            name:'dealerhasta'
        },{
            xtype : 'textfield',
            itemId: 'cuentahasta',
            fieldLabel : 'Cuenta hasta', 
            enforceMaxLength: true,
            maxLength: 4,
            margin:'0 0 0 9',
            width: 300,
            name:'cuentahasta'
        }]
    }],
    activeHelp:true,
	initComponent : function() {
		this.callParent(arguments);
        //('cuentachanged');

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [{
                xtype: 'button',
                text: 'Descargar',
                itemId: 'btnExportar',
                action: 'export',
                iconCls: 'icon-page'
            }]
        })
        this.addDocked(toolbar);



	} // cierro init

});
