Ext.define('AccessControl.view.AC_controlIOFormView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.ac_controlioformview'],
	border: 0,
	bodyPadding: 0,
    autoScroll: true,
	items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'center',
        },
        items: [{ 
            xtype: 'container',
            width: 400,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                html: '<h1>'+getLocale('Bienvenido a Mis Accesos')+'</h1>'
            },{
                xtype: 'fieldset',
                title: 'Informacion del invitado',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                padding: 10,        
                items: [
                    { allowBlank: true, fieldLabel: 'Nombre y/o Apellido', name: 'name', emptyText: '...', itemId: 'name' 
                
                    },
                    { allowBlank: true, fieldLabel: 'Identificacion', name: 'identification', emptyText: '...', itemId: 'identification' },
                    { allowBlank: true, fieldLabel: 'Matrícula', name: 'domain', emptyText: '...', itemId: 'domain' },
                    { allowBlank: true, fieldLabel: 'Unidad Funcional', name: 'account', emptyText: '...', itemId: 'account' }
                ]
            },{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack : 'end'
                },
                flex: 1,
                items: [{
                    xtype: 'button',
                    text : getLocale('Buscar'),
                    iconCls: 'icon-find',
                    itemId: 'search',
                    action: 'searchPrincipalTab',
                    margin: '0 10 0 0'
                },{
                    xtype: 'button',
                    text : getLocale('Escanear QR'),
                    iconCls: 'icon-qrcode',
                    itemId: 'readQr',
                    action: 'readQr'
                }]
            }]
        }]
    },{ 
        xtype: 'container',
        width: '100%',
        itemId: 'searchResultContainer',
        layout: {
            type: 'hbox',
            align: 'stretch',
        },
        items: [{
            xtype: 'container', // Container left
            flex: 1,
            padding: 20,
            //frame: true,
            items: [{
                xtype: 'label',
                html: '<h1>'+getLocale('Proveedores Encontrados')+'</h1>'
            },{ 
                itemId: 'searchResultGridLeft'
                
            }]
        },{
            xtype: 'container', // Container right
            flex: 1,
            padding: 20,            
            //frame: true,
            items: [
                {
                    xtype: 'container',
                    items: [
                            {
                                xtype: 'label',
                                html: '<h1>'+getLocale('Personas encontradas')+'</h1>'
                            },{                 
                                itemId: 'searchResultGridRight'
                            
                            }
                    ]
                },{
                    xtype: 'container',
                    items:[
                        {
                            xtype: 'label',
                            html: '<h1>'+getLocale('Delivery')+'</h1>'
                        },{                 
                            itemId: 'searchResultGridRightDelivery'
                        
                        }                        
                    ]
                }

            ]
        
        
        
        }]
    }],

    initComponent: function () {
        this.callParent();
        
	}
})