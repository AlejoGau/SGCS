Ext.define('Administrator.view.MasterWebDealerConfigView', {
    extend : 'Ext.form.Panel',
    title: 'Configuracion',
    alias : 'widget.MasterWebDealerConfig',
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
                }
                
            ],
            hidden:true
        },
        {
            xtype:'fieldset',
            title: 'Usuarios que tiene permitido crear',
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Cantidad',
                    itemId: 'cantidadoperadores'
                }
                
            ]
        }
        ,{
            xtype: 'checkbox',
            fieldLabel: 'Elimnar cuenta',
            itemId: 'eliminarcuenta'
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
                    action: 'saveSecurity'
                }]// cierro items
         }); 
         this.callParent(arguments);
         this.addDocked(toolbar);
    } // cierro init

});

