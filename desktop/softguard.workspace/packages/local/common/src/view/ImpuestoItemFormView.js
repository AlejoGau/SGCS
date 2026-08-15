//MIGRADO2024
Ext.define( 'Common.view.ImpuestoItemFormView', {
    extend: 'Ext.form.Panel',
    alias: [ 'widget.impuestoitemformview' ],
    preventHeader: true,
    frame: true,
    border: 0,
    fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 80,
        anchor: '100%'
    },
    items: [ {
        xtype: 'fieldset',
        title: 'Impuesto',
        layout: 'anchor',
        frame: true,
        items: [
            {
                xtype: 'displayfield',    
                name:'Id',           
                hidden: true
            },{
                xtype: 'displayfield',               
                name:'mpi_impidkey',
                hidden: true
            },{
                xtype: 'displayfield',
                name: '_imp_cdescripcion',
                fieldLabel: 'Impuesto',
                allowBlank: false
            }, {
                xtype: 'button',
                action: 'changeImpuesto',
                text: 'Seleccione',
                margin: '0 0 5 0'
            }
        ]
    }
    ],
    buttons: [ {
        text: 'Guardar',
        itemId: 'btnGuardar'
    }],
    initComponent: function() {
        this.callParent();
    } // cierro init
});