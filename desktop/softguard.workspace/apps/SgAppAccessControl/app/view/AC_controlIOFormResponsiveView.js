Ext.define('SgAppAccessControl.view.AC_controlIOFormResponsiveView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.ac_controlioformresponsiveview'],
	border: 0,
	bodyPadding: 0,
	items: [
        {
            xtype: 'label',
            html: '<h1>'+getLocale('Bienvenido a Mis Accesos')+'</h1>'
        },{
            xtype: 'fieldset',
            title: 'Información del invitado',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            padding: 10,        
            items: [
                { allowBlank: true, fieldLabel: 'Nombre y/o Apellido', name: 'name', emptyText: 'Nombre y apellido', itemId: 'name' 
            
                },
                { allowBlank: true, fieldLabel: 'Identificacion', name: 'identification', emptyText: 'Identificación', itemId: 'identification' },
                { allowBlank: true, fieldLabel: 'Matrícula', name: 'domain', emptyText: 'Matrícula', itemId: 'domain' },
                { allowBlank: true, fieldLabel: 'Unidad Funcional', name: 'account', emptyText: 'Unidad Funcional', itemId: 'account' }
                ,{
                    xtype: 'button',
                    text : getLocale('Buscar'),
                    iconCls: 'icon-find',
                    itemId: 'search',
                    action: 'searchPrincipalTab',
                    margin: '10 10 10 10'
                    
                },{
                    xtype: 'button',
                    text : getLocale('Escanear QR'),
                    iconCls: 'icon-qrcode',
                    itemId: 'readQr',
                    action: 'readQr',
                    margin: '10 10 10 10'
                }                
            ]
        }        
    ],

    initComponent: function () {
        this.callParent();
        
	}
})