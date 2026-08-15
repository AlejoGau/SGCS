//MIGRADO2024
Ext.define('Common.view.MapguardNewMovilView', {
    extend : 'Ext.form.FormPanel',
    alias : 'widget.mapguardnewmovilview',
    autoScroll: true,
    forceClose: true,
    layout: {
        type: 'vbox',
        align: 'stretch',
        autoSize: true,
        shrinkToFit: false
    },
    
    items : [
        /*{
        	xtype : 'displayfield',
            itemId: 'dealer',
			name : '_cuenta'
	    },*/
        {
    		xtype : 'container',
			title : 'Dirección',
            itemId: 'direccion',
			layout : 'vbox',
			items : [
                
                {
                    xtype : 'displayfield',
                    itemId: '_cestado',
                    fieldLabel: 'Estado',
                    labelWidth: 35,
                    name : '_amv_estado'
                },                
                {
						xtype : 'displayfield',
						fieldLabel : 'Desde',
                        itemId: '_start',
                        labelWidth: 35
					},{
    					xtype : 'displayfield',
						fieldLabel : 'Hasta',
                        itemId: '_end',
                        labelWidth: 32
					}, {
						xtype : 'displayfield',
						fieldLabel : 'Tiempo',
						itemId : "_routeTime",
                        labelWidth: 42
					}
			]
		},
        {
            xtype: 'fieldset',
            margin: '0 0 5 0',
            title: 'Instrucciones',
            itemId: 'instrucciones'
        },
        
        
        {
    	    xtype:'vehiclehistorico',
            collapsible : true,
            collapsed: true
		},
        
        
        {
            xtype:'smsgridview',
            collapsible : true,
            collapsed: true,
            showMaximizer: true,
            title: 'Sms enviados'
		},
        {
            xtype:'smsrecibidosgridview',
            collapsible : true,
            collapsed: true,
            showMaximizer: true,
            title: 'Sms recibidos'
    	},
        
        
        {
            xtype:'smartmailprogramgridview',
            collapsible : true,
            collapsed: true,
            showMaximizer: true,
            title: 'Correo enviado'
		}
        
    ],
	// cierro items
    initComponent: function(){
        this.callParent();
        var historico = this.down('vehiclehistorico');
        historico.down('grid').hide();
        
        historico.record = this.record;
        
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            dock: 'top',
            autoShow: true,
           items: [
            
            {
                iconCls: 'icon-add',
                text: 'Asignar',
                itemId: 'asignar',
                action: 'asignar'
            },{
                iconCls: 'icon-delete',
                text: 'Liberar',
                itemId: 'liberar',
                action: 'liberar'
            },{
                iconCls: 'icon-email',
                text: 'Enviar Correo',
                itemId: 'email',
                action: 'email'
            },{
                iconCls: 'icon-sms',
                text: 'Enviar Sms',
                itemId: 'sms',
                action: 'sms'
            }]
         }); 
         this.addDocked(toolbar);
        
        this.down('smsgridview').record = this.record;
        this.down('smsrecibidosgridview').record = this.record;
        
        this.down('smartmailprogramgridview').record = this.record;
    },
    
    setRecord: function(record){
        this.record = record;
        var historico = this.down('vehiclehistorico');
        
        
        historico.record = this.record;
        historico.fireEvent('setrecord', record, historico);
        this.fireEvent('setrecord', this);
        
        
    }
});