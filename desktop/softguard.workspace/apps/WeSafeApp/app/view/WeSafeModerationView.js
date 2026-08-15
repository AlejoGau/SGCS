Ext.define('WeSafe.view.WeSafeModerationView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.WeSafeModerationView',
    title: 'We-Safe Moderación',
    bodyPadding: 15,
    width: 500,
    layout: 'vbox',

    items: [
        {
            xtype: 'checkboxfield',
            boxLabel: 'Aprobar todos',
            itemId: 'chkAprobarTodos',
            listeners: {
                change: 'onAprobarTodosChange'
            }
        },
        {
            xtype: 'checkboxfield',
            boxLabel: 'Aprobar si solo contiene texto',
            margin: '10 0 0 0',
            padding: '10 0 0 20',
            itemId: 'chkSoloTexto'
        },
        {
            xtype: 'checkboxfield',
            boxLabel: 'Rechazar si contiene enlace web',
            padding: '10 0 0 20',
            itemId: 'chkEnlaceWeb'
        },
        {
            xtype: 'checkboxfield',
            boxLabel: 'Rechazar si contiene direcciones de emails',
            padding: '10 0 0 20',
            itemId: 'chkEmails'
        },
        {
            xtype: 'checkboxfield',
            boxLabel: 'Rechazar si contiene números de teléfonos',
            itemId: 'chkTelefonos',
            padding: '10 0 0 20',
            tooltip: 'Detecta números telefónicos en el contenido'
        },
        {
            xtype: 'checkboxfield',
            boxLabel: 'Rechazar si contiene usuario de Instagram',
            itemId: 'chkInstagram',
            padding: '10 0 0 20',
            tooltip: 'Identifica menciones de Instagram en el contenido'
        }
    ],
    
    buttons: [
        {
            text: 'Guardar configuración',
            handler: 'onGuardarClick'
        }
    ]
});
