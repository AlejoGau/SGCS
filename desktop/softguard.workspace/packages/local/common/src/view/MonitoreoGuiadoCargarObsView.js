Ext.define('Common.view.MonitoreoGuiadoCargarObsView',{
    extend: 'Ext.form.Panel',
    alias: 'widget.monitoreoguiadocargarobsview',
    itemId: 'monitoreoguiadocargarobsview',
    title: 'Cargar Observaciones',
    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%',
        labelWidth: 150
    },

    items: [
        {
            xtype: 'textarea',
            fieldLabel: 'Observaciones',
            name: 'observaciones',
            itemId: 'observaciones',
            allowBlank: (!this.indicaNoRealizo) ,
            height: 100
        }
    ],
    buttons: [

        {
            xtype: 'button',
            text: 'Confirmar',
            action: 'confirmar',
            item: 'confirmarButton',
        },{
            xtype: 'button',
            text: 'Cancelar',
            itemId: 'cancelarButton',
            action: 'cancelar'
        }
    ],
    initComponent: function() {
        this.callParent(arguments);
        if(this.indicaNoRealizo == true){
            this.down('#observaciones').allowBlank = false;
        }
    }
});