Ext.define('AccessControl.view.AC_accesoProveedorObsDocVehicView', {
    extend : 'Ext.panel.Panel',
    alias: ['widget.ac_accesoproveedorobsdocvehicView'],
    
    init: true,
    //layout:'anchor',
    height: 300,
    initComponent: function () {
        this.callParent(arguments);
    },
    items:[
        {
            xtype:'tabpanel',

            tabBarPosition:'down'
        }
    ]
});