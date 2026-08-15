Ext.define('Administrator.view.AdministratorSecurityView', {
    extend : 'Ext.form.Panel',
    title: 'Seguridad',
    alias : 'widget.AdministratorSecurity', //le cambie el nombre para que no se muestr ya que da error
    
    items: [
        {
            xtype: 'checkboxfield',
            boxLabel  : getLocale('Solo Administrar cuentas'),
            checked   : false,
            itemId : 'chkCuenta'
        },{
            xtype: 'checkboxfield',
            boxLabel  : getLocale('Generar eventos'),
            checked   : false,
            itemId : 'chkGenerarEventos'
        },{
            xtype: 'checkboxfield',
            boxLabel  : getLocale('Procesar masivo'),
            checked   : false,
            hidden:true,// no tiene sentido este permiso, no funciona bien. dedalo 6/3/2018
            itemId : 'procesarporlote'
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
