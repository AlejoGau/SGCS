Ext.define('AdministratorSearch.view.t_serialConfiguracionPuertoView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_serialconfiguracionpuertoview'],
    preventHeader: true,
    frame: true,
    autoScroll: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
	},
	items : [
        {
            xtype : 'container',
            padding : 10,
            layout: {       
                type: 'hbox',
                //align: 'stretch',
                //anchor: '100%'
            },
            items : [{
                xtype : 'combo',
                fieldLabel : 'Baudios',
                name : 'pue_nbaudrate',
                itemId : 'pue_nbaudrate',
                store: [
                    [300,'300'],
                    [600,'600'],
                    [1200,'1200'],
                    [2400,'2400'],
                    [4800,'4800'],
                    [9600,'9600'],
                    [19200,'19200'],
                    [38400,'38400'],
                    [115200,'115200'],
                ],
                labelWidth : 100,
                value : 1,
                forceSelection: true,
                allowBlank : false
            },{
                xtype : 'combo',
                fieldLabel : 'Paridad',
                name : 'pue_nparity',
                itemId : 'pue_nparity',
                store: [
                    [0,getLocale('Ninguna')],
                    [2,getLocale('Par')],
                    [1,getLocale('Impar')]
                ],
                labelWidth : 100,
                margin: '0 0 5 30',
                value : 1,
                forceSelection: true,
                allowBlank : false
            }]
        },
        {
            xtype : 'container',
            padding : 10,
            layout: {       
                type: 'hbox',
                //align: 'stretch',
                //anchor: '100%'
            },
            items : [{
                xtype : 'numberfield',
                name : 'pue_ndatabits',
                itemId : 'pue_ndatabits',
                fieldLabel: 'Bit de datos',
                minValue: 0,
                maxValue: 9,
                labelWidth : 100,
                value : 8,
                allowBlank : false
            },{
                xtype : 'numberfield',
                name : 'pue_nstopbits',
                itemId : 'pue_nstopbits',
                fieldLabel: 'Bit de parada',
                minValue: 1,
                maxValue: 8,
                labelWidth : 100,
                margin: '0 0 5 30',
                value : 1,
                allowBlank : false
            }]
        },
        {
            xtype : 'container',
            padding : 10,
            layout: {       
                type: 'hbox',
                //align: 'stretch',
                //anchor: '100%'
            },
            items : [{
                xtype : 'combo',
                fieldLabel : 'Control de flujo',
                name : 'pue_nflowctrl',
                itemId : 'pue_nflowctrl',
                store: [
                    [0,getLocale('Ninguna')],
                    [1,getLocale('Xor/Xoff')],
                    [2,getLocale('Hardware')]
                ],
                labelWidth : 100,
                value : 0,
                forceSelection: true,
                allowBlank : false
            }]
        },
        {
            xtype : 'container',
            padding : 10,
            layout: {       
                type: 'hbox',
                //align: 'stretch',
                //anchor: '100%'
            },
            items : [{
                xtype : 'numberfield',
                name : 'pue_nbufferin',
                itemId : 'pue_nbufferin',
                fieldLabel: 'Buffer entrada',
                minValue: 1,
                maxValue: 9999,
                labelWidth : 100,
                value : 1024,
                allowBlank : false
            },{
                xtype : 'numberfield',
                name : 'pue_nbufferout',
                itemId : 'pue_nbufferout',
                fieldLabel: 'Buffer de salida',
                minValue: 1,
                maxValue: 9999,
                labelWidth : 100,
                margin: '0 0 5 30',
                value : 1024,
                allowBlank : false
            }]
        },
        {
            xtype : 'container',
            padding : 10,
            layout: {       
                type: 'hbox',
                //align: 'stretch',
                //anchor: '100%'
            },
            items : [{
                xtype : 'combo',
                fieldLabel : 'Habilitar rts',
                name : 'pue_nrts',
                itemId : 'pue_nrts',
                store: [
                    [1,getLocale('Si')],
                    [2,getLocale('No')],
                ],
                labelWidth : 100,
                value : 2,
                forceSelection: true,
                allowBlank : false
            },{
                xtype : 'combo',
                fieldLabel : 'Habilitar dtr',
                name : 'pue_ndtr',
                itemId : 'pue_ndtr',
                store: [
                    [1,getLocale('Si')],
                    [2,getLocale('No')],
                ],
                labelWidth : 100,
                margin: '0 0 5 30',
                value : 2,
                forceSelection: true,
                allowBlank : false
            }]
        }
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Aceptar',
                    scope: this,
                    action: 'save',
                    itemId: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});