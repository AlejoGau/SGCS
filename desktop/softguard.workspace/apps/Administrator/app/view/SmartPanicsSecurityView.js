Ext.define('Administrator.view.SmartPanicsSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.SmartPanicsSecurity',
    autoScroll:true,
    items: [
        {
            xtype: 'fieldset',
            title: 'Seleccione para ocultar',
            collapsed: false,
            collapsible: false,
            items: [
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Dispositivos activos',
                    itemId: 'ocultaractivos'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Dispositivos sin asignar',
                    itemId: 'ocultarsinasignar'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Formularios',
                    itemId: 'ocultarformularios'
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Seleccione para mostrar',
            collapsed: false,
            collapsible: false,
            items: [
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Configurar',
                    itemId: 'configurar'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Crear dispositivo',
                    itemId: 'alta'
                },{
                    xtype: 'checkbox',
                    fieldLabel: 'Eliminar dispositivo',
                    itemId: 'baja'
                },{
                    xtype: 'checkbox',
                    fieldLabel: 'Asignar / Desasignar',
                    itemId: 'asignardesasignar'
                },{
                    xtype: 'checkbox',
                    fieldLabel: 'Seguimiento',
                    itemId: 'seguimiento'
                },{
                    xtype: 'checkbox',
                    fieldLabel: 'Cambio de dispositivo',
                    itemId: 'cambioimei'
                }
            ]
        }
    ],
    
    initComponent : function() {
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSecurity'
                }
            ]
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    }
});
