//MIGRADO2024
Ext.define('Common.view.TGResumenPanelView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.tgresumenview'],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 120,
        anchor : '100%',
    	labelAlign: 'left'					
	},
	items : [
        {
            xtype: 'displayfield',
            itemId: 'cantidad',
            fieldLabel: 'Cantidad',                                    
            labelWidth: 100,
            flex: 1
        },{
            xtype: 'displayfield',
            itemId: 'minVel',
            fieldLabel: 'Vel. Mínima',                                    
            labelWidth: 100,
            flex: 1
        },{
            xtype: 'displayfield',
            itemId: 'maxVel',
            fieldLabel: 'Vel. Máxima',                                    
            labelWidth: 100,
            flex: 1
        },{
            xtype: 'displayfield',
            itemId: 'promVel',
            fieldLabel: 'Vel. Promedio',                                    
            labelWidth: 100,
            flex: 1
        },{
            xtype: 'displayfield',
            itemId: 'tDetenido',
            fieldLabel: 'Detenido',                                    
            labelWidth: 100,
            flex: 1
        },
    
        {
            xtype: 'displayfield',
            itemId: 'tMovimiento',
            fieldLabel: 'En Movimiento',                                    
            labelWidth: 100,
            flex: 1
        },{
            xtype: 'displayfield',
            itemId: 'distancia',
            fieldLabel: 'Distancia',                                    
            labelWidth: 100,
            flex: 1
        },{
            xtype: 'displayfield',
            itemId: 'primer',
            fieldLabel: 'Primer Evento',                                    
            labelWidth: 100,
            flex: 1
        },{
            xtype: 'displayfield',
            itemId: 'ultimo',
            fieldLabel: 'Último evento',                                    
            labelWidth: 100,
            flex: 1
        }
    ],
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    text: 'Guardar',
                    action: 'save',
                    iconCls: 'icon-disk'
		        },{
                    xtype: 'button',
                    text: 'Cancelar',
                    action: 'cancel',
                    handler: function(button){
                        var win = button.up('window');
                        win.close();
                    },
                    iconCls: 'icon-cancel'
		        },'->',{
                    xtype: 'button',
                    text: 'Iniciar',
                    itemId:'btnIniciar',
                    action: 'start',
                    iconCls: 'icon-map-go'
		        },{
                    xtype: 'button',
                    text: 'FInalizar',
                    itemId:'btnFinalizar',
                    action: 'end',
                    iconCls: 'icon-map'
		        }
            ]
         }); 
        if (this.showtoolbar){
            this.addDocked(toolbar);
        } 
	} // cierro init
});