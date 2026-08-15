Ext.define('Administrator.view.TrackGuardSettingsView', {
    extend : 'Ext.form.Panel',
    title: 'Configuracion',
    alias : 'widget.TrackGuardSettingsView',
    autoScroll:true,
    items: [
        
        {
            xtype:'fieldset',
            title: 'Cuentas',
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Cantidad',
                    itemId: 'cantidadcuentas'
                },{
                    xtype: 'checkboxfield',
                    boxLabel  : getLocale('Generar eventos'),
                    checked   : false,
                    itemId : 'chkGenerarEventos'
                }
                
            ]
        }
        
    ],
    
    initComponent : function() {
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'saveSetting'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    } // cierro init

});

