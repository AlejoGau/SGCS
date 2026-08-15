//MIGRADO2024
Ext.define('Common.view.VehicleBrandView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.vehiclebrandview',    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },   
    items: [
        {xtype: 'vehiclebrandformview', height: 100},
        {xtype: 'vehiclemodelgridview', flex: 1}
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        this.down('vehiclebrandformview').record = this.record;
        this.down('vehiclemodelgridview').record = this.record;
    }
});